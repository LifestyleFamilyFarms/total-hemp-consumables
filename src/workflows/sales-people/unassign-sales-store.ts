import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { unassignSalesStoreAssignmentStep } from "./steps/unassign-sales-store-assignment"
import { setSalesStoreAssigneeStep } from "../sales-stores/steps/set-sales-store-assignee"

export type UnassignSalesStoreWorkflowInput = {
  sales_store_id: string
}

const unassignSalesStoreWorkflow = createWorkflow(
  "sales-people.unassign-sales-store",
  function (input: UnassignSalesStoreWorkflowInput) {
    const result = unassignSalesStoreAssignmentStep({
      sales_store_id: input.sales_store_id,
    })

    setSalesStoreAssigneeStep({
      sales_store_id: input.sales_store_id,
      sales_person_id: null,
    })

    return new WorkflowResponse(result)
  }
)

export default unassignSalesStoreWorkflow
