import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { LOYALTY_MODULE } from "../../modules/loyalty"
import LoyaltyModuleService from "../../modules/loyalty/service"

type DeductPurchasePointsStepInput = {
  customer_id: string
  amount: number
  order_id?: string
}

export const deductPurchasePointsStep = createStep(
  "deduct-purchase-points",
  async (input: DeductPurchasePointsStepInput, { container }) => {
    const loyaltyModuleService: LoyaltyModuleService = container.resolve(LOYALTY_MODULE)

    const pointsToDeduct = await loyaltyModuleService.calculateRedeemPointsFromAmount(
      input.amount
    )

    const result = await loyaltyModuleService.deductPoints(
      input.customer_id,
      pointsToDeduct,
      {
        order_id: input.order_id,
        reason: "loyalty_redemption",
      }
    )

    return new StepResponse(result, {
      customer_id: input.customer_id,
      points: pointsToDeduct,
      order_id: input.order_id,
    })
  },
  async (data, { container }) => {
    if (!data) {
      return
    }

    const loyaltyModuleService: LoyaltyModuleService = container.resolve(LOYALTY_MODULE)

    await loyaltyModuleService.addPoints(data.customer_id, data.points, {
      order_id: data.order_id,
      reason: "rollback_deduct_purchase_points",
    })
  }
)
