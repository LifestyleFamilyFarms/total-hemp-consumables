# collection - JS SDK Store Reference

This documentation provides a reference to the `sdk.store.collection` set of methods used to send requests to Medusa's Store API routes.

## list

This method retrieves a paginated list of product collections. It sends a request to the
[List Collections](https://docs.medusajs.com/api/store#collections_getcollections) API route.

Related guide: [How to retrieve collections in a storefront](https://docs.medusajs.com/resources/storefront-development/products/collections/list).

### Example

To retrieve the list of collections:

```ts
sdk.store.collection.list()
.then(({ collections, count, limit, offset }) => {
  console.log(collections)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.store.collection.list({
  limit: 10,
  offset: 10
})
.then(({ collections, count, limit, offset }) => {
  console.log(collections)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each collection:

```ts
sdk.store.collection.list({
  fields: "id,handle"
})
.then(({ collections, count, limit, offset }) => {
  console.log(collections)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- query: (\[FindParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.FindParams/page.mdx) & \[StoreCollectionListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCollectionListParams/page.mdx)) Filters and pagination configurations.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - $and: ((\[BaseCollectionListParams]\(../../../../../types/interfaces/types.BaseCollectionListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseCollectionListParams]\(../../../../../types/interfaces/types.BaseCollectionListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[BaseCollectionListParams]\(../../../../../types/interfaces/types.BaseCollectionListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseCollectionListParams]\(../../../../../types/interfaces/types.BaseCollectionListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[BaseCollectionListParams]\(../../../../../types/interfaces/types.BaseCollectionListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseCollectionListParams]\(../../../../../types/interfaces/types.BaseCollectionListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - q: (\`string\`) A query or keywords to search the collection's searchable fields by.

    - id: (\`string\` \\| \`string\`\[]) Filter by collection ID(s).

    - handle: (\`string\` \\| \`string\`\[]) Filter by collection handle(s).

    - title: (\`string\` \\| \`string\`\[]) Filter by collection title(s).

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on collection creation dates.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on collection update dates.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - $or: ((\[BaseCollectionListParams]\(../../../../../types/interfaces/types.BaseCollectionListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseCollectionListParams]\(../../../../../types/interfaces/types.BaseCollectionListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[BaseCollectionListParams]\(../../../../../types/interfaces/types.BaseCollectionListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseCollectionListParams]\(../../../../../types/interfaces/types.BaseCollectionListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[BaseCollectionListParams]\(../../../../../types/interfaces/types.BaseCollectionListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseCollectionListParams]\(../../../../../types/interfaces/types.BaseCollectionListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - q: (\`string\`) A query or keywords to search the collection's searchable fields by.

    - id: (\`string\` \\| \`string\`\[]) Filter by collection ID(s).

    - handle: (\`string\` \\| \`string\`\[]) Filter by collection handle(s).

    - title: (\`string\` \\| \`string\`\[]) Filter by collection title(s).

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on collection creation dates.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on collection update dates.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - q: (\`string\`) A query or keywords to search the collection's searchable fields by.

  - id: (\`string\` \\| \`string\`\[]) Filter by collection ID(s).

  - handle: (\`string\` \\| \`string\`\[]) Filter by collection handle(s).

  - title: (\`string\` \\| \`string\`\[]) Filter by collection title(s).

  - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on collection creation dates.

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

  - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on collection update dates.

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
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreCollectionListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.StoreCollectionListResponse/page.mdx)\&#62;) The paginated list of collections.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## retrieve

This method retrieves a collection by its ID. It sends a request to the [Get Collection](https://docs.medusajs.com/api/store#collections_getcollectionsid)
API route.

Related guide: [How to retrieve a collection in a storefront](https://docs.medusajs.com/resources/storefront-development/products/collections/retrieve).

### Example

To retrieve a collection by its ID:

```ts
sdk.store.collection.retrieve("pcol_123")
.then(({ collection }) => {
  console.log(collection)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.store.collection.retrieve("pcol_123", {
  fields: "id,handle"
})
.then(({ collection }) => {
  console.log(collection)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- id: (\`string\`) The ID of the collection to retrieve.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the collection.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreCollectionResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCollectionResponse/page.mdx)\&#62;) The collection.

  - collection: (\[StoreCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCollection/page.mdx)) The collection's details.

    - id: (\`string\`) The collection's ID.

    - title: (\`string\`) The collection's title.

    - handle: (\`string\`) The collection's handle.

    - created\_at: (\`string\`) The date the collection was created.

    - updated\_at: (\`string\`) The date the collection was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the collection was deleted.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - products: (\[StoreProduct]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreProduct/page.mdx)\[]) The collection's products.
