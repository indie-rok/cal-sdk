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
(0, node_test_1.describe)('SelectedCalendarEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CalSDK.test();
        const ent = testsdk.SelectedCalendar();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.CalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.SelectedCalendar().create({ "credentialId": "x", "externalId": "x", "integration": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CAL_TEST_LIVE;
        for (const op of ['create', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'selected_calendar.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "credentialId": { "a": true, "h": "Credential Id", "n": "credentialId", "r": true, "t": "`$NUMBER`", "key$": "credentialId", "index$": 0 }, "delegationCredentialId": { "a": true, "h": "Delegation Credential Id", "n": "delegationCredentialId", "r": false, "t": "`$STRING`", "key$": "delegationCredentialId", "index$": 1 }, "externalId": { "a": true, "h": "External Id", "n": "externalId", "r": true, "t": "`$STRING`", "key$": "externalId", "index$": 2 }, "integration": { "a": true, "h": "Integration", "n": "integration", "r": true, "t": "`$STRING`", "key$": "integration", "index$": 3 } }, "name": "selected_calendar", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/selected-calendars", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v2/selected-calendars", "q": { "exist": ["authorization"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "selected-calendars" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "create" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v2/selected-calendars", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "credential_id", "or": "credentialId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "delegation_credential_id", "or": "delegationCredentialId", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "external_id", "or": "externalId", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "query", "n": "integration", "or": "integration", "r": true, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "DELETE", "o": "/v2/selected-calendars", "q": { "exist": ["authorization", "credential_id", "external_id", "integration"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "selected-calendars" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "selected_calendar", "name__orig": "selected_calendar", "Name": "SelectedCalendar", "name_": "selected_calendar", "name-": "selected-calendar", "NAME": "SELECTED_CALENDAR", "index$": 16 }, { "active": true, "entity": "selected_calendar", "key$": "BasicSelectedCalendarFlow", "kind": "basic", "name": "BasicSelectedCalendarFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "selected_calendar_ref01" }, "m": {}, "o": "create", "s": [], "v": [] }, { "a": true, "d": {}, "i": { "ref": "selected_calendar_ref01", "suffix": "_rm0" }, "m": {}, "o": "remove", "s": [], "v": [] }] }, 'SelectedCalendar', { "POST /v2/selected-calendars": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "integration": { "type": "string", "key$": "integration" }, "externalId": { "type": "string", "key$": "externalId" }, "credentialId": { "type": "number", "key$": "credentialId" }, "delegationCredentialId": { "type": "string", "key$": "delegationCredentialId" } }, "required": ["integration", "externalId", "credentialId"], "x-ref": "#/components/schemas/SelectedCalendarsInputDto", "index$": 1 } } } }, "parameters": [{ "name": "Authorization", "in": "header", "description": "value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "DELETE /v2/selected-calendars": { "protocol": "http", "parameters": [{ "name": "Authorization", "in": "header", "description": "value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "integration", "required": true, "in": "query", "schema": { "type": "string" }, "index$": 1 }, { "name": "externalId", "required": true, "in": "query", "schema": { "type": "string" }, "index$": 2 }, { "name": "credentialId", "required": true, "in": "query", "schema": { "type": "string" }, "index$": 3 }, { "name": "delegationCredentialId", "required": false, "in": "query", "schema": { "type": "string" }, "index$": 4 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const selected_calendar_ref01_ent = client.SelectedCalendar();
        let selected_calendar_ref01_data = setup.data.new.selected_calendar['selected_calendar_ref01'];
        selected_calendar_ref01_data = (await selected_calendar_ref01_ent.create(selected_calendar_ref01_data)).data();
        (0, node_assert_1.default)(null != selected_calendar_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/selected_calendar/SelectedCalendarTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['selected_calendar01', 'selected_calendar02', 'selected_calendar03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CAL_TEST_SELECTED_CALENDAR_ENTID': idmap,
        'CAL_TEST_LIVE': 'FALSE',
        'CAL_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['CAL_TEST_SELECTED_CALENDAR_ENTID'];
    const live = 'TRUE' === env.CAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CAL_TEST_SELECTED_CALENDAR_ENTID'];
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
//# sourceMappingURL=SelectedCalendarEntity.test.js.map