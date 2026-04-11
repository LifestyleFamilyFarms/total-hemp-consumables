# ShipStation Webhook Tracking — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Receive ShipStation tracking webhooks and send customers delivery confirmation or delivery exception emails via SendGrid.

**Architecture:** Thin webhook API route validates HMAC, emits Medusa event. Idempotent subscriber determines email type (delivered vs exception), sends via existing `ssSendGridSend()`. Storefront gets minor tracking display update.

**Tech Stack:** Medusa.js v2 (API routes, event bus, subscribers), ShipStation v2 API, SendGrid v3 API, Next.js 15 (storefront)

**Repos:**
- Backend: `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables`
- Storefront: `/Users/franciscraven/Desktop/total-hemp/sober-sativas-storefront`

---

## File Structure

### Backend (total-hemp-consumables)

| File | Action | Responsibility |
|---|---|---|
| `src/modules/shipstation/types.ts` | Edit | Add `TrackingInfo` and `TrackingEvent` types |
| `src/modules/shipstation/client.ts` | Edit | Add `getTrackingInfo(labelId)` method |
| `src/api/hooks/shipstation/tracking/middlewares.ts` | Create | Disable body parsing + skip auth for webhook route |
| `src/api/hooks/shipstation/tracking/route.ts` | Create | Webhook receiver: validate HMAC, fetch tracking, emit event |
| `src/api/middlewares.ts` | Edit | Register webhook route middlewares |
| `src/subscribers/ss-tracking-update.ts` | Create | Listen for tracking event, send delivery/exception email |
| `docs/email-templates/delivery-confirmation.html` | Create | "Your order has been delivered" template |
| `docs/email-templates/delivery-exception.html` | Create | "Issue with your delivery" template |
| `.env.template` | Edit | Add 3 new env vars |
| `src/scripts/register-shipstation-webhook.ts` | Create | One-time webhook registration helper |

### Storefront (sober-sativas-storefront)

| File | Action | Responsibility |
|---|---|---|
| `src/lib/data/orders.ts` | Edit | Add fulfillment fields to order query |
| `src/modules/order/components/shipping-details/index.tsx` | Edit | Show tracking number + carrier link |
| `src/modules/order/components/order-details/index.tsx` | Edit | Show fulfillment status badge |

---

## Task 1: Add TrackingInfo Types to ShipStation Module

**Files:**
- Modify: `src/modules/shipstation/types.ts:157` (append before `ShipStationApiError` class)

- [ ] **Step 1: Add tracking types**

Add these types at line 157 in `src/modules/shipstation/types.ts`, right before the `ShipStationApiError` class:

```typescript
export type TrackingEvent = {
  occurred_at: string
  carrier_occurred_at?: string
  description: string
  city_locality?: string
  state_province?: string
  country_code?: string
  status_code: string
  signer?: string
}

export type TrackingInfo = {
  tracking_number: string
  tracking_url?: string
  status_code: "unknown" | "in_transit" | "error" | "delivered" | "exception" | "accepted" | "attempt_failed" | "not_yet_in_system" | "delivery_failed" | "return_to_sender" | "held_by_carrier" | "undeliverable"
  carrier_status_code?: string
  carrier_status_description?: string
  actual_delivery_date?: string
  exception_description?: string
  events?: TrackingEvent[]
}

export type ShipStationWebhookPayload = {
  resource_url?: string
  resource_type?: string
  topic?: string
  /** ShipStation v2 may include data inline */
  data?: {
    label_id?: string
    shipment_id?: string
    tracking_number?: string
    status_code?: string
    [k: string]: unknown
  }
  [k: string]: unknown
}
```

- [ ] **Step 2: Verify build**

Run: `cd /Users/franciscraven/Desktop/total-hemp/total-hemp-consumables && yarn build`
Expected: Clean build (types are additive, no consumers yet)

- [ ] **Step 3: Commit**

```bash
git add src/modules/shipstation/types.ts
git commit -m "feat: add tracking info types to shipstation module"
```

---

## Task 2: Add getTrackingInfo to ShipStation Client

**Files:**
- Modify: `src/modules/shipstation/client.ts:199` (before closing brace of class)

- [ ] **Step 1: Add the getTrackingInfo method**

Add this method at line 199 in `src/modules/shipstation/client.ts`, before the `//MORE METHODS` comment:

```typescript
  async getTrackingInfo(labelId: string): Promise<TrackingInfo> {
    return await this.sendRequest(`/tracking?label_id=${encodeURIComponent(labelId)}`)
  }
```

- [ ] **Step 2: Add TrackingInfo to the import at the top of client.ts**

Update the import block at line 8-12 to include `TrackingInfo`:

```typescript
import {
  CarriersResponse,
  WarehousesResponse,
  Label,
  GetShippingRatesRequest,
  GetShippingRatesResponse,
  RateResponse,
  Shipment,
  ShipStationApiError,
  TrackingInfo,
  VoidLabelResponse
} from "./types"
```

- [ ] **Step 3: Verify build**

Run: `cd /Users/franciscraven/Desktop/total-hemp/total-hemp-consumables && yarn build`
Expected: Clean build

- [ ] **Step 4: Commit**

