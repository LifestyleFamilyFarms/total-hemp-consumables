# logout - JS SDK Auth Reference

This documentation provides a reference to the `sdk.auth.logout` method used to send requests to Medusa's Authentication API routes. It can be used for admin users, customers, or custom actor types.

This method logs out the currently authenticated user based on your JS SDK authentication configurations.

If the `auth.type` of the SDK is set to `session`, this method will also send a request to the
[Delete Authentication Session API route](https://docs.medusajs.com/api/admin#auth_deletesession).

The method also clears any stored tokens or sessions, based on your JS SDK authentication configurations.

Learn more in the [JS SDK Authentication](https://docs.medusajs.com/resources/js-sdk/auth/overview) guide.

## Example

```ts
await sdk.auth.logout()

// user is now logged out
// you can't send any requests that require authentication
```

## Returns

- Promise: (Promise\&#60;void\&#62;) This method logs out the currently authenticated user based on your JS SDK authentication configurations.

  If the \`auth.type\` of the SDK is set to \`session\`, this method will also send a request to the
  \[Delete Authentication Session API route]\(https://docs.medusajs.com/api/admin#auth\\\_deletesession).

  The method also clears any stored tokens or sessions, based on your JS SDK authentication configurations.

  Learn more in the \[JS SDK Authentication]\(https://docs.medusajs.com/resources/js-sdk/auth/overview) guide.
