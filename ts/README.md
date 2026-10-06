# Cal TypeScript SDK

Book, schedule and manage Cal.com from code, without hand-writing HTTP calls.

The TypeScript SDK for the Cal API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.ApiKey()` — each with a small set of operations (`list`, `load`, `create`, `update`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/cal-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/voxgig-sdk/cal-sdk
npm install ./cal-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { CalSDK } from '@voxgig-sdk/cal-sdk'

const client = new CalSDK()
```

### 3. Load an attendee

Attendee is nested under booking, so provide the `booking_id`.
`load()` returns the entity directly and throws on failure:

```ts
try {
  const attendee = await client.Attendee().load({
    booking_id: 'example_booking_id',
    id: 1,
  })
  console.log(attendee)
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Create — returns the created ApiKey ENTITY (.data() for the record)
const created = await client.ApiKey().create({
  apiKey: 'example_apiKey',
})

```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const bookings = await client.Booking().list()
  console.log(bookings)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = CalSDK.test()

const booking = await client.Booking().list()
// booking is the entity, populated with mock response data
// — call booking.data() for the record itself
console.log(booking)
```

You can also use the instance method:

```ts
const client = new CalSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Booking()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new CalSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
CAL_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### CalSDK

#### Constructor

```ts
new CalSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `ApiKey(data?)` | `ApiKeyEntity` | Create an ApiKey entity instance. |
| `Attendee(data?)` | `AttendeeEntity` | Create an Attendee entity instance. |
| `Booking(data?)` | `BookingEntity` | Create a Booking entity instance. |
| `Calendar(data?)` | `CalendarEntity` | Create a Calendar entity instance. |
| `CalendarEvent(data?)` | `CalendarEventEntity` | Create a CalendarEvent entity instance. |
| `Conferencing(data?)` | `ConferencingEntity` | Create a Conferencing entity instance. |
| `DestinationCalendar(data?)` | `DestinationCalendarEntity` | Create a DestinationCalendar entity instance. |
| `EventType(data?)` | `EventTypeEntity` | Create an EventType entity instance. |
| `EventTypeWebhook(data?)` | `EventTypeWebhookEntity` | Create an EventTypeWebhook entity instance. |
| `ManagedUser(data?)` | `ManagedUserEntity` | Create a ManagedUser entity instance. |
| `Me(data?)` | `MeEntity` | Create a Me entity instance. |
| `OauthClient(data?)` | `OauthClientEntity` | Create an OauthClient entity instance. |
| `OauthClientWebhook(data?)` | `OauthClientWebhookEntity` | Create an OauthClientWebhook entity instance. |
| `OauthToken(data?)` | `OauthTokenEntity` | Create an OauthToken entity instance. |
| `PrivateLink(data?)` | `PrivateLinkEntity` | Create a PrivateLink entity instance. |
| `Schedule(data?)` | `ScheduleEntity` | Create a Schedule entity instance. |
| `SelectedCalendar(data?)` | `SelectedCalendarEntity` | Create a SelectedCalendar entity instance. |
| `Slot(data?)` | `SlotEntity` | Create a Slot entity instance. |
| `SlotReservation(data?)` | `SlotReservationEntity` | Create a SlotReservation entity instance. |
| `Stripe(data?)` | `StripeEntity` | Create a Stripe entity instance. |
| `VerifiedEmail(data?)` | `VerifiedEmailEntity` | Create a VerifiedEmail entity instance. |
| `VerifiedPhone(data?)` | `VerifiedPhoneEntity` | Create a VerifiedPhone entity instance. |
| `Webhook(data?)` | `WebhookEntity` | Create a Webhook entity instance. |
| `tester(testopts?, sdkopts?)` | `CalSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `CalSDK.test(testopts?, sdkopts?)` | `CalSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): CalSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `void`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### ApiKey

| Field | Description |
| --- | --- |
| `apiKey` |  |
| `apiKeyDaysValid` | For how many days is managed organization api key valid. |
| `apiKeyNeverExpires` | If true, organization api key never expires. |

Operations: create.

API path: `/v2/api-keys/refresh`

#### Attendee

| Field | Description |
| --- | --- |
| `absent` |  |
| `displayEmail` | Clean email for display purposes |
| `email` | The email of the attendee. |
| `id` |  |
| `language` | The preferred language of the attendee. |
| `name` | The name of the attendee. |
| `phoneNumber` | The phone number of the attendee in international format. |
| `timeZone` | The time zone of the attendee. |

Operations: create, list, load, remove.

API path: `/v2/bookings/{bookingUid}/attendees`

#### Booking

| Field | Description |
| --- | --- |
| `data` | Booking data, which can be either a BookingOutput object, a RecurringBookingOutput object, or an array of RecurringBookingOutput objects |
| `error` |  |
| `id` |  |
| `pagination` |  |
| `status` |  |

Operations: create, list, load, update.

API path: `/v2/bookings/{bookingUid}/reassign/{userId}`

#### Calendar

| Field | Description |
| --- | --- |
| `connectedCalendars` |  |
| `destinationCalendar` |  |
| `id` |  |

Operations: create, list, load.

API path: `/v2/calendars/{calendar}/credentials`

#### CalendarEvent

| Field | Description |
| --- | --- |
| `attendees` | List of attendees with their response status |
| `calendarEventOwner` | The calendar account that owns this event. |
| `description` | Detailed description of the calendar event |
| `end` | End date and time of the calendar event with timezone information |
| `hosts` | Information about the event hosts (organizers) |
| `id` | Unique identifier of the calendar event |
| `locations` | Conference locations with entry points (video, phone, sip, more) |
| `source` | Calendar integration source (e.g., Google Calendar, Office 365, Apple Calendar). |
| `start` | Start date and time of the calendar event with timezone information |
| `status` | Status of the event (accepted, pending, declined, cancelled) |
| `title` | Title of the calendar event |

Operations: create, list, load, remove, update.

API path: `/v2/calendars/{calendar}/events`

#### Conferencing

| Field | Description |
| --- | --- |
| `id` | Id of the conferencing app credentials |
| `invalid` | Whether if the connection is working or not. |
| `type` | Type of conferencing app |
| `userId` | Id of the user associated to the conferencing app |

Operations: create, list, load, remove.

API path: `/v2/conferencing/{app}/connect`

#### DestinationCalendar

| Field | Description |
| --- | --- |
| `credentialId` |  |
| `delegationCredentialId` |  |
| `externalId` | Unique identifier used to represent the specific calendar, as returned by the /calendars endpoint |
| `integration` | The calendar service you want to integrate, as returned by the /calendars endpoint |
| `userId` |  |

Operations: update.

API path: `/v2/destination-calendars`

#### EventType

| Field | Description |
| --- | --- |
| `afterEventBuffer` | Extra time automatically blocked on your calendar after a meeting ends. |
| `allowReschedulingCancelledBookings` | When enabled, users will be able to create a new booking when trying to reschedule a cancelled booking. |
| `allowReschedulingPastBookings` | Enabling this option allows for past events to be rescheduled. |
| `beforeEventBuffer` | Extra time automatically blocked on your calendar before a meeting starts. |
| `bookerActiveBookingsLimit` | Limit the number of active bookings a booker can make for this event type. |
| `bookerLayouts` | Should booker have week, month or column view. |
| `bookingFields` | Custom fields that can be added to the booking form when the event is booked by someone. |
| `bookingLimitsCount` | Limit how many times this event can be booked |
| `bookingLimitsDuration` | Limit total amount of time that this event can be booked |
| `bookingRequiresAuthentication` | Boolean to require authentication for booking this event type via api. |
| `bookingUrl` | Full URL to the booking page for this event type |
| `bookingWindow` | Limit how far in the future this event can be booked |
| `calVideoSettings` | Cal video settings for the event type. |
| `color` |  |
| `confirmationPolicy` | Specify how the booking needs to be manually confirmed before it is pushed to the integrations and a confirmation mail is sent. |
| `currency` |  |
| `customName` | Customizable event name with valid variables: {Event type title}, {Organiser}, {Scheduler}, {Location}, {Organiser first name}, {Scheduler first name}, {Scheduler last name}, {Event duration}, {LOCATION}, {HOST/ATTENDEE}, {HOST}, {ATTENDEE… |
| `description` |  |
| `destinationCalendar` |  |
| `disableCancelling` | Settings for disabling cancelling of this event type. |
| `disableGuests` | If true, person booking this event can't add guests via their emails. |
| `disableRescheduling` | Settings for disabling rescheduling of this event type. |
| `forwardParamsSuccessRedirect` |  |
| `hidden` |  |
| `hideCalendarEventDetails` |  |
| `hideCalendarNotes` |  |
| `hideOrganizerEmail` | Boolean to Hide organizer's email address from the booking screen, email notifications, and calendar events |
| `id` |  |
| `interfaceLanguage` | Set preferred language for the booking interface. |
| `isInstantEvent` |  |
| `lengthInMinutes` |  |
| `lengthInMinutesOptions` | If you want that user can choose between different lengths of the event you can specify them here. |
| `locations` | Locations where the event will take place. |
| `lockTimeZoneToggleOnBookingPage` |  |
| `metadata` |  |
| `minimumBookingNotice` | Minimum number of minutes before the event that a booking can be made. |
| `offsetStart` | Offset timeslots shown to bookers by a specified number of minutes |
| `onlyShowFirstAvailableSlot` | This will limit your availability for this event type to one slot per day, scheduled at the earliest available time. |
| `ownerId` |  |
| `price` |  |
| `recurrence` | Create a recurring event type. |
| `requiresBookerEmailVerification` |  |
| `scheduleId` | If you want that this event has different schedule than user's default one you can specify it here. |
| `seats` | Create an event type with multiple seats. |
| `seatsPerTimeSlot` |  |
| `seatsShowAvailabilityCount` |  |
| `showOptimizedSlots` | Arrange time slots to optimize availability. |
| `slotInterval` | Number representing length of each slot when event is booked. |
| `slug` |  |
| `successRedirectUrl` | A valid URL where the booker will redirect to, once the booking is completed successfully |
| `title` |  |
| `useDestinationCalendarEmail` |  |
| `users` |  |

Operations: create, list, load, remove, update.

API path: `/v2/event-types`

#### EventTypeWebhook

| Field | Description |
| --- | --- |
| `active` |  |
| `eventTypeId` |  |
| `id` |  |
| `payloadTemplate` | The template of the payload that will be sent to the subscriberUrl, check cal.com/docs/core-features/webhooks for more information |
| `secret` |  |
| `subscriberUrl` |  |
| `triggers` |  |
| `version` | The version of the webhook |

Operations: create, list, load, remove, update.

API path: `/v2/event-types/{eventTypeId}/webhooks`

#### ManagedUser

| Field | Description |
| --- | --- |
| `avatarUrl` | URL of the user's avatar image |
| `bio` | Bio |
| `createdDate` |  |
| `defaultScheduleId` |  |
| `email` |  |
| `id` |  |
| `locale` |  |
| `metadata` | You can store any additional data you want here. |
| `name` | Managed user's name is used in emails |
| `timeFormat` | Must be a number 12 or 24 |
| `timeZone` | Timezone is used to create user's default schedule from Monday to Friday from 9AM to 5PM. |
| `username` |  |
| `weekStart` |  |

Operations: create, list, load, remove, update.

API path: `/v2/oauth-clients/{clientId}/users`

#### Me

| Field | Description |
| --- | --- |
| `avatarUrl` | URL of the user's avatar image |
| `bio` | Bio |
| `defaultScheduleId` |  |
| `email` |  |
| `id` |  |
| `locale` |  |
| `metadata` | You can store any additional data you want here. |
| `name` |  |
| `organization` |  |
| `organizationId` |  |
| `timeFormat` | Must be 12 or 24 |
| `timeZone` |  |
| `username` |  |
| `weekStart` |  |

Operations: load, update.

API path: `/v2/me`

#### OauthClient

| Field | Description |
| --- | --- |
| `areCalendarEventsEnabled` | If true and if managed user has calendar connected, calendar events will be created. |
| `areDefaultEventTypesEnabled` | If enabled, when creating a managed user the managed user will have 4 default event types: 30 and 60 minutes without Cal video, 30 and 60 minutes with Cal video. |
| `areEmailsEnabled` |  |
| `bookingCancelRedirectUri` |  |
| `bookingRedirectUri` |  |
| `bookingRescheduleRedirectUri` |  |
| `createdAt` |  |
| `id` |  |
| `logo` |  |
| `name` |  |
| `organizationId` |  |
| `permissions` | Array of permission keys like ["BOOKING_READ", "BOOKING_WRITE"] |
| `redirectUris` |  |
| `secret` |  |

Operations: create, list, load, remove, update.

API path: `/v2/oauth-clients`

#### OauthClientWebhook

| Field | Description |
| --- | --- |
| `active` |  |
| `id` |  |
| `oAuthClientId` |  |
| `payloadTemplate` | The template of the payload that will be sent to the subscriberUrl, check cal.com/docs/core-features/webhooks for more information |
| `secret` |  |
| `subscriberUrl` |  |
| `triggers` |  |
| `version` | The version of the webhook |

Operations: create, list, load, remove, update.

API path: `/v2/oauth-clients/{clientId}/webhooks`

#### OauthToken

| Field | Description |
| --- | --- |
| `access_token` | The access token |
| `expires_in` | The number of seconds until the access token expires |
| `refresh_token` | The refresh token |
| `token_type` | The token type |

Operations: create.

API path: `/v2/oauth-clients/{clientId}/users/{userId}/force-refresh`

#### PrivateLink

| Field | Description |
| --- | --- |
| `data` | Array of private links for the event type (mix of time-based and usage-based) |
| `expiresAt` | Expiration date for time-based links |
| `id` |  |
| `maxUsageCount` | Maximum number of times the link can be used. |
| `status` | Response status |

Operations: create, list, remove, update.

API path: `/v2/event-types/{eventTypeId}/private-links`

#### Schedule

| Field | Description |
| --- | --- |
| `availability` | Each object contains days and times when the user is available. |
| `data` |  |
| `error` |  |
| `id` |  |
| `isDefault` | Each user should have 1 default schedule. |
| `name` |  |
| `overrides` | Need to change availability for a specific date? |
| `ownerId` |  |
| `status` |  |
| `timeZone` | Timezone is used to calculate available times when an event using the schedule is booked. |

Operations: create, list, load, remove, update.

API path: `/v2/schedules`

#### SelectedCalendar

| Field | Description |
| --- | --- |
| `credentialId` |  |
| `delegationCredentialId` |  |
| `externalId` |  |
| `integration` |  |

Operations: create, remove.

API path: `/v2/selected-calendars`

#### Slot

| Field | Description |
| --- | --- |

Operations: load.

API path: `/v2/slots`

#### SlotReservation

| Field | Description |
| --- | --- |
| `eventTypeId` | The ID of the event type for which slot should be reserved. |
| `id` |  |
| `reservationDuration` | ONLY for authenticated requests with api key, access token or OAuth credentials (ID + secret). |
| `reservationUid` | The unique identifier of the reservation. |
| `reservationUntil` | ISO 8601 datestring in UTC timezone representing time until which the slot is reserved. |
| `slotDuration` | By default slot duration is equal to event type length, but if you want to reserve a slot for an event type that has a variable length you can specify it here as a number in minutes. |
| `slotEnd` | ISO 8601 datestring in UTC timezone representing slot end. |
| `slotStart` | ISO 8601 datestring in UTC timezone representing available slot. |

Operations: create, load, remove, update.

API path: `/v2/slots/reservations`

#### Stripe

| Field | Description |
| --- | --- |
| `authUrl` |  |
| `url` |  |

Operations: load.

API path: `/v2/stripe/save`

#### VerifiedEmail

| Field | Description |
| --- | --- |
| `email` | The verified email address. |
| `id` | The unique identifier for the verified email. |
| `userId` | The ID of the associated user, if applicable. |

Operations: create, list, load.

API path: `/v2/verified-resources/emails/verification-code/request`

#### VerifiedPhone

| Field | Description |
| --- | --- |
| `id` | The unique identifier for the verified email. |
| `phoneNumber` | The verified phone number. |
| `userId` | The ID of the associated user, if applicable. |

Operations: create, list, load.

API path: `/v2/verified-resources/phones/verification-code/request`

#### Webhook

| Field | Description |
| --- | --- |
| `active` |  |
| `id` |  |
| `payloadTemplate` | The template of the payload that will be sent to the subscriberUrl, check cal.com/docs/core-features/webhooks for more information |
| `secret` |  |
| `subscriberUrl` |  |
| `triggers` |  |
| `userId` |  |
| `version` | The version of the webhook |

Operations: create, list, load, remove, update.

API path: `/v2/webhooks`



## Entities


### ApiKey

Create an instance: `const api_key = client.ApiKey()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apiKey` | `string` |  |
| `apiKeyDaysValid` | `number` | For how many days is managed organization api key valid. |
| `apiKeyNeverExpires` | `boolean` | If true, organization api key never expires. |

#### Example: Create

```ts
const api_key = await client.ApiKey().create({
  apiKey: 'example_apiKey',
})
```


### Attendee

Create an instance: `const attendee = client.Attendee()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `absent` | `boolean` |  |
| `displayEmail` | `string` | Clean email for display purposes |
| `email` | `string` | The email of the attendee. |
| `id` | `number` |  |
| `language` | `string` | The preferred language of the attendee. |
| `name` | `string` | The name of the attendee. |
| `phoneNumber` | `string` | The phone number of the attendee in international format. |
| `timeZone` | `string` | The time zone of the attendee. |

