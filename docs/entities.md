# Entities

[Back to the README](../README.md)

An entity is one thing in Cal.com that you work with through the SDK, such as a
booking or a schedule. You get one from the client and call an operation on it:

```ts
const booking = await client.Booking().load({ id: 'booking_uid' })
const schedules = await client.Schedule().list()
```

The API exposes 23 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **ApiKey** | Refresh the API key you are calling with. | `/v2/api-keys/refresh` |
| **Attendee** | People on a booking: add, list, load and remove attendees. | `/v2/bookings/{bookingUid}/attendees` |
| **Booking** | Bookings: create, list, load, plus cancel, confirm, decline, reschedule and reassign actions. | `/v2/bookings` |
| **Calendar** | Connected calendar accounts, busy times and free/busy lookups. | `/v2/calendars/{calendar}/freebusy` |
| **CalendarEvent** | Events on a connected calendar (Google, Outlook, Apple). | `/v2/calendars/{calendar}/events` |
| **Conferencing** | Video conferencing apps: connect, set default, disconnect. | `/v2/conferencing` |
| **DestinationCalendar** | The calendar new bookings are written to. | `/v2/destination-calendars` |
| **EventType** | The kinds of meeting people can book with you. | `/v2/event-types` |
| **EventTypeWebhook** | Webhooks scoped to one event type. | `/v2/event-types/{eventTypeId}/webhooks` |
| **ManagedUser** | Users your platform OAuth client manages. | `/v2/oauth-clients/{clientId}/users` |
| **Me** | The profile of the authenticated user. | `/v2/me` |
| **OauthClient** | Platform OAuth clients. | `/v2/oauth-clients` |
| **OauthClientWebhook** | Webhooks scoped to one OAuth client. | `/v2/oauth-clients/{clientId}/webhooks` |
| **OauthToken** | Exchange and refresh OAuth tokens. | `/v2/auth/oauth2/token` |
| **PrivateLink** | Private booking links for an event type. | `/v2/event-types/{eventTypeId}/private-links` |
| **Schedule** | Availability schedules, including the default one. | `/v2/schedules` |
| **SelectedCalendar** | Calendars checked for conflicts. | `/v2/selected-calendars` |
| **Slot** | Available time slots for an event type. | `/v2/slots` |
| **SlotReservation** | Temporarily hold a slot while a booking is completed. | `/v2/slots/reservations/{uid}` |
| **Stripe** | Stripe connection status for paid bookings. | `/v2/stripe/save` |
| **VerifiedEmail** | Email addresses verified for use in workflows. | `/v2/verified-resources/emails` |
| **VerifiedPhone** | Phone numbers verified for use in workflows. | `/v2/verified-resources/phones` |
| **Webhook** | User-level webhooks. | `/v2/webhooks` |

The operations available across these entities are **load**, **list**, **create**, **update**, **remove** — see each entity's
own list above for exactly which it supports.

For every method and field of every entity, see the
[TypeScript reference](../ts/REFERENCE.md).
