# Project Agent Roster (Command System)

Last updated: 2026-03-03
Owner: Manager (you) + Reviewing Engineer (Codex)

## Purpose
Use persistent, domain-named agents (not generic Agent A/B/C) so work can be reassigned quickly without re-onboarding each pass.

This roster is the source of truth for:
- lane ownership
- prompt routing
- handoff/report format
- QA and release gates

---

## Operating Model

### 1) Assignment style
- Primary model: persistent domain agents.
- Planning style: wave/packet bundles.
- Execution: assign each bundle to the domain owner(s) below.

### 2) Documentation Intake Gate (mandatory)
Before coding/testing, every agent must:
1. Ask for relevant local markdown docs/tutorial references.
2. Wait for docs or explicit `none`.
3. Produce a short Doc Map:
   - doc path/link
   - why relevant
   - decisions derived

Fallback if docs are not provided:
- `docs/js-sdk/*`
- `docs/wave-1-docs/*`
- repo-local skills and references
- explicit assumptions list

### 3) Architecture rules (always on)
- Storefront Medusa calls stay in `src/lib/data/*`.
- Use `sdk.client.fetch` for custom Medusa endpoints.
- No `JSON.stringify` bodies for SDK requests.
- Backend pricing/shipping amounts are source of truth (no `/100` UI scaling heuristics).
- Backend business mutations go through workflows; route handlers stay thin.

---

## Agent Roster

## 1) SendGrid/Ops Agent
**Mission**
- Notification delivery operations, abandoned-cart send path, template/provider reliability.

**Primary scope**
- Backend: notification provider configuration, abandoned-cart process workflow behavior, provider env wiring.
- Evidence: dry/live process semantics and delivery metrics.

**Owned paths**
- `total-hemp-consumables/src/workflows/abandoned-cart/**`
- `total-hemp-consumables/src/api/admin/abandoned-carts/**`
- `total-hemp-consumables/medusa-config.ts` (notification-provider sections only)
- Ops docs under `docs/` related to SendGrid/abandoned-cart

**Non-goals**
- Checkout/cart UI redesign, PDP visuals, unrelated promotions logic.

---

## 2) Promotions Agent
**Mission**
- Promotion and discount business logic and admin-operability.

**Primary scope**
- First-purchase discount workflows/routes and operational controls.
- Promotion semantics and deterministic customer-facing states.

**Owned paths**
- `total-hemp-consumables/src/workflows/first-purchase/**`
- `total-hemp-consumables/src/api/store/carts/[id]/first-purchase-discount/**`
- Related storefront data/action surfaces:
  - `total-hemp-consumables-storefront/src/lib/data/cart.ts`
  - `total-hemp-consumables-storefront/src/modules/**/first-purchase-discount/**`

**Non-goals**
- Wishlist/reviews unless explicitly part of a promotion contract.

---

## 3) PDP Agent
**Mission**
- Product-detail experiences and product-level engagement features.

**Primary scope**
- Reviews UX/data integration, wishlist PDP integration, product detail component behavior.

**Owned paths**
- `total-hemp-consumables-storefront/src/modules/products/**`
- `total-hemp-consumables-storefront/src/lib/data/reviews.ts`
- `total-hemp-consumables-storefront/src/lib/data/wishlist.ts`
- Backend review/wishlist contracts (only when required):
  - `total-hemp-consumables/src/api/store/products/[id]/reviews/**`
  - `total-hemp-consumables/src/api/store/customers/me/wishlists/**`
  - `total-hemp-consumables/src/workflows/reviews/**`
  - `total-hemp-consumables/src/workflows/wishlist/**`

**Non-goals**
- Cart/checkout flow ownership (unless requested for cross-lane fix).

---

## 4) Cart/Checkout Agent
**Mission**
- Cart, checkout, reorder, payment-step readiness, UX resilience.

**Primary scope**
- Reorder UX/contracts, loyalty application surfaces, checkout state and guardrails.

