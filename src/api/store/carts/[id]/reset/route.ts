import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { resetCartWorkflow } from "../../../../../workflows/carts"
import type { ResetCartBody } from "./middlewares"

export const POST = async (
  req: MedusaRequest<ResetCartBody>,
  res: MedusaResponse
) => {
  const { id } = req.params as { id: string }

  if (!id) {
    res.status(400).json({ message: "Missing cart id" })
    return
  }

  try {
    const { result } = await resetCartWorkflow(req.scope).run({
      input: { cart_id: id },
    })

    res.status(200).json(result)
    return
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to reset cart."
    if (message.includes("Cart not found")) {
      res.status(404).json({ message: "Cart not found" })
      return
    }
    res.status(500).json({ message })
  }
}
