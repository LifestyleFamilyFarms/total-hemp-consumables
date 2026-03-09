# store - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.store` set of methods used to send requests to Medusa's Admin API routes.

## retrieve

This method retrieves a store by its ID. It sends a request to the
[Get Store](https://docs.medusajs.com/api/admin#stores_getstoresid)
API route.

### Example

To retrieve a store by its ID:

```ts
sdk.admin.store.retrieve("store_123")
.then(({ store }) => {
  console.log(store)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.store.retrieve("store_123", {
  fields: "id,*supported_currencies"
})
.then(({ store }) => {
  console.log(store)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/admin#select-fields-and-relations).

### Parameters

- id: (\`string\`) The ID of the store to retrieve.
- query: (\[AdminStoreParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStoreParams/page.mdx)) Configure the fields and relations to retrieve in the store.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminStoreResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStoreResponse/page.mdx)\&#62;) The store's details.

  - store: (\[AdminStore]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStore/page.mdx)) The store's details.

    - id: (\`string\`) The store's ID.

    - name: (\`string\`) The store's name.

    - supported\_currencies: (\[AdminStoreCurrency]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStoreCurrency/page.mdx)\[]) The store's supported currencies.

    - default\_sales\_channel\_id: (\`null\` \\| \`string\`) The store's default sales channel ID.

    - default\_region\_id: (\`null\` \\| \`string\`) The store's default region ID.

    - default\_location\_id: (\`null\` \\| \`string\`) The store's default location ID.

    - metadata: (\`null\` \\| \`Record\<string, any>\`) Custom key-value pairs that can be added to the store.

    - created\_at: (\`string\`) The date the store was created.

    - updated\_at: (\`string\`) The date the store was updated.

***

## list

This method retrieves a list of stores. It sends a request to the
[List Stores](https://docs.medusajs.com/api/admin#stores_getstores)
API route.

### Example

To retrieve the list of stores:

```ts
sdk.admin.store.list()
.then(({ stores, count, limit, offset }) => {
  console.log(stores)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.store.list({
  limit: 10,
  offset: 10
})
.then(({ stores, count, limit, offset }) => {
  console.log(stores)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each store:

```ts
sdk.admin.store.list({
  fields: "id,*supported_currencies"
})
.then(({ stores, count, limit, offset }) => {
  console.log(stores)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/admin#select-fields-and-relations).

### Parameters

- query: (\[AdminStoreListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStoreListParams/page.mdx)) Filters and pagination configurations.

  - $and: ((\[AdminStoreListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStoreListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminStoreListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStoreListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[AdminStoreListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStoreListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminStoreListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStoreListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminStoreListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStoreListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminStoreListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStoreListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`) Query or keywords to search the store's searchable fields.

    - id: (\`string\` \\| \`string\`\[]) Filter by store ID(s).

    - name: (\`string\` \\| \`string\`\[]) Filter by store name.

  - $or: ((\[AdminStoreListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStoreListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminStoreListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStoreListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[AdminStoreListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStoreListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminStoreListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStoreListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminStoreListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStoreListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminStoreListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStoreListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`) Query or keywords to search the store's searchable fields.

    - id: (\`string\` \\| \`string\`\[]) Filter by store ID(s).

    - name: (\`string\` \\| \`string\`\[]) Filter by store name.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - q: (\`string\`) Query or keywords to search the store's searchable fields.

  - id: (\`string\` \\| \`string\`\[]) Filter by store ID(s).

  - name: (\`string\` \\| \`string\`\[]) Filter by store name.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminStoreListResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStoreListResponse/page.mdx)\&#62;) The list of stores.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - stores: (\[AdminStore]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStore/page.mdx)\[]) The list of stores.

    - id: (\`string\`) The store's ID.

    - name: (\`string\`) The store's name.

    - supported\_currencies: (\[AdminStoreCurrency]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStoreCurrency/page.mdx)\[]) The store's supported currencies.

    - default\_sales\_channel\_id: (\`null\` \\| \`string\`) The store's default sales channel ID.

    - default\_region\_id: (\`null\` \\| \`string\`) The store's default region ID.

    - default\_location\_id: (\`null\` \\| \`string\`) The store's default location ID.

    - metadata: (\`null\` \\| \`Record\<string, any>\`) Custom key-value pairs that can be added to the store.

    - created\_at: (\`string\`) The date the store was created.

    - updated\_at: (\`string\`) The date the store was updated.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## update

This method updates a store. It sends a request to the
[Update Store](https://docs.medusajs.com/api/admin#stores_poststoresid)
API route.

### Example

```ts
sdk.admin.store.update("store_123", {
  name: "My Store",
})
.then(({ store }) => {
  console.log(store)
})
```

### Parameters

- id: (\`string\`) The ID of the store to update.
- body: (\[AdminUpdateStore]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateStore/page.mdx)) The details of the store to update.

  - name: (\`string\`) The name of the store.

  - supported\_currencies: (\[AdminUpdateStoreSupportedCurrency]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateStoreSupportedCurrency/page.mdx)\[]) The supported currencies of the store.

    - currency\_code: (\`string\`) The currency's ISO 3 code.

    - is\_default: (\`boolean\`) Whether this currency is the default currency in the store.

    - is\_tax\_inclusive: (\`boolean\`) Whether prices in this currency are tax inclusive.

      Learn more in \[this documentation]\(https://docs.medusajs.com/resources/commerce-modules/pricing/tax-inclusive-pricing).

  - default\_sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the default sales channel of the store.

  - default\_region\_id: (\`null\` \\| \`string\`) The ID of the default region of the store.

  - default\_location\_id: (\`null\` \\| \`string\`) The ID of the default stock location of the store.

  - metadata: (\`null\` \\| \`Record\<string, any>\`) Custom key-value pairs to store custom data in the store.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the store.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminStoreResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStoreResponse/page.mdx)\&#62;) The store's details.

  - store: (\[AdminStore]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStore/page.mdx)) The store's details.

    - id: (\`string\`) The store's ID.

    - name: (\`string\`) The store's name.

    - supported\_currencies: (\[AdminStoreCurrency]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStoreCurrency/page.mdx)\[]) The store's supported currencies.

    - default\_sales\_channel\_id: (\`null\` \\| \`string\`) The store's default sales channel ID.

    - default\_region\_id: (\`null\` \\| \`string\`) The store's default region ID.

    - default\_location\_id: (\`null\` \\| \`string\`) The store's default location ID.

    - metadata: (\`null\` \\| \`Record\<string, any>\`) Custom key-value pairs that can be added to the store.

    - created\_at: (\`string\`) The date the store was created.

    - updated\_at: (\`string\`) The date the store was updated.
