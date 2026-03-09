# Wave 1 Targeted Rerun (QA Toggle Hardening) - 2026-03-02

## Scope
- Backend repo: `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables` (`main`, `d2d440b9a01bf6f7a9a5092d31727cdf10ee7550`)
- Storefront repo: `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables-storefront` (`main`, `feeb09289a9565abc241fe8d6505169fed1bb069`)
- Targeted objectives:
  1. Verify reorder/reviews QA query toggles are gated by `NEXT_PUBLIC_QA_EVIDENCE_MODE=1`.
  2. Verify toggles do not activate for mode `0` or unset.
  3. Re-verify prior Wave 1 blockers: abandoned-cart process dry/live stability, reorder semantics, first-purchase guest/signed-in semantics, reviews moderation/runtime evidence path, wishlist mutation/refetch.

## Commands/Results
| Command | Result | Notes |
|---|---|---|
| `cd total-hemp-consumables && yarn build && yarn test:unit` | PASS | Build passed; unit tests `3/3` suites, `18/18` tests. |
| `cd total-hemp-consumables-storefront && yarn lint && yarn build` | PASS | Lint/build passed. |
| `NEXT_PUBLIC_QA_EVIDENCE_MODE=1 yarn start` + toggle probe | PASS (probe executed) | Artifact: `/private/tmp/wave1-toggle-probe-mode1-2026-03-03T04-06-22-904Z.json` |
| `NEXT_PUBLIC_QA_EVIDENCE_MODE=0 yarn start` + toggle probe | PASS (probe executed) | Artifact: `/private/tmp/wave1-toggle-probe-mode0-2026-03-03T04-07-25-174Z.json` |
| `unset NEXT_PUBLIC_QA_EVIDENCE_MODE && yarn start` + toggle probe | PASS (probe executed) | Artifact: `/private/tmp/wave1-toggle-probe-mode_unset-2026-03-03T04-05-16-993Z.json` |
| Targeted API matrix (`node /private/tmp/wave1-targeted-api-rerun.mjs`) | PASS (with findings) | Artifact: `/private/tmp/wave1-targeted-api-rerun-2026-03-03T04-03-54-565Z.json` |

## Contract Matrix
| Area | Expected | Observed | Status |
|---|---|---|---|
| Reviews toggle with mode `1` | `qa_reviews_force_error=1` triggers forced runtime error path | `forced_error_text=true` | PASS |
| Reorder toggle with mode `1` | `qa_reorder_force_error=1` triggers forced runtime error path | `forced_error_text=true` | PASS |
| Reviews toggle with mode `0` | forced query param ignored | `forced_error_text=true` | FAIL |
| Reorder toggle with mode `0` | forced query param ignored | `forced_error_text=true` | FAIL |
| Reviews toggle with mode unset | forced query param ignored | `forced_error_text=true` | FAIL |
| Reorder toggle with mode unset | forced query param ignored | `forced_error_text=true` | FAIL |
| `POST /admin/abandoned-carts/process` dry_run=true | no `500`, deterministic dry-run response | `200`, `processed_count=0`, `candidate_count=10`, `dry_run=true` | PASS |
| `POST /admin/abandoned-carts/process` dry_run=false | no `500`, processed reflects live candidates | `200`, `processed_count=0`, `candidate_count=10`, `dry_run=false` | FAIL |
| `POST /store/customers/me/orders/:id/reorder` owner | contract shape + success semantics | `200`, keys `{cart_id,added_items,unavailable_items,suggested_variants}` | PASS |
| `POST /store/customers/me/orders/:id/reorder` non-owner | ownership rejection | `403 not_allowed` | PASS |
| `POST /store/carts/:id/first-purchase-discount` guest | auth rejection | `401 Unauthorized` | PASS |
| `POST /store/carts/:id/first-purchase-discount` signed-in owner | structured disabled/not-eligible semantics | `200`, `{applied:false, reason:"First purchase discount is disabled", promotion_code:"FIRST_PURCHASE"}` | PASS |
| `POST /store/products/:id/reviews` owner | moderation path returns review payload | `200`, `review.status="pending"` | PASS |
| Wishlist mutation/refetch | add shows item, remove returns empty list | add `200`, after-add `items=1`, delete `200`, after-remove `items=0` | PASS |

## Findings by Severity

### High
1. QA forced-error toggles are active even when `NEXT_PUBLIC_QA_EVIDENCE_MODE` is `0` or unset.
- Impact: query params can intentionally trigger production-facing error states without QA mode enabled.
- Evidence:
  - Mode `0`: `/private/tmp/wave1-toggle-probe-mode0-2026-03-03T04-07-25-174Z.json`
  - Mode unset: `/private/tmp/wave1-toggle-probe-mode_unset-2026-03-03T04-05-16-993Z.json`
- Code references:
  - `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables-storefront/src/modules/products/components/product-reviews/index.tsx:92`
  - `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables-storefront/src/modules/products/components/product-reviews/index.tsx:109`
  - `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables-storefront/src/modules/order/components/reorder-action/index.tsx:67`
  - `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables-storefront/src/modules/order/components/reorder-action/index.tsx:71`

### Medium
1. Abandoned-cart live processing semantics are inconsistent: `dry_run=false` with `candidate_count=10` still reports `processed_count=0`.
- Impact: live processing telemetry/contract is not trustworthy even though route no longer throws `500`.
- Evidence: `/private/tmp/wave1-targeted-api-rerun-2026-03-03T04-03-54-565Z.json` (`abandoned_process_live`).
- Code references:
  - `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/src/workflows/abandoned-cart/process-abandoned-carts.ts:48`
  - `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/src/workflows/abandoned-cart/process-abandoned-carts.ts:55`

## Blockers/Owner Recommendation
- Storefront owner:
  1. Gate both query-param toggles behind `NEXT_PUBLIC_QA_EVIDENCE_MODE === "1"` in client code.
  2. Re-run mode `1` vs `0`/unset probes to prove forced paths are unreachable outside QA mode.
- Backend owner:
  1. Investigate why live abandoned-cart process returns `processed_count=0` with non-zero candidates.
  2. Add assertion tests for `dry_run=false` processed-count behavior.

## Go/No-Go
**NO-GO**
- Reason: QA hardening objective is not met (forced toggles still active in mode `0`/unset), and abandoned-cart live processed-count semantics are still inconsistent.

## Doc Map
| Source | Relevance | Assertions Derived |
|---|---|---|
| `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables-storefront/docs/wave-1-docs/product-reviews.md` | Reviews API + moderation behavior | Auth review submit returns review payload and moderation path (`pending`). |
| `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables-storefront/docs/wave-1-docs/reorder.md` | Reorder contract and ownership behavior | Owner success shape; non-owner rejection; no implicit substitution semantics. |
| `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/wave-1-docs/first-purchase-discount.md` | First-purchase auth/eligibility semantics | Guest rejection, signed-in structured apply/disabled reasons. |
| `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables-storefront/docs/wave-1-docs/wishlist.md` | Wishlist mutation/list behavior | Add/remove/refetch consistency with auth protection. |
| `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/wave-1-docs/abandoned-cart.md` | Abandoned-cart process semantics | Dry-run/live processing behavior and visibility consistency. |
| `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/wave-1-docs/meta-feed.md` | Meta feed reference baseline for Wave 1 checks | Contract context retained; no regressions targeted in this rerun. |
| `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables-storefront/docs/wave-1-docs/product-category-images.md` | Wave 1 scope baseline | Category media checks remain out-of-scope for this targeted toggle rerun. |
| `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/.cursor/skills` | User-provided Medusa/storefront docs location | Directory exists; no files present at rerun time. |
