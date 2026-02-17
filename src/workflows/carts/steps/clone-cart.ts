import type { CartTypes } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

type CloneCartStepInput = {
  cart_id: string
}

type CartRecord = {
  id: string
  region_id?: string
  region?: { id?: string }
  sales_channel_id?: string
  sales_channel?: { id?: string }
  currency_code?: string
  customer_id?: string | null
  email?: string | null
  metadata?: Record<string, unknown>
}

type CloneCartStepOutput = {
  cart: Record<string, unknown>
  previous_cart_id: string
}

type CloneCartCompensationInput = {
  new_cart_id: string | null
}

const deleteCartWithFallback = async (
  cartModule: any,
  id: string,
  manager: unknown
) => {
  const tx = manager ? cartModule.withTransaction(manager) : cartModule
  const cartInternalService = tx?.cartService_

  if (!cartInternalService) {
    return
  }

  try {
    if (typeof cartInternalService.delete === "function") {
      await cartInternalService.delete(id)
    } else if (typeof cartInternalService.softDelete === "function") {
      await cartInternalService.softDelete(id)
    }
  } catch (error) {
    if (typeof cartInternalService.delete === "function") {
      await cartInternalService.delete([id]).catch(() => undefined)
    } else if (typeof cartInternalService.softDelete === "function") {
      await cartInternalService.softDelete([id]).catch(() => undefined)
    }
  }
}

export const cloneCartStep = createStep(
  "carts.step.clone-cart",
  async (
    input: CloneCartStepInput,
    { container }
  ): Promise<StepResponse<CloneCartStepOutput, CloneCartCompensationInput>> => {
    const cartModule: any = container.resolve(Modules.CART)

    const existingCart: CartRecord | null = await cartModule
      .retrieveCart(input.cart_id, {
        relations: ["region", "sales_channel"],
      })
      .catch(() => null)

    if (!existingCart) {
      throw new Error("Cart not found.")
    }

    if (!existingCart.currency_code) {
      throw new Error("Cart currency is missing.")
    }

    const createPayload: CartTypes.CreateCartDTO = {
      region_id: existingCart.region_id ?? existingCart.region?.id,
      sales_channel_id: existingCart.sales_channel_id ?? existingCart.sales_channel?.id,
      currency_code: existingCart.currency_code,
      customer_id: existingCart.customer_id ?? undefined,
      email: existingCart.email ?? undefined,
      metadata: existingCart.metadata ?? undefined,
    }

    const manager = container.resolve("manager")
    const tx = cartModule.withTransaction(manager)
    const newCart = (await tx.createCarts(createPayload)) as Record<string, unknown>

    return new StepResponse(
      {
        cart: newCart,
        previous_cart_id: input.cart_id,
      },
      {
        new_cart_id:
          typeof newCart?.id === "string" ? (newCart.id as string) : null,
      }
    )
  },
  async (compensationInput, { container }) => {
    if (!compensationInput?.new_cart_id) {
      return
    }

    const cartModule: any = container.resolve(Modules.CART)
    const manager = container.resolve("manager")
    await deleteCartWithFallback(cartModule, compensationInput.new_cart_id, manager)
  }
)
