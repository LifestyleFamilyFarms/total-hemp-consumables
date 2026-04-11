# ShipStation Webhook Integration — Tracking Updates & Delivery Notifications

**Date:** 2026-04-11
**Scope:** Backend (total-hemp-consumables) + Storefront (sober-sativas-storefront)
**Brand:** Sober Sativas only (sales channel gated)

## Problem

After an order ships, customers have no visibility into delivery status beyond the initial shipping confirmation email. ShipStation has real-time tracking data but no mechanism pushes it to our system. Customers must manually check tracking links. Delivery exceptions (failed delivery, returned to sender — common with PACT Act adult signature requirements) go unnoticed until the customer contacts support.

## Solution

ShipStation webhook integration that receives tracking status updates in real-time and sends customers two additional email touchpoints:

1. **Delivery confirmation** — "Your order has been delivered"
2. **Delivery exception** — "There's an issue with your delivery" (failed attempt, returned to sender, etc.)

The happy path remains clean (ship + deliver = 2 emails total). Exceptions surface proactively so customers can take action.

## Architecture

```
ShipStation (tracking update)
  → POST /hooks/shipstation/tracking  [API route — ingestion + validation]
    → Emit event: shipstation.tracking_updated  [Medusa event bus]
      → ss-tracking-update subscriber  [business logic — determine email type]
        → ssSendGridSend()  [SendGrid dynamic template]
          → Customer inbox
```

This follows the established Medusa pattern: thin route → event → idempotent subscriber → side effect.

## Component Details

### 1. Webhook Endpoint

**File:** `src/api/hooks/shipstation/tracking/route.ts`

POST handler that:
- Reads raw request body
- Validates HMAC-SHA256 signature against `SHIPSTATION_WEBHOOK_SECRET`
- Returns 200 immediately (ShipStation retries on non-2xx with exponential backoff)
- Parses the webhook payload. ShipStation v2 webhooks may send tracking data inline or via a `resource_url` reference — the handler supports both patterns. During implementation, confirm the exact payload shape against the sandbox webhook.
- If `resource_url` pattern: fetches full tracking details from ShipStation API using existing auth headers
- If inline pattern: extracts tracking data directly from the webhook body
- Maps tracking status to action: `delivered` | `exception` | `ignore`
- Emits `shipstation.tracking_updated` event with enriched tracking data

**Ignored statuses:** `in_transit`, `accepted`, `unknown` — these don't warrant customer emails.

**Exception statuses:** `delivery_failed`, `return_to_sender`, `exception`, `undeliverable`, `held_by_carrier`.

**Middleware:** `src/api/hooks/shipstation/tracking/middlewares.ts`
- Disables automatic body parsing (need raw body for HMAC)
- Skips authentication (external webhook, validated by signature)

### 2. Tracking Update Subscriber

**File:** `src/subscribers/ss-tracking-update.ts`

Event: `shipstation.tracking_updated`

Flow:
1. Extract `label_id` and/or `shipment_id` from event data
2. Look up the fulfillment whose `data` JSON contains the matching `label_id` or `shipment_id`. The `createFulfillment` method stores both in `fulfillment.data` (see `service.ts:399-404`). Query approach: use Medusa's `query.graph()` on the fulfillment entity with a `data` JSON filter, or fall back to listing recent fulfillments and filtering in-memory if JSON querying is limited.
3. Traverse fulfillment → order, apply sales channel gate (`SS_SALES_CHANNEL_ID`)
4. Check idempotency flags:
   - Delivered: skip if `order.metadata.ss_delivery_sent_at` is set
   - Exception: skip if `order.metadata.ss_exception_sent_at` is set
5. Resolve customer email from order
6. Send appropriate SendGrid template with tracking data
7. Update order metadata with sent timestamp

**Template data shape (delivered):**
```typescript
{
  order: { id, display_id, items: [...] },
  customer: { first_name, last_name, email },
  tracking: { carrier, number, url },
  delivery_date: string,  // from ShipStation actual_delivery_date
  links: { order_url, website_url },
  brand: { top_wordmark_url, footer_logo_url },
}
```

