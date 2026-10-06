

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


describe('SelectedCalendarEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('CAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CalSDK.test()
    const ent = testsdk.SelectedCalendar()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.SelectedCalendar().create({"credentialId":"x","externalId":"x","integration":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CAL_TEST_LIVE
    for (const op of ['create', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'selected_calendar.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"credentialId":{"a":true,"h":"Credential Id","n":"credentialId","r":true,"t":"`$NUMBER`","key$":"credentialId","index$":0},"delegationCredentialId":{"a":true,"h":"Delegation Credential Id","n":"delegationCredentialId","r":false,"t":"`$STRING`","key$":"delegationCredentialId","index$":1},"externalId":{"a":true,"h":"External Id","n":"externalId","r":true,"t":"`$STRING`","key$":"externalId","index$":2},"integration":{"a":true,"h":"Integration","n":"integration","r":true,"t":"`$STRING`","key$":"integration","index$":3}},"name":"selected_calendar","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/selected-calendars","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/selected-calendars","q":{"exist":["authorization"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"selected-calendars"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"create"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/selected-calendars","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"credential_id","or":"credentialId","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"delegation_credential_id","or":"delegationCredentialId","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"external_id","or":"externalId","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"integration","or":"integration","r":true,"t":"`$STRING`","index$":3}]},"k":"http","m":"DELETE","o":"/v2/selected-calendars","q":{"exist":["authorization","credential_id","external_id","integration"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"selected-calendars"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"selected_calendar","name__orig":"selected_calendar","Name":"SelectedCalendar","name_":"selected_calendar","name-":"selected-calendar","NAME":"SELECTED_CALENDAR","index$":16}, {"active":true,"entity":"selected_calendar","key$":"BasicSelectedCalendarFlow","kind":"basic","name":"BasicSelectedCalendarFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"selected_calendar_ref01"},"m":{},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{"ref":"selected_calendar_ref01","suffix":"_rm0"},"m":{},"o":"remove","s":[],"v":[]}]}, 'SelectedCalendar', {"POST /v2/selected-calendars":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"integration":{"type":"string","key$":"integration"},"externalId":{"type":"string","key$":"externalId"},"credentialId":{"type":"number","key$":"credentialId"},"delegationCredentialId":{"type":"string","key$":"delegationCredentialId"}},"required":["integration","externalId","credentialId"],"x-ref":"#/components/schemas/SelectedCalendarsInputDto","index$":1}}}},"parameters":[{"name":"Authorization","in":"header","description":"value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token","required":true,"schema":{"type":"string"},"index$":0}]},"DELETE /v2/selected-calendars":{"protocol":"http","parameters":[{"name":"Authorization","in":"header","description":"value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token","required":true,"schema":{"type":"string"},"index$":0},{"name":"integration","required":true,"in":"query","schema":{"type":"string"},"index$":1},{"name":"externalId","required":true,"in":"query","schema":{"type":"string"},"index$":2},{"name":"credentialId","required":true,"in":"query","schema":{"type":"string"},"index$":3},{"name":"delegationCredentialId","required":false,"in":"query","schema":{"type":"string"},"index$":4}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const selected_calendar_ref01_ent = client.SelectedCalendar()
    let selected_calendar_ref01_data = setup.data.new.selected_calendar['selected_calendar_ref01']

    selected_calendar_ref01_data = (await selected_calendar_ref01_ent.create(selected_calendar_ref01_data)).data()
    assert(null != selected_calendar_ref01_data)



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
      '../../../../.sdk/test/entity/selected_calendar/SelectedCalendarTestData.json')

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
    ['selected_calendar01','selected_calendar02','selected_calendar03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CAL_TEST_SELECTED_CALENDAR_ENTID': idmap,
    'CAL_TEST_LIVE': 'FALSE',
    'CAL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CAL_TEST_SELECTED_CALENDAR_ENTID']

  const live = 'TRUE' === env.CAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CAL_TEST_SELECTED_CALENDAR_ENTID']
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
  
