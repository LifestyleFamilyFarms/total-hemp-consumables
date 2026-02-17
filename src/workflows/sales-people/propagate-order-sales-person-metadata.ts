import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { resolveOrderSalesPersonMetadataStep } from "./steps/resolve-order-sales-person-metadata"
import { updateOrderSalesPersonMetadataStep } from "./steps/update-order-sales-person-metadata"

type PropagateOrderSalesPersonMetadataWorkflowInput = {
  order_id: string
}

const propagateOrderSalesPersonMetadataWorkflow = createWorkflow(
  "sales-people.propagate-order-sales-person-metadata",
  function (input: PropagateOrderSalesPersonMetadataWorkflowInput) {
    const metadataPlan = resolveOrderSalesPersonMetadataStep({
      order_id: input.order_id,
    })

    const result = updateOrderSalesPersonMetadataStep(metadataPlan)

    return new WorkflowResponse(result)
  }
)

export default propagateOrderSalesPersonMetadataWorkflow
