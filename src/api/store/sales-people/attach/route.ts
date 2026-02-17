import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { attachRepAttributionWorkflow } from "../../../../workflows/sales-people"
import type { AttachSalesPersonBody } from "./middlewares"

export async function POST(
  req: MedusaRequest<AttachSalesPersonBody>,
  res: MedusaResponse
) {
  try {
    const { result } = await attachRepAttributionWorkflow(req.scope).run({
      input: req.validatedBody,
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
