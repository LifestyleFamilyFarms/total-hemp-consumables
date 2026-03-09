# returnReason - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.returnReason` set of methods used to send requests to Medusa's Admin API routes.

## list

This method retrieves a list of return reasons. It sends a request to the
[List Return Reasons](https://docs.medusajs.com/api/admin#return-reasons_returnreason_schema)
API route.

### Example

To retrieve the list of return reasons:

```ts
sdk.admin.returnReason.list()
.then(({ return_reasons, count, limit, offset }) => {
  console.log(return_reasons)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.returnReason.list({
  limit: 10,
  offset: 10
})
.then(({ return_reasons, count, limit, offset }) => {
  console.log(return_reasons)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each return reason:

```ts
sdk.admin.returnReason.list({
  fields: "id,value"
})
.then(({ return_reasons, count, limit, offset }) => {
  console.log(return_reasons)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/admin#select-fields-and-relations).

### Parameters

- query: (\[AdminReturnReasonListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnReasonListParams/page.mdx)) Filters and pagination configurations.

  - $and: ((\[AdminReturnReasonListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnReasonListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminReturnReasonListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnReasonListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[AdminReturnReasonListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnReasonListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminReturnReasonListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnReasonListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminReturnReasonListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnReasonListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminReturnReasonListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnReasonListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the return reason's deletion date.

    - q: (\`string\`)

    - id: (\`string\` \\| \`string\`\[])

    - value: (\`string\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;)

    - label: (\`string\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;)

    - description: (\`string\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;)

    - parent\_return\_reason\_id: (\`string\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;)

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;)

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;)

  - $or: ((\[AdminReturnReasonListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnReasonListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminReturnReasonListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnReasonListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[AdminReturnReasonListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnReasonListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminReturnReasonListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnReasonListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminReturnReasonListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnReasonListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminReturnReasonListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnReasonListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the return reason's deletion date.

    - q: (\`string\`)

    - id: (\`string\` \\| \`string\`\[])

    - value: (\`string\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;)

    - label: (\`string\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;)

    - description: (\`string\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;)

    - parent\_return\_reason\_id: (\`string\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;)

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;)

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;)

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the return reason's deletion date.

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

  - q: (\`string\`)

  - id: (\`string\` \\| \`string\`\[])

  - value: (\`string\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;)

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

  - label: (\`string\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;)

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

  - description: (\`string\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;)

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

  - parent\_return\_reason\_id: (\`string\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;)

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

  - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;)

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

  - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;)

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

- Promise: (Promise\&#60;\[AdminReturnReasonListResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnReasonListResponse/page.mdx)\&#62;) The paginated list of return reasons.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - return\_reasons: (\[AdminReturnReason]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnReason/page.mdx)\[]) The list of return reasons.

    - id: (\`string\`) The return reason's ID.

    - value: (\`string\`) The return reason's value.

    - label: (\`string\`) The return reason's label.

    - created\_at: (\`string\`) The date that the return reason was created.

    - updated\_at: (\`string\`) The date that the return reason was updated.

    - description: (\`null\` \\| \`string\`) The return reason's description.

    - metadata: (\`null\` \\| \`Record\<string, any>\`) Custom key-value pairs that can be added to the return reason.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## retrieve

This method retrieves a return reason by ID. It sends a request to the
[Get Return Reason](https://docs.medusajs.com/api/admin#return-reasons_getreturnreasonsid)
API route.

### Example

To retrieve a return reason by its ID:

```ts
sdk.admin.returnReason.retrieve("ret_123")
.then(({ return_reason }) => {
  console.log(return_reason)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.returnReason.retrieve("ret_123", {
  fields: "id,value"
})
.then(({ return_reason }) => {
  console.log(return_reason)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/admin#select-fields-and-relations).

### Parameters

- id: (\`string\`) The return reason's ID.
- query: (\[AdminReturnReasonParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnReasonParams/page.mdx)) Configure the fields and relations to retrieve in the return reason.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminReturnReasonResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnReasonResponse/page.mdx)\&#62;) The return reason's details.

  - return\_reason: (\[AdminReturnReason]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnReason/page.mdx)) The return reason's details.

    - id: (\`string\`) The return reason's ID.

    - value: (\`string\`) The return reason's value.

    - label: (\`string\`) The return reason's label.

    - created\_at: (\`string\`) The date that the return reason was created.

    - updated\_at: (\`string\`) The date that the return reason was updated.

    - description: (\`null\` \\| \`string\`) The return reason's description.

    - metadata: (\`null\` \\| \`Record\<string, any>\`) Custom key-value pairs that can be added to the return reason.

***

## create

This method creates a return reason. It sends a request to the
[Create Return Reason](https://docs.medusajs.com/api/admin#return-reasons_postreturnreasons)
API route.

### Example

```ts
sdk.admin.returnReason.create({
  value: "refund",
  label: "Refund",
})
.then(({ return_reason }) => {
  console.log(return_reason)
})
```

### Parameters

- body: (\[AdminCreateReturnReason]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateReturnReason/page.mdx)) The details of the return reason to create.

  - value: (\`string\`) The return reason's value.

  - label: (\`string\`) The return reason's label.

  - description: (\`string\`) The return reason's description.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Custom key-value pairs that can be added to the return reason.

  - parent\_return\_reason\_id: (\`string\`) The ID of the return reason's parent.
- query: (\[AdminReturnReasonParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnReasonParams/page.mdx)) Configure the fields and relations to retrieve in the return reason.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminReturnReasonResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnReasonResponse/page.mdx)\&#62;) The return reason's details.

  - return\_reason: (\[AdminReturnReason]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnReason/page.mdx)) The return reason's details.

    - id: (\`string\`) The return reason's ID.

    - value: (\`string\`) The return reason's value.

    - label: (\`string\`) The return reason's label.

    - created\_at: (\`string\`) The date that the return reason was created.

    - updated\_at: (\`string\`) The date that the return reason was updated.

    - description: (\`null\` \\| \`string\`) The return reason's description.

    - metadata: (\`null\` \\| \`Record\<string, any>\`) Custom key-value pairs that can be added to the return reason.

***

## update

This method updates a return reason. It sends a request to the
[Update Return Reason](https://docs.medusajs.com/api/admin#return-reasons_postreturnreasonsid)
API route.

### Example

```ts
sdk.admin.returnReason.update("ret_123", {
  value: "refund",
  label: "Refund",
})
.then(({ return_reason }) => {
  console.log(return_reason)
})
```

### Parameters

- id: (\`string\`) The return reason's ID.
- body: (\[AdminUpdateReturnReason]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateReturnReason/page.mdx)) The details of the return reason to update.

  - value: (\`string\`) The return reason's value.

  - label: (\`string\`) The return reason's label.

  - description: (\`string\`) The return reason's description.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Custom key-value pairs that can be added to the return reason.
- query: (\[AdminReturnReasonParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnReasonParams/page.mdx)) Configure the fields and relations to retrieve in the return reason.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminReturnReasonResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnReasonResponse/page.mdx)\&#62;) The return reason's details.

  - return\_reason: (\[AdminReturnReason]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnReason/page.mdx)) The return reason's details.

    - id: (\`string\`) The return reason's ID.

    - value: (\`string\`) The return reason's value.

    - label: (\`string\`) The return reason's label.

    - created\_at: (\`string\`) The date that the return reason was created.

    - updated\_at: (\`string\`) The date that the return reason was updated.

    - description: (\`null\` \\| \`string\`) The return reason's description.

    - metadata: (\`null\` \\| \`Record\<string, any>\`) Custom key-value pairs that can be added to the return reason.

***

## delete

This method deletes a return reason. It sends a request to the
[Delete Return Reason](https://docs.medusajs.com/api/admin#return-reasons_deletereturnreasonsid)
API route.

### Example

```ts
sdk.admin.returnReason.delete("ret_123")
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- id: (\`string\`) The return reason's ID.
- query: (\[AdminReturnReasonParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnReasonParams/page.mdx)) Query parameters to pass to the request.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminReturnReasonDeleteResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnReasonDeleteResponse/page.mdx)\&#62;) The deletion's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (\`"return\_reason"\`) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.
