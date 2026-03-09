# Wave 1 Recovery Overview (Backend-First Freeze)

## Status
Wave 1 is currently blocked by backend runtime failures and DB schema/runtime mismatch in wishlist persistence.

Reference evidence:
- `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/finalization-phases/evidence/phase-wave1-2026-03-02.md`
- `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/finalization-phases/evidence/phase-wave1-2026-03-02-rerun-after-restart.md`

## Recovery Strategy
Execution is locked to backend-first freeze:
1. Agent A backend hotfix only.
2. Agent D full QA rerun on fresh runtime.
3. If residual issue is storefront-only reviews query usage, dispatch tiny Agent B follow-up.
4. Manager gate decision: `pass`, `pass-with-risks`, or `fail`.

## Remediation Scope
1. No new endpoints.
2. Existing endpoints must stop returning `500 unknown_error` on valid authenticated flows.
3. Reviews query contract must be reconciled for `GET /store/products/:id/reviews` and optional `order`.
4. Wishlist DB runtime state must be valid (`wishlist` + dependent tables queryable).

## Mandatory Gate: Documentation Intake
Every agent must:
1. Ask user for relevant Medusa markdown docs/tutorial links for assigned scope.
2. Wait for docs/links or explicit `none`.
3. Produce a short Doc Map and cite where docs influenced implementation/testing.

Fallback if docs are not provided:
- local `docs/js-sdk/*`
- local skill references
- official Medusa docs
- explicit assumptions log

## Acceptance Gate (Wave 1 Recovery)
1. Reviews, wishlist, reorder, first-purchase, and product-feed authenticated flows no longer 500.
2. Wishlist persistence works end-to-end in runtime DB.
3. Reviews list/query behavior matches storefront usage or explicit agreed contract.
4. Product feed returns XML (`200` + XML content type) for valid inputs.
5. Agent D final decision is `GO` or `GO with explicit low-risk items only`.
