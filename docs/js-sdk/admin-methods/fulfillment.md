# fulfillment - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.fulfillment` set of methods used to send requests to Medusa's Admin API routes.

## create

This method creates a fulfillment. It sends a request to the
[Create Fulfillment](https://docs.medusajs.com/api/admin#fulfillments_postfulfillments)
API route.

### Example

```ts
sdk.admin.fulfillment.create({
  location_id: "sloc_123",
  provider_id: "my_fulfillment",
  delivery_address: {
    country_code: "us"
  },
  items: [
    {
      title: "Shirt",
      sku: "SHIRT",
      quantity: 1,
      barcode: "123"
    }
  ],
  labels: [],
  order: {},
  order_id: "order_123"
})
.then(({ fulfillment }) => {
  console.log(fulfillment)
})
```

### Parameters

- body: (\[AdminCreateFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateFulfillment/page.mdx)) The fulfillment's details.

  - location\_id: (\`string\`) The ID of the location the items are fulfilled from.

  - provider\_id: (\`string\`) The ID of the fulfillment provider used to handle the fulfillment.

  - delivery\_address: (\[AdminFulfillmentDeliveryAddress]\(../../../../../types/interfaces/types.AdminFulfillmentDeliveryAddress/page.mdx)) The address to deliver items to.

    - first\_name: (\`string\`) The address's first name.

    - last\_name: (\`string\`) The address's last name.

    - phone: (\`string\`) The address's phone number.

    - company: (\`string\`) The address's company.

    - address\_1: (\`string\`) The address's first line.

    - address\_2: (\`string\`) The address's second line.

    - city: (\`string\`) The address's city.

    - country\_code: (\`string\`) The address's country code.

    - province: (\`string\`) The address's lower-case \[ISO 3166-2]\(https://en.wikipedia.org/wiki/ISO\\\_3166-2) province.

    - postal\_code: (\`string\`) The address's postal code.

    - metadata: (\`null\` \\| \`Record\<string, string>\`) Key-value pairs of custom data.

  - items: (\[AdminCreateFulfillmentItem]\(../../../../../types/interfaces/types.AdminCreateFulfillmentItem/page.mdx)\[]) The items to fulfill.

    - title: (\`string\`) The item's name.

    - sku: (\`string\`) The item's SKU.

    - quantity: (\`number\`) The item's quantity.

    - barcode: (\`string\`) The item's barcode.

    - line\_item\_id: (\`string\`) The ID of the associated line item in an order.

    - inventory\_item\_id: (\`string\`) The ID of the associated inventory item.

  - labels: (\[AdminCreateFulfillmentLabel]\(../../../../../types/interfaces/types.AdminCreateFulfillmentLabel/page.mdx)\[]) The fulfillment's shipment labels.

    - tracking\_number: (\`string\`) The tracking number of the fulfillment's shipment.

    - tracking\_url: (\`string\`) The tracking URL of the fulfillment's shipment.

    - label\_url: (\`string\`) The label URL of the fulfillment's shipment.

  - order\_id: (\`string\`) The ID of the order the fulfillment is created for.

  - shipping\_option\_id: (\`null\` \\| \`string\`) The ID of the associated shipping option.

  - data: (\`null\` \\| \`Record\<string, unknown>\`) Data useful for the fulfillment provider handling the fulfillment.

    Learn more in \[this documentation]\(https://docs.medusajs.com/resources/commerce-modules/fulfillment#data-property).

  - packed\_at: (\`null\` \\| \`Date\`) The date the fulfillment items were packed.

  - shipped\_at: (\`null\` \\| \`Date\`) The date the fulfillment items were shipped.

  - delivered\_at: (\`null\` \\| \`Date\`) The date the fulfillment items were delivered.

  - canceled\_at: (\`null\` \\| \`Date\`) The date the fulfillment was canceled.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the fulfillment.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminFulfillmentResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentResponse/page.mdx)\&#62;) The fulfillment's details.

  - fulfillment: (\[AdminFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillment/page.mdx)) The fulfillment's details.

    - id: (\`string\`) The fulfillment's ID.

    - location\_id: (\`string\`) The ID of the stock location the items
      are delivered from.

    - provider\_id: (\`string\`) The ID of the fulfillment provider
      handling the fulfillment.

    - shipping\_option\_id: (\`null\` \\| \`string\`) The ID of the associated shipping option.

    - provider: (\[AdminFulfillmentProvider]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentProvider/page.mdx)) The associated fulfillment provider's details.

    - delivery\_address: (\[AdminFulfillmentAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentAddress/page.mdx)) The address to deliver the items to.

    - items: (\[AdminFulfillmentItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentItem/page.mdx)\[]) The items to fulfill.

    - labels: (\[AdminFulfillmentLabel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentLabel/page.mdx)\[]) The fulfillment's labels.

    - packed\_at: (\`null\` \\| \`string\`) The date the fulfillment items were packed.

    - shipped\_at: (\`null\` \\| \`string\`) The date the fulfillment items were shipped.

    - delivered\_at: (\`null\` \\| \`string\`) The date the fulfillment items were delivered.

    - canceled\_at: (\`null\` \\| \`string\`) The date the fulfillment was canceled.

    - data: (\`null\` \\| \`Record\<string, unknown>\`) Data useful for the fulfillment provider handling the fulfillment.

      Learn more in \[this documentation]\(https://docs.medusajs.com/resources/commerce-modules/fulfillment#data-property).

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - created\_at: (\`string\`) The date the fulfillment was created.

    - updated\_at: (\`string\`) The date the fulfillment was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the fulfillment was deleted.

***

## cancel

This method cancels a fulfillment. It sends a request to the
[Cancel Fulfillment](https://docs.medusajs.com/api/admin#fulfillments_postfulfillmentsidcancel)
API route.

### Example

```ts
sdk.admin.fulfillment.cancel("ful_123")
.then(({ fulfillment }) => {
  console.log(fulfillment)
})
```

### Parameters

- id: (\`string\`) The fulfillment's ID.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the fulfillment.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminFulfillmentResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentResponse/page.mdx)\&#62;) The fulfillment's details.

  - fulfillment: (\[AdminFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillment/page.mdx)) The fulfillment's details.

    - id: (\`string\`) The fulfillment's ID.

    - location\_id: (\`string\`) The ID of the stock location the items
      are delivered from.

    - provider\_id: (\`string\`) The ID of the fulfillment provider
      handling the fulfillment.

    - shipping\_option\_id: (\`null\` \\| \`string\`) The ID of the associated shipping option.

    - provider: (\[AdminFulfillmentProvider]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentProvider/page.mdx)) The associated fulfillment provider's details.

    - delivery\_address: (\[AdminFulfillmentAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentAddress/page.mdx)) The address to deliver the items to.

    - items: (\[AdminFulfillmentItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentItem/page.mdx)\[]) The items to fulfill.

    - labels: (\[AdminFulfillmentLabel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentLabel/page.mdx)\[]) The fulfillment's labels.

    - packed\_at: (\`null\` \\| \`string\`) The date the fulfillment items were packed.

    - shipped\_at: (\`null\` \\| \`string\`) The date the fulfillment items were shipped.

    - delivered\_at: (\`null\` \\| \`string\`) The date the fulfillment items were delivered.

    - canceled\_at: (\`null\` \\| \`string\`) The date the fulfillment was canceled.

    - data: (\`null\` \\| \`Record\<string, unknown>\`) Data useful for the fulfillment provider handling the fulfillment.

      Learn more in \[this documentation]\(https://docs.medusajs.com/resources/commerce-modules/fulfillment#data-property).

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - created\_at: (\`string\`) The date the fulfillment was created.

    - updated\_at: (\`string\`) The date the fulfillment was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the fulfillment was deleted.

***

## createShipment

This method creates a shipment for a fulfillment. It sends a request to the
[Create Shipment](https://docs.medusajs.com/api/admin#fulfillments_postfulfillmentsidshipment)
API route.

### Example

```ts
sdk.admin.fulfillment.createShipment("ful_123", {
  labels: [
    {
      tracking_number: "123",
      tracking_url: "example.com",
      label_url: "example.com"
    }
  ]
})
.then(({ fulfillment }) => {
  console.log(fulfillment)
})
```

### Parameters

- id: (\`string\`) The fulfillment's ID.
- body: (\[AdminCreateFulfillmentShipment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateFulfillmentShipment/page.mdx)) The shipment's details.

  - labels: (\[AdminCreateFulfillmentLabel]\(../../../../../types/interfaces/types.AdminCreateFulfillmentLabel/page.mdx)\[]) The shipment's labels.

    - tracking\_number: (\`string\`) The tracking number of the fulfillment's shipment.

    - tracking\_url: (\`string\`) The tracking URL of the fulfillment's shipment.

    - label\_url: (\`string\`) The label URL of the fulfillment's shipment.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the fulfillment.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminFulfillmentResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentResponse/page.mdx)\&#62;) The fulfillment's details.

  - fulfillment: (\[AdminFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillment/page.mdx)) The fulfillment's details.

    - id: (\`string\`) The fulfillment's ID.

    - location\_id: (\`string\`) The ID of the stock location the items
      are delivered from.

    - provider\_id: (\`string\`) The ID of the fulfillment provider
      handling the fulfillment.

    - shipping\_option\_id: (\`null\` \\| \`string\`) The ID of the associated shipping option.

    - provider: (\[AdminFulfillmentProvider]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentProvider/page.mdx)) The associated fulfillment provider's details.

    - delivery\_address: (\[AdminFulfillmentAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentAddress/page.mdx)) The address to deliver the items to.

    - items: (\[AdminFulfillmentItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentItem/page.mdx)\[]) The items to fulfill.

    - labels: (\[AdminFulfillmentLabel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentLabel/page.mdx)\[]) The fulfillment's labels.

    - packed\_at: (\`null\` \\| \`string\`) The date the fulfillment items were packed.

    - shipped\_at: (\`null\` \\| \`string\`) The date the fulfillment items were shipped.

    - delivered\_at: (\`null\` \\| \`string\`) The date the fulfillment items were delivered.

    - canceled\_at: (\`null\` \\| \`string\`) The date the fulfillment was canceled.

    - data: (\`null\` \\| \`Record\<string, unknown>\`) Data useful for the fulfillment provider handling the fulfillment.

      Learn more in \[this documentation]\(https://docs.medusajs.com/resources/commerce-modules/fulfillment#data-property).

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - created\_at: (\`string\`) The date the fulfillment was created.

    - updated\_at: (\`string\`) The date the fulfillment was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the fulfillment was deleted.
