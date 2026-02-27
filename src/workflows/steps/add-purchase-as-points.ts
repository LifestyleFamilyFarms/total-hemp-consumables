import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { LOYALTY_MODULE } from "../../modules/loyalty"
import LoyaltyModuleService from "../../modules/loyalty/service"

type AddPurchaseAsPointsStepInput = {
  customer_id: string
  amount: number
  order_id?: string
}

export const addPurchaseAsPointsStep = createStep(
  "add-purchase-as-points",
  async (input: AddPurchaseAsPointsStepInput, { container }) => {
    const loyaltyModuleService: LoyaltyModuleService = container.resolve(LOYALTY_MODULE)

    const pointsToAdd = await loyaltyModuleService.calculateEarnPointsFromAmount(
      input.amount
    )

    const result = await loyaltyModuleService.addPoints(input.customer_id, pointsToAdd, {
      order_id: input.order_id,
      reason: "order_purchase",
    })

    return new StepResponse(result, {
      customer_id: input.customer_id,
      points: pointsToAdd,
      order_id: input.order_id,
    })
  },
  async (data, { container }) => {
    if (!data) {
      return
    }

    const loyaltyModuleService: LoyaltyModuleService = container.resolve(LOYALTY_MODULE)

    await loyaltyModuleService.deductPoints(data.customer_id, data.points, {
      order_id: data.order_id,
      reason: "rollback_add_purchase_as_points",
    })
  }
)
