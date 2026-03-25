import type { MedusaContainer } from "@medusajs/framework/types"
import { processAbandonedCartsWorkflow } from "../workflows/abandoned-cart"

const DEFAULT_LOOKBACK_HOURS = 24
const DEFAULT_LIMIT = 100

export default async function processAbandonedCartsJob(
  container: MedusaContainer
) {
  const logger = container.resolve("logger")

  const disabled = (process.env.ABANDONED_CART_JOB_DISABLED || "")
    .trim()
    .toLowerCase()

  if (["1", "true", "yes"].includes(disabled)) {
    return
  }

  const lookbackHours = parsePositive(
    process.env.ABANDONED_CART_PROCESS_LOOKBACK_HOURS,
    DEFAULT_LOOKBACK_HOURS
  )
  const limit = Math.floor(
    parsePositive(process.env.ABANDONED_CART_PROCESS_LIMIT, DEFAULT_LIMIT)
  )

  try {
    const { result } = await processAbandonedCartsWorkflow(container).run({
      input: {
        lookback_hours: lookbackHours,
        limit,
        dry_run: false,
      },
    })

    const sent = result?.notification_sent_count ?? 0
    if (sent > 0) {
      logger.info(
        `[abandoned-cart-job] Sent ${sent} abandoned cart notification(s).`
      )
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error"
    logger.warn(`[abandoned-cart-job] Failed: ${message}`)
  }
}

function parsePositive(value: string | undefined, fallback: number): number {
  const parsed = Number.parseFloat((value || "").trim())
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

export const config = {
  name: "process-abandoned-carts",
  schedule: "0 */4 * * *",
}
