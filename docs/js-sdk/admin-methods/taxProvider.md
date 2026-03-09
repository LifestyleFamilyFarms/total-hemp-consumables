# taxProvider - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.taxProvider` set of methods used to send requests to Medusa's Admin API routes.

## list

This method retrieves a list of tax providers. It sends a request to the
[List Tax Providers](https://docs.medusajs.com/api/admin#tax-providers_gettaxproviders)
API route.

:::note

This is available starting from [Medusa v2.8.0](https://github.com/medusajs/medusa/releases/tag/v2.8.0).

:::

### Example

To retrieve the list of tax providers:

```ts
sdk.admin.taxProvider.list()
.then(({ tax_providers, count, limit, offset }) => {
  console.log(tax_providers)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.taxProvider.list({
  limit: 10,
  offset: 10,
})
.then(({ tax_providers, count, limit, offset }) => {
  console.log(tax_providers)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each products:

```ts
sdk.admin.taxProvider.list({
  fields: "id,*regions"
})
.then(({ tax_providers, count, limit, offset }) => {
  console.log(tax_providers)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- query: (\[AdminGetTaxProvidersParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetTaxProvidersParams/page.mdx)) Filters and pagination configurations.

  - $and: ((\[AdminGetTaxProvidersParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetTaxProvidersParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetTaxProvidersParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetTaxProvidersParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[AdminGetTaxProvidersParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetTaxProvidersParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetTaxProvidersParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetTaxProvidersParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminGetTaxProvidersParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetTaxProvidersParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetTaxProvidersParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetTaxProvidersParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - id: (\`string\` \\| \`string\`\[]) Filter by tax provider ID(s).

    - is\_enabled: (\`boolean\`) Whether the tax provider is enabled.

  - $or: ((\[AdminGetTaxProvidersParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetTaxProvidersParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetTaxProvidersParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetTaxProvidersParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[AdminGetTaxProvidersParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetTaxProvidersParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetTaxProvidersParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetTaxProvidersParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminGetTaxProvidersParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetTaxProvidersParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetTaxProvidersParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetTaxProvidersParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - id: (\`string\` \\| \`string\`\[]) Filter by tax provider ID(s).

    - is\_enabled: (\`boolean\`) Whether the tax provider is enabled.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - id: (\`string\` \\| \`string\`\[]) Filter by tax provider ID(s).

  - is\_enabled: (\`boolean\`) Whether the tax provider is enabled.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminTaxProviderListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminTaxProviderListResponse/page.mdx)\&#62;) The list of tax providers.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.
