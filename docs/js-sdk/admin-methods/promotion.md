# promotion - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.promotion` set of methods used to send requests to Medusa's Admin API routes.

## retrieve

This method retrieves a promotion by its ID. It sends a request to the
[Retrieve Promotion](https://docs.medusajs.com/api/admin#promotions_getpromotionsid)
API route.

### Example

To retrieve a promotion by its ID:

```ts
sdk.admin.promotion.retrieve("promo_123")
.then(({ promotion }) => {
  console.log(promotion)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.promotion.retrieve("promo_123", {
  fields: "id,*application_method"
})
.then(({ promotion }) => {
  console.log(promotion)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/admin#select-fields-and-relations).

### Parameters

- id: (\`string\`) The promotion's ID.
- query: (\[AdminGetPromotionParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetPromotionParams/page.mdx)) Configure the fields to retrieve in the promotion.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminPromotionResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPromotionResponse/page.mdx)\&#62;) The promotion's details.

  - promotion: (\[AdminPromotion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPromotion/page.mdx)) The promotion's details.

    - id: (\`string\`)

    - created\_at: (\`string\`)

    - updated\_at: (\`string\`)

    - deleted\_at: (\`null\` \\| \`string\`)

    - application\_method: (\[AdminApplicationMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminApplicationMethod/page.mdx)) The promotion's application method.

    - rules: (\[AdminPromotionRule]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPromotionRule/page.mdx)\[]) The rules for the promotion.

    - code: (\`string\`)

    - type: (\[PromotionTypeValues]\(../../../../../promotion/types/promotion.PromotionTypeValues/page.mdx)) The promotion's possible types.

    - is\_automatic: (\`boolean\`)

    - is\_tax\_inclusive: (\`boolean\`)

    - limit: (\`null\` \\| \`number\`)

    - used: (\`number\`)

    - status: (\[PromotionStatusValues]\(../../../../../promotion/types/promotion.PromotionStatusValues/page.mdx)) The promotion's possible types.

    - campaign\_id: (\`string\`)

    - campaign: (\[AdminCampaign]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCampaign/page.mdx))

***

## list

This method retrieves a list of promotions. It sends a request to the
[List Promotions](https://docs.medusajs.com/api/admin#promotions_getpromotions)
API route.

### Example

To retrieve the list of promotions:

```ts
sdk.admin.promotion.list()
.then(({ promotions, count, limit, offset }) => {
  console.log(promotions)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.promotion.list({
  limit: 10,
  offset: 10
})
.then(({ promotions, count, limit, offset }) => {
  console.log(promotions)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each promotion:

```ts
sdk.admin.promotion.list({
  fields: "id,*application_method"
})
.then(({ promotions, count, limit, offset }) => {
  console.log(promotions)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/admin#select-fields-and-relations).

### Parameters

- query: (\[AdminGetPromotionsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetPromotionsParams/page.mdx)) Filters and pagination configurations.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - q: (\`string\`) Search for a promotion by its searchable

  - code: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by promotion code.

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

  - id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by promotion ID.

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

  - campaign\_id: (\`string\` \\| \`string\`\[]) Filter by campaign ID to retrieve promotions by campaign.

  - application\_method: (\`object\`) Filter by the promotion's application method.

    - currency\_code: (\`string\` \\| \`string\`\[]) Filter by the promotion's application method currency code.

  - currency\_code: (\`string\` \\| \`string\`\[]) Filter by the promotion's currency code.

  - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the promotion's created date.

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

  - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the promotion's updated date.

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

  - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the promotion's deleted date.

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

  - application\_method\_type: (\[ApplicationMethodTypeValues]\(../../../../../promotion/types/promotion.ApplicationMethodTypeValues/page.mdx) \\| \[ApplicationMethodTypeValues]\(../../../../../promotion/types/promotion.ApplicationMethodTypeValues/page.mdx)\[]) Filter by the promotion's application method type.

  - $and: (\[AdminGetPromotionsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetPromotionsParams/page.mdx)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`) Search for a promotion by its searchable

    - code: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by promotion code.

    - id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by promotion ID.

    - campaign\_id: (\`string\` \\| \`string\`\[]) Filter by campaign ID to retrieve promotions by campaign.

    - application\_method: (\`object\`) Filter by the promotion's application method.

    - currency\_code: (\`string\` \\| \`string\`\[]) Filter by the promotion's currency code.

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the promotion's created date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the promotion's updated date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the promotion's deleted date.

    - application\_method\_type: (\[ApplicationMethodTypeValues]\(../../../../../promotion/types/promotion.ApplicationMethodTypeValues/page.mdx) \\| \[ApplicationMethodTypeValues]\(../../../../../promotion/types/promotion.ApplicationMethodTypeValues/page.mdx)\[]) Filter by the promotion's application method type.

    - $and: (\[AdminGetPromotionsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetPromotionsParams/page.mdx)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: (\[AdminGetPromotionsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetPromotionsParams/page.mdx)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

  - $or: (\[AdminGetPromotionsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetPromotionsParams/page.mdx)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`) Search for a promotion by its searchable

    - code: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by promotion code.

    - id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by promotion ID.

    - campaign\_id: (\`string\` \\| \`string\`\[]) Filter by campaign ID to retrieve promotions by campaign.

    - application\_method: (\`object\`) Filter by the promotion's application method.

    - currency\_code: (\`string\` \\| \`string\`\[]) Filter by the promotion's currency code.

    - created\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the promotion's created date.

    - updated\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the promotion's updated date.

    - deleted\_at: (\[OperatorMap]\(../../../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filter by the promotion's deleted date.

    - application\_method\_type: (\[ApplicationMethodTypeValues]\(../../../../../promotion/types/promotion.ApplicationMethodTypeValues/page.mdx) \\| \[ApplicationMethodTypeValues]\(../../../../../promotion/types/promotion.ApplicationMethodTypeValues/page.mdx)\[]) Filter by the promotion's application method type.

    - $and: (\[AdminGetPromotionsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetPromotionsParams/page.mdx)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: (\[AdminGetPromotionsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetPromotionsParams/page.mdx)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminPromotionListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminPromotionListResponse/page.mdx)\&#62;) The list of promotions.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## create

This method creates a new promotion. It sends a request to the
[Create Promotion](https://docs.medusajs.com/api/admin#promotions_postpromotions)
API route.

### Example

```ts
sdk.admin.promotion.create({
  name: "My Promotion",
  description: "This is a test promotion",
  code: "PROMO123",
  starts_at: "2021-01-01",
  ends_at: "2021-01-01",
})
.then(({ promotion }) => {
  console.log(promotion)
})
```

### Parameters

- payload: (\[AdminCreatePromotion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreatePromotion/page.mdx)) The promotion to create.

  - code: (\`string\`) The promotion's code.

  - type: (\[PromotionTypeValues]\(../../../../../promotion/types/promotion.PromotionTypeValues/page.mdx)) The type of promotion.

  - application\_method: (\[AdminCreateApplicationMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateApplicationMethod/page.mdx)) The application method of the promotion.

    - value: (\`number\`) The value of the application method.

    - type: (\[ApplicationMethodTypeValues]\(../../../../../promotion/types/promotion.ApplicationMethodTypeValues/page.mdx)) The type of the application method.

    - target\_type: (\[ApplicationMethodTargetTypeValues]\(../../../../../promotion/types/promotion.ApplicationMethodTargetTypeValues/page.mdx)) The target type of the application method indicating whether the associated promotion is applied
      to the cart's items, shipping methods, or the whole order.

    - description: (\`null\` \\| \`string\`) The description of the application method.

    - currency\_code: (\`null\` \\| \`string\`) The currency code of the application method.

    - max\_quantity: (\`null\` \\| \`number\`) The max quantity allowed in the cart for the associated promotion to be applied.

    - allocation: (\[ApplicationMethodAllocationValues]\(../../../../../promotion/types/promotion.ApplicationMethodAllocationValues/page.mdx)) The allocation value that indicates whether the associated promotion is applied on each
      item in a cart or split between the items in the cart.

    - target\_rules: (\[AdminCreatePromotionRule]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreatePromotionRule/page.mdx)\[]) The target rules of the application method.

    - buy\_rules: (\[AdminCreatePromotionRule]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreatePromotionRule/page.mdx)\[]) The buy rules of the application method.

    - apply\_to\_quantity: (\`null\` \\| \`number\`) The quantity of the application method.

    - buy\_rules\_min\_quantity: (\`null\` \\| \`number\`) The minimum quantity required for a \`buyget\` promotion to be applied. For example,
      if the promotion is a "Buy 2 shirts get 1 free", the value of this attribute is 2.

  - is\_automatic: (\`boolean\`) Whether the promotion is applied automatically
    or requires the customer to manually apply it
    by entering the code at checkout.

  - is\_tax\_inclusive: (\`boolean\`) Whether the promotion is tax inclusive.

  - campaign\_id: (\`null\` \\| \`string\`) The ID of the campaign that the promotion belongs to.

  - campaign: (\[AdminCreateCampaign]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateCampaign/page.mdx)) The campaign that the promotion belongs to.

    - name: (\`string\`) The campaign's name.

    - campaign\_identifier: (\`string\`) The campaign's identifier.

    - description: (\`null\` \\| \`string\`) The campaign's description.

    - starts\_at: (\`null\` \\| \`Date\`) The date the campaign and its promotions start at.

    - ends\_at: (\`null\` \\| \`Date\`) The date the campaign and its promotions end at.

    - budget: (\`null\` \\| \`object\`) The campaign's budget.

  - limit: (\`null\` \\| \`number\`) The maximum number of times this promotion can be used.

  - rules: (\[AdminCreatePromotionRule]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreatePromotionRule/page.mdx)\[]) The rules of the promotion.

    - operator: (\[PromotionRuleOperatorValues]\(../../../../../promotion/types/promotion.PromotionRuleOperatorValues/page.mdx)) The operator used to check whether the buy rule applies on a cart.
      For example, \`eq\` means that the cart's value for the specified attribute
      must match the specified value.

    - attribute: (\`string\`) The attribute to compare against when checking whether a promotion can be applied on a cart.

    - values: (\`string\` \\| \`string\`\[]) The value to compare against when checking whether a promotion can be applied on a cart.

    - description: (\`null\` \\| \`string\`) The description of the promotion rule.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminPromotionResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPromotionResponse/page.mdx)\&#62;) The promotion's details.

  - promotion: (\[AdminPromotion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPromotion/page.mdx)) The promotion's details.

    - id: (\`string\`)

    - created\_at: (\`string\`)

    - updated\_at: (\`string\`)

    - deleted\_at: (\`null\` \\| \`string\`)

    - application\_method: (\[AdminApplicationMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminApplicationMethod/page.mdx)) The promotion's application method.

    - rules: (\[AdminPromotionRule]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPromotionRule/page.mdx)\[]) The rules for the promotion.

    - code: (\`string\`)

    - type: (\[PromotionTypeValues]\(../../../../../promotion/types/promotion.PromotionTypeValues/page.mdx)) The promotion's possible types.

    - is\_automatic: (\`boolean\`)

    - is\_tax\_inclusive: (\`boolean\`)

    - limit: (\`null\` \\| \`number\`)

    - used: (\`number\`)

    - status: (\[PromotionStatusValues]\(../../../../../promotion/types/promotion.PromotionStatusValues/page.mdx)) The promotion's possible types.

    - campaign\_id: (\`string\`)

    - campaign: (\[AdminCampaign]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCampaign/page.mdx))

***

## update

This method updates a promotion. It sends a request to the
[Update Promotion](https://docs.medusajs.com/api/admin#promotions_postpromotionsid)
API route.

### Example

```ts
sdk.admin.promotion.update("promo_123", {
  code: "PROMO123",
})
.then(({ promotion }) => {
  console.log(promotion)
})
```

### Parameters

- id: (\`string\`) The promotion's ID.
- payload: (\[AdminUpdatePromotion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdatePromotion/page.mdx)) The details to update in the promotion.

  - code: (\`string\`) The promotion's code.

  - is\_automatic: (\`boolean\`) Whether the promotion is applied automatically
    or requires the customer to manually apply it
    by entering the code at checkout.

  - is\_tax\_inclusive: (\`boolean\`) Whether the promotion is tax inclusive.

  - type: (\[PromotionTypeValues]\(../../../../../promotion/types/promotion.PromotionTypeValues/page.mdx)) The type of promotion.

  - status: (\[PromotionStatusValues]\(../../../../../promotion/types/promotion.PromotionStatusValues/page.mdx)) The status of the promotion.

  - campaign\_id: (\`null\` \\| \`string\`) The ID of the campaign that the promotion belongs to.

  - campaign: (\[AdminCreateCampaign]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateCampaign/page.mdx)) The campaign that the promotion belongs to.

    - name: (\`string\`) The campaign's name.

    - campaign\_identifier: (\`string\`) The campaign's identifier.

    - description: (\`null\` \\| \`string\`) The campaign's description.

    - starts\_at: (\`null\` \\| \`Date\`) The date the campaign and its promotions start at.

    - ends\_at: (\`null\` \\| \`Date\`) The date the campaign and its promotions end at.

    - budget: (\`null\` \\| \`object\`) The campaign's budget.

  - application\_method: (\[AdminUpdateApplicationMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateApplicationMethod/page.mdx)) The application method of the promotion.

    - description: (\`null\` \\| \`string\`) The description of the application method.

    - value: (\`number\`) The value of the application method.

    - max\_quantity: (\`null\` \\| \`number\`) The max quantity allowed in the cart for the associated promotion to be applied.

    - currency\_code: (\`null\` \\| \`string\`) The currency code of the application method.

    - type: (\[ApplicationMethodTypeValues]\(../../../../../promotion/types/promotion.ApplicationMethodTypeValues/page.mdx)) The type of the application method.

    - target\_type: (\[ApplicationMethodTargetTypeValues]\(../../../../../promotion/types/promotion.ApplicationMethodTargetTypeValues/page.mdx)) The target type of the application method indicating whether the associated promotion is applied
      to the cart's items, shipping methods, or the whole order.

    - allocation: (\[ApplicationMethodAllocationValues]\(../../../../../promotion/types/promotion.ApplicationMethodAllocationValues/page.mdx)) The allocation value that indicates whether the associated promotion is applied on each
      item in a cart or split between the items in the cart.

    - target\_rules: (\[AdminCreatePromotionRule]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreatePromotionRule/page.mdx)\[]) The target rules of the application method.

    - buy\_rules: (\[AdminCreatePromotionRule]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreatePromotionRule/page.mdx)\[]) The buy rules of the application method.

    - apply\_to\_quantity: (\`null\` \\| \`number\`) The quantity of the application method.

    - buy\_rules\_min\_quantity: (\`null\` \\| \`number\`) The minimum quantity required for a \`buyget\` promotion to be applied. For example,
      if the promotion is a "Buy 2 shirts get 1 free", the value of this attribute is 2.

  - limit: (\`null\` \\| \`number\`) The maximum number of times this promotion can be used.

  - rules: (\[AdminCreatePromotionRule]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreatePromotionRule/page.mdx)\[]) The rules of the promotion.

    - operator: (\[PromotionRuleOperatorValues]\(../../../../../promotion/types/promotion.PromotionRuleOperatorValues/page.mdx)) The operator used to check whether the buy rule applies on a cart.
      For example, \`eq\` means that the cart's value for the specified attribute
      must match the specified value.

    - attribute: (\`string\`) The attribute to compare against when checking whether a promotion can be applied on a cart.

    - values: (\`string\` \\| \`string\`\[]) The value to compare against when checking whether a promotion can be applied on a cart.

    - description: (\`null\` \\| \`string\`) The description of the promotion rule.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminPromotionResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPromotionResponse/page.mdx)\&#62;) The promotion's details.

  - promotion: (\[AdminPromotion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPromotion/page.mdx)) The promotion's details.

    - id: (\`string\`)

    - created\_at: (\`string\`)

    - updated\_at: (\`string\`)

    - deleted\_at: (\`null\` \\| \`string\`)

    - application\_method: (\[AdminApplicationMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminApplicationMethod/page.mdx)) The promotion's application method.

    - rules: (\[AdminPromotionRule]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPromotionRule/page.mdx)\[]) The rules for the promotion.

    - code: (\`string\`)

    - type: (\[PromotionTypeValues]\(../../../../../promotion/types/promotion.PromotionTypeValues/page.mdx)) The promotion's possible types.

    - is\_automatic: (\`boolean\`)

    - is\_tax\_inclusive: (\`boolean\`)

    - limit: (\`null\` \\| \`number\`)

    - used: (\`number\`)

    - status: (\[PromotionStatusValues]\(../../../../../promotion/types/promotion.PromotionStatusValues/page.mdx)) The promotion's possible types.

    - campaign\_id: (\`string\`)

    - campaign: (\[AdminCampaign]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCampaign/page.mdx))

***

## delete

This method deletes a promotion. It sends a request to the
[Delete Promotion](https://docs.medusajs.com/api/admin#promotions_deletepromotionsid)
API route.

### Example

```ts
sdk.admin.promotion.delete("promo_123")
.then(({ promotion }) => {
  console.log(promotion)
})
```

### Parameters

- id: (\`string\`) The promotion's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[DeleteResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.DeleteResponse/page.mdx)\&#60;"promotion"\&#62;\&#62;) The deleted promotion's details.

  - "promotion": (\`"promotion"\`)

***

## addRules

This method creates and adds rules to a promotion. It can be the promotion's rules,
or its application method's buy or target rules. That depends on the rule type
you specify as a parameter.

- If you set the `ruleType` to `rules`, the method sends a request to the
  [Manage Promotion's Rules API Route](https://docs.medusajs.com/api/admin#promotions_postpromotionsidrulesbatch).
- If you set the `ruleType` to `buy-rules`, the method sends a request to the
  [Manage Promotion's Buy Rules API Route](https://docs.medusajs.com/api/admin#promotions_postpromotionsidbuyrulesbatch).
- If you set the `ruleType` to `target-rules`, the method sends a request to the
  [Manage Promotion's Target Rules API Route](https://docs.medusajs.com/api/admin#promotions_postpromotionsidtargetrulesbatch).

### Example

```ts
sdk.admin.promotion.addRules("promo_123", "rules", {
  rules: [
    {
      operator: "eq",
      attribute: "product_id",
      values: ["prod_123"]
    }
  ]
})
.then(({ promotion }) => {
  console.log(promotion)
})
```

### Parameters

- id: (\`string\`) The promotion's ID.
- ruleType: (\`string\`) The type of rules to create.
- payload: (\[BatchAddPromotionRulesReq]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.BatchAddPromotionRulesReq/page.mdx)) The rules to create.

  - rules: (\[AdminCreatePromotionRule]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreatePromotionRule/page.mdx)\[]) The rules to add.

    - operator: (\[PromotionRuleOperatorValues]\(../../../../../promotion/types/promotion.PromotionRuleOperatorValues/page.mdx)) The operator used to check whether the buy rule applies on a cart.
      For example, \`eq\` means that the cart's value for the specified attribute
      must match the specified value.

    - attribute: (\`string\`) The attribute to compare against when checking whether a promotion can be applied on a cart.

    - values: (\`string\` \\| \`string\`\[]) The value to compare against when checking whether a promotion can be applied on a cart.

    - description: (\`null\` \\| \`string\`) The description of the promotion rule.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminPromotionResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPromotionResponse/page.mdx)\&#62;) The promotion's details.

  - promotion: (\[AdminPromotion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPromotion/page.mdx)) The promotion's details.

    - id: (\`string\`)

    - created\_at: (\`string\`)

    - updated\_at: (\`string\`)

    - deleted\_at: (\`null\` \\| \`string\`)

    - application\_method: (\[AdminApplicationMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminApplicationMethod/page.mdx)) The promotion's application method.

    - rules: (\[AdminPromotionRule]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPromotionRule/page.mdx)\[]) The rules for the promotion.

    - code: (\`string\`)

    - type: (\[PromotionTypeValues]\(../../../../../promotion/types/promotion.PromotionTypeValues/page.mdx)) The promotion's possible types.

    - is\_automatic: (\`boolean\`)

    - is\_tax\_inclusive: (\`boolean\`)

    - limit: (\`null\` \\| \`number\`)

    - used: (\`number\`)

    - status: (\[PromotionStatusValues]\(../../../../../promotion/types/promotion.PromotionStatusValues/page.mdx)) The promotion's possible types.

    - campaign\_id: (\`string\`)

    - campaign: (\[AdminCampaign]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCampaign/page.mdx))

***

## updateRules

This method updates the rules of a promotion. It can be the promotion's rules,
or its application method's buy or target rules. That depends on the rule type
you specify as a parameter.

- If you set the `ruleType` to `rules`, the method sends a request to the
  [Manage Promotion's Rules API Route](https://docs.medusajs.com/api/admin#promotions_postpromotionsidrulesbatch).
- If you set the `ruleType` to `buy-rules`, the method sends a request to the
  [Manage Promotion's Buy Rules API Route](https://docs.medusajs.com/api/admin#promotions_postpromotionsidbuyrulesbatch).
- If you set the `ruleType` to `target-rules`, the method sends a request to the
  [Manage Promotion's Target Rules API Route](https://docs.medusajs.com/api/admin#promotions_postpromotionsidtargetrulesbatch).

### Example

```ts
sdk.admin.promotion.updateRules("promo_123", "rules", {
  rules: [
    {
      id: "rule_123",
      operator: "ne",
    }
  ]
})
.then(({ promotion }) => {
  console.log(promotion)
})
```

### Parameters

- id: (\`string\`) The promotion's ID.
- ruleType: (\`string\`) The type of rules to update.
- payload: (\[BatchUpdatePromotionRulesReq]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.BatchUpdatePromotionRulesReq/page.mdx)) The rules to update.

  - rules: (\[AdminUpdatePromotionRule]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdatePromotionRule/page.mdx)\[]) The rules to update.

    - id: (\`string\`)

    - values: (\`string\` \\| \`string\`\[])

    - operator: (\[PromotionRuleOperatorValues]\(../../../../../promotion/types/promotion.PromotionRuleOperatorValues/page.mdx)) The possible operators to use in a promotion rule.

    - description: (\`null\` \\| \`string\`)

    - attribute: (\`string\`)
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminPromotionResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPromotionResponse/page.mdx)\&#62;) The promotion's details.

  - promotion: (\[AdminPromotion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPromotion/page.mdx)) The promotion's details.

    - id: (\`string\`)

    - created\_at: (\`string\`)

    - updated\_at: (\`string\`)

    - deleted\_at: (\`null\` \\| \`string\`)

    - application\_method: (\[AdminApplicationMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminApplicationMethod/page.mdx)) The promotion's application method.

    - rules: (\[AdminPromotionRule]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPromotionRule/page.mdx)\[]) The rules for the promotion.

    - code: (\`string\`)

    - type: (\[PromotionTypeValues]\(../../../../../promotion/types/promotion.PromotionTypeValues/page.mdx)) The promotion's possible types.

    - is\_automatic: (\`boolean\`)

    - is\_tax\_inclusive: (\`boolean\`)

    - limit: (\`null\` \\| \`number\`)

    - used: (\`number\`)

    - status: (\[PromotionStatusValues]\(../../../../../promotion/types/promotion.PromotionStatusValues/page.mdx)) The promotion's possible types.

    - campaign\_id: (\`string\`)

    - campaign: (\[AdminCampaign]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCampaign/page.mdx))

***

## removeRules

This method removes rules from a promotion. It can be the promotion's rules,
or its application method's buy or target rules. That depends on the rule type
you specify as a parameter.

- If you set the `ruleType` to `rules`, the method sends a request to the
  [Manage Promotion's Rules API Route](https://docs.medusajs.com/api/admin#promotions_postpromotionsidrulesbatch).
- If you set the `ruleType` to `buy-rules`, the method sends a request to the
  [Manage Promotion's Buy Rules API Route](https://docs.medusajs.com/api/admin#promotions_postpromotionsidbuyrulesbatch).
- If you set the `ruleType` to `target-rules`, the method sends a request to the
  [Manage Promotion's Target Rules API Route](https://docs.medusajs.com/api/admin#promotions_postpromotionsidtargetrulesbatch).

### Example

```ts
sdk.admin.promotion.removeRules("promo_123", "rules", {
  rule_ids: ["rule_123"]
})
.then(({ promotion }) => {
  console.log(promotion)
})
```

### Parameters

- id: (\`string\`) The promotion's ID.
- ruleType: (\`string\`) The type of rules to remove.
- payload: (\[BatchRemovePromotionRulesReq]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.BatchRemovePromotionRulesReq/page.mdx)) The rules to remove.

  - rule\_ids: (\`string\`\[]) The IDs of the rules to remove.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminPromotionResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPromotionResponse/page.mdx)\&#62;) The promotion's details.

  - promotion: (\[AdminPromotion]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPromotion/page.mdx)) The promotion's details.

    - id: (\`string\`)

    - created\_at: (\`string\`)

    - updated\_at: (\`string\`)

    - deleted\_at: (\`null\` \\| \`string\`)

    - application\_method: (\[AdminApplicationMethod]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminApplicationMethod/page.mdx)) The promotion's application method.

    - rules: (\[AdminPromotionRule]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPromotionRule/page.mdx)\[]) The rules for the promotion.

    - code: (\`string\`)

    - type: (\[PromotionTypeValues]\(../../../../../promotion/types/promotion.PromotionTypeValues/page.mdx)) The promotion's possible types.

    - is\_automatic: (\`boolean\`)

    - is\_tax\_inclusive: (\`boolean\`)

    - limit: (\`null\` \\| \`number\`)

    - used: (\`number\`)

    - status: (\[PromotionStatusValues]\(../../../../../promotion/types/promotion.PromotionStatusValues/page.mdx)) The promotion's possible types.

    - campaign\_id: (\`string\`)

    - campaign: (\[AdminCampaign]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCampaign/page.mdx))

***

## listRules

This method retrieves the rules of a promotion. It can be the promotion's rules,
or its application method's buy or target rules. That depends on the rule type
you specify as a parameter.

This method sends a request to the
[List Rules of a Promotion API Route](https://docs.medusajs.com/api/admin#promotions_getpromotionsidrule_type)

### Example

```ts
sdk.admin.promotion.listRules("promo_123", "rules")
.then(({ rules }) => {
  console.log(rules)
})
```

### Parameters

- id: (\`null\` \\| \`string\`) The promotion's ID.
- ruleType: (\`string\`) The type of rules to retrieve. Can be \`rules\`, \`buy-rules\`, or \`target-rules\`.
- query: (\[AdminGetPromotionRuleParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetPromotionRuleParams/page.mdx)) Configure the fields to retrieve in the rules.

  - promotion\_type: (\[PromotionTypeValues]\(../../../../../promotion/types/promotion.PromotionTypeValues/page.mdx)) The type of promotion to retrieve the attributes for.

  - application\_method\_type: (\[ApplicationMethodTypeValues]\(../../../../../promotion/types/promotion.ApplicationMethodTypeValues/page.mdx)) The type of application method to retrieve the attributes for.

  - application\_method\_target\_type: (\[ApplicationMethodTargetTypeValues]\(../../../../../promotion/types/promotion.ApplicationMethodTargetTypeValues/page.mdx)) The target type of application method to retrieve the attributes for.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminPromotionRuleListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminPromotionRuleListResponse/page.mdx)\&#62;) The promotion's rules.

  - rules: (\[AdminPromotionRule]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPromotionRule/page.mdx)\[]) The list of promotion rules.

    - id: (\`string\`) The rule's ID.

    - values: (\[BasePromotionRuleValue]\(../../../../../types/interfaces/types.BasePromotionRuleValue/page.mdx)\[]) The values to compare against when checking whether a promotion can be applied on a cart.

    - description: (\`null\` \\| \`string\`) The rule's description.

    - attribute: (\`string\`) The attribute to compare against when checking whether a promotion can be applied on a cart.

    - operator: (\[PromotionRuleOperatorValues]\(../../../../../promotion/types/promotion.PromotionRuleOperatorValues/page.mdx)) The operator used to check whether the buy rule applies on a cart.
      For example, \`eq\` means that the cart's value for the specified attribute
      must match the specified value.

***

## listRuleAttributes

Retrieve a list of potential rule attributes for the promotion and application method types specified in the query parameters. Only the attributes of the rule type specified in the path parameter are retrieved:

- If `rule_type` is `rules`, the attributes of the promotion's type are retrieved.
- If `rule_type` is `target-rules`, the target rules' attributes of the application method's type are retrieved.
- If `rule_type` is `buy-rules`, the buy rules' attributes of the application method's type are retrieved.

This method sends a request to the
[List Rule Attribute Options API Route](https://docs.medusajs.com/api/admin#promotions_getpromotionsruleattributeoptionsrule_type)

### Example

```ts
sdk.admin.promotion.listRuleAttributes("rules", "standard")
.then(({ attributes }) => {
  console.log(attributes)
})
```

### Parameters

- ruleType: (\`string\`) The type of rules to retrieve the attributes for. Can be \`rules\`, \`buy-rules\`, or \`target-rules\`.
- promotionType: (\`string\`) The type of promotion to retrieve the attributes for. It can be \`standard\` or \`buyget\`.
- applicationMethodTargetType: (\`string\`) The type of application method to retrieve the attributes for. It can be \`order\`, \`items\` (default) or \`shipping\_methods\`.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminRuleAttributeOptionsListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminRuleAttributeOptionsListResponse/page.mdx)\&#62;) The list of rule attributes.

  - attributes: (\[AdminRuleAttributeOption]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminRuleAttributeOption/page.mdx)\[]) The list of rule attribute options.

    - id: (\`string\`) The rule attribute option's ID.

    - value: (\`string\`) The rule attribute option's value.

    - label: (\`string\`) The rule attribute option's label.

    - operators: (\[BaseRuleOperatorOptions]\(../../../../../types/interfaces/types.BaseRuleOperatorOptions/page.mdx)\[]) The attribute option's operators.

***

## listRuleValues

Retrieve all potential values for promotion rules and target and buy rules based on the specified rule attribute and type.
For example, if you provide the ID of the `currency_code` rule attribute, and set `rule_type` to rules,
a list of currencies are retrieved in label-value pairs.

This method sends a request to the
[List Rule Values API Route](https://docs.medusajs.com/api/admin#promotions_getpromotionsrulevalueoptionsrule_typerule_attribute_id)

### Example

```ts
sdk.admin.promotion.listRuleValues("rules", "attr_123")
.then(({ values }) => {
  console.log(values)
})
```

### Parameters

- ruleType: (\`string\`) The type of rules to retrieve the values for. Can be \`rules\`, \`buy-rules\`, or \`target-rules\`.
- ruleValue: (\`string\`) The ID of the rule attribute to retrieve the values for.
- query: (\[AdminGetPromotionsRuleValueParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetPromotionsRuleValueParams/page.mdx)) Configure the fields to retrieve in the rule values.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - q: (\`string\`) Search for a rule value by its searchable

  - value: (\`string\` \\| \`string\`\[]) Filter by rule value.

  - application\_method\_target\_type: (\[ApplicationMethodTargetTypeValues]\(../../../../../promotion/types/promotion.ApplicationMethodTargetTypeValues/page.mdx)) The target type of application method to retrieve the attributes for.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminRuleValueOptionsListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminRuleValueOptionsListResponse/page.mdx)\&#62;) The list of rule values.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.
