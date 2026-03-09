# workflowExecution - JS SDK Admin Reference

This documentation provides a reference to the `sdk.admin.workflowExecution` set of methods used to send requests to Medusa's Admin API routes.

## list

This method retrieves a list of workflow executions. It sends a request to the
[List Workflow Executions](https://docs.medusajs.com/api/admin#workflows-executions_getworkflowsexecutions)
API route.

### Example

To retrieve the list of workflow executions:

```ts
sdk.admin.workflowExecution.list()
.then(({ workflow_executions, count, limit, offset }) => {
  console.log(workflow_executions)
})
```

To configure the pagination, pass the `limit` and `offset` query parameters.

For example, to retrieve only 10 items and skip 10 items:

```ts
sdk.admin.workflowExecution.list({
  limit: 10,
  offset: 10
})
.then(({ workflow_executions, count, limit, offset }) => {
  console.log(workflow_executions)
})
```

Using the `fields` query parameter, you can specify the fields and relations to retrieve
in each workflow execution:

```ts
sdk.admin.workflowExecution.list({
  fields: "id,name"
})
.then(({ workflow_executions, count, limit, offset }) => {
  console.log(workflow_executions)
})
```

Learn more about the `fields` property in the [API reference](https://docs.medusajs.com/api/admin#select-fields-and-relations).

### Parameters

- queryParams: (\[AdminGetWorkflowExecutionsParams]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminGetWorkflowExecutionsParams/page.mdx)) Filters and pagination configurations.

  - fields: (\`string\`) The fields and relations to retrieve separated by commas.

    Learn more in the \[API reference]\(https://docs.medusajs.com/api/store#select-fields-and-relations).

  - limit: (\`number\`) The maximum number of items to retrieve.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - order: (\`string\`) The field to sort by and in which order.

  - with\_deleted: (\`boolean\`) Whether to include soft-deleted items in the results.

  - q: (\`string\`) Filter using a search query.

  - transaction\_id: (\`string\` \\| \`string\`\[]) Filter by the ID of the transaction to retrieve workflow executions for a specific transaction.

  - workflow\_id: (\`string\` \\| \`string\`\[]) Filter by the ID of the workflow to retrieve workflow executions for a specific workflow.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminWorkflowExecutionListResponse]\(../../../../../types/HttpTypes/types/types.HttpTypes.AdminWorkflowExecutionListResponse/page.mdx)\&#62;) The list of workflow executions.

  - limit: (\`number\`) The maximum number of items retrieved.

  - offset: (\`number\`) The number of items to skip before retrieving the returned items.

  - count: (\`number\`) The total number of items.

  - estimate\_count: (\`number\`) The estimated count retrieved from the PostgreSQL query planner, which may be inaccurate.

***

## retrieve

This method retrieves a workflow execution by its ID. It sends a request to the
[Get Workflow Execution](https://docs.medusajs.com/api/admin#workflows-executions_getworkflowsexecutionsworkflow_idtransaction_id)
API route.

### Example

```ts
sdk.admin.workflowExecution.retrieve("wrk_123")
.then(({ workflow_execution }) => {
  console.log(workflow_execution)
})
```

### Parameters

- id: (\`string\`) The ID of the workflow execution to retrieve.
- headers: (\[ClientHeaders]\(../../../types/js\_sdk.admin.ClientHeaders/page.mdx)) Headers to pass in the request.

  - tags: (\`string\`\[]) Tags to cache data under for Next.js applications.

    Learn more in \[Next.js's documentation]\(https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag).

### Returns

- Promise: (Promise\&#60;\[AdminWorkflowExecutionResponse]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminWorkflowExecutionResponse/page.mdx)\&#62;) The workflow execution's details.

  - workflow\_execution: (\[AdminWorkflowExecution]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminWorkflowExecution/page.mdx)) The workflow execution's details.

    - id: (\`string\`) The ID of the workflow execution.

    - workflow\_id: (\`string\`) The ID of the workflow.

    - transaction\_id: (\`string\`) The ID of the transaction.

    - execution: (\[AdminWorkflowExecutionExecution]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.AdminWorkflowExecutionExecution/page.mdx)) The execution details of the workflow.

    - context: (\[WorkflowExecutionContext]\(../../../../../types/HttpTypes/interfaces/types.HttpTypes.WorkflowExecutionContext/page.mdx)) The context of the workflow execution.
      This includes the data, errors and the output of the step and compensation functions of the workflow execution.

    - state: (\[TransactionState]\(../../../../../types/HttpTypes/types/types.HttpTypes.TransactionState/page.mdx)) The state of the workflow execution.

    - created\_at: (\`Date\`) The date the workflow execution was created.

    - updated\_at: (\`Date\`) The date the workflow execution was updated.

    - deleted\_at: (\`null\` \\| \`Date\`) The date the workflow execution was deleted.
