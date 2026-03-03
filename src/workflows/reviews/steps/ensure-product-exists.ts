import { MedusaError } from "@medusajs/framework/utils"
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

type EnsureProductExistsStepInput = {
  product_id: string
}

type ProductRecord = {
  id: string
}

export const ensureProductExistsStep = createStep(
  "reviews-ensure-product-exists",
  async (input: EnsureProductExistsStepInput, { container }) => {
    const query = container.resolve("query") as {
      graph: (input: Record<string, unknown>) => Promise<{ data: ProductRecord[] }>
    }

    const { data: products } = await query.graph({
      entity: "product",
      fields: ["id"],
      filters: {
        id: input.product_id,
      },
    })

    if (!products.length) {
      throw new MedusaError(MedusaError.Types.NOT_FOUND, "Product not found")
    }

    return new StepResponse({
      product_id: products[0].id,
    })
  }
)
