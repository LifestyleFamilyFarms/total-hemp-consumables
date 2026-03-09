# claim - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.claim` set of methods used to send requests to Medusa's Admin API routes.

## list

This method retrieves a paginated list of claims. It sends a request to the
[List Claims](https://docs.medusajs.com/api/admin#claims_getclaims) API route.

### Example

To retrieve the list of claims:

```ts
sdk.admin.claim.list()
.then(({ claims, count, limit, offset }) => {
  console.log(claims)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.claim.list({
  limit: 10,
  offset: 10
})
.then(({ claims, count, limit, offset }) => {
  console.log(claims)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each claim:

```ts
sdk.admin.claim.list({
  fields: "id,*additional_items"
})
.then(({ claims, count, limit, offset }) => {
  console.log(claims)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- query: (\[AdminClaimListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimListParams/page.mdx)) Filters and pagination configurations.

  - $and: ((\[AdminClaimListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminClaimListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[AdminClaimListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminClaimListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminClaimListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminClaimListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - q: (\`string\`) Query or keywords to search the claim's searchable fields.

    - id: (\`string\` \\| \`string\`\[]) Filter by ID(s).

    - order\_id: (\`string\` \\| \`string\`\[]) Retrieve the claims of the specified order ID(s).

    - status: (\`string\` \\| \`string\`\[]) Filter by status(es).

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the claim's creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the claim's update date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the claim's deletion date.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - $or: ((\[AdminClaimListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminClaimListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[AdminClaimListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminClaimListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminClaimListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminClaimListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - q: (\`string\`) Query or keywords to search the claim's searchable fields.

    - id: (\`string\` \\| \`string\`\[]) Filter by ID(s).

    - order\_id: (\`string\` \\| \`string\`\[]) Retrieve the claims of the specified order ID(s).

    - status: (\`string\` \\| \`string\`\[]) Filter by status(es).

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the claim's creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the claim's update date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the claim's deletion date.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - q: (\`string\`) Query or keywords to search the claim's searchable fields.

  - id: (\`string\` \\| \`string\`\[]) Filter by ID(s).

  - order\_id: (\`string\` \\| \`string\`\[]) Retrieve the claims of the specified order ID(s).

  - status: (\`string\` \\| \`string\`\[]) Filter by status(es).

  - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the claim's creation date.

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

  - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the claim's update date.

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

  - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the claim's deletion date.

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

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminClaimListResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimListResponse/page.mdx)\&#62;) The paginated list of claims.

  - claims: (\[AdminClaim]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaim/page.mdx)\[]) The list of claims.

    - order: (\[AdminOrder]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrder/page.mdx)) The order this claim is created for.

    - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The associated return.

    - id: (\`string\`) The claim's ID.

    - type: (\[OrderClaimType]\(../../../../../fulfillment/types/fulfillment.OrderClaimType/page.mdx)) The claim's type.

    - order\_id: (\`string\`) The ID of the order this claim was created for.

    - display\_id: (\`number\`) The claim's display ID.

    - order\_version: (\`string\`) The version of the order when the claim is applied.

    - created\_at: (\`string\` \\| \`Date\`) The date the claim was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the claim was updated.

    - canceled\_at: (\`string\` \\| \`Date\`) The date the claim was canceled.

    - additional\_items: (\[BaseClaimItem]\(../../../../../types/interfaces/types.BaseClaimItem/page.mdx)\[]) The claim's additional items if its \`type\` is \`replace\`.

    - claim\_items: (\[BaseClaimItem]\(../../../../../types/interfaces/types.BaseClaimItem/page.mdx)\[]) The claim's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx)\[]) The shipping methods of the claim's additional items.

    - return\_id: (\`string\`) The ID of the associated return.

    - refund\_amount: (\`number\`) The amount to be refunded due to this claim.

    - created\_by: (\`string\`) The ID of the user that created this claim.

    - deleted\_at: (\`string\` \\| \`Date\`) The date the claim was deleted.

    - no\_notification: (\`boolean\`) Whether to notify the customer about changes in the claim.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The claim's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## retrieve

This method retrieves a claim. It sends a request to the
[Get Claim](https://docs.medusajs.com/api/admin#claims_getclaimsid) API route.

### Example

To retrieve a claim by its ID:

```ts
sdk.admin.claim.retrieve("claim_123")
.then(({ claim }) => {
  console.log(claim)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.claim.retrieve("claim_123", {
  fields: "id,*additional_items"
})
.then(({ claim }) => {
  console.log(claim)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- id: (\`string\`) The claim's ID.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the claim.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminClaimResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimResponse/page.mdx)\&#62;) The claim's details.

  - claim: (\[AdminClaim]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaim/page.mdx)) The claim's details.

    - order: (\[AdminOrder]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrder/page.mdx)) The order this claim is created for.

    - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The associated return.

    - id: (\`string\`) The claim's ID.

    - type: (\[OrderClaimType]\(../../../../../fulfillment/types/fulfillment.OrderClaimType/page.mdx)) The claim's type.

    - order\_id: (\`string\`) The ID of the order this claim was created for.

    - display\_id: (\`number\`) The claim's display ID.

    - order\_version: (\`string\`) The version of the order when the claim is applied.

    - created\_at: (\`string\` \\| \`Date\`) The date the claim was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the claim was updated.

    - canceled\_at: (\`string\` \\| \`Date\`) The date the claim was canceled.

    - additional\_items: (\[BaseClaimItem]\(../../../../../types/interfaces/types.BaseClaimItem/page.mdx)\[]) The claim's additional items if its \`type\` is \`replace\`.

    - claim\_items: (\[BaseClaimItem]\(../../../../../types/interfaces/types.BaseClaimItem/page.mdx)\[]) The claim's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx)\[]) The shipping methods of the claim's additional items.

    - return\_id: (\`string\`) The ID of the associated return.

    - refund\_amount: (\`number\`) The amount to be refunded due to this claim.

    - created\_by: (\`string\`) The ID of the user that created this claim.

    - deleted\_at: (\`string\` \\| \`Date\`) The date the claim was deleted.

    - no\_notification: (\`boolean\`) Whether to notify the customer about changes in the claim.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The claim's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## create

This method creates a claim. It sends a request to the
[Create Claim](https://docs.medusajs.com/api/admin#claims_postclaims) API route.

### Example

```ts
sdk.admin.claim.create({
  type: "refund",
  order_id: "order_123",
})
.then(({ claim }) => {
  console.log(claim)
})
```

### Parameters

- body: (\[AdminCreateClaim]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateClaim/page.mdx)) The claim's details.

  - type: (\`"replace"\` \\| \`"refund"\`) The claim's type. If \`refund\`, it means the claim's items
    are returned and the customer is refunded. If \`replace\`, it
    means the merchant will send new items in place of the returned items.

  - order\_id: (\`string\`) The ID of the order this claim is created for.

  - description: (\`string\`) The claim's description.

  - internal\_note: (\`string\`) An internal note viewed by admin users only.

  - reason\_id: (\`null\` \\| \`string\`) The ID of the associated reason.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the claim.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminClaimOrderResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimOrderResponse/page.mdx)\&#62;) The claim and order's details.

  - order: (\[OrderDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderDTO/page.mdx)) The order's details.

    - id: (\`string\`) The ID of the order.

    - version: (\`number\`) The version of the order.

    - display\_id: (\`number\`) The order's display ID.

    - status: (\[OrderStatus]\(../../../../../fulfillment/types/fulfillment.OrderStatus/page.mdx)) The status of the order.

    - currency\_code: (\`string\`) The currency of the order

    - created\_at: (\`string\` \\| \`Date\`) When the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) When the order was updated.

    - original\_item\_total: (\[BigNumberValue]\(../../../../../fulfillment/types/fulfillment.BigNumberValue/page.mdx)) The original item total of the order.

    - original\_item\_subtotal: (\[BigNumberValue]\(../../../../../fulfillment/types/fulfillment.BigNumberValue/page.mdx)) The original item subtotal of the order.

    - original\_item\_tax\_total: (\[BigNumberValue]\(../../../../../fulfillment/types/fulfillment.BigNumberValue/page.mdx)) The original item tax total of the order.

    - item\_total: (\[BigNumberValue]\(../../../../../fulfillment/types/fulfillment.BigNumberValue/page.mdx)) The item total of the order.

    - item\_subtotal: (\[BigNumberValue]\(../../../../../fulfillment/types/fulfillment.BigNumberValue/page.mdx)) The item subtotal of the order.

    - item\_tax\_total: (\[BigNumberValue]\(../../../../../fulfillment/types/fulfillment.BigNumberValue/page.mdx)) The item tax total of the order.

    - item\_discount\_total: (\[BigNumberValue]\(../../../../../fulfillment/types/fulfillment.BigNumberValue/page.mdx)) The item discount total of the order.

    - original\_total: (\[BigNumberValue]\(../../../../../fulfillment/types/fulfillment.BigNumberValue/page.mdx)) The original total of the order.

    - original\_subtotal: (\[BigNumberValue]\(../../../../../fulfillment/types/fulfillment.BigNumberValue/page.mdx)) The original subtotal of the order.

    - original\_tax\_total: (\[BigNumberValue]\(../../../../../fulfillment/types/fulfillment.BigNumberValue/page.mdx)) The original tax total of the order.

    - total: (\[BigNumberValue]\(../../../../../fulfillment/types/fulfillment.BigNumberValue/page.mdx)) The total of the order.

    - subtotal: (\[BigNumberValue]\(../../../../../fulfillment/types/fulfillment.BigNumberValue/page.mdx)) The subtotal of the order. (Excluding taxes)

    - tax\_total: (\[BigNumberValue]\(../../../../../fulfillment/types/fulfillment.BigNumberValue/page.mdx)) The tax total of the order.

    - discount\_subtotal: (\[BigNumberValue]\(../../../../../fulfillment/types/fulfillment.BigNumberValue/page.mdx)) The discount subtotal of the order.

    - discount\_total: (\[BigNumberValue]\(../../../../../fulfillment/types/fulfillment.BigNumberValue/page.mdx)) The discount total of the order.

    - discount\_tax\_total: (\[BigNumberValue]\(../../../../../fulfillment/types/fulfillment.BigNumberValue/page.mdx)) The discount tax total of the order.

    - credit\_line\_total: (\[BigNumberValue]\(../../../../../fulfillment/types/fulfillment.BigNumberValue/page.mdx)) The credit line total of the order.

    - gift\_card\_total: (\[BigNumberValue]\(../../../../../fulfillment/types/fulfillment.BigNumberValue/page.mdx)) The gift card total of the order.

    - gift\_card\_tax\_total: (\[BigNumberValue]\(../../../../../fulfillment/types/fulfillment.BigNumberValue/page.mdx)) The gift card tax total of the order.

    - shipping\_total: (\[BigNumberValue]\(../../../../../fulfillment/types/fulfillment.BigNumberValue/page.mdx)) The shipping total of the order.

    - shipping\_subtotal: (\[BigNumberValue]\(../../../../../fulfillment/types/fulfillment.BigNumberValue/page.mdx)) The shipping subtotal of the order.

    - shipping\_tax\_total: (\[BigNumberValue]\(../../../../../fulfillment/types/fulfillment.BigNumberValue/page.mdx)) The shipping tax total of the order.

    - shipping\_discount\_total: (\[BigNumberValue]\(../../../../../fulfillment/types/fulfillment.BigNumberValue/page.mdx)) The shipping discount total of the order.

    - original\_shipping\_total: (\[BigNumberValue]\(../../../../../fulfillment/types/fulfillment.BigNumberValue/page.mdx)) The original shipping total of the order.

    - original\_shipping\_subtotal: (\[BigNumberValue]\(../../../../../fulfillment/types/fulfillment.BigNumberValue/page.mdx)) The original shipping subtotal of the order.

    - original\_shipping\_tax\_total: (\[BigNumberValue]\(../../../../../fulfillment/types/fulfillment.BigNumberValue/page.mdx)) The original shipping tax total of the order.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - order\_change: (\[OrderChangeDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderChangeDTO/page.mdx)) The active order change, if any.

    - region\_id: (\`string\`) The ID of the region the order belongs to.

    - customer\_id: (\`string\`) The ID of the customer on the order.

    - sales\_channel\_id: (\`string\`) The ID of the sales channel the order belongs to.

    - email: (\`string\`) The email of the order.

    - shipping\_address: (\[OrderAddressDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderAddressDTO/page.mdx)) The associated shipping address.

    - billing\_address: (\[OrderAddressDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderAddressDTO/page.mdx)) The associated billing address.

    - items: (\[OrderLineItemDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderLineItemDTO/page.mdx)\[]) The associated order details / line items.

    - shipping\_methods: (\[OrderShippingMethodDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderShippingMethodDTO/page.mdx)\[]) The associated shipping methods

    - transactions: (\[OrderTransactionDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderTransactionDTO/page.mdx)\[]) The tramsactions associated with the order

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The credit lines for an order

    - summary: (\[OrderSummaryDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderSummaryDTO/page.mdx)) The summary of the order totals.

    - is\_draft\_order: (\`boolean\`) Whether the order is a draft order.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Holds custom data in key-value pairs.

    - canceled\_at: (\`string\` \\| \`Date\`) When the order was canceled.

    - deleted\_at: (\`string\` \\| \`Date\`) When the order was deleted.

  - claim: (\[AdminClaim]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaim/page.mdx)) The claim's details.

    - order: (\[AdminOrder]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrder/page.mdx)) The order this claim is created for.

    - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The associated return.

    - id: (\`string\`) The claim's ID.

    - type: (\[OrderClaimType]\(../../../../../fulfillment/types/fulfillment.OrderClaimType/page.mdx)) The claim's type.

    - order\_id: (\`string\`) The ID of the order this claim was created for.

    - display\_id: (\`number\`) The claim's display ID.

    - order\_version: (\`string\`) The version of the order when the claim is applied.

    - created\_at: (\`string\` \\| \`Date\`) The date the claim was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the claim was updated.

    - canceled\_at: (\`string\` \\| \`Date\`) The date the claim was canceled.

    - additional\_items: (\[BaseClaimItem]\(../../../../../types/interfaces/types.BaseClaimItem/page.mdx)\[]) The claim's additional items if its \`type\` is \`replace\`.

    - claim\_items: (\[BaseClaimItem]\(../../../../../types/interfaces/types.BaseClaimItem/page.mdx)\[]) The claim's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx)\[]) The shipping methods of the claim's additional items.

    - return\_id: (\`string\`) The ID of the associated return.

    - refund\_amount: (\`number\`) The amount to be refunded due to this claim.

    - created\_by: (\`string\`) The ID of the user that created this claim.

    - deleted\_at: (\`string\` \\| \`Date\`) The date the claim was deleted.

    - no\_notification: (\`boolean\`) Whether to notify the customer about changes in the claim.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The claim's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## cancel

This method cancels a claim. It sends a request to the
[Cancel Claim](https://docs.medusajs.com/api/admin#claims_postclaimsidcancel) API route.

### Example

```ts
sdk.admin.claim.cancel("claim_123")
.then(({ claim }) => {
  console.log(claim)
})
```

### Parameters

- id: (\`string\`) The claim's ID.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the claim.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminClaimResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimResponse/page.mdx)\&#62;) The claim's details.

  - claim: (\[AdminClaim]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaim/page.mdx)) The claim's details.

    - order: (\[AdminOrder]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrder/page.mdx)) The order this claim is created for.

    - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The associated return.

    - id: (\`string\`) The claim's ID.

    - type: (\[OrderClaimType]\(../../../../../fulfillment/types/fulfillment.OrderClaimType/page.mdx)) The claim's type.

    - order\_id: (\`string\`) The ID of the order this claim was created for.

    - display\_id: (\`number\`) The claim's display ID.

    - order\_version: (\`string\`) The version of the order when the claim is applied.

    - created\_at: (\`string\` \\| \`Date\`) The date the claim was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the claim was updated.

    - canceled\_at: (\`string\` \\| \`Date\`) The date the claim was canceled.

    - additional\_items: (\[BaseClaimItem]\(../../../../../types/interfaces/types.BaseClaimItem/page.mdx)\[]) The claim's additional items if its \`type\` is \`replace\`.

    - claim\_items: (\[BaseClaimItem]\(../../../../../types/interfaces/types.BaseClaimItem/page.mdx)\[]) The claim's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx)\[]) The shipping methods of the claim's additional items.

    - return\_id: (\`string\`) The ID of the associated return.

    - refund\_amount: (\`number\`) The amount to be refunded due to this claim.

    - created\_by: (\`string\`) The ID of the user that created this claim.

    - deleted\_at: (\`string\` \\| \`Date\`) The date the claim was deleted.

    - no\_notification: (\`boolean\`) Whether to notify the customer about changes in the claim.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The claim's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## addItems

This method adds items to the claim. It sends a request to the
[Add Items](https://docs.medusajs.com/api/admin#claims_postclaimsidclaimitems) API route.

### Example

```ts
sdk.admin.claim.addItems("claim_123", {
  items: [
    {
      id: "orli_123",
      quantity: 1
    }
  ]
})
.then(({ claim }) => {
  console.log(claim)
})
```

### Parameters

- id: (\`string\`) The ID of the claim to add the items to.
- body: (\[AdminAddClaimItems]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminAddClaimItems/page.mdx)) The items' details.

  - items: (\`object\`\[]) The items to add to the claim.

    - id: (\`string\`) The ID of the item in the order.

    - quantity: (\`number\`) The quantity to claim.

    - reason: (\[ClaimReason]\(../../../../../types/enums/types.ClaimReason/page.mdx)) The reason for adding this item to the claim.

    - description: (\`string\`) The claim item's description.

    - internal\_note: (\`string\`) An internal note viewed by admin users only.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the claim.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminClaimPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimPreviewResponse/page.mdx)\&#62;) The claim's details with a preview of the order when the claim is applied.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) Preview of the order when the claim is applied.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - return\_requested\_total: (\`number\`) The total amount for the items requested to be returned.

    - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The details of the changes on the order.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx) & \`object\`\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx) & \`object\`\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - claim: (\[AdminClaim]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaim/page.mdx)) The claim's details.

    - order: (\[AdminOrder]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrder/page.mdx)) The order this claim is created for.

    - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The associated return.

    - id: (\`string\`) The claim's ID.

    - type: (\[OrderClaimType]\(../../../../../fulfillment/types/fulfillment.OrderClaimType/page.mdx)) The claim's type.

    - order\_id: (\`string\`) The ID of the order this claim was created for.

    - display\_id: (\`number\`) The claim's display ID.

    - order\_version: (\`string\`) The version of the order when the claim is applied.

    - created\_at: (\`string\` \\| \`Date\`) The date the claim was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the claim was updated.

    - canceled\_at: (\`string\` \\| \`Date\`) The date the claim was canceled.

    - additional\_items: (\[BaseClaimItem]\(../../../../../types/interfaces/types.BaseClaimItem/page.mdx)\[]) The claim's additional items if its \`type\` is \`replace\`.

    - claim\_items: (\[BaseClaimItem]\(../../../../../types/interfaces/types.BaseClaimItem/page.mdx)\[]) The claim's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx)\[]) The shipping methods of the claim's additional items.

    - return\_id: (\`string\`) The ID of the associated return.

    - refund\_amount: (\`number\`) The amount to be refunded due to this claim.

    - created\_by: (\`string\`) The ID of the user that created this claim.

    - deleted\_at: (\`string\` \\| \`Date\`) The date the claim was deleted.

    - no\_notification: (\`boolean\`) Whether to notify the customer about changes in the claim.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The claim's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## updateItem

This method updates a claim item by the ID of the item's `WRITE_OFF_ITEM` action. It
sends a request to the [Update Claim Item](https://docs.medusajs.com/api/admin#claims_postclaimsidclaimitemsaction_id) API route.

Every item has an `actions` property, whose value is an array of actions.
You can check the action's name using its `action` property, and use the value of the `id` property.

### Example

```ts
sdk.admin.claim.updateItem(
  "claim_123", 
  "ordchact_123",
  {
    quantity: 1
  }
  )
.then(({ claim }) => {
  console.log(claim)
})
```

### Parameters

- id: (\`string\`) The claim's ID.
- actionId: (\`string\`) The id of the order item's \`WRITE\_OFF\_ITEM\` action.
- body: (\[AdminUpdateClaimItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateClaimItem/page.mdx)) The details to update.

  - quantity: (\`number\`) The item's claimed quantity.

  - reason\_id: (\`null\` \\| \`string\`) The ID of the associated claim reason.

  - internal\_note: (\`null\` \\| \`string\`) An internal note viewed by admin users only.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the claim.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminClaimPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimPreviewResponse/page.mdx)\&#62;) The claim's details with a preview of the order when the claim is applied.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) Preview of the order when the claim is applied.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - return\_requested\_total: (\`number\`) The total amount for the items requested to be returned.

    - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The details of the changes on the order.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx) & \`object\`\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx) & \`object\`\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - claim: (\[AdminClaim]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaim/page.mdx)) The claim's details.

    - order: (\[AdminOrder]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrder/page.mdx)) The order this claim is created for.

    - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The associated return.

    - id: (\`string\`) The claim's ID.

    - type: (\[OrderClaimType]\(../../../../../fulfillment/types/fulfillment.OrderClaimType/page.mdx)) The claim's type.

    - order\_id: (\`string\`) The ID of the order this claim was created for.

    - display\_id: (\`number\`) The claim's display ID.

    - order\_version: (\`string\`) The version of the order when the claim is applied.

    - created\_at: (\`string\` \\| \`Date\`) The date the claim was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the claim was updated.

    - canceled\_at: (\`string\` \\| \`Date\`) The date the claim was canceled.

    - additional\_items: (\[BaseClaimItem]\(../../../../../types/interfaces/types.BaseClaimItem/page.mdx)\[]) The claim's additional items if its \`type\` is \`replace\`.

    - claim\_items: (\[BaseClaimItem]\(../../../../../types/interfaces/types.BaseClaimItem/page.mdx)\[]) The claim's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx)\[]) The shipping methods of the claim's additional items.

    - return\_id: (\`string\`) The ID of the associated return.

    - refund\_amount: (\`number\`) The amount to be refunded due to this claim.

    - created\_by: (\`string\`) The ID of the user that created this claim.

    - deleted\_at: (\`string\` \\| \`Date\`) The date the claim was deleted.

    - no\_notification: (\`boolean\`) Whether to notify the customer about changes in the claim.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The claim's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## removeItem

This method removes a claim item from a claim by the ID of the item's `WRITE_OFF_ITEM` action.
It sends a request to the [Remove Claim Item](https://docs.medusajs.com/api/admin#claims_deleteclaimsidclaimitemsaction_id)
API route.

Every item has an `actions` property, whose value is an array of actions.
You can check the action's name using its `action` property, and use the value of the `id` property.

### Example

```ts
sdk.admin.claim.removeItem(
  "claim_123", 
  "ordchact_123",
  )
.then(({ claim }) => {
  console.log(claim)
})
```

### Parameters

- id: (\`string\`) The claim's ID.
- actionId: (\`string\`) The id of the order item's \`WRITE\_OFF\_ITEM\` action.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the claim.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminClaimPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimPreviewResponse/page.mdx)\&#62;) The claim's details with a preview of the order when the claim is applied.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) Preview of the order when the claim is applied.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - return\_requested\_total: (\`number\`) The total amount for the items requested to be returned.

    - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The details of the changes on the order.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx) & \`object\`\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx) & \`object\`\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - claim: (\[AdminClaim]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaim/page.mdx)) The claim's details.

    - order: (\[AdminOrder]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrder/page.mdx)) The order this claim is created for.

    - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The associated return.

    - id: (\`string\`) The claim's ID.

    - type: (\[OrderClaimType]\(../../../../../fulfillment/types/fulfillment.OrderClaimType/page.mdx)) The claim's type.

    - order\_id: (\`string\`) The ID of the order this claim was created for.

    - display\_id: (\`number\`) The claim's display ID.

    - order\_version: (\`string\`) The version of the order when the claim is applied.

    - created\_at: (\`string\` \\| \`Date\`) The date the claim was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the claim was updated.

    - canceled\_at: (\`string\` \\| \`Date\`) The date the claim was canceled.

    - additional\_items: (\[BaseClaimItem]\(../../../../../types/interfaces/types.BaseClaimItem/page.mdx)\[]) The claim's additional items if its \`type\` is \`replace\`.

    - claim\_items: (\[BaseClaimItem]\(../../../../../types/interfaces/types.BaseClaimItem/page.mdx)\[]) The claim's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx)\[]) The shipping methods of the claim's additional items.

    - return\_id: (\`string\`) The ID of the associated return.

    - refund\_amount: (\`number\`) The amount to be refunded due to this claim.

    - created\_by: (\`string\`) The ID of the user that created this claim.

    - deleted\_at: (\`string\` \\| \`Date\`) The date the claim was deleted.

    - no\_notification: (\`boolean\`) Whether to notify the customer about changes in the claim.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The claim's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## addInboundItems

This method adds inbound (or return) items to the claim. These inbound items will have a `RETURN_ITEM` action.

This method sends a request to the [Add Inbound Items](https://docs.medusajs.com/api/admin#claims_postclaimsidinbounditems)
API route.

### Example

```ts
sdk.admin.claim.addInboundItems(
  "claim_123", 
  {
    items: [
      {
        id: "orli_123",
        quantity: 1
      }
    ]
  },
  )
.then(({ return: returnData }) => {
  console.log(returnData)
})
```

### Parameters

- id: (\`string\`) The ID of the claim to add the inbound items to.
- body: (\[AdminAddClaimInboundItems]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminAddClaimInboundItems/page.mdx)) The inbound items' details.

  - items: (\`object\`\[]) The items to add to the claim.

    - id: (\`string\`) The ID of the item in the order.

    - quantity: (\`number\`) The quantity to claim.

    - reason: (\[ClaimReason]\(../../../../../types/enums/types.ClaimReason/page.mdx)) The reason for adding this item to the claim.

    - description: (\`string\`) The claim item's description.

    - internal\_note: (\`string\`) An internal note viewed by admin users only.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminClaimReturnPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimReturnPreviewResponse/page.mdx)\&#62;) The details of the return associated with the claim, with a preview of the order when the claim is applied.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) Preview of the order when the claim is applied.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - return\_requested\_total: (\`number\`) The total amount for the items requested to be returned.

    - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The details of the changes on the order.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx) & \`object\`\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx) & \`object\`\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The return's details.

    - items: (\[AdminReturnItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnItem/page.mdx)\[]) The return's items.

    - id: (\`string\`) The return's ID.

    - order\_id: (\`string\`) The ID of the order that the return belongs to.

    - order\_version: (\`number\`) The order's version once the return is applied.

    - display\_id: (\`number\`) The display ID of the return.

    - received\_at: (\`string\`) The date when the return was received.

    - created\_at: (\`string\`) The date when the return was created.

    - canceled\_at: (\`string\`) The date when the return was canceled.

    - status: (\[ReturnStatus]\(../../../../../order/types/order.ReturnStatus/page.mdx)) The return's status.

    - exchange\_id: (\`string\`) The ID of the exchange that the return belongs to,
      if available.

    - location\_id: (\`string\`) The ID of the stock location that the items are returned to.

    - claim\_id: (\`string\`) The ID of the claim that the return belongs to,
      if available.

    - no\_notification: (\`boolean\`) Whether to send the customers notifications about
      return updates.

    - refund\_amount: (\`number\`) The amount that is to be refunded to the customer.

***

## updateInboundItem

This method updates an inbound (or return) item of a claim using the ID of the item's `RETURN_ITEM` action.
It sends a request to the [Update Inbound Item](https://docs.medusajs.com/api/admin#claims_postclaimsidinbounditemsaction_id)
API route.

Every item has an `actions` property, whose value is an array of actions.
You can check the action's name using its `action` property, and use the value of the `id` property.

### Example

```ts
sdk.admin.claim.updateInboundItem(
  "claim_123", 
  "ordchact_123",
  {
    quantity: 1
  },
  )
.then(({ return: returnData }) => {
  console.log(returnData)
})
```

### Parameters

- id: (\`string\`) The claim's ID.
- actionId: (\`string\`) The id of the return item's \`RETURN\_ITEM\` action.
- body: (\[AdminUpdateClaimInboundItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateClaimInboundItem/page.mdx)) The details to update in the inbound item.

  - quantity: (\`number\`) The item's claimed quantity.

  - reason\_id: (\`null\` \\| \`string\`) The ID of the associated claim reason.

  - description: (\`string\`) The claim item's description.

  - internal\_note: (\`null\` \\| \`string\`) An internal note viewed by admin users only.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminClaimReturnPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimReturnPreviewResponse/page.mdx)\&#62;) The details of the return associated wth the claim, with a preview of the order when the claim is applied.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) Preview of the order when the claim is applied.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - return\_requested\_total: (\`number\`) The total amount for the items requested to be returned.

    - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The details of the changes on the order.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx) & \`object\`\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx) & \`object\`\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The return's details.

    - items: (\[AdminReturnItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnItem/page.mdx)\[]) The return's items.

    - id: (\`string\`) The return's ID.

    - order\_id: (\`string\`) The ID of the order that the return belongs to.

    - order\_version: (\`number\`) The order's version once the return is applied.

    - display\_id: (\`number\`) The display ID of the return.

    - received\_at: (\`string\`) The date when the return was received.

    - created\_at: (\`string\`) The date when the return was created.

    - canceled\_at: (\`string\`) The date when the return was canceled.

    - status: (\[ReturnStatus]\(../../../../../order/types/order.ReturnStatus/page.mdx)) The return's status.

    - exchange\_id: (\`string\`) The ID of the exchange that the return belongs to,
      if available.

    - location\_id: (\`string\`) The ID of the stock location that the items are returned to.

    - claim\_id: (\`string\`) The ID of the claim that the return belongs to,
      if available.

    - no\_notification: (\`boolean\`) Whether to send the customers notifications about
      return updates.

    - refund\_amount: (\`number\`) The amount that is to be refunded to the customer.

***

## removeInboundItem

This method removes an inbound (or return) item from a claim using the ID of the item's `RETURN_ITEM` action.
It sends a request to the [Remove Inbound Item](https://docs.medusajs.com/api/admin#claims_deleteclaimsidinbounditemsaction_id)
API route.

Every item has an `actions` property, whose value is an array of actions.
You can check the action's name using its `action` property, and use the value of the `id` property.

### Example

```ts
sdk.admin.claim.removeInboundItem(
  "claim_123", 
  "ordchact_123",
  )
.then(({ return: returnData }) => {
  console.log(returnData)
})
```

### Parameters

- id: (\`string\`) The claim's ID.
- actionId: (\`string\`) The ID of the return item's \`RETURN\_ITEM\` action.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminClaimReturnPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimReturnPreviewResponse/page.mdx)\&#62;) The details of the return associated wth the claim, with a preview of the order when the claim is applied.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) Preview of the order when the claim is applied.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - return\_requested\_total: (\`number\`) The total amount for the items requested to be returned.

    - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The details of the changes on the order.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx) & \`object\`\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx) & \`object\`\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The return's details.

    - items: (\[AdminReturnItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnItem/page.mdx)\[]) The return's items.

    - id: (\`string\`) The return's ID.

    - order\_id: (\`string\`) The ID of the order that the return belongs to.

    - order\_version: (\`number\`) The order's version once the return is applied.

    - display\_id: (\`number\`) The display ID of the return.

    - received\_at: (\`string\`) The date when the return was received.

    - created\_at: (\`string\`) The date when the return was created.

    - canceled\_at: (\`string\`) The date when the return was canceled.

    - status: (\[ReturnStatus]\(../../../../../order/types/order.ReturnStatus/page.mdx)) The return's status.

    - exchange\_id: (\`string\`) The ID of the exchange that the return belongs to,
      if available.

    - location\_id: (\`string\`) The ID of the stock location that the items are returned to.

    - claim\_id: (\`string\`) The ID of the claim that the return belongs to,
      if available.

    - no\_notification: (\`boolean\`) Whether to send the customers notifications about
      return updates.

    - refund\_amount: (\`number\`) The amount that is to be refunded to the customer.

***

## addInboundShipping

This method adds an inbound (or return) shipping method to a claim.
The inbound shipping method will have a `SHIPPING_ADD` action.

This method sends a request to the [Add Inbound Shipping](https://docs.medusajs.com/api/admin#claims_postclaimsidinboundshippingmethod)
API route.

### Example

```ts
sdk.admin.claim.addInboundShipping(
  "claim_123", 
  {
    shipping_option_id: "so_123",
    custom_amount: 10
  },
  )
.then(({ return: returnData }) => {
  console.log(returnData)
})
```

### Parameters

- id: (\`string\`) The claim's ID.
- body: (\[AdminClaimAddInboundShipping]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimAddInboundShipping/page.mdx)) The shipping method's details.

  - shipping\_option\_id: (\`string\`) The ID of the shipping option to create the method from.

  - custom\_amount: (\`number\`) A custom amount to use instead of the shipping option's amount.

  - description: (\`string\`) The method's description.

  - internal\_note: (\`string\`) An internal note viewed by admin users only.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminClaimReturnPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimReturnPreviewResponse/page.mdx)\&#62;) The details of the return associated wth the claim, with a preview of the order when the claim is applied.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) Preview of the order when the claim is applied.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - return\_requested\_total: (\`number\`) The total amount for the items requested to be returned.

    - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The details of the changes on the order.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx) & \`object\`\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx) & \`object\`\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The return's details.

    - items: (\[AdminReturnItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnItem/page.mdx)\[]) The return's items.

    - id: (\`string\`) The return's ID.

    - order\_id: (\`string\`) The ID of the order that the return belongs to.

    - order\_version: (\`number\`) The order's version once the return is applied.

    - display\_id: (\`number\`) The display ID of the return.

    - received\_at: (\`string\`) The date when the return was received.

    - created\_at: (\`string\`) The date when the return was created.

    - canceled\_at: (\`string\`) The date when the return was canceled.

    - status: (\[ReturnStatus]\(../../../../../order/types/order.ReturnStatus/page.mdx)) The return's status.

    - exchange\_id: (\`string\`) The ID of the exchange that the return belongs to,
      if available.

    - location\_id: (\`string\`) The ID of the stock location that the items are returned to.

    - claim\_id: (\`string\`) The ID of the claim that the return belongs to,
      if available.

    - no\_notification: (\`boolean\`) Whether to send the customers notifications about
      return updates.

    - refund\_amount: (\`number\`) The amount that is to be refunded to the customer.

***

## updateInboundShipping

This method updates a shipping method for returning items in the claim using the ID of the method's `SHIPPING_ADD` action.
It sends a request to the [Update Inbound Shipping](https://docs.medusajs.com/api/admin#claims_postclaimsidinboundshippingmethodaction_id)
API route.

Every shipping method has an `actions` property, whose value is an array of actions.
You can check the action's name using its `action` property, and use the value of the `id` property.

### Example

```ts
sdk.admin.claim.updateInboundShipping(
  "claim_123", 
  "ordchact_123",
  {
    custom_amount: 10
  },
  )
.then(({ claim }) => {
  console.log(claim)
})
```

### Parameters

- id: (\`string\`) The claim's ID.
- actionId: (\`string\`) The id of the shipping method's \`SHIPPING\_ADD\` action.
- body: (\[AdminClaimUpdateInboundShipping]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimUpdateInboundShipping/page.mdx)) The details to update in the shipping method

  - custom\_amount: (\`null\` \\| \`number\`) A custom amount to use instead of the shipping option's amount.

  - internal\_note: (\`string\`) An internal note viewed by admin users only.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the claim.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminClaimPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimPreviewResponse/page.mdx)\&#62;) The details of the claim, with a preview of the order when the claim is applied.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) Preview of the order when the claim is applied.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - return\_requested\_total: (\`number\`) The total amount for the items requested to be returned.

    - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The details of the changes on the order.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx) & \`object\`\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx) & \`object\`\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - claim: (\[AdminClaim]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaim/page.mdx)) The claim's details.

    - order: (\[AdminOrder]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrder/page.mdx)) The order this claim is created for.

    - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The associated return.

    - id: (\`string\`) The claim's ID.

    - type: (\[OrderClaimType]\(../../../../../fulfillment/types/fulfillment.OrderClaimType/page.mdx)) The claim's type.

    - order\_id: (\`string\`) The ID of the order this claim was created for.

    - display\_id: (\`number\`) The claim's display ID.

    - order\_version: (\`string\`) The version of the order when the claim is applied.

    - created\_at: (\`string\` \\| \`Date\`) The date the claim was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the claim was updated.

    - canceled\_at: (\`string\` \\| \`Date\`) The date the claim was canceled.

    - additional\_items: (\[BaseClaimItem]\(../../../../../types/interfaces/types.BaseClaimItem/page.mdx)\[]) The claim's additional items if its \`type\` is \`replace\`.

    - claim\_items: (\[BaseClaimItem]\(../../../../../types/interfaces/types.BaseClaimItem/page.mdx)\[]) The claim's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx)\[]) The shipping methods of the claim's additional items.

    - return\_id: (\`string\`) The ID of the associated return.

    - refund\_amount: (\`number\`) The amount to be refunded due to this claim.

    - created\_by: (\`string\`) The ID of the user that created this claim.

    - deleted\_at: (\`string\` \\| \`Date\`) The date the claim was deleted.

    - no\_notification: (\`boolean\`) Whether to notify the customer about changes in the claim.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The claim's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## deleteInboundShipping

This method deletes a shipping method for returning items in the claim using the ID of the method's `SHIPPING_ADD` action.
It sends a request to the [Remove Inbound Shipping](https://docs.medusajs.com/api/admin#claims_deleteclaimsidinboundshippingmethodaction_id)
API route.

Every shipping method has an `actions` property, whose value is an array of actions.
You can check the action's name using its `action` property, and use the value of the `id` property.

### Example

```ts
sdk.admin.claim.deleteInboundShipping(
  "claim_123", 
  "ordchact_123",
  )
.then(({ return: returnData }) => {
  console.log(returnData)
})
```

### Parameters

- id: (\`string\`) The claim's ID.
- actionId: (\`string\`) The id of the shipping method's \`SHIPPING\_ADD\` action.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminClaimReturnPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimReturnPreviewResponse/page.mdx)\&#62;) The details of the return associated wth the claim, with a preview of the order when the claim is applied.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) Preview of the order when the claim is applied.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - return\_requested\_total: (\`number\`) The total amount for the items requested to be returned.

    - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The details of the changes on the order.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx) & \`object\`\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx) & \`object\`\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The return's details.

    - items: (\[AdminReturnItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnItem/page.mdx)\[]) The return's items.

    - id: (\`string\`) The return's ID.

    - order\_id: (\`string\`) The ID of the order that the return belongs to.

    - order\_version: (\`number\`) The order's version once the return is applied.

    - display\_id: (\`number\`) The display ID of the return.

    - received\_at: (\`string\`) The date when the return was received.

    - created\_at: (\`string\`) The date when the return was created.

    - canceled\_at: (\`string\`) The date when the return was canceled.

    - status: (\[ReturnStatus]\(../../../../../order/types/order.ReturnStatus/page.mdx)) The return's status.

    - exchange\_id: (\`string\`) The ID of the exchange that the return belongs to,
      if available.

    - location\_id: (\`string\`) The ID of the stock location that the items are returned to.

    - claim\_id: (\`string\`) The ID of the claim that the return belongs to,
      if available.

    - no\_notification: (\`boolean\`) Whether to send the customers notifications about
      return updates.

    - refund\_amount: (\`number\`) The amount that is to be refunded to the customer.

***

## addOutboundItems

This method adds outbound (or new) items to a claim. These outbound items will have an `ITEM_ADD` action.
It sends a request to the [Add Outbound Items](https://docs.medusajs.com/api/admin#claims_postclaimsidoutbounditems)
API route.

### Example

```ts
sdk.admin.claim.addOutboundItems(
  "claim_123", 
  {
    items: [{
      id: "orli_123",
      quantity: 1
    }]
  },
  )
.then(({ claim }) => {
  console.log(claim)
})
```

### Parameters

- id: (\`string\`) The ID of the claim to add the outbound items to.
- body: (\[AdminAddClaimOutboundItems]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminAddClaimOutboundItems/page.mdx)) The items' details.

  - items: (\`object\`\[]) The items to add to the claim.

    - id: (\`string\`) The ID of the item in the order.

    - quantity: (\`number\`) The quantity to claim.

    - reason: (\[ClaimReason]\(../../../../../types/enums/types.ClaimReason/page.mdx)) The reason for adding this item to the claim.

    - description: (\`string\`) The claim item's description.

    - internal\_note: (\`string\`) An internal note viewed by admin users only.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the claim.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminClaimPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimPreviewResponse/page.mdx)\&#62;) The details of the claim, with a preview of the order when the claim is applied.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) Preview of the order when the claim is applied.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - return\_requested\_total: (\`number\`) The total amount for the items requested to be returned.

    - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The details of the changes on the order.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx) & \`object\`\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx) & \`object\`\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - claim: (\[AdminClaim]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaim/page.mdx)) The claim's details.

    - order: (\[AdminOrder]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrder/page.mdx)) The order this claim is created for.

    - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The associated return.

    - id: (\`string\`) The claim's ID.

    - type: (\[OrderClaimType]\(../../../../../fulfillment/types/fulfillment.OrderClaimType/page.mdx)) The claim's type.

    - order\_id: (\`string\`) The ID of the order this claim was created for.

    - display\_id: (\`number\`) The claim's display ID.

    - order\_version: (\`string\`) The version of the order when the claim is applied.

    - created\_at: (\`string\` \\| \`Date\`) The date the claim was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the claim was updated.

    - canceled\_at: (\`string\` \\| \`Date\`) The date the claim was canceled.

    - additional\_items: (\[BaseClaimItem]\(../../../../../types/interfaces/types.BaseClaimItem/page.mdx)\[]) The claim's additional items if its \`type\` is \`replace\`.

    - claim\_items: (\[BaseClaimItem]\(../../../../../types/interfaces/types.BaseClaimItem/page.mdx)\[]) The claim's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx)\[]) The shipping methods of the claim's additional items.

    - return\_id: (\`string\`) The ID of the associated return.

    - refund\_amount: (\`number\`) The amount to be refunded due to this claim.

    - created\_by: (\`string\`) The ID of the user that created this claim.

    - deleted\_at: (\`string\` \\| \`Date\`) The date the claim was deleted.

    - no\_notification: (\`boolean\`) Whether to notify the customer about changes in the claim.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The claim's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## updateOutboundItem

This method updates an outbound (or new) item of a claim using the ID of the item's `ITEM_ADD` action.
It sends a request to the [Update Outbound Item](https://docs.medusajs.com/api/admin#claims_postclaimsidoutbounditemsaction_id)
API route.

Every item has an `actions` property, whose value is an array of actions.
You can check the action's name using its `action` property, and use the value of the `id` property.

### Example

```ts
sdk.admin.claim.updateOutboundItem(
  "claim_123", 
  "ordchact_123",
  {
    quantity: 1
  },
  )
.then(({ claim }) => {
  console.log(claim)
})
```

### Parameters

- id: (\`string\`) The claim's ID.
- actionId: (\`string\`) The id of the new claim item's \`ITEM\_ADD\` action.
- body: (\[AdminUpdateClaimOutboundItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateClaimOutboundItem/page.mdx)) The item's details.

  - quantity: (\`number\`) The item's claimed quantity.

  - reason\_id: (\`null\` \\| \`string\`) The ID of the associated claim reason.

  - internal\_note: (\`null\` \\| \`string\`) An internal note viewed by admin users only.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the claim.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminClaimPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimPreviewResponse/page.mdx)\&#62;) The details of the claim, with a preview of the order when the claim is applied.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) Preview of the order when the claim is applied.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - return\_requested\_total: (\`number\`) The total amount for the items requested to be returned.

    - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The details of the changes on the order.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx) & \`object\`\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx) & \`object\`\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - claim: (\[AdminClaim]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaim/page.mdx)) The claim's details.

    - order: (\[AdminOrder]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrder/page.mdx)) The order this claim is created for.

    - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The associated return.

    - id: (\`string\`) The claim's ID.

    - type: (\[OrderClaimType]\(../../../../../fulfillment/types/fulfillment.OrderClaimType/page.mdx)) The claim's type.

    - order\_id: (\`string\`) The ID of the order this claim was created for.

    - display\_id: (\`number\`) The claim's display ID.

    - order\_version: (\`string\`) The version of the order when the claim is applied.

    - created\_at: (\`string\` \\| \`Date\`) The date the claim was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the claim was updated.

    - canceled\_at: (\`string\` \\| \`Date\`) The date the claim was canceled.

    - additional\_items: (\[BaseClaimItem]\(../../../../../types/interfaces/types.BaseClaimItem/page.mdx)\[]) The claim's additional items if its \`type\` is \`replace\`.

    - claim\_items: (\[BaseClaimItem]\(../../../../../types/interfaces/types.BaseClaimItem/page.mdx)\[]) The claim's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx)\[]) The shipping methods of the claim's additional items.

    - return\_id: (\`string\`) The ID of the associated return.

    - refund\_amount: (\`number\`) The amount to be refunded due to this claim.

    - created\_by: (\`string\`) The ID of the user that created this claim.

    - deleted\_at: (\`string\` \\| \`Date\`) The date the claim was deleted.

    - no\_notification: (\`boolean\`) Whether to notify the customer about changes in the claim.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The claim's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## removeOutboundItem

This method removes an outbound (or new) item from a claim using the ID of the item's `ITEM_ADD` action.
It sends a request to the [Remove Outbound Item](https://docs.medusajs.com/api/admin#claims_deleteclaimsidoutbounditemsaction_id)
API route.

Every item has an `actions` property, whose value is an array of actions.
You can check the action's name using its `action` property, and use the value of the `id` property.

### Example

```ts
sdk.admin.claim.removeOutboundItem(
  "claim_123", 
  "ordchact_123",
)
.then(({ claim }) => {
  console.log(claim)
})
```

### Parameters

- id: (\`string\`) The claim's ID.
- actionId: (\`string\`) The id of the new claim item's \`ITEM\_ADD\` action.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the claim.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminClaimPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimPreviewResponse/page.mdx)\&#62;) The details of the claim, with a preview of the order when the claim is applied.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) Preview of the order when the claim is applied.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - return\_requested\_total: (\`number\`) The total amount for the items requested to be returned.

    - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The details of the changes on the order.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx) & \`object\`\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx) & \`object\`\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - claim: (\[AdminClaim]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaim/page.mdx)) The claim's details.

    - order: (\[AdminOrder]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrder/page.mdx)) The order this claim is created for.

    - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The associated return.

    - id: (\`string\`) The claim's ID.

    - type: (\[OrderClaimType]\(../../../../../fulfillment/types/fulfillment.OrderClaimType/page.mdx)) The claim's type.

    - order\_id: (\`string\`) The ID of the order this claim was created for.

    - display\_id: (\`number\`) The claim's display ID.

    - order\_version: (\`string\`) The version of the order when the claim is applied.

    - created\_at: (\`string\` \\| \`Date\`) The date the claim was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the claim was updated.

    - canceled\_at: (\`string\` \\| \`Date\`) The date the claim was canceled.

    - additional\_items: (\[BaseClaimItem]\(../../../../../types/interfaces/types.BaseClaimItem/page.mdx)\[]) The claim's additional items if its \`type\` is \`replace\`.

    - claim\_items: (\[BaseClaimItem]\(../../../../../types/interfaces/types.BaseClaimItem/page.mdx)\[]) The claim's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx)\[]) The shipping methods of the claim's additional items.

    - return\_id: (\`string\`) The ID of the associated return.

    - refund\_amount: (\`number\`) The amount to be refunded due to this claim.

    - created\_by: (\`string\`) The ID of the user that created this claim.

    - deleted\_at: (\`string\` \\| \`Date\`) The date the claim was deleted.

    - no\_notification: (\`boolean\`) Whether to notify the customer about changes in the claim.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The claim's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## addOutboundShipping

This method adds outbound an outbound shipping method to a claim.
The outbound shipping method will have a `SHIPPING_ADD` action.

This method sends a request to the
[Add Outbound Shipping](https://docs.medusajs.com/api/admin#claims_postclaimsidoutboundshippingmethod)
API route.

### Example

```ts
sdk.admin.claim.addOutboundShipping(
  "claim_123", 
  {
    shipping_option_id: "so_123",
    custom_amount: 10
  },
)
.then(({ claim }) => {
  console.log(claim)
})
```

### Parameters

- id: (\`string\`) The claim's ID.
- body: (\[AdminClaimAddOutboundShipping]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimAddOutboundShipping/page.mdx)) The shipping method's details.

  - shipping\_option\_id: (\`string\`) The ID of the shipping option to create the method from.

  - custom\_amount: (\`number\`) A custom amount to use instead of the shipping option's amount.

  - description: (\`string\`) The method's description.

  - internal\_note: (\`string\`) An internal note viewed by admin users only.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the claim.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminClaimPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimPreviewResponse/page.mdx)\&#62;) The details of the claim, with a preview of the order when the claim is applied.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) Preview of the order when the claim is applied.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - return\_requested\_total: (\`number\`) The total amount for the items requested to be returned.

    - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The details of the changes on the order.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx) & \`object\`\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx) & \`object\`\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - claim: (\[AdminClaim]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaim/page.mdx)) The claim's details.

    - order: (\[AdminOrder]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrder/page.mdx)) The order this claim is created for.

    - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The associated return.

    - id: (\`string\`) The claim's ID.

    - type: (\[OrderClaimType]\(../../../../../fulfillment/types/fulfillment.OrderClaimType/page.mdx)) The claim's type.

    - order\_id: (\`string\`) The ID of the order this claim was created for.

    - display\_id: (\`number\`) The claim's display ID.

    - order\_version: (\`string\`) The version of the order when the claim is applied.

    - created\_at: (\`string\` \\| \`Date\`) The date the claim was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the claim was updated.

    - canceled\_at: (\`string\` \\| \`Date\`) The date the claim was canceled.

    - additional\_items: (\[BaseClaimItem]\(../../../../../types/interfaces/types.BaseClaimItem/page.mdx)\[]) The claim's additional items if its \`type\` is \`replace\`.

    - claim\_items: (\[BaseClaimItem]\(../../../../../types/interfaces/types.BaseClaimItem/page.mdx)\[]) The claim's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx)\[]) The shipping methods of the claim's additional items.

    - return\_id: (\`string\`) The ID of the associated return.

    - refund\_amount: (\`number\`) The amount to be refunded due to this claim.

    - created\_by: (\`string\`) The ID of the user that created this claim.

    - deleted\_at: (\`string\` \\| \`Date\`) The date the claim was deleted.

    - no\_notification: (\`boolean\`) Whether to notify the customer about changes in the claim.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The claim's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## updateOutboundShipping

This method updates the shipping method for delivering outbound items in a claim using the ID of the method's `SHIPPING_ADD` action.
It sends a request to the [Update Outbound Shipping](https://docs.medusajs.com/api/admin#claims_postclaimsidoutboundshippingmethodaction_id)
API route.

Every shipping method has an `actions` property, whose value is an array of actions.
You can check the action's name using its `action` property, and use the value of the `id` property.

### Example

```ts
sdk.admin.claim.updateOutboundShipping(
  "claim_123", 
  "ordchact_123",
  {
    custom_amount: 10
  },
)
.then(({ claim }) => {
  console.log(claim)
})
```

### Parameters

- id: (\`string\`) The claim's ID.
- actionId: (\`string\`) The id of the shipping method's \`SHIPPING\_ADD\` action.
- body: (\[AdminClaimUpdateOutboundShipping]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimUpdateOutboundShipping/page.mdx)) The shipping method's details.

  - custom\_amount: (\`null\` \\| \`number\`) A custom amount to use instead of the shipping option's amount.

  - internal\_note: (\`string\`) An internal note viewed by admin users only.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the claim.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminClaimPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimPreviewResponse/page.mdx)\&#62;) The details of the claim, with a preview of the order when the claim is applied.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) Preview of the order when the claim is applied.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - return\_requested\_total: (\`number\`) The total amount for the items requested to be returned.

    - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The details of the changes on the order.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx) & \`object\`\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx) & \`object\`\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - claim: (\[AdminClaim]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaim/page.mdx)) The claim's details.

    - order: (\[AdminOrder]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrder/page.mdx)) The order this claim is created for.

    - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The associated return.

    - id: (\`string\`) The claim's ID.

    - type: (\[OrderClaimType]\(../../../../../fulfillment/types/fulfillment.OrderClaimType/page.mdx)) The claim's type.

    - order\_id: (\`string\`) The ID of the order this claim was created for.

    - display\_id: (\`number\`) The claim's display ID.

    - order\_version: (\`string\`) The version of the order when the claim is applied.

    - created\_at: (\`string\` \\| \`Date\`) The date the claim was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the claim was updated.

    - canceled\_at: (\`string\` \\| \`Date\`) The date the claim was canceled.

    - additional\_items: (\[BaseClaimItem]\(../../../../../types/interfaces/types.BaseClaimItem/page.mdx)\[]) The claim's additional items if its \`type\` is \`replace\`.

    - claim\_items: (\[BaseClaimItem]\(../../../../../types/interfaces/types.BaseClaimItem/page.mdx)\[]) The claim's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx)\[]) The shipping methods of the claim's additional items.

    - return\_id: (\`string\`) The ID of the associated return.

    - refund\_amount: (\`number\`) The amount to be refunded due to this claim.

    - created\_by: (\`string\`) The ID of the user that created this claim.

    - deleted\_at: (\`string\` \\| \`Date\`) The date the claim was deleted.

    - no\_notification: (\`boolean\`) Whether to notify the customer about changes in the claim.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The claim's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## deleteOutboundShipping

This method deletes the shipping method for delivering outbound items in the claim using the ID of the method's `SHIPPING_ADD` action.

Every shipping method has an `actions` property, whose value is an array of actions.
You can check the action's name using its `action` property, and use the value of the `id` property.

### Example

```ts
sdk.admin.claim.deleteOutboundShipping(
  "claim_123", 
  "ordchact_123",
)
.then(({ claim }) => {
  console.log(claim)
})
```

### Parameters

- id: (\`string\`) The claim's ID.
- actionId: (\`string\`) The id of the shipping method's \`SHIPPING\_ADD\` action.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the claim.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminClaimPreviewResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimPreviewResponse/page.mdx)\&#62;) The details of the claim, with a preview of the order when the claim is applied.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) Preview of the order when the claim is applied.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - return\_requested\_total: (\`number\`) The total amount for the items requested to be returned.

    - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The details of the changes on the order.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx) & \`object\`\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx) & \`object\`\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - claim: (\[AdminClaim]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaim/page.mdx)) The claim's details.

    - order: (\[AdminOrder]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrder/page.mdx)) The order this claim is created for.

    - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The associated return.

    - id: (\`string\`) The claim's ID.

    - type: (\[OrderClaimType]\(../../../../../fulfillment/types/fulfillment.OrderClaimType/page.mdx)) The claim's type.

    - order\_id: (\`string\`) The ID of the order this claim was created for.

    - display\_id: (\`number\`) The claim's display ID.

    - order\_version: (\`string\`) The version of the order when the claim is applied.

    - created\_at: (\`string\` \\| \`Date\`) The date the claim was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the claim was updated.

    - canceled\_at: (\`string\` \\| \`Date\`) The date the claim was canceled.

    - additional\_items: (\[BaseClaimItem]\(../../../../../types/interfaces/types.BaseClaimItem/page.mdx)\[]) The claim's additional items if its \`type\` is \`replace\`.

    - claim\_items: (\[BaseClaimItem]\(../../../../../types/interfaces/types.BaseClaimItem/page.mdx)\[]) The claim's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx)\[]) The shipping methods of the claim's additional items.

    - return\_id: (\`string\`) The ID of the associated return.

    - refund\_amount: (\`number\`) The amount to be refunded due to this claim.

    - created\_by: (\`string\`) The ID of the user that created this claim.

    - deleted\_at: (\`string\` \\| \`Date\`) The date the claim was deleted.

    - no\_notification: (\`boolean\`) Whether to notify the customer about changes in the claim.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The claim's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

***

## request

This method confirms a claim request, applying its changes on the associated order.
It sends a request to the [Confirm Claim Request](https://docs.medusajs.com/api/admin#claims_postclaimsidrequest)
API route.

### Example

```ts
sdk.admin.claim.request(
  "claim_123", 
  {},
)
.then(({ claim }) => {
  console.log(claim)
})
```

### Parameters

- id: (\`string\`) The claim's ID.
- body: (\[AdminRequestClaim]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRequestClaim/page.mdx)) The confirmation details.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the claim.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminClaimRequestResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimRequestResponse/page.mdx)\&#62;) The details of the claim and its associated return, with a preview of the order when the claim is applied.

  - order\_preview: (\[AdminOrderPreview]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderPreview/page.mdx)) Preview of the order when the claim is applied.

    - payment\_collections: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)\[]) The order's payment collections.

    - return\_requested\_total: (\`number\`) The total amount for the items requested to be returned.

    - order\_change: (\[AdminOrderChange]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderChange/page.mdx)) The details of the changes on the order.

    - items: (\[AdminOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderLineItem/page.mdx) & \`object\`\[]) The order's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx) & \`object\`\[]) The order's shipping methods.

    - id: (\`string\`) The order's ID.

    - version: (\`number\`) The order's version.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - fulfillments: (\[AdminOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - sales\_channel: (\[AdminSalesChannel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminSalesChannel/page.mdx)) The associated sales channel's details.

    - region: (\[AdminRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRegion/page.mdx)) The order's region.

    - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The details of the customer that placed the order.

    - shipping\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[AdminOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderAddress/page.mdx)) The order's billing address.

    - credit\_lines: (\[OrderCreditLineDTO]\(../../../../../fulfillment/interfaces/fulfillment.OrderCreditLineDTO/page.mdx)\[]) The order's credit lines.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - claim: (\[AdminClaim]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaim/page.mdx)) The claim's details.

    - order: (\[AdminOrder]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrder/page.mdx)) The order this claim is created for.

    - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx)) The associated return.

    - id: (\`string\`) The claim's ID.

    - type: (\[OrderClaimType]\(../../../../../fulfillment/types/fulfillment.OrderClaimType/page.mdx)) The claim's type.

    - order\_id: (\`string\`) The ID of the order this claim was created for.

    - display\_id: (\`number\`) The claim's display ID.

    - order\_version: (\`string\`) The version of the order when the claim is applied.

    - created\_at: (\`string\` \\| \`Date\`) The date the claim was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the claim was updated.

    - canceled\_at: (\`string\` \\| \`Date\`) The date the claim was canceled.

    - additional\_items: (\[BaseClaimItem]\(../../../../../types/interfaces/types.BaseClaimItem/page.mdx)\[]) The claim's additional items if its \`type\` is \`replace\`.

    - claim\_items: (\[BaseClaimItem]\(../../../../../types/interfaces/types.BaseClaimItem/page.mdx)\[]) The claim's items.

    - shipping\_methods: (\[AdminOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminOrderShippingMethod/page.mdx)\[]) The shipping methods of the claim's additional items.

    - return\_id: (\`string\`) The ID of the associated return.

    - refund\_amount: (\`number\`) The amount to be refunded due to this claim.

    - created\_by: (\`string\`) The ID of the user that created this claim.

    - deleted\_at: (\`string\` \\| \`Date\`) The date the claim was deleted.

    - no\_notification: (\`boolean\`) Whether to notify the customer about changes in the claim.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The claim's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - return: (\[AdminReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturn/page.mdx))

    - items: (\[AdminReturnItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnItem/page.mdx)\[]) The return's items.

    - id: (\`string\`) The return's ID.

    - order\_id: (\`string\`) The ID of the order that the return belongs to.

    - order\_version: (\`number\`) The order's version once the return is applied.

    - display\_id: (\`number\`) The display ID of the return.

    - received\_at: (\`string\`) The date when the return was received.

    - created\_at: (\`string\`) The date when the return was created.

    - canceled\_at: (\`string\`) The date when the return was canceled.

    - status: (\[ReturnStatus]\(../../../../../order/types/order.ReturnStatus/page.mdx)) The return's status.

    - exchange\_id: (\`string\`) The ID of the exchange that the return belongs to,
      if available.

    - location\_id: (\`string\`) The ID of the stock location that the items are returned to.

    - claim\_id: (\`string\`) The ID of the claim that the return belongs to,
      if available.

    - no\_notification: (\`boolean\`) Whether to send the customers notifications about
      return updates.

    - refund\_amount: (\`number\`) The amount that is to be refunded to the customer.

***

## cancelRequest

This method cancels a requested claim. It sends a request to the
[Cancel Claim Request](https://docs.medusajs.com/api/admin#claims_deleteclaimsidrequest)
API route.

### Example

```ts
sdk.admin.claim.cancelRequest(
  "claim_123", 
)
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- id: (\`string\`) The claim's ID.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the claim.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminClaimDeleteResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminClaimDeleteResponse/page.mdx)\&#62;) The cancelation's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (\`"claim"\`) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.
