import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { reorderOrderStep } from "./steps/reorder-order"

export type CreateReorderWorkflowInput = {
  order_id: string
  actor_id: string
}

const createReorderWorkflow = createWorkflow(
  "reorder-create-reorder",
  function (input: CreateReorderWorkflowInput) {
    const result = reorderOrderStep({
      order_id: input.order_id,
      actor_id: input.actor_id,
    })

    return new WorkflowResponse(result)
  }
)

export default createReorderWorkflow
