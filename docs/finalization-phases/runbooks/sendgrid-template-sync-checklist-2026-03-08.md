# SendGrid Template Sync Checklist (2026-03-08)

Use this checklist to sync SendGrid Dynamic Templates with the latest backend payload contracts.

## Templates to Repaste/Activate
1. `sendgrid-abandoned-cart-template.html`
2. `sendgrid-order-confirmation-template.html`
3. `sendgrid-refund-confirmation-template.html`

These include new formatted currency display fields and fallback rendering.

## Why This Sync Is Required
1. Abandoned and transactional payloads now provide formatted currency fields (`$15.00` style).
2. Template markup was updated to render `*_display` fields when present.
3. If old HTML remains active in SendGrid, emails may still show raw numeric prices (e.g., `15`).

## New/Updated Variables Used by Templates
### Abandoned Cart
1. `items[].unit_price_display` (new)

### Order Confirmation
1. `order.items[].unit_price_display` (new)

### Refund Confirmation
1. `refund.amount_display` (new)

## Backend Logic Changes Already Live
1. Abandoned candidate selection now chooses the most recent eligible cart per email.
2. Abandoned payload includes `items[].unit_price_display`.
3. Transactional payload includes:
   - `order.items[].unit_price_display`
   - `refund.amount_display`
   - totals display fields (`order.totals.*_display`) for future use.

## Post-Sync Validation
1. Send abandoned-cart test email:
   - verify all expected line items appear
   - verify item prices render as USD (`$xx.xx`)
2. Send order-confirmation test:
   - verify line item unit prices render as USD
3. Send refund-confirmation test:
   - verify refund amount renders as USD
4. Keep transactional templates free of unsubscribe/preferences links.
