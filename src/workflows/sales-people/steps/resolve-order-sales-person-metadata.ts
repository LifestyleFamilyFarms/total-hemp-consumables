import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

type ResolveOrderSalesPersonMetadataStepInput = {
  order_id: string
}

type OrderRecord = {
  id: string
  metadata?: Record<string, unknown>
  cart_id?: string
  customer_id?: string
}

type CartRecord = {
  metadata?: Record<string, unknown>
}

type CustomerRecord = {
  metadata?: Record<string, unknown>
}

type OrderService = {
  retrieveOrder: (id: string, config?: Record<string, unknown>) => Promise<OrderRecord>
}

type CartService = {
  retrieveCart: (id: string) => Promise<CartRecord>
}

type CustomerService = {
  retrieveCustomer: (id: string) => Promise<CustomerRecord>
}

export type ResolveOrderSalesPersonMetadataStepOutput = {
  order_id: string
  metadata_to_set: Record<string, unknown> | null
  previous_metadata: Record<string, unknown>
}

export const resolveOrderSalesPersonMetadataStep = createStep(
  "sales-people.step.resolve-order-sales-person-metadata",
  async (input: ResolveOrderSalesPersonMetadataStepInput, { container }) => {
    const orderService = container.resolve("order") as OrderService
    const cartService = container.resolve("cart") as CartService
    const customerService = container.resolve("customer") as CustomerService

    const order = await orderService.retrieveOrder(input.order_id, {
      select: ["id", "metadata", "cart_id", "customer_id"],
    })

    const existingMetadata = order.metadata || {}
    if (existingMetadata.sales_person_id || existingMetadata.sales_person_code) {
      return new StepResponse<ResolveOrderSalesPersonMetadataStepOutput>({
        order_id: order.id,
        metadata_to_set: null,
        previous_metadata: existingMetadata,
      })
    }

    let repMetadata: Record<string, unknown> | null = null

    if (order.cart_id) {
      const cart = await cartService.retrieveCart(order.cart_id)
      if (cart?.metadata?.sales_person_id || cart?.metadata?.sales_person_code) {
        repMetadata = {
          sales_person_id: cart.metadata.sales_person_id,
          sales_person_code: cart.metadata.sales_person_code,
        }
      }
    }

    if (!repMetadata && order.customer_id) {
      const customer = await customerService.retrieveCustomer(order.customer_id)
      if (
        customer?.metadata?.sales_person_id ||
        customer?.metadata?.sales_person_code
      ) {
        repMetadata = {
          sales_person_id: customer.metadata.sales_person_id,
          sales_person_code: customer.metadata.sales_person_code,
        }
      }
    }

    if (!repMetadata) {
      return new StepResponse<ResolveOrderSalesPersonMetadataStepOutput>({
        order_id: order.id,
        metadata_to_set: null,
        previous_metadata: existingMetadata,
      })
    }

    return new StepResponse<ResolveOrderSalesPersonMetadataStepOutput>({
      order_id: order.id,
      metadata_to_set: {
        ...existingMetadata,
        ...repMetadata,
      },
      previous_metadata: existingMetadata,
    })
  }
)
