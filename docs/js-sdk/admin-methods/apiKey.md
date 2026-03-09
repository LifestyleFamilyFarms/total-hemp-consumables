# apiKey - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.apiKey` set of methods used to send requests to Medusa's Admin API routes.

## list

This methods retrieves a paginated list of API keys. It sends a request to the
[List API Keys](https://docs.medusajs.com/api/admin#api-keys_getapikeys) API route.

### Example

To retrieve the list of API keys:

```ts
sdk.admin.apiKey.list()
.then(({ api_keys, count, limit, offset }) => {
  console.log(api_keys)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.apiKey.list({
  limit: 10,
  offset: 10
})
.then(({ api_keys, count, limit, offset }) => {
  console.log(api_keys)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each API key:

```ts
sdk.admin.apiKey.list({
  fields: "id,*sales_channels"
})
.then(({ api_keys, count, limit, offset }) => {
  console.log(api_keys)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- queryParams: (\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx)) Filters and pagination configurations.

  - $and: ((\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - q: (\`string\`) Query or keywords to search the API key's searchable fields.

    - id: (\`string\` \\| \`string\`\[]) Filter by API key ID(s).

    - title: (\`string\` \\| \`string\`\[]) Filter by title(s).

    - token: (\`string\` \\| \`string\`\[]) Filter by token(s).

    - type: (\[ApiKeyType]\(../../../../../api\_key/types/api\_key.ApiKeyType/page.mdx)) Filter by type.

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's update date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's deletion date.

    - revoked\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's revocation date.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - $or: ((\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - q: (\`string\`) Query or keywords to search the API key's searchable fields.

    - id: (\`string\` \\| \`string\`\[]) Filter by API key ID(s).

    - title: (\`string\` \\| \`string\`\[]) Filter by title(s).

    - token: (\`string\` \\| \`string\`\[]) Filter by token(s).

    - type: (\[ApiKeyType]\(../../../../../api\_key/types/api\_key.ApiKeyType/page.mdx)) Filter by type.

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's update date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's deletion date.

    - revoked\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's revocation date.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - q: (\`string\`) Query or keywords to search the API key's searchable fields.

  - id: (\`string\` \\| \`string\`\[]) Filter by API key ID(s).

  - title: (\`string\` \\| \`string\`\[]) Filter by title(s).

  - token: (\`string\` \\| \`string\`\[]) Filter by token(s).

  - type: (\[ApiKeyType]\(../../../../../api\_key/types/api\_key.ApiKeyType/page.mdx)) Filter by type.

  - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's creation date.

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

  - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's update date.

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

  - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's deletion date.

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

  - revoked\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's revocation date.

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

- Promise: (Promise\&#60;\[AdminApiKeyListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminApiKeyListResponse/page.mdx)\&#62;) The paginated list of API keys.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## create

This method creates an API key. It sends a request to the [Create API Key](https://docs.medusajs.com/api/admin#api-keys_postapikeys)
API route.

### Example

```ts
sdk.admin.apiKey.create({
  title: "Development",
  type: "publishable"
})
.then(({ api_key }) => {
  console.log(api_key)
})
```

### Parameters

- body: (\[AdminCreateApiKey]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateApiKey/page.mdx)) The API key's details.

  - title: (\`string\`) The API key's title.

  - type: (\[ApiKeyType]\(../../../../../api\_key/types/api\_key.ApiKeyType/page.mdx)) The API key's type.
- query: (\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx)) Configure the fields to retrieve in the created API key.

  - $and: ((\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - q: (\`string\`) Query or keywords to search the API key's searchable fields.

    - id: (\`string\` \\| \`string\`\[]) Filter by API key ID(s).

    - title: (\`string\` \\| \`string\`\[]) Filter by title(s).

    - token: (\`string\` \\| \`string\`\[]) Filter by token(s).

    - type: (\[ApiKeyType]\(../../../../../api\_key/types/api\_key.ApiKeyType/page.mdx)) Filter by type.

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's update date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's deletion date.

    - revoked\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's revocation date.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - $or: ((\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - q: (\`string\`) Query or keywords to search the API key's searchable fields.

    - id: (\`string\` \\| \`string\`\[]) Filter by API key ID(s).

    - title: (\`string\` \\| \`string\`\[]) Filter by title(s).

    - token: (\`string\` \\| \`string\`\[]) Filter by token(s).

    - type: (\[ApiKeyType]\(../../../../../api\_key/types/api\_key.ApiKeyType/page.mdx)) Filter by type.

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's update date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's deletion date.

    - revoked\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's revocation date.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - q: (\`string\`) Query or keywords to search the API key's searchable fields.

  - id: (\`string\` \\| \`string\`\[]) Filter by API key ID(s).

  - title: (\`string\` \\| \`string\`\[]) Filter by title(s).

  - token: (\`string\` \\| \`string\`\[]) Filter by token(s).

  - type: (\[ApiKeyType]\(../../../../../api\_key/types/api\_key.ApiKeyType/page.mdx)) Filter by type.

  - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's creation date.

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

  - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's update date.

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

  - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's deletion date.

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

  - revoked\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's revocation date.

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

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminApiKeyResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminApiKeyResponse/page.mdx)\&#62;) The created API key

  - api\_key: (\[AdminApiKey]\(../../../../../types/interfaces/types.AdminApiKey/page.mdx)) The API key's details.

    - id: (\`string\`) The API key's ID.

    - token: (\`string\`) The API key's token.

    - redacted: (\`string\`) The redacted form of the token, useful&#x20;
      for displaying the API key.

    - title: (\`string\`) The API key's title.

    - type: (\[ApiKeyType]\(../../../../../api\_key/types/api\_key.ApiKeyType/page.mdx)) The API key's type.

    - last\_used\_at: (\`null\` \\| \`Date\`) The date the API key was last used.

    - created\_by: (\`string\`) The ID of the user that created the API key.

    - created\_at: (\`Date\`) The date the API key was created.

    - updated\_at: (\`Date\`) The date the API key was updated.

    - revoked\_by: (\`null\` \\| \`string\`) The ID of the user that revoked the API key.

    - revoked\_at: (\`null\` \\| \`Date\`) The date the API key was revoked.

    - deleted\_at: (\`null\` \\| \`Date\`) The date the API key was deleted.

***

## revoke

This method revokes an API key. It sends a request to the
[Revoke API Key](https://docs.medusajs.com/api/admin#api-keys_postapikeysidrevoke) API route.

### Example

```ts
sdk.admin.apiKey.revoke("apk_123")
.then(({ api_key }) => {
  console.log(api_key)
})
```

### Parameters

- id: (\`string\`) The API key's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminApiKeyResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminApiKeyResponse/page.mdx)\&#62;) The API key's details.

  - api\_key: (\[AdminApiKey]\(../../../../../types/interfaces/types.AdminApiKey/page.mdx)) The API key's details.

    - id: (\`string\`) The API key's ID.

    - token: (\`string\`) The API key's token.

    - redacted: (\`string\`) The redacted form of the token, useful&#x20;
      for displaying the API key.

    - title: (\`string\`) The API key's title.

    - type: (\[ApiKeyType]\(../../../../../api\_key/types/api\_key.ApiKeyType/page.mdx)) The API key's type.

    - last\_used\_at: (\`null\` \\| \`Date\`) The date the API key was last used.

    - created\_by: (\`string\`) The ID of the user that created the API key.

    - created\_at: (\`Date\`) The date the API key was created.

    - updated\_at: (\`Date\`) The date the API key was updated.

    - revoked\_by: (\`null\` \\| \`string\`) The ID of the user that revoked the API key.

    - revoked\_at: (\`null\` \\| \`Date\`) The date the API key was revoked.

    - deleted\_at: (\`null\` \\| \`Date\`) The date the API key was deleted.

***

## retrieve

This method retrieves an API key's details. It sends a request to the
[Get API key](https://docs.medusajs.com/api/admin#api-keys_getapikeysid) API route.

### Example

```ts
sdk.admin.apiKey.retrieve("apk_123")
.then(({ api_key }) => {
  console.log(api_key)
})
```

### Parameters

- id: (\`string\`) The API key's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminApiKeyResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminApiKeyResponse/page.mdx)\&#62;) The API key's details.

  - api\_key: (\[AdminApiKey]\(../../../../../types/interfaces/types.AdminApiKey/page.mdx)) The API key's details.

    - id: (\`string\`) The API key's ID.

    - token: (\`string\`) The API key's token.

    - redacted: (\`string\`) The redacted form of the token, useful&#x20;
      for displaying the API key.

    - title: (\`string\`) The API key's title.

    - type: (\[ApiKeyType]\(../../../../../api\_key/types/api\_key.ApiKeyType/page.mdx)) The API key's type.

    - last\_used\_at: (\`null\` \\| \`Date\`) The date the API key was last used.

    - created\_by: (\`string\`) The ID of the user that created the API key.

    - created\_at: (\`Date\`) The date the API key was created.

    - updated\_at: (\`Date\`) The date the API key was updated.

    - revoked\_by: (\`null\` \\| \`string\`) The ID of the user that revoked the API key.

    - revoked\_at: (\`null\` \\| \`Date\`) The date the API key was revoked.

    - deleted\_at: (\`null\` \\| \`Date\`) The date the API key was deleted.

***

## update

This method updates an API key's details. It sends a request to the
[Update API Key](https://docs.medusajs.com/api/admin#api-keys_postapikeysid) API route.

### Example

```ts
sdk.admin.apiKey.update("apk_123", {
  title: "Development"
})
.then(({ api_key }) => {
  console.log(api_key)
})
```

### Parameters

- id: (\`string\`) The API key's ID.
- body: (\[AdminUpdateApiKey]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateApiKey/page.mdx)) The data to update in the API key.

  - title: (\`string\`) The API key's title.
- query: (\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx)) Configure the fields to retrieve in the API key.

  - $and: ((\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - q: (\`string\`) Query or keywords to search the API key's searchable fields.

    - id: (\`string\` \\| \`string\`\[]) Filter by API key ID(s).

    - title: (\`string\` \\| \`string\`\[]) Filter by title(s).

    - token: (\`string\` \\| \`string\`\[]) Filter by token(s).

    - type: (\[ApiKeyType]\(../../../../../api\_key/types/api\_key.ApiKeyType/page.mdx)) Filter by type.

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's update date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's deletion date.

    - revoked\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's revocation date.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - $or: ((\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetApiKeysParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetApiKeysParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - q: (\`string\`) Query or keywords to search the API key's searchable fields.

    - id: (\`string\` \\| \`string\`\[]) Filter by API key ID(s).

    - title: (\`string\` \\| \`string\`\[]) Filter by title(s).

    - token: (\`string\` \\| \`string\`\[]) Filter by token(s).

    - type: (\[ApiKeyType]\(../../../../../api\_key/types/api\_key.ApiKeyType/page.mdx)) Filter by type.

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's update date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's deletion date.

    - revoked\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's revocation date.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - q: (\`string\`) Query or keywords to search the API key's searchable fields.

  - id: (\`string\` \\| \`string\`\[]) Filter by API key ID(s).

  - title: (\`string\` \\| \`string\`\[]) Filter by title(s).

  - token: (\`string\` \\| \`string\`\[]) Filter by token(s).

  - type: (\[ApiKeyType]\(../../../../../api\_key/types/api\_key.ApiKeyType/page.mdx)) Filter by type.

  - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's creation date.

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

  - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's update date.

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

  - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's deletion date.

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

  - revoked\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the API key's revocation date.

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

- Promise: (Promise\&#60;\[AdminApiKeyResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminApiKeyResponse/page.mdx)\&#62;) The API key's details.

  - api\_key: (\[AdminApiKey]\(../../../../../types/interfaces/types.AdminApiKey/page.mdx)) The API key's details.

    - id: (\`string\`) The API key's ID.

    - token: (\`string\`) The API key's token.

    - redacted: (\`string\`) The redacted form of the token, useful&#x20;
      for displaying the API key.

    - title: (\`string\`) The API key's title.

    - type: (\[ApiKeyType]\(../../../../../api\_key/types/api\_key.ApiKeyType/page.mdx)) The API key's type.

    - last\_used\_at: (\`null\` \\| \`Date\`) The date the API key was last used.

    - created\_by: (\`string\`) The ID of the user that created the API key.

    - created\_at: (\`Date\`) The date the API key was created.

    - updated\_at: (\`Date\`) The date the API key was updated.

    - revoked\_by: (\`null\` \\| \`string\`) The ID of the user that revoked the API key.

    - revoked\_at: (\`null\` \\| \`Date\`) The date the API key was revoked.

    - deleted\_at: (\`null\` \\| \`Date\`) The date the API key was deleted.

***

## delete

This method deletes an API key by its ID. It sends a request to the
[Delete API Key](https://docs.medusajs.com/api/admin#api-keys_deleteapikeysid) API route.

### Example

```ts
sdk.admin.apiKey.delete("apk_123")
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- id: (\`string\`) The API key's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminApiKeyDeleteResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminApiKeyDeleteResponse/page.mdx)\&#62;) The deletion's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (TObject) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.

***

## batchSalesChannels

This method manages the sales channels associated with a publishable API key to either add
or remove associations. It sends a request to the [Manage Sales Channels](https://docs.medusajs.com/api/admin#api-keys_postapikeysidsaleschannels)
API route.

### Example

```ts
sdk.admin.apiKey.batchSalesChannels("apk_123", {
  add: ["sc_123"],
  remove: ["sc_321"]
})
.then(({ api_key }) => {
  console.log(api_key)
})
```

### Parameters

- id: (\`string\`) The API key's ID.
- body: (\[AdminBatchLink]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminBatchLink/page.mdx)) The sales channels to add or remove from the API key.

  - add: (\`string\`\[]) The IDs of the items to create an association to.

  - remove: (\`string\`\[]) The IDs of the items to remove the association from.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminApiKeyResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminApiKeyResponse/page.mdx)\&#62;) The API key's details.

  - api\_key: (\[AdminApiKey]\(../../../../../types/interfaces/types.AdminApiKey/page.mdx)) The API key's details.

    - id: (\`string\`) The API key's ID.

    - token: (\`string\`) The API key's token.

    - redacted: (\`string\`) The redacted form of the token, useful&#x20;
      for displaying the API key.

    - title: (\`string\`) The API key's title.

    - type: (\[ApiKeyType]\(../../../../../api\_key/types/api\_key.ApiKeyType/page.mdx)) The API key's type.

    - last\_used\_at: (\`null\` \\| \`Date\`) The date the API key was last used.

    - created\_by: (\`string\`) The ID of the user that created the API key.

    - created\_at: (\`Date\`) The date the API key was created.

    - updated\_at: (\`Date\`) The date the API key was updated.

    - revoked\_by: (\`null\` \\| \`string\`) The ID of the user that revoked the API key.

    - revoked\_at: (\`null\` \\| \`Date\`) The date the API key was revoked.

    - deleted\_at: (\`null\` \\| \`Date\`) The date the API key was deleted.