**Owned paths**
- `total-hemp-consumables-storefront/src/modules/cart/**`
- `total-hemp-consumables-storefront/src/modules/checkout/**`
- `total-hemp-consumables-storefront/src/modules/order/**`
- `total-hemp-consumables-storefront/src/lib/data/orders.ts`
- Backend reorder/checkout supporting contracts when needed:
  - `total-hemp-consumables/src/api/store/customers/me/orders/[id]/reorder/**`
  - `total-hemp-consumables/src/workflows/reorder/**`

**Non-goals**
- Global nav/theme design unless explicitly assigned.

---

## 5) Catalog/Feed Agent
**Mission**
- PLP/catalog presentation data, category media, product-feed visibility and validation.

**Primary scope**
- Category media rendering and fallback behavior.
- Meta product feed verification/operator docs.

**Owned paths**
- `total-hemp-consumables-storefront/src/lib/data/categories.ts`
- `total-hemp-consumables-storefront/src/modules/store/**`
- `total-hemp-consumables-storefront/src/modules/categories/**`
- Backend feed/category media APIs:
  - `total-hemp-consumables/src/api/product-feed/**`
  - `total-hemp-consumables/src/api/store/product-categories/[id]/images/**`
  - `total-hemp-consumables/src/api/admin/product-categories/[id]/images/**`

**Non-goals**
- Checkout/payment flows.

---

## 6) Auth/Account Agent
**Mission**
- Sign-in/sign-up/account UX, account dashboard continuity, account-level flows.

**Primary scope**
- Login/register template behavior, account area consistency, loyalty account widgets.

**Owned paths**
- `total-hemp-consumables-storefront/src/modules/account/**`
- `total-hemp-consumables-storefront/src/app/**/account/**`
- `total-hemp-consumables-storefront/src/lib/data/customer.ts`

**Non-goals**
- Promotion engine internals, feed/catalog APIs.

---

## 7) QA/Hardening Agent
**Mission**
- Independent contract validation, auth/ownership matrix, release gate evidence.

**Primary scope**
- Build/lint/test gates, API matrix checks, responsive smoke, Go/No-Go recommendation.

**Owned outputs**
- `docs/finalization-phases/evidence/*.md`
- test artifact references in `/private/tmp/...`

**Non-goals**
- Feature implementation (except tiny diagnostic scripts as needed).

---

## 8) UI Systems Agent
**Mission**
- Visual consistency, theme fidelity, component polish, and design-system coherence.

**Primary scope**
- Shared surface patterns, typography/readability, theme parity, component-level visual hardening.

**Owned paths**
- `total-hemp-consumables-storefront/src/app/global.css`
- `total-hemp-consumables-storefront/src/components/ui/**`
- `total-hemp-consumables-storefront/src/components/layout/**` (visual behavior only)
- theme/brand mapping files under `src/lib/brand/**`

**Non-goals**
- Business logic, API contracts, workflow mutations.

---

## 9) UX Flows Agent
**Mission**
- Task-completion UX across critical journeys (auth, cart, checkout, account, reorder).

**Primary scope**
- State clarity, error guidance, CTA hierarchy, conversion-friction reduction, onboarding/readability.

**Owned paths**
- `total-hemp-consumables-storefront/src/modules/account/**`
- `total-hemp-consumables-storefront/src/modules/cart/**`
- `total-hemp-consumables-storefront/src/modules/checkout/**`
- `total-hemp-consumables-storefront/src/modules/order/**`

**Non-goals**
- Provider integrations, backend workflow internals, feed/catalog APIs.

---

## 10) Performance/SEO Agent
**Mission**
- Frontend performance, mobile responsiveness, crawl/index hygiene, release-readiness on speed metrics.

**Primary scope**
- Above-the-fold asset strategy, image delivery strategy, route-level metadata, render cost/rerender control.

**Owned paths**
- `total-hemp-consumables-storefront/src/app/**`
- `total-hemp-consumables-storefront/public/**` (asset strategy/rationalization)
- performance/testing scripts under `total-hemp-consumables-storefront/scripts/**`

**Non-goals**
- Commerce rule logic and promotion semantics.

---

## 11) Payments/Risk Agent
**Mission**
- Payment-path resilience, ownership/auth enforcement at payment-sensitive points, operational risk checks.

