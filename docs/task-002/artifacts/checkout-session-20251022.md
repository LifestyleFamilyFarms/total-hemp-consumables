# Checkout QA Session — 2025-10-22

## Timeline Highlights (UTC)
- 17:11:51 — Backend `yarn dev` started (`backend-dev-20251022-131511.log`).
- 17:16:11 — Storefront `yarn dev` started (`storefront-dev-20251022-131611.log`).
- 17:31:12 — Cart created (ID redacted) and item added.
- 17:44:19 — Authorize.Net payment session initialized (session ID redacted).
- 17:45:46 — Checkout attempt returned `payment_authorization_error` (Authorize.Net sandbox rejected credentials).
- 21:03:15 — New payment session created with Authorize.Net opaque data (session ID redacted).
- 21:03:26 — Order created and captured successfully (order and payment collection IDs redacted; see secure backend log for reference).

## Key Commands Executed
```
# DB remediation after seed/mirror
node scripts:
  - Set tax_region.provider_id = 'tp_system'
  - Link DTCWebStore sales channel to stock location
  - Backfill product_shipping_profile entries

# Checkout via Store API
curl POST /store/carts/... (email, address, shipping method)
curl POST /store/payment-collections
curl POST /store/payment-collections/{id}/payment-sessions
curl POST /store/carts/{id}/complete

# Authorize.Net opaqueData token test
node script -> https://apitest.authorize.net/xml/v1/request.api (E00007)
```

## Errors Observed
- **Tax provider missing**: `Unable to retrieve the tax provider with id: null` when adding line item.
- **Sales channel linkage**: `fp_undefined` when creating shipping method until `DTCWebStore` was linked to stock location.
- **Shipping profile gap**: `cart items require shipping profiles` until product/profile join table populated.
- **Authorize.Net authentication**: `E00007` from sandbox API and `payment_authorization_error` on checkout — indicates invalid `API_LOGIN_ID` / `transactionKey` / `clientKey` combination.
- **Payment session authorization**: backend logged `TypeError: Cannot read properties of undefined (reading 'shipping_methods')` during failed authorization (context missing after error response).
- **Payment session deletion**: repeated `Could not delete all payment sessions` errors surfaced when `initiatePaymentSession` was called twice for Authorize.Net (once without card data). Resolved by skipping the pre-token session init for the Authorize.Net provider.

## Current Cart State
- Primary test cart closed successfully; associated order and payment collection identifiers are stored in secure logs (status: completed, authorized + captured 1018.99 USD).
  Previous test carts remain forensics-only with `not_paid` payment collections (IDs redacted).

## 2025-10-23 Retest Snapshot (sandbox)
- Updated Authorize.Net credential handling: Accept.js token returned `resultCode: "Ok"` (opaqueData descriptor `COMMON.ACCEPT.INAPP.PAYMENT`).
- Storefront now populates payment session payload with `dataDescriptor`, `dataValue`, and a cart snapshot (shipping methods + addresses). See `src/modules/checkout/components/payment/index.tsx`.
- Payment session created with the tokenized card; backend log (`backend-dev-20251023-085703.log`) confirms Authorize.Net approval (transaction identifiers redacted).
- Cart completion succeeded; Medusa registered the order and marked the payment collection as `completed` (authorized + captured). No ShipStation errors surfaced while quoting the `Ground` option.

## Follow-up Recommendations
1. Refresh Authorize.Net sandbox credentials (`API_LOGIN_ID`, `TRANSACTION_KEY`, `CLIENT_KEY`) and update `.env` files.
2. Automate DB post-seed remediation:
   - Ensure `tax_region.provider_id` -> `tp_system`.
   - Link mirrored sales channels to default stock location.
   - Attach products to default shipping profile.
3. Investigate `payment_authorization_error` handling (avoid crashing on missing `shipping_methods`).
4. Re-run checkout once credentials & data integrity fixes are in place; capture ShipStation quote after successful order.
