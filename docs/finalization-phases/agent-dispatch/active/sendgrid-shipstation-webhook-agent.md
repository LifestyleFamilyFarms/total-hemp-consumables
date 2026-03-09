You are the SendGrid/Ops Agent on Phase 13B1: ShipStation webhook integration for shipping notifications.

Repos:
- `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables`
- Optional read-only storefront consult if needed for verification links/state only.

Read first:
- `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/finalization-phases/evidence/phase-13-transactional-email-foundation-2026-03-03.md`
- `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/finalization-phases/agent-dispatch/active/sendgrid-shipping-agent.md`
- `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/finalization-phases/runbooks/sendgrid-shipping-confirmation-template.html`
- `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/finalization-phases/runbooks/sendgrid-shipping-update-template.html`

Mandatory documentation intake first:
1. Ask for any additional markdown docs/tutorial refs for:
   - ShipStation webhook event model
   - webhook auth/signature validation
   - Medusa fulfillment/order status transition expectations
2. Wait for docs or explicit `none`.
3. Build a short Doc Map (source, relevance, decisions) before coding.

Priority objective:
Implement inbound ShipStation webhook handling so real shipping/tracking updates drive deterministic transactional shipping notifications.

Strict scope:
1. Add/extend backend webhook endpoint(s) for inbound ShipStation events.
2. Validate webhook authenticity using the best available mechanism from docs/env (shared secret/signature/token); reject unauthorized requests.
3. Add replay/idempotency guard so repeated webhook deliveries do not create duplicate state transitions or duplicate emails.
4. Map supported webhook payloads to Medusa fulfillment/order updates needed by existing transactional email triggers.
5. Ensure shipping confirmation triggers on first shipped-like transition and shipping update triggers on meaningful tracking/status changes only.
6. Enrich transactional payload fields with real shipping metadata when available:
   - carrier
   - tracking
   - status
   - ETA (if available)
7. Keep safe-failure behavior:
   - missing SendGrid shipping template IDs or provider config must not produce 500s
   - log structured skip reasons
8. Update runbooks with:
   - webhook endpoint setup in ShipStation
   - auth/secret setup
   - event mapping table
   - replay/idempotency behavior
   - operator verification steps

Rules:
- Keep route handlers thin; business logic in workflows/steps.
- No unrelated refactors.
- Do not change abandoned-cart behavior unless a direct regression is found.
- Preserve existing transactional email contracts unless extension is required for shipping metadata.

Validation required:
- `cd /Users/franciscraven/Desktop/total-hemp/total-hemp-consumables && yarn build`
- `cd /Users/franciscraven/Desktop/total-hemp/total-hemp-consumables && yarn test:unit`
- Webhook replay probes:
  - first valid shipping event -> one expected send
  - repeated identical delivery -> no duplicate send
  - meaningful status/tracking change -> shipping update send
  - unauthorized webhook -> rejected
- Evidence captures (request/response samples + logs) proving no notification-path 500s.

Evidence output:
- `/Users/franciscraven/Desktop/total-hemp/total-hemp-consumables/docs/finalization-phases/evidence/phase-13b1-shipstation-webhook-YYYY-MM-DD.md`

Deliverable format:
1. Files changed
2. Commands run + pass/fail
3. Webhook trigger matrix (event -> status transition -> template send/no-send)
4. Auth/idempotency verification results
5. Request/response and log evidence paths
6. Findings by severity with file:line refs
7. Risks/blockers
8. Doc Map
