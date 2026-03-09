# exchange - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.exchange` set of methods used to send requests to Medusa's Admin API routes.

## list

This method retrieves a paginated list of exchanges. It sends a request to the
[List Exchanges](https://docs.medusajs.com/api/admin#exchanges_getexchanges)
API route.

### Example

To retrieve the list of exchanges:

```ts
sdk.admin.exchange.list()
.then(({ exchanges, count, limit, offset }) => {
  console.log(exchanges)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.exchange.list({
  limit: 10,
  offset: 10
})
.then(({ exchanges, count, limit, offset }) => {
  console.log(exchanges)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each exchange:

```ts
sdk.admin.exchange.list({
  fields: "id,*order"
})
.then(({ exchanges, count, limit, offset }) => {
  console.log(exchanges)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- query: (\[AdminExchangeListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchangeListParams/page.mdx)) Filters and pagination configurations.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - id: (\`string\` \\| \`string\`\[]) Filter by exchange ID(s).

  - order\_id: (\`string\` \\| \`string\`\[]) Filter by order ID(s) to get their associated exchanges.

  - status: (\`string\` \\| \`string\`\[]) Filter by exchange status(es).

  - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the exchange's creation date.

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

  - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the exchange's update date.

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

  - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the exchange's deletion date.

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

- Promise: (Promise\&#60;\[AdminExchangeListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminExchangeListResponse/page.mdx)\&#62;) The paginated list of exchanges.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## retrieve

This method retrieves an exchange by its ID. It sends a request to the
[Get Exchange](https://docs.medusajs.com/api/admin#exchanges_getexchangesid)
API route.

### Example

To retrieve an exchange by its ID:

```ts
sdk.admin.exchange.retrieve("exchange_123")
.then(({ exchange }) => {
  console.log(exchange)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.exchange.retrieve("exchange_123", {
  fields: "id,*order"
})
.then(({ exchange }) => {
  console.log(exchange)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- id: (\`string\`) The exchange's ID.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the exchange.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminExchangeResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchangeResponse/page.mdx)\&#62;) The exchange's details.

  - exchange: (\[AdminExchange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchange/page.mdx)) The exchange's details.

    - id: (\`string\`) The exchange's ID.

    - order\_id: (\`string\`) The ID of the order this exchange is created for.

    - created\_at: (\`string\` \\| \`Date\`) The date the exchange was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the exchange was updated.

    - canceled\_at: (\`string\` \\| \`Date\`) The date the exchange was canceled.

    - deleted\_at: (\`string\` \\| \`Date\`) The date the exchange was deleted.

    - additional\_items: (\[BaseExchangeItem]\(../../../../../types/interfaces/types.BaseExchangeItem/page.mdx)\[]) The exchange's new (outbound) items.

    - return\_items: (\[AdminReturnItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnItem/page.mdx)\[]) The exchange's returned (inbound) items.

    - return\_id: (\`string\`) The ID of the associated return.

    - display\_id: (\`string\`) The exchange's display ID.

    - order\_version: (\`string\`) The version of the order when the exchange is applied.

    - created\_by: (\`string\`) The ID of the user that created the exchange.

    - no\_notification: (\`boolean\`) Whether to notify the customer about changes in the exchange.

    - difference\_due: (\`number\`) The exchange's difference amount due, either to the customer or the merchant.

      If the value is positive, the customer owes the merchant additional payment of this amount.
      If negative, the merchant owes the customer a refund of this amount.

    - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The associated return.

    - order: (\[BaseOrder]\(../../../../../types/interfaces/types.BaseOrder/page.mdx)) The associated order.

    - allow\_backorder: (\`boolean\`) Whether out-of-stock variants can be added as new items.

    - shipping\_methods: (\[BaseOrderShippingMethod]\(../../../../../types/interfaces/types.BaseOrderShippingMethod/page.mdx)\[]) The shipping methods used to send the outbound items.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The exchange's transactions.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## create

This method creates an admin exchange. It sends a request to the
[Create Exchange](https://docs.medusajs.com/api/admin#exchanges_postexchanges) API route.

### Example

```ts
sdk.admin.exchange.create({
  order_id: "order_123"
})
.then(({ exchange }) => {
  console.log(exchange)
})
```

### Parameters

- body: (\[AdminCreateExchange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateExchange/page.mdx)) The exchange's details.

  - order\_id: (\`string\`) The ID of the order the exchange is created for.

  - description: (\`string\`) The exchange's description.

  - internal\_note: (\`string\`) An internal note viewed by admin users only.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the exchange.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminExchangeResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchangeResponse/page.mdx)\&#62;) The exchange's details.

  - exchange: (\[AdminExchange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchange/page.mdx)) The exchange's details.

    - id: (\`string\`) The exchange's ID.

    - order\_id: (\`string\`) The ID of the order this exchange is created for.

    - created\_at: (\`string\` \\| \`Date\`) The date the exchange was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the exchange was updated.

    - canceled\_at: (\`string\` \\| \`Date\`) The date the exchange was canceled.

    - deleted\_at: (\`string\` \\| \`Date\`) The date the exchange was deleted.

    - additional\_items: (\[BaseExchangeItem]\(../../../../../types/interfaces/types.BaseExchangeItem/page.mdx)\[]) The exchange's new (outbound) items.

    - return\_items: (\[AdminReturnItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnItem/page.mdx)\[]) The exchange's returned (inbound) items.

    - return\_id: (\`string\`) The ID of the associated return.

    - display\_id: (\`string\`) The exchange's display ID.

    - order\_version: (\`string\`) The version of the order when the exchange is applied.

    - created\_by: (\`string\`) The ID of the user that created the exchange.

    - no\_notification: (\`boolean\`) Whether to notify the customer about changes in the exchange.

    - difference\_due: (\`number\`) The exchange's difference amount due, either to the customer or the merchant.

      If the value is positive, the customer owes the merchant additional payment of this amount.
      If negative, the merchant owes the customer a refund of this amount.

    - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The associated return.

    - order: (\[BaseOrder]\(../../../../../types/interfaces/types.BaseOrder/page.mdx)) The associated order.

    - allow\_backorder: (\`boolean\`) Whether out-of-stock variants can be added as new items.

    - shipping\_methods: (\[BaseOrderShippingMethod]\(../../../../../types/interfaces/types.BaseOrderShippingMethod/page.mdx)\[]) The shipping methods used to send the outbound items.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The exchange's transactions.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## cancel

This method cancels an exchange. It sends a request to the
[Cancel Exchange](https://docs.medusajs.com/api/admin#exchanges_postexchangesidcancel) API route.

### Example

```ts
sdk.admin.exchange.cancel("exchange_123")
.then(({ exchange }) => {
  console.log(exchange)
})
```

### Parameters

- id: (\`string\`) The exchange's ID.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the exchange.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminExchangeResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchangeResponse/page.mdx)\&#62;) The exchange's details.

  - exchange: (\[AdminExchange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchange/page.mdx)) The exchange's details.

    - id: (\`string\`) The exchange's ID.

    - order\_id: (\`string\`) The ID of the order this exchange is created for.

    - created\_at: (\`string\` \\| \`Date\`) The date the exchange was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the exchange was updated.

    - canceled\_at: (\`string\` \\| \`Date\`) The date the exchange was canceled.

    - deleted\_at: (\`string\` \\| \`Date\`) The date the exchange was deleted.

    - additional\_items: (\[BaseExchangeItem]\(../../../../../types/interfaces/types.BaseExchangeItem/page.mdx)\[]) The exchange's new (outbound) items.

    - return\_items: (\[AdminReturnItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnItem/page.mdx)\[]) The exchange's returned (inbound) items.

    - return\_id: (\`string\`) The ID of the associated return.

    - display\_id: (\`string\`) The exchange's display ID.

    - order\_version: (\`string\`) The version of the order when the exchange is applied.

    - created\_by: (\`string\`) The ID of the user that created the exchange.

    - no\_notification: (\`boolean\`) Whether to notify the customer about changes in the exchange.

    - difference\_due: (\`number\`) The exchange's difference amount due, either to the customer or the merchant.

      If the value is positive, the customer owes the merchant additional payment of this amount.
      If negative, the merchant owes the customer a refund of this amount.

    - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The associated return.

    - order: (\[BaseOrder]\(../../../../../types/interfaces/types.BaseOrder/page.mdx)) The associated order.

    - allow\_backorder: (\`boolean\`) Whether out-of-stock variants can be added as new items.

    - shipping\_methods: (\[BaseOrderShippingMethod]\(../../../../../types/interfaces/types.BaseOrderShippingMethod/page.mdx)\[]) The shipping methods used to send the outbound items.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The exchange's transactions.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## addInboundItems

This method adds inbound (or return) items to an exchange. These inbound items will
have the action `RETURN_ITEM`.

This method sends a request to the [Add Inbound Items](https://docs.medusajs.com/api/admin#exchanges_postexchangesidinbounditems)
API route.

### Example

```ts
sdk.admin.exchange.addInboundItems("exchange_123", {
  items: [{
    id: "orli_123",
    quantity: 1
  }]
})
.then(({ return: returnData }) => {
  console.log(returnData)
})
```

### Parameters

- id: (\`string\`) The exchange's ID.
- body: (\[AdminAddExchangeInboundItems]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminAddExchangeInboundItems/page.mdx)) The items to add.

  - items: (\`object\`\[]) The items to add to the exchange.

    - id: (\`string\`) The ID of the order item returned.

    - quantity: (\`number\`) The item's quantity.

    - description: (\`string\`) The description of why the item is being returned.

    - internal\_note: (\`string\`) An internal note viewed by admin users only.

    - reason\_id: (\`string\`) The ID of the associated return reason.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

  - location\_id: (\`string\`) The ID of the location the items are returned to.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminExchangeReturnResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchangeReturnResponse/page.mdx)\&#62;) The details of the return associated with the exchange, with a preview of the order when the exchange is applied.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) A preview of the order when the exchange is confirmed.

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

  - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The return associated with the exchange.

    - items: (\[AdminReturnItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnItem/page.mdx)\[]) The return's items.

    - id: (\`string\`) The return's ID.

    - order\_id: (\`string\`) The ID of the order that the return belongs to.

    - order\_version: (\`number\`) The order's version once the return is applied.

    - display\_id: (\`number\`) The display ID of the return.

    - received\_at: (\`string\`) The date when the return was received.

    - created\_at: (\`string\`) The date when the return was created.

    - canceled\_at: (\`string\`) The date when the return was canceled.

    - status: (\[ReturnStatus]\(../../../../../order/types/order.ReturnStatus/page.mdx)) The return's status.

    - exchange\_id: (\`string\`) The ID of the exchange that the return belongs to,
      if available.

    - location\_id: (\`string\`) The ID of the stock location that the items are returned to.

    - claim\_id: (\`string\`) The ID of the claim that the return belongs to,
      if available.

    - no\_notification: (\`boolean\`) Whether to send the customers notifications about
      return updates.

    - refund\_amount: (\`number\`) The amount that is to be refunded to the customer.

***

## updateInboundItem

This method updates an inbound (or return) item from an exchange using the ID of
the item's `RETURN_ITEM` action.

Every item has an `actions` property, whose value is an array of actions. You can
check the action's name using its `action` property, and use the value of the `id` property.

This method sends a request to the [Update Inbound Item](https://docs.medusajs.com/api/admin#exchanges_postexchangesidinbounditemsaction_id)
API route.

### Example

```ts
sdk.admin.exchange.updateInboundItem(
  "exchange_123", 
  "ordchact_123",
  {
    quantity: 1
  }
)
.then(({ return: returnData }) => {
  console.log(returnData)
})
```

### Parameters

- id: (\`string\`) The exchange's ID.
- actionId: (\`string\`) The id of the return item's \`RETURN\_ITEM\` action.
- body: (\[AdminUpdateExchangeInboundItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateExchangeInboundItem/page.mdx)) The details to update.

  - quantity: (\`number\`) The item's quantity.

  - reason\_id: (\`null\` \\| \`string\`) The ID of the associated return reason.

  - description: (\`string\`) The item's description.

  - internal\_note: (\`null\` \\| \`string\`) An internal note viewed by admin users only.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminExchangeReturnResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchangeReturnResponse/page.mdx)\&#62;) The details of the return associated with the exchange, with a preview of the order when the exchange is applied.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) A preview of the order when the exchange is confirmed.

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

  - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The return associated with the exchange.

    - items: (\[AdminReturnItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnItem/page.mdx)\[]) The return's items.

    - id: (\`string\`) The return's ID.

    - order\_id: (\`string\`) The ID of the order that the return belongs to.

    - order\_version: (\`number\`) The order's version once the return is applied.

    - display\_id: (\`number\`) The display ID of the return.

    - received\_at: (\`string\`) The date when the return was received.

    - created\_at: (\`string\`) The date when the return was created.

    - canceled\_at: (\`string\`) The date when the return was canceled.

    - status: (\[ReturnStatus]\(../../../../../order/types/order.ReturnStatus/page.mdx)) The return's status.

    - exchange\_id: (\`string\`) The ID of the exchange that the return belongs to,
      if available.

    - location\_id: (\`string\`) The ID of the stock location that the items are returned to.

    - claim\_id: (\`string\`) The ID of the claim that the return belongs to,
      if available.

    - no\_notification: (\`boolean\`) Whether to send the customers notifications about
      return updates.

    - refund\_amount: (\`number\`) The amount that is to be refunded to the customer.

***

## removeInboundItem

This method removes an inbound (or return) item from an exchange using the ID of the
item's `RETURN_ITEM` action.

Every item has an `actions` property, whose value is an array of actions.
You can check the action's name using its `action` property, and use the value of the `id` property.

This method sends a request to the [Remove Inbound Item](https://docs.medusajs.com/api/admin#exchanges_deleteexchangesidinbounditemsaction_id)
API route.

### Example

```ts
sdk.admin.exchange.removeInboundItem(
  "exchange_123", 
  "ordchact_123",
)
.then(({ return: returnData }) => {
  console.log(returnData)
})
```

### Parameters

- id: (\`string\`) The exchange's ID.
- actionId: (\`string\`) The id of the return item's \`RETURN\_ITEM\` action.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminExchangeReturnResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchangeReturnResponse/page.mdx)\&#62;) The details of the return associated with the exchange, with a preview of the order when the exchange is applied.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) A preview of the order when the exchange is confirmed.

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

  - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The return associated with the exchange.

    - items: (\[AdminReturnItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnItem/page.mdx)\[]) The return's items.

    - id: (\`string\`) The return's ID.

    - order\_id: (\`string\`) The ID of the order that the return belongs to.

    - order\_version: (\`number\`) The order's version once the return is applied.

    - display\_id: (\`number\`) The display ID of the return.

    - received\_at: (\`string\`) The date when the return was received.

    - created\_at: (\`string\`) The date when the return was created.

    - canceled\_at: (\`string\`) The date when the return was canceled.

    - status: (\[ReturnStatus]\(../../../../../order/types/order.ReturnStatus/page.mdx)) The return's status.

    - exchange\_id: (\`string\`) The ID of the exchange that the return belongs to,
      if available.

    - location\_id: (\`string\`) The ID of the stock location that the items are returned to.

    - claim\_id: (\`string\`) The ID of the claim that the return belongs to,
      if available.

    - no\_notification: (\`boolean\`) Whether to send the customers notifications about
      return updates.

    - refund\_amount: (\`number\`) The amount that is to be refunded to the customer.

***

## addInboundShipping

This method adds an inbound (or return) shipping method to an exchange.
The inbound shipping method will have a `SHIPPING_ADD` action.

This method sends a request to the [Add Inbound Shipping](https://docs.medusajs.com/api/admin#exchanges_postexchangesidinboundshippingmethod)
API route.

This method sends a request to the [Add Inbound Shipping](https://docs.medusajs.com/api/admin#exchanges_postexchangesidinboundshippingmethod)
API route.

### Example

```ts
sdk.admin.exchange.addInboundShipping("exchange_123", {
  shipping_option_id: "so_123"
})
.then(({ return: returnData }) => {
  console.log(returnData)
})
```

### Parameters

- id: (\`string\`) The exchange's ID.
- body: (\[AdminExchangeAddInboundShipping]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchangeAddInboundShipping/page.mdx)) The shipping method's details.

  - shipping\_option\_id: (\`string\`) The ID of the shipping option the method is created from.

  - custom\_amount: (\`number\`) A custom amount for the shipping method. If not specified,
    the shipping option's amount is used.

  - description: (\`string\`) The shipping method's description.

  - internal\_note: (\`string\`) An internal note viewed by admin users only.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminExchangeReturnResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchangeReturnResponse/page.mdx)\&#62;) The details of the return associated with the exchange, with a preview of the order when the exchange is applied.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) A preview of the order when the exchange is confirmed.

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

  - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The return associated with the exchange.

    - items: (\[AdminReturnItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnItem/page.mdx)\[]) The return's items.

    - id: (\`string\`) The return's ID.

    - order\_id: (\`string\`) The ID of the order that the return belongs to.

    - order\_version: (\`number\`) The order's version once the return is applied.

    - display\_id: (\`number\`) The display ID of the return.

    - received\_at: (\`string\`) The date when the return was received.

    - created\_at: (\`string\`) The date when the return was created.

    - canceled\_at: (\`string\`) The date when the return was canceled.

    - status: (\[ReturnStatus]\(../../../../../order/types/order.ReturnStatus/page.mdx)) The return's status.

    - exchange\_id: (\`string\`) The ID of the exchange that the return belongs to,
      if available.

    - location\_id: (\`string\`) The ID of the stock location that the items are returned to.

    - claim\_id: (\`string\`) The ID of the claim that the return belongs to,
      if available.

    - no\_notification: (\`boolean\`) Whether to send the customers notifications about
      return updates.

    - refund\_amount: (\`number\`) The amount that is to be refunded to the customer.

***

## updateInboundShipping

This method updates the shipping method for returning items in the exchange using the ID
of the method's `SHIPPING_ADD` action.

Every shipping method has an `actions` property, whose value is an array of actions.
You can check the action's name using its `action` property, and use the value of the `id` property.

This method sends a request to the [Update Inbound Shipping](https://docs.medusajs.com/api/admin#exchanges_postexchangesidinboundshippingmethodaction_id)
API route.

### Example

```ts
sdk.admin.exchange.updateInboundShipping(
  "exchange_123",
  "ordchact_123",
   {
    custom_amount: 10
  }
)
.then(({ return: returnData }) => {
  console.log(returnData)
})
```

### Parameters

- id: (\`string\`) The exchange's ID.
- actionId: (\`string\`) The id of the shipping method's \`SHIPPING\_ADD\` action.
- body: (\[AdminExchangeUpdateInboundShipping]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchangeUpdateInboundShipping/page.mdx)) The details to update.

  - custom\_amount: (\`null\` \\| \`number\`) A custom amount for the shipping method.

  - internal\_note: (\`string\`) An internal note viewed by admin users only.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminExchangeReturnResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchangeReturnResponse/page.mdx)\&#62;) The details of the return associated with the exchange, with a preview of the order when the exchange is applied.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) A preview of the order when the exchange is confirmed.

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

  - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The return associated with the exchange.

    - items: (\[AdminReturnItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnItem/page.mdx)\[]) The return's items.

    - id: (\`string\`) The return's ID.

    - order\_id: (\`string\`) The ID of the order that the return belongs to.

    - order\_version: (\`number\`) The order's version once the return is applied.

    - display\_id: (\`number\`) The display ID of the return.

    - received\_at: (\`string\`) The date when the return was received.

    - created\_at: (\`string\`) The date when the return was created.

    - canceled\_at: (\`string\`) The date when the return was canceled.

    - status: (\[ReturnStatus]\(../../../../../order/types/order.ReturnStatus/page.mdx)) The return's status.

    - exchange\_id: (\`string\`) The ID of the exchange that the return belongs to,
      if available.

    - location\_id: (\`string\`) The ID of the stock location that the items are returned to.

    - claim\_id: (\`string\`) The ID of the claim that the return belongs to,
      if available.

    - no\_notification: (\`boolean\`) Whether to send the customers notifications about
      return updates.

    - refund\_amount: (\`number\`) The amount that is to be refunded to the customer.

***

## deleteInboundShipping

This method removes the shipping method for returning items in the exchange using the ID
of the method's `SHIPPING_ADD` action.

Every shipping method has an `actions` property, whose value is an array of actions.
You can check the action's name using its `action` property, and use the value of the `id` property.

This method sends a request to the [Remove Inbound Shipping](https://docs.medusajs.com/api/admin#exchanges_deleteexchangesidinboundshippingmethodaction_id)
API route.

### Example

```ts
sdk.admin.exchange.deleteInboundShipping(
  "exchange_123",
  "ordchact_123",
)
.then(({ return: returnData }) => {
  console.log(returnData)
})
```

### Parameters

- id: (\`string\`) The exchange's ID.
- actionId: (\`string\`) The id of the shipping method's \`SHIPPING\_ADD\` action.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminExchangeReturnResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchangeReturnResponse/page.mdx)\&#62;) The details of the return associated with the exchange, with a preview of the order when the exchange is applied.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) A preview of the order when the exchange is confirmed.

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

  - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The return associated with the exchange.

    - items: (\[AdminReturnItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnItem/page.mdx)\[]) The return's items.

    - id: (\`string\`) The return's ID.

    - order\_id: (\`string\`) The ID of the order that the return belongs to.

    - order\_version: (\`number\`) The order's version once the return is applied.

    - display\_id: (\`number\`) The display ID of the return.

    - received\_at: (\`string\`) The date when the return was received.

    - created\_at: (\`string\`) The date when the return was created.

    - canceled\_at: (\`string\`) The date when the return was canceled.

    - status: (\[ReturnStatus]\(../../../../../order/types/order.ReturnStatus/page.mdx)) The return's status.

    - exchange\_id: (\`string\`) The ID of the exchange that the return belongs to,
      if available.

    - location\_id: (\`string\`) The ID of the stock location that the items are returned to.

    - claim\_id: (\`string\`) The ID of the claim that the return belongs to,
      if available.

    - no\_notification: (\`boolean\`) Whether to send the customers notifications about
      return updates.

    - refund\_amount: (\`number\`) The amount that is to be refunded to the customer.

***

## addOutboundItems

This method adds outbound (or new) items to an exchange.
These outbound items will have the action `ITEM_ADD`.

This method sends a request to the [Add Outbound Items](https://docs.medusajs.com/api/admin#exchanges_postexchangesidoutbounditems)
API route.

### Example

```ts
sdk.admin.exchange.addOutboundItems("exchange_123", {
  items: [{
    id: "variant_123",
    quantity: 1
  }]
})
.then(({ exchange }) => {
  console.log(exchange)
})
```

### Parameters

- id: (\`string\`) The exchange's ID.
- body: (\[AdminAddExchangeOutboundItems]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminAddExchangeOutboundItems/page.mdx)) The items to add.

  - items: (\`object\`\[]) The items to add to the exchange.

    - variant\_id: (\`string\`) The ID of the variant to add.

    - quantity: (\`number\`) The item's quantity.

    - unit\_price: (\`number\`) The item's unit price.

    - internal\_note: (\`string\`) An internal note viewed by admin users only.

    - allow\_backorder: (\`boolean\`) Whether to allow backorder for the item.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the exchange.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminExchangePreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchangePreviewResponse/page.mdx)\&#62;) The exchange's details with a preview of the order when the exchange is applied.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) The preview of the order when the exchange is applied.

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

  - exchange: (\[AdminExchange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchange/page.mdx)) The exchange's details.

    - id: (\`string\`) The exchange's ID.

    - order\_id: (\`string\`) The ID of the order this exchange is created for.

    - created\_at: (\`string\` \\| \`Date\`) The date the exchange was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the exchange was updated.

    - canceled\_at: (\`string\` \\| \`Date\`) The date the exchange was canceled.

    - deleted\_at: (\`string\` \\| \`Date\`) The date the exchange was deleted.

    - additional\_items: (\[BaseExchangeItem]\(../../../../../types/interfaces/types.BaseExchangeItem/page.mdx)\[]) The exchange's new (outbound) items.

    - return\_items: (\[AdminReturnItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnItem/page.mdx)\[]) The exchange's returned (inbound) items.

    - return\_id: (\`string\`) The ID of the associated return.

    - display\_id: (\`string\`) The exchange's display ID.

    - order\_version: (\`string\`) The version of the order when the exchange is applied.

    - created\_by: (\`string\`) The ID of the user that created the exchange.

    - no\_notification: (\`boolean\`) Whether to notify the customer about changes in the exchange.

    - difference\_due: (\`number\`) The exchange's difference amount due, either to the customer or the merchant.

      If the value is positive, the customer owes the merchant additional payment of this amount.
      If negative, the merchant owes the customer a refund of this amount.

    - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The associated return.

    - order: (\[BaseOrder]\(../../../../../types/interfaces/types.BaseOrder/page.mdx)) The associated order.

    - allow\_backorder: (\`boolean\`) Whether out-of-stock variants can be added as new items.

    - shipping\_methods: (\[BaseOrderShippingMethod]\(../../../../../types/interfaces/types.BaseOrderShippingMethod/page.mdx)\[]) The shipping methods used to send the outbound items.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The exchange's transactions.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## updateOutboundItem

This method updates an outbound (or new) item from an exchange using the ID
of the item's `ITEM_ADD` action.

Every item has an `actions` property, whose value is an array of actions.
You can check the action's name using its `action` property, and use the value of the `id` property.

This method sends a request to the [Update Inbound Item](https://docs.medusajs.com/api/admin#exchanges_postexchangesidoutbounditemsaction_id)
API route.

### Example

```ts
sdk.admin.exchange.updateOutboundItem(
  "exchange_123",
  "ordchact_123",
  {
    quantity: 1
  }
)
.then(({ exchange }) => {
  console.log(exchange)
})
```

### Parameters

- id: (\`string\`) The exchange's ID.
- actionId: (\`string\`) The id of the new exchange item's \`ITEM\_ADD\` action.
- body: (\[AdminUpdateExchangeOutboundItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateExchangeOutboundItem/page.mdx)) The item's details to update.

  - quantity: (\`number\`) The item's quantity.

  - internal\_note: (\`null\` \\| \`string\`) An internal note viewed by admin users only.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the exchange.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminExchangePreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchangePreviewResponse/page.mdx)\&#62;) The exchange's details with a preview of the order when the exchange is applied.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) The preview of the order when the exchange is applied.

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

  - exchange: (\[AdminExchange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchange/page.mdx)) The exchange's details.

    - id: (\`string\`) The exchange's ID.

    - order\_id: (\`string\`) The ID of the order this exchange is created for.

    - created\_at: (\`string\` \\| \`Date\`) The date the exchange was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the exchange was updated.

    - canceled\_at: (\`string\` \\| \`Date\`) The date the exchange was canceled.

    - deleted\_at: (\`string\` \\| \`Date\`) The date the exchange was deleted.

    - additional\_items: (\[BaseExchangeItem]\(../../../../../types/interfaces/types.BaseExchangeItem/page.mdx)\[]) The exchange's new (outbound) items.

    - return\_items: (\[AdminReturnItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnItem/page.mdx)\[]) The exchange's returned (inbound) items.

    - return\_id: (\`string\`) The ID of the associated return.

    - display\_id: (\`string\`) The exchange's display ID.

    - order\_version: (\`string\`) The version of the order when the exchange is applied.

    - created\_by: (\`string\`) The ID of the user that created the exchange.

    - no\_notification: (\`boolean\`) Whether to notify the customer about changes in the exchange.

    - difference\_due: (\`number\`) The exchange's difference amount due, either to the customer or the merchant.

      If the value is positive, the customer owes the merchant additional payment of this amount.
      If negative, the merchant owes the customer a refund of this amount.

    - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The associated return.

    - order: (\[BaseOrder]\(../../../../../types/interfaces/types.BaseOrder/page.mdx)) The associated order.

    - allow\_backorder: (\`boolean\`) Whether out-of-stock variants can be added as new items.

    - shipping\_methods: (\[BaseOrderShippingMethod]\(../../../../../types/interfaces/types.BaseOrderShippingMethod/page.mdx)\[]) The shipping methods used to send the outbound items.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The exchange's transactions.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## removeOutboundItem

This method removes an outbound (or new) item from an exchange using the ID
of the item's `ITEM_ADD` action.

Every item has an `actions` property, whose value is an array of actions.
You can check the action's name using its `action` property, and use the value of the `id` property.

This method sends a request to the [Update Outbound Item](https://docs.medusajs.com/api/admin#exchanges_deleteexchangesidoutbounditemsaction_id)
API route.

### Example

```ts
sdk.admin.exchange.removeOutboundItem(
  "exchange_123",
  "ordchact_123",
)
.then(({ exchange }) => {
  console.log(exchange)
})
```

### Parameters

- id: (\`string\`) The exchange's ID.
- actionId: (\`string\`) The id of the new exchange item's \`ITEM\_ADD\` action.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the exchange.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminExchangePreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchangePreviewResponse/page.mdx)\&#62;) The exchange's details with a preview of the order when the exchange is applied.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) The preview of the order when the exchange is applied.

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

  - exchange: (\[AdminExchange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchange/page.mdx)) The exchange's details.

    - id: (\`string\`) The exchange's ID.

    - order\_id: (\`string\`) The ID of the order this exchange is created for.

    - created\_at: (\`string\` \\| \`Date\`) The date the exchange was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the exchange was updated.

    - canceled\_at: (\`string\` \\| \`Date\`) The date the exchange was canceled.

    - deleted\_at: (\`string\` \\| \`Date\`) The date the exchange was deleted.

    - additional\_items: (\[BaseExchangeItem]\(../../../../../types/interfaces/types.BaseExchangeItem/page.mdx)\[]) The exchange's new (outbound) items.

    - return\_items: (\[AdminReturnItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnItem/page.mdx)\[]) The exchange's returned (inbound) items.

    - return\_id: (\`string\`) The ID of the associated return.

    - display\_id: (\`string\`) The exchange's display ID.

    - order\_version: (\`string\`) The version of the order when the exchange is applied.

    - created\_by: (\`string\`) The ID of the user that created the exchange.

    - no\_notification: (\`boolean\`) Whether to notify the customer about changes in the exchange.

    - difference\_due: (\`number\`) The exchange's difference amount due, either to the customer or the merchant.

      If the value is positive, the customer owes the merchant additional payment of this amount.
      If negative, the merchant owes the customer a refund of this amount.

    - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The associated return.

    - order: (\[BaseOrder]\(../../../../../types/interfaces/types.BaseOrder/page.mdx)) The associated order.

    - allow\_backorder: (\`boolean\`) Whether out-of-stock variants can be added as new items.

    - shipping\_methods: (\[BaseOrderShippingMethod]\(../../../../../types/interfaces/types.BaseOrderShippingMethod/page.mdx)\[]) The shipping methods used to send the outbound items.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The exchange's transactions.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## addOutboundShipping

This method adds an outbound shipping method to an exchange. The outbound shipping method
will have a `SHIPPING_ADD` action.

This method sends a request to the [Add Outbound Shipping](https://docs.medusajs.com/api/admin#exchanges_postexchangesidoutboundshippingmethod)
API route.

### Example

```ts
sdk.admin.exchange.addOutboundShipping("exchange_123", {
  shipping_option_id: "so_123"
})
.then(({ exchange }) => {
  console.log(exchange)
})
```

### Parameters

- id: (\`string\`) The exchange's ID.
- body: (\[AdminExchangeAddOutboundShipping]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchangeAddOutboundShipping/page.mdx)) The shipping method's details.

  - shipping\_option\_id: (\`string\`) The ID of the shipping option the method is created from.

  - custom\_amount: (\`number\`) A custom amount for the shipping method. If not specified,
    the shipping option's amount is used.

  - description: (\`string\`) The shipping method's description.

  - internal\_note: (\`string\`) An internal note viewed by admin users only.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the exchange.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminExchangePreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchangePreviewResponse/page.mdx)\&#62;) The exchange's details with a preview of the order when the exchange is applied.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) The preview of the order when the exchange is applied.

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

  - exchange: (\[AdminExchange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchange/page.mdx)) The exchange's details.

    - id: (\`string\`) The exchange's ID.

    - order\_id: (\`string\`) The ID of the order this exchange is created for.

    - created\_at: (\`string\` \\| \`Date\`) The date the exchange was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the exchange was updated.

    - canceled\_at: (\`string\` \\| \`Date\`) The date the exchange was canceled.

    - deleted\_at: (\`string\` \\| \`Date\`) The date the exchange was deleted.

    - additional\_items: (\[BaseExchangeItem]\(../../../../../types/interfaces/types.BaseExchangeItem/page.mdx)\[]) The exchange's new (outbound) items.

    - return\_items: (\[AdminReturnItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnItem/page.mdx)\[]) The exchange's returned (inbound) items.

    - return\_id: (\`string\`) The ID of the associated return.

    - display\_id: (\`string\`) The exchange's display ID.

    - order\_version: (\`string\`) The version of the order when the exchange is applied.

    - created\_by: (\`string\`) The ID of the user that created the exchange.

    - no\_notification: (\`boolean\`) Whether to notify the customer about changes in the exchange.

    - difference\_due: (\`number\`) The exchange's difference amount due, either to the customer or the merchant.

      If the value is positive, the customer owes the merchant additional payment of this amount.
      If negative, the merchant owes the customer a refund of this amount.

    - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The associated return.

    - order: (\[BaseOrder]\(../../../../../types/interfaces/types.BaseOrder/page.mdx)) The associated order.

    - allow\_backorder: (\`boolean\`) Whether out-of-stock variants can be added as new items.

    - shipping\_methods: (\[BaseOrderShippingMethod]\(../../../../../types/interfaces/types.BaseOrderShippingMethod/page.mdx)\[]) The shipping methods used to send the outbound items.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The exchange's transactions.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## updateOutboundShipping

This method updates the shipping method for delivering outbound items in the exchange using
the ID of the method's `SHIPPING_ADD` action.

Every shipping method has an `actions` property, whose value is an array of actions.
You can check the action's name using its `action` property, and use the value of the `id` property.

This method sends a request to the [Update Outbound Shipping](https://docs.medusajs.com/api/admin#exchanges_postexchangesidoutboundshippingmethodaction_id)
API route.

### Example

```ts
sdk.admin.exchange.updateOutboundShipping(
  "exchange_123",
  "ordchact_123",
  {
    custom_amount: 10
  }
)
.then(({ exchange }) => {
  console.log(exchange)
})
```

### Parameters

- id: (\`string\`) The exchange's ID.
- actionId: (\`string\`) The id of the shipping method's \`SHIPPING\_ADD\` action.
- body: (\[AdminExchangeUpdateOutboundShipping]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchangeUpdateOutboundShipping/page.mdx)) The details to update.

  - custom\_amount: (\`null\` \\| \`number\`) A custom amount for the shipping method.

  - internal\_note: (\`string\`) An internal note viewed by admin users only.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the exchange.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminExchangePreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchangePreviewResponse/page.mdx)\&#62;) The exchange's details with a preview of the order when the exchange is applied.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) The preview of the order when the exchange is applied.

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

  - exchange: (\[AdminExchange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchange/page.mdx)) The exchange's details.

    - id: (\`string\`) The exchange's ID.

    - order\_id: (\`string\`) The ID of the order this exchange is created for.

    - created\_at: (\`string\` \\| \`Date\`) The date the exchange was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the exchange was updated.

    - canceled\_at: (\`string\` \\| \`Date\`) The date the exchange was canceled.

    - deleted\_at: (\`string\` \\| \`Date\`) The date the exchange was deleted.

    - additional\_items: (\[BaseExchangeItem]\(../../../../../types/interfaces/types.BaseExchangeItem/page.mdx)\[]) The exchange's new (outbound) items.

    - return\_items: (\[AdminReturnItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnItem/page.mdx)\[]) The exchange's returned (inbound) items.

    - return\_id: (\`string\`) The ID of the associated return.

    - display\_id: (\`string\`) The exchange's display ID.

    - order\_version: (\`string\`) The version of the order when the exchange is applied.

    - created\_by: (\`string\`) The ID of the user that created the exchange.

    - no\_notification: (\`boolean\`) Whether to notify the customer about changes in the exchange.

    - difference\_due: (\`number\`) The exchange's difference amount due, either to the customer or the merchant.

      If the value is positive, the customer owes the merchant additional payment of this amount.
      If negative, the merchant owes the customer a refund of this amount.

    - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The associated return.

    - order: (\[BaseOrder]\(../../../../../types/interfaces/types.BaseOrder/page.mdx)) The associated order.

    - allow\_backorder: (\`boolean\`) Whether out-of-stock variants can be added as new items.

    - shipping\_methods: (\[BaseOrderShippingMethod]\(../../../../../types/interfaces/types.BaseOrderShippingMethod/page.mdx)\[]) The shipping methods used to send the outbound items.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The exchange's transactions.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## deleteOutboundShipping

This method removes the shipping method for delivering outbound items in the exchange using
the ID of the method's `SHIPPING_ADD` action.

Every shipping method has an `actions` property, whose value is an array of actions.
You can check the action's name using its `action` property, and use the value of the `id` property.

This method sends a request to the [Remove Outbound Shipping](https://docs.medusajs.com/api/admin#exchanges_deleteexchangesidoutboundshippingmethodaction_id)
API route.

### Example

```ts
sdk.admin.exchange.deleteOutboundShipping(
  "exchange_123",
  "ordchact_123",
)
.then(({ exchange }) => {
  console.log(exchange)
})
```

### Parameters

- id: (\`string\`) The exchange's ID.
- actionId: (\`string\`) The id of the shipping method's \`SHIPPING\_ADD\` action.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the exchange.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminExchangePreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchangePreviewResponse/page.mdx)\&#62;) The exchange's details with a preview of the order when the exchange is applied.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) The preview of the order when the exchange is applied.

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

  - exchange: (\[AdminExchange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchange/page.mdx)) The exchange's details.

    - id: (\`string\`) The exchange's ID.

    - order\_id: (\`string\`) The ID of the order this exchange is created for.

    - created\_at: (\`string\` \\| \`Date\`) The date the exchange was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the exchange was updated.

    - canceled\_at: (\`string\` \\| \`Date\`) The date the exchange was canceled.

    - deleted\_at: (\`string\` \\| \`Date\`) The date the exchange was deleted.

    - additional\_items: (\[BaseExchangeItem]\(../../../../../types/interfaces/types.BaseExchangeItem/page.mdx)\[]) The exchange's new (outbound) items.

    - return\_items: (\[AdminReturnItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnItem/page.mdx)\[]) The exchange's returned (inbound) items.

    - return\_id: (\`string\`) The ID of the associated return.

    - display\_id: (\`string\`) The exchange's display ID.

    - order\_version: (\`string\`) The version of the order when the exchange is applied.

    - created\_by: (\`string\`) The ID of the user that created the exchange.

    - no\_notification: (\`boolean\`) Whether to notify the customer about changes in the exchange.

    - difference\_due: (\`number\`) The exchange's difference amount due, either to the customer or the merchant.

      If the value is positive, the customer owes the merchant additional payment of this amount.
      If negative, the merchant owes the customer a refund of this amount.

    - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The associated return.

    - order: (\[BaseOrder]\(../../../../../types/interfaces/types.BaseOrder/page.mdx)) The associated order.

    - allow\_backorder: (\`boolean\`) Whether out-of-stock variants can be added as new items.

    - shipping\_methods: (\[BaseOrderShippingMethod]\(../../../../../types/interfaces/types.BaseOrderShippingMethod/page.mdx)\[]) The shipping methods used to send the outbound items.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The exchange's transactions.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## request

This method confirms an exchange request, applying its changes on the associated order.

This method sends a request to the [Confirm Exchange](https://docs.medusajs.com/api/admin#exchanges_postexchangesidrequest)
API route.

### Example

```ts
sdk.admin.exchange.request("exchange_123", {})
.then(({ exchange }) => {
  console.log(exchange)
})
```

### Parameters

- id: (\`string\`) The exchange's ID.
- body: (\[AdminRequestExchange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRequestExchange/page.mdx)) The confirmation's details.

  - no\_notification: (\`boolean\`) Whether to send the customer a notification.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the exchange.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminExchangeRequestResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchangeRequestResponse/page.mdx)\&#62;) The exchange and associated return's details with a preview of the order when the exchange is applied.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) The preview of the order when the exchange is applied.

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

  - exchange: (\[AdminExchange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchange/page.mdx)) The exchange's details.

    - id: (\`string\`) The exchange's ID.

    - order\_id: (\`string\`) The ID of the order this exchange is created for.

    - created\_at: (\`string\` \\| \`Date\`) The date the exchange was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the exchange was updated.

    - canceled\_at: (\`string\` \\| \`Date\`) The date the exchange was canceled.

    - deleted\_at: (\`string\` \\| \`Date\`) The date the exchange was deleted.

    - additional\_items: (\[BaseExchangeItem]\(../../../../../types/interfaces/types.BaseExchangeItem/page.mdx)\[]) The exchange's new (outbound) items.

    - return\_items: (\[AdminReturnItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnItem/page.mdx)\[]) The exchange's returned (inbound) items.

    - return\_id: (\`string\`) The ID of the associated return.

    - display\_id: (\`string\`) The exchange's display ID.

    - order\_version: (\`string\`) The version of the order when the exchange is applied.

    - created\_by: (\`string\`) The ID of the user that created the exchange.

    - no\_notification: (\`boolean\`) Whether to notify the customer about changes in the exchange.

    - difference\_due: (\`number\`) The exchange's difference amount due, either to the customer or the merchant.

      If the value is positive, the customer owes the merchant additional payment of this amount.
      If negative, the merchant owes the customer a refund of this amount.

    - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The associated return.

    - order: (\[BaseOrder]\(../../../../../types/interfaces/types.BaseOrder/page.mdx)) The associated order.

    - allow\_backorder: (\`boolean\`) Whether out-of-stock variants can be added as new items.

    - shipping\_methods: (\[BaseOrderShippingMethod]\(../../../../../types/interfaces/types.BaseOrderShippingMethod/page.mdx)\[]) The shipping methods used to send the outbound items.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The exchange's transactions.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

  - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The return associated with the exchange.

    - items: (\[AdminReturnItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnItem/page.mdx)\[]) The return's items.

    - id: (\`string\`) The return's ID.

    - order\_id: (\`string\`) The ID of the order that the return belongs to.

    - order\_version: (\`number\`) The order's version once the return is applied.

    - display\_id: (\`number\`) The display ID of the return.

    - received\_at: (\`string\`) The date when the return was received.

    - created\_at: (\`string\`) The date when the return was created.

    - canceled\_at: (\`string\`) The date when the return was canceled.

    - status: (\[ReturnStatus]\(../../../../../order/types/order.ReturnStatus/page.mdx)) The return's status.

    - exchange\_id: (\`string\`) The ID of the exchange that the return belongs to,
      if available.

    - location\_id: (\`string\`) The ID of the stock location that the items are returned to.

    - claim\_id: (\`string\`) The ID of the claim that the return belongs to,
      if available.

    - no\_notification: (\`boolean\`) Whether to send the customers notifications about
      return updates.

    - refund\_amount: (\`number\`) The amount that is to be refunded to the customer.

***

## cancelRequest

This method cancels an exchange request. It sends a request to the
[Cancel Exchange Request](https://docs.medusajs.com/api/admin#exchanges_deleteexchangesidrequest)
API route.

### Example

```ts
sdk.admin.exchange.cancel("exchange_123")
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- id: (\`string\`) The exchange's ID.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the exchange.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminExchangeDeleteResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchangeDeleteResponse/page.mdx)\&#62;) The cancelation's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (\`"exchange"\`) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.
