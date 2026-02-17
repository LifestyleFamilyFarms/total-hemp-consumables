import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { updateSalesStoreStageStep } from "./steps/update-sales-store-stage"
import { addSalesStoreStageHistoryStep } from "./steps/add-sales-store-stage-history"

export type AddSalesStoreStageWorkflowInput = {
  sales_store_id: string
  stage: string
  notes?: string
}

const addSalesStoreStageWorkflow = createWorkflow(
  "sales-stores.add-sales-store-stage",
  function (input: AddSalesStoreStageWorkflowInput) {
    const updated = updateSalesStoreStageStep({
      sales_store_id: input.sales_store_id,
      stage: input.stage,
    })

    addSalesStoreStageHistoryStep({
      store_id: input.sales_store_id,
      stage: input.stage,
      occurred_at: updated.stage_updated_at,
      notes: input.notes,
    })

    return new WorkflowResponse({
      store: updated.store,
    })
  }
)

export default addSalesStoreStageWorkflow
