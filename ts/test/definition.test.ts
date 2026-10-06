import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "api_key",
    "accessor": "ApiKey",
    "op": "create",
    "method": "POST",
    "path": "/v2/api-keys/refresh",
    "args": [],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "apiKey": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "attendee",
    "accessor": "Attendee",
    "op": "create",
    "method": "POST",
    "path": "/v2/bookings/{bookingUid}/attendees",
    "args": [
      {
        "name": "booking_id",
        "wire": "bookingUid",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 201,
    "sample": {
      "status": "success",
      "data": {
        "name": "John Doe",
        "email": "john@example.com",
        "displayEmail": "john@example.com",
        "timeZone": "America/New_York",
        "language": "en",
        "absent": false,
        "phoneNumber": "+1234567890",
        "id": 251,
        "bookingId": 313
      }
    },
    "idField": "id"
  },
  {
    "entity": "attendee",
    "accessor": "Attendee",
    "op": "list",
    "method": "GET",
    "path": "/v2/bookings/{bookingUid}/attendees",
    "args": [
      {
        "name": "booking_id",
        "wire": "bookingUid",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": [
        {
          "absent": false,
          "displayEmail": "john@example.com",
          "email": "john@example.com",
          "id": 251,
          "language": "en",
          "name": "John Doe",
          "phoneNumber": "+1234567890",
          "timeZone": "America/New_York"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "attendee",
    "accessor": "Attendee",
    "op": "load",
    "method": "GET",
    "path": "/v2/bookings/{bookingUid}/attendees/{attendeeId}",
    "args": [
      {
        "name": "booking_id",
        "wire": "bookingUid",
        "value": "p1"
      },
      {
        "name": "id",
        "wire": "attendeeId",
        "value": "p2"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "name": "John Doe",
        "email": "john@example.com",
        "displayEmail": "john@example.com",
        "timeZone": "America/New_York",
        "language": "en",
        "absent": false,
        "phoneNumber": "+1234567890",
        "id": 251
      }
    },
    "idField": "id"
  },
  {
    "entity": "attendee",
    "accessor": "Attendee",
    "op": "remove",
    "method": "DELETE",
    "path": "/v2/bookings/{bookingUid}/attendees/{attendeeId}",
    "args": [
      {
        "name": "booking_id",
        "wire": "bookingUid",
        "value": "p1"
      },
      {
        "name": "id",
        "wire": "attendeeId",
        "value": "p2"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "id": 123,
        "bookingId": 456,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "timeZone": "America/New_York"
      }
    },
    "idField": "id"
  },
  {
    "entity": "booking",
    "accessor": "Booking",
    "op": "create",
    "method": "POST",
    "path": "/v2/bookings/{bookingUid}/reassign/{userId}",
    "action": "reassign",
    "args": [
      {
        "name": "booking_id",
        "wire": "bookingUid",
        "value": "p1"
      },
      {
        "name": "id",
        "wire": "userId",
        "value": "p2"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-08-13"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {}
    },
    "idField": "id"
  },
  {
    "entity": "booking",
    "accessor": "Booking",
    "op": "create",
    "method": "POST",
    "path": "/v2/bookings/{bookingUid}/confirm",
    "action": "confirm",
    "args": [
      {
        "name": "id",
        "wire": "bookingUid",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-08-13"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "id": 123,
        "uid": "booking_uid_123",
        "title": "Consultation",
        "description": "Learn how to integrate scheduling into marketplace.",
        "hosts": [
          {
            "displayEmail": "jane100@example.com",
            "email": "jane100@example.com",
            "id": 1,
            "name": "Jane Doe",
            "timeZone": "America/Los_Angeles",
            "username": "jane100"
          }
        ],
        "status": "accepted",
        "cancellationReason": "User requested cancellation",
        "cancelledByEmail": "canceller@example.com",
        "reschedulingReason": "User rescheduled the event",
        "rescheduledByEmail": "rescheduler@example.com",
        "rescheduledFromUid": "previous_uid_123",
        "rescheduledToUid": "new_uid_456",
        "start": "2024-08-13T15:30:00Z",
        "end": "2024-08-13T16:30:00Z",
        "duration": 60,
        "eventTypeId": 50,
        "eventType": {
          "id": 1,
          "slug": "some-event"
        },
        "meetingUrl": "https://example.com/recurring-meeting",
        "location": "https://example.com/meeting",
        "absentHost": true,
        "createdAt": "2024-08-13T15:30:00Z",
        "updatedAt": "2024-08-13T15:30:00Z",
        "metadata": {
          "key": "value"
        },
        "rating": 4,
        "icsUid": "ics_uid_123",
        "attendees": [
          {
            "absent": false,
            "displayEmail": "john@example.com",
            "email": "john@example.com",
            "language": "en",
            "name": "John Doe",
            "phoneNumber": "+1234567890",
            "timeZone": "America/New_York"
          }
        ],
        "guests": [
          "guest1@example.com",
          "guest2@example.com"
        ],
        "bookingFieldsResponses": {
          "customField": "customValue"
        }
      },
      "error": {}
    },
    "idField": "id"
  },
  {
    "entity": "booking",
    "accessor": "Booking",
    "op": "create",
    "method": "POST",
    "path": "/v2/bookings/{bookingUid}/decline",
    "action": "decline",
    "args": [
      {
        "name": "id",
        "wire": "bookingUid",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-08-13"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "id": 123,
        "uid": "booking_uid_123",
        "title": "Consultation",
        "description": "Learn how to integrate scheduling into marketplace.",
        "hosts": [
          {
            "displayEmail": "jane100@example.com",
            "email": "jane100@example.com",
            "id": 1,
            "name": "Jane Doe",
            "timeZone": "America/Los_Angeles",
            "username": "jane100"
          }
        ],
        "status": "accepted",
        "cancellationReason": "User requested cancellation",
        "cancelledByEmail": "canceller@example.com",
        "reschedulingReason": "User rescheduled the event",
        "rescheduledByEmail": "rescheduler@example.com",
        "rescheduledFromUid": "previous_uid_123",
        "rescheduledToUid": "new_uid_456",
        "start": "2024-08-13T15:30:00Z",
        "end": "2024-08-13T16:30:00Z",
        "duration": 60,
        "eventTypeId": 50,
        "eventType": {
          "id": 1,
          "slug": "some-event"
        },
        "meetingUrl": "https://example.com/recurring-meeting",
        "location": "https://example.com/meeting",
        "absentHost": true,
        "createdAt": "2024-08-13T15:30:00Z",
        "updatedAt": "2024-08-13T15:30:00Z",
        "metadata": {
          "key": "value"
        },
        "rating": 4,
        "icsUid": "ics_uid_123",
        "attendees": [
          {
            "absent": false,
            "displayEmail": "john@example.com",
            "email": "john@example.com",
            "language": "en",
            "name": "John Doe",
            "phoneNumber": "+1234567890",
            "timeZone": "America/New_York"
          }
        ],
        "guests": [
          "guest1@example.com",
          "guest2@example.com"
        ],
        "bookingFieldsResponses": {
          "customField": "customValue"
        }
      },
      "error": {}
    },
    "idField": "id"
  },
  {
    "entity": "booking",
    "accessor": "Booking",
    "op": "create",
    "method": "POST",
    "path": "/v2/bookings/{bookingUid}/guests",
    "action": "guests",
    "args": [
      {
        "name": "booking_id",
        "wire": "bookingUid",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "id": 123,
        "uid": "booking_uid_123",
        "title": "Consultation",
        "description": "Learn how to integrate scheduling into marketplace.",
        "hosts": [
          {
            "displayEmail": "jane100@example.com",
            "email": "jane100@example.com",
            "id": 1,
            "name": "Jane Doe",
            "timeZone": "America/Los_Angeles",
            "username": "jane100"
          }
        ],
        "status": "accepted",
        "cancellationReason": "User requested cancellation",
        "cancelledByEmail": "canceller@example.com",
        "reschedulingReason": "User rescheduled the event",
        "rescheduledByEmail": "rescheduler@example.com",
        "rescheduledFromUid": "previous_uid_123",
        "rescheduledToUid": "new_uid_456",
        "start": "2024-08-13T15:30:00Z",
        "end": "2024-08-13T16:30:00Z",
        "duration": 60,
        "eventTypeId": 50,
        "eventType": {
          "id": 1,
          "slug": "some-event"
        },
        "meetingUrl": "https://example.com/recurring-meeting",
        "location": "https://example.com/meeting",
        "absentHost": true,
        "createdAt": "2024-08-13T15:30:00Z",
        "updatedAt": "2024-08-13T15:30:00Z",
        "metadata": {
          "key": "value"
        },
        "rating": 4,
        "icsUid": "ics_uid_123",
        "attendees": [
          {
            "absent": false,
            "displayEmail": "john@example.com",
            "email": "john@example.com",
            "language": "en",
            "name": "John Doe",
            "phoneNumber": "+1234567890",
            "timeZone": "America/New_York"
          }
        ],
        "guests": [
          "guest1@example.com",
          "guest2@example.com"
        ],
        "bookingFieldsResponses": {
          "customField": "customValue"
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "booking",
    "accessor": "Booking",
    "op": "create",
    "method": "POST",
    "path": "/v2/bookings/{bookingUid}/mark-absent",
    "action": "mark_absent",
    "args": [
      {
        "name": "id",
        "wire": "bookingUid",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-08-13"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "id": 123,
        "uid": "booking_uid_123",
        "title": "Consultation",
        "description": "Learn how to integrate scheduling into marketplace.",
        "hosts": [
          {
            "displayEmail": "jane100@example.com",
            "email": "jane100@example.com",
            "id": 1,
            "name": "Jane Doe",
            "timeZone": "America/Los_Angeles",
            "username": "jane100"
          }
        ],
        "status": "accepted",
        "cancellationReason": "User requested cancellation",
        "cancelledByEmail": "canceller@example.com",
        "reschedulingReason": "User rescheduled the event",
        "rescheduledByEmail": "rescheduler@example.com",
        "rescheduledFromUid": "previous_uid_123",
        "rescheduledToUid": "new_uid_456",
        "start": "2024-08-13T15:30:00Z",
        "end": "2024-08-13T16:30:00Z",
        "duration": 60,
        "eventTypeId": 50,
        "eventType": {
          "id": 1,
          "slug": "some-event"
        },
        "meetingUrl": "https://example.com/recurring-meeting",
        "location": "https://example.com/meeting",
        "absentHost": true,
        "createdAt": "2024-08-13T15:30:00Z",
        "updatedAt": "2024-08-13T15:30:00Z",
        "metadata": {
          "key": "value"
        },
        "rating": 4,
        "icsUid": "ics_uid_123",
        "attendees": [
          {
            "absent": false,
            "displayEmail": "john@example.com",
            "email": "john@example.com",
            "language": "en",
            "name": "John Doe",
            "phoneNumber": "+1234567890",
            "timeZone": "America/New_York"
          }
        ],
        "guests": [
          "guest1@example.com",
          "guest2@example.com"
        ],
        "bookingFieldsResponses": {
          "customField": "customValue"
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "booking",
    "accessor": "Booking",
    "op": "create",
    "method": "POST",
    "path": "/v2/bookings/{bookingUid}/reassign",
    "action": "reassign",
    "args": [
      {
        "name": "booking_id",
        "wire": "bookingUid",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-08-13"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {}
    },
    "idField": "id"
  },
  {
    "entity": "booking",
    "accessor": "Booking",
    "op": "create",
    "method": "POST",
    "path": "/v2/bookings/{bookingUid}/cancel",
    "action": "cancel",
    "args": [
      {
        "name": "id",
        "wire": "bookingUid",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-08-13"
      },
      {
        "name": "x_cal_client_id",
        "wire": "x-cal-client-id",
        "value": "h2"
      },
      {
        "name": "x_cal_secret_key",
        "wire": "x-cal-secret-key",
        "value": "h3"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "id": 123,
        "uid": "booking_uid_123",
        "title": "Consultation",
        "description": "Learn how to integrate scheduling into marketplace.",
        "hosts": [
          {
            "displayEmail": "jane100@example.com",
            "email": "jane100@example.com",
            "id": 1,
            "name": "Jane Doe",
            "timeZone": "America/Los_Angeles",
            "username": "jane100"
          }
        ],
        "status": "accepted",
        "cancellationReason": "User requested cancellation",
        "cancelledByEmail": "canceller@example.com",
        "reschedulingReason": "User rescheduled the event",
        "rescheduledByEmail": "rescheduler@example.com",
        "rescheduledFromUid": "previous_uid_123",
        "rescheduledToUid": "new_uid_456",
        "start": "2024-08-13T15:30:00Z",
        "end": "2024-08-13T16:30:00Z",
        "duration": 60,
        "eventTypeId": 50,
        "eventType": {
          "id": 1,
          "slug": "some-event"
        },
        "meetingUrl": "https://example.com/recurring-meeting",
        "location": "https://example.com/meeting",
        "absentHost": true,
        "createdAt": "2024-08-13T15:30:00Z",
        "updatedAt": "2024-08-13T15:30:00Z",
        "metadata": {
          "key": "value"
        },
        "rating": 4,
        "icsUid": "ics_uid_123",
        "attendees": [
          {
            "absent": false,
            "displayEmail": "john@example.com",
            "email": "john@example.com",
            "language": "en",
            "name": "John Doe",
            "phoneNumber": "+1234567890",
            "timeZone": "America/New_York"
          }
        ],
        "guests": [
          "guest1@example.com",
          "guest2@example.com"
        ],
        "bookingFieldsResponses": {
          "customField": "customValue"
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "booking",
    "accessor": "Booking",
    "op": "create",
    "method": "POST",
    "path": "/v2/bookings/{bookingUid}/reschedule",
    "action": "reschedule",
    "args": [
      {
        "name": "id",
        "wire": "bookingUid",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-08-13"
      },
      {
        "name": "x_cal_client_id",
        "wire": "x-cal-client-id",
        "value": "h2"
      },
      {
        "name": "x_cal_secret_key",
        "wire": "x-cal-secret-key",
        "value": "h3"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 201,
    "sample": {
      "status": "success",
      "data": {
        "id": 123,
        "uid": "booking_uid_123",
        "title": "Consultation",
        "description": "Learn how to integrate scheduling into marketplace.",
        "hosts": [
          {
            "displayEmail": "jane100@example.com",
            "email": "jane100@example.com",
            "id": 1,
            "name": "Jane Doe",
            "timeZone": "America/Los_Angeles",
            "username": "jane100"
          }
        ],
        "status": "accepted",
        "cancellationReason": "User requested cancellation",
        "cancelledByEmail": "canceller@example.com",
        "reschedulingReason": "User rescheduled the event",
        "rescheduledByEmail": "rescheduler@example.com",
        "rescheduledFromUid": "previous_uid_123",
        "rescheduledToUid": "new_uid_456",
        "start": "2024-08-13T15:30:00Z",
        "end": "2024-08-13T16:30:00Z",
        "duration": 60,
        "eventTypeId": 50,
        "eventType": {
          "id": 1,
          "slug": "some-event"
        },
        "meetingUrl": "https://example.com/recurring-meeting",
        "location": "https://example.com/meeting",
        "absentHost": true,
        "createdAt": "2024-08-13T15:30:00Z",
        "updatedAt": "2024-08-13T15:30:00Z",
        "metadata": {
          "key": "value"
        },
        "rating": 4,
        "icsUid": "ics_uid_123",
        "attendees": [
          {
            "absent": false,
            "displayEmail": "john@example.com",
            "email": "john@example.com",
            "language": "en",
            "name": "John Doe",
            "phoneNumber": "+1234567890",
            "timeZone": "America/New_York"
          }
        ],
        "guests": [
          "guest1@example.com",
          "guest2@example.com"
        ],
        "bookingFieldsResponses": {
          "customField": "customValue"
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "booking",
    "accessor": "Booking",
    "op": "create",
    "method": "POST",
    "path": "/v2/bookings",
    "args": [],
    "select": {},
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-08-13"
      },
      {
        "name": "x_cal_client_id",
        "wire": "x-cal-client-id",
        "value": "h2"
      },
      {
        "name": "x_cal_secret_key",
        "wire": "x-cal-secret-key",
        "value": "h3"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 201,
    "sample": {
      "status": "success",
      "data": {
        "id": 123,
        "uid": "booking_uid_123",
        "title": "Consultation",
        "description": "Learn how to integrate scheduling into marketplace.",
        "hosts": [
          {
            "displayEmail": "jane100@example.com",
            "email": "jane100@example.com",
            "id": 1,
            "name": "Jane Doe",
            "timeZone": "America/Los_Angeles",
            "username": "jane100"
          }
        ],
        "status": "accepted",
        "cancellationReason": "User requested cancellation",
        "cancelledByEmail": "canceller@example.com",
        "reschedulingReason": "User rescheduled the event",
        "rescheduledByEmail": "rescheduler@example.com",
        "rescheduledFromUid": "previous_uid_123",
        "rescheduledToUid": "new_uid_456",
        "start": "2024-08-13T15:30:00Z",
        "end": "2024-08-13T16:30:00Z",
        "duration": 60,
        "eventTypeId": 50,
        "eventType": {
          "id": 1,
          "slug": "some-event"
        },
        "meetingUrl": "https://example.com/recurring-meeting",
        "location": "https://example.com/meeting",
        "absentHost": true,
        "createdAt": "2024-08-13T15:30:00Z",
        "updatedAt": "2024-08-13T15:30:00Z",
        "metadata": {
          "key": "value"
        },
        "rating": 4,
        "icsUid": "ics_uid_123",
        "attendees": [
          {
            "absent": false,
            "displayEmail": "john@example.com",
            "email": "john@example.com",
            "language": "en",
            "name": "John Doe",
            "phoneNumber": "+1234567890",
            "timeZone": "America/New_York"
          }
        ],
        "guests": [
          "guest1@example.com",
          "guest2@example.com"
        ],
        "bookingFieldsResponses": {
          "customField": "customValue"
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "booking",
    "accessor": "Booking",
    "op": "list",
    "method": "GET",
    "path": "/v2/bookings/{bookingUid}/calendar-links",
    "action": "calendar_links",
    "args": [
      {
        "name": "booking_id",
        "wire": "bookingUid",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-08-13"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": [
        {
          "label": "x",
          "link": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "booking",
    "accessor": "Booking",
    "op": "list",
    "method": "GET",
    "path": "/v2/bookings/{bookingUid}/conferencing-sessions",
    "action": "conferencing-sessions",
    "args": [
      {
        "name": "id",
        "wire": "bookingUid",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-08-13"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": [
        {
          "duration": 3600,
          "id": "session123",
          "maxParticipants": 10,
          "ongoing": false,
          "participants": [
            {
              "duration": 3600,
              "joinTime": 1678901234,
              "userId": "user123",
              "userName": "John Doe"
            }
          ],
          "room": "daily-video-room-123",
          "startTime": 1678901234
        }
      ],
      "error": {}
    },
    "idField": "id"
  },
  {
    "entity": "booking",
    "accessor": "Booking",
    "op": "list",
    "method": "GET",
    "path": "/v2/bookings/{bookingUid}/recordings",
    "action": "recordings",
    "args": [
      {
        "name": "id",
        "wire": "bookingUid",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-08-13"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "error": {},
      "data": [
        {
          "downloadLink": "https://cal-video-recordings.s3.us-east-2.amazonaws.com/meetco/123s",
          "duration": 3600,
          "error": "Error message",
          "id": "1234567890",
          "maxParticipants": 10,
          "roomName": "daily-video-room-123",
          "shareToken": "share-token-123",
          "startTs": 1678901234,
          "status": "completed"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "booking",
    "accessor": "Booking",
    "op": "list",
    "method": "GET",
    "path": "/v2/bookings/{bookingUid}/references",
    "action": "references",
    "args": [
      {
        "name": "id",
        "wire": "bookingUid",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1",
      "type": "google_calendar"
    },
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-08-13"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "type"
    ],
    "queryArgs": [
      {
        "name": "type",
        "wire": "type"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": [
        {
          "destinationCalendarId": "x",
          "eventUid": "x",
          "id": 1,
          "type": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "booking",
    "accessor": "Booking",
    "op": "list",
    "method": "GET",
    "path": "/v2/bookings/{bookingUid}/transcripts",
    "action": "transcripts",
    "args": [
      {
        "name": "id",
        "wire": "bookingUid",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-08-13"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": [
        "https://transcript1.com",
        "https://transcript2.com"
      ],
      "error": {}
    },
    "idField": "id"
  },
  {
    "entity": "booking",
    "accessor": "Booking",
    "op": "list",
    "method": "GET",
    "path": "/v2/bookings",
    "args": [],
    "select": {
      "authorization": "v1",
      "after_created_at": "?afterCreatedAt=2025-03-07T10:00:00.000Z",
      "after_start": "?afterStart=2025-03-07T10:00:00.000Z",
      "after_updated_at": "?afterUpdatedAt=2025-03-07T10:00:00.000Z",
      "attendee_email": "example@domain.com",
      "attendee_name": "John Doe",
      "before_created_at": "?beforeCreatedAt=2025-03-14T11:00:00.000Z",
      "before_end": "?beforeEnd=2025-03-07T11:00:00.000Z",
      "before_updated_at": "?beforeUpdatedAt=2025-03-14T11:00:00.000Z",
      "booking_uid": "2NtaeaVcKfpmSZ4CthFdfk",
      "event_type_id": "?eventTypeIds=100,200",
      "skip": 0,
      "sort_created": "?sortCreated=asc OR ?sortCreated=desc",
      "sort_end": "?sortEnd=asc OR ?sortEnd=desc",
      "sort_start": "?sortStart=asc OR ?sortStart=desc",
      "sort_updated_at": "?sortUpdated=asc OR ?sortUpdated=desc",
      "status": "?status=upcoming,past",
      "take": 10,
      "team_id": "?teamId=50",
      "teams_id": "?teamIds=50,60"
    },
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-08-13"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "status",
      "attendeeEmail",
      "attendeeName",
      "bookingUid",
      "eventTypeIds",
      "eventTypeId",
      "teamsIds",
      "teamId",
      "afterStart",
      "beforeEnd",
      "afterCreatedAt",
      "beforeCreatedAt",
      "afterUpdatedAt",
      "beforeUpdatedAt",
      "sortStart",
      "sortEnd",
      "sortCreated",
      "sortUpdatedAt",
      "take",
      "skip"
    ],
    "queryArgs": [
      {
        "name": "after_created_at",
        "wire": "afterCreatedAt"
      },
      {
        "name": "after_start",
        "wire": "afterStart"
      },
      {
        "name": "after_updated_at",
        "wire": "afterUpdatedAt"
      },
      {
        "name": "attendee_email",
        "wire": "attendeeEmail"
      },
      {
        "name": "attendee_name",
        "wire": "attendeeName"
      },
      {
        "name": "before_created_at",
        "wire": "beforeCreatedAt"
      },
      {
        "name": "before_end",
        "wire": "beforeEnd"
      },
      {
        "name": "before_updated_at",
        "wire": "beforeUpdatedAt"
      },
      {
        "name": "booking_uid",
        "wire": "bookingUid"
      },
      {
        "name": "event_type_id",
        "wire": "eventTypeIds"
      },
      {
        "name": "event_type_id",
        "wire": "eventTypeId"
      },
      {
        "name": "skip",
        "wire": "skip"
      },
      {
        "name": "sort_created",
        "wire": "sortCreated"
      },
      {
        "name": "sort_end",
        "wire": "sortEnd"
      },
      {
        "name": "sort_start",
        "wire": "sortStart"
      },
      {
        "name": "sort_updated_at",
        "wire": "sortUpdatedAt"
      },
      {
        "name": "status",
        "wire": "status"
      },
      {
        "name": "take",
        "wire": "take"
      },
      {
        "name": "team_id",
        "wire": "teamId"
      },
      {
        "name": "teams_id",
        "wire": "teamsIds"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": [
        {
          "absentHost": true,
          "attendees": [
            {
              "absent": false,
              "displayEmail": "john@example.com",
              "email": "john@example.com",
              "language": "en",
              "name": "John Doe",
              "phoneNumber": "+1234567890",
              "timeZone": "America/New_York"
            }
          ],
          "bookingFieldsResponses": {
            "customField": "customValue"
          },
          "cancellationReason": "User requested cancellation",
          "cancelledByEmail": "canceller@example.com",
          "createdAt": "2024-08-13T15:30:00Z",
          "description": "Learn how to integrate scheduling into marketplace.",
          "duration": 60,
          "end": "2024-08-13T16:30:00Z",
          "eventType": {
            "id": 1,
            "slug": "some-event"
          },
          "eventTypeId": 50,
          "guests": [
            "guest1@example.com",
            "guest2@example.com"
          ],
          "hosts": [
            {
              "displayEmail": "jane100@example.com",
              "email": "jane100@example.com",
              "id": 1,
              "name": "Jane Doe",
              "timeZone": "America/Los_Angeles",
              "username": "jane100"
            }
          ],
          "icsUid": "ics_uid_123",
          "id": 123,
          "location": "https://example.com/meeting",
          "meetingUrl": "https://example.com/recurring-meeting",
          "metadata": {
            "key": "value"
          },
          "rating": 4,
          "rescheduledByEmail": "rescheduler@example.com",
          "rescheduledFromUid": "previous_uid_123",
          "rescheduledToUid": "new_uid_456",
          "reschedulingReason": "User rescheduled the event",
          "start": "2024-08-13T15:30:00Z",
          "status": "accepted",
          "title": "Consultation",
          "uid": "booking_uid_123",
          "updatedAt": "2024-08-13T15:30:00Z"
        }
      ],
      "pagination": {
        "currentPage": 2,
        "hasNextPage": true,
        "hasPreviousPage": true,
        "itemsPerPage": 10,
        "remainingItems": 103,
        "returnedItems": 10,
        "totalItems": 123,
        "totalPages": 13
      },
      "error": {}
    },
    "idField": "id"
  },
  {
    "entity": "booking",
    "accessor": "Booking",
    "op": "load",
    "method": "GET",
    "path": "/v2/bookings/{bookingUid}",
    "args": [
      {
        "name": "id",
        "wire": "bookingUid",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-08-13"
      },
      {
        "name": "x_cal_client_id",
        "wire": "x-cal-client-id",
        "value": "h2"
      },
      {
        "name": "x_cal_secret_key",
        "wire": "x-cal-secret-key",
        "value": "h3"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "id": 123,
        "uid": "booking_uid_123",
        "title": "Consultation",
        "description": "Learn how to integrate scheduling into marketplace.",
        "hosts": [
          {
            "displayEmail": "jane100@example.com",
            "email": "jane100@example.com",
            "id": 1,
            "name": "Jane Doe",
            "timeZone": "America/Los_Angeles",
            "username": "jane100"
          }
        ],
        "status": "accepted",
        "cancellationReason": "User requested cancellation",
        "cancelledByEmail": "canceller@example.com",
        "reschedulingReason": "User rescheduled the event",
        "rescheduledByEmail": "rescheduler@example.com",
        "rescheduledFromUid": "previous_uid_123",
        "rescheduledToUid": "new_uid_456",
        "start": "2024-08-13T15:30:00Z",
        "end": "2024-08-13T16:30:00Z",
        "duration": 60,
        "eventTypeId": 50,
        "eventType": {
          "id": 1,
          "slug": "some-event"
        },
        "meetingUrl": "https://example.com/recurring-meeting",
        "location": "https://example.com/meeting",
        "absentHost": true,
        "createdAt": "2024-08-13T15:30:00Z",
        "updatedAt": "2024-08-13T15:30:00Z",
        "metadata": {
          "key": "value"
        },
        "rating": 4,
        "icsUid": "ics_uid_123",
        "attendees": [
          {
            "absent": false,
            "displayEmail": "john@example.com",
            "email": "john@example.com",
            "language": "en",
            "name": "John Doe",
            "phoneNumber": "+1234567890",
            "timeZone": "America/New_York"
          }
        ],
        "guests": [
          "guest1@example.com",
          "guest2@example.com"
        ],
        "bookingFieldsResponses": {
          "customField": "customValue"
        }
      },
      "error": {}
    },
    "idField": "id"
  },
  {
    "entity": "booking",
    "accessor": "Booking",
    "op": "load",
    "method": "GET",
    "path": "/v2/bookings/by-seat/{seatUid}",
    "action": "by_seat",
    "args": [
      {
        "name": "seat_uid",
        "wire": "seatUid",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-08-13"
      },
      {
        "name": "x_cal_client_id",
        "wire": "x-cal-client-id",
        "value": "h2"
      },
      {
        "name": "x_cal_secret_key",
        "wire": "x-cal-secret-key",
        "value": "h3"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "id": 123,
        "uid": "booking_uid_123",
        "title": "Consultation",
        "description": "Learn how to integrate scheduling into marketplace.",
        "hosts": [
          {
            "displayEmail": "jane100@example.com",
            "email": "jane100@example.com",
            "id": 1,
            "name": "Jane Doe",
            "timeZone": "America/Los_Angeles",
            "username": "jane100"
          }
        ],
        "status": "accepted",
        "cancellationReason": "User requested cancellation",
        "cancelledByEmail": "canceller@example.com",
        "reschedulingReason": "User rescheduled the event",
        "rescheduledByEmail": "rescheduler@example.com",
        "rescheduledFromUid": "previous_uid_123",
        "rescheduledToUid": "new_uid_456",
        "start": "2024-08-13T15:30:00Z",
        "end": "2024-08-13T16:30:00Z",
        "duration": 60,
        "eventTypeId": 50,
        "eventType": {
          "id": 1,
          "slug": "some-event"
        },
        "meetingUrl": "https://example.com/recurring-meeting",
        "location": "https://example.com/meeting",
        "absentHost": true,
        "createdAt": "2024-08-13T15:30:00Z",
        "updatedAt": "2024-08-13T15:30:00Z",
        "metadata": {
          "key": "value"
        },
        "rating": 4,
        "icsUid": "ics_uid_123",
        "attendees": [
          {
            "absent": false,
            "displayEmail": "john@example.com",
            "email": "john@example.com",
            "language": "en",
            "name": "John Doe",
            "phoneNumber": "+1234567890",
            "timeZone": "America/New_York"
          }
        ],
        "guests": [
          "guest1@example.com",
          "guest2@example.com"
        ],
        "bookingFieldsResponses": {
          "customField": "customValue"
        }
      },
      "error": {}
    },
    "idField": "id"
  },
  {
    "entity": "booking",
    "accessor": "Booking",
    "op": "update",
    "method": "PATCH",
    "path": "/v2/bookings/{bookingUid}/location",
    "action": "location",
    "args": [
      {
        "name": "id",
        "wire": "bookingUid",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "id": 123,
        "uid": "booking_uid_123",
        "title": "Consultation",
        "description": "Learn how to integrate scheduling into marketplace.",
        "hosts": [
          {
            "displayEmail": "jane100@example.com",
            "email": "jane100@example.com",
            "id": 1,
            "name": "Jane Doe",
            "timeZone": "America/Los_Angeles",
            "username": "jane100"
          }
        ],
        "status": "accepted",
        "cancellationReason": "User requested cancellation",
        "cancelledByEmail": "canceller@example.com",
        "reschedulingReason": "User rescheduled the event",
        "rescheduledByEmail": "rescheduler@example.com",
        "rescheduledFromUid": "previous_uid_123",
        "rescheduledToUid": "new_uid_456",
        "start": "2024-08-13T15:30:00Z",
        "end": "2024-08-13T16:30:00Z",
        "duration": 60,
        "eventTypeId": 50,
        "eventType": {
          "id": 1,
          "slug": "some-event"
        },
        "meetingUrl": "https://example.com/recurring-meeting",
        "location": "https://example.com/meeting",
        "absentHost": true,
        "createdAt": "2024-08-13T15:30:00Z",
        "updatedAt": "2024-08-13T15:30:00Z",
        "metadata": {
          "key": "value"
        },
        "rating": 4,
        "icsUid": "ics_uid_123",
        "attendees": [
          {
            "absent": false,
            "displayEmail": "john@example.com",
            "email": "john@example.com",
            "language": "en",
            "name": "John Doe",
            "phoneNumber": "+1234567890",
            "timeZone": "America/New_York"
          }
        ],
        "guests": [
          "guest1@example.com",
          "guest2@example.com"
        ],
        "bookingFieldsResponses": {
          "customField": "customValue"
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "calendar",
    "accessor": "Calendar",
    "op": "create",
    "method": "POST",
    "path": "/v2/calendars/{calendar}/credentials",
    "action": "credential",
    "args": [
      {
        "name": "id",
        "wire": "calendar",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 201,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "calendar",
    "accessor": "Calendar",
    "op": "create",
    "method": "POST",
    "path": "/v2/calendars/{calendar}/disconnect",
    "action": "disconnect",
    "args": [
      {
        "name": "calendar_id",
        "wire": "calendar",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "id": 1,
        "type": "x",
        "userId": 1,
        "teamId": 1,
        "appId": "x",
        "invalid": true
      }
    },
    "idField": "id"
  },
  {
    "entity": "calendar",
    "accessor": "Calendar",
    "op": "create",
    "method": "POST",
    "path": "/v2/calendars/ics-feed/save",
    "action": "save_ics_feed",
    "args": [],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 201,
    "sample": {
      "status": "success",
      "data": {
        "id": 1234567890,
        "type": "ics-feed_calendar",
        "userId": 1234567890,
        "teamId": 1234567890,
        "appId": "ics-feed",
        "invalid": false
      }
    },
    "idField": "id"
  },
  {
    "entity": "calendar",
    "accessor": "Calendar",
    "op": "list",
    "method": "GET",
    "path": "/v2/calendars/{calendar}/freebusy",
    "action": "freebusy",
    "args": [
      {
        "name": "calendar_id",
        "wire": "calendar",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1",
      "from": "2026-03-10",
      "to": "2026-03-10",
      "time_zone": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "from",
      "to",
      "timeZone"
    ],
    "queryArgs": [
      {
        "name": "from",
        "wire": "from"
      },
      {
        "name": "time_zone",
        "wire": "timeZone"
      },
      {
        "name": "to",
        "wire": "to"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": [
        {
          "end": "2026-01-01T00:00:00Z",
          "source": "x",
          "start": "2026-01-01T00:00:00Z"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "calendar",
    "accessor": "Calendar",
    "op": "list",
    "method": "GET",
    "path": "/v2/calendars/connections/{connectionId}/freebusy",
    "action": "freebusy",
    "args": [
      {
        "name": "connection_id",
        "wire": "connectionId",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1",
      "from": "2026-03-10",
      "to": "2026-03-10",
      "time_zone": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "from",
      "to",
      "timeZone"
    ],
    "queryArgs": [
      {
        "name": "from",
        "wire": "from"
      },
      {
        "name": "time_zone",
        "wire": "timeZone"
      },
      {
        "name": "to",
        "wire": "to"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": [
        {
          "end": "2026-01-01T00:00:00Z",
          "source": "x",
          "start": "2026-01-01T00:00:00Z"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "calendar",
    "accessor": "Calendar",
    "op": "list",
    "method": "GET",
    "path": "/v2/calendars/busy-times",
    "action": "busy_times",
    "args": [],
    "select": {
      "authorization": "v1",
      "credential_id": "v1",
      "external_id": "v1",
      "date_from": "2023-10-01",
      "date_to": "2023-10-31",
      "logged_in_users_tz": "America/New_York",
      "time_zone": "America/New_York"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "loggedInUsersTz",
      "timeZone",
      "dateFrom",
      "dateTo",
      "credentialId",
      "externalId"
    ],
    "queryArgs": [
      {
        "name": "credential_id",
        "wire": "credentialId"
      },
      {
        "name": "date_from",
        "wire": "dateFrom"
      },
      {
        "name": "date_to",
        "wire": "dateTo"
      },
      {
        "name": "external_id",
        "wire": "externalId"
      },
      {
        "name": "logged_in_users_tz",
        "wire": "loggedInUsersTz"
      },
      {
        "name": "time_zone",
        "wire": "timeZone"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": [
        {
          "end": "2026-01-01T00:00:00Z",
          "source": "x",
          "start": "2026-01-01T00:00:00Z"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "calendar",
    "accessor": "Calendar",
    "op": "load",
    "method": "GET",
    "path": "/v2/calendars/{calendar}/connect",
    "action": "connect",
    "args": [
      {
        "name": "id",
        "wire": "calendar",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1",
      "is_dry_run": "v1",
      "redir": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "isDryRun",
      "redir"
    ],
    "queryArgs": [
      {
        "name": "is_dry_run",
        "wire": "isDryRun"
      },
      {
        "name": "redir",
        "wire": "redir"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "calendar",
    "accessor": "Calendar",
    "op": "load",
    "method": "GET",
    "path": "/v2/calendars/{calendar}/save",
    "action": "save",
    "args": [
      {
        "name": "id",
        "wire": "calendar",
        "value": "p1"
      }
    ],
    "select": {
      "code": "v1",
      "state": "v1"
    },
    "headers": [],
    "cookies": [],
    "query": [
      "state",
      "code"
    ],
    "queryArgs": [
      {
        "name": "code",
        "wire": "code"
      },
      {
        "name": "state",
        "wire": "state"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "calendar",
    "accessor": "Calendar",
    "op": "load",
    "method": "GET",
    "path": "/v2/calendars/{calendar}/check",
    "action": "check",
    "args": [
      {
        "name": "id",
        "wire": "calendar",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "calendar",
    "accessor": "Calendar",
    "op": "load",
    "method": "GET",
    "path": "/v2/calendars",
    "args": [],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "connectedCalendars": [
          {
            "calendars": [
              {
                "credentialId": 1,
                "delegationCredentialId": "x",
                "email": "x",
                "externalId": "x",
                "integration": "x",
                "isSelected": true,
                "name": "x",
                "primary": true,
                "readOnly": true
              }
            ],
            "credentialId": 1,
            "delegationCredentialId": "x",
            "integration": {
              "__template": "x",
              "appData": {},
              "categories": [
                "x"
              ],
              "category": "x",
              "description": "x",
              "dirName": "x",
              "email": "x",
              "installed": true,
              "locationOption": {},
              "logo": "x",
              "name": "x",
              "publisher": "x",
              "slug": "x",
              "title": "x",
              "type": "x",
              "url": "x",
              "variant": "x"
            },
            "primary": {
              "credentialId": 1,
              "delegationCredentialId": "x",
              "email": "x",
              "externalId": "x",
              "integration": "x",
              "isSelected": true,
              "name": "x",
              "primary": true,
              "readOnly": true
            }
          }
        ],
        "destinationCalendar": {
          "credentialId": 1,
          "delegationCredentialId": "x",
          "email": "x",
          "eventTypeId": 1,
          "externalId": "x",
          "id": {},
          "integration": "x",
          "integrationTitle": "x",
          "name": "x",
          "primary": true,
          "primaryEmail": "x",
          "readOnly": true,
          "userId": 1
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "calendar",
    "accessor": "Calendar",
    "op": "load",
    "method": "GET",
    "path": "/v2/calendars/ics-feed/check",
    "action": "check_ics_feed",
    "args": [],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "calendar",
    "accessor": "Calendar",
    "op": "load",
    "method": "GET",
    "path": "/v2/calendars/connections",
    "action": "connections",
    "args": [],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "connections": [
          {
            "connectionId": "123",
            "email": "user@gmail.com",
            "type": "google"
          }
        ]
      }
    },
    "idField": "id"
  },
  {
    "entity": "calendar_event",
    "accessor": "CalendarEvent",
    "op": "create",
    "method": "POST",
    "path": "/v2/calendars/{calendar}/events",
    "args": [
      {
        "name": "calendar_provider",
        "wire": "calendar",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 201,
    "sample": {
      "status": "success",
      "data": {
        "start": {
          "time": "2026-01-01T00:00:00Z",
          "timeZone": "x"
        },
        "end": {
          "time": "2026-01-01T00:00:00Z",
          "timeZone": "x"
        },
        "id": "x",
        "title": "x",
        "description": "x",
        "locations": [
          {
            "accessCode": "x",
            "label": "x",
            "meetingCode": "x",
            "password": "x",
            "type": "video",
            "url": "x"
          }
        ],
        "attendees": [
          {
            "email": "x",
            "host": true,
            "name": "x",
            "optional": true,
            "responseStatus": "accepted",
            "self": true
          }
        ],
        "status": "accepted",
        "hosts": [
          {
            "email": "x",
            "name": "x",
            "responseStatus": "accepted"
          }
        ],
        "calendarEventOwner": {
          "email": "x",
          "name": "x"
        },
        "source": "google"
      }
    },
    "idField": "id"
  },
  {
    "entity": "calendar_event",
    "accessor": "CalendarEvent",
    "op": "create",
    "method": "POST",
    "path": "/v2/calendars/connections/{connectionId}/events",
    "action": "connection",
    "args": [
      {
        "name": "connection_id",
        "wire": "connectionId",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1",
      "calendar_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "calendarId"
    ],
    "queryArgs": [],
    "auth": null,
    "status": 201,
    "sample": {
      "status": "success",
      "data": {
        "start": {
          "time": "2026-01-01T00:00:00Z",
          "timeZone": "x"
        },
        "end": {
          "time": "2026-01-01T00:00:00Z",
          "timeZone": "x"
        },
        "id": "x",
        "title": "x",
        "description": "x",
        "locations": [
          {
            "accessCode": "x",
            "label": "x",
            "meetingCode": "x",
            "password": "x",
            "type": "video",
            "url": "x"
          }
        ],
        "attendees": [
          {
            "email": "x",
            "host": true,
            "name": "x",
            "optional": true,
            "responseStatus": "accepted",
            "self": true
          }
        ],
        "status": "accepted",
        "hosts": [
          {
            "email": "x",
            "name": "x",
            "responseStatus": "accepted"
          }
        ],
        "calendarEventOwner": {
          "email": "x",
          "name": "x"
        },
        "source": "google"
      }
    },
    "idField": "id"
  },
  {
    "entity": "calendar_event",
    "accessor": "CalendarEvent",
    "op": "list",
    "method": "GET",
    "path": "/v2/calendars/{calendar}/events",
    "args": [
      {
        "name": "calendar_provider",
        "wire": "calendar",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1",
      "from": "2026-03-01",
      "to": "2026-03-31",
      "calendar_id": "primary",
      "time_zone": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "from",
      "to",
      "timeZone",
      "calendarId"
    ],
    "queryArgs": [
      {
        "name": "calendar_id",
        "wire": "calendarId"
      },
      {
        "name": "from",
        "wire": "from"
      },
      {
        "name": "time_zone",
        "wire": "timeZone"
      },
      {
        "name": "to",
        "wire": "to"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": [
        {
          "attendees": [
            {
              "email": "x",
              "host": true,
              "name": "x",
              "optional": true,
              "responseStatus": "accepted",
              "self": true
            }
          ],
          "calendarEventOwner": {
            "email": "x",
            "name": "x"
          },
          "description": "x",
          "end": {
            "time": "2026-01-01T00:00:00Z",
            "timeZone": "x"
          },
          "hosts": [
            {
              "email": "x",
              "name": "x",
              "responseStatus": "accepted"
            }
          ],
          "id": "x",
          "locations": [
            {
              "accessCode": "x",
              "label": "x",
              "meetingCode": "x",
              "password": "x",
              "type": "video",
              "url": "x"
            }
          ],
          "source": "google",
          "start": {
            "time": "2026-01-01T00:00:00Z",
            "timeZone": "x"
          },
          "status": "accepted",
          "title": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "calendar_event",
    "accessor": "CalendarEvent",
    "op": "list",
    "method": "GET",
    "path": "/v2/calendars/connections/{connectionId}/events",
    "action": "connection",
    "args": [
      {
        "name": "connection_id",
        "wire": "connectionId",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1",
      "from": "2026-03-01",
      "to": "2026-03-31",
      "calendar_id": "primary",
      "time_zone": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "from",
      "to",
      "timeZone",
      "calendarId"
    ],
    "queryArgs": [
      {
        "name": "calendar_id",
        "wire": "calendarId"
      },
      {
        "name": "from",
        "wire": "from"
      },
      {
        "name": "time_zone",
        "wire": "timeZone"
      },
      {
        "name": "to",
        "wire": "to"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": [
        {
          "attendees": [
            {
              "email": "x",
              "host": true,
              "name": "x",
              "optional": true,
              "responseStatus": "accepted",
              "self": true
            }
          ],
          "calendarEventOwner": {
            "email": "x",
            "name": "x"
          },
          "description": "x",
          "end": {
            "time": "2026-01-01T00:00:00Z",
            "timeZone": "x"
          },
          "hosts": [
            {
              "email": "x",
              "name": "x",
              "responseStatus": "accepted"
            }
          ],
          "id": "x",
          "locations": [
            {
              "accessCode": "x",
              "label": "x",
              "meetingCode": "x",
              "password": "x",
              "type": "video",
              "url": "x"
            }
          ],
          "source": "google",
          "start": {
            "time": "2026-01-01T00:00:00Z",
            "timeZone": "x"
          },
          "status": "accepted",
          "title": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "calendar_event",
    "accessor": "CalendarEvent",
    "op": "load",
    "method": "GET",
    "path": "/v2/calendars/connections/{connectionId}/events/{eventId}",
    "action": "connection",
    "args": [
      {
        "name": "connection_id",
        "wire": "connectionId",
        "value": "p1"
      },
      {
        "name": "id",
        "wire": "eventId",
        "value": "p2"
      }
    ],
    "select": {
      "authorization": "v1",
      "calendar_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "calendarId"
    ],
    "queryArgs": [
      {
        "name": "calendar_id",
        "wire": "calendarId"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "start": {
          "time": "2026-01-01T00:00:00Z",
          "timeZone": "x"
        },
        "end": {
          "time": "2026-01-01T00:00:00Z",
          "timeZone": "x"
        },
        "id": "x",
        "title": "x",
        "description": "x",
        "locations": [
          {
            "accessCode": "x",
            "label": "x",
            "meetingCode": "x",
            "password": "x",
            "type": "video",
            "url": "x"
          }
        ],
        "attendees": [
          {
            "email": "x",
            "host": true,
            "name": "x",
            "optional": true,
            "responseStatus": "accepted",
            "self": true
          }
        ],
        "status": "accepted",
        "hosts": [
          {
            "email": "x",
            "name": "x",
            "responseStatus": "accepted"
          }
        ],
        "calendarEventOwner": {
          "email": "x",
          "name": "x"
        },
        "source": "google"
      }
    },
    "idField": "id"
  },
  {
    "entity": "calendar_event",
    "accessor": "CalendarEvent",
    "op": "load",
    "method": "GET",
    "path": "/v2/calendars/{calendar}/event/{eventUid}",
    "action": "legacy",
    "args": [
      {
        "name": "calendar_provider",
        "wire": "calendar",
        "value": "p1"
      },
      {
        "name": "id",
        "wire": "eventUid",
        "value": "p2"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "start": {
          "time": "2026-01-01T00:00:00Z",
          "timeZone": "x"
        },
        "end": {
          "time": "2026-01-01T00:00:00Z",
          "timeZone": "x"
        },
        "id": "x",
        "title": "x",
        "description": "x",
        "locations": [
          {
            "accessCode": "x",
            "label": "x",
            "meetingCode": "x",
            "password": "x",
            "type": "video",
            "url": "x"
          }
        ],
        "attendees": [
          {
            "email": "x",
            "host": true,
            "name": "x",
            "optional": true,
            "responseStatus": "accepted",
            "self": true
          }
        ],
        "status": "accepted",
        "hosts": [
          {
            "email": "x",
            "name": "x",
            "responseStatus": "accepted"
          }
        ],
        "calendarEventOwner": {
          "email": "x",
          "name": "x"
        },
        "source": "google"
      }
    },
    "idField": "id"
  },
  {
    "entity": "calendar_event",
    "accessor": "CalendarEvent",
    "op": "load",
    "method": "GET",
    "path": "/v2/calendars/{calendar}/events/{eventUid}",
    "args": [
      {
        "name": "calendar_provider",
        "wire": "calendar",
        "value": "p1"
      },
      {
        "name": "id",
        "wire": "eventUid",
        "value": "p2"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "start": {
          "time": "2026-01-01T00:00:00Z",
          "timeZone": "x"
        },
        "end": {
          "time": "2026-01-01T00:00:00Z",
          "timeZone": "x"
        },
        "id": "x",
        "title": "x",
        "description": "x",
        "locations": [
          {
            "accessCode": "x",
            "label": "x",
            "meetingCode": "x",
            "password": "x",
            "type": "video",
            "url": "x"
          }
        ],
        "attendees": [
          {
            "email": "x",
            "host": true,
            "name": "x",
            "optional": true,
            "responseStatus": "accepted",
            "self": true
          }
        ],
        "status": "accepted",
        "hosts": [
          {
            "email": "x",
            "name": "x",
            "responseStatus": "accepted"
          }
        ],
        "calendarEventOwner": {
          "email": "x",
          "name": "x"
        },
        "source": "google"
      }
    },
    "idField": "id"
  },
  {
    "entity": "calendar_event",
    "accessor": "CalendarEvent",
    "op": "remove",
    "method": "DELETE",
    "path": "/v2/calendars/{calendar}/events/{eventUid}",
    "args": [
      {
        "name": "calendar_provider",
        "wire": "calendar",
        "value": "p1"
      },
      {
        "name": "id",
        "wire": "eventUid",
        "value": "p2"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 204,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "calendar_event",
    "accessor": "CalendarEvent",
    "op": "remove",
    "method": "DELETE",
    "path": "/v2/calendars/connections/{connectionId}/events/{eventId}",
    "action": "connection",
    "args": [
      {
        "name": "connection_id",
        "wire": "connectionId",
        "value": "p1"
      },
      {
        "name": "id",
        "wire": "eventId",
        "value": "p2"
      }
    ],
    "select": {
      "authorization": "v1",
      "calendar_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "query": [
      "calendarId"
    ],
    "queryArgs": [
      {
        "name": "calendar_id",
        "wire": "calendarId"
      }
    ],
    "auth": null,
    "status": 204,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "calendar_event",
    "accessor": "CalendarEvent",
    "op": "update",
    "method": "PATCH",
    "path": "/v2/calendars/connections/{connectionId}/events/{eventId}",
    "action": "connection",
    "args": [
      {
        "name": "connection_id",
        "wire": "connectionId",
        "value": "p1"
      },
      {
        "name": "id",
        "wire": "eventId",
        "value": "p2"
      }
    ],
    "select": {
      "authorization": "v1",
      "calendar_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "calendarId"
    ],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "start": {
          "time": "2026-01-01T00:00:00Z",
          "timeZone": "x"
        },
        "end": {
          "time": "2026-01-01T00:00:00Z",
          "timeZone": "x"
        },
        "id": "x",
        "title": "x",
        "description": "x",
        "locations": [
          {
            "accessCode": "x",
            "label": "x",
            "meetingCode": "x",
            "password": "x",
            "type": "video",
            "url": "x"
          }
        ],
        "attendees": [
          {
            "email": "x",
            "host": true,
            "name": "x",
            "optional": true,
            "responseStatus": "accepted",
            "self": true
          }
        ],
        "status": "accepted",
        "hosts": [
          {
            "email": "x",
            "name": "x",
            "responseStatus": "accepted"
          }
        ],
        "calendarEventOwner": {
          "email": "x",
          "name": "x"
        },
        "source": "google"
      }
    },
    "idField": "id"
  },
  {
    "entity": "calendar_event",
    "accessor": "CalendarEvent",
    "op": "update",
    "method": "PATCH",
    "path": "/v2/calendars/{calendar}/event/{eventUid}",
    "action": "legacy",
    "args": [
      {
        "name": "calendar_provider",
        "wire": "calendar",
        "value": "p1"
      },
      {
        "name": "id",
        "wire": "eventUid",
        "value": "p2"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "start": {
          "time": "2026-01-01T00:00:00Z",
          "timeZone": "x"
        },
        "end": {
          "time": "2026-01-01T00:00:00Z",
          "timeZone": "x"
        },
        "id": "x",
        "title": "x",
        "description": "x",
        "locations": [
          {
            "accessCode": "x",
            "label": "x",
            "meetingCode": "x",
            "password": "x",
            "type": "video",
            "url": "x"
          }
        ],
        "attendees": [
          {
            "email": "x",
            "host": true,
            "name": "x",
            "optional": true,
            "responseStatus": "accepted",
            "self": true
          }
        ],
        "status": "accepted",
        "hosts": [
          {
            "email": "x",
            "name": "x",
            "responseStatus": "accepted"
          }
        ],
        "calendarEventOwner": {
          "email": "x",
          "name": "x"
        },
        "source": "google"
      }
    },
    "idField": "id"
  },
  {
    "entity": "calendar_event",
    "accessor": "CalendarEvent",
    "op": "update",
    "method": "PATCH",
    "path": "/v2/calendars/{calendar}/events/{eventUid}",
    "args": [
      {
        "name": "calendar_provider",
        "wire": "calendar",
        "value": "p1"
      },
      {
        "name": "id",
        "wire": "eventUid",
        "value": "p2"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "start": {
          "time": "2026-01-01T00:00:00Z",
          "timeZone": "x"
        },
        "end": {
          "time": "2026-01-01T00:00:00Z",
          "timeZone": "x"
        },
        "id": "x",
        "title": "x",
        "description": "x",
        "locations": [
          {
            "accessCode": "x",
            "label": "x",
            "meetingCode": "x",
            "password": "x",
            "type": "video",
            "url": "x"
          }
        ],
        "attendees": [
          {
            "email": "x",
            "host": true,
            "name": "x",
            "optional": true,
            "responseStatus": "accepted",
            "self": true
          }
        ],
        "status": "accepted",
        "hosts": [
          {
            "email": "x",
            "name": "x",
            "responseStatus": "accepted"
          }
        ],
        "calendarEventOwner": {
          "email": "x",
          "name": "x"
        },
        "source": "google"
      }
    },
    "idField": "id"
  },
  {
    "entity": "conferencing",
    "accessor": "Conferencing",
    "op": "create",
    "method": "POST",
    "path": "/v2/conferencing/{app}/connect",
    "action": "connect",
    "args": [
      {
        "name": "app",
        "wire": "app",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "id": 1,
        "type": "google_video",
        "userId": 1,
        "invalid": true
      }
    },
    "idField": "id"
  },
  {
    "entity": "conferencing",
    "accessor": "Conferencing",
    "op": "create",
    "method": "POST",
    "path": "/v2/conferencing/{app}/default",
    "action": "default",
    "args": [
      {
        "name": "app",
        "wire": "app",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success"
    },
    "idField": "id"
  },
  {
    "entity": "conferencing",
    "accessor": "Conferencing",
    "op": "list",
    "method": "GET",
    "path": "/v2/conferencing",
    "args": [],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": [
        {
          "id": 1,
          "invalid": true,
          "type": "google_video",
          "userId": 1
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "conferencing",
    "accessor": "Conferencing",
    "op": "load",
    "method": "GET",
    "path": "/v2/conferencing/{app}/oauth/auth-url",
    "action": "oauth",
    "args": [
      {
        "name": "conferencing_id",
        "wire": "app",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1",
      "on_error_return_to": "v1",
      "return_to": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "returnTo",
      "onErrorReturnTo"
    ],
    "queryArgs": [
      {
        "name": "on_error_return_to",
        "wire": "onErrorReturnTo"
      },
      {
        "name": "return_to",
        "wire": "returnTo"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success"
    },
    "idField": "id"
  },
  {
    "entity": "conferencing",
    "accessor": "Conferencing",
    "op": "load",
    "method": "GET",
    "path": "/v2/conferencing/{app}/oauth/callback",
    "action": "oauth_callback",
    "args": [
      {
        "name": "conferencing_id",
        "wire": "app",
        "value": "p1"
      }
    ],
    "select": {
      "code": "v1",
      "state": "v1"
    },
    "headers": [],
    "cookies": [],
    "query": [
      "state",
      "code"
    ],
    "queryArgs": [
      {
        "name": "code",
        "wire": "code"
      },
      {
        "name": "state",
        "wire": "state"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "conferencing",
    "accessor": "Conferencing",
    "op": "load",
    "method": "GET",
    "path": "/v2/conferencing/default",
    "action": "default",
    "args": [],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "appLink": "x",
        "appSlug": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "conferencing",
    "accessor": "Conferencing",
    "op": "remove",
    "method": "DELETE",
    "path": "/v2/conferencing/{app}/disconnect",
    "action": "disconnect",
    "args": [
      {
        "name": "app",
        "wire": "app",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success"
    },
    "idField": "id"
  },
  {
    "entity": "destination_calendar",
    "accessor": "DestinationCalendar",
    "op": "update",
    "method": "PUT",
    "path": "/v2/destination-calendars",
    "args": [],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "userId": 1,
        "integration": "x",
        "externalId": "x",
        "credentialId": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "event_type",
    "accessor": "EventType",
    "op": "create",
    "method": "POST",
    "path": "/v2/event-types",
    "args": [],
    "select": {
      "authorization": "v1"
    },
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-06-14"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 201,
    "sample": {
      "status": "success",
      "data": {
        "id": 1,
        "lengthInMinutes": 60,
        "lengthInMinutesOptions": [
          15,
          30,
          60
        ],
        "title": "Learn the secrets of masterchief!",
        "slug": "learn-the-secrets-of-masterchief",
        "description": "Discover the culinary wonders of Argentina by making the best flan ever!",
        "locations": [
          {
            "address": "123 Example St, City, Country",
            "public": true,
            "type": "address"
          }
        ],
        "bookingFields": [
          {
            "disableOnPrefill": true,
            "isDefault": true,
            "label": "x",
            "placeholder": "x",
            "required": true,
            "slug": "x",
            "type": "name"
          }
        ],
        "disableGuests": true,
        "slotInterval": 60,
        "minimumBookingNotice": 0,
        "beforeEventBuffer": 0,
        "afterEventBuffer": 0,
        "recurrence": {
          "frequency": "yearly",
          "interval": 10,
          "occurrences": 10
        },
        "metadata": {},
        "price": 1,
        "currency": "x",
        "lockTimeZoneToggleOnBookingPage": true,
        "seatsPerTimeSlot": {},
        "forwardParamsSuccessRedirect": {},
        "successRedirectUrl": {},
        "isInstantEvent": true,
        "seatsShowAvailabilityCount": true,
        "scheduleId": 1,
        "bookingLimitsCount": {},
        "bookerActiveBookingsLimit": {
          "maximumActiveBookings": 3,
          "offerReschedule": true
        },
        "onlyShowFirstAvailableSlot": true,
        "bookingLimitsDuration": {},
        "bookingWindow": [
          {
            "rolling": true,
            "type": "businessDays",
            "value": 5
          }
        ],
        "bookerLayouts": {
          "defaultLayout": "month",
          "enabledLayouts": [
            "month"
          ]
        },
        "confirmationPolicy": {},
        "requiresBookerEmailVerification": true,
        "hideCalendarNotes": true,
        "color": {
          "darkThemeHex": "#fafafa",
          "lightThemeHex": "#292929"
        },
        "seats": {
          "seatsPerTimeSlot": 4,
          "showAttendeeInfo": true,
          "showAvailabilityCount": true
        },
        "offsetStart": 1,
        "customName": "x",
        "destinationCalendar": {
          "externalId": "x",
          "integration": "x"
        },
        "useDestinationCalendarEmail": true,
        "hideCalendarEventDetails": true,
        "hideOrganizerEmail": true,
        "calVideoSettings": {
          "disableRecordingForGuests": true,
          "disableRecordingForOrganizer": true,
          "disableTranscriptionForGuests": true,
          "disableTranscriptionForOrganizer": true,
          "enableAutomaticRecordingForOrganizer": true,
          "enableAutomaticTranscription": true,
          "redirectUrlOnExit": {},
          "sendTranscriptionEmails": true
        },
        "hidden": true,
        "bookingRequiresAuthentication": true,
        "disableCancelling": {
          "disabled": true
        },
        "disableRescheduling": {
          "disabled": true,
          "minutesBefore": 60
        },
        "interfaceLanguage": "x",
        "allowReschedulingPastBookings": true,
        "allowReschedulingCancelledBookings": true,
        "showOptimizedSlots": true,
        "ownerId": 10,
        "users": [
          "x"
        ],
        "bookingUrl": "https://cal.com/john-doe/30min"
      }
    },
    "idField": "id"
  },
  {
    "entity": "event_type",
    "accessor": "EventType",
    "op": "list",
    "method": "GET",
    "path": "/v2/event-types",
    "args": [],
    "select": {
      "event_slug": "v1",
      "org_id": "v1",
      "org_slug": "v1",
      "sort_created_at": "v1",
      "username": "v1"
    },
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-06-14"
      },
      {
        "name": "x_cal_client_id",
        "wire": "x-cal-client-id",
        "value": "h2"
      },
      {
        "name": "x_cal_secret_key",
        "wire": "x-cal-secret-key",
        "value": "h3"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "username",
      "eventSlug",
      "usernames",
      "orgSlug",
      "orgId",
      "sortCreatedAt"
    ],
    "queryArgs": [
      {
        "name": "event_slug",
        "wire": "eventSlug"
      },
      {
        "name": "org_id",
        "wire": "orgId"
      },
      {
        "name": "org_slug",
        "wire": "orgSlug"
      },
      {
        "name": "sort_created_at",
        "wire": "sortCreatedAt"
      },
      {
        "name": "username",
        "wire": "username"
      },
      {
        "name": "username",
        "wire": "usernames"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": [
        {
          "afterEventBuffer": 0,
          "allowReschedulingCancelledBookings": true,
          "allowReschedulingPastBookings": true,
          "beforeEventBuffer": 0,
          "bookerActiveBookingsLimit": {
            "maximumActiveBookings": 3,
            "offerReschedule": true
          },
          "bookerLayouts": {
            "defaultLayout": "month",
            "enabledLayouts": [
              "month"
            ]
          },
          "bookingFields": [
            {
              "disableOnPrefill": true,
              "isDefault": true,
              "label": "x",
              "placeholder": "x",
              "required": true,
              "slug": "x",
              "type": "name"
            }
          ],
          "bookingLimitsCount": {},
          "bookingLimitsDuration": {},
          "bookingRequiresAuthentication": true,
          "bookingUrl": "https://cal.com/john-doe/30min",
          "bookingWindow": [
            {
              "rolling": true,
              "type": "businessDays",
              "value": 5
            }
          ],
          "calVideoSettings": {
            "disableRecordingForGuests": true,
            "disableRecordingForOrganizer": true,
            "disableTranscriptionForGuests": true,
            "disableTranscriptionForOrganizer": true,
            "enableAutomaticRecordingForOrganizer": true,
            "enableAutomaticTranscription": true,
            "redirectUrlOnExit": {},
            "sendTranscriptionEmails": true
          },
          "color": {
            "darkThemeHex": "#fafafa",
            "lightThemeHex": "#292929"
          },
          "confirmationPolicy": {},
          "currency": "x",
          "customName": "x",
          "description": "Discover the culinary wonders of Argentina by making the best flan ever!",
          "destinationCalendar": {
            "externalId": "x",
            "integration": "x"
          },
          "disableCancelling": {
            "disabled": true
          },
          "disableGuests": true,
          "disableRescheduling": {
            "disabled": true,
            "minutesBefore": 60
          },
          "forwardParamsSuccessRedirect": {},
          "hidden": true,
          "hideCalendarEventDetails": true,
          "hideCalendarNotes": true,
          "hideOrganizerEmail": true,
          "id": 1,
          "interfaceLanguage": "x",
          "isInstantEvent": true,
          "lengthInMinutes": 60,
          "lengthInMinutesOptions": [
            15,
            30,
            60
          ],
          "locations": [
            {
              "address": "123 Example St, City, Country",
              "public": true,
              "type": "address"
            }
          ],
          "lockTimeZoneToggleOnBookingPage": true,
          "metadata": {},
          "minimumBookingNotice": 0,
          "offsetStart": 1,
          "onlyShowFirstAvailableSlot": true,
          "ownerId": 10,
          "price": 1,
          "recurrence": {
            "frequency": "yearly",
            "interval": 10,
            "occurrences": 10
          },
          "requiresBookerEmailVerification": true,
          "scheduleId": 1,
          "seats": {
            "seatsPerTimeSlot": 4,
            "showAttendeeInfo": true,
            "showAvailabilityCount": true
          },
          "seatsPerTimeSlot": {},
          "seatsShowAvailabilityCount": true,
          "showOptimizedSlots": true,
          "slotInterval": 60,
          "slug": "learn-the-secrets-of-masterchief",
          "successRedirectUrl": {},
          "title": "Learn the secrets of masterchief!",
          "useDestinationCalendarEmail": true,
          "users": [
            "x"
          ]
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "event_type",
    "accessor": "EventType",
    "op": "load",
    "method": "GET",
    "path": "/v2/event-types/{eventTypeId}",
    "args": [
      {
        "name": "id",
        "wire": "eventTypeId",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-06-14"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "id": 1,
        "lengthInMinutes": 60,
        "lengthInMinutesOptions": [
          15,
          30,
          60
        ],
        "title": "Learn the secrets of masterchief!",
        "slug": "learn-the-secrets-of-masterchief",
        "description": "Discover the culinary wonders of Argentina by making the best flan ever!",
        "locations": [
          {
            "address": "123 Example St, City, Country",
            "public": true,
            "type": "address"
          }
        ],
        "bookingFields": [
          {
            "disableOnPrefill": true,
            "isDefault": true,
            "label": "x",
            "placeholder": "x",
            "required": true,
            "slug": "x",
            "type": "name"
          }
        ],
        "disableGuests": true,
        "slotInterval": 60,
        "minimumBookingNotice": 0,
        "beforeEventBuffer": 0,
        "afterEventBuffer": 0,
        "recurrence": {
          "frequency": "yearly",
          "interval": 10,
          "occurrences": 10
        },
        "metadata": {},
        "price": 1,
        "currency": "x",
        "lockTimeZoneToggleOnBookingPage": true,
        "seatsPerTimeSlot": {},
        "forwardParamsSuccessRedirect": {},
        "successRedirectUrl": {},
        "isInstantEvent": true,
        "seatsShowAvailabilityCount": true,
        "scheduleId": 1,
        "bookingLimitsCount": {},
        "bookerActiveBookingsLimit": {
          "maximumActiveBookings": 3,
          "offerReschedule": true
        },
        "onlyShowFirstAvailableSlot": true,
        "bookingLimitsDuration": {},
        "bookingWindow": [
          {
            "rolling": true,
            "type": "businessDays",
            "value": 5
          }
        ],
        "bookerLayouts": {
          "defaultLayout": "month",
          "enabledLayouts": [
            "month"
          ]
        },
        "confirmationPolicy": {},
        "requiresBookerEmailVerification": true,
        "hideCalendarNotes": true,
        "color": {
          "darkThemeHex": "#fafafa",
          "lightThemeHex": "#292929"
        },
        "seats": {
          "seatsPerTimeSlot": 4,
          "showAttendeeInfo": true,
          "showAvailabilityCount": true
        },
        "offsetStart": 1,
        "customName": "x",
        "destinationCalendar": {
          "externalId": "x",
          "integration": "x"
        },
        "useDestinationCalendarEmail": true,
        "hideCalendarEventDetails": true,
        "hideOrganizerEmail": true,
        "calVideoSettings": {
          "disableRecordingForGuests": true,
          "disableRecordingForOrganizer": true,
          "disableTranscriptionForGuests": true,
          "disableTranscriptionForOrganizer": true,
          "enableAutomaticRecordingForOrganizer": true,
          "enableAutomaticTranscription": true,
          "redirectUrlOnExit": {},
          "sendTranscriptionEmails": true
        },
        "hidden": true,
        "bookingRequiresAuthentication": true,
        "disableCancelling": {
          "disabled": true
        },
        "disableRescheduling": {
          "disabled": true,
          "minutesBefore": 60
        },
        "interfaceLanguage": "x",
        "allowReschedulingPastBookings": true,
        "allowReschedulingCancelledBookings": true,
        "showOptimizedSlots": true,
        "ownerId": 10,
        "users": [
          "x"
        ],
        "bookingUrl": "https://cal.com/john-doe/30min"
      }
    },
    "idField": "id"
  },
  {
    "entity": "event_type",
    "accessor": "EventType",
    "op": "remove",
    "method": "DELETE",
    "path": "/v2/event-types/{eventTypeId}",
    "args": [
      {
        "name": "id",
        "wire": "eventTypeId",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-06-14"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "id": 1,
        "lengthInMinutes": 60,
        "title": "Learn the secrets of masterchief!",
        "slug": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "event_type",
    "accessor": "EventType",
    "op": "update",
    "method": "PATCH",
    "path": "/v2/event-types/{eventTypeId}",
    "args": [
      {
        "name": "id",
        "wire": "eventTypeId",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-06-14"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "id": 1,
        "lengthInMinutes": 60,
        "lengthInMinutesOptions": [
          15,
          30,
          60
        ],
        "title": "Learn the secrets of masterchief!",
        "slug": "learn-the-secrets-of-masterchief",
        "description": "Discover the culinary wonders of Argentina by making the best flan ever!",
        "locations": [
          {
            "address": "123 Example St, City, Country",
            "public": true,
            "type": "address"
          }
        ],
        "bookingFields": [
          {
            "disableOnPrefill": true,
            "isDefault": true,
            "label": "x",
            "placeholder": "x",
            "required": true,
            "slug": "x",
            "type": "name"
          }
        ],
        "disableGuests": true,
        "slotInterval": 60,
        "minimumBookingNotice": 0,
        "beforeEventBuffer": 0,
        "afterEventBuffer": 0,
        "recurrence": {
          "frequency": "yearly",
          "interval": 10,
          "occurrences": 10
        },
        "metadata": {},
        "price": 1,
        "currency": "x",
        "lockTimeZoneToggleOnBookingPage": true,
        "seatsPerTimeSlot": {},
        "forwardParamsSuccessRedirect": {},
        "successRedirectUrl": {},
        "isInstantEvent": true,
        "seatsShowAvailabilityCount": true,
        "scheduleId": 1,
        "bookingLimitsCount": {},
        "bookerActiveBookingsLimit": {
          "maximumActiveBookings": 3,
          "offerReschedule": true
        },
        "onlyShowFirstAvailableSlot": true,
        "bookingLimitsDuration": {},
        "bookingWindow": [
          {
            "rolling": true,
            "type": "businessDays",
            "value": 5
          }
        ],
        "bookerLayouts": {
          "defaultLayout": "month",
          "enabledLayouts": [
            "month"
          ]
        },
        "confirmationPolicy": {},
        "requiresBookerEmailVerification": true,
        "hideCalendarNotes": true,
        "color": {
          "darkThemeHex": "#fafafa",
          "lightThemeHex": "#292929"
        },
        "seats": {
          "seatsPerTimeSlot": 4,
          "showAttendeeInfo": true,
          "showAvailabilityCount": true
        },
        "offsetStart": 1,
        "customName": "x",
        "destinationCalendar": {
          "externalId": "x",
          "integration": "x"
        },
        "useDestinationCalendarEmail": true,
        "hideCalendarEventDetails": true,
        "hideOrganizerEmail": true,
        "calVideoSettings": {
          "disableRecordingForGuests": true,
          "disableRecordingForOrganizer": true,
          "disableTranscriptionForGuests": true,
          "disableTranscriptionForOrganizer": true,
          "enableAutomaticRecordingForOrganizer": true,
          "enableAutomaticTranscription": true,
          "redirectUrlOnExit": {},
          "sendTranscriptionEmails": true
        },
        "hidden": true,
        "bookingRequiresAuthentication": true,
        "disableCancelling": {
          "disabled": true
        },
        "disableRescheduling": {
          "disabled": true,
          "minutesBefore": 60
        },
        "interfaceLanguage": "x",
        "allowReschedulingPastBookings": true,
        "allowReschedulingCancelledBookings": true,
        "showOptimizedSlots": true,
        "ownerId": 10,
        "users": [
          "x"
        ],
        "bookingUrl": "https://cal.com/john-doe/30min"
      }
    },
    "idField": "id"
  },
  {
    "entity": "event_type_webhook",
    "accessor": "EventTypeWebhook",
    "op": "create",
    "method": "POST",
    "path": "/v2/event-types/{eventTypeId}/webhooks",
    "args": [
      {
        "name": "event_type_id",
        "wire": "eventTypeId",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 201,
    "sample": {
      "status": "success",
      "data": {
        "payloadTemplate": "{\"content\":\"A new event has been scheduled\",\"type\":\"{{type}}\",\"name\":\"{{title}}\",\"organizer\":\"{{organizer.name}}\",\"booker\":\"{{attendees.0.name}}\"}",
        "triggers": [
          "BOOKING_CREATED"
        ],
        "eventTypeId": 1,
        "id": 1,
        "subscriberUrl": "x",
        "active": true,
        "secret": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "event_type_webhook",
    "accessor": "EventTypeWebhook",
    "op": "list",
    "method": "GET",
    "path": "/v2/event-types/{eventTypeId}/webhooks",
    "args": [
      {
        "name": "event_type_id",
        "wire": "eventTypeId",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1",
      "skip": 0,
      "take": 25
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "take",
      "skip"
    ],
    "queryArgs": [
      {
        "name": "skip",
        "wire": "skip"
      },
      {
        "name": "take",
        "wire": "take"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": [
        {
          "active": true,
          "eventTypeId": 1,
          "id": 1,
          "payloadTemplate": "{\"content\":\"A new event has been scheduled\",\"type\":\"{{type}}\",\"name\":\"{{title}}\",\"organizer\":\"{{organizer.name}}\",\"booker\":\"{{attendees.0.name}}\"}",
          "secret": "x",
          "subscriberUrl": "x",
          "triggers": [
            "BOOKING_CREATED"
          ]
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "event_type_webhook",
    "accessor": "EventTypeWebhook",
    "op": "load",
    "method": "GET",
    "path": "/v2/event-types/{eventTypeId}/webhooks/{webhookId}",
    "args": [
      {
        "name": "event_type_id",
        "wire": "eventTypeId",
        "value": "p1"
      },
      {
        "name": "id",
        "wire": "webhookId",
        "value": "p2"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "payloadTemplate": "{\"content\":\"A new event has been scheduled\",\"type\":\"{{type}}\",\"name\":\"{{title}}\",\"organizer\":\"{{organizer.name}}\",\"booker\":\"{{attendees.0.name}}\"}",
        "triggers": [
          "BOOKING_CREATED"
        ],
        "eventTypeId": 1,
        "id": 1,
        "subscriberUrl": "x",
        "active": true,
        "secret": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "event_type_webhook",
    "accessor": "EventTypeWebhook",
    "op": "remove",
    "method": "DELETE",
    "path": "/v2/event-types/{eventTypeId}/webhooks/{webhookId}",
    "args": [
      {
        "name": "event_type_id",
        "wire": "eventTypeId",
        "value": "p1"
      },
      {
        "name": "id",
        "wire": "webhookId",
        "value": "p2"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "payloadTemplate": "{\"content\":\"A new event has been scheduled\",\"type\":\"{{type}}\",\"name\":\"{{title}}\",\"organizer\":\"{{organizer.name}}\",\"booker\":\"{{attendees.0.name}}\"}",
        "triggers": [
          "BOOKING_CREATED"
        ],
        "eventTypeId": 1,
        "id": 1,
        "subscriberUrl": "x",
        "active": true,
        "secret": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "event_type_webhook",
    "accessor": "EventTypeWebhook",
    "op": "remove",
    "method": "DELETE",
    "path": "/v2/event-types/{eventTypeId}/webhooks",
    "args": [
      {
        "name": "event_type_id",
        "wire": "eventTypeId",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": "x"
    },
    "idField": "id"
  },
  {
    "entity": "event_type_webhook",
    "accessor": "EventTypeWebhook",
    "op": "update",
    "method": "PATCH",
    "path": "/v2/event-types/{eventTypeId}/webhooks/{webhookId}",
    "args": [
      {
        "name": "event_type_id",
        "wire": "eventTypeId",
        "value": "p1"
      },
      {
        "name": "id",
        "wire": "webhookId",
        "value": "p2"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "payloadTemplate": "{\"content\":\"A new event has been scheduled\",\"type\":\"{{type}}\",\"name\":\"{{title}}\",\"organizer\":\"{{organizer.name}}\",\"booker\":\"{{attendees.0.name}}\"}",
        "triggers": [
          "BOOKING_CREATED"
        ],
        "eventTypeId": 1,
        "id": 1,
        "subscriberUrl": "x",
        "active": true,
        "secret": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "managed_user",
    "accessor": "ManagedUser",
    "op": "create",
    "method": "POST",
    "path": "/v2/oauth-clients/{clientId}/users",
    "args": [
      {
        "name": "oauth_client_id",
        "wire": "clientId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "x_cal_secret_key",
        "wire": "x-cal-secret-key",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 201,
    "sample": {
      "status": "success",
      "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        "user": {
          "id": 1,
          "email": "alice+cluo37fwd0001khkzqqynkpj3@example.com",
          "username": "alice",
          "name": "alice",
          "bio": "bio",
          "timeZone": "America/New_York",
          "weekStart": "Sunday",
          "createdDate": "2024-04-01T00:00:00.000Z",
          "timeFormat": 12,
          "defaultScheduleId": null,
          "locale": "en",
          "avatarUrl": "https://cal.com/api/avatar/2b735186-b01b-46d3-87da-019b8f61776b.png",
          "metadata": {
            "key": "value"
          }
        },
        "accessTokenExpiresAt": 1,
        "refreshTokenExpiresAt": 1
      },
      "error": {}
    },
    "idField": "id"
  },
  {
    "entity": "managed_user",
    "accessor": "ManagedUser",
    "op": "list",
    "method": "GET",
    "path": "/v2/oauth-clients/{clientId}/users",
    "args": [
      {
        "name": "oauth_client_id",
        "wire": "clientId",
        "value": "p1"
      }
    ],
    "select": {
      "email": "?emails=email1@example.com,email2@example.com",
      "limit": 10,
      "offset": 0
    },
    "headers": [
      {
        "name": "x_cal_secret_key",
        "wire": "x-cal-secret-key",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "limit",
      "offset",
      "emails"
    ],
    "queryArgs": [
      {
        "name": "email",
        "wire": "emails"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "offset",
        "wire": "offset"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": [
        {
          "avatarUrl": "https://cal.com/api/avatar/2b735186-b01b-46d3-87da-019b8f61776b.png",
          "bio": "bio",
          "createdDate": "2024-04-01T00:00:00.000Z",
          "defaultScheduleId": null,
          "email": "alice+cluo37fwd0001khkzqqynkpj3@example.com",
          "id": 1,
          "locale": "en",
          "metadata": {
            "key": "value"
          },
          "name": "alice",
          "timeFormat": 12,
          "timeZone": "America/New_York",
          "username": "alice",
          "weekStart": "Sunday"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "managed_user",
    "accessor": "ManagedUser",
    "op": "load",
    "method": "GET",
    "path": "/v2/oauth-clients/{clientId}/users/{userId}",
    "args": [
      {
        "name": "id",
        "wire": "userId",
        "value": "p1"
      },
      {
        "name": "oauth_client_id",
        "wire": "clientId",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "x_cal_secret_key",
        "wire": "x-cal-secret-key",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "id": 1,
        "email": "alice+cluo37fwd0001khkzqqynkpj3@example.com",
        "username": "alice",
        "name": "alice",
        "bio": "bio",
        "timeZone": "America/New_York",
        "weekStart": "Sunday",
        "createdDate": "2024-04-01T00:00:00.000Z",
        "timeFormat": 12,
        "defaultScheduleId": null,
        "locale": "en",
        "avatarUrl": "https://cal.com/api/avatar/2b735186-b01b-46d3-87da-019b8f61776b.png",
        "metadata": {
          "key": "value"
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "managed_user",
    "accessor": "ManagedUser",
    "op": "remove",
    "method": "DELETE",
    "path": "/v2/oauth-clients/{clientId}/users/{userId}",
    "args": [
      {
        "name": "id",
        "wire": "userId",
        "value": "p1"
      },
      {
        "name": "oauth_client_id",
        "wire": "clientId",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "x_cal_secret_key",
        "wire": "x-cal-secret-key",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "id": 1,
        "email": "alice+cluo37fwd0001khkzqqynkpj3@example.com",
        "username": "alice",
        "name": "alice",
        "bio": "bio",
        "timeZone": "America/New_York",
        "weekStart": "Sunday",
        "createdDate": "2024-04-01T00:00:00.000Z",
        "timeFormat": 12,
        "defaultScheduleId": null,
        "locale": "en",
        "avatarUrl": "https://cal.com/api/avatar/2b735186-b01b-46d3-87da-019b8f61776b.png",
        "metadata": {
          "key": "value"
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "managed_user",
    "accessor": "ManagedUser",
    "op": "update",
    "method": "PATCH",
    "path": "/v2/oauth-clients/{clientId}/users/{userId}",
    "args": [
      {
        "name": "id",
        "wire": "userId",
        "value": "p1"
      },
      {
        "name": "oauth_client_id",
        "wire": "clientId",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "x_cal_secret_key",
        "wire": "x-cal-secret-key",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "id": 1,
        "email": "alice+cluo37fwd0001khkzqqynkpj3@example.com",
        "username": "alice",
        "name": "alice",
        "bio": "bio",
        "timeZone": "America/New_York",
        "weekStart": "Sunday",
        "createdDate": "2024-04-01T00:00:00.000Z",
        "timeFormat": 12,
        "defaultScheduleId": null,
        "locale": "en",
        "avatarUrl": "https://cal.com/api/avatar/2b735186-b01b-46d3-87da-019b8f61776b.png",
        "metadata": {
          "key": "value"
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "me",
    "accessor": "Me",
    "op": "load",
    "method": "GET",
    "path": "/v2/me",
    "args": [],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "avatarUrl": "x",
        "bio": "x",
        "defaultScheduleId": 1,
        "email": "x",
        "id": 1,
        "name": "x",
        "organization": {
          "id": 1,
          "isPlatform": true
        },
        "organizationId": 1,
        "timeFormat": 1,
        "timeZone": "x",
        "username": "x",
        "weekStart": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "me",
    "accessor": "Me",
    "op": "update",
    "method": "PATCH",
    "path": "/v2/me",
    "args": [],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "id": 1,
        "username": "x",
        "email": "x",
        "name": "x",
        "avatarUrl": "x",
        "bio": "x",
        "timeFormat": 1,
        "defaultScheduleId": 1,
        "weekStart": "x",
        "timeZone": "x",
        "organizationId": 1,
        "organization": {
          "id": 1,
          "isPlatform": true
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "oauth_client",
    "accessor": "OauthClient",
    "op": "create",
    "method": "POST",
    "path": "/v2/oauth-clients",
    "args": [],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 201,
    "sample": {
      "status": "success",
      "data": {
        "clientId": "clsx38nbl0001vkhlwin9fmt0",
        "clientSecret": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoib2F1dGgtY2xpZW50Iiwi"
      }
    },
    "idField": "id"
  },
  {
    "entity": "oauth_client",
    "accessor": "OauthClient",
    "op": "list",
    "method": "GET",
    "path": "/v2/oauth-clients",
    "args": [],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": [
        {
          "areCalendarEventsEnabled": true,
          "areDefaultEventTypesEnabled": true,
          "areEmailsEnabled": true,
          "bookingCancelRedirectUri": "https://example.com/booking-cancel",
          "bookingRedirectUri": "https://example.com/booking-redirect",
          "bookingRescheduleRedirectUri": "https://example.com/booking-reschedule",
          "createdAt": "2024-03-23T08:33:21.851Z",
          "id": "clsx38nbl0001vkhlwin9fmt0",
          "logo": "https://example.com/logo.png",
          "name": "MyClient",
          "organizationId": 1,
          "permissions": [
            "BOOKING_READ",
            "BOOKING_WRITE"
          ],
          "redirectUris": [
            "https://example.com/callback"
          ],
          "secret": "secretValue"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "oauth_client",
    "accessor": "OauthClient",
    "op": "load",
    "method": "GET",
    "path": "/v2/oauth-clients/{clientId}",
    "args": [
      {
        "name": "id",
        "wire": "clientId",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "id": "clsx38nbl0001vkhlwin9fmt0",
        "name": "MyClient",
        "secret": "secretValue",
        "permissions": [
          "BOOKING_READ",
          "BOOKING_WRITE"
        ],
        "logo": "https://example.com/logo.png",
        "redirectUris": [
          "https://example.com/callback"
        ],
        "organizationId": 1,
        "createdAt": "2024-03-23T08:33:21.851Z",
        "areEmailsEnabled": true,
        "areDefaultEventTypesEnabled": true,
        "areCalendarEventsEnabled": true,
        "bookingRedirectUri": "https://example.com/booking-redirect",
        "bookingCancelRedirectUri": "https://example.com/booking-cancel",
        "bookingRescheduleRedirectUri": "https://example.com/booking-reschedule"
      }
    },
    "idField": "id"
  },
  {
    "entity": "oauth_client",
    "accessor": "OauthClient",
    "op": "load",
    "method": "GET",
    "path": "/v2/auth/oauth2/clients/{clientId}",
    "action": "oauth2",
    "args": [
      {
        "name": "client_id",
        "wire": "clientId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "client_id": "clxxxxxxxxxxxxxxxx",
        "redirect_uris": [
          "https://example.com/callback"
        ],
        "name": "My App",
        "logo": "x",
        "is_trusted": false,
        "client_type": "CONFIDENTIAL"
      }
    },
    "idField": "id"
  },
  {
    "entity": "oauth_client",
    "accessor": "OauthClient",
    "op": "remove",
    "method": "DELETE",
    "path": "/v2/oauth-clients/{clientId}",
    "args": [
      {
        "name": "id",
        "wire": "clientId",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "id": "clsx38nbl0001vkhlwin9fmt0",
        "name": "MyClient",
        "secret": "secretValue",
        "permissions": [
          "BOOKING_READ",
          "BOOKING_WRITE"
        ],
        "logo": "https://example.com/logo.png",
        "redirectUris": [
          "https://example.com/callback"
        ],
        "organizationId": 1,
        "createdAt": "2024-03-23T08:33:21.851Z",
        "areEmailsEnabled": true,
        "areDefaultEventTypesEnabled": true,
        "areCalendarEventsEnabled": true,
        "bookingRedirectUri": "https://example.com/booking-redirect",
        "bookingCancelRedirectUri": "https://example.com/booking-cancel",
        "bookingRescheduleRedirectUri": "https://example.com/booking-reschedule"
      }
    },
    "idField": "id"
  },
  {
    "entity": "oauth_client",
    "accessor": "OauthClient",
    "op": "update",
    "method": "PATCH",
    "path": "/v2/oauth-clients/{clientId}",
    "args": [
      {
        "name": "id",
        "wire": "clientId",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "id": "clsx38nbl0001vkhlwin9fmt0",
        "name": "MyClient",
        "secret": "secretValue",
        "permissions": [
          "BOOKING_READ",
          "BOOKING_WRITE"
        ],
        "logo": "https://example.com/logo.png",
        "redirectUris": [
          "https://example.com/callback"
        ],
        "organizationId": 1,
        "createdAt": "2024-03-23T08:33:21.851Z",
        "areEmailsEnabled": true,
        "areDefaultEventTypesEnabled": true,
        "areCalendarEventsEnabled": true,
        "bookingRedirectUri": "https://example.com/booking-redirect",
        "bookingCancelRedirectUri": "https://example.com/booking-cancel",
        "bookingRescheduleRedirectUri": "https://example.com/booking-reschedule"
      }
    },
    "idField": "id"
  },
  {
    "entity": "oauth_client_webhook",
    "accessor": "OauthClientWebhook",
    "op": "create",
    "method": "POST",
    "path": "/v2/oauth-clients/{clientId}/webhooks",
    "args": [
      {
        "name": "oauth_client_id",
        "wire": "clientId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "x_cal_secret_key",
        "wire": "x-cal-secret-key",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 201,
    "sample": {
      "status": "success",
      "data": {
        "payloadTemplate": "{\"content\":\"A new event has been scheduled\",\"type\":\"{{type}}\",\"name\":\"{{title}}\",\"organizer\":\"{{organizer.name}}\",\"booker\":\"{{attendees.0.name}}\"}",
        "triggers": [
          "BOOKING_CREATED"
        ],
        "oAuthClientId": "x",
        "id": 1,
        "subscriberUrl": "x",
        "active": true,
        "secret": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "oauth_client_webhook",
    "accessor": "OauthClientWebhook",
    "op": "list",
    "method": "GET",
    "path": "/v2/oauth-clients/{clientId}/webhooks",
    "args": [
      {
        "name": "oauth_client_id",
        "wire": "clientId",
        "value": "p1"
      }
    ],
    "select": {
      "skip": 0,
      "take": 25
    },
    "headers": [
      {
        "name": "x_cal_secret_key",
        "wire": "x-cal-secret-key",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "take",
      "skip"
    ],
    "queryArgs": [
      {
        "name": "skip",
        "wire": "skip"
      },
      {
        "name": "take",
        "wire": "take"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": [
        {
          "active": true,
          "id": 1,
          "oAuthClientId": "x",
          "payloadTemplate": "{\"content\":\"A new event has been scheduled\",\"type\":\"{{type}}\",\"name\":\"{{title}}\",\"organizer\":\"{{organizer.name}}\",\"booker\":\"{{attendees.0.name}}\"}",
          "secret": "x",
          "subscriberUrl": "x",
          "triggers": [
            "BOOKING_CREATED"
          ]
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "oauth_client_webhook",
    "accessor": "OauthClientWebhook",
    "op": "load",
    "method": "GET",
    "path": "/v2/oauth-clients/{clientId}/webhooks/{webhookId}",
    "args": [
      {
        "name": "id",
        "wire": "webhookId",
        "value": "p1"
      },
      {
        "name": "oauth_client_id",
        "wire": "clientId",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "x_cal_secret_key",
        "wire": "x-cal-secret-key",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "payloadTemplate": "{\"content\":\"A new event has been scheduled\",\"type\":\"{{type}}\",\"name\":\"{{title}}\",\"organizer\":\"{{organizer.name}}\",\"booker\":\"{{attendees.0.name}}\"}",
        "triggers": [
          "BOOKING_CREATED"
        ],
        "oAuthClientId": "x",
        "id": 1,
        "subscriberUrl": "x",
        "active": true,
        "secret": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "oauth_client_webhook",
    "accessor": "OauthClientWebhook",
    "op": "remove",
    "method": "DELETE",
    "path": "/v2/oauth-clients/{clientId}/webhooks/{webhookId}",
    "args": [
      {
        "name": "id",
        "wire": "webhookId",
        "value": "p1"
      },
      {
        "name": "oauth_client_id",
        "wire": "clientId",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "x_cal_secret_key",
        "wire": "x-cal-secret-key",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "payloadTemplate": "{\"content\":\"A new event has been scheduled\",\"type\":\"{{type}}\",\"name\":\"{{title}}\",\"organizer\":\"{{organizer.name}}\",\"booker\":\"{{attendees.0.name}}\"}",
        "triggers": [
          "BOOKING_CREATED"
        ],
        "oAuthClientId": "x",
        "id": 1,
        "subscriberUrl": "x",
        "active": true,
        "secret": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "oauth_client_webhook",
    "accessor": "OauthClientWebhook",
    "op": "remove",
    "method": "DELETE",
    "path": "/v2/oauth-clients/{clientId}/webhooks",
    "args": [
      {
        "name": "oauth_client_id",
        "wire": "clientId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "x_cal_secret_key",
        "wire": "x-cal-secret-key",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": "x"
    },
    "idField": "id"
  },
  {
    "entity": "oauth_client_webhook",
    "accessor": "OauthClientWebhook",
    "op": "update",
    "method": "PATCH",
    "path": "/v2/oauth-clients/{clientId}/webhooks/{webhookId}",
    "args": [
      {
        "name": "id",
        "wire": "webhookId",
        "value": "p1"
      },
      {
        "name": "oauth_client_id",
        "wire": "clientId",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "x_cal_secret_key",
        "wire": "x-cal-secret-key",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "payloadTemplate": "{\"content\":\"A new event has been scheduled\",\"type\":\"{{type}}\",\"name\":\"{{title}}\",\"organizer\":\"{{organizer.name}}\",\"booker\":\"{{attendees.0.name}}\"}",
        "triggers": [
          "BOOKING_CREATED"
        ],
        "oAuthClientId": "x",
        "id": 1,
        "subscriberUrl": "x",
        "active": true,
        "secret": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "oauth_token",
    "accessor": "OauthToken",
    "op": "create",
    "method": "POST",
    "path": "/v2/oauth-clients/{clientId}/users/{userId}/force-refresh",
    "action": "force_refresh",
    "args": [
      {
        "name": "oauth_client_id",
        "wire": "clientId",
        "value": "p1"
      },
      {
        "name": "user_id",
        "wire": "userId",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "x_cal_secret_key",
        "wire": "x-cal-secret-key",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        "accessTokenExpiresAt": 1,
        "refreshTokenExpiresAt": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "oauth_token",
    "accessor": "OauthToken",
    "op": "create",
    "method": "POST",
    "path": "/v2/oauth/{clientId}/refresh",
    "action": "refresh",
    "args": [
      {
        "name": "oauth_id",
        "wire": "clientId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "x_cal_secret_key",
        "wire": "x-cal-secret-key",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        "accessTokenExpiresAt": 1,
        "refreshTokenExpiresAt": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "oauth_token",
    "accessor": "OauthToken",
    "op": "create",
    "method": "POST",
    "path": "/v2/auth/oauth2/token",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "token_type": "bearer",
      "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expires_in": 1800
    },
    "idField": "id"
  },
  {
    "entity": "private_link",
    "accessor": "PrivateLink",
    "op": "create",
    "method": "POST",
    "path": "/v2/event-types/{eventTypeId}/private-links",
    "args": [
      {
        "name": "event_type_id",
        "wire": "eventTypeId",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 201,
    "sample": {
      "status": "success",
      "data": {
        "linkId": "abc123def456",
        "eventTypeId": 123,
        "isExpired": false,
        "bookingUrl": "https://cal.com/d/abc123def456/30min",
        "expiresAt": "2025-12-31T23:59:59.000Z"
      }
    },
    "idField": "id"
  },
  {
    "entity": "private_link",
    "accessor": "PrivateLink",
    "op": "list",
    "method": "GET",
    "path": "/v2/event-types/{eventTypeId}/private-links",
    "args": [
      {
        "name": "event_type_id",
        "wire": "eventTypeId",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": [
        {
          "bookingUrl": "https://cal.com/d/abc123def456/30min",
          "eventTypeId": 123,
          "expiresAt": "2025-12-31T23:59:59.000Z",
          "isExpired": false,
          "linkId": "abc123def456"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "private_link",
    "accessor": "PrivateLink",
    "op": "remove",
    "method": "DELETE",
    "path": "/v2/event-types/{eventTypeId}/private-links/{linkId}",
    "args": [
      {
        "name": "event_type_id",
        "wire": "eventTypeId",
        "value": "p1"
      },
      {
        "name": "id",
        "wire": "linkId",
        "value": "p2"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "linkId": "abc123def456",
        "message": "Private link deleted successfully"
      }
    },
    "idField": "id"
  },
  {
    "entity": "private_link",
    "accessor": "PrivateLink",
    "op": "update",
    "method": "PATCH",
    "path": "/v2/event-types/{eventTypeId}/private-links/{linkId}",
    "args": [
      {
        "name": "event_type_id",
        "wire": "eventTypeId",
        "value": "p1"
      },
      {
        "name": "id",
        "wire": "linkId",
        "value": "p2"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "linkId": "abc123def456",
        "eventTypeId": 123,
        "isExpired": false,
        "bookingUrl": "https://cal.com/d/abc123def456/30min",
        "expiresAt": "2025-12-31T23:59:59.000Z"
      }
    },
    "idField": "id"
  },
  {
    "entity": "schedule",
    "accessor": "Schedule",
    "op": "create",
    "method": "POST",
    "path": "/v2/schedules",
    "args": [],
    "select": {
      "authorization": "v1"
    },
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-06-11"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 201,
    "sample": {
      "status": "success",
      "data": {
        "id": 254,
        "ownerId": 478,
        "name": "Catch up hours",
        "timeZone": "Europe/Rome",
        "availability": [
          {
            "days": [
              "Monday",
              "Tuesday"
            ],
            "endTime": "19:00",
            "startTime": "17:00"
          },
          {
            "days": [
              "Wednesday",
              "Thursday"
            ],
            "endTime": "20:00",
            "startTime": "16:00"
          }
        ],
        "isDefault": true,
        "overrides": [
          {
            "date": "2024-05-20",
            "endTime": "21:00",
            "startTime": "18:00"
          }
        ]
      }
    },
    "idField": "id"
  },
  {
    "entity": "schedule",
    "accessor": "Schedule",
    "op": "list",
    "method": "GET",
    "path": "/v2/schedules",
    "args": [],
    "select": {
      "authorization": "v1"
    },
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-06-11"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": [
        {
          "availability": [
            {
              "days": [
                "Monday",
                "Tuesday"
              ],
              "endTime": "19:00",
              "startTime": "17:00"
            },
            {
              "days": [
                "Wednesday",
                "Thursday"
              ],
              "endTime": "20:00",
              "startTime": "16:00"
            }
          ],
          "id": 254,
          "isDefault": true,
          "name": "Catch up hours",
          "overrides": [
            {
              "date": "2024-05-20",
              "endTime": "21:00",
              "startTime": "18:00"
            }
          ],
          "ownerId": 478,
          "timeZone": "Europe/Rome"
        }
      ],
      "error": {}
    },
    "idField": "id"
  },
  {
    "entity": "schedule",
    "accessor": "Schedule",
    "op": "load",
    "method": "GET",
    "path": "/v2/schedules/{scheduleId}",
    "args": [
      {
        "name": "id",
        "wire": "scheduleId",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-06-11"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "id": 254,
        "ownerId": 478,
        "name": "Catch up hours",
        "timeZone": "Europe/Rome",
        "availability": [
          {
            "days": [
              "Monday",
              "Tuesday"
            ],
            "endTime": "19:00",
            "startTime": "17:00"
          },
          {
            "days": [
              "Wednesday",
              "Thursday"
            ],
            "endTime": "20:00",
            "startTime": "16:00"
          }
        ],
        "isDefault": true,
        "overrides": [
          {
            "date": "2024-05-20",
            "endTime": "21:00",
            "startTime": "18:00"
          }
        ]
      },
      "error": {}
    },
    "idField": "id"
  },
  {
    "entity": "schedule",
    "accessor": "Schedule",
    "op": "load",
    "method": "GET",
    "path": "/v2/schedules/default",
    "action": "default",
    "args": [],
    "select": {
      "authorization": "v1"
    },
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-06-11"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "availability": [
          {
            "days": [
              "Monday",
              "Tuesday"
            ],
            "endTime": "19:00",
            "startTime": "17:00"
          },
          {
            "days": [
              "Wednesday",
              "Thursday"
            ],
            "endTime": "20:00",
            "startTime": "16:00"
          }
        ],
        "id": 254,
        "isDefault": true,
        "name": "Catch up hours",
        "overrides": [
          {
            "date": "2024-05-20",
            "endTime": "21:00",
            "startTime": "18:00"
          }
        ],
        "ownerId": 478,
        "timeZone": "Europe/Rome"
      }
    },
    "idField": "id"
  },
  {
    "entity": "schedule",
    "accessor": "Schedule",
    "op": "remove",
    "method": "DELETE",
    "path": "/v2/schedules/{scheduleId}",
    "args": [
      {
        "name": "id",
        "wire": "scheduleId",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-06-11"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success"
    },
    "idField": "id"
  },
  {
    "entity": "schedule",
    "accessor": "Schedule",
    "op": "update",
    "method": "PATCH",
    "path": "/v2/schedules/{scheduleId}",
    "args": [
      {
        "name": "id",
        "wire": "scheduleId",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-06-11"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "id": 254,
        "ownerId": 478,
        "name": "Catch up hours",
        "timeZone": "Europe/Rome",
        "availability": [
          {
            "days": [
              "Monday",
              "Tuesday"
            ],
            "endTime": "19:00",
            "startTime": "17:00"
          },
          {
            "days": [
              "Wednesday",
              "Thursday"
            ],
            "endTime": "20:00",
            "startTime": "16:00"
          }
        ],
        "isDefault": true,
        "overrides": [
          {
            "date": "2024-05-20",
            "endTime": "21:00",
            "startTime": "18:00"
          }
        ]
      },
      "error": {}
    },
    "idField": "id"
  },
  {
    "entity": "selected_calendar",
    "accessor": "SelectedCalendar",
    "op": "create",
    "method": "POST",
    "path": "/v2/selected-calendars",
    "args": [],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 201,
    "sample": {
      "status": "success",
      "data": {
        "userId": 1,
        "integration": "x",
        "externalId": "x",
        "credentialId": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "selected_calendar",
    "accessor": "SelectedCalendar",
    "op": "remove",
    "method": "DELETE",
    "path": "/v2/selected-calendars",
    "args": [],
    "select": {
      "authorization": "v1",
      "credential_id": "v1",
      "external_id": "v1",
      "integration": "v1",
      "delegation_credential_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "integration",
      "externalId",
      "credentialId",
      "delegationCredentialId"
    ],
    "queryArgs": [
      {
        "name": "credential_id",
        "wire": "credentialId"
      },
      {
        "name": "delegation_credential_id",
        "wire": "delegationCredentialId"
      },
      {
        "name": "external_id",
        "wire": "externalId"
      },
      {
        "name": "integration",
        "wire": "integration"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "userId": 1,
        "integration": "x",
        "externalId": "x",
        "credentialId": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "slot",
    "accessor": "Slot",
    "op": "load",
    "method": "GET",
    "path": "/v2/slots",
    "args": [],
    "select": {
      "end": "2050-09-06",
      "start": "2050-09-05",
      "booking_uid_to_reschedule": "abc123def456",
      "duration": "60",
      "event_type_id": "100",
      "event_type_slug": "event-type-slug",
      "format": "range",
      "organization_slug": "org-slug",
      "team_slug": "team-slug",
      "time_zone": "Europe/Rome",
      "username": "bob"
    },
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-09-04"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "bookingUidToReschedule",
      "start",
      "end",
      "organizationSlug",
      "teamSlug",
      "username",
      "eventTypeSlug",
      "eventTypeId",
      "usernames",
      "format",
      "duration",
      "timeZone"
    ],
    "queryArgs": [
      {
        "name": "booking_uid_to_reschedule",
        "wire": "bookingUidToReschedule"
      },
      {
        "name": "duration",
        "wire": "duration"
      },
      {
        "name": "end",
        "wire": "end"
      },
      {
        "name": "event_type_id",
        "wire": "eventTypeId"
      },
      {
        "name": "event_type_slug",
        "wire": "eventTypeSlug"
      },
      {
        "name": "format",
        "wire": "format"
      },
      {
        "name": "organization_slug",
        "wire": "organizationSlug"
      },
      {
        "name": "start",
        "wire": "start"
      },
      {
        "name": "team_slug",
        "wire": "teamSlug"
      },
      {
        "name": "time_zone",
        "wire": "timeZone"
      },
      {
        "name": "username",
        "wire": "username"
      },
      {
        "name": "username",
        "wire": "usernames"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "2050-09-05": [
          {
            "start": "2050-09-05T09:00:00.000+02:00"
          },
          {
            "start": "2050-09-05T10:00:00.000+02:00"
          }
        ],
        "2050-09-06": [
          {
            "start": "2050-09-06T09:00:00.000+02:00"
          },
          {
            "start": "2050-09-06T10:00:00.000+02:00"
          }
        ]
      }
    },
    "idField": "id"
  },
  {
    "entity": "slot_reservation",
    "accessor": "SlotReservation",
    "op": "create",
    "method": "POST",
    "path": "/v2/slots/reservations",
    "args": [],
    "select": {},
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-09-04"
      },
      {
        "name": "x_cal_client_id",
        "wire": "x-cal-client-id",
        "value": "h2"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 201,
    "sample": {
      "status": "success",
      "data": {
        "eventTypeId": 1,
        "slotStart": "2024-09-04T09:00:00Z",
        "slotEnd": "2024-09-04T10:00:00Z",
        "slotDuration": "30",
        "reservationUid": "e84be5a3-4696-49e3-acc7-b2f3999c3b94",
        "reservationDuration": 5,
        "reservationUntil": "2023-09-04T10:00:00Z"
      }
    },
    "idField": "id"
  },
  {
    "entity": "slot_reservation",
    "accessor": "SlotReservation",
    "op": "load",
    "method": "GET",
    "path": "/v2/slots/reservations/{uid}",
    "args": [
      {
        "name": "id",
        "wire": "uid",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-09-04"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {}
    },
    "idField": "id"
  },
  {
    "entity": "slot_reservation",
    "accessor": "SlotReservation",
    "op": "remove",
    "method": "DELETE",
    "path": "/v2/slots/reservations/{uid}",
    "args": [
      {
        "name": "id",
        "wire": "uid",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-09-04"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success"
    },
    "idField": "id"
  },
  {
    "entity": "slot_reservation",
    "accessor": "SlotReservation",
    "op": "update",
    "method": "PATCH",
    "path": "/v2/slots/reservations/{uid}",
    "args": [
      {
        "name": "id",
        "wire": "uid",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cal_api_version",
        "wire": "cal-api-version",
        "value": "2024-09-04"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "eventTypeId": 1,
        "slotStart": "2024-09-04T09:00:00Z",
        "slotEnd": "2024-09-04T10:00:00Z",
        "slotDuration": "30",
        "reservationUid": "e84be5a3-4696-49e3-acc7-b2f3999c3b94",
        "reservationDuration": 5,
        "reservationUntil": "2023-09-04T10:00:00Z"
      }
    },
    "idField": "id"
  },
  {
    "entity": "stripe",
    "accessor": "Stripe",
    "op": "load",
    "method": "GET",
    "path": "/v2/stripe/save",
    "args": [],
    "select": {
      "code": "v1",
      "state": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "state",
      "code"
    ],
    "queryArgs": [
      {
        "name": "code",
        "wire": "code"
      },
      {
        "name": "state",
        "wire": "state"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "url": "x"
    },
    "idField": "id"
  },
  {
    "entity": "stripe",
    "accessor": "Stripe",
    "op": "load",
    "method": "GET",
    "path": "/v2/stripe/check",
    "action": "check",
    "args": [],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success"
    },
    "idField": "id"
  },
  {
    "entity": "stripe",
    "accessor": "Stripe",
    "op": "load",
    "method": "GET",
    "path": "/v2/stripe/connect",
    "args": [],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "authUrl": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "verified_email",
    "accessor": "VerifiedEmail",
    "op": "create",
    "method": "POST",
    "path": "/v2/verified-resources/emails/verification-code/request",
    "action": "request",
    "args": [],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success"
    },
    "idField": "id"
  },
  {
    "entity": "verified_email",
    "accessor": "VerifiedEmail",
    "op": "create",
    "method": "POST",
    "path": "/v2/verified-resources/emails/verification-code/verify",
    "action": "verify",
    "args": [],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "id": 789,
        "email": "user@example.com",
        "userId": 45
      }
    },
    "idField": "id"
  },
  {
    "entity": "verified_email",
    "accessor": "VerifiedEmail",
    "op": "list",
    "method": "GET",
    "path": "/v2/verified-resources/emails",
    "args": [],
    "select": {
      "authorization": "v1",
      "skip": 0,
      "take": 25
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "take",
      "skip"
    ],
    "queryArgs": [
      {
        "name": "skip",
        "wire": "skip"
      },
      {
        "name": "take",
        "wire": "take"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": [
        {
          "email": "user@example.com",
          "id": 789,
          "userId": 45
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "verified_email",
    "accessor": "VerifiedEmail",
    "op": "load",
    "method": "GET",
    "path": "/v2/verified-resources/emails/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "id": 789,
        "email": "user@example.com",
        "userId": 45
      }
    },
    "idField": "id"
  },
  {
    "entity": "verified_phone",
    "accessor": "VerifiedPhone",
    "op": "create",
    "method": "POST",
    "path": "/v2/verified-resources/phones/verification-code/request",
    "action": "request",
    "args": [],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success"
    },
    "idField": "id"
  },
  {
    "entity": "verified_phone",
    "accessor": "VerifiedPhone",
    "op": "create",
    "method": "POST",
    "path": "/v2/verified-resources/phones/verification-code/verify",
    "action": "verify",
    "args": [],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "id": 789,
        "phoneNumber": "+37255556666",
        "userId": 45
      }
    },
    "idField": "id"
  },
  {
    "entity": "verified_phone",
    "accessor": "VerifiedPhone",
    "op": "list",
    "method": "GET",
    "path": "/v2/verified-resources/phones",
    "args": [],
    "select": {
      "authorization": "v1",
      "skip": 0,
      "take": 25
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "take",
      "skip"
    ],
    "queryArgs": [
      {
        "name": "skip",
        "wire": "skip"
      },
      {
        "name": "take",
        "wire": "take"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": [
        {
          "id": 789,
          "phoneNumber": "+37255556666",
          "userId": 45
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "verified_phone",
    "accessor": "VerifiedPhone",
    "op": "load",
    "method": "GET",
    "path": "/v2/verified-resources/phones/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "id": 789,
        "phoneNumber": "+37255556666",
        "userId": 45
      }
    },
    "idField": "id"
  },
  {
    "entity": "webhook",
    "accessor": "Webhook",
    "op": "create",
    "method": "POST",
    "path": "/v2/webhooks",
    "args": [],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 201,
    "sample": {
      "status": "success",
      "data": {
        "payloadTemplate": "{\"content\":\"A new event has been scheduled\",\"type\":\"{{type}}\",\"name\":\"{{title}}\",\"organizer\":\"{{organizer.name}}\",\"booker\":\"{{attendees.0.name}}\"}",
        "triggers": [
          "BOOKING_CREATED"
        ],
        "userId": 1,
        "id": 1,
        "subscriberUrl": "x",
        "active": true,
        "secret": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "webhook",
    "accessor": "Webhook",
    "op": "list",
    "method": "GET",
    "path": "/v2/webhooks",
    "args": [],
    "select": {
      "authorization": "v1",
      "skip": 0,
      "take": 25
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "take",
      "skip"
    ],
    "queryArgs": [
      {
        "name": "skip",
        "wire": "skip"
      },
      {
        "name": "take",
        "wire": "take"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": [
        {
          "active": true,
          "id": 1,
          "payloadTemplate": "{\"content\":\"A new event has been scheduled\",\"type\":\"{{type}}\",\"name\":\"{{title}}\",\"organizer\":\"{{organizer.name}}\",\"booker\":\"{{attendees.0.name}}\"}",
          "secret": "x",
          "subscriberUrl": "x",
          "triggers": [
            "BOOKING_CREATED"
          ],
          "userId": 1
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "webhook",
    "accessor": "Webhook",
    "op": "load",
    "method": "GET",
    "path": "/v2/webhooks/{webhookId}",
    "args": [
      {
        "name": "id",
        "wire": "webhookId",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "payloadTemplate": "{\"content\":\"A new event has been scheduled\",\"type\":\"{{type}}\",\"name\":\"{{title}}\",\"organizer\":\"{{organizer.name}}\",\"booker\":\"{{attendees.0.name}}\"}",
        "triggers": [
          "BOOKING_CREATED"
        ],
        "userId": 1,
        "id": 1,
        "subscriberUrl": "x",
        "active": true,
        "secret": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "webhook",
    "accessor": "Webhook",
    "op": "remove",
    "method": "DELETE",
    "path": "/v2/webhooks/{webhookId}",
    "args": [
      {
        "name": "id",
        "wire": "webhookId",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "payloadTemplate": "{\"content\":\"A new event has been scheduled\",\"type\":\"{{type}}\",\"name\":\"{{title}}\",\"organizer\":\"{{organizer.name}}\",\"booker\":\"{{attendees.0.name}}\"}",
        "triggers": [
          "BOOKING_CREATED"
        ],
        "userId": 1,
        "id": 1,
        "subscriberUrl": "x",
        "active": true,
        "secret": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "webhook",
    "accessor": "Webhook",
    "op": "update",
    "method": "PATCH",
    "path": "/v2/webhooks/{webhookId}",
    "args": [
      {
        "name": "id",
        "wire": "webhookId",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "data": {
        "payloadTemplate": "{\"content\":\"A new event has been scheduled\",\"type\":\"{{type}}\",\"name\":\"{{title}}\",\"organizer\":\"{{organizer.name}}\",\"booker\":\"{{attendees.0.name}}\"}",
        "triggers": [
          "BOOKING_CREATED"
        ],
        "userId": 1,
        "id": 1,
        "subscriberUrl": "x",
        "active": true,
        "secret": "x"
      }
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
