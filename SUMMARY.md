# Cal.com API v2

Cal.com is open-source scheduling infrastructure. Its v2 REST API has 121 operations across 82 URL paths; every call needs a Bearer token, a cal-api-version header whose value differs per resource, and returns its result wrapped in a &#123; status, data &#125; envelope. This SDK hides that plumbing: you work with bookings, event types, schedules, slots, calendars and webhooks as objects with load, list, create, update and remove.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 23 entities and 121 HTTP routes. There are 1 SDK targets.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### ApiKey

Refresh the API key you are calling with.

SDK operations: `create`.

Key fields to recognise:

- `apiKeyDaysValid`: For how many days is managed organization api key valid.
- `apiKeyNeverExpires`: If true, organization api key never expires.

### Attendee

People on a booking: add, list, load and remove attendees.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `displayEmail`: Clean email for display purposes
- `email`: The email of the attendee.
- `id`: The ID of the attendee.
- `language`: The preferred language of the attendee.
- `name`: The name of the attendee.

### Booking

Bookings: create, list, load, plus cancel, confirm, decline, reschedule and reassign actions.

SDK operations: `create`, `list`, `load`, `update`.

Key fields to recognise:

- `data`: Booking data, which can be either a ReassignAutoBookingOutput object or a ReassignManualBookingOutput object
- `id`: The id of the booking reference
- `status`: The status of the request, always &#39;success&#39; for successful responses

### Calendar

Connected calendar accounts, busy times and free/busy lookups.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `id`: The id of the calendar credential

### CalendarEvent

Events on a connected calendar (Google, Outlook, Apple).

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `attendees`: List of attendees with their response status
- `calendarEventOwner`: The calendar account that owns this event. This is the primary calendar where the event is stored and cannot be modified without appropriate permissions. Changing this would require moving the event to a different calendar
- `description`: Detailed description of the calendar event
- `end`: End date and time of the calendar event with timezone information
- `hosts`: Information about the event hosts (organizers)

### Conferencing

Video conferencing apps: connect, set default, disconnect.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `id`: Id of the conferencing app credentials
- `invalid`: Whether if the connection is working or not.
- `type`: Type of conferencing app
- `userId`: Id of the user associated to the conferencing app

### DestinationCalendar

The calendar new bookings are written to.

SDK operations: `update`.

Key fields to recognise:

- `externalId`: Unique identifier used to represent the specific calendar, as returned by the /calendars endpoint
- `integration`: The calendar service you want to integrate, as returned by the /calendars endpoint

### EventType

The kinds of meeting people can book with you.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `afterEventBuffer`: Extra time automatically blocked on your calendar after a meeting ends.
- `allowReschedulingCancelledBookings`: When enabled, users will be able to create a new booking when trying to reschedule a cancelled booking.
- `allowReschedulingPastBookings`: Enabling this option allows for past events to be rescheduled.
- `beforeEventBuffer`: Extra time automatically blocked on your calendar before a meeting starts.
- `bookerActiveBookingsLimit`: Limit the number of active bookings a booker can make for this event type.

### EventTypeWebhook

Webhooks scoped to one event type.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `payloadTemplate`: The template of the payload that will be sent to the subscriberUrl, check cal.com/docs/core-features/webhooks for more information
- `version`: The version of the webhook

### ManagedUser

Users your platform OAuth client manages.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `avatarUrl`: URL of the user&#39;s avatar image
- `bio`: Bio
- `metadata`: You can store any additional data you want here.
- `name`: Managed user&#39;s name is used in emails
- `timeFormat`: Must be a number 12 or 24

### Me

The profile of the authenticated user.

SDK operations: `load`, `update`.

Key fields to recognise:

- `avatarUrl`: URL of the user&#39;s avatar image
- `bio`: Bio
- `metadata`: You can store any additional data you want here.
- `timeFormat`: Must be 12 or 24

### OauthClient

Platform OAuth clients.

