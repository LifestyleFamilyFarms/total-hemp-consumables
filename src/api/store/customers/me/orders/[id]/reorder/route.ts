import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { createReorderWorkflow } from "../../../../../../../workflows/reorder"

export async function POST(req: AuthenticatedMedusaRequest, res: MedusaResponse) {
  const { id } = req.params as { id: string }

  const { result } = await createReorderWorkflow(req.scope).run({
    input: {
      order_id: id,
      actor_id: req.auth_context.actor_id,
    },
  })

  return res.status(200).json(result)
}
