# customer - JS SDK Store Reference

This documentation provides a reference to the `sdk.store.customer` set of methods used to send requests to Medusa's Store API routes.

## create

This method registers a customer. It sends a request to the [Register Customer](https://docs.medusajs.com/api/store#customers_postcustomers)
API route.

You must use the Auth.register method first to retrieve a registration token. Then, pass that
registration token in the `headers` parameter of this method as an authorization bearer header.

Related guide: [How to register customer in storefront](https://docs.medusajs.com/resources/storefront-development/customers/register)

### Example

```ts
const token = await sdk.auth.register("customer", "emailpass", {
  "email": "customer@gmail.com",
  "password": "supersecret"
})

sdk.store.customer.create(
  {
    "email": "customer@gmail.com"
  },
  {},
  {
    Authorization: `Bearer ${token}`
  }
)
.then(({ customer }) => {
  console.log(customer)
})
```

### Parameters

- body: (\[StoreCreateCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCreateCustomer/page.mdx)) The customer's details.

  - email: (\`string\`) The customer's email.

  - company\_name: (\`string\`) The customer's company name.

  - first\_name: (\`string\`) The customer's first name.

  - last\_name: (\`string\`) The customer's last name.

  - phone: (\`string\`) The customer's phone number.

  - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the customer.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request. This is where you include the authorization JWT registration token.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreCustomerResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCustomerResponse/page.mdx)\&#62;) The customer's details.

  - customer: (\[StoreCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCustomer/page.mdx)) The customer's details.

    - id: (\`string\`) The customer's ID.

    - email: (\`string\`) The customer's email.

    - default\_billing\_address\_id: (\`null\` \\| \`string\`) The ID of the customer's default billing address.

    - default\_shipping\_address\_id: (\`null\` \\| \`string\`) The ID of the customer's default shipping address.

    - company\_name: (\`null\` \\| \`string\`) The customer's company name.

    - first\_name: (\`null\` \\| \`string\`) The customer's first name.

    - last\_name: (\`null\` \\| \`string\`) The customer's last name.

    - addresses: (\[StoreCustomerAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCustomerAddress/page.mdx)\[]) The customer's address.

    - phone: (\`null\` \\| \`string\`) The customer's phone.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

    - deleted\_at: (\`null\` \\| \`string\` \\| \`Date\`) The date the customer was deleted.

    - created\_at: (\`string\` \\| \`Date\`) The date the customer was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the customer was updated.

***

## update

This method updates the logged-in customer's details. The customer must be logged in
first with the Auth.login method.

It sends a request to the
[Update Customer](https://docs.medusajs.com/api/store#customers_postcustomersme) API route.

Related guide: [How to edit customer's profile in the storefront](https://docs.medusajs.com/resources/storefront-development/customers/profile).

### Example

```ts
// TODO must be authenticated as the customer to update their details
sdk.store.customer.update({
  first_name: "John"
})
.then(({ customer }) => {
  console.log(customer)
})
```

### Parameters

- body: (\[StoreUpdateCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreUpdateCustomer/page.mdx)) The customer's details to update.

  - company\_name: (\`string\`) The customer's company name.

  - first\_name: (\`string\`) The customer's first name.

  - last\_name: (\`string\`) The customer's last name.

  - phone: (\`string\`) The customer's phone number.

  - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the customer.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreCustomerResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCustomerResponse/page.mdx)\&#62;) The customer's details.

  - customer: (\[StoreCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCustomer/page.mdx)) The customer's details.

    - id: (\`string\`) The customer's ID.

    - email: (\`string\`) The customer's email.

    - default\_billing\_address\_id: (\`null\` \\| \`string\`) The ID of the customer's default billing address.

    - default\_shipping\_address\_id: (\`null\` \\| \`string\`) The ID of the customer's default shipping address.

    - company\_name: (\`null\` \\| \`string\`) The customer's company name.

    - first\_name: (\`null\` \\| \`string\`) The customer's first name.

    - last\_name: (\`null\` \\| \`string\`) The customer's last name.

    - addresses: (\[StoreCustomerAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCustomerAddress/page.mdx)\[]) The customer's address.

    - phone: (\`null\` \\| \`string\`) The customer's phone.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

    - deleted\_at: (\`null\` \\| \`string\` \\| \`Date\`) The date the customer was deleted.

    - created\_at: (\`string\` \\| \`Date\`) The date the customer was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the customer was updated.

***

## retrieve

This method retrieves the logged-in customer's details. The customer must be logged in
first with the Auth.login method.

It sends a request to the [Get Logged-In Customer](https://docs.medusajs.com/api/store#customers_getcustomersme)
API route.

### Example

```ts
// TODO must be authenticated as the customer to retrieve their details
sdk.store.customer.retrieve()
.then(({ customer }) => {
  console.log(customer)
})
```

### Parameters

- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the customer.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreCustomerResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCustomerResponse/page.mdx)\&#62;) The customer's details.

  - customer: (\[StoreCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCustomer/page.mdx)) The customer's details.

    - id: (\`string\`) The customer's ID.

    - email: (\`string\`) The customer's email.

    - default\_billing\_address\_id: (\`null\` \\| \`string\`) The ID of the customer's default billing address.

    - default\_shipping\_address\_id: (\`null\` \\| \`string\`) The ID of the customer's default shipping address.

    - company\_name: (\`null\` \\| \`string\`) The customer's company name.

    - first\_name: (\`null\` \\| \`string\`) The customer's first name.

    - last\_name: (\`null\` \\| \`string\`) The customer's last name.

    - addresses: (\[StoreCustomerAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCustomerAddress/page.mdx)\[]) The customer's address.

    - phone: (\`null\` \\| \`string\`) The customer's phone.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

    - deleted\_at: (\`null\` \\| \`string\` \\| \`Date\`) The date the customer was deleted.

    - created\_at: (\`string\` \\| \`Date\`) The date the customer was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the customer was updated.

***

## createAddress

This method creates an address for the logged-in customer. The customer must be logged in
first with the Auth.login method.

It sends a request to the [Create Address](https://docs.medusajs.com/api/store#customers_postcustomersmeaddresses)
API route.

Related guides: [How to manage customer's addresses in the storefront](https://docs.medusajs.com/resources/storefront-development/customers/addresses)

### Example

```ts
// TODO must be authenticated as the customer to create an address
sdk.store.customer.createAddress({
  country_code: "us"
})
.then(({ customer }) => {
  console.log(customer)
})
```

### Parameters

- body: (\[StoreCreateCustomerAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCreateCustomerAddress/page.mdx)) The address's details.

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
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the customer.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreCustomerResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCustomerResponse/page.mdx)\&#62;) The customer's details.

  - customer: (\[StoreCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCustomer/page.mdx)) The customer's details.

    - id: (\`string\`) The customer's ID.

    - email: (\`string\`) The customer's email.

    - default\_billing\_address\_id: (\`null\` \\| \`string\`) The ID of the customer's default billing address.

    - default\_shipping\_address\_id: (\`null\` \\| \`string\`) The ID of the customer's default shipping address.

    - company\_name: (\`null\` \\| \`string\`) The customer's company name.

    - first\_name: (\`null\` \\| \`string\`) The customer's first name.

    - last\_name: (\`null\` \\| \`string\`) The customer's last name.

    - addresses: (\[StoreCustomerAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCustomerAddress/page.mdx)\[]) The customer's address.

    - phone: (\`null\` \\| \`string\`) The customer's phone.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

    - deleted\_at: (\`null\` \\| \`string\` \\| \`Date\`) The date the customer was deleted.

    - created\_at: (\`string\` \\| \`Date\`) The date the customer was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the customer was updated.

***

## updateAddress

This method updates the address of the logged-in customer. The customer must be logged in
first with the Auth.login method.

It sends a request to the [Update Address](https://docs.medusajs.com/api/store#customers_postcustomersmeaddressesaddress_id)
API route.

Related guides: [How to manage customer's addresses in the storefront](https://docs.medusajs.com/resources/storefront-development/customers/addresses)

### Example

```ts
// TODO must be authenticated as the customer to update their address
sdk.store.customer.updateAddress(
  "caddr_123",
  {
    country_code: "us"
  }
)
.then(({ customer }) => {
  console.log(customer)
})
```

### Parameters

- addressId: (\`string\`) The ID of the address to update.
- body: (\[StoreUpdateCustomerAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreUpdateCustomerAddress/page.mdx)) The details to update in the address.

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
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the customer.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreCustomerResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCustomerResponse/page.mdx)\&#62;) The customer's details.

  - customer: (\[StoreCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCustomer/page.mdx)) The customer's details.

    - id: (\`string\`) The customer's ID.

    - email: (\`string\`) The customer's email.

    - default\_billing\_address\_id: (\`null\` \\| \`string\`) The ID of the customer's default billing address.

    - default\_shipping\_address\_id: (\`null\` \\| \`string\`) The ID of the customer's default shipping address.

    - company\_name: (\`null\` \\| \`string\`) The customer's company name.

    - first\_name: (\`null\` \\| \`string\`) The customer's first name.

    - last\_name: (\`null\` \\| \`string\`) The customer's last name.

    - addresses: (\[StoreCustomerAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCustomerAddress/page.mdx)\[]) The customer's address.

    - phone: (\`null\` \\| \`string\`) The customer's phone.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

    - deleted\_at: (\`null\` \\| \`string\` \\| \`Date\`) The date the customer was deleted.

    - created\_at: (\`string\` \\| \`Date\`) The date the customer was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the customer was updated.

***

## listAddress

This method retrieves the logged-in customer's address. The customer must be logged in
first with the Auth.login method.

It sends a request to the [List Customer's Address](https://docs.medusajs.com/api/store#customers_getcustomersmeaddresses)
API route.

Related guides: [How to manage customer's addresses in the storefront](https://docs.medusajs.com/resources/storefront-development/customers/addresses)

### Example

To retrieve the list of addresses:

```ts
// TODO must be authenticated as the customer to list their addresses
sdk.store.customer.listAddress()
.then(({ addresses, count, offset, limit }) => {
  console.log(addresses)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
// TODO must be authenticated as the customer to list their addresses
sdk.store.customer.listAddress({
  limit: 10,
  offset: 10
})
.then(({ addresses, count, offset, limit }) => {
  console.log(addresses)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each address:

```ts
// TODO must be authenticated as the customer to list their addresses
sdk.store.customer.listAddress({
  fields: "id,country_code"
})
.then(({ addresses, count, offset, limit }) => {
  console.log(addresses)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- query: (\[FindParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.FindParams/page.mdx) & \[StoreCustomerAddressFilters]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCustomerAddressFilters/page.mdx)) Configure the fields to retrieve in the addresses.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - $and: ((\[BaseCustomerAddressFilters]\(../../../../../types/interfaces/types.BaseCustomerAddressFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseCustomerAddressFilters]\(../../../../../types/interfaces/types.BaseCustomerAddressFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[BaseCustomerAddressFilters]\(../../../../../types/interfaces/types.BaseCustomerAddressFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseCustomerAddressFilters]\(../../../../../types/interfaces/types.BaseCustomerAddressFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[BaseCustomerAddressFilters]\(../../../../../types/interfaces/types.BaseCustomerAddressFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseCustomerAddressFilters]\(../../../../../types/interfaces/types.BaseCustomerAddressFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - q: (\`string\`) A query or keyword to search the address's searchable fields.

    - company: (\`string\` \\| \`string\`\[]) Filter by company name(s).

    - city: (\`string\` \\| \`string\`\[]) Filter by cities.

    - country\_code: (\`string\` \\| \`string\`\[]) Filter by country code(s).

    - province: (\`string\` \\| \`string\`\[]) Filter by lower-case \[ISO 3166-2]\(https://en.wikipedia.org/wiki/ISO\\\_3166-2) province code(s).

    - postal\_code: (\`string\` \\| \`string\`\[]) Filter by postal code(s).

  - $or: ((\[BaseCustomerAddressFilters]\(../../../../../types/interfaces/types.BaseCustomerAddressFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseCustomerAddressFilters]\(../../../../../types/interfaces/types.BaseCustomerAddressFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[BaseCustomerAddressFilters]\(../../../../../types/interfaces/types.BaseCustomerAddressFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseCustomerAddressFilters]\(../../../../../types/interfaces/types.BaseCustomerAddressFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[BaseCustomerAddressFilters]\(../../../../../types/interfaces/types.BaseCustomerAddressFilters/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[BaseCustomerAddressFilters]\(../../../../../types/interfaces/types.BaseCustomerAddressFilters/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - q: (\`string\`) A query or keyword to search the address's searchable fields.

    - company: (\`string\` \\| \`string\`\[]) Filter by company name(s).

    - city: (\`string\` \\| \`string\`\[]) Filter by cities.

    - country\_code: (\`string\` \\| \`string\`\[]) Filter by country code(s).

    - province: (\`string\` \\| \`string\`\[]) Filter by lower-case \[ISO 3166-2]\(https://en.wikipedia.org/wiki/ISO\\\_3166-2) province code(s).

    - postal\_code: (\`string\` \\| \`string\`\[]) Filter by postal code(s).

  - q: (\`string\`) A query or keyword to search the address's searchable fields.

  - company: (\`string\` \\| \`string\`\[]) Filter by company name(s).

  - city: (\`string\` \\| \`string\`\[]) Filter by cities.

  - country\_code: (\`string\` \\| \`string\`\[]) Filter by country code(s).

  - province: (\`string\` \\| \`string\`\[]) Filter by lower-case \[ISO 3166-2]\(https://en.wikipedia.org/wiki/ISO\\\_3166-2) province code(s).

  - postal\_code: (\`string\` \\| \`string\`\[]) Filter by postal code(s).
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreCustomerAddressListResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCustomerAddressListResponse/page.mdx)\&#62;) The paginated list of addresses.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - addresses: (\[StoreCustomerAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCustomerAddress/page.mdx)\[]) The paginated list of addresses.

    - id: (\`string\`) The address's ID.

    - address\_name: (\`null\` \\| \`string\`) The address's name.

    - is\_default\_shipping: (\`boolean\`) Whether the address is used by default for shipping.

    - is\_default\_billing: (\`boolean\`) Whether the address is used by default for billing.

    - customer\_id: (\`string\`) The ID of the customer this address belongs to.

    - company: (\`null\` \\| \`string\`) The address's company.

    - first\_name: (\`null\` \\| \`string\`) The address's first name.

    - last\_name: (\`null\` \\| \`string\`) The address's last name.

    - address\_1: (\`null\` \\| \`string\`) The address's first line.

    - address\_2: (\`null\` \\| \`string\`) The address's second line.

    - city: (\`null\` \\| \`string\`) The address's city.

    - country\_code: (\`null\` \\| \`string\`) The address's country code.

    - province: (\`null\` \\| \`string\`) The address's lower-case \[ISO 3166-2]\(https://en.wikipedia.org/wiki/ISO\\\_3166-2) province.

    - postal\_code: (\`null\` \\| \`string\`) The address's postal code.

    - phone: (\`null\` \\| \`string\`) The address's phone number.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - created\_at: (\`string\`) The date the address was created.

    - updated\_at: (\`string\`) The date the address was updated.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## retrieveAddress

This method retrieves an address of the logged-in customer. The customer must be logged in
first with the Auth.login method.

It sends a request to the [Get Address](https://docs.medusajs.com/api/store#customers_getcustomersmeaddressesaddress_id)
API route.

Related guides: [How to manage customer's addresses in the storefront](https://docs.medusajs.com/resources/storefront-development/customers/addresses)

### Example

To retrieve an address by its ID:

```ts
// TODO must be authenticated as the customer to retrieve their address
sdk.store.customer.retrieveAddress(
  "caddr_123"
)
.then(({ address }) => {
  console.log(address)
})
```

To specify the fields and relations to retrieve:

```ts
// TODO must be authenticated as the customer to retrieve their address
sdk.store.customer.retrieveAddress(
  "caddr_123",
  {
    fields: "id,country_code"
  }
)
.then(({ address }) => {
  console.log(address)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- addressId: (\`string\`) The address's ID.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the address.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreCustomerAddressResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCustomerAddressResponse/page.mdx)\&#62;) The address's details.

  - address: (\[StoreCustomerAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCustomerAddress/page.mdx)) The address's details.

    - id: (\`string\`) The address's ID.

    - address\_name: (\`null\` \\| \`string\`) The address's name.

    - is\_default\_shipping: (\`boolean\`) Whether the address is used by default for shipping.

    - is\_default\_billing: (\`boolean\`) Whether the address is used by default for billing.

    - customer\_id: (\`string\`) The ID of the customer this address belongs to.

    - company: (\`null\` \\| \`string\`) The address's company.

    - first\_name: (\`null\` \\| \`string\`) The address's first name.

    - last\_name: (\`null\` \\| \`string\`) The address's last name.

    - address\_1: (\`null\` \\| \`string\`) The address's first line.

    - address\_2: (\`null\` \\| \`string\`) The address's second line.

    - city: (\`null\` \\| \`string\`) The address's city.

    - country\_code: (\`null\` \\| \`string\`) The address's country code.

    - province: (\`null\` \\| \`string\`) The address's lower-case \[ISO 3166-2]\(https://en.wikipedia.org/wiki/ISO\\\_3166-2) province.

    - postal\_code: (\`null\` \\| \`string\`) The address's postal code.

    - phone: (\`null\` \\| \`string\`) The address's phone number.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - created\_at: (\`string\`) The date the address was created.

    - updated\_at: (\`string\`) The date the address was updated.

***

## deleteAddress

This method deletes an address of the logged-in customer. The customer must be logged in
first with the Auth.login method.

It sends a request to the [Remove Address](https://docs.medusajs.com/api/store#customers_deletecustomersmeaddressesaddress_id)
API route.

Related guides: [How to manage customer's addresses in the storefront](https://docs.medusajs.com/resources/storefront-development/customers/addresses)

### Example

```ts
// TODO must be authenticated as the customer to delete their address
sdk.store.customer.deleteAddress("caddr_123")
.then(({ deleted, parent: customer }) => {
  console.log(customer)
})
```

### Parameters

- addressId: (\`string\`) The address's ID.
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreCustomerAddressDeleteResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.StoreCustomerAddressDeleteResponse/page.mdx)\&#62;) The deletion's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (TObject) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.

  - parent: (TParent) The parent resource of the item that was deleted, if applicable.
