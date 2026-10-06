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
(0, node_test_1.describe)('AttendeeEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CalSDK.test();
        const ent = testsdk.Attendee();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.CalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Attendee().list({ "booking_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CAL_TEST_LIVE;
        for (const op of ['create', 'list', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'attendee.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "absent": { "a": true, "h": "Absent", "n": "absent", "r": true, "t": "`$BOOLEAN`", "key$": "absent", "index$": 0 }, "displayEmail": { "a": true, "h": "Display Email", "n": "displayEmail", "r": true, "sh": "Clean email for display purposes", "t": "`$STRING`", "key$": "displayEmail", "index$": 1 }, "email": { "a": true, "h": "Email", "n": "email", "r": true, "sh": "The email of the attendee.", "t": "`$STRING`", "key$": "email", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$NUMBER`", "key$": "id", "index$": 3 }, "language": { "a": true, "h": "Language", "n": "language", "r": false, "sh": "The preferred language of the attendee.", "t": "`$STRING`", "key$": "language", "index$": 4 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "The name of the attendee.", "t": "`$STRING`", "key$": "name", "index$": 5 }, "phoneNumber": { "a": true, "h": "Phone Number", "n": "phoneNumber", "r": false, "sh": "The phone number of the attendee in international format.", "t": "`$STRING`", "key$": "phoneNumber", "index$": 6 }, "timeZone": { "a": true, "h": "Time Zone", "n": "timeZone", "r": true, "sh": "The time zone of the attendee.", "t": "`$STRING`", "key$": "timeZone", "index$": 7 } }, "id": { "field": "id", "name": "id" }, "name": "attendee", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/bookings/{bookingUid}/attendees", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "header", "n": "cal_api_version", "or": "cal-api-version", "r": true, "t": "`$STRING`", "index$": 1 }], "params": [{ "a": true, "k": "param", "n": "booking_id", "or": "bookingUid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v2/bookings/{bookingUid}/attendees", "q": { "exist": ["authorization", "booking_id", "cal_api_version"] }, "r": { "param": { "bookingUid": "booking_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "bookings" }, { "var": "booking_id" }, { "lit": "attendees" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/bookings/{bookingUid}/attendees", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "header", "n": "cal_api_version", "or": "cal-api-version", "r": true, "t": "`$STRING`", "index$": 1 }], "params": [{ "a": true, "k": "param", "n": "booking_id", "or": "bookingUid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/bookings/{bookingUid}/attendees", "q": { "exist": ["authorization", "booking_id", "cal_api_version"] }, "r": { "param": { "bookingUid": "booking_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "bookings" }, { "var": "booking_id" }, { "lit": "attendees" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/bookings/{bookingUid}/attendees/{attendeeId}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "header", "n": "cal_api_version", "or": "cal-api-version", "r": true, "t": "`$STRING`", "index$": 1 }], "params": [{ "a": true, "k": "param", "n": "booking_id", "or": "bookingUid", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "attendeeId", "r": true, "t": "`$NUMBER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/bookings/{bookingUid}/attendees/{attendeeId}", "q": { "exist": ["authorization", "booking_id", "cal_api_version", "id"] }, "r": { "param": { "attendeeId": "id", "bookingUid": "booking_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "bookings" }, { "var": "booking_id" }, { "lit": "attendees" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v2/bookings/{bookingUid}/attendees/{attendeeId}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "header", "n": "cal_api_version", "or": "cal-api-version", "r": true, "t": "`$STRING`", "index$": 1 }], "params": [{ "a": true, "k": "param", "n": "booking_id", "or": "bookingUid", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "attendeeId", "r": true, "t": "`$NUMBER`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/v2/bookings/{bookingUid}/attendees/{attendeeId}", "q": { "exist": ["authorization", "booking_id", "cal_api_version", "id"] }, "r": { "param": { "attendeeId": "id", "bookingUid": "booking_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "bookings" }, { "var": "booking_id" }, { "lit": "attendees" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [["$.main.kit.entity.booking"]] }, "key$": "attendee", "name__orig": "attendee", "Name": "Attendee", "name_": "attendee", "name-": "attendee", "NAME": "ATTENDEE", "index$": 1 }, { "active": true, "entity": "attendee", "key$": "BasicAttendeeFlow", "kind": "basic", "name": "BasicAttendeeFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "attendee_ref01" }, "m": { "booking_id": "booking01" }, "o": "create", "s": [], "v": [] }, { "a": true, "d": {}, "i": {}, "m": { "booking_id": "booking01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "attendee_ref01" } }] }, { "a": true, "d": {}, "i": { "ref": "attendee_ref01", "srcdatavar": "attendee_ref01_data", "suffix": "_dt0" }, "m": { "booking_id": "booking01", "id": "attendee01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-attendee_ref01" } }] }, { "a": true, "d": {}, "i": { "ref": "attendee_ref01", "suffix": "_rm0" }, "m": { "booking_id": "booking01", "id": "attendee01" }, "o": "remove", "s": [], "v": [] }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "booking_id": "booking01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "attendee_ref01" } }] }] }, 'Attendee', { "POST /v2/bookings/{bookingUid}/attendees": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "name": { "type": "string", "description": "The name of the attendee.", "example": "John Doe", "key$": "name" }, "timeZone": { "type": "string", "description": "The time zone of the attendee.", "example": "America/New_York", "key$": "timeZone" }, "phoneNumber": { "type": "string", "description": "The phone number of the attendee in international format.", "example": "+919876543210", "key$": "phoneNumber" }, "language": { "type": "string", "enum": ["ar", "ca", "de", "es", "eu", "he", "id", "ja", "lv", "pl", "ro", "sr", "th", "vi", "az", "cs", "el", "es-419", "fi", "hr", "it", "km", "nl", "pt", "ru", "sv", "tr", "zh-CN", "bg", "da", "en", "et", "fr", "hu", "iw", "ko", "no", "pt-BR", "sk", "ta", "uk", "zh-TW", "bn"], "description": "The preferred language of the attendee. Used for booking confirmation.", "example": "it", "default": "en", "key$": "language" }, "email": { "type": "string", "description": "The email of the attendee.", "example": "john.doe@example.com", "key$": "email" } }, "required": ["name", "timeZone", "email"], "x-ref": "#/components/schemas/AddAttendeeInput_2024_08_13", "index$": 1 } } } }, "parameters": [{ "name": "cal-api-version", "in": "header", "description": "Must be set to 2024-08-13. This header is required as this endpoint does not exist in older API versions.", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "bookingUid", "required": true, "in": "path", "schema": { "type": "string" }, "index$": 1 }, { "name": "Authorization", "in": "header", "description": "value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "GET /v2/bookings/{bookingUid}/attendees": { "protocol": "http", "parameters": [{ "name": "cal-api-version", "in": "header", "description": "Must be set to 2024-08-13. This header is required as this endpoint does not exist in older API versions.", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "bookingUid", "required": true, "in": "path", "schema": { "type": "string" }, "index$": 1 }, { "name": "Authorization", "in": "header", "description": "value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "GET /v2/bookings/{bookingUid}/attendees/{attendeeId}": { "protocol": "http", "parameters": [{ "name": "cal-api-version", "in": "header", "description": "Must be set to 2024-08-13. This header is required as this endpoint does not exist in older API versions.", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "bookingUid", "required": true, "in": "path", "schema": { "type": "string" }, "index$": 1 }, { "name": "attendeeId", "required": true, "in": "path", "schema": { "type": "number" }, "index$": 2 }, { "name": "Authorization", "in": "header", "description": "value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token", "required": true, "schema": { "type": "string" }, "index$": 3 }] }, "DELETE /v2/bookings/{bookingUid}/attendees/{attendeeId}": { "protocol": "http", "parameters": [{ "name": "cal-api-version", "in": "header", "description": "Must be set to 2024-08-13. This header is required as this endpoint does not exist in older API versions.", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "bookingUid", "required": true, "in": "path", "schema": { "type": "string" }, "index$": 1 }, { "name": "attendeeId", "required": true, "in": "path", "schema": { "type": "number" }, "index$": 2 }, { "name": "Authorization", "in": "header", "description": "value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token", "required": true, "schema": { "type": "string" }, "index$": 3 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const attendee_ref01_ent = client.Attendee();
        let attendee_ref01_data = setup.data.new.attendee['attendee_ref01'];
        attendee_ref01_data['booking_id'] = setup.idmap['booking01'];
        attendee_ref01_data = (await attendee_ref01_ent.create(attendee_ref01_data)).data();
        (0, node_assert_1.default)(null != attendee_ref01_data.id);
        // LIST
        const attendee_ref01_match = {};
        attendee_ref01_match['booking_id'] = setup.idmap['booking01'];
        const attendee_ref01_list = (await attendee_ref01_ent.list(attendee_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(attendee_ref01_list, { id: attendee_ref01_data.id })));
        // LOAD
        const attendee_ref01_match_dt0 = {};
        attendee_ref01_match_dt0.id = attendee_ref01_data.id;
        const attendee_ref01_data_dt0 = (await attendee_ref01_ent.load(attendee_ref01_match_dt0)).data();
        (0, node_assert_1.default)(attendee_ref01_data_dt0.id === attendee_ref01_data.id);
        // REMOVE
        const attendee_ref01_match_rm0 = { id: attendee_ref01_data.id };
        await attendee_ref01_ent.remove(attendee_ref01_match_rm0);
        // LIST
        const attendee_ref01_match_rt0 = {};
        attendee_ref01_match_rt0['booking_id'] = setup.idmap['booking01'];
        const attendee_ref01_list_rt0 = (await attendee_ref01_ent.list(attendee_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(attendee_ref01_list_rt0, { id: attendee_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/attendee/AttendeeTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['attendee01', 'attendee02', 'attendee03', 'booking01', 'booking02', 'booking03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CAL_TEST_ATTENDEE_ENTID': idmap,
        'CAL_TEST_LIVE': 'FALSE',
        'CAL_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['CAL_TEST_ATTENDEE_ENTID'];
    const live = 'TRUE' === env.CAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CAL_TEST_ATTENDEE_ENTID'];
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
//# sourceMappingURL=AttendeeEntity.test.js.map