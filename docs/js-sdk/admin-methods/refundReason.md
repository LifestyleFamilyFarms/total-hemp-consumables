# refundReason - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.refundReason` set of methods used to send requests to Medusa's Admin API routes.

## list

This method retrieves a list of refund reasons. It sends a request to the
[List Refund Reasons](https://docs.medusajs.com/api/admin#refund-reasons_getrefundreasons)
API route.

### Example

To retrieve the list of refund reasons:

```ts
sdk.admin.refundReason.list()
.then(({ refund_reasons, count, limit, offset }) => {
  console.log(refund_reasons)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.refundReason.list({
  limit: 10,
  offset: 10
})
.then(({ refund_reasons, count, limit, offset }) => {
  console.log(refund_reasons)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each refund reason:

```ts
sdk.admin.refundReason.list({
  fields: "id,label"
})
.then(({ refund_reasons, count, limit, offset }) => {
  console.log(refund_reasons)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/admin#select-fields-and-relations).

### Parameters

- query: (\[AdminRefundReasonListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRefundReasonListParams/page.mdx)) Filters and pagination configurations.

  - $and: ((\[AdminRefundReasonListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRefundReasonListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminRefundReasonListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRefundReasonListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[AdminRefundReasonListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRefundReasonListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminRefundReasonListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRefundReasonListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminRefundReasonListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRefundReasonListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminRefundReasonListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRefundReasonListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`) A search term to search for refund reasons by label or description.

    - id: (\`string\` \\| \`string\`\[]) Filter by refund reason ID(s).

    - parent\_refund\_reason\_id: (\`string\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by parent refund reason ID(s).

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by update date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the refund reason's deletion date.

  - $or: ((\[AdminRefundReasonListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRefundReasonListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminRefundReasonListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRefundReasonListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[AdminRefundReasonListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRefundReasonListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminRefundReasonListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRefundReasonListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminRefundReasonListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRefundReasonListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminRefundReasonListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRefundReasonListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`) A search term to search for refund reasons by label or description.

    - id: (\`string\` \\| \`string\`\[]) Filter by refund reason ID(s).

    - parent\_refund\_reason\_id: (\`string\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by parent refund reason ID(s).

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by update date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the refund reason's deletion date.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - q: (\`string\`) A search term to search for refund reasons by label or description.

  - id: (\`string\` \\| \`string\`\[]) Filter by refund reason ID(s).

  - parent\_refund\_reason\_id: (\`string\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by parent refund reason ID(s).

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

  - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by creation date.

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

  - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by update date.

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

  - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the refund reason's deletion date.

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

- Promise: (Promise\&#60;\[RefundReasonsResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.RefundReasonsResponse/page.mdx)\&#62;) The paginated list of refund reasons.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## retrieve

This method retrieves a refund reason by ID. It sends a request to the
[Get Refund Reason](https://docs.medusajs.com/api/admin#refund-reasons_getrefundreasonsid)
API route.

:::note

This is available starting from [Medusa v2.11.0](https://github.com/medusajs/medusa/releases/tag/v2.11.0).

:::

### Example

To retrieve a refund reason by its ID:

```ts
sdk.admin.refundReason.retrieve("refr_123")
.then(({ refund_reason }) => {
  console.log(refund_reason)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.refundReason.retrieve("refr_123", {
  fields: "id,code"
})
.then(({ refund_reason }) => {
  console.log(refund_reason)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/admin#select-fields-and-relations).

### Parameters

- id: (\`string\`) The refund reason's ID.
- query: (\[AdminRefundReasonParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRefundReasonParams/page.mdx)) Configure the fields and relations to retrieve in the refund reason.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminRefundReasonResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRefundReasonResponse/page.mdx)\&#62;) The refund reason's details.

  - refund\_reason: (\[AdminRefundReason]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRefundReason/page.mdx)) The refund reason's details.

    - id: (\`string\`) The refund reason's ID.

    - label: (\`string\`) The refund reason's label.

    - code: (\`string\`) The refund reason's code.

    - created\_at: (\`string\`) The date that the refund reason was created.

    - updated\_at: (\`string\`) The date that the refund reason was updated.

    - description: (\`null\` \\| \`string\`) The refund reason's description.

    - metadata: (\`null\` \\| \`Record\<string, any>\`) Custom key-value pairs that can be added to the refund reason.

***

## create

This method creates a refund reason. It sends a request to the
[Create Refund Reason](https://docs.medusajs.com/api/admin#refund-reasons_postrefundreasons)
API route.

:::note

This is available starting from [Medusa v2.11.0](https://github.com/medusajs/medusa/releases/tag/v2.11.0).

:::

### Example

```ts
sdk.admin.refundReason.create({
  code: "refund",
  label: "Refund",
})
.then(({ refund_reason }) => {
  console.log(refund_reason)
})
```

### Parameters

- body: (\[AdminCreateRefundReason]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateRefundReason/page.mdx)) The details of the refund reason to create.

  - label: (\`string\`) The refund reason's label.

  - code: (\`string\`) The refund reason's code.

  - description: (\`string\`) The refund reason's description.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Custom key-value pairs that can be added to the refund reason.
- query: (\[AdminRefundReasonParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRefundReasonParams/page.mdx)) Configure the fields and relations to retrieve in the refund reason.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminRefundReasonResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRefundReasonResponse/page.mdx)\&#62;) The refund reason's details.

  - refund\_reason: (\[AdminRefundReason]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRefundReason/page.mdx)) The refund reason's details.

    - id: (\`string\`) The refund reason's ID.

    - label: (\`string\`) The refund reason's label.

    - code: (\`string\`) The refund reason's code.

    - created\_at: (\`string\`) The date that the refund reason was created.

    - updated\_at: (\`string\`) The date that the refund reason was updated.

    - description: (\`null\` \\| \`string\`) The refund reason's description.

    - metadata: (\`null\` \\| \`Record\<string, any>\`) Custom key-value pairs that can be added to the refund reason.

***

## update

This method updates a refund reason. It sends a request to the
[Update Refund Reason](https://docs.medusajs.com/api/admin#refund-reasons_postrefundreasonsid)
API route.

:::note

This is available starting from [Medusa v2.11.0](https://github.com/medusajs/medusa/releases/tag/v2.11.0).

:::

### Example

```ts
sdk.admin.refundReason.update("ret_123", {
  code: "refund",
  label: "Refund",
})
.then(({ refund_reason }) => {
  console.log(refund_reason)
})
```

### Parameters

- id: (\`string\`) The refund reason's ID.
- body: (\[AdminUpdateRefundReason]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateRefundReason/page.mdx)) The details of the refund reason to update.

  - label: (\`string\`) The refund reason's label.

  - code: (\`string\`) The refund reason's code.

  - description: (\`string\`) The refund reason's description.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Custom key-value pairs that can be added to the refund reason.
- query: (\[AdminRefundReasonParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRefundReasonParams/page.mdx)) Configure the fields and relations to retrieve in the refund reason.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminRefundReasonResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRefundReasonResponse/page.mdx)\&#62;) The refund reason's details.

  - refund\_reason: (\[AdminRefundReason]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRefundReason/page.mdx)) The refund reason's details.

    - id: (\`string\`) The refund reason's ID.

    - label: (\`string\`) The refund reason's label.

    - code: (\`string\`) The refund reason's code.

    - created\_at: (\`string\`) The date that the refund reason was created.

    - updated\_at: (\`string\`) The date that the refund reason was updated.

    - description: (\`null\` \\| \`string\`) The refund reason's description.

    - metadata: (\`null\` \\| \`Record\<string, any>\`) Custom key-value pairs that can be added to the refund reason.

***

## delete

This method deletes a refund reason. It sends a request to the
[Delete Refund Reason](https://docs.medusajs.com/api/admin#refund-reasons_deleterefundreasonsid)
API route.

:::note

This is available starting from [Medusa v2.11.0](https://github.com/medusajs/medusa/releases/tag/v2.11.0).

:::

### Example

```ts
sdk.admin.refundReason.delete("ret_123")
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- id: (\`string\`) The refund reason's ID.
- query: (\[AdminRefundReasonParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRefundReasonParams/page.mdx)) Query parameters to pass to the request.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminRefundReasonDeleteResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRefundReasonDeleteResponse/page.mdx)\&#62;) The deletion's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (\`"refund\_reason"\`) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.
