# SendGrid Transactional Email Lifecycle Runbook

## Scope
This runbook covers production setup and verification for transactional templates:
- `sendgrid-order-confirmation-template.html`
- `sendgrid-shipping-confirmation-template.html`
- `sendgrid-shipping-update-template.html`
- `sendgrid-refund-confirmation-template.html`
- `sendgrid-cancellation-confirmation-template.html`

Backend sender:
- `src/workflows/transactional-emails/steps/process-order-transactional-email.ts`

Policy lock:
- Transactional templates must not include marketing unsubscribe links.

## Required Environment Variables
Set in `total-hemp-consumables/.env`:

```env
SENDGRID_API_KEY=
SENDGRID_FROM=

# Must be absolute URL in production
STOREFRONT_URL=https://www.totalhemp.co

SENDGRID_TEMPLATE_ORDER_CONFIRMATION=d-...
SENDGRID_TEMPLATE_SHIPPING_CONFIRMATION=d-...
SENDGRID_TEMPLATE_SHIPPING_UPDATE=d-...
SENDGRID_TEMPLATE_REFUND_CONFIRMATION=d-...
SENDGRID_TEMPLATE_CANCELLATION_CONFIRMATION=d-...

# Links (absolute URLs)
SENDGRID_WEBSITE_URL=https://www.totalhemp.co
SENDGRID_SUPPORT_URL=https://www.totalhemp.co/content/contact
```

Rules:
- If template env var is blank, send is skipped safely.
- `STOREFRONT_URL` must be absolute for `links.order_url`.

## Canonical Link Policy
- `links.order_url`: `{{STOREFRONT_URL}}/account/orders/details/{{order.id}}`
- `links.support_url`: `{{STOREFRONT_URL}}/content/contact`
- `links.website_url`: `{{STOREFRONT_URL}}`
- Links remain non-country-prefixed and rely on storefront middleware region redirect.

## Trigger and Template Mapping
| Workflow Trigger | Template Env Var | Send Condition |
|---|---|---|
| `order_confirmation` | `SENDGRID_TEMPLATE_ORDER_CONFIRMATION` | first successful order placement notification |
| `shipping_status` (first shipping event) | `SENDGRID_TEMPLATE_SHIPPING_CONFIRMATION` | fulfillment enters shipping/fulfilled family first time |
| `shipping_status` (status change after first) | `SENDGRID_TEMPLATE_SHIPPING_UPDATE` | fulfillment status changes after confirmation sent |
| `refund_status` | `SENDGRID_TEMPLATE_REFUND_CONFIRMATION` | payment status enters refunded family and differs from last notified |
| `cancellation_status` | `SENDGRID_TEMPLATE_CANCELLATION_CONFIRMATION` | order reaches canceled/cancelled and not previously notified |

## Global Transactional Contract Matrix
Payload source: `buildTemplateData` in `process-order-transactional-email.ts`

| Template Variable | Payload Source |
|---|---|
| `order.id` | `data.order.id` |
| `order.display_id` | `data.order.display_id` |
| `order.created_at` | `data.order.created_at` |
| `order.status` | `data.order.status` |
| `order.payment_status` | `data.order.payment_status` |
| `order.fulfillment_status` | `data.order.fulfillment_status` |
| `order.currency_code` | `data.order.currency_code` |
| `order.totals.total` | `data.order.totals.total` |
| `order.totals.total_display` | `data.order.totals.total_display` |
| `order.totals.subtotal` | `data.order.totals.subtotal` |
| `order.totals.subtotal_display` | `data.order.totals.subtotal_display` |
| `order.totals.tax_total` | `data.order.totals.tax_total` |
| `order.totals.tax_total_display` | `data.order.totals.tax_total_display` |
| `order.totals.shipping_total` | `data.order.totals.shipping_total` |
| `order.totals.shipping_total_display` | `data.order.totals.shipping_total_display` |
| `order.totals.discount_total` | `data.order.totals.discount_total` |
| `order.totals.discount_total_display` | `data.order.totals.discount_total_display` |
| `order.items[].id` | `data.order.items[].id` |
| `order.items[].title` | `data.order.items[].title` |
| `order.items[].quantity` | `data.order.items[].quantity` |
| `order.items[].unit_price` | `data.order.items[].unit_price` |
| `order.items[].unit_price_display` | `data.order.items[].unit_price_display` |
| `order.items[].thumbnail` | `data.order.items[].thumbnail` |
| `customer.first_name` | `data.customer.first_name` |
| `customer.last_name` | `data.customer.last_name` |
| `customer.email` | `data.customer.email` |
| `shipping.carrier` | `data.shipping.carrier` |
| `shipping.tracking` | `data.shipping.tracking` |
| `shipping.method` | `data.shipping.method` |
| `shipping.status` | `data.shipping.status` |
| `shipping.eta` | `data.shipping.eta` |
| `refund.amount` | `data.refund.amount` |
| `refund.amount_display` | `data.refund.amount_display` |
| `refund.reason` | `data.refund.reason` |
| `refund.timestamp` | `data.refund.timestamp` |
| `links.order_url` | `data.links.order_url` |
| `links.support_url` | `data.links.support_url` |
| `links.website_url` | `data.links.website_url` |

## Per-Template Subject Standards
Set subject in each SendGrid dynamic template version:

- Order confirmation: `Order {{order.display_id}} confirmed - Total Hemp`
- Shipping confirmation: `Your Total Hemp order {{order.display_id}} is on the way`
- Shipping update: `Shipping update for order {{order.display_id}}`
- Refund confirmation: `Refund update for order {{order.display_id}}`
- Cancellation confirmation: `Order {{order.display_id}} cancellation confirmed`

