# plugin - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.plugin` set of methods used to send requests to Medusa's Admin API routes.

## list

This method retrieves the list of plugins installed in a Medusa application.

### Example

```ts
sdk.admin.plugin.list()
.then(({ plugins }) => {
  console.log(plugins)
})
```

### Parameters

- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminPluginsListResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPluginsListResponse/page.mdx)\&#62;) The list of plugins.

  - plugins: (\[AdminPlugin]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminPlugin/page.mdx)\[]) The plugin's details.

    - name: (\`string\`) The plugin's name.