Results: Create an OAuth client.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `areCalendarEventsEnabled`: If true and if managed user has calendar connected, calendar events will be created. Disable it if you manually create calendar events. Default to true.
- `areDefaultEventTypesEnabled`: If enabled, when creating a managed user the managed user will have 4 default event types: 30 and 60 minutes without Cal video, 30 and 60 minutes with Cal video. Leave this disabled if you want to create a managed user and then manually create event types for the user.
- `logo`: The logo URL of the OAuth client
- `name`: The name of the OAuth client
- `permissions`: Array of permission keys like [&quot;`BOOKING_READ`&quot;, &quot;`BOOKING_WRITE`&quot;]

### OauthClientWebhook

Webhooks scoped to one OAuth client.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `payloadTemplate`: The template of the payload that will be sent to the subscriberUrl, check cal.com/docs/core-features/webhooks for more information
- `version`: The version of the webhook

### OauthToken

Exchange and refresh OAuth tokens.

SDK operations: `create`.

Key fields to recognise:

- `access_token`: The access token
- `expires_in`: The number of seconds until the access token expires
- `refresh_token`: The refresh token
- `token_type`: The token type

### PrivateLink

Private booking links for an event type.

SDK operations: `create`, `list`, `remove`, `update`.

Key fields to recognise:

- `data`: Created private link data (either time-based or usage-based)
- `expiresAt`: Expiration date for this time-based link
- `maxUsageCount`: Maximum number of times this link can be used
- `status`: Response status

### Schedule

Availability schedules, including the default one.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `availability`: Each object contains days and times when the user is available.
- `isDefault`: Each user should have 1 default schedule.
- `overrides`: Need to change availability for a specific date?
- `timeZone`: Timezone is used to calculate available times when an event using the schedule is booked.

### SelectedCalendar

Calendars checked for conflicts.

SDK operations: `create`, `remove`.

### Slot

Available time slots for an event type.

Results: A map of available slots indexed by date, where each date is associated with an array of time slots. If format=range is specified, each slot will be an object with start and end properties denoting start and end of the slot. For seated slots each object will have attendeesCount and bookingUid properties. If no slots are available, the data field will be an empty object &#123;&#125;.

SDK operations: `load`.

### SlotReservation

Temporarily hold a slot while a booking is completed.

SDK operations: `create`, `load`, `remove`, `update`.

Key fields to recognise:

- `eventTypeId`: The ID of the event type for which slot was reserved.
- `reservationDuration`: For how many minutes the slot is reserved - for this long time noone else can book this event type at `start` time.
- `reservationUid`: The unique identifier of the reservation. Use it to update, get or delete the reservation.
- `reservationUntil`: ISO 8601 datestring in UTC timezone representing time until which the slot is reserved.
- `slotDuration`: By default slot duration is equal to event type length, but if you want to reserve a slot for an event type that has a variable length you can specify it here. If you don&#39;t have this set explicitly that event type can have one of many lengths you can omit this.

### Stripe

Stripe connection status for paid bookings.

SDK operations: `load`.

### VerifiedEmail

Email addresses verified for use in workflows.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `email`: The verified email address.
- `id`: The unique identifier for the verified email.
- `userId`: The ID of the associated user, if applicable.

### VerifiedPhone

Phone numbers verified for use in workflows.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `id`: The unique identifier for the verified email.
- `phoneNumber`: The verified phone number.
- `userId`: The ID of the associated user, if applicable.

### Webhook

