# Wave 1 QA Evidence (Post-Hotfix Rerun) - 2026-03-02

## 1) Scope + Revision Context Reviewed
- Backend repo: `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables`
  - Branch: `main`
  - Revision: `d2d440b9a01bf6f7a9a5092d31727cdf10ee7550`
- Storefront repo: `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables-storefront`
  - Branch: `main`
  - Revision: `feeb09289a9565abc241fe8d6505169fed1bb069`
- Runtime: backend `http://localhost:9000`, storefront `http://localhost:8000`
- Scope rerun: reviews, wishlist, reorder, first-purchase discount, category images, meta feed, abandoned-cart admin flow, auth/ownership matrix, responsive smoke.

## 2) Doc Map
| Source | Why Relevant | Acceptance Assertions Derived |
|---|---|---|
| `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables-storefront/docs/wave-1-docs/product-reviews.md` | Review domain behavior + moderation flow | Store reviews list shape is stable; authenticated review submit returns review payload and supports moderation (`pending`) path. |
| `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables-storefront/docs/wave-1-docs/wishlist.md` | Wishlist ownership/auth + item modeling | Auth-only wishlist routes; add/remove are idempotent at item level; wishlist items should resolve variant/product context. |
| `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables-storefront/docs/wave-1-docs/reorder.md` | Reorder workflow contract and storefront action expectations | Reorder must return cart handoff + grouped unavailable/suggested variant results; no implicit substitution. |
| `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/wave-1-docs/first-purchase-discount.md` | Discount eligibility and disabled behavior semantics | Route returns applied/not-applied semantics and reason; default-disabled behavior must be explicit and safe. |
| `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables-storefront/docs/wave-1-docs/product-category-images.md` | Category image API and storefront media resilience | Category image contract must safely handle missing/malformed media and not crash presentation paths. |
| `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/wave-1-docs/meta-feed.md` | Feed route + XML output expectations | `/product-feed` returns valid XML/RSS with proper content type and usable verification path. |
| `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/wave-1-docs/abandoned-cart.md` | Abandoned-cart processing semantics | Admin process route must honor `dry_run` and expose filtered candidate visibility/count semantics. |
| `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/.cursor/skills` | User-provided Medusa/storefront docs location | Directory exists but contained no files at rerun time; assertions taken from wave docs + implemented contracts. |

## 3) Commands Executed + Pass/Fail
| Command | Result | Notes |
|---|---|---|
| `cd total-hemp-consumables && yarn build` | PASS | Build succeeded. |
| `cd total-hemp-consumables && yarn test:unit` | PASS | 3/3 suites, 18/18 tests passing. |
| `cd total-hemp-consumables-storefront && yarn lint` | PASS | No lint errors. |
| `cd total-hemp-consumables-storefront && yarn build` | PASS | Production build succeeded. |
| `cd total-hemp-consumables-storefront && yarn tsc --noEmit` | FAIL | Pre-existing TS error at `src/components/layout/topbar.tsx:95` (`"sm"` not assignable to `"orig" | "md"`). |
| API rerun probe (`node /private/tmp/wave1-api-rerun-post-hotfix.mjs`) | PASS (with findings) | Artifact: `/private/tmp/wave1-api-rerun-post-hotfix-2026-03-02T21-44-07-045Z.json` |
| Responsive screenshot smoke (`./scripts/responsive-smoke.sh`) | PASS | Artifact dir: `/private/tmp/wave1-responsive-post-hotfix-rerun/20260302-164512` |
| Viewport HTTP smoke (Playwright) | PASS | Artifact: `/private/tmp/wave1-storefront-responsive-status.json` |
| Storefront guest/auth targeted UI probes (Playwright) | PARTIAL | Artifacts: `/private/tmp/wave1-storefront-guest-rerun.json`, `/private/tmp/wave1-storefront-auth-rerun.json`, `/private/tmp/wave1-storefront-reorder-ui.json` |

