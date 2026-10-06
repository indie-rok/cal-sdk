

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


describe('MeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('CAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CalSDK.test()
    const ent = testsdk.Me()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Me().load({"avatarUrl":1,"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CAL_TEST_LIVE
    for (const op of ['update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'me.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"avatarUrl":{"a":true,"h":"Avatar Url","n":"avatarUrl","op":{"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"URL of the user's avatar image","t":"`$STRING`","key$":"avatarUrl","index$":0},"bio":{"a":true,"h":"Bio","n":"bio","op":{"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Bio","t":"`$STRING`","key$":"bio","index$":1},"defaultScheduleId":{"a":true,"h":"Default Schedule Id","n":"defaultScheduleId","op":{"update":{"req":false,"type":"`$NUMBER`"}},"r":true,"t":"`$NUMBER`","key$":"defaultScheduleId","index$":2},"email":{"a":true,"h":"Email","n":"email","op":{"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"email","index$":3},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$NUMBER`","key$":"id","index$":4},"locale":{"a":true,"h":"Locale","n":"locale","r":false,"t":"`$STRING`","key$":"locale","index$":5},"metadata":{"a":true,"h":"Metadata","n":"metadata","r":false,"sh":"You can store any additional data you want here.","t":"`$OBJECT`","key$":"metadata","index$":6},"name":{"a":true,"h":"Name","n":"name","op":{"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"name","index$":7},"organization":{"a":true,"h":"Organization","n":"organization","r":true,"t":"`$OBJECT`","key$":"organization","index$":8},"organizationId":{"a":true,"h":"Organization Id","n":"organizationId","r":true,"t":"`$NUMBER`","key$":"organizationId","index$":9},"timeFormat":{"a":true,"h":"Time Format","n":"timeFormat","op":{"update":{"req":false,"type":"`$NUMBER`"}},"r":true,"sh":"Must be 12 or 24","t":"`$NUMBER`","key$":"timeFormat","index$":10},"timeZone":{"a":true,"h":"Time Zone","n":"timeZone","op":{"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"timeZone","index$":11},"username":{"a":true,"h":"Username","n":"username","r":true,"t":"`$STRING`","key$":"username","index$":12},"weekStart":{"a":true,"h":"Week Start","n":"weekStart","op":{"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"weekStart","index$":13}},"id":{"field":"id","name":"id"},"name":"me","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/me","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/me","q":{"exist":["authorization"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"me"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PATCH /v2/me","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/v2/me","q":{"exist":["authorization"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"me"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"me","name__orig":"me","Name":"Me","name_":"me","name-":"me","NAME":"ME","index$":10}, {"active":true,"entity":"me","key$":"BasicMeFlow","kind":"basic","name":"BasicMeFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"me_ref01","srcdatavar":"me_ref01_data","suffix":"_up0","textfield":"avatarUrl"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-me_ref01"}}],"v":[]},{"a":true,"d":{},"i":{"ref":"me_ref01","srcdatavar":"me_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-me_ref01"}}]}]}, 'Me', {"GET /v2/me":{"protocol":"http","parameters":[{"name":"Authorization","in":"header","description":"value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token","required":true,"schema":{"type":"string"},"index$":0}]},"PATCH /v2/me":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"email":{"type":"string","key$":"email"},"name":{"type":"string","key$":"name"},"timeFormat":{"type":"number","enum":[12,24],"example":12,"description":"Must be 12 or 24","key$":"timeFormat"},"defaultScheduleId":{"type":"number","key$":"defaultScheduleId"},"weekStart":{"type":"string","enum":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"example":"Monday","key$":"weekStart"},"timeZone":{"type":"string","key$":"timeZone"},"locale":{"enum":["ar","ca","de","es","eu","he","id","ja","lv","pl","ro","sr","th","vi","az","cs","el","es-419","fi","hr","it","km","nl","pt","ru","sv","tr","zh-CN","bg","da","en","et","fr","hu","iw","ko","no","pt-BR","sk","ta","uk","zh-TW","bn"],"type":"string","example":"en","key$":"locale"},"avatarUrl":{"type":"string","example":"https://cal.com/api/avatar/2b735186-b01b-46d3-87da-019b8f61776b.png","description":"URL of the user's avatar image","key$":"avatarUrl"},"bio":{"type":"string","description":"Bio","example":"I am a bio","key$":"bio"},"metadata":{"type":"object","description":"You can store any additional data you want here. Metadata must have at most 50 keys, each key up to 40 characters, and values up to 500 characters.","example":{"key":"value"},"key$":"metadata"}},"x-ref":"#/components/schemas/UpdateManagedUserInput","index$":1}}}},"parameters":[{"name":"Authorization","in":"header","description":"value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let me_ref01_data = Object.values(setup.data.existing.me)[0] as any

    // UPDATE
    const me_ref01_ent = client.Me()
    const me_ref01_data_up0: any = {}
    me_ref01_data_up0.id = me_ref01_data.id

    const me_ref01_markdef_up0 = { name: 'avatarUrl', value: 'Mark01-me_ref01_' + setup.now }
    ;(me_ref01_data_up0 as any)[me_ref01_markdef_up0.name] = me_ref01_markdef_up0.value

    const me_ref01_resdata_up0 = (await me_ref01_ent.update(me_ref01_data_up0)).data()
    assert(me_ref01_resdata_up0.id === me_ref01_data_up0.id)

    assert((me_ref01_resdata_up0 as any)[me_ref01_markdef_up0.name] === me_ref01_markdef_up0.value)


    // LOAD
    const me_ref01_match_dt0: any = {}
    me_ref01_match_dt0.id = me_ref01_data.id
    const me_ref01_data_dt0 = (await me_ref01_ent.load(me_ref01_match_dt0)).data()
    assert(me_ref01_data_dt0.id === me_ref01_data.id)


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
      '../../../../.sdk/test/entity/me/MeTestData.json')

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
    ['me01','me02','me03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CAL_TEST_ME_ENTID': idmap,
    'CAL_TEST_LIVE': 'FALSE',
    'CAL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CAL_TEST_ME_ENTID']

  const live = 'TRUE' === env.CAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CAL_TEST_ME_ENTID']
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
  
