# product - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.product` set of methods used to send requests to Medusa's Admin API routes.

## import

This method creates a product import. The products are only imported after
the import is confirmed using the [confirmImport](https://docs.medusajs.com/var/task/www/apps/resources/references/js_sdk/admin/Product/methods/js_sdk.admin.Product.confirmImport) method.

This method sends a request to the
[Create Product Import](https://docs.medusajs.com/api/admin#products_postproductsimport)
API route.

### Example

```ts
sdk.admin.product.import({
  file // uploaded File instance
})
.then(({ transaction_id }) => {
  console.log(transaction_id)
})
```

### Parameters

- body: (\[AdminImportProductRequest]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminImportProductRequest/page.mdx)) The import's details.

  - file: (\[File]\(../../../../../core\_flows/core\_flows.File/page.mdx)) The CSV file to import the products from.

    It's an uploaded file of type \[File]\(https://developer.mozilla.org/en-US/docs/Web/API/File).
- query: (\`object\`) Query parameters to pass to the request.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminImportProductResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminImportProductResponse/page.mdx)\&#62;) The import's details.

  - transaction\_id: (\`string\`) The ID of the import product workflow execution's transaction.
    This is useful to confirm the import using the \`/admin/products/:transaction-id/import\` API route.

  - summary: (\`object\`) Details of the products to create or update when the import is confirmed.

    - toCreate: (\`number\`) The number of products that will be created by the import.

    - toUpdate: (\`number\`) The number of products that will be updated by the import.

***

## createImport

This method creates a product import. The products are only imported after
the import is confirmed using the [confirmImport](https://docs.medusajs.com/var/task/www/apps/resources/references/js_sdk/admin/Product/methods/js_sdk.admin.Product.confirmImport) method.

This method sends a request to the
[Create Product Import](https://docs.medusajs.com/api/admin#products_postproductsimports)
API route.

:::note

This is available starting from [Medusa v2.8.5](https://github.com/medusajs/medusa/releases/tag/v2.8.5).

:::

### Example

```ts
sdk.admin.product.createImport({
  file // uploaded File instance
})
.then(({ transaction_id }) => {
  console.log(transaction_id)
})
```

### Parameters

- body: (\[AdminImportProductRequest]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminImportProductRequest/page.mdx)) The import's details.

  - file: (\[File]\(../../../../../core\_flows/core\_flows.File/page.mdx)) The CSV file to import the products from.

    It's an uploaded file of type \[File]\(https://developer.mozilla.org/en-US/docs/Web/API/File).
- query: (\`object\`) Query parameters to pass to the request.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminImportProductsResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminImportProductsResponse/page.mdx)\&#62;) The import's details.

  - transaction\_id: (\`string\`) The ID of the import product workflow execution's transaction.
    This is useful to confirm the import using the \`/admin/products/:transaction-id/import\` API route.

  - summary: (\`object\`) Details of the products to create or update when the import is confirmed.

    - toCreate: (\`number\`) The number of products that will be created by the import.

    - toUpdate: (\`number\`) The number of products that will be updated by the import.

***

## confirmImport

This method confirms a product import created using the method [import](https://docs.medusajs.com/var/task/www/apps/resources/references/js_sdk/admin/Product/methods/js_sdk.admin.Product.import).
It sends a request to the
[Confirm Product Import](https://docs.medusajs.com/api/admin#products_postproductsimporttransaction_idconfirm)
API route.

:::note

This is available starting from [Medusa v2.8.5](https://github.com/medusajs/medusa/releases/tag/v2.8.5).

:::

### Example

```ts
sdk.admin.product.confirmImport("transaction_123")
.then(() => {
  console.log("Import confirmed")
})
```

### Parameters

- transactionId: (\`string\`) The ID of the transaction of the created product import. This is returned
  by the API route used to create the product import.
- query: (\`object\`) Query parameters to pass in the request.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;object\&#62;) This method confirms a product import created using the method \[import]\(../../../Product/methods/js\_sdk.admin.Product.import/page.mdx).
  It sends a request to the
  \[Confirm Product Import]\(https://docs.medusajs.com/api/admin#products\\\_postproductsimporttransaction\\\_idconfirm)
  API route.

***

## export

This method starts a product export process to retrieve a CSV of exported products.

You'll receive in the response the transaction ID of the workflow generating the CSV file.
To check the status of the execution, send a `GET` request to
`/admin/workflows-executions/export-products/:transaction-id`.

Once the execution finishes successfully, a notification is created for the export.
You can retrieve the notifications using the `/admin/notification` API route to
retrieve the file's download URL.

This method sends a request to the [Export Product](https://docs.medusajs.com/api/admin#products_postproductsexport)
API route.

### Example

```ts
sdk.admin.product.export({})
.then(({ transaction_id }) => {
  console.log(transaction_id)
})
```

### Parameters

- body: (\[AdminExportProductRequest]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExportProductRequest/page.mdx)) The export's details.
- query: (\[AdminProductListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductListParams/page.mdx)) Filters to specify which products to export.

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

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - price\_list\_id: (\`string\` \\| \`string\`\[]) Filter by price list ID(s) to retrieve the associated products only.

  - variants: (Omit\&#60;\[AdminProductVariantParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariantParams/page.mdx), "q"\&#62;) Apply filters on the product variants.

    - $and: ((\[AdminProductVariantParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariantParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminProductVariantParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariantParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminProductVariantParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariantParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminProductVariantParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariantParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - id: (\`string\` \\| \`string\`\[]) Filter by variant ID(s).

    - manage\_inventory: (\`boolean\`) Filter by whether Medusa manages the inventory of the variant.

    - allow\_backorder: (\`boolean\`) Filter by whether the variant can be ordered even if it's
      out of stock.

    - ean: (\`string\` \\| \`string\`\[]) Filter by variant ean(s).

    - upc: (\`string\` \\| \`string\`\[]) Filter by variant upc(s).

    - barcode: (\`string\` \\| \`string\`\[]) Filter by variant barcode(s).

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the variant's creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the variant's update date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the variant's deletion date.

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

  - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filers on the product's deletion date.

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

- Promise: (Promise\&#60;\[AdminExportProductResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExportProductResponse/page.mdx)\&#62;) The export's details.

  - transaction\_id: (\`string\`) The ID of the export product workflow's transaction.

***

## batch

This method manages products to create, update, or delete them. It sends a request to the
[Manage Products](https://docs.medusajs.com/api/admin#products_postproductsbatch)
API route.

### Example

```ts
sdk.admin.product.batch({
  create: [
    {
      title: "Shirt",
      options: [{
        title: "Default",
        values: ["Default Option"]
      }],
      variants: [
        {
          title: "Default",
          options: {
            Default: "Default Option"
          },
          prices: []
        }
      ]
    }
  ],
  update: [{
    id: "prod_123",
    title: "Pants"
  }],
  delete: ["prod_321"]
})
.then(({ created, updated, deleted }) => {
  console.log(created, updated, deleted)
})
```

### Parameters

- body: (\[AdminBatchProductRequest]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminBatchProductRequest/page.mdx)) The products to create, update, or delete.

  - create: (\[AdminCreateProduct]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateProduct/page.mdx)\[]) Records to create in bulk.

    - title: (\`string\`) The product's title.

    - options: (\[AdminCreateProductOption]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateProductOption/page.mdx)\[]) The product's options.

    - subtitle: (\`string\`) The product's subtitle.

    - description: (\`string\`) The product's description.

    - is\_giftcard: (\`boolean\`) Whether the product is a gift card.

    - discountable: (\`boolean\`) Whether discounts can be applied on the product.

    - images: (\`object\`\[]) The product's images.

    - thumbnail: (\`string\`) The product's thumbnail URL.

    - handle: (\`string\`) The product's handle.

    - status: (\[ProductStatus]\(../../../../../types/types/types.ProductStatus/page.mdx)) The product's status.

    - type\_id: (\`string\`) The ID of the product's type.

    - external\_id: (\`string\`) The ID of the product in an external or third-party system.

    - collection\_id: (\`string\`) The ID of the product's collection.

    - shipping\_profile\_id: (\`string\`) The ID of the product's shipping profile.

    - categories: (\`object\`\[]) The product's categories.

    - tags: (\`object\`\[]) The product's tags.

    - variants: (\[AdminCreateProductVariant]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateProductVariant/page.mdx)\[]) The product's variants.

    - sales\_channels: (\`object\`\[]) The sales channels that the product is available in.

    - weight: (\`number\`) The product's weight.

    - length: (\`number\`) The product's length.

    - height: (\`number\`) The product's height.

    - width: (\`number\`) The product's width.

    - hs\_code: (\`string\`) The product's HS code.

    - mid\_code: (\`string\`) The product's MID code.

    - origin\_country: (\`string\`) The product's origin country.

    - material: (\`string\`) The product's material.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

  - update: (\[AdminBatchUpdateProduct]\(../../../../../types/interfaces/types.AdminBatchUpdateProduct/page.mdx)\[]) Records to update in bulk.

    - id: (\`string\`) The ID of the product to update.

    - title: (\`string\`) The product's title.

    - subtitle: (\`null\` \\| \`string\`) The product's subtitle.

    - description: (\`null\` \\| \`string\`) The product's description.

    - is\_giftcard: (\`boolean\`) Whether the product is a gift card.

    - discountable: (\`boolean\`) Whether discounts can be applied on the product.

    - images: (\`object\`\[]) The product's images.

    - thumbnail: (\`null\` \\| \`string\`) The product's thumbnail URL.

    - handle: (\`string\`) The product's handle.

    - status: (\[ProductStatus]\(../../../../../types/types/types.ProductStatus/page.mdx)) The product's status.

    - type\_id: (\`null\` \\| \`string\`) The ID of the associated product type.

    - external\_id: (\`null\` \\| \`string\`) The ID of the product in an external or third-party system.

    - collection\_id: (\`null\` \\| \`string\`) The ID of the associated product collection.

    - categories: (\`object\`\[]) The product's categories.

    - tags: (\`object\`\[]) The product's tags.

    - options: (\[AdminUpdateProductOption]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateProductOption/page.mdx)\[]) The product's options.

    - variants: ((\[AdminCreateProductVariant]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateProductVariant/page.mdx) \\| \[AdminUpdateProductVariant]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateProductVariant/page.mdx))\[]) The product's variants.

    - sales\_channels: (\`object\`\[]) The sales channels that the product is available in.

    - shipping\_profile\_id: (\`null\` \\| \`string\`) The ID of the product's shipping profile.

    - weight: (\`null\` \\| \`number\`) The product's weight.

    - length: (\`null\` \\| \`number\`) The product's length.

    - height: (\`null\` \\| \`number\`) The product's height.

    - width: (\`null\` \\| \`number\`) The product's width.

    - hs\_code: (\`null\` \\| \`string\`) The product's HS code.

    - mid\_code: (\`null\` \\| \`string\`) The product's MID code.

    - origin\_country: (\`null\` \\| \`string\`) The product's origin country.

    - material: (\`null\` \\| \`string\`) The product's material.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - delete: (\`string\`\[]) Records to delete in bulk.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the products.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminBatchProductResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminBatchProductResponse/page.mdx)\&#62;) The batch operations details.

  - created: (\[AdminProduct]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProduct/page.mdx)\[]) The items that were created.

    - variants: (\`null\` \\| \[AdminProductVariant]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariant/page.mdx)\[]) The product's variants.

    - type: (\`null\` \\| \[AdminProductType]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductType/page.mdx)) The product's type.

    - options: (\`null\` \\| \[AdminProductOption]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductOption/page.mdx)\[]) The product's options.

    - images: (\`null\` \\| \[AdminProductImage]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductImage/page.mdx)\[]) The product's images.

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

    - collection: (\`null\` \\| \[AdminCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCollection/page.mdx)) The product's collection.

    - categories: (\`null\` \\| \[AdminProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategory/page.mdx)\[]) The product's categories.

    - sales\_channels: (\`null\` \\| \[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)\[]) The sales channels that the product is available in.

    - shipping\_profile: (\`null\` \\| \[AdminShippingProfile]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingProfile/page.mdx)) The shipping profile that the product is available in.

    - tags: (\`null\` \\| \[AdminProductTag]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTag/page.mdx)\[]) The product's tags.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - updated: (\[AdminProduct]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProduct/page.mdx)\[]) The items that were updated.

    - variants: (\`null\` \\| \[AdminProductVariant]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariant/page.mdx)\[]) The product's variants.

    - type: (\`null\` \\| \[AdminProductType]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductType/page.mdx)) The product's type.

    - options: (\`null\` \\| \[AdminProductOption]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductOption/page.mdx)\[]) The product's options.

    - images: (\`null\` \\| \[AdminProductImage]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductImage/page.mdx)\[]) The product's images.

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

    - collection: (\`null\` \\| \[AdminCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCollection/page.mdx)) The product's collection.

    - categories: (\`null\` \\| \[AdminProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategory/page.mdx)\[]) The product's categories.

    - sales\_channels: (\`null\` \\| \[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)\[]) The sales channels that the product is available in.

    - shipping\_profile: (\`null\` \\| \[AdminShippingProfile]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingProfile/page.mdx)) The shipping profile that the product is available in.

    - tags: (\`null\` \\| \[AdminProductTag]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTag/page.mdx)\[]) The product's tags.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - deleted: (\`object\`) Details of the items that were deleted.

    - ids: (\`string\`\[]) The IDs of the items that were deleted.

    - object: (\`string\`) The type of the items that were deleted.

    - deleted: (\`boolean\`) Whether the items were deleted successfully.

***

## create

This method creates a product. It sends a request to the
[Create Product](https://docs.medusajs.com/api/admin#products_postproducts)
API route.

### Example

```ts
sdk.admin.product.create({
  title: "Shirt",
  options: [{
    title: "Default",
    values: ["Default Option"]
  }],
  variants: [
    {
      title: "Default",
      options: {
        Default: "Default Option"
      },
      prices: []
    }
  ],
  shipping_profile_id: "sp_123"
})
.then(({ product }) => {
  console.log(product)
})
```

### Parameters

- body: (\[AdminCreateProduct]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateProduct/page.mdx)) The product's details.

  - title: (\`string\`) The product's title.

  - options: (\[AdminCreateProductOption]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateProductOption/page.mdx)\[]) The product's options.

    - title: (\`string\`) The option's title.

    - values: (\`string\`\[]) The option's values.

  - subtitle: (\`string\`) The product's subtitle.

  - description: (\`string\`) The product's description.

  - is\_giftcard: (\`boolean\`) Whether the product is a gift card.

  - discountable: (\`boolean\`) Whether discounts can be applied on the product.

  - images: (\`object\`\[]) The product's images.

    - url: (\`string\`) The image's URL.

  - thumbnail: (\`string\`) The product's thumbnail URL.

  - handle: (\`string\`) The product's handle.

  - status: (\[ProductStatus]\(../../../../../types/types/types.ProductStatus/page.mdx)) The product's status.

  - type\_id: (\`string\`) The ID of the product's type.

  - external\_id: (\`string\`) The ID of the product in an external or third-party system.

  - collection\_id: (\`string\`) The ID of the product's collection.

  - shipping\_profile\_id: (\`string\`) The ID of the product's shipping profile.

  - categories: (\`object\`\[]) The product's categories.

    - id: (\`string\`) The ID of a product category that the product belongs to.

  - tags: (\`object\`\[]) The product's tags.

    - id: (\`string\`) The ID of the associated product tag.

  - variants: (\[AdminCreateProductVariant]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateProductVariant/page.mdx)\[]) The product's variants.

    - title: (\`string\`) The variant's title.

    - prices: (\[AdminCreateProductVariantPrice]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateProductVariantPrice/page.mdx)\[]) The variant's prices.

    - sku: (\`string\`) The variant's SKU.

    - ean: (\`string\`) The variant's EAN.

    - upc: (\`string\`) The variant's UPC.

    - barcode: (\`string\`) The variant's barcode.

    - hs\_code: (\`string\`) The variant's HS code.

    - mid\_code: (\`string\`) The variant's MID code.

    - allow\_backorder: (\`boolean\`) Whether the variant can be ordered even if it's out of stock.

    - manage\_inventory: (\`boolean\`) Whether Medusa manages the variant's inventory. If disabled,
      the variant is always considered in stock.

    - variant\_rank: (\`number\`) The variant's ranking among its sibling variants.

    - weight: (\`number\`) The variant's weight.

    - length: (\`number\`) The variant's length.

    - height: (\`number\`) The variant's height.

    - width: (\`number\`) The variant's width.

    - origin\_country: (\`string\`) The variant's origin country.

    - material: (\`string\`) The variant's material.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

    - inventory\_items: (\[AdminCreateProductVariantInventoryKit]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateProductVariantInventoryKit/page.mdx)\[]) The variant's inventory items. It's only
      available if \`manage\_inventory\` is enabled.

    - options: (\`Record\<string, string>\`) The variant's values for the associated product's options.

  - sales\_channels: (\`object\`\[]) The sales channels that the product is available in.

    - id: (\`string\`) The ID of a sales channel that the product is available in.

  - weight: (\`number\`) The product's weight.

  - length: (\`number\`) The product's length.

  - height: (\`number\`) The product's height.

  - width: (\`number\`) The product's width.

  - hs\_code: (\`string\`) The product's HS code.

  - mid\_code: (\`string\`) The product's MID code.

  - origin\_country: (\`string\`) The product's origin country.

  - material: (\`string\`) The product's material.

  - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the product.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminProductResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductResponse/page.mdx)\&#62;) The product's details.

  - product: (\[AdminProduct]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProduct/page.mdx)) The product's details.

    - variants: (\`null\` \\| \[AdminProductVariant]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariant/page.mdx)\[]) The product's variants.

    - type: (\`null\` \\| \[AdminProductType]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductType/page.mdx)) The product's type.

    - options: (\`null\` \\| \[AdminProductOption]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductOption/page.mdx)\[]) The product's options.

    - images: (\`null\` \\| \[AdminProductImage]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductImage/page.mdx)\[]) The product's images.

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

    - collection: (\`null\` \\| \[AdminCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCollection/page.mdx)) The product's collection.

    - categories: (\`null\` \\| \[AdminProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategory/page.mdx)\[]) The product's categories.

    - sales\_channels: (\`null\` \\| \[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)\[]) The sales channels that the product is available in.

    - shipping\_profile: (\`null\` \\| \[AdminShippingProfile]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingProfile/page.mdx)) The shipping profile that the product is available in.

    - tags: (\`null\` \\| \[AdminProductTag]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTag/page.mdx)\[]) The product's tags.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## update

This method updates a product. It sends a request to the
[Update Product](https://docs.medusajs.com/api/admin#products_postproductsid)
API route.

### Example

```ts
sdk.admin.product.update("prod_123", {
  title: "Shirt",
})
.then(({ product }) => {
  console.log(product)
})
```

### Parameters

- id: (\`string\`) The product's ID.
- body: (\[AdminUpdateProduct]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateProduct/page.mdx)) The data to update in the product.

  - title: (\`string\`) The product's title.

  - subtitle: (\`null\` \\| \`string\`) The product's subtitle.

  - description: (\`null\` \\| \`string\`) The product's description.

  - is\_giftcard: (\`boolean\`) Whether the product is a gift card.

  - discountable: (\`boolean\`) Whether discounts can be applied on the product.

  - images: (\`object\`\[]) The product's images.

    - url: (\`string\`) The image's URL.

    - id: (\`string\`) The ID of the image to update
      or set for existing images.

  - thumbnail: (\`null\` \\| \`string\`) The product's thumbnail URL.

  - handle: (\`string\`) The product's handle.

  - status: (\[ProductStatus]\(../../../../../types/types/types.ProductStatus/page.mdx)) The product's status.

  - type\_id: (\`null\` \\| \`string\`) The ID of the associated product type.

  - external\_id: (\`null\` \\| \`string\`) The ID of the product in an external or third-party system.

  - collection\_id: (\`null\` \\| \`string\`) The ID of the associated product collection.

  - categories: (\`object\`\[]) The product's categories.

    - id: (\`string\`) The ID of the category that the product belongs to.

  - tags: (\`object\`\[]) The product's tags.

    - id: (\`string\`) The ID of a tag that the product is associated with.

  - options: (\[AdminUpdateProductOption]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateProductOption/page.mdx)\[]) The product's options.

    - title: (\`string\`) The option's title.

    - values: (\`string\`\[]) The option's values.

  - variants: ((\[AdminCreateProductVariant]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateProductVariant/page.mdx) \\| \[AdminUpdateProductVariant]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateProductVariant/page.mdx))\[]) The product's variants.

    - title: (\`string\`) The variant's title.

    - prices: (\[AdminCreateProductVariantPrice]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateProductVariantPrice/page.mdx)\[]) The variant's prices.

    - sku: (\`string\`) The variant's SKU.

    - ean: (\`string\`) The variant's EAN.

    - upc: (\`string\`) The variant's UPC.

    - barcode: (\`string\`) The variant's barcode.

    - hs\_code: (\`string\`) The variant's HS code.

    - mid\_code: (\`string\`) The variant's MID code.

    - allow\_backorder: (\`boolean\`) Whether the variant can be ordered even if it's out of stock.

    - manage\_inventory: (\`boolean\`) Whether Medusa manages the variant's inventory. If disabled,
      the variant is always considered in stock.

    - variant\_rank: (\`number\`) The variant's ranking among its sibling variants.

    - weight: (\`number\`) The variant's weight.

    - length: (\`number\`) The variant's length.

    - height: (\`number\`) The variant's height.

    - width: (\`number\`) The variant's width.

    - origin\_country: (\`string\`) The variant's origin country.

    - material: (\`string\`) The variant's material.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

    - inventory\_items: (\[AdminCreateProductVariantInventoryKit]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateProductVariantInventoryKit/page.mdx)\[]) The variant's inventory items. It's only
      available if \`manage\_inventory\` is enabled.

    - options: (\`Record\<string, string>\`) The variant's values for the associated product's options.

    - thumbnail: (\`null\` \\| \`string\`) The variant's thumbnail.

  - sales\_channels: (\`object\`\[]) The sales channels that the product is available in.

    - id: (\`string\`) The ID of a sales channel that the product is available in.

  - shipping\_profile\_id: (\`null\` \\| \`string\`) The ID of the product's shipping profile.

  - weight: (\`null\` \\| \`number\`) The product's weight.

  - length: (\`null\` \\| \`number\`) The product's length.

  - height: (\`null\` \\| \`number\`) The product's height.

  - width: (\`null\` \\| \`number\`) The product's width.

  - hs\_code: (\`null\` \\| \`string\`) The product's HS code.

  - mid\_code: (\`null\` \\| \`string\`) The product's MID code.

  - origin\_country: (\`null\` \\| \`string\`) The product's origin country.

  - material: (\`null\` \\| \`string\`) The product's material.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the product.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminProductResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductResponse/page.mdx)\&#62;) The product's details.

  - product: (\[AdminProduct]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProduct/page.mdx)) The product's details.

    - variants: (\`null\` \\| \[AdminProductVariant]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariant/page.mdx)\[]) The product's variants.

    - type: (\`null\` \\| \[AdminProductType]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductType/page.mdx)) The product's type.

    - options: (\`null\` \\| \[AdminProductOption]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductOption/page.mdx)\[]) The product's options.

    - images: (\`null\` \\| \[AdminProductImage]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductImage/page.mdx)\[]) The product's images.

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

    - collection: (\`null\` \\| \[AdminCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCollection/page.mdx)) The product's collection.

    - categories: (\`null\` \\| \[AdminProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategory/page.mdx)\[]) The product's categories.

    - sales\_channels: (\`null\` \\| \[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)\[]) The sales channels that the product is available in.

    - shipping\_profile: (\`null\` \\| \[AdminShippingProfile]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingProfile/page.mdx)) The shipping profile that the product is available in.

    - tags: (\`null\` \\| \[AdminProductTag]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTag/page.mdx)\[]) The product's tags.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## list

This method retrieves a paginated list of products. It sends a request to the
[List Products](https://docs.medusajs.com/api/admin#products_getproducts) API route.

### Example

To retrieve the list of products:

```ts
sdk.admin.product.list()
.then(({ products, count, limit, offset }) => {
  console.log(products)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.product.list({
  limit: 10,
  offset: 10
})
.then(({ products, count, limit, offset }) => {
  console.log(products)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each products:

```ts
sdk.admin.product.list({
  fields: "id,*variants"
})
.then(({ products, count, limit, offset }) => {
  console.log(products)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- queryParams: (\[AdminProductListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductListParams/page.mdx)) Filters and pagination configurations.

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

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - price\_list\_id: (\`string\` \\| \`string\`\[]) Filter by price list ID(s) to retrieve the associated products only.

  - variants: (Omit\&#60;\[AdminProductVariantParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariantParams/page.mdx), "q"\&#62;) Apply filters on the product variants.

    - $and: ((\[AdminProductVariantParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariantParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminProductVariantParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariantParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminProductVariantParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariantParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminProductVariantParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariantParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - id: (\`string\` \\| \`string\`\[]) Filter by variant ID(s).

    - manage\_inventory: (\`boolean\`) Filter by whether Medusa manages the inventory of the variant.

    - allow\_backorder: (\`boolean\`) Filter by whether the variant can be ordered even if it's
      out of stock.

    - ean: (\`string\` \\| \`string\`\[]) Filter by variant ean(s).

    - upc: (\`string\` \\| \`string\`\[]) Filter by variant upc(s).

    - barcode: (\`string\` \\| \`string\`\[]) Filter by variant barcode(s).

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the variant's creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the variant's update date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the variant's deletion date.

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

  - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filers on the product's deletion date.

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

- Promise: (Promise\&#60;\[AdminProductListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminProductListResponse/page.mdx)\&#62;) The paginated list of products.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## retrieve

This method retrieves a product by its ID. It sends a request to the
[Get Product](https://docs.medusajs.com/api/admin#products_getproductsid)
API route.

### Example

To retrieve a product by its ID:

```ts
sdk.admin.product.retrieve("prod_123")
.then(({ product }) => {
  console.log(product)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.product.retrieve("prod_123", {
  fields: "id,*variants"
})
.then(({ product }) => {
  console.log(product)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- id: (\`string\`) The product's ID.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the product.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminProductResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductResponse/page.mdx)\&#62;) The product's details.

  - product: (\[AdminProduct]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProduct/page.mdx)) The product's details.

    - variants: (\`null\` \\| \[AdminProductVariant]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariant/page.mdx)\[]) The product's variants.

    - type: (\`null\` \\| \[AdminProductType]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductType/page.mdx)) The product's type.

    - options: (\`null\` \\| \[AdminProductOption]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductOption/page.mdx)\[]) The product's options.

    - images: (\`null\` \\| \[AdminProductImage]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductImage/page.mdx)\[]) The product's images.

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

    - collection: (\`null\` \\| \[AdminCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCollection/page.mdx)) The product's collection.

    - categories: (\`null\` \\| \[AdminProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategory/page.mdx)\[]) The product's categories.

    - sales\_channels: (\`null\` \\| \[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)\[]) The sales channels that the product is available in.

    - shipping\_profile: (\`null\` \\| \[AdminShippingProfile]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingProfile/page.mdx)) The shipping profile that the product is available in.

    - tags: (\`null\` \\| \[AdminProductTag]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTag/page.mdx)\[]) The product's tags.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## delete

This method deletes a product. It sends a request to the
[Delete Product](https://docs.medusajs.com/api/admin#products_deleteproductsid)
API route.

### Example

```ts
sdk.admin.product.delete("prod_123")
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- id: (\`string\`) The product's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminProductDeleteResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductDeleteResponse/page.mdx)\&#62;) The deletion's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (\`"product"\`) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.

***

## batchVariants

This method manages the variants of a product. It sends a request to the
[Manage Variants](https://docs.medusajs.com/api/admin#products_postproductsidvariantsbatch)
API route.

### Example

```ts
sdk.admin.product.batchVariants("prod_123", {
  create: [
    {
      title: "Blue Shirt",
      options: {
        Color: "Blue"
      },
      prices: []
    }
  ],
  update: [
    {
      id: "variant_123",
      title: "Pants"
    }
  ],
  delete: ["variant_123"]
})
.then(({ created, updated, deleted }) => {
  console.log(created, updated, deleted)
})
```

### Parameters

- productId: (\`string\`) The product's ID.
- body: (\[AdminBatchProductVariantRequest]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminBatchProductVariantRequest/page.mdx)) The variants to create, update, or delete.

  - create: (\[AdminCreateProductVariant]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateProductVariant/page.mdx)\[]) Records to create in bulk.

    - title: (\`string\`) The variant's title.

    - prices: (\[AdminCreateProductVariantPrice]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateProductVariantPrice/page.mdx)\[]) The variant's prices.

    - sku: (\`string\`) The variant's SKU.

    - ean: (\`string\`) The variant's EAN.

    - upc: (\`string\`) The variant's UPC.

    - barcode: (\`string\`) The variant's barcode.

    - hs\_code: (\`string\`) The variant's HS code.

    - mid\_code: (\`string\`) The variant's MID code.

    - allow\_backorder: (\`boolean\`) Whether the variant can be ordered even if it's out of stock.

    - manage\_inventory: (\`boolean\`) Whether Medusa manages the variant's inventory. If disabled,
      the variant is always considered in stock.

    - variant\_rank: (\`number\`) The variant's ranking among its sibling variants.

    - weight: (\`number\`) The variant's weight.

    - length: (\`number\`) The variant's length.

    - height: (\`number\`) The variant's height.

    - width: (\`number\`) The variant's width.

    - origin\_country: (\`string\`) The variant's origin country.

    - material: (\`string\`) The variant's material.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

    - inventory\_items: (\[AdminCreateProductVariantInventoryKit]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateProductVariantInventoryKit/page.mdx)\[]) The variant's inventory items. It's only
      available if \`manage\_inventory\` is enabled.

    - options: (\`Record\<string, string>\`) The variant's values for the associated product's options.

  - update: (\[AdminBatchUpdateProductVariant]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminBatchUpdateProductVariant/page.mdx)\[]) Records to update in bulk.

    - id: (\`string\`) The ID of the variant to update.

    - title: (\`string\`) The variant's title.

    - sku: (\`null\` \\| \`string\`) The variant's SKU.

    - ean: (\`null\` \\| \`string\`) The variant's EAN.

    - upc: (\`null\` \\| \`string\`) The variant's UPC.

    - barcode: (\`null\` \\| \`string\`) The variant's barcode.

    - hs\_code: (\`null\` \\| \`string\`) The variant's HS code.

    - mid\_code: (\`null\` \\| \`string\`) The variant's MID code.

    - thumbnail: (\`null\` \\| \`string\`) The variant's thumbnail.

    - allow\_backorder: (\`boolean\`) Whether the variant can be ordered even if it's out of stock.

    - manage\_inventory: (\`boolean\`) Whether Medusa should manage the variant's inventory. If disabled,
      the variant is always considered in stock.

    - variant\_rank: (\`number\`) The variant's ranking among its sibling variants.

    - weight: (\`null\` \\| \`number\`) The variant's weight.

    - length: (\`null\` \\| \`number\`) The variant's length.

    - height: (\`null\` \\| \`number\`) The variant's height.

    - width: (\`null\` \\| \`number\`) The variant's width.

    - origin\_country: (\`null\` \\| \`string\`) The variant's origin country.

    - material: (\`null\` \\| \`string\`) The variant's material.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - prices: (\[AdminCreateProductVariantPrice]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateProductVariantPrice/page.mdx)\[]) The variant's prices.

    - options: (\`Record\<string, string>\`) The variant's values for the associated product's options.

  - delete: (\`string\`\[]) Records to delete in bulk.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the product variants.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminBatchProductVariantResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminBatchProductVariantResponse/page.mdx)\&#62;) The product variants' details.

  - created: (\[AdminProductVariant]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariant/page.mdx)\[]) The items that were created.

    - prices: (\`null\` \\| \[AdminPrice]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPrice/page.mdx)\[]) The product variant's prices.

    - options: (\`null\` \\| \[AdminProductOptionValue]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductOptionValue/page.mdx)\[]) The variant's values for the associated product's options.

    - id: (\`string\`) The variant's ID.

    - title: (\`null\` \\| \`string\`) The variant's title.

    - sku: (\`null\` \\| \`string\`) The variant's SKU.

    - barcode: (\`null\` \\| \`string\`) The variant's barcode.

    - ean: (\`null\` \\| \`string\`) The variant's EAN.

    - upc: (\`null\` \\| \`string\`) The variant's UPC.

    - thumbnail: (\`null\` \\| \`string\`) The variant's thumbnail.

    - images: (\`null\` \\| \[BaseProductImage]\(../../../../../types/interfaces/types.BaseProductImage/page.mdx)\[]) The variant's images.

    - allow\_backorder: (\`null\` \\| \`boolean\`) Whether the variant can be ordered even if it's out of stock.

    - manage\_inventory: (\`null\` \\| \`boolean\`) Whether Medusa manages the variant's inventory. If disabled, the variant
      is always considered in stock.

    - hs\_code: (\`null\` \\| \`string\`) The variant's HS code.

    - origin\_country: (\`null\` \\| \`string\`) The variant's origin country.

    - mid\_code: (\`null\` \\| \`string\`) The variant's MID code.

    - material: (\`null\` \\| \`string\`) The variant's material.

    - weight: (\`null\` \\| \`number\`) The variant's weight.

    - length: (\`null\` \\| \`number\`) The variant's length.

    - height: (\`null\` \\| \`number\`) The variant's height.

    - width: (\`null\` \\| \`number\`) The variant's width.

    - created\_at: (\`string\`) The date the variant was created.

    - updated\_at: (\`string\`) The date the variant was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the variant was deleted.

    - product: (\`null\` \\| \[AdminProduct]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProduct/page.mdx)) The product that this variant belongs to.

    - inventory\_items: (\`null\` \\| \[AdminProductVariantInventoryItemLink]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariantInventoryItemLink/page.mdx)\[]) The variant's inventory items.

    - inventory\_quantity: (\`null\` \\| \`number\`) The variant's inventory quantity if \`manage\_inventory\` is enabled.
      This field is only retrieved in the \[Get Product]\(https://docs.medusajs.com/api/store#products\\\_getproductsid)
      and \[List Products]\(https://docs.medusajs.com/api/store#products\\\_getproducts) API routes if you
      pass \`+variants.inventory\_quantity\` in the \`fields\` query parameter.

      Learn more in the \[Retrieve Product Variant's Inventory]\(https://docs.medusajs.com/resources/storefront-development/products/inventory) storefront guide.

    - variant\_rank: (\`null\` \\| \`number\`) The variant's ranking among its siblings.

    - product\_id: (\`string\`) The ID of the product that the variant belongs to.

    - calculated\_price: (\[BaseCalculatedPriceSet]\(../../../../../types/interfaces/types.BaseCalculatedPriceSet/page.mdx)) The variant's calculated price for the provided context.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - updated: (\[AdminProductVariant]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariant/page.mdx)\[]) The items that were updated.

    - prices: (\`null\` \\| \[AdminPrice]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPrice/page.mdx)\[]) The product variant's prices.

    - options: (\`null\` \\| \[AdminProductOptionValue]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductOptionValue/page.mdx)\[]) The variant's values for the associated product's options.

    - id: (\`string\`) The variant's ID.

    - title: (\`null\` \\| \`string\`) The variant's title.

    - sku: (\`null\` \\| \`string\`) The variant's SKU.

    - barcode: (\`null\` \\| \`string\`) The variant's barcode.

    - ean: (\`null\` \\| \`string\`) The variant's EAN.

    - upc: (\`null\` \\| \`string\`) The variant's UPC.

    - thumbnail: (\`null\` \\| \`string\`) The variant's thumbnail.

    - images: (\`null\` \\| \[BaseProductImage]\(../../../../../types/interfaces/types.BaseProductImage/page.mdx)\[]) The variant's images.

    - allow\_backorder: (\`null\` \\| \`boolean\`) Whether the variant can be ordered even if it's out of stock.

    - manage\_inventory: (\`null\` \\| \`boolean\`) Whether Medusa manages the variant's inventory. If disabled, the variant
      is always considered in stock.

    - hs\_code: (\`null\` \\| \`string\`) The variant's HS code.

    - origin\_country: (\`null\` \\| \`string\`) The variant's origin country.

    - mid\_code: (\`null\` \\| \`string\`) The variant's MID code.

    - material: (\`null\` \\| \`string\`) The variant's material.

    - weight: (\`null\` \\| \`number\`) The variant's weight.

    - length: (\`null\` \\| \`number\`) The variant's length.

    - height: (\`null\` \\| \`number\`) The variant's height.

    - width: (\`null\` \\| \`number\`) The variant's width.

    - created\_at: (\`string\`) The date the variant was created.

    - updated\_at: (\`string\`) The date the variant was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the variant was deleted.

    - product: (\`null\` \\| \[AdminProduct]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProduct/page.mdx)) The product that this variant belongs to.

    - inventory\_items: (\`null\` \\| \[AdminProductVariantInventoryItemLink]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariantInventoryItemLink/page.mdx)\[]) The variant's inventory items.

    - inventory\_quantity: (\`null\` \\| \`number\`) The variant's inventory quantity if \`manage\_inventory\` is enabled.
      This field is only retrieved in the \[Get Product]\(https://docs.medusajs.com/api/store#products\\\_getproductsid)
      and \[List Products]\(https://docs.medusajs.com/api/store#products\\\_getproducts) API routes if you
      pass \`+variants.inventory\_quantity\` in the \`fields\` query parameter.

      Learn more in the \[Retrieve Product Variant's Inventory]\(https://docs.medusajs.com/resources/storefront-development/products/inventory) storefront guide.

    - variant\_rank: (\`null\` \\| \`number\`) The variant's ranking among its siblings.

    - product\_id: (\`string\`) The ID of the product that the variant belongs to.

    - calculated\_price: (\[BaseCalculatedPriceSet]\(../../../../../types/interfaces/types.BaseCalculatedPriceSet/page.mdx)) The variant's calculated price for the provided context.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - deleted: (\`object\`) Details of the items that were deleted.

    - ids: (\`string\`\[]) The IDs of the items that were deleted.

    - object: (\`string\`) The type of the items that were deleted.

    - deleted: (\`boolean\`) Whether the items were deleted successfully.

***

## createVariant

This method creates a variant for a product. It sends a request to the
[Create Variant](https://docs.medusajs.com/api/admin#products_postproductsidvariants)
API route.

### Example

```ts
sdk.admin.product.createVariant("prod_123", {
  title: "Blue Shirt",
  options: {
    Color: "Blue"
  },
  prices: [
    {
      amount: 10,
      currency_code: "usd"
    }
  ]
})
.then(({ product }) => {
  console.log(product)
})
```

### Parameters

- productId: (\`string\`) The product's ID.
- body: (\[AdminCreateProductVariant]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateProductVariant/page.mdx)) The variant's details.

  - title: (\`string\`) The variant's title.

  - prices: (\[AdminCreateProductVariantPrice]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateProductVariantPrice/page.mdx)\[]) The variant's prices.

    - currency\_code: (\`string\`) The price's currency code.

    - amount: (\`number\`) The price's amount.

    - min\_quantity: (\`null\` \\| \`number\`) The minimum quantity required in the cart for the price to apply.

    - max\_quantity: (\`null\` \\| \`number\`) The maximum quantity required in the cart for the price to apply.

    - rules: (\`null\` \\| \`object\`) The price's rules.

  - sku: (\`string\`) The variant's SKU.

  - ean: (\`string\`) The variant's EAN.

  - upc: (\`string\`) The variant's UPC.

  - barcode: (\`string\`) The variant's barcode.

  - hs\_code: (\`string\`) The variant's HS code.

  - mid\_code: (\`string\`) The variant's MID code.

  - allow\_backorder: (\`boolean\`) Whether the variant can be ordered even if it's out of stock.

  - manage\_inventory: (\`boolean\`) Whether Medusa manages the variant's inventory. If disabled,
    the variant is always considered in stock.

  - variant\_rank: (\`number\`) The variant's ranking among its sibling variants.

  - weight: (\`number\`) The variant's weight.

  - length: (\`number\`) The variant's length.

  - height: (\`number\`) The variant's height.

  - width: (\`number\`) The variant's width.

  - origin\_country: (\`string\`) The variant's origin country.

  - material: (\`string\`) The variant's material.

  - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

  - inventory\_items: (\[AdminCreateProductVariantInventoryKit]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateProductVariantInventoryKit/page.mdx)\[]) The variant's inventory items. It's only
    available if \`manage\_inventory\` is enabled.

    - inventory\_item\_id: (\`string\`)

    - required\_quantity: (\`number\`)

  - options: (\`Record\<string, string>\`) The variant's values for the associated product's options.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the product.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminProductResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductResponse/page.mdx)\&#62;) The product's details.

  - product: (\[AdminProduct]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProduct/page.mdx)) The product's details.

    - variants: (\`null\` \\| \[AdminProductVariant]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariant/page.mdx)\[]) The product's variants.

    - type: (\`null\` \\| \[AdminProductType]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductType/page.mdx)) The product's type.

    - options: (\`null\` \\| \[AdminProductOption]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductOption/page.mdx)\[]) The product's options.

    - images: (\`null\` \\| \[AdminProductImage]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductImage/page.mdx)\[]) The product's images.

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

    - collection: (\`null\` \\| \[AdminCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCollection/page.mdx)) The product's collection.

    - categories: (\`null\` \\| \[AdminProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategory/page.mdx)\[]) The product's categories.

    - sales\_channels: (\`null\` \\| \[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)\[]) The sales channels that the product is available in.

    - shipping\_profile: (\`null\` \\| \[AdminShippingProfile]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingProfile/page.mdx)) The shipping profile that the product is available in.

    - tags: (\`null\` \\| \[AdminProductTag]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTag/page.mdx)\[]) The product's tags.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## updateVariant

This method updates a variant of a product. It sends a request to the
[Update Variant](https://docs.medusajs.com/api/admin#products_postproductsidvariantsvariant_id)
API route.

### Example

```ts
sdk.admin.product.updateVariant(
  "prod_123",
  "variant_123",
    {
    title: "Blue Shirt",
  }
)
.then(({ product }) => {
  console.log(product)
})
```

### Parameters

- productId: (\`string\`) The product's ID.
- id: (\`string\`) The variant's ID.
- body: (\[AdminUpdateProductVariant]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateProductVariant/page.mdx)) The data to update in the variant.

  - title: (\`string\`) The variant's title.

  - sku: (\`null\` \\| \`string\`) The variant's SKU.

  - ean: (\`null\` \\| \`string\`) The variant's EAN.

  - upc: (\`null\` \\| \`string\`) The variant's UPC.

  - barcode: (\`null\` \\| \`string\`) The variant's barcode.

  - hs\_code: (\`null\` \\| \`string\`) The variant's HS code.

  - mid\_code: (\`null\` \\| \`string\`) The variant's MID code.

  - thumbnail: (\`null\` \\| \`string\`) The variant's thumbnail.

  - allow\_backorder: (\`boolean\`) Whether the variant can be ordered even if it's out of stock.

  - manage\_inventory: (\`boolean\`) Whether Medusa should manage the variant's inventory. If disabled,
    the variant is always considered in stock.

  - variant\_rank: (\`number\`) The variant's ranking among its sibling variants.

  - weight: (\`null\` \\| \`number\`) The variant's weight.

  - length: (\`null\` \\| \`number\`) The variant's length.

  - height: (\`null\` \\| \`number\`) The variant's height.

  - width: (\`null\` \\| \`number\`) The variant's width.

  - origin\_country: (\`null\` \\| \`string\`) The variant's origin country.

  - material: (\`null\` \\| \`string\`) The variant's material.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - prices: (\[AdminCreateProductVariantPrice]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateProductVariantPrice/page.mdx)\[]) The variant's prices.

    - currency\_code: (\`string\`) The price's currency code.

    - amount: (\`number\`) The price's amount.

    - min\_quantity: (\`null\` \\| \`number\`) The minimum quantity required in the cart for the price to apply.

    - max\_quantity: (\`null\` \\| \`number\`) The maximum quantity required in the cart for the price to apply.

    - rules: (\`null\` \\| \`object\`) The price's rules.

  - options: (\`Record\<string, string>\`) The variant's values for the associated product's options.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the product.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminProductResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductResponse/page.mdx)\&#62;) The product's details.

  - product: (\[AdminProduct]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProduct/page.mdx)) The product's details.

    - variants: (\`null\` \\| \[AdminProductVariant]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariant/page.mdx)\[]) The product's variants.

    - type: (\`null\` \\| \[AdminProductType]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductType/page.mdx)) The product's type.

    - options: (\`null\` \\| \[AdminProductOption]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductOption/page.mdx)\[]) The product's options.

    - images: (\`null\` \\| \[AdminProductImage]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductImage/page.mdx)\[]) The product's images.

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

    - collection: (\`null\` \\| \[AdminCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCollection/page.mdx)) The product's collection.

    - categories: (\`null\` \\| \[AdminProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategory/page.mdx)\[]) The product's categories.

    - sales\_channels: (\`null\` \\| \[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)\[]) The sales channels that the product is available in.

    - shipping\_profile: (\`null\` \\| \[AdminShippingProfile]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingProfile/page.mdx)) The shipping profile that the product is available in.

    - tags: (\`null\` \\| \[AdminProductTag]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTag/page.mdx)\[]) The product's tags.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## listVariants

This method retrieves a paginated list of products. It sends a request to the
[List Products](https://docs.medusajs.com/api/admin#products_getproductsidvariants) API route.

### Example

To retrieve the list of product variants:

```ts
sdk.admin.product.listVariants("prod_123")
.then(({ variants, count, limit, offset }) => {
  console.log(variants)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.product.listVariants("prod_123", {
  limit: 10,
  offset: 10
})
.then(({ variants, count, limit, offset }) => {
  console.log(variants)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each product variant:

```ts
sdk.admin.product.listVariants("prod_123", {
  fields: "id,*product"
})
.then(({ variants, count, limit, offset }) => {
  console.log(variants)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- productId: (\`string\`) The ID of the product to retrieve its variants.
- query: (\[AdminProductVariantParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariantParams/page.mdx)) Filters and pagination configurations.

  - $and: ((\[AdminProductVariantParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariantParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminProductVariantParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariantParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[AdminProductVariantParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariantParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminProductVariantParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariantParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminProductVariantParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariantParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminProductVariantParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariantParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`) Query or keywords to filter the variant's searchable fields.

    - id: (\`string\` \\| \`string\`\[]) Filter by variant ID(s).

    - manage\_inventory: (\`boolean\`) Filter by whether Medusa manages the inventory of the variant.

    - allow\_backorder: (\`boolean\`) Filter by whether the variant can be ordered even if it's
      out of stock.

    - ean: (\`string\` \\| \`string\`\[]) Filter by variant ean(s).

    - upc: (\`string\` \\| \`string\`\[]) Filter by variant upc(s).

    - barcode: (\`string\` \\| \`string\`\[]) Filter by variant barcode(s).

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the variant's creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the variant's update date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the variant's deletion date.

  - $or: ((\[AdminProductVariantParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariantParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminProductVariantParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariantParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[AdminProductVariantParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariantParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminProductVariantParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariantParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminProductVariantParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariantParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminProductVariantParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariantParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`) Query or keywords to filter the variant's searchable fields.

    - id: (\`string\` \\| \`string\`\[]) Filter by variant ID(s).

    - manage\_inventory: (\`boolean\`) Filter by whether Medusa manages the inventory of the variant.

    - allow\_backorder: (\`boolean\`) Filter by whether the variant can be ordered even if it's
      out of stock.

    - ean: (\`string\` \\| \`string\`\[]) Filter by variant ean(s).

    - upc: (\`string\` \\| \`string\`\[]) Filter by variant upc(s).

    - barcode: (\`string\` \\| \`string\`\[]) Filter by variant barcode(s).

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the variant's creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the variant's update date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the variant's deletion date.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - q: (\`string\`) Query or keywords to filter the variant's searchable fields.

  - id: (\`string\` \\| \`string\`\[]) Filter by variant ID(s).

  - manage\_inventory: (\`boolean\`) Filter by whether Medusa manages the inventory of the variant.

  - allow\_backorder: (\`boolean\`) Filter by whether the variant can be ordered even if it's
    out of stock.

  - ean: (\`string\` \\| \`string\`\[]) Filter by variant ean(s).

  - upc: (\`string\` \\| \`string\`\[]) Filter by variant upc(s).

  - barcode: (\`string\` \\| \`string\`\[]) Filter by variant barcode(s).

  - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the variant's creation date.

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

  - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the variant's update date.

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

  - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the variant's deletion date.

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

- Promise: (Promise\&#60;\[AdminProductVariantListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminProductVariantListResponse/page.mdx)\&#62;) The paginated list of product variants.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## retrieveVariant

This method retrieves a product's variant. It sends a request to the
[Retrieve Variant](https://docs.medusajs.com/api/admin#products_getproductsidvariantsvariant_id)
API route.

### Example

To retrieve a product variant by its ID:

```ts
sdk.admin.product.retrieveVariant(
  "prod_123",
  "variant_123"
)
.then(({ variant }) => {
  console.log(variant)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.product.retrieveVariant(
  "prod_123",
  "variant_123",
  {
    fields: "id, *product"
  }
)
.then(({ variant }) => {
  console.log(variant)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- productId: (\`string\`) The product's ID.
- id: (\`string\`) The variant's ID.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the product variant.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminProductVariantResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariantResponse/page.mdx)\&#62;) The product variant's details.

  - variant: (\[AdminProductVariant]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariant/page.mdx))

    - prices: (\`null\` \\| \[AdminPrice]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPrice/page.mdx)\[]) The product variant's prices.

    - options: (\`null\` \\| \[AdminProductOptionValue]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductOptionValue/page.mdx)\[]) The variant's values for the associated product's options.

    - id: (\`string\`) The variant's ID.

    - title: (\`null\` \\| \`string\`) The variant's title.

    - sku: (\`null\` \\| \`string\`) The variant's SKU.

    - barcode: (\`null\` \\| \`string\`) The variant's barcode.

    - ean: (\`null\` \\| \`string\`) The variant's EAN.

    - upc: (\`null\` \\| \`string\`) The variant's UPC.

    - thumbnail: (\`null\` \\| \`string\`) The variant's thumbnail.

    - images: (\`null\` \\| \[BaseProductImage]\(../../../../../types/interfaces/types.BaseProductImage/page.mdx)\[]) The variant's images.

    - allow\_backorder: (\`null\` \\| \`boolean\`) Whether the variant can be ordered even if it's out of stock.

    - manage\_inventory: (\`null\` \\| \`boolean\`) Whether Medusa manages the variant's inventory. If disabled, the variant
      is always considered in stock.

    - hs\_code: (\`null\` \\| \`string\`) The variant's HS code.

    - origin\_country: (\`null\` \\| \`string\`) The variant's origin country.

    - mid\_code: (\`null\` \\| \`string\`) The variant's MID code.

    - material: (\`null\` \\| \`string\`) The variant's material.

    - weight: (\`null\` \\| \`number\`) The variant's weight.

    - length: (\`null\` \\| \`number\`) The variant's length.

    - height: (\`null\` \\| \`number\`) The variant's height.

    - width: (\`null\` \\| \`number\`) The variant's width.

    - created\_at: (\`string\`) The date the variant was created.

    - updated\_at: (\`string\`) The date the variant was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the variant was deleted.

    - product: (\`null\` \\| \[AdminProduct]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProduct/page.mdx)) The product that this variant belongs to.

    - inventory\_items: (\`null\` \\| \[AdminProductVariantInventoryItemLink]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariantInventoryItemLink/page.mdx)\[]) The variant's inventory items.

    - inventory\_quantity: (\`null\` \\| \`number\`) The variant's inventory quantity if \`manage\_inventory\` is enabled.
      This field is only retrieved in the \[Get Product]\(https://docs.medusajs.com/api/store#products\\\_getproductsid)
      and \[List Products]\(https://docs.medusajs.com/api/store#products\\\_getproducts) API routes if you
      pass \`+variants.inventory\_quantity\` in the \`fields\` query parameter.

      Learn more in the \[Retrieve Product Variant's Inventory]\(https://docs.medusajs.com/resources/storefront-development/products/inventory) storefront guide.

    - variant\_rank: (\`null\` \\| \`number\`) The variant's ranking among its siblings.

    - product\_id: (\`string\`) The ID of the product that the variant belongs to.

    - calculated\_price: (\[BaseCalculatedPriceSet]\(../../../../../types/interfaces/types.BaseCalculatedPriceSet/page.mdx)) The variant's calculated price for the provided context.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## deleteVariant

This method deletes a product's variant. It sends a request to the
[Delete Variant](https://docs.medusajs.com/api/admin#products_deleteproductsidvariantsvariant_id)
API route.

### Example

```ts
sdk.admin.product.deleteVariant("prod_123", "variant_123")
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- productId: (\`string\`) The product's ID.
- id: (\`string\`) The ID of the variant.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminProductVariantDeleteResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariantDeleteResponse/page.mdx)\&#62;) The deletion's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (\`"variant"\`) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.

  - parent: (\[AdminProduct]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProduct/page.mdx)) The parent resource of the item that was deleted, if applicable.

    - variants: (\`null\` \\| \[AdminProductVariant]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariant/page.mdx)\[]) The product's variants.

    - type: (\`null\` \\| \[AdminProductType]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductType/page.mdx)) The product's type.

    - options: (\`null\` \\| \[AdminProductOption]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductOption/page.mdx)\[]) The product's options.

    - images: (\`null\` \\| \[AdminProductImage]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductImage/page.mdx)\[]) The product's images.

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

    - collection: (\`null\` \\| \[AdminCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCollection/page.mdx)) The product's collection.

    - categories: (\`null\` \\| \[AdminProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategory/page.mdx)\[]) The product's categories.

    - sales\_channels: (\`null\` \\| \[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)\[]) The sales channels that the product is available in.

    - shipping\_profile: (\`null\` \\| \[AdminShippingProfile]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingProfile/page.mdx)) The shipping profile that the product is available in.

    - tags: (\`null\` \\| \[AdminProductTag]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTag/page.mdx)\[]) The product's tags.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## batchVariantInventoryItems

This method manages a product's variant's inventories to associate them with inventory items,
update their inventory items, or delete their association with inventory items.

It sends a request to the
[Manage Variant Inventory](https://docs.medusajs.com/api/admin#products_postproductsidvariantsinventoryitemsbatch)
API route.

### Example

```ts
sdk.admin.product.batchVariantInventoryItems(
  "prod_123",
  {
    create: [
      {
        inventory_item_id: "iitem_123",
        variant_id: "variant_123",
        required_quantity: 10
      }
    ],
    update: [
      {
        inventory_item_id: "iitem_1234",
        variant_id: "variant_1234",
        required_quantity: 20
      }
    ],
    delete: [
      {
        inventory_item_id: "iitem_321",
        variant_id: "variant_321"
      }
    ]
  }
)
.then(({ created, updated, deleted }) => {
  console.log(created, updated, deleted)
})
```

### Parameters

- productId: (\`string\`) The ID of the product that the variant belongs to.
- body: (\[AdminBatchProductVariantInventoryItemRequest]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminBatchProductVariantInventoryItemRequest/page.mdx)) The inventory items to create, update, or delete.

  - create: (\[AdminCreateProductVariantInventoryItem]\(../../../../../types/interfaces/types.AdminCreateProductVariantInventoryItem/page.mdx)\[]) Records to create in bulk.

    - required\_quantity: (\`number\`) The number of units a single quantity is equivalent to. For example, if a customer orders one quantity of the variant, Medusa checks the availability of the quantity multiplied by the
      value set for \`required\_quantity\`. When the customer orders the quantity, Medusa reserves the ordered quantity multiplied by the value set for \`required\_quantity\`.

    - inventory\_item\_id: (\`string\`) The ID of the inventory item.

    - variant\_id: (\`string\`) The ID of the variant.

  - update: (\[AdminUpdateProductVariantInventoryItem]\(../../../../../types/interfaces/types.AdminUpdateProductVariantInventoryItem/page.mdx)\[]) Records to update in bulk.

    - required\_quantity: (\`number\`) The number of units a single quantity is equivalent to. For example, if a customer orders one quantity of the variant, Medusa checks the availability of the quantity multiplied by the
      value set for \`required\_quantity\`. When the customer orders the quantity, Medusa reserves the ordered quantity multiplied by the value set for \`required\_quantity\`.

    - inventory\_item\_id: (\`string\`) The ID of the inventory item.

    - variant\_id: (\`string\`) The ID of the variant.

  - delete: (\[AdminDeleteProductVariantInventoryItem]\(../../../../../types/interfaces/types.AdminDeleteProductVariantInventoryItem/page.mdx)\[]) Records to delete in bulk.

    - inventory\_item\_id: (\`string\`) The ID of the inventory.

    - variant\_id: (\`string\`) The ID of the variant.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Pass query parameters in the request.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminBatchProductVariantInventoryItemResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminBatchProductVariantInventoryItemResponse/page.mdx)\&#62;) The details of the created, updated, or deleted inventory items.

  - created: (\[AdminInventoryItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInventoryItem/page.mdx)\[]) The items that were created.

    - id: (\`string\`) The inventory item's ID.

    - requires\_shipping: (\`boolean\`) Whether the item requires shipping.

    - sku: (\`null\` \\| \`string\`) The inventory item's SKU.

    - origin\_country: (\`null\` \\| \`string\`) The inventory item's origin country.

    - hs\_code: (\`null\` \\| \`string\`) The inventory item's HS code.

    - mid\_code: (\`null\` \\| \`string\`) The inventory item's MID code.

    - material: (\`null\` \\| \`string\`) The inventory item's material.

    - weight: (\`null\` \\| \`number\`) The inventory item's weight.

    - length: (\`null\` \\| \`number\`) The inventory item's length.

    - height: (\`null\` \\| \`number\`) The inventory item's height.

    - width: (\`null\` \\| \`number\`) The inventory item's width.

    - title: (\`null\` \\| \`string\`) The inventory item's title.

    - description: (\`null\` \\| \`string\`) The inventory item's description.

    - thumbnail: (\`null\` \\| \`string\`) The inventory item's thumbnail URL.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - location\_levels: (\[AdminInventoryLevel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInventoryLevel/page.mdx)\[]) The item's associated inventory levels.

  - updated: (\[AdminInventoryItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInventoryItem/page.mdx)\[]) The items that were updated.

    - id: (\`string\`) The inventory item's ID.

    - requires\_shipping: (\`boolean\`) Whether the item requires shipping.

    - sku: (\`null\` \\| \`string\`) The inventory item's SKU.

    - origin\_country: (\`null\` \\| \`string\`) The inventory item's origin country.

    - hs\_code: (\`null\` \\| \`string\`) The inventory item's HS code.

    - mid\_code: (\`null\` \\| \`string\`) The inventory item's MID code.

    - material: (\`null\` \\| \`string\`) The inventory item's material.

    - weight: (\`null\` \\| \`number\`) The inventory item's weight.

    - length: (\`null\` \\| \`number\`) The inventory item's length.

    - height: (\`null\` \\| \`number\`) The inventory item's height.

    - width: (\`null\` \\| \`number\`) The inventory item's width.

    - title: (\`null\` \\| \`string\`) The inventory item's title.

    - description: (\`null\` \\| \`string\`) The inventory item's description.

    - thumbnail: (\`null\` \\| \`string\`) The inventory item's thumbnail URL.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - location\_levels: (\[AdminInventoryLevel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInventoryLevel/page.mdx)\[]) The item's associated inventory levels.

  - deleted: (\`object\`) Details of the items that were deleted.

    - ids: (\`string\`\[]) The IDs of the items that were deleted.

    - object: (\`string\`) The type of the items that were deleted.

    - deleted: (\`boolean\`) Whether the items were deleted successfully.

***

## createOption

This method creates an option in a product. It sends a request to the
[Create Option](https://docs.medusajs.com/api/admin#products_postproductsidoptions)
API route.

### Example

```ts
sdk.admin.product.createOption(
  "prod_123",
  {
    title: "Color",
    values: ["Green", "Blue"]
  }
)
.then(({ product }) => {
  console.log(product)
})
```

### Parameters

- productId: (\`string\`) The product's ID.
- body: (\[AdminCreateProductOption]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateProductOption/page.mdx)) The option's details.

  - title: (\`string\`) The option's title.

  - values: (\`string\`\[]) The option's values.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the product.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminProductResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductResponse/page.mdx)\&#62;) The product's details.

  - product: (\[AdminProduct]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProduct/page.mdx)) The product's details.

    - variants: (\`null\` \\| \[AdminProductVariant]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariant/page.mdx)\[]) The product's variants.

    - type: (\`null\` \\| \[AdminProductType]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductType/page.mdx)) The product's type.

    - options: (\`null\` \\| \[AdminProductOption]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductOption/page.mdx)\[]) The product's options.

    - images: (\`null\` \\| \[AdminProductImage]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductImage/page.mdx)\[]) The product's images.

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

    - collection: (\`null\` \\| \[AdminCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCollection/page.mdx)) The product's collection.

    - categories: (\`null\` \\| \[AdminProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategory/page.mdx)\[]) The product's categories.

    - sales\_channels: (\`null\` \\| \[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)\[]) The sales channels that the product is available in.

    - shipping\_profile: (\`null\` \\| \[AdminShippingProfile]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingProfile/page.mdx)) The shipping profile that the product is available in.

    - tags: (\`null\` \\| \[AdminProductTag]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTag/page.mdx)\[]) The product's tags.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## updateOption

This method updates a product's option. It sends a request to the
[Update Option](https://docs.medusajs.com/api/admin#products_postproductsidoptionsoption_id)
API route.

### Example

```ts
sdk.admin.product.updateOption(
  "prod_123",
  "prodopt_123",
  {
    title: "Color"
  }
)
.then(({ product }) => {
  console.log(product)
})
```

### Parameters

- productId: (\`string\`) The product's ID.
- id: (\`string\`) The ID of the option to update.
- body: (\[AdminUpdateProductOption]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateProductOption/page.mdx)) The data to update in the option.

  - title: (\`string\`) The option's title.

  - values: (\`string\`\[]) The option's values.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the product.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminProductResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductResponse/page.mdx)\&#62;) The product's details.

  - product: (\[AdminProduct]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProduct/page.mdx)) The product's details.

    - variants: (\`null\` \\| \[AdminProductVariant]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariant/page.mdx)\[]) The product's variants.

    - type: (\`null\` \\| \[AdminProductType]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductType/page.mdx)) The product's type.

    - options: (\`null\` \\| \[AdminProductOption]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductOption/page.mdx)\[]) The product's options.

    - images: (\`null\` \\| \[AdminProductImage]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductImage/page.mdx)\[]) The product's images.

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

    - collection: (\`null\` \\| \[AdminCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCollection/page.mdx)) The product's collection.

    - categories: (\`null\` \\| \[AdminProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategory/page.mdx)\[]) The product's categories.

    - sales\_channels: (\`null\` \\| \[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)\[]) The sales channels that the product is available in.

    - shipping\_profile: (\`null\` \\| \[AdminShippingProfile]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingProfile/page.mdx)) The shipping profile that the product is available in.

    - tags: (\`null\` \\| \[AdminProductTag]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTag/page.mdx)\[]) The product's tags.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## listOptions

This method retrieves a paginated list of product options. It sends a request to the
[List Options](https://docs.medusajs.com/api/admin#products_getproductsidoptions) API route.

### Example

To retrieve the list of product options:

```ts
sdk.admin.product.listOptions("prod_123")
.then(({ product_options, count, limit, offset }) => {
  console.log(product_options)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.product.listOptions("prod_123", {
  limit: 10,
  offset: 10
})
.then(({ product_options, count, limit, offset }) => {
  console.log(product_options)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each product options:

```ts
sdk.admin.product.listOptions("prod_123", {
  fields: "id,title"
})
.then(({ product_options, count, limit, offset }) => {
  console.log(product_options)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- productId: (\`string\`) The ID of the product to retrieve its options
- query: (\[AdminProductOptionParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductOptionParams/page.mdx)) Filters and pagination configurations.

  - $and: ((\[BaseProductOptionParams]\(../../../../../types/interfaces/types.BaseProductOptionParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseProductOptionParams]\(../../../../../types/interfaces/types.BaseProductOptionParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[BaseProductOptionParams]\(../../../../../types/interfaces/types.BaseProductOptionParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseProductOptionParams]\(../../../../../types/interfaces/types.BaseProductOptionParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[BaseProductOptionParams]\(../../../../../types/interfaces/types.BaseProductOptionParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseProductOptionParams]\(../../../../../types/interfaces/types.BaseProductOptionParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`)

    - id: (\`string\` \\| \`string\`\[])

    - title: (\`string\` \\| \`string\`\[])

    - product\_id: (\`string\` \\| \`string\`\[])

  - $or: ((\[BaseProductOptionParams]\(../../../../../types/interfaces/types.BaseProductOptionParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseProductOptionParams]\(../../../../../types/interfaces/types.BaseProductOptionParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[BaseProductOptionParams]\(../../../../../types/interfaces/types.BaseProductOptionParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseProductOptionParams]\(../../../../../types/interfaces/types.BaseProductOptionParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[BaseProductOptionParams]\(../../../../../types/interfaces/types.BaseProductOptionParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseProductOptionParams]\(../../../../../types/interfaces/types.BaseProductOptionParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`)

    - id: (\`string\` \\| \`string\`\[])

    - title: (\`string\` \\| \`string\`\[])

    - product\_id: (\`string\` \\| \`string\`\[])

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - q: (\`string\`)

  - id: (\`string\` \\| \`string\`\[])

  - title: (\`string\` \\| \`string\`\[])
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminProductOptionListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminProductOptionListResponse/page.mdx)\&#62;) The paginated list of product options.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## retrieveOption

This method retrieves a product's option. It sends a request to the
[Get Option](https://docs.medusajs.com/api/admin#products_getproductsidoptionsoption_id)
API route.

### Example

To retrieve a product option by its ID:

```ts
sdk.admin.product.retrieveOption(
  "prod_123",
  "prodopt_123"
)
.then(({ product_option }) => {
  console.log(product_option)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.product.retrieveOption(
  "prod_123",
  "prodopt_123",
  {
    fields: "id,title"
  }
)
.then(({ product_option }) => {
  console.log(product_option)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- productId: (\`string\`) The product's ID.
- id: (\`string\`) The product option's ID.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the product option.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminProductOptionResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductOptionResponse/page.mdx)\&#62;) The product option's details.

  - product\_option: (\[AdminProductOption]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductOption/page.mdx)) The product option's details.

    - id: (\`string\`) The option's ID.

    - title: (\`string\`) The option's title.

    - product: (\`null\` \\| \[AdminProduct]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProduct/page.mdx)) The associated product's details.

    - values: (\[AdminProductOptionValue]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductOptionValue/page.mdx)\[]) The option's values.

    - product\_id: (\`null\` \\| \`string\`) The ID of the product that the option belongs to.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - created\_at: (\`string\`) The date the option was created.

    - updated\_at: (\`string\`) The date the option was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the option was deleted.

***

## deleteOption

This method deletes a product's option. It sends a request to the
[Delete Option](https://docs.medusajs.com/api/admin#products_deleteproductsidoptionsoption_id)
API route.

### Example

```ts
sdk.admin.product.deleteOption("prod_123", "prodopt_123")
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- productId: (\`string\`) The product's ID.
- id: (\`string\`) The option's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminProductOptionDeleteResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductOptionDeleteResponse/page.mdx)\&#62;) The deletion's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (\`"product\_option"\`) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.

  - parent: (\[AdminProduct]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProduct/page.mdx)) The parent resource of the item that was deleted, if applicable.

    - variants: (\`null\` \\| \[AdminProductVariant]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductVariant/page.mdx)\[]) The product's variants.

    - type: (\`null\` \\| \[AdminProductType]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductType/page.mdx)) The product's type.

    - options: (\`null\` \\| \[AdminProductOption]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductOption/page.mdx)\[]) The product's options.

    - images: (\`null\` \\| \[AdminProductImage]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductImage/page.mdx)\[]) The product's images.

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

    - collection: (\`null\` \\| \[AdminCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCollection/page.mdx)) The product's collection.

    - categories: (\`null\` \\| \[AdminProductCategory]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductCategory/page.mdx)\[]) The product's categories.

    - sales\_channels: (\`null\` \\| \[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)\[]) The sales channels that the product is available in.

    - shipping\_profile: (\`null\` \\| \[AdminShippingProfile]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingProfile/page.mdx)) The shipping profile that the product is available in.

    - tags: (\`null\` \\| \[AdminProductTag]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminProductTag/page.mdx)\[]) The product's tags.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## batchImageVariants

This method manages image-variant associations for a specific image. It sends a request to the
[Batch Image Variants](https://docs.medusajs.com/api/admin#products_postproductsidimagesimage_idvariantsbatch)
API route.

:::note

This is available starting from [Medusa v2.11.2](https://github.com/medusajs/medusa/releases/tag/v2.11.2).

:::

### Example

```ts
sdk.admin.product.batchImageVariants("prod_123", "img_123", {
  add: ["variant_123", "variant_456"],
  remove: ["variant_789"]
})
.then(({ added, removed }) => {
  console.log(added, removed)
})
```

### Parameters

- productId: (\`string\`) The product's ID.
- imageId: (\`string\`) The image's ID.
- body: (\[AdminBatchImageVariantRequest]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminBatchImageVariantRequest/page.mdx)) The variants to add or remove from the image.

  - add: (\`string\`\[]) The variant IDs to add to the image.

  - remove: (\`string\`\[]) The variant IDs to remove from the image.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminBatchImageVariantResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminBatchImageVariantResponse/page.mdx)\&#62;) The batch operation details.

  - added: (\`string\`\[]) The variant IDs that were added to the image.

  - removed: (\`string\`\[]) The variant IDs that were removed from the image.

***

## batchVariantImages

This method manages variant-image associations for a specific variant. It sends a request to the
[Batch Variant Images](https://docs.medusajs.com/api/admin#products_postproductsidvariantsvariant_idimagesbatch)
API route.

:::note

This is available starting from [Medusa v2.11.2](https://github.com/medusajs/medusa/releases/tag/v2.11.2).

:::

### Example

```ts
sdk.admin.product.batchVariantImages("prod_123", "variant_123", {
  add: ["img_123", "img_456"],
  remove: ["img_789"]
})
.then(({ added, removed }) => {
  console.log(added, removed)
})
```

### Parameters

- productId: (\`string\`) The product's ID.
- variantId: (\`string\`) The variant's ID.
- body: (\[AdminBatchVariantImagesRequest]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminBatchVariantImagesRequest/page.mdx)) The images to add or remove from the variant.

  - add: (\`string\`\[]) The image IDs to add to the variant.

  - remove: (\`string\`\[]) The image IDs to remove from the variant.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminBatchVariantImagesResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminBatchVariantImagesResponse/page.mdx)\&#62;) The batch operation details.

  - added: (\`string\`\[]) The image IDs that were added to the variant.

  - removed: (\`string\`\[]) The image IDs that were removed from the variant.
