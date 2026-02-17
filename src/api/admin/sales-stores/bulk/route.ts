import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { upsertSalesStoreWorkflow } from "../../../../workflows/sales-stores"
import type { UpsertSalesStoresBody } from "./middlewares"

export async function POST(
  req: MedusaRequest<UpsertSalesStoresBody>,
  res: MedusaResponse
) {
  const body = req.validatedBody

  let created = 0
  const stores: unknown[] = []

  for (const storeInput of body.stores) {
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