## SendGrid Setup Steps
1. Create five dynamic templates in SendGrid (one per lifecycle event).
2. Set each subject line in template settings (not in HTML title).
3. Paste corresponding HTML from runbook template files.
4. Replace image placeholders directly in each template:
   - `https://YOUR_SENDGRID_CDN/top-wordmark.png`
   - `https://YOUR_SENDGRID_CDN/footer-full-logo.png`
5. Activate each template version.
6. Copy each `d-...` ID into matching env var.
7. Verify sender identity and domain authentication (SPF, DKIM, DMARC alignment).

## Preview Test Payloads (SendGrid UI)
Use these in each template's Test Data preview.

### Order Confirmation
```json
{
  "order": {
    "id": "order_01TESTORDER",
    "display_id": "1001",
    "created_at": "2026-03-03T18:45:00.000Z",
    "status": "pending",
    "payment_status": "captured",
    "fulfillment_status": "not_fulfilled",
    "currency_code": "usd",
    "totals": {
      "total": 40,
      "subtotal": 40,
      "tax_total": 0,
      "shipping_total": 0,
      "discount_total": 0
    },
    "items": [
      {
        "id": "item_01",
        "title": "Full Spectrum CBD Tincture",
        "quantity": 1,
        "unit_price": 40,
        "thumbnail": "https://cdn.example.com/products/tincture.png"
      }
    ]
  },
  "customer": {
    "first_name": "Tess",
    "last_name": "Buyer",
    "email": "test@totalhemp.co"
  },
  "shipping": {
    "carrier": null,
    "tracking": null,
    "method": null,
    "status": "not_fulfilled",
    "eta": null
  },
  "refund": {
    "amount": null,
    "reason": null,
    "timestamp": null
  },
  "links": {
    "order_url": "https://www.totalhemp.co/account/orders/details/order_01TESTORDER",
    "support_url": "https://www.totalhemp.co/content/contact",
    "website_url": "https://www.totalhemp.co"
  }
}
```

### Shipping Confirmation
Same payload as above with:
```json
{
  "shipping": {
    "status": "shipped",
    "tracking": "1Z999AA10123456784"
  }
}
```

### Shipping Update
Same payload as above with:
```json
{
  "shipping": {
    "status": "fulfilled",
    "tracking": "1Z999AA10123456784"
  }
}
```

### Refund Confirmation
Same payload as above with:
```json
{
  "order": {
    "payment_status": "refunded"
  },
  "refund": {
    "amount": 40,
    "reason": null,
    "timestamp": "2026-03-03T19:00:00.000Z"
  }
}
```

### Cancellation Confirmation
Same payload as above with:
```json
{
  "order": {
    "status": "canceled"
  }
}
```

## Backend Validation Steps
Run from `total-hemp-consumables`:

1. Build and unit tests:
```bash
yarn build
yarn test:unit
```

2. Start backend:
```bash
yarn dev
```

3. Trigger event paths:
- place order -> order confirmation
- update fulfillment to shipped/fulfilled -> shipping confirmation/update
- move payment status to refunded -> refund confirmation
- cancel order -> cancellation confirmation

4. Confirm idempotency metadata on order:
- `transactional_email_order_confirmation_sent_at`
- `transactional_email_shipping_confirmation_sent_at`
- `transactional_email_shipping_update_sent_at`
- `transactional_email_last_notified_fulfillment_status`
- `transactional_email_refund_confirmation_sent_at`
- `transactional_email_last_notified_payment_status`
- `transactional_email_cancellation_confirmation_sent_at`

## Route Smoke Checks
- Open `/account/orders/details/{id}` from email CTA and verify it resolves.
- Open `/content/contact` from support links and verify it resolves.
- Confirm middleware applies country redirect for links without explicit country code.

## Compliance and Limitations
- Transactional templates must not contain unsubscribe or preferences links.
- Current provider (`@medusajs/notification-sendgrid`) sends template + `dynamicTemplateData` and does not expose explicit ASM/group controls in provider configuration.
- If granular unsubscribe group control is needed in the future, implement a custom notification provider and pass SendGrid `asm` payload fields directly.

## Final Checklist
- All five transactional templates are Active in SendGrid.
- Subject lines are configured in SendGrid template settings.
- Branding image URLs resolve.
- All CTA links open correctly.
- No marketing unsubscribe links in transactional templates.
- Test sends verified in Gmail, Outlook, Apple Mail.

## Program Defaults (Current)
- Sender identity: `Total Hemp <ops@...>` with monitored reply inbox.
- Deliverability baseline required before scaling: SPF, DKIM, DMARC, branded links.
- KPI baseline: delivery, open, click, and placed-order attribution by template ID.
- Suppression model: transactional lifecycle mail remains separate from marketing/re-engagement flows.

## Current SendGrid Necessities (2026-03-08)
1. Validate at least one real end-to-end send for each transactional trigger (`order_confirmation`, `shipping_confirmation`, `shipping_update`, `refund_confirmation`, `cancellation_confirmation`) in staging or controlled production.
2. Ensure all transactional templates in SendGrid are Active and mapped to the exact env vars in backend (`SENDGRID_TEMPLATE_*`).
3. Keep support and website links canonical (`/content/contact`, `/account/orders/details/{id}`) and verify they resolve correctly with country middleware redirects.
