

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


describe('OauthClientWebhookEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('CAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CalSDK.test()
    const ent = testsdk.OauthClientWebhook()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.OauthClientWebhook().list({"oauth_client_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CAL_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'oauth_client_webhook.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"active":{"a":true,"h":"Active","n":"active","op":{"update":{"req":false,"type":"`$BOOLEAN`"}},"r":true,"t":"`$BOOLEAN`","key$":"active","index$":0},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$NUMBER`","key$":"id","index$":1},"oAuthClientId":{"a":true,"h":"O Auth Client Id","n":"oAuthClientId","r":true,"t":"`$STRING`","key$":"oAuthClientId","index$":2},"payloadTemplate":{"a":true,"h":"Payload Template","n":"payloadTemplate","op":{"create":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The template of the payload that will be sent to the subscriberUrl, check cal.com/docs/core-features/webhooks for more information","t":"`$STRING`","key$":"payloadTemplate","index$":3},"secret":{"a":true,"h":"Secret","n":"secret","r":false,"t":"`$STRING`","key$":"secret","index$":4},"subscriberUrl":{"a":true,"h":"Subscriber Url","n":"subscriberUrl","op":{"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"subscriberUrl","index$":5},"triggers":{"a":true,"h":"Triggers","n":"triggers","op":{"update":{"req":false,"type":"`$ARRAY`"}},"r":true,"t":"`$ARRAY`","key$":"triggers","index$":6},"version":{"a":true,"h":"Version","n":"version","r":false,"sh":"The version of the webhook","t":"`$STRING`","key$":"version","index$":7}},"id":{"field":"id","name":"id"},"name":"oauth_client_webhook","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/oauth-clients/{clientId}/webhooks","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_cal_secret_key","or":"x-cal-secret-key","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"oauth_client_id","or":"clientId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/oauth-clients/{clientId}/webhooks","q":{"exist":["oauth_client_id","x_cal_secret_key"]},"r":{"param":{"clientId":"oauth_client_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"oauth-clients"},{"var":"oauth_client_id"},{"lit":"webhooks"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/oauth-clients/{clientId}/webhooks","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_cal_secret_key","or":"x-cal-secret-key","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"oauth_client_id","or":"clientId","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":0,"k":"query","n":"skip","or":"skip","r":false,"t":"`$NUMBER`","index$":0},{"a":true,"ex":25,"k":"query","n":"take","or":"take","r":false,"t":"`$NUMBER`","index$":1}]},"k":"http","m":"GET","o":"/v2/oauth-clients/{clientId}/webhooks","q":{"exist":["oauth_client_id","x_cal_secret_key"]},"r":{"param":{"clientId":"oauth_client_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"oauth-clients"},{"var":"oauth_client_id"},{"lit":"webhooks"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/oauth-clients/{clientId}/webhooks/{webhookId}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_cal_secret_key","or":"x-cal-secret-key","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"webhookId","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"oauth_client_id","or":"clientId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v2/oauth-clients/{clientId}/webhooks/{webhookId}","q":{"exist":["id","oauth_client_id","x_cal_secret_key"]},"r":{"param":{"clientId":"oauth_client_id","webhookId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"oauth-clients"},{"var":"oauth_client_id"},{"lit":"webhooks"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/oauth-clients/{clientId}/webhooks/{webhookId}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_cal_secret_key","or":"x-cal-secret-key","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"webhookId","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"oauth_client_id","or":"clientId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/v2/oauth-clients/{clientId}/webhooks/{webhookId}","q":{"exist":["id","oauth_client_id","x_cal_secret_key"]},"r":{"param":{"clientId":"oauth_client_id","webhookId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"oauth-clients"},{"var":"oauth_client_id"},{"lit":"webhooks"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"DELETE /v2/oauth-clients/{clientId}/webhooks","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_cal_secret_key","or":"x-cal-secret-key","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"oauth_client_id","or":"clientId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/oauth-clients/{clientId}/webhooks","q":{"exist":["oauth_client_id","x_cal_secret_key"]},"r":{"param":{"clientId":"oauth_client_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"oauth-clients"},{"var":"oauth_client_id"},{"lit":"webhooks"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PATCH /v2/oauth-clients/{clientId}/webhooks/{webhookId}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_cal_secret_key","or":"x-cal-secret-key","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"webhookId","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"oauth_client_id","or":"clientId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/v2/oauth-clients/{clientId}/webhooks/{webhookId}","q":{"exist":["id","oauth_client_id","x_cal_secret_key"]},"r":{"param":{"clientId":"oauth_client_id","webhookId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"oauth-clients"},{"var":"oauth_client_id"},{"lit":"webhooks"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.oauth_client"]]},"key$":"oauth_client_webhook","name__orig":"oauth_client_webhook","Name":"OauthClientWebhook","name_":"oauth_client_webhook","name-":"oauth-client-webhook","NAME":"OAUTH_CLIENT_WEBHOOK","index$":12}, {"active":true,"entity":"oauth_client_webhook","key$":"BasicOauthClientWebhookFlow","kind":"basic","name":"BasicOauthClientWebhookFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"oauth_client_webhook_ref01"},"m":{"oauth_client_id":"oauth_client01"},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{},"m":{"oauth_client_id":"oauth_client01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"oauth_client_webhook_ref01"}}]},{"a":true,"d":{"oauth_client_id":"oauth_client01"},"i":{"ref":"oauth_client_webhook_ref01","srcdatavar":"oauth_client_webhook_ref01_data","suffix":"_up0","textfield":"oAuthClientId"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-oauth_client_webhook_ref01"}}],"v":[]},{"a":true,"d":{},"i":{"ref":"oauth_client_webhook_ref01","srcdatavar":"oauth_client_webhook_ref01_data","suffix":"_dt0"},"m":{"id":"oauth_client_webhook01","oauth_client_id":"oauth_client01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-oauth_client_webhook_ref01"}}]},{"a":true,"d":{},"i":{"ref":"oauth_client_webhook_ref01","suffix":"_rm0"},"m":{"id":"oauth_client_webhook01"},"o":"remove","s":[],"v":[]},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"oauth_client_id":"oauth_client01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"oauth_client_webhook_ref01"}}]}]}, 'OauthClientWebhook', {"POST /v2/oauth-clients/{clientId}/webhooks":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"payloadTemplate":{"type":"string","description":"The template of the payload that will be sent to the subscriberUrl, check cal.com/docs/core-features/webhooks for more information","example":"{\"content\":\"A new event has been scheduled\",\"type\":\"{{type}}\",\"name\":\"{{title}}\",\"organizer\":\"{{organizer.name}}\",\"booker\":\"{{attendees.0.name}}\"}","key$":"payloadTemplate"},"active":{"type":"boolean","key$":"active"},"subscriberUrl":{"type":"string","key$":"subscriberUrl"},"triggers":{"type":"array","example":["BOOKING_CREATED","BOOKING_RESCHEDULED","BOOKING_CANCELLED","BOOKING_CONFIRMED","BOOKING_REJECTED","BOOKING_COMPLETED","BOOKING_NO_SHOW","BOOKING_REOPENED"],"items":{"type":"string","enum":["BOOKING_CREATED","BOOKING_PAYMENT_INITIATED","BOOKING_PAID","BOOKING_RESCHEDULED","BOOKING_REQUESTED","BOOKING_CANCELLED","BOOKING_REJECTED","BOOKING_NO_SHOW_UPDATED","FORM_SUBMITTED","MEETING_ENDED","MEETING_STARTED","RECORDING_READY","INSTANT_MEETING","RECORDING_TRANSCRIPTION_GENERATED","OOO_CREATED","AFTER_HOSTS_CAL_VIDEO_NO_SHOW","AFTER_GUESTS_CAL_VIDEO_NO_SHOW","FORM_SUBMITTED_NO_EVENT","DELEGATION_CREDENTIAL_ERROR","WRONG_ASSIGNMENT_REPORT"]},"key$":"triggers"},"secret":{"type":"string","key$":"secret"},"version":{"type":"string","description":"The version of the webhook","example":"2021-10-20","enum":["2021-10-20"],"key$":"version"}},"required":["active","subscriberUrl","triggers"],"x-ref":"#/components/schemas/CreateWebhookInputDto","index$":1}}}},"parameters":[{"name":"x-cal-secret-key","in":"header","description":"OAuth client secret key","required":true,"schema":{"type":"string"},"index$":0},{"name":"clientId","required":true,"in":"path","schema":{"type":"string"},"index$":1}]},"GET /v2/oauth-clients/{clientId}/webhooks":{"protocol":"http","parameters":[{"name":"x-cal-secret-key","in":"header","description":"OAuth client secret key","required":true,"schema":{"type":"string"},"index$":0},{"name":"clientId","required":true,"in":"path","schema":{"type":"string"},"index$":1},{"name":"take","required":false,"in":"query","description":"Maximum number of items to return","schema":{"minimum":1,"maximum":250,"default":250,"example":25,"type":"number"},"index$":2},{"name":"skip","required":false,"in":"query","description":"Number of items to skip","schema":{"minimum":0,"default":0,"example":0,"type":"number"},"index$":3}]},"GET /v2/oauth-clients/{clientId}/webhooks/{webhookId}":{"protocol":"http","parameters":[{"name":"x-cal-secret-key","in":"header","description":"OAuth client secret key","required":true,"schema":{"type":"string"},"index$":0},{"name":"webhookId","required":true,"in":"path","schema":{"type":"string"},"index$":1},{"name":"clientId","required":true,"in":"path","schema":{"type":"string"},"index$":2}]},"DELETE /v2/oauth-clients/{clientId}/webhooks/{webhookId}":{"protocol":"http","parameters":[{"name":"x-cal-secret-key","in":"header","description":"OAuth client secret key","required":true,"schema":{"type":"string"},"index$":0},{"name":"webhookId","required":true,"in":"path","schema":{"type":"string"},"index$":1},{"name":"clientId","required":true,"in":"path","schema":{"type":"string"},"index$":2}]},"DELETE /v2/oauth-clients/{clientId}/webhooks":{"protocol":"http","parameters":[{"name":"x-cal-secret-key","in":"header","description":"OAuth client secret key","required":true,"schema":{"type":"string"},"index$":0},{"name":"clientId","required":true,"in":"path","schema":{"type":"string"},"index$":1}]},"PATCH /v2/oauth-clients/{clientId}/webhooks/{webhookId}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"payloadTemplate":{"type":"string","description":"The template of the payload that will be sent to the subscriberUrl, check cal.com/docs/core-features/webhooks for more information","example":"{\"content\":\"A new event has been scheduled\",\"type\":\"{{type}}\",\"name\":\"{{title}}\",\"organizer\":\"{{organizer.name}}\",\"booker\":\"{{attendees.0.name}}\"}","key$":"payloadTemplate"},"active":{"type":"boolean","key$":"active"},"subscriberUrl":{"type":"string","key$":"subscriberUrl"},"triggers":{"type":"array","example":["BOOKING_CREATED","BOOKING_RESCHEDULED","BOOKING_CANCELLED","BOOKING_CONFIRMED","BOOKING_REJECTED","BOOKING_COMPLETED","BOOKING_NO_SHOW","BOOKING_REOPENED"],"items":{"type":"string","enum":["BOOKING_CREATED","BOOKING_PAYMENT_INITIATED","BOOKING_PAID","BOOKING_RESCHEDULED","BOOKING_REQUESTED","BOOKING_CANCELLED","BOOKING_REJECTED","BOOKING_NO_SHOW_UPDATED","FORM_SUBMITTED","MEETING_ENDED","MEETING_STARTED","RECORDING_READY","INSTANT_MEETING","RECORDING_TRANSCRIPTION_GENERATED","OOO_CREATED","AFTER_HOSTS_CAL_VIDEO_NO_SHOW","AFTER_GUESTS_CAL_VIDEO_NO_SHOW","FORM_SUBMITTED_NO_EVENT","DELEGATION_CREDENTIAL_ERROR","WRONG_ASSIGNMENT_REPORT"]},"key$":"triggers"},"secret":{"type":"string","key$":"secret"},"version":{"type":"string","description":"The version of the webhook","example":"2021-10-20","enum":["2021-10-20"],"key$":"version"}},"x-ref":"#/components/schemas/UpdateWebhookInputDto","index$":1}}}},"parameters":[{"name":"x-cal-secret-key","in":"header","description":"OAuth client secret key","required":true,"schema":{"type":"string"},"index$":0},{"name":"webhookId","required":true,"in":"path","schema":{"type":"string"},"index$":1},{"name":"clientId","required":true,"in":"path","schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const oauth_client_webhook_ref01_ent = client.OauthClientWebhook()
    let oauth_client_webhook_ref01_data = setup.data.new.oauth_client_webhook['oauth_client_webhook_ref01']
    oauth_client_webhook_ref01_data['oauth_client_id'] = setup.idmap['oauth_client01']

    oauth_client_webhook_ref01_data = (await oauth_client_webhook_ref01_ent.create(oauth_client_webhook_ref01_data)).data()
    assert(null != oauth_client_webhook_ref01_data.id)


    // LIST
    const oauth_client_webhook_ref01_match: any = {}
    oauth_client_webhook_ref01_match['oauth_client_id'] = setup.idmap['oauth_client01']

    const oauth_client_webhook_ref01_list = (await oauth_client_webhook_ref01_ent.list(oauth_client_webhook_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(oauth_client_webhook_ref01_list, { id: oauth_client_webhook_ref01_data.id })))


    // UPDATE
    const oauth_client_webhook_ref01_data_up0: any = {}
    oauth_client_webhook_ref01_data_up0.id = oauth_client_webhook_ref01_data.id
    oauth_client_webhook_ref01_data_up0 ['oauth_client_id'] = setup.idmap['oauth_client_id']

    const oauth_client_webhook_ref01_markdef_up0 = { name: 'oAuthClientId', value: 'Mark01-oauth_client_webhook_ref01_' + setup.now }
    ;(oauth_client_webhook_ref01_data_up0 as any)[oauth_client_webhook_ref01_markdef_up0.name] = oauth_client_webhook_ref01_markdef_up0.value

    const oauth_client_webhook_ref01_resdata_up0 = (await oauth_client_webhook_ref01_ent.update(oauth_client_webhook_ref01_data_up0)).data()
    assert(oauth_client_webhook_ref01_resdata_up0.id === oauth_client_webhook_ref01_data_up0.id)

    assert((oauth_client_webhook_ref01_resdata_up0 as any)[oauth_client_webhook_ref01_markdef_up0.name] === oauth_client_webhook_ref01_markdef_up0.value)


    // LOAD
    const oauth_client_webhook_ref01_match_dt0: any = {}
    oauth_client_webhook_ref01_match_dt0.id = oauth_client_webhook_ref01_data.id
    const oauth_client_webhook_ref01_data_dt0 = (await oauth_client_webhook_ref01_ent.load(oauth_client_webhook_ref01_match_dt0)).data()
    assert(oauth_client_webhook_ref01_data_dt0.id === oauth_client_webhook_ref01_data.id)


    // REMOVE
    const oauth_client_webhook_ref01_match_rm0: any = { id: oauth_client_webhook_ref01_data.id }
    await oauth_client_webhook_ref01_ent.remove(oauth_client_webhook_ref01_match_rm0)
  

    // LIST
    const oauth_client_webhook_ref01_match_rt0: any = {}
    oauth_client_webhook_ref01_match_rt0['oauth_client_id'] = setup.idmap['oauth_client01']

    const oauth_client_webhook_ref01_list_rt0 = (await oauth_client_webhook_ref01_ent.list(oauth_client_webhook_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(oauth_client_webhook_ref01_list_rt0, { id: oauth_client_webhook_ref01_data.id })))


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
      '../../../../.sdk/test/entity/oauth_client_webhook/OauthClientWebhookTestData.json')

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
    ['oauth_client_webhook01','oauth_client_webhook02','oauth_client_webhook03','oauth_client01','oauth_client02','oauth_client03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CAL_TEST_OAUTH_CLIENT_WEBHOOK_ENTID': idmap,
    'CAL_TEST_LIVE': 'FALSE',
    'CAL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CAL_TEST_OAUTH_CLIENT_WEBHOOK_ENTID']

  const live = 'TRUE' === env.CAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CAL_TEST_OAUTH_CLIENT_WEBHOOK_ENTID']
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
  
