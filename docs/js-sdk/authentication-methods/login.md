# login - JS SDK Auth Reference

This documentation provides a reference to the `sdk.auth.login` method used to send requests to Medusa's Authentication API routes. It can be used for admin users, customers, or custom actor types.

This method retrieves the JWT authenticated token for an admin user, customer, or custom
actor type. It sends a request to the [Authenticate API Route](https://docs.medusajs.com/api/admin#auth_postactor_typeauth_provider).

### Third-Party Authentication

If the API route returns a `location` property, it means that the authentication requires additional steps,
typically in a third-party service. The `location` property is returned so that you
can redirect the user to the appropriate page.

:::note

For an example of implementing third-party authentication, refer to the
[Third-Party Login in Storefront](https://docs.medusajs.com/resources/storefront-development/customers/third-party-login) guide.

:::

### Session Authentication

If the `auth.type` of the SDK is set to `session`, this method will also send a request to the
[Set Authentication Session API route](https://docs.medusajs.com/api/admin#auth_postsession).

Learn more in the [JS SDK Authentication](https://docs.medusajs.com/resources/js-sdk/auth/overview) guide.

### Automatic Authentication

If the authentication was successful, subsequent requests using the SDK will automatically have the necessary authentication headers / session
set, based on your JS SDK authentication configurations.

Learn more in the [JS SDK Authentication](https://docs.medusajs.com/resources/js-sdk/auth/overview) guide.

## Example

```ts
const result = await sdk.auth.login(
  "customer",
  "emailpass",
  {
    email: "customer@gmail.com",
    password: "supersecret"
  }
)

if (typeof result !== "string") {
  alert("Authentication requires additional steps")
  // replace with the redirect logic of your application
  window.location.href = result.location
  return
}

// customer is now authenticated
// all subsequent requests will use the token in the header
const { customer } = await sdk.store.customer.retrieve()
```

## Parameters

- actor: (\`string\`) The actor type. For example, \`user\` for admin user, or \`customer\` for customer.
- method: (\`string\`) The authentication provider to use. For example, \`emailpass\` or \`google\`.
- payload: (\`Record\<string, unknown>\` \\| \[AdminSignInWithEmailPassword]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSignInWithEmailPassword/page.mdx)) The data to pass in the request's body for authentication. When using the \`emailpass\` provider,
  you pass the email and password.

  - email: (\`string\`)

  - password: (\`string\`)

## Returns

- Promise: (Promise\&#60;string \\| object\&#62;) The authentication JWT token

  - string \\| object: (\`string\` \\| \`object\`)
