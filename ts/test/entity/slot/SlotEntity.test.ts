

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


describe('SlotEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('CAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CalSDK.test()
    const ent = testsdk.Slot()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Slot().load({"booking_uid_to_reschedule":1,"end":"x","start":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CAL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'slot.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"slot","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/slots","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"2024-09-04","k":"header","n":"cal_api_version","or":"cal-api-version","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"abc123def456","k":"query","n":"booking_uid_to_reschedule","or":"bookingUidToReschedule","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"60","k":"query","n":"duration","or":"duration","r":false,"t":"`$NUMBER`","index$":1},{"a":true,"ex":"2050-09-06","k":"query","n":"end","or":"end","r":true,"t":"`$STRING`","index$":2},{"a":true,"ex":"100","k":"query","n":"event_type_id","or":"eventTypeId","r":false,"t":"`$NUMBER`","index$":3},{"a":true,"ex":"event-type-slug","k":"query","n":"event_type_slug","or":"eventTypeSlug","r":false,"t":"`$STRING`","index$":4},{"a":true,"ex":"range","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":5},{"a":true,"ex":"org-slug","k":"query","n":"organization_slug","or":"organizationSlug","r":false,"t":"`$STRING`","index$":6},{"a":true,"ex":"2050-09-05","k":"query","n":"start","or":"start","r":true,"t":"`$STRING`","index$":7},{"a":true,"ex":"team-slug","k":"query","n":"team_slug","or":"teamSlug","r":false,"t":"`$STRING`","index$":8},{"a":true,"ex":"Europe/Rome","k":"query","n":"time_zone","or":"timeZone","r":false,"t":"`$STRING`","index$":9},{"a":true,"ex":"bob","k":"query","n":"username","or":"username","r":false,"t":"`$STRING`","index$":10},{"a":true,"ex":"alice,bob","k":"query","n":"username","or":"usernames","r":false,"t":"`$STRING`","index$":11}]},"k":"http","m":"GET","o":"/v2/slots","q":{"exist":["cal_api_version","end","start"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"slots"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"slot","name__orig":"slot","Name":"Slot","name_":"slot","name-":"slot","NAME":"SLOT","index$":17}, {"active":true,"entity":"slot","key$":"BasicSlotFlow","kind":"basic","name":"BasicSlotFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"slot_ref01","srcdatavar":"slot_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-slot_ref01"}}]}]}, 'Slot', {"GET /v2/slots":{"protocol":"http","parameters":[{"name":"cal-api-version","in":"header","description":"Must be set to 2024-09-04. If not set to this value, the endpoint will default to an older version.","required":true,"schema":{"type":"string","default":"2024-09-04"},"index$":0},{"name":"bookingUidToReschedule","required":false,"in":"query","description":"The unique identifier of the booking being rescheduled. When provided will ensure that the original booking time appears within the returned available slots when rescheduling.","schema":{"example":"abc123def456","type":"string"},"index$":1},{"name":"start","required":true,"in":"query","description":"\n      Time starting from which available slots should be checked.\n\n      Must be in UTC timezone as ISO 8601 datestring.\n\n      You can pass date without hours which defaults to start of day or specify hours:\n      2024-08-13 (will have hours 00:00:00 aka at very beginning of the date) or you can specify hours manually like 2024-08-13T09:00:00Z.","schema":{"example":"2050-09-05","type":"string"},"index$":2},{"name":"end","required":true,"in":"query","description":"\n    Time until which available slots should be checked.\n\n    Must be in UTC timezone as ISO 8601 datestring.\n\n    You can pass date without hours which defaults to end of day or specify hours:\n    2024-08-20 (will have hours 23:59:59 aka at the very end of the date) or you can specify hours manually like 2024-08-20T18:00:00Z.","schema":{"example":"2050-09-06","type":"string"},"index$":3},{"name":"organizationSlug","required":false,"in":"query","description":"The slug of the organization to which user with username belongs or team with teamSlug belongs.","schema":{"example":"org-slug","type":"string"},"index$":4},{"name":"teamSlug","required":false,"in":"query","description":"The slug of the team who owns event type with eventTypeSlug - used when slots are checked for team event type.","schema":{"example":"team-slug","type":"string"},"index$":5},{"name":"username","required":false,"in":"query","description":"The username of the user who owns event type with eventTypeSlug - used when slots are checked for individual user event type.","schema":{"example":"bob","type":"string"},"index$":6},{"name":"eventTypeSlug","required":false,"in":"query","description":"The slug of the event type for which available slots should be checked. If slug is provided then username or teamSlug must be provided too and if relevant organizationSlug too.","schema":{"example":"event-type-slug","type":"string"},"index$":7},{"name":"eventTypeId","required":false,"in":"query","description":"The ID of the event type for which available slots should be checked.","schema":{"example":"100","type":"number"},"index$":8},{"name":"usernames","required":false,"in":"query","description":"The usernames for which available slots should be checked separated by a comma.\n\n    Checking slots by usernames is used mainly for dynamic events where there is no specific event but we just want to know when 2 or more people are available.\n\n    Must contain at least 2 usernames.","schema":{"example":"alice,bob","type":"string"},"index$":9},{"name":"format","required":false,"in":"query","description":"Format of slot times in response. Use 'range' to get start and end times. Use 'time' or omit this query parameter to get only start time.","schema":{"example":"range","type":"string"},"index$":10},{"name":"duration","required":false,"in":"query","description":"If event type has multiple possible durations then you can specify the desired duration here. Also, if you are fetching slots for a dynamic event then you can specify the duration her which defaults to 30, meaning that returned slots will be each 30 minutes long.","schema":{"example":"60","type":"number"},"index$":11},{"name":"timeZone","required":false,"in":"query","description":"Time zone in which the available slots should be returned. Defaults to UTC.","schema":{"example":"Europe/Rome","type":"string"},"index$":12}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let slot_ref01_data = Object.values(setup.data.existing.slot)[0] as any

    // LOAD
    const slot_ref01_ent = client.Slot()
    const slot_ref01_match_dt0: any = {}
    const slot_ref01_data_dt0 = (await slot_ref01_ent.load(slot_ref01_match_dt0)).data()
    assert(null != slot_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/slot/SlotTestData.json')

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
    ['slot01','slot02','slot03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CAL_TEST_SLOT_ENTID': idmap,
    'CAL_TEST_LIVE': 'FALSE',
    'CAL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CAL_TEST_SLOT_ENTID']

  const live = 'TRUE' === env.CAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CAL_TEST_SLOT_ENTID']
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
  
