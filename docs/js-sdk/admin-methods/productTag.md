# productTag - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.productTag` set of methods used to send requests to Medusa's Admin API routes.

## create

This method creates a product tag. It sends a request to the
[Create Product Tag](https://docs.medusajs.com/api/admin#product-tags_postproducttags)
API route.

### Example

```ts
sdk.admin.productTag.create({
  value: "shirt"
})
.then(({ product_tag }) => {
  console.log(product_tag)
})
```

### Parameters

- body: (\[AdminCreateProductTag]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateProductTag/page.mdx)) The details of the product tag.

  - value: (\`string\`) The tag's value.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[AdminProductTagParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTagParams/page.mdx)) Configure the fields to retrieve in the product tag.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminProductTagResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTagResponse/page.mdx)\&#62;) The product tag's details.

  - product\_tag: (\[AdminProductTag]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTag/page.mdx)) The tag's details.

    - id: (\`string\`) The tag's ID.

    - value: (\`string\`) The tag's value.

    - created\_at: (\`string\`) The date the tag was created.

    - updated\_at: (\`string\`) The date the tag was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the tag was deleted.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## update

This method updates a tag's details. It sends a request to the
[Update Product Tag](https://docs.medusajs.com/api/admin#product-tags_postproducttagsid)
API route.

### Example

```ts
sdk.admin.productTag.update("ptag_123", {
  value: "shirt"
})
.then(({ product_tag }) => {
  console.log(product_tag)
})
```

### Parameters

- id: (\`string\`) The tag's ID.
- body: (\[AdminUpdateProductTag]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateProductTag/page.mdx)) The data to update in the tag.

  - value: (\`string\`) The tag's value.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[AdminProductTagParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTagParams/page.mdx)) Configure the fields to retrieve in the product tag.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminProductTagResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTagResponse/page.mdx)\&#62;) The product tag's details.

  - product\_tag: (\[AdminProductTag]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTag/page.mdx)) The tag's details.

    - id: (\`string\`) The tag's ID.

    - value: (\`string\`) The tag's value.

    - created\_at: (\`string\`) The date the tag was created.

    - updated\_at: (\`string\`) The date the tag was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the tag was deleted.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## list

This method retrieves a paginated list of product tags. It sends a request to the
[List Product Tags](https://docs.medusajs.com/api/admin#product-tags_getproducttags) API route.

### Example

To retrieve the list of product tags:

```ts
sdk.admin.productTag.list()
.then(({ product_tags, count, limit, offset }) => {
  console.log(product_tags)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.productTag.list({
  limit: 10,
  offset: 10
})
.then(({ product_tags, count, limit, offset }) => {
  console.log(product_tags)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each product tag:

```ts
sdk.admin.productTag.list({
  fields: "id,*products"
})
.then(({ product_tags, count, limit, offset }) => {
  console.log(product_tags)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- query: (\[AdminProductTagListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTagListParams/page.mdx)) Filters and pagination configurations.

  - $and: ((\[AdminProductTagListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTagListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminProductTagListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTagListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[AdminProductTagListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTagListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminProductTagListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTagListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminProductTagListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTagListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminProductTagListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTagListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the tag's deletion date.

    - q: (\`string\`) Query or keyword to apply on the tag's searchable fields.

    - id: (\`string\` \\| \`string\`\[]) Filter by tag ID(s).

    - value: (\`string\` \\| \`string\`\[]) Filter by value(s).

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the update date.

  - $or: ((\[AdminProductTagListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTagListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminProductTagListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTagListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[AdminProductTagListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTagListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminProductTagListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTagListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminProductTagListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTagListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminProductTagListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTagListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the tag's deletion date.

    - q: (\`string\`) Query or keyword to apply on the tag's searchable fields.

    - id: (\`string\` \\| \`string\`\[]) Filter by tag ID(s).

    - value: (\`string\` \\| \`string\`\[]) Filter by value(s).

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the update date.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the tag's deletion date.

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

  - q: (\`string\`) Query or keyword to apply on the tag's searchable fields.

  - id: (\`string\` \\| \`string\`\[]) Filter by tag ID(s).

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
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminProductTagListResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTagListResponse/page.mdx)\&#62;) The paginated list of product tags.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - product\_tags: (\[AdminProductTag]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTag/page.mdx)\[]) The list of product tags.

    - id: (\`string\`) The tag's ID.

    - value: (\`string\`) The tag's value.

    - created\_at: (\`string\`) The date the tag was created.

    - updated\_at: (\`string\`) The date the tag was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the tag was deleted.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## retrieve

This method retrieves a product tag by its ID. It sends a request to the
[Get Product Tag](https://docs.medusajs.com/api/admin#product-tags_getproducttagsid) API route.

### Example

To retrieve a product tag by its ID:

```ts
sdk.admin.productTag.retrieve("ptag_123")
.then(({ product_tag }) => {
  console.log(product_tag)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.productTag.retrieve("ptag_123", {
  fields: "id,*products"
})
.then(({ product_tag }) => {
  console.log(product_tag)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- id: (\`string\`) The product tag's ID.
- query: (\[AdminProductTagParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTagParams/page.mdx)) Configure the fields to retrieve in the product tag.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminProductTagResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTagResponse/page.mdx)\&#62;) The product tag's details.

  - product\_tag: (\[AdminProductTag]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTag/page.mdx)) The tag's details.

    - id: (\`string\`) The tag's ID.

    - value: (\`string\`) The tag's value.

    - created\_at: (\`string\`) The date the tag was created.

    - updated\_at: (\`string\`) The date the tag was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the tag was deleted.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## delete

This method deletes a product tag. It sends a request to the
[Delete Product Tag](https://docs.medusajs.com/api/admin#product-tags_deleteproducttagsid)
API route.

### Example

```ts
sdk.admin.productTag.delete("ptag_123")
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- id: (\`string\`) The tag's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminProductTagDeleteResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTagDeleteResponse/page.mdx)\&#62;) The deletion's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (\`"product\_tag"\`) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.
