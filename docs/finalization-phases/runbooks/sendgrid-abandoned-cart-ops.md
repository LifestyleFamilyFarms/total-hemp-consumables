# SendGrid Abandoned Cart Operations Runbook

## Scope
This runbook covers abandoned-cart template setup, payload contract validation, and SendGrid verification for:
- Template HTML: `docs/finalization-phases/runbooks/sendgrid-abandoned-cart-template.html`
- Backend sender: `src/workflows/abandoned-cart/steps/send-abandoned-notifications.ts`
- Admin trigger route: `POST /admin/abandoned-carts/process`

Abandoned-cart is re-engagement email. Unsubscribe/preferences links are allowed when implemented through SendGrid placeholders.

## Required Environment Variables
Set in `total-hemp-consumables/.env`:

```env
SENDGRID_API_KEY=
SENDGRID_FROM=
SENDGRID_TEMPLATE_ABANDONED_CART=d-...

# Must be absolute URL in production
STOREFRONT_URL=https://www.totalhemp.co

# Links (absolute URLs)
SENDGRID_WEBSITE_URL=https://www.totalhemp.co
SENDGRID_SUPPORT_URL=https://www.totalhemp.co/content/contact

# Signed recovery links (must match storefront secret)
SENDGRID_ABANDONED_CART_RECOVERY_SECRET=replace-with-long-random-secret
SENDGRID_ABANDONED_CART_RECOVERY_TTL_HOURS=72
```

Rules:
- `SENDGRID_TEMPLATE_ABANDONED_CART` must be an active SendGrid Dynamic Template ID.
- `STOREFRONT_URL` must be absolute, otherwise `recover_url` becomes `null`.
- Link URLs should be absolute HTTPS URLs.
- When `SENDGRID_ABANDONED_CART_RECOVERY_SECRET` is set, `recover_url` is a signed expiring link to `/cart/recover?token=...`.
- If recovery signing is not configured, fallback CTA URL is `/cart`.

## Template Contract Matrix
Payload source: `send-abandoned-notifications.ts`

| Template Variable | Payload Source |
|---|---|
| `customer.first_name` | `data.customer.first_name` |
| `customer.last_name` | `data.customer.last_name` |
| `cart_id` | `data.cart_id` |
| `recover_url` | `data.recover_url` (signed `/cart/recover?token=...` when secret is configured, else `/cart`) |
| `links.website_url` | `data.links.website_url` |
| `links.support_url` | `data.links.support_url` |
| `items[].title` | `data.items[].title` |
| `items[].quantity` | `data.items[].quantity` |
| `items[].unit_price` | `data.items[].unit_price` |
| `items[].unit_price_display` | `data.items[].unit_price_display` |
| `items[].thumbnail` | `data.items[].thumbnail` |
| `{{{unsubscribe}}}` | SendGrid subscription-tracking placeholder |
| `{{{unsubscribe_preferences}}}` | SendGrid subscription-tracking placeholder |

## Subject Line Standard
Set in SendGrid template version settings (not HTML `<title>`):

Recommended default:
- `You left something good in your cart`

Backup options for A/B test:
- `Your Total Hemp cart is still saved`
- `Ready when you are: your cart is waiting`

## SendGrid Setup Steps
1. Open SendGrid Dynamic Templates and create/open the abandoned-cart template.
2. Set subject line in template settings.
3. Paste HTML from `sendgrid-abandoned-cart-template.html` into the code editor.
4. Replace image placeholders directly in HTML:
   - `https://YOUR_SENDGRID_CDN/top-wordmark.png`
   - `https://YOUR_SENDGRID_CDN/footer-full-logo.png`
5. Ensure this version is Active.
6. Confirm Subscription Tracking behavior for unsubscribe placeholders.
7. Copy template ID into `SENDGRID_TEMPLATE_ABANDONED_CART`.
8. Verify sender identity/domain authentication is green.

## Preview Test Payload (SendGrid UI)
Use this JSON in SendGrid Test Data:

```json
{
  "customer": {
    "first_name": "Tess",
    "last_name": "Buyer"
  },
  "cart_id": "cart_01KABANDONED123",
  "recover_url": "https://www.totalhemp.co/cart/recover?token=example-token",
  "links": {
    "website_url": "https://www.totalhemp.co",
    "support_url": "https://www.totalhemp.co/content/contact"
  },
  "items": [
    {
      "title": "Full Spectrum CBD Tincture",
      "quantity": 1,
      "unit_price": 40,
      "thumbnail": "https://cdn.example.com/products/tincture.png"
    }
  ]
}
```

## Backend Verification Steps
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

3. Trigger processing with one of these methods:
- Admin-session method: call `POST /admin/abandoned-carts/process` from an authenticated admin session (Admin app / session cookie auth).
- CLI method (recommended local operator path):
```bash
cd /Users/franciscraven/Desktop/total-hemp/total-hemp-consumables
yarn abandoned:process:dry
yarn abandoned:process
```

Optional overrides for CLI method:
```bash
ABANDONED_CART_PROCESS_LOOKBACK_HOURS=48 ABANDONED_CART_PROCESS_LIMIT=50 yarn abandoned:process:dry
```

Immediate QA override (process a just-updated test cart):
```bash
ABANDONED_CART_PROCESS_LOOKBACK_HOURS=0.0001 yarn abandoned:process
```
Use only for controlled testing; keep production/operator default at whole-hour windows.

Expect deterministic keys in response:
- `notification_candidate_count`
- `notification_sent_count`
- `notification_sent_cart_ids`

## Current SendGrid Necessities (2026-03-08)
1. Keep `SENDGRID_ABANDONED_CART_RECOVERY_SECRET` identical across backend and storefront per environment; rotate if exposed in logs/chat.
2. Confirm real-candidate live send after creating an abandoned cart; current workflow run can return `candidate_count: 0` if no eligible carts exist.
3. Keep operator trigger path standardized on admin-session route or `yarn abandoned:process` CLI to avoid auth ambiguity with raw token headers.

## Compliance and Limitations
- Allowed: unsubscribe/preferences in abandoned-cart (re-engagement).
- Current Medusa SendGrid provider limitation: no explicit ASM `group_id` passthrough in provider options.
- Current implementation uses SendGrid unsubscribe placeholders only.

Exact remediation if per-group ASM is required:
1. Create a custom notification provider extending `@medusajs/notification-sendgrid`.
2. Pass `asm: { group_id: ... }` into the SendGrid message payload.
3. Add `SENDGRID_ABANDONED_CART_ASM_GROUP_ID` env var and wire it in provider/notification data.

## Final Checklist
- Template version active in SendGrid.
- Subject set in SendGrid template settings.
- Images resolve from SendGrid CDN or stable HTTPS host.
- Test send renders correctly in Gmail, Outlook, Apple Mail.
- CTA resolves to `/cart/recover?token=...` (or `/cart` fallback when secret is intentionally unset).
- Support link resolves to `/content/contact`.
- Unsubscribe and preferences links render and function.

## Program Defaults (Current)
- Cadence/cap: single abandoned-cart send only.
- Sender identity: `Total Hemp <ops@...>` and monitored reply inbox.
- Deliverability baseline required before scaling: SPF, DKIM, DMARC, branded links.
- KPI baseline: delivery, open, click, and placed-order attribution by template ID.
- Suppression model: abandoned cart is treated as re-engagement, separate from transactional lifecycle mail.
