/*
  Seed storefront data only (products, pricing, inventory).

  This script has been intentionally disabled while we redesign the catalog seeding workflow.
  Leave it in place for future reference, but do not run it—populate data via the Admin UI instead.
*/

import type { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export default async function seedFresh({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

  logger.error(
    "[seed-fresh] Disabled. Catalog seeding is manual until the new strategy is defined."
  )
  logger.error("[seed-fresh] Use the Medusa Admin UI to create products/pricing/inventory.")
  throw new Error("seed-fresh script disabled pending future implementation.")
}
