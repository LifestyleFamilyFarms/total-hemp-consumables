import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

type AttachSalesPersonToCartStepInput = {
  cart_id?: string
  customer_id?: string
  sales_person_id: string
  sales_person_code: string
}

type CartRecord = {
  metadata?: Record<string, unknown>
  customer_id?: string | null
}

type CartService = {
  retrieveCart: (id: string) => Promise<CartRecord>
  updateCarts: (id: string, data: Record<string, unknown>) => Promise<unknown>
}

type AttachSalesPersonToCartCompensationInput = {
  cart_id: string | null
  previous_metadata: Record<string, unknown> | null
}

type AttachSalesPersonToCartStepOutput = {
  updated: boolean
}

export const attachSalesPersonToCartStep = createStep(
  "attach-sales-person-to-cart",
  async (
    input: AttachSalesPersonToCartStepInput,
    { container }
  ): Promise<
    StepResponse<AttachSalesPersonToCartStepOutput, AttachSalesPersonToCartCompensationInput>
  > => {
    if (!input.cart_id) {
      return new StepResponse(
        { updated: false },
        { cart_id: null, previous_metadata: null }
      )
    }

    const cartService = container.resolve("cart") as CartService
    const cart = await cartService.retrieveCart(input.cart_id)
    const previousMetadata = { ...(cart?.metadata || {}) }
    const cartCustomerId =
      typeof cart?.customer_id === "string" ? cart.customer_id : ""

    if (cartCustomerId) {
      const providedCustomerId =
        typeof input.customer_id === "string" ? input.customer_id : ""

      if (!providedCustomerId || providedCustomerId !== cartCustomerId) {
        throw new Error(
          "Cart customer mismatch. Use the authenticated customer's cart."
        )
      }
    }

    await cartService.updateCarts(input.cart_id, {
      metadata: {
        ...previousMetadata,
        sales_person_id: input.sales_person_id,
        sales_person_code: input.sales_person_code,
      },
    })

    return new StepResponse(
      { updated: true },
      {
        cart_id: input.cart_id,
        previous_metadata: previousMetadata,
      }
    )
  },
  async (compensationInput, { container }) => {
    if (!compensationInput?.cart_id) {
      return
    }

    const cartService = container.resolve("cart") as CartService
    await cartService.updateCarts(compensationInput.cart_id, {
      metadata: compensationInput.previous_metadata || {},
    })
  }
)
