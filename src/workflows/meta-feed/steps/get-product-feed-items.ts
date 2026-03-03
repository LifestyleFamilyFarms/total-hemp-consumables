import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import {
  getVariantAvailability,
  QueryContext,
} from "@medusajs/framework/utils"

export type FeedItem = {
  id: string
  title: string
  description: string
  link: string
  image_link?: string
  additional_image_link?: string
  availability: "in stock" | "out of stock"
  price: string
  sale_price?: string
  item_group_id: string
  condition: "new"
  brand?: string
}

type GetProductFeedItemsStepInput = {
  currency_code: string
  country_code: string
}

const formatPrice = (price: number, currencyCode: string) => {
  return `${price.toFixed(2)} ${currencyCode.toUpperCase()}`
}

const pickFirstImage = (product: Record<string, any>) => {
  const thumbnail = typeof product.thumbnail === "string" ? product.thumbnail : ""

  if (thumbnail) {
    return thumbnail
  }

  const firstImage = Array.isArray(product.images) ? product.images[0] : null

  if (firstImage && typeof firstImage.url === "string") {
    return firstImage.url
  }

  return ""
}

export const getProductFeedItemsStep = createStep(
  "meta-feed-get-product-feed-items",
  async (input: GetProductFeedItemsStepInput, { container }) => {
    const query = container.resolve("query") as any
    const configModule = container.resolve("configModule") as {
      admin?: {
        storefrontUrl?: string
      }
    }

    const storefrontUrl =
      configModule.admin?.storefrontUrl || process.env.MEDUSA_STOREFRONT_URL || process.env.STOREFRONT_URL || ""

    const feedItems: FeedItem[] = []

    const countryCode = input.country_code.toLowerCase()
    const currencyCode = input.currency_code.toLowerCase()

    const limit = 100
    let offset = 0
    let total = 0

    do {
      const { data: products, metadata } = await query.graph({
        entity: "product",
        fields: [
          "id",
          "title",
          "description",
          "handle",
          "thumbnail",
          "images.*",
          "status",
          "variants.id",
          "variants.sku",
          "variants.title",
          "variants.calculated_price.*",
          "sales_channels.id",
          "sales_channels.stock_locations.id",
          "sales_channels.stock_locations.address.country_code",
        ],
        filters: {
          status: "published",
        },
        context: {
          variants: {
            calculated_price: QueryContext({
              currency_code: currencyCode,
            }),
          },
        },
        pagination: {
          take: limit,
          skip: offset,
        },
      })

      total = metadata?.count ?? 0
      offset += limit

      for (const product of products || []) {
        const variants = Array.isArray(product.variants) ? product.variants : []

        if (!variants.length) {
          continue
        }

        const selectedSalesChannel = (product.sales_channels || []).find((channel: any) => {
          return (channel?.stock_locations || []).some((location: any) => {
            const cc = location?.address?.country_code
            return typeof cc === "string" && cc.toLowerCase() === countryCode
          })
        })

        // Only include product variants that are scoped to the requested country.
        if (!selectedSalesChannel?.id) {
          continue
        }

        const availabilityMap = await getVariantAvailability(query, {
          variant_ids: variants.map((variant: any) => variant.id),
          sales_channel_id: selectedSalesChannel.id,
        })

        for (const variant of variants) {
          const calculatedPrice = Number(
            variant?.calculated_price?.calculated_amount ??
              variant?.calculated_price?.calculated_price?.amount ??
              0
          )
          const originalPrice = Number(
            variant?.calculated_price?.original_amount ?? calculatedPrice
          )

          const availabilityEntry = availabilityMap?.[variant.id]

          // Availability must come from the selected sales channel only.
          if (!availabilityEntry) {
            continue
          }

          const availability =
            availabilityEntry.availability !== null &&
            availabilityEntry.availability > 0
              ? "in stock"
              : "out of stock"

          const handle =
            typeof product.handle === "string" && product.handle
              ? product.handle
              : typeof product.id === "string"
              ? product.id
              : ""

          const item: FeedItem = {
            id: variant.id,
            title: `${product.title || "Product"} - ${variant.title || variant.sku || variant.id}`,
            description: product.description || product.title || "",
            link: storefrontUrl ? `${storefrontUrl}/products/${handle}` : `/products/${handle}`,
            image_link: pickFirstImage(product) || undefined,
            availability,
            price: formatPrice(originalPrice, currencyCode),
            item_group_id: product.id,
            condition: "new",
            brand: "Total Hemp",
          }

          if (calculatedPrice < originalPrice) {
            item.sale_price = formatPrice(calculatedPrice, currencyCode)
          }

          if (Array.isArray(product.images) && product.images.length > 1) {
            const additional = product.images[1]
            if (additional && typeof additional.url === "string") {
              item.additional_image_link = additional.url
            }
          }

          feedItems.push(item)
        }
      }
    } while (offset < total)

    return new StepResponse({ items: feedItems })
  }
)
