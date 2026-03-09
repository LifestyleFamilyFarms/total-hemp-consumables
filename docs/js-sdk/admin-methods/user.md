# user - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.user` set of methods used to send requests to Medusa's Admin API routes.

## update

This method updates a user. It sends a request to the
[Update User](https://docs.medusajs.com/api/admin#users_postusersid)
API route.

### Example

```ts
sdk.admin.user.update("user_123", {
  first_name: "John",
  last_name: "Doe",
})
.then(({ user }) => {
  console.log(user)
})
```

### Parameters

- id: (\`string\`) The ID of the user to update.
- body: (\[AdminUpdateUser]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateUser/page.mdx)) The details of the user to update.

  - first\_name: (\`null\` \\| \`string\`) The first name of the user.

  - last\_name: (\`null\` \\| \`string\`) The last name of the user.

  - avatar\_url: (\`null\` \\| \`string\`) The URL of the user's avatar image.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Custom key-value pairs that can be added to the user.
- query: (\[AdminUserParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUserParams/page.mdx)) Configure the fields and relations to retrieve in the tax region.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminUserResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUserResponse/page.mdx)\&#62;) The user's details.

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

***

## list

This method retrieves a list of users. It sends a request to the
[List Users](https://docs.medusajs.com/api/admin#users_getusers)
API route.

### Example

To retrieve the list of users:

```ts
sdk.admin.user.list()
.then(({ users, count, limit, offset }) => {
  console.log(users)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.user.list({
  limit: 10,
  offset: 10
})
.then(({ users, count, limit, offset }) => {
  console.log(users)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each user:

```ts
sdk.admin.user.list({
  fields: "id,email"
})
.then(({ users, count, limit, offset }) => {
  console.log(users)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/admin#select-fields-and-relations).

### Parameters

- queryParams: (\[AdminUserListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUserListParams/page.mdx)) Filters and pagination configurations.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - q: (\`string\`) Query or keywords to search the user's searchable fields.

  - id: (\`string\` \\| \`string\`\[]) Filter by user ID(s).

  - email: (\`null\` \\| \`string\`) Filter by email(s).

  - first\_name: (\`null\` \\| \`string\`) Filter by first name(s).

  - last\_name: (\`null\` \\| \`string\`) Filter by last name(s).

  - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the user was created.

    - $and: (\[Query]\(../../../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

    - $or: (\[Query]\(../../../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

    - $eq: (\[ExpandScalar]\(../../../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62; \\| \[ExpandScalar]\(../../../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

    - $ne: (\[ExpandScalar]\(../../../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

    - $in: (\[ExpandScalar]\(../../../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

    - $nin: (\[ExpandScalar]\(../../../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

    - $not: (\[Query]\(../../../../../types/types/types.Query/page.mdx)\&#60;T\&#62;) API wrapper around the remoteQuery

    - $gt: (\[ExpandScalar]\(../../../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

    - $gte: (\[ExpandScalar]\(../../../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

    - $lt: (\[ExpandScalar]\(../../../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

    - $lte: (\[ExpandScalar]\(../../../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

    - $like: (\`string\`)

    - $re: (\`string\`)

    - $ilike: (\`string\`)

    - $fulltext: (\`string\`)

    - $overlap: (\`string\`\[])

    - $contains: (\`string\`\[])

    - $contained: (\`string\`\[])

    - $exists: (\`boolean\`)

  - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the user was updated.

    - $and: (\[Query]\(../../../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

    - $or: (\[Query]\(../../../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

    - $eq: (\[ExpandScalar]\(../../../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62; \\| \[ExpandScalar]\(../../../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

    - $ne: (\[ExpandScalar]\(../../../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

    - $in: (\[ExpandScalar]\(../../../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

    - $nin: (\[ExpandScalar]\(../../../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

    - $not: (\[Query]\(../../../../../types/types/types.Query/page.mdx)\&#60;T\&#62;) API wrapper around the remoteQuery

    - $gt: (\[ExpandScalar]\(../../../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

    - $gte: (\[ExpandScalar]\(../../../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

    - $lt: (\[ExpandScalar]\(../../../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

    - $lte: (\[ExpandScalar]\(../../../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

    - $like: (\`string\`)

    - $re: (\`string\`)

    - $ilike: (\`string\`)

    - $fulltext: (\`string\`)

    - $overlap: (\`string\`\[])

    - $contains: (\`string\`\[])

    - $contained: (\`string\`\[])

    - $exists: (\`boolean\`)

  - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the user was deleted.

    - $and: (\[Query]\(../../../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

    - $or: (\[Query]\(../../../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

    - $eq: (\[ExpandScalar]\(../../../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62; \\| \[ExpandScalar]\(../../../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

    - $ne: (\[ExpandScalar]\(../../../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

    - $in: (\[ExpandScalar]\(../../../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

    - $nin: (\[ExpandScalar]\(../../../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

    - $not: (\[Query]\(../../../../../types/types/types.Query/page.mdx)\&#60;T\&#62;) API wrapper around the remoteQuery

    - $gt: (\[ExpandScalar]\(../../../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

    - $gte: (\[ExpandScalar]\(../../../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

    - $lt: (\[ExpandScalar]\(../../../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

    - $lte: (\[ExpandScalar]\(../../../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

    - $like: (\`string\`)

    - $re: (\`string\`)

    - $ilike: (\`string\`)

    - $fulltext: (\`string\`)

    - $overlap: (\`string\`\[])

    - $contains: (\`string\`\[])

    - $contained: (\`string\`\[])

    - $exists: (\`boolean\`)
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminUserListResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUserListResponse/page.mdx)\&#62;) The list of users.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - users: (\[AdminUser]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUser/page.mdx)\[]) The list of users.

    - id: (\`string\`) The user's ID.

    - email: (\`string\`) The user's email.

    - first\_name: (\`null\` \\| \`string\`) The user's first name.

    - last\_name: (\`null\` \\| \`string\`) The user's last name.

    - avatar\_url: (\`null\` \\| \`string\`) The URL of the user's avatar image.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Custom key-value pairs that can be added to the user.

    - created\_at: (\`string\`) The date the user was created.

    - updated\_at: (\`string\`) The date the user was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the user was deleted.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## retrieve

This method retrieves a user. It sends a request to the
[Get User](https://docs.medusajs.com/api/admin#users_getusersid)
API route.

### Example

To retrieve a user by its ID:

```ts
sdk.admin.user.retrieve("user_123")
.then(({ user }) => {
  console.log(user)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.user.retrieve("user_123", {
  fields: "id,email"
})
.then(({ user }) => {
  console.log(user)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/admin#select-fields-and-relations).

### Parameters

- id: (\`string\`) The ID of the user to retrieve.
- query: (\[AdminUserParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUserParams/page.mdx)) Configure the fields and relations to retrieve in the user.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminUserResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUserResponse/page.mdx)\&#62;) The user's details.

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

***

## delete

This method deletes a user. It sends a request to the
[Delete User](https://docs.medusajs.com/api/admin#users_deleteusersid)
API route.

### Example

```ts
sdk.admin.user.delete("user_123")
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- id: (\`string\`) The ID of the user to delete.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminUserDeleteResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUserDeleteResponse/page.mdx)\&#62;) The deletion's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (\`"user"\`) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.

***

## me

This method retrieves the currently authenticated user. It sends a request to the
[Get Logged-In User](https://docs.medusajs.com/api/admin#users_getusersme)
API route.

### Example

To retrieve the currently authenticated user:

```ts
sdk.admin.user.me()
.then(({ user }) => {
  console.log(user)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.user.me({
  fields: "id,email"
})
.then(({ user }) => {
  console.log(user)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/admin#select-fields-and-relations).

### Parameters

- query: (\[AdminUserParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUserParams/page.mdx)) Configure the fields and relations to retrieve in the user.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminUserResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUserResponse/page.mdx)\&#62;) The user's details.

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
