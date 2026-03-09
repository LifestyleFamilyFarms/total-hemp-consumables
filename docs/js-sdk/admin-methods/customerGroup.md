# customerGroup - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.customerGroup` set of methods used to send requests to Medusa's Admin API routes.

## retrieve

This method retrieves a customer group by its ID. It sends a request to the
[Get Customer Group](https://docs.medusajs.com/api/admin#customer-groups_getcustomergroupsid) API route.

### Example

To retrieve a customer group by its ID:

```ts
sdk.admin.customerGroup.retrieve("cusgroup_123")
.then(({ customer_group }) => {
  console.log(customer_group)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.customerGroup.retrieve("cusgroup_123", {
  fields: "id,*customer"
})
.then(({ customer_group }) => {
  console.log(customer_group)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- id: (\`string\`) The customer group's ID.
- query: (\[AdminGetCustomerGroupParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetCustomerGroupParams/page.mdx)) Configure the fields to retrieve in the customer group.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminCustomerGroupResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerGroupResponse/page.mdx)\&#62;) The group's details.

  - customer\_group: (\[AdminCustomerGroup]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerGroup/page.mdx)) The customer group's details.

    - customers: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)\[]) The customers in the group.

    - id: (\`string\`) The customer group's ID.

    - name: (\`null\` \\| \`string\`) The customer group's name.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - created\_at: (\`string\`) The date the customer group was created.

    - updated\_at: (\`string\`) The date the customer group was updated.

***

## list

This method retrieves a paginated list of customer groups. It sends a request to the
[List Customer Groups](https://docs.medusajs.com/api/admin#customer-groups_getcustomergroups)
API route.

### Example

To retrieve the list of customer groups:

```ts
sdk.admin.customerGroup.list()
.then(({ customer_groups, count, limit, offset }) => {
  console.log(customer_groups)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.customerGroup.list({
  limit: 10,
  offset: 10
})
.then(({ customer_groups, count, limit, offset }) => {
  console.log(customer_groups)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each customer group:

```ts
sdk.admin.customerGroup.list({
  fields: "id,*customer"
})
.then(({ customer_groups, count, limit, offset }) => {
  console.log(customer_groups)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- query: (\[AdminGetCustomerGroupsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetCustomerGroupsParams/page.mdx)) Filters and pagination configurations.

  - $and: ((\[AdminGetCustomerGroupsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetCustomerGroupsParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetCustomerGroupsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetCustomerGroupsParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[AdminGetCustomerGroupsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetCustomerGroupsParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetCustomerGroupsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetCustomerGroupsParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminGetCustomerGroupsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetCustomerGroupsParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetCustomerGroupsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetCustomerGroupsParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`) Query or keywords to search the customer group's searchable fields.

    - id: (\`string\` \\| \`string\`\[]) Filter by customer group ID(s).

    - name: (\`string\` \\| \`string\`\[]) Filter by name(s).

    - customers: (\`string\` \\| \`string\`\[] \\| \[AdminCustomerInGroupFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerInGroupFilters/page.mdx)) Filter by customers to retrieve their associated groups.

    - created\_by: (\`string\` \\| \`string\`\[]) Filter by IDs of users to retrieve the groups they created.

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the group's creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the group's update date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the group's deletion date.

  - $or: ((\[AdminGetCustomerGroupsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetCustomerGroupsParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetCustomerGroupsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetCustomerGroupsParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[AdminGetCustomerGroupsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetCustomerGroupsParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetCustomerGroupsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetCustomerGroupsParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminGetCustomerGroupsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetCustomerGroupsParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminGetCustomerGroupsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetCustomerGroupsParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`) Query or keywords to search the customer group's searchable fields.

    - id: (\`string\` \\| \`string\`\[]) Filter by customer group ID(s).

    - name: (\`string\` \\| \`string\`\[]) Filter by name(s).

    - customers: (\`string\` \\| \`string\`\[] \\| \[AdminCustomerInGroupFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerInGroupFilters/page.mdx)) Filter by customers to retrieve their associated groups.

    - created\_by: (\`string\` \\| \`string\`\[]) Filter by IDs of users to retrieve the groups they created.

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the group's creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the group's update date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the group's deletion date.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - q: (\`string\`) Query or keywords to search the customer group's searchable fields.

  - id: (\`string\` \\| \`string\`\[]) Filter by customer group ID(s).

  - name: (\`string\` \\| \`string\`\[]) Filter by name(s).

  - customers: (\`string\` \\| \`string\`\[] \\| \[AdminCustomerInGroupFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerInGroupFilters/page.mdx)) Filter by customers to retrieve their associated groups.

    - id: (\`string\` \\| \`string\`\[]) Filter by customer ID(s).

    - email: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by email(s).

    - default\_billing\_address\_id: (\`string\` \\| \`string\`\[]) Filter by IDs of default billing addresses to retrieve&#x20;
      their associated customers.

    - default\_shipping\_address\_id: (\`string\` \\| \`string\`\[]) Filter by IDs of default shipping addresses to retrieve&#x20;
      their associated customers.

    - company\_name: (\`string\` \\| \`string\`\[]) Filter by company name(s).

    - first\_name: (\`string\` \\| \`string\`\[]) Filter by first name(s).

    - last\_name: (\`string\` \\| \`string\`\[]) Filter by last name(s).

    - created\_by: (\`string\` \\| \`string\`\[]) Filter by user IDs to retrieve the customers they created.

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the customer's creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the customer's update date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the customer's deletion date.

  - created\_by: (\`string\` \\| \`string\`\[]) Filter by IDs of users to retrieve the groups they created.

  - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the group's creation date.

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

  - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the group's update date.

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

  - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the group's deletion date.

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

- Promise: (Promise\&#60;\[AdminCustomerGroupListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminCustomerGroupListResponse/page.mdx)\&#62;) The paginated list of customer groups.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## create

This method creates a customer group. It sends a request to the
[Create Customer Group](https://docs.medusajs.com/api/admin#customer-groups_postcustomergroups)
API route.

### Example

```ts
sdk.admin.customerGroup.create({
  name: "VIP"
})
.then(({ customer_group }) => {
  console.log(customer_group)
})
```

### Parameters

- body: (\[AdminCreateCustomerGroup]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateCustomerGroup/page.mdx)) The customer group's details.

  - name: (\`string\`) The customer group's name.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[AdminGetCustomerGroupParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetCustomerGroupParams/page.mdx)) Configure the fields to retrieve in the customer group.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminCustomerGroupResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerGroupResponse/page.mdx)\&#62;) The customer group's details.

  - customer\_group: (\[AdminCustomerGroup]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerGroup/page.mdx)) The customer group's details.

    - customers: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)\[]) The customers in the group.

    - id: (\`string\`) The customer group's ID.

    - name: (\`null\` \\| \`string\`) The customer group's name.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - created\_at: (\`string\`) The date the customer group was created.

    - updated\_at: (\`string\`) The date the customer group was updated.

***

## update

This method updates a customer group's details. It sends a request to the
[Update Customer](https://docs.medusajs.com/api/admin#customer-groups_postcustomergroupsid)
API route.

### Example

```ts
sdk.admin.customerGroup.update("cusgroup_123", {
  name: "VIP"
})
.then(({ customer_group }) => {
  console.log(customer_group)
})
```

### Parameters

- id: (\`string\`) The customer group's ID.
- body: (\[AdminUpdateCustomerGroup]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateCustomerGroup/page.mdx)) The details to update in the group.

  - name: (\`string\`) The customer group's name.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[AdminGetCustomerGroupParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetCustomerGroupParams/page.mdx)) Configure the fields to retrieve in the customer group.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminCustomerGroupResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerGroupResponse/page.mdx)\&#62;) The customer group's details.

  - customer\_group: (\[AdminCustomerGroup]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerGroup/page.mdx)) The customer group's details.

    - customers: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)\[]) The customers in the group.

    - id: (\`string\`) The customer group's ID.

    - name: (\`null\` \\| \`string\`) The customer group's name.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - created\_at: (\`string\`) The date the customer group was created.

    - updated\_at: (\`string\`) The date the customer group was updated.

***

## delete

This method deletes a customer group. This method sends a request to the
[Delete Customer Group](https://docs.medusajs.com/api/admin#customer-groups_deletecustomergroupsid)
API route.

### Example

```ts
sdk.admin.customerGroup.delete("cusgroup_123")
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- id: (\`string\`) The customer group's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminCustomerGroupDeleteResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminCustomerGroupDeleteResponse/page.mdx)\&#62;) The deletion's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (TObject) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.

***

## batchCustomers

This method manages customers of a group to add or remove them from the group.
It sends a request to the [Manage Customers](https://docs.medusajs.com/api/admin#customer-groups_postcustomergroupsidcustomers)
API route.

### Example

```ts
sdk.admin.customerGroup.batchCustomers("cusgroup_123", {
  add: ["cus_123"],
  remove: ["cus_321"]
})
.then(({ customer_group }) => {
  console.log(customer_group)
})
```

### Parameters

- id: (\`string\`) The group's ID.
- body: (\[AdminBatchLink]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminBatchLink/page.mdx)) The customers to add or remove from the group.

  - add: (\`string\`\[]) The IDs of the items to create an association to.

  - remove: (\`string\`\[]) The IDs of the items to remove the association from.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminCustomerGroupResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerGroupResponse/page.mdx)\&#62;) The customer group's details.

  - customer\_group: (\[AdminCustomerGroup]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomerGroup/page.mdx)) The customer group's details.

    - customers: (\[AdminCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCustomer/page.mdx)\[]) The customers in the group.

    - id: (\`string\`) The customer group's ID.

    - name: (\`null\` \\| \`string\`) The customer group's name.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - created\_at: (\`string\`) The date the customer group was created.

    - updated\_at: (\`string\`) The date the customer group was updated.
