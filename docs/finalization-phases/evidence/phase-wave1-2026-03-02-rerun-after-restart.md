# Wave 1 Verification Addendum (Post-Restart Rerun)
Date: 2026-03-02

## Context
This addendum re-ran the core Wave 1 verification after backend restart (user-requested rerun) to confirm whether prior failures were transient.

Primary prior report:
- `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/finalization-phases/evidence/phase-wave1-2026-03-02.md`

## Rerun Evidence Artifacts
- `/private/tmp/wave1-api-probe-rerun.json`
- `/private/tmp/wave1-rerun-9001.log`
- `/private/tmp/wave1-storefront-rerun-short.json`

## Rerun Result Summary

### Backend
Unchanged for core Wave 1 failures:
- Authenticated Wave 1 mutation/processing endpoints still return `500 unknown_error`:
  - Reviews POST
  - Wishlist GET/POST/DELETE
  - Reorder POST
  - First-purchase discount POST
  - Product feed GET

Root-cause traces still present in rerun logs:
- `TypeError: Cannot read properties of undefined (reading 'id')`
  - `@medusajs/orchestration ... transaction-orchestrator.ts:238`
- `TableNotFoundException ... relation "wishlist" does not exist`

Notes observed in rerun:
- Store GET endpoints now strictly require `x-publishable-api-key`; without it they return `400 not_allowed`.
- Admin abandoned-cart endpoints returned `401` for unauthenticated and API-key-auth attempts in this rerun environment, so authenticated admin semantic checks (`dry_run`) could not be re-validated in this pass.

### Storefront
End-user surface remains impacted by backend failures.
Additionally confirmed:
- Reviews list call with `order=-created_at` is rejected by backend validation:
  - `GET /store/products/:id/reviews?...&order=-created_at` returns `400 Invalid request: Unrecognized fields: 'order'`
  - This creates a storefront runtime error path on PDP reviews fetch.

Responsive smoke (390x844 subset) still loads core pages with HTTP 200:
- `/us/store`
- `/us/categories/cbd-tinctures`
- `/us/cart`
- `/us/checkout?step=address`
- `/us/account`

## Gate Decision (Rerun)
**FAIL (unchanged)**

Restart did not resolve the critical backend workflow failures or wishlist schema issue.
