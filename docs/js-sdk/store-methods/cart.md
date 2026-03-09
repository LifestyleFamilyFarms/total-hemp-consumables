# cart - JS SDK Store Reference

This documentation provides a reference to the `sdk.store.cart` set of methods used to send requests to Medusa's Store API routes.

Related guides: [How to implement carts in the storefront](https://docs.medusajs.com/resources/storefront-development/cart).

## create

This method creates a cart. It sends a request to the [Create Cart](https://docs.medusajs.com/api/store#carts_postcarts)
API route.

Related guide: [How to create a cart in the storefront](https://docs.medusajs.com/resources/storefront-development/cart/create).

### Example

```ts
sdk.store.cart.create({
  region_id: "reg_123"
})
.then(({ cart }) => {
  console.log(cart)
})
```

### Parameters

- body: (\[StoreCreateCart]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCreateCart/page.mdx)) The details of the cart to create.

  - region\_id: (\`string\`) The ID of the region that the cart is created in.
    If not provided, the default region of the store is used.
    If the store doesn't have a default region, an error is thrown.

  - shipping\_address: (\[StoreAddAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreAddAddress/page.mdx)) The cart's shipping address.

    - first\_name: (\`string\`) The first name of the address.

    - last\_name: (\`string\`) The last name of the address.

    - phone: (\`string\`) The phone number of the address.

    - company: (\`string\`) The company of the address.

    - address\_1: (\`string\`) The first address line of the address.

    - address\_2: (\`string\`) The second address line of the address.

    - city: (\`string\`) The city of the address.

    - country\_code: (\`string\`) The country code of the address.

    - province: (\`string\`) The lower-case \[ISO 3166-2]\(https://en.wikipedia.org/wiki/ISO\\\_3166-2) province/state of the address.

    - postal\_code: (\`string\`) The postal code of the address.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Holds custom data in key-value pairs.

  - billing\_address: (\[StoreAddAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreAddAddress/page.mdx)) The cart's billing address.

    - first\_name: (\`string\`) The first name of the address.

    - last\_name: (\`string\`) The last name of the address.

    - phone: (\`string\`) The phone number of the address.

    - company: (\`string\`) The company of the address.

    - address\_1: (\`string\`) The first address line of the address.

    - address\_2: (\`string\`) The second address line of the address.

    - city: (\`string\`) The city of the address.

    - country\_code: (\`string\`) The country code of the address.

    - province: (\`string\`) The lower-case \[ISO 3166-2]\(https://en.wikipedia.org/wiki/ISO\\\_3166-2) province/state of the address.

    - postal\_code: (\`string\`) The postal code of the address.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Holds custom data in key-value pairs.

  - email: (\`string\`) The email of the customer associated with the cart.

  - currency\_code: (\`string\`) The cart's currency code. If not provided, the region's currency
    code is used.

  - items: (\[StoreAddCartLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreAddCartLineItem/page.mdx)\[]) The cart's items.

    - variant\_id: (\`string\`) The ID of the product variant to add to the cart.

    - quantity: (\`number\`) The item's quantity in the cart.

    - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

  - sales\_channel\_id: (\`string\`) The ID of the associated sales channel. Only products in the same sales channel
    can be added to the cart.

  - promo\_codes: (\`string\`\[]) The promotion codes to apply on the cart.

  - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the cart.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreCartResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartResponse/page.mdx)\&#62;) The created cart.

  - cart: (\[StoreCart]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCart/page.mdx)) The cart's details.

    - id: (\`string\`) The ID of the cart.

    - currency\_code: (\`string\`) The currency of the cart

    - original\_item\_total: (\`number\`) The original item total of the cart.

    - original\_item\_subtotal: (\`number\`) The original item subtotal of the cart.

    - original\_item\_tax\_total: (\`number\`) The original item tax total of the cart.

    - item\_total: (\`number\`) The item total of the cart.

    - item\_subtotal: (\`number\`) The item subtotal of the cart.

    - item\_tax\_total: (\`number\`) The item tax total of the cart.

    - original\_total: (\`number\`) The original total of the cart.

    - original\_subtotal: (\`number\`) The original subtotal of the cart.

    - original\_tax\_total: (\`number\`) The original tax total of the cart.

    - total: (\`number\`) The total of the cart.

    - subtotal: (\`number\`) The subtotal of the cart. (Excluding taxes)

    - tax\_total: (\`number\`) The tax total of the cart.

    - discount\_total: (\`number\`) The discount total of the cart.

    - discount\_tax\_total: (\`number\`) The discount tax total of the cart.

    - gift\_card\_total: (\`number\`) The gift card total of the cart.

    - gift\_card\_tax\_total: (\`number\`) The gift card tax total of the cart.

    - shipping\_total: (\`number\`) The shipping total of the cart.

    - shipping\_subtotal: (\`number\`) The shipping subtotal of the cart.

    - shipping\_tax\_total: (\`number\`) The shipping tax total of the cart.

    - original\_shipping\_total: (\`number\`) The original shipping total of the cart.

    - original\_shipping\_subtotal: (\`number\`) The original shipping subtotal of the cart.

    - original\_shipping\_tax\_total: (\`number\`) The original shipping tax total of the cart.

    - promotions: (\[StoreCartPromotion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartPromotion/page.mdx)\[]) The promotions applied to the cart.

    - region\_id: (\`string\`) The ID of the region the cart belongs to.

    - customer\_id: (\`string\`) The ID of the associated customer

    - sales\_channel\_id: (\`string\`) The ID of the sales channel the cart belongs to.

    - email: (\`string\`) The email of the customer that owns the cart.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Holds custom data in key-value pairs.

    - created\_at: (\`string\` \\| \`Date\`) When the cart was created.

    - updated\_at: (\`string\` \\| \`Date\`) When the cart was updated.

    - shipping\_address: (\[StoreCartAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartAddress/page.mdx)) The cart's shipping address.

    - billing\_address: (\[StoreCartAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartAddress/page.mdx)) The cart's billing address.

    - items: (\[StoreCartLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartLineItem/page.mdx)\[]) The cart's items.

    - shipping\_methods: (\[StoreCartShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartShippingMethod/page.mdx)\[]) The cart's shipping methods.

    - payment\_collection: (\[StorePaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StorePaymentCollection/page.mdx)) The cart's payment collection.

    - region: (\[StoreRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreRegion/page.mdx)) The cart's region

***

## update

This method updates a cart. It sends a request to the
[Update Cart](https://docs.medusajs.com/api/store#carts_postcartsid) API route.

Related guide: [How to update a cart in the storefront](https://docs.medusajs.com/resources/storefront-development/cart/update).

### Example

```ts
sdk.store.cart.update("cart_123", {
  region_id: "reg_123"
})
.then(({ cart }) => {
  console.log(cart)
})
```

### Parameters

- id: (\`string\`) The cart's ID.
- body: (\[StoreUpdateCart]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreUpdateCart/page.mdx)) The data to update in the cart.

  - region\_id: (\`string\`) The ID of the region that the cart is in.

  - shipping\_address: (\`string\` \\| \[StoreAddAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreAddAddress/page.mdx)) The cart's shipping address.

    - first\_name: (\`string\`) The first name of the address.

    - last\_name: (\`string\`) The last name of the address.

    - phone: (\`string\`) The phone number of the address.

    - company: (\`string\`) The company of the address.

    - address\_1: (\`string\`) The first address line of the address.

    - address\_2: (\`string\`) The second address line of the address.

    - city: (\`string\`) The city of the address.

    - country\_code: (\`string\`) The country code of the address.

    - province: (\`string\`) The lower-case \[ISO 3166-2]\(https://en.wikipedia.org/wiki/ISO\\\_3166-2) province/state of the address.

    - postal\_code: (\`string\`) The postal code of the address.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Holds custom data in key-value pairs.

  - billing\_address: (\`string\` \\| \[StoreAddAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreAddAddress/page.mdx)) The cart's billing address.

    - first\_name: (\`string\`) The first name of the address.

    - last\_name: (\`string\`) The last name of the address.

    - phone: (\`string\`) The phone number of the address.

    - company: (\`string\`) The company of the address.

    - address\_1: (\`string\`) The first address line of the address.

    - address\_2: (\`string\`) The second address line of the address.

    - city: (\`string\`) The city of the address.

    - country\_code: (\`string\`) The country code of the address.

    - province: (\`string\`) The lower-case \[ISO 3166-2]\(https://en.wikipedia.org/wiki/ISO\\\_3166-2) province/state of the address.

    - postal\_code: (\`string\`) The postal code of the address.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Holds custom data in key-value pairs.

  - email: (\`string\`) The email of the customer associated with the cart.

  - sales\_channel\_id: (\`string\`) The ID of the associated sales channel. Only products in the same sales channel
    can be added to the cart.

  - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.

  - promo\_codes: (\`string\`\[]) The promotion codes to apply on the cart.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the cart.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreCartResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartResponse/page.mdx)\&#62;) The updated cart.

  - cart: (\[StoreCart]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCart/page.mdx)) The cart's details.

    - id: (\`string\`) The ID of the cart.

    - currency\_code: (\`string\`) The currency of the cart

    - original\_item\_total: (\`number\`) The original item total of the cart.

    - original\_item\_subtotal: (\`number\`) The original item subtotal of the cart.

    - original\_item\_tax\_total: (\`number\`) The original item tax total of the cart.

    - item\_total: (\`number\`) The item total of the cart.

    - item\_subtotal: (\`number\`) The item subtotal of the cart.

    - item\_tax\_total: (\`number\`) The item tax total of the cart.

    - original\_total: (\`number\`) The original total of the cart.

    - original\_subtotal: (\`number\`) The original subtotal of the cart.

    - original\_tax\_total: (\`number\`) The original tax total of the cart.

    - total: (\`number\`) The total of the cart.

    - subtotal: (\`number\`) The subtotal of the cart. (Excluding taxes)

    - tax\_total: (\`number\`) The tax total of the cart.

    - discount\_total: (\`number\`) The discount total of the cart.

    - discount\_tax\_total: (\`number\`) The discount tax total of the cart.

    - gift\_card\_total: (\`number\`) The gift card total of the cart.

    - gift\_card\_tax\_total: (\`number\`) The gift card tax total of the cart.

    - shipping\_total: (\`number\`) The shipping total of the cart.

    - shipping\_subtotal: (\`number\`) The shipping subtotal of the cart.

    - shipping\_tax\_total: (\`number\`) The shipping tax total of the cart.

    - original\_shipping\_total: (\`number\`) The original shipping total of the cart.

    - original\_shipping\_subtotal: (\`number\`) The original shipping subtotal of the cart.

    - original\_shipping\_tax\_total: (\`number\`) The original shipping tax total of the cart.

    - promotions: (\[StoreCartPromotion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartPromotion/page.mdx)\[]) The promotions applied to the cart.

    - region\_id: (\`string\`) The ID of the region the cart belongs to.

    - customer\_id: (\`string\`) The ID of the associated customer

    - sales\_channel\_id: (\`string\`) The ID of the sales channel the cart belongs to.

    - email: (\`string\`) The email of the customer that owns the cart.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Holds custom data in key-value pairs.

    - created\_at: (\`string\` \\| \`Date\`) When the cart was created.

    - updated\_at: (\`string\` \\| \`Date\`) When the cart was updated.

    - shipping\_address: (\[StoreCartAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartAddress/page.mdx)) The cart's shipping address.

    - billing\_address: (\[StoreCartAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartAddress/page.mdx)) The cart's billing address.

    - items: (\[StoreCartLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartLineItem/page.mdx)\[]) The cart's items.

    - shipping\_methods: (\[StoreCartShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartShippingMethod/page.mdx)\[]) The cart's shipping methods.

    - payment\_collection: (\[StorePaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StorePaymentCollection/page.mdx)) The cart's payment collection.

    - region: (\[StoreRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreRegion/page.mdx)) The cart's region

***

## retrieve

This method retrieves a cart by its ID. It sends a request to the
[Get Cart](https://docs.medusajs.com/api/store#carts_getcartsid) API route.

Related guide: [How to retrieve a cart in the storefront](https://docs.medusajs.com/resources/storefront-development/cart/retrieve).

### Example

To retrieve a cart by its ID:

```ts
sdk.store.cart.retrieve("cart_123")
.then(({ cart }) => {
  console.log(cart)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.store.cart.retrieve("cart_123", {
  fields: "id,*items"
})
.then(({ cart }) => {
  console.log(cart)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- id: (\`string\`) The cart's ID.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the cart.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreCartResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartResponse/page.mdx)\&#62;) The cart's details.

  - cart: (\[StoreCart]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCart/page.mdx)) The cart's details.

    - id: (\`string\`) The ID of the cart.

    - currency\_code: (\`string\`) The currency of the cart

    - original\_item\_total: (\`number\`) The original item total of the cart.

    - original\_item\_subtotal: (\`number\`) The original item subtotal of the cart.

    - original\_item\_tax\_total: (\`number\`) The original item tax total of the cart.

    - item\_total: (\`number\`) The item total of the cart.

    - item\_subtotal: (\`number\`) The item subtotal of the cart.

    - item\_tax\_total: (\`number\`) The item tax total of the cart.

    - original\_total: (\`number\`) The original total of the cart.

    - original\_subtotal: (\`number\`) The original subtotal of the cart.

    - original\_tax\_total: (\`number\`) The original tax total of the cart.

    - total: (\`number\`) The total of the cart.

    - subtotal: (\`number\`) The subtotal of the cart. (Excluding taxes)

    - tax\_total: (\`number\`) The tax total of the cart.

    - discount\_total: (\`number\`) The discount total of the cart.

    - discount\_tax\_total: (\`number\`) The discount tax total of the cart.

    - gift\_card\_total: (\`number\`) The gift card total of the cart.

    - gift\_card\_tax\_total: (\`number\`) The gift card tax total of the cart.

    - shipping\_total: (\`number\`) The shipping total of the cart.

    - shipping\_subtotal: (\`number\`) The shipping subtotal of the cart.

    - shipping\_tax\_total: (\`number\`) The shipping tax total of the cart.

    - original\_shipping\_total: (\`number\`) The original shipping total of the cart.

    - original\_shipping\_subtotal: (\`number\`) The original shipping subtotal of the cart.

    - original\_shipping\_tax\_total: (\`number\`) The original shipping tax total of the cart.

    - promotions: (\[StoreCartPromotion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartPromotion/page.mdx)\[]) The promotions applied to the cart.

    - region\_id: (\`string\`) The ID of the region the cart belongs to.

    - customer\_id: (\`string\`) The ID of the associated customer

    - sales\_channel\_id: (\`string\`) The ID of the sales channel the cart belongs to.

    - email: (\`string\`) The email of the customer that owns the cart.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Holds custom data in key-value pairs.

    - created\_at: (\`string\` \\| \`Date\`) When the cart was created.

    - updated\_at: (\`string\` \\| \`Date\`) When the cart was updated.

    - shipping\_address: (\[StoreCartAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartAddress/page.mdx)) The cart's shipping address.

    - billing\_address: (\[StoreCartAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartAddress/page.mdx)) The cart's billing address.

    - items: (\[StoreCartLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartLineItem/page.mdx)\[]) The cart's items.

    - shipping\_methods: (\[StoreCartShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartShippingMethod/page.mdx)\[]) The cart's shipping methods.

    - payment\_collection: (\[StorePaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StorePaymentCollection/page.mdx)) The cart's payment collection.

    - region: (\[StoreRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreRegion/page.mdx)) The cart's region

***

## createLineItem

This methods adds a product variant to the cart as a line item. It sends a request to the
[Add Line Item](https://docs.medusajs.com/api/store#carts_postcartsidlineitems) API route.

Related guide: [How to manage a cart's line items in the storefront](https://docs.medusajs.com/resources/storefront-development/cart/manage-items).

### Example

```ts
sdk.store.cart.createLineItem("cart_123", {
  variant_id: "variant_123",
  quantity: 1
})
.then(({ cart }) => {
  console.log(cart)
})
```

### Parameters

- cartId: (\`string\`) The cart's ID.
- body: (\[StoreAddCartLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreAddCartLineItem/page.mdx)) The details of the item to add.

  - variant\_id: (\`string\`) The ID of the product variant to add to the cart.

  - quantity: (\`number\`) The item's quantity in the cart.

  - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the cart.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreCartResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartResponse/page.mdx)\&#62;) The cart's details.

  - cart: (\[StoreCart]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCart/page.mdx)) The cart's details.

    - id: (\`string\`) The ID of the cart.

    - currency\_code: (\`string\`) The currency of the cart

    - original\_item\_total: (\`number\`) The original item total of the cart.

    - original\_item\_subtotal: (\`number\`) The original item subtotal of the cart.

    - original\_item\_tax\_total: (\`number\`) The original item tax total of the cart.

    - item\_total: (\`number\`) The item total of the cart.

    - item\_subtotal: (\`number\`) The item subtotal of the cart.

    - item\_tax\_total: (\`number\`) The item tax total of the cart.

    - original\_total: (\`number\`) The original total of the cart.

    - original\_subtotal: (\`number\`) The original subtotal of the cart.

    - original\_tax\_total: (\`number\`) The original tax total of the cart.

    - total: (\`number\`) The total of the cart.

    - subtotal: (\`number\`) The subtotal of the cart. (Excluding taxes)

    - tax\_total: (\`number\`) The tax total of the cart.

    - discount\_total: (\`number\`) The discount total of the cart.

    - discount\_tax\_total: (\`number\`) The discount tax total of the cart.

    - gift\_card\_total: (\`number\`) The gift card total of the cart.

    - gift\_card\_tax\_total: (\`number\`) The gift card tax total of the cart.

    - shipping\_total: (\`number\`) The shipping total of the cart.

    - shipping\_subtotal: (\`number\`) The shipping subtotal of the cart.

    - shipping\_tax\_total: (\`number\`) The shipping tax total of the cart.

    - original\_shipping\_total: (\`number\`) The original shipping total of the cart.

    - original\_shipping\_subtotal: (\`number\`) The original shipping subtotal of the cart.

    - original\_shipping\_tax\_total: (\`number\`) The original shipping tax total of the cart.

    - promotions: (\[StoreCartPromotion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartPromotion/page.mdx)\[]) The promotions applied to the cart.

    - region\_id: (\`string\`) The ID of the region the cart belongs to.

    - customer\_id: (\`string\`) The ID of the associated customer

    - sales\_channel\_id: (\`string\`) The ID of the sales channel the cart belongs to.

    - email: (\`string\`) The email of the customer that owns the cart.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Holds custom data in key-value pairs.

    - created\_at: (\`string\` \\| \`Date\`) When the cart was created.

    - updated\_at: (\`string\` \\| \`Date\`) When the cart was updated.

    - shipping\_address: (\[StoreCartAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartAddress/page.mdx)) The cart's shipping address.

    - billing\_address: (\[StoreCartAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartAddress/page.mdx)) The cart's billing address.

    - items: (\[StoreCartLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartLineItem/page.mdx)\[]) The cart's items.

    - shipping\_methods: (\[StoreCartShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartShippingMethod/page.mdx)\[]) The cart's shipping methods.

    - payment\_collection: (\[StorePaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StorePaymentCollection/page.mdx)) The cart's payment collection.

    - region: (\[StoreRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreRegion/page.mdx)) The cart's region

***

## updateLineItem

This method updates a line item in a cart. It sends a request to the
[Update Line Item](https://docs.medusajs.com/api/store#carts_postcartsidlineitemsline_id) API route.

Related guide: [How to manage a cart's line items in the storefront](https://docs.medusajs.com/resources/storefront-development/cart/manage-items).

### Example

```ts
sdk.store.cart.updateLineItem(
  "cart_123",
  "li_123",
  {
    quantity: 1
  }
)
.then(({ cart }) => {
  console.log(cart)
})
```

### Parameters

- cartId: (\`string\`) The cart's ID.
- lineItemId: (\`string\`) The line item's ID.
- body: (\[StoreUpdateCartLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreUpdateCartLineItem/page.mdx)) The data to update.

  - quantity: (\`number\`) The item's quantity.

  - metadata: (\`Record\<string, unknown>\`) Key-value pairs of custom data.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the cart.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreCartResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartResponse/page.mdx)\&#62;) The cart's details.

  - cart: (\[StoreCart]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCart/page.mdx)) The cart's details.

    - id: (\`string\`) The ID of the cart.

    - currency\_code: (\`string\`) The currency of the cart

    - original\_item\_total: (\`number\`) The original item total of the cart.

    - original\_item\_subtotal: (\`number\`) The original item subtotal of the cart.

    - original\_item\_tax\_total: (\`number\`) The original item tax total of the cart.

    - item\_total: (\`number\`) The item total of the cart.

    - item\_subtotal: (\`number\`) The item subtotal of the cart.

    - item\_tax\_total: (\`number\`) The item tax total of the cart.

    - original\_total: (\`number\`) The original total of the cart.

    - original\_subtotal: (\`number\`) The original subtotal of the cart.

    - original\_tax\_total: (\`number\`) The original tax total of the cart.

    - total: (\`number\`) The total of the cart.

    - subtotal: (\`number\`) The subtotal of the cart. (Excluding taxes)

    - tax\_total: (\`number\`) The tax total of the cart.

    - discount\_total: (\`number\`) The discount total of the cart.

    - discount\_tax\_total: (\`number\`) The discount tax total of the cart.

    - gift\_card\_total: (\`number\`) The gift card total of the cart.

    - gift\_card\_tax\_total: (\`number\`) The gift card tax total of the cart.

    - shipping\_total: (\`number\`) The shipping total of the cart.

    - shipping\_subtotal: (\`number\`) The shipping subtotal of the cart.

    - shipping\_tax\_total: (\`number\`) The shipping tax total of the cart.

    - original\_shipping\_total: (\`number\`) The original shipping total of the cart.

    - original\_shipping\_subtotal: (\`number\`) The original shipping subtotal of the cart.

    - original\_shipping\_tax\_total: (\`number\`) The original shipping tax total of the cart.

    - promotions: (\[StoreCartPromotion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartPromotion/page.mdx)\[]) The promotions applied to the cart.

    - region\_id: (\`string\`) The ID of the region the cart belongs to.

    - customer\_id: (\`string\`) The ID of the associated customer

    - sales\_channel\_id: (\`string\`) The ID of the sales channel the cart belongs to.

    - email: (\`string\`) The email of the customer that owns the cart.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Holds custom data in key-value pairs.

    - created\_at: (\`string\` \\| \`Date\`) When the cart was created.

    - updated\_at: (\`string\` \\| \`Date\`) When the cart was updated.

    - shipping\_address: (\[StoreCartAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartAddress/page.mdx)) The cart's shipping address.

    - billing\_address: (\[StoreCartAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartAddress/page.mdx)) The cart's billing address.

    - items: (\[StoreCartLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartLineItem/page.mdx)\[]) The cart's items.

    - shipping\_methods: (\[StoreCartShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartShippingMethod/page.mdx)\[]) The cart's shipping methods.

    - payment\_collection: (\[StorePaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StorePaymentCollection/page.mdx)) The cart's payment collection.

    - region: (\[StoreRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreRegion/page.mdx)) The cart's region

***

## deleteLineItem

This method deletes a line item from a cart. It sends a request to the
[Remove Line Item](https://docs.medusajs.com/api/store#carts_deletecartsidlineitemsline_id) API route.

Related guide: [How to manage a cart's line items in the storefront](https://docs.medusajs.com/resources/storefront-development/cart/manage-items).

### Example

```ts
sdk.store.cart.deleteLineItem(
  "cart_123",
  "li_123"
)
.then(({ deleted, parent: cart }) => {
  console.log(deleted, cart)
})
```

### Parameters

- cartId: (\`string\`) The cart's ID.
- lineItemId: (\`string\`) The item's ID.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the cart.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreLineItemDeleteResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.StoreLineItemDeleteResponse/page.mdx)\&#62;) The deletion's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (TObject) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.

  - parent: (TParent) The parent resource of the item that was deleted, if applicable.

***

## addShippingMethod

This method adds a shipping method to a cart. It sends a request to
the [Add Shipping Method](https://docs.medusajs.com/api/store#carts_postcartsidshippingmethods) API routes.

Related guide: [Implement shipping step during checkout](https://docs.medusajs.com/resources/storefront-development/checkout/shipping).

### Example

```ts
sdk.store.cart.addShippingMethod("cart_123", {
  option_id: "so_123",
  data: {
    // custom data for fulfillment provider.
  }
})
.then(({ cart }) => {
  console.log(cart)
})
```

### Parameters

- cartId: (\`string\`) The cart's ID.
- body: (\[StoreAddCartShippingMethods]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreAddCartShippingMethods/page.mdx)) The shipping method's details.

  - option\_id: (\`string\`) The id of the chosen shipping option.

  - data: (\`Record\<string, unknown>\`) Data useful for the associated fulfillment provider.

    Learn more in \[this documentation]\(https://docs.medusajs.com/resources/commerce-modules/fulfillment/shipping-option#data-property).
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the cart.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreCartResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartResponse/page.mdx)\&#62;) The cart's details.

  - cart: (\[StoreCart]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCart/page.mdx)) The cart's details.

    - id: (\`string\`) The ID of the cart.

    - currency\_code: (\`string\`) The currency of the cart

    - original\_item\_total: (\`number\`) The original item total of the cart.

    - original\_item\_subtotal: (\`number\`) The original item subtotal of the cart.

    - original\_item\_tax\_total: (\`number\`) The original item tax total of the cart.

    - item\_total: (\`number\`) The item total of the cart.

    - item\_subtotal: (\`number\`) The item subtotal of the cart.

    - item\_tax\_total: (\`number\`) The item tax total of the cart.

    - original\_total: (\`number\`) The original total of the cart.

    - original\_subtotal: (\`number\`) The original subtotal of the cart.

    - original\_tax\_total: (\`number\`) The original tax total of the cart.

    - total: (\`number\`) The total of the cart.

    - subtotal: (\`number\`) The subtotal of the cart. (Excluding taxes)

    - tax\_total: (\`number\`) The tax total of the cart.

    - discount\_total: (\`number\`) The discount total of the cart.

    - discount\_tax\_total: (\`number\`) The discount tax total of the cart.

    - gift\_card\_total: (\`number\`) The gift card total of the cart.

    - gift\_card\_tax\_total: (\`number\`) The gift card tax total of the cart.

    - shipping\_total: (\`number\`) The shipping total of the cart.

    - shipping\_subtotal: (\`number\`) The shipping subtotal of the cart.

    - shipping\_tax\_total: (\`number\`) The shipping tax total of the cart.

    - original\_shipping\_total: (\`number\`) The original shipping total of the cart.

    - original\_shipping\_subtotal: (\`number\`) The original shipping subtotal of the cart.

    - original\_shipping\_tax\_total: (\`number\`) The original shipping tax total of the cart.

    - promotions: (\[StoreCartPromotion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartPromotion/page.mdx)\[]) The promotions applied to the cart.

    - region\_id: (\`string\`) The ID of the region the cart belongs to.

    - customer\_id: (\`string\`) The ID of the associated customer

    - sales\_channel\_id: (\`string\`) The ID of the sales channel the cart belongs to.

    - email: (\`string\`) The email of the customer that owns the cart.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Holds custom data in key-value pairs.

    - created\_at: (\`string\` \\| \`Date\`) When the cart was created.

    - updated\_at: (\`string\` \\| \`Date\`) When the cart was updated.

    - shipping\_address: (\[StoreCartAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartAddress/page.mdx)) The cart's shipping address.

    - billing\_address: (\[StoreCartAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartAddress/page.mdx)) The cart's billing address.

    - items: (\[StoreCartLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartLineItem/page.mdx)\[]) The cart's items.

    - shipping\_methods: (\[StoreCartShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartShippingMethod/page.mdx)\[]) The cart's shipping methods.

    - payment\_collection: (\[StorePaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StorePaymentCollection/page.mdx)) The cart's payment collection.

    - region: (\[StoreRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreRegion/page.mdx)) The cart's region

***

## complete

This method completes a cart and places the order. It's the last step of the checkout flow.
The method sends a request to the [Complete Cart](https://docs.medusajs.com/api/store#carts_postcartsidcomplete)
API route.

Related guide: [Learn how to complete cart in checkout flow](https://docs.medusajs.com/resources/storefront-development/checkout/complete-cart).

### Example

```ts
sdk.store.cart.complete("cart_123")
.then((data) => {
  if(data.type === "cart") {
    // an error occurred
    console.log(data.error, data.cart)
  } else {
    // order placed successfully
    console.log(data.order)
  }
})
```

### Parameters

- cartId: (\`string\`) The cart's ID.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the created order.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreCompleteCartResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.StoreCompleteCartResponse/page.mdx)\&#62;) The order's details, if it was placed successfully. Otherwise, the cart is returned with an error.

  - type: (\`"cart"\`) The response's type. If \`cart\`, then an error has occurred.

  - cart: (\[StoreCart]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCart/page.mdx)) The cart's details.

    - id: (\`string\`) The ID of the cart.

    - currency\_code: (\`string\`) The currency of the cart

    - original\_item\_total: (\`number\`) The original item total of the cart.

    - original\_item\_subtotal: (\`number\`) The original item subtotal of the cart.

    - original\_item\_tax\_total: (\`number\`) The original item tax total of the cart.

    - item\_total: (\`number\`) The item total of the cart.

    - item\_subtotal: (\`number\`) The item subtotal of the cart.

    - item\_tax\_total: (\`number\`) The item tax total of the cart.

    - original\_total: (\`number\`) The original total of the cart.

    - original\_subtotal: (\`number\`) The original subtotal of the cart.

    - original\_tax\_total: (\`number\`) The original tax total of the cart.

    - total: (\`number\`) The total of the cart.

    - subtotal: (\`number\`) The subtotal of the cart. (Excluding taxes)

    - tax\_total: (\`number\`) The tax total of the cart.

    - discount\_total: (\`number\`) The discount total of the cart.

    - discount\_tax\_total: (\`number\`) The discount tax total of the cart.

    - gift\_card\_total: (\`number\`) The gift card total of the cart.

    - gift\_card\_tax\_total: (\`number\`) The gift card tax total of the cart.

    - shipping\_total: (\`number\`) The shipping total of the cart.

    - shipping\_subtotal: (\`number\`) The shipping subtotal of the cart.

    - shipping\_tax\_total: (\`number\`) The shipping tax total of the cart.

    - original\_shipping\_total: (\`number\`) The original shipping total of the cart.

    - original\_shipping\_subtotal: (\`number\`) The original shipping subtotal of the cart.

    - original\_shipping\_tax\_total: (\`number\`) The original shipping tax total of the cart.

    - promotions: (\[StoreCartPromotion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartPromotion/page.mdx)\[]) The promotions applied to the cart.

    - region\_id: (\`string\`) The ID of the region the cart belongs to.

    - customer\_id: (\`string\`) The ID of the associated customer

    - sales\_channel\_id: (\`string\`) The ID of the sales channel the cart belongs to.

    - email: (\`string\`) The email of the customer that owns the cart.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Holds custom data in key-value pairs.

    - created\_at: (\`string\` \\| \`Date\`) When the cart was created.

    - updated\_at: (\`string\` \\| \`Date\`) When the cart was updated.

    - shipping\_address: (\[StoreCartAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartAddress/page.mdx)) The cart's shipping address.

    - billing\_address: (\[StoreCartAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartAddress/page.mdx)) The cart's billing address.

    - items: (\[StoreCartLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartLineItem/page.mdx)\[]) The cart's items.

    - shipping\_methods: (\[StoreCartShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartShippingMethod/page.mdx)\[]) The cart's shipping methods.

    - payment\_collection: (\[StorePaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StorePaymentCollection/page.mdx)) The cart's payment collection.

    - region: (\[StoreRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreRegion/page.mdx)) The cart's region

  - error: (\`object\`) The error that occurred while completing the cart.

    - message: (\`string\`) The error message.

    - name: (\`string\`) The error name.

    - type: (\`string\`) The error type.

  - order: (\[StoreOrder]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrder/page.mdx)) The order's details.

    - id: (\`string\`) The order's ID.

    - region\_id: (\`null\` \\| \`string\`) The ID of the associated region.

    - customer\_id: (\`null\` \\| \`string\`) The ID of the customer that placed the order.

    - sales\_channel\_id: (\`null\` \\| \`string\`) The ID of the sales channel the order was placed in.

    - email: (\`null\` \\| \`string\`) The email of the customer that placed the order.

    - currency\_code: (\`string\`) The order's currency code.

    - status: (\`string\`) The order's status.

    - payment\_status: (\[PaymentStatus]\(../../../../../types/types/types.PaymentStatus/page.mdx)) The order's payment status.

    - fulfillment\_status: (\[FulfillmentStatus]\(../../../../../types/types/types.FulfillmentStatus/page.mdx)) The order's fulfillment status.

    - summary: (\[BaseOrderSummary]\(../../../../../types/interfaces/types.BaseOrderSummary/page.mdx)) The order's summary.

    - created\_at: (\`string\` \\| \`Date\`) The date the order was created.

    - updated\_at: (\`string\` \\| \`Date\`) The date the order was updated.

    - original\_item\_total: (\`number\`) The total of the order's items including taxes, excluding promotions.

    - original\_item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - original\_item\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - item\_total: (\`number\`) The total of the order's items including taxes and promotions.

    - item\_subtotal: (\`number\`) The total of the order's items excluding taxes, including promotions.

    - item\_tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - item\_discount\_total: (\`number\`) The promotion total applied on the order's items.

    - original\_total: (\`number\`) The total of the order including taxes, excluding promotions.

    - original\_subtotal: (\`number\`) The total of the order excluding taxes, including promotions.

    - original\_tax\_total: (\`number\`) The tax total applied on the order's items, excluding promotions.

    - total: (\`number\`) The total of the order including taxes and promotions.

    - subtotal: (\`number\`) The total of the order excluding taxes and promotions.

    - tax\_total: (\`number\`) The tax total applied on the order's items, including promotions.

    - discount\_total: (\`number\`) The total amount discounted.

    - discount\_tax\_total: (\`number\`) The tax total applied on the order's discounted amount.

    - gift\_card\_total: (\`number\`) The total gift card amount.

    - gift\_card\_tax\_total: (\`number\`) The tax total applied on the order's gift card amount.

    - shipping\_total: (\`number\`) The total of the order's shipping methods including taxes and promotions.

    - shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, including promotions.

    - shipping\_discount\_total: (\`number\`) The promotion total applied on the order's shipping methods.

    - original\_shipping\_total: (\`number\`) The total of the order's shipping methods including taxes, excluding promotions.

    - original\_shipping\_subtotal: (\`number\`) The total of the order's shipping methods excluding taxes, including promotions.

    - original\_shipping\_tax\_total: (\`number\`) The tax total applied on the order's shipping methods, excluding promotions.

    - credit\_line\_total: (\`number\`) The total of the order's credit lines.

    - items: (\`null\` \\| \[StoreOrderLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderLineItem/page.mdx)\[]) The order's items.

    - shipping\_methods: (\`null\` \\| \[StoreOrderShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderShippingMethod/page.mdx)\[]) The order's shipping methods.

    - display\_id: (\`number\`) The order's display ID.

    - custom\_display\_id: (\`string\`) The order's custom display ID.

    - transactions: (\[BaseOrderTransaction]\(../../../../../types/interfaces/types.BaseOrderTransaction/page.mdx)\[]) The order's transactions.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Key-value pairs of custom data.

    - shipping\_address: (\`null\` \\| \[StoreOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderAddress/page.mdx)) The order's shipping address.

    - billing\_address: (\`null\` \\| \[StoreOrderAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderAddress/page.mdx)) The order's billing address.

    - payment\_collections: (\[StorePaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StorePaymentCollection/page.mdx)\[]) The order's payment collections.

    - fulfillments: (\[StoreOrderFulfillment]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreOrderFulfillment/page.mdx)\[]) The order's fulfillments.

    - customer: (\[StoreCustomer]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCustomer/page.mdx)) The customer that placed the order.

***

## transferCart

This method updates the customer of a cart.

### Example

```ts
// TODO must be authenticated as the customer to set the cart's customer
sdk.store.cart.transferCart("cart_123")
.then(({ cart }) => {
  console.log(cart)
})
```

### Parameters

- id: (\`string\`) The cart's ID.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields to retrieve in the cart.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../../admin/types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[StoreCartResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartResponse/page.mdx)\&#62;) The updated cart.

  - cart: (\[StoreCart]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCart/page.mdx)) The cart's details.

    - id: (\`string\`) The ID of the cart.

    - currency\_code: (\`string\`) The currency of the cart

    - original\_item\_total: (\`number\`) The original item total of the cart.

    - original\_item\_subtotal: (\`number\`) The original item subtotal of the cart.

    - original\_item\_tax\_total: (\`number\`) The original item tax total of the cart.

    - item\_total: (\`number\`) The item total of the cart.

    - item\_subtotal: (\`number\`) The item subtotal of the cart.

    - item\_tax\_total: (\`number\`) The item tax total of the cart.

    - original\_total: (\`number\`) The original total of the cart.

    - original\_subtotal: (\`number\`) The original subtotal of the cart.

    - original\_tax\_total: (\`number\`) The original tax total of the cart.

    - total: (\`number\`) The total of the cart.

    - subtotal: (\`number\`) The subtotal of the cart. (Excluding taxes)

    - tax\_total: (\`number\`) The tax total of the cart.

    - discount\_total: (\`number\`) The discount total of the cart.

    - discount\_tax\_total: (\`number\`) The discount tax total of the cart.

    - gift\_card\_total: (\`number\`) The gift card total of the cart.

    - gift\_card\_tax\_total: (\`number\`) The gift card tax total of the cart.

    - shipping\_total: (\`number\`) The shipping total of the cart.

    - shipping\_subtotal: (\`number\`) The shipping subtotal of the cart.

    - shipping\_tax\_total: (\`number\`) The shipping tax total of the cart.

    - original\_shipping\_total: (\`number\`) The original shipping total of the cart.

    - original\_shipping\_subtotal: (\`number\`) The original shipping subtotal of the cart.

    - original\_shipping\_tax\_total: (\`number\`) The original shipping tax total of the cart.

    - promotions: (\[StoreCartPromotion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartPromotion/page.mdx)\[]) The promotions applied to the cart.

    - region\_id: (\`string\`) The ID of the region the cart belongs to.

    - customer\_id: (\`string\`) The ID of the associated customer

    - sales\_channel\_id: (\`string\`) The ID of the sales channel the cart belongs to.

    - email: (\`string\`) The email of the customer that owns the cart.

    - metadata: (\`null\` \\| \`Record\<string, unknown>\`) Holds custom data in key-value pairs.

    - created\_at: (\`string\` \\| \`Date\`) When the cart was created.

    - updated\_at: (\`string\` \\| \`Date\`) When the cart was updated.

    - shipping\_address: (\[StoreCartAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartAddress/page.mdx)) The cart's shipping address.

    - billing\_address: (\[StoreCartAddress]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartAddress/page.mdx)) The cart's billing address.

    - items: (\[StoreCartLineItem]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartLineItem/page.mdx)\[]) The cart's items.

    - shipping\_methods: (\[StoreCartShippingMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreCartShippingMethod/page.mdx)\[]) The cart's shipping methods.

    - payment\_collection: (\[StorePaymentCollection]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StorePaymentCollection/page.mdx)) The cart's payment collection.

    - region: (\[StoreRegion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.StoreRegion/page.mdx)) The cart's region
