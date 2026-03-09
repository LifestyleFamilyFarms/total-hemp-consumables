# campaign - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.campaign` set of methods used to send requests to Medusa's Admin API routes.

## retrieve

This method retrieves a campaign by its ID. It sends a request to the
[Get Campaign](https://docs.medusajs.com/api/admin#campaigns_getcampaignsid) API route.

### Example

To retrieve a campaign by its ID:

```ts
sdk.admin.campaign.retrieve("procamp_123")
.then(({ campaign }) => {
  console.log(campaign)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.campaign.retrieve("procamp_123", {
  fields: "id,*budget"
})
.then(({ campaign }) => {
  console.log(campaign)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- id: (\`string\`) The campaign's ID.
- query: (\[AdminGetCampaignParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetCampaignParams/page.mdx)) Configure the fields to retrieve in the campaign.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminCampaignResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCampaignResponse/page.mdx)\&#62;) The campaign's details.

  - campaign: (\[AdminCampaign]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCampaign/page.mdx)) The campaign's details.

    - id: (\`string\`) The campaign's ID.

    - name: (\`string\`) The campaign's name.

    - description: (\`string\`) The campaign's description.

    - currency: (\`string\`) The campaign's currency code.

    - campaign\_identifier: (\`string\`) The campaign's identifier.

    - starts\_at: (\`string\`) The date the campaign and its promotions start at.

    - ends\_at: (\`string\`) The date the campaign and its promotions end at.

    - budget: (\`object\`) The campaign's budget.

    - created\_at: (\`string\`)

    - updated\_at: (\`string\`)

    - deleted\_at: (\`null\` \\| \`string\`)

***

## list

This method retrieves a paginated list of campaigns. It sends a request to the
[List Campaigns](https://docs.medusajs.com/api/admin#campaigns_getcampaigns) API route.

### Example

To retrieve the list of campaigns:

```ts
sdk.admin.campaign.list()
.then(({ campaigns, count, limit, offset }) => {
  console.log(campaigns)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.campaign.list({
  limit: 10,
  offset: 10
})
.then(({ campaigns, count, limit, offset }) => {
  console.log(campaigns)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each campaign:

```ts
sdk.admin.campaign.list({
  fields: "id,*budget"
})
.then(({ campaigns, count, limit, offset }) => {
  console.log(campaigns)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- query: (\[AdminGetCampaignsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetCampaignsParams/page.mdx)) Filters and pagination configurations.

  - q: (\`string\`)

  - campaign\_identifier: (\`string\`)

  - budget: (\`object\`)

    - currency\_code: (\`string\`)

  - $and: (\[AdminGetCampaignsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetCampaignsParams/page.mdx)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - q: (\`string\`)

    - campaign\_identifier: (\`string\`)

    - budget: (\`object\`)

    - $and: (\[AdminGetCampaignsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetCampaignsParams/page.mdx)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: (\[AdminGetCampaignsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetCampaignsParams/page.mdx)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - $or: (\[AdminGetCampaignsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetCampaignsParams/page.mdx)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - q: (\`string\`)

    - campaign\_identifier: (\`string\`)

    - budget: (\`object\`)

    - $and: (\[AdminGetCampaignsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetCampaignsParams/page.mdx)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: (\[AdminGetCampaignsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetCampaignsParams/page.mdx)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminCampaignListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminCampaignListResponse/page.mdx)\&#62;) The paginated list of campaigns.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## create

This method creates a campaign. It sends a request to the
[Create Campaign](https://docs.medusajs.com/api/admin#campaigns_postcampaigns) API route.

### Example

```ts
sdk.admin.campaign.create({
  name: "Summer Campaign"
})
.then(({ campaign }) => {
  console.log(campaign)
})
```

### Parameters

- payload: (\[AdminCreateCampaign]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCreateCampaign/page.mdx)) The details of the campaign to create.

  - name: (\`string\`) The campaign's name.

  - campaign\_identifier: (\`string\`) The campaign's identifier.

  - description: (\`null\` \\| \`string\`) The campaign's description.

  - starts\_at: (\`null\` \\| \`Date\`) The date the campaign and its promotions start at.

  - ends\_at: (\`null\` \\| \`Date\`) The date the campaign and its promotions end at.

  - budget: (\`null\` \\| \`object\`) The campaign's budget.

    - type: (\[CampaignBudgetTypeValues]\(../../../../../promotion/types/promotion.CampaignBudgetTypeValues/page.mdx)) The budget's type. \`spend\` means the limit is set on the total amount discounted by the campaign's promotions;
      \`usage\` means the limit is set on the total number of times the campaign's promotions can be used.
      \`use\_by\_attribute\` means the limit is set for a specific condition, such as per customer.

    - currency\_code: (\`null\` \\| \`string\`) The budget's currency code.

    - limit: (\`null\` \\| \`number\`) The budget's limit.

    - attribute: (\`null\` \\| \`string\`) The attribute that the budget limit is applied to. By default,
      the budget is applied globally. If the type is \`use\_by\_attribute\`, this field indicates the&#x20;
      attribute the budget is tracked by. For example, \`customer\_id\` means the budget is tracked per customer.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminCampaignResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCampaignResponse/page.mdx)\&#62;) The campaign's details.

  - campaign: (\[AdminCampaign]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCampaign/page.mdx)) The campaign's details.

    - id: (\`string\`) The campaign's ID.

    - name: (\`string\`) The campaign's name.

    - description: (\`string\`) The campaign's description.

    - currency: (\`string\`) The campaign's currency code.

    - campaign\_identifier: (\`string\`) The campaign's identifier.

    - starts\_at: (\`string\`) The date the campaign and its promotions start at.

    - ends\_at: (\`string\`) The date the campaign and its promotions end at.

    - budget: (\`object\`) The campaign's budget.

    - created\_at: (\`string\`)

    - updated\_at: (\`string\`)

    - deleted\_at: (\`null\` \\| \`string\`)

***

## update

This method updates a campaign. It sends a request to the
[Update Campaign](https://docs.medusajs.com/api/admin#campaigns_postcampaignsid) API route.

### Example

```ts
sdk.admin.campaign.update("procamp_123", {
  name: "Summer Campaign"
})
.then(({ campaign }) => {
  console.log(campaign)
})
```

### Parameters

- id: (\`string\`) The campaign's ID.
- payload: (\[AdminUpdateCampaign]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUpdateCampaign/page.mdx)) The data to update in the campaign.

  - name: (\`string\`) The campaign's name.

  - description: (\`null\` \\| \`string\`) The campaign's description.

  - campaign\_identifier: (\`string\`) The campaign's identifier.

  - starts\_at: (\`null\` \\| \`Date\`) The date the campaign and its promotions start at.

  - ends\_at: (\`null\` \\| \`Date\`) The date the campaign and its promotions end at.

  - budget: (\`object\`) The campaign's budget.

    - limit: (\`null\` \\| \`number\`) The budget's limit.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminCampaignResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCampaignResponse/page.mdx)\&#62;) The campaign's details.

  - campaign: (\[AdminCampaign]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCampaign/page.mdx)) The campaign's details.

    - id: (\`string\`) The campaign's ID.

    - name: (\`string\`) The campaign's name.

    - description: (\`string\`) The campaign's description.

    - currency: (\`string\`) The campaign's currency code.

    - campaign\_identifier: (\`string\`) The campaign's identifier.

    - starts\_at: (\`string\`) The date the campaign and its promotions start at.

    - ends\_at: (\`string\`) The date the campaign and its promotions end at.

    - budget: (\`object\`) The campaign's budget.

    - created\_at: (\`string\`)

    - updated\_at: (\`string\`)

    - deleted\_at: (\`null\` \\| \`string\`)

***

## delete

This method deletes a campaign by its ID. It sends a request to the
[Delete Campaign](https://docs.medusajs.com/api/admin#campaigns_deletecampaignsid) API route.

### Example

```ts
sdk.admin.campaign.delete("procamp_123")
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- id: (\`string\`) The campaign's ID.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[DeleteResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.DeleteResponse/page.mdx)\&#60;"campaign"\&#62;\&#62;) The deletion's details.

  - "campaign": (\`"campaign"\`)

***

## batchPromotions

This method manages the promotions of a campaign to either add or remove the association between them.
It sends a request to the [Manage Promotions](https://docs.medusajs.com/api/admin#campaigns_postcampaignsidpromotions)
API route.

### Example

```ts
sdk.admin.campaign.batchPromotions("procamp_123", {
  add: ["prom_123", "prom_456"],
  remove: ["prom_789"]
})
.then(({ campaign }) => {
  console.log(campaign)
})
```

### Parameters

- id: (\`string\`) The campaign's ID.
- payload: (\[AdminBatchLink]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminBatchLink/page.mdx)) The promotions to add or remove associations to them.

  - add: (\`string\`\[]) The IDs of the items to create an association to.

  - remove: (\`string\`\[]) The IDs of the items to remove the association from.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminCampaignResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCampaignResponse/page.mdx)\&#62;) The campaign's details.

  - campaign: (\[AdminCampaign]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminCampaign/page.mdx)) The campaign's details.

    - id: (\`string\`) The campaign's ID.

    - name: (\`string\`) The campaign's name.

    - description: (\`string\`) The campaign's description.

    - currency: (\`string\`) The campaign's currency code.

    - campaign\_identifier: (\`string\`) The campaign's identifier.

    - starts\_at: (\`string\`) The date the campaign and its promotions start at.

    - ends\_at: (\`string\`) The date the campaign and its promotions end at.

    - budget: (\`object\`) The campaign's budget.

    - created\_at: (\`string\`)

    - updated\_at: (\`string\`)

    - deleted\_at: (\`null\` \\| \`string\`)
