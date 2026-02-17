import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"
import { attachRepAttributionWorkflow } from "../../../../workflows/sales-people"

const AttachSchema = z.object({
  rep_code: z.string().trim().min(1),
  cart_id: z.string().trim().optional(),
  customer_id: z.string().trim().optional(),
})

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const parsed = AttachSchema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid rep attribution payload.",
      errors: parsed.error.flatten(),
    })
  }

  try {
    const { result } = await attachRepAttributionWorkflow(req.scope).run({
      input: parsed.data,
    })

    return res.status(200).json({
      person: result.person,
      metadata: result.metadata,
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to attach rep attribution."
    if (message.includes("Sales person not found")) {
      return res.status(404).json({ message: "Sales person not found." })
    }
    return res.status(500).json({ message })
  }
}