**Template data shape (exception):**
```typescript
{
  order: { id, display_id, items: [...] },
  customer: { first_name, last_name, email },
  tracking: { carrier, number, url },
  exception: {
    type: string,         // e.g. "delivery_failed", "return_to_sender"
    description: string,  // human-readable from ShipStation
  },
  links: { order_url, website_url, support_url },
  brand: { top_wordmark_url, footer_logo_url },
}
```

### 3. ShipStation Client Extension

**File:** `src/modules/shipstation/client.ts`

Add method:
```typescript
async getTrackingInfo(labelId: string): Promise<TrackingInfo>
```

Calls ShipStation v2 `GET /v2/tracking?label_id={labelId}` to fetch:
- `status_code` (delivered, in_transit, exception, etc.)
- `carrier_status_description`
- `actual_delivery_date`
- `tracking_number`
- `tracking_url` (carrier tracking page)
- `exception_description`

Add corresponding types to `src/modules/shipstation/types.ts`.

### 4. SendGrid Email Templates

**Delivery Confirmation** (`docs/email-templates/delivery-confirmation.html`)
- Subject: "Your Sober Sativas order has been delivered"
- Content: Delivery confirmation message, order summary, "Leave a Review" CTA
- Tone: Warm, celebratory
- Includes: Order items, delivery date, tracking link for reference

**Delivery Exception** (`docs/email-templates/delivery-exception.html`)
- Subject: "Action needed: Issue with your Sober Sativas delivery"
- Content: Exception type explained in plain language, what the customer should do, carrier tracking link
- Tone: Helpful, not alarming
- Includes: Tracking link, support email (hello@sobersativas.com), order details
- Exception-specific copy:
  - `delivery_failed` → "Delivery was attempted but unsuccessful. This often happens when no one is available to sign (adult signature is required for hemp products)."
  - `return_to_sender` → "Your package is being returned to our farm. This can happen if delivery attempts are unsuccessful or the address couldn't be verified."
  - `held_by_carrier` → "Your package is being held at the carrier facility. You may be able to pick it up or schedule a redelivery."
  - Default → "There's an issue with your shipment. Please check your tracking link for the latest status."

