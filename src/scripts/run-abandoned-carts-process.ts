import type { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { processAbandonedCartsWorkflow } from "../workflows/abandoned-cart"

const DEFAULT_LOOKBACK_HOURS = 24
const DEFAULT_LIMIT = 100

const toPositiveNumber = (
  value: string | undefined,
  fallback: number
): number => {
  const parsed = Number.parseFloat((value || "").trim())

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback
  }

  return parsed
}

const toBoolean = (
  value: string | undefined,
  fallback: boolean
): boolean => {
  const normalized = (value || "").trim().toLowerCase()

  if (!normalized) {
    return fallback
  }

  if (["1", "true", "yes", "y"].includes(normalized)) {
    return true
  }

  if (["0", "false", "no", "n"].includes(normalized)) {
    return false
  }

  return fallback
}

export default async function runAbandonedCartsProcess({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER) as {
    info: (message: string) => void
  }

  const lookbackHours = toPositiveNumber(
    process.env.ABANDONED_CART_PROCESS_LOOKBACK_HOURS,
    DEFAULT_LOOKBACK_HOURS
  )
  const limit = Math.floor(
    toPositiveNumber(
      process.env.ABANDONED_CART_PROCESS_LIMIT,
      DEFAULT_LIMIT
    )
  )
  const dryRun = toBoolean(process.env.ABANDONED_CART_PROCESS_DRY_RUN, true)

  const { result } = await processAbandonedCartsWorkflow(container).run({
    input: {
      lookback_hours: lookbackHours,
      limit,
      dry_run: dryRun,
    },
  })

  logger.info(
    `[abandoned-cart-process] completed dry_run=${dryRun} lookback_hours=${lookbackHours} limit=${limit}`
  )
  console.log(JSON.stringify(result, null, 2))
}
