# Task 002 — Checkout Pipeline QA

## Objective
Execute and document an end-to-end checkout flow (seed → mirror → storefront → Authorize.Net sandbox → ShipStation rate quote) to ensure the production launch path is reliable and repeatable.

## Prerequisites
- Backend and storefront running against staging/dev infrastructure with sandbox credentials.
- Fresh dev DB or staging instance seeded with mirrored catalog.
- Authorize.Net sandbox API keys + client key available (already present in `.env`).
- ShipStation sandbox credentials configured (`SHIPSTATION_API_KEY` etc.).
- Access to storefront UI (localhost or staged deployment) with maintenance disabled.

## Test Flow
1. **Environment prep**
   - `yarn db:reset:dev`
   - Populate catalog data manually via Medusa Admin (products, prices, inventory)
   - `yarn mirror:dev`
   - `yarn mirror:inventory`
   - Start backend (`yarn dev`) and storefront (`yarn dev` in `total-hemp-consumables-storefront`).
2. **Storefront walkthrough**
   - Confirm PLP loads (category + all products) with mirrored data.
   - Select a product, verify PDP (facts row TBD) and inventory availability.
   - Add to cart, proceed through checkout.
3. **Payment & fulfillment**
   - Use Authorize.Net test cards to complete payment.
   - Ensure order captures and triggers ShipStation rate quote (check Medusa logs for shipment creation/responses).
4. **Post-order verification**
   - Check Medusa Admin for order status, payment capture, fulfillment data.
   - Validate inventory reservations/levels adjust as expected.

## Artifacts to Capture
- Timestamped command log of backend scripts executed.
- Screenshots or notes of checkout flow and payment confirmation.
- Medusa server logs showing payment + fulfillment events.
- Any errors encountered with actionable notes.

## Definition of Done
- Documented evidence of successful checkout stored with task notes (link to log, screenshots, or recorded session).
- Identified issues (if any) logged as follow-up tasks with severity/owners.
- Runbook updated with exact steps, including any manual tweaks required.

## Execution Status (2025-10-23)

### Completed Work
- Authorize.Net sandbox credentials refreshed and validated via Accept.js (successful approval confirmed in internal logs; identifiers redacted).
- Storefront checkout flow updated (`src/modules/checkout/components/payment/index.tsx`) to:
  - Skip the pre-token `initiatePaymentSession` call for Authorize.Net.
  - Send `dataDescriptor` / `dataValue` and a cart snapshot (shipping + billing + selected shipping method) with the opaque token.
- Successful end-to-end checkout recorded (cart, order, and payment collection references stored in private run logs).
  - Added debug/introspection scripts:
  - `src/scripts/debug-shipstation-options.ts`
  - `src/scripts/link-shipstation-provider.ts`
  - `src/scripts/create-shipstation-shipping-option.ts`
  - `src/scripts/query-table-columns.ts`
- Linked ShipStation to the default stock location and created a calculated shipping option (USPS Ground Advantage).
- Removed manual fulfillment entries (`medusa-config.ts`, `src/scripts/seed-fresh.ts`) and added `src/scripts/cleanup-manual-shipping-options.ts` to purge legacy manual shipping options/links from existing environments.
- `src/scripts/seed-fresh.ts` now inspects available ShipStation services at runtime (via `retrieveFulfillmentOptions`) and creates shipping options for every service the account exposes, skipping ones that already exist.
- Ran `yarn medusa exec ./src/scripts/cleanup-manual-shipping-options.ts` (`DISABLE_MEDUSA_ADMIN=true`) – no legacy `manual_manual` options or links remain in the database.
- Confirmed ShipStation currently exposes 20 services (USPS + FedEx) via `debug-shipstation-options.ts`; staging checkout should only surface the services we intend to sell with (ground/advantage first) until the allowlist is added.
- Restored the original ShipStation USPS Ground Advantage shipping option (`so_01K88TN3T3SZMD6PAYMTK2PMFV`) and reassigned it to the current service zone (`serzo_01K8KJYK7TNY65PTBCSHDZ705E`) so the storefront can consume it again.
- Added `src/scripts/create-missing-shipstation-options.ts` to mirror every ShipStation carrier/service pair into Medusa (20 options created from the current sandbox account on Oct 29).
- Added `src/scripts/ensure-shipstation-rules.ts` to backfill the `enabled_in_store = true` rule for every ShipStation option so the Store API surfaces them.
- Hardened the checkout address form: added Zod validation (city/state/zip/phone), required phone input, and a US state dropdown so ShipStation receives complete addresses.
- Updated the delivery step to defer ShipStation price requests until a complete shipping address (including phone/state) is on file; prevents mass rate calls on initial load.
- Added a visible “Clear cart” action (cart + checkout summary) and widened the checkout container (`max-w-[1440px]`) so the desktop layout breathes better.

