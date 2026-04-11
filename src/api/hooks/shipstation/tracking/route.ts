import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import { createHmac, timingSafeEqual } from "node:crypto";
import { ShipStationClient } from "../../../../modules/shipstation/client";
import { resolveShipstationEnv } from "../../../../utils/shipstation-env";
import type {
  ShipStationWebhookPayload,
  TrackingInfo,
} from "../../../../modules/shipstation/types";

/** Tracking statuses that trigger a delivery confirmation email */
const DELIVERED_STATUSES = new Set(["delivered"]);

/** Tracking statuses that trigger a delivery exception email */
const EXCEPTION_STATUSES = new Set([
  "delivery_failed",
  "return_to_sender",
  "exception",
  "undeliverable",
  "held_by_carrier",
  "attempt_failed",
  "error",
]);

/** Max webhook body size: 10 KB */
const MAX_BODY = 10 * 1024;

/** Allowed hostnames for resource_url fetches */
const ALLOWED_HOSTS = new Set(["api.shipstation.com", "ssapi.shipstation.com"]);

function verifySignature(
  rawBody: Buffer,
  signature: string,
  secret: string,
): boolean {
  if (!signature || !secret) return false;
  try {
    const computed = Buffer.from(
      createHmac("sha256", secret).update(rawBody).digest("base64"),
    );
    const expected = Buffer.from(signature);
    if (computed.length !== expected.length) return false;
    return timingSafeEqual(computed, expected);
  } catch {
    return false;
  }
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER) as {
    info: (msg: string) => void;
    warn: (msg: string) => void;
  };

  const secret = (process.env.SHIPSTATION_WEBHOOK_SECRET || "").trim();
  if (!secret) {
    logger.warn(
      "[ss-webhook-tracking] SHIPSTATION_WEBHOOK_SECRET not configured",
    );
    return res.sendStatus(500);
  }

  // Read raw body for HMAC
  const chunks: Buffer[] = [];
  let totalLength = 0;
  for await (const chunk of req as unknown as AsyncIterable<Buffer>) {
    totalLength += chunk.length;
    if (totalLength > MAX_BODY) {
      logger.warn("[ss-webhook-tracking] Payload exceeds 10 KB limit");
      return res.sendStatus(413);
    }
    chunks.push(chunk);
  }
  const rawBody = Buffer.concat(chunks);

  // Validate signature
  const signature = (req.headers["x-shipstation-signature"] as string) || "";
  if (!verifySignature(rawBody, signature, secret)) {
    logger.warn("[ss-webhook-tracking] Invalid webhook signature");
    return res.sendStatus(401);
  }

  // Parse payload before acknowledging
  let payload: ShipStationWebhookPayload;
  try {
    payload = JSON.parse(rawBody.toString("utf-8"));
  } catch {
    logger.warn("[ss-webhook-tracking] Failed to parse webhook body");
    return res.sendStatus(400);
  }

  if (!payload || typeof payload !== "object") {
    logger.warn("[ss-webhook-tracking] Invalid payload shape");
    return res.sendStatus(400);
  }

  // Acknowledge receipt — remaining processing is async via event bus
  res.sendStatus(200);

  // Resolve tracking info — try inline data first, then resource_url fetch
  let trackingInfo: TrackingInfo | null = null;
  let labelId: string | null = null;

  if (payload.data?.label_id && payload.data?.status_code) {
    // Inline tracking data
    labelId = payload.data.label_id;
    trackingInfo = {
      tracking_number: payload.data.tracking_number || "",
      status_code: payload.data.status_code as TrackingInfo["status_code"],
      carrier_status_description:
        (payload.data.carrier_status_description as string) || "",
      actual_delivery_date:
        (payload.data.actual_delivery_date as string) || undefined,
      exception_description:
        (payload.data.exception_description as string) || undefined,
    };
  } else if (payload.resource_url) {
    // Validate resource_url hostname to prevent SSRF
    try {
      const resourceHost = new URL(payload.resource_url).hostname;
      if (!ALLOWED_HOSTS.has(resourceHost)) {
        logger.warn(
          `[ss-webhook-tracking] Blocked resource_url with disallowed host: ${resourceHost}`,
        );
        return;
      }
    } catch {
      logger.warn("[ss-webhook-tracking] Invalid resource_url");
      return;
    }
    // Fetch from resource_url
    try {
      const env = resolveShipstationEnv(process.env.NODE_ENV);
      const client = new ShipStationClient({
        api_key: env.apiKey,
        api_secret: env.apiSecret,
      });
      // resource_url is a full URL — extract the label_id from it
      const urlMatch = payload.resource_url.match(/label_id=([^&]+)/);
      if (urlMatch) {
        labelId = urlMatch[1];
        trackingInfo = await client.getTrackingInfo(labelId);
      } else {
        // Try fetching resource_url directly via the client's auth
        const resp = await fetch(payload.resource_url, {
          headers: {
            "api-key": env.apiKey,
            Accept: "application/json",
          },
        });
        if (resp.ok) {
          const data = await resp.json();
          labelId = data.label_id || null;
          trackingInfo = data as TrackingInfo;
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      logger.warn(
        `[ss-webhook-tracking] Failed to fetch tracking from resource_url: ${msg}`,
      );
      return;
    }
  }

  if (!trackingInfo || !labelId) {
    logger.warn(
      "[ss-webhook-tracking] No tracking info or label_id resolved from webhook",
    );
    return;
  }

  // Determine action
  const status = trackingInfo.status_code;
  let action: "delivered" | "exception" | null = null;
  if (DELIVERED_STATUSES.has(status)) {
    action = "delivered";
  } else if (EXCEPTION_STATUSES.has(status)) {
    action = "exception";
  }

  if (!action) {
    logger.info(
      `[ss-webhook-tracking] Ignoring status "${status}" for label ${labelId}`,
    );
    return;
  }

  // Emit event for subscriber
  try {
    const eventBus = req.scope.resolve(Modules.EVENT_BUS);
    await eventBus.emit({
      name: "shipstation.tracking_updated",
      data: {
        label_id: labelId,
        action,
        tracking: {
          number: trackingInfo.tracking_number,
          url: trackingInfo.tracking_url || "",
          status_code: trackingInfo.status_code,
          carrier_description: trackingInfo.carrier_status_description || "",
          actual_delivery_date: trackingInfo.actual_delivery_date || null,
          exception_description: trackingInfo.exception_description || null,
        },
      },
    });
    logger.info(
      `[ss-webhook-tracking] Emitted tracking_updated (${action}) for label ${labelId}`,
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    logger.warn(`[ss-webhook-tracking] Failed to emit event: ${msg}`);
  }
}
