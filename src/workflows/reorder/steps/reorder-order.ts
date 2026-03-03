import { Modules, MedusaError } from "@medusajs/framework/utils"
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { addToCartWorkflow } from "@medusajs/medusa/core-flows"

type ReorderOrderStepInput = {
  order_id: string
  actor_id: string
}

type OrderItemRecord = {
  id: string
  variant_id?: string | null
  product_id?: string | null
  quantity: number
  title?: string | null
}

type OrderRecord = {
  id: string
  customer_id?: string | null
  region_id?: string | null
  sales_channel_id?: string | null
  email?: string | null
  currency_code?: string | null
  billing_address?: Record<string, unknown> | null
  shipping_address?: Record<string, unknown> | null
  items: OrderItemRecord[]
}

type ProductVariantRecord = {
  id: string
  sku?: string | null
  title?: string | null
  product_id?: string | null
  manage_inventory?: boolean | null
  allow_backorder?: boolean | null
  inventory_quantity?: number | null
  product?: {
    id: string
    status?: string | null
  }
}

type ProductRecord = {
  id: string
  variants?: Array<{
    id: string
    title?: string | null
    sku?: string | null
  }> | null
}

type CartService = {
  createCarts: (
    data: Record<string, unknown> | Array<Record<string, unknown>>
  ) => Promise<{ id: string } | Array<{ id: string }>>
  deleteCarts: (id: string | string[]) => Promise<void>
}

type AddedItem = {
  order_item_id: string
  variant_id: string
  quantity: number
}

type UnavailableItem = {
  order_item_id: string
  variant_id: string | null
  product_id: string | null
  title: string
  quantity: number
  reason: string
}

type SuggestedVariants = {
  order_item_id: string
  original_variant_id: string | null
  product_id: string
  variants: Array<{
    id: string
    title: string
    sku: string | null
  }>
}

type ReorderOrderStepOutput = {
  cart_id: string
  added_items: AddedItem[]
  unavailable_items: UnavailableItem[]
  suggested_variants: SuggestedVariants[]
}

const sanitizeAddressForCart = (
  address: Record<string, unknown> | null | undefined
) => {
  if (!address || typeof address !== "object") {
    return undefined
  }

  const cloned = { ...address }
  delete cloned.id
  delete cloned.created_at
  delete cloned.updated_at
  delete cloned.deleted_at
  delete cloned.customer_id

  return cloned
}

