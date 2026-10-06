

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


describe('ManagedUserEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('CAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CalSDK.test()
    const ent = testsdk.ManagedUser()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ManagedUser().list({"oauth_client_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CAL_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'managed_user.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"avatarUrl":{"a":true,"h":"Avatar Url","n":"avatarUrl","r":false,"sh":"URL of the user's avatar image","t":"`$STRING`","key$":"avatarUrl","index$":0},"bio":{"a":true,"h":"Bio","n":"bio","op":{"create":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Bio","t":"`$STRING`","key$":"bio","index$":1},"createdDate":{"a":true,"h":"Created Date","n":"createdDate","r":true,"t":"`$STRING`","key$":"createdDate","index$":2},"defaultScheduleId":{"a":true,"h":"Default Schedule Id","n":"defaultScheduleId","op":{"update":{"req":false,"type":"`$NUMBER`"}},"r":true,"t":"`$NUMBER`","key$":"defaultScheduleId","index$":3},"email":{"a":true,"h":"Email","n":"email","op":{"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"email","index$":4},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$NUMBER`","key$":"id","index$":5},"locale":{"a":true,"h":"Locale","n":"locale","r":false,"t":"`$STRING`","key$":"locale","index$":6},"metadata":{"a":true,"h":"Metadata","n":"metadata","r":false,"sh":"You can store any additional data you want here.","t":"`$OBJECT`","key$":"metadata","index$":7},"name":{"a":true,"h":"Name","n":"name","op":{"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Managed user's name is used in emails","t":"`$STRING`","key$":"name","index$":8},"timeFormat":{"a":true,"h":"Time Format","n":"timeFormat","op":{"create":{"req":false,"type":"`$NUMBER`"},"update":{"req":false,"type":"`$NUMBER`"}},"r":true,"sh":"Must be a number 12 or 24","t":"`$NUMBER`","key$":"timeFormat","index$":9},"timeZone":{"a":true,"h":"Time Zone","n":"timeZone","op":{"create":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Timezone is used to create user's default schedule from Monday to Friday from 9AM to 5PM.","t":"`$STRING`","key$":"timeZone","index$":10},"username":{"a":true,"h":"Username","n":"username","r":true,"t":"`$STRING`","key$":"username","index$":11},"weekStart":{"a":true,"h":"Week Start","n":"weekStart","op":{"create":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"weekStart","index$":12}},"id":{"field":"id","name":"id"},"name":"managed_user","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/oauth-clients/{clientId}/users","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_cal_secret_key","or":"x-cal-secret-key","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"oauth_client_id","or":"clientId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/oauth-clients/{clientId}/users","q":{"exist":["oauth_client_id","x_cal_secret_key"]},"r":{"param":{"clientId":"oauth_client_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"oauth-clients"},{"var":"oauth_client_id"},{"lit":"users"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/oauth-clients/{clientId}/users","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_cal_secret_key","or":"x-cal-secret-key","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"oauth_client_id","or":"clientId","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"?emails=email1@example.com,email2@example.com","k":"query","n":"email","or":"emails","r":false,"t":"`$ARRAY`","index$":0},{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$NUMBER`","index$":1},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$NUMBER`","index$":2}]},"k":"http","m":"GET","o":"/v2/oauth-clients/{clientId}/users","q":{"exist":["oauth_client_id","x_cal_secret_key"]},"r":{"param":{"clientId":"oauth_client_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"oauth-clients"},{"var":"oauth_client_id"},{"lit":"users"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/oauth-clients/{clientId}/users/{userId}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_cal_secret_key","or":"x-cal-secret-key","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"userId","r":true,"t":"`$NUMBER`","index$":0},{"a":true,"k":"param","n":"oauth_client_id","or":"clientId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v2/oauth-clients/{clientId}/users/{userId}","q":{"exist":["id","oauth_client_id","x_cal_secret_key"]},"r":{"param":{"clientId":"oauth_client_id","userId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"oauth-clients"},{"var":"oauth_client_id"},{"lit":"users"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/oauth-clients/{clientId}/users/{userId}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_cal_secret_key","or":"x-cal-secret-key","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"userId","r":true,"t":"`$NUMBER`","index$":0},{"a":true,"k":"param","n":"oauth_client_id","or":"clientId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/v2/oauth-clients/{clientId}/users/{userId}","q":{"exist":["id","oauth_client_id","x_cal_secret_key"]},"r":{"param":{"clientId":"oauth_client_id","userId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"oauth-clients"},{"var":"oauth_client_id"},{"lit":"users"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PATCH /v2/oauth-clients/{clientId}/users/{userId}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_cal_secret_key","or":"x-cal-secret-key","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"userId","r":true,"t":"`$NUMBER`","index$":0},{"a":true,"k":"param","n":"oauth_client_id","or":"clientId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/v2/oauth-clients/{clientId}/users/{userId}","q":{"exist":["id","oauth_client_id","x_cal_secret_key"]},"r":{"param":{"clientId":"oauth_client_id","userId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"oauth-clients"},{"var":"oauth_client_id"},{"lit":"users"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.oauth_client"]]},"key$":"managed_user","name__orig":"managed_user","Name":"ManagedUser","name_":"managed_user","name-":"managed-user","NAME":"MANAGED_USER","index$":9}, {"active":true,"entity":"managed_user","key$":"BasicManagedUserFlow","kind":"basic","name":"BasicManagedUserFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"managed_user_ref01"},"m":{"oauth_client_id":"oauth_client01"},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{},"m":{"oauth_client_id":"oauth_client01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"managed_user_ref01"}}]},{"a":true,"d":{"oauth_client_id":"oauth_client01"},"i":{"ref":"managed_user_ref01","srcdatavar":"managed_user_ref01_data","suffix":"_up0","textfield":"avatarUrl"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-managed_user_ref01"}}],"v":[]},{"a":true,"d":{},"i":{"ref":"managed_user_ref01","srcdatavar":"managed_user_ref01_data","suffix":"_dt0"},"m":{"id":"managed_user01","oauth_client_id":"oauth_client01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-managed_user_ref01"}}]},{"a":true,"d":{},"i":{"ref":"managed_user_ref01","suffix":"_rm0"},"m":{"id":"managed_user01","oauth_client_id":"oauth_client01"},"o":"remove","s":[],"v":[]},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"oauth_client_id":"oauth_client01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"managed_user_ref01"}}]}]}, 'ManagedUser', {"POST /v2/oauth-clients/{clientId}/users":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"email":{"type":"string","example":"alice@example.com","key$":"email"},"name":{"type":"string","example":"Alice Smith","description":"Managed user's name is used in emails","key$":"name"},"timeFormat":{"type":"number","enum":[12,24],"example":12,"description":"Must be a number 12 or 24","key$":"timeFormat"},"weekStart":{"type":"string","example":"Monday","enum":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"key$":"weekStart"},"timeZone":{"type":"string","example":"America/New_York","description":"Timezone is used to create user's default schedule from Monday to Friday from 9AM to 5PM. If it is not passed then user does not have\n      a default schedule and it must be created manually via the /schedules endpoint. Until the schedule is created, the user can't access availability atom to set his / her availability nor booked.\n      It will default to Europe/London if not passed.","key$":"timeZone"},"locale":{"enum":["ar","ca","de","es","eu","he","id","ja","lv","pl","ro","sr","th","vi","az","cs","el","es-419","fi","hr","it","km","nl","pt","ru","sv","tr","zh-CN","bg","da","en","et","fr","hu","iw","ko","no","pt-BR","sk","ta","uk","zh-TW","bn"],"type":"string","example":"en","key$":"locale"},"avatarUrl":{"type":"string","example":"https://cal.com/api/avatar/2b735186-b01b-46d3-87da-019b8f61776b.png","description":"URL of the user's avatar image","key$":"avatarUrl"},"bio":{"type":"string","description":"Bio","example":"I am a bio","key$":"bio"},"metadata":{"type":"object","description":"You can store any additional data you want here. Metadata must have at most 50 keys, each key up to 40 characters, and values up to 500 characters.","example":{"key":"value"},"key$":"metadata"}},"required":["email","name"],"x-ref":"#/components/schemas/CreateManagedUserInput","index$":1}}}},"parameters":[{"name":"x-cal-secret-key","in":"header","description":"OAuth client secret key","required":true,"schema":{"type":"string"},"index$":0},{"name":"clientId","required":true,"in":"path","schema":{"type":"string"},"index$":1}]},"GET /v2/oauth-clients/{clientId}/users":{"protocol":"http","parameters":[{"name":"x-cal-secret-key","in":"header","description":"OAuth client secret key","required":true,"schema":{"type":"string"},"index$":0},{"name":"clientId","required":true,"in":"path","schema":{"type":"string"},"index$":1},{"name":"limit","required":false,"in":"query","description":"The number of items to return","schema":{"example":10,"type":"number"},"index$":2},{"name":"offset","required":false,"in":"query","description":"The number of items to skip","schema":{"example":0,"type":"number"},"index$":3},{"name":"emails","required":false,"in":"query","description":"Filter managed users by email. If you want to filter by multiple emails, separate them with a comma.","schema":{"example":"?emails=email1@example.com,email2@example.com","type":"array","items":{"type":"string"}},"index$":4}]},"GET /v2/oauth-clients/{clientId}/users/{userId}":{"protocol":"http","parameters":[{"name":"x-cal-secret-key","in":"header","description":"OAuth client secret key","required":true,"schema":{"type":"string"},"index$":0},{"name":"clientId","required":true,"in":"path","schema":{"type":"string"},"index$":1},{"name":"userId","required":true,"in":"path","schema":{"type":"number"},"index$":2}]},"DELETE /v2/oauth-clients/{clientId}/users/{userId}":{"protocol":"http","parameters":[{"name":"x-cal-secret-key","in":"header","description":"OAuth client secret key","required":true,"schema":{"type":"string"},"index$":0},{"name":"clientId","required":true,"in":"path","schema":{"type":"string"},"index$":1},{"name":"userId","required":true,"in":"path","schema":{"type":"number"},"index$":2}]},"PATCH /v2/oauth-clients/{clientId}/users/{userId}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"email":{"type":"string","key$":"email"},"name":{"type":"string","key$":"name"},"timeFormat":{"type":"number","enum":[12,24],"example":12,"description":"Must be 12 or 24","key$":"timeFormat"},"defaultScheduleId":{"type":"number","key$":"defaultScheduleId"},"weekStart":{"type":"string","enum":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"example":"Monday","key$":"weekStart"},"timeZone":{"type":"string","key$":"timeZone"},"locale":{"enum":["ar","ca","de","es","eu","he","id","ja","lv","pl","ro","sr","th","vi","az","cs","el","es-419","fi","hr","it","km","nl","pt","ru","sv","tr","zh-CN","bg","da","en","et","fr","hu","iw","ko","no","pt-BR","sk","ta","uk","zh-TW","bn"],"type":"string","example":"en","key$":"locale"},"avatarUrl":{"type":"string","example":"https://cal.com/api/avatar/2b735186-b01b-46d3-87da-019b8f61776b.png","description":"URL of the user's avatar image","key$":"avatarUrl"},"bio":{"type":"string","description":"Bio","example":"I am a bio","key$":"bio"},"metadata":{"type":"object","description":"You can store any additional data you want here. Metadata must have at most 50 keys, each key up to 40 characters, and values up to 500 characters.","example":{"key":"value"},"key$":"metadata"}},"x-ref":"#/components/schemas/UpdateManagedUserInput","index$":1}}}},"parameters":[{"name":"x-cal-secret-key","in":"header","description":"OAuth client secret key","required":true,"schema":{"type":"string"},"index$":0},{"name":"clientId","required":true,"in":"path","schema":{"type":"string"},"index$":1},{"name":"userId","required":true,"in":"path","schema":{"type":"number"},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const managed_user_ref01_ent = client.ManagedUser()
    let managed_user_ref01_data = setup.data.new.managed_user['managed_user_ref01']
    managed_user_ref01_data['oauth_client_id'] = setup.idmap['oauth_client01']

    managed_user_ref01_data = (await managed_user_ref01_ent.create(managed_user_ref01_data)).data()
    assert(null != managed_user_ref01_data.id)


    // LIST
    const managed_user_ref01_match: any = {}
    managed_user_ref01_match['oauth_client_id'] = setup.idmap['oauth_client01']

    const managed_user_ref01_list = (await managed_user_ref01_ent.list(managed_user_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(managed_user_ref01_list, { id: managed_user_ref01_data.id })))


    // UPDATE
    const managed_user_ref01_data_up0: any = {}
    managed_user_ref01_data_up0.id = managed_user_ref01_data.id
    managed_user_ref01_data_up0 ['oauth_client_id'] = setup.idmap['oauth_client_id']

    const managed_user_ref01_markdef_up0 = { name: 'avatarUrl', value: 'Mark01-managed_user_ref01_' + setup.now }
    ;(managed_user_ref01_data_up0 as any)[managed_user_ref01_markdef_up0.name] = managed_user_ref01_markdef_up0.value

    const managed_user_ref01_resdata_up0 = (await managed_user_ref01_ent.update(managed_user_ref01_data_up0)).data()
    assert(managed_user_ref01_resdata_up0.id === managed_user_ref01_data_up0.id)

    assert((managed_user_ref01_resdata_up0 as any)[managed_user_ref01_markdef_up0.name] === managed_user_ref01_markdef_up0.value)


    // LOAD
    const managed_user_ref01_match_dt0: any = {}
    managed_user_ref01_match_dt0.id = managed_user_ref01_data.id
    const managed_user_ref01_data_dt0 = (await managed_user_ref01_ent.load(managed_user_ref01_match_dt0)).data()
    assert(managed_user_ref01_data_dt0.id === managed_user_ref01_data.id)


    // REMOVE
    const managed_user_ref01_match_rm0: any = { id: managed_user_ref01_data.id }
    await managed_user_ref01_ent.remove(managed_user_ref01_match_rm0)
  

    // LIST
    const managed_user_ref01_match_rt0: any = {}
    managed_user_ref01_match_rt0['oauth_client_id'] = setup.idmap['oauth_client01']

    const managed_user_ref01_list_rt0 = (await managed_user_ref01_ent.list(managed_user_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(managed_user_ref01_list_rt0, { id: managed_user_ref01_data.id })))


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
      '../../../../.sdk/test/entity/managed_user/ManagedUserTestData.json')

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
    ['managed_user01','managed_user02','managed_user03','oauth_client01','oauth_client02','oauth_client03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CAL_TEST_MANAGED_USER_ENTID': idmap,
    'CAL_TEST_LIVE': 'FALSE',
    'CAL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CAL_TEST_MANAGED_USER_ENTID']

  const live = 'TRUE' === env.CAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CAL_TEST_MANAGED_USER_ENTID']
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
  
