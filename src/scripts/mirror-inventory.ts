/*
  Mirror inventory items + levels from PROD → DEV via Admin API.

  Env required:
  - MEDUSA_PROD_BACKEND_URL, MEDUSA_PROD_ADMIN_TOKEN
  - MEDUSA_DEV_BACKEND_URL,  MEDUSA_DEV_ADMIN_TOKEN

  Optional:
  - INVENTORY_DEFAULT_QTY (number, fallback when prod has no levels)
  - INVENTORY_LOCATION_MAP (JSON mapping of prod location name → dev location name)
  - INVENTORY_MIRROR_RESERVED (set to 0 to skip mirroring reservations)
  - INVENTORY_WIPE_RESERVATIONS (set to 0 to keep non-mirror reservations in DEV)
  - INVENTORY_DRY_RUN (set to 1 for dry-run)
  - INVENTORY_STRICT (default 1; set to 0 to keep DEV inventory items missing in PROD)

  Run:
    yarn ts-node src/scripts/mirror-inventory.ts
*/

import Medusa from "@medusajs/js-sdk"
import { loadEnv } from "@medusajs/framework/utils"
import colors from "yoctocolors-cjs"

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
const DEFAULT_QTY = Number(process.env.INVENTORY_DEFAULT_QTY || 0)
const LOCATION_MAP: Record<string, string> = (() => {
  try {
    return JSON.parse(process.env.INVENTORY_LOCATION_MAP || "{}")
  } catch {
    return {}
  }
})()

const MIRROR_RESERVED = (process.env.INVENTORY_MIRROR_RESERVED || "1") !== "0"
const WIPE_EXISTING_RESERVATIONS = (process.env.INVENTORY_WIPE_RESERVATIONS || "1") !== "0"
const DRY_RUN = (process.env.INVENTORY_DRY_RUN || "0") === "1"
const INVENTORY_STRICT = (process.env.INVENTORY_STRICT || "1") !== "0"

const prod = new Medusa({ baseUrl: PROD_URL, apiKey: PROD_TOKEN })
const dev = new Medusa({ baseUrl: DEV_URL, apiKey: DEV_TOKEN })

