import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { removeWishlistItemWorkflow } from "../../../../../../../workflows/wishlist"

export async function DELETE(req: AuthenticatedMedusaRequest, res: MedusaResponse) {
  const { id } = req.params as { id: string }

  const { result } = await removeWishlistItemWorkflow(req.scope).run({
    input: {
      customer_id: req.auth_context.actor_id,
      item_id: id,
    },
  })

  return res.status(200).json(result)
}
