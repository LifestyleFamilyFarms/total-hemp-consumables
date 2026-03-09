# currency - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.currency` set of methods used to send requests to Medusa's Admin API routes.

## list

This method retrieves a paginated list of currencies. It sends a request to the
[List Currencies](https://docs.medusajs.com/api/admin#currencies_getcurrencies)
API route.

### Example

To retrieve the list of currencies:

```ts
sdk.admin.currency.list()
.then(({ currencies, count, limit, offset }) => {
  console.log(currencies)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.currency.list({
  limit: 10,
  offset: 10
})
.then(({ currencies, count, limit, offset }) => {
  console.log(currencies)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each currency:

```ts
sdk.admin.currency.list({
  fields: "code,symbol"
})
.then(({ currencies, count, limit, offset }) => {
  console.log(currencies)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- query: (\[AdminCurrencyListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCurrencyListParams/page.mdx)) Filters and pagination configurations.

  - $and: ((\[AdminCurrencyListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCurrencyListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminCurrencyListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCurrencyListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[AdminCurrencyListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCurrencyListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminCurrencyListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCurrencyListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminCurrencyListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCurrencyListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminCurrencyListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCurrencyListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`) Query or keyword to search the currency's searchable fields.

    - code: (\`string\` \\| \`string\`\[]) Filter by currency code(s).

  - $or: ((\[AdminCurrencyListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCurrencyListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminCurrencyListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCurrencyListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[AdminCurrencyListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCurrencyListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminCurrencyListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCurrencyListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminCurrencyListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCurrencyListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminCurrencyListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCurrencyListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`) Query or keyword to search the currency's searchable fields.

    - code: (\`string\` \\| \`string\`\[]) Filter by currency code(s).

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - q: (\`string\`) Query or keyword to search the currency's searchable fields.

  - code: (\`string\` \\| \`string\`\[]) Filter by currency code(s).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminCurrencyListResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCurrencyListResponse/page.mdx)\&#62;) The paginated list of currencies.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - currencies: (\[AdminCurrency]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCurrency/page.mdx)\[]) The list of currencies

    - code: (\`string\`) The currency's code.

    - symbol: (\`string\`) The currency's symbol.

    - symbol\_native: (\`string\`) The currency's symbol in its native language or country.

    - name: (\`string\`) The currency's name.

    - decimal\_digits: (\`number\`) The number of digits after the decimal for prices in this currency.

    - rounding: (\`number\`) The rounding percision applied on prices in this currency.

    - created\_at: (\`string\`) The date the currency was created.

    - updated\_at: (\`string\`) The date the currency was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the currency was deleted.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## retrieve

This method retrieves a currency by its code. It sends a request to the
[Get Currency](https://docs.medusajs.com/api/admin#currencies_getcurrenciescode) API route.

### Example

To retrieve a currency by its code:

```ts
sdk.admin.currency.retrieve("usd")
.then(({ currency }) => {
  console.log(currency)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.currency.retrieve("usd", {
  fields: "code,symbol"
})
.then(({ currency }) => {
  console.log(currency)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- code: (\`string\`) The currency's code.
- query: (\[AdminCurrencyParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCurrencyParams/page.mdx)) Configure the fields to retrieve in the currency.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminCurrencyResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCurrencyResponse/page.mdx)\&#62;) The currency's details.

  - currency: (\[AdminCurrency]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCurrency/page.mdx)) The currency's details.

    - code: (\`string\`) The currency's code.

    - symbol: (\`string\`) The currency's symbol.

    - symbol\_native: (\`string\`) The currency's symbol in its native language or country.

    - name: (\`string\`) The currency's name.

    - decimal\_digits: (\`number\`) The number of digits after the decimal for prices in this currency.

    - rounding: (\`number\`) The rounding percision applied on prices in this currency.

    - created\_at: (\`string\`) The date the currency was created.

    - updated\_at: (\`string\`) The date the currency was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the currency was deleted.