Both templates follow the existing SS email design system:
- 600px table-based layout, inline CSS
- Mobile-responsive (480px breakpoint)
- Brand palette: sage (#7C9082), olive (#5C6B4F), cream (#FAF7F2), terracotta (#C17F59)
- Georgia headings, Arial body
- Preheader text, FDA disclaimer, farm story footer, unsubscribe link

### 5. Environment Variables

**Backend (.env.template additions):**
```
# ShipStation Webhooks
SHIPSTATION_WEBHOOK_SECRET=              # HMAC secret for webhook signature validation

# Sober Sativas — Delivery notification templates
SS_SENDGRID_TEMPLATE_DELIVERY_CONFIRMATION=   # SendGrid dynamic template ID
SS_SENDGRID_TEMPLATE_DELIVERY_EXCEPTION=      # SendGrid dynamic template ID
```

### 6. Webhook Registration

One-time setup via ShipStation API or dashboard:
- **Event:** `TRACKING_STATUS_UPDATE`
- **URL:** `https://<railway-backend-url>/hooks/shipstation/tracking`
- **Secret:** Value of `SHIPSTATION_WEBHOOK_SECRET`

A registration helper script at `src/scripts/register-shipstation-webhook.ts` provides a repeatable way to set this up. Run via `npx medusa exec src/scripts/register-shipstation-webhook.ts`.

### 7. Storefront — Order Tracking Display

**Repo:** sober-sativas-storefront

Minimal changes to surface tracking data that Medusa already returns:

**`src/modules/order/components/shipping-details/index.tsx`**
- Add tracking number + carrier link when `fulfillments[0].tracking_links[0]` is present
- "Track your package" link opening carrier URL in new tab

**`src/modules/order/components/order-details/index.tsx`**
- Show fulfillment status badge (shipped/delivered/exception) when available

**`src/lib/data/orders.ts`**
- Add `fulfillments.tracking_links.*` to the field expansion in `retrieveOrder()`

## Data Flow — Full Lifecycle

```
1. Customer places order
   → order.placed → ss-order-placed subscriber → order confirmation email

2. Farm team creates fulfillment in Medusa admin
   → ShipStation label purchased (createFulfillment)
   → fulfillment.created → ss-fulfillment-created subscriber → shipping confirmation email
   → Customer gets tracking number + link

3. Package in transit (no email — customer uses tracking link)

4a. Package delivered
   → ShipStation webhook → /hooks/shipstation/tracking
   → shipstation.tracking_updated event
   → ss-tracking-update subscriber → delivery confirmation email

4b. Delivery exception (failed attempt, RTS, held)
   → ShipStation webhook → /hooks/shipstation/tracking
   → shipstation.tracking_updated event
   → ss-tracking-update subscriber → delivery exception email
```

## Idempotency Strategy

| Event | Metadata Flag | Scope |
|---|---|---|
| Order confirmation | `order.metadata.ss_order_confirmation_sent_at` | Order |
| Shipping confirmation | `fulfillment.metadata.ss_shipping_confirmation_sent_at` | Fulfillment |
| Delivery confirmation | `order.metadata.ss_delivery_sent_at` | Order |
| Delivery exception | `order.metadata.ss_exception_sent_at` | Order |

Exception idempotency is per-order, not per-event. If the first exception email is sent and a second exception occurs (e.g., failed delivery → return to sender), we do NOT send a second email. The customer already has the tracking link and support contact. Avoiding email fatigue is more important than granular status updates.

## Error Handling

- **Webhook validation fails:** Return 401, log warning. ShipStation will not retry on 4xx.
- **ShipStation API unreachable (fetching tracking details):** Log error, do not emit event. ShipStation will retry the webhook.
- **Order not found for tracking data:** Log warning, return 200 (don't trigger retries for data we can't process).
- **SendGrid send fails:** Log warning (same pattern as existing subscribers). No retry — the customer still has the tracking link from the shipping confirmation.
- **Sales channel mismatch (Total Hemp order):** Silent return. THC has its own notification pipeline.

## Security

- HMAC-SHA256 signature validation on every webhook request
- No authentication bypass beyond the webhook route itself
- Webhook secret stored as environment variable, never logged
- Rate limiting: ShipStation sends at most one webhook per tracking event, but the idempotency flags protect against duplicates regardless

## Testing

- **Unit:** Subscriber logic (status mapping, idempotency, template data assembly)
- **Integration:** Webhook endpoint with mock ShipStation payload → verify event emission
- **E2E:** Create a test shipment via ShipStation sandbox, verify webhook fires and email sends
- **Validation gate:** `yarn build` must pass after all changes

## Files Changed/Created

### Backend (total-hemp-consumables)
| File | Action |
|---|---|
| `src/api/hooks/shipstation/tracking/route.ts` | Create |
| `src/api/hooks/shipstation/tracking/middlewares.ts` | Create |
| `src/api/middlewares.ts` | Edit (register new middleware) |
| `src/subscribers/ss-tracking-update.ts` | Create |
| `src/modules/shipstation/client.ts` | Edit (add getTrackingInfo) |
| `src/modules/shipstation/types.ts` | Edit (add TrackingInfo type) |
| `src/scripts/register-shipstation-webhook.ts` | Create |
| `docs/email-templates/delivery-confirmation.html` | Create |
| `docs/email-templates/delivery-exception.html` | Create |
| `.env.template` | Edit (add 3 new vars) |

### Storefront (sober-sativas-storefront)
| File | Action |
|---|---|
| `src/modules/order/components/shipping-details/index.tsx` | Edit |
| `src/modules/order/components/order-details/index.tsx` | Edit |
| `src/lib/data/orders.ts` | Edit |
