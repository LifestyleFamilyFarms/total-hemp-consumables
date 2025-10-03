/*
  Fresh store bootstrap (US‑centric) using Medusa v2 core flows.

  What this does (idempotent):
  - Ensures a default Sales Channel and sets it on the Store
  - Configures Store currencies (USD default)
  - Creates a US Region (USD), tax region, stock location, fulfillment set + shipping options

  What this does NOT do:
  - Create catalog (types/categories/products). Use:
      yarn seed:dev   (non‑blocking variants for dev)
      yarn seed:prod  (for prod via Admin API)

  Run (dev server must be running this code):
    yarn medusa exec ./src/scripts/seed-fresh.ts
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

export default async function seedFresh({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const link = container.resolve(ContainerRegistrationKeys.LINK)
  const fulfillmentModule = container.resolve(Modules.FULFILLMENT)
  const salesChannelModule = container.resolve(Modules.SALES_CHANNEL)
  const storeModule = container.resolve(Modules.STORE)

  logger.info("[seed-fresh] Bootstrapping US store …")

  // 1) Sales channel
  let [store] = await storeModule.listStores()
  let defaultChannel = (await salesChannelModule.listSalesChannels({ name: "Default Sales Channel" }))[0]
  if (!defaultChannel) {
    const { result } = await createSalesChannelsWorkflow(container).run({
      input: { salesChannelsData: [{ name: "Default Sales Channel" }] },
    })
    defaultChannel = result[0]
  }

  // 2) Store currencies + default sales channel
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
  logger.info("[seed-fresh] Store updated with USD + default channel")

  // 3) Region (US)
  const { result: regions } = await createRegionsWorkflow(container).run({
    input: {
      regions: [
        {
          name: "United States",
          currency_code: "usd",
          countries: ["us"],
          // Providers configured in medusa-config.ts; list identifiers here
          payment_providers: [
            "pp_authorizenet_authorizenet",
            "pp_system_default",
          ],
        },
      ],
    },
  })
  const usRegion = regions[0]
  logger.info(`[seed-fresh] Region created: ${usRegion?.name}`)

  // 4) Tax region for US
  await createTaxRegionsWorkflow(container).run({ input: [{ country_code: "us" }] })
  logger.info("[seed-fresh] Tax region created for US")

  // 5) Stock location (US Warehouse)
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
  logger.info(`[seed-fresh] Stock location: ${stockLocation?.name}`)

  // Link stock location to the fulfillment provider(s) that will serve this location
  await link.create({
    [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
    [Modules.FULFILLMENT]: { fulfillment_provider_id: "manual_manual" },
  })
  logger.info("[seed-fresh] Linked stock location to provider: manual_manual")

  // 6) Shipping profile
  const existingProfiles = await fulfillmentModule.listShippingProfiles({ type: "default" })
  const shippingProfile = existingProfiles[0]
    ? existingProfiles[0]
    : (await createShippingProfilesWorkflow(container).run({ input: { data: [{ name: "Default Shipping Profile", type: "default" }] } })).result[0]

  // 7) Fulfillment set & service zone (US)
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

  // Link stock location to fulfillment set (so options can be served from this location)
  await link.create({
    [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
    [Modules.FULFILLMENT]: { fulfillment_set_id: fulfillmentSet.id },
  })

  // Link stock location to default sales channel
  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: {
      id: stockLocation.id,
      add: [defaultChannel.id],
    },
  })

  // 8) Shipping options (USD flat rates)
  await createShippingOptionsWorkflow(container).run({
    input: [
      {
        name: "Ground",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: { label: "Ground", description: "3–5 business days", code: "ground" },
        prices: [{ currency_code: "usd", amount: 999 }],
        rules: [
          { attribute: "enabled_in_store", value: "true", operator: "eq" },
          { attribute: "is_return", value: "false", operator: "eq" },
        ],
      },
      {
        name: "Express",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: { label: "Express", description: "1–2 business days", code: "express" },
        prices: [{ currency_code: "usd", amount: 1999 }],
        rules: [
          { attribute: "enabled_in_store", value: "true", operator: "eq" },
          { attribute: "is_return", value: "false", operator: "eq" },
        ],
      },
    ],
  })

  logger.info("[seed-fresh] US store bootstrap complete.")
}
