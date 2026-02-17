import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { assignSalesStoreWorkflow } from "../../../../workflows/sales-people"
import type { AssignSalesStoreBody } from "./middlewares"

export async function POST(
  req: MedusaRequest<AssignSalesStoreBody>,
  res: MedusaResponse
) {
  const body = req.validatedBody
  const { result } = await assignSalesStoreWorkflow(req.scope).run({
    input: {
      sales_person_id: body.sales_person_id,
      sales_store_id: body.sales_store_id,
      notes: body.notes,
    },
  })

  return res.status(200).json({ assignment: result.assignment })
}
