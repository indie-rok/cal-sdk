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
(0, node_test_1.describe)('DestinationCalendarEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CalSDK.test();
        const ent = testsdk.DestinationCalendar();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.CalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.DestinationCalendar().update({ "credentialId": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CAL_TEST_LIVE;
        for (const op of ['update']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'destination_calendar.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "credentialId": { "a": true, "h": "Credential Id", "n": "credentialId", "r": true, "t": "`$NUMBER`", "key$": "credentialId", "index$": 0 }, "delegationCredentialId": { "a": true, "h": "Delegation Credential Id", "n": "delegationCredentialId", "r": false, "t": "`$STRING`", "key$": "delegationCredentialId", "index$": 1 }, "externalId": { "a": true, "h": "External Id", "n": "externalId", "r": true, "sh": "Unique identifier used to represent the specific calendar, as returned by the /calendars endpoint", "t": "`$STRING`", "key$": "externalId", "index$": 2 }, "integration": { "a": true, "h": "Integration", "n": "integration", "r": true, "sh": "The calendar service you want to integrate, as returned by the /calendars endpoint", "t": "`$STRING`", "key$": "integration", "index$": 3 }, "userId": { "a": true, "h": "User Id", "n": "userId", "r": true, "t": "`$NUMBER`", "key$": "userId", "index$": 4 } }, "name": "destination_calendar", "op": { "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /v2/destination-calendars", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/v2/destination-calendars", "q": { "exist": ["authorization"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "destination-calendars" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "destination_calendar", "name__orig": "destination_calendar", "Name": "DestinationCalendar", "name_": "destination_calendar", "name-": "destination-calendar", "NAME": "DESTINATION_CALENDAR", "index$": 6 }, { "active": true, "entity": "destination_calendar", "key$": "BasicDestinationCalendarFlow", "kind": "basic", "name": "BasicDestinationCalendarFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "destination_calendar_ref01", "srcdatavar": "destination_calendar_ref01_data", "suffix": "_up0", "textfield": "delegationCredentialId" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-destination_calendar_ref01" } }], "v": [] }] }, 'DestinationCalendar', { "PUT /v2/destination-calendars": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "integration": { "type": "string", "example": "apple_calendar", "description": "The calendar service you want to integrate, as returned by the /calendars endpoint", "enum": ["apple_calendar", "google_calendar", "office365_calendar"], "key$": "integration" }, "externalId": { "type": "string", "example": "https://caldav.icloud.com/26962146906/calendars/1644422A-1945-4438-BBC0-4F0Q23A57R7S/", "description": "Unique identifier used to represent the specific calendar, as returned by the /calendars endpoint", "key$": "externalId" }, "delegationCredentialId": { "type": "string", "key$": "delegationCredentialId" } }, "required": ["integration", "externalId"], "x-ref": "#/components/schemas/DestinationCalendarsInputBodyDto", "index$": 1 } } } }, "parameters": [{ "name": "Authorization", "in": "header", "description": "value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let destination_calendar_ref01_data = Object.values(setup.data.existing.destination_calendar)[0];
        // UPDATE
        const destination_calendar_ref01_ent = client.DestinationCalendar();
        const destination_calendar_ref01_data_up0 = {};
        const destination_calendar_ref01_markdef_up0 = { name: 'delegationCredentialId', value: 'Mark01-destination_calendar_ref01_' + setup.now };
        destination_calendar_ref01_data_up0[destination_calendar_ref01_markdef_up0.name] = destination_calendar_ref01_markdef_up0.value;
        const destination_calendar_ref01_resdata_up0 = (await destination_calendar_ref01_ent.update(destination_calendar_ref01_data_up0)).data();
        (0, node_assert_1.default)(null != destination_calendar_ref01_resdata_up0);
        (0, node_assert_1.default)(destination_calendar_ref01_resdata_up0[destination_calendar_ref01_markdef_up0.name] === destination_calendar_ref01_markdef_up0.value);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/destination_calendar/DestinationCalendarTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['destination_calendar01', 'destination_calendar02', 'destination_calendar03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CAL_TEST_DESTINATION_CALENDAR_ENTID': idmap,
        'CAL_TEST_LIVE': 'FALSE',
        'CAL_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['CAL_TEST_DESTINATION_CALENDAR_ENTID'];
    const live = 'TRUE' === env.CAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CAL_TEST_DESTINATION_CALENDAR_ENTID'];
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
//# sourceMappingURL=DestinationCalendarEntity.test.js.map