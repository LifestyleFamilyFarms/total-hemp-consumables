import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import type { ResolveOrderSalesPersonMetadataStepOutput } from "./resolve-order-sales-person-metadata"

type UpdateOrderSalesPersonMetadataStepOutput = {
  updated: boolean
}

type UpdateOrderSalesPersonMetadataCompensationInput = {
  order_id: string | null
  previous_metadata: Record<string, unknown> | null
}

type OrderService = {
  updateOrders: (id: string, data: Record<string, unknown>) => Promise<unknown>
}

export const updateOrderSalesPersonMetadataStep = createStep(
  "sales-people.step.update-order-sales-person-metadata",
  async (
    input: ResolveOrderSalesPersonMetadataStepOutput,
    { container }
  ): Promise<
    StepResponse<
      UpdateOrderSalesPersonMetadataStepOutput,
      UpdateOrderSalesPersonMetadataCompensationInput
    >
  > => {
    if (!input.metadata_to_set) {
      return new StepResponse(
        { updated: false },
        { order_id: null, previous_metadata: null }
      )
    }

    const orderService = container.resolve("order") as OrderService
    await orderService.updateOrders(input.order_id, {
      metadata: input.metadata_to_set,
    })

    return new StepResponse(
      { updated: true },
      {
        order_id: input.order_id,
        previous_metadata: input.previous_metadata,
      }
    )
  },
  async (compensationInput, { container }) => {
    if (!compensationInput?.order_id) {
      return
    }

    const orderService = container.resolve("order") as OrderService
    await orderService.updateOrders(compensationInput.order_id, {
      metadata: compensationInput.previous_metadata || {},
    })
  }
)
