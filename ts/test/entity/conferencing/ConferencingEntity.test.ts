

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


describe('ConferencingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('CAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CalSDK.test()
    const ent = testsdk.Conferencing()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('conferencing hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of CalSDK.test(offline).Conferencing().stream('list')) { }
    }, /offline/)

    for await (const _item of CalSDK.test(offline).Conferencing()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = CalSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Conferencing().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of CalSDK.test().Conferencing().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new CalSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Conferencing().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Conferencing().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Conferencing().list({"id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CAL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'conferencing.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Id of the conferencing app credentials","t":"`$NUMBER`","key$":"id","index$":0},"invalid":{"a":true,"h":"Invalid","n":"invalid","r":false,"sh":"Whether if the connection is working or not.","t":"`$BOOLEAN`","key$":"invalid","index$":1},"type":{"a":true,"h":"Type","n":"type","r":true,"sh":"Type of conferencing app","t":"`$STRING`","key$":"type","index$":2},"userId":{"a":true,"h":"User Id","n":"userId","r":true,"sh":"Id of the user associated to the conferencing app","t":"`$NUMBER`","key$":"userId","index$":3}},"id":{"field":"id","name":"id"},"name":"conferencing","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/conferencing/{app}/connect","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"app","or":"app","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/conferencing/{app}/connect","q":{"$action":"connect","exist":["app","authorization"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"conferencing"},{"var":"app"},{"lit":"connect"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"POST /v2/conferencing/{app}/default","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"app","or":"app","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/conferencing/{app}/default","q":{"$action":"default","exist":["app","authorization"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"conferencing"},{"var":"app"},{"lit":"default"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/conferencing","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/conferencing","q":{"exist":["authorization"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"conferencing"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/conferencing/{app}/oauth/auth-url","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"conferencing_id","or":"app","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"on_error_return_to","or":"onErrorReturnTo","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"return_to","or":"returnTo","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v2/conferencing/{app}/oauth/auth-url","q":{"$action":"oauth","exist":["authorization","conferencing_id","on_error_return_to","return_to"]},"r":{"param":{"app":"conferencing_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"conferencing"},{"var":"conferencing_id"},{"lit":"oauth"},{"lit":"auth-url"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /v2/conferencing/{app}/oauth/callback","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"conferencing_id","or":"app","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"code","or":"code","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"state","or":"state","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v2/conferencing/{app}/oauth/callback","q":{"$action":"oauth_callback","exist":["code","conferencing_id","state"]},"r":{"param":{"app":"conferencing_id"}},"s":[{"lit":"v2"},{"lit":"conferencing"},{"var":"conferencing_id"},{"lit":"oauth"},{"lit":"callback"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /v2/conferencing/default","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/conferencing/default","q":{"$action":"default","exist":["authorization"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"conferencing"},{"lit":"default"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":2}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/conferencing/{app}/disconnect","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"app","or":"app","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/conferencing/{app}/disconnect","q":{"$action":"disconnect","exist":["app","authorization"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"conferencing"},{"var":"app"},{"lit":"disconnect"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"conferencing","name__orig":"conferencing","Name":"Conferencing","name_":"conferencing","name-":"conferencing","NAME":"CONFERENCING","index$":5}, {"active":true,"entity":"conferencing","key$":"BasicConferencingFlow","kind":"basic","name":"BasicConferencingFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"conferencing_ref01"},"m":{"app":"app01"},"o":"create","s":[],"v":[],"unreachable":true},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"conferencing_ref01"}}]},{"a":false,"d":{},"i":{"ref":"conferencing_ref01","srcdatavar":"conferencing_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-conferencing_ref01"}}],"unreachable":true},{"a":false,"d":{},"i":{"ref":"conferencing_ref01","suffix":"_rm0"},"m":{"id":"conferencing01"},"o":"remove","s":[],"v":[],"unreachable":true},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"conferencing_ref01"}}]}]}, 'Conferencing', {"POST /v2/conferencing/{app}/connect":{"protocol":"http","parameters":[{"name":"app","required":true,"in":"path","description":"Conferencing application type","schema":{"enum":["google-meet"],"type":"string"},"index$":0},{"name":"Authorization","in":"header","description":"value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token","required":true,"schema":{"type":"string"},"index$":1}]},"POST /v2/conferencing/{app}/default":{"protocol":"http","parameters":[{"name":"app","required":true,"in":"path","description":"Conferencing application type","schema":{"enum":["google-meet","zoom","msteams","daily-video"],"type":"string"},"index$":0},{"name":"Authorization","in":"header","description":"value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token","required":true,"schema":{"type":"string"},"index$":1}]},"GET /v2/conferencing":{"protocol":"http","parameters":[{"name":"Authorization","in":"header","description":"value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token","required":true,"schema":{"type":"string"},"index$":0}]},"GET /v2/conferencing/{app}/oauth/auth-url":{"protocol":"http","parameters":[{"name":"Authorization","required":true,"in":"header","description":"value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token","schema":{"type":"string"},"index$":0},{"name":"app","required":true,"in":"path","description":"Conferencing application type","schema":{"enum":["zoom","msteams"],"type":"string"},"index$":1},{"name":"returnTo","required":true,"in":"query","schema":{"type":"string"},"index$":2},{"name":"onErrorReturnTo","required":true,"in":"query","schema":{"type":"string"},"index$":3}]},"GET /v2/conferencing/{app}/oauth/callback":{"protocol":"http","parameters":[{"name":"state","required":true,"in":"query","schema":{"type":"string"},"index$":0},{"name":"app","required":true,"in":"path","description":"Conferencing application type","schema":{"enum":["zoom","msteams"],"type":"string"},"index$":1},{"name":"code","required":true,"in":"query","schema":{"type":"string"},"index$":2}]},"GET /v2/conferencing/default":{"protocol":"http","parameters":[{"name":"Authorization","in":"header","description":"value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token","required":true,"schema":{"type":"string"},"index$":0}]},"DELETE /v2/conferencing/{app}/disconnect":{"protocol":"http","parameters":[{"name":"app","required":true,"in":"path","description":"Conferencing application type","schema":{"enum":["google-meet","zoom","msteams"],"type":"string"},"index$":0},{"name":"Authorization","in":"header","description":"value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let conferencing_ref01_data = Object.values(setup.data.existing.conferencing)[0] as any

    // LIST
    const conferencing_ref01_ent = client.Conferencing()
    const conferencing_ref01_match: any = {}

    const conferencing_ref01_list = (await conferencing_ref01_ent.list(conferencing_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/conferencing/ConferencingTestData.json')

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
    ['conferencing01','conferencing02','conferencing03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CAL_TEST_CONFERENCING_ENTID': idmap,
    'CAL_TEST_LIVE': 'FALSE',
    'CAL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CAL_TEST_CONFERENCING_ENTID']

  const live = 'TRUE' === env.CAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CAL_TEST_CONFERENCING_ENTID']
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
  