**Primary scope**
- Payment method routing states, checkout-to-payment gating, fraud/risk guardrails in flow logic.

**Owned paths**
- `total-hemp-consumables-storefront/src/modules/checkout/**` (payment-sensitive states)
- `total-hemp-consumables/src/api/store/carts/**` (payment/discount interaction points)
- provider config/docs where payment runtime behavior is documented

**Non-goals**
- Global visual polish unrelated to payment flow.

---

## 12) Content/Compliance Agent
**Mission**
- Policy/legal page consistency, storefront compliance messaging, trust/assurance copy alignment.

**Primary scope**
- Shipping/refund/terms/privacy pages, compliance bar messaging, loyalty policy copy alignment.

**Owned paths**
- `total-hemp-consumables-storefront/src/app/**/content/**`
- `total-hemp-consumables-storefront/src/modules/content/**`
- policy/compliance docs under `/docs`

**Non-goals**
- Backend workflow implementation, core cart/checkout mechanics.

---

## Dispatch Matrix (When to Use Specialized Agents)
- Use **UI Systems Agent** when issue is visual inconsistency, illegibility, theme drift, or component styling debt.
- Use **UX Flows Agent** when issue is conversion friction, confusion, weak error handling, or unclear CTA/state behavior.
- Use **Performance/SEO Agent** when issue is slow routes, LCP/CLS concerns, asset bloat, metadata/indexing gaps.
- Use **Payments/Risk Agent** when issue involves payment progression, auth/ownership around payment actions, or checkout risk semantics.
- Use **Content/Compliance Agent** when issue is policy correctness, legal/compliance copy, or trust messaging consistency.
- Keep **QA/Hardening Agent** as final independent validator for all high-impact work.

---

## Lane Collision Rules
- One primary owner per lane.
- Cross-lane edits require:
  1. justification in prompt
  2. explicit overlap note in deliverable
  3. owner acknowledgment in manager review
- If uncertain, default to creating a small dependency note rather than editing another lane.

---

## Standard Prompt Contract (for all agents)
Every dispatched prompt must include:
1. Repo path(s)
2. Scope and non-scope
3. Mandatory Doc Intake Gate
4. Rules (SDK/workflow/ownership constraints)
5. Validation commands
6. Deliverable format
7. Severity-ordered findings requirement for review passes

---

## Deliverable Template (required)
Agents must return:
1. Files changed
2. Commands run + pass/fail
3. Contract matrix (expected vs observed) for API/flow work
4. Findings by severity with file:line references
5. Risks/blockers + owner recommendation
6. Doc Map
7. Final recommendation (`approve`, `changes requested`, or `go/no-go`)

---

## Manager Gate States
- `PASS`
- `PASS-WITH-RISKS` (only low-risk, time-bounded follow-ups)
- `FAIL` (block release; assign remediation owner immediately)

---

## Current Priority Mode
Wave 1 is now at targeted PASS; next work should run as scoped cleanup packets, not broad parallel refactors.

Recommended immediate cleanup packet owners:
1. SendGrid template hookup + verification -> SendGrid/Ops Agent
2. First-purchase admin operability -> Promotions Agent
3. Category images runbook/operator flow -> Catalog/Feed Agent

Specialized support on demand:
1. UI legibility/theme pass -> UI Systems Agent + UX Flows Agent (paired)
2. Mobile responsiveness hardening -> UX Flows Agent + Performance/SEO Agent
3. Checkout risk/payment-state hardening -> Cart/Checkout Agent + Payments/Risk Agent
4. Policy/compliance copy sync -> Content/Compliance Agent

---

## Handoff Checklist (between agents)
Before handoff, include:
1. Branch or commit ref used for review context
2. Exact environment assumptions (`.env` flags that matter)
3. Data fixtures/seeds required
4. Repro commands (copy-paste ready)
5. Open risks not fixed

---

## Escalation Rules
- Critical/High issue found in QA: freeze lane and dispatch owner immediately.
- Repeated contract drift between backend/storefront: assign both lane owners + QA/Hardening for joint pass.
- If runtime differs from commit refs, evidence must explicitly state working-tree vs commit provenance.