export const reorderOrderStep = createStep(
  "reorder-reorder-order",
  async (input: ReorderOrderStepInput, { container }) => {
    const query = container.resolve("query") as {
      graph: (input: Record<string, unknown>) => Promise<{ data: any[] }>
    }

    const { data: orders } = await query.graph({
      entity: "order",
      fields: [
        "id",
        "customer_id",
        "region_id",
        "sales_channel_id",
        "email",
        "currency_code",
        "billing_address.*",
        "shipping_address.*",
        "items.id",
        "items.variant_id",
        "items.product_id",
        "items.quantity",
        "items.title",
      ],
      filters: {
        id: input.order_id,
      },
    })

    if (!orders.length) {
      throw new MedusaError(MedusaError.Types.NOT_FOUND, "Order not found")
    }

    const order = orders[0] as OrderRecord

    if (!order.customer_id || order.customer_id !== input.actor_id) {
      throw new MedusaError(
        MedusaError.Types.NOT_ALLOWED,
        "You can only reorder your own orders"
      )
    }

    if (!order.region_id || !order.sales_channel_id) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Order is missing required region or sales channel"
      )
    }

    const cartService = container.resolve(Modules.CART) as unknown as CartService

    const createdCart = await cartService.createCarts({
      region_id: order.region_id,
      sales_channel_id: order.sales_channel_id,
      currency_code: order.currency_code || undefined,
      customer_id: order.customer_id,
      email: order.email || undefined,
      billing_address: sanitizeAddressForCart(order.billing_address),
      shipping_address: sanitizeAddressForCart(order.shipping_address),
      metadata: {
        reorder_source_order_id: order.id,
      },
    })
    const cart = Array.isArray(createdCart) ? createdCart[0] : createdCart

    const variantIds = Array.from(
      new Set(
        order.items
          .map((item) => item.variant_id)
          .filter((variantId): variantId is string => Boolean(variantId))
      )
    )

    let variantMap = new Map<string, ProductVariantRecord>()

    if (variantIds.length > 0) {
      const { data: variants } = await query.graph({
        entity: "product_variant",
        fields: [
          "id",
          "sku",
          "title",
          "product_id",
          "manage_inventory",
          "allow_backorder",
          "inventory_quantity",
          "product.id",
          "product.status",
        ],
        filters: {
          id: variantIds,
        },
      })

      variantMap = new Map(
        variants.map((variant) => [
          (variant as ProductVariantRecord).id,
          variant as ProductVariantRecord,
        ])
      )
    }

    const addedItems: AddedItem[] = []
    const unavailableItems: UnavailableItem[] = []

    for (const item of order.items || []) {
      const variantId = item.variant_id || null

      if (!variantId) {
        unavailableItems.push({
          order_item_id: item.id,
          variant_id: null,
          product_id: item.product_id || null,
          title: item.title || "Unknown item",
          quantity: item.quantity,
          reason: "Original order item has no variant id",
        })
        continue
      }

      const variant = variantMap.get(variantId)

      if (!variant) {
        unavailableItems.push({
          order_item_id: item.id,
          variant_id: variantId,
          product_id: item.product_id || null,
          title: item.title || "Unknown item",
          quantity: item.quantity,
          reason: "Variant no longer exists",
        })
        continue
      }

      if (variant.product?.status !== "published") {
        unavailableItems.push({
          order_item_id: item.id,
          variant_id: variantId,
          product_id: variant.product_id || item.product_id || null,
          title: item.title || variant.title || "Unknown item",
          quantity: item.quantity,
          reason: "Variant product is not published",
        })
        continue
      }

      const hasInventoryConstraint =
        Boolean(variant.manage_inventory) &&
        !variant.allow_backorder &&
        typeof variant.inventory_quantity === "number"

      if (hasInventoryConstraint && (variant.inventory_quantity as number) < item.quantity) {
        unavailableItems.push({
          order_item_id: item.id,
          variant_id: variantId,
          product_id: variant.product_id || item.product_id || null,
          title: item.title || variant.title || "Unknown item",
          quantity: item.quantity,
          reason: "Insufficient inventory",
        })
        continue
      }

      try {
        await addToCartWorkflow(container).run({
          input: {
            cart_id: cart.id,
            items: [
              {
                variant_id: variantId,
                quantity: item.quantity,
              },
            ],
          },
        })

        addedItems.push({
          order_item_id: item.id,
          variant_id: variantId,
          quantity: item.quantity,
        })
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unable to add item"

        unavailableItems.push({
          order_item_id: item.id,
          variant_id: variantId,
          product_id: variant.product_id || item.product_id || null,
          title: item.title || variant.title || "Unknown item",
          quantity: item.quantity,
          reason: message,
        })
      }
    }

    const unavailableProductIds = Array.from(
      new Set(
        unavailableItems
          .map((item) => item.product_id)
          .filter((productId): productId is string => Boolean(productId))
      )
    )

    const productMap = new Map<string, ProductRecord>()

    if (unavailableProductIds.length > 0) {
      const { data: products } = await query.graph({
        entity: "product",
        fields: ["id", "status", "variants.id", "variants.title", "variants.sku"],
        filters: {
          id: unavailableProductIds,
          status: "published",
        },
      })

      for (const product of products) {
        const record = product as ProductRecord
        productMap.set(record.id, record)
      }
    }

    const suggestedVariants: SuggestedVariants[] = []

    for (const item of unavailableItems) {
      if (!item.product_id) {
        continue
      }

      const product = productMap.get(item.product_id)

      if (!product?.variants?.length) {
        continue
      }

      const suggestions = product.variants
        .filter((variant) => variant.id !== item.variant_id)
        .slice(0, 3)
        .map((variant) => ({
          id: variant.id,
          title: variant.title || "Variant",
          sku: variant.sku || null,
        }))

      if (suggestions.length === 0) {
        continue
      }

      suggestedVariants.push({
        order_item_id: item.order_item_id,
        original_variant_id: item.variant_id,
        product_id: item.product_id,
        variants: suggestions,
      })
    }

    const output: ReorderOrderStepOutput = {
      cart_id: cart.id,
      added_items: addedItems,
      unavailable_items: unavailableItems,
      suggested_variants: suggestedVariants,
    }

    return new StepResponse(output, { created_cart_id: cart.id })
  },
  async (compensationInput, { container }) => {
    if (!compensationInput?.created_cart_id) {
      return
    }

    const cartService = container.resolve(Modules.CART) as unknown as CartService
    await cartService.deleteCarts(compensationInput.created_cart_id)
  }
)
