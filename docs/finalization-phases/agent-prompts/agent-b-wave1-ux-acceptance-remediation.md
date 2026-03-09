# Agent B Prompt: Wave 1 UX Acceptance Remediation

```text
You are Agent B on a focused Wave 1 storefront acceptance remediation pass.

Repo:
- /Users/franciscraven/Desktop/total-hemp/total-hemp-consumables-storefront

Read first:
- /Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/finalization-phases/evidence/phase-wave1-2026-03-02-post-hotfix.md
- /Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/finalization-phases/agent-prompts/agent-b-storefront-conversion.md

Mandatory doc intake first:
1) Ask for any additional markdown docs/tutorial references for:
   - reorder UI acceptance
   - first-purchase discount UI acceptance
   - reviews/wishlist runtime state evidence
2) Build a short Doc Map before coding.

Scope (strict)
A) Reorder UI acceptance closure:
- Ensure the order-details reorder action reliably renders post-click result sections:
  - added_items
  - unavailable_items
  - suggested_variants
- Ensure explicit "no auto-substitution" messaging is visible.
- Ensure cart handoff CTA appears when `cart_id` is returned.
- Ensure error state is visible when reorder fails.

B) First-purchase discount UI acceptance closure:
- Ensure cart/checkout discount surface renders consistently in runtime where expected.
- Ensure guest state shows auth guidance and no invalid action path.
- Ensure signed-in state surfaces deterministic status from backend (`applied`, `reason`, `promotion_code`).
- Ensure disabled-feature reason is visible and does not look like a broken state.

C) Evidence-gap closure (no broad refactor):
- Reviews:
  - verify pending moderation confirmation UI after successful submit
  - verify visible error state path
- Wishlist:
  - verify authenticated add/remove + canonical refetch evidence in runtime

Rules:
- Keep Medusa calls in `src/lib/data/*`.
- Use `sdk.client.fetch` for custom routes.
- No category/feed lane changes.
- No unrelated UI redesign or architecture changes.

Validation required:
- yarn lint
- yarn build
- targeted runtime proof (screens/logs) for each required state above

Deliverable format:
1) Files changed
2) UI acceptance matrix (expected vs observed)
3) Commands run + pass/fail
4) Runtime evidence paths (screenshots/logs/json captures)
5) Remaining gaps/risks
6) Doc Map
```
