import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"
import { upsertSalesStoreWorkflow } from "../../../../workflows/sales-stores"

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

  let created = 0
  const stores: unknown[] = []

  for (const storeInput of parsed.data.stores) {
    const { result } = await upsertSalesStoreWorkflow(req.scope).run({
      input: storeInput,
    })

    if (result.created) {
      created += 1
    }
    stores.push(result.store)
  }

  const updated = stores.length - created

  return res.status(200).json({
    created,
    updated,
    stores,
  })
}