#### Example: Load

```ts
const attendee = await client.Attendee().load({ id: 1, booking_id: 'booking_id' })
```

#### Example: List

```ts
const attendees = await client.Attendee().list({ booking_id: "example" })
```

#### Example: Create

```ts
const attendee = await client.Attendee().create({
  booking_id: 'example_booking_id',
  absent: true,
  displayEmail: 'example_displayEmail',
  email: 'example_email',
  id: 1,
  name: 'example_name',
  timeZone: 'example_timeZone',
})
```


### Booking

Create an instance: `const booking = client.Booking()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `any` | Booking data, which can be either a BookingOutput object, a RecurringBookingOutput object, or an array of RecurringBookingOutput objects |
| `error` | `Record<string, any>` |  |
| `id` | `string` |  |
| `pagination` | `Record<string, any>` |  |
| `status` | `string` |  |

#### Example: Load

```ts
const booking = await client.Booking().load({ id: 'booking_id' })
```

#### Example: List

```ts
const bookings = await client.Booking().list()
```

#### Example: Create

```ts
const booking = await client.Booking().create({
  data: 'example_data',
  pagination: {},
  status: 'example_status',
})
```


### Calendar

Create an instance: `const calendar = client.Calendar()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `connectedCalendars` | `any[]` |  |
| `destinationCalendar` | `Record<string, any>` |  |
| `id` | `string` |  |

