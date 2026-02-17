import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { unassignSalesStoreWorkflow } from "../../../../../workflows/sales-people"
import type { UnassignSalesStoreBody } from "./middlewares"

export async function POST(
  req: MedusaRequest<UnassignSalesStoreBody>,
  res: MedusaResponse
) {
  await unassignSalesStoreWorkflow(req.scope).run({
    input: {
      sales_store_id: req.validatedBody.sales_store_id,
    },
  })

  return res.status(200).json({ success: true })
}
