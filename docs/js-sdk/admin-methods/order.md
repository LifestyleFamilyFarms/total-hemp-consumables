# order - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.order` set of methods used to send requests to Medusa's Admin API routes.

## retrieve

This method retrieves an order by its ID. It sends a request to the
[Get Order](https://docs.medusajs.com/api/admin#orders_getordersid)
API route.

### Example

To retrieve an order by its ID:

```ts
sdk.admin.order.retrieve("order_123")
.then(({ order }) => {
  console.log(order)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.order.retrieve("order_123", {
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
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

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

## update

This method updates an order. It sends a request to the
[Update Order Email](https://docs.medusajs.com/api/admin#orders_postordersid)
API route.

### Example

```ts
sdk.admin.order.update(
  "order_123",
  {
    email: "new_email@example.com",
    shipping_address: {
      first_name: "John",
      last_name: "Doe",
      address_1: "123 Main St",
    }
  }
)
.then(({ order }) => {
  console.log(order)
})
```

### Parameters

- id: (\`string\`) The order's ID.
- body: (\[AdminUpdateOrder]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateOrder/page.mdx)) The update details.

  - email: (\`string\`) The order's email.

  - shipping\_address: (\[OrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.OrderAddress/page.mdx)) The order's shipping address.

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

  - billing\_address: (\[OrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.OrderAddress/page.mdx)) The order's billing address.

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

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) The order's metadata.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

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

## retrievePreview

This method retrieves the preview of an order based on its last associated change. It sends a request to the
[Get Order Preview](https://docs.medusajs.com/api/admin#orders_getordersidpreview) API route.

### Example

```ts
sdk.admin.order.retrievePreview("order_123")
.then(({ order }) => {
  console.log(order)
})
```

### Parameters

- id: (\`string\`) The order's ID.
- query: (\[AdminOrderFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFilters/page.mdx)) Query parameters.

  - $and: ((\[BaseOrderFilters]\(../../../../../types/interfaces/types.BaseOrderFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseOrderFilters]\(../../../../../types/interfaces/types.BaseOrderFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[BaseOrderFilters]\(../../../../../types/interfaces/types.BaseOrderFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseOrderFilters]\(../../../../../types/interfaces/types.BaseOrderFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[BaseOrderFilters]\(../../../../../types/interfaces/types.BaseOrderFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseOrderFilters]\(../../../../../types/interfaces/types.BaseOrderFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by order ID(s).

    - status: (\[OrderStatus]\(../../../../../fulfillment/types/fulfillment.OrderStatus/page.mdx) \\| \[OrderStatus]\(../../../../../fulfillment/types/fulfillment.OrderStatus/page.mdx)\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;OrderStatus | OrderStatus\[]\&#62;) Filter by status(es).

  - $or: ((\[BaseOrderFilters]\(../../../../../types/interfaces/types.BaseOrderFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseOrderFilters]\(../../../../../types/interfaces/types.BaseOrderFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[BaseOrderFilters]\(../../../../../types/interfaces/types.BaseOrderFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseOrderFilters]\(../../../../../types/interfaces/types.BaseOrderFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[BaseOrderFilters]\(../../../../../types/interfaces/types.BaseOrderFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseOrderFilters]\(../../../../../types/interfaces/types.BaseOrderFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by order ID(s).

    - status: (\[OrderStatus]\(../../../../../fulfillment/types/fulfillment.OrderStatus/page.mdx) \\| \[OrderStatus]\(../../../../../fulfillment/types/fulfillment.OrderStatus/page.mdx)\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;OrderStatus | OrderStatus\[]\&#62;) Filter by status(es).

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - id: (\`string\` \\| \`string\`\[]) Filter by order ID(s).

  - sales\_channel\_id: (\`string\`\[]) Filter by sales channel IDs to retrieve their associated orders.

  - region\_id: (\`string\` \\| \`string\`\[]) Filter by region IDs to retrieve their associated orders.

  - customer\_id: (\`string\` \\| \`string\`\[]) Filter by customer IDs to retrieve their associated orders.

  - q: (\`string\`) Query or keywords to filter the order's searchable fields.

  - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the fulfillment's creation date.

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

  - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the fulfillment's update date.

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

  - status: (\[OrderStatus]\(../../../../../fulfillment/types/fulfillment.OrderStatus/page.mdx) \\| \[OrderStatus]\(../../../../../fulfillment/types/fulfillment.OrderStatus/page.mdx)\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;OrderStatus | OrderStatus\[]\&#62;) Filter by status(es).

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
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminOrderPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreviewResponse/page.mdx)\&#62;) The order preview's details.

  - order: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) A preview of the order if the latest change, such as exchange, return, edit, or claim is applied on it.

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

## list

This method retrieves a paginated list of orders. It sends a request to the
[List Orders](https://docs.medusajs.com/api/admin#orders_getorders) API route.

### Example

To retrieve the list of orders:

```ts
sdk.admin.order.list()
.then(({ orders, count, limit, offset }) => {
  console.log(orders)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.order.list({
  limit: 10,
  offset: 10
})
.then(({ orders, count, limit, offset }) => {
  console.log(orders)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each order:

```ts
sdk.admin.order.list({
  fields: "id,*items"
})
.then(({ orders, count, limit, offset }) => {
  console.log(orders)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- queryParams: (\[AdminOrderFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFilters/page.mdx)) Filters and pagination configurations.

  - $and: ((\[BaseOrderFilters]\(../../../../../types/interfaces/types.BaseOrderFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseOrderFilters]\(../../../../../types/interfaces/types.BaseOrderFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[BaseOrderFilters]\(../../../../../types/interfaces/types.BaseOrderFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseOrderFilters]\(../../../../../types/interfaces/types.BaseOrderFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[BaseOrderFilters]\(../../../../../types/interfaces/types.BaseOrderFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseOrderFilters]\(../../../../../types/interfaces/types.BaseOrderFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by order ID(s).

    - status: (\[OrderStatus]\(../../../../../fulfillment/types/fulfillment.OrderStatus/page.mdx) \\| \[OrderStatus]\(../../../../../fulfillment/types/fulfillment.OrderStatus/page.mdx)\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;OrderStatus | OrderStatus\[]\&#62;) Filter by status(es).

  - $or: ((\[BaseOrderFilters]\(../../../../../types/interfaces/types.BaseOrderFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseOrderFilters]\(../../../../../types/interfaces/types.BaseOrderFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[BaseOrderFilters]\(../../../../../types/interfaces/types.BaseOrderFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseOrderFilters]\(../../../../../types/interfaces/types.BaseOrderFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[BaseOrderFilters]\(../../../../../types/interfaces/types.BaseOrderFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseOrderFilters]\(../../../../../types/interfaces/types.BaseOrderFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by order ID(s).

    - status: (\[OrderStatus]\(../../../../../fulfillment/types/fulfillment.OrderStatus/page.mdx) \\| \[OrderStatus]\(../../../../../fulfillment/types/fulfillment.OrderStatus/page.mdx)\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;OrderStatus | OrderStatus\[]\&#62;) Filter by status(es).

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - id: (\`string\` \\| \`string\`\[]) Filter by order ID(s).

  - sales\_channel\_id: (\`string\`\[]) Filter by sales channel IDs to retrieve their associated orders.

  - region\_id: (\`string\` \\| \`string\`\[]) Filter by region IDs to retrieve their associated orders.

  - customer\_id: (\`string\` \\| \`string\`\[]) Filter by customer IDs to retrieve their associated orders.

  - q: (\`string\`) Query or keywords to filter the order's searchable fields.

  - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the fulfillment's creation date.

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

  - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the fulfillment's update date.

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

  - status: (\[OrderStatus]\(../../../../../fulfillment/types/fulfillment.OrderStatus/page.mdx) \\| \[OrderStatus]\(../../../../../fulfillment/types/fulfillment.OrderStatus/page.mdx)\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;OrderStatus | OrderStatus\[]\&#62;) Filter by status(es).

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

- Promise: (Promise\&#60;\[AdminOrderListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminOrderListResponse/page.mdx)\&#62;) The paginated list of orders.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## archive

This method archives an order. It sends a request to the
[Archive Order](https://docs.medusajs.com/api/admin#orders_postordersidarchive)
API route.

### Example

```ts
sdk.admin.order.archive("order_123")
.then(({ order }) => {
  console.log(order)
})
```

### Parameters

- id: (\`string\`) The order's ID.
- queryParams: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the order.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

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

## cancel

This method cancels an order. It sends a request to the
[Cancel Order](https://docs.medusajs.com/api/admin#orders_postordersidcancel)
API route.

### Example

```ts
sdk.admin.order.cancel("order_123")
.then(({ order }) => {
  console.log(order)
})
```

### Parameters

- id: (\`string\`) The order's ID.
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

## complete

This method completes an order. It sends a request to the
[Complete Order](https://docs.medusajs.com/api/admin#orders_postordersidcomplete)
API route.

### Example

```ts
sdk.admin.order.complete("order_123")
.then(({ order }) => {
  console.log(order)
})
```

### Parameters

- id: (\`string\`) The order's ID.
- body: (\[AdditionalData]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdditionalData/page.mdx))

  - additional\_data: (\`Record\<string, unknown>\`) Additional data that can be passed through the \`additional\_data\` property in HTTP requests.

    Learn more in \[this documentation]\(https://docs.medusajs.com/learn/fundamentals/api-routes/additional-data).
- queryParams: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx))

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

## requestTransfer

This method requests an order transfer. It sends a request to the
[Request Order Transfer](https://docs.medusajs.com/api/admin#orders_postordersidrequesttransfer)
API route.

### Example

```ts
sdk.admin.order.requestTransfer("order_123", {
  customer_id: "cus_123",
  internal_note: "Internal note",
})
.then(({ order }) => {
  console.log(order)
})
```

### Parameters

- id: (\`string\`) The order's ID.
- body: (\[AdminRequestOrderTransfer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRequestOrderTransfer/page.mdx)) The transfer's details - the id of the next owner.

  - customer\_id: (\`string\`) The ID of the customer to transfer the order to.

  - internal\_note: (\`string\`) An internal note viewed by admins only.

  - description: (\`string\`) A description for the transfer request.
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

## cancelTransfer

This method cancels an order transfer request. It sends a request to the
[Cancel Order Transfer Request](https://docs.medusajs.com/api/admin#orders_postordersidcanceltransferrequest)
API route.

### Example

```ts
sdk.admin.order.cancelTransfer("order_123")
.then(({ order }) => {
  console.log(order)
})
```

### Parameters

- id: (\`string\`) The order's ID.
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

## createFulfillment

This method creates a fulfillment for an order. It sends a request to the
[Create Fulfillment](https://docs.medusajs.com/api/admin#orders_postordersidfulfillments)
API route.

### Example

```ts
sdk.admin.order.createFulfillment("order_123", {
  items: [
    {
      id: "orli_123",
      quantity: 1
    }
  ]
})
.then(({ order }) => {
  console.log(order)
})
```

### Parameters

- id: (\`string\`) The order's ID.
- body: (\[AdminCreateOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateOrderFulfillment/page.mdx)) The fulfillment's details.

  - items: (\`object\`\[]) The items to add to the fulfillment.

    - id: (\`string\`) The order item's ID.

    - quantity: (\`number\`) The quantity to fulfill.

  - location\_id: (\`string\`) The ID of the stock location
    to fulfill the items from.

  - shipping\_option\_id: (\`string\`) The ID of the shipping option to use for the fulfillment.
    Overrides the shipping option selected by the customer.

  - no\_notification: (\`boolean\`) Whether to notify the customer about this change.

  - metadata: (\`Record\<string, any>\`) Key-value pairs of custom data.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the order.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

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

## cancelFulfillment

This method cancels an order's fulfillment. It sends a request to the
[Cancel Fulfillment](https://docs.medusajs.com/api/admin#orders_postordersidfulfillmentsfulfillment_idcancel)
API route.

### Example

```ts
sdk.admin.order.cancelFulfillment(
  "order_123",
  "ful_123",
  {
    no_notification: false
  }
)
.then(({ order }) => {
  console.log(order)
})
```

### Parameters

- id: (\`string\`) The order's ID.
- fulfillmentId: (\`string\`) The ID of the fulfillment to cancel.
- body: (\[AdminCancelOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCancelOrderFulfillment/page.mdx)) The cancelation's details.

  - no\_notification: (\`boolean\`) Whether to notify the customer about this change.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

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

## createShipment

This method creates a shipment for an order's fulfillment. It sends a request to the
[Create Shipment](https://docs.medusajs.com/api/admin#orders_postordersidfulfillmentsfulfillment_idshipments)
API route.

### Example

```ts
sdk.admin.order.createShipment(
  "order_123",
  "ful_123",
  {
    items: [
      {
        id: "fulit_123",
        quantity: 1
      }
    ]
  }
)
.then(({ order }) => {
  console.log(order)
})
```

### Parameters

- id: (\`string\`) The order's ID.
- fulfillmentId: (\`string\`) The ID of the fulfillment.
- body: (\[AdminCreateOrderShipment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateOrderShipment/page.mdx)) The shipment's details.

  - items: (\`object\`\[]) The fulfillment items to create a shipment for.

    - id: (\`string\`) The item's ID.

    - quantity: (\`number\`) The quantity to ship.

  - labels: (\`object\`\[]) The shipment's labels.

    - tracking\_number: (\`string\`) The label's tracking number.

    - tracking\_url: (\`string\`) The label's tracking URL.

    - label\_url: (\`string\`) The label's URL.

  - no\_notification: (\`boolean\`) Whether to notify the customer about this change.

  - metadata: (\`Record\<string, any>\`) Key-value pairs of custom data.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the order.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

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

## markAsDelivered

This method marks an order's fulfillment as delivered. It sends a request to the
[Mark Delivered ](https://docs.medusajs.com/api/admin#orders_postordersidfulfillmentsfulfillment_idmarkasdelivered)
API route.

### Example

```ts
sdk.admin.order.markAsDelivered(
  "order_123",
  "ful_123",
)
.then(({ order }) => {
  console.log(order)
})
```

### Parameters

- id: (\`string\`) The order's ID.
- fulfillmentId: (\`string\`) The fulfillment's ID.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the order.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

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

## listShippingOptions

This method retrieves a list of shipping options for an order based on the order's shipping address.

This method sends a request to the [List Shipping Options](https://docs.medusajs.com/api/admin#orders_getordersidshipping-options)
API route.

### Example

```ts
sdk.admin.order.listShippingOptions("order_123")
.then(({ shipping_options }) => {
  console.log(shipping_options)
})
```

### Parameters

- id: (\`string\`) The order's ID.
- queryParams: (\[FindParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.FindParams/page.mdx) & \[AdminGetOrderShippingOptionList]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetOrderShippingOptionList/page.mdx)) Configure the fields to retrieve in each shipping option.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;object\&#62;) The list of shipping options.

  - shipping\_options: (\[AdminShippingOption]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOption/page.mdx)\[])

    - id: (\`string\`) The shipping option's ID.

    - name: (\`string\`) The shipping option's name. Customers can
      see this name during checkout.

    - price\_type: (\[ShippingOptionPriceType]\(../../../../../fulfillment/types/fulfillment.ShippingOptionPriceType/page.mdx)) The type of shipping option's price.

    - service\_zone\_id: (\`string\`) The ID of the service zone that the shipping option belongs to.

      Learn more in the \[Shipping Options]\(https://docs.medusajs.com/resources/commerce-modules/fulfillment/shipping-option#service-zone-restrictions)
      documentation.

    - service\_zone: (\[AdminServiceZone]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminServiceZone/page.mdx)) The service zone that the shipping option belongs to.

      Learn more in the \[Shipping Options]\(https://docs.medusajs.com/resources/commerce-modules/fulfillment/shipping-option#service-zone-restrictions)
      documentation.

    - provider\_id: (\`string\`) The ID of the fulfillment provider that the shipping option belongs to.

    - provider: (\[AdminFulfillmentProvider]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentProvider/page.mdx)) The fulfillment provider that the shipping option belongs to.

    - shipping\_option\_type\_id: (\`null\` \\| \`string\`) The ID of the shipping option's type.

      Learn more in the \[Shipping Options]\(https://docs.medusajs.com/resources/commerce-modules/fulfillment/shipping-option#shipping-profile-and-types)
      documentation.

    - type: (\[AdminShippingOptionType]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOptionType/page.mdx)) The shipping option's type.

      Learn more in the \[Shipping Options]\(https://docs.medusajs.com/resources/commerce-modules/fulfillment/shipping-option#shipping-profile-and-types)
      documentation.

    - shipping\_profile\_id: (\`string\`) The ID of the shipping profile that the shipping option belongs to.

      Learn more in the \[Shipping Options]\(https://docs.medusajs.com/resources/commerce-modules/fulfillment/shipping-option#shipping-profile-and-types)
      documentation.

    - shipping\_profile: (\[AdminShippingProfile]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingProfile/page.mdx)) The shipping profile that the shipping option belongs to.

      Learn more in the \[Shipping Options]\(https://docs.medusajs.com/resources/commerce-modules/fulfillment/shipping-option#shipping-profile-and-types)
      documentation.

    - rules: (\[AdminShippingOptionRule]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOptionRule/page.mdx)\[]) The rules of the shipping option.

      Learn more in the \[Shipping Option Rules]\(https://docs.medusajs.com/resources/commerce-modules/fulfillment/shipping-option#shipping-option-rules)
      documentation.

    - prices: (\[AdminShippingOptionPrice]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOptionPrice/page.mdx)\[]) The prices of the shipping option.

    - data: (\`null\` \\| \`Record\<string, unknown>\`) Additional data that is useful for third-party fulfillment providers
      that process fulfillments for the shipping option.

      Learn more in the \[Shipping Options]\(https://docs.medusajs.com/resources/commerce-modules/fulfillment/shipping-option#data-property)
      documentation.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Custom key-value pairs that can be added to the shipping option.

    - created\_at: (\`Date\`) The date when the shipping option was created.

    - updated\_at: (\`Date\`) The date when the shipping option was updated.

    - deleted\_at: (\`null\` \\| \`Date\`) The date when the shipping option was deleted.

***

## listChanges

This method retrieves a list of changes made on an order, including returns, exchanges, etc...

This method sends a request to the [List Changes](https://docs.medusajs.com/api/admin#orders_getordersidchanges)
API route.

### Example

```ts
sdk.admin.order.listChanges("order_123")
.then(({ order_changes }) => {
  console.log(order_changes)
})
```

### Parameters

- id: (\`string\`) The order's ID.
- queryParams: (\[FindParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.FindParams/page.mdx) & \[AdminOrderChangesFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChangesFilters/page.mdx)) Configure the fields to retrieve in each order change.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - $and: ((\[BaseOrderChangesFilters]\(../../../../../types/interfaces/types.BaseOrderChangesFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseOrderChangesFilters]\(../../../../../types/interfaces/types.BaseOrderChangesFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[BaseOrderChangesFilters]\(../../../../../types/interfaces/types.BaseOrderChangesFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseOrderChangesFilters]\(../../../../../types/interfaces/types.BaseOrderChangesFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[BaseOrderChangesFilters]\(../../../../../types/interfaces/types.BaseOrderChangesFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseOrderChangesFilters]\(../../../../../types/interfaces/types.BaseOrderChangesFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by order change ID(s).

    - status: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by status(es).

    - change\_type: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by order change type, such as \`return\`, \`exchange\`, \`edit\`, or \`claim\`.

  - $or: ((\[BaseOrderChangesFilters]\(../../../../../types/interfaces/types.BaseOrderChangesFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseOrderChangesFilters]\(../../../../../types/interfaces/types.BaseOrderChangesFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[BaseOrderChangesFilters]\(../../../../../types/interfaces/types.BaseOrderChangesFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseOrderChangesFilters]\(../../../../../types/interfaces/types.BaseOrderChangesFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[BaseOrderChangesFilters]\(../../../../../types/interfaces/types.BaseOrderChangesFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseOrderChangesFilters]\(../../../../../types/interfaces/types.BaseOrderChangesFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by order change ID(s).

    - status: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by status(es).

    - change\_type: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by order change type, such as \`return\`, \`exchange\`, \`edit\`, or \`claim\`.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the change's creation date.

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

  - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the change's update date.

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

  - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the change's deletion date.

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

  - id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by order change ID(s).

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

  - status: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by status(es).

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

  - change\_type: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by order change type, such as \`return\`, \`exchange\`, \`edit\`, or \`claim\`.

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
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[PaginatedResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.PaginatedResponse/page.mdx)\&#60;\[AdminOrderChangesResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChangesResponse/page.mdx)\&#62;\&#62;) The list of order changes.

***

## listLineItems

This method retrieves the order's line items. It sends a request to the
[List Line Items](https://docs.medusajs.com/api/admin#orders_getordersidlineitems)
API routes.

### Example

```ts
sdk.admin.order.listLineItems("order_123")
.then(({ order_items }) => {
  console.log(order_items)
})
```

### Parameters

- id: (\`string\`) The order's ID.
- queryParams: (\[FindParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.FindParams/page.mdx) & \[AdminOrderItemsFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderItemsFilters/page.mdx)) Configure the fields to retrieve in each line item.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - id: (\`string\` \\| \`string\`\[]) Filter by order item ID(s).

  - item\_id: (\`string\` \\| \`string\`\[]) Filter by the associated line item ID(s).

  - version: (\`number\` \\| \`number\`\[]) Filter by order version(s).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminOrderLineItemsListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminOrderLineItemsListResponse/page.mdx)\&#62;) The list of line items.

  - order\_items: (\[AdminOrderItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderItem/page.mdx)\[]) The list of order items.

    - order\_id: (\`string\`) The ID of the order that the item belongs to.

    - item\_id: (\`string\`) The ID of the associated line item.

    - version: (\`number\`) The order version that the item belongs to.

    - history: (\`object\`) The item's history details.

    - item: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx)) The associated line item's details.

***

## createCreditLine

This method creates a credit line for an order. It sends a request to the
[Create Credit Line](https://docs.medusajs.com/api/admin#orders_postordersidcredit-lines) API route.

### Example

```ts
sdk.admin.order.createCreditLine(
  "order_123",
  {
    amount: 100,
    reference: "order",
    reference_id: "order_123",
  }
)
.then(({ order }) => {
  console.log(order)
})
```

### Parameters

- orderId: (\`string\`) The order's ID.
- body: (Omit\&#60;\[CreateOrderCreditLineDTO]\(../../../../../order/interfaces/order.CreateOrderCreditLineDTO/page.mdx), "order\_id"\&#62;) The credit line's details.

  - amount: (\[BigNumberInput]\(../../../../../order/types/order.BigNumberInput/page.mdx)) The amount of the credit line.

    - value: (\`string\` \\| \`number\`)

    - numeric: (\`number\`)

    - raw: (\[BigNumberRawValue]\(../../../../../order/types/order.BigNumberRawValue/page.mdx))

    - bigNumber: (\`BigNumber\`)

  - reference: (\`null\` \\| \`string\`) The reference model name that the credit line is generated from

  - reference\_id: (\`null\` \\| \`string\`) The reference model id that the credit line is generated from

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) The metadata of the order detail
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the order.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

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

## updateOrderChange

This method updates an order change. It sends a request to the
[Update Order Change](https://docs.medusajs.com/api/admin#order-changes_postorder-changesid)
API route.

:::note

This is available starting from [Medusa v2.12.0](https://github.com/medusajs/medusa/releases/tag/v2.12.0).

:::

### Example

```ts
sdk.admin.order.updateOrderChange(
  "ordch_123",
  {
    carry_over_promotions: true
  }
)
.then(({ order_change }) => {
  console.log(order_change)
})
```

### Parameters

- id: (\`string\`) The order change's ID.
- body: (\[AdminUpdateOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateOrderChange/page.mdx)) The update details.

  - carry\_over\_promotions: (\`boolean\`) Whether to carry over promotions to outbound exchange items.
- query: (\[AdminOrderChangesFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChangesFilters/page.mdx)) Configure the fields to retrieve in the order change.

  - $and: ((\[BaseOrderChangesFilters]\(../../../../../types/interfaces/types.BaseOrderChangesFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseOrderChangesFilters]\(../../../../../types/interfaces/types.BaseOrderChangesFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[BaseOrderChangesFilters]\(../../../../../types/interfaces/types.BaseOrderChangesFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseOrderChangesFilters]\(../../../../../types/interfaces/types.BaseOrderChangesFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[BaseOrderChangesFilters]\(../../../../../types/interfaces/types.BaseOrderChangesFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseOrderChangesFilters]\(../../../../../types/interfaces/types.BaseOrderChangesFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by order change ID(s).

    - status: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by status(es).

    - change\_type: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by order change type, such as \`return\`, \`exchange\`, \`edit\`, or \`claim\`.

  - $or: ((\[BaseOrderChangesFilters]\(../../../../../types/interfaces/types.BaseOrderChangesFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseOrderChangesFilters]\(../../../../../types/interfaces/types.BaseOrderChangesFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[BaseOrderChangesFilters]\(../../../../../types/interfaces/types.BaseOrderChangesFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseOrderChangesFilters]\(../../../../../types/interfaces/types.BaseOrderChangesFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[BaseOrderChangesFilters]\(../../../../../types/interfaces/types.BaseOrderChangesFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseOrderChangesFilters]\(../../../../../types/interfaces/types.BaseOrderChangesFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by order change ID(s).

    - status: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by status(es).

    - change\_type: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by order change type, such as \`return\`, \`exchange\`, \`edit\`, or \`claim\`.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the change's creation date.

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

  - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the change's update date.

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

  - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the change's deletion date.

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

  - id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by order change ID(s).

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

  - status: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by status(es).

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

  - change\_type: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by order change type, such as \`return\`, \`exchange\`, \`edit\`, or \`claim\`.

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
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminOrderChangeResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChangeResponse/page.mdx)\&#62;) The order change's details.

  - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The order change's details.

    - order: (\[AdminOrder]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrder/page.mdx)) The order's details.

    - claim: (\[AdminClaim]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaim/page.mdx)) The claim's details.

    - return\_order: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The return's details.

    - exchange: (\[AdminExchange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminExchange/page.mdx)) The exchange's details.

    - actions: (\[AdminOrderChangeAction]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChangeAction/page.mdx)\[]) The order change action's details.

    - id: (\`string\`) The ID of the order change

    - version: (\`number\`) The version of the order change

    - order\_id: (\`string\`) The ID of the associated order

    - return\_id: (\`string\`) The ID of the associated return order

    - exchange\_id: (\`string\`) The ID of the associated exchange order

    - claim\_id: (\`string\`) The ID of the associated claim order

    - status: (\[OrderChangeStatus]\(../../../../../fulfillment/types/fulfillment.OrderChangeStatus/page.mdx)) The status of the order change

    - requested\_by: (\`null\` \\| \`string\`) The requested by of the order change

    - requested\_at: (\`null\` \\| \`Date\`) When the order change was requested

    - confirmed\_by: (\`null\` \\| \`string\`) The confirmed by of the order change

    - confirmed\_at: (\`null\` \\| \`Date\`) When the order change was confirmed

    - declined\_by: (\`null\` \\| \`string\`) The declined by of the order change

    - declined\_reason: (\`null\` \\| \`string\`) The declined reason of the order change

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) The metadata of the order change

    - declined\_at: (\`null\` \\| \`Date\`) When the order change was declined

    - canceled\_by: (\`null\` \\| \`string\`) The canceled by of the order change

    - canceled\_at: (\`null\` \\| \`Date\`) When the order change was canceled

    - created\_at: (\`string\` \\| \`Date\`) When the order change was created

    - updated\_at: (\`string\` \\| \`Date\`) When the order change was updated

    - change\_type: (\`"return"\` \\| \`"return\_request"\` \\| \`"exchange"\` \\| \`"claim"\` \\| \`"edit"\` \\| \`"transfer"\` \\| \`"update\_order"\`) The type of the order change

    - carry\_over\_promotions: (\`null\` \\| \`boolean\`) Whether to carry over promotions (apply promotions to outbound exchange items).