## 4) API Contract Verification Matrix
| Endpoint | Expected | Observed | Status |
|---|---|---|---|
| `GET /store/products/:id/reviews?limit&offset&order=-created_at` | `{reviews,count,limit,offset}` | `200`; shape matched; `order=-created_at` accepted | PASS |
| `POST /store/products/:id/reviews` (unauth) | auth rejection | `401 Unauthorized` | PASS |
| `POST /store/products/:id/reviews` (auth owner) | review payload | `200`; `{review:{...,status:"pending"}}` | PASS |
| `GET /store/customers/me/wishlists` (unauth) | auth rejection | `401` | PASS |
| `GET /store/customers/me/wishlists` (auth) | `{wishlist|null,items[]}` with variant context | `200`; shape matched; variant+product fields present when item exists | PASS |
| `POST /store/customers/me/wishlists/items` (unauth) | auth rejection | `401` | PASS |
| `POST /store/customers/me/wishlists/items` (auth) | `{wishlist_id,item}` | `200`; shape matched | PASS |
| `DELETE /store/customers/me/wishlists/items/:id` (unauth) | auth rejection | `401` | PASS |
| `DELETE /store/customers/me/wishlists/items/:id` (auth owner) | `{id,removed}` | `200`; `{id,removed:true}` | PASS |
| Wishlist persistence E2E | item appears after add, disappears after delete | Confirmed via add->get->delete->get flow in probe | PASS |
| `POST /store/customers/me/orders/:id/reorder` (unauth) | auth rejection | `401` | PASS |
| `POST /store/customers/me/orders/:id/reorder` (owner) | `{cart_id,added_items,unavailable_items,suggested_variants[]}` | `200`; shape matched including nested `variants[]` | PASS |
| `POST /store/customers/me/orders/:id/reorder` (non-owner) | ownership rejection | `403 not_allowed` | PASS |
| `POST /store/carts/:id/first-purchase-discount` (unauth) | auth rejection | `401` | PASS |
| `POST /store/carts/:id/first-purchase-discount` (owner) | `{cart,applied,reason,promotion_code}` | `200`; `applied:false`, reason=`First purchase discount is disabled` | PASS |
| `POST /store/carts/:id/first-purchase-discount` (non-owner) | ownership rejection | `403 not_allowed` | PASS |
| `GET /store/product-categories/:id/images` | `{category_id,images{thumbnail,banner,gallery[]}}` | `200`; shape matched (`null/null/[]` for tested category) | PASS |
| `GET /store/product-categories/:id/images` missing | not found | `404` | PASS |
| `GET /product-feed?currency_code=usd&country_code=us` | `200`, XML content-type, valid RSS/XML body | `200`; `application/xml; charset=utf-8`; RSS XML returned | PASS |
| `POST /admin/abandoned-carts/process` (unauth) | auth rejection | `401` | PASS |
| `GET /admin/abandoned-carts/visibility` (unauth) | auth rejection | `401` | PASS |
| `POST /admin/abandoned-carts/process` (admin dry_run=true) | `processed_count=0`, no send/update | `500 unknown_error` | FAIL |
| `POST /admin/abandoned-carts/process` (admin dry_run=false) | processed count reflects candidates | `500 unknown_error` | FAIL |
| `GET /admin/abandoned-carts/visibility` (admin) | candidate-filtered pagination/count | `200`; `{carts,count,limit,offset}` returned | PASS |

## 5) Frontend Behavior Matrix
Legend: `PASS` = directly observed in browser run, `PARTIAL` = indirect/limited evidence, `FAIL` = expected behavior not observed.

| Feature | States Tested | Status | Evidence |
|---|---|---|---|
| Reviews (PDP) | section render; guest auth gate; empty state | PASS | `/private/tmp/wave1-storefront-guest-rerun.json` (`reviews_title=true`, `reviews_signin=true`, `reviews_empty=true`) |
| Reviews (PDP) | loading state; forced error state; authenticated submit + moderation copy | PARTIAL | Loading/error/moderation copy not consistently observed in browser harness; API submit contract is passing (`status:pending`) |
| Wishlist (PDP) | guest auth gate | PASS | `/private/tmp/wave1-storefront-guest-rerun.json` (`wishlist_signin=true`) |
| Wishlist (PDP) | auth add/remove mutation and refetch consistency | PARTIAL | Panel visible, but toggle control not consistently discovered in auth run (`wishlist_toggle_visible=false`) |
| Reorder (Order details) | section visibility, action trigger, result panels, no-substitution copy, cart handoff | FAIL | Section/button render observed, but click produced no result/error panel in UI probe (`/private/tmp/wave1-storefront-reorder-ui.json`) |
| First-purchase discount (Cart) | guest gate + disabled button; signed-in states; disabled feature behavior UI | FAIL | API route behavior is correct, but cart UI states/button were not observed in browser checks |
| Category presentation | store category cards and category page render safety | PASS | `/private/tmp/wave1-storefront-guest-rerun.json` (`store_status=200`, `store_cards=true`, `category_status=200`) |
| Meta feed visibility | docs path/actionability + manual URL check | PASS | `docs/meta-product-feed-verification.md` exists with concrete URL/curl examples; manual URL check returned XML |
| Regression smoke | cart/checkout/account/loyalty/filter routes | PASS | `/private/tmp/wave1-storefront-auth-rerun.json` and responsive status checks all `200` |
| Responsive minimum | `390x844`, `1024x768`, `1440x900` | PASS | `/private/tmp/wave1-storefront-responsive-status.json` + screenshots in `/private/tmp/wave1-responsive-post-hotfix-rerun/20260302-164512` |

