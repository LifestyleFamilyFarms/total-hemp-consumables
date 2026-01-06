# Total Hemp Consumables — Project Status (LLM‑Friendly)

This document is intended for both humans and LLM tools. It summarizes the stack, recent work, how to run things, and the next tasks. Keep content concise, explicit, and copy‑paste friendly.

## A) Project Overview
- Repos
  - Backend: `total-hemp-consumables` (Medusa v2, Node 20+)
  - Storefront: `total-hemp-consumables-storefront` (Next.js 15, React 19 RC)
- Core stack
  - Medusa v2 + Modules: Redis (cache/event/workflow/locking), S3 file provider, SendGrid notifications, custom ShipStation fulfillment, Authorize.Net payments
  - Storefront: App Router, Tailwind/Radix UI, Medusa JS SDK
- Environments
  - Prod backend: Railway (`MEDUSA_PROD_BACKEND_URL=https://total-hemp-consumables.up.railway.app`)
  - Dev backend: Local (`MEDUSA_DEV_BACKEND_URL=http://localhost:9000`)
- CORS (backend `.env`)
  - `ADMIN_CORS`, `AUTH_CORS`, `STORE_CORS` must include exact origins (scheme + host + port)
- Aliases
  - Storefront uses `@lib/...` (not `@/lib/...`)

## B) Work Accomplished Recently
- Navigation/UX
  - Sidebar refactor to off‑canvas overlay; Topbar fixed; icon rail with burger + tooltips; bottom account icon
  - Removed submenus in sidebar for clarity; added Home/Store back to the expanded sidebar nav
  - Footer created (`components/layout/footer.tsx`); integrated in app layouts (not in shell)
  - Gamma Gummies copy scrubbed (no “micro‑dosed” / mushrooms), permit link opens inline and in new tab
- Storefront product UX
  - PLP shows smart subtitles by type (Flower/Edibles/Beverages)
  - PDP option labels normalized (weights → “1/8 oz”, dose mg + pack, beverage serving mg)
  - PDP disables option values that can’t form a valid in‑stock variant given current selections
- Backend seeds & parity
  - Remote seed (`src/scripts/seed-remote.ts`) for Admin API; idempotent upserts; supports delineated envs
    - `yarn seed:prod` (prod), `yarn seed:dev` (dev with non-blocking inventory)
  - Mirror Prod → Dev (`src/scripts/mirror-prod-to-dev.ts`) via Admin API (types/categories/products/variants/prices/metadata/images)
    - `yarn mirror:dev`
  - Inventory mirror hardened (`src/scripts/mirror-inventory.ts`)
    - `INVENTORY_DRY_RUN=1 yarn mirror:inventory` compares PROD vs DEV without writes and prints per-SKU diffs
    - Script fails fast if stock locations, SKUs, or pagination metadata are missing/misconfigured
  - Dev DB reset script (drop/recreate + migrate): `yarn db:reset:dev`
- Infra correctness
  - ShipStation: package weight converts grams → kilograms for rate calc
  - CSP (Report‑Only) relaxed to allow Authorize.Net + minimal inline during development
  - CORS documentation and fixes (ADMIN_CORS/AUTH_CORS/STORE_CORS)

## C) Work To Do (Prioritized)
1) Inventory parity
   - Seed inventory items + levels in dev (stock location) so manage_inventory=true behaves like prod
2) PDP polish
   - Show “facts” row: Flower weight label; Edibles total mg; Beverages serving + can size
3) Filters & search
   - PLP refinements for Dose ranges, Pack Size, Serving mg (client‑side first, then backend filters)
4) CSP hardening (prod)
   - Replace 'unsafe-inline' with nonce‑based script CSP; wire nonce into app and Accept.js init
5) Analytics
   - Add nav/PDP/checkout interaction hooks; PostHog integration (backend + frontend)
6) Mirror improvements
   - Optional: region‑specific price mapping; partial mirror (by collection/category)
7) QA & docs
   - Add smoke tests for PLP/PDP; document seed/mirror flows for teammates

---

## How To Run (Commands)
- Backend (dev)
  - `cd total-hemp-consumables`
  - `.env` must define DB + CORS; start server: `yarn dev`
- Storefront (dev)
  - `cd total-hemp-consumables-storefront`
  - `yarn dev` (http://localhost:8000)
- Seed & Mirror
  - Seed prod: `cd total-hemp-consumables && yarn seed:prod`
  - Seed dev (non‑blocking inventory): `cd total-hemp-consumables && yarn seed:dev`
- Reset dev DB: `cd total-hemp-consumables && yarn db:reset:dev`
- Mirror prod → dev: `cd total-hemp-consumables && yarn mirror:dev`

Tip: After `db:reset:dev`, regenerate a local Admin API token and update `MEDUSA_DEV_ADMIN_TOKEN` before mirroring to DEV.

## Required Env (Backend)
- CORS
  - `ADMIN_CORS=http://localhost:5173,http://localhost:9000`
  - `AUTH_CORS=http://localhost:5173,http://localhost:9000`
  - `STORE_CORS=http://localhost:8000`
- Secrets: `JWT_SECRET`, `COOKIE_SECRET`
- Remote seeding/mirroring
  - Prod: `MEDUSA_PROD_BACKEND_URL`, `MEDUSA_PROD_ADMIN_TOKEN`
  - Dev: `MEDUSA_DEV_BACKEND_URL`, `MEDUSA_DEV_ADMIN_TOKEN`

## Product Data Model (Frontend‑Aware)
- Types: `flower`, `edibles`, `beverages`
- Categories: Flower, Edibles, Beverages (used for /store/*)
- Variants
  - Flower: Option `Weight` values as grams (350,700,1400,2800); metadata `{ weight_g, weight_label }`; variant.weight in grams
  - Edibles: Options `Dose (mg)` × `Pack Size`; metadata `{ dose_mg, pack_count, total_mg }`
  - Beverages: Option `Serving (mg)`; metadata `{ serving_mg, volume_oz: 12 }`
- Pricing: variant‑level prices; region/currency as needed
- Inventory: Medusa v2 inventory is decoupled; seed levels via Admin Inventory API or allow_backorder in dev

## LLM Tips & Constraints
- Use `@lib/...` for storefront imports (not `@/lib`)
- Filepaths are relative to repo root unless noted
- When editing CORS, include exact origins with port; restart backend
- For ShipStation, keep variant.weight in grams; convert to kilograms when sending to API
- When patching, prefer idempotent, minimal diffs; avoid changing unrelated code

## Troubleshooting
- CORS 204 without `Access-Control-Allow-Origin` → update `ADMIN_CORS`/`AUTH_CORS`/`STORE_CORS`
- CSP warnings with Authorize.Net → use Report-Only; plan nonce migration
- 401 on mirror/seed → use Admin API token (not publishable key)
- 400 on seed (variants) → ensure `options.values`, `variants.title`, `variants.options` (object), and categories payload

## Maintenance Mode
- Set `MAINTENANCE_MODE=1` in `total-hemp-consumables-storefront/.env` to route all traffic to `/maintenance`.
- Optional allowlist via `ALLOWED_PATHS="/maintenance,/health"`; default ensures the maintenance page remains accessible.

## Latest Review
- See `docs/code-review-2025-10-03.md` for the current backend readiness report, critical findings, and priority actions leading to this week’s MVP launch.
- See `docs/roadmap-2025-10-mvp.md` for the prioritized roadmap and critical path to hit the MVP deadline.
