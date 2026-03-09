# return - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.return` set of methods used to send requests to Medusa's Admin API routes.

## list

This method retrieves a list of returns. It sends a request to the
[List Returns](https://docs.medusajs.com/api/admin#returns_getreturns)
API route.

### Example

To retrieve the list of returns:

```ts
sdk.admin.return.list()
.then(({ returns, count, limit, offset }) => {
  console.log(returns)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.return.list({
  limit: 10,
  offset: 10
})
.then(({ returns, count, limit, offset }) => {
  console.log(returns)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each return:

```ts
sdk.admin.return.list({
  fields: "id,*items"
})
.then(({ returns, count, limit, offset }) => {
  console.log(returns)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/admin#select-fields-and-relations).

### Parameters

- query: (\[AdminReturnFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnFilters/page.mdx)) Filters and pagination configurations.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by return ID(s).

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

  - order\_id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by order ID(s) to retrieve their returns.

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

  - status: (\`string\` \\| \`string\`\[] \\| \`Record\<string, unknown>\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;Record\&#60;string, unknown\&#62;\&#62;) Filter by status.

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

  - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date when the return was created.

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

  - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date when the return was updated.

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

- Promise: (Promise\&#60;\[AdminReturnsResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminReturnsResponse/page.mdx)\&#62;) The list of returns.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## retrieve

This method retrieves a return by ID. It sends a request to the
[Get Return](https://docs.medusajs.com/api/admin#returns_getreturnsid)
API route.

### Example

To retrieve a return by its ID:

```ts
sdk.admin.return.retrieve("return_123")
.then(({ return }) => {
  console.log(return)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.return.retrieve("return_123", {
  fields: "id,*items"
})
.then(({ return }) => {
  console.log(return)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/admin#select-fields-and-relations).

### Parameters

- id: (\`string\`) The ID of the return to retrieve.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminReturnResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnResponse/page.mdx)\&#62;) The return's details.

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

## initiateRequest

This method initiates a return request by creating a return. It sends a request to the
[Create Return](https://docs.medusajs.com/api/admin#returns_postreturns)
API route.

### Example

```ts
sdk.admin.return.initiateRequest({
  order_id: "order_123",
})
.then(({ return }) => {
  console.log(return)
})
```

### Parameters

- body: (\[AdminInitiateReturnRequest]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInitiateReturnRequest/page.mdx)) The details of the return to create.

  - order\_id: (\`string\`) The ID of the order that the return belongs to.

  - location\_id: (\`string\`) The ID of the stock location to return the items to.

  - description: (\`string\`) The return's description.

  - internal\_note: (\`string\`) A note that is viewed by admins only to
    describe the return.

  - no\_notification: (\`boolean\`) Whether to send a notification to the customer
    for return updates.

  - metadata: (\`Record\<string, unknown>\`) Custom key-value pairs that can be added to the return.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminReturnResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnResponse/page.mdx)\&#62;) The return's details.

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

## cancel

This method cancels a return. It sends a request to the
[Cancel Return](https://docs.medusajs.com/api/admin#returns_postreturnsidcancel)
API route.

### Example

```ts
sdk.admin.return.cancel("return_123")
.then(({ return }) => {
  console.log(return)
})
```

### Parameters

- id: (\`string\`) The ID of the return to cancel.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminReturnResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnResponse/page.mdx)\&#62;) The return's details.

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

## cancelRequest

This method cancels a return request. It sends a request to the
[Cancel Return Request](https://docs.medusajs.com/api/admin#returns_deletereturnsidrequest)
API route.

### Example

```ts
sdk.admin.return.cancelRequest("return_123")
.then(({ return }) => {
  console.log(return)
})
```

### Parameters

- id: (\`string\`) The ID of the return to cancel.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminReturnResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnResponse/page.mdx)\&#62;) The return's details.

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

## addReturnItem

This method adds an item to a return request. It sends a request to the
[Add Return Item](https://docs.medusajs.com/api/admin#returns_postreturnsidrequestitems)
API route.

### Example

```ts
sdk.admin.return.addReturnItem("return_123", {
  id: "orlitem_123",
  quantity: 1,
})
.then(({ return }) => {
  console.log(return)
})
```

### Parameters

- id: (\`string\`) The ID of the return to add the item to.
- body: (\[AdminAddReturnItems]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminAddReturnItems/page.mdx)) The details of the item to add to the return.

  - items: (\[AdminAddReturnItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminAddReturnItem/page.mdx)\[])

    - id: (\`string\`) The ID of the order item to add to the return.

    - quantity: (\`number\`) The quantity of the item to return.

    - description: (\`string\`) A note to describe why the item is being returned.

    - internal\_note: (\`string\`) A note that is viewed by admins only to
      describe why the item is being returned.

    - metadata: (\`Record\<string, unknown>\`) Custom key-value pairs that can be added to the return item.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminReturnResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnResponse/page.mdx)\&#62;) The return's details.

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

## updateReturnItem

This method updates an item in a return request by the ID of the item's `RETURN_ITEM` action.
Every item has an `actions` property, whose value is an array of actions. You can check the action's name
using its `action` property, and use the value of the `id` property. For example,
`item.actions.find((action) => action.action === "RETURN_ITEM")?.id` is the ID of an item's `RETURN_ITEM` action.

This method sends a request to the
[Update Requested Return Item](https://docs.medusajs.com/api/admin#returns_postreturnsidrequestitemsaction_id)
API route.

### Example

```ts
sdk.admin.return.updateReturnItem("return_123", "orchach_123", {
  quantity: 2,
})
.then(({ return }) => {
  console.log(return)
})
```

### Parameters

- id: (\`string\`) The ID of the return to update the item in.
- actionId: (\`string\`) The ID of the item's \`RETURN\_ITEM\` action.
- body: (\[AdminUpdateReturnItems]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateReturnItems/page.mdx)) The details of the item to update.

  - quantity: (\`number\`) The quantity of the item to return.

  - internal\_note: (\`null\` \\| \`string\`) A note that is viewed by admins only to
    describe why the item is being returned.

  - reason\_id: (\`null\` \\| \`string\`) The ID of the return reason to associate with the item.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Custom key-value pairs that can be added to the return item.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminReturnResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnResponse/page.mdx)\&#62;) The return's details.

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

## removeReturnItem

This method removes an item from a return request by the ID of the item's `RETURN_ITEM` action.

Every item has an `actions` property, whose value is an array of actions. You can check the action's name
using its `action` property, and use the value of the `id` property. For example,
`item.actions.find((action) => action.action === "RETURN_ITEM")?.id` is the ID of an item's `RETURN_ITEM` action.

This method sends a request to the
[Remove Item from Return](https://docs.medusajs.com/api/admin#returns_deletereturnsidrequestitemsaction_id)
API route.

### Example

```ts
sdk.admin.return.removeReturnItem("return_123", "orchach_123")
.then(({ return }) => {
  console.log(return)
})
```

### Parameters

- id: (\`string\`) The ID of the return to remove the item from.
- actionId: (\`string\`) The ID of the item's \`RETURN\_ITEM\` action.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminReturnResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnResponse/page.mdx)\&#62;) The return's details.

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

## addReturnShipping

This method adds a shipping method to a return request. It sends a request to the
[Add Shipping Method to Return](https://docs.medusajs.com/api/admin#returns_postreturnsidshippingmethod)
API route.

### Example

```ts
sdk.admin.return.addReturnShipping("return_123", {
  shipping_option_id: "so_123",
})
.then(({ return }) => {
  console.log(return)
})
```

### Parameters

- id: (\`string\`) The ID of the return to add the shipping method to.
- body: (\[AdminAddReturnShipping]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminAddReturnShipping/page.mdx)) The details of the shipping method to add to the return.

  - shipping\_option\_id: (\`string\`) The ID of the shipping option that the shipping method
    is created from.

  - custom\_amount: (\`number\`) A custom amount to set for the shipping method.
    If not provided, the shipping option's fixed or calculated amount will be used.

  - description: (\`string\`) A note to describe the shipping method.

  - internal\_note: (\`string\`) A note that is viewed by admins only to
    describe the shipping method.

  - metadata: (\`Record\<string, unknown>\`) Custom key-value pairs that can be added to the shipping method.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminReturnResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnResponse/page.mdx)\&#62;) The return's details.

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

## updateReturnShipping

This method updates a shipping method in a return request by the ID of the shipping method's `SHIPPING_ADD` action.

Every shipping method has an `actions` property, whose value is an array of actions. You can check the action's name
using its `action` property, and use the value of the `id` property.

For example, `shipping_method.actions.find((action) => action.action === "SHIPPING_ADD")?.id` is
the ID of a shipping method's `SHIPPING_ADD` action.

This method sends a request to the
[Update Shipping Method in Return](https://docs.medusajs.com/api/admin#returns_postreturnsidshippingmethodaction_id)
API route.

### Example

```ts
sdk.admin.return.updateReturnShipping("return_123", "orchach_123", {
  custom_amount: 100,
})
.then(({ return }) => {
  console.log(return)
})
```

### Parameters

- id: (\`string\`) The ID of the return to update the shipping method in.
- actionId: (\`string\`) The ID of the shipping method's \`SHIPPING\_ADD\` action.
- body: (\[AdminUpdateReturnShipping]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateReturnShipping/page.mdx)) The details of the shipping method to update.

  - custom\_amount: (\`number\`) A custom amount to set for the shipping method.
    If not provided, the shipping option's fixed or calculated amount will be used.

  - internal\_note: (\`string\`) A note that is viewed by admins only to
    describe the shipping method.

  - metadata: (\`Record\<string, unknown>\`) Custom key-value pairs that can be added to the shipping method.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminReturnResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnResponse/page.mdx)\&#62;) The return's details.

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

## deleteReturnShipping

This method removes a shipping method from a return request by the ID of the shipping method's `SHIPPING_ADD` action.

Every shipping method has an `actions` property, whose value is an array of actions. You can check the action's name
using its `action` property, and use the value of the `id` property.

For example, `shipping_method.actions.find((action) => action.action === "SHIPPING_ADD")?.id` is
the ID of a shipping method's `SHIPPING_ADD` action.

This method sends a request to the
[Remove Shipping Method from Return](https://docs.medusajs.com/api/admin#returns_deletereturnsidshippingmethodaction_id)
API route.

### Example

```ts
sdk.admin.return.deleteReturnShipping("return_123", "orchach_123")
.then(({ return }) => {
  console.log(return)
})
```

### Parameters

- id: (\`string\`) The ID of the return to remove the shipping method from.
- actionId: (\`string\`) The ID of the shipping method's \`SHIPPING\_ADD\` action.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminReturnResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnResponse/page.mdx)\&#62;) The return's details.

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

## updateRequest

This method updates a return request. It sends a request to the
[Update Return](https://docs.medusajs.com/api/admin#returns_postreturnsid)
API route.

### Example

```ts
sdk.admin.return.updateRequest("return_123", {
  location_id: "sloc_123",
})
.then(({ return }) => {
  console.log(return)
})
```

### Parameters

- id: (\`string\`) The ID of the return to update.
- body: (\[AdminUpdateReturnRequest]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateReturnRequest/page.mdx)) The details of the return to update.

  - location\_id: (\`null\` \\| \`string\`) The ID of the stock location to return the items to.

  - no\_notification: (\`boolean\`) Whether to send a notification to the customer
    for return updates.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Custom key-value pairs that can be added to the return.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminReturnResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnResponse/page.mdx)\&#62;) The return's details.

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

## confirmRequest

This method confirms a return request. The return's changes are applied on the inventory quantity of the return
items and the order only after the return has been confirmed as received using the
[Confirm Return Receival](https://docs.medusajs.com/api/admin#returns_postreturnsidreceiveconfirm)
API route.

This method sends a request to the
[Confirm Return Request](https://docs.medusajs.com/api/admin#returns_postreturnsidrequest)
API route.

### Example

```ts
sdk.admin.return.confirmRequest("return_123", {
  no_notification: true,
})
.then(({ return }) => {
  console.log(return)
})
```

### Parameters

- id: (\`string\`) The ID of the return to confirm.
- body: (\[AdminConfirmReturnRequest]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminConfirmReturnRequest/page.mdx)) The details of the return to confirm.

  - no\_notification: (\`boolean\`) Whether to send a notification to the customer
    for return updates.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminReturnResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnResponse/page.mdx)\&#62;) The return's details.

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

## initiateReceive

This method starts the return receival process. It sends a request to the
[Start Return Receival](https://docs.medusajs.com/api/admin#returns_postreturnsidreceive)
API route.

### Example

```ts
sdk.admin.return.initiateReceive("return_123", {
  internal_note: "Return received by the customer",
})
.then(({ return }) => {
  console.log(return)
})
```

### Parameters

- id: (\`string\`) The ID of the return to start the receival process.
- body: (\[AdminInitiateReceiveReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInitiateReceiveReturn/page.mdx)) The details of the return to start the receival process.

  - internal\_note: (\`string\`) A note that is viewed by admins only to
    describe the return.

  - description: (\`string\`) A note to describe the return.

  - metadata: (\`Record\<string, unknown>\`) Custom key-value pairs that can be added to the return.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminReturnResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnResponse/page.mdx)\&#62;) The return's details.

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

## receiveItems

This method adds received items to a return. These items will have the action `RECEIVE_RETURN_ITEM`.

The method sends a request to the
[Add Received Items](https://docs.medusajs.com/api/admin#returns_postreturnsidreceiveitems)
API route.

### Example

```ts
sdk.admin.return.receiveItems("return_123", {
  items: [
    { id: "item_123", quantity: 1 },
  ],
})
.then(({ return }) => {
  console.log(return)
})
```

### Parameters

- id: (\`string\`) The ID of the return to add the received items to.
- body: (\[AdminReceiveItems]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReceiveItems/page.mdx)) The details of the received items to add to the return.

  - items: (\`object\`\[]) The received items in the return.

    - id: (\`string\`) The ID of the received item.

    - quantity: (\`number\`) The received quantity of the item.

    - internal\_note: (\`string\`) A note that is viewed by admins only to
      describe the received item.

    - description: (\`string\`) The description of the received item.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminReturnResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnResponse/page.mdx)\&#62;) The return's details.

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

## updateReceiveItem

This method updates a received item in the return by the ID of the item's `RECEIVE_RETURN_ITEM` action.

Every item has an `actions` property, whose value is an array of actions. You can check the action's name
using its `action` property, and use the value of the `id` property.

For example, `received_item.actions.find((action) => action.action === "RECEIVE_RETURN_ITEM")?.id` is
the ID of a received item's `RECEIVE_RETURN_ITEM` action.

This method sends a request to the
[Update Received Item](https://docs.medusajs.com/api/admin#returns_postreturnsidreceiveitemsaction_id)
API route.

### Example

```ts
sdk.admin.return.updateReceiveItem("return_123", "orchach_123", {
  quantity: 2,
})
.then(({ return }) => {
  console.log(return)
})
```

### Parameters

- id: (\`string\`) The ID of the return to update the received item in.
- actionId: (\`string\`) The ID of the received item's \`RECEIVE\_RETURN\_ITEM\` action.
- body: (\[AdminUpdateReceiveItems]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateReceiveItems/page.mdx)) The details of the received item to update.

  - quantity: (\`number\`) The received quantity of the item.

  - internal\_note: (\`string\`) A note that is viewed by admins only to
    describe the received item.

  - reason\_id: (\`string\`) The ID of the return reason to associate with the item.

  - metadata: (\`Record\<string, unknown>\`) Custom key-value pairs that can be added to the received item.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminReturnResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnResponse/page.mdx)\&#62;) The return's details.

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

## removeReceiveItem

This method removes a received item from the return by the ID of the item's `RECEIVE_RETURN_ITEM` action.

Every item has an `actions` property, whose value is an array of actions. You can check the action's name
using its `action` property, and use the value of the `id` property.

For example, `received_item.actions.find((action) => action.action === "RECEIVE_RETURN_ITEM")?.id` is
the ID of a received item's `RECEIVE_RETURN_ITEM` action.

This method sends a request to the
[Remove Received Item](https://docs.medusajs.com/api/admin#returns_deletereturnsidreceiveitemsaction_id)
API route.

### Example

```ts
sdk.admin.return.removeReceiveItem("return_123", "orchach_123")
.then(({ return }) => {
  console.log(return)
})
```

### Parameters

- id: (\`string\`) The ID of the return to remove the received item from.
- actionId: (\`string\`) The ID of the received item's \`RECEIVE\_RETURN\_ITEM\` action.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminReturnResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnResponse/page.mdx)\&#62;) The return's details.

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

## dismissItems

This method adds damaged items to the return. These items will have the action `RECEIVE_DAMAGED_RETURN_ITEM`.

A damaged item's quantity is not added back to the associated inventory item's quantity in the
stock location where the return is initiated from.

The method sends a request to the
[Add Damaged Items](https://docs.medusajs.com/api/admin#returns_postreturnsiddismissitems)
API route.

### Example

```ts
sdk.admin.return.dismissItems("return_123", {
  items: [
    { id: "orli_123", quantity: 1 },
  ],
})
.then(({ return }) => {
  console.log(return)
})
```

### Parameters

- id: (\`string\`) The ID of the return to add the damaged items to.
- body: (\[AdminDismissItems]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminDismissItems/page.mdx)) The details of the damaged items to add to the return.

  - items: (\`object\`\[]) The damaged items to add to the return.

    - id: (\`string\`) The ID of the item to add to the return.

    - quantity: (\`number\`) The quantity of the item that is damaged.

    - internal\_note: (\`string\`) A note that is viewed by admins only to
      describe the damaged item.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminReturnResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnResponse/page.mdx)\&#62;) The return's details.

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

## updateDismissItem

This method updates a damaged item in the return by the ID of the item's `RECEIVE_DAMAGED_RETURN_ITEM` action.

Every item has an `actions` property, whose value is an array of actions. You can check the action's name
using its `action` property, and use the value of the `id` property.

For example, `item.actions.find((action) => action.action === "RECEIVE_DAMAGED_RETURN_ITEM")?.id` is
the ID of a damaged item's `RECEIVE_DAMAGED_RETURN_ITEM` action.

This method sends a request to the
[Update Damaged Item](https://docs.medusajs.com/api/admin#returns_postreturnsiddismissitemsaction_id)
API route.

### Example

```ts
sdk.admin.return.updateDismissItem("return_123", "orchach_123", {
  quantity: 2,
})
.then(({ return }) => {
  console.log(return)
})
```

### Parameters

- id: (\`string\`) The ID of the return to update the damaged item in.
- actionId: (\`string\`) The ID of the damaged item's \`RECEIVE\_DAMAGED\_RETURN\_ITEM\` action.
- body: (\[AdminUpdateDismissItems]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateDismissItems/page.mdx)) The details of the damaged item to update.

  - quantity: (\`number\`) The quantity of the item that is damaged.

  - internal\_note: (\`string\`) A note that is viewed by admins only to

  - reason\_id: (\`string\`) The ID of the return reason to associate with the item.

  - metadata: (\`Record\<string, unknown>\`) Custom key-value pairs that can be added to the received item.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminReturnResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnResponse/page.mdx)\&#62;) The return's details.

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

## removeDismissItem

This method removes a damaged item from the return by the ID of the item's `RECEIVE_DAMAGED_RETURN_ITEM` action.

Every item has an `actions` property, whose value is an array of actions. You can check the action's name
using its `action` property, and use the value of the `id` property.

For example, `item.actions.find((action) => action.action === "RECEIVE_DAMAGED_RETURN_ITEM")?.id` is
the ID of a damaged item's `RECEIVE_DAMAGED_RETURN_ITEM` action.

This method sends a request to the
[Remove Damaged Item](https://docs.medusajs.com/api/admin#returns_deletereturnsiddismissitemsaction_id)
API route.

### Example

```ts
sdk.admin.return.removeDismissItem("return_123", "orchach_123")
.then(({ return }) => {
  console.log(return)
})
```

### Parameters

- id: (\`string\`) The ID of the return to remove the damaged item from.
- actionId: (\`string\`) The ID of the damaged item's \`RECEIVE\_DAMAGED\_RETURN\_ITEM\` action.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminReturnResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnResponse/page.mdx)\&#62;) The return's details.

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

## confirmReceive

This method confirms the return receival. It sends a request to the
[Confirm Return Receival](https://docs.medusajs.com/api/admin#returns_postreturnsidreceiveconfirm)
API route.

### Example

```ts
sdk.admin.return.confirmReceive("return_123", {
  no_notification: true,
})
.then(({ return }) => {
  console.log(return)
})
```

### Parameters

- id: (\`string\`) The ID of the return to confirm the receival of.
- body: (\[AdminConfirmReceiveReturn]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminConfirmReceiveReturn/page.mdx)) The details of the receival confirmation.

  - no\_notification: (\`boolean\`) Whether to send a notification to the customer
    for return updates.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminReturnResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnResponse/page.mdx)\&#62;) The return's details.

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

## cancelReceive

This method cancels a return receival. It sends a request to the
[Cancel Return Receival](https://docs.medusajs.com/api/admin#returns_deletereturnsidreceive)
API route.

### Example

```ts
sdk.admin.return.cancelReceive("return_123")
.then(({ return }) => {
  console.log(return)
})
```

### Parameters

- id: (\`string\`) The ID of the return to cancel the receival of.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the return.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminReturnResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminReturnResponse/page.mdx)\&#62;) The return's details.

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
