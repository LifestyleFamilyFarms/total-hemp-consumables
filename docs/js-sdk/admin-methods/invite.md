# invite - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.invite` set of methods used to send requests to Medusa's Admin API routes.

## accept

This method accepts an invite. It requires sending a previous request to
the Auth.register.

This method sends a request to the \[Accept Invite]
(https://docs.medusajs.com/api/admin#invites\_postinvitesaccept)
API route.

### Example

```ts
await sdk.auth.register("user", "emailpass", {
  email: "user@gmail.com",
  password: "supersecret"
})

// all subsequent requests will use the token in the header
const { user } = await sdk.admin.invite.accept(
  {
    email: "user@gmail.com",
    first_name: "John",
    last_name: "Smith",
    invite_token: "12345..."
  },
)
```

### Parameters

- input: (\[AdminAcceptInvite]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminAcceptInvite/page.mdx) & \`object\`) The details of the user to create.

  - email: (\`string\`) The user's email.

  - first\_name: (\`string\`) The user's first name.

  - last\_name: (\`string\`) The user's last name.

  - invite\_token: (\`string\`) The invite's token.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the user.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminAcceptInviteResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminAcceptInviteResponse/page.mdx)\&#62;) The user's details.

  - user: (\[AdminUser]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUser/page.mdx)) The user's details.

    - id: (\`string\`) The user's ID.

    - email: (\`string\`) The user's email.

    - first\_name: (\`null\` \\| \`string\`) The user's first name.

    - last\_name: (\`null\` \\| \`string\`) The user's last name.

    - avatar\_url: (\`null\` \\| \`string\`) The URL of the user's avatar image.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Custom key-value pairs that can be added to the user.

    - created\_at: (\`string\`) The date the user was created.

    - updated\_at: (\`string\`) The date the user was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the user was deleted.

  - message: (\`string\`) A message if an error occurs.

***

## create

This method creates an invite. It sends a request to the
[Create Invite](https://docs.medusajs.com/api/admin#invites_postinvites)
API route.

### Example

```ts
sdk.admin.invite.create({
  email: "user@gmail.com",
})
.then(({ invite }) => {
  console.log(invite)
})
```

### Parameters

- body: (\[AdminCreateInvite]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminCreateInvite/page.mdx)) The invite's details.

  - email: (\`string\`) The email of the user to invite.

  - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the invite.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminInviteResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInviteResponse/page.mdx)\&#62;) The invite's details.

  - invite: (\[AdminInvite]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInvite/page.mdx)) The invite's details.

    - id: (\`string\`) The invite's ID.

    - email: (\`string\`) The email of the invited user.

    - accepted: (\`boolean\`) Whether the invite was accepted.

    - token: (\`string\`) The invite token.

    - expires\_at: (\`string\`) The date the invite expires.

    - created\_at: (\`string\`) The date that the invite was created.

    - updated\_at: (\`string\`) The date that the invite was updated.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## retrieve

This method retrieves an invite by its ID. It sends a request to the
[Get Invite](https://docs.medusajs.com/api/admin#invites_getinvitesid)
API route.

### Example

To retrieve an invite its ID:

```ts
sdk.admin.invite.retrieve("invite_123")
.then(({ invite }) => {
  console.log(invite)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.invite.retrieve("invite_123", {
  fields: "id,email"
})
.then(({ invite }) => {
  console.log(invite)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- id: (\`string\`) The invite's ID.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the invite.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminInviteResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInviteResponse/page.mdx)\&#62;) The invite's details.

  - invite: (\[AdminInvite]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInvite/page.mdx)) The invite's details.

    - id: (\`string\`) The invite's ID.

    - email: (\`string\`) The email of the invited user.

    - accepted: (\`boolean\`) Whether the invite was accepted.

    - token: (\`string\`) The invite token.

    - expires\_at: (\`string\`) The date the invite expires.

    - created\_at: (\`string\`) The date that the invite was created.

    - updated\_at: (\`string\`) The date that the invite was updated.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## list

This method retrieves a paginated list of invites. It sends a request to the
[List Invites](https://docs.medusajs.com/api/admin#invites_getinvites)
API route.

### Example

To retrieve the list of invites:

```ts
sdk.admin.invite.list()
.then(({ invites, count, limit, offset }) => {
  console.log(invites)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.invite.list({
  limit: 10,
  offset: 10
})
.then(({ invites, count, limit, offset }) => {
  console.log(invites)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each invite:

```ts
sdk.admin.invite.list({
  fields: "id,email"
})
.then(({ invites, count, limit, offset }) => {
  console.log(invites)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- queryParams: (\[FindParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.FindParams/page.mdx)) Filters and pagination configurations.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminInviteListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminInviteListResponse/page.mdx)\&#62;) The paginated list of invites.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## resend

This method refreshes the token of an invite. It sends a request to the
[Refresh Invite Token](https://docs.medusajs.com/api/admin#invites_postinvitesidresend)
API route.

### Example

```ts
sdk.admin.invite.resend("invite_123")
.then(({ invite }) => {
  console.log(invite)
})
```

### Parameters

- id: (\`string\`) The invite's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminInviteResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInviteResponse/page.mdx)\&#62;) The invite's details.

  - invite: (\[AdminInvite]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInvite/page.mdx)) The invite's details.

    - id: (\`string\`) The invite's ID.

    - email: (\`string\`) The email of the invited user.

    - accepted: (\`boolean\`) Whether the invite was accepted.

    - token: (\`string\`) The invite token.

    - expires\_at: (\`string\`) The date the invite expires.

    - created\_at: (\`string\`) The date that the invite was created.

    - updated\_at: (\`string\`) The date that the invite was updated.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## delete

This method deletes an invite. It sends a request to the
[Delete Invite](https://docs.medusajs.com/api/admin#invites_deleteinvitesid)
API route.

### Example

```ts
sdk.admin.invite.delete("invite_123")
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- id: (\`string\`) The invite's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminInviteDeleteResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminInviteDeleteResponse/page.mdx)\&#62;) The deletion's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (TObject) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.
