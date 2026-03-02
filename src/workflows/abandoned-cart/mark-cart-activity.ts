import { createWorkflow, transform, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { updateCartsStep, useQueryGraphStep } from "@medusajs/medusa/core-flows"

export type MarkCartActivityWorkflowInput = {
  cart_id: string
}

const markCartActivityWorkflow = createWorkflow(
  "abandoned-cart.mark-cart-activity",
  function (input: MarkCartActivityWorkflowInput) {
    const { data: carts } = useQueryGraphStep({
      entity: "cart",
      fields: ["id", "metadata"],
      filters: {
        id: input.cart_id,
      },
      options: {
        throwIfKeyNotFound: true,
      },
    })

    const updates = transform({ input, carts }, (data) => {
      return [
        {
          id: data.input.cart_id,
          metadata: {
            ...(data.carts[0].metadata || {}),
            abandoned_last_activity_at: new Date().toISOString(),
          },
        },
      ]
    })

    updateCartsStep(updates)

    return new WorkflowResponse({
      cart_id: input.cart_id,
      marked: true,
    })
  }
)

export default markCartActivityWorkflow
