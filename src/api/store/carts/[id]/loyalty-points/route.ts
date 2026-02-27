import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { MedusaError } from "@medusajs/framework/utils"
import {
  applyLoyaltyOnCartWorkflow,
  removeLoyaltyFromCartWorkflow,
} from "../../../../../workflows/loyalty"
import type { LoyaltyPointsCartBody } from "./middlewares"

type ErrorLike = {
  message?: unknown
  type?: unknown
  cause?: unknown
  error?: unknown
}

const normalizeError = (
  error: unknown
): {
  type?: string
  message: string
} => {
  if (error instanceof MedusaError) {
    return {
      type: error.type,
      message: error.message,
    }
  }

  if (error && typeof error === "object") {
    const candidate = error as ErrorLike

    if (candidate.error) {
      const nested = normalizeError(candidate.error)
      if (nested.message !== "Loyalty request failed") {
        return nested
      }
    }

    if (candidate.cause) {
      const nested = normalizeError(candidate.cause)
      if (nested.message !== "Loyalty request failed") {
        return nested
      }
    }

    if (typeof candidate.message === "string") {
      return {
        type: typeof candidate.type === "string" ? candidate.type : undefined,
        message: candidate.message,
      }
    }
  }

  if (typeof error === "string") {
    return {
      message: error,
    }
  }

  return {
    message: "Loyalty request failed",
  }
}

const toHttpError = (error: unknown) => {
  const normalized = normalizeError(error)

  if (normalized.type === MedusaError.Types.NOT_ALLOWED) {
    return {
      status: 403,
      message: normalized.message,
    }
  }

  if (normalized.type === MedusaError.Types.NOT_FOUND) {
    return {
      status: 404,
      message: normalized.message,
    }
  }

  if (normalized.type === MedusaError.Types.UNAUTHORIZED) {
    return {
      status: 401,
      message: normalized.message,
    }
  }

  if (
    normalized.type === MedusaError.Types.INVALID_DATA ||
    normalized.type === MedusaError.Types.INVALID_ARGUMENT ||
    normalized.type === MedusaError.Types.CONFLICT
  ) {
    return {
      status: 400,
      message: normalized.message,
    }
  }

  return {
    status: normalized.message === "Loyalty request failed" ? 500 : 400,
    message: normalized.message,
  }
}

export async function POST(
  req: AuthenticatedMedusaRequest<LoyaltyPointsCartBody>,
  res: MedusaResponse
) {
  try {
    const { id: cart_id } = req.params as { id: string }

    const { result: cart } = await applyLoyaltyOnCartWorkflow(req.scope).run({
      input: {
        cart_id,
        actor_id: req.auth_context.actor_id,
      },
    })

    res.json({ cart })
  } catch (error) {
    const httpError = toHttpError(error)
    res.status(httpError.status).json({ message: httpError.message })
  }
}

export async function DELETE(
  req: AuthenticatedMedusaRequest<LoyaltyPointsCartBody>,
  res: MedusaResponse
) {
  try {
    const { id: cart_id } = req.params as { id: string }

    const { result: cart } = await removeLoyaltyFromCartWorkflow(req.scope).run({
      input: {
        cart_id,
        actor_id: req.auth_context.actor_id,
      },
    })

    res.json({ cart })
  } catch (error) {
    const httpError = toHttpError(error)
    res.status(httpError.status).json({ message: httpError.message })
  }
}
