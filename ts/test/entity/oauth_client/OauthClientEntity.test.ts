

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


describe('OauthClientEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('CAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CalSDK.test()
    const ent = testsdk.OauthClient()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('oauth_client hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of CalSDK.test(offline).OauthClient().stream('list')) { }
    }, /offline/)

    for await (const _item of CalSDK.test(offline).OauthClient()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = CalSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.OauthClient().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of CalSDK.test().OauthClient().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new CalSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.OauthClient().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.OauthClient().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.OauthClient().list({"areCalendarEventsEnabled":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CAL_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'oauth_client.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"areCalendarEventsEnabled":{"a":true,"h":"Are Calendar Events Enabled","n":"areCalendarEventsEnabled","op":{"create":{"req":false,"type":"`$BOOLEAN`"},"update":{"req":false,"type":"`$BOOLEAN`"}},"r":true,"sh":"If true and if managed user has calendar connected, calendar events will be created.","t":"`$BOOLEAN`","key$":"areCalendarEventsEnabled","index$":0},"areDefaultEventTypesEnabled":{"a":true,"h":"Are Default Event Types Enabled","n":"areDefaultEventTypesEnabled","op":{"create":{"req":false,"type":"`$BOOLEAN`"},"update":{"req":false,"type":"`$BOOLEAN`"}},"r":true,"sh":"If enabled, when creating a managed user the managed user will have 4 default event types: 30 and 60 minutes without Cal video, 30 and 60 minutes with Cal video.","t":"`$BOOLEAN`","key$":"areDefaultEventTypesEnabled","index$":1},"areEmailsEnabled":{"a":true,"h":"Are Emails Enabled","n":"areEmailsEnabled","op":{"create":{"req":false,"type":"`$BOOLEAN`"},"update":{"req":false,"type":"`$BOOLEAN`"}},"r":true,"t":"`$BOOLEAN`","key$":"areEmailsEnabled","index$":2},"bookingCancelRedirectUri":{"a":true,"h":"Booking Cancel Redirect Uri","n":"bookingCancelRedirectUri","r":false,"t":"`$STRING`","key$":"bookingCancelRedirectUri","index$":3},"bookingRedirectUri":{"a":true,"h":"Booking Redirect Uri","n":"bookingRedirectUri","r":false,"t":"`$STRING`","key$":"bookingRedirectUri","index$":4},"bookingRescheduleRedirectUri":{"a":true,"h":"Booking Reschedule Redirect Uri","n":"bookingRescheduleRedirectUri","r":false,"t":"`$STRING`","key$":"bookingRescheduleRedirectUri","index$":5},"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","r":true,"t":"`$STRING`","key$":"createdAt","index$":6},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":7},"logo":{"a":true,"h":"Logo","n":"logo","r":false,"t":"`$OBJECT`","key$":"logo","index$":8},"name":{"a":true,"h":"Name","n":"name","op":{"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"name","index$":9},"organizationId":{"a":true,"h":"Organization Id","n":"organizationId","r":true,"t":"`$NUMBER`","key$":"organizationId","index$":10},"permissions":{"a":true,"h":"Permissions","n":"permissions","r":true,"sh":"Array of permission keys like [\"BOOKING_READ\", \"BOOKING_WRITE\"]","t":"`$ARRAY`","key$":"permissions","index$":11},"redirectUris":{"a":true,"h":"Redirect Uris","n":"redirectUris","op":{"update":{"req":false,"type":"`$ARRAY`"}},"r":true,"t":"`$ARRAY`","key$":"redirectUris","index$":12},"secret":{"a":true,"h":"Secret","n":"secret","r":true,"t":"`$STRING`","key$":"secret","index$":13}},"id":{"field":"id","name":"id"},"name":"oauth_client","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/oauth-clients","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/oauth-clients","q":{"exist":["authorization"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"oauth-clients"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/oauth-clients","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/oauth-clients","q":{"exist":["authorization"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"oauth-clients"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/oauth-clients/{clientId}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"clientId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/oauth-clients/{clientId}","q":{"exist":["authorization","id"]},"r":{"param":{"clientId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"oauth-clients"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /v2/auth/oauth2/clients/{clientId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"client_id","or":"clientId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/auth/oauth2/clients/{clientId}","q":{"$action":"oauth2","exist":["client_id"]},"r":{"param":{"clientId":"client_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"auth"},{"lit":"oauth2"},{"lit":"clients"},{"var":"client_id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/oauth-clients/{clientId}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"clientId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/oauth-clients/{clientId}","q":{"exist":["authorization","id"]},"r":{"param":{"clientId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"oauth-clients"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PATCH /v2/oauth-clients/{clientId}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"clientId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/v2/oauth-clients/{clientId}","q":{"exist":["authorization","id"]},"r":{"param":{"clientId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"oauth-clients"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"oauth_client","name__orig":"oauth_client","Name":"OauthClient","name_":"oauth_client","name-":"oauth-client","NAME":"OAUTH_CLIENT","index$":11}, {"active":true,"entity":"oauth_client","key$":"BasicOauthClientFlow","kind":"basic","name":"BasicOauthClientFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"oauth_client_ref01"},"m":{},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"oauth_client_ref01"}}]},{"a":true,"d":{},"i":{"ref":"oauth_client_ref01","srcdatavar":"oauth_client_ref01_data","suffix":"_up0","textfield":"bookingCancelRedirectUri"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-oauth_client_ref01"}}],"v":[]},{"a":true,"d":{},"i":{"ref":"oauth_client_ref01","srcdatavar":"oauth_client_ref01_data","suffix":"_dt0"},"m":{"id":"oauth_client01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-oauth_client_ref01"}}]},{"a":true,"d":{},"i":{"ref":"oauth_client_ref01","suffix":"_rm0"},"m":{"id":"oauth_client01"},"o":"remove","s":[],"v":[]},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"oauth_client_ref01"}}]}]}, 'OauthClient', {"POST /v2/oauth-clients":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"logo":{"type":"string","key$":"logo"},"name":{"type":"string","key$":"name"},"redirectUris":{"type":"array","items":{"type":"string"},"key$":"redirectUris"},"permissions":{"type":"array","description":"Array of permission keys like [\"BOOKING_READ\", \"BOOKING_WRITE\"]. Use [\"*\"] to grant all permissions.","items":{"type":"string","enum":["EVENT_TYPE_READ","EVENT_TYPE_WRITE","BOOKING_READ","BOOKING_WRITE","SCHEDULE_READ","SCHEDULE_WRITE","APPS_READ","APPS_WRITE","PROFILE_READ","PROFILE_WRITE","*"]},"key$":"permissions"},"bookingRedirectUri":{"type":"string","key$":"bookingRedirectUri"},"bookingCancelRedirectUri":{"type":"string","key$":"bookingCancelRedirectUri"},"bookingRescheduleRedirectUri":{"type":"string","key$":"bookingRescheduleRedirectUri"},"areEmailsEnabled":{"type":"boolean","key$":"areEmailsEnabled"},"areDefaultEventTypesEnabled":{"type":"boolean","default":false,"description":"If true, when creating a managed user the managed user will have 4 default event types: 30 and 60 minutes without Cal video, 30 and 60 minutes with Cal video. Set this as false if you want to create a managed user and then manually create event types for the user.","key$":"areDefaultEventTypesEnabled"},"areCalendarEventsEnabled":{"type":"boolean","default":true,"description":"If true and if managed user has calendar connected, calendar events will be created. Disable it if you manually create calendar events. Default to true.","key$":"areCalendarEventsEnabled"}},"required":["name","redirectUris","permissions"],"x-ref":"#/components/schemas/CreateOAuthClientInput","index$":1}}}},"parameters":[{"name":"Authorization","in":"header","description":"value must be `Bearer <token>` where `<token>` is api key prefixed with cal_","required":true,"schema":{"type":"string"},"index$":0}]},"GET /v2/oauth-clients":{"protocol":"http","parameters":[{"name":"Authorization","in":"header","description":"value must be `Bearer <token>` where `<token>` is api key prefixed with cal_","required":true,"schema":{"type":"string"},"index$":0}]},"GET /v2/oauth-clients/{clientId}":{"protocol":"http","parameters":[{"name":"Authorization","in":"header","description":"value must be `Bearer <token>` where `<token>` is api key prefixed with cal_","required":true,"schema":{"type":"string"},"index$":0},{"name":"clientId","required":true,"in":"path","schema":{"type":"string"},"index$":1}]},"GET /v2/auth/oauth2/clients/{clientId}":{"protocol":"http","parameters":[{"name":"clientId","required":true,"in":"path","schema":{"type":"string"},"index$":0}]},"DELETE /v2/oauth-clients/{clientId}":{"protocol":"http","parameters":[{"name":"Authorization","in":"header","description":"value must be `Bearer <token>` where `<token>` is api key prefixed with cal_","required":true,"schema":{"type":"string"},"index$":0},{"name":"clientId","required":true,"in":"path","schema":{"type":"string"},"index$":1}]},"PATCH /v2/oauth-clients/{clientId}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"logo":{"type":"string","key$":"logo"},"name":{"type":"string","key$":"name"},"redirectUris":{"type":"array","items":{"type":"string"},"key$":"redirectUris"},"bookingRedirectUri":{"type":"string","key$":"bookingRedirectUri"},"bookingCancelRedirectUri":{"type":"string","key$":"bookingCancelRedirectUri"},"bookingRescheduleRedirectUri":{"type":"string","key$":"bookingRescheduleRedirectUri"},"areEmailsEnabled":{"type":"boolean","key$":"areEmailsEnabled"},"areDefaultEventTypesEnabled":{"type":"boolean","description":"If true, when creating a managed user the managed user will have 4 default event types: 30 and 60 minutes without Cal video, 30 and 60 minutes with Cal video. Set this as false if you want to create a managed user and then manually create event types for the user.","key$":"areDefaultEventTypesEnabled"},"areCalendarEventsEnabled":{"type":"boolean","description":"If true and if managed user has calendar connected, calendar events will be created. Disable it if you manually create calendar events. Default to true.","key$":"areCalendarEventsEnabled"}},"x-ref":"#/components/schemas/UpdateOAuthClientInput","index$":1}}}},"parameters":[{"name":"Authorization","in":"header","description":"value must be `Bearer <token>` where `<token>` is api key prefixed with cal_","required":true,"schema":{"type":"string"},"index$":0},{"name":"clientId","required":true,"in":"path","schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const oauth_client_ref01_ent = client.OauthClient()
    let oauth_client_ref01_data = setup.data.new.oauth_client['oauth_client_ref01']

    oauth_client_ref01_data = (await oauth_client_ref01_ent.create(oauth_client_ref01_data)).data()
    assert(null != oauth_client_ref01_data.id)


    // LIST
    const oauth_client_ref01_match: any = {}

    const oauth_client_ref01_list = (await oauth_client_ref01_ent.list(oauth_client_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(oauth_client_ref01_list, { id: oauth_client_ref01_data.id })))


    // UPDATE
    const oauth_client_ref01_data_up0: any = {}
    oauth_client_ref01_data_up0.id = oauth_client_ref01_data.id

    const oauth_client_ref01_markdef_up0 = { name: 'bookingCancelRedirectUri', value: 'Mark01-oauth_client_ref01_' + setup.now }
    ;(oauth_client_ref01_data_up0 as any)[oauth_client_ref01_markdef_up0.name] = oauth_client_ref01_markdef_up0.value

    const oauth_client_ref01_resdata_up0 = (await oauth_client_ref01_ent.update(oauth_client_ref01_data_up0)).data()
    assert(oauth_client_ref01_resdata_up0.id === oauth_client_ref01_data_up0.id)

    assert((oauth_client_ref01_resdata_up0 as any)[oauth_client_ref01_markdef_up0.name] === oauth_client_ref01_markdef_up0.value)


    // LOAD
    const oauth_client_ref01_match_dt0: any = {}
    oauth_client_ref01_match_dt0.id = oauth_client_ref01_data.id
    const oauth_client_ref01_data_dt0 = (await oauth_client_ref01_ent.load(oauth_client_ref01_match_dt0)).data()
    assert(oauth_client_ref01_data_dt0.id === oauth_client_ref01_data.id)


    // REMOVE
    const oauth_client_ref01_match_rm0: any = { id: oauth_client_ref01_data.id }
    await oauth_client_ref01_ent.remove(oauth_client_ref01_match_rm0)
  

    // LIST
    const oauth_client_ref01_match_rt0: any = {}

    const oauth_client_ref01_list_rt0 = (await oauth_client_ref01_ent.list(oauth_client_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(oauth_client_ref01_list_rt0, { id: oauth_client_ref01_data.id })))


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
      '../../../../.sdk/test/entity/oauth_client/OauthClientTestData.json')

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
    ['oauth_client01','oauth_client02','oauth_client03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CAL_TEST_OAUTH_CLIENT_ENTID': idmap,
    'CAL_TEST_LIVE': 'FALSE',
    'CAL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CAL_TEST_OAUTH_CLIENT_ENTID']

  const live = 'TRUE' === env.CAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CAL_TEST_OAUTH_CLIENT_ENTID']
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
  
