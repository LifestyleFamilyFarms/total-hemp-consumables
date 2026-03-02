import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { addWishlistItemWorkflow } from "../../../../../../workflows/wishlist"
import type { AddWishlistItemBody } from "./middlewares"

export async function POST(
  req: AuthenticatedMedusaRequest<AddWishlistItemBody>,
  res: MedusaResponse
) {
  const { result } = await addWishlistItemWorkflow(req.scope).run({
    input: {
      customer_id: req.auth_context.actor_id,
      variant_id: req.validatedBody.variant_id,
    },
  })

  return res.status(200).json(result)
}
