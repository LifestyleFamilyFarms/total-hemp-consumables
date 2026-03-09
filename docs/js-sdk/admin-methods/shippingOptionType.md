# shippingOptionType - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.shippingOptionType` set of methods used to send requests to Medusa's Admin API routes.

## create

This method creates a shipping option type. It sends a request to the
[Create Shipping Option Type](https://docs.medusajs.com/api/admin#shipping-option-types_postshippingoptiontypes)
API route.

### Example

```ts
sdk.admin.shippingOptionType.create({
  label: "Standard",
  code: "standard",
  description: "Ship in 2-3 days."
})
.then(({ shipping_option_type }) => {
  console.log(shipping_option_type)
})
```

### Parameters

- body: (\[AdminCreateShippingOptionType]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateShippingOptionType/page.mdx)) The shipping option type's details.

  - label: (\`string\`) The label of the shipping option type.

  - code: (\`string\`) The code of the shipping option type.

  - description: (\`string\`) The description of the shipping option type.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the shipping option type.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminShippingOptionTypeResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOptionTypeResponse/page.mdx)\&#62;) The shipping option type's details.

  - shipping\_option\_type: (\[AdminShippingOptionType]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOptionType/page.mdx)) The shipping option type's details.

    - id: (\`string\`) The ID of the shipping option type.

    - label: (\`string\`) The label of the shipping option type.

    - description: (\`string\`) The description of the shipping option type.

    - code: (\`string\`) The code of the shipping option type.

    - shipping\_option\_id: (\`string\`) The ID of the shipping option that this type is created for.

    - created\_at: (\`string\`) The date when the shipping option type was created.

    - updated\_at: (\`string\`) The date when the shipping option type was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date when the shipping option type was deleted.

***

## update

This method updates a shipping option type. It sends a request to the
[Update Shipping Option Type](https://docs.medusajs.com/api/admin#shipping-option-types_postshippingoptiontypesid)
API route.

### Example

```ts
sdk.admin.shippingOptionType.update("sotype_123", {
  code: "express"
})
.then(({ shipping_option_type }) => {
  console.log(shipping_option_type)
})
```

### Parameters

- id: (\`string\`) The shipping option type's ID.
- body: (\[AdminUpdateShippingOptionType]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateShippingOptionType/page.mdx)) The data to update in the shipping option type.

  - label: (\`string\`) The label of the shipping option type.

  - description: (\`string\`) The description of the shipping option type.

  - code: (\`string\`) The code of the shipping option type.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the shipping option type.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminShippingOptionTypeResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOptionTypeResponse/page.mdx)\&#62;) The shipping option type's details.

  - shipping\_option\_type: (\[AdminShippingOptionType]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOptionType/page.mdx)) The shipping option type's details.

    - id: (\`string\`) The ID of the shipping option type.

    - label: (\`string\`) The label of the shipping option type.

    - description: (\`string\`) The description of the shipping option type.

    - code: (\`string\`) The code of the shipping option type.

    - shipping\_option\_id: (\`string\`) The ID of the shipping option that this type is created for.

    - created\_at: (\`string\`) The date when the shipping option type was created.

    - updated\_at: (\`string\`) The date when the shipping option type was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date when the shipping option type was deleted.

***

## list

This method retrieves a paginated list of shipping option types. It sends a request to the
[List Shipping Option Types](https://docs.medusajs.com/api/admin#shipping-option-types_getshippingoptiontypes) API route.

### Example

To retrieve the list of shipping option types:

```ts
sdk.admin.shippingOptionType.list()
.then(({ shipping_option_types, count, limit, offset }) => {
  console.log(shipping_option_types)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.shippingOptionType.list({
  limit: 10,
  offset: 10
})
.then(({ shipping_option_types, count, limit, offset }) => {
  console.log(shipping_option_types)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each shipping option type:

```ts
sdk.admin.shippingOptionType.list({
  fields: "id,*shippingOptions"
})
.then(({ shipping_option_types, count, limit, offset }) => {
  console.log(shipping_option_types)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- query: (\[AdminShippingOptionTypeListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOptionTypeListParams/page.mdx)) Filters and pagination configurations.

  - $and: ((\[AdminShippingOptionTypeListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOptionTypeListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminShippingOptionTypeListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOptionTypeListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[AdminShippingOptionTypeListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOptionTypeListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminShippingOptionTypeListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOptionTypeListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminShippingOptionTypeListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOptionTypeListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminShippingOptionTypeListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOptionTypeListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`) Query or keywords to apply filters on the type's searchable fields.

    - id: (\`string\` \\| \`string\`\[]) Filter by shipping option type ID(s).

    - label: (\`string\` \\| \`string\`\[]) Filter by label(s).

    - code: (\`string\` \\| \`string\`\[]) Filter by code(s).

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the update date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the deletion date.

  - $or: ((\[AdminShippingOptionTypeListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOptionTypeListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminShippingOptionTypeListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOptionTypeListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[AdminShippingOptionTypeListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOptionTypeListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminShippingOptionTypeListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOptionTypeListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminShippingOptionTypeListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOptionTypeListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminShippingOptionTypeListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOptionTypeListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`) Query or keywords to apply filters on the type's searchable fields.

    - id: (\`string\` \\| \`string\`\[]) Filter by shipping option type ID(s).

    - label: (\`string\` \\| \`string\`\[]) Filter by label(s).

    - code: (\`string\` \\| \`string\`\[]) Filter by code(s).

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the creation date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the update date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the deletion date.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - q: (\`string\`) Query or keywords to apply filters on the type's searchable fields.

  - id: (\`string\` \\| \`string\`\[]) Filter by shipping option type ID(s).

  - label: (\`string\` \\| \`string\`\[]) Filter by label(s).

  - code: (\`string\` \\| \`string\`\[]) Filter by code(s).

  - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the creation date.

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

  - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the update date.

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

  - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Apply filters on the deletion date.

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

- Promise: (Promise\&#60;\[AdminShippingOptionTypeListResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOptionTypeListResponse/page.mdx)\&#62;) The paginated list of shipping option types.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - shipping\_option\_types: (\[AdminShippingOptionType]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOptionType/page.mdx)\[]) The list of shipping option types.

    - id: (\`string\`) The ID of the shipping option type.

    - label: (\`string\`) The label of the shipping option type.

    - description: (\`string\`) The description of the shipping option type.

    - code: (\`string\`) The code of the shipping option type.

    - shipping\_option\_id: (\`string\`) The ID of the shipping option that this type is created for.

    - created\_at: (\`string\`) The date when the shipping option type was created.

    - updated\_at: (\`string\`) The date when the shipping option type was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date when the shipping option type was deleted.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## retrieve

This method retrieves a shipping option type by its ID. It sends a request to the
[Get Shipping Option Type](https://docs.medusajs.com/api/admin#shipping-option-types_getshippingoptiontypesid)
API route.

### Example

To retrieve a shipping option type by its ID:

```ts
sdk.admin.shippingOptionType.retrieve("sotype_123")
.then(({ shipping_option_type }) => {
  console.log(shipping_option_type)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.shippingOptionType.retrieve("sotype_123", {
  fields: "id,*shippingOptions"
})
.then(({ shipping_option_type }) => {
  console.log(shipping_option_type)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- id: (\`string\`) The shipping option type's ID.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the shipping option type.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminShippingOptionTypeResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOptionTypeResponse/page.mdx)\&#62;) The shipping option type's details.

  - shipping\_option\_type: (\[AdminShippingOptionType]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOptionType/page.mdx)) The shipping option type's details.

    - id: (\`string\`) The ID of the shipping option type.

    - label: (\`string\`) The label of the shipping option type.

    - description: (\`string\`) The description of the shipping option type.

    - code: (\`string\`) The code of the shipping option type.

    - shipping\_option\_id: (\`string\`) The ID of the shipping option that this type is created for.

    - created\_at: (\`string\`) The date when the shipping option type was created.

    - updated\_at: (\`string\`) The date when the shipping option type was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date when the shipping option type was deleted.

***

## delete

This method deletes a shipping option type. It sends a request to the
[Delete Shipping Option Type](https://docs.medusajs.com/api/admin#shipping-option-types_deleteshippingoptiontypesid)
API route.

### Example

```ts
sdk.admin.shippingOptionType.delete("sotype_123")
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- id: (\`string\`) The shipping option type's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminShippingOptionTypeDeleteResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOptionTypeDeleteResponse/page.mdx)\&#62;) The shipping option type's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (\`"shipping\_option\_type"\`) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.