## 6) Findings by Severity

### Critical
1. Abandoned-cart admin process still fails with `500` for authenticated admin (`dry_run=true/false`).
- Impact: core Wave 1 abandoned-cart processing semantics cannot be validated or safely released.
- Repro: `POST /admin/abandoned-carts/process` with valid admin bearer token and body `{dry_run:true|false, lookback_hours:24, limit:10}`.
- Evidence: `/private/tmp/wave1-api-rerun-post-hotfix-2026-03-02T21-44-07-045Z.json` (`abandoned_process_admin_dry`, `abandoned_process_admin_live`).
- Code path: `src/api/admin/abandoned-carts/process/route.ts:9`, `src/workflows/abandoned-cart/process-abandoned-carts.ts:17`.

### High
1. Reorder storefront CTA is visible, but no post-click result state rendered (no added/unavailable/suggested sections observed).
- Impact: customer-facing reorder UX acceptance is not met despite backend contract passing.
- Evidence: `/private/tmp/wave1-storefront-reorder-ui.json` (`button_visible=true`, result sections all false).
- UI code path: `src/modules/order/components/reorder-action/index.tsx:58`.

2. First-purchase discount UI states are not observable in current cart runtime checks (guest/signed-in), so UX acceptance cannot be confirmed.
- Impact: backend behavior is correct, but cart-summary UX gate remains unverified and likely non-functional in current runtime.
- UI code path: `src/modules/cart/templates/summary.tsx:36`, `src/modules/checkout/components/first-purchase-discount/index.tsx:136`.

### Medium
1. Review error-state + pending moderation copy were not reliably observed in browser harness, though API contract passes.
- Impact: frontend acceptance incomplete for error/moderation messaging paths.
- UI code path: `src/modules/products/components/product-reviews/index.tsx:197`, `src/modules/products/components/product-reviews/index.tsx:256`, `src/modules/products/components/product-reviews/index.tsx:431`.

2. Wishlist authenticated mutation/refetch path lacks clean UI evidence in this rerun (toggle control not consistently surfaced).
- Impact: contract-level behavior is validated, but PDP interaction evidence is incomplete.
- UI code path: `src/modules/products/components/wishlist-panel/index.tsx:94`.

### Low
1. Storefront typecheck still fails (pre-existing/unrelated to this rerun).
- Evidence: `src/components/layout/topbar.tsx:95` (`"sm"` not assignable to `"orig" | "md"`).

## 7) Blockers + Owner Recommendation
- Blocker A (Backend owner): fix abandoned-cart process runtime failure and re-run admin dry/live semantic checks before release.
- Blocker B (Storefront owner): verify/fix reorder action execution and first-purchase cart-summary rendering in a real authenticated browser flow; provide deterministic UI evidence.
- Blocker C (Storefront owner): close remaining UI evidence gaps for review moderation/error and wishlist mutation/refetch paths.

## 8) Residual Risks / Monitoring Notes
- API layer for Wave 1 store routes is materially improved and no longer returning `500` on targeted authenticated paths.
- Storefront UX evidence is still partial; monitor checkout/cart/order-detail client logs and route-level error rates after fixes.
- Keep `/product-feed` monitored for XML integrity and content-type drift.

## 9) Final Gate Recommendation
**FAIL**

Reason: abandoned-cart admin processing remains broken (`500`), and critical storefront UX paths (reorder result rendering, first-purchase UI behavior) are not release-verifiable in this rerun.
