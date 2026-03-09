# updateProvider - JS SDK Auth Reference

This documentation provides a reference to the `sdk.auth.updateProvider` method used to send requests to Medusa's Authentication API routes. It can be used for admin users, customers, or custom actor types.

This method is used to update user-related data authentication data.

More specifically, use this method when updating the password of an admin user, customer, or
custom actor type after requesting to reset their password with [resetPassword](https://docs.medusajs.com/references/js-sdk/auth/resetPassword).

This method sends a request to [this API route](https://docs.medusajs.com/api/admin#auth_postactor_typeauth_providerupdate).

Related guide: [How to allow customers to reset their passwords in a storefront](https://docs.medusajs.com/resources/storefront-development/customers/reset-password).

## Example

```ts
sdk.auth.updateProvider(
  "customer",
  "emailpass",
  {
    password: "supersecret"
  },
  token
)
.then(() => {
  // password updated
})
```

## Parameters

- actor: (\`string\`) The actor type. For example, \`user\` for admin user, or \`customer\` for customer.
- provider: (\`string\`) The authentication provider to use. For example, \`emailpass\`.
- body: (\[AdminUpdateProvider]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateProvider/page.mdx)) The data necessary to update the user's authentication data. When resetting the user's password,
  send the \`password\` property.
- token: (\`string\`)

## Returns

- Promise: (Promise\&#60;void\&#62;) This method is used to update user-related data authentication data.

  More specifically, use this method when updating the password of an admin user, customer, or
  custom actor type after requesting to reset their password with \[resetPassword]\(../js\_sdk.auth.Auth.resetPassword/page.mdx).

  This method sends a request to \[this API route]\(https://docs.medusajs.com/api/admin#auth\\\_postactor\\\_typeauth\\\_providerupdate).

  Related guide: \[How to allow customers to reset their passwords in a storefront]\(https://docs.medusajs.com/resources/storefront-development/customers/reset-password).
