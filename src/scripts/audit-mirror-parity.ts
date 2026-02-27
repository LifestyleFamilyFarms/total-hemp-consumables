/*
  Audit PROD -> DEV parity for the entities mirrored by mirror-prod-to-dev.ts.

  Purpose:
  - Surface blind spots immediately after `yarn mirror:dev`
  - Give a deterministic list of mismatches to fix before storefront smoke tests

  Env required:
  - MEDUSA_PROD_BACKEND_URL, MEDUSA_PROD_ADMIN_TOKEN
  - MEDUSA_DEV_BACKEND_URL,  MEDUSA_DEV_ADMIN_TOKEN

  Optional:
  - AUDIT_VERBOSE=1            (print all findings; default prints a capped sample)
  - AUDIT_MAX_FINDINGS=200     (sample size when verbose is off)
  - AUDIT_FAIL_ON_DIFF=1       (exit 1 if mismatches are found)

  Run:
    yarn mirror:audit
*/

import Medusa from "@medusajs/js-sdk"
import { loadEnv } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

type Finding = {
  scope: string
  key: string
  issue: string
  prod?: unknown
  dev?: unknown
}

function req(name: string) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing env: ${name}`)
  }
  return value
}

const PROD_URL = req("MEDUSA_PROD_BACKEND_URL").replace(/\/+$/, "")
const PROD_TOKEN = req("MEDUSA_PROD_ADMIN_TOKEN")
const DEV_URL = req("MEDUSA_DEV_BACKEND_URL").replace(/\/+$/, "")
const DEV_TOKEN = req("MEDUSA_DEV_ADMIN_TOKEN")

const AUDIT_VERBOSE = process.env.AUDIT_VERBOSE === "1"
const AUDIT_MAX_FINDINGS = Number.parseInt(process.env.AUDIT_MAX_FINDINGS || "200", 10)
const AUDIT_FAIL_ON_DIFF = process.env.AUDIT_FAIL_ON_DIFF === "1"

const prod = new Medusa({ baseUrl: PROD_URL, apiKey: PROD_TOKEN })
const dev = new Medusa({ baseUrl: DEV_URL, apiKey: DEV_TOKEN })

const PRODUCT_AUDIT_FIELDS = [
  "id",
  "title",
  "subtitle",
  "description",
  "handle",
  "status",
  "is_giftcard",
  "discountable",
  "thumbnail",
  "external_id",
  "type_id",
  "collection_id",
  "shipping_profile_id",
  "metadata",
  "weight",
  "length",
  "height",
  "width",
  "hs_code",
  "mid_code",
  "origin_country",
  "material",
  "*categories",
  "*tags",
  "*options",
  "*variants",
  "*variants.options",
  "*variants.prices",
  "*images",
  "*sales_channels",
].join(",")

function normalize(value?: string | null) {
  return (value || "").trim().toLowerCase()
}

function mapAddress(address: any) {
  if (!address) {
    return ""
  }

  return [
    normalize(address.address_1),
    normalize(address.address_2),
    normalize(address.city),
    normalize(address.province),
    normalize(address.postal_code),
    normalize(address.country_code),
  ].join("|")
}

function toSortedSet(values: Array<string | undefined | null>) {
  const set = new Set<string>()
  for (const value of values) {
    const normalized = normalize(value)
    if (normalized) {
      set.add(normalized)
    }
  }

  return [...set].sort()
}

function setDiff(expected: string[], actual: string[]) {
  const expectedSet = new Set(expected)
  const actualSet = new Set(actual)

  const missing = expected.filter((value) => !actualSet.has(value))
  const extra = actual.filter((value) => !expectedSet.has(value))

  return {
    missing,
    extra,
    equal: missing.length === 0 && extra.length === 0,
  }
}

function addFinding(
  findings: Finding[],
  scope: string,
  key: string,
  issue: string,
  prodValue?: unknown,
  devValue?: unknown
) {
  findings.push({
    scope,
    key,
    issue,
    prod: prodValue,
    dev: devValue,
  })
}

async function listAll<T>(
  client: Medusa,
  path: string,
  key: string,
  query: Record<string, any> = {},
  limit = 100
): Promise<T[]> {
  const rows: T[] = []
  let offset = 0

  while (true) {
    const response = await client.client.fetch<{ [k: string]: T[] }>(path, {
      method: "GET",
      query: {
        ...query,
        limit,
        offset,
      },
    })

    const batch = (response[key] as T[]) || []
    rows.push(...batch)

    if (batch.length < limit) {
      break
    }

    offset += limit
  }

  return rows
}

async function fetchProductsByHandle(client: Medusa) {
  const products = await listAll<any>(client, "/admin/products", "products")
  const map = new Map<string, any>()

  for (const product of products) {
    if (!product?.id) {
      continue
    }

    const full = await client.client.fetch<{ product: any }>(`/admin/products/${product.id}`, {
      method: "GET",
      query: {
        fields: PRODUCT_AUDIT_FIELDS,
      },
    })

    const handle = normalize(full.product?.handle)
    if (!handle) {
      continue
    }

    map.set(handle, full.product)
  }

  return map
}

function toVariantKey(variant: any) {
  const bySku = normalize(variant?.sku)
  if (bySku) {
    return `sku:${bySku}`
  }

  return `title:${normalize(variant?.title)}`
}

function variantOptionSet(variant: any) {
  const pairs = (variant?.options || [])
    .map((option: any) => {
      const optionName = normalize(option?.option?.title || option?.title || option?.option_id)
      const optionValue = normalize(option?.value)
      if (!optionName || !optionValue) {
        return ""
      }

      return `${optionName}=${optionValue}`
    })
    .filter(Boolean)

  return toSortedSet(pairs)
}

function variantPriceSet(variant: any) {
  const rows = (variant?.prices || [])
    .map((price: any) => {
      const currency = normalize(price?.currency_code)
      if (!currency) {
        return ""
      }

      const amount = Number(price?.amount ?? 0)
      const min = price?.min_quantity ?? ""
      const max = price?.max_quantity ?? ""

      return `${currency}:${amount}:${min}:${max}`
    })
    .filter(Boolean)

  return toSortedSet(rows)
}

function printReport(findings: Finding[]) {
  const byScope = new Map<string, number>()
  for (const finding of findings) {
    byScope.set(finding.scope, (byScope.get(finding.scope) || 0) + 1)
  }

  console.log("\n=== Mirror Parity Audit Summary ===")
  console.log(`Total findings: ${findings.length}`)

  if (byScope.size) {
    console.log("By scope:")
    for (const [scope, count] of [...byScope.entries()].sort((a, b) => b[1] - a[1])) {
      console.log(`- ${scope}: ${count}`)
    }
  }

  if (!findings.length) {
    console.log("No mismatches detected for audited entities.")
    return
  }

  const output = AUDIT_VERBOSE ? findings : findings.slice(0, AUDIT_MAX_FINDINGS)
  console.log(
    `\n${AUDIT_VERBOSE ? "All findings" : `Sample findings (first ${output.length} of ${findings.length})`}:`
  )

  for (const finding of output) {
    console.log(`- [${finding.scope}] ${finding.key}: ${finding.issue}`)
    if (AUDIT_VERBOSE) {
      console.log(`  prod=${JSON.stringify(finding.prod)}`)
      console.log(`  dev=${JSON.stringify(finding.dev)}`)
    }
  }
}

async function runAudit() {
  console.log("Running mirror parity audit: PROD -> DEV")

  const findings: Finding[] = []

  const [
    prodChannels,
    devChannels,
    prodLocations,
    devLocations,
    prodRegions,
    devRegions,
    prodTaxRegions,
    devTaxRegions,
    prodTypes,
    devTypes,
    prodTags,
    devTags,
    prodCollections,
    devCollections,
    prodCategories,
    devCategories,
    prodShippingProfiles,
    devShippingProfiles,
  ] = await Promise.all([
    listAll<any>(prod, "/admin/sales-channels", "sales_channels"),
    listAll<any>(dev, "/admin/sales-channels", "sales_channels"),
    listAll<any>(prod, "/admin/stock-locations", "stock_locations"),
    listAll<any>(dev, "/admin/stock-locations", "stock_locations"),
    listAll<any>(prod, "/admin/regions", "regions"),
    listAll<any>(dev, "/admin/regions", "regions"),
    listAll<any>(prod, "/admin/tax-regions", "tax_regions"),
    listAll<any>(dev, "/admin/tax-regions", "tax_regions"),
    listAll<any>(prod, "/admin/product-types", "product_types"),
    listAll<any>(dev, "/admin/product-types", "product_types"),
    listAll<any>(prod, "/admin/product-tags", "product_tags"),
    listAll<any>(dev, "/admin/product-tags", "product_tags"),
    listAll<any>(prod, "/admin/collections", "collections"),
    listAll<any>(dev, "/admin/collections", "collections"),
    listAll<any>(prod, "/admin/product-categories", "product_categories"),
    listAll<any>(dev, "/admin/product-categories", "product_categories"),
    listAll<any>(prod, "/admin/shipping-profiles", "shipping_profiles"),
    listAll<any>(dev, "/admin/shipping-profiles", "shipping_profiles"),
  ])

  const prodChannelNames = toSortedSet(prodChannels.map((channel) => channel.name))
  const devChannelNames = toSortedSet(devChannels.map((channel) => channel.name))
  const channelDiff = setDiff(prodChannelNames, devChannelNames)
  if (!channelDiff.equal) {
    addFinding(findings, "sales_channels", "all", "name set mismatch", channelDiff.missing, channelDiff.extra)
  }

  const prodLocationByName = new Map<string, any>()
  const devLocationByName = new Map<string, any>()
  for (const location of prodLocations) {
    prodLocationByName.set(normalize(location.name), location)
  }
  for (const location of devLocations) {
    devLocationByName.set(normalize(location.name), location)
  }

  for (const [name, prodLocation] of prodLocationByName.entries()) {
    const devLocation = devLocationByName.get(name)
    if (!devLocation) {
      addFinding(findings, "stock_locations", name, "missing in DEV")
      continue
    }

    if (mapAddress(prodLocation.address) !== mapAddress(devLocation.address)) {
      addFinding(
        findings,
        "stock_locations",
        name,
        "address mismatch",
        prodLocation.address,
        devLocation.address
      )
    }

    const prodLocationChannels = toSortedSet((prodLocation.sales_channels || []).map((channel: any) => channel.name))
    const devLocationChannels = toSortedSet((devLocation.sales_channels || []).map((channel: any) => channel.name))
    const locationChannelDiff = setDiff(prodLocationChannels, devLocationChannels)
    if (!locationChannelDiff.equal) {
      addFinding(
        findings,
        "stock_locations",
        name,
        "sales channel links mismatch",
        locationChannelDiff.missing,
        locationChannelDiff.extra
      )
    }
  }

  for (const name of devLocationByName.keys()) {
    if (!prodLocationByName.has(name)) {
      addFinding(findings, "stock_locations", name, "extra in DEV")
    }
  }

  const regionKey = (region: any) =>
    `${normalize(region.name)}::${normalize(region.currency_code)}`
  const prodRegionByKey = new Map<string, any>()
  const devRegionByKey = new Map<string, any>()
  for (const region of prodRegions) {
    prodRegionByKey.set(regionKey(region), region)
  }
  for (const region of devRegions) {
    devRegionByKey.set(regionKey(region), region)
  }

  for (const [key, prodRegion] of prodRegionByKey.entries()) {
    const devRegion = devRegionByKey.get(key)
    if (!devRegion) {
      addFinding(findings, "regions", key, "missing in DEV")
      continue
    }

    if (Boolean(prodRegion.automatic_taxes) !== Boolean(devRegion.automatic_taxes)) {
      addFinding(
        findings,
        "regions",
        key,
        "automatic_taxes mismatch",
        prodRegion.automatic_taxes,
        devRegion.automatic_taxes
      )
    }

    if (Boolean(prodRegion.is_tax_inclusive) !== Boolean(devRegion.is_tax_inclusive)) {
      addFinding(
        findings,
        "regions",
        key,
        "is_tax_inclusive mismatch",
        prodRegion.is_tax_inclusive,
        devRegion.is_tax_inclusive
      )
    }

    const prodCountries = toSortedSet((prodRegion.countries || []).map((country: any) => country.iso_2))
    const devCountries = toSortedSet((devRegion.countries || []).map((country: any) => country.iso_2))
    const countryDiff = setDiff(prodCountries, devCountries)
    if (!countryDiff.equal) {
      addFinding(findings, "regions", key, "country set mismatch", countryDiff.missing, countryDiff.extra)
    }

    const prodProviders = toSortedSet((prodRegion.payment_providers || []).map((provider: any) => provider.id))
    const devProviders = toSortedSet((devRegion.payment_providers || []).map((provider: any) => provider.id))
    const providerDiff = setDiff(prodProviders, devProviders)
    if (!providerDiff.equal) {
      addFinding(
        findings,
        "regions",
        key,
        "payment providers mismatch",
        providerDiff.missing,
        providerDiff.extra
      )
    }
  }

  for (const key of devRegionByKey.keys()) {
    if (!prodRegionByKey.has(key)) {
      addFinding(findings, "regions", key, "extra in DEV")
    }
  }

  const taxRegionKey = (taxRegion: any) =>
    [
      normalize(taxRegion.country_code),
      normalize(taxRegion.province_code),
      normalize(taxRegion.parent_id),
    ].join("::")

  const prodTaxByKey = new Map<string, any>()
  const devTaxByKey = new Map<string, any>()
  for (const taxRegion of prodTaxRegions) {
    prodTaxByKey.set(taxRegionKey(taxRegion), taxRegion)
  }
  for (const taxRegion of devTaxRegions) {
    devTaxByKey.set(taxRegionKey(taxRegion), taxRegion)
  }

  for (const [key, prodTax] of prodTaxByKey.entries()) {
    const devTax = devTaxByKey.get(key)
    if (!devTax) {
      addFinding(findings, "tax_regions", key, "missing in DEV")
      continue
    }

    if (!devTax.provider_id) {
      addFinding(findings, "tax_regions", key, "provider_id is null in DEV", prodTax.provider_id, devTax.provider_id)
    } else if (normalize(prodTax.provider_id) && normalize(prodTax.provider_id) !== normalize(devTax.provider_id)) {
      addFinding(findings, "tax_regions", key, "provider_id mismatch", prodTax.provider_id, devTax.provider_id)
    }
  }

  for (const key of devTaxByKey.keys()) {
    if (!prodTaxByKey.has(key)) {
      addFinding(findings, "tax_regions", key, "extra in DEV")
    }
  }

  const compareNameSet = (
    scope: string,
    prodValues: Array<string | undefined | null>,
    devValues: Array<string | undefined | null>
  ) => {
    const prodSet = toSortedSet(prodValues)
    const devSet = toSortedSet(devValues)
    const diff = setDiff(prodSet, devSet)
    if (!diff.equal) {
      addFinding(findings, scope, "all", "value set mismatch", diff.missing, diff.extra)
    }
  }

  compareNameSet("product_types", prodTypes.map((type) => type.value), devTypes.map((type) => type.value))
  compareNameSet("product_tags", prodTags.map((tag) => tag.value), devTags.map((tag) => tag.value))
  compareNameSet("collections", prodCollections.map((collection) => collection.handle || collection.title), devCollections.map((collection) => collection.handle || collection.title))

  const prodCategoryByHandle = new Map<string, any>()
  const devCategoryByHandle = new Map<string, any>()
  for (const category of prodCategories) {
    prodCategoryByHandle.set(normalize(category.handle), category)
  }
  for (const category of devCategories) {
    devCategoryByHandle.set(normalize(category.handle), category)
  }

  for (const [handle, prodCategory] of prodCategoryByHandle.entries()) {
    const devCategory = devCategoryByHandle.get(handle)
    if (!devCategory) {
      addFinding(findings, "categories", handle, "missing in DEV")
      continue
    }

    const prodParent = normalize(
      prodCategories.find((candidate) => candidate.id === prodCategory.parent_category_id)?.handle
    )
    const devParent = normalize(
      devCategories.find((candidate) => candidate.id === devCategory.parent_category_id)?.handle
    )

    if (prodParent !== devParent) {
      addFinding(findings, "categories", handle, "parent mismatch", prodParent, devParent)
    }

    if (Boolean(prodCategory.is_active) !== Boolean(devCategory.is_active)) {
      addFinding(findings, "categories", handle, "is_active mismatch", prodCategory.is_active, devCategory.is_active)
    }
  }

  for (const handle of devCategoryByHandle.keys()) {
    if (!prodCategoryByHandle.has(handle)) {
      addFinding(findings, "categories", handle, "extra in DEV")
    }
  }

  const prodProfileByKey = new Map<string, any>()
  const devProfileByKey = new Map<string, any>()
  const profileKey = (profile: any) => `${normalize(profile.type)}::${normalize(profile.name)}`
  for (const profile of prodShippingProfiles) {
    prodProfileByKey.set(profileKey(profile), profile)
  }
  for (const profile of devShippingProfiles) {
    devProfileByKey.set(profileKey(profile), profile)
  }
  for (const key of prodProfileByKey.keys()) {
    if (!devProfileByKey.has(key)) {
      addFinding(findings, "shipping_profiles", key, "missing in DEV")
    }
  }

  const prodProductsByHandle = await fetchProductsByHandle(prod)
  const devProductsByHandle = await fetchProductsByHandle(dev)

  const prodCollectionById = new Map<string, string>()
  const devCollectionById = new Map<string, string>()
  for (const collection of prodCollections) {
    prodCollectionById.set(collection.id, normalize(collection.handle || collection.title))
  }
  for (const collection of devCollections) {
    devCollectionById.set(collection.id, normalize(collection.handle || collection.title))
  }

  const prodTypeById = new Map<string, string>()
  const devTypeById = new Map<string, string>()
  for (const type of prodTypes) {
    prodTypeById.set(type.id, normalize(type.value))
  }
  for (const type of devTypes) {
    devTypeById.set(type.id, normalize(type.value))
  }

  const prodProfileById = new Map<string, string>()
  const devProfileById = new Map<string, string>()
  for (const profile of prodShippingProfiles) {
    prodProfileById.set(profile.id, profileKey(profile))
  }
  for (const profile of devShippingProfiles) {
    devProfileById.set(profile.id, profileKey(profile))
  }

  for (const [handle, prodProduct] of prodProductsByHandle.entries()) {
    const devProduct = devProductsByHandle.get(handle)
    if (!devProduct) {
      addFinding(findings, "products", handle, "missing in DEV")
      continue
    }

    if (normalize(prodProduct.status) !== normalize(devProduct.status)) {
      addFinding(findings, "products", handle, "status mismatch", prodProduct.status, devProduct.status)
    }

    const prodType = normalize(prodTypeById.get(prodProduct.type_id))
    const devType = normalize(devTypeById.get(devProduct.type_id))
    if (prodType !== devType) {
      addFinding(findings, "products", handle, "type mismatch", prodType, devType)
    }

    const prodCollection = normalize(prodCollectionById.get(prodProduct.collection_id))
    const devCollection = normalize(devCollectionById.get(devProduct.collection_id))
    if (prodCollection !== devCollection) {
      addFinding(findings, "products", handle, "collection mismatch", prodCollection, devCollection)
    }

    const prodProfile = normalize(prodProfileById.get(prodProduct.shipping_profile_id))
    const devProfile = normalize(devProfileById.get(devProduct.shipping_profile_id))
    if (prodProfile !== devProfile) {
      addFinding(findings, "products", handle, "shipping_profile mismatch", prodProfile, devProfile)
    }

    const prodCategoriesSet = toSortedSet((prodProduct.categories || []).map((category: any) => category.handle))
    const devCategoriesSet = toSortedSet((devProduct.categories || []).map((category: any) => category.handle))
    const categoriesDiff = setDiff(prodCategoriesSet, devCategoriesSet)
    if (!categoriesDiff.equal) {
      addFinding(findings, "products", handle, "category links mismatch", categoriesDiff.missing, categoriesDiff.extra)
    }

    const prodTagsSet = toSortedSet((prodProduct.tags || []).map((tag: any) => tag.value))
    const devTagsSet = toSortedSet((devProduct.tags || []).map((tag: any) => tag.value))
    const tagsDiff = setDiff(prodTagsSet, devTagsSet)
    if (!tagsDiff.equal) {
      addFinding(findings, "products", handle, "tag links mismatch", tagsDiff.missing, tagsDiff.extra)
    }

    const prodChannelsSet = toSortedSet((prodProduct.sales_channels || []).map((channel: any) => channel.name))
    const devChannelsSet = toSortedSet((devProduct.sales_channels || []).map((channel: any) => channel.name))
    const channelsDiff = setDiff(prodChannelsSet, devChannelsSet)
    if (!channelsDiff.equal) {
      addFinding(findings, "products", handle, "sales channel links mismatch", channelsDiff.missing, channelsDiff.extra)
    }

    const prodImageSet = toSortedSet((prodProduct.images || []).map((image: any) => image.url))
    const devImageSet = toSortedSet((devProduct.images || []).map((image: any) => image.url))
    const imageDiff = setDiff(prodImageSet, devImageSet)
    if (!imageDiff.equal) {
      addFinding(findings, "products", handle, "image URL mismatch", imageDiff.missing, imageDiff.extra)
    }

    const prodVariantsByKey = new Map<string, any>()
    const devVariantsByKey = new Map<string, any>()
    for (const variant of prodProduct.variants || []) {
      prodVariantsByKey.set(toVariantKey(variant), variant)
    }
    for (const variant of devProduct.variants || []) {
      devVariantsByKey.set(toVariantKey(variant), variant)
    }

    for (const [variantKey, prodVariant] of prodVariantsByKey.entries()) {
      const devVariant = devVariantsByKey.get(variantKey)
      if (!devVariant) {
        addFinding(findings, "product_variants", `${handle}:${variantKey}`, "missing in DEV")
        continue
      }

      if (Boolean(prodVariant.manage_inventory) !== Boolean(devVariant.manage_inventory)) {
        addFinding(
          findings,
          "product_variants",
          `${handle}:${variantKey}`,
          "manage_inventory mismatch",
          prodVariant.manage_inventory,
          devVariant.manage_inventory
        )
      }

      if (Boolean(prodVariant.allow_backorder) !== Boolean(devVariant.allow_backorder)) {
        addFinding(
          findings,
          "product_variants",
          `${handle}:${variantKey}`,
          "allow_backorder mismatch",
          prodVariant.allow_backorder,
          devVariant.allow_backorder
        )
      }

      const optionDiff = setDiff(variantOptionSet(prodVariant), variantOptionSet(devVariant))
      if (!optionDiff.equal) {
        addFinding(
          findings,
          "product_variants",
          `${handle}:${variantKey}`,
          "option values mismatch",
          optionDiff.missing,
          optionDiff.extra
        )
      }

      const priceDiff = setDiff(variantPriceSet(prodVariant), variantPriceSet(devVariant))
      if (!priceDiff.equal) {
        addFinding(
          findings,
          "product_variants",
          `${handle}:${variantKey}`,
          "price rows mismatch",
          priceDiff.missing,
          priceDiff.extra
        )
      }
    }

    for (const variantKey of devVariantsByKey.keys()) {
      if (!prodVariantsByKey.has(variantKey)) {
        addFinding(findings, "product_variants", `${handle}:${variantKey}`, "extra in DEV")
      }
    }
  }

  for (const handle of devProductsByHandle.keys()) {
    if (!prodProductsByHandle.has(handle)) {
      addFinding(findings, "products", handle, "extra in DEV")
    }
  }

  printReport(findings)

  if (AUDIT_FAIL_ON_DIFF && findings.length > 0) {
    process.exit(1)
  }
}

runAudit().catch((error) => {
  console.error(error)
  process.exit(1)
})
