import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { MedusaError } from "@medusajs/framework/utils"
import { getFirstPurchaseDiscountCode } from "../../../../../config/feature-flags"
import { applyFirstPurchaseDiscountWorkflow } from "../../../../../workflows/first-purchase"
import type { ApplyFirstPurchaseDiscountBody } from "./middlewares"

export async function POST(
  req: AuthenticatedMedusaRequest<ApplyFirstPurchaseDiscountBody>,
  res: MedusaResponse
) {
  const { id: cartId } = req.params as { id: string }

  try {
    const { result } = await applyFirstPurchaseDiscountWorkflow(req.scope).run({
      input: {
        cart_id: cartId,
        actor_id: req.auth_context.actor_id,
        promotion_code: getFirstPurchaseDiscountCode(),
      },
    })

    return res.status(200).json(result)
  } catch (error) {
    const errorType =
      error instanceof MedusaError ? error.type : (error as { type?: string })?.type

    if (errorType === MedusaError.Types.NOT_ALLOWED || errorType === "not_allowed") {
      return res.status(403).json({
        type: "not_allowed",
        message:
          (error as { message?: string })?.message ||
          "You can only apply first-purchase discounts on your own cart",
      })
    }

    throw error
  }
}
