// @ts-nocheck
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import type { ExecArgs } from "@medusajs/framework/types"

export default async function cleanupManualShippingOptions({
  container,
}: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const link = container.resolve(ContainerRegistrationKeys.LINK)
  const fulfillmentModule = container.resolve(Modules.FULFILLMENT)

  logger.info("[cleanup-manual-shipping-options] Starting cleanup...")

  const manualOptions = await fulfillmentModule
    .listShippingOptions({
      provider_id: ["manual_manual"],
    })
    .catch(() => [])

  if (manualOptions?.length) {
    await fulfillmentModule.deleteShippingOptions(
      manualOptions.map((option) => option.id)
    )
    logger.info(
      `[cleanup-manual-shipping-options] Removed ${manualOptions.length} manual shipping option(s)`
    )
  } else {
    logger.info(
      "[cleanup-manual-shipping-options] No manual shipping options found"
    )
  }

  const manualProviderLinks = await link
    .list({
      [Modules.FULFILLMENT]: { fulfillment_provider_id: "manual_manual" },
    })
    .catch(() => [])

  if (manualProviderLinks?.length) {
    const manualLinkIds = manualProviderLinks
      .map((entry: any) => entry.id)
      .filter(Boolean)

    if (manualLinkIds.length) {
      await link.softDelete(manualLinkIds.map((id: string) => ({ id })))
    }
    logger.info(
      `[cleanup-manual-shipping-options] Removed ${manualProviderLinks.length} manual provider link(s)`
    )
  } else {
    logger.info(
      "[cleanup-manual-shipping-options] No manual provider links found"
    )
  }

  logger.info("[cleanup-manual-shipping-options] Cleanup complete.")
}