```bash
git add src/modules/shipstation/client.ts
git commit -m "feat: add getTrackingInfo to shipstation client"
```

---

## Task 3: Create Webhook Route Middlewares

**Files:**
- Create: `src/api/hooks/shipstation/tracking/middlewares.ts`

- [ ] **Step 1: Create the middleware file**

Create `src/api/hooks/shipstation/tracking/middlewares.ts`:

```typescript
import { MedusaMiddlewareConfig } from "@medusajs/framework/http"

export const shipstationWebhookMiddlewares: MedusaMiddlewareConfig[] = [
  {
    matcher: "/hooks/shipstation/tracking",
    bodyParser: false,
    middlewares: [],
  },
]
```

This disables the automatic JSON body parser so the route can read the raw body for HMAC validation. Medusa API routes under `/hooks/` are unauthenticated by convention (same as `/hooks/payment/`).

- [ ] **Step 2: Register in main middlewares.ts**

In `src/api/middlewares.ts`, add the import at line 19 (after the existing middleware imports):

```typescript
import { shipstationWebhookMiddlewares } from "./hooks/shipstation/tracking/middlewares"
```

Then add `...shipstationWebhookMiddlewares,` to the `routes` array in `defineMiddlewares` at line 780, before the admin catch-all:

```typescript
    ...shipstationWebhookMiddlewares,
    {
      matcher: /^\/admin\/.*/,
      middlewares: [repGuard],
    },
```

- [ ] **Step 3: Verify build**

