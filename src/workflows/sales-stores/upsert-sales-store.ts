import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { upsertSalesStoreStep } from "./steps/upsert-sales-store"
import { addSalesStoreStageHistoryStep } from "./steps/add-sales-store-stage-history"

export type UpsertSalesStoreWorkflowInput = {
  name?: string
  address: string
  lat?: number
  lng?: number
  source?: string
  stage?: string
  notes?: string
  assigned_sales_person_id?: string
}

const upsertSalesStoreWorkflow = createWorkflow(
  "sales-stores.upsert-sales-store",
  function (input: UpsertSalesStoreWorkflowInput) {
    const upserted = upsertSalesStoreStep(input)

    addSalesStoreStageHistoryStep({
      store_id: upserted.store.id,
      stage: upserted.stage,
      occurred_at: upserted.stage_updated_at,
      notes: upserted.notes,
      source: upserted.source,
    })

    return new WorkflowResponse({
      store: upserted.store,
      created: upserted.created,
    })
  }
)

export default upsertSalesStoreWorkflow
