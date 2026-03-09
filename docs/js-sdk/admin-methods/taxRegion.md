# taxRegion - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.taxRegion` set of methods used to send requests to Medusa's Admin API routes.

## create

This method creates a tax region. It sends a request to the
[Create Tax Region](https://docs.medusajs.com/api/admin#tax-regions_posttaxregions)
API route.

### Example

```ts
sdk.admin.taxRegion.create({
  country_code: "us",
  province_code: "ca",
  default_tax_rate: {
    code: "VAT",
    name: "VAT",
    rate: 20, // 20%
    is_combinable: true,
  },
})
.then(({ tax_region }) => {
  console.log(tax_region)
})
```

### Parameters

- body: (\[AdminCreateTaxRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateTaxRegion/page.mdx)) The details of the tax region to create.

  - country\_code: (\`string\`) The country code of the tax region.

  - provider\_id: (\`string\`) The ID of the tax provider.

  - province\_code: (\`string\`) The lower-case \[ISO 3166-2]\(https://en.wikipedia.org/wiki/ISO\\\_3166-2) province or state code of the tax region.

  - parent\_id: (\`string\`) The ID of the parent tax region.

  - default\_tax\_rate: (\`object\`) The default tax rate of the tax region.

    - code: (\`string\`) The code of the default tax rate.

    - name: (\`string\`) The name of the default tax rate.

    - rate: (\`number\`) The percentage rate of the default tax rate.

    - is\_combinable: (\`boolean\`) Whether the default tax rate is combinable with other tax rates.

    - metadata: (\`Record\<string, unknown>\`) Custom key-value pairs that can be added to the default tax rate.

  - metadata: (\`Record\<string, unknown>\`) Custom key-value pairs that can be added to the tax region.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the tax region.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminTaxRegionResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRegionResponse/page.mdx)\&#62;) The tax region's details.

  - tax\_region: (\[AdminTaxRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRegion/page.mdx)) The tax region's details.

    - id: (\`string\`) The tax region's ID.

    - country\_code: (\`null\` \\| \`string\`) The tax region's country code.

    - province\_code: (\`null\` \\| \`string\`) The tax region's lower-case \[ISO 3166-2]\(https://en.wikipedia.org/wiki/ISO\\\_3166-2) province or state code.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Custom key-value pairs that can be added to the tax region.

    - parent\_id: (\`null\` \\| \`string\`) The ID of the parent tax region.

    - provider\_id: (\`null\` \\| \`string\`) The ID of the tax provider for the region.

    - created\_at: (\`string\`) The date the tax region was created.

    - updated\_at: (\`string\`) The date the tax region was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the tax region was deleted.

    - created\_by: (\`null\` \\| \`string\`) The ID of the user who created the tax region.

    - tax\_rates: (\[AdminTaxRate]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRate/page.mdx)\[]) The tax rates associated with the tax region.

    - parent: (\`null\` \\| \[AdminTaxRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRegion/page.mdx)) The parent tax region.

    - children: (\[AdminTaxRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRegion/page.mdx)\[]) The child tax regions.

***

## update

This method updates a tax region. It sends a request to the
[Update Tax Region](https://docs.medusajs.com/api/admin#tax-regions_posttaxregionsid)
API route.

:::note

This is available starting from [Medusa v2.8.0](https://github.com/medusajs/medusa/releases/tag/v2.8.0).

:::

### Example

```ts
sdk.admin.taxRegion.update("txreg_123", {
  province_code: "ca",
})
.then(({ tax_region }) => {
  console.log(tax_region)
})
```

### Parameters

- id: (\`string\`) The ID of the tax region to update.
- body: (\[AdminUpdateTaxRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateTaxRegion/page.mdx)) The details of the tax region to update.

  - province\_code: (\`string\`) The lower-case \[ISO 3166-2]\(https://en.wikipedia.org/wiki/ISO\\\_3166-2) province or state code of the tax region.

  - provider\_id: (\`string\`) The ID of the tax provider.

  - metadata: (\`Record\<string, unknown>\`) Custom key-value pairs that can be added to the tax region.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the tax region.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminTaxRegionResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRegionResponse/page.mdx)\&#62;) The tax region's details.

  - tax\_region: (\[AdminTaxRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRegion/page.mdx)) The tax region's details.

    - id: (\`string\`) The tax region's ID.

    - country\_code: (\`null\` \\| \`string\`) The tax region's country code.

    - province\_code: (\`null\` \\| \`string\`) The tax region's lower-case \[ISO 3166-2]\(https://en.wikipedia.org/wiki/ISO\\\_3166-2) province or state code.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Custom key-value pairs that can be added to the tax region.

    - parent\_id: (\`null\` \\| \`string\`) The ID of the parent tax region.

    - provider\_id: (\`null\` \\| \`string\`) The ID of the tax provider for the region.

    - created\_at: (\`string\`) The date the tax region was created.

    - updated\_at: (\`string\`) The date the tax region was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the tax region was deleted.

    - created\_by: (\`null\` \\| \`string\`) The ID of the user who created the tax region.

    - tax\_rates: (\[AdminTaxRate]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRate/page.mdx)\[]) The tax rates associated with the tax region.

    - parent: (\`null\` \\| \[AdminTaxRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRegion/page.mdx)) The parent tax region.

    - children: (\[AdminTaxRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRegion/page.mdx)\[]) The child tax regions.

***

## delete

This method deletes a tax region. It sends a request to the
[Delete Tax Region](https://docs.medusajs.com/api/admin#tax-regions_deletetaxregionsid)
API route.

### Example

```ts
sdk.admin.taxRegion.delete("txreg_123")
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- id: (\`string\`) The ID of the tax region to delete.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminTaxRegionDeleteResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRegionDeleteResponse/page.mdx)\&#62;) The deletion's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (\`"tax\_region"\`) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.

***

## retrieve

This method retrieves a tax region. It sends a request to the
[Get Tax Region](https://docs.medusajs.com/api/admin#tax-regions_gettaxregionsid)
API route.

### Example

To retrieve a tax region by its ID:

```ts
sdk.admin.taxRegion.retrieve("txreg_123")
.then(({ tax_region }) => {
  console.log(tax_region)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.taxRegion.retrieve("txreg_123", {
  fields: "id,*tax_rates"
})
.then(({ tax_region }) => {
  console.log(tax_region)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/admin#select-fields-and-relations).

### Parameters

- id: (\`string\`) The ID of the tax region to retrieve.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the tax region.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminTaxRegionResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRegionResponse/page.mdx)\&#62;) The tax region's details.

  - tax\_region: (\[AdminTaxRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRegion/page.mdx)) The tax region's details.

    - id: (\`string\`) The tax region's ID.

    - country\_code: (\`null\` \\| \`string\`) The tax region's country code.

    - province\_code: (\`null\` \\| \`string\`) The tax region's lower-case \[ISO 3166-2]\(https://en.wikipedia.org/wiki/ISO\\\_3166-2) province or state code.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Custom key-value pairs that can be added to the tax region.

    - parent\_id: (\`null\` \\| \`string\`) The ID of the parent tax region.

    - provider\_id: (\`null\` \\| \`string\`) The ID of the tax provider for the region.

    - created\_at: (\`string\`) The date the tax region was created.

    - updated\_at: (\`string\`) The date the tax region was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the tax region was deleted.

    - created\_by: (\`null\` \\| \`string\`) The ID of the user who created the tax region.

    - tax\_rates: (\[AdminTaxRate]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRate/page.mdx)\[]) The tax rates associated with the tax region.

    - parent: (\`null\` \\| \[AdminTaxRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRegion/page.mdx)) The parent tax region.

    - children: (\[AdminTaxRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRegion/page.mdx)\[]) The child tax regions.

***

## list

This method retrieves a list of tax regions. It sends a request to the
[List Tax Regions](https://docs.medusajs.com/api/admin#tax-regions_gettaxregions)
API route.

### Example

To retrieve the list of tax regions:

```ts
sdk.admin.taxRegion.list()
.then(({ tax_regions, count, limit, offset }) => {
  console.log(tax_regions)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.taxRegion.list({
  limit: 10,
  offset: 10
})
.then(({ tax_regions, count, limit, offset }) => {
  console.log(tax_regions)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each tax region:

```ts
sdk.admin.taxRegion.list({
  fields: "id,*tax_rates"
})
.then(({ tax_regions, count, limit, offset }) => {
  console.log(tax_regions)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/admin#select-fields-and-relations).

### Parameters

- query: (\[AdminTaxRegionListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRegionListParams/page.mdx)) Filters and pagination configurations.

  - $and: ((\[AdminTaxRegionListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRegionListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminTaxRegionListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRegionListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[AdminTaxRegionListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRegionListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminTaxRegionListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRegionListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminTaxRegionListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRegionListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminTaxRegionListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRegionListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - id: (\`string\` \\| \`string\`\[]) Filter by tax region ID(s).

    - q: (\`string\`) Query or keywords to search the tax region's searchable fields.

    - parent\_id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by the tax region's parent ID(s) to retrieve its children.

    - country\_code: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by the tax region's country code(s).

    - province\_code: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by the tax region's lower-case \[ISO 3166-2]\(https://en.wikipedia.org/wiki/ISO\\\_3166-2) province or state code(s).

    - created\_at: (\`string\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the tax region was created.

    - updated\_at: (\`string\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the tax region was updated.

    - deleted\_at: (\`string\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the tax region was deleted.

    - created\_by: (\`string\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the ID of the user who created the tax region to&#x20;
      retrieve tax regions created by a specific user.

  - $or: ((\[AdminTaxRegionListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRegionListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminTaxRegionListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRegionListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[AdminTaxRegionListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRegionListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminTaxRegionListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRegionListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminTaxRegionListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRegionListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminTaxRegionListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRegionListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - id: (\`string\` \\| \`string\`\[]) Filter by tax region ID(s).

    - q: (\`string\`) Query or keywords to search the tax region's searchable fields.

    - parent\_id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by the tax region's parent ID(s) to retrieve its children.

    - country\_code: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by the tax region's country code(s).

    - province\_code: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by the tax region's lower-case \[ISO 3166-2]\(https://en.wikipedia.org/wiki/ISO\\\_3166-2) province or state code(s).

    - created\_at: (\`string\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the tax region was created.

    - updated\_at: (\`string\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the tax region was updated.

    - deleted\_at: (\`string\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the tax region was deleted.

    - created\_by: (\`string\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the ID of the user who created the tax region to&#x20;
      retrieve tax regions created by a specific user.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - id: (\`string\` \\| \`string\`\[]) Filter by tax region ID(s).

  - q: (\`string\`) Query or keywords to search the tax region's searchable fields.

  - parent\_id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by the tax region's parent ID(s) to retrieve its children.

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

  - country\_code: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by the tax region's country code(s).

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

  - province\_code: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by the tax region's lower-case \[ISO 3166-2]\(https://en.wikipedia.org/wiki/ISO\\\_3166-2) province or state code(s).

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

  - created\_at: (\`string\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the tax region was created.

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

  - updated\_at: (\`string\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the tax region was updated.

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

  - deleted\_at: (\`string\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the tax region was deleted.

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

  - created\_by: (\`string\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the ID of the user who created the tax region to&#x20;
    retrieve tax regions created by a specific user.

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

- Promise: (Promise\&#60;\[AdminTaxRegionListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminTaxRegionListResponse/page.mdx)\&#62;) The list of tax regions.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.
