

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


describe('AttendeeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('CAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CalSDK.test()
    const ent = testsdk.Attendee()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Attendee().list({"booking_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CAL_TEST_LIVE
    for (const op of ['create', 'list', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'attendee.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"absent":{"a":true,"h":"Absent","n":"absent","r":true,"t":"`$BOOLEAN`","key$":"absent","index$":0},"displayEmail":{"a":true,"h":"Display Email","n":"displayEmail","r":true,"sh":"Clean email for display purposes","t":"`$STRING`","key$":"displayEmail","index$":1},"email":{"a":true,"h":"Email","n":"email","r":true,"sh":"The email of the attendee.","t":"`$STRING`","key$":"email","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$NUMBER`","key$":"id","index$":3},"language":{"a":true,"h":"Language","n":"language","r":false,"sh":"The preferred language of the attendee.","t":"`$STRING`","key$":"language","index$":4},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"The name of the attendee.","t":"`$STRING`","key$":"name","index$":5},"phoneNumber":{"a":true,"h":"Phone Number","n":"phoneNumber","r":false,"sh":"The phone number of the attendee in international format.","t":"`$STRING`","key$":"phoneNumber","index$":6},"timeZone":{"a":true,"h":"Time Zone","n":"timeZone","r":true,"sh":"The time zone of the attendee.","t":"`$STRING`","key$":"timeZone","index$":7}},"id":{"field":"id","name":"id"},"name":"attendee","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/bookings/{bookingUid}/attendees","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"header","n":"cal_api_version","or":"cal-api-version","r":true,"t":"`$STRING`","index$":1}],"params":[{"a":true,"k":"param","n":"booking_id","or":"bookingUid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/bookings/{bookingUid}/attendees","q":{"exist":["authorization","booking_id","cal_api_version"]},"r":{"param":{"bookingUid":"booking_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"bookings"},{"var":"booking_id"},{"lit":"attendees"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/bookings/{bookingUid}/attendees","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"header","n":"cal_api_version","or":"cal-api-version","r":true,"t":"`$STRING`","index$":1}],"params":[{"a":true,"k":"param","n":"booking_id","or":"bookingUid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/bookings/{bookingUid}/attendees","q":{"exist":["authorization","booking_id","cal_api_version"]},"r":{"param":{"bookingUid":"booking_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"bookings"},{"var":"booking_id"},{"lit":"attendees"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/bookings/{bookingUid}/attendees/{attendeeId}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"header","n":"cal_api_version","or":"cal-api-version","r":true,"t":"`$STRING`","index$":1}],"params":[{"a":true,"k":"param","n":"booking_id","or":"bookingUid","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"attendeeId","r":true,"t":"`$NUMBER`","index$":1}]},"k":"http","m":"GET","o":"/v2/bookings/{bookingUid}/attendees/{attendeeId}","q":{"exist":["authorization","booking_id","cal_api_version","id"]},"r":{"param":{"attendeeId":"id","bookingUid":"booking_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"bookings"},{"var":"booking_id"},{"lit":"attendees"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/bookings/{bookingUid}/attendees/{attendeeId}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"header","n":"cal_api_version","or":"cal-api-version","r":true,"t":"`$STRING`","index$":1}],"params":[{"a":true,"k":"param","n":"booking_id","or":"bookingUid","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"attendeeId","r":true,"t":"`$NUMBER`","index$":1}]},"k":"http","m":"DELETE","o":"/v2/bookings/{bookingUid}/attendees/{attendeeId}","q":{"exist":["authorization","booking_id","cal_api_version","id"]},"r":{"param":{"attendeeId":"id","bookingUid":"booking_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"bookings"},{"var":"booking_id"},{"lit":"attendees"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[["$.main.kit.entity.booking"]]},"key$":"attendee","name__orig":"attendee","Name":"Attendee","name_":"attendee","name-":"attendee","NAME":"ATTENDEE","index$":1}, {"active":true,"entity":"attendee","key$":"BasicAttendeeFlow","kind":"basic","name":"BasicAttendeeFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"attendee_ref01"},"m":{"booking_id":"booking01"},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{},"m":{"booking_id":"booking01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"attendee_ref01"}}]},{"a":true,"d":{},"i":{"ref":"attendee_ref01","srcdatavar":"attendee_ref01_data","suffix":"_dt0"},"m":{"booking_id":"booking01","id":"attendee01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-attendee_ref01"}}]},{"a":true,"d":{},"i":{"ref":"attendee_ref01","suffix":"_rm0"},"m":{"booking_id":"booking01","id":"attendee01"},"o":"remove","s":[],"v":[]},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"booking_id":"booking01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"attendee_ref01"}}]}]}, 'Attendee', {"POST /v2/bookings/{bookingUid}/attendees":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","description":"The name of the attendee.","example":"John Doe","key$":"name"},"timeZone":{"type":"string","description":"The time zone of the attendee.","example":"America/New_York","key$":"timeZone"},"phoneNumber":{"type":"string","description":"The phone number of the attendee in international format.","example":"+919876543210","key$":"phoneNumber"},"language":{"type":"string","enum":["ar","ca","de","es","eu","he","id","ja","lv","pl","ro","sr","th","vi","az","cs","el","es-419","fi","hr","it","km","nl","pt","ru","sv","tr","zh-CN","bg","da","en","et","fr","hu","iw","ko","no","pt-BR","sk","ta","uk","zh-TW","bn"],"description":"The preferred language of the attendee. Used for booking confirmation.","example":"it","default":"en","key$":"language"},"email":{"type":"string","description":"The email of the attendee.","example":"john.doe@example.com","key$":"email"}},"required":["name","timeZone","email"],"x-ref":"#/components/schemas/AddAttendeeInput_2024_08_13","index$":1}}}},"parameters":[{"name":"cal-api-version","in":"header","description":"Must be set to 2024-08-13. This header is required as this endpoint does not exist in older API versions.","required":true,"schema":{"type":"string"},"index$":0},{"name":"bookingUid","required":true,"in":"path","schema":{"type":"string"},"index$":1},{"name":"Authorization","in":"header","description":"value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token","required":true,"schema":{"type":"string"},"index$":2}]},"GET /v2/bookings/{bookingUid}/attendees":{"protocol":"http","parameters":[{"name":"cal-api-version","in":"header","description":"Must be set to 2024-08-13. This header is required as this endpoint does not exist in older API versions.","required":true,"schema":{"type":"string"},"index$":0},{"name":"bookingUid","required":true,"in":"path","schema":{"type":"string"},"index$":1},{"name":"Authorization","in":"header","description":"value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token","required":true,"schema":{"type":"string"},"index$":2}]},"GET /v2/bookings/{bookingUid}/attendees/{attendeeId}":{"protocol":"http","parameters":[{"name":"cal-api-version","in":"header","description":"Must be set to 2024-08-13. This header is required as this endpoint does not exist in older API versions.","required":true,"schema":{"type":"string"},"index$":0},{"name":"bookingUid","required":true,"in":"path","schema":{"type":"string"},"index$":1},{"name":"attendeeId","required":true,"in":"path","schema":{"type":"number"},"index$":2},{"name":"Authorization","in":"header","description":"value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token","required":true,"schema":{"type":"string"},"index$":3}]},"DELETE /v2/bookings/{bookingUid}/attendees/{attendeeId}":{"protocol":"http","parameters":[{"name":"cal-api-version","in":"header","description":"Must be set to 2024-08-13. This header is required as this endpoint does not exist in older API versions.","required":true,"schema":{"type":"string"},"index$":0},{"name":"bookingUid","required":true,"in":"path","schema":{"type":"string"},"index$":1},{"name":"attendeeId","required":true,"in":"path","schema":{"type":"number"},"index$":2},{"name":"Authorization","in":"header","description":"value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token","required":true,"schema":{"type":"string"},"index$":3}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const attendee_ref01_ent = client.Attendee()
    let attendee_ref01_data = setup.data.new.attendee['attendee_ref01']
    attendee_ref01_data['booking_id'] = setup.idmap['booking01']

    attendee_ref01_data = (await attendee_ref01_ent.create(attendee_ref01_data)).data()
    assert(null != attendee_ref01_data.id)


    // LIST
    const attendee_ref01_match: any = {}
    attendee_ref01_match['booking_id'] = setup.idmap['booking01']

    const attendee_ref01_list = (await attendee_ref01_ent.list(attendee_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(attendee_ref01_list, { id: attendee_ref01_data.id })))


    // LOAD
    const attendee_ref01_match_dt0: any = {}
    attendee_ref01_match_dt0.id = attendee_ref01_data.id
    const attendee_ref01_data_dt0 = (await attendee_ref01_ent.load(attendee_ref01_match_dt0)).data()
    assert(attendee_ref01_data_dt0.id === attendee_ref01_data.id)


    // REMOVE
    const attendee_ref01_match_rm0: any = { id: attendee_ref01_data.id }
    await attendee_ref01_ent.remove(attendee_ref01_match_rm0)
  

    // LIST
    const attendee_ref01_match_rt0: any = {}
    attendee_ref01_match_rt0['booking_id'] = setup.idmap['booking01']

    const attendee_ref01_list_rt0 = (await attendee_ref01_ent.list(attendee_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(attendee_ref01_list_rt0, { id: attendee_ref01_data.id })))


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
      '../../../../.sdk/test/entity/attendee/AttendeeTestData.json')

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
    ['attendee01','attendee02','attendee03','booking01','booking02','booking03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CAL_TEST_ATTENDEE_ENTID': idmap,
    'CAL_TEST_LIVE': 'FALSE',
    'CAL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CAL_TEST_ATTENDEE_ENTID']

  const live = 'TRUE' === env.CAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CAL_TEST_ATTENDEE_ENTID']
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
  
