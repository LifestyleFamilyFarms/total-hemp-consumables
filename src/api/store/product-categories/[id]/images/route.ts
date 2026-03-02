import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

type CategoryRecord = {
  id: string
  metadata?: Record<string, unknown> | null
}

const normalizeImages = (metadata: Record<string, unknown> | null | undefined) => {
  const contract =
    metadata && typeof metadata.category_images === "object"
      ? (metadata.category_images as Record<string, unknown>)
      : {}

  const thumbnail = typeof contract.thumbnail === "string" ? contract.thumbnail : null
  const banner = typeof contract.banner === "string" ? contract.banner : null
  const gallery = Array.isArray(contract.gallery)
    ? contract.gallery.filter((value): value is string => typeof value === "string")
    : []

  return {
    thumbnail,
    banner,
    gallery,
  }
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params as { id: string }

  const query = req.scope.resolve("query") as {
    graph: (input: Record<string, unknown>) => Promise<{
      data: CategoryRecord[]
    }>
  }

  const { data: categories } = await query.graph({
    entity: "product_category",
    fields: ["id", "metadata"],
    filters: {
      id,
    },
  })

  if (!categories.length) {
    return res.status(404).json({ message: "Category not found" })
  }

  const category = categories[0]

  return res.status(200).json({
    category_id: category.id,
    images: normalizeImages(category.metadata),
  })
}
