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
(0, node_test_1.describe)('EventTypeWebhookEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CalSDK.test();
        const ent = testsdk.EventTypeWebhook();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.CalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.EventTypeWebhook().list({ "event_type_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CAL_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'event_type_webhook.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "active": { "a": true, "h": "Active", "n": "active", "op": { "update": { "req": false, "type": "`$BOOLEAN`" } }, "r": true, "t": "`$BOOLEAN`", "key$": "active", "index$": 0 }, "eventTypeId": { "a": true, "h": "Event Type Id", "n": "eventTypeId", "r": true, "t": "`$NUMBER`", "key$": "eventTypeId", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$NUMBER`", "key$": "id", "index$": 2 }, "payloadTemplate": { "a": true, "h": "Payload Template", "n": "payloadTemplate", "op": { "create": { "req": false, "type": "`$STRING`" }, "update": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "The template of the payload that will be sent to the subscriberUrl, check cal.com/docs/core-features/webhooks for more information", "t": "`$STRING`", "key$": "payloadTemplate", "index$": 3 }, "secret": { "a": true, "h": "Secret", "n": "secret", "r": false, "t": "`$STRING`", "key$": "secret", "index$": 4 }, "subscriberUrl": { "a": true, "h": "Subscriber Url", "n": "subscriberUrl", "op": { "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "subscriberUrl", "index$": 5 }, "triggers": { "a": true, "h": "Triggers", "n": "triggers", "op": { "update": { "req": false, "type": "`$ARRAY`" } }, "r": true, "t": "`$ARRAY`", "key$": "triggers", "index$": 6 }, "version": { "a": true, "h": "Version", "n": "version", "r": false, "sh": "The version of the webhook", "t": "`$STRING`", "key$": "version", "index$": 7 } }, "id": { "field": "id", "name": "id" }, "name": "event_type_webhook", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/event-types/{eventTypeId}/webhooks", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "event_type_id", "or": "eventTypeId", "r": true, "t": "`$NUMBER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v2/event-types/{eventTypeId}/webhooks", "q": { "exist": ["authorization", "event_type_id"] }, "r": { "param": { "eventTypeId": "event_type_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "event-types" }, { "var": "event_type_id" }, { "lit": "webhooks" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/event-types/{eventTypeId}/webhooks", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "event_type_id", "or": "eventTypeId", "r": true, "t": "`$NUMBER`", "index$": 0 }], "query": [{ "a": true, "ex": 0, "k": "query", "n": "skip", "or": "skip", "r": false, "t": "`$NUMBER`", "index$": 0 }, { "a": true, "ex": 25, "k": "query", "n": "take", "or": "take", "r": false, "t": "`$NUMBER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/event-types/{eventTypeId}/webhooks", "q": { "exist": ["authorization", "event_type_id"] }, "r": { "param": { "eventTypeId": "event_type_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "event-types" }, { "var": "event_type_id" }, { "lit": "webhooks" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/event-types/{eventTypeId}/webhooks/{webhookId}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "event_type_id", "or": "eventTypeId", "r": true, "t": "`$NUMBER`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "webhookId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/event-types/{eventTypeId}/webhooks/{webhookId}", "q": { "exist": ["authorization", "event_type_id", "id"] }, "r": { "param": { "eventTypeId": "event_type_id", "webhookId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "event-types" }, { "var": "event_type_id" }, { "lit": "webhooks" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v2/event-types/{eventTypeId}/webhooks/{webhookId}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "event_type_id", "or": "eventTypeId", "r": true, "t": "`$NUMBER`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "webhookId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/v2/event-types/{eventTypeId}/webhooks/{webhookId}", "q": { "exist": ["authorization", "event_type_id", "id"] }, "r": { "param": { "eventTypeId": "event_type_id", "webhookId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "event-types" }, { "var": "event_type_id" }, { "lit": "webhooks" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "a": true, "co": { "id": "DELETE /v2/event-types/{eventTypeId}/webhooks", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "event_type_id", "or": "eventTypeId", "r": true, "t": "`$NUMBER`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v2/event-types/{eventTypeId}/webhooks", "q": { "exist": ["authorization", "event_type_id"] }, "r": { "param": { "eventTypeId": "event_type_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "event-types" }, { "var": "event_type_id" }, { "lit": "webhooks" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 1 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PATCH /v2/event-types/{eventTypeId}/webhooks/{webhookId}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "event_type_id", "or": "eventTypeId", "r": true, "t": "`$NUMBER`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "webhookId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PATCH", "o": "/v2/event-types/{eventTypeId}/webhooks/{webhookId}", "q": { "exist": ["authorization", "event_type_id", "id"] }, "r": { "param": { "eventTypeId": "event_type_id", "webhookId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "event-types" }, { "var": "event_type_id" }, { "lit": "webhooks" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.event_type"]] }, "key$": "event_type_webhook", "name__orig": "event_type_webhook", "Name": "EventTypeWebhook", "name_": "event_type_webhook", "name-": "event-type-webhook", "NAME": "EVENT_TYPE_WEBHOOK", "index$": 8 }, { "active": true, "entity": "event_type_webhook", "key$": "BasicEventTypeWebhookFlow", "kind": "basic", "name": "BasicEventTypeWebhookFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "event_type_webhook_ref01" }, "m": { "event_type_id": "event_type01" }, "o": "create", "s": [], "v": [] }, { "a": true, "d": {}, "i": {}, "m": { "event_type_id": "event_type01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "event_type_webhook_ref01" } }] }, { "a": true, "d": { "event_type_id": "event_type01" }, "i": { "ref": "event_type_webhook_ref01", "srcdatavar": "event_type_webhook_ref01_data", "suffix": "_up0", "textfield": "payloadTemplate" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-event_type_webhook_ref01" } }], "v": [] }, { "a": true, "d": {}, "i": { "ref": "event_type_webhook_ref01", "srcdatavar": "event_type_webhook_ref01_data", "suffix": "_dt0" }, "m": { "event_type_id": "event_type01", "id": "event_type_webhook01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-event_type_webhook_ref01" } }] }, { "a": true, "d": {}, "i": { "ref": "event_type_webhook_ref01", "suffix": "_rm0" }, "m": { "id": "event_type_webhook01" }, "o": "remove", "s": [], "v": [] }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "event_type_id": "event_type01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "event_type_webhook_ref01" } }] }] }, 'EventTypeWebhook', { "POST /v2/event-types/{eventTypeId}/webhooks": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "payloadTemplate": { "type": "string", "description": "The template of the payload that will be sent to the subscriberUrl, check cal.com/docs/core-features/webhooks for more information", "example": "{\"content\":\"A new event has been scheduled\",\"type\":\"{{type}}\",\"name\":\"{{title}}\",\"organizer\":\"{{organizer.name}}\",\"booker\":\"{{attendees.0.name}}\"}", "key$": "payloadTemplate" }, "active": { "type": "boolean", "key$": "active" }, "subscriberUrl": { "type": "string", "key$": "subscriberUrl" }, "triggers": { "type": "array", "example": ["BOOKING_CREATED", "BOOKING_RESCHEDULED", "BOOKING_CANCELLED", "BOOKING_CONFIRMED", "BOOKING_REJECTED", "BOOKING_COMPLETED", "BOOKING_NO_SHOW", "BOOKING_REOPENED"], "items": { "type": "string", "enum": ["BOOKING_CREATED", "BOOKING_PAYMENT_INITIATED", "BOOKING_PAID", "BOOKING_RESCHEDULED", "BOOKING_REQUESTED", "BOOKING_CANCELLED", "BOOKING_REJECTED", "BOOKING_NO_SHOW_UPDATED", "FORM_SUBMITTED", "MEETING_ENDED", "MEETING_STARTED", "RECORDING_READY", "INSTANT_MEETING", "RECORDING_TRANSCRIPTION_GENERATED", "OOO_CREATED", "AFTER_HOSTS_CAL_VIDEO_NO_SHOW", "AFTER_GUESTS_CAL_VIDEO_NO_SHOW", "FORM_SUBMITTED_NO_EVENT", "DELEGATION_CREDENTIAL_ERROR", "WRONG_ASSIGNMENT_REPORT"] }, "key$": "triggers" }, "secret": { "type": "string", "key$": "secret" }, "version": { "type": "string", "description": "The version of the webhook", "example": "2021-10-20", "enum": ["2021-10-20"], "key$": "version" } }, "required": ["active", "subscriberUrl", "triggers"], "x-ref": "#/components/schemas/CreateWebhookInputDto", "index$": 1 } } } }, "parameters": [{ "name": "Authorization", "in": "header", "description": "value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "eventTypeId", "required": true, "in": "path", "schema": { "type": "number" }, "index$": 1 }] }, "GET /v2/event-types/{eventTypeId}/webhooks": { "protocol": "http", "parameters": [{ "name": "Authorization", "in": "header", "description": "value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "eventTypeId", "required": true, "in": "path", "schema": { "type": "number" }, "index$": 1 }, { "name": "take", "required": false, "in": "query", "description": "Maximum number of items to return", "schema": { "minimum": 1, "maximum": 250, "default": 250, "example": 25, "type": "number" }, "index$": 2 }, { "name": "skip", "required": false, "in": "query", "description": "Number of items to skip", "schema": { "minimum": 0, "default": 0, "example": 0, "type": "number" }, "index$": 3 }] }, "GET /v2/event-types/{eventTypeId}/webhooks/{webhookId}": { "protocol": "http", "parameters": [{ "name": "Authorization", "in": "header", "description": "value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "webhookId", "required": true, "in": "path", "schema": { "type": "string" }, "index$": 1 }, { "name": "eventTypeId", "required": true, "in": "path", "schema": { "type": "number" }, "index$": 2 }] }, "DELETE /v2/event-types/{eventTypeId}/webhooks/{webhookId}": { "protocol": "http", "parameters": [{ "name": "Authorization", "in": "header", "description": "value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "webhookId", "required": true, "in": "path", "schema": { "type": "string" }, "index$": 1 }, { "name": "eventTypeId", "required": true, "in": "path", "schema": { "type": "number" }, "index$": 2 }] }, "DELETE /v2/event-types/{eventTypeId}/webhooks": { "protocol": "http", "parameters": [{ "name": "Authorization", "in": "header", "description": "value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "eventTypeId", "required": true, "in": "path", "schema": { "type": "number" }, "index$": 1 }] }, "PATCH /v2/event-types/{eventTypeId}/webhooks/{webhookId}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "payloadTemplate": { "type": "string", "description": "The template of the payload that will be sent to the subscriberUrl, check cal.com/docs/core-features/webhooks for more information", "example": "{\"content\":\"A new event has been scheduled\",\"type\":\"{{type}}\",\"name\":\"{{title}}\",\"organizer\":\"{{organizer.name}}\",\"booker\":\"{{attendees.0.name}}\"}", "key$": "payloadTemplate" }, "active": { "type": "boolean", "key$": "active" }, "subscriberUrl": { "type": "string", "key$": "subscriberUrl" }, "triggers": { "type": "array", "example": ["BOOKING_CREATED", "BOOKING_RESCHEDULED", "BOOKING_CANCELLED", "BOOKING_CONFIRMED", "BOOKING_REJECTED", "BOOKING_COMPLETED", "BOOKING_NO_SHOW", "BOOKING_REOPENED"], "items": { "type": "string", "enum": ["BOOKING_CREATED", "BOOKING_PAYMENT_INITIATED", "BOOKING_PAID", "BOOKING_RESCHEDULED", "BOOKING_REQUESTED", "BOOKING_CANCELLED", "BOOKING_REJECTED", "BOOKING_NO_SHOW_UPDATED", "FORM_SUBMITTED", "MEETING_ENDED", "MEETING_STARTED", "RECORDING_READY", "INSTANT_MEETING", "RECORDING_TRANSCRIPTION_GENERATED", "OOO_CREATED", "AFTER_HOSTS_CAL_VIDEO_NO_SHOW", "AFTER_GUESTS_CAL_VIDEO_NO_SHOW", "FORM_SUBMITTED_NO_EVENT", "DELEGATION_CREDENTIAL_ERROR", "WRONG_ASSIGNMENT_REPORT"] }, "key$": "triggers" }, "secret": { "type": "string", "key$": "secret" }, "version": { "type": "string", "description": "The version of the webhook", "example": "2021-10-20", "enum": ["2021-10-20"], "key$": "version" } }, "x-ref": "#/components/schemas/UpdateWebhookInputDto", "index$": 1 } } } }, "parameters": [{ "name": "Authorization", "in": "header", "description": "value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "webhookId", "required": true, "in": "path", "schema": { "type": "string" }, "index$": 1 }, { "name": "eventTypeId", "required": true, "in": "path", "schema": { "type": "number" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const event_type_webhook_ref01_ent = client.EventTypeWebhook();
        let event_type_webhook_ref01_data = setup.data.new.event_type_webhook['event_type_webhook_ref01'];
        event_type_webhook_ref01_data['event_type_id'] = setup.idmap['event_type01'];
        event_type_webhook_ref01_data = (await event_type_webhook_ref01_ent.create(event_type_webhook_ref01_data)).data();
        (0, node_assert_1.default)(null != event_type_webhook_ref01_data.id);
        // LIST
        const event_type_webhook_ref01_match = {};
        event_type_webhook_ref01_match['event_type_id'] = setup.idmap['event_type01'];
        const event_type_webhook_ref01_list = (await event_type_webhook_ref01_ent.list(event_type_webhook_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(event_type_webhook_ref01_list, { id: event_type_webhook_ref01_data.id })));
        // UPDATE
        const event_type_webhook_ref01_data_up0 = {};
        event_type_webhook_ref01_data_up0.id = event_type_webhook_ref01_data.id;
        event_type_webhook_ref01_data_up0['event_type_id'] = setup.idmap['event_type_id'];
        const event_type_webhook_ref01_markdef_up0 = { name: 'payloadTemplate', value: 'Mark01-event_type_webhook_ref01_' + setup.now };
        event_type_webhook_ref01_data_up0[event_type_webhook_ref01_markdef_up0.name] = event_type_webhook_ref01_markdef_up0.value;
        const event_type_webhook_ref01_resdata_up0 = (await event_type_webhook_ref01_ent.update(event_type_webhook_ref01_data_up0)).data();
        (0, node_assert_1.default)(event_type_webhook_ref01_resdata_up0.id === event_type_webhook_ref01_data_up0.id);
        (0, node_assert_1.default)(event_type_webhook_ref01_resdata_up0[event_type_webhook_ref01_markdef_up0.name] === event_type_webhook_ref01_markdef_up0.value);
        // LOAD
        const event_type_webhook_ref01_match_dt0 = {};
        event_type_webhook_ref01_match_dt0.id = event_type_webhook_ref01_data.id;
        const event_type_webhook_ref01_data_dt0 = (await event_type_webhook_ref01_ent.load(event_type_webhook_ref01_match_dt0)).data();
        (0, node_assert_1.default)(event_type_webhook_ref01_data_dt0.id === event_type_webhook_ref01_data.id);
        // REMOVE
        const event_type_webhook_ref01_match_rm0 = { id: event_type_webhook_ref01_data.id };
        await event_type_webhook_ref01_ent.remove(event_type_webhook_ref01_match_rm0);
        // LIST
        const event_type_webhook_ref01_match_rt0 = {};
        event_type_webhook_ref01_match_rt0['event_type_id'] = setup.idmap['event_type01'];
        const event_type_webhook_ref01_list_rt0 = (await event_type_webhook_ref01_ent.list(event_type_webhook_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(event_type_webhook_ref01_list_rt0, { id: event_type_webhook_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/event_type_webhook/EventTypeWebhookTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['event_type_webhook01', 'event_type_webhook02', 'event_type_webhook03', 'event_type01', 'event_type02', 'event_type03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CAL_TEST_EVENT_TYPE_WEBHOOK_ENTID': idmap,
        'CAL_TEST_LIVE': 'FALSE',
        'CAL_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['CAL_TEST_EVENT_TYPE_WEBHOOK_ENTID'];
    const live = 'TRUE' === env.CAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CAL_TEST_EVENT_TYPE_WEBHOOK_ENTID'];
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
//# sourceMappingURL=EventTypeWebhookEntity.test.js.map