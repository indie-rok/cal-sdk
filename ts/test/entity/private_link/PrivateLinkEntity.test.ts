

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


describe('PrivateLinkEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('CAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CalSDK.test()
    const ent = testsdk.PrivateLink()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.PrivateLink().list({"event_type_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CAL_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'private_link.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"data":{"a":true,"h":"Data","n":"data","r":true,"sh":"Array of private links for the event type (mix of time-based and usage-based)","t":"`$ARRAY`","union":{"branches":2,"count":1,"depth":1},"key$":"data","index$":0},"expiresAt":{"a":true,"fo":"date-time","h":"Expires At","n":"expiresAt","r":false,"sh":"Expiration date for time-based links","t":"`$STRING`","key$":"expiresAt","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"maxUsageCount":{"a":true,"h":"Max Usage Count","n":"maxUsageCount","r":false,"sh":"Maximum number of times the link can be used.","t":"`$NUMBER`","key$":"maxUsageCount","index$":3},"status":{"a":true,"h":"Status","n":"status","r":true,"sh":"Response status","t":"`$STRING`","key$":"status","index$":4}},"id":{"field":"id","name":"id"},"name":"private_link","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/event-types/{eventTypeId}/private-links","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"event_type_id","or":"eventTypeId","r":true,"t":"`$NUMBER`","index$":0}]},"k":"http","m":"POST","o":"/v2/event-types/{eventTypeId}/private-links","q":{"exist":["authorization","event_type_id"]},"r":{"param":{"eventTypeId":"event_type_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"event-types"},{"var":"event_type_id"},{"lit":"private-links"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/event-types/{eventTypeId}/private-links","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"event_type_id","or":"eventTypeId","r":true,"t":"`$NUMBER`","index$":0}]},"k":"http","m":"GET","o":"/v2/event-types/{eventTypeId}/private-links","q":{"exist":["authorization","event_type_id"]},"r":{"param":{"eventTypeId":"event_type_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"event-types"},{"var":"event_type_id"},{"lit":"private-links"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/event-types/{eventTypeId}/private-links/{linkId}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"event_type_id","or":"eventTypeId","r":true,"t":"`$NUMBER`","index$":0},{"a":true,"k":"param","n":"id","or":"linkId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/v2/event-types/{eventTypeId}/private-links/{linkId}","q":{"exist":["authorization","event_type_id","id"]},"r":{"param":{"eventTypeId":"event_type_id","linkId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"event-types"},{"var":"event_type_id"},{"lit":"private-links"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PATCH /v2/event-types/{eventTypeId}/private-links/{linkId}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"event_type_id","or":"eventTypeId","r":true,"t":"`$NUMBER`","index$":0},{"a":true,"k":"param","n":"id","or":"linkId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/v2/event-types/{eventTypeId}/private-links/{linkId}","q":{"exist":["authorization","event_type_id","id"]},"r":{"param":{"eventTypeId":"event_type_id","linkId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"event-types"},{"var":"event_type_id"},{"lit":"private-links"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.event_type"]]},"key$":"private_link","name__orig":"private_link","Name":"PrivateLink","name_":"private_link","name-":"private-link","NAME":"PRIVATE_LINK","index$":14}, {"active":true,"entity":"private_link","key$":"BasicPrivateLinkFlow","kind":"basic","name":"BasicPrivateLinkFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"private_link_ref01"},"m":{"event_type_id":"event_type01"},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{},"m":{"event_type_id":"event_type01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"private_link_ref01"}}]},{"a":true,"d":{"event_type_id":"event_type01"},"i":{"ref":"private_link_ref01","srcdatavar":"private_link_ref01_data","suffix":"_up0","textfield":"expiresAt"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-private_link_ref01"}}],"v":[]},{"a":true,"d":{},"i":{"ref":"private_link_ref01","suffix":"_rm0"},"m":{"event_type_id":"event_type01","id":"private_link01"},"o":"remove","s":[],"v":[]},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"event_type_id":"event_type01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"private_link_ref01"}}]}]}, 'PrivateLink', {"POST /v2/event-types/{eventTypeId}/private-links":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"expiresAt":{"type":"string","description":"Expiration date for time-based links","format":"date-time","example":"2024-12-31T23:59:59.000Z","key$":"expiresAt"},"maxUsageCount":{"type":"number","description":"Maximum number of times the link can be used. If omitted and expiresAt is not provided, defaults to 1 (one time use).","example":10,"minimum":1,"default":1,"key$":"maxUsageCount"}},"x-ref":"#/components/schemas/CreatePrivateLinkInput","index$":1}}}},"parameters":[{"name":"eventTypeId","required":true,"in":"path","schema":{"type":"number"},"index$":0},{"name":"Authorization","in":"header","description":"value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token","required":true,"schema":{"type":"string"},"index$":1}]},"GET /v2/event-types/{eventTypeId}/private-links":{"protocol":"http","parameters":[{"name":"eventTypeId","required":true,"in":"path","schema":{"type":"number"},"index$":0},{"name":"Authorization","in":"header","description":"value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /v2/event-types/{eventTypeId}/private-links/{linkId}":{"protocol":"http","parameters":[{"name":"eventTypeId","required":true,"in":"path","schema":{"type":"number"},"index$":0},{"name":"linkId","required":true,"in":"path","schema":{"type":"string"},"index$":1},{"name":"Authorization","in":"header","description":"value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token","required":true,"schema":{"type":"string"},"index$":2}]},"PATCH /v2/event-types/{eventTypeId}/private-links/{linkId}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"expiresAt":{"format":"date-time","type":"string","description":"New expiration date for time-based links","example":"2024-12-31T23:59:59.000Z","key$":"expiresAt"},"maxUsageCount":{"type":"number","description":"New maximum number of times the link can be used","example":10,"minimum":1,"key$":"maxUsageCount"}},"x-ref":"#/components/schemas/UpdatePrivateLinkBody","index$":1}}}},"parameters":[{"name":"eventTypeId","required":true,"in":"path","schema":{"type":"number"},"index$":0},{"name":"linkId","required":true,"in":"path","schema":{"type":"string"},"index$":1},{"name":"Authorization","in":"header","description":"value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const private_link_ref01_ent = client.PrivateLink()
    let private_link_ref01_data = setup.data.new.private_link['private_link_ref01']
    private_link_ref01_data['event_type_id'] = setup.idmap['event_type01']

    private_link_ref01_data = (await private_link_ref01_ent.create(private_link_ref01_data)).data()
    assert(null != private_link_ref01_data.id)


    // LIST
    const private_link_ref01_match: any = {}
    private_link_ref01_match['event_type_id'] = setup.idmap['event_type01']

    const private_link_ref01_list = (await private_link_ref01_ent.list(private_link_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(private_link_ref01_list, { id: private_link_ref01_data.id })))


    // UPDATE
    const private_link_ref01_data_up0: any = {}
    private_link_ref01_data_up0.id = private_link_ref01_data.id
    private_link_ref01_data_up0 ['event_type_id'] = setup.idmap['event_type_id']

    const private_link_ref01_markdef_up0 = { name: 'expiresAt', value: 'Mark01-private_link_ref01_' + setup.now }
    ;(private_link_ref01_data_up0 as any)[private_link_ref01_markdef_up0.name] = private_link_ref01_markdef_up0.value

    const private_link_ref01_resdata_up0 = (await private_link_ref01_ent.update(private_link_ref01_data_up0)).data()
    assert(private_link_ref01_resdata_up0.id === private_link_ref01_data_up0.id)

    assert((private_link_ref01_resdata_up0 as any)[private_link_ref01_markdef_up0.name] === private_link_ref01_markdef_up0.value)


    // REMOVE
    const private_link_ref01_match_rm0: any = { id: private_link_ref01_data.id }
    await private_link_ref01_ent.remove(private_link_ref01_match_rm0)
  

    // LIST
    const private_link_ref01_match_rt0: any = {}
    private_link_ref01_match_rt0['event_type_id'] = setup.idmap['event_type01']

    const private_link_ref01_list_rt0 = (await private_link_ref01_ent.list(private_link_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(private_link_ref01_list_rt0, { id: private_link_ref01_data.id })))


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
      '../../../../.sdk/test/entity/private_link/PrivateLinkTestData.json')

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
    ['private_link01','private_link02','private_link03','event_type01','event_type02','event_type03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CAL_TEST_PRIVATE_LINK_ENTID': idmap,
    'CAL_TEST_LIVE': 'FALSE',
    'CAL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CAL_TEST_PRIVATE_LINK_ENTID']

  const live = 'TRUE' === env.CAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CAL_TEST_PRIVATE_LINK_ENTID']
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
  
