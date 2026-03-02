import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { processAbandonedCartsWorkflow } from "../../../../workflows/abandoned-cart"
import type { ProcessAbandonedCartsBody } from "./middlewares"

export async function POST(
  req: MedusaRequest<ProcessAbandonedCartsBody>,
  res: MedusaResponse
) {
  const { result } = await processAbandonedCartsWorkflow(req.scope).run({
    input: {
      lookback_hours: req.validatedBody.lookback_hours,
      limit: req.validatedBody.limit,
      dry_run: req.validatedBody.dry_run,
    },
  })

  return res.status(200).json(result)
}
