# fulfillmentProvider - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.fulfillmentProvider` set of methods used to send requests to Medusa's Admin API routes.

## list

This method retrieves a paginated list of fulfillment providers. It sends a request to the
[List Fulfillment Providers](https://docs.medusajs.com/api/admin#fulfillment-providers_getfulfillmentproviders)
API route.

### Example

To retrieve the list of fulfillment providers:

```ts
sdk.admin.fulfillmentProvider.list()
.then(({ fulfillment_providers, count, limit, offset }) => {
  console.log(fulfillment_providers)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.fulfillmentProvider.list({
  limit: 10,
  offset: 10
})
.then(({ fulfillment_providers, count, limit, offset }) => {
  console.log(fulfillment_providers)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each fulfillment provider:

```ts
sdk.admin.fulfillmentProvider.list({
  fields: "id"
})
.then(({ fulfillment_providers, count, limit, offset }) => {
  console.log(fulfillment_providers)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- query: (\[AdminGetFulfillmentProvidersParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetFulfillmentProvidersParams/page.mdx)) Filters and pagination configurations.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - id: (\`string\` \\| \`string\`\[]) Filter by provider ID(s).

  - q: (\`string\`) Query or keywords to filter the provider's searchable fields.

  - is\_enabled: (\`boolean\`) Filter by whether the provider is enabled.

  - stock\_location\_id: (\`string\` \\| \`string\`\[]) Filter by stock location ID(s) to retrieve their associated
    fulfillment providers.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminFulfillmentProviderListResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentProviderListResponse/page.mdx)\&#62;) The paginated list of providers.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - fulfillment\_providers: (\[AdminFulfillmentProvider]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentProvider/page.mdx)\[]) The list of fulfillment providers.

    - id: (\`string\`) The fulfillment provider's ID.

    - is\_enabled: (\`boolean\`) Whether the fulfillment provider is enabled.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## listFulfillmentOptions

This method retrieves a list of fulfillment options for a given fulfillment provider. It sends a request to the
[List Fulfillment Options](https://docs.medusajs.com/api/admin#fulfillment-providers_getfulfillmentprovidersidoptions)
API route.

### Example

```ts
sdk.admin.fulfillmentProvider.listFulfillmentOptions("fp_123")
.then(({ fulfillment_options }) => {
  console.log(fulfillment_options)
})
```

### Parameters

- id: (\`string\`) The ID of the fulfillment provider.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminFulfillmentProviderOptionsListResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentProviderOptionsListResponse/page.mdx)\&#62;) The list of fulfillment options.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - fulfillment\_options: (\[AdminFulfillmentProviderOption]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentProviderOption/page.mdx)\[]) The list of fulfillment options.

    - id: (\`string\`) The fulfillment provider option's ID.

    - is\_return: (\`boolean\`) Whether the fulfillment provider option can be used for returns.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.
