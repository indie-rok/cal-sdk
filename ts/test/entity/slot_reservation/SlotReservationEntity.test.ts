

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


describe('SlotReservationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('CAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CalSDK.test()
    const ent = testsdk.SlotReservation()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.SlotReservation().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CAL_TEST_LIVE
    for (const op of ['create', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'slot_reservation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"eventTypeId":{"a":true,"h":"Event Type Id","n":"eventTypeId","r":true,"sh":"The ID of the event type for which slot should be reserved.","t":"`$NUMBER`","key$":"eventTypeId","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"reservationDuration":{"a":true,"h":"Reservation Duration","n":"reservationDuration","op":{"update":{"req":true,"type":"`$NUMBER`"}},"r":false,"sh":"ONLY for authenticated requests with api key, access token or OAuth credentials (ID + secret).","t":"`$NUMBER`","key$":"reservationDuration","index$":2},"reservationUid":{"a":true,"h":"Reservation Uid","n":"reservationUid","r":true,"sh":"The unique identifier of the reservation.","t":"`$STRING`","key$":"reservationUid","index$":3},"reservationUntil":{"a":true,"h":"Reservation Until","n":"reservationUntil","r":true,"sh":"ISO 8601 datestring in UTC timezone representing time until which the slot is reserved.","t":"`$STRING`","key$":"reservationUntil","index$":4},"slotDuration":{"a":true,"h":"Slot Duration","n":"slotDuration","op":{"update":{"req":true,"type":"`$NUMBER`"}},"r":false,"sh":"By default slot duration is equal to event type length, but if you want to reserve a slot for an event type that has a variable length you can specify it here as a number in minutes.","t":"`$NUMBER`","key$":"slotDuration","index$":5},"slotEnd":{"a":true,"h":"Slot End","n":"slotEnd","r":true,"sh":"ISO 8601 datestring in UTC timezone representing slot end.","t":"`$STRING`","key$":"slotEnd","index$":6},"slotStart":{"a":true,"h":"Slot Start","n":"slotStart","r":true,"sh":"ISO 8601 datestring in UTC timezone representing available slot.","t":"`$STRING`","key$":"slotStart","index$":7}},"id":{"field":"id","name":"id"},"name":"slot_reservation","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/slots/reservations","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"2024-09-04","k":"header","n":"cal_api_version","or":"cal-api-version","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"header","n":"x_cal_client_id","or":"x-cal-client-id","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/v2/slots/reservations","q":{"exist":["cal_api_version"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"slots"},{"lit":"reservations"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/slots/reservations/{uid}","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"2024-09-04","k":"header","n":"cal_api_version","or":"cal-api-version","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"uid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/slots/reservations/{uid}","q":{"exist":["cal_api_version","id"]},"r":{"param":{"uid":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"slots"},{"lit":"reservations"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/slots/reservations/{uid}","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"2024-09-04","k":"header","n":"cal_api_version","or":"cal-api-version","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"uid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/slots/reservations/{uid}","q":{"exist":["cal_api_version","id"]},"r":{"param":{"uid":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"slots"},{"lit":"reservations"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PATCH /v2/slots/reservations/{uid}","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"2024-09-04","k":"header","n":"cal_api_version","or":"cal-api-version","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"uid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/v2/slots/reservations/{uid}","q":{"exist":["cal_api_version","id"]},"r":{"param":{"uid":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"slots"},{"lit":"reservations"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"slot_reservation","name__orig":"slot_reservation","Name":"SlotReservation","name_":"slot_reservation","name-":"slot-reservation","NAME":"SLOT_RESERVATION","index$":18}, {"active":true,"entity":"slot_reservation","key$":"BasicSlotReservationFlow","kind":"basic","name":"BasicSlotReservationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"slot_reservation_ref01"},"m":{},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{"ref":"slot_reservation_ref01","srcdatavar":"slot_reservation_ref01_data","suffix":"_up0","textfield":"reservationUid"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-slot_reservation_ref01"}}],"v":[]},{"a":true,"d":{},"i":{"ref":"slot_reservation_ref01","srcdatavar":"slot_reservation_ref01_data","suffix":"_dt0"},"m":{"id":"slot_reservation01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-slot_reservation_ref01"}}]},{"a":true,"d":{},"i":{"ref":"slot_reservation_ref01","suffix":"_rm0"},"m":{"id":"slot_reservation01"},"o":"remove","s":[],"v":[]}]}, 'SlotReservation', {"POST /v2/slots/reservations":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"eventTypeId":{"type":"number","example":1,"description":"The ID of the event type for which slot should be reserved.","key$":"eventTypeId"},"slotStart":{"type":"string","example":"2024-09-04T09:00:00Z","description":"ISO 8601 datestring in UTC timezone representing available slot.","key$":"slotStart"},"slotDuration":{"type":"number","example":"30","description":"By default slot duration is equal to event type length, but if you want to reserve a slot for an event type that has a variable length you can specify it here as a number in minutes. If you don't have this set explicitly that event type can have one of many lengths you can omit this.","key$":"slotDuration"},"reservationDuration":{"type":"number","example":5,"description":"ONLY for authenticated requests with api key, access token or OAuth credentials (ID + secret).\n      \n      For how many minutes the slot should be reserved - for this long time noone else can book this event type at `start` time. If not provided, defaults to 5 minutes.","key$":"reservationDuration"}},"required":["eventTypeId","slotStart"],"x-ref":"#/components/schemas/ReserveSlotInput_2024_09_04","index$":1}}}},"parameters":[{"name":"cal-api-version","in":"header","description":"Must be set to 2024-09-04. If not set to this value, the endpoint will default to an older version.","required":true,"schema":{"type":"string","default":"2024-09-04"},"index$":0},{"name":"Authorization","in":"header","description":"value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token","required":false,"schema":{"type":"string"},"index$":1},{"name":"x-cal-client-id","in":"header","description":"For platform customers - OAuth client ID","required":false,"schema":{"type":"string"},"index$":2}]},"GET /v2/slots/reservations/{uid}":{"protocol":"http","parameters":[{"name":"cal-api-version","in":"header","description":"Must be set to 2024-09-04. If not set to this value, the endpoint will default to an older version.","required":true,"schema":{"type":"string","default":"2024-09-04"},"index$":0},{"name":"uid","required":true,"in":"path","schema":{"type":"string"},"index$":1}]},"DELETE /v2/slots/reservations/{uid}":{"protocol":"http","parameters":[{"name":"cal-api-version","in":"header","description":"Must be set to 2024-09-04. If not set to this value, the endpoint will default to an older version.","required":true,"schema":{"type":"string","default":"2024-09-04"},"index$":0},{"name":"uid","required":true,"in":"path","schema":{"type":"string"},"index$":1}]},"PATCH /v2/slots/reservations/{uid}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"eventTypeId":{"type":"number","example":1,"description":"The ID of the event type for which slot should be reserved.","key$":"eventTypeId"},"slotStart":{"type":"string","example":"2024-09-04T09:00:00Z","description":"ISO 8601 datestring in UTC timezone representing available slot.","key$":"slotStart"},"slotDuration":{"type":"number","example":"30","description":"By default slot duration is equal to event type length, but if you want to reserve a slot for an event type that has a variable length you can specify it here as a number in minutes. If you don't have this set explicitly that event type can have one of many lengths you can omit this.","key$":"slotDuration"},"reservationDuration":{"type":"number","example":5,"description":"ONLY for authenticated requests with api key, access token or OAuth credentials (ID + secret).\n      \n      For how many minutes the slot should be reserved - for this long time noone else can book this event type at `start` time. If not provided, defaults to 5 minutes.","key$":"reservationDuration"}},"required":["eventTypeId","slotStart"],"x-ref":"#/components/schemas/ReserveSlotInput_2024_09_04","index$":1}}}},"parameters":[{"name":"cal-api-version","in":"header","description":"Must be set to 2024-09-04. If not set to this value, the endpoint will default to an older version.","required":true,"schema":{"type":"string","default":"2024-09-04"},"index$":0},{"name":"uid","required":true,"in":"path","schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const slot_reservation_ref01_ent = client.SlotReservation()
    let slot_reservation_ref01_data = setup.data.new.slot_reservation['slot_reservation_ref01']

    slot_reservation_ref01_data = (await slot_reservation_ref01_ent.create(slot_reservation_ref01_data)).data()
    assert(null != slot_reservation_ref01_data.id)


    // UPDATE
    const slot_reservation_ref01_data_up0: any = {}
    slot_reservation_ref01_data_up0.id = slot_reservation_ref01_data.id

    const slot_reservation_ref01_markdef_up0 = { name: 'reservationUid', value: 'Mark01-slot_reservation_ref01_' + setup.now }
    ;(slot_reservation_ref01_data_up0 as any)[slot_reservation_ref01_markdef_up0.name] = slot_reservation_ref01_markdef_up0.value

    const slot_reservation_ref01_resdata_up0 = (await slot_reservation_ref01_ent.update(slot_reservation_ref01_data_up0)).data()
    assert(slot_reservation_ref01_resdata_up0.id === slot_reservation_ref01_data_up0.id)

    assert((slot_reservation_ref01_resdata_up0 as any)[slot_reservation_ref01_markdef_up0.name] === slot_reservation_ref01_markdef_up0.value)


    // LOAD
    const slot_reservation_ref01_match_dt0: any = {}
    slot_reservation_ref01_match_dt0.id = slot_reservation_ref01_data.id
    const slot_reservation_ref01_data_dt0 = (await slot_reservation_ref01_ent.load(slot_reservation_ref01_match_dt0)).data()
    assert(slot_reservation_ref01_data_dt0.id === slot_reservation_ref01_data.id)


    // REMOVE
    const slot_reservation_ref01_match_rm0: any = { id: slot_reservation_ref01_data.id }
    await slot_reservation_ref01_ent.remove(slot_reservation_ref01_match_rm0)
  

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
      '../../../../.sdk/test/entity/slot_reservation/SlotReservationTestData.json')

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
    ['slot_reservation01','slot_reservation02','slot_reservation03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CAL_TEST_SLOT_RESERVATION_ENTID': idmap,
    'CAL_TEST_LIVE': 'FALSE',
    'CAL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CAL_TEST_SLOT_RESERVATION_ENTID']

  const live = 'TRUE' === env.CAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CAL_TEST_SLOT_RESERVATION_ENTID']
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
  
