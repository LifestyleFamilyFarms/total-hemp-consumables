import { PromotionActions } from "@medusajs/framework/utils"
import {
  createWorkflow,
  transform,
  when,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import {
  updateCartPromotionsWorkflow,
  useQueryGraphStep,
} from "@medusajs/medusa/core-flows"
import { evaluateFirstPurchaseStep } from "./steps/evaluate-first-purchase"

export type ApplyFirstPurchaseDiscountWorkflowInput = {
  cart_id: string
  actor_id: string
  promotion_code: string
}

const applyFirstPurchaseDiscountWorkflow = createWorkflow(
  "first-purchase.apply-discount",
  function (input: ApplyFirstPurchaseDiscountWorkflowInput) {
    const evaluation = evaluateFirstPurchaseStep({
      cart_id: input.cart_id,
      actor_id: input.actor_id,
      promotion_code: input.promotion_code,
    })

    when({ evaluation }, (data) => data.evaluation.eligible).then(() => {
      const updateInput = transform({ input, evaluation }, (data) => ({
        cart_id: data.input.cart_id,
        promo_codes: [data.evaluation.promotion_code],
        action: PromotionActions.ADD,
        force_refresh_payment_collection: true,
      }))

      updateCartPromotionsWorkflow.runAsStep({
        input: updateInput,
      })
    })

    const { data: carts } = useQueryGraphStep({
      entity: "cart",
      fields: ["id", "promotions.*", "customer.id", "customer.orders.id"],
      filters: {
        id: input.cart_id,
      },
      options: {
        throwIfKeyNotFound: true,
      },
    })

    return new WorkflowResponse({
      cart: carts[0],
      applied: evaluation.eligible,
      reason: evaluation.reason,
      promotion_code: evaluation.promotion_code,
    })
  }
)

export default applyFirstPurchaseDiscountWorkflow
