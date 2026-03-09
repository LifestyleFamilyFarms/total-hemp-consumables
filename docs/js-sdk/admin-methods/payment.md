# payment - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.payment` set of methods used to send requests to Medusa's Admin API routes.

## list

This method retrieves a paginated list of payments. It sends a request to the
[List Payments](https://docs.medusajs.com/api/admin#payments_getpayments) API route.

### Example

To retrieve the list of payments:

```ts
sdk.admin.payment.list()
.then(({ payments, count, limit, offset }) => {
  console.log(payments)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.payment.list({
  limit: 10,
  offset: 10
})
.then(({ payments, count, limit, offset }) => {
  console.log(payments)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each payment:

```ts
sdk.admin.payment.list({
  fields: "id,*payment_collection"
})
.then(({ payments, count, limit, offset }) => {
  console.log(payments)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- query: (\[AdminPaymentFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentFilters/page.mdx)) Filters and pagination configurations.

  - $and: ((\[BasePaymentFilters]\(../../../../../types/interfaces/types.BasePaymentFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BasePaymentFilters]\(../../../../../types/interfaces/types.BasePaymentFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[BasePaymentFilters]\(../../../../../types/interfaces/types.BasePaymentFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BasePaymentFilters]\(../../../../../types/interfaces/types.BasePaymentFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[BasePaymentFilters]\(../../../../../types/interfaces/types.BasePaymentFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BasePaymentFilters]\(../../../../../types/interfaces/types.BasePaymentFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - id: (\`string\` \\| \`string\`\[]) Filter by payment ID(s).

  - $or: ((\[BasePaymentFilters]\(../../../../../types/interfaces/types.BasePaymentFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BasePaymentFilters]\(../../../../../types/interfaces/types.BasePaymentFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[BasePaymentFilters]\(../../../../../types/interfaces/types.BasePaymentFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BasePaymentFilters]\(../../../../../types/interfaces/types.BasePaymentFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[BasePaymentFilters]\(../../../../../types/interfaces/types.BasePaymentFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BasePaymentFilters]\(../../../../../types/interfaces/types.BasePaymentFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - id: (\`string\` \\| \`string\`\[]) Filter by payment ID(s).

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - q: (\`string\`) Query or keywords to search the payment's searchable fields.

  - payment\_session\_id: (\`string\` \\| \`string\`\[]) Filter by IDs of associated payment sessions to retrieve their payments.

  - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the payment's creation date.

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

  - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the payment's update date.

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

  - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the payment's deleted date.

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

  - id: (\`string\` \\| \`string\`\[]) Filter by payment ID(s).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminPaymentsResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminPaymentsResponse/page.mdx)\&#62;) The paginated list of payments.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## listPaymentProviders

This method retrieves a paginated list of payment providers. It sends a request to the
[List Payment Providers](https://docs.medusajs.com/api/admin#payments_getpaymentspaymentproviders) API route.

### Example

To retrieve the list of payment providers:

```ts
sdk.admin.payment.listPaymentProviders()
.then(({ payment_providers, count, limit, offset }) => {
  console.log(payment_providers)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.payment.listPaymentProviders({
  limit: 10,
  offset: 10
})
.then(({ payment_providers, count, limit, offset }) => {
  console.log(payment_providers)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each payment provider:

```ts
sdk.admin.payment.listPaymentProviders({
  fields: "id,is_enabled"
})
.then(({ payment_providers, count, limit, offset }) => {
  console.log(payment_providers)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- query: (\[AdminGetPaymentProvidersParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetPaymentProvidersParams/page.mdx)) Filters and pagination configurations.

  - $and: ((\[AdminGetPaymentProvidersParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetPaymentProvidersParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetPaymentProvidersParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetPaymentProvidersParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[AdminGetPaymentProvidersParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetPaymentProvidersParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetPaymentProvidersParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetPaymentProvidersParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminGetPaymentProvidersParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetPaymentProvidersParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetPaymentProvidersParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetPaymentProvidersParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - id: (\`string\` \\| \`string\`\[]) Filter by payment provider ID(s).

    - is\_enabled: (\`boolean\`) Whether the payment provider is enabled.

  - $or: ((\[AdminGetPaymentProvidersParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetPaymentProvidersParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetPaymentProvidersParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetPaymentProvidersParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[AdminGetPaymentProvidersParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetPaymentProvidersParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetPaymentProvidersParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetPaymentProvidersParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminGetPaymentProvidersParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetPaymentProvidersParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetPaymentProvidersParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetPaymentProvidersParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - id: (\`string\` \\| \`string\`\[]) Filter by payment provider ID(s).

    - is\_enabled: (\`boolean\`) Whether the payment provider is enabled.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - id: (\`string\` \\| \`string\`\[]) Filter by payment provider ID(s).

  - is\_enabled: (\`boolean\`) Whether the payment provider is enabled.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminPaymentProviderListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminPaymentProviderListResponse/page.mdx)\&#62;) The paginated list of payment providers.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## retrieve

This method retrieves a payment's details. It sends a request to the
[Get Payment](https://docs.medusajs.com/api/admin#payments_getpaymentsid)
API route.

### Example

To retrieve a payment by its ID:

```ts
sdk.admin.payment.retrieve("pay_123")
.then(({ payment }) => {
  console.log(payment)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.payment.retrieve("pay_123", {
  fields: "id,*payment_collection"
})
.then(({ payment }) => {
  console.log(payment)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- id: (\`string\`) The payment's ID.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the payment.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminPaymentResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentResponse/page.mdx)\&#62;) The payment's details.

  - payment: (\[AdminPayment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPayment/page.mdx)) The payment's details.

    - id: (\`string\`) The ID of the payment.

    - amount: (\`number\`) The payment's total amount.

    - currency\_code: (\`string\`) The ISO 3 character currency code of the payment.

    - provider\_id: (\`string\`) The ID of the associated payment provider.

    - refunds: (\[AdminRefund]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRefund/page.mdx)\[]) The associated refunds.

    - payment\_collection: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)) The payment collection this payment belongs to.

    - payment\_session: (\[AdminPaymentSession]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentSession/page.mdx)) The associated payment session.

    - authorized\_amount: (\`number\`) The authorized amount of the payment.

    - data: (\`Record\<string, unknown>\`) The data relevant for the payment provider to process the payment.

    - created\_at: (\`string\` \\| \`Date\`) When the payment was created.

    - updated\_at: (\`string\` \\| \`Date\`) When the payment was updated.

    - captured\_at: (\`string\` \\| \`Date\`) When the payment was captured.

    - canceled\_at: (\`string\` \\| \`Date\`) When the payment was canceled.

    - captured\_amount: (\`number\`) The sum of the associated captures' amounts.

    - refunded\_amount: (\`number\`) The sum of the associated refunds' amounts.

    - captures: (\[BaseCapture]\(../../../../../types/interfaces/types.BaseCapture/page.mdx)\[]) The associated captures.

***

## capture

This method captures a payment. It sends a request to the
[Capture Payment](https://docs.medusajs.com/api/admin#payments_postpaymentsidcapture) API route.

The API route uses the `capturePayment` method of the payment provider associated with the payment's collection.

### Example

```ts
sdk.admin.payment.capture("paycol_123", {})
.then(({ payment }) => {
  console.log(payment)
})
```

### Parameters

- id: (\`string\`) The payment's ID.
- body: (\[AdminCapturePayment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCapturePayment/page.mdx)) The capture's details.

  - amount: (\`number\`) Custom amount to capture. If not specified, the
    payment's amount is captured.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the payment.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminPaymentResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentResponse/page.mdx)\&#62;) The payment's details.

  - payment: (\[AdminPayment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPayment/page.mdx)) The payment's details.

    - id: (\`string\`) The ID of the payment.

    - amount: (\`number\`) The payment's total amount.

    - currency\_code: (\`string\`) The ISO 3 character currency code of the payment.

    - provider\_id: (\`string\`) The ID of the associated payment provider.

    - refunds: (\[AdminRefund]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRefund/page.mdx)\[]) The associated refunds.

    - payment\_collection: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)) The payment collection this payment belongs to.

    - payment\_session: (\[AdminPaymentSession]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentSession/page.mdx)) The associated payment session.

    - authorized\_amount: (\`number\`) The authorized amount of the payment.

    - data: (\`Record\<string, unknown>\`) The data relevant for the payment provider to process the payment.

    - created\_at: (\`string\` \\| \`Date\`) When the payment was created.

    - updated\_at: (\`string\` \\| \`Date\`) When the payment was updated.

    - captured\_at: (\`string\` \\| \`Date\`) When the payment was captured.

    - canceled\_at: (\`string\` \\| \`Date\`) When the payment was canceled.

    - captured\_amount: (\`number\`) The sum of the associated captures' amounts.

    - refunded\_amount: (\`number\`) The sum of the associated refunds' amounts.

    - captures: (\[BaseCapture]\(../../../../../types/interfaces/types.BaseCapture/page.mdx)\[]) The associated captures.

***

## refund

This method refunds a payment. It sends a request to the
[Refund Payment](https://docs.medusajs.com/api/admin#payments_postpaymentsidrefund) API route.

The API route uses the `refundPayment` method of the payment provider associated with the payment's collection.

### Example

```ts
sdk.admin.payment.refund("paycol_123", {})
.then(({ payment }) => {
  console.log(payment)
})
```

### Parameters

- id: (\`string\`) The payment's ID.
- body: (\[AdminRefundPayment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRefundPayment/page.mdx)) The refund's details.

  - amount: (\`number\`) Custom amount to refund. If not specified, the
    payment's amount is refunded.

  - refund\_reason\_id: (\`string\`) The ID of the refund's reason.

  - note: (\`string\`) A note to attach to the refund.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the payment.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminPaymentResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentResponse/page.mdx)\&#62;) The payment's details.

  - payment: (\[AdminPayment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPayment/page.mdx)) The payment's details.

    - id: (\`string\`) The ID of the payment.

    - amount: (\`number\`) The payment's total amount.

    - currency\_code: (\`string\`) The ISO 3 character currency code of the payment.

    - provider\_id: (\`string\`) The ID of the associated payment provider.

    - refunds: (\[AdminRefund]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRefund/page.mdx)\[]) The associated refunds.

    - payment\_collection: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)) The payment collection this payment belongs to.

    - payment\_session: (\[AdminPaymentSession]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentSession/page.mdx)) The associated payment session.

    - authorized\_amount: (\`number\`) The authorized amount of the payment.

    - data: (\`Record\<string, unknown>\`) The data relevant for the payment provider to process the payment.

    - created\_at: (\`string\` \\| \`Date\`) When the payment was created.

    - updated\_at: (\`string\` \\| \`Date\`) When the payment was updated.

    - captured\_at: (\`string\` \\| \`Date\`) When the payment was captured.

    - canceled\_at: (\`string\` \\| \`Date\`) When the payment was canceled.

    - captured\_amount: (\`number\`) The sum of the associated captures' amounts.

    - refunded\_amount: (\`number\`) The sum of the associated refunds' amounts.

    - captures: (\[BaseCapture]\(../../../../../types/interfaces/types.BaseCapture/page.mdx)\[]) The associated captures.
