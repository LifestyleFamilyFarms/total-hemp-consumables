/**
 * Register ShipStation webhook for tracking updates.
 *
 * Run: npx medusa exec src/scripts/register-shipstation-webhook.ts
 *
 * Requires:
 *   - SHIPSTATION_API_KEY / SHIPSTATION_API_SECRET (or env-split variants)
 *   - SHIPSTATION_WEBHOOK_SECRET
 *   - MEDUSA_BACKEND_URL (the public Railway URL)
 */
import { ExecArgs } from "@medusajs/framework/types"

export default async function registerShipStationWebhook({ container }: ExecArgs) {
  const logger = container.resolve("logger") as {
    info: (msg: string) => void
    error: (msg: string) => void
  }

  const backendUrl = (process.env.MEDUSA_BACKEND_URL || "").trim().replace(/\/+$/, "")
  if (!backendUrl) {
    logger.error("MEDUSA_BACKEND_URL is required")
    return
  }

  const webhookUrl = `${backendUrl}/hooks/shipstation/tracking`
  const webhookSecret = (process.env.SHIPSTATION_WEBHOOK_SECRET || "").trim()
  if (!webhookSecret) {
    logger.error("SHIPSTATION_WEBHOOK_SECRET is required")
    return
  }

  // Resolve ShipStation credentials
  const { resolveShipstationEnv } = await import("../utils/shipstation-env")
  const env = resolveShipstationEnv(process.env.NODE_ENV)

  if (!env.apiKey) {
    logger.error("ShipStation API key not configured")
    return
  }

  const authHeader = env.apiSecret
    ? `Basic ${Buffer.from(`${env.apiKey}:${env.apiSecret}`).toString("base64")}`
    : undefined
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(authHeader ? { Authorization: authHeader } : { "api-key": env.apiKey }),
  }

  // Check existing webhooks first
  logger.info("Checking existing ShipStation webhooks...")
  const listResp = await fetch("https://api.shipstation.com/v2/environment/webhooks", { headers })
  if (listResp.ok) {
    const existing = await listResp.json()
    const webhooks = existing?.webhooks || existing || []
    if (Array.isArray(webhooks)) {
      const alreadyRegistered = webhooks.find(
        (w: Record<string, unknown>) => w.url === webhookUrl || w.webhook_url === webhookUrl
      )
      if (alreadyRegistered) {
        logger.info(`Webhook already registered: ${JSON.stringify(alreadyRegistered)}`)
        return
      }
    }
  }

  // Register new webhook
  logger.info(`Registering webhook: ${webhookUrl}`)
  const resp = await fetch("https://api.shipstation.com/v2/environment/webhooks", {
    method: "POST",
    headers,
    body: JSON.stringify({
      url: webhookUrl,
      event: "track",
      secret: webhookSecret,
    }),
  })

  if (!resp.ok) {
    const body = await resp.text()
    logger.error(`Failed to register webhook (HTTP ${resp.status}): ${body}`)
    return
  }

  const result = await resp.json()
  logger.info(`Webhook registered successfully: ${JSON.stringify(result)}`)
}