User-level webhooks.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `payloadTemplate`: The template of the payload that will be sent to the subscriberUrl, check cal.com/docs/core-features/webhooks for more information
- `version`: The version of the webhook

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| ApiKey | `create` | `POST /v2/api-keys/refresh` | See reference |
| Attendee | `create` | `POST /v2/bookings/{bookingUid}/attendees` | See reference |
| Attendee | `list` | `GET /v2/bookings/{bookingUid}/attendees` | See reference |
| Attendee | `load` | `GET /v2/bookings/{bookingUid}/attendees/{attendeeId}` | See reference |
| Attendee | `remove` | `DELETE /v2/bookings/{bookingUid}/attendees/{attendeeId}` | See reference |
| Booking | `create` | `POST /v2/bookings/{bookingUid}/reassign/{userId}` | See reference |
| Booking | `create` | `POST /v2/bookings/{bookingUid}/confirm` | See reference |
| Booking | `create` | `POST /v2/bookings/{bookingUid}/decline` | See reference |
| Booking | `create` | `POST /v2/bookings/{bookingUid}/guests` | See reference |
| Booking | `create` | `POST /v2/bookings/{bookingUid}/mark-absent` | See reference |
| Booking | `create` | `POST /v2/bookings/{bookingUid}/reassign` | See reference |
| Booking | `create` | `POST /v2/bookings/{bookingUid}/cancel` | See reference |
| Booking | `create` | `POST /v2/bookings/{bookingUid}/reschedule` | See reference |
| Booking | `create` | `POST /v2/bookings` | See reference |
| Booking | `list` | `GET /v2/bookings/{bookingUid}/calendar-links` | See reference |
| Booking | `list` | `GET /v2/bookings/{bookingUid}/conferencing-sessions` | See reference |
| Booking | `list` | `GET /v2/bookings/{bookingUid}/recordings` | See reference |
| Booking | `list` | `GET /v2/bookings/{bookingUid}/references` | See reference |
| Booking | `list` | `GET /v2/bookings/{bookingUid}/transcripts` | See reference |
| Booking | `list` | `GET /v2/bookings` | See reference |
| Booking | `load` | `GET /v2/bookings/{bookingUid}` | See reference |
| Booking | `load` | `GET /v2/bookings/by-seat/{seatUid}` | See reference |
| Booking | `update` | `PATCH /v2/bookings/{bookingUid}/location` | See reference |
| Calendar | `create` | `POST /v2/calendars/{calendar}/credentials` | See reference |
| Calendar | `create` | `POST /v2/calendars/{calendar}/disconnect` | See reference |
| Calendar | `create` | `POST /v2/calendars/ics-feed/save` | See reference |
| Calendar | `list` | `GET /v2/calendars/{calendar}/freebusy` | See reference |
| Calendar | `list` | `GET /v2/calendars/connections/{connectionId}/freebusy` | See reference |
| Calendar | `list` | `GET /v2/calendars/busy-times` | See reference |
| Calendar | `load` | `GET /v2/calendars/{calendar}/connect` | See reference |
| Calendar | `load` | `GET /v2/calendars/{calendar}/save` | See reference |
| Calendar | `load` | `GET /v2/calendars/{calendar}/check` | See reference |
| Calendar | `load` | `GET /v2/calendars` | See reference |
| Calendar | `load` | `GET /v2/calendars/ics-feed/check` | See reference |
| Calendar | `load` | `GET /v2/calendars/connections` | See reference |
| CalendarEvent | `create` | `POST /v2/calendars/{calendar}/events` | See reference |
| CalendarEvent | `create` | `POST /v2/calendars/connections/{connectionId}/events` | See reference |
| CalendarEvent | `list` | `GET /v2/calendars/{calendar}/events` | See reference |
| CalendarEvent | `list` | `GET /v2/calendars/connections/{connectionId}/events` | See reference |
| CalendarEvent | `load` | `GET /v2/calendars/connections/{connectionId}/events/{eventId}` | See reference |
| CalendarEvent | `load` | `GET /v2/calendars/{calendar}/event/{eventUid}` | See reference |
| CalendarEvent | `load` | `GET /v2/calendars/{calendar}/events/{eventUid}` | See reference |
| CalendarEvent | `remove` | `DELETE /v2/calendars/{calendar}/events/{eventUid}` | See reference |
| CalendarEvent | `remove` | `DELETE /v2/calendars/connections/{connectionId}/events/{eventId}` | See reference |
| CalendarEvent | `update` | `PATCH /v2/calendars/connections/{connectionId}/events/{eventId}` | See reference |
| CalendarEvent | `update` | `PATCH /v2/calendars/{calendar}/event/{eventUid}` | See reference |
| CalendarEvent | `update` | `PATCH /v2/calendars/{calendar}/events/{eventUid}` | See reference |
| Conferencing | `create` | `POST /v2/conferencing/{app}/connect` | See reference |
| Conferencing | `create` | `POST /v2/conferencing/{app}/default` | See reference |
| Conferencing | `list` | `GET /v2/conferencing` | See reference |
| Conferencing | `load` | `GET /v2/conferencing/{app}/oauth/auth-url` | See reference |
| Conferencing | `load` | `GET /v2/conferencing/{app}/oauth/callback` | See reference |
| Conferencing | `load` | `GET /v2/conferencing/default` | See reference |
| Conferencing | `remove` | `DELETE /v2/conferencing/{app}/disconnect` | See reference |
| DestinationCalendar | `update` | `PUT /v2/destination-calendars` | See reference |
| EventType | `create` | `POST /v2/event-types` | See reference |
| EventType | `list` | `GET /v2/event-types` | See reference |
| EventType | `load` | `GET /v2/event-types/{eventTypeId}` | See reference |
| EventType | `remove` | `DELETE /v2/event-types/{eventTypeId}` | See reference |
| EventType | `update` | `PATCH /v2/event-types/{eventTypeId}` | See reference |
| EventTypeWebhook | `create` | `POST /v2/event-types/{eventTypeId}/webhooks` | See reference |
| EventTypeWebhook | `list` | `GET /v2/event-types/{eventTypeId}/webhooks` | See reference |
| EventTypeWebhook | `load` | `GET /v2/event-types/{eventTypeId}/webhooks/{webhookId}` | See reference |
| EventTypeWebhook | `remove` | `DELETE /v2/event-types/{eventTypeId}/webhooks/{webhookId}` | See reference |
| EventTypeWebhook | `remove` | `DELETE /v2/event-types/{eventTypeId}/webhooks` | See reference |
| EventTypeWebhook | `update` | `PATCH /v2/event-types/{eventTypeId}/webhooks/{webhookId}` | See reference |
| ManagedUser | `create` | `POST /v2/oauth-clients/{clientId}/users` | See reference |
| ManagedUser | `list` | `GET /v2/oauth-clients/{clientId}/users` | See reference |
| ManagedUser | `load` | `GET /v2/oauth-clients/{clientId}/users/{userId}` | See reference |
| ManagedUser | `remove` | `DELETE /v2/oauth-clients/{clientId}/users/{userId}` | See reference |
| ManagedUser | `update` | `PATCH /v2/oauth-clients/{clientId}/users/{userId}` | See reference |
| Me | `load` | `GET /v2/me` | See reference |
| Me | `update` | `PATCH /v2/me` | See reference |
| OauthClient | `create` | `POST /v2/oauth-clients` | See reference |
| OauthClient | `list` | `GET /v2/oauth-clients` | See reference |
| OauthClient | `load` | `GET /v2/oauth-clients/{clientId}` | See reference |
| OauthClient | `load` | `GET /v2/auth/oauth2/clients/{clientId}` | See reference |
| OauthClient | `remove` | `DELETE /v2/oauth-clients/{clientId}` | See reference |
| OauthClient | `update` | `PATCH /v2/oauth-clients/{clientId}` | See reference |
| OauthClientWebhook | `create` | `POST /v2/oauth-clients/{clientId}/webhooks` | See reference |
| OauthClientWebhook | `list` | `GET /v2/oauth-clients/{clientId}/webhooks` | See reference |
| OauthClientWebhook | `load` | `GET /v2/oauth-clients/{clientId}/webhooks/{webhookId}` | See reference |
| OauthClientWebhook | `remove` | `DELETE /v2/oauth-clients/{clientId}/webhooks/{webhookId}` | See reference |
| OauthClientWebhook | `remove` | `DELETE /v2/oauth-clients/{clientId}/webhooks` | See reference |
| OauthClientWebhook | `update` | `PATCH /v2/oauth-clients/{clientId}/webhooks/{webhookId}` | See reference |
| OauthToken | `create` | `POST /v2/oauth-clients/{clientId}/users/{userId}/force-refresh` | See reference |
| OauthToken | `create` | `POST /v2/oauth/{clientId}/refresh` | See reference |
| OauthToken | `create` | `POST /v2/auth/oauth2/token` | See reference |
| PrivateLink | `create` | `POST /v2/event-types/{eventTypeId}/private-links` | See reference |
| PrivateLink | `list` | `GET /v2/event-types/{eventTypeId}/private-links` | See reference |
| PrivateLink | `remove` | `DELETE /v2/event-types/{eventTypeId}/private-links/{linkId}` | See reference |
| PrivateLink | `update` | `PATCH /v2/event-types/{eventTypeId}/private-links/{linkId}` | See reference |
| Schedule | `create` | `POST /v2/schedules` | See reference |
| Schedule | `list` | `GET /v2/schedules` | See reference |
| Schedule | `load` | `GET /v2/schedules/{scheduleId}` | See reference |
| Schedule | `load` | `GET /v2/schedules/default` | See reference |
| Schedule | `remove` | `DELETE /v2/schedules/{scheduleId}` | See reference |
| Schedule | `update` | `PATCH /v2/schedules/{scheduleId}` | See reference |
| SelectedCalendar | `create` | `POST /v2/selected-calendars` | See reference |
| SelectedCalendar | `remove` | `DELETE /v2/selected-calendars` | See reference |
| Slot | `load` | `GET /v2/slots` | See reference |
| SlotReservation | `create` | `POST /v2/slots/reservations` | See reference |
| SlotReservation | `load` | `GET /v2/slots/reservations/{uid}` | See reference |
| SlotReservation | `remove` | `DELETE /v2/slots/reservations/{uid}` | See reference |
| SlotReservation | `update` | `PATCH /v2/slots/reservations/{uid}` | See reference |
| Stripe | `load` | `GET /v2/stripe/save` | See reference |
| Stripe | `load` | `GET /v2/stripe/check` | See reference |
| Stripe | `load` | `GET /v2/stripe/connect` | See reference |
| VerifiedEmail | `create` | `POST /v2/verified-resources/emails/verification-code/request` | See reference |
| VerifiedEmail | `create` | `POST /v2/verified-resources/emails/verification-code/verify` | See reference |
| VerifiedEmail | `list` | `GET /v2/verified-resources/emails` | See reference |
| VerifiedEmail | `load` | `GET /v2/verified-resources/emails/{id}` | See reference |
| VerifiedPhone | `create` | `POST /v2/verified-resources/phones/verification-code/request` | See reference |
| VerifiedPhone | `create` | `POST /v2/verified-resources/phones/verification-code/verify` | See reference |
| VerifiedPhone | `list` | `GET /v2/verified-resources/phones` | See reference |
| VerifiedPhone | `load` | `GET /v2/verified-resources/phones/{id}` | See reference |
| Webhook | `create` | `POST /v2/webhooks` | See reference |
| Webhook | `list` | `GET /v2/webhooks` | See reference |
| Webhook | `load` | `GET /v2/webhooks/{webhookId}` | See reference |
| Webhook | `remove` | `DELETE /v2/webhooks/{webhookId}` | See reference |
| Webhook | `update` | `PATCH /v2/webhooks/{webhookId}` | See reference |

## Connect to the API

- API server: `https://api.cal.com`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `test`: In-memory mock transport for testing without a live server

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

