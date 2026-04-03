---
paths:
  - "src/**/*.ts"
---

# Rule: Medusa Backend Conventions

## Mutations

- ALL mutations go through workflows (`src/workflows/`). Never mutate in route handlers or subscribers directly.
- Steps must return `StepResponse(data, compensationData)` — always provide rollback.
- Use `transform()` for data manipulation inside workflow bodies — raw JS doesn't work there.

## Modules

- One module per domain. No cross-module imports — use links (`src/links/`) for relationships.
- Services extend `MedusaService({})` for auto-CRUD. Only add custom methods for non-standard logic.
- Data models use DML (`model.define`). Never write raw SQL for schema.
- Register new modules in `medusa-config.ts`.

## API Routes

- Thin handlers only. Validate input, call workflow, return result.
- Auth middleware on admin routes. Publishable API key on store routes.
- Response shapes match Medusa conventions (`{ [entity]: data }`).

## Subscribers

- Must be idempotent — they can fire multiple times for the same event.
- Never mutate directly. Invoke a workflow from the subscriber.

## Migrations

- Run `npx medusa db:generate <module>` after changing data models.
- Run `npx medusa db:migrate` to apply.
- Never edit generated migration files.

## Validation Gates

- `yarn build` must pass before committing.
- `npx medusa db:migrate` after any model change.
- `yarn shipstation:doctor:test` after touching ShipStation module.
- `yarn abandoned:process:dry` after touching abandoned cart flow.
- All scripts in `src/scripts/` must support `--dry-run`.