#### Example: Load

```ts
const calendar = await client.Calendar().load({ id: 'calendar_id' })
```


### CalendarEvent

Create an instance: `const calendar_event = client.CalendarEvent()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attendees` | `any[]` | List of attendees with their response status |
| `calendarEventOwner` | `any` | The calendar account that owns this event. |
| `description` | `string` | Detailed description of the calendar event |
| `end` | `Record<string, any>` | End date and time of the calendar event with timezone information |
| `hosts` | `any[]` | Information about the event hosts (organizers) |
| `id` | `string` | Unique identifier of the calendar event |
| `locations` | `any[]` | Conference locations with entry points (video, phone, sip, more) |
| `source` | `string` | Calendar integration source (e.g., Google Calendar, Office 365, Apple Calendar). |
| `start` | `Record<string, any>` | Start date and time of the calendar event with timezone information |
| `status` | `string` | Status of the event (accepted, pending, declined, cancelled) |
| `title` | `string` | Title of the calendar event |

#### Example: Load

```ts
const calendar_event = await client.CalendarEvent().load({ id: 'calendar_event_id', calendar_provider: 'calendar_provider' })
```

#### Example: List

```ts
const calendar_events = await client.CalendarEvent().list({ calendar_provider: "example", from: "example", to: "example" })
```

