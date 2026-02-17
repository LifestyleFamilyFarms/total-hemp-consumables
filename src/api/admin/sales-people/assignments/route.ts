import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"
import { assignSalesStoreWorkflow } from "../../../../workflows/sales-people"

const AssignmentSchema = z.object({
  sales_person_id: z.string().trim().min(1),
  sales_store_id: z.string().trim().min(1),
  notes: z.string().optional(),
})

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const parsed = AssignmentSchema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid assignment payload.",
      errors: parsed.error.flatten(),
    })
  }

  const { result } = await assignSalesStoreWorkflow(req.scope).run({
    input: {
      sales_person_id: parsed.data.sales_person_id,
      sales_store_id: parsed.data.sales_store_id,
      notes: parsed.data.notes,
    },
  })

  return res.status(200).json({ assignment: result.assignment })
}
