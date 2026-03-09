# Dispatch Index

Updated: 2026-03-08
Source roster: `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/agent-roster.md`

## Active Queue

| Dispatch ID | Agent Role | Priority | Status | Prompt File | Evidence Target |
|---|---|---|---|---|---|
| `D-SPG-013B1` | SendGrid/Ops Agent | High | Ready | `active/sendgrid-shipstation-webhook-agent.md` | `docs/finalization-phases/evidence/phase-13b1-shipstation-webhook-YYYY-MM-DD.md` |
| `D-SPG-001` | SendGrid/Ops Agent | High | Ready | `active/sendgrid-ops-agent.md` | `docs/finalization-phases/evidence/ops-sendgrid-YYYY-MM-DD.md` |
| `D-PRM-001` | Promotions Agent | High | Ready | `active/promotions-agent.md` | `docs/finalization-phases/evidence/promotions-first-purchase-YYYY-MM-DD.md` |
| `D-CAT-001` | Catalog/Feed Agent | Medium | Ready | `active/catalog-feed-agent.md` | `docs/finalization-phases/evidence/category-images-ops-YYYY-MM-DD.md` |
| `D-SPG-013A` | SendGrid/Ops Agent | High | Ready | `active/sendgrid-order-confirmation-agent.md` | `docs/finalization-phases/evidence/phase-13a-order-confirmation-YYYY-MM-DD.md` |
| `D-SPG-013B` | SendGrid/Ops Agent | High | Ready | `active/sendgrid-shipping-agent.md` | `docs/finalization-phases/evidence/phase-13b-shipping-YYYY-MM-DD.md` |
| `D-SPG-013C` | SendGrid/Ops Agent | High | Ready | `active/sendgrid-refund-cancel-agent.md` | `docs/finalization-phases/evidence/phase-13c-refund-cancel-YYYY-MM-DD.md` |
| `D-QA-013` | QA/Hardening Agent | High | Ready | `active/qa-transactional-email-gate.md` | `docs/finalization-phases/evidence/phase-13-transactional-email-YYYY-MM-DD.md` |

## Status Legend
- `Draft` -> prompt not ready for dispatch.
- `Ready` -> prompt can be sent to agent now.
- `Running` -> agent currently executing.
- `Review` -> response received, awaiting manager/reviewer sign-off.
- `Blocked` -> waiting on dependency.
- `Done` -> accepted and merged/recorded.

## Update Rules
1. Change status immediately when dispatch starts/finishes.
2. Add evidence file links when available.
3. Keep only current prompts in `active/`.
4. Move superseded prompts to `archive/` (optional) or replace in place.
