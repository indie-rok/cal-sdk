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
(0, node_test_1.describe)('ScheduleEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CalSDK.test();
        const ent = testsdk.Schedule();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('schedule hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.CalSDK.test(offline).Schedule().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.CalSDK.test(offline).Schedule()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.CalSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Schedule().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.CalSDK.test().Schedule().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.CalSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Schedule().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Schedule().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.CalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Schedule().list({ "id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CAL_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'schedule.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "availability": { "a": true, "h": "Availability", "n": "availability", "op": { "list": { "req": true, "type": "`$ARRAY`" } }, "r": false, "sh": "Each object contains days and times when the user is available.", "t": "`$ARRAY`", "key$": "availability", "index$": 0 }, "data": { "a": true, "h": "Data", "n": "data", "r": true, "t": "`$ANY`", "key$": "data", "index$": 1 }, "error": { "a": true, "h": "Error", "n": "error", "r": false, "t": "`$OBJECT`", "key$": "error", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$NUMBER`", "key$": "id", "index$": 3 }, "isDefault": { "a": true, "h": "Is Default", "n": "isDefault", "op": { "update": { "req": false, "type": "`$BOOLEAN`" } }, "r": true, "sh": "Each user should have 1 default schedule.", "t": "`$BOOLEAN`", "key$": "isDefault", "index$": 4 }, "name": { "a": true, "h": "Name", "n": "name", "op": { "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "name", "index$": 5 }, "overrides": { "a": true, "h": "Overrides", "n": "overrides", "op": { "list": { "req": true, "type": "`$ARRAY`" } }, "r": false, "sh": "Need to change availability for a specific date?", "t": "`$ARRAY`", "key$": "overrides", "index$": 6 }, "ownerId": { "a": true, "h": "Owner Id", "n": "ownerId", "r": true, "t": "`$NUMBER`", "key$": "ownerId", "index$": 7 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 8 }, "timeZone": { "a": true, "h": "Time Zone", "n": "timeZone", "op": { "update": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "Timezone is used to calculate available times when an event using the schedule is booked.", "t": "`$STRING`", "key$": "timeZone", "index$": 9 } }, "id": { "field": "id", "name": "id" }, "name": "schedule", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/schedules", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "2024-06-11", "k": "header", "n": "cal_api_version", "or": "cal-api-version", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/v2/schedules", "q": { "exist": ["authorization", "cal_api_version"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "schedules" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/schedules", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "2024-06-11", "k": "header", "n": "cal_api_version", "or": "cal-api-version", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/schedules", "q": { "exist": ["authorization", "cal_api_version"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "schedules" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/schedules/{scheduleId}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "2024-06-11", "k": "header", "n": "cal_api_version", "or": "cal-api-version", "r": true, "t": "`$STRING`", "index$": 1 }], "params": [{ "a": true, "k": "param", "n": "id", "or": "scheduleId", "r": true, "t": "`$NUMBER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/schedules/{scheduleId}", "q": { "exist": ["authorization", "cal_api_version", "id"] }, "r": { "param": { "scheduleId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "schedules" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v2/schedules/default", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "2024-06-11", "k": "header", "n": "cal_api_version", "or": "cal-api-version", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/schedules/default", "q": { "$action": "default", "exist": ["authorization", "cal_api_version"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "schedules" }, { "lit": "default" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 1 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v2/schedules/{scheduleId}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "2024-06-11", "k": "header", "n": "cal_api_version", "or": "cal-api-version", "r": true, "t": "`$STRING`", "index$": 1 }], "params": [{ "a": true, "k": "param", "n": "id", "or": "scheduleId", "r": true, "t": "`$NUMBER`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v2/schedules/{scheduleId}", "q": { "exist": ["authorization", "cal_api_version", "id"] }, "r": { "param": { "scheduleId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "schedules" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PATCH /v2/schedules/{scheduleId}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "2024-06-11", "k": "header", "n": "cal_api_version", "or": "cal-api-version", "r": true, "t": "`$STRING`", "index$": 1 }], "params": [{ "a": true, "k": "param", "n": "id", "or": "scheduleId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/v2/schedules/{scheduleId}", "q": { "exist": ["authorization", "cal_api_version", "id"] }, "r": { "param": { "scheduleId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "schedules" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "schedule", "name__orig": "schedule", "Name": "Schedule", "name_": "schedule", "name-": "schedule", "NAME": "SCHEDULE", "index$": 15 }, { "active": true, "entity": "schedule", "key$": "BasicScheduleFlow", "kind": "basic", "name": "BasicScheduleFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "schedule_ref01" }, "m": {}, "o": "create", "s": [], "v": [] }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "schedule_ref01" } }] }, { "a": true, "d": {}, "i": { "ref": "schedule_ref01", "srcdatavar": "schedule_ref01_data", "suffix": "_up0", "textfield": "name" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-schedule_ref01" } }], "v": [] }, { "a": true, "d": {}, "i": { "ref": "schedule_ref01", "srcdatavar": "schedule_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-schedule_ref01" } }] }, { "a": true, "d": {}, "i": { "ref": "schedule_ref01", "suffix": "_rm0" }, "m": { "id": "schedule01" }, "o": "remove", "s": [], "v": [] }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "schedule_ref01" } }] }] }, 'Schedule', { "POST /v2/schedules": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "name": { "type": "string", "example": "Catch up hours", "key$": "name" }, "timeZone": { "type": "string", "example": "Europe/Rome", "description": "Timezone is used to calculate available times when an event using the schedule is booked.", "key$": "timeZone" }, "availability": { "description": "Each object contains days and times when the user is available. If not passed, the default availability is Monday to Friday from 09:00 to 17:00.", "example": [{ "days": ["Monday", "Tuesday"], "startTime": "17:00", "endTime": "19:00" }, { "days": ["Wednesday", "Thursday"], "startTime": "16:00", "endTime": "20:00" }], "type": "array", "items": { "type": "object", "properties": { "days": { "description": "Array of days when schedule is active.", "example": [], "items": {}, "type": "array" }, "startTime": { "description": "startTime must be a valid time in format HH:MM e.g. 08:00", "example": "08:00", "type": "string" }, "endTime": { "description": "endTime must be a valid time in format HH:MM e.g. 15:00", "example": "15:00", "type": "string" } }, "required": ["days", "startTime", "endTime"], "x-ref": "#/components/schemas/ScheduleAvailabilityInput_2024_06_11" }, "key$": "availability" }, "isDefault": { "type": "boolean", "example": true, "description": "Each user should have 1 default schedule. If you specified `timeZone` when creating managed user, then the default schedule will be created with that timezone.\n    Default schedule means that if an event type is not tied to a specific schedule then the default schedule is used.", "key$": "isDefault" }, "overrides": { "description": "Need to change availability for a specific date? Add an override.", "example": [{ "date": "2024-05-20", "startTime": "18:00", "endTime": "21:00" }], "type": "array", "items": { "type": "object", "properties": { "date": { "example": "2024-05-20", "type": "string" }, "startTime": { "description": "startTime must be a valid time in format HH:MM e.g. 12:00", "example": "12:00", "type": "string" }, "endTime": { "description": "endTime must be a valid time in format HH:MM e.g. 13:00", "example": "13:00", "type": "string" } }, "required": ["date", "startTime", "endTime"], "x-ref": "#/components/schemas/ScheduleOverrideInput_2024_06_11" }, "key$": "overrides" } }, "required": ["name", "timeZone", "isDefault"], "x-ref": "#/components/schemas/CreateScheduleInput_2024_06_11", "index$": 1 } } } }, "parameters": [{ "name": "Authorization", "in": "header", "description": "value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "cal-api-version", "in": "header", "description": "Must be set to 2024-06-11. If not set to this value, the endpoint will default to an older version.", "required": true, "schema": { "type": "string", "default": "2024-06-11" }, "index$": 1 }] }, "GET /v2/schedules": { "protocol": "http", "parameters": [{ "name": "Authorization", "in": "header", "description": "value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "cal-api-version", "in": "header", "description": "Must be set to 2024-06-11. If not set to this value, the endpoint will default to an older version.", "required": true, "schema": { "type": "string", "default": "2024-06-11" }, "index$": 1 }] }, "GET /v2/schedules/{scheduleId}": { "protocol": "http", "parameters": [{ "name": "Authorization", "in": "header", "description": "value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "cal-api-version", "in": "header", "description": "Must be set to 2024-06-11. If not set to this value, the endpoint will default to an older version.", "required": true, "schema": { "type": "string", "default": "2024-06-11" }, "index$": 1 }, { "name": "scheduleId", "required": true, "in": "path", "schema": { "type": "number" }, "index$": 2 }] }, "GET /v2/schedules/default": { "protocol": "http", "parameters": [{ "name": "Authorization", "in": "header", "description": "value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "cal-api-version", "in": "header", "description": "Must be set to 2024-06-11. If not set to this value, the endpoint will default to an older version.", "required": true, "schema": { "type": "string", "default": "2024-06-11" }, "index$": 1 }] }, "DELETE /v2/schedules/{scheduleId}": { "protocol": "http", "parameters": [{ "name": "Authorization", "in": "header", "description": "value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "cal-api-version", "in": "header", "description": "Must be set to 2024-06-11. If not set to this value, the endpoint will default to an older version.", "required": true, "schema": { "type": "string", "default": "2024-06-11" }, "index$": 1 }, { "name": "scheduleId", "required": true, "in": "path", "schema": { "type": "number" }, "index$": 2 }] }, "PATCH /v2/schedules/{scheduleId}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "name": { "type": "string", "example": "One-on-one coaching", "key$": "name" }, "timeZone": { "type": "string", "example": "Europe/Rome", "key$": "timeZone" }, "availability": { "example": [{ "days": ["Monday", "Tuesday"], "startTime": "09:00", "endTime": "10:00" }], "type": "array", "items": { "type": "object", "properties": { "days": { "description": "Array of days when schedule is active.", "example": [], "items": {}, "type": "array" }, "startTime": { "description": "startTime must be a valid time in format HH:MM e.g. 08:00", "example": "08:00", "type": "string" }, "endTime": { "description": "endTime must be a valid time in format HH:MM e.g. 15:00", "example": "15:00", "type": "string" } }, "required": ["days", "startTime", "endTime"], "x-ref": "#/components/schemas/ScheduleAvailabilityInput_2024_06_11" }, "key$": "availability" }, "isDefault": { "type": "boolean", "example": true, "key$": "isDefault" }, "overrides": { "example": [{ "date": "2024-05-20", "startTime": "12:00", "endTime": "14:00" }], "type": "array", "items": { "type": "object", "properties": { "date": { "example": "2024-05-20", "type": "string" }, "startTime": { "description": "startTime must be a valid time in format HH:MM e.g. 12:00", "example": "12:00", "type": "string" }, "endTime": { "description": "endTime must be a valid time in format HH:MM e.g. 13:00", "example": "13:00", "type": "string" } }, "required": ["date", "startTime", "endTime"], "x-ref": "#/components/schemas/ScheduleOverrideInput_2024_06_11" }, "key$": "overrides" } }, "x-ref": "#/components/schemas/UpdateScheduleInput_2024_06_11", "index$": 1 } } } }, "parameters": [{ "name": "Authorization", "in": "header", "description": "value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "cal-api-version", "in": "header", "description": "Must be set to 2024-06-11. If not set to this value, the endpoint will default to an older version.", "required": true, "schema": { "type": "string", "default": "2024-06-11" }, "index$": 1 }, { "name": "scheduleId", "required": true, "in": "path", "schema": { "type": "string" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const schedule_ref01_ent = client.Schedule();
        let schedule_ref01_data = setup.data.new.schedule['schedule_ref01'];
        schedule_ref01_data = (await schedule_ref01_ent.create(schedule_ref01_data)).data();
        (0, node_assert_1.default)(null != schedule_ref01_data.id);
        // LIST
        const schedule_ref01_match = {};
        const schedule_ref01_list = (await schedule_ref01_ent.list(schedule_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(schedule_ref01_list, { id: schedule_ref01_data.id })));
        // UPDATE
        const schedule_ref01_data_up0 = {};
        schedule_ref01_data_up0.id = schedule_ref01_data.id;
        const schedule_ref01_markdef_up0 = { name: 'name', value: 'Mark01-schedule_ref01_' + setup.now };
        schedule_ref01_data_up0[schedule_ref01_markdef_up0.name] = schedule_ref01_markdef_up0.value;
        const schedule_ref01_resdata_up0 = (await schedule_ref01_ent.update(schedule_ref01_data_up0)).data();
        (0, node_assert_1.default)(schedule_ref01_resdata_up0.id === schedule_ref01_data_up0.id);
        (0, node_assert_1.default)(schedule_ref01_resdata_up0[schedule_ref01_markdef_up0.name] === schedule_ref01_markdef_up0.value);
        // LOAD
        const schedule_ref01_match_dt0 = {};
        schedule_ref01_match_dt0.id = schedule_ref01_data.id;
        const schedule_ref01_data_dt0 = (await schedule_ref01_ent.load(schedule_ref01_match_dt0)).data();
        (0, node_assert_1.default)(schedule_ref01_data_dt0.id === schedule_ref01_data.id);
        // REMOVE
        const schedule_ref01_match_rm0 = { id: schedule_ref01_data.id };
        await schedule_ref01_ent.remove(schedule_ref01_match_rm0);
        // LIST
        const schedule_ref01_match_rt0 = {};
        const schedule_ref01_list_rt0 = (await schedule_ref01_ent.list(schedule_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(schedule_ref01_list_rt0, { id: schedule_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/schedule/ScheduleTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['schedule01', 'schedule02', 'schedule03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CAL_TEST_SCHEDULE_ENTID': idmap,
        'CAL_TEST_LIVE': 'FALSE',
        'CAL_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['CAL_TEST_SCHEDULE_ENTID'];
    const live = 'TRUE' === env.CAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CAL_TEST_SCHEDULE_ENTID'];
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
//# sourceMappingURL=ScheduleEntity.test.js.map