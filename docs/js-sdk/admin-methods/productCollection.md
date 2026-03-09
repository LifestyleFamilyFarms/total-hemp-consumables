# productCollection - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.productCollection` set of methods used to send requests to Medusa's Admin API routes.

## create

This method creates a product collection. It sends a request to the
[Create Collection](https://docs.medusajs.com/api/admin#collections_postcollections)
API route.

### Example

```ts
sdk.admin.productCollection.create({
  title: "Summer Collection"
})
.then(({ collection }) => {
  console.log(collection)
})
```

### Parameters

- body: (\[AdminCreateCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateCollection/page.mdx)) The details of the product collection to create.

  - title: (\`string\`) The collection's title.

  - handle: (\`string\`) The collection's handle.

  - metadata: (\`Record\<string, any>\`) Key-value pairs of custom data.
- query: (\[AdminCollectionParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCollectionParams/page.mdx)) Configure the fields to retrieve in the product collection.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminCollectionResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCollectionResponse/page.mdx)\&#62;) The product collection's details.

  - collection: (\[AdminCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCollection/page.mdx)) The collection's details.

    - id: (\`string\`) The collection's ID.

    - title: (\`string\`) The collection's title.

    - handle: (\`string\`) The collection's handle.

    - created\_at: (\`string\`) The date the collection was created.

    - updated\_at: (\`string\`) The date the collection was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the collection was deleted.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - products: (\[BaseProduct]\(../../../../../types/interfaces/types.BaseProduct/page.mdx)\[]) The collection's products.

***

## update

This method updates a collection. It sends a request to the
[Update Collection](https://docs.medusajs.com/api/admin#collections_postcollectionsid)
API route.

### Example

```ts
sdk.admin.productCollection.update("pcol_123", {
  title: "Summer Collection"
})
.then(({ collection }) => {
  console.log(collection)
})
```

### Parameters

- id: (\`string\`) The ID of the collection.
- body: (\[AdminUpdateCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateCollection/page.mdx)) The data to update in the collection.

  - title: (\`string\`) The collection's title.

  - handle: (\`string\`) The collection's handle.

  - metadata: (\`null\` \\| \`Record\<string, any>\`) Key-value pairs of custom data.
- query: (\[AdminCollectionParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCollectionParams/page.mdx)) Configure the fields to retrieve in the product collection.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminCollectionResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCollectionResponse/page.mdx)\&#62;) The product collection's details.

  - collection: (\[AdminCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCollection/page.mdx)) The collection's details.

    - id: (\`string\`) The collection's ID.

    - title: (\`string\`) The collection's title.

    - handle: (\`string\`) The collection's handle.

    - created\_at: (\`string\`) The date the collection was created.

    - updated\_at: (\`string\`) The date the collection was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the collection was deleted.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - products: (\[BaseProduct]\(../../../../../types/interfaces/types.BaseProduct/page.mdx)\[]) The collection's products.

***

## list

This method retrieves a paginated list of collections. It sends a request to the
[List Collections](https://docs.medusajs.com/api/admin#collections_getcollections) API route.

### Example

To retrieve the list of collections:

```ts
sdk.admin.productCollection.list()
.then(({ collections, count, limit, offset }) => {
  console.log(collections)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.productCollection.list({
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
sdk.admin.productCollection.list({
  fields: "id,*products"
})
.then(({ collections, count, limit, offset }) => {
  console.log(collections)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- queryParams: (\[AdminCollectionListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCollectionListParams/page.mdx)) Filters and pagination configurations.

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

  - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the collection's deletion date.

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
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminCollectionListResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCollectionListResponse/page.mdx)\&#62;) The paginated list of collections.

  - collections: (\[AdminCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCollection/page.mdx)\[]) The list of collections.

    - id: (\`string\`) The collection's ID.

    - title: (\`string\`) The collection's title.

    - handle: (\`string\`) The collection's handle.

    - created\_at: (\`string\`) The date the collection was created.

    - updated\_at: (\`string\`) The date the collection was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the collection was deleted.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - products: (\[BaseProduct]\(../../../../../types/interfaces/types.BaseProduct/page.mdx)\[]) The collection's products.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## retrieve

This method retrieves a collection by its ID. It sends a request to the
[Get Collection](https://docs.medusajs.com/api/admin#collections_getcollectionsid) API route.

### Example

To retrieve a collection by its ID:

```ts
sdk.admin.productCollection.retrieve("pcol_123")
.then(({ collection }) => {
  console.log(collection)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.productCollection.retrieve("pcol_123", {
  fields: "id,*products"
})
.then(({ collection }) => {
  console.log(collection)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- id: (\`string\`) The collection's ID.
- query: (\[AdminCollectionParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCollectionParams/page.mdx)) Configure the fields to retrieve in the collection.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminCollectionResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCollectionResponse/page.mdx)\&#62;) The collection's details.

  - collection: (\[AdminCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCollection/page.mdx)) The collection's details.

    - id: (\`string\`) The collection's ID.

    - title: (\`string\`) The collection's title.

    - handle: (\`string\`) The collection's handle.

    - created\_at: (\`string\`) The date the collection was created.

    - updated\_at: (\`string\`) The date the collection was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the collection was deleted.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - products: (\[BaseProduct]\(../../../../../types/interfaces/types.BaseProduct/page.mdx)\[]) The collection's products.

***

## delete

This method deletes a product collection. It sends a request to the
[Delete Collection](https://docs.medusajs.com/api/admin#collections_deletecollectionsid)
API route.

### Example

```ts
sdk.admin.productCollection.delete("pcol_123")
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- id: (\`string\`) The collection's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminCollectionDeleteResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCollectionDeleteResponse/page.mdx)\&#62;) The deletion's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (\`"collection"\`) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.

***

## updateProducts

This method manages the products of a collection to add or remove them. It sends a request
to the [Manage Products](https://docs.medusajs.com/api/admin#collections_postcollectionsidproducts)
API route.

### Example

```ts
sdk.admin.productCollection.updateProducts("pcol_123", {
  add: ["prod_123"],
  remove: ["prod_321"]
})
.then(({ collection }) => {
  console.log(collection)
})
```

### Parameters

- id: (\`string\`) The collection's ID.
- body: (\[AdminUpdateCollectionProducts]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateCollectionProducts/page.mdx)) The products to add or remove.

  - add: (\`string\`\[]) IDs of products to add to the collection.

  - remove: (\`string\`\[]) IDs of products to remove from the collection.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminCollectionResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCollectionResponse/page.mdx)\&#62;) The product category's details.

  - collection: (\[AdminCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCollection/page.mdx)) The collection's details.

    - id: (\`string\`) The collection's ID.

    - title: (\`string\`) The collection's title.

    - handle: (\`string\`) The collection's handle.

    - created\_at: (\`string\`) The date the collection was created.

    - updated\_at: (\`string\`) The date the collection was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the collection was deleted.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - products: (\[BaseProduct]\(../../../../../types/interfaces/types.BaseProduct/page.mdx)\[]) The collection's products.
