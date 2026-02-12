// @ts-nocheck
/*
  One-off configuration bootstrap.

  WARNING: This script performs idempotent configuration setup for new environments
  (sales channel, region, stock location, ShipStation options, etc.).
  It assumes an empty or partially configured Medusa instance.

  Do NOT run this script as part of the daily developer workflow.
*/

import {
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createStockLocationsWorkflow,
  createShippingProfilesWorkflow,
  createShippingOptionsWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
  updateStoresWorkflow,
} from "@medusajs/medusa/core-flows"

import {
  ContainerRegistrationKeys,
  Modules,
} from "@medusajs/framework/utils"

import type { ExecArgs } from "@medusajs/framework/types"
import { resolveShipstationEnv } from "../utils/shipstation-env"

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")

const buildShipStationCode = (carrierId: string, serviceCode: string) =>
  `shipstation_${slugify(carrierId || "carrier")}_${slugify(
    serviceCode || "service"
  )}`

export default async function seedConfig({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const link = container.resolve(ContainerRegistrationKeys.LINK)
  const fulfillmentModule = container.resolve(Modules.FULFILLMENT)
  const salesChannelModule = container.resolve(Modules.SALES_CHANNEL)
  const storeModule = container.resolve(Modules.STORE)

  const allowConfigSeed =
    (process.env.ALLOW_CONFIG_SEED || "").toLowerCase() === "true"

  if (!allowConfigSeed) {
    logger.error(
      "[seed-config] Blocked. This script performs manual-only bootstrap. Set ALLOW_CONFIG_SEED=true if you intend to run it."
    )
    logger.error(
      "[seed-config] Review docs/admin-store-setup.md for the preferred step-by-step admin checklist."
    )
    throw new Error(
      "seed-config aborted: require ALLOW_CONFIG_SEED=true to proceed."
    )
  }

  logger.info("[seed-config] Running manual configuration bootstrap …")

  let [store] = await storeModule.listStores()
  let defaultChannel = (
    await salesChannelModule.listSalesChannels({ name: "Default Sales Channel" })
  )[0]

  if (!defaultChannel) {
    const { result } = await createSalesChannelsWorkflow(container).run({
      input: { salesChannelsData: [{ name: "Default Sales Channel" }] },
    })
    defaultChannel = result[0]
    logger.info("[seed-config] Created Default Sales Channel")
  }

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        supported_currencies: [{ currency_code: "usd", is_default: true }],
        default_sales_channel_id: defaultChannel.id,
      },
    },
  })
  ;[store] = await storeModule.listStores()
  logger.info("[seed-config] Store updated with USD + default sales channel")

  const { result: regions } = await createRegionsWorkflow(container).run({
    input: {
      regions: [
        {
          name: "United States",
          currency_code: "usd",
          countries: ["us"],
          payment_providers: [
            "pp_authorizenet_authorizenet",
            "pp_system_default",
          ],
        },
      ],
    },
  })
  const usRegion = regions?.[0]
  logger.info(`[seed-config] Region ensured: ${usRegion?.id}`)

  await createTaxRegionsWorkflow(container).run({ input: [{ country_code: "us" }] })
  logger.info("[seed-config] Tax region ensured for US")

  const { result: locations } = await createStockLocationsWorkflow(container).run({
    input: {
      locations: [
        {
          name: "US Warehouse",
          address: { city: "Columbus", country_code: "US", address_1: "" },
        },
      ],
    },
  })
  const stockLocation = locations[0]
  logger.info(`[seed-config] Stock location ensured: ${stockLocation?.id}`)

  const shipstationKey = resolveShipstationEnv(process.env.NODE_ENV).apiKey
  if (!shipstationKey) {
    logger.warn(
      "[seed-config] ShipStation API key missing (SHIPSTATION_API_KEY or SHIPSTATION_API_KEY_{PRODUCTION|TEST}) – ShipStation options will not be created."
    )
    return
  }

  const existingProfiles = await fulfillmentModule.listShippingProfiles({ type: "default" })
  const shippingProfile =
    existingProfiles[0] ||
    (
      await createShippingProfilesWorkflow(container).run({
        input: {
          data: [{ name: "Default Shipping Profile", type: "default" }],
        },
      })
    ).result[0]

  const fulfillmentSet = await fulfillmentModule.createFulfillmentSets({
    name: "US Delivery",
    type: "shipping",
    service_zones: [
      {
        name: "US",
        geo_zones: [{ country_code: "us", type: "country" }],
      },
    ],
  })

  await link.create({
    [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
    [Modules.FULFILLMENT]: { fulfillment_set_id: fulfillmentSet.id },
  })

  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: {
      id: stockLocation.id,
      add: [defaultChannel.id],
    },
  })

  const shipstationOptions =
    (await fulfillmentModule
      .listShippingOptions({ provider_id: ["shipstation_shipstation"] })
      .catch(() => [])) || []
  const existingCodes = new Set(
    shipstationOptions
      .map((option) => option.type?.code)
      .filter(Boolean) as string[]
  )

  const shipstationFulfillmentOptions =
    (await fulfillmentModule
      .retrieveFulfillmentOptions("shipstation_shipstation")
      .catch(() => [])) || []

  const uniqueServices = new Map(
    shipstationFulfillmentOptions
      .map((option: any) => {
        const carrierId = option?.carrier_id
        const serviceCode = option?.carrier_service_code || option?.service_code || option?.id
        if (!carrierId || !serviceCode) {
          return null
        }
        const code = buildShipStationCode(carrierId, serviceCode)
        return [code, { option, code }]
      })
      .filter(Boolean) as Array<[string, { option: any; code: string }]>
  )

  for (const { option, code } of uniqueServices.values()) {
    if (existingCodes.has(code)) {
      continue
    }

    await createShippingOptionsWorkflow(container).run({
      input: [
        {
          name: option.name || option.carrier_service_code,
          provider_id: "shipstation_shipstation",
          price_type: "calculated",
          service_zone_id: fulfillmentSet.service_zones[0].id,
          shipping_profile_id: shippingProfile.id,
          type: {
            label: option.name || option.carrier_service_code,
            description: option.description || option.name,
            code,
          },
          data: {
            carrier_id: option.carrier_id,
            carrier_service_code: option.carrier_service_code,
          },
          prices: [],
        },
      ],
    })

    logger.info(`[seed-config] Created ShipStation option ${code}`)
  }

  logger.info("[seed-config] Configuration bootstrap completed.")
}
