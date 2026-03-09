# notification - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.notification` set of methods used to send requests to Medusa's Admin API routes.

## retrieve

This method retrieves a notification's details. It sends a request to the
[Get Notification](https://docs.medusajs.com/api/admin#notifications_getnotificationsid)
API route.

### Example

To retrieve a notification by its ID:

```ts
sdk.admin.notification.retrieve("notif_123")
.then(({ notification }) => {
  console.log(notification)
})
```

To specify the fields and relations to retrieve:

```ts
sdk.admin.notification.retrieve("notif_123", {
  fields: "id,to"
})
.then(({ notification }) => {
  console.log(notification)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- id: (\`string\`) The notification's ID.
- query: (\[AdminNotificationParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminNotificationParams/page.mdx)) Configure the fields to retrieve in the notification.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminNotificationResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminNotificationResponse/page.mdx)\&#62;) The notification's details.

  - notification: (\[AdminNotification]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminNotification/page.mdx)) The notification's details.

    - id: (\`string\`) The notification's ID.

    - to: (\`string\`) The identifier the notification is sent to.
      For example, an email, phone number, or username.

    - channel: (\`string\`) The channel to send the notification through.

    - template: (\`string\`) A template ID to use for the notification's content.

      For example, the ID of a template in SendGrid.

    - provider\_id: (\`string\`) The ID of the notification provider used.

    - created\_at: (\`string\`) The date the notification was created.

    - data: (\`null\` \\| \`Record\<string, unknown>\`) Data to pass to the template.

    - trigger\_type: (\`null\` \\| \`string\`) What triggered this notification.

    - resource\_id: (\`null\` \\| \`string\`) The ID of the associated resource. for example, if the notification was triggered&#x20;
      because an order was created, this would be the ID of the order.

    - resource\_type: (\`null\` \\| \`string\`) The type of the resource that triggered the notification.

    - receiver\_id: (\`null\` \\| \`string\`) The ID of the user or customer that received the notification.

    - original\_notification\_id: (\`null\` \\| \`string\`) The ID of the original notification if this is a resend of it.

    - external\_id: (\`null\` \\| \`string\`) The ID of the notification in an external or third-party system.

***

## list

This method retrieves a paginated list of notifications. It sends a request to the
[List Notifications](https://docs.medusajs.com/api/admin#notifications_getnotifications)
API route.

### Example

To retrieve the list of notifications:

```ts
sdk.admin.notification.list()
.then(({ notifications, count, limit, offset }) => {
  console.log(notifications)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.notification.list({
  limit: 10,
  offset: 10
})
.then(({ notifications, count, limit, offset }) => {
  console.log(notifications)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each notification:

```ts
sdk.admin.notification.list({
  fields: "id,to"
})
.then(({ notifications, count, limit, offset }) => {
  console.log(notifications)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/store#select-fields-and-relations).

### Parameters

- query: (\[AdminNotificationListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminNotificationListParams/page.mdx)) Filters and pagination configurations.

  - $and: ((\[AdminNotificationListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminNotificationListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminNotificationListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminNotificationListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $and: ((\[AdminNotificationListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminNotificationListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminNotificationListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminNotificationListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminNotificationListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminNotificationListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminNotificationListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminNotificationListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`) Query or keywords to search the notification's searchable fields.

    - id: (\`string\` \\| \`string\`\[]) Filter by notification ID(s).

    - channel: (\`string\` \\| \`string\`\[]) Filter by channel(s).

  - $or: ((\[AdminNotificationListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminNotificationListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminNotificationListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminNotificationListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - $and: ((\[AdminNotificationListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminNotificationListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminNotificationListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminNotificationListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

    - $or: ((\[AdminNotificationListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminNotificationListParams/page.mdx) \\| \[BaseFilterable]\(../../../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[AdminNotificationListParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminNotificationListParams/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

    - fields: (\`string\`) The fields and relations to retrieve separated by commas.

      Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

    - limit: (\`number\`) The maximum number of items to retrieve.

    - offset: (\`number\`) The number of items to skip before retrieving the returned items.

    - order: (\`string\`) The field to sort by and in which order.

    - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

    - q: (\`string\`) Query or keywords to search the notification's searchable fields.

    - id: (\`string\` \\| \`string\`\[]) Filter by notification ID(s).

    - channel: (\`string\` \\| \`string\`\[]) Filter by channel(s).

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - q: (\`string\`) Query or keywords to search the notification's searchable fields.

  - id: (\`string\` \\| \`string\`\[]) Filter by notification ID(s).

  - channel: (\`string\` \\| \`string\`\[]) Filter by channel(s).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminNotificationListResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminNotificationListResponse/page.mdx)\&#62;) The paginated list of notifications.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - notifications: (\[AdminNotification]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminNotification/page.mdx)\[]) The list of notifications.

    - id: (\`string\`) The notification's ID.

    - to: (\`string\`) The identifier the notification is sent to.
      For example, an email, phone number, or username.

    - channel: (\`string\`) The channel to send the notification through.

    - template: (\`string\`) A template ID to use for the notification's content.

      For example, the ID of a template in SendGrid.

    - provider\_id: (\`string\`) The ID of the notification provider used.

    - created\_at: (\`string\`) The date the notification was created.

    - data: (\`null\` \\| \`Record\<string, unknown>\`) Data to pass to the template.

    - trigger\_type: (\`null\` \\| \`string\`) What triggered this notification.

    - resource\_id: (\`null\` \\| \`string\`) The ID of the associated resource. for example, if the notification was triggered&#x20;
      because an order was created, this would be the ID of the order.

    - resource\_type: (\`null\` \\| \`string\`) The type of the resource that triggered the notification.

    - receiver\_id: (\`null\` \\| \`string\`) The ID of the user or customer that received the notification.

    - original\_notification\_id: (\`null\` \\| \`string\`) The ID of the original notification if this is a resend of it.

    - external\_id: (\`null\` \\| \`string\`) The ID of the notification in an external or third-party system.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.
