# order - JS SDK Store Reference

This documentation provides a reference to the `sdk.store.order` set of methods used to send requests to Medusa's Store API routes.

## list

This method retrieves a paginated list of orders matching the specified filters. It
sends a request to the [List Orders](https://docs.medusajs.com/api/store#orders_getorders)
API route.

### Example

To retrieve the list of orders:

```ts
// TODO must be authenticated as the customer to list their orders
sdk.store.order.list()
.then(({ orders, count, offset, limit }) => {
  console.log(orders)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
// TODO must be authenticated as the customer to list their orders
sdk.store.order.list({
  limit: 10,
  offset: 10
})
.then(({ orders, count, offset, limit }) => {
  console.log(orders)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each order:

```ts
// TODO must be authenticated as the customer to list their orders
sdk.store.order.list({
  fields: "id,*items"
})
.then(({ orders, count, offset, limit }) => {
  console.log(orders)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- query: (\[StoreOrderFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderFilters/page.mdx)) Configure the fields to retrieve in the orders.

  - $and: ((\[StoreOrderFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[StoreOrderFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[StoreOrderFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[StoreOrderFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[StoreOrderFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[StoreOrderFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - id: (\`string\` \\| \`string\`\[]) Filter by order ID(s).

    - status: (\[OrderStatus]\(../../../../../fulfillment/types/fulfillment.OrderStatus/page.mdx) \\| \[OrderStatus]\(../../../../../fulfillment/types/fulfillment.OrderStatus/page.mdx)\[]) Filter by order status(es).

  - $or: ((\[StoreOrderFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[StoreOrderFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[StoreOrderFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[StoreOrderFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[StoreOrderFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[StoreOrderFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - id: (\`string\` \\| \`string\`\[]) Filter by order ID(s).

    - status: (\[OrderStatus]\(../../../../../fulfillment/types/fulfillment.OrderStatus/page.mdx) \\| \[OrderStatus]\(../../../../../fulfillment/types/fulfillment.OrderStatus/page.mdx)\[]) Filter by order status(es).

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - id: (\`string\` \\| \`string\`\[]) Filter by order ID(s).

  - status: (\[OrderStatus]\(../../../../../fulfillment/types/fulfillment.OrderStatus/page.mdx) \\| \[OrderStatus]\(../../../../../fulfillment/types/fulfillment.OrderStatus/page.mdx)\[]) Filter by order status(es).
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreOrderListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.StoreOrderListResponse/page.mdx)\&#62;) The paginated list of orders.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## retrieve

This method retrieves an order by its ID. It sends a request to the
[Get Order](https://docs.medusajs.com/api/store#orders_getordersid) API route.

### Example

To retrieve an order by its ID:

```ts
sdk.store.order.retrieve("order_123")
.then(({ order }) => {
  console.log(order)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.store.order.retrieve("order_123", {
  fields: "id,*items"
})
.then(({ order }) => {
  console.log(order)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- id: (\`string\`) The order's ID.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the order.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;object\&#62;) The order's details.

  - order: (\[StoreOrder]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrder/page.mdx))

    - id: (\`string\`) The order's ID.

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

    - items: (\`null\` \\| \[StoreOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderLineItem/page.mdx)\[]) The order's items.

    - shipping\_methods: (\`null\` \\| \[StoreOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderShippingMethod/page.mdx)\[]) The order's shipping methods.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - shipping\_address: (\`null\` \\| \[StoreOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[StoreOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderAddress/page.mdx)) The order's billing address.

    - payment\_collections: (\[StorePaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StorePaymentCollection/page.mdx)\[]) The order's payment collections.

    - fulfillments: (\[StoreOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - customer: (\[StoreCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCustomer/page.mdx)) The customer that placed the order.

***

## requestTransfer

This method requests a order transfer from a guest account to the current, logged in customer account.

Customer requesting the transfer must be logged in.

### Example

```ts
// TODO must be authenticated as the customer to request the order transfer
sdk.store.order.requestTransfer(
  "order_123",
  {
    description: "I want to transfer this order to my friend."
  },
  {},
  {
    Authorization: `Bearer ${token}`
  }
)
.then(({ order }) => {
  console.log(order)
})
```

### Parameters

- id: (\`string\`)
- body: (\[StoreRequestOrderTransfer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreRequestOrderTransfer/page.mdx)) The transfer's details.

  - description: (\`string\`) The description of the transfer request.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the order.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreOrderResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderResponse/page.mdx)\&#62;) The order details.

  - order: (\[StoreOrder]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrder/page.mdx)) The order's details.

    - id: (\`string\`) The order's ID.

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

    - items: (\`null\` \\| \[StoreOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderLineItem/page.mdx)\[]) The order's items.

    - shipping\_methods: (\`null\` \\| \[StoreOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderShippingMethod/page.mdx)\[]) The order's shipping methods.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - shipping\_address: (\`null\` \\| \[StoreOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[StoreOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderAddress/page.mdx)) The order's billing address.

    - payment\_collections: (\[StorePaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StorePaymentCollection/page.mdx)\[]) The order's payment collections.

    - fulfillments: (\[StoreOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - customer: (\[StoreCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCustomer/page.mdx)) The customer that placed the order.

***

## cancelTransfer

This method cancels an order transfer request.

Customer requesting the transfer must be logged in.

### Example

```ts
// TODO must be authenticated as the customer to cancel the order transfer
sdk.store.order.cancelTransfer(
  "order_123",
  {},
  {
    Authorization: `Bearer ${token}`
  }
)
.then(({ order }) => {
  console.log(order)
})
```

### Parameters

- id: (\`string\`) The order's ID.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the order.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreOrderResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderResponse/page.mdx)\&#62;) The order details.

  - order: (\[StoreOrder]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrder/page.mdx)) The order's details.

    - id: (\`string\`) The order's ID.

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

    - items: (\`null\` \\| \[StoreOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderLineItem/page.mdx)\[]) The order's items.

    - shipping\_methods: (\`null\` \\| \[StoreOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderShippingMethod/page.mdx)\[]) The order's shipping methods.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - shipping\_address: (\`null\` \\| \[StoreOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[StoreOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderAddress/page.mdx)) The order's billing address.

    - payment\_collections: (\[StorePaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StorePaymentCollection/page.mdx)\[]) The order's payment collections.

    - fulfillments: (\[StoreOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - customer: (\[StoreCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCustomer/page.mdx)) The customer that placed the order.

***

## acceptTransfer

The method called for the original owner to accept the order transfer to a new owner.

### Example

```ts
sdk.store.order.acceptTransfer(
  "order_123",
  {
    token: "transfer_token"
  },
  {
    Authorization: `Bearer ${token}`
  }
)
.then(({ order }) => {
  console.log(order)
})
```

### Parameters

- id: (\`string\`) The order's ID.
- body: (\[StoreAcceptOrderTransfer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreAcceptOrderTransfer/page.mdx)) The payload containing the transfer token.

  - token: (\`string\`)
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the order.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreOrderResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderResponse/page.mdx)\&#62;) The order details.

  - order: (\[StoreOrder]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrder/page.mdx)) The order's details.

    - id: (\`string\`) The order's ID.

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

    - items: (\`null\` \\| \[StoreOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderLineItem/page.mdx)\[]) The order's items.

    - shipping\_methods: (\`null\` \\| \[StoreOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderShippingMethod/page.mdx)\[]) The order's shipping methods.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - shipping\_address: (\`null\` \\| \[StoreOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[StoreOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderAddress/page.mdx)) The order's billing address.

    - payment\_collections: (\[StorePaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StorePaymentCollection/page.mdx)\[]) The order's payment collections.

    - fulfillments: (\[StoreOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - customer: (\[StoreCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCustomer/page.mdx)) The customer that placed the order.

***

## declineTransfer

The method called for the original owner to decline the order transfer to a new owner.

### Example

```ts
sdk.store.order.declineTransfer(
  "order_123",
  {
    token: "transfer_token"
  },
  {
    Authorization: `Bearer ${token}`
  }
)
.then(({ order }) => {
  console.log(order)
})
```

### Parameters

- id: (\`string\`) The order's ID.
- body: (\[StoreDeclineOrderTransfer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreDeclineOrderTransfer/page.mdx)) The payload containing the transfer token.

  - token: (\`string\`)
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the order.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreOrderResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderResponse/page.mdx)\&#62;) The order details.

  - order: (\[StoreOrder]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrder/page.mdx)) The order's details.

    - id: (\`string\`) The order's ID.

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

    - items: (\`null\` \\| \[StoreOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderLineItem/page.mdx)\[]) The order's items.

    - shipping\_methods: (\`null\` \\| \[StoreOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderShippingMethod/page.mdx)\[]) The order's shipping methods.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - shipping\_address: (\`null\` \\| \[StoreOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[StoreOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderAddress/page.mdx)) The order's billing address.

    - payment\_collections: (\[StorePaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StorePaymentCollection/page.mdx)\[]) The order's payment collections.

    - fulfillments: (\[StoreOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - customer: (\[StoreCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCustomer/page.mdx)) The customer that placed the order.
