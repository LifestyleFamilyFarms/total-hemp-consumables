# customer - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.customer` set of methods used to send requests to Medusa's Admin API routes.

## create

This method creates a customer. It sends a request to the
[Create Customer](https://docs.medusajs.com/api/admin#customers_postcustomers) API route.

### Example

```ts
sdk.admin.customer.create({
  email: "customer@gmail.com"
})
.then(({ customer }) => {
  console.log(customer)
})
```

### Parameters

- body: (\[AdminCreateCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateCustomer/page.mdx)) The customer's details.

  - email: (\`string\`) The customer's email.

  - company\_name: (\`string\`) The customer's company name.

  - first\_name: (\`string\`) The customer's first name.

  - last\_name: (\`string\`) The customer's last name.

  - phone: (\`string\`) The customer's phone number.

  - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the customer.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminCustomerResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerResponse/page.mdx)\&#62;) The customer's details.

  - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The customer's details.

    - has\_account: (\`boolean\`) Whether the customer is a guest.

    - addresses: (\[AdminCustomerAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerAddress/page.mdx)\[]) The customer's addresses.

    - id: (\`string\`) The customer's ID.

    - email: (\`string\`) The customer's email.

    - default\_billing\_address\_id: (\`null\` \\| \`string\`) The ID of the customer's default billing address.

    - default\_shipping\_address\_id: (\`null\` \\| \`string\`) The ID of the customer's default shipping address.

    - company\_name: (\`null\` \\| \`string\`) The customer's company name.

    - first\_name: (\`null\` \\| \`string\`) The customer's first name.

    - last\_name: (\`null\` \\| \`string\`) The customer's last name.

    - groups: (\[AdminCustomerGroup]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerGroup/page.mdx)\[]) The groups the customer is in.

    - phone: (\`null\` \\| \`string\`) The customer's phone.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

    - created\_by: (\`null\` \\| \`string\`) The ID of the user that created the customer.

    - deleted\_at: (\`null\` \\| \`string\` \\| \`Date\`) The date the customer was deleted.

    - created\_at: (\`string\` \\| \`Date\`) The date the customer was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the customer was updated.

***

## update

This method updates a customer's details. It sends a request to the
[Update Customer](https://docs.medusajs.com/api/admin#customers_postcustomersid) API route.

### Example

```ts
sdk.admin.customer.update("cus_123", {
  first_name: "John"
})
.then(({ customer }) => {
  console.log(customer)
})
```

### Parameters

- id: (\`string\`) The customer's ID.
- body: (\[AdminUpdateCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateCustomer/page.mdx)) The details to update of the customer.

  - company\_name: (\`string\`) The customer's company name.

  - first\_name: (\`string\`) The customer's first name.

  - last\_name: (\`string\`) The customer's last name.

  - phone: (\`string\`) The customer's phone number.

  - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the customer.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminCustomerResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerResponse/page.mdx)\&#62;) The customer's details.

  - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The customer's details.

    - has\_account: (\`boolean\`) Whether the customer is a guest.

    - addresses: (\[AdminCustomerAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerAddress/page.mdx)\[]) The customer's addresses.

    - id: (\`string\`) The customer's ID.

    - email: (\`string\`) The customer's email.

    - default\_billing\_address\_id: (\`null\` \\| \`string\`) The ID of the customer's default billing address.

    - default\_shipping\_address\_id: (\`null\` \\| \`string\`) The ID of the customer's default shipping address.

    - company\_name: (\`null\` \\| \`string\`) The customer's company name.

    - first\_name: (\`null\` \\| \`string\`) The customer's first name.

    - last\_name: (\`null\` \\| \`string\`) The customer's last name.

    - groups: (\[AdminCustomerGroup]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerGroup/page.mdx)\[]) The groups the customer is in.

    - phone: (\`null\` \\| \`string\`) The customer's phone.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

    - created\_by: (\`null\` \\| \`string\`) The ID of the user that created the customer.

    - deleted\_at: (\`null\` \\| \`string\` \\| \`Date\`) The date the customer was deleted.

    - created\_at: (\`string\` \\| \`Date\`) The date the customer was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the customer was updated.

***

## list

This method retrieves a paginated list of customers. It sends a request to the
[List Customers](https://docs.medusajs.com/api/admin#customers_getcustomers)
API route.

### Example

To retrieve the list of customers:

```ts
sdk.admin.customer.list()
.then(({ customers, count, limit, offset }) => {
  console.log(customers)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.customer.list({
  limit: 10,
  offset: 10
})
.then(({ customers, count, limit, offset }) => {
  console.log(customers)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each customer:

```ts
sdk.admin.customer.list({
  fields: "id,*groups"
})
.then(({ customers, count, limit, offset }) => {
  console.log(customers)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- queryParams: (\[AdminCustomerFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerFilters/page.mdx)) Filters and pagination configurations.

  - $and: ((\[BaseCustomerFilters]\(../../../../../types/interfaces/types.BaseCustomerFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseCustomerFilters]\(../../../../../types/interfaces/types.BaseCustomerFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[BaseCustomerFilters]\(../../../../../types/interfaces/types.BaseCustomerFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseCustomerFilters]\(../../../../../types/interfaces/types.BaseCustomerFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[BaseCustomerFilters]\(../../../../../types/interfaces/types.BaseCustomerFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseCustomerFilters]\(../../../../../types/interfaces/types.BaseCustomerFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`) Query or keywords to apply on the customer's searchable fields.

    - id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by customer ID(s).

    - email: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by email(s).

    - company\_name: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by company name(s).

    - first\_name: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by first name(s).

    - last\_name: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by last name(s).

    - created\_by: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by user ID(s) to retrieve the customers they created.

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the customer's creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the customer's update date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the customer's deletion date.

  - $or: ((\[BaseCustomerFilters]\(../../../../../types/interfaces/types.BaseCustomerFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseCustomerFilters]\(../../../../../types/interfaces/types.BaseCustomerFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[BaseCustomerFilters]\(../../../../../types/interfaces/types.BaseCustomerFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseCustomerFilters]\(../../../../../types/interfaces/types.BaseCustomerFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[BaseCustomerFilters]\(../../../../../types/interfaces/types.BaseCustomerFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseCustomerFilters]\(../../../../../types/interfaces/types.BaseCustomerFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`) Query or keywords to apply on the customer's searchable fields.

    - id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by customer ID(s).

    - email: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by email(s).

    - company\_name: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by company name(s).

    - first\_name: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by first name(s).

    - last\_name: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by last name(s).

    - created\_by: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by user ID(s) to retrieve the customers they created.

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the customer's creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the customer's update date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the customer's deletion date.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - groups: (\`string\` \\| \`string\`\[] \\| \[CustomerGroupInCustomerFilters]\(../../../../../types/interfaces/types.CustomerGroupInCustomerFilters/page.mdx)) Apply customer group filters to retrieve their customers.

    - id: (\`string\` \\| \`string\`\[]) Filter by customer group ID(s).

    - name: (\`string\` \\| \`string\`\[]) Filter by name(s).

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the group's creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the group's update date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the group's deletion date.

  - has\_account: (\`boolean\`) Filter by whether the customer is registered.

  - q: (\`string\`) Query or keywords to apply on the customer's searchable fields.

  - id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter by customer ID(s).

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

  - email: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by email(s).

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

  - company\_name: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by company name(s).

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

  - first\_name: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by first name(s).

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

  - last\_name: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by last name(s).

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

  - created\_by: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by user ID(s) to retrieve the customers they created.

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

  - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the customer's creation date.

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

  - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the customer's update date.

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

  - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the customer's deletion date.

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

- Promise: (Promise\&#60;\[AdminCustomerListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminCustomerListResponse/page.mdx)\&#62;) The paginated list of customers.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## retrieve

This method retrieves a customer by its ID. It sends a request to the
[Get Customer](https://docs.medusajs.com/api/admin#customers_getcustomersid)
API route.

### Example

To retrieve a customer by its ID:

```ts
sdk.admin.customer.retrieve("cus_123")
.then(({ customer }) => {
  console.log(customer)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.customer.retrieve("cus_123", {
  fields: "id,*groups"
})
.then(({ customer }) => {
  console.log(customer)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- id: (\`string\`) The customer's ID.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the customer.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminCustomerResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerResponse/page.mdx)\&#62;) The customer's details.

  - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The customer's details.

    - has\_account: (\`boolean\`) Whether the customer is a guest.

    - addresses: (\[AdminCustomerAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerAddress/page.mdx)\[]) The customer's addresses.

    - id: (\`string\`) The customer's ID.

    - email: (\`string\`) The customer's email.

    - default\_billing\_address\_id: (\`null\` \\| \`string\`) The ID of the customer's default billing address.

    - default\_shipping\_address\_id: (\`null\` \\| \`string\`) The ID of the customer's default shipping address.

    - company\_name: (\`null\` \\| \`string\`) The customer's company name.

    - first\_name: (\`null\` \\| \`string\`) The customer's first name.

    - last\_name: (\`null\` \\| \`string\`) The customer's last name.

    - groups: (\[AdminCustomerGroup]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerGroup/page.mdx)\[]) The groups the customer is in.

    - phone: (\`null\` \\| \`string\`) The customer's phone.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

    - created\_by: (\`null\` \\| \`string\`) The ID of the user that created the customer.

    - deleted\_at: (\`null\` \\| \`string\` \\| \`Date\`) The date the customer was deleted.

    - created\_at: (\`string\` \\| \`Date\`) The date the customer was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the customer was updated.

***

## delete

This method deletes a customer by its ID. It sends a request to the
[Delete Customer](https://docs.medusajs.com/api/admin#customers_deletecustomersid)
API route.

### Example

```ts
sdk.admin.customer.delete("cus_123")
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- id: (\`string\`) The customer's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminCustomerDeleteResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminCustomerDeleteResponse/page.mdx)\&#62;) The deletion's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (TObject) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.

***

## batchCustomerGroups

This method manages customer groups for a customer.
It sends a request to the [Manage Customers](https://docs.medusajs.com/api/admin#customers_postcustomersidcustomergroups)
API route.

### Example

```ts
sdk.admin.customer.batchCustomerGroups("cus_123", {
  add: ["cusgroup_123"],
  remove: ["cusgroup_321"]
})
.then(({ customer }) => {
  console.log(customer)
})
```

### Parameters

- id: (\`string\`) The customer's ID.
- body: (\[AdminBatchLink]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminBatchLink/page.mdx)) The groups to add customer to or remove customer from.

  - add: (\`string\`\[]) The IDs of the items to create an association to.

  - remove: (\`string\`\[]) The IDs of the items to remove the association from.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminCustomerResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerResponse/page.mdx)\&#62;) The customers details.

  - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The customer's details.

    - has\_account: (\`boolean\`) Whether the customer is a guest.

    - addresses: (\[AdminCustomerAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerAddress/page.mdx)\[]) The customer's addresses.

    - id: (\`string\`) The customer's ID.

    - email: (\`string\`) The customer's email.

    - default\_billing\_address\_id: (\`null\` \\| \`string\`) The ID of the customer's default billing address.

    - default\_shipping\_address\_id: (\`null\` \\| \`string\`) The ID of the customer's default shipping address.

    - company\_name: (\`null\` \\| \`string\`) The customer's company name.

    - first\_name: (\`null\` \\| \`string\`) The customer's first name.

    - last\_name: (\`null\` \\| \`string\`) The customer's last name.

    - groups: (\[AdminCustomerGroup]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerGroup/page.mdx)\[]) The groups the customer is in.

    - phone: (\`null\` \\| \`string\`) The customer's phone.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

    - created\_by: (\`null\` \\| \`string\`) The ID of the user that created the customer.

    - deleted\_at: (\`null\` \\| \`string\` \\| \`Date\`) The date the customer was deleted.

    - created\_at: (\`string\` \\| \`Date\`) The date the customer was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the customer was updated.

***

## createAddress

This method creates a customer address. It sends a request to the
[Create Customer Address](https://docs.medusajs.com/api/admin#customers_postcustomersidaddresses)
API route.

### Example

```ts
sdk.admin.customer.createAddress("cus_123", {
  address_1: "123 Main St",
  city: "Anytown",
  country_code: "US",
  postal_code: "12345"
})
.then(({ customer }) => {
  console.log(customer)
})
```

### Parameters

- id: (\`string\`) The customer's ID.
- body: (\[AdminCreateCustomerAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateCustomerAddress/page.mdx)) The customer address's details.

  - first\_name: (\`string\`) The address's first name.

  - last\_name: (\`string\`) The address's last name.

  - phone: (\`string\`) The address's phone.

  - company: (\`string\`) The address's company.

  - address\_1: (\`string\`) The address's first line.

  - address\_2: (\`string\`) The address's second line.

  - city: (\`string\`) The address's city.

  - country\_code: (\`string\`) The address's country code.

  - province: (\`string\`) The address's lower-case \[ISO 3166-2]\(https://en.wikipedia.org/wiki/ISO\\\_3166-2) province.

  - postal\_code: (\`string\`) The address's postal code.

  - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

  - address\_name: (\`string\`) The address's name.

  - is\_default\_shipping: (\`boolean\`) Whether the address is used by default for shipping.

  - is\_default\_billing: (\`boolean\`) Whether the address is used by default for billing.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminCustomerResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerResponse/page.mdx)\&#62;) The customer address's details.

  - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The customer's details.

    - has\_account: (\`boolean\`) Whether the customer is a guest.

    - addresses: (\[AdminCustomerAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerAddress/page.mdx)\[]) The customer's addresses.

    - id: (\`string\`) The customer's ID.

    - email: (\`string\`) The customer's email.

    - default\_billing\_address\_id: (\`null\` \\| \`string\`) The ID of the customer's default billing address.

    - default\_shipping\_address\_id: (\`null\` \\| \`string\`) The ID of the customer's default shipping address.

    - company\_name: (\`null\` \\| \`string\`) The customer's company name.

    - first\_name: (\`null\` \\| \`string\`) The customer's first name.

    - last\_name: (\`null\` \\| \`string\`) The customer's last name.

    - groups: (\[AdminCustomerGroup]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerGroup/page.mdx)\[]) The groups the customer is in.

    - phone: (\`null\` \\| \`string\`) The customer's phone.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

    - created\_by: (\`null\` \\| \`string\`) The ID of the user that created the customer.

    - deleted\_at: (\`null\` \\| \`string\` \\| \`Date\`) The date the customer was deleted.

    - created\_at: (\`string\` \\| \`Date\`) The date the customer was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the customer was updated.

***

## updateAddress

This method updates a customer address. It sends a request to the
[Update Customer Address](https://docs.medusajs.com/api/admin#customers_postcustomersidaddressesaddressid)
API route.

### Example

```ts
sdk.admin.customer.updateAddress("cus_123", "cus_addr_123", {
  address_1: "123 Main St",
  city: "Anytown",
  country_code: "US",
  postal_code: "12345"
})
.then(({ customer }) => {
  console.log(customer)
})
```

### Parameters

- id: (\`string\`) The customer's ID.
- addressId: (\`string\`) The customer address's ID.
- body: (\[AdminUpdateCustomerAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateCustomerAddress/page.mdx)) The customer address's details.

  - first\_name: (\`string\`) The address's first name.

  - last\_name: (\`string\`) The address's last name.

  - phone: (\`string\`) The address's phone.

  - company: (\`string\`) The address's company.

  - address\_1: (\`string\`) The address's first line.

  - address\_2: (\`string\`) The address's second line.

  - city: (\`string\`) The address's city.

  - country\_code: (\`string\`) The address's country code.

  - province: (\`string\`) The address's lower-case \[ISO 3166-2]\(https://en.wikipedia.org/wiki/ISO\\\_3166-2) province.

  - postal\_code: (\`string\`) The address's postal code.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - address\_name: (\`string\`) The address's name.

  - is\_default\_shipping: (\`boolean\`) Whether the address is used by default for shipping.

  - is\_default\_billing: (\`boolean\`) Whether the address is used by default for billing.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminCustomerResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerResponse/page.mdx)\&#62;) The customer address's details.

  - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The customer's details.

    - has\_account: (\`boolean\`) Whether the customer is a guest.

    - addresses: (\[AdminCustomerAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerAddress/page.mdx)\[]) The customer's addresses.

    - id: (\`string\`) The customer's ID.

    - email: (\`string\`) The customer's email.

    - default\_billing\_address\_id: (\`null\` \\| \`string\`) The ID of the customer's default billing address.

    - default\_shipping\_address\_id: (\`null\` \\| \`string\`) The ID of the customer's default shipping address.

    - company\_name: (\`null\` \\| \`string\`) The customer's company name.

    - first\_name: (\`null\` \\| \`string\`) The customer's first name.

    - last\_name: (\`null\` \\| \`string\`) The customer's last name.

    - groups: (\[AdminCustomerGroup]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerGroup/page.mdx)\[]) The groups the customer is in.

    - phone: (\`null\` \\| \`string\`) The customer's phone.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

    - created\_by: (\`null\` \\| \`string\`) The ID of the user that created the customer.

    - deleted\_at: (\`null\` \\| \`string\` \\| \`Date\`) The date the customer was deleted.

    - created\_at: (\`string\` \\| \`Date\`) The date the customer was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the customer was updated.

***

## deleteAddress

This method deletes a customer address. It sends a request to the
[Delete Customer Address](https://docs.medusajs.com/api/admin#customers_deletecustomersidaddressesaddressid)
API route.

### Example

```ts
sdk.admin.customer.deleteAddress("cus_123", "cus_addr_123")
.then(({ customer }) => {
  console.log(customer)
})
```

### Parameters

- id: (\`string\`) The customer's ID.
- addressId: (\`string\`) The customer address's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminCustomerResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerResponse/page.mdx)\&#62;) The customer address's details.

  - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The customer's details.

    - has\_account: (\`boolean\`) Whether the customer is a guest.

    - addresses: (\[AdminCustomerAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerAddress/page.mdx)\[]) The customer's addresses.

    - id: (\`string\`) The customer's ID.

    - email: (\`string\`) The customer's email.

    - default\_billing\_address\_id: (\`null\` \\| \`string\`) The ID of the customer's default billing address.

    - default\_shipping\_address\_id: (\`null\` \\| \`string\`) The ID of the customer's default shipping address.

    - company\_name: (\`null\` \\| \`string\`) The customer's company name.

    - first\_name: (\`null\` \\| \`string\`) The customer's first name.

    - last\_name: (\`null\` \\| \`string\`) The customer's last name.

    - groups: (\[AdminCustomerGroup]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerGroup/page.mdx)\[]) The groups the customer is in.

    - phone: (\`null\` \\| \`string\`) The customer's phone.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

    - created\_by: (\`null\` \\| \`string\`) The ID of the user that created the customer.

    - deleted\_at: (\`null\` \\| \`string\` \\| \`Date\`) The date the customer was deleted.

    - created\_at: (\`string\` \\| \`Date\`) The date the customer was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the customer was updated.

***

## retrieveAddress

This method retrieves a customer address by its ID. It sends a request to the
[Get Customer Address](https://docs.medusajs.com/api/admin#customers_getcustomersidaddressesaddressid)
API route.

### Example

```ts
sdk.admin.customer.retrieveAddress("cus_123", "cus_addr_123")
.then(({ customer }) => {
  console.log(customer)
})
```

### Parameters

- id: (\`string\`) The customer's ID.
- addressId: (\`string\`) The customer address's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminCustomerResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerResponse/page.mdx)\&#62;) The customer address's details.

  - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The customer's details.

    - has\_account: (\`boolean\`) Whether the customer is a guest.

    - addresses: (\[AdminCustomerAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerAddress/page.mdx)\[]) The customer's addresses.

    - id: (\`string\`) The customer's ID.

    - email: (\`string\`) The customer's email.

    - default\_billing\_address\_id: (\`null\` \\| \`string\`) The ID of the customer's default billing address.

    - default\_shipping\_address\_id: (\`null\` \\| \`string\`) The ID of the customer's default shipping address.

    - company\_name: (\`null\` \\| \`string\`) The customer's company name.

    - first\_name: (\`null\` \\| \`string\`) The customer's first name.

    - last\_name: (\`null\` \\| \`string\`) The customer's last name.

    - groups: (\[AdminCustomerGroup]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerGroup/page.mdx)\[]) The groups the customer is in.

    - phone: (\`null\` \\| \`string\`) The customer's phone.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

    - created\_by: (\`null\` \\| \`string\`) The ID of the user that created the customer.

    - deleted\_at: (\`null\` \\| \`string\` \\| \`Date\`) The date the customer was deleted.

    - created\_at: (\`string\` \\| \`Date\`) The date the customer was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the customer was updated.

***

## listAddresses

This method retrieves a list of customer addresses. It sends a request to the
[List Customer Addresses](https://docs.medusajs.com/api/admin#customers_getcustomersidaddresses)
API route.

### Example

```ts
sdk.admin.customer.listAddresses("cus_123")
.then(({ addresses }) => {
  console.log(addresses)
})
```

### Parameters

- id: (\`string\`) The customer's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminCustomerResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerResponse/page.mdx)\&#62;) The list of customer addresses.

  - customer: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)) The customer's details.

    - has\_account: (\`boolean\`) Whether the customer is a guest.

    - addresses: (\[AdminCustomerAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerAddress/page.mdx)\[]) The customer's addresses.

    - id: (\`string\`) The customer's ID.

    - email: (\`string\`) The customer's email.

    - default\_billing\_address\_id: (\`null\` \\| \`string\`) The ID of the customer's default billing address.

    - default\_shipping\_address\_id: (\`null\` \\| \`string\`) The ID of the customer's default shipping address.

    - company\_name: (\`null\` \\| \`string\`) The customer's company name.

    - first\_name: (\`null\` \\| \`string\`) The customer's first name.

    - last\_name: (\`null\` \\| \`string\`) The customer's last name.

    - groups: (\[AdminCustomerGroup]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerGroup/page.mdx)\[]) The groups the customer is in.

    - phone: (\`null\` \\| \`string\`) The customer's phone.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

    - created\_by: (\`null\` \\| \`string\`) The ID of the user that created the customer.

    - deleted\_at: (\`null\` \\| \`string\` \\| \`Date\`) The date the customer was deleted.

    - created\_at: (\`string\` \\| \`Date\`) The date the customer was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the customer was updated.
