# Cal TypeScript SDK Reference

Complete API reference for the Cal TypeScript SDK.


## CalSDK

### Constructor

```ts
new CalSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CalSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = CalSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `CalSDK` instance in test mode.


### Instance Methods

#### `ApiKey(data?: object)`

Create a new `ApiKey` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiKeyEntity` instance.

#### `Attendee(data?: object)`

Create a new `Attendee` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AttendeeEntity` instance.

#### `Booking(data?: object)`

Create a new `Booking` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BookingEntity` instance.

#### `Calendar(data?: object)`

Create a new `Calendar` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CalendarEntity` instance.

#### `CalendarEvent(data?: object)`

Create a new `CalendarEvent` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CalendarEventEntity` instance.

#### `Conferencing(data?: object)`

Create a new `Conferencing` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ConferencingEntity` instance.

#### `DestinationCalendar(data?: object)`

Create a new `DestinationCalendar` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DestinationCalendarEntity` instance.

#### `EventType(data?: object)`

Create a new `EventType` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EventTypeEntity` instance.

#### `EventTypeWebhook(data?: object)`

Create a new `EventTypeWebhook` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EventTypeWebhookEntity` instance.

#### `ManagedUser(data?: object)`

Create a new `ManagedUser` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ManagedUserEntity` instance.

#### `Me(data?: object)`

Create a new `Me` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MeEntity` instance.

#### `OauthClient(data?: object)`

Create a new `OauthClient` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OauthClientEntity` instance.

#### `OauthClientWebhook(data?: object)`

Create a new `OauthClientWebhook` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OauthClientWebhookEntity` instance.

#### `OauthToken(data?: object)`

Create a new `OauthToken` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OauthTokenEntity` instance.

#### `PrivateLink(data?: object)`

Create a new `PrivateLink` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PrivateLinkEntity` instance.

#### `Schedule(data?: object)`

Create a new `Schedule` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ScheduleEntity` instance.

#### `SelectedCalendar(data?: object)`

Create a new `SelectedCalendar` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SelectedCalendarEntity` instance.

#### `Slot(data?: object)`

Create a new `Slot` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SlotEntity` instance.

#### `SlotReservation(data?: object)`

Create a new `SlotReservation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SlotReservationEntity` instance.

#### `Stripe(data?: object)`

Create a new `Stripe` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StripeEntity` instance.

#### `VerifiedEmail(data?: object)`

Create a new `VerifiedEmail` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VerifiedEmailEntity` instance.

#### `VerifiedPhone(data?: object)`

Create a new `VerifiedPhone` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VerifiedPhoneEntity` instance.

#### `Webhook(data?: object)`

Create a new `Webhook` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WebhookEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `CalSDK.test()`.

**Returns:** `CalSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## ApiKeyEntity

```ts
const api_key = client.ApiKey()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apiKey` | `string` | Yes |  |
| `apiKeyDaysValid` | `number` | No | For how many days is managed organization api key valid. |
| `apiKeyNeverExpires` | `boolean` | No | If true, organization api key never expires. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ApiKey().create({
  apiKey: 'example_apiKey',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiKeyEntity` instance with the same client and
options.

#### `client()`

