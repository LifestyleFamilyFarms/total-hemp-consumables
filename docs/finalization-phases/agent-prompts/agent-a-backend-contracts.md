# Agent A Prompt: Backend Hotfix (Wave 1 Recovery)

```text
You are Agent A on a production-blocking Wave 1 remediation pass.

Repo:
- /Users/franciscraven/Desktop/total-hemp/total-hemp-consumables

Mandatory doc intake first:
1) Ask for any additional markdown docs relevant to:
   - reviews route/query validation
   - wishlist module migrations/runtime schema
   - reorder/first-purchase/workflow orchestration
   - product feed workflow
2) Build a short Doc Map before coding.

Priority objective:
Eliminate backend 500s and restore Wave 1 contract behavior.

Known failing surfaces:
- POST /store/products/:id/reviews (auth path)
- GET/POST/DELETE /store/customers/me/wishlists*
- POST /store/customers/me/orders/:id/reorder
- POST /store/carts/:id/first-purchase-discount
- GET /product-feed

Known runtime evidence:
- TypeError: Cannot read properties of undefined (reading 'id')
  stack through Medusa transaction orchestrator
- TableNotFoundException: relation "wishlist" does not exist

Required work:
1) Reproduce failures locally with curl or script and capture exact failing workflow step(s).
2) Fix orchestrator-triggering undefined-id path(s) in affected workflows/routes.
3) Fix wishlist DB runtime state:
   - confirm module registration
   - confirm migration presence and execution in active DB
   - ensure runtime queries hit existing tables
4) Resolve reviews GET contract mismatch around `order`:
   - preferred: backend accepts/sanitizes optional `order` for reviews list
   - keep behavior deterministic and validated
5) Ensure product feed returns XML successfully for valid inputs.

Constraints:
- Mutations through workflows only.
- Keep route handlers thin.
- Keep auth/ownership enforcement intact.
- No unrelated refactors.

Validation required:
- yarn build
- targeted unit tests
- endpoint contract probes for all routes above
- include request/response samples proving non-500 outcomes

Deliverables format:
1) Files changed
2) Root-cause summary per failure
3) Migration/runtime DB checks executed
4) Commands run + pass/fail
5) Updated API contract table (expected vs observed)
6) Remaining risks/blockers
```
