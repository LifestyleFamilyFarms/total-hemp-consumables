# salesChannel - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.salesChannel` set of methods used to send requests to Medusa's Admin API routes.

## create

This method creates a new sales channel. It sends a request to the
[Create Sales Channel](https://docs.medusajs.com/api/admin#sales-channels_postsaleschannels)
API route.

### Example

```ts
sdk.admin.salesChannel.create({
  name: "Storefront",
})
.then(({ salesChannel }) => {
  console.log(salesChannel)
})
```

### Parameters

- body: (\[AdminCreateSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateSalesChannel/page.mdx)) The details of the sales channel to create.

  - name: (\`string\`) The sales channel's name.

  - description: (\`string\`) The sales channel's description.

  - is\_disabled: (\`boolean\`) Whether the sales channel is disabled.

  - metadata: (\`Record\<string, unknown>\`) Custom key-value pairs that can be added to the sales channel.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the sales channel.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminSalesChannelResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannelResponse/page.mdx)\&#62;) The sales channel's details.

  - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The sales channel's details.

    - id: (\`string\`) The sales channel's ID.

    - name: (\`string\`) The sales channel's name.

    - description: (\`null\` \\| \`string\`) The sales channel's description.

    - is\_disabled: (\`boolean\`) Whether the sales channel is disabled.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Custom key-value pairs that can be added to the sales channel.

    - created\_at: (\`string\`) The sales channel's creation date.

    - updated\_at: (\`string\`) The sales channel's last updated date.

    - deleted\_at: (\`null\` \\| \`string\`) The sales channel's deletion date.

***

## update

This method updates a sales channel. It sends a request to the
[Update Sales Channel](https://docs.medusajs.com/api/admin#sales-channels_postsaleschannelsid)
API route.

### Example

```ts
sdk.admin.salesChannel.update(
  "sc_123",
  {
    name: "Storefront",
  }
)
.then(({ salesChannel }) => {
  console.log(salesChannel)
})
```

### Parameters

- id: (\`string\`) The ID of the sales channel to update.
- body: (\[AdminUpdateSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateSalesChannel/page.mdx)) The details of the sales channel to update.

  - name: (\`string\`) The sales channel's name.

  - description: (\`null\` \\| \`string\`) The sales channel's description.

  - is\_disabled: (\`boolean\`) Whether the sales channel is disabled.

  - metadata: (\`Record\<string, unknown>\`) Custom key-value pairs that can be added to the sales channel.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the sales channel.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminSalesChannelResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannelResponse/page.mdx)\&#62;) The sales channel's details.

  - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The sales channel's details.

    - id: (\`string\`) The sales channel's ID.

    - name: (\`string\`) The sales channel's name.

    - description: (\`null\` \\| \`string\`) The sales channel's description.

    - is\_disabled: (\`boolean\`) Whether the sales channel is disabled.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Custom key-value pairs that can be added to the sales channel.

    - created\_at: (\`string\`) The sales channel's creation date.

    - updated\_at: (\`string\`) The sales channel's last updated date.

    - deleted\_at: (\`null\` \\| \`string\`) The sales channel's deletion date.

***

## delete

This method deletes a sales channel. It sends a request to the
[Delete Sales Channel](https://docs.medusajs.com/api/admin#sales-channels_deletesaleschannelsid)
API route.

### Example

```ts
sdk.admin.salesChannel.delete("sc_123")
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- id: (\`string\`) The ID of the sales channel to delete.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminSalesChannelDeleteResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannelDeleteResponse/page.mdx)\&#62;) The deletion's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (\`"sales-channel"\`) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.

***

## retrieve

This method retrieves a sales channel. It sends a request to the
[Retrieve Sales Channel](https://docs.medusajs.com/api/admin#sales-channels_getsaleschannelsid)
API route.

### Example

To retrieve a sales channel by its ID:

```ts
sdk.admin.salesChannel.retrieve("sc_123")
.then(({ sales_channel }) => {
  console.log(sales_channel)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.salesChannel.retrieve("sc_123", {
  fields: "id,*products"
})
.then(({ sales_channel }) => {
  console.log(sales_channel)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/admin#select-fields-and-relations).

### Parameters

- id: (\`string\`) The ID of the sales channel to retrieve.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the sales channel.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminSalesChannelResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannelResponse/page.mdx)\&#62;) The sales channel's details.

  - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The sales channel's details.

    - id: (\`string\`) The sales channel's ID.

    - name: (\`string\`) The sales channel's name.

    - description: (\`null\` \\| \`string\`) The sales channel's description.

    - is\_disabled: (\`boolean\`) Whether the sales channel is disabled.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Custom key-value pairs that can be added to the sales channel.

    - created\_at: (\`string\`) The sales channel's creation date.

    - updated\_at: (\`string\`) The sales channel's last updated date.

    - deleted\_at: (\`null\` \\| \`string\`) The sales channel's deletion date.

***

## list

This method retrieves a list of sales channels. It sends a request to the
[List Sales Channels](https://docs.medusajs.com/api/admin#sales-channels_getsaleschannels)
API route.

### Example

To retrieve the list of sales channels:

```ts
sdk.admin.salesChannel.list()
.then(({ sales_channels, count, limit, offset }) => {
  console.log(sales_channels)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.salesChannel.list({
  limit: 10,
  offset: 10
})
.then(({ sales_channels, count, limit, offset }) => {
  console.log(sales_channels)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each sales channel:

```ts
sdk.admin.salesChannel.list({
  fields: "id,*products"
})
.then(({ sales_channels, count, limit, offset }) => {
  console.log(sales_channels)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/admin#select-fields-and-relations).

### Parameters

- query: (\[AdminSalesChannelListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannelListParams/page.mdx)) Filters and pagination configurations.

  - $and: ((\[AdminSalesChannelListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannelListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminSalesChannelListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannelListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[AdminSalesChannelListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannelListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminSalesChannelListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannelListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminSalesChannelListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannelListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminSalesChannelListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannelListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - id: (\`string\` \\| \`string\`\[]) Filter by sales channel ID(s).

    - q: (\`string\`) Query or keywords to search the sales channel's searchable fields.

    - name: (\`string\` \\| \`string\`\[]) Filter by sales channel name.

    - description: (\`string\`) Filter by sales channel description.

    - is\_disabled: (\`boolean\`) Filter by whether the sales channel is disabled.

    - location\_id: (\`string\` \\| \`string\`\[]) Filter by the ID(s) of the location(s) to retrieve the
      sales channels for.

    - publishable\_key\_id: (\`string\` \\| \`string\`\[]) Filter by the ID(s) of the publishable key(s) to retrieve the
      sales channels for.

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date when the sales channel was created.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date when the sales channel was updated.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date when the sales channel was deleted.

  - $or: ((\[AdminSalesChannelListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannelListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminSalesChannelListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannelListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[AdminSalesChannelListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannelListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminSalesChannelListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannelListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminSalesChannelListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannelListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminSalesChannelListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannelListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - id: (\`string\` \\| \`string\`\[]) Filter by sales channel ID(s).

    - q: (\`string\`) Query or keywords to search the sales channel's searchable fields.

    - name: (\`string\` \\| \`string\`\[]) Filter by sales channel name.

    - description: (\`string\`) Filter by sales channel description.

    - is\_disabled: (\`boolean\`) Filter by whether the sales channel is disabled.

    - location\_id: (\`string\` \\| \`string\`\[]) Filter by the ID(s) of the location(s) to retrieve the
      sales channels for.

    - publishable\_key\_id: (\`string\` \\| \`string\`\[]) Filter by the ID(s) of the publishable key(s) to retrieve the
      sales channels for.

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date when the sales channel was created.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date when the sales channel was updated.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date when the sales channel was deleted.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - id: (\`string\` \\| \`string\`\[]) Filter by sales channel ID(s).

  - q: (\`string\`) Query or keywords to search the sales channel's searchable fields.

  - name: (\`string\` \\| \`string\`\[]) Filter by sales channel name.

  - description: (\`string\`) Filter by sales channel description.

  - is\_disabled: (\`boolean\`) Filter by whether the sales channel is disabled.

  - location\_id: (\`string\` \\| \`string\`\[]) Filter by the ID(s) of the location(s) to retrieve the
    sales channels for.

  - publishable\_key\_id: (\`string\` \\| \`string\`\[]) Filter by the ID(s) of the publishable key(s) to retrieve the
    sales channels for.

  - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date when the sales channel was created.

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

  - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date when the sales channel was updated.

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

  - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date when the sales channel was deleted.

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

- Promise: (Promise\&#60;\[AdminSalesChannelListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminSalesChannelListResponse/page.mdx)\&#62;) The list of sales channels.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## updateProducts

This method manages the products in a sales channel to add or remove them. It sends a request to the
[Manage Products in Sales Channel](https://docs.medusajs.com/api/admin#sales-channels_postsaleschannelsidproducts)
API route.

### Example

```ts
sdk.admin.salesChannel.updateProducts("sc_123", {
  add: ["prod_123", "prod_456"],
  remove: ["prod_789"]
})
.then(({ sales_channel }) => {
  console.log(sales_channel)
})
```

### Parameters

- id: (\`string\`) The ID of the sales channel to manage the products for.
- body: (\[AdminUpdateSalesChannelProducts]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateSalesChannelProducts/page.mdx)) The details of the products to add or remove from the sales channel.

  - add: (\`string\`\[]) The IDs of the products to add to the sales channel.

  - remove: (\`string\`\[]) The IDs of the products to remove from the sales channel.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminSalesChannelResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannelResponse/page.mdx)\&#62;) The sales channel's details.

  - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The sales channel's details.

    - id: (\`string\`) The sales channel's ID.

    - name: (\`string\`) The sales channel's name.

    - description: (\`null\` \\| \`string\`) The sales channel's description.

    - is\_disabled: (\`boolean\`) Whether the sales channel is disabled.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Custom key-value pairs that can be added to the sales channel.

    - created\_at: (\`string\`) The sales channel's creation date.

    - updated\_at: (\`string\`) The sales channel's last updated date.

    - deleted\_at: (\`null\` \\| \`string\`) The sales channel's deletion date.

:::note\[Deprecated]

Use [batchProducts](https://docs.medusajs.com/var/task/www/apps/resources/references/js_sdk/admin/SalesChannel/methods/js_sdk.admin.SalesChannel.batchProducts) instead

:::

***

## batchProducts

This method manages the products in a sales channel to add or remove them. It sends a request to the
[Manage Products in Sales Channel](https://docs.medusajs.com/api/admin#sales-channels_postsaleschannelsidproducts)
API route.

### Example

```ts
sdk.admin.salesChannel.batchProducts("sc_123", {
  add: ["prod_123", "prod_456"],
  remove: ["prod_789"]
})
.then(({ sales_channel }) => {
  console.log(sales_channel)
})
```

### Parameters

- id: (\`string\`) The ID of the sales channel to manage the products for.
- body: (\[AdminUpdateSalesChannelProducts]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateSalesChannelProducts/page.mdx)) The details of the products to add or remove from the sales channel.

  - add: (\`string\`\[]) The IDs of the products to add to the sales channel.

  - remove: (\`string\`\[]) The IDs of the products to remove from the sales channel.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminSalesChannelResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannelResponse/page.mdx)\&#62;) The sales channel's details.

  - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The sales channel's details.

    - id: (\`string\`) The sales channel's ID.

    - name: (\`string\`) The sales channel's name.

    - description: (\`null\` \\| \`string\`) The sales channel's description.

    - is\_disabled: (\`boolean\`) Whether the sales channel is disabled.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Custom key-value pairs that can be added to the sales channel.

    - created\_at: (\`string\`) The sales channel's creation date.

    - updated\_at: (\`string\`) The sales channel's last updated date.

    - deleted\_at: (\`null\` \\| \`string\`) The sales channel's deletion date.
