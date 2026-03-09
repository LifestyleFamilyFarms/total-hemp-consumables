# fulfillment - JS SDK Store Reference

This documentation provides a reference to the `sdk.store.fulfillment` set of methods used to send requests to Medusa's Store API routes.

## listCartOptions

This method retrieves the list of shipping options for a cart. It sends a request to
the [List Shipping Options](https://docs.medusajs.com/api/store#shipping-options_getshippingoptions)
API route.

Related guide: [Implement shipping step during checkout](https://docs.medusajs.com/resources/storefront-development/checkout/shipping).

### Example

```ts
sdk.store.fulfillment.listCartOptions({
  cart_id: "cart_123"
})
.then(({ shipping_options }) => {
  console.log(shipping_options)
})
```

### Parameters

- query: (\[StoreGetShippingOptionList]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreGetShippingOptionList/page.mdx)) The cart's details along with configurations of the fields to retrieve in the options.

  - cart\_id: (\`string\`) The ID of the cart to retrieve the shipping options that
    can be applied on it.

  - $and: ((\[StoreGetShippingOptionList]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreGetShippingOptionList/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[StoreGetShippingOptionList]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreGetShippingOptionList/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - cart\_id: (\`string\`) The ID of the cart to retrieve the shipping options that
      can be applied on it.

    - $and: ((\[StoreGetShippingOptionList]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreGetShippingOptionList/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[StoreGetShippingOptionList]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreGetShippingOptionList/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[StoreGetShippingOptionList]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreGetShippingOptionList/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[StoreGetShippingOptionList]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreGetShippingOptionList/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - is\_return: (\`boolean\`) Whether to retrieve shipping options used for returns.

  - $or: ((\[StoreGetShippingOptionList]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreGetShippingOptionList/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[StoreGetShippingOptionList]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreGetShippingOptionList/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - cart\_id: (\`string\`) The ID of the cart to retrieve the shipping options that
      can be applied on it.

    - $and: ((\[StoreGetShippingOptionList]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreGetShippingOptionList/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[StoreGetShippingOptionList]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreGetShippingOptionList/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[StoreGetShippingOptionList]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreGetShippingOptionList/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[StoreGetShippingOptionList]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreGetShippingOptionList/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - is\_return: (\`boolean\`) Whether to retrieve shipping options used for returns.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - is\_return: (\`boolean\`) Whether to retrieve shipping options used for returns.
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreShippingOptionListResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreShippingOptionListResponse/page.mdx)\&#62;) The shipping options that can be used for the cart.

  - shipping\_options: (\[StoreCartShippingOptionWithServiceZone]\(../../../../../types/HttpTypes/types/types.HttpTypes.StoreCartShippingOptionWithServiceZone/page.mdx)\[]) The shipping options for the cart.

    - id: (\`string\`) The shipping option's ID.

    - name: (\`string\`) The shipping option's name.

    - price\_type: (\[ShippingOptionPriceType]\(../../../../../fulfillment/types/fulfillment.ShippingOptionPriceType/page.mdx)) The type of the shipping option's price. \`flat\` means the price
      is fixed, whereas \`calculated\` means the price is calculated by the
      associated fulfillment provider.

    - service\_zone\_id: (\`string\`) The ID of the associated service zone.

    - shipping\_profile\_id: (\`string\`) The ID of the associated shipping profile.

    - provider\_id: (\`string\`) The ID of the fulfillment provider used to handle shipping.

    - data: (\`null\` \\| \`Record\<string, unknown>\`) The data useful for the fulfillment provider when handling the shipment and fulfillment.

      Learn more in \[this documentation]\(https://docs.medusajs.com/resources/commerce-modules/fulfillment/shipping-option#data-property).

    - type: (\`object\`) The shipping option's type.

    - provider: (\`object\`) The details of the associated fulfillment provider.

    - amount: (\`number\`) The shipping option's amount.

    - prices: (\[StorePrice]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StorePrice/page.mdx)\[]) All the prices for this shipping option

    - calculated\_price: (\[StoreCalculatedPrice]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCalculatedPrice/page.mdx)) Calculated price for the shipping option

    - insufficient\_inventory: (\`boolean\`) Whether the stock location of the shipping option has insufficient inventory for items in the cart.

    - service\_zone: (\`object\`) The associated service zone.

***

## calculate

This method calculates the price of a shipping option in a cart, which is useful during checkout.
It sends a request to the [Calculate Shipping Option Price](https://docs.medusajs.com/api/store#shipping-options_postshippingoptionsidcalculate)
API route.

### Example

```ts
sdk.store.fulfillment.calculate("so_123", {
  cart_id: "cart_123"
})
.then(({ shipping_option }) => {
  console.log(shipping_option)
})
```

### Parameters

- id: (\`string\`) The shipping option's ID.
- body: (\[StoreCalculateShippingOptionPrice]\(../../../../../types/HttpTypes/types/types.HttpTypes.StoreCalculateShippingOptionPrice/page.mdx)) The price calculation's details.

  - cart\_id: (\`string\`) The ID of the cart to calculate the price for.

  - data: (\`Record\<string, unknown>\`) Additional data passed to the shipping option's fulfillment provider. This is useful
    if the third-party fulfillment provider requires additional data to calculate the price.

    Learn more in the \[Shipping Option documentation]\(https://docs.medusajs.com/resources/commerce-modules/fulfillment/shipping-option#data-property).
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the shipping option.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreShippingOptionResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreShippingOptionResponse/page.mdx)\&#62;) The shipping option's details.

  - shipping\_option: (\[StoreCartShippingOption]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartShippingOption/page.mdx)) The shipping option's details.

    - id: (\`string\`) The shipping option's ID.

    - name: (\`string\`) The shipping option's name.

    - price\_type: (\[ShippingOptionPriceType]\(../../../../../fulfillment/types/fulfillment.ShippingOptionPriceType/page.mdx)) The type of the shipping option's price. \`flat\` means the price
      is fixed, whereas \`calculated\` means the price is calculated by the
      associated fulfillment provider.

    - service\_zone\_id: (\`string\`) The ID of the associated service zone.

    - shipping\_profile\_id: (\`string\`) The ID of the associated shipping profile.

    - provider\_id: (\`string\`) The ID of the fulfillment provider used to handle shipping.

    - data: (\`null\` \\| \`Record\<string, unknown>\`) The data useful for the fulfillment provider when handling the shipment and fulfillment.

      Learn more in \[this documentation]\(https://docs.medusajs.com/resources/commerce-modules/fulfillment/shipping-option#data-property).

    - type: (\`object\`) The shipping option's type.

    - provider: (\`object\`) The details of the associated fulfillment provider.

    - amount: (\`number\`) The shipping option's amount.

    - prices: (\[StorePrice]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StorePrice/page.mdx)\[]) All the prices for this shipping option

    - calculated\_price: (\[StoreCalculatedPrice]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCalculatedPrice/page.mdx)) Calculated price for the shipping option

    - insufficient\_inventory: (\`boolean\`) Whether the stock location of the shipping option has insufficient inventory for items in the cart.
