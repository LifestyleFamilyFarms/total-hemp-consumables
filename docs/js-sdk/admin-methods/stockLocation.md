# stockLocation - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.stockLocation` set of methods used to send requests to Medusa's Admin API routes.

## create

This method creates a new stock location. It sends a request to the
[Create Stock Location](https://docs.medusajs.com/api/admin#stock-locations_poststocklocations)
API route.

### Example

```ts
sdk.admin.stockLocation.create({
  name: "Main Warehouse",
  address_id: "addr_123",
})
.then(({ stock_location }) => {
  console.log(stock_location)
})
```

### Parameters

- body: (\[AdminCreateStockLocation]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateStockLocation/page.mdx)) The details of the stock location to create.

  - name: (\`string\`) The name of the stock location.

  - address\_id: (\`string\`) The ID of the address to associate with the stock location.
    If you provide an \`address\`, you don't need to provide this property.

  - address: (\[AdminUpsertStockLocationAddress]\(../../../../../types/interfaces/types.AdminUpsertStockLocationAddress/page.mdx)) The address to create or update for the stock location.
    If you provide an \`address\_id\`, you don't need
    to provide this property.

    - address\_1: (\`string\`) The first line of the address.

    - country\_code: (\`string\`) The country code of the address.

    - address\_2: (\`string\`) The second line of the address.

    - company: (\`string\`) The company name associated with the address.

    - city: (\`string\`) The city of the address.

    - phone: (\`string\`) The phone number of the address.

    - postal\_code: (\`string\`) The postal or zip code of the address.

    - province: (\`string\`) The lower-case \[ISO 3166-2]\(https://en.wikipedia.org/wiki/ISO\\\_3166-2) province or state of the address.

  - metadata: (\`Record\<string, unknown>\`) Custom key-value pairs that can be added to the stock location.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the stock location.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminStockLocationResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocationResponse/page.mdx)\&#62;) The stock location's details.

  - stock\_location: (\[AdminStockLocation]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocation/page.mdx)) The stock location's details.

    - id: (\`string\`) The ID of the stock location.

    - name: (\`string\`) The name of the stock location.

    - address\_id: (\`string\`) The ID of the address associated with the stock location.

    - address: (\[AdminStockLocationAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocationAddress/page.mdx)) The address associated with the stock location.

    - sales\_channels: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)\[]) The sales channels associated with the stock location.

    - fulfillment\_providers: (\[AdminFulfillmentProvider]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentProvider/page.mdx)\[]) The fulfillment providers associated with the stock location.

    - fulfillment\_sets: (\[AdminFulfillmentSet]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentSet/page.mdx)\[]) The fulfillment sets associated with the stock location.

***

## update

This method updates a stock location. It sends a request to the
[Update Stock Location](https://docs.medusajs.com/api/admin#stock-locations_poststocklocationsid)
API route.

### Example

```ts
sdk.admin.stockLocation.update("sloc_123", {
  name: "European Warehouse",
})
.then(({ stock_location }) => {
  console.log(stock_location)
})
```

### Parameters

- id: (\`string\`) The ID of the stock location to update.
- body: (\[AdminUpdateStockLocation]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateStockLocation/page.mdx)) The details of the stock location to update.

  - name: (\`string\`) The name of the stock location.

  - address\_id: (\`string\`) The ID of the address to associate with the stock location.
    If you provide an \`address\`, you don't need to provide this property.

  - address: (\[AdminUpsertStockLocationAddress]\(../../../../../types/interfaces/types.AdminUpsertStockLocationAddress/page.mdx)) The address to create or update for the stock location.
    If you provide an \`address\_id\`, you don't need
    to provide this property.

    - address\_1: (\`string\`) The first line of the address.

    - country\_code: (\`string\`) The country code of the address.

    - address\_2: (\`string\`) The second line of the address.

    - company: (\`string\`) The company name associated with the address.

    - city: (\`string\`) The city of the address.

    - phone: (\`string\`) The phone number of the address.

    - postal\_code: (\`string\`) The postal or zip code of the address.

    - province: (\`string\`) The lower-case \[ISO 3166-2]\(https://en.wikipedia.org/wiki/ISO\\\_3166-2) province or state of the address.

  - metadata: (\`Record\<string, unknown>\`) Custom key-value pairs that can be added to the stock location.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the stock location.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminStockLocationResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocationResponse/page.mdx)\&#62;) The stock location's details.

  - stock\_location: (\[AdminStockLocation]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocation/page.mdx)) The stock location's details.

    - id: (\`string\`) The ID of the stock location.

    - name: (\`string\`) The name of the stock location.

    - address\_id: (\`string\`) The ID of the address associated with the stock location.

    - address: (\[AdminStockLocationAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocationAddress/page.mdx)) The address associated with the stock location.

    - sales\_channels: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)\[]) The sales channels associated with the stock location.

    - fulfillment\_providers: (\[AdminFulfillmentProvider]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentProvider/page.mdx)\[]) The fulfillment providers associated with the stock location.

    - fulfillment\_sets: (\[AdminFulfillmentSet]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentSet/page.mdx)\[]) The fulfillment sets associated with the stock location.

***

## delete

This method deletes a stock location. It sends a request to the
[Delete Stock Location](https://docs.medusajs.com/api/admin#stock-locations_deletestocklocationsid)
API route.

### Example

```ts
sdk.admin.stockLocation.delete("sloc_123")
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- id: (\`string\`) The ID of the stock location to delete.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminStockLocationDeleteResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocationDeleteResponse/page.mdx)\&#62;) The deletion's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (\`"stock\_location"\`) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.

***

## retrieve

This method retrieves a stock location. It sends a request to the
[Get Stock Location](https://docs.medusajs.com/api/admin#stock-locations_getstocklocationsid)
API route.

### Example

To retrieve a stock location by its ID:

```ts
sdk.admin.stockLocation.retrieve("sloc_123")
.then(({ stock_location }) => {
  console.log(stock_location)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.stockLocation.retrieve("sloc_123", {
  fields: "id,*sales_channels"
})
.then(({ stock_location }) => {
  console.log(stock_location)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/admin#select-fields-and-relations).

### Parameters

- id: (\`string\`) The ID of the stock location to retrieve.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the stock location.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminStockLocationResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocationResponse/page.mdx)\&#62;) The stock location's details.

  - stock\_location: (\[AdminStockLocation]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocation/page.mdx)) The stock location's details.

    - id: (\`string\`) The ID of the stock location.

    - name: (\`string\`) The name of the stock location.

    - address\_id: (\`string\`) The ID of the address associated with the stock location.

    - address: (\[AdminStockLocationAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocationAddress/page.mdx)) The address associated with the stock location.

    - sales\_channels: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)\[]) The sales channels associated with the stock location.

    - fulfillment\_providers: (\[AdminFulfillmentProvider]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentProvider/page.mdx)\[]) The fulfillment providers associated with the stock location.

    - fulfillment\_sets: (\[AdminFulfillmentSet]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentSet/page.mdx)\[]) The fulfillment sets associated with the stock location.

***

## list

This method retrieves a list of stock locations. It sends a request to the
[List Stock Locations](https://docs.medusajs.com/api/admin#stock-locations_getstocklocations)
API route.

### Example

To retrieve the list of stock locations:

```ts
sdk.admin.stockLocation.list()
.then(({ stock_locations, count, limit, offset }) => {
  console.log(stock_locations)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.stockLocation.list({
  limit: 10,
  offset: 10
})
.then(({ stock_locations, count, limit, offset }) => {
  console.log(stock_locations)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each stock location:

```ts
sdk.admin.stockLocation.list({
  fields: "id,*sales_channels"
})
.then(({ stock_locations, count, limit, offset }) => {
  console.log(stock_locations)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/admin#select-fields-and-relations).

### Parameters

- query: (\[AdminStockLocationListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocationListParams/page.mdx)) Filters and pagination configurations.

  - $and: ((\[AdminStockLocationListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocationListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminStockLocationListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocationListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[AdminStockLocationListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocationListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminStockLocationListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocationListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminStockLocationListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocationListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminStockLocationListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocationListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - id: (\`string\` \\| \`string\`\[]) Filter by stock location ID(s).

    - q: (\`string\`) Query or keywords to search the stock location's searchable fields.

    - name: (\`string\` \\| \`string\`\[]) Filter by stock location name.

    - address\_id: (\`string\` \\| \`string\`\[]) Filter by stock location address ID(s).

    - sales\_channel\_id: (\`string\` \\| \`string\`\[]) Filter by sales channel ID(s) to retrieve the stock locations for.

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the stock location was created.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the stock location was updated.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the stock location was deleted.

  - $or: ((\[AdminStockLocationListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocationListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminStockLocationListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocationListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[AdminStockLocationListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocationListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminStockLocationListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocationListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminStockLocationListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocationListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminStockLocationListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocationListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - id: (\`string\` \\| \`string\`\[]) Filter by stock location ID(s).

    - q: (\`string\`) Query or keywords to search the stock location's searchable fields.

    - name: (\`string\` \\| \`string\`\[]) Filter by stock location name.

    - address\_id: (\`string\` \\| \`string\`\[]) Filter by stock location address ID(s).

    - sales\_channel\_id: (\`string\` \\| \`string\`\[]) Filter by sales channel ID(s) to retrieve the stock locations for.

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the stock location was created.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the stock location was updated.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the stock location was deleted.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - id: (\`string\` \\| \`string\`\[]) Filter by stock location ID(s).

  - q: (\`string\`) Query or keywords to search the stock location's searchable fields.

  - name: (\`string\` \\| \`string\`\[]) Filter by stock location name.

  - address\_id: (\`string\` \\| \`string\`\[]) Filter by stock location address ID(s).

  - sales\_channel\_id: (\`string\` \\| \`string\`\[]) Filter by sales channel ID(s) to retrieve the stock locations for.

  - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the stock location was created.

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

  - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the stock location was updated.

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

  - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the stock location was deleted.

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

- Promise: (Promise\&#60;\[AdminStockLocationListResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocationListResponse/page.mdx)\&#62;) The list of stock locations.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - stock\_locations: (\[AdminStockLocation]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocation/page.mdx)\[]) The list of stock locations.

    - id: (\`string\`) The ID of the stock location.

    - name: (\`string\`) The name of the stock location.

    - address\_id: (\`string\`) The ID of the address associated with the stock location.

    - address: (\[AdminStockLocationAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocationAddress/page.mdx)) The address associated with the stock location.

    - sales\_channels: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)\[]) The sales channels associated with the stock location.

    - fulfillment\_providers: (\[AdminFulfillmentProvider]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentProvider/page.mdx)\[]) The fulfillment providers associated with the stock location.

    - fulfillment\_sets: (\[AdminFulfillmentSet]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentSet/page.mdx)\[]) The fulfillment sets associated with the stock location.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## updateSalesChannels

This method manages the sales channels of a stock location by adding or removing them. It sends a request to the
[Manage Stock Location Sales Channels](https://docs.medusajs.com/api/admin#stock-locations_poststocklocationsidsaleschannels)
API route.

### Example

```ts
sdk.admin.stockLocation.updateSalesChannels("sloc_123", {
  add: ["sc_123"],
  remove: ["sc_456"],
})
.then(({ stock_location }) => {
  console.log(stock_location)
})
```

### Parameters

- id: (\`string\`) The ID of the stock location to update the sales channels for.
- body: (\[AdminUpdateStockLocationSalesChannels]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateStockLocationSalesChannels/page.mdx)) The details of the sales channels to update.

  - add: (\`string\`\[]) The IDs of the sales channels to add to the stock location.

  - remove: (\`string\`\[]) The IDs of the sales channels to remove from the stock location.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminStockLocationResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocationResponse/page.mdx)\&#62;) The stock location's details.

  - stock\_location: (\[AdminStockLocation]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocation/page.mdx)) The stock location's details.

    - id: (\`string\`) The ID of the stock location.

    - name: (\`string\`) The name of the stock location.

    - address\_id: (\`string\`) The ID of the address associated with the stock location.

    - address: (\[AdminStockLocationAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocationAddress/page.mdx)) The address associated with the stock location.

    - sales\_channels: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)\[]) The sales channels associated with the stock location.

    - fulfillment\_providers: (\[AdminFulfillmentProvider]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentProvider/page.mdx)\[]) The fulfillment providers associated with the stock location.

    - fulfillment\_sets: (\[AdminFulfillmentSet]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentSet/page.mdx)\[]) The fulfillment sets associated with the stock location.

***

## createFulfillmentSet

This method adds a new fulfillment set to a stock location. It sends a request to the
[Add Fulfillment Set to Stock Location](https://docs.medusajs.com/api/admin#stock-locations_poststocklocationsidfulfillmentsets)
API route.

### Example

```ts
sdk.admin.stockLocation.createFulfillmentSet("sloc_123", {
  name: "Shipping",
  type: "shipping",
})
.then(({ stock_location }) => {
  console.log(stock_location)
})
```

### Parameters

- id: (\`string\`) The ID of the stock location to add the fulfillment set to.
- body: (\[AdminCreateStockLocationFulfillmentSet]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateStockLocationFulfillmentSet/page.mdx)) The details of the fulfillment set to add.

  - name: (\`string\`) The name of the fulfillment set.

  - type: (\`string\`) The type of the fulfillment set.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminStockLocationResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocationResponse/page.mdx)\&#62;) The stock location's details.

  - stock\_location: (\[AdminStockLocation]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocation/page.mdx)) The stock location's details.

    - id: (\`string\`) The ID of the stock location.

    - name: (\`string\`) The name of the stock location.

    - address\_id: (\`string\`) The ID of the address associated with the stock location.

    - address: (\[AdminStockLocationAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocationAddress/page.mdx)) The address associated with the stock location.

    - sales\_channels: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)\[]) The sales channels associated with the stock location.

    - fulfillment\_providers: (\[AdminFulfillmentProvider]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentProvider/page.mdx)\[]) The fulfillment providers associated with the stock location.

    - fulfillment\_sets: (\[AdminFulfillmentSet]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentSet/page.mdx)\[]) The fulfillment sets associated with the stock location.

***

## updateFulfillmentProviders

This method manages the fulfillment providers of a stock location by adding or removing them. It sends a request to the
[Manage Fulfillment Providers of Stock Location](https://docs.medusajs.com/api/admin#stock-locations_poststocklocationsidfulfillmentproviders)
API route.

### Example

```ts
sdk.admin.stockLocation.updateFulfillmentProviders("sloc_123", {
  add: ["fp_manual_manual"],
  remove: ["fp_shipstation_shipstation"],
})
.then(({ stock_location }) => {
  console.log(stock_location)
})
```

### Parameters

- id: (\`string\`) The ID of the stock location to manage the fulfillment providers for.
- body: (\[AdminBatchLink]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminBatchLink/page.mdx)) The details of the fulfillment providers to manage.

  - add: (\`string\`\[]) The IDs of the items to create an association to.

  - remove: (\`string\`\[]) The IDs of the items to remove the association from.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminStockLocationResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocationResponse/page.mdx)\&#62;) The stock location's details.

  - stock\_location: (\[AdminStockLocation]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocation/page.mdx)) The stock location's details.

    - id: (\`string\`) The ID of the stock location.

    - name: (\`string\`) The name of the stock location.

    - address\_id: (\`string\`) The ID of the address associated with the stock location.

    - address: (\[AdminStockLocationAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocationAddress/page.mdx)) The address associated with the stock location.

    - sales\_channels: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)\[]) The sales channels associated with the stock location.

    - fulfillment\_providers: (\[AdminFulfillmentProvider]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentProvider/page.mdx)\[]) The fulfillment providers associated with the stock location.

    - fulfillment\_sets: (\[AdminFulfillmentSet]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentSet/page.mdx)\[]) The fulfillment sets associated with the stock location.
