# productCategory - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.productCategory` set of methods used to send requests to Medusa's Admin API routes.

## create

This method creates a product category. It sends a request to the
[Create Category](https://docs.medusajs.com/api/admin#product-categories_postproductcategories)
API route.

### Example

```ts
sdk.admin.productCategory.create({
  name: "Shirts"
})
.then(({ product_category }) => {
  console.log(product_category)
})
```

### Parameters

- body: (\[AdminCreateProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateProductCategory/page.mdx)) The details of the category to create.

  - name: (\`string\`) The product category's name.

  - description: (\`string\`) The product category's description.

  - handle: (\`string\`) The product category's unique handle. Can be used to create
    human-readable URLs.

  - is\_internal: (\`boolean\`) Whether the category is only available and viewable by
    admin users.

  - is\_active: (\`boolean\`) Whether the category is active. If disabled, the category
    isn't retrieved in the store API routes.

  - parent\_category\_id: (\`string\`) The ID of the parent category.

  - rank: (\`number\`) The category's ranking among its sibling categories.

  - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[AdminProductCategoryParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategoryParams/page.mdx)) Configure the fields to retrieve in the category.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - include\_ancestors\_tree: (\`boolean\`) Whether to retrieve the parent category. If enabled, the parent category is
    retrieved in the \`parent\_category\` field.

  - include\_descendants\_tree: (\`boolean\`) Whether to retrieve the child categories. If enabled, the child categories are
    retrieved in the \`category\_children\` field.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminProductCategoryResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategoryResponse/page.mdx)\&#62;) The category's details.

  - product\_category: (\[AdminProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategory/page.mdx)) The category's details.

    - category\_children: (\[AdminProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategory/page.mdx)\[]) The category's children.

    - parent\_category: (\`null\` \\| \[AdminProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategory/page.mdx)) The parent category's details.

    - id: (\`string\`) The category's ID.

    - name: (\`string\`) The category's name.

    - description: (\`string\`) The category's description.

    - handle: (\`string\`) The product category's unique handle. Can be used to create
      human-readable URLs.

    - is\_active: (\`boolean\`) Whether the category is active.

    - is\_internal: (\`boolean\`) Whether the category is internal.

    - rank: (\`null\` \\| \`number\`) The category's ranking among sibling categories.

    - parent\_category\_id: (\`null\` \\| \`string\`) The ID of the category's parent.

    - created\_at: (\`string\`) The date the category was created.

    - updated\_at: (\`string\`) The date the category was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the category was deleted.

    - products: (\[AdminProduct]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProduct/page.mdx)\[]) The products that belong to this category.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## update

This method updates a product category. It sends a request to the
[Update Category](https://docs.medusajs.com/api/admin#product-categories_postproductcategoriesid)
API route.

### Example

```ts
sdk.admin.productCategory.update("pcat_123", {
  name: "Shirts"
})
.then(({ product_category }) => {
  console.log(product_category)
})
```

### Parameters

- id: (\`string\`) The product category's ID.
- body: (\[AdminUpdateProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateProductCategory/page.mdx)) The data to update in the category.

  - name: (\`string\`) The product category's name.

  - description: (\`string\`) The product category's description.

  - handle: (\`string\`) The product category's unique handle. Can be used to create
    human-readable URLs.

  - is\_internal: (\`boolean\`) Whether the category is only available and viewable by
    admin users.

  - is\_active: (\`boolean\`) Whether the category is active. If disabled, the category
    isn't retrieved in the store API routes.

  - parent\_category\_id: (\`null\` \\| \`string\`) The ID of the parent category.

  - rank: (\`number\`) The category's ranking among its sibling categories.

  - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[AdminProductCategoryParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategoryParams/page.mdx)) Configure the fields to retrieve in the category.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - include\_ancestors\_tree: (\`boolean\`) Whether to retrieve the parent category. If enabled, the parent category is
    retrieved in the \`parent\_category\` field.

  - include\_descendants\_tree: (\`boolean\`) Whether to retrieve the child categories. If enabled, the child categories are
    retrieved in the \`category\_children\` field.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminProductCategoryResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategoryResponse/page.mdx)\&#62;) The category's details.

  - product\_category: (\[AdminProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategory/page.mdx)) The category's details.

    - category\_children: (\[AdminProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategory/page.mdx)\[]) The category's children.

    - parent\_category: (\`null\` \\| \[AdminProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategory/page.mdx)) The parent category's details.

    - id: (\`string\`) The category's ID.

    - name: (\`string\`) The category's name.

    - description: (\`string\`) The category's description.

    - handle: (\`string\`) The product category's unique handle. Can be used to create
      human-readable URLs.

    - is\_active: (\`boolean\`) Whether the category is active.

    - is\_internal: (\`boolean\`) Whether the category is internal.

    - rank: (\`null\` \\| \`number\`) The category's ranking among sibling categories.

    - parent\_category\_id: (\`null\` \\| \`string\`) The ID of the category's parent.

    - created\_at: (\`string\`) The date the category was created.

    - updated\_at: (\`string\`) The date the category was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the category was deleted.

    - products: (\[AdminProduct]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProduct/page.mdx)\[]) The products that belong to this category.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## list

This method retrieves a paginated list of product categories. It sends a request to the
[List Product Categories](https://docs.medusajs.com/api/admin#product-categories_getproductcategories) API route.

### Example

To retrieve the list of product categories:

```ts
sdk.admin.productCategory.list()
.then(({ product_categories, count, limit, offset }) => {
  console.log(product_categories)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.productCategory.list({
  limit: 10,
  offset: 10
})
.then(({ product_categories, count, limit, offset }) => {
  console.log(product_categories)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each product category:

```ts
sdk.admin.productCategory.list({
  fields: "id,*products"
})
.then(({ product_categories, count, limit, offset }) => {
  console.log(product_categories)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- query: (\[AdminProductCategoryListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategoryListParams/page.mdx)) Filters and pagination configurations.

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

  - is\_internal: (\`boolean\`) Filter by whether the category is only available internally.

  - is\_active: (\`boolean\`) Filter by whether the category is active.

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

  - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the category's deletion date.

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

- Promise: (Promise\&#60;\[AdminProductCategoryListResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategoryListResponse/page.mdx)\&#62;) The paginated list of product categories.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - product\_categories: (\[AdminProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategory/page.mdx)\[]) The list of product categories.

    - category\_children: (\[AdminProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategory/page.mdx)\[]) The category's children.

    - parent\_category: (\`null\` \\| \[AdminProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategory/page.mdx)) The parent category's details.

    - id: (\`string\`) The category's ID.

    - name: (\`string\`) The category's name.

    - description: (\`string\`) The category's description.

    - handle: (\`string\`) The product category's unique handle. Can be used to create
      human-readable URLs.

    - is\_active: (\`boolean\`) Whether the category is active.

    - is\_internal: (\`boolean\`) Whether the category is internal.

    - rank: (\`null\` \\| \`number\`) The category's ranking among sibling categories.

    - parent\_category\_id: (\`null\` \\| \`string\`) The ID of the category's parent.

    - created\_at: (\`string\`) The date the category was created.

    - updated\_at: (\`string\`) The date the category was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the category was deleted.

    - products: (\[AdminProduct]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProduct/page.mdx)\[]) The products that belong to this category.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## retrieve

This method retrieves a product category by its ID. It sends a request to the
[Get Product Category](https://docs.medusajs.com/api/admin#product-categories_getproductcategoriesid) API route.

### Example

To retrieve a product category by its ID:

```ts
sdk.admin.productCategory.retrieve("pcat_123")
.then(({ product_category }) => {
  console.log(product_category)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.productCategory.retrieve("pcat_123", {
  fields: "id,*products"
})
.then(({ product_category }) => {
  console.log(product_category)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- id: (\`string\`) The category's ID.
- query: (\[AdminProductCategoryParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategoryParams/page.mdx)) Configure the fields to retrieve in the product category.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - include\_ancestors\_tree: (\`boolean\`) Whether to retrieve the parent category. If enabled, the parent category is
    retrieved in the \`parent\_category\` field.

  - include\_descendants\_tree: (\`boolean\`) Whether to retrieve the child categories. If enabled, the child categories are
    retrieved in the \`category\_children\` field.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminProductCategoryResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategoryResponse/page.mdx)\&#62;) The product category's details.

  - product\_category: (\[AdminProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategory/page.mdx)) The category's details.

    - category\_children: (\[AdminProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategory/page.mdx)\[]) The category's children.

    - parent\_category: (\`null\` \\| \[AdminProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategory/page.mdx)) The parent category's details.

    - id: (\`string\`) The category's ID.

    - name: (\`string\`) The category's name.

    - description: (\`string\`) The category's description.

    - handle: (\`string\`) The product category's unique handle. Can be used to create
      human-readable URLs.

    - is\_active: (\`boolean\`) Whether the category is active.

    - is\_internal: (\`boolean\`) Whether the category is internal.

    - rank: (\`null\` \\| \`number\`) The category's ranking among sibling categories.

    - parent\_category\_id: (\`null\` \\| \`string\`) The ID of the category's parent.

    - created\_at: (\`string\`) The date the category was created.

    - updated\_at: (\`string\`) The date the category was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the category was deleted.

    - products: (\[AdminProduct]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProduct/page.mdx)\[]) The products that belong to this category.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## delete

This method deletes a product category. It sends a request to the
[Delete Product Category](https://docs.medusajs.com/api/admin#product-categories_deleteproductcategoriesid)
API route.

### Example

```ts
sdk.admin.productCategory.delete("pcat_123")
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- id: (\`string\`) The category's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminProductCategoryDeleteResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategoryDeleteResponse/page.mdx)\&#62;) The deletion's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (\`"product\_category"\`) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.

***

## updateProducts

This method manaes the products of a category to add or remove them. It sends a request
to the [Manage Products](https://docs.medusajs.com/api/admin#product-categories_postproductcategoriesidproducts)
API route.

### Example

```ts
sdk.admin.productCategory.updateProducts("pcat_123", {
  add: ["prod_123"],
  remove: ["prod_321"]
})
.then(({ product_category }) => {
  console.log(product_category)
})
```

### Parameters

- id: (\`string\`) The category's ID.
- body: (\[AdminUpdateProductCategoryProducts]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateProductCategoryProducts/page.mdx)) The products to create or update.

  - add: (\`string\`\[]) IDs of products to add to the category.

  - remove: (\`string\`\[]) IDs of products to remove from the category.
- query: (\[AdminProductCategoryParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategoryParams/page.mdx)) Configure the fields to retrieve in the product category.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - include\_ancestors\_tree: (\`boolean\`) Whether to retrieve the parent category. If enabled, the parent category is
    retrieved in the \`parent\_category\` field.

  - include\_descendants\_tree: (\`boolean\`) Whether to retrieve the child categories. If enabled, the child categories are
    retrieved in the \`category\_children\` field.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminProductCategoryResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategoryResponse/page.mdx)\&#62;) The product category's details.

  - product\_category: (\[AdminProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategory/page.mdx)) The category's details.

    - category\_children: (\[AdminProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategory/page.mdx)\[]) The category's children.

    - parent\_category: (\`null\` \\| \[AdminProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategory/page.mdx)) The parent category's details.

    - id: (\`string\`) The category's ID.

    - name: (\`string\`) The category's name.

    - description: (\`string\`) The category's description.

    - handle: (\`string\`) The product category's unique handle. Can be used to create
      human-readable URLs.

    - is\_active: (\`boolean\`) Whether the category is active.

    - is\_internal: (\`boolean\`) Whether the category is internal.

    - rank: (\`null\` \\| \`number\`) The category's ranking among sibling categories.

    - parent\_category\_id: (\`null\` \\| \`string\`) The ID of the category's parent.

    - created\_at: (\`string\`) The date the category was created.

    - updated\_at: (\`string\`) The date the category was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the category was deleted.

    - products: (\[AdminProduct]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProduct/page.mdx)\[]) The products that belong to this category.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.
