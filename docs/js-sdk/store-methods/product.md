# product - JS SDK Store Reference

This documentation provides a reference to the `sdk.store.product` set of methods used to send requests to Medusa's Store API routes.

## list

This method retrieves a list of products. It sends a request to the
[List Products API route](https://docs.medusajs.com/api/store#products_getproducts).

Related guides:

- [How to list products in a storefront](https://docs.medusajs.com/resources/storefront-development/products/list).
- [How to retrieve a product variant's prices in the storefront](https://docs.medusajs.com/resources/storefront-development/products/price)

### Example

To retrieve the list of products:

```ts
sdk.store.product.list()
.then(({ products, count, offset, limit }) => {
  console.log(products)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.store.product.list({
  limit: 10,
  offset: 10
})
.then(({ products, count, offset, limit }) => {
  console.log(products)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each product:

```ts
sdk.store.product.list({
  fields: "id,*collection"
})
.then(({ products, count, offset, limit }) => {
  console.log(products)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- query: (\[StoreProductListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreProductListParams/page.mdx)) Filters and pagination configurations.

  - $and: ((\[BaseProductListParams]\(../../../../../types/interfaces/types.BaseProductListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseProductListParams]\(../../../../../types/interfaces/types.BaseProductListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[BaseProductListParams]\(../../../../../types/interfaces/types.BaseProductListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseProductListParams]\(../../../../../types/interfaces/types.BaseProductListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[BaseProductListParams]\(../../../../../types/interfaces/types.BaseProductListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseProductListParams]\(../../../../../types/interfaces/types.BaseProductListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`) A query or keywords to search the searchable fields by.

    - status: (\[ProductStatus]\(../../../../../types/types/types.ProductStatus/page.mdx) \\| \[ProductStatus]\(../../../../../types/types/types.ProductStatus/page.mdx)\[]) Filter the product by status(es).

    - sales\_channel\_id: (\`string\` \\| \`string\`\[]) Filter the product by the sales channel(s) it belongs to.

    - title: (\`string\` \\| \`string\`\[]) Filter by the product's title(s).

    - handle: (\`string\` \\| \`string\`\[]) Filter by the product's handle(s).

    - id: (\`string\` \\| \`string\`\[]) Filter by the product's id(s).

    - is\_giftcard: (\`boolean\`) Filter by whether the product is a gift card.

    - tags: (\`string\` \\| \`string\`\[]) Filter by the product's tag(s).

    - type\_id: (\`string\` \\| \`string\`\[]) Filter by the product's type(s).

    - category\_id: (\`string\` \\| \`string\`\[]) Filter by the product's category(s).

    - categories: (\`string\` \\| \`string\`\[]) Filter by the product's category(s).

    - collection\_id: (\`string\` \\| \`string\`\[]) Filter by the product's collection(s).

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filers on the product's creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filers on the product's update date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filers on the product's deletion date.

  - $or: ((\[BaseProductListParams]\(../../../../../types/interfaces/types.BaseProductListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseProductListParams]\(../../../../../types/interfaces/types.BaseProductListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[BaseProductListParams]\(../../../../../types/interfaces/types.BaseProductListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseProductListParams]\(../../../../../types/interfaces/types.BaseProductListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[BaseProductListParams]\(../../../../../types/interfaces/types.BaseProductListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseProductListParams]\(../../../../../types/interfaces/types.BaseProductListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`) A query or keywords to search the searchable fields by.

    - status: (\[ProductStatus]\(../../../../../types/types/types.ProductStatus/page.mdx) \\| \[ProductStatus]\(../../../../../types/types/types.ProductStatus/page.mdx)\[]) Filter the product by status(es).

    - sales\_channel\_id: (\`string\` \\| \`string\`\[]) Filter the product by the sales channel(s) it belongs to.

    - title: (\`string\` \\| \`string\`\[]) Filter by the product's title(s).

    - handle: (\`string\` \\| \`string\`\[]) Filter by the product's handle(s).

    - id: (\`string\` \\| \`string\`\[]) Filter by the product's id(s).

    - is\_giftcard: (\`boolean\`) Filter by whether the product is a gift card.

    - tags: (\`string\` \\| \`string\`\[]) Filter by the product's tag(s).

    - type\_id: (\`string\` \\| \`string\`\[]) Filter by the product's type(s).

    - category\_id: (\`string\` \\| \`string\`\[]) Filter by the product's category(s).

    - categories: (\`string\` \\| \`string\`\[]) Filter by the product's category(s).

    - collection\_id: (\`string\` \\| \`string\`\[]) Filter by the product's collection(s).

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filers on the product's creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filers on the product's update date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filers on the product's deletion date.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - q: (\`string\`) A query or keywords to search the searchable fields by.

  - sales\_channel\_id: (\`string\` \\| \`string\`\[]) Filter the product by the sales channel(s) it belongs to.

  - title: (\`string\` \\| \`string\`\[]) Filter by the product's title(s).

  - handle: (\`string\` \\| \`string\`\[]) Filter by the product's handle(s).

  - id: (\`string\` \\| \`string\`\[]) Filter by the product's id(s).

  - is\_giftcard: (\`boolean\`) Filter by whether the product is a gift card.

  - type\_id: (\`string\` \\| \`string\`\[]) Filter by the product's type(s).

  - category\_id: (\`string\` \\| \`string\`\[]) Filter by the product's category(s).

  - collection\_id: (\`string\` \\| \`string\`\[]) Filter by the product's collection(s).

  - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filers on the product's creation date.

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

  - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filers on the product's update date.

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

  - region\_id: (\`string\`) The ID of the customer's region. This parameter must be included if you want to apply taxes on the product variant's price.

  - country\_code: (\`string\`) The customer's country code. This parameter must be included if you want to apply taxes on the product variant's price.

  - province: (\`string\`) The lower-case \[ISO 3166-2]\(https://en.wikipedia.org/wiki/ISO\\\_3166-2) province, which can be taken from a customer's address. This parameter helps further narrowing down the taxes applied on a the product variant's prices.

  - cart\_id: (\`string\`) The ID of the customer's cart, if available. If set, the cart's region and shipping address's country code and province are used instead of the \`region\_id\`, \`country\_code\`, and \`province\` parameters.

  - tag\_id: (\`string\` \\| \`string\`\[]) Filter by the product's tag(s).

  - variants: (Pick\&#60;\[StoreProductVariantParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreProductVariantParams/page.mdx), "options"\&#62;) Filter by the product's variants.

    - options: (\`object\`)
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreProductListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.StoreProductListResponse/page.mdx)\&#62;) The paginated list of products.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## retrieve

This method is used to retrieve a product by its ID. It sends a request to the
[Get Product](https://docs.medusajs.com/api/store#products_getproductsid) API route.

Related guides:

- [How to retrieve a product in the storefront](https://docs.medusajs.com/resources/storefront-development/products/retrieve).
- [How to retrieve a product variant's prices in the storefront](https://docs.medusajs.com/resources/storefront-development/products/price)

### Example

To retrieve a product by its ID:

```ts
sdk.store.product.retrieve("prod_123")
.then(({ product }) => {
  console.log(product)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.store.product.retrieve("prod_123", {
  fields: "id,*collection"
})
.then(({ product }) => {
  console.log(product)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- id: (\`string\`) The product's ID.
- query: (\[StoreProductParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreProductParams/page.mdx)) Configure the fields to retrieve in the product.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - region\_id: (\`string\`) The ID of the customer's region. This parameter must be included if you want to apply taxes on the product variant's price.

  - country\_code: (\`string\`) The customer's country code. This parameter must be included if you want to apply taxes on the product variant's price.

  - province: (\`string\`) The lower-case \[ISO 3166-2]\(https://en.wikipedia.org/wiki/ISO\\\_3166-2) province, which can be taken from a customer's address. This parameter helps further narrowing down the taxes applied on a the product variant's prices.

  - cart\_id: (\`string\`) The ID of the customer's cart, if available. If set, the cart's region and shipping address's country code and province are used instead of the \`region\_id\`, \`country\_code\`, and \`province\` parameters.
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreProductResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreProductResponse/page.mdx)\&#62;) The product.

  - product: (\[StoreProduct]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreProduct/page.mdx)) The product's details.

    - id: (\`string\`) The product's ID.

    - title: (\`string\`) The product's title.

    - handle: (\`string\`) The product's handle.

    - subtitle: (\`null\` \\| \`string\`) The product's subtitle.

    - description: (\`null\` \\| \`string\`) The product's description.

    - is\_giftcard: (\`boolean\`) Whether the product is a gift card.

    - status: (\[ProductStatus]\(../../../../../types/types/types.ProductStatus/page.mdx)) The product's status.

    - thumbnail: (\`null\` \\| \`string\`) The product's thumbnail.

    - width: (\`null\` \\| \`number\`) The product's width.

    - weight: (\`null\` \\| \`number\`) The product's weight.

    - length: (\`null\` \\| \`number\`) The product's length.

    - height: (\`null\` \\| \`number\`) The product's height.

    - origin\_country: (\`null\` \\| \`string\`) The product's origin country.

    - hs\_code: (\`null\` \\| \`string\`) The product's HS code.

    - mid\_code: (\`null\` \\| \`string\`) The product's MID code.

    - material: (\`null\` \\| \`string\`) The product's material.

    - collection\_id: (\`null\` \\| \`string\`) The ID of the associated product collection.

    - type\_id: (\`null\` \\| \`string\`) The ID of the associated product type.

    - discountable: (\`boolean\`) Whether the product is discountable.

    - external\_id: (\`null\` \\| \`string\`) The ID of the product in external systems.

    - created\_at: (\`null\` \\| \`string\`) The date the product was created.

    - updated\_at: (\`null\` \\| \`string\`) The date the product was update.

    - deleted\_at: (\`null\` \\| \`string\`) The date the product was deleted.

    - variants: (\`null\` \\| \[StoreProductVariant]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreProductVariant/page.mdx)\[]) The product's variants.

    - options: (\`null\` \\| \[StoreProductOption]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreProductOption/page.mdx)\[]) The product's options.

    - images: (\`null\` \\| \[StoreProductImage]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreProductImage/page.mdx)\[]) The product's images.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - collection: (\`null\` \\| \[StoreCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCollection/page.mdx)) The product's collection.

    - categories: (\`null\` \\| \[StoreProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreProductCategory/page.mdx)\[]) The product's categories.

    - type: (\`null\` \\| \[StoreProductType]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreProductType/page.mdx)) The product's types.

    - tags: (\`null\` \\| \[StoreProductTag]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreProductTag/page.mdx)\[]) The product's tags.
