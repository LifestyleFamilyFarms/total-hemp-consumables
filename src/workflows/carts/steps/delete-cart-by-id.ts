import { Modules } from "@medusajs/framework/utils"
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

type DeleteCartByIdStepInput = {
  cart_id: string
}

type CartModuleService = {
  deleteCarts: (id: string | string[]) => Promise<void>
}

export const deleteCartByIdStep = createStep(
  "delete-cart-by-id",
  async (input: DeleteCartByIdStepInput, { container }) => {
    const cartModule = container.resolve(Modules.CART) as CartModuleService

    await cartModule.deleteCarts(input.cart_id)
    return new StepResponse({ deleted: true })
  }
)
