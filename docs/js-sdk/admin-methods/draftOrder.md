# draftOrder - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.draftOrder` set of methods used to send requests to Medusa's Admin API routes.

## retrieve

This method retrieves a draft order by its ID. It sends a request to the
[Get Draft Order](https://docs.medusajs.com/api/admin#draft-orders_getdraftordersid)
API route.

### Example

To retrieve a draft order by its ID:

```ts
sdk.admin.draftOrder.retrieve("order_123")
.then(({ draft_order }) => {
  console.log(draft_order)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.draftOrder.retrieve("order_123", {
  fields: "id,*items"
})
.then(({ draft_order }) => {
  console.log(draft_order)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- id: (\`string\`) The draft order's ID.
- query: (\[AdminDraftOrderParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderParams/page.mdx)) Configure the fields to retrieve in the draft order.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminDraftOrderResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderResponse/page.mdx)\&#62;) The draft order's details.

  - draft\_order: (\[AdminDraftOrder]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrder/page.mdx)) The details of the draft order.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx)\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx)\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## list

This method retrieves a paginated list of draft orders. It sends a request to the
[List Draft Orders](https://docs.medusajs.com/api/admin#draft-orders_getdraftorders) API route.

### Example

To retrieve the list of draft orders:

```ts
sdk.admin.draftOrder.list()
.then(({ draft_orders, count, limit, offset }) => {
  console.log(draft_orders)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.draftOrder.list({
  limit: 10,
  offset: 10
})
.then(({ draft_orders, count, limit, offset }) => {
  console.log(draft_orders)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each draft order:

```ts
sdk.admin.draftOrder.list({
  fields: "id,*items"
})
.then(({ draft_orders, count, limit, offset }) => {
  console.log(draft_orders)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- queryParams: (\[AdminDraftOrderListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderListParams/page.mdx)) Filters and pagination configurations.

  - $and: ((\[AdminDraftOrderListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminDraftOrderListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[AdminDraftOrderListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminDraftOrderListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminDraftOrderListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminDraftOrderListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - id: (\`string\` \\| \`string\`\[]) Filter by draft order ID(s).

    - q: (\`string\`) Query or keywords to filter the draft order's searchable fields.

    - region\_id: (\`string\` \\| \`string\`\[]) Filter by region IDs to retrieve their associated draft orders.

    - customer\_id: (\`string\` \\| \`string\`\[]) Filter by customer IDs to retrieve their associated draft orders.

    - sales\_channel\_id: (\`string\`\[]) Filter by sales channel IDs to retrieve their associated draft orders.

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the draft order's creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the draft order's update date.

  - $or: ((\[AdminDraftOrderListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminDraftOrderListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[AdminDraftOrderListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminDraftOrderListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminDraftOrderListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminDraftOrderListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - id: (\`string\` \\| \`string\`\[]) Filter by draft order ID(s).

    - q: (\`string\`) Query or keywords to filter the draft order's searchable fields.

    - region\_id: (\`string\` \\| \`string\`\[]) Filter by region IDs to retrieve their associated draft orders.

    - customer\_id: (\`string\` \\| \`string\`\[]) Filter by customer IDs to retrieve their associated draft orders.

    - sales\_channel\_id: (\`string\`\[]) Filter by sales channel IDs to retrieve their associated draft orders.

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the draft order's creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the draft order's update date.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - id: (\`string\` \\| \`string\`\[]) Filter by draft order ID(s).

  - q: (\`string\`) Query or keywords to filter the draft order's searchable fields.

  - region\_id: (\`string\` \\| \`string\`\[]) Filter by region IDs to retrieve their associated draft orders.

  - customer\_id: (\`string\` \\| \`string\`\[]) Filter by customer IDs to retrieve their associated draft orders.

  - sales\_channel\_id: (\`string\`\[]) Filter by sales channel IDs to retrieve their associated draft orders.

  - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the draft order's creation date.

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

  - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the draft order's update date.

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

- Promise: (Promise\&#60;\[AdminDraftOrderListResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderListResponse/page.mdx)\&#62;) The paginated list of draft orders.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - draft\_orders: (\[AdminDraftOrder]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrder/page.mdx)\[]) The list of draft orders.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx)\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx)\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## create

This method creates a draft order. It sends a request to the
[Create Draft Order](https://docs.medusajs.com/api/admin#draft-orders_postdraftorders) API route.

### Example

```ts
sdk.admin.draftOrder.create({
  email: "test@test.com",
  items: [
    {
      variant_id: "variant_123",
      quantity: 1,
    },
  ],
  region_id: "region_123",
  sales_channel_id: "sc_123",
})
.then(({ draft_order }) => {
  console.log(draft_order)
})
```

### Parameters

- body: (\[AdminCreateDraftOrder]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateDraftOrder/page.mdx)) The data to create the draft order.

  - sales\_channel\_id: (\`string\`) The ID of the sales channel to associate the draft order with.

  - region\_id: (\`string\`) The ID of the region to associate the draft order with.

  - email: (\`null\` \\| \`string\`) The draft order's email.

    Either email or customer\\\_id must be provided.

  - customer\_id: (\`null\` \\| \`string\`) The ID of the customer to associate the draft order with.

    Either customer\\\_id or email must be provided.

  - currency\_code: (\`null\` \\| \`string\`) The currency code to use for the draft order.

    If not provided, the currency from the region will be used.

  - promo\_codes: (\`string\`\[]) The promotions to apply to the draft order.

  - shipping\_address: (\`string\` \\| \[OrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.OrderAddress/page.mdx)) The draft order's shipping address.

    - first\_name: (\`string\`) The first name of the address.

    - last\_name: (\`string\`) The last name of the address.

    - phone: (\`string\`) The phone number of the address.

    - company: (\`string\`) The company of the address.

    - address\_1: (\`string\`) The first address line of the address.

    - address\_2: (\`string\`) The second address line of the address.

    - city: (\`string\`) The city of the address.

    - country\_code: (\`string\`) The country code of the address.

    - province: (\`string\`) The lower-case \[ISO 3166-2]\(https://en.wikipedia.org/wiki/ISO\\\_3166-2) province/state of the address.

    - postal\_code: (\`string\`) The postal code of the address.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Holds custom data in key-value pairs.

  - billing\_address: (\`string\` \\| \[OrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.OrderAddress/page.mdx)) The draft order's billing address.

    - first\_name: (\`string\`) The first name of the address.

    - last\_name: (\`string\`) The last name of the address.

    - phone: (\`string\`) The phone number of the address.

    - company: (\`string\`) The company of the address.

    - address\_1: (\`string\`) The first address line of the address.

    - address\_2: (\`string\`) The second address line of the address.

    - city: (\`string\`) The city of the address.

    - country\_code: (\`string\`) The country code of the address.

    - province: (\`string\`) The lower-case \[ISO 3166-2]\(https://en.wikipedia.org/wiki/ISO\\\_3166-2) province/state of the address.

    - postal\_code: (\`string\`) The postal code of the address.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Holds custom data in key-value pairs.

  - items: (\[AdminCreateDraftOrderItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateDraftOrderItem/page.mdx)\[]) The draft order's items.

    - quantity: (\`number\`) The item's quantity.

    - title: (\`null\` \\| \`string\`) The item's title.

    - variant\_sku: (\`null\` \\| \`string\`) The item's variant SKU.

    - variant\_barcode: (\`null\` \\| \`string\`) The item's variant barcode.

    - variant\_id: (\`null\` \\| \`string\`) The ID of the item's variant.

    - unit\_price: (\`null\` \\| \`number\`) The item's unit price.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) The item's metadata.

  - shipping\_methods: (\[AdminCreateDraftOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateDraftOrderShippingMethod/page.mdx)\[]) The draft order's shipping methods.

    - shipping\_option\_id: (\`string\`) The ID of the shipping option.

  - no\_notification\_order: (\`boolean\`) Whether to notify the customer about the draft order.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) The draft order's metadata.
- query: (\[AdminDraftOrderParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderParams/page.mdx)) Configure the fields to retrieve in the draft order.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminDraftOrderResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderResponse/page.mdx)\&#62;) The draft order's details.

  - draft\_order: (\[AdminDraftOrder]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrder/page.mdx)) The details of the draft order.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx)\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx)\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## delete

This method deletes a draft order. It sends a request to the
[Delete Draft Order](https://docs.medusajs.com/api/admin#draft-orders_deleteordereditsid) API route.

### Example

```ts
sdk.admin.draftOrder.delete("order_123")
.then(({ id, object, deleted }) => {
  console.log(id, object, deleted)
})
```

### Parameters

- id: (\`string\`) The draft order's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[DeleteResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.DeleteResponse/page.mdx)\&#60;"draft-order"\&#62;\&#62;) This method deletes a draft order. It sends a request to the
  \[Delete Draft Order]\(https://docs.medusajs.com/api/admin#draft-orders\\\_deleteordereditsid) API route.

  - "draft-order": (\`"draft-order"\`)

***

## update

This method updates a draft order. It sends a request to the
[Update Draft Order](https://docs.medusajs.com/api/admin#draft-orders_postdraftordersid) API route.

### Example

```ts
sdk.admin.draftOrder.update("order_123", {
  email: "test@test.com",
})
.then(({ draft_order }) => {
  console.log(draft_order)
})
```

### Parameters

- id: (\`string\`) The draft order's ID.
- body: (\[AdminUpdateDraftOrder]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateDraftOrder/page.mdx)) The data to update the draft order.

  - email: (\`string\`) The draft order's email.

  - customer\_id: (\`string\`) The ID of the customer to associate the draft order with.

  - sales\_channel\_id: (\`string\`) The ID of the sales channel to associate the draft order with.

  - shipping\_address: (\[OrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.OrderAddress/page.mdx)) The draft order's shipping address.

    - first\_name: (\`string\`) The first name of the address.

    - last\_name: (\`string\`) The last name of the address.

    - phone: (\`string\`) The phone number of the address.

    - company: (\`string\`) The company of the address.

    - address\_1: (\`string\`) The first address line of the address.

    - address\_2: (\`string\`) The second address line of the address.

    - city: (\`string\`) The city of the address.

    - country\_code: (\`string\`) The country code of the address.

    - province: (\`string\`) The lower-case \[ISO 3166-2]\(https://en.wikipedia.org/wiki/ISO\\\_3166-2) province/state of the address.

    - postal\_code: (\`string\`) The postal code of the address.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Holds custom data in key-value pairs.

  - billing\_address: (\[OrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.OrderAddress/page.mdx)) The draft order's billing address.

    - first\_name: (\`string\`) The first name of the address.

    - last\_name: (\`string\`) The last name of the address.

    - phone: (\`string\`) The phone number of the address.

    - company: (\`string\`) The company of the address.

    - address\_1: (\`string\`) The first address line of the address.

    - address\_2: (\`string\`) The second address line of the address.

    - city: (\`string\`) The city of the address.

    - country\_code: (\`string\`) The country code of the address.

    - province: (\`string\`) The lower-case \[ISO 3166-2]\(https://en.wikipedia.org/wiki/ISO\\\_3166-2) province/state of the address.

    - postal\_code: (\`string\`) The postal code of the address.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Holds custom data in key-value pairs.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) The draft order's metadata.
- query: (\[AdminDraftOrderParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderParams/page.mdx)) Configure the fields to retrieve in the draft order.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminDraftOrderResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderResponse/page.mdx)\&#62;) The draft order's details.

  - draft\_order: (\[AdminDraftOrder]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrder/page.mdx)) The details of the draft order.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx)\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx)\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## convertToOrder

This method converts a draft order to an order. It sends a request to the
[Convert Draft Order to Order](https://docs.medusajs.com/api/admin#draft-orders_postdraftordersidconverttoorder) API route.

### Example

```ts
sdk.admin.draftOrder.convertToOrder("order_123")
.then(({ order }) => {
  console.log(order)
})
```

### Parameters

- id: (\`string\`) The draft order's ID.
- query: (\[AdminDraftOrderParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderParams/page.mdx)) Configure the fields to retrieve in the order.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminOrderResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderResponse/page.mdx)\&#62;) The order's details.

  - order: (\[AdminOrder]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrder/page.mdx)) The order's details.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx)\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx)\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## addItems

This method adds items to a draft order. It sends a request to the
[Add Draft Order Items](https://docs.medusajs.com/api/admin#draft-orders_postdraftordersidedititems) API route.

### Example

```ts
sdk.admin.draftOrder.addItems("order_123", {
  items: [
    {
      variant_id: "variant_123",
      quantity: 1,
    },
  ],
})
.then(({ draft_order_preview }) => {
  console.log(draft_order_preview)
})
```

### Parameters

- id: (\`string\`) The draft order's ID.
- body: (\[AdminAddDraftOrderItems]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminAddDraftOrderItems/page.mdx)) The data to add the items to the draft order.

  - items: (\[AdminAddDraftOrderItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminAddDraftOrderItem/page.mdx)\[]) The items to add to the draft order.

    - quantity: (\`number\`) The item's quantity.

    - variant\_id: (\`string\`) The item's variant ID.

      Either variant\\\_id or title must be provided.

    - title: (\`string\`) The item's title.

      Either variant\\\_id or title must be provided.

    - unit\_price: (\`null\` \\| \`number\`) The item's unit price.

    - compare\_at\_unit\_price: (\`null\` \\| \`number\`) The item's compare at unit price.

    - internal\_note: (\`null\` \\| \`string\`) The item's internal note.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) The item's metadata.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminDraftOrderPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderPreviewResponse/page.mdx)\&#62;) The draft order preview's details.

  - draft\_order\_preview: (\[AdminDraftOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderPreview/page.mdx)) The details of the preview on the draft order.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - return\_requested\_total: (\`number\`) The total amount for the items requested to be returned.

    - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The details of the changes on the order.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx) & \`object\`\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx) & \`object\`\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## updateActionItem

This method updates an item that is part of an action in a draft order. It sends a request to the
[Update Draft Order Item](https://docs.medusajs.com/api/admin#draft-orders_postdraftordersidedititemsaction_id) API route.

### Example

```ts
sdk.admin.draftOrder.updateActionItem("order_123", "action_123", {
  quantity: 2,
})
.then(({ draft_order_preview }) => {
  console.log(draft_order_preview)
})
```

### Parameters

- id: (\`string\`) The draft order's ID.
- actionId: (\`string\`) The action ID.
- body: (\[AdminUpdateDraftOrderItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateDraftOrderItem/page.mdx)) The data to update the item.

  - quantity: (\`number\`) The item's quantity.

  - unit\_price: (\`null\` \\| \`number\`) The item's unit price.

  - compare\_at\_unit\_price: (\`null\` \\| \`number\`) The item's compare at unit price.

  - internal\_note: (\`null\` \\| \`string\`) The item's internal note.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) The item's metadata.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminDraftOrderPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderPreviewResponse/page.mdx)\&#62;) The draft order preview's details.

  - draft\_order\_preview: (\[AdminDraftOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderPreview/page.mdx)) The details of the preview on the draft order.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - return\_requested\_total: (\`number\`) The total amount for the items requested to be returned.

    - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The details of the changes on the order.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx) & \`object\`\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx) & \`object\`\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## removeActionItem

This method removes an item that is part of an action in a draft order. It sends a request to the
[Remove Draft Order Item](https://docs.medusajs.com/api/admin#draft-orders_deletedraftordersidedititemsaction_id) API route.

### Example

```ts
sdk.admin.draftOrder.removeActionItem("order_123", "action_123")
.then(({ draft_order_preview }) => {
  console.log(draft_order_preview)
})
```

### Parameters

- id: (\`string\`) The draft order's ID.
- actionId: (\`string\`) The action ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminDraftOrderPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderPreviewResponse/page.mdx)\&#62;) The draft order preview's details.

  - draft\_order\_preview: (\[AdminDraftOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderPreview/page.mdx)) The details of the preview on the draft order.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - return\_requested\_total: (\`number\`) The total amount for the items requested to be returned.

    - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The details of the changes on the order.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx) & \`object\`\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx) & \`object\`\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## updateItem

This method updates an item in a draft order. It sends a request to the
[Update Draft Order Item](https://docs.medusajs.com/api/admin#draft-orders_postdraftordersidedititemsitemitem_id) API route.

### Example

```ts
sdk.admin.draftOrder.updateItem("order_123", "item_123", {
  quantity: 2,
})
.then(({ draft_order_preview }) => {
  console.log(draft_order_preview)
})
```

### Parameters

- id: (\`string\`) The draft order's ID.
- itemId: (\`string\`) The item ID.
- body: (\[AdminUpdateDraftOrderItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateDraftOrderItem/page.mdx)) The data to update the item.

  - quantity: (\`number\`) The item's quantity.

  - unit\_price: (\`null\` \\| \`number\`) The item's unit price.

  - compare\_at\_unit\_price: (\`null\` \\| \`number\`) The item's compare at unit price.

  - internal\_note: (\`null\` \\| \`string\`) The item's internal note.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) The item's metadata.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminDraftOrderPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderPreviewResponse/page.mdx)\&#62;) The draft order preview's details.

  - draft\_order\_preview: (\[AdminDraftOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderPreview/page.mdx)) The details of the preview on the draft order.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - return\_requested\_total: (\`number\`) The total amount for the items requested to be returned.

    - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The details of the changes on the order.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx) & \`object\`\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx) & \`object\`\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## addPromotions

This method adds promotions to a draft order. It sends a request to the
[Add Draft Order Promotions](https://docs.medusajs.com/api/admin#draft-orders_postdraftordersideditpromotions) API route.

### Example

```ts
sdk.admin.draftOrder.addPromotions("order_123", {
  promo_codes: ["PROMO_CODE_1", "PROMO_CODE_2"],
})
.then(({ draft_order_preview }) => {
  console.log(draft_order_preview)
})
```

### Parameters

- id: (\`string\`) The draft order's ID.
- body: (\[AdminAddDraftOrderPromotions]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminAddDraftOrderPromotions/page.mdx)) The data to add the promotions to the draft order.

  - promo\_codes: (\`string\`\[]) The promotion codes to apply to the draft order.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminDraftOrderPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderPreviewResponse/page.mdx)\&#62;) The draft order preview's details.

  - draft\_order\_preview: (\[AdminDraftOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderPreview/page.mdx)) The details of the preview on the draft order.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - return\_requested\_total: (\`number\`) The total amount for the items requested to be returned.

    - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The details of the changes on the order.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx) & \`object\`\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx) & \`object\`\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## removePromotions

This method removes promotions from a draft order. It sends a request to the
[Remove Draft Order Promotions](https://docs.medusajs.com/api/admin#draft-orders_deletedraftordersideditpromotions) API route.

### Example

```ts
sdk.admin.draftOrder.removePromotions("order_123", {
  promo_codes: ["PROMO_CODE_1", "PROMO_CODE_2"],
})
```

### Parameters

- id: (\`string\`) The draft order's ID.
- body: (\[AdminRemoveDraftOrderPromotions]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRemoveDraftOrderPromotions/page.mdx)) The data to remove the promotions from the draft order.

  - promo\_codes: (\`string\`\[]) The promotion codes to remove from the draft order.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminDraftOrderPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderPreviewResponse/page.mdx)\&#62;) The draft order preview's details.

  - draft\_order\_preview: (\[AdminDraftOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderPreview/page.mdx)) The details of the preview on the draft order.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - return\_requested\_total: (\`number\`) The total amount for the items requested to be returned.

    - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The details of the changes on the order.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx) & \`object\`\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx) & \`object\`\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## addShippingMethod

This method adds a shipping method to a draft order. It sends a request to the
[Add Draft Order Shipping Method](https://docs.medusajs.com/api/admin#draft-orders_postdraftordersideditshippingmethods) API route.

### Example

```ts
sdk.admin.draftOrder.addShippingMethod("order_123", {
  shipping_option_id: "shipping_option_123",
})
.then(({ draft_order_preview }) => {
  console.log(draft_order_preview)
})
```

### Parameters

- id: (\`string\`) The draft order's ID.
- body: (\[AdminAddDraftOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminAddDraftOrderShippingMethod/page.mdx)) The data to add the shipping method to the draft order.

  - shipping\_option\_id: (\`string\`) ID of the shipping option to associate with the shipping method.

  - custom\_amount: (\`number\`) Custom amount for the shipping method.

  - description: (\`string\`) Description of the shipping method.

  - internal\_note: (\`string\`) Internal note for the shipping method.

  - metadata: (\`Record\<string, unknown>\`) Metadata for the shipping method.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminDraftOrderPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderPreviewResponse/page.mdx)\&#62;) The draft order preview's details.

  - draft\_order\_preview: (\[AdminDraftOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderPreview/page.mdx)) The details of the preview on the draft order.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - return\_requested\_total: (\`number\`) The total amount for the items requested to be returned.

    - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The details of the changes on the order.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx) & \`object\`\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx) & \`object\`\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## updateActionShippingMethod

This method updates a shipping method in a draft order. It sends a request to the
[Update Draft Order Shipping Method](https://docs.medusajs.com/api/admin#draft-orders_postdraftordersideditshippingmethodsaction_id) API route.

### Example

```ts
sdk.admin.draftOrder.updateShippingMethod("order_123", "action_123", {
  shipping_option_id: "shipping_option_123",
})
.then(({ draft_order_preview }) => {
  console.log(draft_order_preview)
})
```

### Parameters

- id: (\`string\`) The draft order's ID.
- actionId: (\`string\`) The action ID.
- body: (\[AdminUpdateDraftOrderActionShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateDraftOrderActionShippingMethod/page.mdx)) The data to update the shipping method.

  - shipping\_option\_id: (\`string\`) ID of the shipping option to associate with the shipping method.

  - custom\_amount: (\`null\` \\| \`number\`) Custom amount for the shipping method.

  - description: (\`null\` \\| \`string\`) Description of the shipping method.

  - internal\_note: (\`null\` \\| \`string\`) Internal note for the shipping method.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Metadata for the shipping method.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminDraftOrderPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderPreviewResponse/page.mdx)\&#62;) The draft order preview's details.

  - draft\_order\_preview: (\[AdminDraftOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderPreview/page.mdx)) The details of the preview on the draft order.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - return\_requested\_total: (\`number\`) The total amount for the items requested to be returned.

    - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The details of the changes on the order.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx) & \`object\`\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx) & \`object\`\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## removeActionShippingMethod

This method removes a shipping method from a draft order. It sends a request to the
[Remove Draft Order Shipping Method](https://docs.medusajs.com/api/admin#draft-orders_deletedraftordersideditshippingmethodsaction_id) API route.

### Example

```ts
sdk.admin.draftOrder.removeShippingMethod("order_123", "action_123")
.then(({ draft_order_preview }) => {
  console.log(draft_order_preview)
})
```

### Parameters

- id: (\`string\`) The draft order's ID.
- actionId: (\`string\`) The action ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminDraftOrderPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderPreviewResponse/page.mdx)\&#62;) The draft order preview's details.

  - draft\_order\_preview: (\[AdminDraftOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderPreview/page.mdx)) The details of the preview on the draft order.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - return\_requested\_total: (\`number\`) The total amount for the items requested to be returned.

    - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The details of the changes on the order.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx) & \`object\`\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx) & \`object\`\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## removeShippingMethod

This method removes a shipping method from an edited draft order. It sends a request to the
[Remove Draft Order Shipping Method](https://docs.medusajs.com/api/admin#draft-orders_deletedraftordersideditshippingmethodsmethodmethod_id) API route.

### Example

```ts
sdk.admin.draftOrder.removeShippingMethod(
  "order_123", 
  "shipping_method_123"
)
.then(({ draft_order_preview }) => {
  console.log(draft_order_preview)
})
```

### Parameters

- id: (\`string\`) The draft order's ID.
- shippingMethodId: (\`string\`) The shipping method's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminDraftOrderPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderPreviewResponse/page.mdx)\&#62;) The draft order preview's details.

  - draft\_order\_preview: (\[AdminDraftOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderPreview/page.mdx)) The details of the preview on the draft order.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - return\_requested\_total: (\`number\`) The total amount for the items requested to be returned.

    - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The details of the changes on the order.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx) & \`object\`\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx) & \`object\`\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## updateShippingMethod

This method updates a shipping method in a draft order. It sends a request to the
[Update Draft Order Shipping Method](https://docs.medusajs.com/api/admin#draft-orders_postdraftordersideditshippingmethodsmethodmethod_id) API route.

### Example

```ts
sdk.admin.draftOrder.updateShippingMethod("order_123", "sm_123", {
 shipping_option_id: "so_123",
})
.then(({ draft_order_preview }) => {
  console.log(draft_order_preview)
})
```

### Parameters

- id: (\`string\`) The draft order's ID.
- methodId: (\`string\`) The shipping method's ID.
- body: (\[AdminUpdateDraftOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateDraftOrderShippingMethod/page.mdx)) The data to update the shipping method.

  - shipping\_option\_id: (\`string\`) ID of the shipping option to associate with the shipping method.

  - custom\_amount: (\`number\`) Custom amount for the shipping method.

  - internal\_note: (\`null\` \\| \`string\`) Internal note for the shipping method.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminDraftOrderPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderPreviewResponse/page.mdx)\&#62;) The draft order preview's details.

  - draft\_order\_preview: (\[AdminDraftOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderPreview/page.mdx)) The details of the preview on the draft order.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - return\_requested\_total: (\`number\`) The total amount for the items requested to be returned.

    - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The details of the changes on the order.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx) & \`object\`\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx) & \`object\`\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## beginEdit

This method begins an edit to a draft order. It sends a request to the
[Begin Draft Order Edit](https://docs.medusajs.com/api/admin#draft-orders_postdraftordersidedit) API route.

### Example

```ts
sdk.admin.draftOrder.beginEdit("order_123")
.then(({ draft_order_preview }) => {
  console.log(draft_order_preview)
})
```

### Parameters

- id: (\`string\`) The draft order's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminDraftOrderPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderPreviewResponse/page.mdx)\&#62;) This method begins an edit to a draft order. It sends a request to the
  \[Begin Draft Order Edit]\(https://docs.medusajs.com/api/admin#draft-orders\\\_postdraftordersidedit) API route.

  - draft\_order\_preview: (\[AdminDraftOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderPreview/page.mdx)) The details of the preview on the draft order.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - return\_requested\_total: (\`number\`) The total amount for the items requested to be returned.

    - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The details of the changes on the order.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx) & \`object\`\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx) & \`object\`\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## cancelEdit

This method cancels an edit to a draft order. It sends a request to the
[Cancel Draft Order Edit](https://docs.medusajs.com/api/admin#draft-orders_deletedraftordersidedit) API route.

### Example

```ts
sdk.admin.draftOrder.cancelEdit("order_123")
.then(({ id, object, deleted }) => {
  console.log(id, object, deleted)
})
```

### Parameters

- id: (\`string\`) The draft order's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[DeleteResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.DeleteResponse/page.mdx)\&#60;"draft-order-edit"\&#62;\&#62;) The cancelation's details.

  - "draft-order-edit": (\`"draft-order-edit"\`)

***

## requestEdit

This method requests an edit to a draft order. It sends a request to the
[Request Draft Order Edit](https://docs.medusajs.com/api/admin#draft-orders_postdraftordersideditrequest) API route.

### Example

```ts
sdk.admin.draftOrder.requestEdit("order_123")
.then(({ draft_order_preview }) => {
  console.log(draft_order_preview)
})
```

### Parameters

- id: (\`string\`) The draft order's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminDraftOrderPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderPreviewResponse/page.mdx)\&#62;) The draft order preview's details.

  - draft\_order\_preview: (\[AdminDraftOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderPreview/page.mdx)) The details of the preview on the draft order.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - return\_requested\_total: (\`number\`) The total amount for the items requested to be returned.

    - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The details of the changes on the order.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx) & \`object\`\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx) & \`object\`\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## confirmEdit

This method confirms an edit to a draft order. It sends a request to the
[Confirm Draft Order Edit](https://docs.medusajs.com/api/admin#draft-orders_postdraftordersideditconfirm) API route.

### Example

```ts
sdk.admin.draftOrder.confirmEdit("order_123")
.then(({ draft_order_preview }) => {
  console.log(draft_order_preview)
})
```

### Parameters

- id: (\`string\`) The draft order's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminDraftOrderPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderPreviewResponse/page.mdx)\&#62;) The draft order preview's details.

  - draft\_order\_preview: (\[AdminDraftOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDraftOrderPreview/page.mdx)) The details of the preview on the draft order.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - return\_requested\_total: (\`number\`) The total amount for the items requested to be returned.

    - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The details of the changes on the order.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx) & \`object\`\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx) & \`object\`\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.
