# category - JS SDK Store Reference

This documentation provides a reference to the `sdk.store.category` set of methods used to send requests to Medusa's Store API routes.

## list

This method retrieves a paginated list of product categories. It sends a request to the
[List Categories](https://docs.medusajs.com/api/store#product-categories_getproductcategories) API route.

Related guide: [How to retrieve list of categories in the storefront](https://docs.medusajs.com/resources/storefront-development/products/categories/list).

### Example

To retrieve the list of categories:

```ts
sdk.store.category.list()
.then(({ product_categories, count, offset, limit }) => {
  console.log(product_categories)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.store.category.list({
  limit: 10,
  offset: 10
})
.then(({ product_categories, count, offset, limit }) => {
  console.log(product_categories)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each category:

```ts
sdk.store.category.list({
  fields: "id,*parent_category"
})
.then(({ product_categories, count, offset, limit }) => {
  console.log(product_categories)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- query: (\[FindParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.FindParams/page.mdx) & \[StoreProductCategoryListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreProductCategoryListParams/page.mdx)) Filters and pagination configurations.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - $and: ((\[BaseProductCategoryListParams]\(../../../../../types/interfaces/types.BaseProductCategoryListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseProductCategoryListParams]\(../../../../../types/interfaces/types.BaseProductCategoryListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[BaseProductCategoryListParams]\(../../../../../types/interfaces/types.BaseProductCategoryListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseProductCategoryListParams]\(../../../../../types/interfaces/types.BaseProductCategoryListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[BaseProductCategoryListParams]\(../../../../../types/interfaces/types.BaseProductCategoryListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseProductCategoryListParams]\(../../../../../types/interfaces/types.BaseProductCategoryListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`) A query or keywords to search the category's searchable fields.

    - id: (\`string\` \\| \`string\`\[]) Filter by the category's ID(s).

    - name: (\`string\` \\| \`string\`\[]) Filter by the category's name(s).

    - description: (\`string\` \\| \`string\`\[]) Filter by the category's description(s).

    - parent\_category\_id: (\`null\` \\| \`string\` \\| \`string\`\[]) Retrieve the child categories of the specified parent ID(s).

    - handle: (\`string\` \\| \`string\`\[]) Filter by the category's handle(s).

    - is\_active: (\`boolean\`) Filter by whether the category is active.

    - is\_internal: (\`boolean\`) Filter by whether the category is internal.

    - include\_descendants\_tree: (\`boolean\`) Whether to retrieve the child categories. If enabled, the child categories are
      retrieved in the \`category\_children\` field.

    - include\_ancestors\_tree: (\`boolean\`) Whether to retrieve the parent category. If enabled, the parent category is
      retrieved in the \`parent\_category\` field.

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the category's creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the category's update date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the category's deletion date.

  - $or: ((\[BaseProductCategoryListParams]\(../../../../../types/interfaces/types.BaseProductCategoryListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseProductCategoryListParams]\(../../../../../types/interfaces/types.BaseProductCategoryListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[BaseProductCategoryListParams]\(../../../../../types/interfaces/types.BaseProductCategoryListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseProductCategoryListParams]\(../../../../../types/interfaces/types.BaseProductCategoryListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[BaseProductCategoryListParams]\(../../../../../types/interfaces/types.BaseProductCategoryListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseProductCategoryListParams]\(../../../../../types/interfaces/types.BaseProductCategoryListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`) A query or keywords to search the category's searchable fields.

    - id: (\`string\` \\| \`string\`\[]) Filter by the category's ID(s).

    - name: (\`string\` \\| \`string\`\[]) Filter by the category's name(s).

    - description: (\`string\` \\| \`string\`\[]) Filter by the category's description(s).

    - parent\_category\_id: (\`null\` \\| \`string\` \\| \`string\`\[]) Retrieve the child categories of the specified parent ID(s).

    - handle: (\`string\` \\| \`string\`\[]) Filter by the category's handle(s).

    - is\_active: (\`boolean\`) Filter by whether the category is active.

    - is\_internal: (\`boolean\`) Filter by whether the category is internal.

    - include\_descendants\_tree: (\`boolean\`) Whether to retrieve the child categories. If enabled, the child categories are
      retrieved in the \`category\_children\` field.

    - include\_ancestors\_tree: (\`boolean\`) Whether to retrieve the parent category. If enabled, the parent category is
      retrieved in the \`parent\_category\` field.

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the category's creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the category's update date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the category's deletion date.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - q: (\`string\`) A query or keywords to search the category's searchable fields.

  - id: (\`string\` \\| \`string\`\[]) Filter by the category's ID(s).

  - name: (\`string\` \\| \`string\`\[]) Filter by the category's name(s).

  - description: (\`string\` \\| \`string\`\[]) Filter by the category's description(s).

  - parent\_category\_id: (\`null\` \\| \`string\` \\| \`string\`\[]) Retrieve the child categories of the specified parent ID(s).

  - handle: (\`string\` \\| \`string\`\[]) Filter by the category's handle(s).

  - include\_descendants\_tree: (\`boolean\`) Whether to retrieve the child categories. If enabled, the child categories are
    retrieved in the \`category\_children\` field.

  - include\_ancestors\_tree: (\`boolean\`) Whether to retrieve the parent category. If enabled, the parent category is
    retrieved in the \`parent\_category\` field.

  - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the category's creation date.

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

  - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the category's update date.

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
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreProductCategoryListResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreProductCategoryListResponse/page.mdx)\&#62;) The paginated list of categories.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - product\_categories: (\[StoreProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreProductCategory/page.mdx)\[]) The paginated list of categories.

    - id: (\`string\`) The category's ID.

    - name: (\`string\`) The category's name.

    - description: (\`string\`) The category's description.

    - handle: (\`string\`) The product category's unique handle. Can be used to create
      human-readable URLs.

    - rank: (\`null\` \\| \`number\`) The category's ranking among sibling categories.

    - parent\_category\_id: (\`null\` \\| \`string\`) The ID of the category's parent.

    - created\_at: (\`string\`) The date the category was created.

    - updated\_at: (\`string\`) The date the category was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the category was deleted.

    - parent\_category: (\`null\` \\| \[StoreProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreProductCategory/page.mdx)) The parent category.

    - category\_children: (\[StoreProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreProductCategory/page.mdx)\[]) The category's children.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - products: (\[StoreProduct]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreProduct/page.mdx)\[]) The category's products.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## retrieve

This method retrieves a category by its ID. It sends a request to the
[Retrieve Product Category](https://docs.medusajs.com/api/store#product-categories_getproductcategoriesid).

Related guide: [How to retrieve a category in the storefront](https://docs.medusajs.com/resources/storefront-development/products/categories/retrieve).

### Example

To retrieve a category by its ID:

```ts
sdk.store.category.retrieve("pcat_123")
.then(({ product_category }) => {
  console.log(product_category)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.store.category.retrieve("pcat_123", {
  fields: "id,*parent_category"
})
.then(({ product_category }) => {
  console.log(product_category)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- id: (\`string\`) The ID of the category to retrieve.
- query: (\[StoreProductCategoryParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreProductCategoryParams/page.mdx)) Configure the fields to retrieve in the category.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - include\_ancestors\_tree: (\`boolean\`) Whether to retrieve the parent category. If enabled, the parent category is
    retrieved in the \`parent\_category\` field.

  - include\_descendants\_tree: (\`boolean\`) Whether to retrieve the child categories. If enabled, the child categories are
    retrieved in the \`category\_children\` field.
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreProductCategoryResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreProductCategoryResponse/page.mdx)\&#62;) The category.

  - product\_category: (\[StoreProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreProductCategory/page.mdx)) The category's details.

    - id: (\`string\`) The category's ID.

    - name: (\`string\`) The category's name.

    - description: (\`string\`) The category's description.

    - handle: (\`string\`) The product category's unique handle. Can be used to create
      human-readable URLs.

    - rank: (\`null\` \\| \`number\`) The category's ranking among sibling categories.

    - parent\_category\_id: (\`null\` \\| \`string\`) The ID of the category's parent.

    - created\_at: (\`string\`) The date the category was created.

    - updated\_at: (\`string\`) The date the category was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the category was deleted.

    - parent\_category: (\`null\` \\| \[StoreProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreProductCategory/page.mdx)) The parent category.

    - category\_children: (\[StoreProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreProductCategory/page.mdx)\[]) The category's children.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - products: (\[StoreProduct]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreProduct/page.mdx)\[]) The category's products.
