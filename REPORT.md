# Developer experience report: Cal.com SDK with the Voxgig SDK generator

Author: Emmanuel Orozco. Date: 2026-10-06.

## What I built

An SDK for the [Cal.com API v2](https://cal.com/docs/api-reference/v2/introduction) (I've been using this API a lot for personal projects lately), generated from
Cal.com's public OpenAPI  with `@voxgig/sdkgen` 4.34.1.
I generated only  TypeScript for simplicity.

## How I used AI

I directed AI agents (Claude Fable orchestrator, with a gpt-sol worker for the entity mapping). I chose the API,
set the goals (clean entity names, a short README, TypeScript only), read (and updated) the README as a new
developer would and sent corrections to make it easier to understand and find the docs (add link to docs) and finally by calling the live Cal.com API with my own account.

## What I changed

1. **Fixed the install.** The first command failed (issue 1). I changed one version number in
   `.sdk/package.json` and ran `npm install` again. No new dependency was added.
2. **Renamed the objects the SDK exposes** (issue 2). The AI wrote a mapping file,
   `.sdk/model/guide/guide.aontu`, that turns 63 hard-to-read names into 23 clear ones such as
   `Booking` and `Schedule`.
3. **Rewrote the root README by hand and added a `docs/` folder.** The generated README felt too
   convoluted, so I kept only the getting-started info and linked the rest from `docs/`.

## Issues

### 1. The first command fails

I ran the create command with my API spec file:

```bash
npm create @voxgig/sdkgen@latest cal -- --def cal-openapi.json
```

It stopped with an npm `ERESOLVE` error. The project it creates asks for version `8.22.1` of
`@voxgig/apidef`, but the generator itself needs `8.23.0` or newer, so npm refuses to install.
The error is pure npm output and never mentions Voxgig, so as a new user I had no idea what
went wrong.

What I did: opened `.sdk/package.json`, changed `"@voxgig/apidef": "~8.22.1"` to `"~8.23.0"`,
and ran `npm install` inside `.sdk/`. After that everything worked.

Two suggestions. Test the create command against the published packages before each release.
And make the first command shorter: needing `--` and `--def` on the very first step is a lot
for a beginner. A prompt that asks "where is your OpenAPI file?" would be friendlier.

### 2. The names in the generated SDK are hard to read

The SDK gives you one object per "thing" in the API, and you call methods on it. The generator
calls these objects entities. For Cal.com I expected to write this:

```ts
client.Booking().load({ id })
```

Out of the box I got 63 objects, with names like these:

```ts
client.AddAttendeeOutput20240813()
client.StripCredentialsCheckOutputResponseDto()
client.Men()
```

The names are copied from internal labels in Cal.com's spec, not from what a developer would
call them. The generated README even uses `AddAttendeeOutput20240813` as its first example.

What I did: the generator lets you correct the names in a mapping file. I asked the AI to write
it, and the SDK now has 23 objects with names like `Booking`, `EventType`, `Schedule` and
`Webhook`. It works, but the file is about 700 lines, which is a lot of work to get readable
names.

Suggestion: clean the names automatically (drop endings like `Output`, `ResponseDto` and
dates), and warn when the result still looks like internal labels.

### 3. Some calls return the wrapper, not the data

Cal.com wraps every answer like this:

```json
{ "status": "success", "data": { "title": "15 Min Meeting", "start": "..." } }
```

When I load a booking I want the booking, so `booking.title`. The generator handled this for
some calls but not for others. For those, I got the wrapper back, and the booking's fields were
`status` and `data` where I expected `title` and `start`.

What I did: added one line per affected call to the mapping file, telling the generator that
the real record is inside `data`:

```
guide: entity: booking: path: "/v2/bookings/{bookingUid}": op: load: transform: res: "`body.data`"
```

It worked the first time. The hard part was finding out that this line exists: I only found it
by reading a generated file, and the failing test did not point to it.

Suggestion: if most calls in an API use the same wrapper, unwrap all of them.