### Key Observations / Issues
- Legacy “Ground/Express” manual options once priced freight at 999 / 1999 USD; use the new cleanup script to remove any remnants before staging/prod validation so receipts reflect ShipStation quotes.
- The storefront now auto-selects the first ShipStation-calculated option, but existing carts may still carry manual selections until the cleanup + re-checkout flow runs.
- ShipStation returns a broad USPS + FedEx service catalog; add an allowlist (or hide extras in UI) before launch so shoppers only see approved services.
- Running multiple `yarn medusa exec` scripts leaves the Medusa dev server running; stale processes cause `EADDRINUSE` until killed before restarting `yarn dev`.

### Outstanding Work
1. **Run ShipStation-first checkout QA** – execute the cleanup script (done), restart services, and confirm the new auto-selection keeps ShipStation USPS Ground Advantage through review + payment.
2. **Re-run checkout choosing “ShipStation USPS Ground Advantage”** – capture backend debug output (`[shipstation-debug] rate response`) and ensure the Authorize.Net receipt reflects the calculated freight instead of $999. (Requires browser Accept.js tokenization; pending.)
3. **Inventory/fulfillment verification** – after the ShipStation checkout lands, confirm the order decremented inventory and persisted fulfillment metadata (Medusa Admin or DB).
4. **Throttle ShipStation rate requests** – redesign the delivery step so the shopper selects a shipping service and explicitly clicks “Calculate shipping” (one API call) before we post to `/calculate`. Include an allowlist so only approved services appear.
5. **Authorize.Net CSP + HTTPS validation** – staging/prod must serve checkout over HTTPS and include the Accept.js host + hash in CSP. Confirm no CSP violations once deployed.
6. **Author comprehensive seed** – produce a production-grade seed script that sets up sales channels, pricing, inventory, and fulfillment integrations for production environments.

### Checkout & Payment Refactor (2025-??)
- Reworked checkout layout for desktop: enlarged main column, tightened summary, added reusable `SectionCard` wrapper, and reformatted shipping address inputs into stacked blocks for readability.
- Converted all custom inputs, checkboxes, and selects to shadcn-based components; country selector now carries a visible label and shares styling with text inputs.
- Removed Stripe and manual payment paths from the storefront. Authorize.Net is the only active provider; `@stripe/*` and associated wrappers/components stripped out, docs/env updated accordingly.
- Updated payment flow to tokenize via Accept.js only when Authorize.Net is selected and to auto-select the first Authorize.Net method.
- CSP middleware now allows Authorize.Net resources (and only adds the Vercel analytics host in production). We gate `<Analytics />` behind a production check so dev builds are quiet apart from the expected Accept.js HTTPS reminder.
- Outstanding: Accept.js still warns about TLS when running on `http://localhost`. This is expected; staging/prod need HTTPS to clear it.

