# resetPassword - JS SDK Auth Reference

This documentation provides a reference to the `sdk.auth.resetPassword` method used to send requests to Medusa's Authentication API routes. It can be used for admin users, customers, or custom actor types.

This method requests a reset password token for an admin user, customer, or custom actor type.
It sends a request to the [Generate Reset Password Token API route](https://docs.medusajs.com/api/admin#auth_postactor_typeauth_providerresetpassword).

To reset the password later using the token delivered to the user, use the [updateProvider](https://docs.medusajs.com/references/js-sdk/auth/updateProvider) method.

Related guide: [How to allow customers to reset their passwords in a storefront](https://docs.medusajs.com/resources/storefront-development/customers/reset-password).

## Example

```ts
sdk.auth.resetPassword(
  "customer",
  "emailpass",
  {
    identifier: "customer@gmail.com"
  }
)
.then(() => {
  // user receives token
})
```

## Parameters

- actor: (\`string\`) The actor type. For example, \`user\` for admin user, or \`customer\` for customer.
- provider: (\`string\`) The authentication provider to use. For example, \`emailpass\`.
- body: (\`object\`) The data required to identify the user.

  - identifier: (\`string\`) The user's identifier. For example, when using the \`emailpass\` provider,
    this would be the user's email.

## Returns

- Promise: (Promise\&#60;void\&#62;) This method requests a reset password token for an admin user, customer, or custom actor type.
  It sends a request to the \[Generate Reset Password Token API route]\(https://docs.medusajs.com/api/admin#auth\\\_postactor\\\_typeauth\\\_providerresetpassword).

  To reset the password later using the token delivered to the user, use the \[updateProvider]\(../js\_sdk.auth.Auth.updateProvider/page.mdx) method.

  Related guide: \[How to allow customers to reset their passwords in a storefront]\(https://docs.medusajs.com/resources/storefront-development/customers/reset-password).
