# paymentCollection - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.paymentCollection` set of methods used to send requests to Medusa's Admin API routes.

## create

This method creates a payment collection. It sends a request to the
[Create Payment Collection](https://docs.medusajs.com/api/admin#payment-collections_postpaymentcollections)
API route.

### Example

```ts
sdk.admin.paymentCollection.create({
  order_id: "order_123"
})
.then(({ payment_collection }) => {
  console.log(payment_collection)
})
```

### Parameters

- body: (\[AdminCreatePaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreatePaymentCollection/page.mdx)) The details of the payment collection to create.

  - order\_id: (\`string\`) The ID of the order this payment collection belongs to.

  - amount: (\`number\`) The payment collection's amount.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the payment collection.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminPaymentCollectionResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollectionResponse/page.mdx)\&#62;) The payment collection's details.

  - payment\_collection: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)) The payment collection's details.

    - payment\_providers: (\[AdminPaymentProvider]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentProvider/page.mdx)\[]) The associated payment providers.

    - id: (\`string\`) The ID of the payment collection.

    - currency\_code: (\`string\`) The ISO 3 character currency code of the payment sessions and payments associated with payment collection.

    - amount: (\`number\`) The total amount to be authorized and captured.

    - status: (\[BasePaymentCollectionStatus]\(../../../../../types/types/types.BasePaymentCollectionStatus/page.mdx)) The status of the payment collection.

    - payments: (\[AdminPayment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPayment/page.mdx)\[]) The associated payments.

    - payment\_sessions: (\[AdminPaymentSession]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentSession/page.mdx)\[]) The associated payment sessions.

    - authorized\_amount: (\`number\`) The amount authorized within the associated payment sessions.

    - captured\_amount: (\`number\`) The amount captured within the associated payment sessions.

    - refunded\_amount: (\`number\`) The amount refunded within the associated payments.

    - completed\_at: (\`string\` \\| \`Date\`) When the payment collection was completed.

    - created\_at: (\`string\` \\| \`Date\`) When the payment collection was created.

    - updated\_at: (\`string\` \\| \`Date\`) When the payment collection was updated.

    - metadata: (\`Record\<string, unknown>\`) Holds custom data in key-value pairs.

***

## delete

This method deletes a payment collection. It sends a request to the
[Delete Payment Collection](https://docs.medusajs.com/api/admin#payment-collections_deletepaymentcollectionsid)
API route.

### Example

```ts
sdk.admin.paymentCollection.delete("paycol_123")
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- id: (\`string\`) The payment collection's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminDeletePaymentCollectionResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDeletePaymentCollectionResponse/page.mdx)\&#62;) The deletion's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (\`"payment-collection"\`) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.

***

## markAsPaid

This method marks a payment collection as paid. It sends a request to the
[Mark as Paid](https://docs.medusajs.com/api/admin#payment-collections_postpaymentcollectionsidmarkaspaid)
API route.

The API route creates and authorizes a payment session, then capture its payment,
using the manual payment provider.

### Example

```ts
sdk.admin.paymentCollection.markAsPaid("paycol_123", {
  order_id: "order_123"
})
.then(({ payment_collection }) => {
  console.log(payment_collection)
})
```

### Parameters

- id: (\`string\`) The payment collection to mark as paid.
- body: (\[AdminMarkPaymentCollectionAsPaid]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminMarkPaymentCollectionAsPaid/page.mdx)) The details to mark the payment collection as paid.

  - order\_id: (\`string\`)
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the payment collection.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminPaymentCollectionResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollectionResponse/page.mdx)\&#62;) The payment collection's details.

  - payment\_collection: (\[AdminPaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentCollection/page.mdx)) The payment collection's details.

    - payment\_providers: (\[AdminPaymentProvider]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentProvider/page.mdx)\[]) The associated payment providers.

    - id: (\`string\`) The ID of the payment collection.

    - currency\_code: (\`string\`) The ISO 3 character currency code of the payment sessions and payments associated with payment collection.

    - amount: (\`number\`) The total amount to be authorized and captured.

    - status: (\[BasePaymentCollectionStatus]\(../../../../../types/types/types.BasePaymentCollectionStatus/page.mdx)) The status of the payment collection.

    - payments: (\[AdminPayment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPayment/page.mdx)\[]) The associated payments.

    - payment\_sessions: (\[AdminPaymentSession]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPaymentSession/page.mdx)\[]) The associated payment sessions.

    - authorized\_amount: (\`number\`) The amount authorized within the associated payment sessions.

    - captured\_amount: (\`number\`) The amount captured within the associated payment sessions.

    - refunded\_amount: (\`number\`) The amount refunded within the associated payments.

    - completed\_at: (\`string\` \\| \`Date\`) When the payment collection was completed.

    - created\_at: (\`string\` \\| \`Date\`) When the payment collection was created.

    - updated\_at: (\`string\` \\| \`Date\`) When the payment collection was updated.

    - metadata: (\`Record\<string, unknown>\`) Holds custom data in key-value pairs.