#### Inventory & Fulfillment Verification — Findings (2025-10-23)
- Latest sandbox order (`order_01K88JNH6MQYCSA7RXE62N7F83`, display ID 6) still uses legacy manual shipping (`provider_id = manual_manual`, amount `999`), so no checkout yet references `ShipStation USPS Ground Advantage`.
- ShipStation option `so_01K88TN3T3SZMD6PAYMTK2PMFV` exists in `shipping_option`, but `order_shipping_method` has no rows with `provider_id = shipstation_shipstation`.
- Inventory tables show no deductions: `inventory_level` for `variant_01K81BTDX93QXVE27JGYXWWYB0` remains `stocked=350`, `reserved=0`, and `reservation_item` has no entries for `ordli_01K88JNH6N9STFVZEQGWJXBACG`.
- No fulfillment rows were generated (`order_fulfillment`/`fulfillment` empty for display ID 6), so no ShipStation metadata has been persisted.
- Blocker: need a checkout that selects the new ShipStation rate before inventory + fulfillment validation can pass.

#### Production Seed Requirements (draft)
- Create primary “DTC” sales channel and ensure publishable/admin keys map to it.
- Link stock locations (US Warehouse, Gummy Lab) to ShipStation provider and channel.
- Seed baseline products with authoritative pricing, tax data, and ShipStation-ready variant weights.
- Seed inventory levels per location with production parity (no `allow_backorder` fallback).
- Configure ShipStation shipping option(s) and mark legacy manual options disabled.
- Populate Authorize.Net credentials and verify payment provider status post-seed.
- Output verification script: list seeded sales channels, inventory levels, shipping options, and payment provider states.

#### Production Seed Requirements (draft)
- Create primary “DTC” sales channel and ensure publishable/admin keys map to it.
- Link stock locations (US Warehouse, Gummy Lab) to ShipStation provider and channel.
- Seed baseline products with authoritative pricing, tax data, and ShipStation-ready variant weights.
- Seed inventory levels per location with production parity (no `allow_backorder` fallback).
- Configure ShipStation shipping option(s) and mark legacy manual options disabled.
- Populate Authorize.Net credentials and verify payment provider status post-seed.
- Output verification script: list seeded sales channels, inventory levels, shipping options, and payment provider states.

### Useful Artifacts / References
- Logs: `docs/task-002/artifacts/backend-dev-20251023-085703.log`, `docs/task-002/artifacts/storefront-dev-20251023-085740.log`. (Sensitive identifiers have been redacted in shared copies.)
- Checkout session notes: `docs/task-002/artifacts/checkout-session-20251022.md` (sanitized summary; raw logs are stored in secure storage).
- Scripts mentioned above for ShipStation debugging and DB access (`src/scripts/debug-orders-with-shipping.ts`, `debug-order-shipping.ts`, `debug-order-line-items.ts`, `debug-inventory-for-variant.ts`, `debug-order-fulfillments.ts`, `debug-reservations-for-line-item.ts`, `debug-shipstation-shipping-methods.ts`, `cleanup-manual-shipping-options.ts`).

### Next Steps
- Restart backend (`yarn dev`) after clearing stray `node …/medusajs` processes when running scripts.
- After running the cleanup script, verify checkout auto-selects ShipStation USPS Ground Advantage and captures the calculated freight end-to-end.
- Update this runbook once ShipStation quoting has been fully validated; consider adding an automated smoke test for Authorize.Net + ShipStation before launch.
- Draft consolidated “seed-environment” workflow that orchestrates `seed-fresh`, catalog seeding, and ShipStation linkage for dev/prod parity (target next task).

