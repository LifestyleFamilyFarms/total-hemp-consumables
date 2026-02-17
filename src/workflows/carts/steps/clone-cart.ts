import type { CartTypes } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

type CloneCartStepInput = {
  cart_id: string
}

type CartRecord = {
  id: string
  region_id?: string | null
  sales_channel_id?: string
  currency_code?: string
  customer_id?: string | null
  email?: string | null
  metadata?: Record<string, unknown>
}

type CartModuleService = {
  retrieveCart: (id: string, config?: Record<string, unknown>) => Promise<CartRecord>
  createCarts: (data: CartTypes.CreateCartDTO) => Promise<Record<string, unknown>>
  deleteCarts: (id: string | string[]) => Promise<void>
}

type CloneCartStepOutput = {
  cart: Record<string, unknown>
  previous_cart_id: string
}

type CloneCartCompensationInput = {
  new_cart_id: string | null
}

export const cloneCartStep = createStep(
  "clone-cart",
  async (
    input: CloneCartStepInput,
    { container }
  ): Promise<StepResponse<CloneCartStepOutput, CloneCartCompensationInput>> => {
    const cartModule = container.resolve(Modules.CART) as unknown as CartModuleService

    let existingCart: CartRecord
    try {
      existingCart = await cartModule.retrieveCart(input.cart_id)
    } catch (error) {
      throw new Error("Cart not found.")
    }

    if (!existingCart.currency_code) {
      throw new Error("Cart currency is missing.")
    }

    const createPayload: CartTypes.CreateCartDTO = {
      region_id: existingCart.region_id ?? undefined,
      sales_channel_id: existingCart.sales_channel_id,
      currency_code: existingCart.currency_code,
      customer_id: existingCart.customer_id ?? undefined,
      email: existingCart.email ?? undefined,
      metadata: existingCart.metadata ?? undefined,
    }

    const newCart = (await cartModule.createCarts(createPayload)) as Record<
      string,
      unknown
    >

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

    const cartModule = container.resolve(Modules.CART) as unknown as CartModuleService
    await cartModule.deleteCarts(compensationInput.new_cart_id)
  }
)
