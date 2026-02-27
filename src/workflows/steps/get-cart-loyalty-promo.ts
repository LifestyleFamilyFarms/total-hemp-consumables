import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { MedusaError } from "@medusajs/framework/utils"
import { CartData, getCartLoyaltyPromotion } from "../../utils/promo"

type GetCartLoyaltyPromoStepInput = {
  cart: CartData
  throwErrorOn?: "found" | "not-found"
}

export const getCartLoyaltyPromoStep = createStep(
  "get-cart-loyalty-promo",
  async ({ cart, throwErrorOn }: GetCartLoyaltyPromoStepInput) => {
    const loyaltyPromo = getCartLoyaltyPromotion(cart)

    if (throwErrorOn === "found" && loyaltyPromo) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Loyalty promotion already applied to cart"
      )
    }

    if (throwErrorOn === "not-found" && !loyaltyPromo) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "No loyalty promotion found on cart"
      )
    }

    return new StepResponse(loyaltyPromo)
  }
)
