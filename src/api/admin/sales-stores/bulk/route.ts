import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"

const SalesStoreSchema = z.object({
  name: z.string().trim().optional(),
  address: z.string().trim().min(1),
  lat: z.number().optional(),
  lng: z.number().optional(),
  source: z.string().optional(),
  stage: z.string().optional(),
  notes: z.string().optional(),
  assigned_sales_person_id: z.string().trim().optional(),
})

const BulkSchema = z.object({
  stores: z.array(SalesStoreSchema).min(1),
})

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const parsed = BulkSchema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid stores payload.",
      errors: parsed.error.flatten(),
    })
  }

  const service = req.scope.resolve("salesStores") as {
    upsertStores: (inputs: Array<Record<string, unknown>>) => Promise<
      Array<{ store: unknown; created: boolean }>
    >
  }

  const results = await service.upsertStores(parsed.data.stores)
  const created = results.filter((entry) => entry.created).length
  const updated = results.length - created

  return res.status(200).json({
    created,
    updated,
    stores: results.map((entry) => entry.store),
  })
}
