# Manual Store Configuration (Medusa Admin)

Catalog seeding is temporarily **manual**—use the Admin UI to create products, prices, and inventory. The checklist below captures all configuration that must exist after any `db:reset:dev` or when standing up a new environment.

---

## Quick Checklist
- [ ] Store defaults set to USD and linked to the storefront sales channel
- [ ] Primary sales channel created (`DTC Web Store` recommended) and ID captured
- [ ] US region enabled with Authorize.Net + tax rate
- [ ] Authorize.Net sandbox credentials verified
- [ ] ShipStation-connected stock location with complete address + phone
- [ ] ShipStation shipping option (USPS Ground Advantage) visible in store
- [ ] Sales channel linked to stock location
- [ ] `.env` files updated (`SEED_LOCATION_ID`, gateway creds, etc.) — storefront now auto-discovers the default sales channel from the Admin API.
- [ ] Smoke test checkout (address → shipping quote → payment frame loads)

---

## 1. Store Defaults
1. Log into Medusa Admin.
2. Navigate to **Settings → Store**.
3. Set:
   - **Default currency**: `USD`
   - **Supported currencies**: ensure `USD` is listed
   - **Default Sales Channel**: leave unset until the sales channel is created (step 2), then return and select it.
4. Save.

## 2. Sales Channel
1. Go to **Sales Channels** → **Create**.
2. Recommended values:
   - **Name**: `DTC Web Store`
   - **Description**: `Public storefront channel`
3. Save, then record the generated ID (example: `sc_01K90994T2KA90YV245Z3NWV1S`).
4. Return to **Settings → Store** and set **Default Sales Channel** to this channel.
5. Update envs:
   - Backend `.env`: ensure `MEDUSA_DEV_PUBLISHABLE_KEY` points at this channel.
   - Storefront automatically picks up the store’s default sales channel via the Store API (no env var required).

## 3. Region & Taxes
1. Open **Settings → Regions**.
2. If a US region does not exist, create one with:
   - **Name**: `United States`
   - **Currency**: `USD`
   - **Countries**: add `US`
   - **Payment Providers**: enable `Authorizenet` and `System`
3. Inside the region, add a standard tax rate (e.g., **Name**: `Standard`, **Rate**: `0` until state-level taxes are modeled).
4. If ShipStation requires phone or address metadata, add it under the region’s **Fulfillment** tab.

## 4. Payment Provider (Authorize.Net)
1. Still inside the US region, confirm the Authorize.Net provider shows as **Enabled**.
2. Go to **Settings → Payment Providers** to verify credentials resolve.
3. Back-end `.env` must expose:
   - `AUTHORIZE_NET_API_LOGIN_ID`
   - `AUTHORIZE_NET_TRANSACTION_KEY`
4. Storefront `.env` must expose:
   - `NEXT_PUBLIC_CLIENT_KEY`
   - `NEXT_PUBLIC_API_LOGIN_ID`
   - `NEXT_PUBLIC_AUTHNET_ENV=sandbox` (or `production` when ready)

## 5. Stock Location
1. Navigate to **Inventory → Stock Locations**.
2. Create or edit the primary warehouse (example name: `US Warehouse`).
3. Provide the complete ShipStation-ready address:
   - **Address 1**: `3553 Trabue Rd`
   - **City**: `Columbus`
   - **State / Province**: `OH`
   - **Postal Code**: `43204`
   - **Country**: `US`
   - **Phone**: `+1 614-555-0199` (update with the real support line before launch)
4. Save and note the stock location ID (example: `sloc_01K90994N7WV7CXQKHQ4VABFZA`) for future scripting needs.

## 6. Fulfillment & Shipping (ShipStation)
1. Open **Fulfillment → Providers** and confirm `ShipStation` is connected.
2. In **Fulfillment → Shipping Profiles**, ensure the default profile exists; create one if missing.
3. Under **Fulfillment → Shipping Options**:
   - Create a ShipStation option for USPS Ground Advantage (or the services you plan to expose).
   - Assign the stock location and the US service zone.
   - Toggle **Visible in store** so the Store API returns it.
4. If no ShipStation services appear, re-check `SHIPSTATION_API_KEY` / `SHIPSTATION_API_SECRET` in the backend `.env` and retry.

## 7. Link Sales Channel ↔ Stock Location
1. Return to **Sales Channels** and open `DTC Web Store`.
2. Add the warehouse from step 5 under **Stock Locations** and save.
3. Verify in **Inventory → Stock Locations** that the channel link displays in the right-hand panel.

## 8. Environment Variables Recap
- Backend `.env`:
  - `MEDUSA_BACKEND_URL`
  - `ADMIN_CORS`, `AUTH_CORS`, `STORE_CORS`
  - `SHIPSTATION_API_KEY`, `SHIPSTATION_API_SECRET`
  - `AUTHORIZE_NET_API_LOGIN_ID`, `AUTHORIZE_NET_TRANSACTION_KEY`
  - `SEED_LOCATION_ID=<stock_location_id>`
- Storefront `.env`:
  - `MEDUSA_BACKEND_URL`
  - `NEXT_PUBLIC_DEFAULT_REGION=us`
  - `NEXT_PUBLIC_CLIENT_KEY`, `NEXT_PUBLIC_API_LOGIN_ID`, `NEXT_PUBLIC_AUTHNET_ENV`

## 9. Final Verification
1. Restart backend (`yarn dev`) and storefront (`yarn dev`).
2. Visit `/us/checkout` in the storefront:
   - Product list renders without region errors.
   - Enter a valid US shipping address and click **Calculate shipping** → ShipStation rate returns.
   - Payment section shows the Authorize.Net Accept.js iframe.
3. Populate or verify catalog data manually (products, pricing, inventory), then add an item to cart and confirm the checkout flow proceeds through review.
4. Capture the generated IDs (sales channel, stock location, shipping option) in `docs/task-002-checkout-pipeline-qa.md` when documenting QA runs.

---

Need an automated bootstrap? Use `ALLOW_CONFIG_SEED=true medusa exec ./src/scripts/seed-config.ts`, or run `yarn rebuild:dev:config` after a reset. This will seed baseline store config (sales channel, region, tax region, stock location, and ShipStation options) before catalog mirroring.
