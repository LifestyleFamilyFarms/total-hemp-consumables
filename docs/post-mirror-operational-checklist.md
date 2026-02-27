# Post-Mirror Operational Checklist

Use this immediately after `yarn mirror:dev` to reach fast operational parity without rediscovering setup gaps.

## 1) Run parity checks
- [ ] Run catalog mirror:
  - `yarn mirror:dev`
- [ ] Run audit:
  - `yarn mirror:audit`
- [ ] If audit reports diffs, resolve high-signal items first:
  - product category links
  - region/payment provider parity
  - tax region provider IDs
  - product variant price/option mismatches

## 2) Intentionally out of scope for now
- [ ] Inventory mirror is intentionally skipped for this project mode (distributor-managed, effectively infinite stock in Medusa):
  - Do not run `yarn mirror:inventory` unless policy changes.
- [ ] Carts, orders, and customers are intentionally not mirrored.

## 3) Required manual operational checks
- [ ] Confirm DEV tax regions have non-null providers (expected: `tp_system` unless explicitly overridden).
- [ ] Confirm DEV region payment providers match PROD (typically Authorize.Net + system).
- [ ] Confirm stock location + sales-channel links are valid for checkout paths.
- [ ] Confirm shipping profiles used by products exist and map correctly in DEV.
- [ ] Confirm product categories render in storefront category routes.

## 4) ShipStation / distributor TODO (deferred until key is available)
- [ ] Add distributor/ShipStation API credentials to DEV backend env.
- [ ] Sync missing ShipStation service options:
  - `yarn shipstation:sync:test` (or `:prod` as appropriate)
- [ ] Run diagnostics:
  - `yarn shipstation:doctor:test`
  - `yarn shipstation:inspect:test`
- [ ] Execute checkout shipping-rate smoke once keys are active.

## 5) Storefront smoke after parity
- [ ] PLP category filtering returns expected products.
- [ ] PDP variant selection and add-to-cart succeed.
- [ ] Cart drawer updates from server state.
- [ ] Checkout shipping step can enumerate methods (when ShipStation keys are configured).

