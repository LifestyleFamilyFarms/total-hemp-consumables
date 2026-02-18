/*
  Mirror store configuration + catalog from PROD → DEV via Admin API.

  Env required:
  - MEDUSA_PROD_BACKEND_URL, MEDUSA_PROD_ADMIN_TOKEN
  - MEDUSA_DEV_BACKEND_URL,  MEDUSA_DEV_ADMIN_TOKEN

  Optional:
  - CHANNEL_ALLOWLIST: comma-separated sales-channel names for product channel attachment.
  - CHANNEL_CREATE_MISSING: default "1". Set "0" to fail when a required channel doesn't exist in DEV.
  - CHANNEL_ENFORCE_MIRROR: default "1". Set "0" to avoid pruning extra product channel links.
  - MIRROR_STRICT: default "1". Set "0" to skip pruning extra DEV entities.

  Run:
    yarn ts-node src/scripts/mirror-prod-to-dev.ts
*/

import Medusa from "@medusajs/js-sdk"
import { loadEnv } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

function req(name: string) {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env: ${name}`)
  return v
}

const PROD_URL = req("MEDUSA_PROD_BACKEND_URL").replace(/\/+$/, "")
const PROD_TOKEN = req("MEDUSA_PROD_ADMIN_TOKEN")
const DEV_URL = req("MEDUSA_DEV_BACKEND_URL").replace(/\/+$/, "")
const DEV_TOKEN = req("MEDUSA_DEV_ADMIN_TOKEN")

const prod = new Medusa({ baseUrl: PROD_URL, apiKey: PROD_TOKEN })
const dev = new Medusa({ baseUrl: DEV_URL, apiKey: DEV_TOKEN })

const CHANNEL_ALLOWLIST = (process.env.CHANNEL_ALLOWLIST || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean)
  .map((s) => s.toLowerCase())
const CHANNEL_CREATE_MISSING = (process.env.CHANNEL_CREATE_MISSING || "1") !== "0"
const CHANNEL_ENFORCE_MIRROR = (process.env.CHANNEL_ENFORCE_MIRROR || "1") !== "0"
const MIRROR_STRICT = (process.env.MIRROR_STRICT || "1") !== "0"

function normalizeName(value?: string | null) {
  return (value || "").trim().toLowerCase()
}

function cleanObject(obj: Record<string, any>) {
  const out: Record<string, any> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) out[k] = v
  }
  return out
}

function mapAddress(address: any) {
  if (!address) return undefined

  const payload = cleanObject({
    address_1: address.address_1,
    address_2: address.address_2,
    city: address.city,
    company: address.company,
    country_code: address.country_code,
    phone: address.phone,
    postal_code: address.postal_code,
    province: address.province,
  })

  return Object.keys(payload).length > 0 ? payload : undefined
}

async function listAll<T>(
  client: Medusa,
  path: string,
  key: string,
  limit = 100,
  query: Record<string, any> = {}
): Promise<T[]> {
  const results: T[] = []
  let offset = 0
  const maxPages = 200

  for (let page = 0; page < maxPages; page++) {
    const response = await client.client.fetch<{ [k: string]: T[] }>(path, {
      method: "GET",
      query: { ...query, limit, offset },
    })
    const batch = (response[key] as T[]) || []
    results.push(...batch)

    if (batch.length < limit) {
      break
    }

    offset += limit

    if (page === maxPages - 1) {
      throw new Error(
        `Pagination overflow fetching ${path}. Retrieved at least ${results.length} records (limit=${limit}).`
      )
    }
  }

  return results
}

async function ping(client: Medusa, url: string, label: string) {
  try {
    await client.client.fetch(`/admin/product-types`, { method: "GET", query: { limit: 1 } })
    console.log(`✔ ${label} reachable: ${url}`)
  } catch (e: any) {
    console.error(`✖ ${label} unreachable: ${url}`)
    throw e
  }
}

async function getOrCreateDevChannelByName(name: string, devChannelIdByName: Map<string, string>) {
  const key = normalizeName(name)
  if (devChannelIdByName.has(key)) {
    return devChannelIdByName.get(key)!
  }

  if (!CHANNEL_CREATE_MISSING) {
    throw new Error(`DEV channel \"${name}\" not found and CHANNEL_CREATE_MISSING=0.`)
  }

  const created = await dev.client.fetch<{ sales_channel: { id: string; name: string } }>(
    `/admin/sales-channels`,
    {
      method: "POST",
      body: {
        name,
      },
    }
  )

  devChannelIdByName.set(key, created.sales_channel.id)
  return created.sales_channel.id
}

