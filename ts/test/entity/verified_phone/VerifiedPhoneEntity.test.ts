

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { CalSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('VerifiedPhoneEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('CAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CalSDK.test()
    const ent = testsdk.VerifiedPhone()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('verified_phone hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of CalSDK.test(offline).VerifiedPhone().stream('list')) { }
    }, /offline/)

    for await (const _item of CalSDK.test(offline).VerifiedPhone()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = CalSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.VerifiedPhone().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of CalSDK.test().VerifiedPhone().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new CalSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.VerifiedPhone().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.VerifiedPhone().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.VerifiedPhone().list({"skip":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CAL_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'verified_phone.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"The unique identifier for the verified email.","t":"`$NUMBER`","key$":"id","index$":0},"phoneNumber":{"a":true,"fo":"phone","h":"Phone Number","n":"phoneNumber","r":true,"sh":"The verified phone number.","t":"`$STRING`","key$":"phoneNumber","index$":1},"userId":{"a":true,"h":"User Id","n":"userId","r":true,"sh":"The ID of the associated user, if applicable.","t":"`$NUMBER`","key$":"userId","index$":2}},"id":{"field":"id","name":"id"},"name":"verified_phone","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/verified-resources/phones/verification-code/request","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/verified-resources/phones/verification-code/request","q":{"$action":"request","exist":["authorization"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"verified-resources"},{"lit":"phones"},{"lit":"verification-code"},{"lit":"request"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /v2/verified-resources/phones/verification-code/verify","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/verified-resources/phones/verification-code/verify","q":{"$action":"verify","exist":["authorization"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"verified-resources"},{"lit":"phones"},{"lit":"verification-code"},{"lit":"verify"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/verified-resources/phones","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":0,"k":"query","n":"skip","or":"skip","r":false,"t":"`$NUMBER`","index$":0},{"a":true,"ex":25,"k":"query","n":"take","or":"take","r":false,"t":"`$NUMBER`","index$":1}]},"k":"http","m":"GET","o":"/v2/verified-resources/phones","q":{"exist":["authorization"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"verified-resources"},{"lit":"phones"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/verified-resources/phones/{id}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$NUMBER`","index$":0}]},"k":"http","m":"GET","o":"/v2/verified-resources/phones/{id}","q":{"exist":["authorization","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"verified-resources"},{"lit":"phones"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"verified_phone","name__orig":"verified_phone","Name":"VerifiedPhone","name_":"verified_phone","name-":"verified-phone","NAME":"VERIFIED_PHONE","index$":21}, {"active":true,"entity":"verified_phone","key$":"BasicVerifiedPhoneFlow","kind":"basic","name":"BasicVerifiedPhoneFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"verified_phone_ref01"},"m":{},"o":"create","s":[],"v":[],"unreachable":true},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"verified_phone_ref01"}}]},{"a":true,"d":{},"i":{"ref":"verified_phone_ref01","srcdatavar":"verified_phone_ref01_data","suffix":"_dt0"},"m":{"id":"verified_phone01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-verified_phone_ref01"}}]}]}, 'VerifiedPhone', {"POST /v2/verified-resources/phones/verification-code/request":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"phone":{"type":"string","description":"Phone number to verify.","example":"+372 5555 6666"}},"required":["phone"],"x-ref":"#/components/schemas/RequestPhoneVerificationInput"}}}},"parameters":[{"name":"Authorization","in":"header","description":"value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token","required":true,"schema":{"type":"string"},"index$":0}]},"POST /v2/verified-resources/phones/verification-code/verify":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"phone":{"type":"string","description":"phone number to verify.","example":"+37255556666"},"code":{"type":"string","description":"verification code sent to the phone number to verify","example":"1ABG2C"}},"required":["phone","code"],"x-ref":"#/components/schemas/VerifyPhoneInput"}}}},"parameters":[{"name":"Authorization","in":"header","description":"value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token","required":true,"schema":{"type":"string"},"index$":0}]},"GET /v2/verified-resources/phones":{"protocol":"http","parameters":[{"name":"take","required":false,"in":"query","description":"Maximum number of items to return","schema":{"minimum":1,"maximum":250,"default":250,"example":25,"type":"number"},"index$":0},{"name":"skip","required":false,"in":"query","description":"Number of items to skip","schema":{"minimum":0,"default":0,"example":0,"type":"number"},"index$":1},{"name":"Authorization","in":"header","description":"value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token","required":true,"schema":{"type":"string"},"index$":2}]},"GET /v2/verified-resources/phones/{id}":{"protocol":"http","parameters":[{"name":"id","required":true,"in":"path","schema":{"type":"number"},"index$":0},{"name":"Authorization","in":"header","description":"value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let verified_phone_ref01_data = Object.values(setup.data.existing.verified_phone)[0] as any

    // LIST
    const verified_phone_ref01_ent = client.VerifiedPhone()
    const verified_phone_ref01_match: any = {}

    const verified_phone_ref01_list = (await verified_phone_ref01_ent.list(verified_phone_ref01_match)).map((e: any) => e.data())


    // LOAD
    const verified_phone_ref01_match_dt0: any = {}
    verified_phone_ref01_match_dt0.id = verified_phone_ref01_data.id
    const verified_phone_ref01_data_dt0 = (await verified_phone_ref01_ent.load(verified_phone_ref01_match_dt0)).data()
    assert(verified_phone_ref01_data_dt0.id === verified_phone_ref01_data.id)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/verified_phone/VerifiedPhoneTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = CalSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['verified_phone01','verified_phone02','verified_phone03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CAL_TEST_VERIFIED_PHONE_ENTID': idmap,
    'CAL_TEST_LIVE': 'FALSE',
    'CAL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CAL_TEST_VERIFIED_PHONE_ENTID']

  const live = 'TRUE' === env.CAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CAL_TEST_VERIFIED_PHONE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new CalSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
