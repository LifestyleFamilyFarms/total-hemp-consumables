# callback - JS SDK Auth Reference

This documentation provides a reference to the `sdk.auth.callback` method used to send requests to Medusa's Authentication API routes. It can be used for admin users, customers, or custom actor types.

This method is used to validate an Oauth callback from a third-party service, such as Google, for an admin user, customer, or custom actor types.
It sends a request to the [Validate Authentication Callback](https://docs.medusajs.com/api/admin#auth_postactor_typeauth_providercallback).

The method stores the returned token and passes it in the header of subsequent requests. So, you can call the
[store.customer.create](https://docs.medusajs.com/resources/references/js-sdk/store/customer#create) or [refresh](https://docs.medusajs.com/references/js-sdk/auth/refresh) methods,
for example, after calling this method.

Learn more in the [JS SDK Authentication](https://docs.medusajs.com/resources/js-sdk/auth/overview) guide.

## Example

```ts
await sdk.auth.callback(
  "customer",
  "google",
  {
    code: "123",
    state: "456"
  }
)

// all subsequent requests will use the token in the header
const { customer } = await sdk.store.customer.create({
  email: "customer@gmail.com",
  password: "supersecret"
})
```

## Parameters

- actor: (\`string\`) The actor type. For example, \`user\` for admin user, or \`customer\` for customer.
- method: (\`string\`) The authentication provider to use. For example, \`google\`.
- query: (\`Record\<string, unknown>\`) The query parameters from the Oauth callback, which should be passed to the API route. This includes query parameters like
  \`code\` and \`state\`.

## Returns

- Promise: (Promise\&#60;string\&#62;) The authentication JWT token

  - string: (\`string\`)
