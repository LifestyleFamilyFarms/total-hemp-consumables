# fulfillmentSet - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.fulfillmentSet` set of methods used to send requests to Medusa's Admin API routes.

## delete

This method deletes a fulfillment set. It sends a request to the
[Delete Fulfillment Set](https://docs.medusajs.com/api/admin#fulfillment-sets_deletefulfillmentsetsid)
API route.

### Example

```ts
sdk.admin.fulfillmentSet.delete("fset_123")
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- id: (\`string\`) The fulfillment set's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminFulfillmentSetDeleteResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentSetDeleteResponse/page.mdx)\&#62;) The deletion's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (\`"fulfillment\_set"\`) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.

***

## createServiceZone

This method adds a service zone to a fulfillment set. It uses the
[Add Service Zone](https://docs.medusajs.com/api/admin#fulfillment-sets_postfulfillmentsetsidservicezones)
API route.

### Example

```ts
sdk.admin.fulfillmentSet.createServiceZone("fset_123", {
  name: "Europe Service Zone",
  geo_zones: [{
    type: "country",
    country_code: "us"
  }]
})
.then(({ fulfillment_set }) => {
  console.log(fulfillment_set)
})
```

### Parameters

- id: (\`string\`) The fulfillment set's ID.
- body: (\[AdminCreateFulfillmentSetServiceZone]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateFulfillmentSetServiceZone/page.mdx)) The service zone's details.

  - name: (\`string\`) The service zone's name.

  - geo\_zones: (\[AdminUpsertFulfillmentSetServiceZoneGeoZone]\(../../../../../types/types/types.AdminUpsertFulfillmentSetServiceZoneGeoZone/page.mdx)\[]) The service zone's geo zones to restrict it to
    specific geographical locations.

    - country\_code: (\`string\`) The geo zone's country code.

    - type: (\`"country"\`) The geo zone's type.

    - province\_code: (\`string\`) The geo zone's lower-case \[ISO 3166-2]\(https://en.wikipedia.org/wiki/ISO\\\_3166-2) province code.

    - city: (\`string\`) The geo zone's city.

    - postal\_expression: (\`Record\<string, unknown>\`) The geo zone's postal expression or ZIP code.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the fulfillment set.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminFulfillmentSetResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentSetResponse/page.mdx)\&#62;) The fulfillment set's details.

  - fulfillment\_set: (\[AdminFulfillmentSet]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentSet/page.mdx)) The fulfillment set's details.

    - id: (\`string\`) The fulfillment set's ID.

    - name: (\`string\`) The fulfillment set's name.

    - type: (\`string\`) The fulfillment set's type.

    - location: (\[AdminStockLocation]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocation/page.mdx)) The stock location associated with this fulfillment set.

    - service\_zones: (\[AdminServiceZone]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminServiceZone/page.mdx)\[]) The fulfillment set's service zones.

    - created\_at: (\`string\`) The date the fulfillment set is created.

    - updated\_at: (\`string\`) The date the fulfillment set is updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the fulfillment set is deleted.

***

## retrieveServiceZone

This method retrieves a fulfillment set's service zone's details. It sends a request to the
[Get Service Zone](https://docs.medusajs.com/api/admin#fulfillment-sets_getfulfillmentsetsidservicezoneszone_id)
API route.

### Example

To retrieve a fulfillment set's service zone by its ID:

```ts
sdk.admin.fulfillmentSet.retrieveServiceZone(
  "fset_123",
  "serzo_123"
)
.then(({ service_zone }) => {
  console.log(service_zone)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.fulfillmentSet.retrieveServiceZone(
  "fset_123",
  "serzo_123",
  {
    fields: "id,*geo_zones"
  }
)
.then(({ service_zone }) => {
  console.log(service_zone)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- fulfillmentSetId: (\`string\`) The fulfillment set's ID.
- serviceZoneId: (\`string\`) The service zone's ID.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the service zone.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminServiceZoneResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminServiceZoneResponse/page.mdx)\&#62;) The service zone's details.

  - service\_zone: (\[AdminServiceZone]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminServiceZone/page.mdx)) The service zone's details.

    - id: (\`string\`) The service zone's ID.

    - name: (\`string\`) The service zone's name.

    - fulfillment\_set\_id: (\`string\`) The ID of the fulfillment set this service zone belongs to.

    - fulfillment\_set: (\[AdminFulfillmentSet]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentSet/page.mdx)) The fulfillment set this service zone belongs to.

    - geo\_zones: (\[AdminGeoZone]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGeoZone/page.mdx)\[]) The service zone's geo zones.

    - shipping\_options: (\[AdminShippingOption]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminShippingOption/page.mdx)\[]) The shipping options that can be used in this service zone.

    - created\_at: (\`string\`) The date the service zone is created.

    - updated\_at: (\`string\`) The date the service zone is updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the service zone is deleted.

***

## updateServiceZone

This method updates a service zone in a fulfillment set. It sends a request to the
[Update Service Zone](https://docs.medusajs.com/api/admin#fulfillment-sets_postfulfillmentsetsidservicezoneszone_id)
API route.

### Example

```ts
sdk.admin.fulfillmentSet.updateServiceZone(
  "fset_123", 
  "serzo_123",
  {
    name: "Europe Service Zone",
  }
)
.then(({ fulfillment_set }) => {
  console.log(fulfillment_set)
})
```

### Parameters

- fulfillmentSetId: (\`string\`) The fulfillment set's ID.
- serviceZoneId: (\`string\`) The service zone's ID.
- body: (\[AdminUpdateFulfillmentSetServiceZone]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateFulfillmentSetServiceZone/page.mdx)) The data to update in the service zone.

  - name: (\`string\`) The service zone's name.

  - geo\_zones: (\[AdminUpdateFulfillmentSetServiceZoneGeoZone]\(../../../../../types/types/types.AdminUpdateFulfillmentSetServiceZoneGeoZone/page.mdx)\[]) The service zone's geo zones to restrict it to
    specific geographical locations. You can update
    existing ones by their IDs or add new ones.

    - country\_code: (\`string\`) The geo zone's country code.

    - type: (\`"country"\`) The geo zone's type.

    - province\_code: (\`string\`) The geo zone's lower-case \[ISO 3166-2]\(https://en.wikipedia.org/wiki/ISO\\\_3166-2) province code.

    - city: (\`string\`) The geo zone's city.

    - postal\_expression: (\`Record\<string, unknown>\`) The geo zone's postal expression or ZIP code.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - id: (\`string\`) The ID of the geo zone to update.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the fulfillment set.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminFulfillmentSetResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentSetResponse/page.mdx)\&#62;) The fulfillment set's details.

  - fulfillment\_set: (\[AdminFulfillmentSet]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentSet/page.mdx)) The fulfillment set's details.

    - id: (\`string\`) The fulfillment set's ID.

    - name: (\`string\`) The fulfillment set's name.

    - type: (\`string\`) The fulfillment set's type.

    - location: (\[AdminStockLocation]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocation/page.mdx)) The stock location associated with this fulfillment set.

    - service\_zones: (\[AdminServiceZone]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminServiceZone/page.mdx)\[]) The fulfillment set's service zones.

    - created\_at: (\`string\`) The date the fulfillment set is created.

    - updated\_at: (\`string\`) The date the fulfillment set is updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the fulfillment set is deleted.

***

## deleteServiceZone

This method deletes a service zone in a fulfillment set. It sends a request to the
[Remove Service Zone](https://docs.medusajs.com/api/admin#fulfillment-sets_deletefulfillmentsetsidservicezoneszone_id)
API route.

### Example

```ts
sdk.admin.fulfillmentSet.deleteServiceZone(
  "fset_123", 
  "serzo_123",
)
.then(({ deleted, parent: fulfillmentSet }) => {
  console.log(deleted, fulfillmentSet)
})
```

### Parameters

- fulfillmentSetId: (\`string\`) The fulfullment set's ID.
- serviceZoneId: (\`string\`) The service zone's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminServiceZoneDeleteResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminServiceZoneDeleteResponse/page.mdx)\&#62;) The deletion's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (\`"service\_zone"\`) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.

  - parent: (\[AdminFulfillmentSet]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFulfillmentSet/page.mdx)) The parent resource of the item that was deleted, if applicable.

    - id: (\`string\`) The fulfillment set's ID.

    - name: (\`string\`) The fulfillment set's name.

    - type: (\`string\`) The fulfillment set's type.

    - location: (\[AdminStockLocation]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminStockLocation/page.mdx)) The stock location associated with this fulfillment set.

    - service\_zones: (\[AdminServiceZone]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminServiceZone/page.mdx)\[]) The fulfillment set's service zones.

    - created\_at: (\`string\`) The date the fulfillment set is created.

    - updated\_at: (\`string\`) The date the fulfillment set is updated.

    - deleted\_at: (\`null\` \\| \`string\`) The date the fulfillment set is deleted.
