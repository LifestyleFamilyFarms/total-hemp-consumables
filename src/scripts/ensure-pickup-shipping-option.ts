import type { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import {
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createShippingProfilesWorkflow,
  createStockLocationsWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
} from "@medusajs/medusa/core-flows"

const PICKUP_OPTION_CODE = "pickup_only_temp"

type SalesChannel = {
  id: string
  name: string
}

type FulfillmentProvider = {
  id: string
}

export default async function ensurePickupShippingOption({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const link = container.resolve(ContainerRegistrationKeys.LINK)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const salesChannelModule = container.resolve(Modules.SALES_CHANNEL)
  const fulfillmentModule = container.resolve(Modules.FULFILLMENT)

  const providers = (await fulfillmentModule.listFulfillmentProviders()) as FulfillmentProvider[]
  const providerIds = providers.map((provider) => provider.id)

  const selectedProviderId =
    providerIds.find((id) => id === "manual_manual") ||
    providerIds.find((id) => id.includes("manual")) ||
    providerIds[0]

  if (!selectedProviderId) {
    throw new Error("No fulfillment providers are available to create pickup option")
  }

  logger.info(
    `[ensure-pickup-shipping-option] Available providers: ${providerIds.join(", ")}. Using: ${selectedProviderId}`
  )

  let allSalesChannels = (await salesChannelModule.listSalesChannels({})) as SalesChannel[]

  if (!allSalesChannels.length) {
    const { result } = await createSalesChannelsWorkflow(container).run({
      input: {
        salesChannelsData: [{ name: "Default Sales Channel" }],
      },
    })
    allSalesChannels = result as SalesChannel[]
  }

  const { data: regions } = await query.graph({
    entity: "region",
    fields: ["id", "name", "currency_code", "countries.*"],
  })

  let usRegion: any =
    regions.find((region: any) =>
      (region?.countries || []).some((country: any) => {
        const value =
          country?.iso_2 || country?.iso2 || country?.country_code || country?.code
        return typeof value === "string" && value.toLowerCase() === "us"
      })
    ) || null

  if (!usRegion) {
    const { result } = await createRegionsWorkflow(container).run({
      input: {
        regions: [
          {
            name: "United States",
            currency_code: "usd",
            countries: ["us"],
            payment_providers: ["pp_system_default"],
          },
        ],
      },
    })
    usRegion = result[0]
  }

  const { data: stockLocations } = await query.graph({
    entity: "stock_location",
    fields: ["id", "name"],
  })

  let stockLocation: any = stockLocations[0]

  if (!stockLocation) {
    const { result: locations } = await createStockLocationsWorkflow(container).run({
      input: {
        locations: [
          {
            name: "US Pickup Test Location",
            address: {
              city: "Columbus",
              country_code: "US",
              address_1: "Local Pickup",
            },
          },
        ],
      },
    })
    stockLocation = locations[0]
  }

  try {
    await link.create({
      [Modules.STOCK_LOCATION]: {
        stock_location_id: stockLocation.id,
      },
      [Modules.FULFILLMENT]: {
        fulfillment_provider_id: selectedProviderId,
      },
    })
  } catch (error) {
    logger.warn(
      `[ensure-pickup-shipping-option] Skipping provider link create: ${
        error instanceof Error ? error.message : "link already exists"
      }`
    )
  }

  const shippingProfiles =
    (await fulfillmentModule.listShippingProfiles({ type: "default" })) || []

  const defaultShippingProfile =
    shippingProfiles[0] ||
    (
      await createShippingProfilesWorkflow(container).run({
        input: {
          data: [{ name: "Default Shipping Profile", type: "default" }],
        },
      })
    ).result[0]

  const allShippingProfiles =
    (await fulfillmentModule.listShippingProfiles({}).catch(() => [])) || [
      defaultShippingProfile,
    ]

  const uniqueSuffix = Date.now()

  const fulfillmentSet = await fulfillmentModule.createFulfillmentSets({
    name: `US Pickup Test Fulfillment Set ${uniqueSuffix}`,
    type: "shipping",
    service_zones: [
      {
        name: `US Pickup ${uniqueSuffix}`,
        geo_zones: [{ country_code: "us", type: "country" }],
      },
    ],
  })

  try {
    await link.create({
      [Modules.STOCK_LOCATION]: {
        stock_location_id: stockLocation.id,
      },
      [Modules.FULFILLMENT]: {
        fulfillment_set_id: fulfillmentSet.id,
      },
    })
  } catch (error) {
    logger.warn(
      `[ensure-pickup-shipping-option] Skipping fulfillment-set link create: ${
        error instanceof Error ? error.message : "link already exists"
      }`
    )
  }

  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: {
      id: stockLocation.id,
      add: allSalesChannels.map((channel) => channel.id),
    },
  })

  const optionInputs: any[] = allShippingProfiles
    .map((profile: { id: string; name?: string | null }) => {
      const code = `${PICKUP_OPTION_CODE}_${profile.id
        .slice(-8)
        .toLowerCase()}_${String(uniqueSuffix).slice(-6)}`

      return {
        name: `Pickup (Testing) - ${profile.name || profile.id}`,
        provider_id: selectedProviderId,
        price_type: "flat" as const,
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: profile.id,
        type: {
          label: "Pickup",
          description: "Temporary pickup option for QA and launch hardening",
          code,
        },
        prices: [
          {
            region_id: usRegion.id,
            amount: 0,
          },
          {
            currency_code: "usd",
            amount: 0,
          },
        ],
        rules: [
          {
            attribute: "enabled_in_store",
            value: "true",
            operator: "eq",
          },
          {
            attribute: "is_return",
            value: "false",
            operator: "eq",
          },
        ],
      }
    })
    .filter(Boolean)

  try {
    await createShippingOptionsWorkflow(container).run({
      input: optionInputs,
    })
  } catch (error) {
    logger.warn(
      `[ensure-pickup-shipping-option] Workflow create failed (${error instanceof Error ? error.message : "unknown"}). Retrying with direct module create.`
    )
    await fulfillmentModule.createShippingOptions(optionInputs as any)
  }

  logger.info(
    `[ensure-pickup-shipping-option] Ensured pickup shipping options for ${optionInputs.length} profile(s) with prefix ${PICKUP_OPTION_CODE}`
  )
}