#### Example: Create

```ts
const calendar_event = await client.CalendarEvent().create({
  calendar_provider: 'example_calendar_provider',
  end: {},
  id: 'example_id',
  source: 'example_source',
  start: {},
  title: 'example_title',
})
```


### Conferencing

Create an instance: `const conferencing = client.Conferencing()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number` | Id of the conferencing app credentials |
| `invalid` | `boolean` | Whether if the connection is working or not. |
| `type` | `string` | Type of conferencing app |
| `userId` | `number` | Id of the user associated to the conferencing app |

#### Example: List

```ts
const conferencings = await client.Conferencing().list()
```


### DestinationCalendar

Create an instance: `const destination_calendar = client.DestinationCalendar()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `credentialId` | `number` |  |
| `delegationCredentialId` | `string` |  |
| `externalId` | `string` | Unique identifier used to represent the specific calendar, as returned by the /calendars endpoint |
| `integration` | `string` | The calendar service you want to integrate, as returned by the /calendars endpoint |
| `userId` | `number` |  |


### EventType

Create an instance: `const event_type = client.EventType()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `afterEventBuffer` | `number` | Extra time automatically blocked on your calendar after a meeting ends. |
| `allowReschedulingCancelledBookings` | `boolean` | When enabled, users will be able to create a new booking when trying to reschedule a cancelled booking. |
| `allowReschedulingPastBookings` | `boolean` | Enabling this option allows for past events to be rescheduled. |
| `beforeEventBuffer` | `number` | Extra time automatically blocked on your calendar before a meeting starts. |
| `bookerActiveBookingsLimit` | `any` | Limit the number of active bookings a booker can make for this event type. |
| `bookerLayouts` | `any` | Should booker have week, month or column view. |
| `bookingFields` | `any[]` | Custom fields that can be added to the booking form when the event is booked by someone. |
| `bookingLimitsCount` | `any` | Limit how many times this event can be booked |
| `bookingLimitsDuration` | `any` | Limit total amount of time that this event can be booked |
| `bookingRequiresAuthentication` | `boolean` | Boolean to require authentication for booking this event type via api. |
| `bookingUrl` | `string` | Full URL to the booking page for this event type |
| `bookingWindow` | `any` | Limit how far in the future this event can be booked |
| `calVideoSettings` | `any` | Cal video settings for the event type. |
| `color` | `Record<string, any>` |  |
| `confirmationPolicy` | `any` | Specify how the booking needs to be manually confirmed before it is pushed to the integrations and a confirmation mail is sent. |
| `currency` | `string` |  |
| `customName` | `string` | Customizable event name with valid variables: {Event type title}, {Organiser}, {Scheduler}, {Location}, {Organiser first name}, {Scheduler first name}, {Scheduler last name}, {Event duration}, {LOCATION}, {HOST/ATTENDEE}, {HOST}, {ATTENDEE… |
| `description` | `string` |  |
| `destinationCalendar` | `Record<string, any>` |  |
| `disableCancelling` | `any` | Settings for disabling cancelling of this event type. |
| `disableGuests` | `boolean` | If true, person booking this event can't add guests via their emails. |
| `disableRescheduling` | `any` | Settings for disabling rescheduling of this event type. |
| `forwardParamsSuccessRedirect` | `Record<string, any>` |  |
| `hidden` | `boolean` |  |
| `hideCalendarEventDetails` | `boolean` |  |
| `hideCalendarNotes` | `boolean` |  |
| `hideOrganizerEmail` | `boolean` | Boolean to Hide organizer's email address from the booking screen, email notifications, and calendar events |
| `id` | `number` |  |
| `interfaceLanguage` | `string` | Set preferred language for the booking interface. |
| `isInstantEvent` | `boolean` |  |
| `lengthInMinutes` | `number` |  |
| `lengthInMinutesOptions` | `any[]` | If you want that user can choose between different lengths of the event you can specify them here. |
| `locations` | `any[]` | Locations where the event will take place. |
| `lockTimeZoneToggleOnBookingPage` | `boolean` |  |
| `metadata` | `Record<string, any>` |  |
| `minimumBookingNotice` | `number` | Minimum number of minutes before the event that a booking can be made. |
| `offsetStart` | `number` | Offset timeslots shown to bookers by a specified number of minutes |
| `onlyShowFirstAvailableSlot` | `boolean` | This will limit your availability for this event type to one slot per day, scheduled at the earliest available time. |
| `ownerId` | `number` |  |
| `price` | `number` |  |
| `recurrence` | `any` | Create a recurring event type. |
| `requiresBookerEmailVerification` | `boolean` |  |
| `scheduleId` | `number` | If you want that this event has different schedule than user's default one you can specify it here. |
| `seats` | `any` | Create an event type with multiple seats. |
| `seatsPerTimeSlot` | `Record<string, any>` |  |
| `seatsShowAvailabilityCount` | `boolean` |  |
| `showOptimizedSlots` | `boolean` | Arrange time slots to optimize availability. |
| `slotInterval` | `number` | Number representing length of each slot when event is booked. |
| `slug` | `string` |  |
| `successRedirectUrl` | `string` | A valid URL where the booker will redirect to, once the booking is completed successfully |
| `title` | `string` |  |
| `useDestinationCalendarEmail` | `boolean` |  |
| `users` | `any[]` |  |

#### Example: Load

```ts
const event_type = await client.EventType().load({ id: 'event_type_id' })
```

#### Example: List

```ts
const event_types = await client.EventType().list()
```

#### Example: Create

```ts
const event_type = await client.EventType().create({
  bookingUrl: 'example_bookingUrl',
  color: {},
  currency: 'example_currency',
  destinationCalendar: {},
  forwardParamsSuccessRedirect: {},
  id: 1,
  isInstantEvent: true,
  lengthInMinutes: 1,
  metadata: {},
  ownerId: 1,
  price: 1,
  slug: 'example_slug',
  title: 'example_title',
  users: [],
})
```


### EventTypeWebhook

Create an instance: `const event_type_webhook = client.EventTypeWebhook()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `boolean` |  |
| `eventTypeId` | `number` |  |
| `id` | `number` |  |
| `payloadTemplate` | `string` | The template of the payload that will be sent to the subscriberUrl, check cal.com/docs/core-features/webhooks for more information |
| `secret` | `string` |  |
| `subscriberUrl` | `string` |  |
| `triggers` | `any[]` |  |
| `version` | `string` | The version of the webhook |

#### Example: Load

```ts
const event_type_webhook = await client.EventTypeWebhook().load({ id: 'event_type_webhook_id', event_type_id: 1 })
```

#### Example: List

```ts
const event_type_webhooks = await client.EventTypeWebhook().list({ event_type_id: 1 })
```

#### Example: Create

```ts
const event_type_webhook = await client.EventTypeWebhook().create({
  event_type_id: 1,
  active: true,
  eventTypeId: 1,
  id: 1,
  payloadTemplate: 'example_payloadTemplate',
  subscriberUrl: 'example_subscriberUrl',
  triggers: [],
})
```


### ManagedUser

Create an instance: `const managed_user = client.ManagedUser()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `avatarUrl` | `string` | URL of the user's avatar image |
| `bio` | `string` | Bio |
| `createdDate` | `string` |  |
| `defaultScheduleId` | `number` |  |
| `email` | `string` |  |
| `id` | `number` |  |
| `locale` | `string` |  |
| `metadata` | `Record<string, any>` | You can store any additional data you want here. |
| `name` | `string` | Managed user's name is used in emails |
| `timeFormat` | `number` | Must be a number 12 or 24 |
| `timeZone` | `string` | Timezone is used to create user's default schedule from Monday to Friday from 9AM to 5PM. |
| `username` | `string` |  |
| `weekStart` | `string` |  |

#### Example: Load

```ts
const managed_user = await client.ManagedUser().load({ id: 1, oauth_client_id: 'oauth_client_id' })
```

#### Example: List

```ts
const managed_users = await client.ManagedUser().list({ oauth_client_id: "example" })
```

#### Example: Create

```ts
const managed_user = await client.ManagedUser().create({
  oauth_client_id: 'example_oauth_client_id',
  bio: 'example_bio',
  createdDate: 'example_createdDate',
  defaultScheduleId: 1,
  email: 'example_email',
  id: 1,
  name: 'example_name',
  timeFormat: 1,
  timeZone: 'example_timeZone',
  username: 'example_username',
  weekStart: 'example_weekStart',
})
```


### Me

Create an instance: `const me = client.Me()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `avatarUrl` | `string` | URL of the user's avatar image |
| `bio` | `string` | Bio |
| `defaultScheduleId` | `number` |  |
| `email` | `string` |  |
| `id` | `number` |  |
| `locale` | `string` |  |
| `metadata` | `Record<string, any>` | You can store any additional data you want here. |
| `name` | `string` |  |
| `organization` | `Record<string, any>` |  |
| `organizationId` | `number` |  |
| `timeFormat` | `number` | Must be 12 or 24 |
| `timeZone` | `string` |  |
| `username` | `string` |  |
| `weekStart` | `string` |  |

#### Example: Load

```ts
const me = await client.Me().load({ id: 1 })
```


### OauthClient

Create an instance: `const oauth_client = client.OauthClient()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `areCalendarEventsEnabled` | `boolean` | If true and if managed user has calendar connected, calendar events will be created. |
| `areDefaultEventTypesEnabled` | `boolean` | If enabled, when creating a managed user the managed user will have 4 default event types: 30 and 60 minutes without Cal video, 30 and 60 minutes with Cal video. |
| `areEmailsEnabled` | `boolean` |  |
| `bookingCancelRedirectUri` | `string` |  |
| `bookingRedirectUri` | `string` |  |
| `bookingRescheduleRedirectUri` | `string` |  |
| `createdAt` | `string` |  |
| `id` | `string` |  |
| `logo` | `Record<string, any>` |  |
| `name` | `string` |  |
| `organizationId` | `number` |  |
| `permissions` | `any[]` | Array of permission keys like ["BOOKING_READ", "BOOKING_WRITE"] |
| `redirectUris` | `any[]` |  |
| `secret` | `string` |  |

#### Example: Load

```ts
const oauth_client = await client.OauthClient().load({ id: 'oauth_client_id' })
```

#### Example: List

```ts
const oauth_clients = await client.OauthClient().list()
```

#### Example: Create

```ts
const oauth_client = await client.OauthClient().create({
  areCalendarEventsEnabled: true,
  areDefaultEventTypesEnabled: true,
  areEmailsEnabled: true,
  createdAt: 'example_createdAt',
  id: 'example_id',
  name: 'example_name',
  organizationId: 1,
  permissions: [],
  redirectUris: [],
  secret: 'example_secret',
})
```


### OauthClientWebhook

Create an instance: `const oauth_client_webhook = client.OauthClientWebhook()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `boolean` |  |
| `id` | `number` |  |
| `oAuthClientId` | `string` |  |
| `payloadTemplate` | `string` | The template of the payload that will be sent to the subscriberUrl, check cal.com/docs/core-features/webhooks for more information |
| `secret` | `string` |  |
| `subscriberUrl` | `string` |  |
| `triggers` | `any[]` |  |
| `version` | `string` | The version of the webhook |

#### Example: Load

```ts
const oauth_client_webhook = await client.OauthClientWebhook().load({ id: 'oauth_client_webhook_id', oauth_client_id: 'oauth_client_id' })
```

#### Example: List

```ts
const oauth_client_webhooks = await client.OauthClientWebhook().list({ oauth_client_id: "example" })
```

#### Example: Create

```ts
const oauth_client_webhook = await client.OauthClientWebhook().create({
  oauth_client_id: 'example_oauth_client_id',
  active: true,
  id: 1,
  oAuthClientId: 'example_oAuthClientId',
  payloadTemplate: 'example_payloadTemplate',
  subscriberUrl: 'example_subscriberUrl',
  triggers: [],
})
```


### OauthToken

Create an instance: `const oauth_token = client.OauthToken()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `string` | The access token |
| `expires_in` | `number` | The number of seconds until the access token expires |
| `refresh_token` | `string` | The refresh token |
| `token_type` | `string` | The token type |

#### Example: Create

```ts
const oauth_token = await client.OauthToken().create({
  access_token: 'example_access_token',
  expires_in: 1,
  refresh_token: 'example_refresh_token',
  token_type: 'example_token_type',
})
```


### PrivateLink

Create an instance: `const private_link = client.PrivateLink()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `any[]` | Array of private links for the event type (mix of time-based and usage-based) |
| `expiresAt` | `string` | Expiration date for time-based links |
| `id` | `string` |  |
| `maxUsageCount` | `number` | Maximum number of times the link can be used. |
| `status` | `string` | Response status |

#### Example: List

```ts
const private_links = await client.PrivateLink().list({ event_type_id: 1 })
```

#### Example: Create

```ts
const private_link = await client.PrivateLink().create({
  event_type_id: 1,
  data: [],
  status: 'example_status',
})
```


### Schedule

Create an instance: `const schedule = client.Schedule()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `availability` | `any[]` | Each object contains days and times when the user is available. |
| `data` | `any` |  |
| `error` | `Record<string, any>` |  |
| `id` | `number` |  |
| `isDefault` | `boolean` | Each user should have 1 default schedule. |
| `name` | `string` |  |
| `overrides` | `any[]` | Need to change availability for a specific date? |
| `ownerId` | `number` |  |
| `status` | `string` |  |
| `timeZone` | `string` | Timezone is used to calculate available times when an event using the schedule is booked. |

#### Example: Load

```ts
const schedule = await client.Schedule().load({ id: 1 })
```

#### Example: List

```ts
const schedules = await client.Schedule().list()
```

#### Example: Create

```ts
const schedule = await client.Schedule().create({
  data: 'example_data',
  id: 1,
  isDefault: true,
  name: 'example_name',
  ownerId: 1,
  status: 'example_status',
  timeZone: 'example_timeZone',
})
```


### SelectedCalendar

Create an instance: `const selected_calendar = client.SelectedCalendar()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `credentialId` | `number` |  |
| `delegationCredentialId` | `string` |  |
| `externalId` | `string` |  |
| `integration` | `string` |  |

#### Example: Create

```ts
const selected_calendar = await client.SelectedCalendar().create({
  credentialId: 1,
  externalId: 'example_externalId',
  integration: 'example_integration',
})
```


### Slot

Create an instance: `const slot = client.Slot()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const slot = await client.Slot().load({ end: 'end', start: 'start' })
```


### SlotReservation

Create an instance: `const slot_reservation = client.SlotReservation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `eventTypeId` | `number` | The ID of the event type for which slot should be reserved. |
| `id` | `string` |  |
| `reservationDuration` | `number` | ONLY for authenticated requests with api key, access token or OAuth credentials (ID + secret). |
| `reservationUid` | `string` | The unique identifier of the reservation. |
| `reservationUntil` | `string` | ISO 8601 datestring in UTC timezone representing time until which the slot is reserved. |
| `slotDuration` | `number` | By default slot duration is equal to event type length, but if you want to reserve a slot for an event type that has a variable length you can specify it here as a number in minutes. |
| `slotEnd` | `string` | ISO 8601 datestring in UTC timezone representing slot end. |
| `slotStart` | `string` | ISO 8601 datestring in UTC timezone representing available slot. |

#### Example: Load

```ts
const slot_reservation = await client.SlotReservation().load({ id: 'slot_reservation_id' })
```

#### Example: Create

```ts
const slot_reservation = await client.SlotReservation().create({
  eventTypeId: 1,
  reservationUid: 'example_reservationUid',
  reservationUntil: 'example_reservationUntil',
  slotEnd: 'example_slotEnd',
  slotStart: 'example_slotStart',
})
```


### Stripe

Create an instance: `const stripe = client.Stripe()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `authUrl` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```ts
const stripe = await client.Stripe().load({ code: 'code', state: 'state' })
```


### VerifiedEmail

Create an instance: `const verified_email = client.VerifiedEmail()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` | The verified email address. |
| `id` | `number` | The unique identifier for the verified email. |
| `userId` | `number` | The ID of the associated user, if applicable. |

#### Example: Load

```ts
const verified_email = await client.VerifiedEmail().load({ id: 1 })
```

#### Example: List

```ts
const verified_emails = await client.VerifiedEmail().list()
```


### VerifiedPhone

Create an instance: `const verified_phone = client.VerifiedPhone()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number` | The unique identifier for the verified email. |
| `phoneNumber` | `string` | The verified phone number. |
| `userId` | `number` | The ID of the associated user, if applicable. |

#### Example: Load

```ts
const verified_phone = await client.VerifiedPhone().load({ id: 1 })
```

#### Example: List

```ts
const verified_phones = await client.VerifiedPhone().list()
```


### Webhook

Create an instance: `const webhook = client.Webhook()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `boolean` |  |
| `id` | `number` |  |
| `payloadTemplate` | `string` | The template of the payload that will be sent to the subscriberUrl, check cal.com/docs/core-features/webhooks for more information |
| `secret` | `string` |  |
| `subscriberUrl` | `string` |  |
| `triggers` | `any[]` |  |
| `userId` | `number` |  |
| `version` | `string` | The version of the webhook |

#### Example: Load

```ts
const webhook = await client.Webhook().load({ id: 'webhook_id' })
```

#### Example: List

```ts
const webhooks = await client.Webhook().list()
```

#### Example: Create

```ts
const webhook = await client.Webhook().create({
  active: true,
  id: 1,
  payloadTemplate: 'example_payloadTemplate',
  subscriberUrl: 'example_subscriberUrl',
  triggers: [],
  userId: 1,
})
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | Test transport |

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Open types

4 fields are carried as open values rather than typed structures.
This follows from the API definition, not from a gap in this SDK: the
definition describes them with untagged unions —
`oneOf`/`anyOf` branches with no `discriminator` — so it never states which
variant a given value is. Nothing can select a branch reliably, so the SDK
passes the value through unchanged rather than assert a shape the API does not
guarantee.

| Entity | Field | Variants | Nesting |
| --- | --- | --- | --- |
| `event_type` | `bookingFields` | 19 | 1 level |
| `event_type` | `locations` | 7 | 1 level |
| `booking` | `data` | 6 | 0 levels |
| `event_type` | `bookingWindow` | 4 | 0 levels |

These values round-trip unchanged — read them, modify them, send them back. If
the API adds a `discriminator` to the definition, regenerating will type them.
Every other field is typed normally.

## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
cal/
├── src/
│   ├── CalSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { CalSDK } from '@voxgig-sdk/cal-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const booking = client.Booking()
await booking.list()

// booking.data() now returns the booking data from the last `list`
// booking.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
