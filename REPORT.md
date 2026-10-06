# Developer experience report: Cal.com SDK with the Voxgig SDK generator

Author: Emmanuel Orozco. Date: 2026-10-06.

## What I built

An SDK for the [Cal.com API v2](https://cal.com/docs/api-reference/v2/introduction), generated from
Cal.com's public OpenAPI 3.0 spec (82 paths, 121 operations) with `@voxgig/sdkgen` 4.34.1.
I generated TypeScript and Python first, then dropped Python (`voxgig-sdkgen target remove py`)
to keep the repo small. The published SDK is TypeScript only, with the `test` feature.

## How I used AI

I directed AI agents (Claude Code, with a Codex worker for the entity mapping). I chose the API,
set the goals (clean entity names, a short README, TypeScript only), read the README as a new
developer would and sent corrections. Each change was checked by regenerating, running the
generated test suite and `voxgig-sdkgen doctor`, and finally by calling the live Cal.com API
with my own account.

## Result

| | Entities | Pass | Fail | Skipped |
|---|---|---|---|---|
| Out of the box, TypeScript | 63 | 544 | 12 | 68 |
| Out of the box, Python | 63 | 396 | 4 | 147 |
| After shaping, TypeScript | 23 | 443 | 0 | 31 |
| After shaping, Python | 23 | 302 | 0 | 110 |

All 121 operations are still mapped. `voxgig-sdkgen doctor` reports no drift.

From an empty folder to generated, compiling SDKs took about two minutes of machine time, and
generation itself about six seconds. Getting to the out-of-the-box rows fits the 30-minute box.
The shaping did not: it is about 700 lines of `guide.aontu`, and I went past the time-box on
purpose to see how far the customisation layer goes.

The numbers above are from the offline test suites. I also ran the TypeScript SDK against the
live Cal.com API with my own account, read-only: `Me().load()`, `Schedule().list()`,
`EventType().list()`, `Booking().list()` (96 bookings), `Booking().load()` and a `direct()` call
all returned real data. A call without a key returned 401, as expected.

## What I changed

1. **Bumped `@voxgig/apidef` in `.sdk/package.json`** from `~8.22.1` to `~8.23.0` (issue 1).
2. **Added `servers`, a title and a description to the spec copy in `.sdk/def/`.** Cal.com's spec
   has no `servers` block, so the client had `base: "{base}"` and the README told users to pass
   `'<base>'`. Its title is also "Cal.diy API v2".
3. **Reshaped 63 entities into 23 in `guide.aontu`** (issue 2): moved each path from a DTO-named
   entity to a domain entity (`active: false` on the old one, redeclared under the new one),
   added `body.data` unwrapping where it was missing (issue 3), and added actions to tell apart
   paths that shared a selector.
4. **Added entity descriptions** through `info.entity_desc` in `project.aontu`. I found this key
   by reading `ReadmeTop.js` in `node_modules`; it is not documented. Multi-line strings are
   rejected ("unprintable character"), so longer text has to be one escaped line.
5. **Rewrote the root README by hand and added a `docs/` folder.** The generated README has 15
   sections and no switches to drop any, and I wanted a short entry point: install, one
   quickstart, one entity call, one direct call, and links. The rest moved to
   `docs/entities.md`, `docs/direct.md` and `docs/advanced.md`. This is the one place where I
   edited generated output, so `npm run generate` overwrites it and I restore it from git.
6. **Deleted 54 orphan files in `.sdk/model/flow/`** left behind by the reshaping (issue 9).

## Issues, in the order I hit them

### 1. The very first command fails (blocker)

`npm create @voxgig/sdkgen -- cal -d ./cal-openapi.json -o ./cal-sdk` exits with
`ERESOLVE`: the scaffold pins `@voxgig/apidef@~8.22.1`, but `@voxgig/sdkgen@4.34.1` has a peer
dependency on `@voxgig/apidef@>=8.23.0`. The scaffold files are written, but `npm install` fails,
so a new user is stopped at step 1 with an npm error that says nothing about Voxgig.

Suggestion: a CI job that runs `npm create` against the published packages on every release of
`sdkgen` or `apidef`.

### 2. Entities are named after response DTOs, not domain concepts

The pitch is "semantic entities instead of URL paths". For this spec I got 63 entities, and most
are named after response schemas: `AddAttendeeOutput20240813`,
`StripCredentialsCheckOutputResponseDto`, `OAuthClientWebhooksOutputResponseDto`. There are also
entities called `men`, `default`, `request` and `refresh`. A Cal.com user would expect about ten:
booking, event type, schedule, slot, calendar, webhook, and so on.

The generated README then leads with the worst one: its first example is
`client.AddAttendeeOutput20240813()`, because it is first alphabetically. After shaping it leads with `client.ApiKey().create()`,
which is cleaner but still not what a new user wants first; I found no setting to pick the
featured entity.

I fixed the names by hand in `guide.aontu` (23 entities now), but it took about 700 lines.

Suggestion: strip `Output`, `ResponseDto` and date suffixes before naming, and fold
`/bookings/{id}/attendees` into `booking` as an action. When the entity count is close to the
path count, print a warning that the model needs shaping and link to the guide docs.

### 3. The `{ status, data }` envelope is unwrapped inconsistently

Cal.com wraps every response in `{ status, data }`. The generator detected this for list and
some create operations (`transform: res: body.data` in `base-guide.aontu`) but not for
`booking.load`, `schedule.load` and others. The `booking` entity's fields ended up being
`status`, `data`, `pagination` and `error` instead of the booking's own fields.

The fix is one line per operation in `guide.aontu`, and it worked first time. But I only found
it by reading `base-guide.aontu`; the test failure ("the entity does not hold the record the
definition example returns") does not point there.

Suggestion: if most operations in an API use the same envelope, apply it to all of them and log
it. Make that test failure message name the `transform: res` setting.

### 4. Generated docs have visible gaps

- The README tutorial goes from step 1 to step 3. Step 2 is missing.
- Out of the box, README and REFERENCE examples fail their own tests in both languages (for example
  `list` on `CalUnifiedCalendar` is missing `calendar_id`).
- Install instructions point to `github.com/voxgig-sdk/cal-sdk`, a repo that does not exist.
  `origin: 'voxgig-sdk'` is set in `sdk.aontu`, which is not one of the files marked as mine.
  The scaffold should ask for the owner, or read it from `git remote`.

### 5. The scaffold warns about its own defaults

Every command prints: `.sdk/.gitignore ignores log/ ... Delete the log/ line`. That `.gitignore`
was written by the scaffold seconds earlier. Either the scaffold should not write the line, or
the warning should go.

### 6. Warnings are easy to miss

`PARTIAL BUILD! There were 3 warnings` and a long `flow-step-unreachable` line (35 test steps
switched off) scroll past in several hundred lines of INFO output. 68 TypeScript and 147 Python
tests are skipped, and I only noticed by reading the totals.

Suggestion: end `npm run generate` with a short summary: entities, operations, warnings, tests
switched off, and the one next action.

### 7. Smaller things

- `voxgig-sdkgen doctor` must be run from inside `.sdk/`. From the repo root it crashes with a
  raw `ENOENT ./model/sdk.aontu` stack trace.
- The model files use `.aontu`. I found no link from the scaffold or the docs page to a syntax
  reference, so I copied the syntax from `base-guide.aontu`.
- The docs landing page says `npm create @voxgig/sdkgen` (interactive); the non-interactive
  flags `-d` and `-o` are only on the agents page.

### 8. Auth is not generated or documented

Cal.com's spec has no `securitySchemes`; it lists `Authorization` and `cal-api-version` as plain
header parameters. The generator produced no auth setup, and none of the generated docs show how
to pass a key. In the live test, a default client got 401. What works is the `headers` option:

```ts
const client = new CalSDK({
  headers: {
    Authorization: `Bearer ${process.env.CAL_API_KEY}`,
    'cal-api-version': '2024-08-13',
  },
})
```

Cal.com also expects a different `cal-api-version` per resource (`2024-08-13` for bookings,
`2024-06-11` for schedules, `2024-06-14` for event types). The SDK leaves that to the caller, so
in practice you need one client per resource type.

Suggestion: when a spec has an `Authorization` header parameter on every operation, treat it as
auth and document it in the quickstart. Let the guide set a default header per entity.

### 9. Things that only showed up while shaping

- **Orphan flow files.** When an entity disappears, its entity model and target files are pruned
  but `.sdk/model/flow/Basic<Old>Flow.aontu` is not. `doctor` then exits non-zero, its summary
  line says "0 forked, 0 edited, 0 stale, 0 missing", and it suggests `target add`, which does
  not fix it. I deleted the 54 files by hand.
- **Stale warnings file.** `.sdk/apidef-warnings.txt` is not cleared by a successful generate.
- **Path and query parameters can collide.** The path parameter `calendar` and the query
  parameter `calendarId` both became `calendar_id`; the optional one won, so examples omitted a
  required value. Fixed by renaming the path parameter in the guide.
- **Generated test flows assume the key is `id`.** Flows pass `id` even when the mapping needs
  `attendee_id` or `webhook_id`, so nested entities fail until the keys are normalised.
- **Union responses lose their fields.** `booking`, `private_link` and `slot` return unions and
  end up with thin record types. Create inputs can also require response-only fields such as
  `id`. I found no way to fix either from the guide.
- **Seven generated flow steps are still switched off** (calendar, conferencing, verified email
  and phone), because the generic flow does not supply the action those routes need.

## What worked well

- The pipeline is fast and deterministic. Regenerating after a model change takes seconds.
- Customisation survives regeneration. My `guide.aontu` and spec changes were kept, and `doctor`
  confirmed no drift.
- The generated SDK worked against the live API on the first try once the headers were set.
- The offline tests are a real feature. They found the envelope problem without an API key.
- Warnings, when I did read them, were specific and told me which file to edit.

## If I had more time

Set the API key and the per-resource `cal-api-version` header inside the SDK so the caller sets
a key once, fix the union-typed records, move my README into the generator so it survives
regeneration, and test the write operations (create, cancel, reschedule) on a test account.
