# shippingOption - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.shippingOption` set of methods used to send requests to Medusa's Admin API routes.

## create

This method creates a shipping option. It sends a request to the
[Create Shipping Option](https://docs.medusajs.com/api/admin#shipping-options_postshippingoptions)
API route.

### Example

```ts
sdk.admin.shippingOption.create({
  name: "Standard Shipping",
  profile_id: "shp_123",
})
.then(({ shipping_option }) => {
  console.log(shipping_option)
})
```

### Parameters

- body: (\[AdminCreateShippingOption]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminCreateShippingOption/page.mdx)) The details of the shipping option to create.

  - name: (\`string\`) The name of the shipping option. Customers can
    view this name during checkout.

  - service\_zone\_id: (\`string\`) The ID of the service zone that the shipping option belongs to.

    Learn more in the \[Shipping Options]\(https://docs.medusajs.com/resources/commerce-modules/fulfillment/shipping-option#service-zone-restrictions)
    documentation.

  - shipping\_profile\_id: (\`string\`) The ID of the shipping profile that the shipping option belongs to.

    Learn more in the \[Shipping Options]\(https://docs.medusajs.com/resources/commerce-modules/fulfillment/shipping-option#shipping-profile-and-types)
    documentation.

  - provider\_id: (\`string\`) The ID of the fulfillment provider that the shipping option belongs to.

  - price\_type: (\`"flat"\`) The type of shipping option's price.

  - prices: ((\[AdminCreateShippingOptionPriceWithCurrency]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateShippingOptionPriceWithCurrency/page.mdx) \\| \[AdminCreateShippingOptionPriceWithRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateShippingOptionPriceWithRegion/page.mdx))\[])

    - currency\_code: (\`string\`) The currency code of the shipping option price.

    - amount: (\`number\`) The amount of the shipping option price.

    - region\_id: (\`string\`) The ID of the region that the shipping option price belongs to.

    - rules: (\[PriceRule]\(../../../../../pricing\_models/variables/pricing\_models.PriceRule/page.mdx)\[]) The rules of the shipping option price that
      indicate when the price should be applied.

  - data: (\`Record\<string, unknown>\`) Additional data that is useful for third-party fulfillment providers
    that process fulfillments for the shipping option.

    Learn more in the \[Shipping Options]\(https://docs.medusajs.com/resources/commerce-modules/fulfillment/shipping-option#data-property)
    documentation.

  - type: (\[AdminCreateShippingOptionType]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateShippingOptionType/page.mdx)) The type of shipping option.

    Learn more in the \[Shipping Option]\(https://docs.medusajs.com/resources/commerce-modules/fulfillment/shipping-option#shipping-profile-and-types)
    documentation.

    - label: (\`string\`) The label of the shipping option type.

    - code: (\`string\`) The code of the shipping option type.

    - description: (\`string\`) The description of the shipping option type.

  - type\_id: (\`string\`) The ID of the type of shipping option.

    Learn more in the \[Shipping Option]\(https://docs.medusajs.com/resources/commerce-modules/fulfillment/shipping-option#shipping-profile-and-types)
    documentation.

  - rules: (\[AdminCreateShippingOptionRule]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateShippingOptionRule/page.mdx)\[]) The rules of the shipping option.

    Learn more in the \[Shipping Option Rules]\(https://docs.medusajs.com/resources/commerce-modules/fulfillment/shipping-option#shipping-option-rules)
    documentation.

    - operator: (\[RuleOperatorType]\(../../../../../types/CommonTypes/types/types.CommonTypes.RuleOperatorType/page.mdx)) The operator of the shipping option rule.

    - attribute: (\`string\`) The attribute of the shipping option rule.

    - value: (\`string\` \\| \`string\`\[]) The value of the shipping option rule.

  - metadata: (\`Record\<string, unknown>\`) Custom key-value pairs that can be added to the shipping option.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the shipping option.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminShippingOptionResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOptionResponse/page.mdx)\&#62;) The shipping option's details.

  - shipping\_option: (\[AdminShippingOption]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOption/page.mdx)) The shipping option's details.

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

## retrieve

This method retrieves a shipping option. It sends a request to the
[Get Shipping Option](https://docs.medusajs.com/api/admin#shipping-options_getshippingoptionsid)
API route.

### Example

To retrieve a shipping option by its ID:

```ts
sdk.admin.shippingOption.retrieve("so_123")
.then(({ shipping_option }) => {
  console.log(shipping_option)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.shippingOption.retrieve("so_123", {
  fields: "id,*service_zone"
})
.then(({ shipping_option }) => {
  console.log(shipping_option)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/admin#select-fields-and-relations).

### Parameters

- id: (\`string\`) The ID of the shipping option to retrieve.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the shipping option.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminShippingOptionResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOptionResponse/page.mdx)\&#62;) The shipping option's details.

  - shipping\_option: (\[AdminShippingOption]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOption/page.mdx)) The shipping option's details.

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

## update

This method updates a shipping option. It sends a request to the
[Update Shipping Option](https://docs.medusajs.com/api/admin#shipping-options_postshippingoptionsid)
API route.

### Example

```ts
sdk.admin.shippingOption.update("so_123", {
  name: "Standard Shipping",
})
.then(({ shipping_option }) => {
  console.log(shipping_option)
})
```

### Parameters

- id: (\`string\`) The ID of the shipping option to update.
- body: (\[AdminUpdateShippingOption]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateShippingOption/page.mdx)) The details of the shipping option to update.

  - name: (\`string\`) The name of the shipping option. Customers can
    view this name during checkout.

  - data: (\`Record\<string, unknown>\`) Additional data that is useful for third-party fulfillment providers
    that process fulfillments for the shipping option.

  - price\_type: (\[ShippingOptionPriceType]\(../../../../../fulfillment/types/fulfillment.ShippingOptionPriceType/page.mdx)) The type of shipping option's price.

  - provider\_id: (\`string\`) The ID of the fulfillment provider that the shipping option belongs to.

  - shipping\_profile\_id: (\`string\`) The ID of the shipping profile that the shipping option belongs to.

    Learn more in the \[Shipping Options]\(https://docs.medusajs.com/resources/commerce-modules/fulfillment/shipping-option#shipping-profile-and-types)
    documentation.

  - type: (\[AdminCreateShippingOptionType]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateShippingOptionType/page.mdx)) The type of shipping option.

    Learn more in the \[Shipping Options]\(https://docs.medusajs.com/resources/commerce-modules/fulfillment/shipping-option#shipping-profile-and-types)
    documentation.

    - label: (\`string\`) The label of the shipping option type.

    - code: (\`string\`) The code of the shipping option type.

    - description: (\`string\`) The description of the shipping option type.

  - type\_id: (\`string\`) The ID of the type of shipping option.

    Learn more in the \[Shipping Option]\(https://docs.medusajs.com/resources/commerce-modules/fulfillment/shipping-option#shipping-profile-and-types)
    documentation.

  - prices: ((\[AdminUpdateShippingOptionPriceWithCurrency]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateShippingOptionPriceWithCurrency/page.mdx) \\| \[AdminUpdateShippingOptionPriceWithRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateShippingOptionPriceWithRegion/page.mdx))\[]) The prices of the shipping option.

    - rules: (\[PriceRule]\(../../../../../pricing\_models/variables/pricing\_models.PriceRule/page.mdx)\[]) The rules of the shipping option price that
      indicate when the price should be applied.

    - id: (\`string\`) The ID of the shipping option price that is being updated.
      If not provided, a new shipping option price will be created.

    - currency\_code: (\`string\`) The currency code of the shipping option price.

    - amount: (\`number\`) The amount of the shipping option price.

    - region\_id: (\`string\`) The ID of the region that the shipping option price belongs to.

  - rules: ((\[AdminCreateShippingOptionRule]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateShippingOptionRule/page.mdx) \\| \[AdminUpdateShippingOptionRule]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateShippingOptionRule/page.mdx))\[]) The rules of the shipping option.

    Learn more in the \[Shipping Option Rules]\(https://docs.medusajs.com/resources/commerce-modules/fulfillment/shipping-option#shipping-option-rules)
    documentation.

    - operator: (\[RuleOperatorType]\(../../../../../types/CommonTypes/types/types.CommonTypes.RuleOperatorType/page.mdx)) The operator of the shipping option rule.

    - attribute: (\`string\`) The attribute of the shipping option rule.

    - value: (\`string\` \\| \`string\`\[]) The value of the shipping option rule.

    - id: (\`string\`) The ID of the shipping option rule that is being updated.

  - metadata: (\`Record\<string, unknown>\`) Custom key-value pairs that can be added to the shipping option.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the shipping option.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminShippingOptionResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOptionResponse/page.mdx)\&#62;) The shipping option's details.

  - shipping\_option: (\[AdminShippingOption]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOption/page.mdx)) The shipping option's details.

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

## delete

This method deletes a shipping option. It sends a request to the
[Delete Shipping Option](https://docs.medusajs.com/api/admin#shipping-options_deleteshippingoptionsid)
API route.

### Example

```ts
sdk.admin.shippingOption.delete("so_123")
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- id: (\`string\`) The ID of the shipping option to delete.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminShippingOptionDeleteResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOptionDeleteResponse/page.mdx)\&#62;) The deletion's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (\`"shipping\_option"\`) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.

***

## list

This method retrieves a list of shipping options. It sends a request to the
[List Shipping Options](https://docs.medusajs.com/api/admin#shipping-options_getshippingoptions)
API route.

### Example

To retrieve the list of shipping options:

```ts
sdk.admin.shippingOption.list()
.then(({ shipping_options, count, limit, offset }) => {
  console.log(shipping_options)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.shippingOption.list({
  limit: 10,
  offset: 10
})
.then(({ shipping_options, count, limit, offset }) => {
  console.log(shipping_options)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each shipping option:

```ts
sdk.admin.shippingOption.list({
  fields: "id,*service_zone"
})
.then(({ shipping_options, count, limit, offset }) => {
  console.log(shipping_options)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/admin#select-fields-and-relations).

### Parameters

- query: (\[AdminShippingOptionListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOptionListParams/page.mdx)) Filters and pagination configurations.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - id: (\`string\` \\| \`string\`\[]) Filter by shipping option ID(s),

  - q: (\`string\`) Query or keywords to search the shipping option's searchable fields.

  - service\_zone\_id: (\`string\` \\| \`string\`\[]) Filter by the ID of the service zone(s) to retrieve the shipping options for.

  - stock\_location\_id: (\`string\` \\| \`string\`\[]) Filter by the ID of the stock location(s) to retrieve the shipping options for.

  - is\_return: (\`boolean\`) Filter by whether the shipping option is a return shipping option.

  - admin\_only: (\`boolean\`) Filter by whether the shipping option is only available to admins.

  - shipping\_profile\_id: (\`string\` \\| \`string\`\[]) Filter by the ID of the shipping profile(s) to retrieve the shipping options for.

  - provider\_id: (\`string\` \\| \`string\`\[]) Filter by the ID of the provider(s) to retrieve the shipping options for.

  - shipping\_option\_type\_id: (\`string\` \\| \`string\`\[]) Filter by the ID of the shipping option type(s) to retrieve the shipping options for.

  - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the shipping option was created.

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

  - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the shipping option was updated.

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

  - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the shipping option was deleted.

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

- Promise: (Promise\&#60;\[AdminShippingOptionListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminShippingOptionListResponse/page.mdx)\&#62;) The list of shipping options.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## updateRules

This method manages the rules of a shipping option to create, update, or remove them. It sends a request to the
[Manage Rules of a Shipping Option](https://docs.medusajs.com/api/admin#shipping-options_postshippingoptionsidrulesbatch)
API route.

### Example

```ts
sdk.admin.shippingOption.updateRules("so_123", {
  create: [{ attribute: "enabled_in_store", operator: "eq", value: "true" }],
})
.then(({ shipping_option }) => {
  console.log(shipping_option)
})
```

### Parameters

- id: (\`string\`) The ID of the shipping option to manage the rules for.
- body: (\[AdminUpdateShippingOptionRules]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateShippingOptionRules/page.mdx)) The details of the shipping option rules to manage.

  - create: (\`any\`\[]) The rules to create.

  - update: (\`any\`\[]) The rules to update.

  - delete: (\`string\`\[]) The rules to delete.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminUpdateShippingOptionRulesResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminUpdateShippingOptionRulesResponse/page.mdx)\&#62;) The shipping option's details.

  - created: (T\[]) The items that were created.

  - updated: (T\[]) The items that were updated.

  - deleted: (\`object\`) Details of the items that were deleted.

    - ids: (\`string\`\[]) The IDs of the items that were deleted.

    - object: (\`string\`) The type of the items that were deleted.

    - deleted: (\`boolean\`) Whether the items were deleted successfully.
