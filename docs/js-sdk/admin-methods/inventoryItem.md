# inventoryItem - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.inventoryItem` set of methods used to send requests to Medusa's Admin API routes.

## create

This method creates an inventory item. It sends a request to the
[Create Inventory Item](https://docs.medusajs.com/api/admin#inventory-items_postinventoryitems)
API route.

### Example

```ts
sdk.admin.inventoryItem.create({
  sku: "SHIRT"
})
.then(({ inventory_item }) => {
  console.log(inventory_item)
})
```

### Parameters

- body: (\[AdminCreateInventoryItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateInventoryItem/page.mdx)) The inventory item's details.

  - sku: (\`string\`) The inventory item's SKU.

  - hs\_code: (\`string\`) The inventory item's HS code.

  - weight: (\`number\`) The inventory item's weight.

  - length: (\`number\`) The inventory item's length.

  - height: (\`number\`) The inventory item's height.

  - width: (\`number\`) The inventory item's width.

  - origin\_country: (\`string\`) The inventory item's origin country.

  - mid\_code: (\`string\`) The inventory item's MID code.

  - material: (\`string\`) The inventory item's material.

  - title: (\`string\`) The inventory item's title.

  - description: (\`string\`) The inventory item's description.

  - requires\_shipping: (\`boolean\`) Whether the inventory item requires shipping.

  - thumbnail: (\`string\`) The inventory item's thumbnail URL.

  - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the inventory item.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminInventoryItemResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInventoryItemResponse/page.mdx)\&#62;) The inventory item's details.

  - inventory\_item: (\[AdminInventoryItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInventoryItem/page.mdx)) The inventory item's details.

    - id: (\`string\`) The inventory item's ID.

    - requires\_shipping: (\`boolean\`) Whether the item requires shipping.

    - sku: (\`null\` \\| \`string\`) The inventory item's SKU.

    - origin\_country: (\`null\` \\| \`string\`) The inventory item's origin country.

    - hs\_code: (\`null\` \\| \`string\`) The inventory item's HS code.

    - mid\_code: (\`null\` \\| \`string\`) The inventory item's MID code.

    - material: (\`null\` \\| \`string\`) The inventory item's material.

    - weight: (\`null\` \\| \`number\`) The inventory item's weight.

    - length: (\`null\` \\| \`number\`) The inventory item's length.

    - height: (\`null\` \\| \`number\`) The inventory item's height.

    - width: (\`null\` \\| \`number\`) The inventory item's width.

    - title: (\`null\` \\| \`string\`) The inventory item's title.

    - description: (\`null\` \\| \`string\`) The inventory item's description.

    - thumbnail: (\`null\` \\| \`string\`) The inventory item's thumbnail URL.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - location\_levels: (\[AdminInventoryLevel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInventoryLevel/page.mdx)\[]) The item's associated inventory levels.

***

## update

This method updates an inventory level. It sends a request to the
[Update Inventory Item](https://docs.medusajs.com/api/admin#inventory-items_postinventoryitemsid)
API route.

### Example

```ts
sdk.admin.inventoryItem.update("iitem_123", {
  sku: "SHIRT"
})
.then(({ inventory_item }) => {
  console.log(inventory_item)
})
```

### Parameters

- id: (\`string\`) The inventory item's ID.
- body: (\[AdminUpdateInventoryItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateInventoryItem/page.mdx)) The data to update.

  - sku: (\`string\`) The inventory item's SKU.

  - hs\_code: (\`string\`) The inventory item's HS code.

  - weight: (\`number\`) The inventory item's weight.

  - length: (\`number\`) The inventory item's length.

  - height: (\`number\`) The inventory item's height.

  - width: (\`number\`) The inventory item's width.

  - origin\_country: (\`string\`) The inventory item's origin country.

  - mid\_code: (\`string\`) The inventory item's MID code.

  - material: (\`string\`) The inventory item's material.

  - title: (\`string\`) The inventory item's title.

  - description: (\`string\`) The inventory item's description.

  - requires\_shipping: (\`boolean\`) Whether the inventory item requires shipping.

  - thumbnail: (\`string\`) The inventory item's thumbnail URL.

  - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the inventory item.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminInventoryItemResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInventoryItemResponse/page.mdx)\&#62;) The inventory item's details.

  - inventory\_item: (\[AdminInventoryItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInventoryItem/page.mdx)) The inventory item's details.

    - id: (\`string\`) The inventory item's ID.

    - requires\_shipping: (\`boolean\`) Whether the item requires shipping.

    - sku: (\`null\` \\| \`string\`) The inventory item's SKU.

    - origin\_country: (\`null\` \\| \`string\`) The inventory item's origin country.

    - hs\_code: (\`null\` \\| \`string\`) The inventory item's HS code.

    - mid\_code: (\`null\` \\| \`string\`) The inventory item's MID code.

    - material: (\`null\` \\| \`string\`) The inventory item's material.

    - weight: (\`null\` \\| \`number\`) The inventory item's weight.

    - length: (\`null\` \\| \`number\`) The inventory item's length.

    - height: (\`null\` \\| \`number\`) The inventory item's height.

    - width: (\`null\` \\| \`number\`) The inventory item's width.

    - title: (\`null\` \\| \`string\`) The inventory item's title.

    - description: (\`null\` \\| \`string\`) The inventory item's description.

    - thumbnail: (\`null\` \\| \`string\`) The inventory item's thumbnail URL.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - location\_levels: (\[AdminInventoryLevel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInventoryLevel/page.mdx)\[]) The item's associated inventory levels.

***

## list

This method retrieves a paginated list of inventory items. It sends a request to the
[List Inventory Items](https://docs.medusajs.com/api/admin#inventory-items_getinventoryitems)
API route.

### Example

To retrieve the list of inventory items:

```ts
sdk.admin.inventoryItem.list()
.then(({ inventory_items, count, limit, offset }) => {
  console.log(inventory_items)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.inventoryItem.list({
  limit: 10,
  offset: 10
})
.then(({ inventory_items, count, limit, offset }) => {
  console.log(inventory_items)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each inventory item:

```ts
sdk.admin.inventoryItem.list({
  fields: "id,*location_levels"
})
.then(({ inventory_items, count, limit, offset }) => {
  console.log(inventory_items)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- query: (\[AdminInventoryItemsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInventoryItemsParams/page.mdx)) Filters and pagination configurations.

  - $and: ((\[AdminInventoryItemsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInventoryItemsParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminInventoryItemsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInventoryItemsParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[AdminInventoryItemsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInventoryItemsParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminInventoryItemsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInventoryItemsParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminInventoryItemsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInventoryItemsParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminInventoryItemsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInventoryItemsParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - id: (\`string\` \\| \`string\`\[]) Filter by inventory item ID(s).

    - q: (\`string\`) Query or keywords to search the inventory item's searchable fields.

    - sku: (\`string\` \\| \`string\`\[]) Filter by SKU(s).

    - origin\_country: (\`string\` \\| \`string\`\[]) Filter by origin countries.

    - mid\_code: (\`string\` \\| \`string\`\[]) Filter by MID code(s).

    - hs\_code: (\`string\` \\| \`string\`\[]) Filter by HS code(s).

    - material: (\`string\` \\| \`string\`\[]) Filter by material(s).

    - requires\_shipping: (\`boolean\`) Filter by whether the item requires shipping.

    - weight: (\`number\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;number\&#62;) Filter by weight(s).

    - length: (\`number\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;number\&#62;) Filter by length(s).

    - height: (\`number\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;number\&#62;) Filter by height(s).

    - width: (\`number\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;number\&#62;) Filter by width(s).

    - location\_levels: (\`Record\<"location\_id", string \\| string\[]>\`) Filter by stock location IDs to retrieve inventory items
      that have inventory levels associated with the locations.

  - $or: ((\[AdminInventoryItemsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInventoryItemsParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminInventoryItemsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInventoryItemsParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[AdminInventoryItemsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInventoryItemsParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminInventoryItemsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInventoryItemsParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminInventoryItemsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInventoryItemsParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminInventoryItemsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInventoryItemsParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - id: (\`string\` \\| \`string\`\[]) Filter by inventory item ID(s).

    - q: (\`string\`) Query or keywords to search the inventory item's searchable fields.

    - sku: (\`string\` \\| \`string\`\[]) Filter by SKU(s).

    - origin\_country: (\`string\` \\| \`string\`\[]) Filter by origin countries.

    - mid\_code: (\`string\` \\| \`string\`\[]) Filter by MID code(s).

    - hs\_code: (\`string\` \\| \`string\`\[]) Filter by HS code(s).

    - material: (\`string\` \\| \`string\`\[]) Filter by material(s).

    - requires\_shipping: (\`boolean\`) Filter by whether the item requires shipping.

    - weight: (\`number\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;number\&#62;) Filter by weight(s).

    - length: (\`number\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;number\&#62;) Filter by length(s).

    - height: (\`number\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;number\&#62;) Filter by height(s).

    - width: (\`number\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;number\&#62;) Filter by width(s).

    - location\_levels: (\`Record\<"location\_id", string \\| string\[]>\`) Filter by stock location IDs to retrieve inventory items
      that have inventory levels associated with the locations.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - id: (\`string\` \\| \`string\`\[]) Filter by inventory item ID(s).

  - q: (\`string\`) Query or keywords to search the inventory item's searchable fields.

  - sku: (\`string\` \\| \`string\`\[]) Filter by SKU(s).

  - origin\_country: (\`string\` \\| \`string\`\[]) Filter by origin countries.

  - mid\_code: (\`string\` \\| \`string\`\[]) Filter by MID code(s).

  - hs\_code: (\`string\` \\| \`string\`\[]) Filter by HS code(s).

  - material: (\`string\` \\| \`string\`\[]) Filter by material(s).

  - requires\_shipping: (\`boolean\`) Filter by whether the item requires shipping.

  - weight: (\`number\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;number\&#62;) Filter by weight(s).

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

  - length: (\`number\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;number\&#62;) Filter by length(s).

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

  - height: (\`number\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;number\&#62;) Filter by height(s).

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

  - width: (\`number\` \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;number\&#62;) Filter by width(s).

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

  - location\_levels: (\`Record\<"location\_id", string \\| string\[]>\`) Filter by stock location IDs to retrieve inventory items
    that have inventory levels associated with the locations.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminInventoryItemListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminInventoryItemListResponse/page.mdx)\&#62;) The paginated list of inventory items.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## retrieve

This method retrieves an inventory item by its ID. It sends a request to the
[Get Inventory Item](https://docs.medusajs.com/api/admin#inventory-items_getinventoryitemsid) API route.

### Example

To retrieve an inventory item by its ID:

```ts
sdk.admin.inventoryItem.retrieve("iitem_123")
.then(({ inventory_item }) => {
  console.log(inventory_item)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.inventoryItem.retrieve("iitem_123", {
  fields: "id,*location_levels"
})
.then(({ inventory_item }) => {
  console.log(inventory_item)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- id: (\`string\`) The inventory item's ID.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the inventory item.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminInventoryItemResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInventoryItemResponse/page.mdx)\&#62;) The inventory item's details.

  - inventory\_item: (\[AdminInventoryItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInventoryItem/page.mdx)) The inventory item's details.

    - id: (\`string\`) The inventory item's ID.

    - requires\_shipping: (\`boolean\`) Whether the item requires shipping.

    - sku: (\`null\` \\| \`string\`) The inventory item's SKU.

    - origin\_country: (\`null\` \\| \`string\`) The inventory item's origin country.

    - hs\_code: (\`null\` \\| \`string\`) The inventory item's HS code.

    - mid\_code: (\`null\` \\| \`string\`) The inventory item's MID code.

    - material: (\`null\` \\| \`string\`) The inventory item's material.

    - weight: (\`null\` \\| \`number\`) The inventory item's weight.

    - length: (\`null\` \\| \`number\`) The inventory item's length.

    - height: (\`null\` \\| \`number\`) The inventory item's height.

    - width: (\`null\` \\| \`number\`) The inventory item's width.

    - title: (\`null\` \\| \`string\`) The inventory item's title.

    - description: (\`null\` \\| \`string\`) The inventory item's description.

    - thumbnail: (\`null\` \\| \`string\`) The inventory item's thumbnail URL.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - location\_levels: (\[AdminInventoryLevel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInventoryLevel/page.mdx)\[]) The item's associated inventory levels.

***

## delete

This method deletes an inventory item. This sends a request to the
[Delete Inventory Item](https://docs.medusajs.com/api/admin#inventory-items_deleteinventoryitemsid)
API route.

### Example

```ts
sdk.admin.inventoryItem.delete("iitem_123")
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- id: (\`string\`) The inventory item's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminInventoryItemDeleteResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminInventoryItemDeleteResponse/page.mdx)\&#62;) The deletion's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (TObject) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.

***

## listLevels

This method retrieves a paginated list of inventory levels that belong to an inventory item.
It sends a request to the [List Inventory Items](https://docs.medusajs.com/api/admin#inventory-items_getinventoryitems)
API route.

### Example

To retrieve the list of inventory levels:

```ts
sdk.admin.inventoryItem.listLevels("iitem_123")
.then(({ inventory_levels, count, limit, offset }) => {
  console.log(inventory_levels)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.inventoryItem.listLevels("iitem_123", {
  limit: 10,
  offset: 10
})
.then(({ inventory_levels, count, limit, offset }) => {
  console.log(inventory_levels)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each inventory level:

```ts
sdk.admin.inventoryItem.listLevels("iitem_123", {
  fields: "id,*inventory_item"
})
.then(({ inventory_levels, count, limit, offset }) => {
  console.log(inventory_levels)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- id: (\`string\`) The inventory item's ID.
- query: (\[AdminInventoryLevelFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInventoryLevelFilters/page.mdx)) Filters and pagination configurations.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - location\_id: (\`string\` \\| \`string\`\[]) Filter by stock location IDs to retrieve their
    associated inventory levels.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminInventoryLevelListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminInventoryLevelListResponse/page.mdx)\&#62;) The paginated list of inventory levels.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## updateLevel

This method updates the inventory level of the specified inventory item and
stock location.

This method sends a request to the
[Update Inventory Level](https://docs.medusajs.com/api/admin#inventory-items_postinventoryitemsidlocationlevelslocation_id)
API route.

### Example

```ts
sdk.admin.inventoryItem.updateLevel(
  "iitem_123",
  "sloc_123",
  {
    stocked_quantity: 10
  }
)
.then(({ inventory_item }) => {
  console.log(inventory_item)
})
```

### Parameters

- id: (\`string\`) The inventory item's ID.
- locationId: (\`string\`) The stock location's ID.
- body: (\[AdminUpdateInventoryLevel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateInventoryLevel/page.mdx)) The details to update.

  - stocked\_quantity: (\`number\`) The associated inventory item's stocked quantity in the
    associated stock location.

  - incoming\_quantity: (\`number\`) The associated inventory item's incoming quantity in the
    associated stock location.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the inventory item.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminInventoryItemResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInventoryItemResponse/page.mdx)\&#62;) The inventory item's details.

  - inventory\_item: (\[AdminInventoryItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInventoryItem/page.mdx)) The inventory item's details.

    - id: (\`string\`) The inventory item's ID.

    - requires\_shipping: (\`boolean\`) Whether the item requires shipping.

    - sku: (\`null\` \\| \`string\`) The inventory item's SKU.

    - origin\_country: (\`null\` \\| \`string\`) The inventory item's origin country.

    - hs\_code: (\`null\` \\| \`string\`) The inventory item's HS code.

    - mid\_code: (\`null\` \\| \`string\`) The inventory item's MID code.

    - material: (\`null\` \\| \`string\`) The inventory item's material.

    - weight: (\`null\` \\| \`number\`) The inventory item's weight.

    - length: (\`null\` \\| \`number\`) The inventory item's length.

    - height: (\`null\` \\| \`number\`) The inventory item's height.

    - width: (\`null\` \\| \`number\`) The inventory item's width.

    - title: (\`null\` \\| \`string\`) The inventory item's title.

    - description: (\`null\` \\| \`string\`) The inventory item's description.

    - thumbnail: (\`null\` \\| \`string\`) The inventory item's thumbnail URL.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - location\_levels: (\[AdminInventoryLevel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminInventoryLevel/page.mdx)\[]) The item's associated inventory levels.

***

## deleteLevel

This method deletes an inventory level associated with an inventory item
and a stock location.

This method sends a request to the
[Remove Inventory Level](https://docs.medusajs.com/api/admin#inventory-items_deleteinventoryitemsidlocationlevelslocation_id)
API route.

### Example

```ts
sdk.admin.inventoryItem.deleteLevel(
  "iitem_123",
  "sloc_123",
)
.then(({ deleted, parent: inventoryItem }) => {
  console.log(deleted, inventoryItem)
})
```

### Parameters

- id: (\`string\`) The inventory item's ID.
- locationId: (\`string\`) The stock location's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminInventoryLevelDeleteResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminInventoryLevelDeleteResponse/page.mdx)\&#62;) The deletion's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (TObject) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.

  - parent: (TParent) The parent resource of the item that was deleted, if applicable.

***

## batchUpdateLevels

This method manages the inventory levels of an inventory item. It sends a request to the
[Manage Inventory Levels](https://docs.medusajs.com/api/admin#inventory-items_postinventoryitemsidlocationlevelsbatch)
API route.

### Example

```ts
sdk.admin.inventoryItem.batchUpdateLevels("iitem_123", {
  create: [{
    location_id: "sloc_123",
    stocked_quantity: 10
  }],
  delete: ["ilvl_123"]
})
.then(({ created, updated, deleted }) => {
  console.log(created, updated, deleted)
})
```

### Parameters

- id: (\`string\`) The inventory item's ID.
- body: (\[AdminBatchInventoryItemLocationLevels]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminBatchInventoryItemLocationLevels/page.mdx)) The inventory levels to create or delete.

  - update: (\[AdminBatchUpdateInventoryItemLocationLevels]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminBatchUpdateInventoryItemLocationLevels/page.mdx)\[]) A list of inventory levels to update.

    - location\_id: (\`string\`) The ID of the associated stock location.

    - stocked\_quantity: (\`number\`) The associated inventory item's stocked quantity in the
      associated stock location.

    - incoming\_quantity: (\`number\`) The associated inventory item's incoming quantity in the
      associated stock location.

    - id: (\`string\`) The ID of the inventory level to update.

  - create: (\[AdminBatchCreateInventoryItemLocationLevels]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminBatchCreateInventoryItemLocationLevels/page.mdx)\[]) A list of inventory levels to create.

    - location\_id: (\`string\`) The ID of the associated stock location.

    - stocked\_quantity: (\`number\`) The associated inventory item's stocked quantity in the
      associated stock location.

    - incoming\_quantity: (\`number\`) The associated inventory item's incoming quantity in the
      associated stock location.

  - delete: (\`string\`\[]) A list of location IDs to
    delete their associated inventory
    levels of the inventory item.

  - force: (\`boolean\`) Whether to force the deletion of the inventory levels,
    even if the the location has stocked quantity.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the inventory item.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminBatchInventoryItemLocationLevelsResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminBatchInventoryItemLocationLevelsResponse/page.mdx)\&#62;) The inventory item's details.

  - created: (\[InventoryLevel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.InventoryLevel/page.mdx)\[]) The created inventory levels.

    - id: (\`string\`) The inventory level's ID.

    - inventory\_item\_id: (\`string\`) The ID of the associated inventory item.

    - location\_id: (\`string\`) The ID of the associated stock location

    - stocked\_quantity: (\`number\`) The associated inventory item's stocked quantity in the
      associated stock location.

    - reserved\_quantity: (\`number\`) The associated inventory item's reserved quantity in the
      associated stock location.

    - available\_quantity: (\`number\`) The associated inventory item's available quantity in the
      associated stock location.

    - incoming\_quantity: (\`number\`) The associated inventory item's incoming quantity in the
      associated stock location.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - updated: (\[InventoryLevel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.InventoryLevel/page.mdx)\[]) The updated inventory levels.

    - id: (\`string\`) The inventory level's ID.

    - inventory\_item\_id: (\`string\`) The ID of the associated inventory item.

    - location\_id: (\`string\`) The ID of the associated stock location

    - stocked\_quantity: (\`number\`) The associated inventory item's stocked quantity in the
      associated stock location.

    - reserved\_quantity: (\`number\`) The associated inventory item's reserved quantity in the
      associated stock location.

    - available\_quantity: (\`number\`) The associated inventory item's available quantity in the
      associated stock location.

    - incoming\_quantity: (\`number\`) The associated inventory item's incoming quantity in the
      associated stock location.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - deleted: (\`string\`\[]) The IDs of the deleted inventory levels.

:::note\[Deprecated]

Use `batchInventoryItemLocationLevels` instead.

:::

***

## batchInventoryItemLocationLevels

This method manages the inventory levels of an inventory item. It sends a request to the
[Manage Inventory Levels](https://docs.medusajs.com/api/admin#inventory-items_postinventoryitemsidlocationlevelsbatch)
API route.

### Example

```ts
sdk.admin.inventoryItem.batchInventoryItemLocationLevels("iitem_123", {
  create: [{
    location_id: "sloc_123",
    stocked_quantity: 10
  }],
  delete: ["ilvl_123"]
})
.then(({ created, updated, deleted }) => {
  console.log(created, updated, deleted)
})
```

### Parameters

- id: (\`string\`) The inventory item's ID.
- body: (\[AdminBatchInventoryItemLocationLevels]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminBatchInventoryItemLocationLevels/page.mdx)) The inventory levels to create, update or delete, and an optional \`force\` flag.

  - update: (\[AdminBatchUpdateInventoryItemLocationLevels]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminBatchUpdateInventoryItemLocationLevels/page.mdx)\[]) A list of inventory levels to update.

    - location\_id: (\`string\`) The ID of the associated stock location.

    - stocked\_quantity: (\`number\`) The associated inventory item's stocked quantity in the
      associated stock location.

    - incoming\_quantity: (\`number\`) The associated inventory item's incoming quantity in the
      associated stock location.

    - id: (\`string\`) The ID of the inventory level to update.

  - create: (\[AdminBatchCreateInventoryItemLocationLevels]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminBatchCreateInventoryItemLocationLevels/page.mdx)\[]) A list of inventory levels to create.

    - location\_id: (\`string\`) The ID of the associated stock location.

    - stocked\_quantity: (\`number\`) The associated inventory item's stocked quantity in the
      associated stock location.

    - incoming\_quantity: (\`number\`) The associated inventory item's incoming quantity in the
      associated stock location.

  - delete: (\`string\`\[]) A list of location IDs to
    delete their associated inventory
    levels of the inventory item.

  - force: (\`boolean\`) Whether to force the deletion of the inventory levels,
    even if the the location has stocked quantity.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminBatchInventoryItemLocationLevelsResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminBatchInventoryItemLocationLevelsResponse/page.mdx)\&#62;) The inventory item's details.

  - created: (\[InventoryLevel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.InventoryLevel/page.mdx)\[]) The created inventory levels.

    - id: (\`string\`) The inventory level's ID.

    - inventory\_item\_id: (\`string\`) The ID of the associated inventory item.

    - location\_id: (\`string\`) The ID of the associated stock location

    - stocked\_quantity: (\`number\`) The associated inventory item's stocked quantity in the
      associated stock location.

    - reserved\_quantity: (\`number\`) The associated inventory item's reserved quantity in the
      associated stock location.

    - available\_quantity: (\`number\`) The associated inventory item's available quantity in the
      associated stock location.

    - incoming\_quantity: (\`number\`) The associated inventory item's incoming quantity in the
      associated stock location.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - updated: (\[InventoryLevel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.InventoryLevel/page.mdx)\[]) The updated inventory levels.

    - id: (\`string\`) The inventory level's ID.

    - inventory\_item\_id: (\`string\`) The ID of the associated inventory item.

    - location\_id: (\`string\`) The ID of the associated stock location

    - stocked\_quantity: (\`number\`) The associated inventory item's stocked quantity in the
      associated stock location.

    - reserved\_quantity: (\`number\`) The associated inventory item's reserved quantity in the
      associated stock location.

    - available\_quantity: (\`number\`) The associated inventory item's available quantity in the
      associated stock location.

    - incoming\_quantity: (\`number\`) The associated inventory item's incoming quantity in the
      associated stock location.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - deleted: (\`string\`\[]) The IDs of the deleted inventory levels.

***

## batchInventoryItemsLocationLevels

This method manages the inventory levels of multiple inventory items.

### Example

```ts
sdk.admin.inventoryItem.batchInventoryItemsLocationLevels({
  create: [{
    inventory_item_id: "iitem_123",
    location_id: "sloc_123",
    stocked_quantity: 10
  }],
  delete: ["ilvl_123"]
})
.then(({ created, updated, deleted }) => {
  console.log(created, updated, deleted)
})
```

### Parameters

- body: (\[AdminBatchInventoryItemsLocationLevels]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminBatchInventoryItemsLocationLevels/page.mdx)) The inventory levels to create, update or delete, and an optional \`force\` flag.

  - create: (\[AdminBatchCreateInventoryItemsLocationLevels]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminBatchCreateInventoryItemsLocationLevels/page.mdx)\[]) The inventory levels to create.

    - location\_id: (\`string\`) The ID of the associated stock location.

    - inventory\_item\_id: (\`string\`) The ID of the associated inventory item.

    - stocked\_quantity: (\`number\`) The associated inventory item's stocked quantity in the
      associated stock location.

    - incoming\_quantity: (\`number\`) The associated inventory item's incoming quantity in the
      associated stock location.

  - update: (\[AdminBatchUpdateInventoryItemsLocationLevels]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminBatchUpdateInventoryItemsLocationLevels/page.mdx)\[]) The inventory levels to update.

    - location\_id: (\`string\`) The ID of the associated stock location.

    - inventory\_item\_id: (\`string\`) The ID of the associated inventory item.

    - stocked\_quantity: (\`number\`) The associated inventory item's stocked quantity in the
      associated stock location.

    - incoming\_quantity: (\`number\`) The associated inventory item's incoming quantity in the
      associated stock location.

    - id: (\`string\`) The ID of the inventory level to update.

  - delete: (\`string\`\[]) The IDs of the inventory levels to delete.

  - force: (\`boolean\`) If enabled, the inventory levels will be deleted
    even if they have stocked quantity.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminBatchInventoryItemsLocationLevelsResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminBatchInventoryItemsLocationLevelsResponse/page.mdx)\&#62;) The inventory item's details.

  - created: (\[InventoryLevel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.InventoryLevel/page.mdx)\[]) The created inventory levels.

    - id: (\`string\`) The inventory level's ID.

    - inventory\_item\_id: (\`string\`) The ID of the associated inventory item.

    - location\_id: (\`string\`) The ID of the associated stock location

    - stocked\_quantity: (\`number\`) The associated inventory item's stocked quantity in the
      associated stock location.

    - reserved\_quantity: (\`number\`) The associated inventory item's reserved quantity in the
      associated stock location.

    - available\_quantity: (\`number\`) The associated inventory item's available quantity in the
      associated stock location.

    - incoming\_quantity: (\`number\`) The associated inventory item's incoming quantity in the
      associated stock location.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - updated: (\[InventoryLevel]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.InventoryLevel/page.mdx)\[]) The updated inventory levels.

    - id: (\`string\`) The inventory level's ID.

    - inventory\_item\_id: (\`string\`) The ID of the associated inventory item.

    - location\_id: (\`string\`) The ID of the associated stock location

    - stocked\_quantity: (\`number\`) The associated inventory item's stocked quantity in the
      associated stock location.

    - reserved\_quantity: (\`number\`) The associated inventory item's reserved quantity in the
      associated stock location.

    - available\_quantity: (\`number\`) The associated inventory item's available quantity in the
      associated stock location.

    - incoming\_quantity: (\`number\`) The associated inventory item's incoming quantity in the
      associated stock location.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

  - deleted: (\`string\`\[]) The IDs of the deleted inventory levels.