### 2025-10-30 — ShipStation rate throttle validation
- Checkout delivery step now exposes ShipStation services via a dropdown select + explicit `Calculate shipping` button. The button stays disabled until the address form passes the existing Zod validation to prevent empty-calculations. Added a frontend allowlist (default `shipstation_usps_ground_advantage`, override via `NEXT_PUBLIC_SHIPSTATION_SERVICE_ALLOWLIST`) so only approved ShipStation services surface.
- Updated the default stock location address (`sloc_01K81BTCRJS52E9XCGNXDYZPP7`) with city/state/postal/phone details so ShipStation receives non-empty `ship_from` fields; missing data previously triggered `city_locality/state_province/postal_code` errors when quoting.
- Exercised the new flow against `Example Flower – 1 oz` (28 g) using cart `cart_01K8PY0YHKY0JY46DZGH60KV53`. Triggered a single `POST /store/shipping-options/so_01K88TN3T3SZMD6PAYMTK2PMFV/calculate` call and confirmed `[shipstation-debug]` logged once with `shipping_amount: 5.15 USD` (no insurance/tax add-ons). Immediately adding the shipping method (`so_01K88TN3T3SZMD6PAYMTK2PMFV`) preserved the same 515¢ amount.
- Backend log excerpt for the successful quote:
  ```
  [shipstation-debug] rate response {
    "carrier_id": "se-3516060",
    "carrier_service_code": "usps_ground_advantage",
    "shipping_amount": { "currency": "usd", "amount": 5.15 },
    "insurance_amount": { "currency": "usd", "amount": 0 },
    "confirmation_amount": { "currency": "usd", "amount": 0 },
    "other_amount": { "currency": "usd", "amount": 0 }
  }
  ```
- Remaining gap: full Authorize.Net checkout still requires Accept.js tokenization; plan a follow-up run to capture the Authorize.Net receipt once the payment step can be executed end-to-end in the new UI.

### 2025-10-31 — Checkout state hardening
- Added a first-load guard (`PaymentWrapper`) that snaps the `step` query param to the earliest incomplete stage (address → delivery → payment → review). Returning to checkout now re-opens the correct step instead of showing completed summaries only.
- Delivery summary displays a “Continue to payment” CTA whenever a shipping method is saved but no Authorize.Net session exists; payment summary mirrors that with a “Payment not completed” banner so shoppers can resume the flow after navigation.
- Payment form now surfaces accepted cards (Visa/Mastercard/AmEx/Discover) and logs Authorize.Net errors to the console for easier troubleshooting; UI shows the gateway’s actual message instead of the generic “Something went wrong.”
- Implemented a server-side cart reset endpoint (`POST /store/carts/:id/reset`). The handler clones the current cart context (region, currency, sales channel, customer/email, metadata) into a fresh cart and deletes the previous cart row inside a transaction. Storefront `clearCart` calls this endpoint, swaps the cart cookie, and refreshes the checkout view—no stale shipping rates or orphaned carts remain. (Restart Medusa after pulling the change.)
- Clear cart button now strips `step`/`shippingOption` query params and triggers a router refresh so address/delivery/payment forms re-render empty immediately after the reset.
- Follow-up TODO: run a full Authorize.Net sandbox transaction end-to-end (with cleared cart, delivery, payment, review) and capture logs/screenshots for this runbook.

### 2025-10-31 — Checkout summary line-item controls
- Summary table now exposes quantity steppers and an inline remove button per item. The controls call the existing `updateLineItem`/`deleteLineItem` server actions so totals and delivery rates refresh immediately.
- `deleteLineItem` triggers the `/store/carts/:id/reset` flow whenever the cart becomes empty. Removing the final line item clears address/delivery/payment state without requiring a manual reload.
- Added lightweight error handling (inline error message + spinner feedback) so checkout surface propagates Medusa validation errors instead of failing silently.

### 2025-10-31 — QA prep (CLI pass)
- Ran `yarn db:reset:dev` and `yarn seed:fresh` locally; `yarn mirror:dev` still returns `401 Unauthorized` even with `MEDUSA_DEV_ADMIN_TOKEN`/`MEDUSA_DEV_PUBLISHABLE_KEY` loaded (DEV server expects an auth context that the CLI script could not supply).
- Attempted to script the storefront flow via direct Store API calls; requests to `/store/*` continue to reject the publishable key outside the Next.js runtime, which blocks triggering `[shipstation-debug]` logs programmatically.
- Full Authorize.Net Accept.js tokenisation requires the browser-only Accept.js SDK; no CLI substitute is available, so the end-to-end payment capture remains pending manual verification in the sandbox UI.

