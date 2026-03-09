# priceList - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.priceList` set of methods used to send requests to Medusa's Admin API routes.

## retrieve

This method retrieves a price list. It sends a request to the
[Get Price List](https://docs.medusajs.com/v2/api/admin#price-lists_getpricelistsid)
API route.

### Example

To retrieve a price list by its ID:

```ts
sdk.admin.priceList.retrieve("plist_123")
.then(({ price_list }) => {
  console.log(price_list)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.priceList.retrieve("plist_123", {
  fields: "id,*prices"
})
.then(({ price_list }) => {
  console.log(price_list)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/v2/api/store#select-fields-and-relations).

### Parameters

- id: (\`string\`) The price list's ID.
- query: (\[AdminPriceListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceListParams/page.mdx)) Configure the fields to retrieve in the price list.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminPriceListResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceListResponse/page.mdx)\&#62;) The price list's details.

  - price\_list: (\[AdminPriceList]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceList/page.mdx)) The price list's details.

    - id: (\`string\`) The price list's ID.

    - title: (\`string\`) The price list's title.

    - description: (\`string\`) The price list's description.

    - rules: (\`Record\<string, any>\`) The price list's rules.

    - starts\_at: (\`null\` \\| \`string\`) The price list's start date.

    - ends\_at: (\`null\` \\| \`string\`) The price list's end date.

    - status: (\[PriceListStatus]\(../../../../../pricing/types/pricing.PriceListStatus/page.mdx)) The price list's status.

    - type: (\[PriceListType]\(../../../../../pricing/types/pricing.PriceListType/page.mdx)) The price list's type.

    - prices: (\[AdminPriceListPrice]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceListPrice/page.mdx)\[]) The price list's prices.

    - created\_at: (\`string\`) The date the price list was created.

    - updated\_at: (\`string\`) The date the price list was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the price list was deleted.

***

## list

This method retrieves a paginated list of price lists. It sends a request to the
[List Price Lists](https://docs.medusajs.com/v2/api/admin#price-lists_getpricelists) API route.

### Example

To retrieve the list of price lists:

```ts
sdk.admin.priceList.list()
.then(({ price_lists, count, limit, offset }) => {
  console.log(price_lists)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.priceList.list({
  limit: 10,
  offset: 10
})
.then(({ price_lists, count, limit, offset }) => {
  console.log(price_lists)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each price list:

```ts
sdk.admin.priceList.list({
  fields: "id,*prices"
})
.then(({ price_lists, count, limit, offset }) => {
  console.log(price_lists)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/v2/api/store#select-fields-and-relations).

### Parameters

- query: (\[AdminPriceListListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceListListParams/page.mdx)) Filters and pagination configurations.

  - $and: ((\[AdminPriceListListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceListListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminPriceListListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceListListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[AdminPriceListListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceListListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminPriceListListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceListListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminPriceListListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceListListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminPriceListListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceListListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`) Query or keyword to filter the price list's searchable fields.

    - id: (\`string\` \\| \`string\`\[]) Filter by price list ID(s).

    - starts\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the price list's start date.

    - ends\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the price list's end date.

    - status: (\[PriceListStatus]\(../../../../../pricing/types/pricing.PriceListStatus/page.mdx)\[]) Filter by statuses.

    - rules\_count: (\`number\`\[]) Filter by the number of rules.

  - $or: ((\[AdminPriceListListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceListListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminPriceListListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceListListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[AdminPriceListListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceListListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminPriceListListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceListListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminPriceListListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceListListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminPriceListListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceListListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`) Query or keyword to filter the price list's searchable fields.

    - id: (\`string\` \\| \`string\`\[]) Filter by price list ID(s).

    - starts\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the price list's start date.

    - ends\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the price list's end date.

    - status: (\[PriceListStatus]\(../../../../../pricing/types/pricing.PriceListStatus/page.mdx)\[]) Filter by statuses.

    - rules\_count: (\`number\`\[]) Filter by the number of rules.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - q: (\`string\`) Query or keyword to filter the price list's searchable fields.

  - id: (\`string\` \\| \`string\`\[]) Filter by price list ID(s).

  - starts\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the price list's start date.

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

  - ends\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the price list's end date.

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

  - status: (\[PriceListStatus]\(../../../../../pricing/types/pricing.PriceListStatus/page.mdx)\[]) Filter by statuses.

  - rules\_count: (\`number\`\[]) Filter by the number of rules.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminPriceListListResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceListListResponse/page.mdx)\&#62;) The paginated list of price lists.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - price\_lists: (\[AdminPriceList]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceList/page.mdx)\[]) The list of price lists.

    - id: (\`string\`) The price list's ID.

    - title: (\`string\`) The price list's title.

    - description: (\`string\`) The price list's description.

    - rules: (\`Record\<string, any>\`) The price list's rules.

    - starts\_at: (\`null\` \\| \`string\`) The price list's start date.

    - ends\_at: (\`null\` \\| \`string\`) The price list's end date.

    - status: (\[PriceListStatus]\(../../../../../pricing/types/pricing.PriceListStatus/page.mdx)) The price list's status.

    - type: (\[PriceListType]\(../../../../../pricing/types/pricing.PriceListType/page.mdx)) The price list's type.

    - prices: (\[AdminPriceListPrice]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceListPrice/page.mdx)\[]) The price list's prices.

    - created\_at: (\`string\`) The date the price list was created.

    - updated\_at: (\`string\`) The date the price list was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the price list was deleted.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## create

This method creates a price list. It sends a request to the
[Create Price List](https://docs.medusajs.com/v2/api/admin#price-lists_postpricelists)
API route.

### Example

```ts
sdk.admin.priceList.create({
  title: "My Price List",
  status: "active",
  type: "sale",
  prices: [
    {
      variant_id: "variant_123",
      amount: 10,
      currency_code: "usd",
      rules: {
        region_id: "reg_123"
      }
    }
  ]
})
.then(({ price_list }) => {
  console.log(price_list)
})
```

### Parameters

- body: (\[AdminCreatePriceList]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreatePriceList/page.mdx)) The details of the price list to create.

  - title: (\`string\`) The price list's title.

  - description: (\`string\`) The price list's description.

  - starts\_at: (\`null\` \\| \`string\`) The price list's start date.

  - ends\_at: (\`null\` \\| \`string\`) The price list's end date.

  - status: (\[PriceListStatus]\(../../../../../pricing/types/pricing.PriceListStatus/page.mdx)) The price list's status.

  - type: (\[PriceListType]\(../../../../../pricing/types/pricing.PriceListType/page.mdx)) The price list's type.

  - rules: (\`Record\<string, string\[]>\`) The price list's rules.

  - prices: (\[AdminCreatePriceListPrice]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreatePriceListPrice/page.mdx)\[]) The price list's prices.

    - currency\_code: (\`string\`) The price's currency code.

    - amount: (\`number\`) The price's amount.

    - variant\_id: (\`string\`) The ID of the variant this price applies to.

    - min\_quantity: (\`null\` \\| \`number\`) The minimum quantity that must be available in the cart for the price to be applied.

    - max\_quantity: (\`null\` \\| \`number\`) The maximum quantity allowed to be available in the cart for the price to be applied.

    - rules: (\`Record\<string, string>\`) The price's rules.
- query: (\[AdminPriceListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceListParams/page.mdx)) Configure the fields to retrieve in the price list.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminPriceListResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceListResponse/page.mdx)\&#62;) The price list's details.

  - price\_list: (\[AdminPriceList]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceList/page.mdx)) The price list's details.

    - id: (\`string\`) The price list's ID.

    - title: (\`string\`) The price list's title.

    - description: (\`string\`) The price list's description.

    - rules: (\`Record\<string, any>\`) The price list's rules.

    - starts\_at: (\`null\` \\| \`string\`) The price list's start date.

    - ends\_at: (\`null\` \\| \`string\`) The price list's end date.

    - status: (\[PriceListStatus]\(../../../../../pricing/types/pricing.PriceListStatus/page.mdx)) The price list's status.

    - type: (\[PriceListType]\(../../../../../pricing/types/pricing.PriceListType/page.mdx)) The price list's type.

    - prices: (\[AdminPriceListPrice]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceListPrice/page.mdx)\[]) The price list's prices.

    - created\_at: (\`string\`) The date the price list was created.

    - updated\_at: (\`string\`) The date the price list was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the price list was deleted.

***

## update

This method updates a price list. It sends a request to the
[Update Price List](https://docs.medusajs.com/v2/api/admin#price-lists_postpricelistsid)
API route.

### Example

```ts
sdk.admin.priceList.update("plist_123", {
  title: "My Price List",
})
.then(({ price_list }) => {
  console.log(price_list)
})
```

### Parameters

- id: (\`string\`) The price list's ID.
- body: (\[AdminUpdatePriceList]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdatePriceList/page.mdx)) The data to update in the price list.

  - title: (\`string\`) The price list's title.

  - description: (\`string\`) The price list's description.

  - starts\_at: (\`null\` \\| \`string\`) The price list's start date.

  - ends\_at: (\`null\` \\| \`string\`) The price list's end date.

  - status: (\[PriceListStatus]\(../../../../../pricing/types/pricing.PriceListStatus/page.mdx)) The price list's status.

  - type: (\[PriceListType]\(../../../../../pricing/types/pricing.PriceListType/page.mdx)) The price list's type.

  - rules: (\`Record\<string, string\[]>\`) The price list's rules.
- query: (\[AdminPriceListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceListParams/page.mdx)) Configure the fields to retrieve in the price list.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminPriceListResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceListResponse/page.mdx)\&#62;) The price list's details.

  - price\_list: (\[AdminPriceList]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceList/page.mdx)) The price list's details.

    - id: (\`string\`) The price list's ID.

    - title: (\`string\`) The price list's title.

    - description: (\`string\`) The price list's description.

    - rules: (\`Record\<string, any>\`) The price list's rules.

    - starts\_at: (\`null\` \\| \`string\`) The price list's start date.

    - ends\_at: (\`null\` \\| \`string\`) The price list's end date.

    - status: (\[PriceListStatus]\(../../../../../pricing/types/pricing.PriceListStatus/page.mdx)) The price list's status.

    - type: (\[PriceListType]\(../../../../../pricing/types/pricing.PriceListType/page.mdx)) The price list's type.

    - prices: (\[AdminPriceListPrice]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceListPrice/page.mdx)\[]) The price list's prices.

    - created\_at: (\`string\`) The date the price list was created.

    - updated\_at: (\`string\`) The date the price list was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the price list was deleted.

***

## delete

This method deletes a price list. It sends a request to the
[Delete Price List](https://docs.medusajs.com/v2/api/admin#price-lists_deletepricelistsid)
API route.

### Example

```ts
sdk.admin.priceList.delete("plist_123")
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- id: (\`string\`) The price list's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminPriceListDeleteResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceListDeleteResponse/page.mdx)\&#62;) The deletion's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (\`"price\_list"\`) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.

***

## batchPrices

This method manages the prices of a price list to create, update, or delete them.
It sends a request to the [Manage Prices](https://docs.medusajs.com/v2/api/admin#price-lists_postpricelistsidpricesbatch)
API route.

### Example

```ts
sdk.admin.priceList.batchPrices("plist_123", {
  create: [{
    variant_id: "variant_123",
    currency_code: "usd",
    amount: 10,
    rules: {
      region_id: "reg_123"
    }
  }],
  update: [{
    id: "price_123",
    variant_id: "variant_123",
    amount: 20,
  }],
  delete: ["price_123"]
})
.then(({ created, updated, deleted }) => {
  console.log(created, updated, deleted)
})
```

### Parameters

- id: (\`string\`) The price list's ID.
- body: (\[AdminBatchPriceListPrice]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminBatchPriceListPrice/page.mdx)) The prices to create, update, or delete.

  - create: (\[AdminCreatePriceListPrice]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreatePriceListPrice/page.mdx)\[]) The prices to create and add to the price list.

    - currency\_code: (\`string\`) The price's currency code.

    - amount: (\`number\`) The price's amount.

    - variant\_id: (\`string\`) The ID of the variant this price applies to.

    - min\_quantity: (\`null\` \\| \`number\`) The minimum quantity that must be available in the cart for the price to be applied.

    - max\_quantity: (\`null\` \\| \`number\`) The maximum quantity allowed to be available in the cart for the price to be applied.

    - rules: (\`Record\<string, string>\`) The price's rules.

  - update: (\[AdminUpdatePriceListPrice]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdatePriceListPrice/page.mdx)\[]) The prices to update in the price list.

    - id: (\`string\`) The ID of the price to update.

    - variant\_id: (\`string\`) The ID of the variant this price applies to.

    - currency\_code: (\`string\`) The price's currency code.

    - amount: (\`number\`) The price's amount.

    - min\_quantity: (\`null\` \\| \`number\`) The minimum quantity that must be available in the cart for the price to be applied.

    - max\_quantity: (\`null\` \\| \`number\`) The maximum quantity allowed to be available in the cart for the price to be applied.

    - rules: (\`Record\<string, string>\`) The price's rules.

  - delete: (\`string\`\[]) The prices to delete from the price list.
- query: (\[AdminPriceListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceListParams/page.mdx)) Configure the fields to retrieve in the price list.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminPriceListBatchResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceListBatchResponse/page.mdx)\&#62;) The price list's details.

  - created: (\[AdminPrice]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPrice/page.mdx)\[]) The created prices.

    - id: (\`string\`) The price's ID.

    - title: (\`string\`) The price's title.

    - currency\_code: (\`string\`) The price's currency code.

    - amount: (\`number\`) The price's amount.

    - raw\_amount: (\`Record\<string, unknown>\`) The price's raw amount.

    - min\_quantity: (\`null\` \\| \`number\`) The minimum quantity that must be available in the cart for the price to be applied.

    - max\_quantity: (\`null\` \\| \`number\`) The maximum quantity allowed to be available in the cart for the price to be applied.

    - price\_set\_id: (\`string\`) The ID of the price set this price belongs to.

    - created\_at: (\`string\`) The date the price was created.

    - updated\_at: (\`string\`) The date the price was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the price was deleted.

  - updated: (\[AdminPrice]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPrice/page.mdx)\[]) The updated prices.

    - id: (\`string\`) The price's ID.

    - title: (\`string\`) The price's title.

    - currency\_code: (\`string\`) The price's currency code.

    - amount: (\`number\`) The price's amount.

    - raw\_amount: (\`Record\<string, unknown>\`) The price's raw amount.

    - min\_quantity: (\`null\` \\| \`number\`) The minimum quantity that must be available in the cart for the price to be applied.

    - max\_quantity: (\`null\` \\| \`number\`) The maximum quantity allowed to be available in the cart for the price to be applied.

    - price\_set\_id: (\`string\`) The ID of the price set this price belongs to.

    - created\_at: (\`string\`) The date the price was created.

    - updated\_at: (\`string\`) The date the price was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the price was deleted.

  - deleted: (\`object\`) Details about the deleted prices.

    - ids: (\`string\`\[])

    - object: (\`"price"\`)

    - deleted: (\`boolean\`)

***

## linkProducts

This method removes products from a price list. It sends a request to the
[Remove Product](https://docs.medusajs.com/v2/api/admin#price-lists_postpricelistsidproducts)
API route.

### Example

```ts
sdk.admin.priceList.linkProducts("plist_123", {
  remove: ["prod_123"]
})
.then(({ price_list }) => {
  console.log(price_list)
})
```

### Parameters

- id: (\`string\`) The price list's ID.
- body: (\[AdminLinkPriceListProducts]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminLinkPriceListProducts/page.mdx)) The details of the products to remove.

  - remove: (\`string\`\[]) The IDs of products to remove from the price list.
- query: (\[AdminPriceListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceListParams/page.mdx)) Configure the fields to retrieve in the price list.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminPriceListResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceListResponse/page.mdx)\&#62;) The price list's details.

  - price\_list: (\[AdminPriceList]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceList/page.mdx)) The price list's details.

    - id: (\`string\`) The price list's ID.

    - title: (\`string\`) The price list's title.

    - description: (\`string\`) The price list's description.

    - rules: (\`Record\<string, any>\`) The price list's rules.

    - starts\_at: (\`null\` \\| \`string\`) The price list's start date.

    - ends\_at: (\`null\` \\| \`string\`) The price list's end date.

    - status: (\[PriceListStatus]\(../../../../../pricing/types/pricing.PriceListStatus/page.mdx)) The price list's status.

    - type: (\[PriceListType]\(../../../../../pricing/types/pricing.PriceListType/page.mdx)) The price list's type.

    - prices: (\[AdminPriceListPrice]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPriceListPrice/page.mdx)\[]) The price list's prices.

    - created\_at: (\`string\`) The date the price list was created.

    - updated\_at: (\`string\`) The date the price list was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the price list was deleted.