Return the parent `CalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AttendeeEntity

```ts
const attendee = client.Attendee()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `absent` | `boolean` | Yes |  |
| `displayEmail` | `string` | Yes | Clean email for display purposes |
| `email` | `string` | Yes | The email of the attendee. |
| `id` | `number` | Yes |  |
| `language` | `string` | No | The preferred language of the attendee. |
| `name` | `string` | Yes | The name of the attendee. |
| `phoneNumber` | `string` | No | The phone number of the attendee in international format. |
| `timeZone` | `string` | Yes | The time zone of the attendee. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Attendee().create({
  booking_id: 'example_booking_id',
  absent: true,
  displayEmail: 'example_displayEmail',
  email: 'example_email',
  id: 1,
  name: 'example_name',
  timeZone: 'example_timeZone',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Attendee().list({ booking_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Attendee().load({ id: 1, booking_id: 'booking_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Attendee().remove({ id: 1, booking_id: 'booking_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AttendeeEntity` instance with the same client and
options.

#### `client()`

Return the parent `CalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BookingEntity

```ts
const booking = client.Booking()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `any` | Yes | Booking data, which can be either a BookingOutput object, a RecurringBookingOutput object, or an array of RecurringBookingOutput objects |
| `error` | `Record<string, any>` | No |  |
| `id` | `string` | No |  |
| `pagination` | `Record<string, any>` | Yes |  |
| `status` | `string` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `cancel` | `/v2/bookings/{bookingUid}/cancel` | `client.Booking().create({ $action: 'cancel', ... })` |
| `confirm` | `/v2/bookings/{bookingUid}/confirm` | `client.Booking().create({ $action: 'confirm', ... })` |
| `decline` | `/v2/bookings/{bookingUid}/decline` | `client.Booking().create({ $action: 'decline', ... })` |
| `guests` | `/v2/bookings/{bookingUid}/guests` | `client.Booking().create({ $action: 'guests', ... })` |
| `mark_absent` | `/v2/bookings/{bookingUid}/mark-absent` | `client.Booking().create({ $action: 'mark_absent', ... })` |
| `reassign` | `/v2/bookings/{bookingUid}/reassign/{userId}` | `client.Booking().create({ $action: 'reassign', ... })` |
| `reassign` | `/v2/bookings/{bookingUid}/reassign` | `client.Booking().create({ $action: 'reassign', ... })` |
| `reschedule` | `/v2/bookings/{bookingUid}/reschedule` | `client.Booking().create({ $action: 'reschedule', ... })` |
| `calendar_links` | `/v2/bookings/{bookingUid}/calendar-links` | `client.Booking().list({ $action: 'calendar_links', ... })` |
| `conferencing-sessions` | `/v2/bookings/{bookingUid}/conferencing-sessions` | `client.Booking().list({ $action: 'conferencing-sessions', ... })` |
| `recordings` | `/v2/bookings/{bookingUid}/recordings` | `client.Booking().list({ $action: 'recordings', ... })` |
| `references` | `/v2/bookings/{bookingUid}/references` | `client.Booking().list({ $action: 'references', ... })` |
| `transcripts` | `/v2/bookings/{bookingUid}/transcripts` | `client.Booking().list({ $action: 'transcripts', ... })` |
| `by_seat` | `/v2/bookings/by-seat/{seatUid}` | `client.Booking().load({ $action: 'by_seat', ... })` |
| `location` | `/v2/bookings/{bookingUid}/location` | `client.Booking().update({ $action: 'location', ... })` |

An action returns that action's OWN response, which is not necessarily a
Booking record — check the API definition for its shape.

```ts
const result = await client.Booking().create({
  $action: 'cancel',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Booking().create({
  data: 'example_data',
  pagination: {},
  status: 'example_status',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Booking().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Booking().load({ id: 'booking_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Booking().update({
  id: 'booking_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BookingEntity` instance with the same client and
options.

#### `client()`

Return the parent `CalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CalendarEntity

```ts
const calendar = client.Calendar()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `connectedCalendars` | `any[]` | Yes |  |
| `destinationCalendar` | `Record<string, any>` | Yes |  |
| `id` | `string` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `credential` | `/v2/calendars/{calendar}/credentials` | `client.Calendar().create({ $action: 'credential', ... })` |
| `disconnect` | `/v2/calendars/{calendar}/disconnect` | `client.Calendar().create({ $action: 'disconnect', ... })` |
| `save_ics_feed` | `/v2/calendars/ics-feed/save` | `client.Calendar().create({ $action: 'save_ics_feed', ... })` |
| `busy_times` | `/v2/calendars/busy-times` | `client.Calendar().list({ $action: 'busy_times', ... })` |
| `freebusy` | `/v2/calendars/{calendar}/freebusy` | `client.Calendar().list({ $action: 'freebusy', ... })` |
| `freebusy` | `/v2/calendars/connections/{connectionId}/freebusy` | `client.Calendar().list({ $action: 'freebusy', ... })` |
| `check` | `/v2/calendars/{calendar}/check` | `client.Calendar().load({ $action: 'check', ... })` |
| `check_ics_feed` | `/v2/calendars/ics-feed/check` | `client.Calendar().load({ $action: 'check_ics_feed', ... })` |
| `connect` | `/v2/calendars/{calendar}/connect` | `client.Calendar().load({ $action: 'connect', ... })` |
| `connections` | `/v2/calendars/connections` | `client.Calendar().load({ $action: 'connections', ... })` |
| `save` | `/v2/calendars/{calendar}/save` | `client.Calendar().load({ $action: 'save', ... })` |

An action returns that action's OWN response, which is not necessarily a
Calendar record — check the API definition for its shape.

```ts
const result = await client.Calendar().create({
  $action: 'credential',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Calendar().load({ id: 'calendar_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CalendarEntity` instance with the same client and
options.

#### `client()`

Return the parent `CalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CalendarEventEntity

```ts
const calendar_event = client.CalendarEvent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attendees` | `any[]` | No | List of attendees with their response status |
| `calendarEventOwner` | `any` | No | The calendar account that owns this event. |
| `description` | `string` | No | Detailed description of the calendar event |
| `end` | `Record<string, any>` | Yes | End date and time of the calendar event with timezone information |
| `hosts` | `any[]` | No | Information about the event hosts (organizers) |
| `id` | `string` | Yes | Unique identifier of the calendar event |
| `locations` | `any[]` | No | Conference locations with entry points (video, phone, sip, more) |
| `source` | `string` | Yes | Calendar integration source (e.g., Google Calendar, Office 365, Apple Calendar). |
| `start` | `Record<string, any>` | Yes | Start date and time of the calendar event with timezone information |
| `status` | `string` | No | Status of the event (accepted, pending, declined, cancelled) |
| `title` | `string` | Yes | Title of the calendar event |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `attendees` | - | - | - | - | - |
| `calendarEventOwner` | - | - | - | - | - |
| `description` | - | - | - | - | - |
| `end` | - | - | - | Yes | - |
| `hosts` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `locations` | - | - | - | - | - |
| `source` | - | - | - | - | - |
| `start` | - | - | - | Yes | - |
| `status` | - | - | - | - | - |
| `title` | - | - | - | Yes | - |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `connection` | `/v2/calendars/connections/{connectionId}/events` | `client.CalendarEvent().create({ $action: 'connection', ... })` |
| `connection` | `/v2/calendars/connections/{connectionId}/events` | `client.CalendarEvent().list({ $action: 'connection', ... })` |
| `connection` | `/v2/calendars/connections/{connectionId}/events/{eventId}` | `client.CalendarEvent().load({ $action: 'connection', ... })` |
| `legacy` | `/v2/calendars/{calendar}/event/{eventUid}` | `client.CalendarEvent().load({ $action: 'legacy', ... })` |
| `connection` | `/v2/calendars/connections/{connectionId}/events/{eventId}` | `client.CalendarEvent().remove({ $action: 'connection', ... })` |
| `connection` | `/v2/calendars/connections/{connectionId}/events/{eventId}` | `client.CalendarEvent().update({ $action: 'connection', ... })` |
| `legacy` | `/v2/calendars/{calendar}/event/{eventUid}` | `client.CalendarEvent().update({ $action: 'legacy', ... })` |

An action returns that action's OWN response, which is not necessarily a
CalendarEvent record — check the API definition for its shape.

```ts
const result = await client.CalendarEvent().create({
  $action: 'connection',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.CalendarEvent().create({
  calendar_provider: 'example_calendar_provider',
  end: {},
  id: 'example_id',
  source: 'example_source',
  start: {},
  title: 'example_title',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.CalendarEvent().list({ calendar_provider: "example", from: "example", to: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.CalendarEvent().load({ id: 'calendar_event_id', calendar_provider: 'calendar_provider' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.CalendarEvent().remove({ id: 'calendar_event_id', calendar_provider: 'calendar_provider' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.CalendarEvent().update({
  id: 'calendar_event_id',
  calendar_provider: 'calendar_provider',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CalendarEventEntity` instance with the same client and
options.

#### `client()`

Return the parent `CalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ConferencingEntity

```ts
const conferencing = client.Conferencing()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `number` | Yes | Id of the conferencing app credentials |
| `invalid` | `boolean` | No | Whether if the connection is working or not. |
| `type` | `string` | Yes | Type of conferencing app |
| `userId` | `number` | Yes | Id of the user associated to the conferencing app |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `connect` | `/v2/conferencing/{app}/connect` | `client.Conferencing().create({ $action: 'connect', ... })` |
| `default` | `/v2/conferencing/{app}/default` | `client.Conferencing().create({ $action: 'default', ... })` |
| `default` | `/v2/conferencing/default` | `client.Conferencing().load({ $action: 'default', ... })` |
| `oauth` | `/v2/conferencing/{app}/oauth/auth-url` | `client.Conferencing().load({ $action: 'oauth', ... })` |
| `oauth_callback` | `/v2/conferencing/{app}/oauth/callback` | `client.Conferencing().load({ $action: 'oauth_callback', ... })` |
| `disconnect` | `/v2/conferencing/{app}/disconnect` | `client.Conferencing().remove({ $action: 'disconnect', ... })` |

An action returns that action's OWN response, which is not necessarily a
Conferencing record — check the API definition for its shape.

```ts
const result = await client.Conferencing().create({
  $action: 'connect',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Conferencing().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Conferencing().remove({ app: 'app' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ConferencingEntity` instance with the same client and
options.

#### `client()`

Return the parent `CalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DestinationCalendarEntity

```ts
const destination_calendar = client.DestinationCalendar()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `credentialId` | `number` | Yes |  |
| `delegationCredentialId` | `string` | No |  |
| `externalId` | `string` | Yes | Unique identifier used to represent the specific calendar, as returned by the /calendars endpoint |
| `integration` | `string` | Yes | The calendar service you want to integrate, as returned by the /calendars endpoint |
| `userId` | `number` | Yes |  |

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.DestinationCalendar().update({
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DestinationCalendarEntity` instance with the same client and
options.

#### `client()`

Return the parent `CalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EventTypeEntity

```ts
const event_type = client.EventType()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `afterEventBuffer` | `number` | No | Extra time automatically blocked on your calendar after a meeting ends. |
| `allowReschedulingCancelledBookings` | `boolean` | No | When enabled, users will be able to create a new booking when trying to reschedule a cancelled booking. |
| `allowReschedulingPastBookings` | `boolean` | No | Enabling this option allows for past events to be rescheduled. |
| `beforeEventBuffer` | `number` | No | Extra time automatically blocked on your calendar before a meeting starts. |
| `bookerActiveBookingsLimit` | `any` | No | Limit the number of active bookings a booker can make for this event type. |
| `bookerLayouts` | `any` | No | Should booker have week, month or column view. |
| `bookingFields` | `any[]` | No | Custom fields that can be added to the booking form when the event is booked by someone. |
| `bookingLimitsCount` | `any` | No | Limit how many times this event can be booked |
| `bookingLimitsDuration` | `any` | No | Limit total amount of time that this event can be booked |
| `bookingRequiresAuthentication` | `boolean` | No | Boolean to require authentication for booking this event type via api. |
| `bookingUrl` | `string` | Yes | Full URL to the booking page for this event type |
| `bookingWindow` | `any` | No | Limit how far in the future this event can be booked |
| `calVideoSettings` | `any` | No | Cal video settings for the event type. |
| `color` | `Record<string, any>` | Yes |  |
| `confirmationPolicy` | `any` | No | Specify how the booking needs to be manually confirmed before it is pushed to the integrations and a confirmation mail is sent. |
| `currency` | `string` | Yes |  |
| `customName` | `string` | No | Customizable event name with valid variables: {Event type title}, {Organiser}, {Scheduler}, {Location}, {Organiser first name}, {Scheduler first name}, {Scheduler last name}, {Event duration}, {LOCATION}, {HOST/ATTENDEE}, {HOST}, {ATTENDEE… |
| `description` | `string` | No |  |
| `destinationCalendar` | `Record<string, any>` | Yes |  |
| `disableCancelling` | `any` | No | Settings for disabling cancelling of this event type. |
| `disableGuests` | `boolean` | No | If true, person booking this event can't add guests via their emails. |
| `disableRescheduling` | `any` | No | Settings for disabling rescheduling of this event type. |
| `forwardParamsSuccessRedirect` | `Record<string, any>` | Yes |  |
| `hidden` | `boolean` | No |  |
| `hideCalendarEventDetails` | `boolean` | No |  |
| `hideCalendarNotes` | `boolean` | No |  |
| `hideOrganizerEmail` | `boolean` | No | Boolean to Hide organizer's email address from the booking screen, email notifications, and calendar events |
| `id` | `number` | Yes |  |
| `interfaceLanguage` | `string` | No | Set preferred language for the booking interface. |
| `isInstantEvent` | `boolean` | Yes |  |
| `lengthInMinutes` | `number` | Yes |  |
| `lengthInMinutesOptions` | `any[]` | No | If you want that user can choose between different lengths of the event you can specify them here. |
| `locations` | `any[]` | No | Locations where the event will take place. |
| `lockTimeZoneToggleOnBookingPage` | `boolean` | No |  |
| `metadata` | `Record<string, any>` | Yes |  |
| `minimumBookingNotice` | `number` | No | Minimum number of minutes before the event that a booking can be made. |
| `offsetStart` | `number` | No | Offset timeslots shown to bookers by a specified number of minutes |
| `onlyShowFirstAvailableSlot` | `boolean` | No | This will limit your availability for this event type to one slot per day, scheduled at the earliest available time. |
| `ownerId` | `number` | Yes |  |
| `price` | `number` | Yes |  |
| `recurrence` | `any` | No | Create a recurring event type. |
| `requiresBookerEmailVerification` | `boolean` | No |  |
| `scheduleId` | `number` | No | If you want that this event has different schedule than user's default one you can specify it here. |
| `seats` | `any` | No | Create an event type with multiple seats. |
| `seatsPerTimeSlot` | `Record<string, any>` | No |  |
| `seatsShowAvailabilityCount` | `boolean` | No |  |
| `showOptimizedSlots` | `boolean` | No | Arrange time slots to optimize availability. |
| `slotInterval` | `number` | No | Number representing length of each slot when event is booked. |
| `slug` | `string` | Yes |  |
| `successRedirectUrl` | `string` | No | A valid URL where the booker will redirect to, once the booking is completed successfully |
| `title` | `string` | Yes |  |
| `useDestinationCalendarEmail` | `boolean` | No |  |
| `users` | `any[]` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `afterEventBuffer` | - | - | - | - | - |
| `allowReschedulingCancelledBookings` | - | - | - | - | - |
| `allowReschedulingPastBookings` | - | - | - | - | - |
| `beforeEventBuffer` | - | - | - | - | - |
| `bookerActiveBookingsLimit` | - | - | - | - | - |
| `bookerLayouts` | - | Yes | - | Yes | - |
| `bookingFields` | - | Yes | - | Yes | - |
| `bookingLimitsCount` | - | - | - | - | - |
| `bookingLimitsDuration` | - | - | - | - | - |
| `bookingRequiresAuthentication` | - | Yes | - | Yes | - |
| `bookingUrl` | - | - | - | - | - |
| `bookingWindow` | - | - | - | - | - |
| `calVideoSettings` | - | - | - | - | - |
| `color` | - | - | - | - | - |
| `confirmationPolicy` | - | - | - | - | - |
| `currency` | - | - | - | - | - |
| `customName` | - | - | - | - | - |
| `description` | - | Yes | - | Yes | - |
| `destinationCalendar` | - | - | - | - | - |
| `disableCancelling` | - | - | - | - | - |
| `disableGuests` | - | Yes | - | Yes | - |
| `disableRescheduling` | - | - | - | - | - |
| `forwardParamsSuccessRedirect` | - | - | - | - | - |
| `hidden` | - | Yes | - | Yes | - |
| `hideCalendarEventDetails` | - | - | - | - | - |
| `hideCalendarNotes` | - | - | - | - | - |
| `hideOrganizerEmail` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `interfaceLanguage` | - | - | - | - | - |
| `isInstantEvent` | - | - | - | - | - |
| `lengthInMinutes` | - | - | - | Yes | - |
| `lengthInMinutesOptions` | - | - | - | - | - |
| `locations` | - | Yes | - | Yes | - |
| `lockTimeZoneToggleOnBookingPage` | - | Yes | - | Yes | - |
| `metadata` | - | - | - | - | - |
| `minimumBookingNotice` | - | - | - | - | - |
| `offsetStart` | - | - | - | - | - |
| `onlyShowFirstAvailableSlot` | - | - | - | - | - |
| `ownerId` | - | - | - | - | - |
| `price` | - | - | - | - | - |
| `recurrence` | - | Yes | - | Yes | - |
| `requiresBookerEmailVerification` | - | - | - | - | - |
| `scheduleId` | - | Yes | - | Yes | - |
| `seats` | - | Yes | - | Yes | - |
| `seatsPerTimeSlot` | - | - | - | - | - |
| `seatsShowAvailabilityCount` | - | - | - | - | - |
| `showOptimizedSlots` | - | - | - | - | - |
| `slotInterval` | - | - | - | - | - |
| `slug` | - | - | - | Yes | - |
| `successRedirectUrl` | - | Yes | - | Yes | - |
| `title` | - | - | - | Yes | - |
| `useDestinationCalendarEmail` | - | - | - | - | - |
| `users` | - | - | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.EventType().create({
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.EventType().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.EventType().load({ id: 'event_type_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.EventType().remove({ id: 1 })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.EventType().update({
  id: 1,
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EventTypeEntity` instance with the same client and
options.

#### `client()`

Return the parent `CalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EventTypeWebhookEntity

```ts
const event_type_webhook = client.EventTypeWebhook()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `boolean` | Yes |  |
| `eventTypeId` | `number` | Yes |  |
| `id` | `number` | Yes |  |
| `payloadTemplate` | `string` | Yes | The template of the payload that will be sent to the subscriberUrl, check cal.com/docs/core-features/webhooks for more information |
| `secret` | `string` | No |  |
| `subscriberUrl` | `string` | Yes |  |
| `triggers` | `any[]` | Yes |  |
| `version` | `string` | No | The version of the webhook |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `active` | - | - | - | Yes | - |
| `eventTypeId` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `payloadTemplate` | - | - | Yes | Yes | - |
| `secret` | - | - | - | - | - |
| `subscriberUrl` | - | - | - | Yes | - |
| `triggers` | - | - | - | Yes | - |
| `version` | - | - | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.EventTypeWebhook().create({
  event_type_id: 1,
  active: true,
  eventTypeId: 1,
  id: 1,
  payloadTemplate: 'example_payloadTemplate',
  subscriberUrl: 'example_subscriberUrl',
  triggers: [],
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.EventTypeWebhook().list({ event_type_id: 1 })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.EventTypeWebhook().load({ id: 'event_type_webhook_id', event_type_id: 1 })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.EventTypeWebhook().remove({ id: 'event_type_webhook_id', event_type_id: 1 })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.EventTypeWebhook().update({
  id: 'event_type_webhook_id',
  event_type_id: 1,
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EventTypeWebhookEntity` instance with the same client and
options.

#### `client()`

Return the parent `CalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ManagedUserEntity

```ts
const managed_user = client.ManagedUser()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatarUrl` | `string` | No | URL of the user's avatar image |
| `bio` | `string` | Yes | Bio |
| `createdDate` | `string` | Yes |  |
| `defaultScheduleId` | `number` | Yes |  |
| `email` | `string` | Yes |  |
| `id` | `number` | Yes |  |
| `locale` | `string` | No |  |
| `metadata` | `Record<string, any>` | No | You can store any additional data you want here. |
| `name` | `string` | Yes | Managed user's name is used in emails |
| `timeFormat` | `number` | Yes | Must be a number 12 or 24 |
| `timeZone` | `string` | Yes | Timezone is used to create user's default schedule from Monday to Friday from 9AM to 5PM. |
| `username` | `string` | Yes |  |
| `weekStart` | `string` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `avatarUrl` | - | - | - | - | - |
| `bio` | - | - | Yes | Yes | - |
| `createdDate` | - | - | - | - | - |
| `defaultScheduleId` | - | - | - | Yes | - |
| `email` | - | - | - | Yes | - |
| `id` | - | - | - | - | - |
| `locale` | - | - | - | - | - |
| `metadata` | - | - | - | - | - |
| `name` | - | - | - | Yes | - |
| `timeFormat` | - | - | Yes | Yes | - |
| `timeZone` | - | - | Yes | Yes | - |
| `username` | - | - | - | - | - |
| `weekStart` | - | - | Yes | Yes | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ManagedUser().create({
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ManagedUser().list({ oauth_client_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ManagedUser().load({ id: 1, oauth_client_id: 'oauth_client_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ManagedUser().remove({ id: 1, oauth_client_id: 'oauth_client_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ManagedUser().update({
  id: 1,
  oauth_client_id: 'oauth_client_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ManagedUserEntity` instance with the same client and
options.

#### `client()`

Return the parent `CalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MeEntity

```ts
const me = client.Me()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatarUrl` | `string` | Yes | URL of the user's avatar image |
| `bio` | `string` | Yes | Bio |
| `defaultScheduleId` | `number` | Yes |  |
| `email` | `string` | Yes |  |
| `id` | `number` | Yes |  |
| `locale` | `string` | No |  |
| `metadata` | `Record<string, any>` | No | You can store any additional data you want here. |
| `name` | `string` | Yes |  |
| `organization` | `Record<string, any>` | Yes |  |
| `organizationId` | `number` | Yes |  |
| `timeFormat` | `number` | Yes | Must be 12 or 24 |
| `timeZone` | `string` | Yes |  |
| `username` | `string` | Yes |  |
| `weekStart` | `string` | Yes |  |

### Field Usage by Operation

| Field | load | update |
| --- | --- | --- |
| `avatarUrl` | - | Yes |
| `bio` | - | Yes |
| `defaultScheduleId` | - | Yes |
| `email` | - | Yes |
| `id` | - | - |
| `locale` | - | - |
| `metadata` | - | - |
| `name` | - | Yes |
| `organization` | - | - |
| `organizationId` | - | - |
| `timeFormat` | - | Yes |
| `timeZone` | - | Yes |
| `username` | - | - |
| `weekStart` | - | Yes |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Me().load({ id: 1 })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Me().update({
  id: 1,
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MeEntity` instance with the same client and
options.

#### `client()`

Return the parent `CalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OauthClientEntity

```ts
const oauth_client = client.OauthClient()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `areCalendarEventsEnabled` | `boolean` | Yes | If true and if managed user has calendar connected, calendar events will be created. |
| `areDefaultEventTypesEnabled` | `boolean` | Yes | If enabled, when creating a managed user the managed user will have 4 default event types: 30 and 60 minutes without Cal video, 30 and 60 minutes with Cal video. |
| `areEmailsEnabled` | `boolean` | Yes |  |
| `bookingCancelRedirectUri` | `string` | No |  |
| `bookingRedirectUri` | `string` | No |  |
| `bookingRescheduleRedirectUri` | `string` | No |  |
| `createdAt` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `logo` | `Record<string, any>` | No |  |
| `name` | `string` | Yes |  |
| `organizationId` | `number` | Yes |  |
| `permissions` | `any[]` | Yes | Array of permission keys like ["BOOKING_READ", "BOOKING_WRITE"] |
| `redirectUris` | `any[]` | Yes |  |
| `secret` | `string` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `areCalendarEventsEnabled` | - | - | Yes | Yes | - |
| `areDefaultEventTypesEnabled` | - | - | Yes | Yes | - |
| `areEmailsEnabled` | - | - | Yes | Yes | - |
| `bookingCancelRedirectUri` | - | - | - | - | - |
| `bookingRedirectUri` | - | - | - | - | - |
| `bookingRescheduleRedirectUri` | - | - | - | - | - |
| `createdAt` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `logo` | - | - | - | - | - |
| `name` | - | - | - | Yes | - |
| `organizationId` | - | - | - | - | - |
| `permissions` | - | - | - | - | - |
| `redirectUris` | - | - | - | Yes | - |
| `secret` | - | - | - | - | - |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `oauth2` | `/v2/auth/oauth2/clients/{clientId}` | `client.OauthClient().load({ $action: 'oauth2', ... })` |

An action returns that action's OWN response, which is not necessarily a
OauthClient record — check the API definition for its shape.

```ts
const result = await client.OauthClient().load({
  $action: 'oauth2',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.OauthClient().create({
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.OauthClient().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.OauthClient().load({ id: 'oauth_client_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.OauthClient().remove({ id: 'oauth_client_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.OauthClient().update({
  id: 'oauth_client_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OauthClientEntity` instance with the same client and
options.

#### `client()`

Return the parent `CalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OauthClientWebhookEntity

```ts
const oauth_client_webhook = client.OauthClientWebhook()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `boolean` | Yes |  |
| `id` | `number` | Yes |  |
| `oAuthClientId` | `string` | Yes |  |
| `payloadTemplate` | `string` | Yes | The template of the payload that will be sent to the subscriberUrl, check cal.com/docs/core-features/webhooks for more information |
| `secret` | `string` | No |  |
| `subscriberUrl` | `string` | Yes |  |
| `triggers` | `any[]` | Yes |  |
| `version` | `string` | No | The version of the webhook |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `active` | - | - | - | Yes | - |
| `id` | - | - | - | - | - |
| `oAuthClientId` | - | - | - | - | - |
| `payloadTemplate` | - | - | Yes | Yes | - |
| `secret` | - | - | - | - | - |
| `subscriberUrl` | - | - | - | Yes | - |
| `triggers` | - | - | - | Yes | - |
| `version` | - | - | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.OauthClientWebhook().create({
  oauth_client_id: 'example_oauth_client_id',
  active: true,
  id: 1,
  oAuthClientId: 'example_oAuthClientId',
  payloadTemplate: 'example_payloadTemplate',
  subscriberUrl: 'example_subscriberUrl',
  triggers: [],
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.OauthClientWebhook().list({ oauth_client_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.OauthClientWebhook().load({ id: 'oauth_client_webhook_id', oauth_client_id: 'oauth_client_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.OauthClientWebhook().remove({ id: 'oauth_client_webhook_id', oauth_client_id: 'oauth_client_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.OauthClientWebhook().update({
  id: 'oauth_client_webhook_id',
  oauth_client_id: 'oauth_client_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OauthClientWebhookEntity` instance with the same client and
options.

#### `client()`

Return the parent `CalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OauthTokenEntity

```ts
const oauth_token = client.OauthToken()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `string` | Yes | The access token |
| `expires_in` | `number` | Yes | The number of seconds until the access token expires |
| `refresh_token` | `string` | Yes | The refresh token |
| `token_type` | `string` | Yes | The token type |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `force_refresh` | `/v2/oauth-clients/{clientId}/users/{userId}/force-refresh` | `client.OauthToken().create({ $action: 'force_refresh', ... })` |
| `refresh` | `/v2/oauth/{clientId}/refresh` | `client.OauthToken().create({ $action: 'refresh', ... })` |

An action returns that action's OWN response, which is not necessarily a
OauthToken record — check the API definition for its shape.

```ts
const result = await client.OauthToken().create({
  $action: 'force_refresh',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.OauthToken().create({
  access_token: 'example_access_token',
  expires_in: 1,
  refresh_token: 'example_refresh_token',
  token_type: 'example_token_type',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OauthTokenEntity` instance with the same client and
options.

#### `client()`

Return the parent `CalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PrivateLinkEntity

```ts
const private_link = client.PrivateLink()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `any[]` | Yes | Array of private links for the event type (mix of time-based and usage-based) |
| `expiresAt` | `string` | No | Expiration date for time-based links |
| `id` | `string` | No |  |
| `maxUsageCount` | `number` | No | Maximum number of times the link can be used. |
| `status` | `string` | Yes | Response status |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.PrivateLink().create({
  event_type_id: 1,
  data: [],
  status: 'example_status',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.PrivateLink().list({ event_type_id: 1 })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.PrivateLink().remove({ event_type_id: 1, id: 'id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.PrivateLink().update({
  event_type_id: 1,
  id: 'id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PrivateLinkEntity` instance with the same client and
options.

#### `client()`

Return the parent `CalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ScheduleEntity

```ts
const schedule = client.Schedule()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `availability` | `any[]` | No | Each object contains days and times when the user is available. |
| `data` | `any` | Yes |  |
| `error` | `Record<string, any>` | No |  |
| `id` | `number` | Yes |  |
| `isDefault` | `boolean` | Yes | Each user should have 1 default schedule. |
| `name` | `string` | Yes |  |
| `overrides` | `any[]` | No | Need to change availability for a specific date? |
| `ownerId` | `number` | Yes |  |
| `status` | `string` | Yes |  |
| `timeZone` | `string` | Yes | Timezone is used to calculate available times when an event using the schedule is booked. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `availability` | - | Yes | - | - | - |
| `data` | - | - | - | - | - |
| `error` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `isDefault` | - | - | - | Yes | - |
| `name` | - | - | - | Yes | - |
| `overrides` | - | Yes | - | - | - |
| `ownerId` | - | - | - | - | - |
| `status` | - | - | - | - | - |
| `timeZone` | - | - | - | Yes | - |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `default` | `/v2/schedules/default` | `client.Schedule().load({ $action: 'default', ... })` |

An action returns that action's OWN response, which is not necessarily a
Schedule record — check the API definition for its shape.

```ts
const result = await client.Schedule().load({
  $action: 'default',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Schedule().create({
  data: 'example_data',
  id: 1,
  isDefault: true,
  name: 'example_name',
  ownerId: 1,
  status: 'example_status',
  timeZone: 'example_timeZone',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Schedule().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Schedule().load({ id: 1 })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Schedule().remove({ id: 1 })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Schedule().update({
  id: 'schedule_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ScheduleEntity` instance with the same client and
options.

#### `client()`

Return the parent `CalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SelectedCalendarEntity

```ts
const selected_calendar = client.SelectedCalendar()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `credentialId` | `number` | Yes |  |
| `delegationCredentialId` | `string` | No |  |
| `externalId` | `string` | Yes |  |
| `integration` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.SelectedCalendar().create({
  credentialId: 1,
  externalId: 'example_externalId',
  integration: 'example_integration',
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.SelectedCalendar().remove({ credential_id: 'credential_id', external_id: 'external_id', integration: 'integration' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SelectedCalendarEntity` instance with the same client and
options.

#### `client()`

Return the parent `CalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SlotEntity

```ts
const slot = client.Slot()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Slot().load({ end: 'end', start: 'start' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SlotEntity` instance with the same client and
options.

#### `client()`

Return the parent `CalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SlotReservationEntity

```ts
const slot_reservation = client.SlotReservation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `eventTypeId` | `number` | Yes | The ID of the event type for which slot should be reserved. |
| `id` | `string` | No |  |
| `reservationDuration` | `number` | No | ONLY for authenticated requests with api key, access token or OAuth credentials (ID + secret). |
| `reservationUid` | `string` | Yes | The unique identifier of the reservation. |
| `reservationUntil` | `string` | Yes | ISO 8601 datestring in UTC timezone representing time until which the slot is reserved. |
| `slotDuration` | `number` | No | By default slot duration is equal to event type length, but if you want to reserve a slot for an event type that has a variable length you can specify it here as a number in minutes. |
| `slotEnd` | `string` | Yes | ISO 8601 datestring in UTC timezone representing slot end. |
| `slotStart` | `string` | Yes | ISO 8601 datestring in UTC timezone representing available slot. |

### Field Usage by Operation

| Field | load | create | update | remove |
| --- | --- | --- | --- | --- |
| `eventTypeId` | - | - | - | - |
| `id` | - | - | - | - |
| `reservationDuration` | - | - | Yes | - |
| `reservationUid` | - | - | - | - |
| `reservationUntil` | - | - | - | - |
| `slotDuration` | - | - | Yes | - |
| `slotEnd` | - | - | - | - |
| `slotStart` | - | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.SlotReservation().create({
  eventTypeId: 1,
  reservationUid: 'example_reservationUid',
  reservationUntil: 'example_reservationUntil',
  slotEnd: 'example_slotEnd',
  slotStart: 'example_slotStart',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.SlotReservation().load({ id: 'slot_reservation_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.SlotReservation().remove({ id: 'slot_reservation_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.SlotReservation().update({
  id: 'slot_reservation_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SlotReservationEntity` instance with the same client and
options.

#### `client()`

Return the parent `CalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## StripeEntity

```ts
const stripe = client.Stripe()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `authUrl` | `string` | Yes |  |
| `url` | `string` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `check` | `/v2/stripe/check` | `client.Stripe().load({ $action: 'check', ... })` |

An action returns that action's OWN response, which is not necessarily a
Stripe record — check the API definition for its shape.

```ts
const result = await client.Stripe().load({
  $action: 'check',
  /* ...the action's own arguments */
})
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Stripe().load({ code: 'code', state: 'state' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StripeEntity` instance with the same client and
options.

#### `client()`

Return the parent `CalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VerifiedEmailEntity

```ts
const verified_email = client.VerifiedEmail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes | The verified email address. |
| `id` | `number` | Yes | The unique identifier for the verified email. |
| `userId` | `number` | Yes | The ID of the associated user, if applicable. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `request` | `/v2/verified-resources/emails/verification-code/request` | `client.VerifiedEmail().create({ $action: 'request', ... })` |
| `verify` | `/v2/verified-resources/emails/verification-code/verify` | `client.VerifiedEmail().create({ $action: 'verify', ... })` |

An action returns that action's OWN response, which is not necessarily a
VerifiedEmail record — check the API definition for its shape.

```ts
const result = await client.VerifiedEmail().create({
  $action: 'request',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.VerifiedEmail().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.VerifiedEmail().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VerifiedEmailEntity` instance with the same client and
options.

#### `client()`

Return the parent `CalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VerifiedPhoneEntity

```ts
const verified_phone = client.VerifiedPhone()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `number` | Yes | The unique identifier for the verified email. |
| `phoneNumber` | `string` | Yes | The verified phone number. |
| `userId` | `number` | Yes | The ID of the associated user, if applicable. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `request` | `/v2/verified-resources/phones/verification-code/request` | `client.VerifiedPhone().create({ $action: 'request', ... })` |
| `verify` | `/v2/verified-resources/phones/verification-code/verify` | `client.VerifiedPhone().create({ $action: 'verify', ... })` |

An action returns that action's OWN response, which is not necessarily a
VerifiedPhone record — check the API definition for its shape.

```ts
const result = await client.VerifiedPhone().create({
  $action: 'request',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.VerifiedPhone().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.VerifiedPhone().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VerifiedPhoneEntity` instance with the same client and
options.

#### `client()`

Return the parent `CalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WebhookEntity

```ts
const webhook = client.Webhook()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `boolean` | Yes |  |
| `id` | `number` | Yes |  |
| `payloadTemplate` | `string` | Yes | The template of the payload that will be sent to the subscriberUrl, check cal.com/docs/core-features/webhooks for more information |
| `secret` | `string` | No |  |
| `subscriberUrl` | `string` | Yes |  |
| `triggers` | `any[]` | Yes |  |
| `userId` | `number` | Yes |  |
| `version` | `string` | No | The version of the webhook |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `active` | - | - | - | Yes | - |
| `id` | - | - | - | - | - |
| `payloadTemplate` | - | - | Yes | Yes | - |
| `secret` | - | - | - | - | - |
| `subscriberUrl` | - | - | - | Yes | - |
| `triggers` | - | - | - | Yes | - |
| `userId` | - | - | - | - | - |
| `version` | - | - | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Webhook().create({
  active: true,
  id: 1,
  payloadTemplate: 'example_payloadTemplate',
  subscriberUrl: 'example_subscriberUrl',
  triggers: [],
  userId: 1,
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Webhook().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Webhook().load({ id: 'webhook_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Webhook().remove({ id: 'webhook_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Webhook().update({
  id: 'webhook_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WebhookEntity` instance with the same client and
options.

#### `client()`

Return the parent `CalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```ts
const client = new CalSDK({
  feature: {
    test: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

