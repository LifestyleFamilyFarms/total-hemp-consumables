# Wave 1 Recovery Plan (Backend-First Freeze)

Updated: 2026-03-02

## Summary
Wave 1 is blocked by backend runtime failures, not storefront UX quality.  
Execution is locked to backend-first remediation and QA rerun before any additional storefront work.

Reference evidence:
- `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/finalization-phases/evidence/phase-wave1-2026-03-02.md`
- `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/finalization-phases/evidence/phase-wave1-2026-03-02-rerun-after-restart.md`

## Remediation Scope
1. No new endpoints.
2. Existing Wave 1 endpoints must stop returning `500 unknown_error` for valid authenticated flows.
3. Reviews list query contract must be reconciled around optional `order`.
4. Wishlist runtime persistence must be valid (`wishlist` + dependent tables present/queryable).

## Locked Execution Order
1. Agent A hotfixes backend runtime and schema issues.
2. Agent D reruns full Wave 1 verification on fresh runtime.
3. Conditional:
   - If only residual issue is storefront-side reviews query usage, dispatch a tiny Agent B patch.
4. Manager gate verdict:
   - `pass`
   - `pass-with-risks`
   - `fail`

## Acceptance Criteria
1. Reviews, wishlist, reorder, first-purchase discount, and product-feed authenticated paths no longer return `500`.
2. Wishlist CRUD succeeds end-to-end with real DB persistence.
3. Reviews list behavior aligns with storefront query usage or a documented contract decision.
4. Product feed returns valid XML for valid country/currency.
5. Agent D final verdict is `GO` or `GO with explicit low-risk items only`.

## Critical Test Scenarios
1. Reviews:
   - unauth submit rejected
   - auth submit succeeds
   - list endpoint accepts current query shape
2. Wishlist:
   - unauth blocked
   - auth list/add/remove succeeds and persists
3. Reorder:
   - owner succeeds with `added_items[]`, `unavailable_items[]`, `suggested_variants[]`
   - non-owner rejected deterministically
4. First-purchase discount:
   - unauth blocked
   - owner deterministic applied/not-eligible/already-applied states
   - non-owner rejected deterministically
5. Meta feed:
   - valid country/currency returns XML
   - invalid input handled predictably
6. Abandoned cart:
   - process + visibility auth checks
   - dry-run/live semantics validated when admin auth is available

## Assumptions and Defaults
1. Backend-first freeze is mandatory until core endpoints are green.
2. Storefront `topbar.tsx` type issue remains non-blocking for this Wave 1 recovery gate.
3. No additional feature scope is introduced in this pass.
4. Documentation intake gate remains mandatory for all agents.
