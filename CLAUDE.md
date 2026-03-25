# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Medusa.js v2.13.0 headless ecommerce backend for Total Hemp Consumables. TypeScript, PostgreSQL, optional Redis for caching/events/workflows. The storefront is a separate Next.js repo at `../total-hemp-consumables-storefront`.

## Commands

**Development:**
- `yarn dev` — Start Medusa dev server
- `yarn build` — Build backend (outputs to `.medusa/server`)
- `yarn start` — Production start

**Testing:**
- `yarn test:unit` — Unit tests (Jest + SWC); pattern: `src/**/__tests__/**/*.unit.spec.ts`
- `yarn test:integration:http` — HTTP endpoint tests; pattern: `integration-tests/http/*.spec.ts`
- `yarn test:integration:modules` — Module tests; pattern: `src/modules/*/__tests__/**/*.ts`
- Single test: `yarn test:unit -- --testPathPattern="<pattern>"`
- All tests run with `--runInBand` (sequential) and `--forceExit`

**Database:**
- `npx medusa db:generate <module-name>` — Generate migration for a module
- `npx medusa db:migrate` — Run pending migrations
- `yarn db:reset:dev` — Reset dev database
- `yarn rebuild:dev` — Full dev reset + admin setup

**Operational scripts** (in `src/scripts/`):
- `yarn seed` / `yarn seed:tsv` (dry-run) / `yarn seed:tsv:apply`
- `yarn mirror:dev` / `yarn mirror:inventory` / `yarn mirror:master`
- `yarn media:sync:dev|prod` / `yarn media:s3:gc`
- `yarn shipstation:doctor:test|prod` / `yarn shipstation:sync:test|prod`
- `yarn abandoned:process:dry` (dry-run) / `yarn abandoned:process`

## Architecture

### Path Ownership & Rules

| Layer | Path | Rule |
|---|---|---|
| API routes | `src/api/**` | Thin handlers only; GET/POST/DELETE. Auth/validation in middleware. |
| Business logic | `src/workflows/**` | **All mutations must be workflows.** Never mutate in route handlers. |
| Domain models | `src/modules/**` | Strict module isolation; no cross-module coupling. |
| Event handling | `src/subscribers/**`, `src/jobs/**` | Must be idempotent (replayed on failure). Subscribers trigger workflows. |
| Ops scripts | `src/scripts/**` | Must support dry-run paths. |
| Links | `src/links/**` | Cross-module data relationships. |
| Admin UI | `src/admin/**` | React components extending Medusa Admin dashboard. |

### Custom Modules

Each module lives in `src/modules/<name>/` with `models/`, `service.ts`, `migrations/`, and `index.ts`:
- **sales-stores** — Sales territory management
- **sales-people** — Sales rep management + assignments
- **product-review** — Product reviews
- **wishlist** — Customer wishlists
- **loyalty** — Points system (earning + redemption)
- **shipstation** — Fulfillment provider integration

### Key Patterns

- **Workflow-first**: All business logic mutations go through `src/workflows/`. Route handlers and subscribers are thin orchestration layers.
- **Idempotent subscribers**: Event handlers in `src/subscribers/` must handle replays safely. They invoke workflows for actual mutations.
- **Services extend `MedusaService`**: Auto-generated CRUD for module models. Custom queries added as methods.
- **Deterministic fallback**: Missing optional provider/template config must never cause 500 errors.
- **Static imports only**: No dynamic imports in route execution paths.
- **Middleware-level auth**: Auth and ownership enforcement happens in middleware, not ad hoc in routes.

### Integrations

- **Authorize.net** — Payment processing (sandbox/prod based on NODE_ENV)
- **SendGrid** — Transactional emails (order confirmation, abandoned cart recovery)
- **ShipStation** — Fulfillment (test/prod environments with separate credentials)
- **AWS S3** — File/media storage
- **Google Maps** — Sales trip planner (admin UI)
- **Sanity CMS** — Content management (read-only)
- **OpenTelemetry** — Optional tracing

## Validation Gates

Run before merging substantial changes:
1. `yarn build` + `yarn test:unit`
2. `npx medusa db:generate <module>` + `npx medusa db:migrate` when touching module models
3. `yarn abandoned:process:dry` when touching abandoned-cart path
4. `yarn shipstation:doctor:test` when touching ShipStation integration

## TypeScript Configuration

- Target: ES2021, Module: Node16, `strictNullChecks: true`
- Decorators enabled (Medusa services)
- JSX: react-jsx (for admin components)
- Schema validation: Zod

## Package Manager

Yarn v4.9.1. Uses `patch-package` for dependency patches (see `patches/`).

## Documentation

- **Execution contract**: `AGENTS.md` — Hard rules, path ownership, handoff protocol
- **Command center**: `docs/finalization-phases/` — Release orchestration & evidence
- **Backlog**: `docs/to-do-prod.md` — Production task tracker
- **Shared memory**: `MEMORY.md` — Cross-session project context
- **Wave 1 docs**: `docs/wave-1-docs/` — Feature implementation references
- **JS SDK docs**: `docs/js-sdk/` — Admin SDK reference