Run: `cd /Users/franciscraven/Desktop/total-hemp/total-hemp-consumables && yarn build`
Expected: Clean build (route doesn't exist yet, but middleware registration is valid)

- [ ] **Step 4: Commit**

```bash
git add src/api/hooks/shipstation/tracking/middlewares.ts src/api/middlewares.ts
git commit -m "feat: add shipstation webhook route middleware"
```

---

## Task 4: Create Webhook Route Handler

**Files:**
- Create: `src/api/hooks/shipstation/tracking/route.ts`

- [ ] **Step 1: Create the webhook route**

Create `src/api/hooks/shipstation/tracking/route.ts`:

```typescript
import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { createHmac } from "node:crypto"
import { ShipStationClient } from "../../../../modules/shipstation/client"
import { resolveShipstationEnv } from "../../../../utils/shipstation-env"
import type { ShipStationWebhookPayload, TrackingInfo } from "../../../../modules/shipstation/types"

/** Tracking statuses that trigger a delivery confirmation email */
const DELIVERED_STATUSES = new Set(["delivered"])

/** Tracking statuses that trigger a delivery exception email */
const EXCEPTION_STATUSES = new Set([
  "delivery_failed",
  "return_to_sender",
  "exception",
  "undeliverable",
  "held_by_carrier",
  "attempt_failed",
  "error",
])

function verifySignature(rawBody: Buffer, signature: string, secret: string): boolean {
  if (!signature || !secret) return false
  const computed = createHmac("sha256", secret).update(rawBody).digest("base64")
  // Constant-time comparison
  try {
    return createHmac("sha256", secret).update(rawBody).digest("base64") === signature
      ? computed.length === signature.length
      : false
  } catch {
    return false
  }
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER) as {
    info: (msg: string) => void
    warn: (msg: string) => void
  }

  const secret = (process.env.SHIPSTATION_WEBHOOK_SECRET || "").trim()
  if (!secret) {
    logger.warn("[ss-webhook-tracking] SHIPSTATION_WEBHOOK_SECRET not configured")
    return res.sendStatus(500)
  }

  // Read raw body for HMAC
  const chunks: Buffer[] = []
  for await (const chunk of req as unknown as AsyncIterable<Buffer>) {
    chunks.push(chunk)
  }
  const rawBody = Buffer.concat(chunks)

  // Validate signature
  const signature = (req.headers["x-shipstation-signature"] as string) || ""
  if (!verifySignature(rawBody, signature, secret)) {
    logger.warn("[ss-webhook-tracking] Invalid webhook signature")
    return res.sendStatus(401)
  }

  // Return 200 immediately — processing is async via event bus
  res.sendStatus(200)

  // Parse payload
  let payload: ShipStationWebhookPayload
  try {
    payload = JSON.parse(rawBody.toString("utf-8"))
  } catch {
    logger.warn("[ss-webhook-tracking] Failed to parse webhook body")
    return
  }

  // Resolve tracking info — try inline data first, then resource_url fetch
  let trackingInfo: TrackingInfo | null = null
  let labelId: string | null = null

  if (payload.data?.label_id && payload.data?.status_code) {
    // Inline tracking data
    labelId = payload.data.label_id
    trackingInfo = {
      tracking_number: payload.data.tracking_number || "",
      status_code: payload.data.status_code as TrackingInfo["status_code"],
      carrier_status_description: (payload.data.carrier_status_description as string) || "",
      actual_delivery_date: (payload.data.actual_delivery_date as string) || undefined,
      exception_description: (payload.data.exception_description as string) || undefined,
    }
  } else if (payload.resource_url) {
    // Fetch from resource_url
    try {
      const env = resolveShipstationEnv(process.env.NODE_ENV)
      const client = new ShipStationClient({ api_key: env.apiKey, api_secret: env.apiSecret })
      // resource_url is a full URL — extract the label_id from it
      const urlMatch = payload.resource_url.match(/label_id=([^&]+)/)
      if (urlMatch) {
        labelId = urlMatch[1]
        trackingInfo = await client.getTrackingInfo(labelId)
      } else {
        // Try fetching resource_url directly via the client's auth
        const resp = await fetch(payload.resource_url, {
          headers: {
            "api-key": env.apiKey,
            Accept: "application/json",
          },
        })
        if (resp.ok) {
          const data = await resp.json()
          labelId = data.label_id || null
          trackingInfo = data as TrackingInfo
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error"
      logger.warn(`[ss-webhook-tracking] Failed to fetch tracking from resource_url: ${msg}`)
      return
    }
  }

  if (!trackingInfo || !labelId) {
    logger.warn("[ss-webhook-tracking] No tracking info or label_id resolved from webhook")
    return
  }

  // Determine action
  const status = trackingInfo.status_code
  let action: "delivered" | "exception" | null = null
  if (DELIVERED_STATUSES.has(status)) {
    action = "delivered"
  } else if (EXCEPTION_STATUSES.has(status)) {
    action = "exception"
  }

  if (!action) {
    logger.info(`[ss-webhook-tracking] Ignoring status "${status}" for label ${labelId}`)
    return
  }

  // Emit event for subscriber
  try {
    const eventBus = req.scope.resolve(ContainerRegistrationKeys.EVENT_BUS) as {
      emit: (eventName: string, data: Record<string, unknown>) => Promise<void>
    }
    await eventBus.emit("shipstation.tracking_updated", {
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
    })
    logger.info(`[ss-webhook-tracking] Emitted tracking_updated (${action}) for label ${labelId}`)
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error"
    logger.warn(`[ss-webhook-tracking] Failed to emit event: ${msg}`)
  }
}
```

- [ ] **Step 2: Verify build**

Run: `cd /Users/franciscraven/Desktop/total-hemp/total-hemp-consumables && yarn build`
Expected: Clean build

- [ ] **Step 3: Commit**

```bash
git add src/api/hooks/shipstation/tracking/route.ts
git commit -m "feat: add shipstation tracking webhook endpoint"
```

---

## Task 5: Create Tracking Update Subscriber

**Files:**
- Create: `src/subscribers/ss-tracking-update.ts`

- [ ] **Step 1: Create the subscriber**

Create `src/subscribers/ss-tracking-update.ts`:

```typescript
import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { ssSendGridSend, getSsSalesChannelId } from "../utils/ss-sendgrid"

type TrackingEventData = {
  label_id: string
  action: "delivered" | "exception"
  tracking: {
    number: string
    url: string
    status_code: string
    carrier_description: string
    actual_delivery_date: string | null
    exception_description: string | null
  }
}

type FulfillmentRecord = {
  id: string
  data?: Record<string, unknown> | null
  order?: {
    id: string
    display_id?: string | number | null
    email?: string | null
    sales_channel_id?: string | null
    currency_code?: string | null
    metadata?: Record<string, unknown> | null
    customer?: {
      first_name?: string | null
      last_name?: string | null
      email?: string | null
    } | null
    shipping_address?: {
      first_name?: string | null
      last_name?: string | null
    } | null
    items?: Array<{
      id: string
      title?: string | null
      quantity?: number | null
      unit_price?: number | null
      thumbnail?: string | null
    }> | null
  } | null
}

const EXCEPTION_COPY: Record<string, string> = {
  delivery_failed:
    "Delivery was attempted but unsuccessful. This often happens when no one is available to sign — adult signature is required for hemp products under the PACT Act.",
  attempt_failed:
    "Delivery was attempted but unsuccessful. This often happens when no one is available to sign — adult signature is required for hemp products under the PACT Act.",
  return_to_sender:
    "Your package is being returned to our farm. This can happen if delivery attempts are unsuccessful or the address couldn't be verified.",
  held_by_carrier:
    "Your package is being held at the carrier facility. You may be able to pick it up or schedule a redelivery.",
  undeliverable:
    "The carrier was unable to deliver your package. Please check the tracking link for details or contact us for help.",
  exception:
    "There's an issue with your shipment. Please check your tracking link for the latest status.",
  error:
    "There's an issue with your shipment. Please check your tracking link for the latest status.",
}

export default async function ssTrackingUpdateHandler({
  event: { data },
  container,
}: SubscriberArgs<TrackingEventData>) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER) as {
    info: (msg: string) => void
    warn: (msg: string) => void
  }

  const ssChannelId = getSsSalesChannelId()
  if (!ssChannelId) return

  const { label_id, action, tracking } = data

  // Resolve template ID based on action
  const templateId =
    action === "delivered"
      ? (process.env.SS_SENDGRID_TEMPLATE_DELIVERY_CONFIRMATION || "").trim()
      : (process.env.SS_SENDGRID_TEMPLATE_DELIVERY_EXCEPTION || "").trim()

  if (!templateId) {
    logger.warn(`[ss-tracking-update] No SendGrid template configured for action "${action}"`)
    return
  }

  try {
    const query = container.resolve("query") as {
      graph: (input: Record<string, unknown>) => Promise<{ data: unknown[] }>
    }

    // Find the fulfillment that has this label_id in its data
    const { data: fulfillments } = await query.graph({
      entity: "fulfillment",
      fields: [
        "id",
        "data",
        "order.id",
        "order.display_id",
        "order.email",
        "order.sales_channel_id",
        "order.currency_code",
        "order.metadata",
        "order.customer.first_name",
        "order.customer.last_name",
        "order.customer.email",
        "order.shipping_address.first_name",
        "order.shipping_address.last_name",
        "order.items.id",
        "order.items.title",
        "order.items.quantity",
        "order.items.unit_price",
        "order.items.thumbnail",
      ],
    })

    // Filter fulfillments to find the one matching our label_id
    const fulfillment = (fulfillments as FulfillmentRecord[]).find(
      (f) => f.data?.label_id === label_id || f.data?.shipment_id === label_id
    )

    if (!fulfillment?.order) {
      logger.warn(`[ss-tracking-update] No fulfillment found for label_id ${label_id}`)
      return
    }

    const order = fulfillment.order

    // Sales channel gate
    if (order.sales_channel_id !== ssChannelId) return

    // Idempotency
    const metaKey = action === "delivered" ? "ss_delivery_sent_at" : "ss_exception_sent_at"
    if (order.metadata?.[metaKey]) {
      logger.info(`[ss-tracking-update] Already sent ${action} email for order ${order.id}`)
      return
    }

    const email = order.email || order.customer?.email
    if (!email) return

    const storefrontUrl = (process.env.SS_STOREFRONT_URL || "").trim().replace(/\/+$/, "")

    const dynamicTemplateData: Record<string, unknown> = {
      order: {
        id: order.id,
        display_id: order.display_id ?? null,
        items: (order.items || []).map((item) => ({
          id: item.id,
          title: item.title || "Item",
          product_name: item.title || "Item",
          quantity: item.quantity ?? 0,
          price: item.unit_price != null ? (item.unit_price / 1).toFixed(2) : "0.00",
          thumbnail: item.thumbnail || null,
        })),
      },
      order_number: order.display_id ?? null,
      customer: {
        first_name:
          order.customer?.first_name ||
          order.shipping_address?.first_name ||
          "",
        last_name:
          order.customer?.last_name ||
          order.shipping_address?.last_name ||
          "",
        email,
      },
      tracking: {
        carrier: "USPS",
        number: tracking.number,
        url: tracking.url || "#",
      },
      links: {
        order_url: storefrontUrl
          ? `${storefrontUrl}/account/orders/details/${order.id}`
          : null,
        website_url: storefrontUrl || null,
        support_url: "mailto:hello@sobersativas.com",
      },
      brand: {
        top_wordmark_url:
          (process.env.SS_SENDGRID_BRAND_TOP_WORDMARK_URL || "").trim() || null,
        footer_logo_url:
          (process.env.SS_SENDGRID_BRAND_FOOTER_LOGO_URL || "").trim() || null,
      },
    }

    if (action === "delivered") {
      dynamicTemplateData.delivery_date = tracking.actual_delivery_date
        ? new Date(tracking.actual_delivery_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "recently"
    } else {
      dynamicTemplateData.exception = {
        type: tracking.status_code,
        description:
          EXCEPTION_COPY[tracking.status_code] ||
          tracking.carrier_description ||
          EXCEPTION_COPY.exception,
      }
    }

    const result = await ssSendGridSend({ to: email, templateId, dynamicTemplateData })

    if (!result.success) {
      logger.warn(
        `[ss-tracking-update] SendGrid send failed for order ${order.id}: ${result.error}`
      )
      return
    }

    // Mark as sent (idempotency)
    try {
      const orderService = container.resolve("order") as {
        updateOrders: (id: string, data: Record<string, unknown>) => Promise<unknown>
      }
      await orderService.updateOrders(order.id, {
        metadata: {
          ...(order.metadata || {}),
          [metaKey]: new Date().toISOString(),
        },
      })
    } catch (metaErr) {
      logger.warn(
        `[ss-tracking-update] Email sent but metadata update failed for order ${order.id}`
      )
    }

    logger.info(
      `[ss-tracking-update] ${action} email sent for order ${order.id} (label ${label_id})`
    )
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error"
    logger.warn(`[ss-tracking-update] Failed for label ${label_id}: ${msg}`)
  }
}

export const config: SubscriberConfig = {
  event: "shipstation.tracking_updated",
}
```

- [ ] **Step 2: Verify build**

Run: `cd /Users/franciscraven/Desktop/total-hemp/total-hemp-consumables && yarn build`
Expected: Clean build

- [ ] **Step 3: Commit**

```bash
git add src/subscribers/ss-tracking-update.ts
git commit -m "feat: add tracking update subscriber for delivery/exception emails"
```

---

## Task 6: Add Environment Variables to .env.template

**Files:**
- Modify: `.env.template:167` (after existing ShipStation section)

- [ ] **Step 1: Add the new env vars**

After line 167 (`SHIPSTATION_API_SECRET_TEST=`) in `.env.template`, add:

```
# ShipStation Webhooks
SHIPSTATION_WEBHOOK_SECRET=

# Sober Sativas — Delivery notification templates
SS_SENDGRID_TEMPLATE_DELIVERY_CONFIRMATION=
SS_SENDGRID_TEMPLATE_DELIVERY_EXCEPTION=
```

- [ ] **Step 2: Commit**

```bash
git add .env.template
git commit -m "feat: add shipstation webhook + delivery template env vars"
```

---

## Task 7: Create Delivery Confirmation Email Template

**Files:**
- Create: `docs/email-templates/delivery-confirmation.html`

- [ ] **Step 1: Create the template**

Create `docs/email-templates/delivery-confirmation.html`. Base the structure on the existing `docs/email-templates/shipping-confirmation.html` (same 600px table layout, same brand palette, same dark mode support, same responsive breakpoints). Key differences:

```html
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>Your Order Has Been Delivered — Sober Sativas</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <style>
    td, th, div, p, a, h1, h2, h3, h4, h5, h6 { font-family: Arial, Helvetica, sans-serif; }
  </style>
  <![endif]-->
  <style type="text/css">
    :root { color-scheme: light dark; supported-color-schemes: light dark; }
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { margin: 0; padding: 0; width: 100% !important; height: 100% !important; background-color: #f5f2ed; }
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }
    u + #body a { color: inherit; text-decoration: none; }
    #MessageViewBody a { color: inherit; text-decoration: none; }
    @media only screen and (max-width: 480px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .fluid { max-width: 100% !important; height: auto !important; }
      .stack-column { display: block !important; width: 100% !important; max-width: 100% !important; }
      .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
      .mobile-text-lg { font-size: 26px !important; line-height: 34px !important; }
      .mobile-text-md { font-size: 20px !important; line-height: 28px !important; }
      .mobile-text-sm { font-size: 13px !important; line-height: 20px !important; }
      .mobile-spacer { height: 32px !important; }
      .mobile-logo { width: 180px !important; }
      .mobile-cta a { padding: 16px 32px !important; font-size: 17px !important; }
    }
    @media (prefers-color-scheme: dark) {
      body, .body-bg { background-color: #1a1a1a !important; }
      .dm-cream-bg { background-color: #2a2723 !important; }
      .dm-white-bg { background-color: #222222 !important; }
      .dm-text { color: #e8e2d9 !important; }
      .dm-text-muted { color: #a89f93 !important; }
      .dm-border { border-color: #3a3630 !important; }
    }
  </style>
</head>
<body id="body" class="body-bg" style="margin:0;padding:0;background-color:#f5f2ed;">
  <span style="display:none;font-size:1px;color:#f5f2ed;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
    Your Sober Sativas order has been delivered! &#8199;&#65279;&#847;
  </span>

  <center style="width:100%;background-color:#f5f2ed;" class="body-bg">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin:auto;" class="email-container">

      <!-- Logo -->
      <tr>
        <td style="padding:32px 40px 24px;text-align:center;" class="mobile-padding dm-cream-bg">
          {{#if brand.top_wordmark_url}}
          <img src="{{brand.top_wordmark_url}}" width="220" alt="Sober Sativas" style="display:inline-block;max-width:220px;height:auto;" class="mobile-logo">
          {{/if}}
        </td>
      </tr>

      <!-- Hero -->
      <tr>
        <td style="padding:0 40px 32px;background-color:#FAF7F2;text-align:center;" class="mobile-padding dm-cream-bg">
          <h1 style="margin:0 0 12px;font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:38px;color:#3d3d3d;font-weight:700;" class="mobile-text-lg dm-text">
            Your Order Has Arrived
          </h1>
          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:26px;color:#666;" class="dm-text-muted">
            Order #{{order_number}} was delivered on {{delivery_date}}.
          </p>
        </td>
      </tr>

      <!-- Tracking Reference -->
      <tr>
        <td style="padding:0 40px;" class="mobile-padding">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#ffffff;border-radius:12px;border:1px solid #e8e2d9;" class="dm-white-bg dm-border">
            <tr>
              <td style="padding:24px;">
                <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.5px;text-transform:uppercase;color:#7C9082;font-weight:700;">
                  {{tracking.carrier}}
                </p>
                <p style="margin:0 0 16px;font-family:'Courier New',monospace;font-size:16px;color:#3d3d3d;letter-spacing:0.5px;" class="dm-text">
                  <a href="{{tracking.url}}" style="color:#3d3d3d;text-decoration:underline;" class="dm-text">{{tracking.number}}</a>
                </p>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="mobile-cta">
                  <tr>
                    <td style="border-radius:8px;background-color:#7C9082;">
                      <a href="{{tracking.url}}" target="_blank" style="display:inline-block;padding:12px 28px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;">
                        View Tracking Details
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Spacer -->
      <tr><td style="height:24px;" class="mobile-spacer"></td></tr>

      <!-- Order Items -->
      <tr>
        <td style="padding:0 40px;" class="mobile-padding">
          <h2 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:20px;color:#3d3d3d;font-weight:700;" class="dm-text">
            What Was Delivered
          </h2>
          {{#each order.items}}
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:12px;">
            <tr>
              {{#if this.thumbnail}}
              <td width="60" valign="top" style="padding-right:16px;">
                <img src="{{this.thumbnail}}" width="60" height="60" alt="{{this.product_name}}" style="border-radius:8px;object-fit:cover;">
              </td>
              {{/if}}
              <td valign="top" style="font-family:Arial,Helvetica,sans-serif;">
                <p style="margin:0 0 2px;font-size:15px;font-weight:600;color:#3d3d3d;" class="dm-text">{{this.product_name}}</p>
                <p style="margin:0;font-size:13px;color:#888;" class="dm-text-muted">Qty: {{this.quantity}} &middot; ${{this.price}}</p>
              </td>
            </tr>
          </table>
          {{/each}}
        </td>
      </tr>

      <!-- Spacer -->
      <tr><td style="height:32px;" class="mobile-spacer"></td></tr>

      <!-- CTA -->
      <tr>
        <td style="padding:0 40px;text-align:center;" class="mobile-padding">
          <p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#666;" class="dm-text-muted">
            Enjoying your CBG flower? We'd love to hear about your experience.
          </p>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" class="mobile-cta">
            <tr>
              <td style="border-radius:8px;background-color:#C17F59;">
                <a href="{{links.website_url}}" target="_blank" style="display:inline-block;padding:14px 32px;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:600;color:#ffffff;text-decoration:none;">
                  Shop Again
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Spacer -->
      <tr><td style="height:40px;" class="mobile-spacer"></td></tr>

      <!-- Footer -->
      <tr>
        <td style="padding:32px 40px;background-color:#5C6B4F;text-align:center;" class="mobile-padding">
          {{#if brand.footer_logo_url}}
          <img src="{{brand.footer_logo_url}}" width="120" alt="Sober Sativas" style="display:inline-block;max-width:120px;height:auto;margin-bottom:16px;">
          {{/if}}
          <p style="margin:0 0 8px;font-family:Georgia,'Times New Roman',serif;font-size:14px;font-style:italic;color:#d4c9b8;">
            "Don't feel bad about feeling good."
          </p>
          <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#a89f93;">
            Grown at Lifestyle Family Farms &middot; Grass Lake, Michigan
          </p>
          <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#8a8070;">
            These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#8a8070;">
            <a href="{{links.website_url}}" style="color:#d4c9b8;text-decoration:underline;">sobersativas.com</a>
            &nbsp;&middot;&nbsp;
            <a href="mailto:hello@sobersativas.com" style="color:#d4c9b8;text-decoration:underline;">hello@sobersativas.com</a>
          </p>
        </td>
      </tr>

    </table>
  </center>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add docs/email-templates/delivery-confirmation.html
git commit -m "feat: add delivery confirmation email template"
```

---

## Task 8: Create Delivery Exception Email Template

**Files:**
- Create: `docs/email-templates/delivery-exception.html`

- [ ] **Step 1: Create the template**

Create `docs/email-templates/delivery-exception.html`. Same structure as delivery confirmation, but with exception-specific content:

```html
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>Delivery Update — Sober Sativas</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <style>
    td, th, div, p, a, h1, h2, h3, h4, h5, h6 { font-family: Arial, Helvetica, sans-serif; }
  </style>
  <![endif]-->
  <style type="text/css">
    :root { color-scheme: light dark; supported-color-schemes: light dark; }
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { margin: 0; padding: 0; width: 100% !important; height: 100% !important; background-color: #f5f2ed; }
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }
    u + #body a { color: inherit; text-decoration: none; }
    #MessageViewBody a { color: inherit; text-decoration: none; }
    @media only screen and (max-width: 480px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .fluid { max-width: 100% !important; height: auto !important; }
      .stack-column { display: block !important; width: 100% !important; max-width: 100% !important; }
      .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
      .mobile-text-lg { font-size: 26px !important; line-height: 34px !important; }
      .mobile-text-md { font-size: 20px !important; line-height: 28px !important; }
      .mobile-text-sm { font-size: 13px !important; line-height: 20px !important; }
      .mobile-spacer { height: 32px !important; }
      .mobile-logo { width: 180px !important; }
      .mobile-cta a { padding: 16px 32px !important; font-size: 17px !important; }
    }
    @media (prefers-color-scheme: dark) {
      body, .body-bg { background-color: #1a1a1a !important; }
      .dm-cream-bg { background-color: #2a2723 !important; }
      .dm-white-bg { background-color: #222222 !important; }
      .dm-text { color: #e8e2d9 !important; }
      .dm-text-muted { color: #a89f93 !important; }
      .dm-border { border-color: #3a3630 !important; }
    }
  </style>
</head>
<body id="body" class="body-bg" style="margin:0;padding:0;background-color:#f5f2ed;">
  <span style="display:none;font-size:1px;color:#f5f2ed;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
    Action needed: there's an issue with your delivery &#8199;&#65279;&#847;
  </span>

  <center style="width:100%;background-color:#f5f2ed;" class="body-bg">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin:auto;" class="email-container">

      <!-- Logo -->
      <tr>
        <td style="padding:32px 40px 24px;text-align:center;" class="mobile-padding dm-cream-bg">
          {{#if brand.top_wordmark_url}}
          <img src="{{brand.top_wordmark_url}}" width="220" alt="Sober Sativas" style="display:inline-block;max-width:220px;height:auto;" class="mobile-logo">
          {{/if}}
        </td>
      </tr>

      <!-- Hero -->
      <tr>
        <td style="padding:0 40px 32px;background-color:#FAF7F2;text-align:center;" class="mobile-padding dm-cream-bg">
          <h1 style="margin:0 0 12px;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:36px;color:#3d3d3d;font-weight:700;" class="mobile-text-lg dm-text">
            Delivery Update for Order #{{order_number}}
          </h1>
          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:26px;color:#666;" class="dm-text-muted">
            We noticed an issue with your shipment and wanted to let you know right away.
          </p>
        </td>
      </tr>

      <!-- Exception Details -->
      <tr>
        <td style="padding:0 40px;" class="mobile-padding">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#FFF8F0;border-radius:12px;border:1px solid #C17F59;" class="dm-white-bg">
            <tr>
              <td style="padding:24px;">
                <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.5px;text-transform:uppercase;color:#C17F59;font-weight:700;">
                  What Happened
                </p>
                <p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;color:#3d3d3d;" class="dm-text">
                  {{exception.description}}
                </p>
                <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.5px;text-transform:uppercase;color:#7C9082;font-weight:700;">
                  Tracking — {{tracking.carrier}}
                </p>
                <p style="margin:0 0 16px;font-family:'Courier New',monospace;font-size:16px;color:#3d3d3d;letter-spacing:0.5px;" class="dm-text">
                  <a href="{{tracking.url}}" style="color:#3d3d3d;text-decoration:underline;" class="dm-text">{{tracking.number}}</a>
                </p>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="mobile-cta">
                  <tr>
                    <td style="border-radius:8px;background-color:#C17F59;">
                      <a href="{{tracking.url}}" target="_blank" style="display:inline-block;padding:12px 28px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;">
                        Check Tracking Status
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Spacer -->
      <tr><td style="height:24px;" class="mobile-spacer"></td></tr>

      <!-- What To Do -->
      <tr>
        <td style="padding:0 40px;" class="mobile-padding">
          <h2 style="margin:0 0 12px;font-family:Georgia,'Times New Roman',serif;font-size:20px;color:#3d3d3d;font-weight:700;" class="dm-text">
            What You Can Do
          </h2>
          <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;color:#666;" class="dm-text-muted">
            Check your tracking link above for the latest carrier updates. If you need help, reply to this email or reach us at
            <a href="mailto:hello@sobersativas.com" style="color:#7C9082;text-decoration:underline;">hello@sobersativas.com</a>.
            We'll make sure your order gets to you.
          </p>
        </td>
      </tr>

      <!-- Spacer -->
      <tr><td style="height:24px;" class="mobile-spacer"></td></tr>

      <!-- Order Items -->
      <tr>
        <td style="padding:0 40px;" class="mobile-padding">
          <h2 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:18px;color:#3d3d3d;font-weight:700;" class="dm-text">
            Your Order
          </h2>
          {{#each order.items}}
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:12px;">
            <tr>
              {{#if this.thumbnail}}
              <td width="60" valign="top" style="padding-right:16px;">
                <img src="{{this.thumbnail}}" width="60" height="60" alt="{{this.product_name}}" style="border-radius:8px;object-fit:cover;">
              </td>
              {{/if}}
              <td valign="top" style="font-family:Arial,Helvetica,sans-serif;">
                <p style="margin:0 0 2px;font-size:15px;font-weight:600;color:#3d3d3d;" class="dm-text">{{this.product_name}}</p>
                <p style="margin:0;font-size:13px;color:#888;" class="dm-text-muted">Qty: {{this.quantity}} &middot; ${{this.price}}</p>
              </td>
            </tr>
          </table>
          {{/each}}
        </td>
      </tr>

      <!-- Spacer -->
      <tr><td style="height:40px;" class="mobile-spacer"></td></tr>

      <!-- Footer -->
      <tr>
        <td style="padding:32px 40px;background-color:#5C6B4F;text-align:center;" class="mobile-padding">
          {{#if brand.footer_logo_url}}
          <img src="{{brand.footer_logo_url}}" width="120" alt="Sober Sativas" style="display:inline-block;max-width:120px;height:auto;margin-bottom:16px;">
          {{/if}}
          <p style="margin:0 0 8px;font-family:Georgia,'Times New Roman',serif;font-size:14px;font-style:italic;color:#d4c9b8;">
            "Don't feel bad about feeling good."
          </p>
          <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#a89f93;">
            Grown at Lifestyle Family Farms &middot; Grass Lake, Michigan
          </p>
          <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#8a8070;">
            These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#8a8070;">
            <a href="{{links.website_url}}" style="color:#d4c9b8;text-decoration:underline;">sobersativas.com</a>
            &nbsp;&middot;&nbsp;
            <a href="mailto:hello@sobersativas.com" style="color:#d4c9b8;text-decoration:underline;">hello@sobersativas.com</a>
          </p>
        </td>
      </tr>

    </table>
  </center>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add docs/email-templates/delivery-exception.html
git commit -m "feat: add delivery exception email template"
```

---

## Task 9: Create Webhook Registration Script

**Files:**
- Create: `src/scripts/register-shipstation-webhook.ts`

- [ ] **Step 1: Create the registration script**

Create `src/scripts/register-shipstation-webhook.ts`:

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add src/scripts/register-shipstation-webhook.ts
git commit -m "feat: add shipstation webhook registration script"
```

---

## Task 10: Storefront — Add Fulfillment Fields to Order Query

**Files:**
- Modify: `src/lib/data/orders.ts:22` (in sober-sativas-storefront repo)

- [ ] **Step 1: Update the fields string in retrieveOrder**

In `src/lib/data/orders.ts` at line 22, update the `fields` string to include fulfillment data:

Change:
```
"*payment_collections.payments,*items,*items.metadata,*items.variant,*items.product,*items.adjustments,*shipping_methods,*shipping_methods.adjustments,*metadata"
```

To:
```
"*payment_collections.payments,*items,*items.metadata,*items.variant,*items.product,*items.adjustments,*shipping_methods,*shipping_methods.adjustments,*fulfillments,*fulfillments.tracking_links,*metadata"
```

- [ ] **Step 2: Verify build**

Run: `cd /Users/franciscraven/Desktop/total-hemp/sober-sativas-storefront && yarn build`
Expected: Clean build

- [ ] **Step 3: Commit**

```bash
git add src/lib/data/orders.ts
git commit -m "feat: include fulfillment tracking data in order queries"
```

---

## Task 11: Storefront — Add Tracking Display to Shipping Details

**Files:**
- Modify: `src/modules/order/components/shipping-details/index.tsx` (in sober-sativas-storefront repo)

- [ ] **Step 1: Update the ShippingDetails component**

Replace the entire contents of `src/modules/order/components/shipping-details/index.tsx`:

```tsx
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

import Divider from "@modules/common/components/divider"

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder
}

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  const selectedShippingMethod = order.shipping_methods?.[0]
  const fulfillment = (order as Record<string, unknown>).fulfillments as
    | Array<{
        id: string
        tracking_links?: Array<{
          tracking_number?: string | null
          url?: string | null
        }> | null
      }>
    | undefined
  const trackingLink = fulfillment?.[0]?.tracking_links?.[0]

  return (
    <div>
      <h2 className="text-2xl font-semibold text-foreground my-6">
        Delivery
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-x-8">
        <div
          className="flex flex-col"
          data-testid="shipping-address-summary"
        >
          <span className="text-sm font-medium text-foreground mb-1">
            Shipping Address
          </span>
          <span className="text-sm text-muted-foreground">
            {order.shipping_address?.first_name}{" "}
            {order.shipping_address?.last_name}
          </span>
          <span className="text-sm text-muted-foreground">
            {order.shipping_address?.address_1}{" "}
            {order.shipping_address?.address_2}
          </span>
          <span className="text-sm text-muted-foreground">
            {order.shipping_address?.postal_code},{" "}
            {order.shipping_address?.city}
          </span>
          <span className="text-sm text-muted-foreground">
            {order.shipping_address?.country_code?.toUpperCase()}
          </span>
        </div>

        <div
          className="flex flex-col"
          data-testid="shipping-contact-summary"
        >
          <span className="text-sm font-medium text-foreground mb-1">Contact</span>
          <span className="text-sm text-muted-foreground">
            {order.shipping_address?.phone}
          </span>
          <span className="text-sm text-muted-foreground">{order.email}</span>
        </div>

        <div
          className="flex flex-col"
          data-testid="shipping-method-summary"
        >
          <span className="text-sm font-medium text-foreground mb-1">Method</span>
          <span className="text-sm text-muted-foreground">
            {selectedShippingMethod?.name ?? "Not selected"} (
            {convertToLocale({
              amount: selectedShippingMethod?.total ?? 0,
              currency_code: order.currency_code,
            })}
            )
          </span>
          {trackingLink?.tracking_number && (
            <div className="mt-3">
              <span className="text-sm font-medium text-foreground">Tracking</span>
              <div className="mt-1">
                {trackingLink.url ? (
                  <a
                    href={trackingLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-sage-600 underline hover:text-sage-700 transition-colors"
                  >
                    {trackingLink.tracking_number}
                  </a>
                ) : (
                  <span className="text-sm text-muted-foreground font-mono">
                    {trackingLink.tracking_number}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Divider className="mt-8" />
    </div>
  )
}

export default ShippingDetails
```

- [ ] **Step 2: Verify build**

Run: `cd /Users/franciscraven/Desktop/total-hemp/sober-sativas-storefront && yarn build`
Expected: Clean build

- [ ] **Step 3: Commit**

```bash
git add src/modules/order/components/shipping-details/index.tsx
git commit -m "feat: display tracking number and link on order details"
```

---

## Task 12: Backend Build Validation

**Files:** None (validation only)

- [ ] **Step 1: Run full backend build**

Run: `cd /Users/franciscraven/Desktop/total-hemp/total-hemp-consumables && yarn build`
Expected: Clean build with all new files compiled

- [ ] **Step 2: Run storefront validation gates**

Run: `cd /Users/franciscraven/Desktop/total-hemp/sober-sativas-storefront && yarn lint && yarn build && yarn check:commerce-rules`
Expected: All three pass
