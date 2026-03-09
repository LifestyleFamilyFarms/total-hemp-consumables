# refresh - JS SDK Auth Reference

This documentation provides a reference to the `sdk.auth.refresh` method used to send requests to Medusa's Authentication API routes. It can be used for admin users, customers, or custom actor types.

This method refreshes a JWT authentication token, which is useful after validating the Oauth callback
with [callback](https://docs.medusajs.com/references/js-sdk/auth/callback). It sends a request to the [Refresh Authentication Token API route](https://docs.medusajs.com/api/admin#auth_postadminauthtokenrefresh).

The method stores the returned token and passes it in the header of subsequent requests. So, you can call other
methods that require authentication after calling this method.

Learn more in the [JS SDK Authentication](https://docs.medusajs.com/resources/js-sdk/auth/overview) guide.

For an example of implementing third-party authentication, refer to the
[Third-Party Login in Storefront](https://docs.medusajs.com/resources/storefront-development/customers/third-party-login) guide.

## Example

```ts
const token = await sdk.auth.refresh()

// all subsequent requests will use the token in the header
const { customer } = await sdk.store.customer.retrieve()
```

## Parameters

- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

## Returns

- Promise: (Promise\&#60;string\&#62;) The refreshed JWT authentication token.

  - string: (\`string\`)
