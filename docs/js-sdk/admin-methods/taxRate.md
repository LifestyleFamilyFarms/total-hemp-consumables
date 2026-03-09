# taxRate - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.taxRate` set of methods used to send requests to Medusa's Admin API routes.

## create

This method creates a tax rate. It sends a request to the
[Create Tax Rate](https://docs.medusajs.com/api/admin#tax-rates_posttaxrates)
API route.

### Example

```ts
sdk.admin.taxRate.create({
  name: "VAT",
  tax_region_id: "txreg_123",
  code: "VAT",
  rate: 2, // 2%
})
.then(({ tax_rate }) => {
  console.log(tax_rate)
})
```

### Parameters

- body: (\[AdminCreateTaxRate]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateTaxRate/page.mdx)) The details of the tax rate to create.

  - name: (\`string\`) The name of the tax rate.

  - tax\_region\_id: (\`string\`) The ID of the tax region associated with the tax rate.

  - code: (\`string\`) The code of the tax rate.

  - rate: (\`number\`) The rate of the tax rate.

  - rules: (\[AdminCreateTaxRateRule]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateTaxRateRule/page.mdx)\[]) The rules of the tax rate.

    - reference: (\`string\`) The name of the table that the rule references.

    - reference\_id: (\`string\`) The ID of the record in the table that the rule references.

  - is\_default: (\`boolean\`) Whether the tax rate is the default tax rate in its tax region.

  - is\_combinable: (\`boolean\`) Whether the tax rate is combinable with other tax rates.

  - metadata: (\`Record\<string, unknown>\`) Custom key-value pairs that can be added to the tax rate.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the tax rate.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminTaxRateResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRateResponse/page.mdx)\&#62;) The tax rate's details.

  - tax\_rate: (\[AdminTaxRate]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRate/page.mdx)) The tax rate's details.

    - id: (\`string\`) The tax rate's ID.

    - rate: (\`null\` \\| \`number\`) The tax rate's percentage rate.

    - code: (\`string\`) The tax rate's code.

    - name: (\`string\`) The tax rate's name.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Custom key-value pairs that can be added to the tax rate.

    - tax\_region\_id: (\`string\`) The ID of the tax region associated with the tax rate.

    - is\_combinable: (\`boolean\`) Whether the tax rate is combinable with other tax rates.

    - is\_default: (\`boolean\`) Whether the tax rate is the default tax rate in its tax region.

    - created\_at: (\`string\`) The date the tax rate was created.

    - updated\_at: (\`string\`) The date the tax rate was updated.

    - deleted\_at: (\`null\`) The date the tax rate was deleted.

    - created\_by: (\`null\` \\| \`string\`) The ID of the user who created the tax rate.

    - tax\_region: (\[AdminTaxRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRegion/page.mdx)) The tax region associated with the tax rate.

    - rules: (\[AdminTaxRateRule]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRateRule/page.mdx)\[]) The rules associated with the tax rate.

***

## update

This method updates a tax rate. It sends a request to the
[Update Tax Rate](https://docs.medusajs.com/api/admin#tax-rates_posttaxratesid)
API route.

### Example

```ts
sdk.admin.taxRate.update("txrat_123", {
  name: "VAT",
  code: "VAT",
})
.then(({ tax_rate }) => {
  console.log(tax_rate)
})
```

### Parameters

- id: (\`string\`) The ID of the tax rate to update.
- body: (\[AdminUpdateTaxRate]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateTaxRate/page.mdx)) The details of the tax rate to update.

  - code: (\`string\`) The code of the tax rate.

  - name: (\`string\`) The name of the tax rate.

  - rate: (\`number\`) The percentage rate of the tax rate.

  - rules: (\[AdminCreateTaxRateRule]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateTaxRateRule/page.mdx)\[]) The rules of the tax rate.

    - reference: (\`string\`) The name of the table that the rule references.

    - reference\_id: (\`string\`) The ID of the record in the table that the rule references.

  - is\_default: (\`boolean\`) Whether the tax rate is the default tax rate in its tax region.

  - is\_combinable: (\`boolean\`) Whether the tax rate is combinable with other tax rates.

  - metadata: (\`Record\<string, unknown>\`) Custom key-value pairs that can be added to the tax rate.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the tax rate.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminTaxRateResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRateResponse/page.mdx)\&#62;) The tax rate's details.

  - tax\_rate: (\[AdminTaxRate]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRate/page.mdx)) The tax rate's details.

    - id: (\`string\`) The tax rate's ID.

    - rate: (\`null\` \\| \`number\`) The tax rate's percentage rate.

    - code: (\`string\`) The tax rate's code.

    - name: (\`string\`) The tax rate's name.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Custom key-value pairs that can be added to the tax rate.

    - tax\_region\_id: (\`string\`) The ID of the tax region associated with the tax rate.

    - is\_combinable: (\`boolean\`) Whether the tax rate is combinable with other tax rates.

    - is\_default: (\`boolean\`) Whether the tax rate is the default tax rate in its tax region.

    - created\_at: (\`string\`) The date the tax rate was created.

    - updated\_at: (\`string\`) The date the tax rate was updated.

    - deleted\_at: (\`null\`) The date the tax rate was deleted.

    - created\_by: (\`null\` \\| \`string\`) The ID of the user who created the tax rate.

    - tax\_region: (\[AdminTaxRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRegion/page.mdx)) The tax region associated with the tax rate.

    - rules: (\[AdminTaxRateRule]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRateRule/page.mdx)\[]) The rules associated with the tax rate.

***

## delete

This method deletes a tax rate. It sends a request to the
[Delete Tax Rate](https://docs.medusajs.com/api/admin#tax-rates_deletetaxratesid)
API route.

### Example

```ts
sdk.admin.taxRate.delete("txrat_123")
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- id: (\`string\`) The ID of the tax rate to delete.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminTaxRateDeleteResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRateDeleteResponse/page.mdx)\&#62;) The deletion's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (\`"tax\_rate"\`) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.

***

## retrieve

This method retrieves a tax rate. It sends a request to the
[Get Tax Rate](https://docs.medusajs.com/api/admin#tax-rates_gettaxratesid)
API route.

### Example

To retrieve a tax rate by its ID:

```ts
sdk.admin.taxRate.retrieve("txrat_123")
.then(({ tax_rate }) => {
  console.log(tax_rate)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.taxRate.retrieve("txrat_123", {
  fields: "id,*tax_region"
})
.then(({ tax_rate }) => {
  console.log(tax_rate)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/admin#select-fields-and-relations).

### Parameters

- id: (\`string\`) The ID of the tax rate to retrieve.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the tax rate.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminTaxRateResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRateResponse/page.mdx)\&#62;) The tax rate's details.

  - tax\_rate: (\[AdminTaxRate]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRate/page.mdx)) The tax rate's details.

    - id: (\`string\`) The tax rate's ID.

    - rate: (\`null\` \\| \`number\`) The tax rate's percentage rate.

    - code: (\`string\`) The tax rate's code.

    - name: (\`string\`) The tax rate's name.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Custom key-value pairs that can be added to the tax rate.

    - tax\_region\_id: (\`string\`) The ID of the tax region associated with the tax rate.

    - is\_combinable: (\`boolean\`) Whether the tax rate is combinable with other tax rates.

    - is\_default: (\`boolean\`) Whether the tax rate is the default tax rate in its tax region.

    - created\_at: (\`string\`) The date the tax rate was created.

    - updated\_at: (\`string\`) The date the tax rate was updated.

    - deleted\_at: (\`null\`) The date the tax rate was deleted.

    - created\_by: (\`null\` \\| \`string\`) The ID of the user who created the tax rate.

    - tax\_region: (\[AdminTaxRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRegion/page.mdx)) The tax region associated with the tax rate.

    - rules: (\[AdminTaxRateRule]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRateRule/page.mdx)\[]) The rules associated with the tax rate.

***

## list

This method retrieves a list of tax rates. It sends a request to the
[List Tax Rates](https://docs.medusajs.com/api/admin#tax-rates_gettaxrates)
API route.

### Example

To retrieve the list of tax rates:

```ts
sdk.admin.taxRate.list()
.then(({ tax_rates, count, limit, offset }) => {
  console.log(tax_rates)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.taxRate.list({
  limit: 10,
  offset: 10
})
.then(({ tax_rates, count, limit, offset }) => {
  console.log(tax_rates)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each tax rate:

```ts
sdk.admin.taxRate.list({
  fields: "id,*tax_region"
})
.then(({ tax_rates, count, limit, offset }) => {
  console.log(tax_rates)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/admin#select-fields-and-relations).

### Parameters

- query: (\[AdminTaxRateListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRateListParams/page.mdx)) Filters and pagination configurations.

  - $and: ((\[AdminTaxRateListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRateListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminTaxRateListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRateListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[AdminTaxRateListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRateListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminTaxRateListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRateListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminTaxRateListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRateListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminTaxRateListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRateListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`) Query or keywords to search the tax rate's searchable fields.

    - tax\_region\_id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by tax region ID(s).

    - is\_default: (\`"true"\` \\| \`"false"\`) Filter by whether the tax rate is the default tax rate in its tax region.

    - service\_zone\_id: (\`string\`) Filter by service zone ID(s) to retrieve tax rates that are associated with the service zones.

    - shipping\_profile\_id: (\`string\`) Filter by shipping profile ID(s) to retrieve tax rates that are associated with the shipping profiles.

    - provider\_id: (\`string\`) Filter by tax provider ID(s) to retrieve tax rates that are associated with the providers.

    - shipping\_option\_type\_id: (\`string\`) Filter by shipping option type ID(s) to retrieve tax rates that are associated with the shipping option types.

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the tax rate was created.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the tax rate was updated.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the tax rate was deleted.

  - $or: ((\[AdminTaxRateListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRateListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminTaxRateListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRateListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[AdminTaxRateListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRateListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminTaxRateListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRateListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminTaxRateListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRateListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminTaxRateListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminTaxRateListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`) Query or keywords to search the tax rate's searchable fields.

    - tax\_region\_id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by tax region ID(s).

    - is\_default: (\`"true"\` \\| \`"false"\`) Filter by whether the tax rate is the default tax rate in its tax region.

    - service\_zone\_id: (\`string\`) Filter by service zone ID(s) to retrieve tax rates that are associated with the service zones.

    - shipping\_profile\_id: (\`string\`) Filter by shipping profile ID(s) to retrieve tax rates that are associated with the shipping profiles.

    - provider\_id: (\`string\`) Filter by tax provider ID(s) to retrieve tax rates that are associated with the providers.

    - shipping\_option\_type\_id: (\`string\`) Filter by shipping option type ID(s) to retrieve tax rates that are associated with the shipping option types.

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the tax rate was created.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the tax rate was updated.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the tax rate was deleted.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - q: (\`string\`) Query or keywords to search the tax rate's searchable fields.

  - tax\_region\_id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by tax region ID(s).

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

  - is\_default: (\`"true"\` \\| \`"false"\`) Filter by whether the tax rate is the default tax rate in its tax region.

  - service\_zone\_id: (\`string\`) Filter by service zone ID(s) to retrieve tax rates that are associated with the service zones.

  - shipping\_profile\_id: (\`string\`) Filter by shipping profile ID(s) to retrieve tax rates that are associated with the shipping profiles.

  - provider\_id: (\`string\`) Filter by tax provider ID(s) to retrieve tax rates that are associated with the providers.

  - shipping\_option\_type\_id: (\`string\`) Filter by shipping option type ID(s) to retrieve tax rates that are associated with the shipping option types.

  - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the tax rate was created.

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

  - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the tax rate was updated.

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

  - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the tax rate was deleted.

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

- Promise: (Promise\&#60;\[AdminTaxRateListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminTaxRateListResponse/page.mdx)\&#62;) The list of tax rates.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.
