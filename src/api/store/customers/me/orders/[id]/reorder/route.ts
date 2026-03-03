import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { MedusaError } from "@medusajs/framework/utils"
import { createReorderWorkflow } from "../../../../../../../workflows/reorder"

export async function POST(req: AuthenticatedMedusaRequest, res: MedusaResponse) {
  const { id } = req.params as { id: string }

  try {
    const { result } = await createReorderWorkflow(req.scope).run({
      input: {
        order_id: id,
        actor_id: req.auth_context.actor_id,
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
          "You are not allowed to reorder this order",
      })
    }

    throw error
  }
}
