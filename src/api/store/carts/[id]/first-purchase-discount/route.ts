import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { getFirstPurchaseDiscountCode } from "../../../../../config/feature-flags"
import { applyFirstPurchaseDiscountWorkflow } from "../../../../../workflows/first-purchase"
import type { ApplyFirstPurchaseDiscountBody } from "./middlewares"

export async function POST(
  req: AuthenticatedMedusaRequest<ApplyFirstPurchaseDiscountBody>,
  res: MedusaResponse
) {
  const { id: cartId } = req.params as { id: string }

  const { result } = await applyFirstPurchaseDiscountWorkflow(req.scope).run({
    input: {
      cart_id: cartId,
      actor_id: req.auth_context.actor_id,
      promotion_code: getFirstPurchaseDiscountCode(),
    },
  })

  return res.status(200).json(result)
}
