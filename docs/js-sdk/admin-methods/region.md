# region - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.region` set of methods used to send requests to Medusa's Admin API routes.

## create

This method creates a new region. It sends a request to the
[Create Region](https://docs.medusajs.com/api/admin#regions_postregions)
API route.

### Example

```ts
sdk.admin.region.create({
  name: "United States",
  currency_code: "usd",
})
.then(({ region }) => {
  console.log(region)
})
```

### Parameters

- body: (\[AdminCreateRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateRegion/page.mdx)) The details of the region to create.

  - name: (\`string\`) The name of the region.

  - currency\_code: (\`string\`) The currency code of the region.

  - countries: (\`string\`\[]) The 2 ISO code of the countries in the region.

  - automatic\_taxes: (\`boolean\`) Whether taxes are automatically calculated during checkout
    for this region.

  - is\_tax\_inclusive: (\`boolean\`) Whether prices in this region include taxes by default.

    Learn more in the \[tax-inclusive pricing]\(https://docs.medusajs.com/resources/commerce-modules/pricing/tax-inclusive-pricing#content) documentation.

  - payment\_providers: (\`string\`\[]) The IDs of the payment providers that are available in this region. The IDs are&#x20;
    of the format \`pp\_\{identifier}\_\{id}\`.

  - metadata: (\`null\` \\| \`Record\<string, any>\`) Custom key-value pairs that can be added to the region.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the region.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminRegionResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegionResponse/page.mdx)\&#62;) The created region's details.

  - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The region's details.

    - id: (\`string\`) The region's ID.

    - name: (\`string\`) The region's name.

    - currency\_code: (\`string\`) The region's currency code.

    - countries: (\[AdminRegionCountry]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegionCountry/page.mdx)\[]) The countries in the region.

    - automatic\_taxes: (\`boolean\`) Whether taxes are calculated automatically in the region.

    - payment\_providers: (\[AdminPaymentProvider]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentProvider/page.mdx)\[]) The payment providers enabled in the region.

    - metadata: (\`null\` \\| \`Record\<string, any>\`) Key-value pairs of custom data.

    - created\_at: (\`string\`) The date the region was created.

    - updated\_at: (\`string\`) The date the region was updated.

***

## update

This method updates a region. It sends a request to the
[Update Region](https://docs.medusajs.com/api/admin#regions_postregionsid)
API route.

### Example

```ts
sdk.admin.region.update("region_123", {
  name: "United States",
})
.then(({ region }) => {
  console.log(region)
})
```

### Parameters

- id: (\`string\`) The ID of the region to update.
- body: (\[AdminUpdateRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateRegion/page.mdx)) The details of the region to update.

  - name: (\`string\`) The name of the region.

  - currency\_code: (\`string\`) The currency code of the region.

  - countries: (\`string\`\[]) The 2 ISO code of the countries in the region.

  - automatic\_taxes: (\`boolean\`) Whether taxes are automatically calculated during checkout
    for this region.

  - is\_tax\_inclusive: (\`boolean\`) Whether prices in this region include taxes by default.

    Learn more in the \[tax-inclusive pricing]\(https://docs.medusajs.com/resources/commerce-modules/pricing/tax-inclusive-pricing#content) documentation.

  - payment\_providers: (\`string\`\[]) The IDs of the payment providers that are available in this region. The IDs are&#x20;
    of the format \`pp\_\{identifier}\_\{id}\`.

  - metadata: (\`null\` \\| \`Record\<string, any>\`) Custom key-value pairs that can be added to the region.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the region.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminRegionResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegionResponse/page.mdx)\&#62;) The updated region's details.

  - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The region's details.

    - id: (\`string\`) The region's ID.

    - name: (\`string\`) The region's name.

    - currency\_code: (\`string\`) The region's currency code.

    - countries: (\[AdminRegionCountry]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegionCountry/page.mdx)\[]) The countries in the region.

    - automatic\_taxes: (\`boolean\`) Whether taxes are calculated automatically in the region.

    - payment\_providers: (\[AdminPaymentProvider]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentProvider/page.mdx)\[]) The payment providers enabled in the region.

    - metadata: (\`null\` \\| \`Record\<string, any>\`) Key-value pairs of custom data.

    - created\_at: (\`string\`) The date the region was created.

    - updated\_at: (\`string\`) The date the region was updated.

***

## list

This method retrieves a list of regions. It sends a request to the
[List Regions](https://docs.medusajs.com/api/admin#regions_getregions)
API route.

### Example

To retrieve the list of regions:

```ts
sdk.admin.region.list()
.then(({ regions, count, limit, offset }) => {
  console.log(regions)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.region.list({
  limit: 10,
  offset: 10
})
.then(({ regions, count, limit, offset }) => {
  console.log(regions)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each region:

```ts
sdk.admin.region.list({
  fields: "id,*countries"
})
.then(({ regions, count, limit, offset }) => {
  console.log(regions)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/admin#select-fields-and-relations).

### Parameters

- queryParams: (\[FindParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.FindParams/page.mdx) & \[AdminRegionFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegionFilters/page.mdx)) Filters and pagination configurations.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - $and: ((\[AdminRegionFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegionFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminRegionFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegionFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[AdminRegionFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegionFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminRegionFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegionFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminRegionFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegionFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminRegionFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegionFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`) Query or keywords to search the region's searchable fields.

    - id: (\`string\` \\| \`string\`\[]) Filter by region ID(s).

    - currency\_code: (\`string\` \\| \`string\`\[]) Filter by currency code(s).

    - name: (\`string\` \\| \`string\`\[]) Filter by region name(s).

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the region's creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the region's update date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the region's deletion date.

  - $or: ((\[AdminRegionFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegionFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminRegionFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegionFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[AdminRegionFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegionFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminRegionFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegionFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminRegionFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegionFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminRegionFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegionFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`) Query or keywords to search the region's searchable fields.

    - id: (\`string\` \\| \`string\`\[]) Filter by region ID(s).

    - currency\_code: (\`string\` \\| \`string\`\[]) Filter by currency code(s).

    - name: (\`string\` \\| \`string\`\[]) Filter by region name(s).

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the region's creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the region's update date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the region's deletion date.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - q: (\`string\`) Query or keywords to search the region's searchable fields.

  - id: (\`string\` \\| \`string\`\[]) Filter by region ID(s).

  - currency\_code: (\`string\` \\| \`string\`\[]) Filter by currency code(s).

  - name: (\`string\` \\| \`string\`\[]) Filter by region name(s).

  - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the region's creation date.

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

  - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the region's update date.

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

  - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the region's deletion date.

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

- Promise: (Promise\&#60;\[AdminRegionListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminRegionListResponse/page.mdx)\&#62;) The paginated list of regions.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## retrieve

This method retrieves a region by ID. It sends a request to the
[Get Region](https://docs.medusajs.com/api/admin#regions_getregionsid)
API route.

### Example

To retrieve a region by its ID:

```ts
sdk.admin.region.retrieve("region_123")
.then(({ region }) => {
  console.log(region)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.region.retrieve("region_123", {
  fields: "id,*countries"
})
.then(({ region }) => {
  console.log(region)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/admin#select-fields-and-relations).

### Parameters

- id: (\`string\`) The ID of the region to retrieve.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the region.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminRegionResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegionResponse/page.mdx)\&#62;) The region's details.

  - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The region's details.

    - id: (\`string\`) The region's ID.

    - name: (\`string\`) The region's name.

    - currency\_code: (\`string\`) The region's currency code.

    - countries: (\[AdminRegionCountry]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegionCountry/page.mdx)\[]) The countries in the region.

    - automatic\_taxes: (\`boolean\`) Whether taxes are calculated automatically in the region.

    - payment\_providers: (\[AdminPaymentProvider]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentProvider/page.mdx)\[]) The payment providers enabled in the region.

    - metadata: (\`null\` \\| \`Record\<string, any>\`) Key-value pairs of custom data.

    - created\_at: (\`string\`) The date the region was created.

    - updated\_at: (\`string\`) The date the region was updated.

***

## delete

This method deletes a region by ID. It sends a request to the
[Delete Region](https://docs.medusajs.com/api/admin#regions_deleteregionsid)
API route.

### Example

```ts
sdk.admin.region.delete("region_123")
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- id: (\`string\`) The ID of the region to delete.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminRegionDeleteResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminRegionDeleteResponse/page.mdx)\&#62;) The deletion's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (TObject) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.
