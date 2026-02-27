import { completeCartWorkflow } from "@medusajs/medusa/core-flows"
import { MedusaError } from "@medusajs/framework/utils"
import { CartData, getCartLoyaltyPromotion } from "../../utils/promo"
import LoyaltyModuleService from "../../modules/loyalty/service"
import { LOYALTY_MODULE } from "../../modules/loyalty"

completeCartWorkflow.hooks.validate(async ({ cart }, { container }) => {
  const query = container.resolve("query") as {
    graph: (
      data: Record<string, unknown>,
      config: Record<string, unknown>
    ) => Promise<{ data: Array<Record<string, any>> }>
  }

  const loyaltyModuleService: LoyaltyModuleService = container.resolve(LOYALTY_MODULE)

  const { data: carts } = await query.graph(
    {
      entity: "cart",
      fields: [
        "id",
        "promotions.*",
        "promotions.rules.*",
        "promotions.rules.values.*",
        "promotions.application_method.*",
        "customer.*",
        "metadata",
      ],
      filters: {
        id: cart.id,
      },
    },
    {
      throwIfKeyNotFound: true,
    }
  )

  const loyaltyPromo = getCartLoyaltyPromotion(carts[0] as CartData)

  if (!loyaltyPromo) {
    return
  }

  if (!carts[0].customer?.id) {
    throw new MedusaError(MedusaError.Types.INVALID_DATA, "Customer not found")
  }

  const customerLoyaltyPoints = await loyaltyModuleService.getPoints(
    carts[0].customer.id
  )

  const requiredPoints = await loyaltyModuleService.calculateRedeemPointsFromAmount(
    Number(loyaltyPromo.application_method?.value || 0)
  )

  if (customerLoyaltyPoints < requiredPoints) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      `Insufficient loyalty points. Required: ${requiredPoints}, Available: ${customerLoyaltyPoints}`
    )
  }
})
