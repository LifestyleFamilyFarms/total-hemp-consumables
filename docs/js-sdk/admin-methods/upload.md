# upload - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.upload` set of methods used to send requests to Medusa's Admin API routes.

## create

This method creates a new upload. It sends a request to the
[Upload Files](https://docs.medusajs.com/api/admin#uploads_postuploads)
API route.

### Example

```ts
sdk.admin.upload.create(
  {
    files: [
       // file uploaded as a binary string
      {
        name: "test.txt",
        content: "test", // Should be the binary string of the file
      },
      // file uploaded as a File object
      new File(["test"], "test.txt", { type: "text/plain" })
    ],
  }
)
.then(({ files }) => {
  console.log(files)
})
```

### Parameters

- body: (\[BaseUploadFile]\(../../../../../types/types/types.BaseUploadFile/page.mdx)) The details of the files to upload.

  - files: ((\`object\` \\| \[File]\(../../../../../core\_flows/core\_flows.File/page.mdx))\[]) The list of files to upload.

    - name: (\`string\`) The name of the file.

    - content: (\`string\`) The content of the file.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Configure the fields and relations to retrieve in the uploaded files.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminFileListResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFileListResponse/page.mdx)\&#62;) The upload files' details.

  - files: (\[AdminFile]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFile/page.mdx)\[]) The list of uploaded files.

    - id: (\`string\`) The ID of the file in the configured File Module Provider.
      For example, when using the Local File Provider Module (default provider),
      the ID is the file's path relative to the \`static\` directory.

    - url: (\`string\`) The URL of the file.

***

## retrieve

This method retrieves a file's details by its ID. It sends a request to the
[Get File](https://docs.medusajs.com/api/admin#uploads_getuploadsid)
API route.

### Example

```ts
sdk.admin.upload.retrieve("test.txt")
.then(({ file }) => {
  console.log(file)
})
```

### Parameters

- id: (\`string\`) The ID of the file to retrieve.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Query parameters to pass in the request.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminFileResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFileResponse/page.mdx)\&#62;) The file's details.

  - file: (\[AdminFile]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminFile/page.mdx)) The file's details.

    - id: (\`string\`) The ID of the file in the configured File Module Provider.
      For example, when using the Local File Provider Module (default provider),
      the ID is the file's path relative to the \`static\` directory.

    - url: (\`string\`) The URL of the file.

***

## delete

This method deletes a file by its ID from the configured File Module Provider. It sends a request to the
[Delete File](https://docs.medusajs.com/api/admin#uploads_deleteuploadsid)
API route.

### Example

```ts
sdk.admin.upload.delete("test.txt")
.then(({ deleted }) => {
  console.log(deleted)
})
```

### Parameters

- id: (\`string\`) The ID of the file to delete.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminFileDeleteResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminFileDeleteResponse/page.mdx)\&#62;) The deletion's details.

  - id: (\`string\`) The ID of the item that was deleted.

  - object: (TObject) The type of the item that was deleted.

  - deleted: (\`boolean\`) Whether the item was deleted successfully.

***

## presignedUrl

This method creates a presigned URL for a file upload. It sends a request to the
`/admin/uploads/presigned-urls` API route.

### Example

```ts
sdk.admin.upload.presignedUrl({
  name: "test.txt",
  size: 1000,
  type: "text/plain",
}))
```

### Parameters

- body: (\[AdminUploadPreSignedUrlRequest]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUploadPreSignedUrlRequest/page.mdx)) The details of the file to upload.

  - originalname: (\`string\`) The original name of the file on the user's computer (aka clientName)

  - mime\_type: (\`string\`) The mime type of the file.

  - size: (\`number\`) The size of the file in bytes.

  - access: (\`"public"\` \\| \`"private"\`) The access level of the file.
- query: (\[SelectParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.SelectParams/page.mdx)) Query parameters to pass in the request.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminUploadPreSignedUrlResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminUploadPreSignedUrlResponse/page.mdx)\&#62;) The presigned URL for the file upload.

  - url: (\`string\`) The URL to be used for uploading the file

  - filename: (\`string\`) The unique filename that can be used with the file provider
    to fetch the file

  - originalname: (\`string\`) The original name of the file on the user's computer (aka clientName)

  - mime\_type: (\`string\`) The mime type of the file.

  - extension: (\`string\`) Extension of the file to be uploaded

  - size: (\`number\`) Size of the file to be uploaded (in bytes)
