import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { upsertSalesStoreAssignmentStep } from "./steps/upsert-sales-store-assignment"
import { setSalesStoreAssigneeStep } from "../sales-stores/steps/set-sales-store-assignee"

export type AssignSalesStoreWorkflowInput = {
  sales_person_id: string
  sales_store_id: string
  notes?: string
}

const assignSalesStoreWorkflow = createWorkflow(
  "sales-people.assign-sales-store",
  function (input: AssignSalesStoreWorkflowInput) {
    const assignment = upsertSalesStoreAssignmentStep(input)

    const store = setSalesStoreAssigneeStep({
      sales_store_id: input.sales_store_id,
      sales_person_id: input.sales_person_id,
    })

    return new WorkflowResponse({
      assignment,
      store,
    })
  }
)

export default assignSalesStoreWorkflow
