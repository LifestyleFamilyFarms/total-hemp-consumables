# Production Punch List

Updated: 2026-03-15

## Purpose
This document ranks the remaining work between the current state and a defensible production launch.

It is not a second backlog. Use it to decide what must be finished before go-live, what should land immediately after launch, and what is explicitly deferred.

Canonical operational sources remain:
- memory: `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/MEMORY.md`
- backlog: `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/to-do-prod.md`
- dispatch queue: `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/finalization-phases/agent-dispatch/dispatch-index.md`
- evidence: `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/finalization-phases/evidence`

## Inputs Used
- Local command center and backlog in the backend repo.
- Current worktree state in backend and storefront repos.
- Official Medusa documentation via Medusa MCP:
  - Storefront development: https://docs.medusajs.com/resources/storefront-development
  - Storefront production optimization tips: https://docs.medusajs.com/resources/storefront-development/production-optimizations
  - Customer context: https://docs.medusajs.com/resources/storefront-development/customers/context
  - Admin development: https://docs.medusajs.com/learn/fundamentals/admin
  - Admin widgets: https://docs.medusajs.com/learn/fundamentals/admin/widgets
  - Analytics module: https://docs.medusajs.com/resources/infrastructure-modules/analytics
  - Analytics service reference: https://docs.medusajs.com/resources/references/analytics/service#how-to-use-analytics-module
  - Integrations overview: https://docs.medusajs.com/resources/integrations
  - React Native / Expo guide: https://docs.medusajs.com/resources/storefront-development/guides/react-native-expo

## Ranking Rules
- `Must Ship`: materially affects launch safety, checkout correctness, operator readiness, or legal/compliance posture.
- `Should Ship Soon`: docs-supported and high value, but not required to open the doors if the accepted risk is documented.
- `Defer`: worthwhile but not launch-critical, or likely to cause scope drift.

## Must Ship

### 1. Live checkout reconfirmation for paid browser flow
- Why:
  - This is the highest-value production proof. A commerce site is not production-ready if the paid path is not reverified in the real browser flow.
- Current state:
  - loyalty and zero/owned-cart flows are substantially verified
  - paid non-zero checkout still needs explicit browser reconfirmation
- Owner:
  - QA/Hardening + Cart/Checkout
- Exit evidence:
  - successful non-zero order in browser
  - payment authorization path works with current provider setup
  - order confirmation and downstream status are correct

### 2. Auth entry UX overhaul
- Why:
  - current backlog already marks this as high urgency
  - it directly affects acquisition, account conversion, and first-time user confidence
- Official Medusa angle:
  - customer auth/profile flows are a first-class storefront area, but Medusa does not require a generic template UX
  - docs support customer auth and optional customer context, not a forced visual pattern
- Owner:
  - Auth/Account storefront lane
- Exit evidence:
  - distinct sign-in and sign-up UX
  - mobile-first responsive pass
  - validation/error states verified

### 3. Cart / checkout / account visual signoff
- Why:
  - remaining route polish and manual visual review are still called out in backlog
  - this is conversion-critical and visible immediately at launch
- Official Medusa angle:
  - production storefront guidance explicitly recommends page-specific rendering and performance strategies, but UX clarity still sits with us
- Owner:
  - Cart/Checkout storefront lane
- Exit evidence:
  - live route review at launch breakpoints
  - updated screenshots or manual signoff notes

### 4. SendGrid abandoned-cart template configuration and live validation
- Why:
  - the safe code path exists, but operator setup must be complete for the feature to actually work in production
- Current state:
  - implementation is hardened
  - template/env hookup and live validation remain in backlog
- Owner:
  - SendGrid/Ops
- Exit evidence:
  - `ABANDONED_CART_TEMPLATE_ID` set
  - live admin process returns non-zero sent count when candidates exist

### 5. ShipStation API key rotation and shipping-provider readiness
- Why:
  - this is operationally blocking for real shipping behavior even if the code path exists
- Current state:
  - backlog explicitly calls out API key rotation to Proleve
- Owner:
  - Shipping/Ops
- Exit evidence:
  - production credentials rotated
  - provider probe succeeds with the intended account

### 6. Legal/compliance signoff on static policy content
- Why:
  - policy pages are implemented, but the backlog still marks legal review as pending
  - this is not engineering glamor work, but it is launch work
- Owner:
  - Human/legal review with engineering follow-through if copy changes
- Exit evidence:
  - explicit approval or accepted exception for launch

## Should Ship Soon

### 1. ShipStation webhook integration for shipping notifications
- Why:
  - this is the next high-priority backend lane
  - it improves post-purchase operations and customer communication
