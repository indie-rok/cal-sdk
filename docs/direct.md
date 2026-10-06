# Direct API calls

[Back to the README](../README.md)

For endpoints the entities don't cover, use the low-level methods:

- **`direct(fetchargs)`** builds and sends an HTTP request in one step.
- **`prepare(fetchargs)`** builds the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`, `headers` and `body`.

The paths and methods you can call are listed in the
[Cal.com API v2 reference](https://cal.com/docs/api-reference/v2/introduction).

## Send a request

```ts
const result = await client.direct({
  path: '/v2/bookings/{bookingUid}',
  method: 'GET',
  params: { bookingUid: 'booking_uid' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

## Handle errors

`direct()` does not throw. It returns a result envelope: check `ok`. On failure,
`status` holds the HTTP status and `err` holds the error.

```ts
if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```

## Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/v2/bookings/{bookingUid}',
  method: 'GET',
  params: { bookingUid: 'booking_uid' },
})

console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```
