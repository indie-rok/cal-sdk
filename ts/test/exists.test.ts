
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CalSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = CalSDK.test()
    equal(testsdk instanceof CalSDK, true,
      'CalSDK.test() must return a client synchronously')
  })

})