- Official Medusa angle:
  - Medusa explicitly supports fulfillment integrations and ShipStation provider patterns through the integrations/docs surface
- Current state:
  - dispatch exists and is ready
  - not yet implemented
- Recommendation:
  - ship before enabling full shipped-order notification expectations
  - acceptable to follow immediately after initial production cut if launch is not blocked on automated shipping updates

### 2. Full transactional email lifecycle QA gate
- Why:
  - Phase 13 foundation is implemented, but the full gate remains pending
- Current state:
  - abandoned-cart flow is hardened
  - broader lifecycle needs full evidence-backed gate
- Owner:
  - SendGrid/Ops + QA

### 3. Legacy subscriber fail-safe hardening
- Why:
  - active risk in `MEMORY.md`
  - provider/workflow failures bubbling through event subscribers are exactly the kind of latent production defect that hurts operator trust
- Current state:
  - backend review on 2026-03-09 identified remaining targets
- Owner:
  - Backend

### 4. ShipStation error normalization and diagnostics
- Why:
  - active risk in `MEMORY.md`
  - weak upstream error normalization makes future shipping work harder to debug
- Owner:
  - Backend / Shipping integration

### 5. Analytics module adoption
- Why:
  - official Medusa guidance supports analytics as a module/provider integration, with PostHog positioned as a production provider
  - this is valuable for funnel measurement, retention analysis, and post-launch iteration
- Official Medusa angle:
  - Analytics Module with Local provider for development and PostHog provider for production
  - docs suggest tracking events from workflows using the Analytics module service
- Recommendation:
  - do this soon after the launch surface is stable
  - do not block launch on it unless stakeholders require immediate product analytics

### 6. Google Search Console submission and launch-environment CWV review
- Why:
  - SEO foundations are in place; operational follow-through is still pending
- Owner:
  - SEO/Ops

### 7. Abandoned-cart unsubscribe / suppression policy
- Why:
  - this remains unresolved and should not disappear
  - especially important if abandoned-cart messaging is treated as re-engagement rather than purely transactional
- Recommendation:
  - resolve before scaling email volume, but it does not have to stop first launch if current risk is accepted explicitly

### 8. Admin/operator UI improvements with official Medusa admin patterns
- Why:
  - Medusa officially supports admin widgets and UI routes, not full admin skinning
  - use this for operator-value pages only: promotions ops, category media ops, shipping visibility, notification controls
- Recommendation:
  - use widgets/UI routes when an operator task is painful enough to justify it
  - do not start an admin redesign project

## Defer

### 1. Broad React Context rewrite
- Why:
  - Medusa docs do provide a customer-context example
  - that does not justify a general shared-state rewrite across the storefront
- Recommendation:
  - use context only where shared client state is genuinely needed
  - do not replace the existing `src/lib/data/*` pattern with context-heavy architecture

### 2. Mobile app build
- Why:
  - Medusa does have an official React Native / Expo tutorial
  - it is real and viable, but still a separate product track
- Recommendation:
  - treat mobile as a Phase 2 initiative unless there is an immediate business requirement
  - do not let it dilute web launch work

### 3. Heavy admin rebuild
- Why:
  - official admin docs are clear: native customization is widgets and UI routes
  - a full custom admin is possible, but only if the use case demands it
- Recommendation:
  - defer unless operator workflows prove the built-in admin is insufficient

### 4. Omnichannel / multi-storefront expansion
- Why:
  - Medusa supports this architecturally
  - it is not a production-readiness task for the current web storefront launch

## Sharp Guidance
- Do not add broad React Context because the docs mention it.
- Do not start mobile because the docs support it.
- Do not start analytics before checkout and operations are trustworthy.
- Do not do admin customization unless it removes real operator pain.
- Finish the money path, auth path, and operator path first.

## Recommended Execution Order
1. Square up and commit current validated docs/memory/worktree state.
2. Reverify paid browser checkout.
3. Finish auth entry UX overhaul.
4. Finish cart/checkout/account visual signoff.
5. Complete abandoned-cart template/operator configuration.
6. Rotate ShipStation credentials and confirm provider readiness.
7. Run ShipStation webhook integration dispatch.
8. Run transactional email lifecycle QA gate.
9. Harden legacy subscribers and ShipStation error normalization.
10. Add analytics module/provider after the launch surface is stable.

## If We Need To Cut Scope
Cut in this order:
1. mobile app work
2. broad React Context work
3. admin UI enhancements beyond operator-critical tasks
4. analytics provider integration

Do not cut:
1. paid checkout proof
2. auth entry UX repair
3. cart/checkout/account final signoff
4. required operator configuration for active email/shipping features
