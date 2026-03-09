# views - JS SDK Admin Reference

:::note

To use this resource, make sure to [enable its feature flag: view\_configurations](https://docs.medusajs.com/development/feature-flags/toggle)

:::

This documentation provides a reference to the `sdk.admin.views` set of methods used to send requests to Medusa's Admin API routes.

## constructor

### Parameters

- client: (\[Client]\(../../../classes/js\_sdk.admin.Client/page.mdx))

  - fetch\_: (\[ClientFetch]\(../../../types/js\_sdk.admin.ClientFetch/page.mdx))

  - config: (\[Config]\(../../../types/js\_sdk.admin.Config/page.mdx))

    - baseUrl: (\`string\`)

    - globalHeaders: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx))

    - publishableKey: (\`string\`)

    - apiKey: (\`string\`)

    - auth: (\`object\`)

    - logger: (\[Logger]\(../../../types/js\_sdk.admin.Logger/page.mdx))

    - debug: (\`boolean\`)

  - logger: (\[Logger]\(../../../types/js\_sdk.admin.Logger/page.mdx))

    - error: ((...\`messages\`: \`string\`\[]) => \`void\`)

    - warn: ((...\`messages\`: \`string\`\[]) => \`void\`)

    - info: ((...\`messages\`: \`string\`\[]) => \`void\`)

    - debug: ((...\`messages\`: \`string\`\[]) => \`void\`)

  - DEFAULT\_JWT\_STORAGE\_KEY: (\`string\`)

  - token: (\`string\`)

***

## client

### fetch\_

### config

#### Properties

- baseUrl: (\`string\`)
- globalHeaders: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx))

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).
- publishableKey: (\`string\`)
- apiKey: (\`string\`)
- auth: (\`object\`)

  - type: (\`"jwt"\` \\| \`"session"\`)

  - jwtTokenStorageKey: (\`string\`)

  - jwtTokenStorageMethod: (\`"local"\` \\| \`"session"\` \\| \`"memory"\` \\| \`"custom"\` \\| \`"nostore"\`)

  - fetchCredentials: (\`"include"\` \\| \`"omit"\` \\| \`"same-origin"\`)

  - storage: (\[CustomStorage]\(../../../interfaces/js\_sdk.admin.CustomStorage/page.mdx))
- logger: (\[Logger]\(../../../types/js\_sdk.admin.Logger/page.mdx))

  - error: ((...\`messages\`: \`string\`\[]) => \`void\`)

  - warn: ((...\`messages\`: \`string\`\[]) => \`void\`)

  - info: ((...\`messages\`: \`string\`\[]) => \`void\`)

  - debug: ((...\`messages\`: \`string\`\[]) => \`void\`)
- debug: (\`boolean\`)

### logger

#### Properties

- error: ((...\`messages\`: \`string\`\[]) => \`void\`)
- warn: ((...\`messages\`: \`string\`\[]) => \`void\`)
- info: ((...\`messages\`: \`string\`\[]) => \`void\`)
- debug: ((...\`messages\`: \`string\`\[]) => \`void\`)

### DEFAULT\_JWT\_STORAGE\_KEY

### token

### constructor

#### Parameters

- config: (\[Config]\(../../../types/js\_sdk.admin.Config/page.mdx))

  - baseUrl: (\`string\`)

  - globalHeaders: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx))

    - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

      Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

  - publishableKey: (\`string\`)

  - apiKey: (\`string\`)

  - auth: (\`object\`)

    - type: (\`"jwt"\` \\| \`"session"\`)

    - jwtTokenStorageKey: (\`string\`)

    - jwtTokenStorageMethod: (\`"local"\` \\| \`"session"\` \\| \`"memory"\` \\| \`"custom"\` \\| \`"nostore"\`)

    - fetchCredentials: (\`"include"\` \\| \`"omit"\` \\| \`"same-origin"\`)

    - storage: (\[CustomStorage]\(../../../interfaces/js\_sdk.admin.CustomStorage/page.mdx))

  - logger: (\[Logger]\(../../../types/js\_sdk.admin.Logger/page.mdx))

    - error: ((...\`messages\`: \`string\`\[]) => \`void\`)

    - warn: ((...\`messages\`: \`string\`\[]) => \`void\`)

    - info: ((...\`messages\`: \`string\`\[]) => \`void\`)

    - debug: ((...\`messages\`: \`string\`\[]) => \`void\`)

  - debug: (\`boolean\`)

### fetch

`fetch` closely follows (and uses under the hood) the native `fetch` API. There are, however, few key differences:

- Non 2xx statuses throw a `FetchError` with the status code as the `status` property, rather than resolving the promise
- You can pass `body` and `query` as objects, and they will be encoded and stringified.
- The response gets parsed as JSON if the `accept` header is set to `application/json`, otherwise the raw Response object is returned

Since the response is dynamically determined, we cannot know if it is JSON or not. Therefore, it is important to pass `Response` as the return type

#### Type Parameters

- T: (\`unknown\`)

#### Parameters

- input: (\`string\` \\| \`URL\` \\| \`Request\`)
- init: (\[FetchArgs]\(../../../types/js\_sdk.admin.FetchArgs/page.mdx))

  - query: (\`Record\<string, any>\`)

  - headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx))

    - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

      Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

  - body: (\`RequestInit\`\[\`"body"\`] \\| \`Record\<string, any>\`)

#### Returns

- Promise: (Promise\&#60;T\&#62;) Promise\&#60;T\&#62;

### fetchStream

`fetchStream` is a helper method to deal with server-sent events. It returns an object with a stream and an abort function.
It follows a very similar interface to `fetch`, with the return value being an async generator.
The stream is an async generator that yields `ServerSentEventMessage` objects, which contains the event name, stringified data, and few other properties.
The caller is responsible for handling `disconnect` events and aborting the stream. The caller is also responsible for parsing the data field.

#### Parameters

- input: (\`string\` \\| \`URL\` \\| \`Request\`)
- init: (\[FetchArgs]\(../../../types/js\_sdk.admin.FetchArgs/page.mdx))

  - query: (\`Record\<string, any>\`)

  - headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx))

    - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

      Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

  - body: (\`RequestInit\`\[\`"body"\`] \\| \`Record\<string, any>\`)

#### Returns

- Promise: (Promise\&#60;\[FetchStreamResponse]\(../../../interfaces/js\_sdk.admin.FetchStreamResponse/page.mdx)\&#62;) FetchStreamResponse

  - stream: (\`null\` \\| AsyncGenerator\&#60;\[ServerSentEventMessage]\(../../../interfaces/js\_sdk.admin.ServerSentEventMessage/page.mdx), void, unknown\&#62;)

    - comment: (\`string\`) Ignored by the client.

    - event: (\`string\`) A string identifying the type of event described.

    - data: (\`string\`) The data field for the message. Split by new lines.

    - id: (\`string\` \\| \`number\`) The event ID to set the EventSource object's last event ID value.

    - retry: (\`number\`) The reconnection time.

  - abort: (() => \`void\`)

### setToken

#### Parameters

- token: (\`string\`)

#### Returns

- Promise: (Promise\&#60;void\&#62;)

### getToken

#### Returns

- Promise: (Promise\&#60;undefined \\| null \\| string\&#62;)

  - undefined \\| null \\| string: (\`undefined\` \\| \`null\` \\| \`string\`)

### clearToken

#### Returns

- Promise: (Promise\&#60;void\&#62;)

### clearToken\_

#### Returns

- Promise: (Promise\&#60;void\&#62;)

### initClient

#### Returns

- ClientFetch: ((\`input\`: \[FetchInput]\(../../../types/js\_sdk.admin.FetchInput/page.mdx), \`init?\`: \[FetchArgs]\(../../../types/js\_sdk.admin.FetchArgs/page.mdx)) => Promise\&#60;Response\&#62;)

### getApiKeyHeader\_

#### Returns

- object \\| object: (\`object\` \\| \`object\`)

### getPublishableKeyHeader\_

#### Returns

- object \\| object: (\`object\` \\| \`object\`)

### getJwtHeader\_

#### Returns

- Promise: (Promise\&#60;object \\| object\&#62;)

  - object \\| object: (\`object\` \\| \`object\`)

### setToken\_

#### Parameters

- token: (\`string\`)

#### Returns

- Promise: (Promise\&#60;void\&#62;)

### getToken\_

#### Returns

- Promise: (Promise\&#60;undefined \\| null \\| string\&#62;)

  - undefined \\| null \\| string: (\`undefined\` \\| \`null\` \\| \`string\`)

### getTokenStorageInfo\_

#### Returns

- storageMethod: (\`"session"\` \\| \`"local"\` \\| \`"memory"\` \\| \`"custom"\` \\| \`"nostore"\`)
- storageKey: (\`string\`)

- storageMethod: (\`"session"\` \\| \`"local"\` \\| \`"memory"\` \\| \`"custom"\` \\| \`"nostore"\`)
- storageKey: (\`string\`)

### throwError\_

#### Parameters

- message: (\`string\`)

***

## columns

:::note

This is available starting from [Medusa v2.10.3](https://github.com/medusajs/medusa/releases/tag/v2.10.3).

:::

### Parameters

- entity: (\`string\`)
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx))

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx))

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminViewsEntityColumnsResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminViewsEntityColumnsResponse/page.mdx)\&#62;)

  - columns: (\[AdminColumn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminColumn/page.mdx)\[]) The list of available columns for the entity.

    - id: (\`string\`) The column's unique identifier (e.g., "display\\\_id", "customer.email").

    - name: (\`string\`) The display name for the column.

    - field: (\`string\`) The field path to access the data.

    - sortable: (\`boolean\`) Whether the column can be sorted.

    - hideable: (\`boolean\`) Whether the column can be hidden.

    - default\_visible: (\`boolean\`) Whether the column is visible by default.

    - data\_type: (\`"string"\` \\| \`"number"\` \\| \`"boolean"\` \\| \`"object"\` \\| \`"enum"\` \\| \`"currency"\` \\| \`"date"\`) The data type of the column.

    - description: (\`string\`) Description of the column.

    - semantic\_type: (\`string\`) The semantic type provides additional context about the data.

    - context: (\`string\`) Additional context about the column.

    - computed: (\`object\`) Information about computed columns.

    - relationship: (\`object\`) Information about relationship columns.

    - default\_order: (\`number\`) Default order for sorting columns.

    - category: (\`"metadata"\` \\| \`"status"\` \\| \`"identifier"\` \\| \`"timestamp"\` \\| \`"metric"\` \\| \`"relationship"\`) Category for grouping columns.

***

## listConfigurations

:::note

This is available starting from [Medusa v2.10.3](https://github.com/medusajs/medusa/releases/tag/v2.10.3).

:::

### Parameters

- entity: (\`string\`)
- query: (\[AdminGetViewConfigurationsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetViewConfigurationsParams/page.mdx))

  - $and: ((\[AdminGetViewConfigurationsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetViewConfigurationsParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetViewConfigurationsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetViewConfigurationsParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[AdminGetViewConfigurationsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetViewConfigurationsParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetViewConfigurationsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetViewConfigurationsParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminGetViewConfigurationsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetViewConfigurationsParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetViewConfigurationsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetViewConfigurationsParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - id: (\`string\` \\| \`string\`\[]) IDs to filter view configurations by.

    - entity: (\`string\` \\| \`string\`\[]) Entity to filter by.

    - name: (\`string\` \\| \`string\`\[]) Name to filter by.

    - user\_id: (\`null\` \\| \`string\` \\| \`string\`\[]) User ID to filter by.

    - is\_system\_default: (\`boolean\`) Filter by system default status.

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Date filters for when the view configuration was created.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Date filters for when the view configuration was updated.

  - $or: ((\[AdminGetViewConfigurationsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetViewConfigurationsParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetViewConfigurationsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetViewConfigurationsParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[AdminGetViewConfigurationsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetViewConfigurationsParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetViewConfigurationsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetViewConfigurationsParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminGetViewConfigurationsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetViewConfigurationsParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetViewConfigurationsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetViewConfigurationsParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - id: (\`string\` \\| \`string\`\[]) IDs to filter view configurations by.

    - entity: (\`string\` \\| \`string\`\[]) Entity to filter by.

    - name: (\`string\` \\| \`string\`\[]) Name to filter by.

    - user\_id: (\`null\` \\| \`string\` \\| \`string\`\[]) User ID to filter by.

    - is\_system\_default: (\`boolean\`) Filter by system default status.

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Date filters for when the view configuration was created.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Date filters for when the view configuration was updated.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - id: (\`string\` \\| \`string\`\[]) IDs to filter view configurations by.

  - entity: (\`string\` \\| \`string\`\[]) Entity to filter by.

  - name: (\`string\` \\| \`string\`\[]) Name to filter by.

  - user\_id: (\`null\` \\| \`string\` \\| \`string\`\[]) User ID to filter by.

  - is\_system\_default: (\`boolean\`) Filter by system default status.

  - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Date filters for when the view configuration was created.

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

  - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Date filters for when the view configuration was updated.

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
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx))

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminViewConfigurationListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminViewConfigurationListResponse/page.mdx)\&#62;)

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## createConfiguration

:::note

This is available starting from [Medusa v2.10.3](https://github.com/medusajs/medusa/releases/tag/v2.10.3).

:::

### Parameters

- entity: (\`string\`)
- body: (\[AdminCreateViewConfiguration]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateViewConfiguration/page.mdx))

  - configuration: (\`object\`) The view configuration settings.

    - visible\_columns: (\`string\`\[]) The list of visible column IDs.

    - column\_order: (\`string\`\[]) The order of columns.

    - column\_widths: (\`Record\<string, number>\`) Custom column widths.

    - filters: (\`Record\<string, any>\`) Active filters for the view.

    - sorting: (\`null\` \\| \`object\`) Sorting configuration.

    - search: (\`string\`) Search query for the view.

  - name: (\`null\` \\| \`string\`) The name of the view configuration.

  - is\_system\_default: (\`boolean\`) Whether this is a system default configuration.

  - set\_active: (\`boolean\`) Whether to set this view as the active view after creation.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx))

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminViewConfigurationResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminViewConfigurationResponse/page.mdx)\&#62;)

  - view\_configuration: (\`null\` \\| \[AdminViewConfiguration]\(../../../../../types/interfaces/types.AdminViewConfiguration/page.mdx)) The view configuration's details.

    - id: (\`string\`) The view configuration's ID.

    - entity: (\`string\`) The entity this configuration is for (e.g., "order", "product").

    - name: (\`null\` \\| \`string\`) The name of the view configuration.

    - user\_id: (\`null\` \\| \`string\`) The ID of the user who owns this configuration, or null for system defaults.

    - is\_system\_default: (\`boolean\`) Whether this is a system default configuration.

    - configuration: (\`object\`) The view configuration settings.

    - created\_at: (\`Date\`) The date the view configuration was created.

    - updated\_at: (\`Date\`) The date the view configuration was updated.

***

## retrieveConfiguration

:::note

This is available starting from [Medusa v2.10.3](https://github.com/medusajs/medusa/releases/tag/v2.10.3).

:::

### Parameters

- entity: (\`string\`)
- id: (\`string\`)
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx))

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx))

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminViewConfigurationResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminViewConfigurationResponse/page.mdx)\&#62;)

  - view\_configuration: (\`null\` \\| \[AdminViewConfiguration]\(../../../../../types/interfaces/types.AdminViewConfiguration/page.mdx)) The view configuration's details.

    - id: (\`string\`) The view configuration's ID.

    - entity: (\`string\`) The entity this configuration is for (e.g., "order", "product").

    - name: (\`null\` \\| \`string\`) The name of the view configuration.

    - user\_id: (\`null\` \\| \`string\`) The ID of the user who owns this configuration, or null for system defaults.

    - is\_system\_default: (\`boolean\`) Whether this is a system default configuration.

    - configuration: (\`object\`) The view configuration settings.

    - created\_at: (\`Date\`) The date the view configuration was created.

    - updated\_at: (\`Date\`) The date the view configuration was updated.

***

## updateConfiguration

:::note

This is available starting from [Medusa v2.10.3](https://github.com/medusajs/medusa/releases/tag/v2.10.3).

:::

### Parameters

- entity: (\`string\`)
- id: (\`string\`)
- body: (\[AdminUpdateViewConfiguration]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateViewConfiguration/page.mdx))

  - name: (\`null\` \\| \`string\`) The name of the view configuration.

  - is\_system\_default: (\`boolean\`) Whether this is a system default configuration.

  - set\_active: (\`boolean\`) Whether to set this view as the active view after update.

  - configuration: (\`object\`) The view configuration settings.

    - visible\_columns: (\`string\`\[]) The list of visible column IDs.

    - column\_order: (\`string\`\[]) The order of columns.

    - column\_widths: (\`Record\<string, number>\`) Custom column widths.

    - filters: (\`Record\<string, any>\`) Active filters for the view.

    - sorting: (\`null\` \\| \`object\`) Sorting configuration.

    - search: (\`string\`) Search query for the view.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx))

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminViewConfigurationResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminViewConfigurationResponse/page.mdx)\&#62;)

  - view\_configuration: (\`null\` \\| \[AdminViewConfiguration]\(../../../../../types/interfaces/types.AdminViewConfiguration/page.mdx)) The view configuration's details.

    - id: (\`string\`) The view configuration's ID.

    - entity: (\`string\`) The entity this configuration is for (e.g., "order", "product").

    - name: (\`null\` \\| \`string\`) The name of the view configuration.

    - user\_id: (\`null\` \\| \`string\`) The ID of the user who owns this configuration, or null for system defaults.

    - is\_system\_default: (\`boolean\`) Whether this is a system default configuration.

    - configuration: (\`object\`) The view configuration settings.

    - created\_at: (\`Date\`) The date the view configuration was created.

    - updated\_at: (\`Date\`) The date the view configuration was updated.

***

## deleteConfiguration

:::note

This is available starting from [Medusa v2.10.3](https://github.com/medusajs/medusa/releases/tag/v2.10.3).

:::

### Parameters

- entity: (\`string\`)
- id: (\`string\`)
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx))

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminViewConfigurationDeleteResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminViewConfigurationDeleteResponse/page.mdx)\&#62;)

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (TObject) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.

***

## retrieveActiveConfiguration

:::note

This is available starting from [Medusa v2.10.3](https://github.com/medusajs/medusa/releases/tag/v2.10.3).

:::

### Parameters

- entity: (\`string\`)
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx))

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminViewConfigurationResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminViewConfigurationResponse/page.mdx) & object\&#62;)

  - AdminViewConfigurationResponse: (\`object\`)

  - active\_view\_configuration\_id: (\`null\` \\| \`string\`)

***

## setActiveConfiguration

:::note

This is available starting from [Medusa v2.10.3](https://github.com/medusajs/medusa/releases/tag/v2.10.3).

:::

### Parameters

- entity: (\`string\`)
- body: (\`object\`)

  - view\_configuration\_id: (\`null\` \\| \`string\`)
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx))

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;object\&#62;)

  - success: (\`boolean\`)
