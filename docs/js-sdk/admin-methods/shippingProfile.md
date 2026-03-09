# shippingProfile - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.shippingProfile` set of methods used to send requests to Medusa's Admin API routes.

## create

This method creates a new shipping profile. It sends a request to the
[Create Shipping Profile](https://docs.medusajs.com/api/admin#shipping-profiles_postshippingprofiles)
API route.

### Example

```ts
sdk.admin.shippingProfile.create({
  name: "Default Shipping Profile",
})
.then(({ shipping_profile }) => {
  console.log(shipping_profile)
})
```

### Parameters

- body: (\[AdminCreateShippingProfile]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateShippingProfile/page.mdx)) The details of the shipping profile to create.

  - name: (\`string\`) The name of the shipping profile.

  - type: (\`string\`) The type of the shipping profile.

  - metadata: (\`Record\<string, unknown>\`) Custom key-value pairs that can be added to the shipping profile.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the shipping profile.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminShippingProfileResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingProfileResponse/page.mdx)\&#62;) The shipping profile's details.

  - shipping\_profile: (\[AdminShippingProfile]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingProfile/page.mdx)) The shipping profile's details.

    - id: (\`string\`) The ID of the shipping profile.

    - name: (\`string\`) The name of the shipping profile.

    - type: (\`string\`) The type of the shipping profile.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Custom key-value pairs that can be added to the shipping profile.

    - created\_at: (\`string\`) The date when the shipping profile was created.

    - updated\_at: (\`string\`) The date when the shipping profile was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date when the shipping profile was deleted.

***

## update

This method updates a shipping profile. It sends a request to the
[Update Shipping Profile](https://docs.medusajs.com/api/admin#shipping-profiles_postshippingprofilesid)
API route.

### Example

```ts
sdk.admin.shippingProfile.update("sp_123", {
  name: "Updated Shipping Profile",
})
.then(({ shipping_profile }) => {
  console.log(shipping_profile)
})
```

### Parameters

- id: (\`string\`) The ID of the shipping profile to update.
- body: (\[AdminUpdateShippingProfile]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateShippingProfile/page.mdx)) The details of the shipping profile to update.

  - name: (\`string\`) The name of the shipping profile.

  - type: (\`string\`) The type of the shipping profile.

  - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Custom key-value pairs that can be added to the shipping profile.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the shipping profile.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminShippingProfileResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingProfileResponse/page.mdx)\&#62;) The shipping profile's details.

  - shipping\_profile: (\[AdminShippingProfile]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingProfile/page.mdx)) The shipping profile's details.

    - id: (\`string\`) The ID of the shipping profile.

    - name: (\`string\`) The name of the shipping profile.

    - type: (\`string\`) The type of the shipping profile.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Custom key-value pairs that can be added to the shipping profile.

    - created\_at: (\`string\`) The date when the shipping profile was created.

    - updated\_at: (\`string\`) The date when the shipping profile was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date when the shipping profile was deleted.

***

## delete

This method deletes a shipping profile. It sends a request to the
[Delete Shipping Profile](https://docs.medusajs.com/api/admin#shipping-profiles_deleteshippingprofilesid)
API route.

### Example

```ts
sdk.admin.shippingProfile.delete("sp_123")
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- id: (\`string\`) The ID of the shipping profile to delete.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminShippingProfileDeleteResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingProfileDeleteResponse/page.mdx)\&#62;) The deletion's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (\`"shipping\_profile"\`) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.

***

## list

This method retrieves a list of shipping profiles. It sends a request to the
[List Shipping Profiles](https://docs.medusajs.com/api/admin#shipping-profiles_getshippingprofiles)
API route.

### Example

To retrieve the list of shipping profiles:

```ts
sdk.admin.shippingProfile.list()
.then(({ shipping_profiles, count, limit, offset }) => {
  console.log(shipping_profiles)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.shippingProfile.list({
  limit: 10,
  offset: 10
})
.then(({ shipping_profiles, count, limit, offset }) => {
  console.log(shipping_profiles)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each shipping profile:

```ts
sdk.admin.shippingProfile.list({
  fields: "id,name"
})
.then(({ shipping_profiles, count, limit, offset }) => {
  console.log(shipping_profiles)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/admin#select-fields-and-relations).

### Parameters

- query: (\[AdminShippingProfileListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingProfileListParams/page.mdx)) Filters and pagination configurations.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - id: (\`string\` \\| \`string\`\[]) Filter by shipping profile ID(s).

  - q: (\`string\`) Query or keywords to search the shipping profile's searchable fields.

  - type: (\`string\`) Filter by shipping profile type.

  - name: (\`string\`) Filter by shipping profile name.

  - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the shipping profile was created.

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

  - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the shipping profile was updated.

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

  - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the shipping profile was deleted.

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

  - $and: (\[AdminShippingProfileListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingProfileListParams/page.mdx)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - id: (\`string\` \\| \`string\`\[]) Filter by shipping profile ID(s).

    - q: (\`string\`) Query or keywords to search the shipping profile's searchable fields.

    - type: (\`string\`) Filter by shipping profile type.

    - name: (\`string\`) Filter by shipping profile name.

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the shipping profile was created.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the shipping profile was updated.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the shipping profile was deleted.

    - $and: (\[AdminShippingProfileListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingProfileListParams/page.mdx)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: (\[AdminShippingProfileListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingProfileListParams/page.mdx)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

  - $or: (\[AdminShippingProfileListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingProfileListParams/page.mdx)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - id: (\`string\` \\| \`string\`\[]) Filter by shipping profile ID(s).

    - q: (\`string\`) Query or keywords to search the shipping profile's searchable fields.

    - type: (\`string\`) Filter by shipping profile type.

    - name: (\`string\`) Filter by shipping profile name.

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the shipping profile was created.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the shipping profile was updated.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the date the shipping profile was deleted.

    - $and: (\[AdminShippingProfileListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingProfileListParams/page.mdx)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: (\[AdminShippingProfileListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingProfileListParams/page.mdx)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminShippingProfileListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminShippingProfileListResponse/page.mdx)\&#62;) The list of shipping profiles.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## retrieve

This method retrieves a shipping profile. It sends a request to the
[Get Shipping Profile](https://docs.medusajs.com/api/admin#shipping-profiles_getshippingprofilesid)
API route.

### Example

To retrieve a shipping profile by its ID:

```ts
sdk.admin.shippingProfile.retrieve("sp_123")
.then(({ shipping_profile }) => {
  console.log(shipping_profile)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.shippingProfile.retrieve("sp_123", {
  fields: "id,name"
})
.then(({ shipping_profile }) => {
  console.log(shipping_profile)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/admin#select-fields-and-relations).

### Parameters

- id: (\`string\`) The ID of the shipping profile to retrieve.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the shipping profile.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminShippingProfileResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingProfileResponse/page.mdx)\&#62;) The shipping profile's details.

  - shipping\_profile: (\[AdminShippingProfile]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingProfile/page.mdx)) The shipping profile's details.

    - id: (\`string\`) The ID of the shipping profile.

    - name: (\`string\`) The name of the shipping profile.

    - type: (\`string\`) The type of the shipping profile.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Custom key-value pairs that can be added to the shipping profile.

    - created\_at: (\`string\`) The date when the shipping profile was created.

    - updated\_at: (\`string\`) The date when the shipping profile was updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date when the shipping profile was deleted.
