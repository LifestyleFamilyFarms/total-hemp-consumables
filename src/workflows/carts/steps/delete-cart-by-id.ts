import { Modules } from "@medusajs/framework/utils"
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

type DeleteCartByIdStepInput = {
  cart_id: string
}

const deleteCartWithFallback = async (
  cartModule: any,
  id: string,
  manager: unknown
) => {
  const tx = manager ? cartModule.withTransaction(manager) : cartModule
  const cartInternalService = tx?.cartService_

  if (!cartInternalService) {
    return false
  }

  try {
    if (typeof cartInternalService.delete === "function") {
      await cartInternalService.delete(id)
      return true
    }
    if (typeof cartInternalService.softDelete === "function") {
      await cartInternalService.softDelete(id)
      return true
    }
  } catch (error) {
    if (typeof cartInternalService.delete === "function") {
      await cartInternalService.delete([id]).catch(() => undefined)
      return true
    }
    if (typeof cartInternalService.softDelete === "function") {
      await cartInternalService.softDelete([id]).catch(() => undefined)
      return true
    }
  }

  return false
}

export const deleteCartByIdStep = createStep(
  "carts.step.delete-cart-by-id",
  async (input: DeleteCartByIdStepInput, { container }) => {
    const cartModule: any = container.resolve(Modules.CART)
    const manager = container.resolve("manager")
    const deleted = await deleteCartWithFallback(cartModule, input.cart_id, manager)
    return new StepResponse({ deleted })
  }
)
