"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('CalendarEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CalSDK.test();
        const ent = testsdk.Calendar();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.CalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Calendar().load({ "id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CAL_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'calendar.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "connectedCalendars": { "a": true, "h": "Connected Calendars", "n": "connectedCalendars", "r": true, "t": "`$ARRAY`", "key$": "connectedCalendars", "index$": 0 }, "destinationCalendar": { "a": true, "h": "Destination Calendar", "n": "destinationCalendar", "r": true, "t": "`$OBJECT`", "key$": "destinationCalendar", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 2 } }, "id": { "field": "id", "name": "id" }, "name": "calendar", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/calendars/{calendar}/credentials", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "id", "or": "calendar", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v2/calendars/{calendar}/credentials", "q": { "$action": "credential", "exist": ["authorization", "id"] }, "r": { "param": { "calendar": "id" } }, "s": [{ "lit": "v2" }, { "lit": "calendars" }, { "var": "id" }, { "lit": "credentials" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /v2/calendars/{calendar}/disconnect", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "calendar_id", "or": "calendar", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v2/calendars/{calendar}/disconnect", "q": { "$action": "disconnect", "exist": ["authorization", "calendar_id"] }, "r": { "param": { "calendar": "calendar_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "calendars" }, { "var": "calendar_id" }, { "lit": "disconnect" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 1 }, { "a": true, "co": { "id": "POST /v2/calendars/ics-feed/save", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v2/calendars/ics-feed/save", "q": { "$action": "save_ics_feed", "exist": ["authorization"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "calendars" }, { "lit": "ics-feed" }, { "lit": "save" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 2 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/calendars/{calendar}/freebusy", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "calendar_id", "or": "calendar", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "2026-03-10", "k": "query", "n": "from", "or": "from", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "time_zone", "or": "timeZone", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "2026-03-10", "k": "query", "n": "to", "or": "to", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/v2/calendars/{calendar}/freebusy", "q": { "$action": "freebusy", "exist": ["authorization", "calendar_id", "from", "to"] }, "r": { "param": { "calendar": "calendar_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "calendars" }, { "var": "calendar_id" }, { "lit": "freebusy" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v2/calendars/connections/{connectionId}/freebusy", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "connection_id", "or": "connectionId", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "2026-03-10", "k": "query", "n": "from", "or": "from", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "time_zone", "or": "timeZone", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "2026-03-10", "k": "query", "n": "to", "or": "to", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/v2/calendars/connections/{connectionId}/freebusy", "q": { "$action": "freebusy", "exist": ["authorization", "connection_id", "from", "to"] }, "r": { "param": { "connectionId": "connection_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "calendars" }, { "lit": "connections" }, { "var": "connection_id" }, { "lit": "freebusy" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /v2/calendars/busy-times", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "credential_id", "or": "credentialId", "r": true, "t": "`$NUMBER`", "index$": 0 }, { "a": true, "ex": "2023-10-01", "k": "query", "n": "date_from", "or": "dateFrom", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "2023-10-31", "k": "query", "n": "date_to", "or": "dateTo", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "query", "n": "external_id", "or": "externalId", "r": true, "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": "America/New_York", "k": "query", "n": "logged_in_users_tz", "or": "loggedInUsersTz", "r": false, "t": "`$STRING`", "index$": 4 }, { "a": true, "ex": "America/New_York", "k": "query", "n": "time_zone", "or": "timeZone", "r": false, "t": "`$STRING`", "index$": 5 }] }, "k": "http", "m": "GET", "o": "/v2/calendars/busy-times", "q": { "$action": "busy_times", "exist": ["authorization", "credential_id", "external_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "calendars" }, { "lit": "busy-times" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 2 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/calendars/{calendar}/connect", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "id", "or": "calendar", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "is_dry_run", "or": "isDryRun", "r": true, "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "k": "query", "n": "redir", "or": "redir", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/calendars/{calendar}/connect", "q": { "$action": "connect", "exist": ["authorization", "id", "is_dry_run"] }, "r": { "param": { "calendar": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "calendars" }, { "var": "id" }, { "lit": "connect" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v2/calendars/{calendar}/save", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "calendar", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "code", "or": "code", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "state", "or": "state", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/calendars/{calendar}/save", "q": { "$action": "save", "exist": ["code", "id", "state"] }, "r": { "param": { "calendar": "id" } }, "s": [{ "lit": "v2" }, { "lit": "calendars" }, { "var": "id" }, { "lit": "save" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /v2/calendars/{calendar}/check", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "id", "or": "calendar", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/calendars/{calendar}/check", "q": { "$action": "check", "exist": ["authorization", "id"] }, "r": { "param": { "calendar": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "calendars" }, { "var": "id" }, { "lit": "check" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "co": { "id": "GET /v2/calendars", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/calendars", "q": { "exist": ["authorization"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "calendars" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 3 }, { "a": true, "co": { "id": "GET /v2/calendars/ics-feed/check", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/calendars/ics-feed/check", "q": { "$action": "check_ics_feed", "exist": ["authorization"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "calendars" }, { "lit": "ics-feed" }, { "lit": "check" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 4 }, { "a": true, "co": { "id": "GET /v2/calendars/connections", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/calendars/connections", "q": { "$action": "connections", "exist": ["authorization"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "calendars" }, { "lit": "connections" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 5 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "calendar", "name__orig": "calendar", "Name": "Calendar", "name_": "calendar", "name-": "calendar", "NAME": "CALENDAR", "index$": 3 }, { "active": true, "entity": "calendar", "key$": "BasicCalendarFlow", "kind": "basic", "name": "BasicCalendarFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "calendar_ref01" }, "m": { "calendar_id": "calendar01", "connection_id": "connection01" }, "o": "create", "s": [], "v": [], "unreachable": true }, { "a": false, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "calendar_ref01" } }], "unreachable": true }, { "a": true, "d": {}, "i": { "ref": "calendar_ref01", "srcdatavar": "calendar_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-calendar_ref01" } }] }] }, 'Calendar', { "POST /v2/calendars/{calendar}/credentials": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "username": { "type": "string" }, "password": { "type": "string" } }, "required": ["username", "password"], "x-ref": "#/components/schemas/CreateCalendarCredentialsInput" } } } }, "parameters": [{ "name": "calendar", "required": true, "in": "path", "schema": { "enum": ["apple"], "type": "string" }, "index$": 0 }, { "name": "Authorization", "in": "header", "description": "value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "POST /v2/calendars/{calendar}/disconnect": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "integer", "example": 10, "description": "Credential ID of the calendar to delete, as returned by the /calendars endpoint" } }, "required": ["id"], "x-ref": "#/components/schemas/DeleteCalendarCredentialsInputBodyDto" } } } }, "parameters": [{ "name": "calendar", "required": true, "in": "path", "schema": { "enum": ["apple", "google", "office365"], "type": "string" }, "index$": 0 }, { "name": "Authorization", "in": "header", "description": "value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "POST /v2/calendars/ics-feed/save": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "urls": { "type": "array", "example": ["https://cal.com/ics/feed.ics", "http://cal.com/ics/feed.ics"], "description": "An array of ICS URLs", "items": { "type": "string", "example": "https://cal.com/ics/feed.ics" } }, "readOnly": { "type": "boolean", "default": true, "example": false, "description": "Whether to allowing writing to the calendar or not" } }, "required": ["urls"], "x-ref": "#/components/schemas/CreateIcsFeedInputDto" } } } }, "parameters": [{ "name": "Authorization", "in": "header", "description": "value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /v2/calendars/{calendar}/freebusy": { "protocol": "http", "parameters": [{ "name": "calendar", "required": true, "in": "path", "schema": { "enum": ["google", "office365", "apple"], "type": "string" }, "index$": 0 }, { "name": "from", "required": true, "in": "query", "description": "Start of the date range (ISO 8601 date or date-time)", "schema": { "example": "2026-03-10", "type": "string" }, "index$": 1 }, { "name": "to", "required": true, "in": "query", "description": "End of the date range (ISO 8601 date or date-time)", "schema": { "example": "2026-03-10", "type": "string" }, "index$": 2 }, { "name": "timeZone", "required": false, "in": "query", "description": "IANA time zone (e.g. America/New_York)", "schema": { "type": "string" }, "index$": 3 }, { "name": "Authorization", "in": "header", "description": "value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token", "required": true, "schema": { "type": "string" }, "index$": 4 }] }, "GET /v2/calendars/connections/{connectionId}/freebusy": { "protocol": "http", "parameters": [{ "name": "connectionId", "required": true, "in": "path", "schema": { "type": "string" }, "index$": 0 }, { "name": "from", "required": true, "in": "query", "description": "Start of the date range (ISO 8601 date or date-time)", "schema": { "example": "2026-03-10", "type": "string" }, "index$": 1 }, { "name": "to", "required": true, "in": "query", "description": "End of the date range (ISO 8601 date or date-time)", "schema": { "example": "2026-03-10", "type": "string" }, "index$": 2 }, { "name": "timeZone", "required": false, "in": "query", "description": "IANA time zone (e.g. America/New_York)", "schema": { "type": "string" }, "index$": 3 }, { "name": "Authorization", "in": "header", "description": "value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token", "required": true, "schema": { "type": "string" }, "index$": 4 }] }, "GET /v2/calendars/busy-times": { "protocol": "http", "parameters": [{ "name": "loggedInUsersTz", "required": false, "in": "query", "deprecated": true, "description": "Deprecated: Use timeZone instead. The timezone of the user represented as a string", "schema": { "example": "America/New_York", "type": "string" }, "index$": 0 }, { "name": "timeZone", "required": false, "in": "query", "description": "The timezone for the busy times query represented as a string", "schema": { "example": "America/New_York", "type": "string" }, "index$": 1 }, { "name": "dateFrom", "required": false, "in": "query", "description": "The starting date for the busy times query", "schema": { "example": "2023-10-01", "type": "string" }, "index$": 2 }, { "name": "dateTo", "required": false, "in": "query", "description": "The ending date for the busy times query", "schema": { "example": "2023-10-31", "type": "string" }, "index$": 3 }, { "name": "credentialId", "in": "query", "required": true, "schema": { "type": "number" }, "index$": 4 }, { "name": "externalId", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 5 }, { "name": "Authorization", "in": "header", "description": "value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token", "required": true, "schema": { "type": "string" }, "index$": 6 }] }, "GET /v2/calendars/{calendar}/connect": { "protocol": "http", "parameters": [{ "name": "Authorization", "required": true, "in": "header", "description": "value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token", "schema": { "type": "string" }, "index$": 0 }, { "name": "calendar", "required": true, "in": "path", "schema": { "enum": ["office365", "google"], "type": "string" }, "index$": 1 }, { "name": "isDryRun", "required": true, "in": "query", "schema": { "type": "boolean" }, "index$": 2 }, { "name": "redir", "required": false, "in": "query", "description": "Redirect URL after successful calendar authorization.", "schema": { "type": "string" }, "index$": 3 }] }, "GET /v2/calendars/{calendar}/save": { "protocol": "http", "parameters": [{ "name": "state", "required": true, "in": "query", "schema": { "type": "string" }, "index$": 0 }, { "name": "code", "required": true, "in": "query", "schema": { "type": "string" }, "index$": 1 }, { "name": "calendar", "required": true, "in": "path", "schema": { "enum": ["office365", "google"], "type": "string" }, "index$": 2 }] }, "GET /v2/calendars/{calendar}/check": { "protocol": "http", "parameters": [{ "name": "calendar", "required": true, "in": "path", "schema": { "enum": ["apple", "google", "office365"], "type": "string" }, "index$": 0 }, { "name": "Authorization", "in": "header", "description": "value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /v2/calendars": { "protocol": "http", "parameters": [{ "name": "Authorization", "in": "header", "description": "value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /v2/calendars/ics-feed/check": { "protocol": "http", "parameters": [{ "name": "Authorization", "in": "header", "description": "value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /v2/calendars/connections": { "protocol": "http", "parameters": [{ "name": "Authorization", "in": "header", "description": "value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let calendar_ref01_data = Object.values(setup.data.existing.calendar)[0];
        // LOAD
        const calendar_ref01_ent = client.Calendar();
        const calendar_ref01_match_dt0 = {};
        calendar_ref01_match_dt0.id = calendar_ref01_data.id;
        const calendar_ref01_data_dt0 = (await calendar_ref01_ent.load(calendar_ref01_match_dt0)).data();
        (0, node_assert_1.default)(calendar_ref01_data_dt0.id === calendar_ref01_data.id);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/calendar/CalendarTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['calendar01', 'calendar02', 'calendar03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CAL_TEST_CALENDAR_ENTID': idmap,
        'CAL_TEST_LIVE': 'FALSE',
        'CAL_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['CAL_TEST_CALENDAR_ENTID'];
    const live = 'TRUE' === env.CAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CAL_TEST_CALENDAR_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.CalSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.CAL_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=CalendarEntity.test.js.map