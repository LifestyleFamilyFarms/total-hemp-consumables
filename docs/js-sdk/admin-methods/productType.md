# productType - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.productType` set of methods used to send requests to Medusa's Admin API routes.

## create

This method creates a product type. It sends a request to the
[Create Product Type](https://docs.medusajs.com/api/admin#product-types_postproducttypes)
API route.

### Example

```ts
sdk.admin.productType.create({
  value: "Clothes"
})
.then(({ product_type }) => {
  console.log(product_type)
})
```

### Parameters

- body: (\[AdminCreateProductType]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateProductType/page.mdx)) The product type's details.

  - value: (\`string\`) The type's value.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the product type.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminProductTypeResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTypeResponse/page.mdx)\&#62;) The product type's details.

  - product\_type: (\[AdminProductType]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductType/page.mdx)) The product type's details.

    - id: (\`string\`) The product type's ID.

    - value: (\`string\`) The product type's value.

    - created\_at: (\`string\`) The date the product type was created.

    - updated\_at: (\`string\`) The date the product type was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the product type was deleted.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## update

This method updates a product type. It sends a request to the
[Update Product Type](https://docs.medusajs.com/api/admin#product-types_postproducttypesid)
API route.

### Example

```ts
sdk.admin.productType.update("ptyp_123", {
  value: "Clothes"
})
.then(({ product_type }) => {
  console.log(product_type)
})
```

### Parameters

- id: (\`string\`) The product type's ID.
- body: (\[AdminUpdateProductType]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateProductType/page.mdx)) The data to update in the product type.

  - value: (\`string\`) The type's value.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the product type.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminProductTypeResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTypeResponse/page.mdx)\&#62;) The product type's details.

  - product\_type: (\[AdminProductType]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductType/page.mdx)) The product type's details.

    - id: (\`string\`) The product type's ID.

    - value: (\`string\`) The product type's value.

    - created\_at: (\`string\`) The date the product type was created.

    - updated\_at: (\`string\`) The date the product type was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the product type was deleted.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## list

This method retrieves a paginated list of product types. It sends a request to the
[List Product Types](https://docs.medusajs.com/api/admin#product-types_getproducttypes) API route.

### Example

To retrieve the list of product types:

```ts
sdk.admin.productType.list()
.then(({ product_types, count, limit, offset }) => {
  console.log(product_types)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.productType.list({
  limit: 10,
  offset: 10
})
.then(({ product_types, count, limit, offset }) => {
  console.log(product_types)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each product type:

```ts
sdk.admin.productType.list({
  fields: "id,*products"
})
.then(({ product_types, count, limit, offset }) => {
  console.log(product_types)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- query: (\[AdminProductTypeListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTypeListParams/page.mdx)) Filters and pagination configurations.

  - $and: ((\[AdminProductTypeListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTypeListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminProductTypeListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTypeListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[AdminProductTypeListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTypeListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminProductTypeListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTypeListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminProductTypeListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTypeListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminProductTypeListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTypeListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`) Query or keywords to apply filters on the type's searchable fields.

    - id: (\`string\` \\| \`string\`\[]) Filter by product type ID(s).

    - value: (\`string\` \\| \`string\`\[]) Filter by value(s).

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the update date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the deletion date.

  - $or: ((\[AdminProductTypeListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTypeListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminProductTypeListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTypeListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[AdminProductTypeListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTypeListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminProductTypeListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTypeListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminProductTypeListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTypeListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminProductTypeListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTypeListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`) Query or keywords to apply filters on the type's searchable fields.

    - id: (\`string\` \\| \`string\`\[]) Filter by product type ID(s).

    - value: (\`string\` \\| \`string\`\[]) Filter by value(s).

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the update date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the deletion date.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - q: (\`string\`) Query or keywords to apply filters on the type's searchable fields.

  - id: (\`string\` \\| \`string\`\[]) Filter by product type ID(s).

  - value: (\`string\` \\| \`string\`\[]) Filter by value(s).

  - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the creation date.

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

  - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the update date.

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

  - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the deletion date.

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

- Promise: (Promise\&#60;\[AdminProductTypeListResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTypeListResponse/page.mdx)\&#62;) The paginated list of product types.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - product\_types: (\[AdminProductType]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductType/page.mdx)\[]) The list of product types.

    - id: (\`string\`) The product type's ID.

    - value: (\`string\`) The product type's value.

    - created\_at: (\`string\`) The date the product type was created.

    - updated\_at: (\`string\`) The date the product type was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the product type was deleted.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## retrieve

This method retrieves a product type by its ID. It sends a request to the
[Get Product Type](https://docs.medusajs.com/api/admin#product-types_getproducttypesid)
API route.

### Example

To retrieve a product type by its ID:

```ts
sdk.admin.productType.retrieve("ptyp_123")
.then(({ product_type }) => {
  console.log(product_type)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.productType.retrieve("ptyp_123", {
  fields: "id,*products"
})
.then(({ product_type }) => {
  console.log(product_type)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- id: (\`string\`) The product type's ID.
- query: (\[AdminProductTypeParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTypeParams/page.mdx)) Configure the fields to retrieve in the product type.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminProductTypeResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTypeResponse/page.mdx)\&#62;) The product type's details.

  - product\_type: (\[AdminProductType]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductType/page.mdx)) The product type's details.

    - id: (\`string\`) The product type's ID.

    - value: (\`string\`) The product type's value.

    - created\_at: (\`string\`) The date the product type was created.

    - updated\_at: (\`string\`) The date the product type was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the product type was deleted.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## delete

This method deletes a product type. It sends a request to the
[Delete Product Type](https://docs.medusajs.com/api/admin#product-types_deleteproducttypesid)
API route.

### Example

```ts
sdk.admin.productType.delete("ptyp_123")
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- id: (\`string\`) The product type's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminProductTypeDeleteResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTypeDeleteResponse/page.mdx)\&#62;) The product type's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (\`"product\_type"\`) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.
