

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


describe('OauthTokenEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('CAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CalSDK.test()
    const ent = testsdk.OauthToken()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.OauthToken().create({"access_token":1,"expires_in":1,"refresh_token":"x","token_type":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'oauth_token.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"access_token":{"a":true,"h":"Access Token","n":"access_token","r":true,"sh":"The access token","t":"`$STRING`","key$":"access_token","index$":0},"expires_in":{"a":true,"h":"Expires In","n":"expires_in","r":true,"sh":"The number of seconds until the access token expires","t":"`$NUMBER`","key$":"expires_in","index$":1},"refresh_token":{"a":true,"h":"Refresh Token","n":"refresh_token","r":true,"sh":"The refresh token","t":"`$STRING`","key$":"refresh_token","index$":2},"token_type":{"a":true,"h":"Token Type","n":"token_type","r":true,"sh":"The token type","t":"`$STRING`","key$":"token_type","index$":3}},"name":"oauth_token","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/oauth-clients/{clientId}/users/{userId}/force-refresh","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_cal_secret_key","or":"x-cal-secret-key","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"oauth_client_id","or":"clientId","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"user_id","or":"userId","r":true,"t":"`$NUMBER`","index$":1}]},"k":"http","m":"POST","o":"/v2/oauth-clients/{clientId}/users/{userId}/force-refresh","q":{"$action":"force_refresh","exist":["oauth_client_id","user_id","x_cal_secret_key"]},"r":{"param":{"clientId":"oauth_client_id","userId":"user_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"oauth-clients"},{"var":"oauth_client_id"},{"lit":"users"},{"var":"user_id"},{"lit":"force-refresh"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"POST /v2/oauth/{clientId}/refresh","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_cal_secret_key","or":"x-cal-secret-key","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"oauth_id","or":"clientId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/oauth/{clientId}/refresh","q":{"$action":"refresh","exist":["oauth_id","x_cal_secret_key"]},"r":{"param":{"clientId":"oauth_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"oauth"},{"var":"oauth_id"},{"lit":"refresh"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1},{"a":true,"co":{"id":"POST /v2/auth/oauth2/token","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/auth/oauth2/token","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"auth"},{"lit":"oauth2"},{"lit":"token"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.oauth_client"]]},"key$":"oauth_token","name__orig":"oauth_token","Name":"OauthToken","name_":"oauth_token","name-":"oauth-token","NAME":"OAUTH_TOKEN","index$":13}, {"active":true,"entity":"oauth_token","key$":"BasicOauthTokenFlow","kind":"basic","name":"BasicOauthTokenFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"oauth_token_ref01"},"m":{},"o":"create","s":[],"v":[]}]}, 'OauthToken', {"POST /v2/oauth-clients/{clientId}/users/{userId}/force-refresh":{"protocol":"http","parameters":[{"name":"x-cal-secret-key","in":"header","description":"OAuth client secret key","required":true,"schema":{"type":"string"},"index$":0},{"name":"userId","required":true,"in":"path","schema":{"type":"number"},"index$":1},{"name":"clientId","required":true,"in":"path","schema":{"type":"string"},"index$":2}]},"POST /v2/oauth/{clientId}/refresh":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"refreshToken":{"type":"string","description":"Managed user's refresh token."}},"required":["refreshToken"],"x-ref":"#/components/schemas/RefreshTokenInput"}}}},"parameters":[{"name":"clientId","required":true,"in":"path","schema":{"type":"string"},"index$":0},{"name":"x-cal-secret-key","required":true,"in":"header","description":"OAuth client secret key.","schema":{"type":"string"},"index$":1}]},"POST /v2/auth/oauth2/token":{"protocol":"http","requestBody":{"required":true,"description":"Token request body. client_id is required. Accepts application/x-www-form-urlencoded (RFC 6749 standard) or application/json. Use grant_type 'authorization_code' with client_secret (confidential) or code_verifier (public/PKCE), or grant_type 'refresh_token' with client_secret (confidential) or just the refresh_token (public).","content":{"application/json":{"schema":{"oneOf":[{"type":"object","properties":{"client_id":{"type":"string","description":"The client identifier","example":"my-client-id"},"grant_type":{"type":"string","description":"The grant type — must be 'authorization_code'","example":"authorization_code","enum":["authorization_code"]},"code":{"type":"string","description":"The authorization code received from the authorize endpoint","example":"abc123"},"redirect_uri":{"type":"string","description":"The redirect URI used in the authorization request","example":"https://example.com/callback"},"client_secret":{"type":"string","description":"The client secret for confidential clients"}},"required":["client_id","grant_type","code","redirect_uri","client_secret"],"x-ref":"#/components/schemas/OAuth2ExchangeConfidentialInput"},{"type":"object","properties":{"client_id":{"type":"string","description":"The client identifier","example":"my-client-id"},"grant_type":{"type":"string","description":"The grant type — must be 'authorization_code'","example":"authorization_code","enum":["authorization_code"]},"code":{"type":"string","description":"The authorization code received from the authorize endpoint","example":"abc123"},"redirect_uri":{"type":"string","description":"The redirect URI used in the authorization request","example":"https://example.com/callback"},"code_verifier":{"type":"string","description":"PKCE code verifier (required for public clients that used code_challenge)"}},"required":["client_id","grant_type","code","redirect_uri","code_verifier"],"x-ref":"#/components/schemas/OAuth2ExchangePublicInput"},{"type":"object","properties":{"client_id":{"type":"string","description":"The client identifier","example":"my-client-id"},"grant_type":{"type":"string","description":"The grant type — must be 'refresh_token'","example":"refresh_token","enum":["refresh_token"]},"refresh_token":{"type":"string","description":"The refresh token","example":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},"client_secret":{"type":"string","description":"The client secret for confidential clients"}},"required":["client_id","grant_type","refresh_token","client_secret"],"x-ref":"#/components/schemas/OAuth2RefreshConfidentialInput"},{"type":"object","properties":{"client_id":{"type":"string","description":"The client identifier","example":"my-client-id"},"grant_type":{"type":"string","description":"The grant type — must be 'refresh_token'","example":"refresh_token","enum":["refresh_token"]},"refresh_token":{"type":"string","description":"The refresh token","example":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}},"required":["client_id","grant_type","refresh_token"],"x-ref":"#/components/schemas/OAuth2RefreshPublicInput"}],"index$":1}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const oauth_token_ref01_ent = client.OauthToken()
    let oauth_token_ref01_data = setup.data.new.oauth_token['oauth_token_ref01']

    oauth_token_ref01_data = (await oauth_token_ref01_ent.create(oauth_token_ref01_data)).data()
    assert(null != oauth_token_ref01_data)


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
      '../../../../.sdk/test/entity/oauth_token/OauthTokenTestData.json')

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
    ['oauth_token01','oauth_token02','oauth_token03','oauth_client01','oauth_client02','oauth_client03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CAL_TEST_OAUTH_TOKEN_ENTID': idmap,
    'CAL_TEST_LIVE': 'FALSE',
    'CAL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CAL_TEST_OAUTH_TOKEN_ENTID']

  const live = 'TRUE' === env.CAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CAL_TEST_OAUTH_TOKEN_ENTID']
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
  
