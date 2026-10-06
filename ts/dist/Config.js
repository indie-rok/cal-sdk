"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Cal',
        slug: "cal",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
    };
    options = {
        base: "https://api.cal.com",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            api_key: {},
            attendee: {},
            booking: {},
            calendar: {},
            calendar_event: {},
            conferencing: {},
            destination_calendar: {},
            event_type: {},
            event_type_webhook: {},
            managed_user: {},
            me: {},
            oauth_client: {},
            oauth_client_webhook: {},
            oauth_token: {},
            private_link: {},
            schedule: {},
            selected_calendar: {},
            slot: {},
            slot_reservation: {},
            stripe: {},
            verified_email: {},
            verified_phone: {},
            webhook: {},
        }
    };
    entity = {
        "api_key": {
            "fields": [
                {
                    "name": "apiKey",
                    "title": "Api Key",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "apiKeyDaysValid",
                    "title": "Api Key Days Valid",
                    "type": "`$NUMBER`",
                    "short": "For how many days is managed organization api key valid."
                },
                {
                    "name": "apiKeyNeverExpires",
                    "title": "Api Key Never Expires",
                    "type": "`$BOOLEAN`",
                    "short": "If true, organization api key never expires."
                }
            ],
            "name": "api_key",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/api-keys/refresh",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "api-keys"
                                },
                                {
                                    "lit": "refresh"
                                }
                            ],
                            "parts": [
                                "v2",
                                "api-keys",
                                "refresh"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "attendee": {
            "fields": [
                {
                    "name": "absent",
                    "title": "Absent",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "displayEmail",
                    "title": "Display Email",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Clean email for display purposes"
                },
                {
                    "name": "email",
                    "title": "Email",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The email of the attendee."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$NUMBER`",
                    "req": true
                },
                {
                    "name": "language",
                    "title": "Language",
                    "type": "`$STRING`",
                    "short": "The preferred language of the attendee."
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The name of the attendee."
                },
                {
                    "name": "phoneNumber",
                    "title": "Phone Number",
                    "type": "`$STRING`",
                    "short": "The phone number of the attendee in international format."
                },
                {
                    "name": "timeZone",
                    "title": "Time Zone",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The time zone of the attendee."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "attendee",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/bookings/{bookingUid}/attendees",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "bookings"
                                },
                                {
                                    "var": "booking_id"
                                },
                                {
                                    "lit": "attendees"
                                }
                            ],
                            "parts": [
                                "v2",
                                "bookings",
                                "{booking_id}",
                                "attendees"
                            ],
                            "rename": {
                                "param": {
                                    "bookingUid": "booking_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "booking_id",
                                        "orig": "bookingUid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "booking_id",
                                    "cal_api_version"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/bookings/{bookingUid}/attendees",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "bookings"
                                },
                                {
                                    "var": "booking_id"
                                },
                                {
                                    "lit": "attendees"
                                }
                            ],
                            "parts": [
                                "v2",
                                "bookings",
                                "{booking_id}",
                                "attendees"
                            ],
                            "rename": {
                                "param": {
                                    "bookingUid": "booking_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "booking_id",
                                        "orig": "bookingUid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "booking_id",
                                    "cal_api_version"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/bookings/{bookingUid}/attendees/{attendeeId}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "bookings"
                                },
                                {
                                    "var": "booking_id"
                                },
                                {
                                    "lit": "attendees"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "bookings",
                                "{booking_id}",
                                "attendees",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "attendeeId": "id",
                                    "bookingUid": "booking_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "booking_id",
                                        "orig": "bookingUid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "attendeeId",
                                        "type": "`$NUMBER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "booking_id",
                                    "cal_api_version",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/v2/bookings/{bookingUid}/attendees/{attendeeId}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "bookings"
                                },
                                {
                                    "var": "booking_id"
                                },
                                {
                                    "lit": "attendees"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "bookings",
                                "{booking_id}",
                                "attendees",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "attendeeId": "id",
                                    "bookingUid": "booking_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "booking_id",
                                        "orig": "bookingUid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "attendeeId",
                                        "type": "`$NUMBER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "booking_id",
                                    "cal_api_version",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.booking"
                    ]
                ]
            }
        },
        "booking": {
            "fields": [
                {
                    "name": "data",
                    "title": "Data",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Booking data, which can be either a BookingOutput object, a RecurringBookingOutput object, or an array of RecurringBookingOutput objects"
                },
                {
                    "name": "error",
                    "title": "Error",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "pagination",
                    "title": "Pagination",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "req": true
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "booking",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/bookings/{bookingUid}/reassign/{userId}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "bookings"
                                },
                                {
                                    "var": "booking_id"
                                },
                                {
                                    "lit": "reassign"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "bookings",
                                "{booking_id}",
                                "reassign",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "bookingUid": "booking_id",
                                    "userId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-08-13"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "booking_id",
                                        "orig": "bookingUid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "userId",
                                        "type": "`$NUMBER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "reassign",
                                "exist": [
                                    "authorization",
                                    "booking_id",
                                    "cal_api_version",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/bookings/{bookingUid}/confirm",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "bookings"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "confirm"
                                }
                            ],
                            "parts": [
                                "v2",
                                "bookings",
                                "{id}",
                                "confirm"
                            ],
                            "rename": {
                                "param": {
                                    "bookingUid": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-08-13"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "bookingUid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "confirm",
                                "exist": [
                                    "authorization",
                                    "cal_api_version",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/bookings/{bookingUid}/decline",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "bookings"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "decline"
                                }
                            ],
                            "parts": [
                                "v2",
                                "bookings",
                                "{id}",
                                "decline"
                            ],
                            "rename": {
                                "param": {
                                    "bookingUid": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-08-13"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "bookingUid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "decline",
                                "exist": [
                                    "authorization",
                                    "cal_api_version",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/bookings/{bookingUid}/guests",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "bookings"
                                },
                                {
                                    "var": "booking_id"
                                },
                                {
                                    "lit": "guests"
                                }
                            ],
                            "parts": [
                                "v2",
                                "bookings",
                                "{booking_id}",
                                "guests"
                            ],
                            "rename": {
                                "param": {
                                    "bookingUid": "booking_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "booking_id",
                                        "orig": "bookingUid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "guests",
                                "exist": [
                                    "authorization",
                                    "booking_id",
                                    "cal_api_version"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/bookings/{bookingUid}/mark-absent",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "bookings"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "mark-absent"
                                }
                            ],
                            "parts": [
                                "v2",
                                "bookings",
                                "{id}",
                                "mark-absent"
                            ],
                            "rename": {
                                "param": {
                                    "bookingUid": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-08-13"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "bookingUid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "mark_absent",
                                "exist": [
                                    "authorization",
                                    "cal_api_version",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/bookings/{bookingUid}/reassign",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "bookings"
                                },
                                {
                                    "var": "booking_id"
                                },
                                {
                                    "lit": "reassign"
                                }
                            ],
                            "parts": [
                                "v2",
                                "bookings",
                                "{booking_id}",
                                "reassign"
                            ],
                            "rename": {
                                "param": {
                                    "bookingUid": "booking_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-08-13"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "booking_id",
                                        "orig": "bookingUid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "reassign",
                                "exist": [
                                    "authorization",
                                    "booking_id",
                                    "cal_api_version"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/bookings/{bookingUid}/cancel",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "bookings"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "cancel"
                                }
                            ],
                            "parts": [
                                "v2",
                                "bookings",
                                "{id}",
                                "cancel"
                            ],
                            "rename": {
                                "param": {
                                    "bookingUid": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-08-13"
                                    },
                                    {
                                        "name": "x_cal_client_id",
                                        "orig": "x-cal-client-id",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    },
                                    {
                                        "name": "x_cal_secret_key",
                                        "orig": "x-cal-secret-key",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "bookingUid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "cancel",
                                "exist": [
                                    "cal_api_version",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/bookings/{bookingUid}/reschedule",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "bookings"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "reschedule"
                                }
                            ],
                            "parts": [
                                "v2",
                                "bookings",
                                "{id}",
                                "reschedule"
                            ],
                            "rename": {
                                "param": {
                                    "bookingUid": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-08-13"
                                    },
                                    {
                                        "name": "x_cal_client_id",
                                        "orig": "x-cal-client-id",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    },
                                    {
                                        "name": "x_cal_secret_key",
                                        "orig": "x-cal-secret-key",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "bookingUid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "reschedule",
                                "exist": [
                                    "cal_api_version",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/bookings",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "bookings"
                                }
                            ],
                            "parts": [
                                "v2",
                                "bookings"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-08-13"
                                    },
                                    {
                                        "name": "x_cal_client_id",
                                        "orig": "x-cal-client-id",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    },
                                    {
                                        "name": "x_cal_secret_key",
                                        "orig": "x-cal-secret-key",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "cal_api_version"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/bookings/{bookingUid}/calendar-links",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "bookings"
                                },
                                {
                                    "var": "booking_id"
                                },
                                {
                                    "lit": "calendar-links"
                                }
                            ],
                            "parts": [
                                "v2",
                                "bookings",
                                "{booking_id}",
                                "calendar-links"
                            ],
                            "rename": {
                                "param": {
                                    "bookingUid": "booking_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-08-13"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "booking_id",
                                        "orig": "bookingUid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "calendar_links",
                                "exist": [
                                    "authorization",
                                    "booking_id",
                                    "cal_api_version"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/bookings/{bookingUid}/conferencing-sessions",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "bookings"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "conferencing-sessions"
                                }
                            ],
                            "parts": [
                                "v2",
                                "bookings",
                                "{id}",
                                "conferencing-sessions"
                            ],
                            "rename": {
                                "param": {
                                    "bookingUid": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-08-13"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "bookingUid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "conferencing-sessions",
                                "exist": [
                                    "authorization",
                                    "cal_api_version",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/bookings/{bookingUid}/recordings",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "bookings"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "recordings"
                                }
                            ],
                            "parts": [
                                "v2",
                                "bookings",
                                "{id}",
                                "recordings"
                            ],
                            "rename": {
                                "param": {
                                    "bookingUid": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-08-13"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "bookingUid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "recordings",
                                "exist": [
                                    "authorization",
                                    "cal_api_version",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/bookings/{bookingUid}/references",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "bookings"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "references"
                                }
                            ],
                            "parts": [
                                "v2",
                                "bookings",
                                "{id}",
                                "references"
                            ],
                            "rename": {
                                "param": {
                                    "bookingUid": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-08-13"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "bookingUid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "type",
                                        "orig": "type",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "google_calendar"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "references",
                                "exist": [
                                    "authorization",
                                    "cal_api_version",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/bookings/{bookingUid}/transcripts",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "bookings"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "transcripts"
                                }
                            ],
                            "parts": [
                                "v2",
                                "bookings",
                                "{id}",
                                "transcripts"
                            ],
                            "rename": {
                                "param": {
                                    "bookingUid": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-08-13"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "bookingUid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "transcripts",
                                "exist": [
                                    "authorization",
                                    "cal_api_version",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/bookings",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "bookings"
                                }
                            ],
                            "parts": [
                                "v2",
                                "bookings"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-08-13"
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "after_created_at",
                                        "orig": "afterCreatedAt",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "?afterCreatedAt=2025-03-07T10:00:00.000Z"
                                    },
                                    {
                                        "name": "after_start",
                                        "orig": "afterStart",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "?afterStart=2025-03-07T10:00:00.000Z"
                                    },
                                    {
                                        "name": "after_updated_at",
                                        "orig": "afterUpdatedAt",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "?afterUpdatedAt=2025-03-07T10:00:00.000Z"
                                    },
                                    {
                                        "name": "attendee_email",
                                        "orig": "attendeeEmail",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "example@domain.com"
                                    },
                                    {
                                        "name": "attendee_name",
                                        "orig": "attendeeName",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "John Doe"
                                    },
                                    {
                                        "name": "before_created_at",
                                        "orig": "beforeCreatedAt",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "?beforeCreatedAt=2025-03-14T11:00:00.000Z"
                                    },
                                    {
                                        "name": "before_end",
                                        "orig": "beforeEnd",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "?beforeEnd=2025-03-07T11:00:00.000Z"
                                    },
                                    {
                                        "name": "before_updated_at",
                                        "orig": "beforeUpdatedAt",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "?beforeUpdatedAt=2025-03-14T11:00:00.000Z"
                                    },
                                    {
                                        "name": "booking_uid",
                                        "orig": "bookingUid",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "2NtaeaVcKfpmSZ4CthFdfk"
                                    },
                                    {
                                        "name": "event_type_id",
                                        "orig": "eventTypeIds",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "?eventTypeIds=100,200"
                                    },
                                    {
                                        "name": "event_type_id",
                                        "orig": "eventTypeId",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "?eventTypeId=100"
                                    },
                                    {
                                        "name": "skip",
                                        "orig": "skip",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "example": 0
                                    },
                                    {
                                        "name": "sort_created",
                                        "orig": "sortCreated",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "?sortCreated=asc OR ?sortCreated=desc"
                                    },
                                    {
                                        "name": "sort_end",
                                        "orig": "sortEnd",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "?sortEnd=asc OR ?sortEnd=desc"
                                    },
                                    {
                                        "name": "sort_start",
                                        "orig": "sortStart",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "?sortStart=asc OR ?sortStart=desc"
                                    },
                                    {
                                        "name": "sort_updated_at",
                                        "orig": "sortUpdatedAt",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "?sortUpdated=asc OR ?sortUpdated=desc"
                                    },
                                    {
                                        "name": "status",
                                        "orig": "status",
                                        "type": "`$ARRAY`",
                                        "kind": "query",
                                        "example": "?status=upcoming,past",
                                        "field": true
                                    },
                                    {
                                        "name": "take",
                                        "orig": "take",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "example": 10
                                    },
                                    {
                                        "name": "team_id",
                                        "orig": "teamId",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "?teamId=50"
                                    },
                                    {
                                        "name": "teams_id",
                                        "orig": "teamsIds",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "?teamIds=50,60"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "cal_api_version"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/bookings/{bookingUid}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "bookings"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "bookings",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "bookingUid": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-08-13"
                                    },
                                    {
                                        "name": "x_cal_client_id",
                                        "orig": "x-cal-client-id",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    },
                                    {
                                        "name": "x_cal_secret_key",
                                        "orig": "x-cal-secret-key",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "bookingUid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "cal_api_version",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/bookings/by-seat/{seatUid}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "bookings"
                                },
                                {
                                    "lit": "by-seat"
                                },
                                {
                                    "var": "seat_uid"
                                }
                            ],
                            "parts": [
                                "v2",
                                "bookings",
                                "by-seat",
                                "{seat_uid}"
                            ],
                            "rename": {
                                "param": {
                                    "seatUid": "seat_uid"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-08-13"
                                    },
                                    {
                                        "name": "x_cal_client_id",
                                        "orig": "x-cal-client-id",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    },
                                    {
                                        "name": "x_cal_secret_key",
                                        "orig": "x-cal-secret-key",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "seat_uid",
                                        "orig": "seatUid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "by_seat",
                                "exist": [
                                    "cal_api_version",
                                    "seat_uid"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/v2/bookings/{bookingUid}/location",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "bookings"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "location"
                                }
                            ],
                            "parts": [
                                "v2",
                                "bookings",
                                "{id}",
                                "location"
                            ],
                            "rename": {
                                "param": {
                                    "bookingUid": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "bookingUid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "location",
                                "exist": [
                                    "authorization",
                                    "cal_api_version",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "calendar": {
            "fields": [
                {
                    "name": "connectedCalendars",
                    "title": "Connected Calendars",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "destinationCalendar",
                    "title": "Destination Calendar",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "calendar",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/calendars/{calendar}/credentials",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "credentials"
                                }
                            ],
                            "parts": [
                                "v2",
                                "calendars",
                                "{id}",
                                "credentials"
                            ],
                            "rename": {
                                "param": {
                                    "calendar": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "calendar",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "credential",
                                "exist": [
                                    "authorization",
                                    "id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/calendars/{calendar}/disconnect",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "calendar_id"
                                },
                                {
                                    "lit": "disconnect"
                                }
                            ],
                            "parts": [
                                "v2",
                                "calendars",
                                "{calendar_id}",
                                "disconnect"
                            ],
                            "rename": {
                                "param": {
                                    "calendar": "calendar_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "calendar_id",
                                        "orig": "calendar",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "disconnect",
                                "exist": [
                                    "authorization",
                                    "calendar_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/calendars/ics-feed/save",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "lit": "ics-feed"
                                },
                                {
                                    "lit": "save"
                                }
                            ],
                            "parts": [
                                "v2",
                                "calendars",
                                "ics-feed",
                                "save"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "save_ics_feed",
                                "exist": [
                                    "authorization"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/calendars/{calendar}/freebusy",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "calendar_id"
                                },
                                {
                                    "lit": "freebusy"
                                }
                            ],
                            "parts": [
                                "v2",
                                "calendars",
                                "{calendar_id}",
                                "freebusy"
                            ],
                            "rename": {
                                "param": {
                                    "calendar": "calendar_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "calendar_id",
                                        "orig": "calendar",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "from",
                                        "orig": "from",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "example": "2026-03-10"
                                    },
                                    {
                                        "name": "time_zone",
                                        "orig": "timeZone",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "to",
                                        "orig": "to",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "example": "2026-03-10"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "freebusy",
                                "exist": [
                                    "authorization",
                                    "calendar_id",
                                    "from",
                                    "to"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/calendars/connections/{connectionId}/freebusy",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "lit": "connections"
                                },
                                {
                                    "var": "connection_id"
                                },
                                {
                                    "lit": "freebusy"
                                }
                            ],
                            "parts": [
                                "v2",
                                "calendars",
                                "connections",
                                "{connection_id}",
                                "freebusy"
                            ],
                            "rename": {
                                "param": {
                                    "connectionId": "connection_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "connection_id",
                                        "orig": "connectionId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "from",
                                        "orig": "from",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "example": "2026-03-10"
                                    },
                                    {
                                        "name": "time_zone",
                                        "orig": "timeZone",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "to",
                                        "orig": "to",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "example": "2026-03-10"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "freebusy",
                                "exist": [
                                    "authorization",
                                    "connection_id",
                                    "from",
                                    "to"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/calendars/busy-times",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "lit": "busy-times"
                                }
                            ],
                            "parts": [
                                "v2",
                                "calendars",
                                "busy-times"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "credential_id",
                                        "orig": "credentialId",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "date_from",
                                        "orig": "dateFrom",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "2023-10-01"
                                    },
                                    {
                                        "name": "date_to",
                                        "orig": "dateTo",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "2023-10-31"
                                    },
                                    {
                                        "name": "external_id",
                                        "orig": "externalId",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "logged_in_users_tz",
                                        "orig": "loggedInUsersTz",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "America/New_York"
                                    },
                                    {
                                        "name": "time_zone",
                                        "orig": "timeZone",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "America/New_York"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "busy_times",
                                "exist": [
                                    "authorization",
                                    "credential_id",
                                    "external_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/calendars/{calendar}/connect",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "connect"
                                }
                            ],
                            "parts": [
                                "v2",
                                "calendars",
                                "{id}",
                                "connect"
                            ],
                            "rename": {
                                "param": {
                                    "calendar": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "calendar",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "is_dry_run",
                                        "orig": "isDryRun",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "redir",
                                        "orig": "redir",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "connect",
                                "exist": [
                                    "authorization",
                                    "id",
                                    "is_dry_run"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/calendars/{calendar}/save",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "save"
                                }
                            ],
                            "parts": [
                                "v2",
                                "calendars",
                                "{id}",
                                "save"
                            ],
                            "rename": {
                                "param": {
                                    "calendar": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "calendar",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "code",
                                        "orig": "code",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "state",
                                        "orig": "state",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "save",
                                "exist": [
                                    "code",
                                    "id",
                                    "state"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/calendars/{calendar}/check",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "check"
                                }
                            ],
                            "parts": [
                                "v2",
                                "calendars",
                                "{id}",
                                "check"
                            ],
                            "rename": {
                                "param": {
                                    "calendar": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "calendar",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "check",
                                "exist": [
                                    "authorization",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/calendars",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "calendars"
                                }
                            ],
                            "parts": [
                                "v2",
                                "calendars"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/calendars/ics-feed/check",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "lit": "ics-feed"
                                },
                                {
                                    "lit": "check"
                                }
                            ],
                            "parts": [
                                "v2",
                                "calendars",
                                "ics-feed",
                                "check"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "check_ics_feed",
                                "exist": [
                                    "authorization"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/calendars/connections",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "lit": "connections"
                                }
                            ],
                            "parts": [
                                "v2",
                                "calendars",
                                "connections"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "connections",
                                "exist": [
                                    "authorization"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "calendar_event": {
            "fields": [
                {
                    "name": "attendees",
                    "title": "Attendees",
                    "type": "`$ARRAY`",
                    "short": "List of attendees with their response status"
                },
                {
                    "name": "calendarEventOwner",
                    "title": "Calendar Event Owner",
                    "type": "`$ANY`",
                    "short": "The calendar account that owns this event."
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "short": "Detailed description of the calendar event"
                },
                {
                    "name": "end",
                    "title": "End",
                    "type": "`$OBJECT`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$OBJECT`"
                        }
                    },
                    "short": "End date and time of the calendar event with timezone information"
                },
                {
                    "name": "hosts",
                    "title": "Hosts",
                    "type": "`$ARRAY`",
                    "short": "Information about the event hosts (organizers)"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Unique identifier of the calendar event"
                },
                {
                    "name": "locations",
                    "title": "Locations",
                    "type": "`$ARRAY`",
                    "short": "Conference locations with entry points (video, phone, sip, more)"
                },
                {
                    "name": "source",
                    "title": "Source",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Calendar integration source (e.g., Google Calendar, Office 365, Apple Calendar)."
                },
                {
                    "name": "start",
                    "title": "Start",
                    "type": "`$OBJECT`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$OBJECT`"
                        }
                    },
                    "short": "Start date and time of the calendar event with timezone information"
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "short": "Status of the event (accepted, pending, declined, cancelled)"
                },
                {
                    "name": "title",
                    "title": "Title",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Title of the calendar event"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "calendar_event",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/calendars/{calendar}/events",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "calendar_provider"
                                },
                                {
                                    "lit": "events"
                                }
                            ],
                            "parts": [
                                "v2",
                                "calendars",
                                "{calendar_provider}",
                                "events"
                            ],
                            "rename": {
                                "param": {
                                    "calendar": "calendar_provider"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "calendar_provider",
                                        "orig": "calendar",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "calendar_provider"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/calendars/connections/{connectionId}/events",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "lit": "connections"
                                },
                                {
                                    "var": "connection_id"
                                },
                                {
                                    "lit": "events"
                                }
                            ],
                            "parts": [
                                "v2",
                                "calendars",
                                "connections",
                                "{connection_id}",
                                "events"
                            ],
                            "rename": {
                                "param": {
                                    "connectionId": "connection_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "connection_id",
                                        "orig": "connectionId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "calendar_id",
                                        "orig": "calendarId",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "connection",
                                "exist": [
                                    "authorization",
                                    "connection_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/calendars/{calendar}/events",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "calendar_provider"
                                },
                                {
                                    "lit": "events"
                                }
                            ],
                            "parts": [
                                "v2",
                                "calendars",
                                "{calendar_provider}",
                                "events"
                            ],
                            "rename": {
                                "param": {
                                    "calendar": "calendar_provider"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "calendar_provider",
                                        "orig": "calendar",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "calendar_id",
                                        "orig": "calendarId",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "primary"
                                    },
                                    {
                                        "name": "from",
                                        "orig": "from",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "example": "2026-03-01"
                                    },
                                    {
                                        "name": "time_zone",
                                        "orig": "timeZone",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "to",
                                        "orig": "to",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "example": "2026-03-31"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "calendar_provider",
                                    "from",
                                    "to"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/calendars/connections/{connectionId}/events",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "lit": "connections"
                                },
                                {
                                    "var": "connection_id"
                                },
                                {
                                    "lit": "events"
                                }
                            ],
                            "parts": [
                                "v2",
                                "calendars",
                                "connections",
                                "{connection_id}",
                                "events"
                            ],
                            "rename": {
                                "param": {
                                    "connectionId": "connection_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "connection_id",
                                        "orig": "connectionId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "calendar_id",
                                        "orig": "calendarId",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "primary"
                                    },
                                    {
                                        "name": "from",
                                        "orig": "from",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "example": "2026-03-01"
                                    },
                                    {
                                        "name": "time_zone",
                                        "orig": "timeZone",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "to",
                                        "orig": "to",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "example": "2026-03-31"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "connection",
                                "exist": [
                                    "authorization",
                                    "connection_id",
                                    "from",
                                    "to"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/calendars/connections/{connectionId}/events/{eventId}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "lit": "connections"
                                },
                                {
                                    "var": "connection_id"
                                },
                                {
                                    "lit": "events"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "calendars",
                                "connections",
                                "{connection_id}",
                                "events",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "connectionId": "connection_id",
                                    "eventId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "connection_id",
                                        "orig": "connectionId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "eventId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "calendar_id",
                                        "orig": "calendarId",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "connection",
                                "exist": [
                                    "authorization",
                                    "connection_id",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/calendars/{calendar}/event/{eventUid}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "calendar_provider"
                                },
                                {
                                    "lit": "event"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "calendars",
                                "{calendar_provider}",
                                "event",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "calendar": "calendar_provider",
                                    "eventUid": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "calendar_provider",
                                        "orig": "calendar",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "eventUid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "legacy",
                                "exist": [
                                    "authorization",
                                    "calendar_provider",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/calendars/{calendar}/events/{eventUid}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "calendar_provider"
                                },
                                {
                                    "lit": "events"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "calendars",
                                "{calendar_provider}",
                                "events",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "calendar": "calendar_provider",
                                    "eventUid": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "calendar_provider",
                                        "orig": "calendar",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "eventUid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "calendar_provider",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/v2/calendars/{calendar}/events/{eventUid}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "calendar_provider"
                                },
                                {
                                    "lit": "events"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "calendars",
                                "{calendar_provider}",
                                "events",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "calendar": "calendar_provider",
                                    "eventUid": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "calendar_provider",
                                        "orig": "calendar",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "eventUid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "calendar_provider",
                                    "id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/v2/calendars/connections/{connectionId}/events/{eventId}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "lit": "connections"
                                },
                                {
                                    "var": "connection_id"
                                },
                                {
                                    "lit": "events"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "calendars",
                                "connections",
                                "{connection_id}",
                                "events",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "connectionId": "connection_id",
                                    "eventId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "connection_id",
                                        "orig": "connectionId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "eventId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "calendar_id",
                                        "orig": "calendarId",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "connection",
                                "exist": [
                                    "authorization",
                                    "connection_id",
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/v2/calendars/connections/{connectionId}/events/{eventId}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "lit": "connections"
                                },
                                {
                                    "var": "connection_id"
                                },
                                {
                                    "lit": "events"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "calendars",
                                "connections",
                                "{connection_id}",
                                "events",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "connectionId": "connection_id",
                                    "eventId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "connection_id",
                                        "orig": "connectionId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "eventId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "calendar_id",
                                        "orig": "calendarId",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "connection",
                                "exist": [
                                    "authorization",
                                    "connection_id",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/v2/calendars/{calendar}/event/{eventUid}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "calendar_provider"
                                },
                                {
                                    "lit": "event"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "calendars",
                                "{calendar_provider}",
                                "event",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "calendar": "calendar_provider",
                                    "eventUid": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "calendar_provider",
                                        "orig": "calendar",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "eventUid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "legacy",
                                "exist": [
                                    "authorization",
                                    "calendar_provider",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/v2/calendars/{calendar}/events/{eventUid}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "calendars"
                                },
                                {
                                    "var": "calendar_provider"
                                },
                                {
                                    "lit": "events"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "calendars",
                                "{calendar_provider}",
                                "events",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "calendar": "calendar_provider",
                                    "eventUid": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "calendar_provider",
                                        "orig": "calendar",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "eventUid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "calendar_provider",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.calendar"
                    ]
                ]
            }
        },
        "conferencing": {
            "fields": [
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$NUMBER`",
                    "req": true,
                    "short": "Id of the conferencing app credentials"
                },
                {
                    "name": "invalid",
                    "title": "Invalid",
                    "type": "`$BOOLEAN`",
                    "short": "Whether if the connection is working or not."
                },
                {
                    "name": "type",
                    "title": "Type",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Type of conferencing app"
                },
                {
                    "name": "userId",
                    "title": "User Id",
                    "type": "`$NUMBER`",
                    "req": true,
                    "short": "Id of the user associated to the conferencing app"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "conferencing",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/conferencing/{app}/connect",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "conferencing"
                                },
                                {
                                    "var": "app"
                                },
                                {
                                    "lit": "connect"
                                }
                            ],
                            "parts": [
                                "v2",
                                "conferencing",
                                "{app}",
                                "connect"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "app",
                                        "orig": "app",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "connect",
                                "exist": [
                                    "app",
                                    "authorization"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/conferencing/{app}/default",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "conferencing"
                                },
                                {
                                    "var": "app"
                                },
                                {
                                    "lit": "default"
                                }
                            ],
                            "parts": [
                                "v2",
                                "conferencing",
                                "{app}",
                                "default"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "app",
                                        "orig": "app",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "default",
                                "exist": [
                                    "app",
                                    "authorization"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/conferencing",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "conferencing"
                                }
                            ],
                            "parts": [
                                "v2",
                                "conferencing"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/conferencing/{app}/oauth/auth-url",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "conferencing"
                                },
                                {
                                    "var": "conferencing_id"
                                },
                                {
                                    "lit": "oauth"
                                },
                                {
                                    "lit": "auth-url"
                                }
                            ],
                            "parts": [
                                "v2",
                                "conferencing",
                                "{conferencing_id}",
                                "oauth",
                                "auth-url"
                            ],
                            "rename": {
                                "param": {
                                    "app": "conferencing_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "conferencing_id",
                                        "orig": "app",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "on_error_return_to",
                                        "orig": "onErrorReturnTo",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "return_to",
                                        "orig": "returnTo",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "oauth",
                                "exist": [
                                    "authorization",
                                    "conferencing_id",
                                    "on_error_return_to",
                                    "return_to"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/conferencing/{app}/oauth/callback",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "conferencing"
                                },
                                {
                                    "var": "conferencing_id"
                                },
                                {
                                    "lit": "oauth"
                                },
                                {
                                    "lit": "callback"
                                }
                            ],
                            "parts": [
                                "v2",
                                "conferencing",
                                "{conferencing_id}",
                                "oauth",
                                "callback"
                            ],
                            "rename": {
                                "param": {
                                    "app": "conferencing_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "conferencing_id",
                                        "orig": "app",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "code",
                                        "orig": "code",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "state",
                                        "orig": "state",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "oauth_callback",
                                "exist": [
                                    "code",
                                    "conferencing_id",
                                    "state"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/conferencing/default",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "conferencing"
                                },
                                {
                                    "lit": "default"
                                }
                            ],
                            "parts": [
                                "v2",
                                "conferencing",
                                "default"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "default",
                                "exist": [
                                    "authorization"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/v2/conferencing/{app}/disconnect",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "conferencing"
                                },
                                {
                                    "var": "app"
                                },
                                {
                                    "lit": "disconnect"
                                }
                            ],
                            "parts": [
                                "v2",
                                "conferencing",
                                "{app}",
                                "disconnect"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "app",
                                        "orig": "app",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "disconnect",
                                "exist": [
                                    "app",
                                    "authorization"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "destination_calendar": {
            "fields": [
                {
                    "name": "credentialId",
                    "title": "Credential Id",
                    "type": "`$NUMBER`",
                    "req": true
                },
                {
                    "name": "delegationCredentialId",
                    "title": "Delegation Credential Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "externalId",
                    "title": "External Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Unique identifier used to represent the specific calendar, as returned by the /calendars endpoint"
                },
                {
                    "name": "integration",
                    "title": "Integration",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The calendar service you want to integrate, as returned by the /calendars endpoint"
                },
                {
                    "name": "userId",
                    "title": "User Id",
                    "type": "`$NUMBER`",
                    "req": true
                }
            ],
            "name": "destination_calendar",
            "op": {
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/v2/destination-calendars",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "destination-calendars"
                                }
                            ],
                            "parts": [
                                "v2",
                                "destination-calendars"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "event_type": {
            "fields": [
                {
                    "name": "afterEventBuffer",
                    "title": "After Event Buffer",
                    "type": "`$NUMBER`",
                    "short": "Extra time automatically blocked on your calendar after a meeting ends."
                },
                {
                    "name": "allowReschedulingCancelledBookings",
                    "title": "Allow Rescheduling Cancelled Bookings",
                    "type": "`$BOOLEAN`",
                    "short": "When enabled, users will be able to create a new booking when trying to reschedule a cancelled booking."
                },
                {
                    "name": "allowReschedulingPastBookings",
                    "title": "Allow Rescheduling Past Bookings",
                    "type": "`$BOOLEAN`",
                    "short": "Enabling this option allows for past events to be rescheduled."
                },
                {
                    "name": "beforeEventBuffer",
                    "title": "Before Event Buffer",
                    "type": "`$NUMBER`",
                    "short": "Extra time automatically blocked on your calendar before a meeting starts."
                },
                {
                    "name": "bookerActiveBookingsLimit",
                    "title": "Booker Active Bookings Limit",
                    "type": "`$ANY`",
                    "short": "Limit the number of active bookings a booker can make for this event type."
                },
                {
                    "name": "bookerLayouts",
                    "title": "Booker Layouts",
                    "type": "`$ANY`",
                    "op": {
                        "list": {
                            "req": true,
                            "type": "`$OBJECT`"
                        },
                        "update": {
                            "req": true,
                            "type": "`$OBJECT`"
                        }
                    },
                    "short": "Should booker have week, month or column view."
                },
                {
                    "name": "bookingFields",
                    "title": "Booking Fields",
                    "type": "`$ARRAY`",
                    "op": {
                        "list": {
                            "req": true,
                            "type": "`$ARRAY`"
                        },
                        "update": {
                            "req": true,
                            "type": "`$ARRAY`"
                        }
                    },
                    "short": "Custom fields that can be added to the booking form when the event is booked by someone."
                },
                {
                    "name": "bookingLimitsCount",
                    "title": "Booking Limits Count",
                    "type": "`$ANY`",
                    "short": "Limit how many times this event can be booked"
                },
                {
                    "name": "bookingLimitsDuration",
                    "title": "Booking Limits Duration",
                    "type": "`$ANY`",
                    "short": "Limit total amount of time that this event can be booked"
                },
                {
                    "name": "bookingRequiresAuthentication",
                    "title": "Booking Requires Authentication",
                    "type": "`$BOOLEAN`",
                    "op": {
                        "list": {
                            "req": true,
                            "type": "`$BOOLEAN`"
                        },
                        "update": {
                            "req": true,
                            "type": "`$BOOLEAN`"
                        }
                    },
                    "short": "Boolean to require authentication for booking this event type via api."
                },
                {
                    "name": "bookingUrl",
                    "title": "Booking Url",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Full URL to the booking page for this event type",
                    "format": "uri"
                },
                {
                    "name": "bookingWindow",
                    "title": "Booking Window",
                    "type": "`$ANY`",
                    "short": "Limit how far in the future this event can be booked"
                },
                {
                    "name": "calVideoSettings",
                    "title": "Cal Video Settings",
                    "type": "`$ANY`",
                    "short": "Cal video settings for the event type."
                },
                {
                    "name": "color",
                    "title": "Color",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "confirmationPolicy",
                    "title": "Confirmation Policy",
                    "type": "`$ANY`",
                    "short": "Specify how the booking needs to be manually confirmed before it is pushed to the integrations and a confirmation mail is sent."
                },
                {
                    "name": "currency",
                    "title": "Currency",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "customName",
                    "title": "Custom Name",
                    "type": "`$STRING`",
                    "short": "Customizable event name with valid variables: {Event type title}, {Organiser}, {Scheduler}, {Location}, {Organiser first name}, {Scheduler first name}, {Scheduler last name}, {Event duration}, {LOCATION}, {HOST/ATTENDEE}, {HOST}, {ATTENDEE…"
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "op": {
                        "list": {
                            "req": true,
                            "type": "`$STRING`"
                        },
                        "update": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "destinationCalendar",
                    "title": "Destination Calendar",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "disableCancelling",
                    "title": "Disable Cancelling",
                    "type": "`$ANY`",
                    "short": "Settings for disabling cancelling of this event type."
                },
                {
                    "name": "disableGuests",
                    "title": "Disable Guests",
                    "type": "`$BOOLEAN`",
                    "op": {
                        "list": {
                            "req": true,
                            "type": "`$BOOLEAN`"
                        },
                        "update": {
                            "req": true,
                            "type": "`$BOOLEAN`"
                        }
                    },
                    "short": "If true, person booking this event can't add guests via their emails."
                },
                {
                    "name": "disableRescheduling",
                    "title": "Disable Rescheduling",
                    "type": "`$ANY`",
                    "short": "Settings for disabling rescheduling of this event type."
                },
                {
                    "name": "forwardParamsSuccessRedirect",
                    "title": "Forward Params Success Redirect",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "hidden",
                    "title": "Hidden",
                    "type": "`$BOOLEAN`",
                    "op": {
                        "list": {
                            "req": true,
                            "type": "`$BOOLEAN`"
                        },
                        "update": {
                            "req": true,
                            "type": "`$BOOLEAN`"
                        }
                    }
                },
                {
                    "name": "hideCalendarEventDetails",
                    "title": "Hide Calendar Event Details",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "hideCalendarNotes",
                    "title": "Hide Calendar Notes",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "hideOrganizerEmail",
                    "title": "Hide Organizer Email",
                    "type": "`$BOOLEAN`",
                    "short": "Boolean to Hide organizer's email address from the booking screen, email notifications, and calendar events"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$NUMBER`",
                    "req": true
                },
                {
                    "name": "interfaceLanguage",
                    "title": "Interface Language",
                    "type": "`$STRING`",
                    "short": "Set preferred language for the booking interface."
                },
                {
                    "name": "isInstantEvent",
                    "title": "Is Instant Event",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "lengthInMinutes",
                    "title": "Length In Minutes",
                    "type": "`$NUMBER`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$NUMBER`"
                        }
                    }
                },
                {
                    "name": "lengthInMinutesOptions",
                    "title": "Length In Minutes Options",
                    "type": "`$ARRAY`",
                    "short": "If you want that user can choose between different lengths of the event you can specify them here."
                },
                {
                    "name": "locations",
                    "title": "Locations",
                    "type": "`$ARRAY`",
                    "op": {
                        "list": {
                            "req": true,
                            "type": "`$ARRAY`"
                        },
                        "update": {
                            "req": true,
                            "type": "`$ARRAY`"
                        }
                    },
                    "short": "Locations where the event will take place."
                },
                {
                    "name": "lockTimeZoneToggleOnBookingPage",
                    "title": "Lock Time Zone Toggle On Booking Page",
                    "type": "`$BOOLEAN`",
                    "op": {
                        "list": {
                            "req": true,
                            "type": "`$BOOLEAN`"
                        },
                        "update": {
                            "req": true,
                            "type": "`$BOOLEAN`"
                        }
                    }
                },
                {
                    "name": "metadata",
                    "title": "Metadata",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "minimumBookingNotice",
                    "title": "Minimum Booking Notice",
                    "type": "`$NUMBER`",
                    "short": "Minimum number of minutes before the event that a booking can be made."
                },
                {
                    "name": "offsetStart",
                    "title": "Offset Start",
                    "type": "`$NUMBER`",
                    "short": "Offset timeslots shown to bookers by a specified number of minutes"
                },
                {
                    "name": "onlyShowFirstAvailableSlot",
                    "title": "Only Show First Available Slot",
                    "type": "`$BOOLEAN`",
                    "short": "This will limit your availability for this event type to one slot per day, scheduled at the earliest available time."
                },
                {
                    "name": "ownerId",
                    "title": "Owner Id",
                    "type": "`$NUMBER`",
                    "req": true
                },
                {
                    "name": "price",
                    "title": "Price",
                    "type": "`$NUMBER`",
                    "req": true
                },
                {
                    "name": "recurrence",
                    "title": "Recurrence",
                    "type": "`$ANY`",
                    "op": {
                        "list": {
                            "req": true,
                            "type": "`$ANY`"
                        },
                        "update": {
                            "req": true,
                            "type": "`$ANY`"
                        }
                    },
                    "short": "Create a recurring event type."
                },
                {
                    "name": "requiresBookerEmailVerification",
                    "title": "Requires Booker Email Verification",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "scheduleId",
                    "title": "Schedule Id",
                    "type": "`$NUMBER`",
                    "op": {
                        "list": {
                            "req": true,
                            "type": "`$NUMBER`"
                        },
                        "update": {
                            "req": true,
                            "type": "`$NUMBER`"
                        }
                    },
                    "short": "If you want that this event has different schedule than user's default one you can specify it here."
                },
                {
                    "name": "seats",
                    "title": "Seats",
                    "type": "`$ANY`",
                    "op": {
                        "list": {
                            "req": true,
                            "type": "`$OBJECT`"
                        },
                        "update": {
                            "req": true,
                            "type": "`$OBJECT`"
                        }
                    },
                    "short": "Create an event type with multiple seats."
                },
                {
                    "name": "seatsPerTimeSlot",
                    "title": "Seats Per Time Slot",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "seatsShowAvailabilityCount",
                    "title": "Seats Show Availability Count",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "showOptimizedSlots",
                    "title": "Show Optimized Slots",
                    "type": "`$BOOLEAN`",
                    "short": "Arrange time slots to optimize availability."
                },
                {
                    "name": "slotInterval",
                    "title": "Slot Interval",
                    "type": "`$NUMBER`",
                    "short": "Number representing length of each slot when event is booked."
                },
                {
                    "name": "slug",
                    "title": "Slug",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "successRedirectUrl",
                    "title": "Success Redirect Url",
                    "type": "`$STRING`",
                    "op": {
                        "list": {
                            "req": true,
                            "type": "`$OBJECT`"
                        },
                        "update": {
                            "req": true,
                            "type": "`$OBJECT`"
                        }
                    },
                    "short": "A valid URL where the booker will redirect to, once the booking is completed successfully"
                },
                {
                    "name": "title",
                    "title": "Title",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "useDestinationCalendarEmail",
                    "title": "Use Destination Calendar Email",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "users",
                    "title": "Users",
                    "type": "`$ARRAY`",
                    "req": true
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "event_type",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/event-types",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "event-types"
                                }
                            ],
                            "parts": [
                                "v2",
                                "event-types"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-06-14"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "cal_api_version"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/event-types",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "event-types"
                                }
                            ],
                            "parts": [
                                "v2",
                                "event-types"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-06-14"
                                    },
                                    {
                                        "name": "x_cal_client_id",
                                        "orig": "x-cal-client-id",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    },
                                    {
                                        "name": "x_cal_secret_key",
                                        "orig": "x-cal-secret-key",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "event_slug",
                                        "orig": "eventSlug",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "org_id",
                                        "orig": "orgId",
                                        "type": "`$NUMBER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "org_slug",
                                        "orig": "orgSlug",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "sort_created_at",
                                        "orig": "sortCreatedAt",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "username",
                                        "orig": "username",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "username",
                                        "orig": "usernames",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "cal_api_version"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/event-types/{eventTypeId}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "event-types"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "event-types",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "eventTypeId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-06-14"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "eventTypeId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "cal_api_version",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/v2/event-types/{eventTypeId}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "event-types"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "event-types",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "eventTypeId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-06-14"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "eventTypeId",
                                        "type": "`$NUMBER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "cal_api_version",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/v2/event-types/{eventTypeId}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "event-types"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "event-types",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "eventTypeId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-06-14"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "eventTypeId",
                                        "type": "`$NUMBER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "cal_api_version",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "event_type_webhook": {
            "fields": [
                {
                    "name": "active",
                    "title": "Active",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$BOOLEAN`"
                        }
                    }
                },
                {
                    "name": "eventTypeId",
                    "title": "Event Type Id",
                    "type": "`$NUMBER`",
                    "req": true
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$NUMBER`",
                    "req": true
                },
                {
                    "name": "payloadTemplate",
                    "title": "Payload Template",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        },
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The template of the payload that will be sent to the subscriberUrl, check cal.com/docs/core-features/webhooks for more information"
                },
                {
                    "name": "secret",
                    "title": "Secret",
                    "type": "`$STRING`"
                },
                {
                    "name": "subscriberUrl",
                    "title": "Subscriber Url",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "triggers",
                    "title": "Triggers",
                    "type": "`$ARRAY`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$ARRAY`"
                        }
                    }
                },
                {
                    "name": "version",
                    "title": "Version",
                    "type": "`$STRING`",
                    "short": "The version of the webhook"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "event_type_webhook",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/event-types/{eventTypeId}/webhooks",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "event-types"
                                },
                                {
                                    "var": "event_type_id"
                                },
                                {
                                    "lit": "webhooks"
                                }
                            ],
                            "parts": [
                                "v2",
                                "event-types",
                                "{event_type_id}",
                                "webhooks"
                            ],
                            "rename": {
                                "param": {
                                    "eventTypeId": "event_type_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "event_type_id",
                                        "orig": "eventTypeId",
                                        "type": "`$NUMBER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "event_type_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/event-types/{eventTypeId}/webhooks",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "event-types"
                                },
                                {
                                    "var": "event_type_id"
                                },
                                {
                                    "lit": "webhooks"
                                }
                            ],
                            "parts": [
                                "v2",
                                "event-types",
                                "{event_type_id}",
                                "webhooks"
                            ],
                            "rename": {
                                "param": {
                                    "eventTypeId": "event_type_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "event_type_id",
                                        "orig": "eventTypeId",
                                        "type": "`$NUMBER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "skip",
                                        "orig": "skip",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "example": 0
                                    },
                                    {
                                        "name": "take",
                                        "orig": "take",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "example": 25
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "event_type_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/event-types/{eventTypeId}/webhooks/{webhookId}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "event-types"
                                },
                                {
                                    "var": "event_type_id"
                                },
                                {
                                    "lit": "webhooks"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "event-types",
                                "{event_type_id}",
                                "webhooks",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "eventTypeId": "event_type_id",
                                    "webhookId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "event_type_id",
                                        "orig": "eventTypeId",
                                        "type": "`$NUMBER`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "webhookId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "event_type_id",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/v2/event-types/{eventTypeId}/webhooks/{webhookId}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "event-types"
                                },
                                {
                                    "var": "event_type_id"
                                },
                                {
                                    "lit": "webhooks"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "event-types",
                                "{event_type_id}",
                                "webhooks",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "eventTypeId": "event_type_id",
                                    "webhookId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "event_type_id",
                                        "orig": "eventTypeId",
                                        "type": "`$NUMBER`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "webhookId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "event_type_id",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/v2/event-types/{eventTypeId}/webhooks",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "event-types"
                                },
                                {
                                    "var": "event_type_id"
                                },
                                {
                                    "lit": "webhooks"
                                }
                            ],
                            "parts": [
                                "v2",
                                "event-types",
                                "{event_type_id}",
                                "webhooks"
                            ],
                            "rename": {
                                "param": {
                                    "eventTypeId": "event_type_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "event_type_id",
                                        "orig": "eventTypeId",
                                        "type": "`$NUMBER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "event_type_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/v2/event-types/{eventTypeId}/webhooks/{webhookId}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "event-types"
                                },
                                {
                                    "var": "event_type_id"
                                },
                                {
                                    "lit": "webhooks"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "event-types",
                                "{event_type_id}",
                                "webhooks",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "eventTypeId": "event_type_id",
                                    "webhookId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "event_type_id",
                                        "orig": "eventTypeId",
                                        "type": "`$NUMBER`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "webhookId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "event_type_id",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.event_type"
                    ]
                ]
            }
        },
        "managed_user": {
            "fields": [
                {
                    "name": "avatarUrl",
                    "title": "Avatar Url",
                    "type": "`$STRING`",
                    "short": "URL of the user's avatar image"
                },
                {
                    "name": "bio",
                    "title": "Bio",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        },
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Bio"
                },
                {
                    "name": "createdDate",
                    "title": "Created Date",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "defaultScheduleId",
                    "title": "Default Schedule Id",
                    "type": "`$NUMBER`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$NUMBER`"
                        }
                    }
                },
                {
                    "name": "email",
                    "title": "Email",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$NUMBER`",
                    "req": true
                },
                {
                    "name": "locale",
                    "title": "Locale",
                    "type": "`$STRING`"
                },
                {
                    "name": "metadata",
                    "title": "Metadata",
                    "type": "`$OBJECT`",
                    "short": "You can store any additional data you want here."
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Managed user's name is used in emails"
                },
                {
                    "name": "timeFormat",
                    "title": "Time Format",
                    "type": "`$NUMBER`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$NUMBER`"
                        },
                        "update": {
                            "type": "`$NUMBER`"
                        }
                    },
                    "short": "Must be a number 12 or 24"
                },
                {
                    "name": "timeZone",
                    "title": "Time Zone",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        },
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Timezone is used to create user's default schedule from Monday to Friday from 9AM to 5PM."
                },
                {
                    "name": "username",
                    "title": "Username",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "weekStart",
                    "title": "Week Start",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        },
                        "update": {
                            "type": "`$STRING`"
                        }
                    }
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "managed_user",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/oauth-clients/{clientId}/users",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "oauth-clients"
                                },
                                {
                                    "var": "oauth_client_id"
                                },
                                {
                                    "lit": "users"
                                }
                            ],
                            "parts": [
                                "v2",
                                "oauth-clients",
                                "{oauth_client_id}",
                                "users"
                            ],
                            "rename": {
                                "param": {
                                    "clientId": "oauth_client_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_cal_secret_key",
                                        "orig": "x-cal-secret-key",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "oauth_client_id",
                                        "orig": "clientId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "oauth_client_id",
                                    "x_cal_secret_key"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/oauth-clients/{clientId}/users",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "oauth-clients"
                                },
                                {
                                    "var": "oauth_client_id"
                                },
                                {
                                    "lit": "users"
                                }
                            ],
                            "parts": [
                                "v2",
                                "oauth-clients",
                                "{oauth_client_id}",
                                "users"
                            ],
                            "rename": {
                                "param": {
                                    "clientId": "oauth_client_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_cal_secret_key",
                                        "orig": "x-cal-secret-key",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "oauth_client_id",
                                        "orig": "clientId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "email",
                                        "orig": "emails",
                                        "type": "`$ARRAY`",
                                        "kind": "query",
                                        "example": "?emails=email1@example.com,email2@example.com",
                                        "field": true
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "example": 10
                                    },
                                    {
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "example": 0
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "oauth_client_id",
                                    "x_cal_secret_key"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/oauth-clients/{clientId}/users/{userId}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "oauth-clients"
                                },
                                {
                                    "var": "oauth_client_id"
                                },
                                {
                                    "lit": "users"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "oauth-clients",
                                "{oauth_client_id}",
                                "users",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "clientId": "oauth_client_id",
                                    "userId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_cal_secret_key",
                                        "orig": "x-cal-secret-key",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "userId",
                                        "type": "`$NUMBER`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "oauth_client_id",
                                        "orig": "clientId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "oauth_client_id",
                                    "x_cal_secret_key"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/v2/oauth-clients/{clientId}/users/{userId}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "oauth-clients"
                                },
                                {
                                    "var": "oauth_client_id"
                                },
                                {
                                    "lit": "users"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "oauth-clients",
                                "{oauth_client_id}",
                                "users",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "clientId": "oauth_client_id",
                                    "userId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_cal_secret_key",
                                        "orig": "x-cal-secret-key",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "userId",
                                        "type": "`$NUMBER`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "oauth_client_id",
                                        "orig": "clientId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "oauth_client_id",
                                    "x_cal_secret_key"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/v2/oauth-clients/{clientId}/users/{userId}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "oauth-clients"
                                },
                                {
                                    "var": "oauth_client_id"
                                },
                                {
                                    "lit": "users"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "oauth-clients",
                                "{oauth_client_id}",
                                "users",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "clientId": "oauth_client_id",
                                    "userId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_cal_secret_key",
                                        "orig": "x-cal-secret-key",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "userId",
                                        "type": "`$NUMBER`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "oauth_client_id",
                                        "orig": "clientId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "oauth_client_id",
                                    "x_cal_secret_key"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.oauth_client"
                    ]
                ]
            }
        },
        "me": {
            "fields": [
                {
                    "name": "avatarUrl",
                    "title": "Avatar Url",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "URL of the user's avatar image"
                },
                {
                    "name": "bio",
                    "title": "Bio",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Bio"
                },
                {
                    "name": "defaultScheduleId",
                    "title": "Default Schedule Id",
                    "type": "`$NUMBER`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$NUMBER`"
                        }
                    }
                },
                {
                    "name": "email",
                    "title": "Email",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$NUMBER`",
                    "req": true
                },
                {
                    "name": "locale",
                    "title": "Locale",
                    "type": "`$STRING`"
                },
                {
                    "name": "metadata",
                    "title": "Metadata",
                    "type": "`$OBJECT`",
                    "short": "You can store any additional data you want here."
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "organization",
                    "title": "Organization",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "organizationId",
                    "title": "Organization Id",
                    "type": "`$NUMBER`",
                    "req": true
                },
                {
                    "name": "timeFormat",
                    "title": "Time Format",
                    "type": "`$NUMBER`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$NUMBER`"
                        }
                    },
                    "short": "Must be 12 or 24"
                },
                {
                    "name": "timeZone",
                    "title": "Time Zone",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "username",
                    "title": "Username",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "weekStart",
                    "title": "Week Start",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    }
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "me",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/me",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "me"
                                }
                            ],
                            "parts": [
                                "v2",
                                "me"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/v2/me",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "me"
                                }
                            ],
                            "parts": [
                                "v2",
                                "me"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "oauth_client": {
            "fields": [
                {
                    "name": "areCalendarEventsEnabled",
                    "title": "Are Calendar Events Enabled",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$BOOLEAN`"
                        },
                        "update": {
                            "type": "`$BOOLEAN`"
                        }
                    },
                    "short": "If true and if managed user has calendar connected, calendar events will be created."
                },
                {
                    "name": "areDefaultEventTypesEnabled",
                    "title": "Are Default Event Types Enabled",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$BOOLEAN`"
                        },
                        "update": {
                            "type": "`$BOOLEAN`"
                        }
                    },
                    "short": "If enabled, when creating a managed user the managed user will have 4 default event types: 30 and 60 minutes without Cal video, 30 and 60 minutes with Cal video."
                },
                {
                    "name": "areEmailsEnabled",
                    "title": "Are Emails Enabled",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$BOOLEAN`"
                        },
                        "update": {
                            "type": "`$BOOLEAN`"
                        }
                    }
                },
                {
                    "name": "bookingCancelRedirectUri",
                    "title": "Booking Cancel Redirect Uri",
                    "type": "`$STRING`"
                },
                {
                    "name": "bookingRedirectUri",
                    "title": "Booking Redirect Uri",
                    "type": "`$STRING`"
                },
                {
                    "name": "bookingRescheduleRedirectUri",
                    "title": "Booking Reschedule Redirect Uri",
                    "type": "`$STRING`"
                },
                {
                    "name": "createdAt",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "req": true,
                    "format": "date-time"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "logo",
                    "title": "Logo",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "organizationId",
                    "title": "Organization Id",
                    "type": "`$NUMBER`",
                    "req": true
                },
                {
                    "name": "permissions",
                    "title": "Permissions",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Array of permission keys like [\"BOOKING_READ\", \"BOOKING_WRITE\"]"
                },
                {
                    "name": "redirectUris",
                    "title": "Redirect Uris",
                    "type": "`$ARRAY`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$ARRAY`"
                        }
                    }
                },
                {
                    "name": "secret",
                    "title": "Secret",
                    "type": "`$STRING`",
                    "req": true
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "oauth_client",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/oauth-clients",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "oauth-clients"
                                }
                            ],
                            "parts": [
                                "v2",
                                "oauth-clients"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/oauth-clients",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "oauth-clients"
                                }
                            ],
                            "parts": [
                                "v2",
                                "oauth-clients"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/oauth-clients/{clientId}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "oauth-clients"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "oauth-clients",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "clientId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "clientId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/auth/oauth2/clients/{clientId}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "auth"
                                },
                                {
                                    "lit": "oauth2"
                                },
                                {
                                    "lit": "clients"
                                },
                                {
                                    "var": "client_id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "auth",
                                "oauth2",
                                "clients",
                                "{client_id}"
                            ],
                            "rename": {
                                "param": {
                                    "clientId": "client_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "client_id",
                                        "orig": "clientId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "oauth2",
                                "exist": [
                                    "client_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/v2/oauth-clients/{clientId}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "oauth-clients"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "oauth-clients",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "clientId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "clientId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/v2/oauth-clients/{clientId}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "oauth-clients"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "oauth-clients",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "clientId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "clientId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "oauth_client_webhook": {
            "fields": [
                {
                    "name": "active",
                    "title": "Active",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$BOOLEAN`"
                        }
                    }
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$NUMBER`",
                    "req": true
                },
                {
                    "name": "oAuthClientId",
                    "title": "O Auth Client Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "payloadTemplate",
                    "title": "Payload Template",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        },
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The template of the payload that will be sent to the subscriberUrl, check cal.com/docs/core-features/webhooks for more information"
                },
                {
                    "name": "secret",
                    "title": "Secret",
                    "type": "`$STRING`"
                },
                {
                    "name": "subscriberUrl",
                    "title": "Subscriber Url",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "triggers",
                    "title": "Triggers",
                    "type": "`$ARRAY`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$ARRAY`"
                        }
                    }
                },
                {
                    "name": "version",
                    "title": "Version",
                    "type": "`$STRING`",
                    "short": "The version of the webhook"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "oauth_client_webhook",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/oauth-clients/{clientId}/webhooks",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "oauth-clients"
                                },
                                {
                                    "var": "oauth_client_id"
                                },
                                {
                                    "lit": "webhooks"
                                }
                            ],
                            "parts": [
                                "v2",
                                "oauth-clients",
                                "{oauth_client_id}",
                                "webhooks"
                            ],
                            "rename": {
                                "param": {
                                    "clientId": "oauth_client_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_cal_secret_key",
                                        "orig": "x-cal-secret-key",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "oauth_client_id",
                                        "orig": "clientId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "oauth_client_id",
                                    "x_cal_secret_key"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/oauth-clients/{clientId}/webhooks",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "oauth-clients"
                                },
                                {
                                    "var": "oauth_client_id"
                                },
                                {
                                    "lit": "webhooks"
                                }
                            ],
                            "parts": [
                                "v2",
                                "oauth-clients",
                                "{oauth_client_id}",
                                "webhooks"
                            ],
                            "rename": {
                                "param": {
                                    "clientId": "oauth_client_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_cal_secret_key",
                                        "orig": "x-cal-secret-key",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "oauth_client_id",
                                        "orig": "clientId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "skip",
                                        "orig": "skip",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "example": 0
                                    },
                                    {
                                        "name": "take",
                                        "orig": "take",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "example": 25
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "oauth_client_id",
                                    "x_cal_secret_key"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/oauth-clients/{clientId}/webhooks/{webhookId}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "oauth-clients"
                                },
                                {
                                    "var": "oauth_client_id"
                                },
                                {
                                    "lit": "webhooks"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "oauth-clients",
                                "{oauth_client_id}",
                                "webhooks",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "clientId": "oauth_client_id",
                                    "webhookId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_cal_secret_key",
                                        "orig": "x-cal-secret-key",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "webhookId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "oauth_client_id",
                                        "orig": "clientId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "oauth_client_id",
                                    "x_cal_secret_key"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/v2/oauth-clients/{clientId}/webhooks/{webhookId}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "oauth-clients"
                                },
                                {
                                    "var": "oauth_client_id"
                                },
                                {
                                    "lit": "webhooks"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "oauth-clients",
                                "{oauth_client_id}",
                                "webhooks",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "clientId": "oauth_client_id",
                                    "webhookId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_cal_secret_key",
                                        "orig": "x-cal-secret-key",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "webhookId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "oauth_client_id",
                                        "orig": "clientId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "oauth_client_id",
                                    "x_cal_secret_key"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/v2/oauth-clients/{clientId}/webhooks",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "oauth-clients"
                                },
                                {
                                    "var": "oauth_client_id"
                                },
                                {
                                    "lit": "webhooks"
                                }
                            ],
                            "parts": [
                                "v2",
                                "oauth-clients",
                                "{oauth_client_id}",
                                "webhooks"
                            ],
                            "rename": {
                                "param": {
                                    "clientId": "oauth_client_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_cal_secret_key",
                                        "orig": "x-cal-secret-key",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "oauth_client_id",
                                        "orig": "clientId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "oauth_client_id",
                                    "x_cal_secret_key"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/v2/oauth-clients/{clientId}/webhooks/{webhookId}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "oauth-clients"
                                },
                                {
                                    "var": "oauth_client_id"
                                },
                                {
                                    "lit": "webhooks"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "oauth-clients",
                                "{oauth_client_id}",
                                "webhooks",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "clientId": "oauth_client_id",
                                    "webhookId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_cal_secret_key",
                                        "orig": "x-cal-secret-key",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "webhookId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "oauth_client_id",
                                        "orig": "clientId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "oauth_client_id",
                                    "x_cal_secret_key"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.oauth_client"
                    ]
                ]
            }
        },
        "oauth_token": {
            "fields": [
                {
                    "name": "access_token",
                    "title": "Access Token",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The access token"
                },
                {
                    "name": "expires_in",
                    "title": "Expires In",
                    "type": "`$NUMBER`",
                    "req": true,
                    "short": "The number of seconds until the access token expires"
                },
                {
                    "name": "refresh_token",
                    "title": "Refresh Token",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The refresh token"
                },
                {
                    "name": "token_type",
                    "title": "Token Type",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The token type"
                }
            ],
            "name": "oauth_token",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/oauth-clients/{clientId}/users/{userId}/force-refresh",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "oauth-clients"
                                },
                                {
                                    "var": "oauth_client_id"
                                },
                                {
                                    "lit": "users"
                                },
                                {
                                    "var": "user_id"
                                },
                                {
                                    "lit": "force-refresh"
                                }
                            ],
                            "parts": [
                                "v2",
                                "oauth-clients",
                                "{oauth_client_id}",
                                "users",
                                "{user_id}",
                                "force-refresh"
                            ],
                            "rename": {
                                "param": {
                                    "clientId": "oauth_client_id",
                                    "userId": "user_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_cal_secret_key",
                                        "orig": "x-cal-secret-key",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "oauth_client_id",
                                        "orig": "clientId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "user_id",
                                        "orig": "userId",
                                        "type": "`$NUMBER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "force_refresh",
                                "exist": [
                                    "oauth_client_id",
                                    "user_id",
                                    "x_cal_secret_key"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/oauth/{clientId}/refresh",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "oauth"
                                },
                                {
                                    "var": "oauth_id"
                                },
                                {
                                    "lit": "refresh"
                                }
                            ],
                            "parts": [
                                "v2",
                                "oauth",
                                "{oauth_id}",
                                "refresh"
                            ],
                            "rename": {
                                "param": {
                                    "clientId": "oauth_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_cal_secret_key",
                                        "orig": "x-cal-secret-key",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "oauth_id",
                                        "orig": "clientId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "refresh",
                                "exist": [
                                    "oauth_id",
                                    "x_cal_secret_key"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/auth/oauth2/token",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "auth"
                                },
                                {
                                    "lit": "oauth2"
                                },
                                {
                                    "lit": "token"
                                }
                            ],
                            "parts": [
                                "v2",
                                "auth",
                                "oauth2",
                                "token"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.oauth_client"
                    ]
                ]
            }
        },
        "private_link": {
            "fields": [
                {
                    "name": "data",
                    "title": "Data",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Array of private links for the event type (mix of time-based and usage-based)"
                },
                {
                    "name": "expiresAt",
                    "title": "Expires At",
                    "type": "`$STRING`",
                    "short": "Expiration date for time-based links",
                    "format": "date-time"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "maxUsageCount",
                    "title": "Max Usage Count",
                    "type": "`$NUMBER`",
                    "short": "Maximum number of times the link can be used."
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Response status"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "private_link",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/event-types/{eventTypeId}/private-links",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "event-types"
                                },
                                {
                                    "var": "event_type_id"
                                },
                                {
                                    "lit": "private-links"
                                }
                            ],
                            "parts": [
                                "v2",
                                "event-types",
                                "{event_type_id}",
                                "private-links"
                            ],
                            "rename": {
                                "param": {
                                    "eventTypeId": "event_type_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "event_type_id",
                                        "orig": "eventTypeId",
                                        "type": "`$NUMBER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "event_type_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/event-types/{eventTypeId}/private-links",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "event-types"
                                },
                                {
                                    "var": "event_type_id"
                                },
                                {
                                    "lit": "private-links"
                                }
                            ],
                            "parts": [
                                "v2",
                                "event-types",
                                "{event_type_id}",
                                "private-links"
                            ],
                            "rename": {
                                "param": {
                                    "eventTypeId": "event_type_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "event_type_id",
                                        "orig": "eventTypeId",
                                        "type": "`$NUMBER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "event_type_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/v2/event-types/{eventTypeId}/private-links/{linkId}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "event-types"
                                },
                                {
                                    "var": "event_type_id"
                                },
                                {
                                    "lit": "private-links"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "event-types",
                                "{event_type_id}",
                                "private-links",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "eventTypeId": "event_type_id",
                                    "linkId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "event_type_id",
                                        "orig": "eventTypeId",
                                        "type": "`$NUMBER`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "linkId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "event_type_id",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/v2/event-types/{eventTypeId}/private-links/{linkId}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "event-types"
                                },
                                {
                                    "var": "event_type_id"
                                },
                                {
                                    "lit": "private-links"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "event-types",
                                "{event_type_id}",
                                "private-links",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "eventTypeId": "event_type_id",
                                    "linkId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "event_type_id",
                                        "orig": "eventTypeId",
                                        "type": "`$NUMBER`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "linkId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "event_type_id",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.event_type"
                    ]
                ]
            }
        },
        "schedule": {
            "fields": [
                {
                    "name": "availability",
                    "title": "Availability",
                    "type": "`$ARRAY`",
                    "op": {
                        "list": {
                            "req": true,
                            "type": "`$ARRAY`"
                        }
                    },
                    "short": "Each object contains days and times when the user is available."
                },
                {
                    "name": "data",
                    "title": "Data",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "error",
                    "title": "Error",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$NUMBER`",
                    "req": true
                },
                {
                    "name": "isDefault",
                    "title": "Is Default",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$BOOLEAN`"
                        }
                    },
                    "short": "Each user should have 1 default schedule."
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "overrides",
                    "title": "Overrides",
                    "type": "`$ARRAY`",
                    "op": {
                        "list": {
                            "req": true,
                            "type": "`$ARRAY`"
                        }
                    },
                    "short": "Need to change availability for a specific date?"
                },
                {
                    "name": "ownerId",
                    "title": "Owner Id",
                    "type": "`$NUMBER`",
                    "req": true
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "timeZone",
                    "title": "Time Zone",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Timezone is used to calculate available times when an event using the schedule is booked."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "schedule",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/schedules",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "schedules"
                                }
                            ],
                            "parts": [
                                "v2",
                                "schedules"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-06-11"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "cal_api_version"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/schedules",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "schedules"
                                }
                            ],
                            "parts": [
                                "v2",
                                "schedules"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-06-11"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "cal_api_version"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/schedules/{scheduleId}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "schedules"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "schedules",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "scheduleId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-06-11"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "scheduleId",
                                        "type": "`$NUMBER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "cal_api_version",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/schedules/default",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "schedules"
                                },
                                {
                                    "lit": "default"
                                }
                            ],
                            "parts": [
                                "v2",
                                "schedules",
                                "default"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-06-11"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "default",
                                "exist": [
                                    "authorization",
                                    "cal_api_version"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/v2/schedules/{scheduleId}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "schedules"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "schedules",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "scheduleId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-06-11"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "scheduleId",
                                        "type": "`$NUMBER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "cal_api_version",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/v2/schedules/{scheduleId}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "schedules"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "schedules",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "scheduleId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-06-11"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "scheduleId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "cal_api_version",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "selected_calendar": {
            "fields": [
                {
                    "name": "credentialId",
                    "title": "Credential Id",
                    "type": "`$NUMBER`",
                    "req": true
                },
                {
                    "name": "delegationCredentialId",
                    "title": "Delegation Credential Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "externalId",
                    "title": "External Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "integration",
                    "title": "Integration",
                    "type": "`$STRING`",
                    "req": true
                }
            ],
            "name": "selected_calendar",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/selected-calendars",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "selected-calendars"
                                }
                            ],
                            "parts": [
                                "v2",
                                "selected-calendars"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/v2/selected-calendars",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "selected-calendars"
                                }
                            ],
                            "parts": [
                                "v2",
                                "selected-calendars"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "credential_id",
                                        "orig": "credentialId",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "delegation_credential_id",
                                        "orig": "delegationCredentialId",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "external_id",
                                        "orig": "externalId",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "integration",
                                        "orig": "integration",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "field": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "credential_id",
                                    "external_id",
                                    "integration"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "slot": {
            "fields": [],
            "name": "slot",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/slots",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "slots"
                                }
                            ],
                            "parts": [
                                "v2",
                                "slots"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-09-04"
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "booking_uid_to_reschedule",
                                        "orig": "bookingUidToReschedule",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "abc123def456"
                                    },
                                    {
                                        "name": "duration",
                                        "orig": "duration",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "example": "60"
                                    },
                                    {
                                        "name": "end",
                                        "orig": "end",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "example": "2050-09-06"
                                    },
                                    {
                                        "name": "event_type_id",
                                        "orig": "eventTypeId",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "example": "100"
                                    },
                                    {
                                        "name": "event_type_slug",
                                        "orig": "eventTypeSlug",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "event-type-slug"
                                    },
                                    {
                                        "name": "format",
                                        "orig": "format",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "range"
                                    },
                                    {
                                        "name": "organization_slug",
                                        "orig": "organizationSlug",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "org-slug"
                                    },
                                    {
                                        "name": "start",
                                        "orig": "start",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "example": "2050-09-05"
                                    },
                                    {
                                        "name": "team_slug",
                                        "orig": "teamSlug",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "team-slug"
                                    },
                                    {
                                        "name": "time_zone",
                                        "orig": "timeZone",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "Europe/Rome"
                                    },
                                    {
                                        "name": "username",
                                        "orig": "username",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "bob"
                                    },
                                    {
                                        "name": "username",
                                        "orig": "usernames",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "alice,bob"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "cal_api_version",
                                    "end",
                                    "start"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "slot_reservation": {
            "fields": [
                {
                    "name": "eventTypeId",
                    "title": "Event Type Id",
                    "type": "`$NUMBER`",
                    "req": true,
                    "short": "The ID of the event type for which slot should be reserved."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "reservationDuration",
                    "title": "Reservation Duration",
                    "type": "`$NUMBER`",
                    "op": {
                        "update": {
                            "req": true,
                            "type": "`$NUMBER`"
                        }
                    },
                    "short": "ONLY for authenticated requests with api key, access token or OAuth credentials (ID + secret)."
                },
                {
                    "name": "reservationUid",
                    "title": "Reservation Uid",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The unique identifier of the reservation."
                },
                {
                    "name": "reservationUntil",
                    "title": "Reservation Until",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "ISO 8601 datestring in UTC timezone representing time until which the slot is reserved."
                },
                {
                    "name": "slotDuration",
                    "title": "Slot Duration",
                    "type": "`$NUMBER`",
                    "op": {
                        "update": {
                            "req": true,
                            "type": "`$NUMBER`"
                        }
                    },
                    "short": "By default slot duration is equal to event type length, but if you want to reserve a slot for an event type that has a variable length you can specify it here as a number in minutes."
                },
                {
                    "name": "slotEnd",
                    "title": "Slot End",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "ISO 8601 datestring in UTC timezone representing slot end."
                },
                {
                    "name": "slotStart",
                    "title": "Slot Start",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "ISO 8601 datestring in UTC timezone representing available slot."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "slot_reservation",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/slots/reservations",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "slots"
                                },
                                {
                                    "lit": "reservations"
                                }
                            ],
                            "parts": [
                                "v2",
                                "slots",
                                "reservations"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    },
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-09-04"
                                    },
                                    {
                                        "name": "x_cal_client_id",
                                        "orig": "x-cal-client-id",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "cal_api_version"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/slots/reservations/{uid}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "slots"
                                },
                                {
                                    "lit": "reservations"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "slots",
                                "reservations",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "uid": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-09-04"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "uid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "cal_api_version",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/v2/slots/reservations/{uid}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "slots"
                                },
                                {
                                    "lit": "reservations"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "slots",
                                "reservations",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "uid": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-09-04"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "uid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "cal_api_version",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/v2/slots/reservations/{uid}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "slots"
                                },
                                {
                                    "lit": "reservations"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "slots",
                                "reservations",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "uid": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "cal_api_version",
                                        "orig": "cal-api-version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "2024-09-04"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "uid",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "cal_api_version",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "stripe": {
            "fields": [
                {
                    "name": "authUrl",
                    "title": "Auth Url",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "url",
                    "title": "Url",
                    "type": "`$STRING`",
                    "req": true
                }
            ],
            "name": "stripe",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/stripe/save",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "stripe"
                                },
                                {
                                    "lit": "save"
                                }
                            ],
                            "parts": [
                                "v2",
                                "stripe",
                                "save"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "code",
                                        "orig": "code",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "state",
                                        "orig": "state",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "code",
                                    "state"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/stripe/check",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "stripe"
                                },
                                {
                                    "lit": "check"
                                }
                            ],
                            "parts": [
                                "v2",
                                "stripe",
                                "check"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.status`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "check",
                                "exist": [
                                    "authorization"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/stripe/connect",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "stripe"
                                },
                                {
                                    "lit": "connect"
                                }
                            ],
                            "parts": [
                                "v2",
                                "stripe",
                                "connect"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "verified_email": {
            "fields": [
                {
                    "name": "email",
                    "title": "Email",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The verified email address.",
                    "format": "email"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$NUMBER`",
                    "req": true,
                    "short": "The unique identifier for the verified email."
                },
                {
                    "name": "userId",
                    "title": "User Id",
                    "type": "`$NUMBER`",
                    "req": true,
                    "short": "The ID of the associated user, if applicable."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "verified_email",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/verified-resources/emails/verification-code/request",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "verified-resources"
                                },
                                {
                                    "lit": "emails"
                                },
                                {
                                    "lit": "verification-code"
                                },
                                {
                                    "lit": "request"
                                }
                            ],
                            "parts": [
                                "v2",
                                "verified-resources",
                                "emails",
                                "verification-code",
                                "request"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "request",
                                "exist": [
                                    "authorization"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/verified-resources/emails/verification-code/verify",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "verified-resources"
                                },
                                {
                                    "lit": "emails"
                                },
                                {
                                    "lit": "verification-code"
                                },
                                {
                                    "lit": "verify"
                                }
                            ],
                            "parts": [
                                "v2",
                                "verified-resources",
                                "emails",
                                "verification-code",
                                "verify"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "verify",
                                "exist": [
                                    "authorization"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/verified-resources/emails",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "verified-resources"
                                },
                                {
                                    "lit": "emails"
                                }
                            ],
                            "parts": [
                                "v2",
                                "verified-resources",
                                "emails"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "skip",
                                        "orig": "skip",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "example": 0
                                    },
                                    {
                                        "name": "take",
                                        "orig": "take",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "example": 25
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/verified-resources/emails/{id}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "verified-resources"
                                },
                                {
                                    "lit": "emails"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "verified-resources",
                                "emails",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$NUMBER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "verified_phone": {
            "fields": [
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$NUMBER`",
                    "req": true,
                    "short": "The unique identifier for the verified email."
                },
                {
                    "name": "phoneNumber",
                    "title": "Phone Number",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The verified phone number.",
                    "format": "phone"
                },
                {
                    "name": "userId",
                    "title": "User Id",
                    "type": "`$NUMBER`",
                    "req": true,
                    "short": "The ID of the associated user, if applicable."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "verified_phone",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/verified-resources/phones/verification-code/request",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "verified-resources"
                                },
                                {
                                    "lit": "phones"
                                },
                                {
                                    "lit": "verification-code"
                                },
                                {
                                    "lit": "request"
                                }
                            ],
                            "parts": [
                                "v2",
                                "verified-resources",
                                "phones",
                                "verification-code",
                                "request"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "request",
                                "exist": [
                                    "authorization"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/verified-resources/phones/verification-code/verify",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "verified-resources"
                                },
                                {
                                    "lit": "phones"
                                },
                                {
                                    "lit": "verification-code"
                                },
                                {
                                    "lit": "verify"
                                }
                            ],
                            "parts": [
                                "v2",
                                "verified-resources",
                                "phones",
                                "verification-code",
                                "verify"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "verify",
                                "exist": [
                                    "authorization"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/verified-resources/phones",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "verified-resources"
                                },
                                {
                                    "lit": "phones"
                                }
                            ],
                            "parts": [
                                "v2",
                                "verified-resources",
                                "phones"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "skip",
                                        "orig": "skip",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "example": 0
                                    },
                                    {
                                        "name": "take",
                                        "orig": "take",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "example": 25
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/verified-resources/phones/{id}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "verified-resources"
                                },
                                {
                                    "lit": "phones"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "verified-resources",
                                "phones",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$NUMBER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "webhook": {
            "fields": [
                {
                    "name": "active",
                    "title": "Active",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$BOOLEAN`"
                        }
                    }
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$NUMBER`",
                    "req": true
                },
                {
                    "name": "payloadTemplate",
                    "title": "Payload Template",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        },
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The template of the payload that will be sent to the subscriberUrl, check cal.com/docs/core-features/webhooks for more information"
                },
                {
                    "name": "secret",
                    "title": "Secret",
                    "type": "`$STRING`"
                },
                {
                    "name": "subscriberUrl",
                    "title": "Subscriber Url",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "triggers",
                    "title": "Triggers",
                    "type": "`$ARRAY`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$ARRAY`"
                        }
                    }
                },
                {
                    "name": "userId",
                    "title": "User Id",
                    "type": "`$NUMBER`",
                    "req": true
                },
                {
                    "name": "version",
                    "title": "Version",
                    "type": "`$STRING`",
                    "short": "The version of the webhook"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "webhook",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/webhooks",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "webhooks"
                                }
                            ],
                            "parts": [
                                "v2",
                                "webhooks"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/webhooks",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "webhooks"
                                }
                            ],
                            "parts": [
                                "v2",
                                "webhooks"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "skip",
                                        "orig": "skip",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "example": 0
                                    },
                                    {
                                        "name": "take",
                                        "orig": "take",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "example": 25
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/webhooks/{webhookId}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "webhooks"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "webhooks",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "webhookId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "webhookId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/v2/webhooks/{webhookId}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "webhooks"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "webhooks",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "webhookId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "webhookId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/v2/webhooks/{webhookId}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "webhooks"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "webhooks",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "webhookId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "authorization",
                                        "orig": "Authorization",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "webhookId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "authorization",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map