# payment - JS SDK Store Reference

This documentation provides a reference to the `sdk.store.payment` set of methods used to send requests to Medusa's Store API routes.

## listPaymentProviders

This method retrieves the payment providers available in a region, which is useful during checkout.
It sends a request to the [List Payment Providers](https://docs.medusajs.com/api/store#payment-providers_getpaymentproviders)
API route.

Related guide: [Implement payment step during checkout](https://docs.medusajs.com/resources/storefront-development/checkout/payment).

### Example

To retrieve the list of payment providers for a region:

```ts
sdk.store.payment.listPaymentProviders({
  region_id: "reg_123"
})
.then(({ payment_providers, count, offset, limit }) => {
  console.log(payment_providers)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.store.payment.listPaymentProviders({
  region_id: "reg_123",
  limit: 10,
  offset: 10
})
.then(({ payment_providers, count, offset, limit }) => {
  console.log(payment_providers)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each provider:

```ts
sdk.store.payment.listPaymentProviders({
  region_id: "reg_123",
  limit: 10,
  offset: 10,
  fields: "id"
})
.then(({ payment_providers, count, offset, limit }) => {
  console.log(payment_providers)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- query: (\[FindParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.FindParams/page.mdx) & \[StorePaymentProviderFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StorePaymentProviderFilters/page.mdx)) The filters to apply on the retrieved providers, along with configurations of the
  fields to retrieve in the options.

  - region\_id: (\`string\`) The ID of the region to retrieve its payment providers.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StorePaymentProviderListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.StorePaymentProviderListResponse/page.mdx)\&#62;) The list of payment providers.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## initiatePaymentSession

This method creates a payment session of a cart's payment collection, selecting a payment provider.
It sends a request to the [Initialize Payment Session](https://docs.medusajs.com/api/store#payment-collections_postpaymentcollectionsidpaymentsessions)
API route.

If the cart doesn't have a payment collection, a payment collection is created for the cart by
sending a request to the [Create Payment Collection](https://docs.medusajs.com/api/store#payment-collections_postpaymentcollections)
API route.

Related guide: [Implement payment step during checkout](https://docs.medusajs.com/resources/storefront-development/checkout/payment).

### Example

```ts
sdk.store.payment.initiatePaymentSession(
  cart, // assuming you already have the cart object.
  {
    provider_id: "pp_stripe_stripe",
    data: {
      // any data relevant for the provider.
    }
  }
)
.then(({ payment_collection }) => {
  console.log(payment_collection)
})
```

### Parameters

- cart: (\[StoreCart]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCart/page.mdx)) The cart's details.

  - id: (\`string\`) The ID of the cart.

  - currency\_code: (\`string\`) The currency of the cart

  - original\_item\_total: (\`number\`) The original item total of the cart.

  - original\_item\_subtotal: (\`number\`) The original item subtotal of the cart.

  - original\_item\_tax\_total: (\`number\`) The original item tax total of the cart.

  - item\_total: (\`number\`) The item total of the cart.

  - item\_subtotal: (\`number\`) The item subtotal of the cart.

  - item\_tax\_total: (\`number\`) The item tax total of the cart.

  - original\_total: (\`number\`) The original total of the cart.

  - original\_subtotal: (\`number\`) The original subtotal of the cart.

  - original\_tax\_total: (\`number\`) The original tax total of the cart.

  - total: (\`number\`) The total of the cart.

  - subtotal: (\`number\`) The subtotal of the cart. (Excluding taxes)

  - tax\_total: (\`number\`) The tax total of the cart.

  - discount\_total: (\`number\`) The discount total of the cart.

  - discount\_tax\_total: (\`number\`) The discount tax total of the cart.

  - gift\_card\_total: (\`number\`) The gift card total of the cart.

  - gift\_card\_tax\_total: (\`number\`) The gift card tax total of the cart.

  - shipping\_total: (\`number\`) The shipping total of the cart.

  - shipping\_subtotal: (\`number\`) The shipping subtotal of the cart.

  - shipping\_tax\_total: (\`number\`) The shipping tax total of the cart.

  - original\_shipping\_total: (\`number\`) The original shipping total of the cart.

  - original\_shipping\_subtotal: (\`number\`) The original shipping subtotal of the cart.

  - original\_shipping\_tax\_total: (\`number\`) The original shipping tax total of the cart.

  - promotions: (\[StoreCartPromotion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartPromotion/page.mdx)\[]) The promotions applied to the cart.

    - id: (\`string\`) The promotion's ID.

    - code: (\`string\`) The promotion's code.

    - is\_automatic: (\`boolean\`) Whether the promotion is applied automatically (without the customer needing to enter a code).

    - application\_method: (\`object\`) How the promotion is applied.

  - region\_id: (\`string\`) The ID of the region the cart belongs to.

  - customer\_id: (\`string\`) The ID of the associated customer

  - sales\_channel\_id: (\`string\`) The ID of the sales channel the cart belongs to.

  - email: (\`string\`) The email of the customer that owns the cart.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Holds custom data in key-value pairs.

  - created\_at: (\`string\` \\| \`Date\`) When the cart was created.

  - updated\_at: (\`string\` \\| \`Date\`) When the cart was updated.

  - shipping\_address: (\[StoreCartAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartAddress/page.mdx)) The cart's shipping address.

    - id: (\`string\`) The ID of the address.

    - created\_at: (\`string\` \\| \`Date\`) When the address was created.

    - updated\_at: (\`string\` \\| \`Date\`) When the address was updated.

    - customer\_id: (\`string\`) The customer ID of the address.

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

  - billing\_address: (\[StoreCartAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartAddress/page.mdx)) The cart's billing address.

    - id: (\`string\`) The ID of the address.

    - created\_at: (\`string\` \\| \`Date\`) When the address was created.

    - updated\_at: (\`string\` \\| \`Date\`) When the address was updated.

    - customer\_id: (\`string\`) The customer ID of the address.

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

  - items: (\[StoreCartLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartLineItem/page.mdx)\[]) The cart's items.

    - id: (\`string\`) The ID of the line item.

    - title: (\`string\`) The title of the line item.

    - quantity: (\`number\`) The line item's quantity in the cart.

    - requires\_shipping: (\`boolean\`) Whether the line item requires shipping.

    - is\_discountable: (\`boolean\`) Whether the line item is discountable.

    - is\_tax\_inclusive: (\`boolean\`) Whether the line item price is tax inclusive.

    - unit\_price: (\`number\`) The unit price of the item.

    - cart\_id: (\`string\`) The ID of the associated cart.

    - cart: (\[StoreCart]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCart/page.mdx)) The cart this item belongs to.

    - subtitle: (\`string\`) The subtitle of the line item.

    - thumbnail: (\`string\`) The line item's thumbnail.

    - product\_id: (\`string\`) The ID of the associated product.

    - product\_title: (\`string\`) The title of the associated product.

    - product\_description: (\`string\`) The description of the associated product.

    - product\_subtitle: (\`string\`) The subtitle of the associated product.

    - product\_type: (\`string\`) The type of the associated product.

    - product\_collection: (\`string\`) The collection of the associated product.

    - product\_handle: (\`string\`) The handle of the associated product.

    - variant\_id: (\`string\`) The associated variant's ID of the line item.

    - variant\_sku: (\`string\`) The sku of the associated variant.

    - variant\_barcode: (\`string\`) The barcode of the associated variant.

    - variant\_title: (\`string\`) The title of the associated variant.

    - variant\_option\_values: (\`Record\<string, unknown>\`) The option values of the associated variant.

    - compare\_at\_unit\_price: (\`number\`) The calculated price of the line item.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Holds custom data in key-value pairs.

    - created\_at: (\`Date\`) When the line item was created.

    - updated\_at: (\`Date\`) When the line item was updated.

    - deleted\_at: (\`Date\`) When the line item was deleted.

    - original\_total: (\`number\`) The original total of the cart line item.
      This field is only available if you expand the \`items.\*\` relation. Learn more in the
      \[Cart Totals]\(https://docs.medusajs.com/resources/storefront-development/cart/totals#retrieve-and-show-cart-item-totals) guide.

    - original\_subtotal: (\`number\`) The original subtotal of the cart line item.
      This field is only available if you expand the \`items.\*\` relation. Learn more in the
      \[Cart Totals]\(https://docs.medusajs.com/resources/storefront-development/cart/totals#retrieve-and-show-cart-item-totals) guide.

    - original\_tax\_total: (\`number\`) The original tax total of the cart line item.
      This field is only available if you expand the \`items.\*\` relation. Learn more in the
      \[Cart Totals]\(https://docs.medusajs.com/resources/storefront-development/cart/totals#retrieve-and-show-cart-item-totals) guide.

    - item\_total: (\`number\`) The item total of the cart line item.
      This field is only available if you expand the \`items.\*\` relation. Learn more in the
      \[Cart Totals]\(https://docs.medusajs.com/resources/storefront-development/cart/totals#retrieve-and-show-cart-item-totals) guide.

    - item\_subtotal: (\`number\`) The item subtotal of the cart line item.
      This field is only available if you expand the \`items.\*\` relation. Learn more in the
      \[Cart Totals]\(https://docs.medusajs.com/resources/storefront-development/cart/totals#retrieve-and-show-cart-item-totals) guide.

    - item\_tax\_total: (\`number\`) The item tax total of the cart line item.
      This field is only available if you expand the \`items.\*\` relation. Learn more in the
      \[Cart Totals]\(https://docs.medusajs.com/resources/storefront-development/cart/totals#retrieve-and-show-cart-item-totals) guide.

    - total: (\`number\`) The total of the cart line item.
      This field is only available if you expand the \`items.\*\` relation. Learn more in the
      \[Cart Totals]\(https://docs.medusajs.com/resources/storefront-development/cart/totals#retrieve-and-show-cart-item-totals) guide.

    - subtotal: (\`number\`) The subtotal of the cart line item.
      This field is only available if you expand the \`items.\*\` relation. Learn more in the
      \[Cart Totals]\(https://docs.medusajs.com/resources/storefront-development/cart/totals#retrieve-and-show-cart-item-totals) guide.

    - tax\_total: (\`number\`) The tax total of the cart line item.
      This field is only available if you expand the \`items.\*\` relation. Learn more in the
      \[Cart Totals]\(https://docs.medusajs.com/resources/storefront-development/cart/totals#retrieve-and-show-cart-item-totals) guide.

    - discount\_total: (\`number\`) The discount total of the cart line item.
      This field is only available if you expand the \`items.\*\` relation. Learn more in the
      \[Cart Totals]\(https://docs.medusajs.com/resources/storefront-development/cart/totals#retrieve-and-show-cart-item-totals) guide.

    - discount\_tax\_total: (\`number\`) The discount tax total of the cart line item.
      This field is only available if you expand the \`items.\*\` relation. Learn more in the
      \[Cart Totals]\(https://docs.medusajs.com/resources/storefront-development/cart/totals#retrieve-and-show-cart-item-totals) guide.

    - product: (\[StoreProduct]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreProduct/page.mdx)) The product this item is created for.

    - variant: (\[StoreProductVariant]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreProductVariant/page.mdx)) The variant added to the cart.

    - tax\_lines: (\[BaseLineItemTaxLine]\(../../../../../types/interfaces/types.BaseLineItemTaxLine/page.mdx) & \`object\`\[]) The item's tax lines.

    - adjustments: (\[BaseLineItemAdjustment]\(../../../../../types/interfaces/types.BaseLineItemAdjustment/page.mdx) & \`object\`\[]) The item's adjustments.

  - shipping\_methods: (\[StoreCartShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartShippingMethod/page.mdx)\[]) The cart's shipping methods.

    - id: (\`string\`) The ID of the shipping method.

    - cart\_id: (\`string\`) The ID of the associated cart.

    - name: (\`string\`) The name of the shipping method.

    - amount: (\`number\`) The price of the shipping method.

    - is\_tax\_inclusive: (\`boolean\`) Whether the shipping method price is tax inclusive.

    - created\_at: (\`string\` \\| \`Date\`) When the shipping method was created.

    - updated\_at: (\`string\` \\| \`Date\`) When the shipping method was updated.

    - description: (\`string\`) The description of the shipping method.

    - shipping\_option\_id: (\`string\`) The ID of the shipping option the method was created from.

    - data: (\`Record\<string, unknown>\`) Additional data needed for fulfillment.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Holds custom data in key-value pairs.

    - original\_total: (\`number\`) The original total of the cart shipping method.
      This field is only available if you expand the \`shipping\_methods.\*\` relation. Learn more in the
      \[Cart Totals]\(https://docs.medusajs.com/resources/storefront-development/cart/totals#retrieve-and-show-shipping-method-totals) guide.

    - original\_subtotal: (\`number\`) The original subtotal of the cart shipping method.
      This field is only available if you expand the \`shipping\_methods.\*\` relation. Learn more in the
      \[Cart Totals]\(https://docs.medusajs.com/resources/storefront-development/cart/totals#retrieve-and-show-shipping-method-totals) guide.

    - original\_tax\_total: (\`number\`) The original tax total of the cart shipping method.
      This field is only available if you expand the \`shipping\_methods.\*\` relation. Learn more in the
      \[Cart Totals]\(https://docs.medusajs.com/resources/storefront-development/cart/totals#retrieve-and-show-shipping-method-totals) guide.

    - total: (\`number\`) The total of the cart shipping method.
      This field is only available if you expand the \`shipping\_methods.\*\` relation. Learn more in the
      \[Cart Totals]\(https://docs.medusajs.com/resources/storefront-development/cart/totals#retrieve-and-show-shipping-method-totals) guide.

    - subtotal: (\`number\`) The subtotal of the cart shipping method.
      This field is only available if you expand the \`shipping\_methods.\*\` relation. Learn more in the
      \[Cart Totals]\(https://docs.medusajs.com/resources/storefront-development/cart/totals#retrieve-and-show-shipping-method-totals) guide.

    - tax\_total: (\`number\`) The tax total of the cart shipping method.
      This field is only available if you expand the \`shipping\_methods.\*\` relation. Learn more in the
      \[Cart Totals]\(https://docs.medusajs.com/resources/storefront-development/cart/totals#retrieve-and-show-shipping-method-totals) guide.

    - discount\_total: (\`number\`) The discount total of the cart shipping method.
      This field is only available if you expand the \`shipping\_methods.\*\` relation. Learn more in the
      \[Cart Totals]\(https://docs.medusajs.com/resources/storefront-development/cart/totals#retrieve-and-show-shipping-method-totals) guide.

    - discount\_tax\_total: (\`number\`) The discount tax total of the cart shipping method.
      This field is only available if you expand the \`shipping\_methods.\*\` relation. Learn more in the
      \[Cart Totals]\(https://docs.medusajs.com/resources/storefront-development/cart/totals#retrieve-and-show-shipping-method-totals) guide.

    - tax\_lines: (\[BaseShippingMethodTaxLine]\(../../../../../types/interfaces/types.BaseShippingMethodTaxLine/page.mdx) & \`object\`\[]) The shipping method's tax lines.

    - adjustments: (\[BaseShippingMethodAdjustment]\(../../../../../types/interfaces/types.BaseShippingMethodAdjustment/page.mdx) & \`object\`\[]) The shipping method's adjustments.

  - payment\_collection: (\[StorePaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StorePaymentCollection/page.mdx)) The cart's payment collection.

    - id: (\`string\`) The ID of the payment collection.

    - currency\_code: (\`string\`) The ISO 3 character currency code of the payment sessions and payments associated with payment collection.

    - amount: (\`number\`) The total amount to be authorized and captured.

    - status: (\[BasePaymentCollectionStatus]\(../../../../../types/types/types.BasePaymentCollectionStatus/page.mdx)) The status of the payment collection.

    - payment\_providers: (\[StorePaymentProvider]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StorePaymentProvider/page.mdx)\[]) The providers used for the payment collection's sessions.

    - authorized\_amount: (\`number\`) The amount authorized within the associated payment sessions.

    - captured\_amount: (\`number\`) The amount captured within the associated payment sessions.

    - refunded\_amount: (\`number\`) The amount refunded within the associated payments.

    - completed\_at: (\`string\` \\| \`Date\`) When the payment collection was completed.

    - created\_at: (\`string\` \\| \`Date\`) When the payment collection was created.

    - updated\_at: (\`string\` \\| \`Date\`) When the payment collection was updated.

    - metadata: (\`Record\<string, unknown>\`) Holds custom data in key-value pairs.

    - payments: (\[BasePayment]\(../../../../../types/interfaces/types.BasePayment/page.mdx)\[]) The associated payments.

    - payment\_sessions: (\[StorePaymentSession]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StorePaymentSession/page.mdx)\[]) The payment collection's sessions.

  - region: (\[StoreRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreRegion/page.mdx)) The cart's region

    - id: (\`string\`) The region's ID.

    - name: (\`string\`) The region's name.

    - currency\_code: (\`string\`) The region's currency code.

    - automatic\_taxes: (\`boolean\`) Whether taxes are calculated automatically in the region.

    - countries: (\[BaseRegionCountry]\(../../../../../types/interfaces/types.BaseRegionCountry/page.mdx)\[]) The countries that belong to the region.

    - payment\_providers: (\[AdminPaymentProvider]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentProvider/page.mdx)\[]) The payment providers enabled in the region.

    - metadata: (\`null\` \\| \`Record\<string, any>\`) Key-value pairs of custom data.

    - created\_at: (\`string\`) The date the region was created.

    - updated\_at: (\`string\`) The date the region was updated.
- body: (\[StoreInitializePaymentSession]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreInitializePaymentSession/page.mdx)) The payment session's details.

  - provider\_id: (\`string\`) The ID of the provider to initialize a payment session
    for.

  - data: (\`Record\<string, unknown>\`) Any data necessary for the payment provider to process the payment.

    Learn more in \[this documentation]\(https://docs.medusajs.com/resources/commerce-modules/payment/payment-session#data-property).
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the payment collection.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StorePaymentCollectionResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StorePaymentCollectionResponse/page.mdx)\&#62;) The payment collection's details.

  - payment\_collection: (\[StorePaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StorePaymentCollection/page.mdx)) The payment collection's details.

    - id: (\`string\`) The ID of the payment collection.

    - currency\_code: (\`string\`) The ISO 3 character currency code of the payment sessions and payments associated with payment collection.

    - amount: (\`number\`) The total amount to be authorized and captured.

    - status: (\[BasePaymentCollectionStatus]\(../../../../../types/types/types.BasePaymentCollectionStatus/page.mdx)) The status of the payment collection.

    - payment\_providers: (\[StorePaymentProvider]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StorePaymentProvider/page.mdx)\[]) The providers used for the payment collection's sessions.

    - authorized\_amount: (\`number\`) The amount authorized within the associated payment sessions.

    - captured\_amount: (\`number\`) The amount captured within the associated payment sessions.

    - refunded\_amount: (\`number\`) The amount refunded within the associated payments.

    - completed\_at: (\`string\` \\| \`Date\`) When the payment collection was completed.

    - created\_at: (\`string\` \\| \`Date\`) When the payment collection was created.

    - updated\_at: (\`string\` \\| \`Date\`) When the payment collection was updated.

    - metadata: (\`Record\<string, unknown>\`) Holds custom data in key-value pairs.

    - payments: (\[BasePayment]\(../../../../../types/interfaces/types.BasePayment/page.mdx)\[]) The associated payments.

    - payment\_sessions: (\[StorePaymentSession]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StorePaymentSession/page.mdx)\[]) The payment collection's sessions.
