# orderEdit - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.orderEdit` set of methods used to send requests to Medusa's Admin API routes.

## initiateRequest

This method creates an order edit request. It sends a HTTP request to the
[Create Order Edit](https://docs.medusajs.com/api/admin#order-edits_postorderedits)
API route.

### Example

```ts
sdk.admin.orderEdit.initiateRequest({
  order_id: "order_123"
})
.then(({ order_change }) => {
  console.log(order_change)
})
```

### Parameters

- body: (\[AdminInitiateOrderEditRequest]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInitiateOrderEditRequest/page.mdx)) The order edit's details.

  - order\_id: (\`string\`) The ID of the order to create the edit for.

  - description: (\`string\`) The order edit's description.

  - internal\_note: (\`string\`) An internal note viewed by admin users only.

  - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the order edit.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminOrderEditResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderEditResponse/page.mdx)\&#62;) The order edit's details.

  - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The order edit's details.

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

***

## request

This method changes an order edit to requested. It sends a request to the
[Request Order Edit](https://docs.medusajs.com/api/admin#order-edits_postordereditsidrequest)
API route.

### Example

```ts
sdk.admin.orderEdit.request("ordch_123")
.then(({ order_preview }) => {
  console.log(order_preview)
})
```

### Parameters

- id: (\`string\`) The order edit's ID.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the order preview.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminOrderEditPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderEditPreviewResponse/page.mdx)\&#62;) The order preview's details.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) A preview of the order when the edit is applied.

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

## confirm

This method confirms an order edit and applies it on the order. It sends a request
to the [Confirm Order Edit](https://docs.medusajs.com/api/admin#order-edits_postordereditsidconfirm)
API route.

### Example

```ts
sdk.admin.orderEdit.confirm("ordch_123")
.then(({ order_preview }) => {
  console.log(order_preview)
})
```

### Parameters

- id: (\`string\`) The order edit's ID.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the order preview.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminOrderEditPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderEditPreviewResponse/page.mdx)\&#62;) The order preview's details.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) A preview of the order when the edit is applied.

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

## cancelRequest

This method cancels a requested order edit. It sends a request to the
[Cancel Order Edit](https://docs.medusajs.com/api/admin#order-edits_deleteordereditsid)
API route.

### Example

```ts
sdk.admin.orderEdit.cancelRequest("ordch_123")
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- id: (\`string\`) The order edit's ID.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Query parameters

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminOrderEditDeleteResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminOrderEditDeleteResponse/page.mdx)\&#62;) The deletion's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (TObject) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.

***

## addItems

This method adds items to an order edit. These items will have the action `ITEM_ADD`.

The method sends a request to the [Add Items](https://docs.medusajs.com/api/admin#order-edits_postordereditsiditems)
API route.

### Example

```ts
sdk.admin.orderEdit.addItems("ordch_123", {
  items: [
    {
      variant_id: "variant_123",
      quantity: 1
    }
  ]
})
.then(({ order_preview }) => {
  console.log(order_preview)
})
```

### Parameters

- id: (\`string\`) The order edit's ID.
- body: (\[AdminAddOrderEditItems]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminAddOrderEditItems/page.mdx)) The items to add.

  - items: (\`object\`\[]) The details of the items to add.

    - variant\_id: (\`string\`) The ID of the product variant to add.

    - quantity: (\`number\`) The item's quantity.

    - unit\_price: (\`number\`) A custom price to use for the item.

    - internal\_note: (\`string\`) An internal note viewed by admin users only.

    - allow\_backorder: (\`boolean\`) Whether the variant can be added even if it's out of stock.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the order preview.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminOrderEditPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderEditPreviewResponse/page.mdx)\&#62;) The order preview's details.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) A preview of the order when the edit is applied.

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

## updateOriginalItem

This method updates the quantity and other details of an item in an order. It sends a request to the
[Update Item Quantity](https://docs.medusajs.com/api/admin#order-edits_postordereditsiditemsitemitem_id)
API route.

You can also use this method to remove an item from an order by setting the `quantity` to `0`.

### Example

```ts
sdk.admin.orderEdit.updateOriginalItem(
  "ordch_123", 
  "orli_123",
  {
    quantity: 1
  }
)
.then(({ order_preview }) => {
  console.log(order_preview)
})
```

### Parameters

- id: (\`string\`) The order edit's ID.
- itemId: (\`string\`) The item's ID in the order.
- body: (\[AdminUpdateOrderEditItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateOrderEditItem/page.mdx)) The data to edit in the item.

  - quantity: (\`number\`) The item's quantity.

  - internal\_note: (\`null\` \\| \`string\`) An internal note viewed by admin users only.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the order preview.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminOrderEditPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderEditPreviewResponse/page.mdx)\&#62;) The order preview's details.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) A preview of the order when the edit is applied.

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

## updateAddedItem

This method updates an added item in the order edit by the ID of the item's `ITEM_ADD` action.

Every item has an `actions` property, whose value is an array of actions.
You can check the action's name using its `action` property, and use the value of the `id` property.

It sends a request
to the [Update Item](https://docs.medusajs.com/api/admin#order-edits_postordereditsiditemsaction_id)
API route.

### Example

```ts
sdk.admin.orderEdit.updateAddedItem(
  "ordch_123", 
  "orli_123",
  {
    quantity: 1
  }
)
.then(({ order_preview }) => {
  console.log(order_preview)
})
```

### Parameters

- id: (\`string\`) The order edit's ID.
- actionId: (\`string\`) The id of the new item's \`ITEM\_ADD\` action.
- body: (\[AdminUpdateOrderEditItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateOrderEditItem/page.mdx)) The data to update.

  - quantity: (\`number\`) The item's quantity.

  - internal\_note: (\`null\` \\| \`string\`) An internal note viewed by admin users only.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the order preview.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminOrderEditPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderEditPreviewResponse/page.mdx)\&#62;) The order preview's details.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) A preview of the order when the edit is applied.

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

## removeAddedItem

This method removes an added item in the order edit by the ID of the item's `ITEM_ADD` action.

Every item has an `actions` property, whose value is an array of actions.
You can check the action's name using its `action` property, and use the value of the `id` property.

### Example

```ts
sdk.admin.orderEdit.removeAddedItem(
  "ordch_123", 
  "orli_123",
)
.then(({ order_preview }) => {
  console.log(order_preview)
})
```

### Parameters

- id: (\`string\`) The order edit's ID.
- actionId: (\`string\`) The id of the new item's \`ITEM\_ADD\` action.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the order preview.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminOrderEditPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderEditPreviewResponse/page.mdx)\&#62;) The order preview's details.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) A preview of the order when the edit is applied.

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
