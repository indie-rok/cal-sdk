

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


describe('StripeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('CAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CalSDK.test()
    const ent = testsdk.Stripe()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Stripe().load({"code":1,"state":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CAL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'stripe.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"authUrl":{"a":true,"h":"Auth Url","n":"authUrl","r":true,"t":"`$STRING`","key$":"authUrl","index$":0},"url":{"a":true,"h":"Url","n":"url","r":true,"t":"`$STRING`","key$":"url","index$":1}},"name":"stripe","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/stripe/save","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"code","or":"code","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"state","or":"state","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v2/stripe/save","q":{"exist":["code","state"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"stripe"},{"lit":"save"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /v2/stripe/check","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/stripe/check","q":{"$action":"check","exist":["authorization"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"stripe"},{"lit":"check"}],"t":{"req":"`reqdata`","res":"`body.status`"},"index$":1},{"a":true,"co":{"id":"GET /v2/stripe/connect","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/stripe/connect","q":{"exist":["authorization"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"stripe"},{"lit":"connect"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":2}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"stripe","name__orig":"stripe","Name":"Stripe","name_":"stripe","name-":"stripe","NAME":"STRIPE","index$":19}, {"active":true,"entity":"stripe","key$":"BasicStripeFlow","kind":"basic","name":"BasicStripeFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"stripe_ref01","srcdatavar":"stripe_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-stripe_ref01"}}]}]}, 'Stripe', {"GET /v2/stripe/save":{"protocol":"http","parameters":[{"name":"state","required":true,"in":"query","schema":{"type":"string"},"index$":0},{"name":"code","required":true,"in":"query","schema":{"type":"string"},"index$":1}]},"GET /v2/stripe/check":{"protocol":"http","parameters":[{"name":"Authorization","in":"header","description":"value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token","required":true,"schema":{"type":"string"},"index$":0}]},"GET /v2/stripe/connect":{"protocol":"http","parameters":[{"name":"Authorization","required":true,"in":"header","description":"value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token","schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let stripe_ref01_data = Object.values(setup.data.existing.stripe)[0] as any

    // LOAD
    const stripe_ref01_ent = client.Stripe()
    const stripe_ref01_match_dt0: any = {}
    const stripe_ref01_data_dt0 = (await stripe_ref01_ent.load(stripe_ref01_match_dt0)).data()
    assert(null != stripe_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/stripe/StripeTestData.json')

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
    ['stripe01','stripe02','stripe03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CAL_TEST_STRIPE_ENTID': idmap,
    'CAL_TEST_LIVE': 'FALSE',
    'CAL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CAL_TEST_STRIPE_ENTID']

  const live = 'TRUE' === env.CAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CAL_TEST_STRIPE_ENTID']
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
  