### 2025-11-01 — Store rebuild baseline
- Re-ran the full bootstrap (`yarn db:reset:dev`, `yarn seed:fresh`, `yarn mirror:dev`, `yarn mirror:inventory`) after publishing new dev credentials. Mirror now succeeds against localhost with the seeded admin API key.
- Seeded matching API credentials directly in Postgres so the CLI token values stay stable: `sk_fae76f24a223a737bac15134a9ab14dabae21a3a126ea2a7fda55eb70026bfb6` (admin) and `pk_6d1b7b2a9bbba59d9ac823c56bcff9befa2e38aae33971c87ee14df26f049f1a` (publishable). Both map to the new DTC sales channel (`sc_01K90994T2KA90YV245Z3NWV1S`) and the legacy default channel for parity.
- Updated the store’s default sales channel to `DTCWebStore` and linked it to the ShipStation-backed stock location (`sloc_01K90994N7WV7CXQKHQ4VABFZA`) so carts created via the Store API resolve inventory and pricing correctly.
  - Storefront now auto-discovers the store’s default sales channel via the Store API, so no manual env sync is required.
- Outstanding issue: programmatic Store API smoke tests still return `500` when adding line items (`addToCartWorkflowId` emits an `unknown_error`). Need to trace the workflow logs or reproduce through the Next.js UI to capture the stack trace before we can run the checkout QA script end-to-end.

### 2025-11-01 — Shipping rate recovery
- Cart creation finally succeeds headlessly after disabling automatic taxes on the US region (null tax provider previously short-circuited `addToCartWorkflowId`). SQL helper: `update region set automatic_taxes = false where id = 'reg_01K908ZVAH1DN2T8BY6X4QYNC9'`.
- Fulfillment plumbing now matches the mirrored stock location: added `location_fulfillment_set` link for `sloc_01K90994N7WV7CXQKHQ4VABFZA` → `fuset_01K908ZVBW4JR5Q9TB75FP77Q7`, updated both stock-location addresses with full city/state/postal/phone metadata, and set the lead variant’s weight to 400 g so ShipStation receives a non-zero package weight.
- CLI smoke run (cart `cart_01K90AYGKW98R4K9YBB6J37X4M`) returns a live USPS Ground Advantage quote and re-applies the method:
  ```
  POST /store/shipping-options/so_01K908ZWYJF0WGM0J5K82GCF1E/calculate → 200
  [shipstation-debug] rate response {
    "carrier_id": "se-3516060",
    "carrier_service_code": "usps_ground_advantage",
    "shipping_amount": { "currency": "usd", "amount": 7.45 },
    "insurance_amount": { "currency": "usd", "amount": 0 },
    "confirmation_amount": { "currency": "usd", "amount": 0 },
    "other_amount": { "currency": "usd", "amount": 0 }
  }
  ```
  Final cart totals (cents): `subtotal=78498`, `shipping_total=745`, `total=78498`.
- Next gap: Accept.js tokenisation still requires a browser (no CLI analogue). Need a manual pass in the sandbox UI to finish the QA checklist and capture Authorize.Net approvals.

### 2025-11-02 — Seed script shelved
- Removed `yarn seed:fresh` from the workflow; catalog seeding is now manual via Medusa Admin until a new strategy is agreed upon.
- Script file currently throws an explicit error when run so nobody accidentally wipes config while we stabilize checkout.

### Outstanding Work / Next Agent Notes
- [ ] **Browser QA pass** — Walk through checkout end-to-end (address → shipping quote → Authorize.Net Accept.js → place order) and capture:
  - `[shipstation-debug]` rate response for the order
  - Authorize.Net sandbox approval details (transaction ID, auth code)
  - Screenshots for each step (attach under `docs/task-002/artifacts/`)
- [ ] **Medusa log capture** — Export backend logs for the successful order (payment + fulfillment events) and link them here.
- [ ] **Docs refresh** — Incorporate the QA artifacts into this runbook (test date, cart/order IDs, key observations) once the run above succeeds.
- [ ] **Tax follow-up** — Model state-level tax rates and validate totals against Authorize.Net / ShipStation expectations before launch.