async function listAll<T>(client: Medusa, path: string, key: string, limit = 1000) {
  const results: T[] = []
  let offset = 0
  const maxPages = 100

  for (let page = 0; page < maxPages; page++) {
    const response = await client.client.fetch<{ [k: string]: T[] }>(path, {
      method: "GET",
      query: { limit, offset },
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

async function listInventoryLevels(
  client: Medusa,
  inventoryItemId: string,
  limit = 100
): Promise<Array<{ id: string; location_id: string; stocked_quantity: number }>> {
  const levels: Array<{ id: string; location_id: string; stocked_quantity: number }> = []
  let offset = 0
  const maxPages = 100

  for (let page = 0; page < maxPages; page++) {
    const response = await client.client.fetch<{ inventory_levels: any[] }>(
      `/admin/inventory-items/${inventoryItemId}/location-levels`,
      {
        method: "GET",
        query: { limit, offset },
      }
    )

    const batch = (response.inventory_levels || []).map((level: any) => ({
      id: level.id,
      location_id: level.location_id,
      stocked_quantity: Number(level.stocked_quantity || 0),
    }))

    levels.push(...batch)

    if (batch.length < limit) {
      break
    }

    offset += limit

    if (page === maxPages - 1) {
      throw new Error(
        `Pagination overflow fetching location levels for inventory item ${inventoryItemId}. Retrieved at least ${levels.length} records (limit=${limit}).`
      )
    }
  }

  return levels
}

async function listReservationsByInventoryItem(
  client: Medusa,
  inventoryItemId: string,
  limit = 1000
): Promise<any[]> {
  const reservations: any[] = []
  let offset = 0
  const maxPages = 100

  for (let page = 0; page < maxPages; page++) {
    const response = await client.client.fetch<{ reservations: any[] }>(`/admin/reservations`, {
      method: "GET",
      query: { inventory_item_id: inventoryItemId, limit, offset },
    })

    const batch = response.reservations || []
    reservations.push(...batch)

    if (batch.length < limit) {
      break
    }

    offset += limit

    if (page === maxPages - 1) {
      throw new Error(
        `Pagination overflow fetching reservations for inventory item ${inventoryItemId}. Retrieved at least ${reservations.length} records (limit=${limit}).`
      )
    }
  }

  return reservations
}

type LevelShape = { stocked_quantity: number }
type InventorySnapshot = Map<string, Map<string, LevelShape>>
type DiffEntry = {
  sku: string
  location: string
  devQty: number
  prodQty: number
}

function normalizeName(value: string) {
  return (value || "").toLowerCase()
}

async function mirrorInventory() {
  console.log(DRY_RUN ? `Dry-running inventory mirror PROD → DEV` : `Mirroring inventory from PROD → DEV`)

  // 1) Gather PROD locations (id → name)
  const prodLocations = await listAll<{ id: string; name: string }>(prod, `/admin/stock-locations`, "stock_locations")
  if (!prodLocations.length) {
    throw new Error("No stock locations found in PROD. Cannot mirror inventory.")
  }

  const prodLocationNameById = new Map<string, string>()
  prodLocations.forEach((location) => prodLocationNameById.set(location.id, location.name || ""))

  // 2) Gather DEV locations (name → id)
  const devLocations = await listAll<{ id: string; name: string }>(dev, `/admin/stock-locations`, "stock_locations")
  if (!devLocations.length) {
    throw new Error(
      "No stock locations found in DEV. Create at least one location via Admin before mirroring inventory."
    )
  }

  const devLocationIdByName = new Map<string, string>()
  const devLocationNameById = new Map<string, string>()
  devLocations.forEach((location) => {
    const key = normalizeName(location.name || "")
    devLocationIdByName.set(key, location.id)
    devLocationNameById.set(location.id, location.name || "")
  })

  // 3) Build DEV variant map by SKU
  const devProducts = await listAll<any>(dev, `/admin/products`, "products")
  const devVariantIdBySku = new Map<string, string>()
  for (const product of devProducts) {
    for (const variant of product.variants || []) {
      if (variant.sku) devVariantIdBySku.set(normalizeName(variant.sku as string), variant.id)
    }
  }

  // 4) Build PROD inventory map by SKU
  const prodItems = await listAll<any>(prod, `/admin/inventory-items`, "inventory_items")
  const prodItemIdBySku = new Map<string, string>()
  const prodSkuByItemId = new Map<string, string>()
  const prodLevelsByItemId = new Map<string, any[]>()

  for (const item of prodItems) {
    const sku = normalizeName(item?.sku || "")
    if (!sku) continue

    prodItemIdBySku.set(sku, item.id)
    prodSkuByItemId.set(item.id, sku)

    try {
      const levels = await listInventoryLevels(prod, item.id)
      prodLevelsByItemId.set(item.id, levels)
    } catch (e: any) {
      console.warn(`Failed to load PROD levels for item ${item.id}:`, e?.message || e)
      prodLevelsByItemId.set(item.id, [])
    }
  }

  const prodSkuLevels: InventorySnapshot = new Map()
  for (const [sku, itemId] of prodItemIdBySku) {
    const levels = prodLevelsByItemId.get(itemId) || []
    const map = new Map<string, LevelShape>()

    for (const level of levels) {
      const locationName = prodLocationNameById.get(level.location_id) || ""
      if (!locationName) continue

      map.set(normalizeName(locationName), {
        stocked_quantity: Number(level.stocked_quantity || 0),
      })
    }

    prodSkuLevels.set(sku, map)
  }

  const prodSkuSet = new Set(prodItemIdBySku.keys())

  const missingDevSkus = Array.from(prodSkuSet).filter((sku) => !devVariantIdBySku.has(sku))
  if (missingDevSkus.length) {
    throw new Error(
      `Missing DEV variants for ${missingDevSkus.length} PROD SKU(s): ${missingDevSkus
        .slice(0, 10)
        .join(", ")}`
    )
  }

  // 5) Build PROD reserved map by SKU + location
  const prodReservations = await listAll<any>(prod, `/admin/reservations`, "reservations")
  const prodReservedBySku = new Map<string, Map<string, number>>()

  for (const reservation of prodReservations) {
    const sku = prodSkuByItemId.get(reservation.inventory_item_id) || ""
    if (!sku) continue

    const locationName = prodLocationNameById.get(reservation.location_id) || ""
    if (!locationName) continue

    const qty = Number(reservation.quantity || 0)
    if (!qty) continue

    const locationKey = normalizeName(locationName)
    if (!prodReservedBySku.has(sku)) {
      prodReservedBySku.set(sku, new Map())
    }

    const map = prodReservedBySku.get(sku)!
    map.set(locationKey, (map.get(locationKey) || 0) + qty)
  }

  // 6) Build DEV inventory item lookup
  const devItems = await listAll<any>(dev, `/admin/inventory-items`, "inventory_items")
  const devItemIdBySku = new Map<string, string>()

  for (const item of devItems) {
    const sku = normalizeName(item?.sku || "")
    if (sku) devItemIdBySku.set(sku, item.id)
  }

  let createdItems = 0
  let deletedExtraItems = 0
  let updatedLevels = 0
  let createdLevels = 0
  let zeroedLevels = 0
  let reservationsDeleted = 0
  let reservationsCreated = 0

  const diffEntries: DiffEntry[] = []
  const missingLocationMappings = new Set<string>()

  // 7) Strict prune DEV inventory items that don't exist in PROD
  if (INVENTORY_STRICT) {
    for (const [sku, devItemId] of devItemIdBySku) {
      if (prodSkuSet.has(sku)) continue

      if (DRY_RUN) {
        deletedExtraItems++
        continue
      }

      try {
        const reservations = await listReservationsByInventoryItem(dev, devItemId)
        for (const reservation of reservations) {
          try {
            await dev.client.fetch(`/admin/reservations/${reservation.id}`, { method: "DELETE" })
            reservationsDeleted++
          } catch {
            // best effort
          }
        }

        await dev.client.fetch(`/admin/inventory-items/${devItemId}`, { method: "DELETE" })
        deletedExtraItems++
      } catch (e: any) {
        console.warn(`Failed deleting extra DEV inventory item sku=${sku}:`, e?.message || e)
      }
    }
  }

  // 8) Mirror PROD inventory items + levels + reservations
  for (const sku of prodSkuSet) {
    const variantId = devVariantIdBySku.get(sku)
    if (!variantId) continue

    let devItemId = devItemIdBySku.get(sku)
    if (!devItemId) {
      if (DRY_RUN) {
        createdItems++
      } else {
        try {
          const created = await dev.client.fetch<{ inventory_item: { id: string } }>(
            `/admin/inventory-items`,
            {
              method: "POST",
              body: { sku },
            }
          )
          devItemId = created.inventory_item.id
          devItemIdBySku.set(sku, devItemId)
          createdItems++
        } catch (e: any) {
          console.warn(`Failed to create DEV inventory item sku=${sku}:`, e?.message || e)
          continue
        }
      }
    }

    // Dry-run: dev item would be created; assume zero current levels.
    if (!devItemId) {
      const targetLevels = prodSkuLevels.get(sku) || new Map<string, LevelShape>()
      for (const [prodLocationName, data] of targetLevels) {
        const mappedName = normalizeName(LOCATION_MAP[prodLocationName] || prodLocationName)
        const devLocationId = devLocationIdByName.get(mappedName)
        if (!devLocationId) continue
        diffEntries.push({
          sku,
          location: devLocationNameById.get(devLocationId) || mappedName,
          devQty: 0,
          prodQty: data.stocked_quantity,
        })
      }
      continue
    }

    if (!DRY_RUN) {
      try {
        await dev.client.fetch(`/admin/variants/${variantId}/inventory-items`, {
          method: "POST",
          body: { inventory_item_id: devItemId },
        })
      } catch {
        // link may already exist
      }
    }

    const targetLevelsRaw = prodSkuLevels.get(sku) || new Map<string, LevelShape>()
    const targetLevels: Array<{ location_id: string; stocked_quantity: number }> = []

    for (const [prodLocationName, data] of targetLevelsRaw) {
      const mappedName = normalizeName(LOCATION_MAP[prodLocationName] || prodLocationName)
      const devLocationId = devLocationIdByName.get(mappedName)
      if (!devLocationId) {
        missingLocationMappings.add(`${sku} → ${prodLocationName}`)
        continue
      }
      targetLevels.push({
        location_id: devLocationId,
        stocked_quantity: data.stocked_quantity,
      })
    }

    let currentDevLevels: Array<{ id: string; location_id: string; stocked_quantity: number }> = []
    try {
      currentDevLevels = await listInventoryLevels(dev, devItemId)
    } catch (e: any) {
      console.warn(`Failed to load DEV levels for sku=${sku}:`, e?.message || e)
    }

    const currentDevLevelsMap = new Map<string, { id: string; location_id: string; stocked_quantity: number }>()
    currentDevLevels.forEach((level) => currentDevLevelsMap.set(level.location_id, level))

    if (DRY_RUN) {
      for (const target of targetLevels) {
        const current = currentDevLevelsMap.get(target.location_id)
        const currentQty = current?.stocked_quantity || 0
        if (currentQty !== target.stocked_quantity) {
          diffEntries.push({
            sku,
            location: devLocationNameById.get(target.location_id) || target.location_id,
            devQty: currentQty,
            prodQty: target.stocked_quantity,
          })
        }
      }

      const targetSet = new Set(targetLevels.map((level) => level.location_id))
      for (const current of currentDevLevels) {
        if (!targetSet.has(current.location_id) && current.stocked_quantity !== 0) {
          diffEntries.push({
            sku,
            location: devLocationNameById.get(current.location_id) || current.location_id,
            devQty: current.stocked_quantity,
            prodQty: 0,
          })
        }
      }

      continue
    }

    if (targetLevels.length > 0) {
      for (const target of targetLevels) {
        const existing = currentDevLevelsMap.get(target.location_id)

        if (existing) {
          if (existing.stocked_quantity !== target.stocked_quantity) {
            try {
              await dev.client.fetch(
                `/admin/inventory-items/${devItemId}/location-levels/${target.location_id}`,
                {
                  method: "POST",
                  body: {
                    stocked_quantity: target.stocked_quantity,
                  },
                }
              )
              updatedLevels++
              currentDevLevelsMap.set(target.location_id, {
                ...existing,
                stocked_quantity: target.stocked_quantity,
              })
            } catch (e: any) {
              console.warn(
                `Failed to update level sku=${sku} location=${target.location_id}:`,
                e?.message || e
              )
            }
          }
        } else {
          try {
            await dev.client.fetch(`/admin/inventory-items/${devItemId}/location-levels`, {
              method: "POST",
              body: target,
            })
            createdLevels++
            currentDevLevelsMap.set(target.location_id, {
              id: "",
              location_id: target.location_id,
              stocked_quantity: target.stocked_quantity,
            })
          } catch (e: any) {
            console.warn(
              `Failed to create level sku=${sku} location=${target.location_id}:`,
              e?.message || e
            )
          }
        }
      }

      const targetSet = new Set(targetLevels.map((level) => level.location_id))
      for (const current of currentDevLevels) {
        if (!targetSet.has(current.location_id) && current.stocked_quantity !== 0) {
          try {
            await dev.client.fetch(
              `/admin/inventory-items/${devItemId}/location-levels/${current.location_id}`,
              {
                method: "POST",
                body: {
                  stocked_quantity: 0,
                },
              }
            )
            zeroedLevels++
          } catch (e: any) {
            console.warn(
              `Failed to zero level sku=${sku} location=${current.location_id}:`,
              e?.message || e
            )
          }
        }
      }
    } else {
      // No PROD levels. Keep exact zero unless DEFAULT_QTY fallback is set.
      if (!DEFAULT_QTY) {
        for (const current of currentDevLevels) {
          if (current.stocked_quantity !== 0) {
            try {
              await dev.client.fetch(
                `/admin/inventory-items/${devItemId}/location-levels/${current.location_id}`,
                {
                  method: "POST",
                  body: {
                    stocked_quantity: 0,
                  },
                }
              )
              zeroedLevels++
            } catch (e: any) {
              console.warn(
                `Failed to zero level sku=${sku} location=${current.location_id}:`,
                e?.message || e
              )
            }
          }
        }
      } else {
        const firstLocationId = devLocations[0]?.id
        if (firstLocationId) {
          try {
            await dev.client.fetch(`/admin/inventory-items/${devItemId}/location-levels`, {
              method: "POST",
              body: {
                location_id: firstLocationId,
                stocked_quantity: DEFAULT_QTY,
              },
            })
            createdLevels++
          } catch {
            // best effort
          }
        }
      }
    }

    if (MIRROR_RESERVED) {
      const targetReserved = prodReservedBySku.get(sku)
      let devReservations: any[] = []

      try {
        devReservations = await listReservationsByInventoryItem(dev, devItemId)
      } catch (e: any) {
        console.warn(`Failed to load DEV reservations sku=${sku}:`, e?.message || e)
      }

      for (const reservation of devReservations) {
        if (!WIPE_EXISTING_RESERVATIONS && reservation?.metadata?.source !== "mirror-prod") {
          continue
        }

        try {
          await dev.client.fetch(`/admin/reservations/${reservation.id}`, { method: "DELETE" })
          reservationsDeleted++
        } catch {
          // best effort
        }
      }

      if (targetReserved && targetReserved.size) {
        for (const [prodLocationName, qty] of targetReserved) {
          if (!qty) continue

          const mappedName = normalizeName(LOCATION_MAP[prodLocationName] || prodLocationName)
          const devLocationId = devLocationIdByName.get(mappedName)
          if (!devLocationId) {
            missingLocationMappings.add(`${sku} → ${prodLocationName}`)
            continue
          }

          try {
            await dev.client.fetch(`/admin/reservations`, {
              method: "POST",
              body: {
                inventory_item_id: devItemId,
                location_id: devLocationId,
                quantity: qty,
                description: "Mirrored from PROD",
                metadata: {
                  source: "mirror-prod",
                  prod_location: prodLocationName,
                },
              },
            })
            reservationsCreated++
          } catch (e: any) {
            console.warn(
              `Failed creating reservation sku=${sku} location=${prodLocationName}:`,
              e?.message || e
            )
          }
        }
      }
    }
  }

  if (missingLocationMappings.size) {
    throw new Error(
      `Missing DEV stock location mappings for ${missingLocationMappings.size} entries: ${Array.from(
        missingLocationMappings
      )
        .slice(0, 10)
        .join(", ")}`
    )
  }

  if (DRY_RUN) {
    if (deletedExtraItems > 0) {
      console.log(
        colors.yellow(
          `Dry-run: ${deletedExtraItems} DEV inventory item(s) would be removed (missing in PROD) because INVENTORY_STRICT=1.`
        )
      )
    }

    if (diffEntries.length === 0) {
      console.log(colors.green("Dry-run: DEV inventory already matches PROD for mirrored SKUs. No changes needed."))
    } else {
      const bySku = new Map<string, DiffEntry[]>()
      for (const entry of diffEntries) {
        if (!bySku.has(entry.sku)) bySku.set(entry.sku, [])
        bySku.get(entry.sku)!.push(entry)
      }

      console.log(
        colors.bold(
          colors.yellow(
            `Dry-run: found ${diffEntries.length} inventory mismatches across ${bySku.size} SKU${
              bySku.size === 1 ? "" : "s"
            }.`
          )
        )
      )

      for (const [sku, entries] of bySku) {
        console.log(`  ${colors.bold(sku)}`)
        for (const entry of entries) {
          const delta = entry.prodQty - entry.devQty
          const arrow = delta > 0 ? colors.green("→") : delta < 0 ? colors.red("←") : colors.gray("=")
          const deltaText =
            delta > 0 ? colors.green(`+${delta}`) : delta < 0 ? colors.red(`${delta}`) : colors.gray("0")
          console.log(
            `    ${entry.location}: DEV ${colors.cyan(String(entry.devQty))} ${arrow} PROD ${colors.magenta(
              String(entry.prodQty)
            )} (Δ ${deltaText})`
          )
        }
      }

      console.log(colors.gray("Dry-run only: no changes were applied."))
    }

    return
  }

  console.log(
    `Inventory mirror complete. strict=${INVENTORY_STRICT ? 1 : 0}, items_created=${createdItems}, items_deleted=${deletedExtraItems}, levels_updated=${updatedLevels}, levels_created=${createdLevels}, levels_zeroed=${zeroedLevels}, reservations_created=${reservationsCreated}, reservations_deleted=${reservationsDeleted}`
  )
}

mirrorInventory().catch((e) => {
  console.error(e)
  process.exit(1)
})
