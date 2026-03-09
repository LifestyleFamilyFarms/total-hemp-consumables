# region - JS SDK Store Reference

This documentation provides a reference to the `sdk.store.region` set of methods used to send requests to Medusa's Store API routes.

## list

This method retrieves the paginated list of regions in the store. It sends a request to the
[List Regions API route](https://docs.medusajs.com/api/store#regions_getregions).

Related guide: [How to list regions in a storefront](https://docs.medusajs.com/resources/storefront-development/regions/list).

### Example

To retrieve the list of regions:

```ts
sdk.store.region.list()
.then(({ regions, count, limit, offset }) => {
  console.log(regions)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.store.region.list({
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
sdk.store.region.list({
  fields: "id,*countries"
})
.then(({ regions, count, limit, offset }) => {
  console.log(regions)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- query: (\[FindParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.FindParams/page.mdx) & \[StoreRegionFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreRegionFilters/page.mdx)) Filters and pagination configurations.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - $and: ((\[BaseRegionFilters]\(../../../../../types/interfaces/types.BaseRegionFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseRegionFilters]\(../../../../../types/interfaces/types.BaseRegionFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[BaseRegionFilters]\(../../../../../types/interfaces/types.BaseRegionFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseRegionFilters]\(../../../../../types/interfaces/types.BaseRegionFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[BaseRegionFilters]\(../../../../../types/interfaces/types.BaseRegionFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseRegionFilters]\(../../../../../types/interfaces/types.BaseRegionFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - q: (\`string\`) A query or keywords to search a region's searchable fields by.

    - id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by region ID(s).

    - name: (\`string\` \\| \`string\`\[]) Filter by region name(s).

    - currency\_code: (\`string\` \\| \`string\`\[]) Filter by currency code(s).

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the region's creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the region's update date.

  - $or: ((\[BaseRegionFilters]\(../../../../../types/interfaces/types.BaseRegionFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseRegionFilters]\(../../../../../types/interfaces/types.BaseRegionFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[BaseRegionFilters]\(../../../../../types/interfaces/types.BaseRegionFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseRegionFilters]\(../../../../../types/interfaces/types.BaseRegionFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[BaseRegionFilters]\(../../../../../types/interfaces/types.BaseRegionFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseRegionFilters]\(../../../../../types/interfaces/types.BaseRegionFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - q: (\`string\`) A query or keywords to search a region's searchable fields by.

    - id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by region ID(s).

    - name: (\`string\` \\| \`string\`\[]) Filter by region name(s).

    - currency\_code: (\`string\` \\| \`string\`\[]) Filter by currency code(s).

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the region's creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the region's update date.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - q: (\`string\`) A query or keywords to search a region's searchable fields by.

  - id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by region ID(s).

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

  - name: (\`string\` \\| \`string\`\[]) Filter by region name(s).

  - currency\_code: (\`string\` \\| \`string\`\[]) Filter by currency code(s).
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreRegionListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.StoreRegionListResponse/page.mdx)\&#62;) The paginated list of regions.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## retrieve

This method retrieves a region by its ID. It sends a request to the [Get Region](https://docs.medusajs.com/api/store#regions_getregionsid)
API route.

Related guide: [Store and retrieve regions in a storefront](https://docs.medusajs.com/resources/storefront-development/regions/store-retrieve-region).

### Example

To retrieve a region by its ID:

```ts
sdk.store.region.retrieve("reg_123")
.then(({ region }) => {
  console.log(region)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.store.region.retrieve(
  "reg_123",
  {
    fields: "id,*countries"
  }
)
.then(({ region }) => {
  console.log(region)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- id: (\`string\`) The region's ID.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the region.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreRegionResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.StoreRegionResponse/page.mdx)\&#62;) The region.

  - region: (\[StoreRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreRegion/page.mdx)) The region's details.

    - id: (\`string\`) The region's ID.

    - name: (\`string\`) The region's name.

    - currency\_code: (\`string\`) The region's currency code.

    - automatic\_taxes: (\`boolean\`) Whether taxes are calculated automatically in the region.

    - countries: (\[BaseRegionCountry]\(../../../../../types/interfaces/types.BaseRegionCountry/page.mdx)\[]) The countries that belong to the region.

    - payment\_providers: (\[AdminPaymentProvider]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentProvider/page.mdx)\[]) The payment providers enabled in the region.

    - metadata: (\`null\` \\| \`Record\<string, any>\`) Key-value pairs of custom data.

    - created\_at: (\`string\`) The date the region was created.

    - updated\_at: (\`string\`) The date the region was updated.
