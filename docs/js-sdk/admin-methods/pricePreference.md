# pricePreference - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.pricePreference` set of methods used to send requests to Medusa's Admin API routes.

## retrieve

This method retrieves a price preference. It sends a request to the
[Get Price Preference](https://docs.medusajs.com/api/admin#price-preferences_getpricepreferencesid)
API route.

### Example

To retrieve a price preference by its ID:

```ts
sdk.admin.pricePreference.retrieve("prpref_123")
.then(({ price_preference }) => {
  console.log(price_preference)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.pricePreference.retrieve("prpref_123", {
  fields: "id,is_tax_inclusive"
})
.then(({ price_preference }) => {
  console.log(price_preference)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- id: (\`string\`) The price preference's ID.
- query: (\[AdminPricePreferenceParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPricePreferenceParams/page.mdx)) Configure the fields to retrieve in the price preference.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminPricePreferenceResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPricePreferenceResponse/page.mdx)\&#62;) The price preference's details.

  - price\_preference: (\[AdminPricePreference]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPricePreference/page.mdx)) The price preference's details.

    - id: (\`string\`) The price preference's ID.

    - attribute: (\`null\` \\| \`string\`) The attribute that the price preference refers to.

      Current supported values: \`region\_id\` and \`currency\_code\`.

    - value: (\`null\` \\| \`string\`) The attribute's value. For example, if the \`attribute\` is \`region\_id\`,
      the value is a region's ID. Prices in that region use this price
      preference.

    - is\_tax\_inclusive: (\`boolean\`) Whether prices matching this price preference have
      taxes included in their amount.

    - created\_at: (\`string\`) The date that the price preference was created.

    - updated\_at: (\`string\`) The date that the price preference was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date that the price preference was deleted.

***

## list

This method retrieves a paginated list of price preferences. It sends a request to the
[List Price Preferences](https://docs.medusajs.com/api/admin#price-preferences_getpricepreferences) API route.

### Example

To retrieve the list of price preferences:

```ts
sdk.admin.pricePreference.list()
.then(({ price_preferences, count, limit, offset }) => {
  console.log(price_preferences)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.pricePreference.list({
  limit: 10,
  offset: 10
})
.then(({ price_preferences, count, limit, offset }) => {
  console.log(price_preferences)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each price preference:

```ts
sdk.admin.pricePreference.list({
  fields: "id,is_tax_inclusive"
})
.then(({ price_preferences, count, limit, offset }) => {
  console.log(price_preferences)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- query: (\[AdminPricePreferenceListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPricePreferenceListParams/page.mdx)) Filters and pagination configurations.

  - $and: ((\[AdminPricePreferenceListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPricePreferenceListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminPricePreferenceListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPricePreferenceListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[AdminPricePreferenceListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPricePreferenceListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminPricePreferenceListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPricePreferenceListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminPricePreferenceListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPricePreferenceListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminPricePreferenceListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPricePreferenceListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - id: (\`string\` \\| \`string\`\[]) Filter by price preference ID(s).

    - attribute: (\`string\` \\| \`string\`\[]) Filter by attribute(s).

    - value: (\`string\` \\| \`string\`\[]) Filter by value(s).

    - q: (\`string\`) Query or keyword to filter the price preference's searchable fields.

  - $or: ((\[AdminPricePreferenceListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPricePreferenceListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminPricePreferenceListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPricePreferenceListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[AdminPricePreferenceListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPricePreferenceListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminPricePreferenceListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPricePreferenceListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminPricePreferenceListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPricePreferenceListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminPricePreferenceListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPricePreferenceListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - id: (\`string\` \\| \`string\`\[]) Filter by price preference ID(s).

    - attribute: (\`string\` \\| \`string\`\[]) Filter by attribute(s).

    - value: (\`string\` \\| \`string\`\[]) Filter by value(s).

    - q: (\`string\`) Query or keyword to filter the price preference's searchable fields.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - id: (\`string\` \\| \`string\`\[]) Filter by price preference ID(s).

  - attribute: (\`string\` \\| \`string\`\[]) Filter by attribute(s).

  - value: (\`string\` \\| \`string\`\[]) Filter by value(s).

  - q: (\`string\`) Query or keyword to filter the price preference's searchable fields.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminPricePreferenceListResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPricePreferenceListResponse/page.mdx)\&#62;) The paginated list of price preferences.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - price\_preferences: (\[AdminPricePreference]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPricePreference/page.mdx)\[]) The list of price preferences.

    - id: (\`string\`) The price preference's ID.

    - attribute: (\`null\` \\| \`string\`) The attribute that the price preference refers to.

      Current supported values: \`region\_id\` and \`currency\_code\`.

    - value: (\`null\` \\| \`string\`) The attribute's value. For example, if the \`attribute\` is \`region\_id\`,
      the value is a region's ID. Prices in that region use this price
      preference.

    - is\_tax\_inclusive: (\`boolean\`) Whether prices matching this price preference have
      taxes included in their amount.

    - created\_at: (\`string\`) The date that the price preference was created.

    - updated\_at: (\`string\`) The date that the price preference was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date that the price preference was deleted.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## create

This method creates a price preference. It sends a request to the
[Create Price Preference](https://docs.medusajs.com/api/admin#price-preferences_postpricepreferences)
API route.

### Example

```ts
sdk.admin.pricePreference.create({
  attribute: "region_id",
  value: "region_123",
  is_tax_inclusive: true
})
.then(({ price_preference }) => {
  console.log(price_preference)
})
```

### Parameters

- body: (\[AdminCreatePricePreference]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreatePricePreference/page.mdx)) The details of the price preference to create.

  - attribute: (\`string\`) The attribute that the price preference refers to.

    Current supported values: \`region\_id\` and \`currency\_code\`.

  - value: (\`string\`) The attribute's value. For example, if the \`attribute\` is \`region\_id\`,
    the value is a region's ID. Prices in that region use this price
    preference.

  - is\_tax\_inclusive: (\`boolean\`) Whether prices matching this price preference have
    taxes included in their amount.
- query: (\[AdminPricePreferenceParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPricePreferenceParams/page.mdx)) Configure the fields to retrieve in the price preference.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminPricePreferenceResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPricePreferenceResponse/page.mdx)\&#62;) The price preference's details.

  - price\_preference: (\[AdminPricePreference]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPricePreference/page.mdx)) The price preference's details.

    - id: (\`string\`) The price preference's ID.

    - attribute: (\`null\` \\| \`string\`) The attribute that the price preference refers to.

      Current supported values: \`region\_id\` and \`currency\_code\`.

    - value: (\`null\` \\| \`string\`) The attribute's value. For example, if the \`attribute\` is \`region\_id\`,
      the value is a region's ID. Prices in that region use this price
      preference.

    - is\_tax\_inclusive: (\`boolean\`) Whether prices matching this price preference have
      taxes included in their amount.

    - created\_at: (\`string\`) The date that the price preference was created.

    - updated\_at: (\`string\`) The date that the price preference was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date that the price preference was deleted.

***

## update

This method updates a price preference. It sends a request to the
[Update Price Preference](https://docs.medusajs.com/api/admin#price-preferences_postpricepreferencesid)
API route.

### Example

```ts
sdk.admin.pricePreference.update("prpref_123", {
  is_tax_inclusive: true
})
.then(({ price_preference }) => {
  console.log(price_preference)
})
```

### Parameters

- id: (\`string\`) The price preference's ID.
- body: (\[AdminUpdatePricePreference]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdatePricePreference/page.mdx)) The data to update in the price preference.

  - attribute: (\`null\` \\| \`string\`) The attribute that the price preference refers to.

    Current supported values: \`region\_id\` and \`currency\_code\`.

  - value: (\`null\` \\| \`string\`) The attribute's value. For example, if the \`attribute\` is \`region\_id\`,
    the value is a region's ID. Prices in that region use this price
    preference.

  - is\_tax\_inclusive: (\`boolean\`) Whether prices matching this price preference have
    taxes included in their amount.
- query: (\[AdminPricePreferenceParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPricePreferenceParams/page.mdx)) Configure the fields to retrieve in the price preference.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminPricePreferenceResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPricePreferenceResponse/page.mdx)\&#62;) The price preference's details.

  - price\_preference: (\[AdminPricePreference]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPricePreference/page.mdx)) The price preference's details.

    - id: (\`string\`) The price preference's ID.

    - attribute: (\`null\` \\| \`string\`) The attribute that the price preference refers to.

      Current supported values: \`region\_id\` and \`currency\_code\`.

    - value: (\`null\` \\| \`string\`) The attribute's value. For example, if the \`attribute\` is \`region\_id\`,
      the value is a region's ID. Prices in that region use this price
      preference.

    - is\_tax\_inclusive: (\`boolean\`) Whether prices matching this price preference have
      taxes included in their amount.

    - created\_at: (\`string\`) The date that the price preference was created.

    - updated\_at: (\`string\`) The date that the price preference was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date that the price preference was deleted.

***

## delete

This method deletes a price preference. It sends a request to the
[Delete Price Preference](https://docs.medusajs.com/api/admin#price-preferences_deletepricepreferencesid)
API route.

### Example

```ts
sdk.admin.pricePreference.delete("prpref_123")
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- id: (\`string\`) The price preference's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminPricePreferenceDeleteResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPricePreferenceDeleteResponse/page.mdx)\&#62;) The deletion's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (\`"price\_preference"\`) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.