async function mirror() {
  console.log(`Mirroring store + catalog from PROD → DEV`)
  await ping(prod, PROD_URL, "PROD")
  await ping(dev, DEV_URL, "DEV")

  // 1) Sales channels
  const prodChannels = await listAll<any>(prod, `/admin/sales-channels`, "sales_channels")
  const devChannels = await listAll<any>(dev, `/admin/sales-channels`, "sales_channels")

  const devChannelByName = new Map<string, any>()
  devChannels.forEach((channel) => devChannelByName.set(normalizeName(channel.name), channel))

  const prodChannelIdToDevId = new Map<string, string>()
  const prodChannelNames = new Set<string>()

  for (const prodChannel of prodChannels) {
    const key = normalizeName(prodChannel.name)
    prodChannelNames.add(key)

    const body = cleanObject({
      name: prodChannel.name,
      description: prodChannel.description ?? null,
      is_disabled: !!prodChannel.is_disabled,
      metadata: prodChannel.metadata || {},
    })

    let devChannel = devChannelByName.get(key)

    if (!devChannel) {
      if (!CHANNEL_CREATE_MISSING) {
        throw new Error(
          `Missing DEV sales channel \"${prodChannel.name}\" and CHANNEL_CREATE_MISSING=0.`
        )
      }

      const created = await dev.client.fetch<{ sales_channel: any }>(`/admin/sales-channels`, {
        method: "POST",
        body,
      })
      devChannel = created.sales_channel
    } else {
      const updated = await dev.client.fetch<{ sales_channel: any }>(
        `/admin/sales-channels/${devChannel.id}`,
        {
          method: "POST",
          body,
        }
      )
      devChannel = updated.sales_channel
    }

    devChannelByName.set(key, devChannel)
    prodChannelIdToDevId.set(prodChannel.id, devChannel.id)
  }

  // Refresh DEV channels map after create/delete for later mapping.
  const devChannelsAfter = await listAll<any>(dev, `/admin/sales-channels`, "sales_channels")
  const devChannelIdByName = new Map<string, string>()
  devChannelsAfter.forEach((channel) => devChannelIdByName.set(normalizeName(channel.name), channel.id))

  // 2) Stock locations (name/address/sales-channel links)
  const prodLocations = await listAll<any>(prod, `/admin/stock-locations`, "stock_locations")
  const devLocations = await listAll<any>(dev, `/admin/stock-locations`, "stock_locations")

  const devLocationByName = new Map<string, any>()
  devLocations.forEach((location) => devLocationByName.set(normalizeName(location.name), location))

  const prodLocationIdToDevId = new Map<string, string>()
  const prodLocationNames = new Set<string>()

  for (const prodLocation of prodLocations) {
    const key = normalizeName(prodLocation.name)
    prodLocationNames.add(key)

    const body = cleanObject({
      name: prodLocation.name,
      address: mapAddress(prodLocation.address),
      metadata: prodLocation.metadata || {},
    })

    let devLocation = devLocationByName.get(key)

    if (!devLocation) {
      const created = await dev.client.fetch<{ stock_location: any }>(`/admin/stock-locations`, {
        method: "POST",
        body,
      })
      devLocation = created.stock_location
    } else {
      const updated = await dev.client.fetch<{ stock_location: any }>(
        `/admin/stock-locations/${devLocation.id}`,
        {
          method: "POST",
          body,
        }
      )
      devLocation = updated.stock_location
    }

    const desiredChannelIds = new Set<string>()
    for (const channel of prodLocation.sales_channels || []) {
      const mapped = prodChannelIdToDevId.get(channel.id)
      if (mapped) desiredChannelIds.add(mapped)
    }

    const currentChannelIds = new Set<string>((devLocation.sales_channels || []).map((c: any) => c.id))
    const add = Array.from(desiredChannelIds).filter((id) => !currentChannelIds.has(id))
    const remove = MIRROR_STRICT
      ? Array.from(currentChannelIds).filter((id) => !desiredChannelIds.has(id))
      : []

    if (add.length || remove.length) {
      await dev.client.fetch(`/admin/stock-locations/${devLocation.id}/sales-channels`, {
        method: "POST",
        body: { add, remove },
      })
    }

    devLocationByName.set(key, devLocation)
    prodLocationIdToDevId.set(prodLocation.id, devLocation.id)
  }

  // 3) Regions
  const prodRegions = await listAll<any>(prod, `/admin/regions`, "regions")
  const devRegions = await listAll<any>(dev, `/admin/regions`, "regions")

  const regionKey = (region: any) => `${normalizeName(region.name)}::${normalizeName(region.currency_code)}`
  const devRegionByKey = new Map<string, any>()
  devRegions.forEach((region) => devRegionByKey.set(regionKey(region), region))

  const prodRegionIdToDevId = new Map<string, string>()
  const prodRegionKeys = new Set<string>()

  for (const prodRegion of prodRegions) {
    const key = regionKey(prodRegion)
    prodRegionKeys.add(key)

    const body = cleanObject({
      name: prodRegion.name,
      currency_code: prodRegion.currency_code,
      countries: (prodRegion.countries || []).map((country: any) => country.iso_2).filter(Boolean),
      automatic_taxes: prodRegion.automatic_taxes,
      is_tax_inclusive: prodRegion.is_tax_inclusive,
      payment_providers: (prodRegion.payment_providers || [])
        .map((provider: any) => provider.id)
        .filter(Boolean),
      metadata: prodRegion.metadata || {},
    })

    let devRegion = devRegionByKey.get(key)

    if (!devRegion) {
      const created = await dev.client.fetch<{ region: any }>(`/admin/regions`, {
        method: "POST",
        body,
      })
      devRegion = created.region
    } else {
      const updated = await dev.client.fetch<{ region: any }>(`/admin/regions/${devRegion.id}`, {
        method: "POST",
        body,
      })
      devRegion = updated.region
    }

    devRegionByKey.set(key, devRegion)
    prodRegionIdToDevId.set(prodRegion.id, devRegion.id)
  }

  // 4) Product types
  const prodTypes = await listAll<any>(prod, `/admin/product-types`, "product_types")
  const devTypes = await listAll<any>(dev, `/admin/product-types`, "product_types")

  const devTypeByValue = new Map<string, any>()
  devTypes.forEach((type) => devTypeByValue.set(normalizeName(type.value), type))

  const prodTypeIdToDevId = new Map<string, string>()
  const prodTypeValues = new Set<string>()

  for (const prodType of prodTypes) {
    const key = normalizeName(prodType.value)
    prodTypeValues.add(key)

    let devType = devTypeByValue.get(key)
    if (!devType) {
      const created = await dev.client.fetch<{ product_type: any }>(`/admin/product-types`, {
        method: "POST",
        body: {
          value: prodType.value,
        },
      })
      devType = created.product_type
    }

    prodTypeIdToDevId.set(prodType.id, devType.id)
  }

  // 5) Product tags
  const prodTags = await listAll<any>(prod, `/admin/product-tags`, "product_tags")
  const devTags = await listAll<any>(dev, `/admin/product-tags`, "product_tags")

  const devTagByValue = new Map<string, any>()
  devTags.forEach((tag) => devTagByValue.set(normalizeName(tag.value), tag))

  const prodTagIdToDevId = new Map<string, string>()
  const prodTagValues = new Set<string>()

  for (const prodTag of prodTags) {
    const key = normalizeName(prodTag.value)
    prodTagValues.add(key)

    let devTag = devTagByValue.get(key)
    const body = cleanObject({
      value: prodTag.value,
      metadata: prodTag.metadata || {},
    })

    if (!devTag) {
      const created = await dev.client.fetch<{ product_tag: any }>(`/admin/product-tags`, {
        method: "POST",
        body,
      })
      devTag = created.product_tag
    } else {
      const updated = await dev.client.fetch<{ product_tag: any }>(
        `/admin/product-tags/${devTag.id}`,
        {
          method: "POST",
          body,
        }
      )
      devTag = updated.product_tag
    }

    devTagByValue.set(key, devTag)
    prodTagIdToDevId.set(prodTag.id, devTag.id)
  }

  // 6) Collections
  const prodCollections = await listAll<any>(prod, `/admin/collections`, "collections")
  const devCollections = await listAll<any>(dev, `/admin/collections`, "collections")

  const collectionKey = (collection: any) => normalizeName(collection.handle || collection.title)
  const devCollectionByKey = new Map<string, any>()
  devCollections.forEach((collection) => devCollectionByKey.set(collectionKey(collection), collection))

  const prodCollectionIdToDevId = new Map<string, string>()
  const prodCollectionKeys = new Set<string>()

  for (const prodCollection of prodCollections) {
    const key = collectionKey(prodCollection)
    prodCollectionKeys.add(key)

    const body = cleanObject({
      title: prodCollection.title,
      handle: prodCollection.handle,
      metadata: prodCollection.metadata || {},
    })

    let devCollection = devCollectionByKey.get(key)
    if (!devCollection) {
      const created = await dev.client.fetch<{ collection: any }>(`/admin/collections`, {
        method: "POST",
        body,
      })
      devCollection = created.collection
    } else {
      const updated = await dev.client.fetch<{ collection: any }>(
        `/admin/collections/${devCollection.id}`,
        {
          method: "POST",
          body,
        }
      )
      devCollection = updated.collection
    }

    devCollectionByKey.set(key, devCollection)
    prodCollectionIdToDevId.set(prodCollection.id, devCollection.id)
  }

  // 7) Shipping profiles (for product shipping_profile_id parity)
  const prodShippingProfiles = await listAll<any>(
    prod,
    `/admin/shipping-profiles`,
    "shipping_profiles"
  )
  const devShippingProfiles = await listAll<any>(dev, `/admin/shipping-profiles`, "shipping_profiles")

  const shippingProfileKey = (profile: any) => `${normalizeName(profile.type)}::${normalizeName(profile.name)}`
  const devShippingProfileByKey = new Map<string, any>()
  devShippingProfiles.forEach((profile) => devShippingProfileByKey.set(shippingProfileKey(profile), profile))

  const prodShippingProfileIdToDevId = new Map<string, string>()

  for (const prodProfile of prodShippingProfiles) {
    const key = shippingProfileKey(prodProfile)
    let devProfile = devShippingProfileByKey.get(key)

    if (!devProfile) {
      try {
        const created = await dev.client.fetch<{ shipping_profile: any }>(`/admin/shipping-profiles`, {
          method: "POST",
          body: {
            name: prodProfile.name,
            type: prodProfile.type,
          },
        })
        devProfile = created.shipping_profile
      } catch (e: any) {
        console.warn(
          `Failed creating DEV shipping profile ${prodProfile.name} (${prodProfile.type}):`,
          e?.message || e
        )
      }
    }

    if (devProfile?.id) {
      prodShippingProfileIdToDevId.set(prodProfile.id, devProfile.id)
      devShippingProfileByKey.set(key, devProfile)
    }
  }

  // 8) Categories (preserve hierarchy)
  const prodCategories = await listAll<any>(prod, `/admin/product-categories`, "product_categories")
  const devCategories = await listAll<any>(dev, `/admin/product-categories`, "product_categories")

  const devCategoryByHandle = new Map<string, any>()
  devCategories.forEach((category) => devCategoryByHandle.set(normalizeName(category.handle), category))

  const prodCategoryIdToDevId = new Map<string, string>()
  const prodCategoryHandles = new Set<string>()

  const pendingCategories = [...prodCategories]
  let categoryPass = 0

  while (pendingCategories.length) {
    categoryPass += 1
    let progressed = false

    for (let i = pendingCategories.length - 1; i >= 0; i--) {
      const category = pendingCategories[i]
      const parentId = category.parent_category_id

      if (parentId && !prodCategoryIdToDevId.has(parentId)) {
        continue
      }

      const key = normalizeName(category.handle)
      prodCategoryHandles.add(key)

      const body = cleanObject({
        name: category.name,
        handle: category.handle,
        is_active: category.is_active,
        parent_category_id: parentId ? prodCategoryIdToDevId.get(parentId) : null,
      })

      let devCategory = devCategoryByHandle.get(key)
      if (!devCategory) {
        const created = await dev.client.fetch<{ product_category: any }>(`/admin/product-categories`, {
          method: "POST",
          body,
        })
        devCategory = created.product_category
      } else {
        const updated = await dev.client.fetch<{ product_category: any }>(
          `/admin/product-categories/${devCategory.id}`,
          {
            method: "POST",
            body,
          }
        )
        devCategory = updated.product_category
      }

      devCategoryByHandle.set(key, devCategory)
      prodCategoryIdToDevId.set(category.id, devCategory.id)
      pendingCategories.splice(i, 1)
      progressed = true
    }

    if (!progressed) {
      throw new Error(
        `Could not resolve product category hierarchy after ${categoryPass} pass(es). Check for invalid parent relations in PROD categories.`
      )
    }
  }

  // 9) Products
  const prodProducts = await listAll<any>(prod, `/admin/products`, "products")
  const prodProductByHandle = new Map<string, any>()

  for (const product of prodProducts) {
    if (!product?.id) continue
    const fetched = await prod.client.fetch<{ product: any }>(`/admin/products/${product.id}`, {
      method: "GET",
    })

    const full = fetched.product || product
    const handle = normalizeName(full.handle)
    if (handle) prodProductByHandle.set(handle, full)
  }

  const devProducts = await listAll<any>(dev, `/admin/products`, "products")
  const devProductIdByHandle = new Map<string, string>()
  devProducts.forEach((product) => {
    const handle = normalizeName(product.handle)
    if (handle) devProductIdByHandle.set(handle, product.id)
  })

  const prodProductHandles = new Set<string>()

  for (const product of prodProductByHandle.values()) {
    const handle = normalizeName(product.handle)
    if (!handle) continue
    prodProductHandles.add(handle)

    const prodSalesChannels = Array.isArray(product.sales_channels) ? product.sales_channels : []
    const scopedSalesChannels =
      CHANNEL_ALLOWLIST.length > 0
        ? prodSalesChannels.filter((channel: any) =>
            CHANNEL_ALLOWLIST.includes(normalizeName(channel?.name))
          )
        : prodSalesChannels

    const salesChannels: Array<{ id: string }> = []
    for (const channel of scopedSalesChannels) {
      const existing = prodChannelIdToDevId.get(channel.id)
      const channelName = channel?.name || ""
      let devId = existing || devChannelIdByName.get(normalizeName(channelName))

      if (!devId && channelName) {
        devId = await getOrCreateDevChannelByName(channelName, devChannelIdByName)
      }

      if (devId) salesChannels.push({ id: devId })
    }

    const existingProductId = devProductIdByHandle.get(handle)
    const existingDevProduct = existingProductId
      ? await dev.client
          .fetch<{ product: any }>(`/admin/products/${existingProductId}`, { method: "GET" })
          .then((r) => r.product)
          .catch(() => undefined)
      : undefined

    const existingVariantIdBySku = new Map<string, string>()
    const existingVariantIdByTitle = new Map<string, string>()
    for (const variant of existingDevProduct?.variants || []) {
      const variantSku = normalizeName(variant?.sku)
      const variantTitle = normalizeName(variant?.title)
      if (variantSku) existingVariantIdBySku.set(variantSku, variant.id)
      if (variantTitle) existingVariantIdByTitle.set(variantTitle, variant.id)
    }

    const payload: any = cleanObject({
      title: product.title,
      subtitle: product.subtitle,
      description: product.description,
      handle: product.handle,
      status: product.status,
      is_giftcard: product.is_giftcard,
      discountable: product.discountable,
      thumbnail: product.thumbnail,
      external_id: product.external_id,
      type_id: product.type_id ? prodTypeIdToDevId.get(product.type_id) : undefined,
      collection_id: product.collection_id
        ? prodCollectionIdToDevId.get(product.collection_id)
        : undefined,
      shipping_profile_id: product.shipping_profile_id
        ? prodShippingProfileIdToDevId.get(product.shipping_profile_id)
        : undefined,
      categories: (product.categories || [])
        .map((category: any) => ({ id: prodCategoryIdToDevId.get(category.id) }))
        .filter((category: any) => !!category.id),
      tags: (product.tags || [])
        .map((tag: any) => ({ id: prodTagIdToDevId.get(tag.id) }))
        .filter((tag: any) => !!tag.id),
      sales_channels: salesChannels,
      options: (product.options || []).map((option: any) => ({
        title: option.title,
        values: (option.values || []).map((value: any) => value.value),
      })),
      variants: (product.variants || []).map((variant: any) => {
        const variantTitle = variant.title || variant.sku
        const variantSkuKey = normalizeName(variant.sku)
        const variantTitleKey = normalizeName(variantTitle)
        const existingVariantId =
          (variantSkuKey && existingVariantIdBySku.get(variantSkuKey)) ||
          (variantTitleKey && existingVariantIdByTitle.get(variantTitleKey))

        return cleanObject({
        id: existingVariantId,
        title: variantTitle,
        sku: variant.sku,
        ean: variant.ean,
        upc: variant.upc,
        barcode: variant.barcode,
        hs_code: variant.hs_code,
        mid_code: variant.mid_code,
        allow_backorder: variant.allow_backorder,
        manage_inventory: variant.manage_inventory,
        variant_rank: variant.variant_rank,
        weight: variant.weight,
        length: variant.length,
        height: variant.height,
        width: variant.width,
        origin_country: variant.origin_country,
        material: variant.material,
        metadata: variant.metadata || {},
        prices: (variant.prices || []).map((price: any) => ({
          currency_code: price.currency_code,
          amount: price.amount,
          min_quantity: price.min_quantity ?? undefined,
          max_quantity: price.max_quantity ?? undefined,
          rules: price.rules || undefined,
        })),
        options: (variant.options || []).reduce((acc: Record<string, string>, optionValue: any) => {
          const optionKey = optionValue?.title || optionValue?.option?.title || optionValue?.option_id
          if (optionKey && optionValue?.value) {
            acc[optionKey] = optionValue.value
          }
          return acc
        }, {}),
      })}),
      metadata: product.metadata || {},
      images: (product.images || []).map((image: any) => ({ url: image.url })),
      weight: product.weight,
      length: product.length,
      height: product.height,
      width: product.width,
      hs_code: product.hs_code,
      mid_code: product.mid_code,
      origin_country: product.origin_country,
      material: product.material,
    })

    const updatedOrCreated = existingProductId
      ? await dev.client
          .fetch<{ product: any }>(`/admin/products/${existingProductId}`, {
            method: "POST",
            body: payload,
          })
          .then((response) => response.product)
      : await dev.client
          .fetch<{ product: any }>(`/admin/products`, {
            method: "POST",
            body: payload,
          })
          .then((response) => response.product)

    if (CHANNEL_ENFORCE_MIRROR && Array.isArray(updatedOrCreated?.sales_channels)) {
      const desired = new Set(salesChannels.map((channel) => channel.id))
      const allowSet = CHANNEL_ALLOWLIST.length > 0 ? new Set(CHANNEL_ALLOWLIST) : null

      for (const salesChannel of updatedOrCreated.sales_channels) {
        const salesChannelName = normalizeName(salesChannel?.name)
        if (allowSet && !allowSet.has(salesChannelName)) continue

        const salesChannelId = salesChannel?.id
        if (!salesChannelId) continue

        if (!desired.has(salesChannelId)) {
          try {
            await dev.client.fetch(
              `/admin/products/${updatedOrCreated.id}/sales-channels/${salesChannelId}`,
              {
                method: "DELETE",
              }
            )
          } catch (e: any) {
            console.warn(
              `Failed to detach channel ${salesChannelName} from product ${updatedOrCreated?.handle || updatedOrCreated?.id}:`,
              e?.message || e
            )
          }
        }
      }
    }
  }

  // 10) Strict prune for products and dependent entities
  if (MIRROR_STRICT) {
    const devProductsAfter = await listAll<any>(dev, `/admin/products`, "products")
    for (const devProduct of devProductsAfter) {
      const handle = normalizeName(devProduct.handle)
      if (!handle || prodProductHandles.has(handle)) continue

      try {
        await dev.client.fetch(`/admin/products/${devProduct.id}`, { method: "DELETE" })
        console.log(`Deleted extra DEV product: ${devProduct.handle}`)
      } catch (e: any) {
        console.warn(`Failed deleting DEV product ${devProduct.handle}:`, e?.message || e)
      }
    }

    const devTagsAfter = await listAll<any>(dev, `/admin/product-tags`, "product_tags")
    for (const tag of devTagsAfter) {
      if (prodTagValues.has(normalizeName(tag.value))) continue
      try {
        await dev.client.fetch(`/admin/product-tags/${tag.id}`, { method: "DELETE" })
        console.log(`Deleted extra DEV product tag: ${tag.value}`)
      } catch (e: any) {
        console.warn(`Failed deleting DEV product tag ${tag.value}:`, e?.message || e)
      }
    }

    const devTypesAfter = await listAll<any>(dev, `/admin/product-types`, "product_types")
    for (const type of devTypesAfter) {
      if (prodTypeValues.has(normalizeName(type.value))) continue
      try {
        await dev.client.fetch(`/admin/product-types/${type.id}`, { method: "DELETE" })
        console.log(`Deleted extra DEV product type: ${type.value}`)
      } catch (e: any) {
        console.warn(`Failed deleting DEV product type ${type.value}:`, e?.message || e)
      }
    }

    const devCollectionsAfter = await listAll<any>(dev, `/admin/collections`, "collections")
    for (const collection of devCollectionsAfter) {
      if (prodCollectionKeys.has(collectionKey(collection))) continue
      try {
        await dev.client.fetch(`/admin/collections/${collection.id}`, { method: "DELETE" })
        console.log(`Deleted extra DEV collection: ${collection.title}`)
      } catch (e: any) {
        console.warn(`Failed deleting DEV collection ${collection.title}:`, e?.message || e)
      }
    }

    const devCategoriesAfter = await listAll<any>(dev, `/admin/product-categories`, "product_categories")
    const extraCategories = devCategoriesAfter.filter(
      (category) => !prodCategoryHandles.has(normalizeName(category.handle))
    )

    // Try multiple passes so child categories are deleted before parents.
    let pendingDeletes = [...extraCategories]
    let pass = 0
    while (pendingDeletes.length && pass < 5) {
      pass += 1
      const nextPending: any[] = []

      for (const category of pendingDeletes) {
        try {
          await dev.client.fetch(`/admin/product-categories/${category.id}`, { method: "DELETE" })
          console.log(`Deleted extra DEV category: ${category.handle}`)
        } catch {
          nextPending.push(category)
        }
      }

      if (nextPending.length === pendingDeletes.length) {
        break
      }
      pendingDeletes = nextPending
    }

    for (const category of pendingDeletes) {
      console.warn(`Failed deleting DEV category ${category.handle} (still in use).`)
    }
  }

  // 11) Store defaults (name/default channel/default region/default location)
  const prodStores = await listAll<any>(prod, `/admin/stores`, "stores")
  const devStores = await listAll<any>(dev, `/admin/stores`, "stores")

  if (!prodStores.length) {
    console.warn("No stores found in PROD; skipped store defaults sync.")
  } else if (!devStores.length) {
    console.warn("No stores found in DEV; skipped store defaults sync.")
  } else {
    const prodStore = prodStores[0]
    const devStore = devStores[0]

    if (prodStores.length > 1) {
      console.warn(
        `PROD has ${prodStores.length} stores; mirroring first store only (${prodStore.name || prodStore.id}).`
      )
    }
    if (devStores.length > 1) {
      console.warn(
        `DEV has ${devStores.length} stores; updating first store only (${devStore.name || devStore.id}).`
      )
    }

    const storeUpdate: any = cleanObject({
      name: prodStore.name,
      metadata: prodStore.metadata || {},
      supported_currencies: (prodStore.supported_currencies || []).map((currency: any) =>
        cleanObject({
          currency_code: currency.currency_code,
          is_default: currency.is_default,
          is_tax_inclusive: currency.is_tax_inclusive,
        })
      ),
    })

    if (prodStore.default_sales_channel_id) {
      const mappedDefaultChannel = prodChannelIdToDevId.get(prodStore.default_sales_channel_id)
      if (mappedDefaultChannel) {
        storeUpdate.default_sales_channel_id = mappedDefaultChannel
      } else {
        console.warn(
          `Could not map PROD default sales channel ${prodStore.default_sales_channel_id} to DEV.`
        )
      }
    } else {
      storeUpdate.default_sales_channel_id = null
    }

    if (prodStore.default_region_id) {
      const mappedDefaultRegion = prodRegionIdToDevId.get(prodStore.default_region_id)
      if (mappedDefaultRegion) {
        storeUpdate.default_region_id = mappedDefaultRegion
      } else {
        console.warn(`Could not map PROD default region ${prodStore.default_region_id} to DEV.`)
      }
    } else {
      storeUpdate.default_region_id = null
    }

    if (prodStore.default_location_id) {
      const mappedDefaultLocation = prodLocationIdToDevId.get(prodStore.default_location_id)
      if (mappedDefaultLocation) {
        storeUpdate.default_location_id = mappedDefaultLocation
      } else {
        console.warn(`Could not map PROD default location ${prodStore.default_location_id} to DEV.`)
      }
    } else {
      storeUpdate.default_location_id = null
    }

    await dev.client.fetch(`/admin/stores/${devStore.id}`, {
      method: "POST",
      body: storeUpdate,
    })
  }

  // 12) Strict prune for config entities after store defaults are updated
  if (MIRROR_STRICT) {
    const devChannelsForPrune = await listAll<any>(dev, `/admin/sales-channels`, "sales_channels")
    for (const channel of devChannelsForPrune) {
      const key = normalizeName(channel.name)
      if (prodChannelNames.has(key)) continue
      try {
        await dev.client.fetch(`/admin/sales-channels/${channel.id}`, { method: "DELETE" })
        console.log(`Deleted extra DEV sales channel: ${channel.name}`)
      } catch (e: any) {
        console.warn(`Failed deleting DEV sales channel ${channel.name}:`, e?.message || e)
      }
    }

    const devRegionsForPrune = await listAll<any>(dev, `/admin/regions`, "regions")
    for (const region of devRegionsForPrune) {
      const key = regionKey(region)
      if (prodRegionKeys.has(key)) continue
      try {
        await dev.client.fetch(`/admin/regions/${region.id}`, { method: "DELETE" })
        console.log(`Deleted extra DEV region: ${region.name}`)
      } catch (e: any) {
        console.warn(`Failed deleting DEV region ${region.name}:`, e?.message || e)
      }
    }

    const devLocationsForPrune = await listAll<any>(dev, `/admin/stock-locations`, "stock_locations")
    for (const location of devLocationsForPrune) {
      const key = normalizeName(location.name)
      if (prodLocationNames.has(key)) continue
      try {
        await dev.client.fetch(`/admin/stock-locations/${location.id}`, { method: "DELETE" })
        console.log(`Deleted extra DEV stock location: ${location.name}`)
      } catch (e: any) {
        console.warn(`Failed deleting DEV stock location ${location.name}:`, e?.message || e)
      }
    }
  }

  console.log(`Done. Store + catalog mirror complete.`)
}

mirror().catch((e) => {
  console.error(e)
  process.exit(1)
})
