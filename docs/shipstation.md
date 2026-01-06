# ShipStation Integration Notes

## Credentials
- `SHIPSTATION_API_KEY` must always be present.
- `SHIPSTATION_API_SECRET` is optional for sandbox tokens. When the secret becomes available, add it to `.env` so all requests use explicit key + secret authentication.

## Seeding & Provisioning
- `src/scripts/seed-fresh.ts` dynamically inspects ShipStation using `retrieveFulfillmentOptions` and creates Medusa shipping options for each carrier/service pair returned.
- `src/scripts/create-missing-shipstation-options.ts` can be executed at any time (`DISABLE_MEDUSA_ADMIN=true yarn medusa exec ./src/scripts/create-missing-shipstation-options.ts`) to backfill any new ShipStation services without touching seed data.
- When we’re ready for production, we’ll add a configuration allowlist so operations can restrict which ShipStation services surface in checkout without modifying the script.
- For now, manual shipping options are removed via `src/scripts/cleanup-manual-shipping-options.ts` and all freight flows through ShipStation.

## Operational Checklist
1. Verify the ShipStation account is “Verified” in their dashboard so API keys are accessible.
2. Populate `.env` with `SHIPSTATION_API_KEY` (and `SHIPSTATION_API_SECRET` once issued).
3. Run the cleanup script to remove any `manual_manual` legacy options:  
   `yarn medusa exec ./src/scripts/cleanup-manual-shipping-options.ts`
4. Restart the backend (`yarn dev`) so new shipping providers and options load.
5. After the account is ready for production seeding, re-run `yarn medusa exec ./src/scripts/seed-fresh.ts`.
6. Confirm checkout shows ShipStation USPS Ground Advantage (and any other enabled services).  
   If the checkout still shows legacy manual options, ensure the cleanup script ran successfully and repeat the checkout flow.

## Upcoming Work
- Introduce an allowlist (env-driven) to limit which ShipStation services are exposed.
- Fold ShipStation setup into the consolidated production seed workflow alongside catalog mirroring.

## Cookie Warnings During Checkout
The browser may report that ShipStation/Authorize.Net cookies such as `__cfruid` or `_cfuvid` are “foreign” without the `Partitioned` attribute. These cookies are issued by Cloudflare on behalf of Authorize.Net. They aren’t critical for the sandbox flow, but monitor browser updates; if they become blocked in production, coordinate with Authorize.Net support.
