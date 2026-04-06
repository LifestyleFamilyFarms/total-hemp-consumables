import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"

/**
 * DIAGNOSTIC ONLY — dumps the event bus subscriber map to verify
 * which events have subscribers registered on this process.
 * Remove after debugging.
 */
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const eventBus = req.scope.resolve(Modules.EVENT_BUS) as unknown as {
    eventToSubscribersMap: Map<string | symbol, Array<{ id: string }>>
  }

  const map: Record<string, string[]> = {}
  for (const [event, subscribers] of eventBus.eventToSubscribersMap.entries()) {
    map[String(event)] = subscribers.map((s) => s.id)
  }

  res.json({
    process: process.env.MEDUSA_WORKER_MODE || "shared",
    subscriberCount: Object.keys(map).length,
    events: map,
  })
}
