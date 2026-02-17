import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"
import { unassignSalesStoreWorkflow } from "../../../../../workflows/sales-people"

const UnassignSchema = z.object({
  sales_store_id: z.string().trim().min(1),
})

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const parsed = UnassignSchema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid unassign payload.",
      errors: parsed.error.flatten(),
    })
  }

  await unassignSalesStoreWorkflow(req.scope).run({
    input: {
      sales_store_id: parsed.data.sales_store_id,
    },
  })

  return res.status(200).json({ success: true })
}
