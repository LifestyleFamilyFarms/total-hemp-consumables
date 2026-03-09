# Phase 01 Finalization: Commerce-Critical Backend Unblockers

Status: Pending

## Goal
Verify backend cart/payment/order foundations are stable and unblock storefront funnel paths.

## Pass Checklist
- [ ] Cart line item create/update/remove APIs are stable.
- [ ] Payment session initialization works for current payment providers.
- [ ] Loyalty backend routes and ownership checks behave correctly.
- [ ] `order.placed` subscriber behavior is verified for loyalty earn/redeem paths.
- [ ] Complete-cart loyalty validation blocks insufficient-point redemptions.

## Evidence Required
- API matrix summary (`200/400/401/403/404` cases).
- One successful redeem path + one successful earn path summary.
- Any payment-provider caveats documented.

## Deep-Dive Agent Prompt
```text
Run a Phase 01 finalization pass in backend + API integration.

Use skills:
- building-with-medusa
- building-storefronts

Goal:
Prove commerce-critical backend paths are production-stable (cart, payment session, loyalty workflows/hooks/subscriber).

Scope:
- Cart mutation routes
- Payment session initialization
- Loyalty routes/workflows/hooks/subscriber

Deliverable:
- Route-by-route validation matrix
- Workflow/hook execution evidence
- Exact blockers and likely root cause
```
