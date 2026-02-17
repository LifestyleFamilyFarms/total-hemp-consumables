/*
  Prepare media manifests from docs/thc-site-pictures.

  What it does:
  - Normalizes known SKU folder naming mismatches.
  - Scans each SKU folder for thumbs/full assets.
  - Generates docs/variant-media.tsv and docs/product-media.tsv.
  - Writes docs/media-prepare-report.json with gaps/anomalies.

  Env (optional):
  - MEDIA_SOURCE_ROOT (default: docs/thc-site-pictures)
  - MEDIA_PRODUCTS_FILE (default: docs/product-media.tsv)
  - MEDIA_VARIANTS_FILE (default: docs/variant-media.tsv)
  - MEDIA_PREP_REPORT_FILE (default: docs/media-prepare-report.json)
  - MEDIA_PREP_DRY_RUN=1|0 (default: 0)
  - MEDIA_PREP_RENAME=1|0 (default: 1)
*/

import fs from "node:fs/promises"
import path from "node:path"
import { loadEnv } from "@medusajs/framework/utils"

type Row = Record<string, string>

type VariantDef = {
  productHandle: string
  sku: string
  order: number
}

type ProductDef = {
  handle: string
  order: number
}

type SkuMedia = {
  sku: string
  group: string
  skuDir: string
  thumbnailFile?: string
  fullFiles: string[]
  thumbsCount: number
  fullCount: number
  usedFullAsThumbnail: boolean
}

type RenameAction = {
  from: string
  to: string
}

type Report = {
  generated_at: string
  dry_run: boolean
  source_root: string
  products_file: string
  variants_file: string
  prep_report_file: string
  counts: {
    product_handles: number
    variant_skus: number
    sku_media_dirs: number
    sku_media_with_assets: number
    variant_rows_written: number
    product_rows_written: number
  }
  renamed_dirs: RenameAction[]
  rename_conflicts: Array<{ from: string; to: string; reason: string }>
  missing_sku_dirs: string[]
  missing_assets: string[]
  used_full_for_thumbnail: string[]
  empty_product_dirs: string[]
  filename_anomalies: string[]
}

loadEnv(process.env.NODE_ENV || "development", process.cwd())

function asBool(value: string, defaultValue: boolean) {
  const v = (value || "").trim().toLowerCase()
  if (!v) return defaultValue
  if (["1", "true", "yes", "y"].includes(v)) return true
  if (["0", "false", "no", "n"].includes(v)) return false
  return defaultValue
}

function parseDelimited(content: string, delimiter: string) {
  const rows: string[][] = []
  let row: string[] = []
  let field = ""
  let inQuotes = false

  for (let i = 0; i < content.length; i++) {
    const ch = content[i]
    const next = content[i + 1]

    if (inQuotes) {
      if (ch === '"') {
        if (next === '"') {
          field += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        field += ch
      }
      continue
    }

    if (ch === '"') {
      if (field.length === 0) {
        inQuotes = true
      } else {
        field += ch
      }
      continue
    }

    if (ch === delimiter) {
      row.push(field)
      field = ""
      continue
    }

    if (ch === "\n") {
      row.push(field)
      rows.push(row)
      row = []
      field = ""
      continue
    }

    if (ch === "\r") {
      continue
    }

    field += ch
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field)
    rows.push(row)
  }

  return rows.filter((r) => r.some((v) => v.trim().length > 0))
}

async function readTsv(filePath: string) {
  const content = await fs.readFile(filePath, "utf8")
  const table = parseDelimited(content, "\t")
  if (table.length < 2) return []

  const headers = table[0].map((h) => h.trim())
  return table.slice(1).map<Row>((values) => {
    const out: Row = {}
    headers.forEach((header, i) => {
      out[header] = (values[i] || "").trim()
    })
    return out
  })
}

function normalizeSkuSegment(raw: string) {
  let out = raw.trim().toLowerCase()
  if (out.endsWith("-single")) {
    out = out.replace(/-single$/, "-1ct")
  }
  out = out.replace(/^tnc-cbd-bs-/, "tnc-bs-cbd-")
  out = out.replace(/^tnc-cbd-fs-/, "tnc-fs-cbd-")
  return out
}

function normalizePath(p: string) {
  return p.split(path.sep).join("/")
}

async function exists(p: string) {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
}

async function readFilesImmediate(dirPath: string) {
  if (!(await exists(dirPath))) return [] as string[]
  const entries = await fs.readdir(dirPath, { withFileTypes: true })
  return entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((name) => name !== ".DS_Store")
}

function sortByScore(files: string[], scorer: (name: string) => number) {
  return [...files].sort((a, b) => {
    // If files are prefixed with an explicit order token (for example: 01_, 02-),
    // honor that sequence first. This makes gallery ordering deterministic.
    const orderA = getExplicitOrderToken(a)
    const orderB = getExplicitOrderToken(b)
    if (orderA !== null || orderB !== null) {
      if (orderA === null) return 1
      if (orderB === null) return -1
      if (orderA !== orderB) return orderA - orderB
    }

    const score = scorer(b) - scorer(a)
    if (score !== 0) return score
    return a.localeCompare(b)
  })
}

function getExplicitOrderToken(fileName: string) {
  const base = path.basename(fileName)
  const match = base.match(/^(\d{1,3})[ _.-]/)
  if (!match) return null
  const value = Number.parseInt(match[1], 10)
  return Number.isNaN(value) ? null : value
}

function thumbScore(fileName: string) {
  const n = fileName.toLowerCase()
  let s = 0
  if (n.includes("front")) s += 100
  if (n.includes("main")) s += 70
  if (n.includes("thumb")) s += 20
  if (n.includes("back")) s -= 10
  if (n.includes("label") || n.includes("nute") || n.includes("info") || n.includes("ingredient")) s -= 40
  return s
}

function fullScore(fileName: string) {
  const n = fileName.toLowerCase()
  let s = 0
  if (n.includes("front")) s += 100
  if (n.includes("back")) s += 80
  if (n.includes("label") || n.includes("nute")) s += 40
  if (n.includes("info") || n.includes("ingredient")) s += 30
  if (n.includes("thumb")) s -= 50
  return s
}

function toTsv(rows: string[][]) {
  return rows.map((r) => r.join("\t")).join("\n") + "\n"
}

function hasSuspiciousName(name: string) {
  if (/[^A-Za-z0-9._-]/.test(name)) return true
  const n = name.toLowerCase()
  if (n.includes("gummmy") || n.includes("lable") || n.includes("_umb_") || n.includes("thumb_.png")) return true
  return false
}

async function main() {
  const dryRun = asBool(process.env.MEDIA_PREP_DRY_RUN || "", false)
  const renameDirs = asBool(process.env.MEDIA_PREP_RENAME || "", true)

  const sourceRoot = path.resolve(process.cwd(), process.env.MEDIA_SOURCE_ROOT || "docs/thc-site-pictures")
  const productsFile = path.resolve(process.cwd(), process.env.MEDIA_PRODUCTS_FILE || "docs/product-media.tsv")
  const variantsFile = path.resolve(process.cwd(), process.env.MEDIA_VARIANTS_FILE || "docs/variant-media.tsv")
  const prepReportFile = path.resolve(
    process.cwd(),
    process.env.MEDIA_PREP_REPORT_FILE || "docs/media-prepare-report.json"
  )

  const variantListingsFile =
    process.env.SEED_VARIANTS_FILE || path.join(process.cwd(), "docs", "variant-listings.tsv")
  const productListingsFile =
    process.env.SEED_PRODUCTS_FILE || path.join(process.cwd(), "docs", "product-listings.tsv")

  const variantRows = await readTsv(variantListingsFile)
  const productRows = await readTsv(productListingsFile)

  const variantDefs: VariantDef[] = []
  const skuToVariant = new Map<string, VariantDef>()
  const handleToSkus = new Map<string, string[]>()

  for (let i = 0; i < variantRows.length; i++) {
    const row = variantRows[i]
    const productHandle = (row.product_handle || "").trim().toLowerCase()
    const sku = (row.sku || "").trim().toLowerCase()
    if (!productHandle || !sku) continue
    if (skuToVariant.has(sku)) continue

    const variantDef: VariantDef = { productHandle, sku, order: i }
    variantDefs.push(variantDef)
    skuToVariant.set(sku, variantDef)

    if (!handleToSkus.has(productHandle)) {
      handleToSkus.set(productHandle, [])
    }
    handleToSkus.get(productHandle)!.push(sku)
  }

  const productDefs: ProductDef[] = []
  const seenHandles = new Set<string>()
  for (let i = 0; i < productRows.length; i++) {
    const handle = (productRows[i].handle || "").trim().toLowerCase()
    if (!handle || seenHandles.has(handle)) continue
    seenHandles.add(handle)
    productDefs.push({ handle, order: i })
  }

  const renamedDirs: RenameAction[] = []
  const renameConflicts: Array<{ from: string; to: string; reason: string }> = []

  const skuDirMap = new Map<string, { group: string; absPath: string }>()
  const emptyProductDirs: string[] = []
  const filenameAnomalies: string[] = []

  const groupEntries = await fs.readdir(sourceRoot, { withFileTypes: true })
  for (const groupEntry of groupEntries) {
    if (!groupEntry.isDirectory()) continue
    if (groupEntry.name.startsWith(".")) continue

    const group = groupEntry.name
    const productsDir = path.join(sourceRoot, group, "products")
    if (!(await exists(productsDir))) continue

    const skuDirEntries = await fs.readdir(productsDir, { withFileTypes: true })
    for (const skuEntry of skuDirEntries) {
      if (!skuEntry.isDirectory()) continue
      if (skuEntry.name.startsWith(".")) continue

      const originalName = skuEntry.name
      const normalizedName = normalizeSkuSegment(originalName)
      const fromPath = path.join(productsDir, originalName)
      const toPath = path.join(productsDir, normalizedName)

      let finalPath = fromPath
      if (renameDirs && normalizedName !== originalName) {
        if (await exists(toPath)) {
          renameConflicts.push({
            from: normalizePath(path.relative(process.cwd(), fromPath)),
            to: normalizePath(path.relative(process.cwd(), toPath)),
            reason: "target already exists",
          })
          finalPath = toPath
        } else {
          renamedDirs.push({
            from: normalizePath(path.relative(process.cwd(), fromPath)),
            to: normalizePath(path.relative(process.cwd(), toPath)),
          })
          if (!dryRun) {
            await fs.rename(fromPath, toPath)
            finalPath = toPath
          } else {
            // Keep reading from the current path during dry-run.
            finalPath = fromPath
          }
        }
      }

      const finalSku = normalizeSkuSegment(path.basename(finalPath))

      const filesAtRoot = await readFilesImmediate(finalPath)
      if (filesAtRoot.length > 0) {
        emptyProductDirs.push(`${group}/products/${finalSku} (has files at root; expected full/thumbs subfolders)`)
      }

      const fullDir = path.join(finalPath, "full")
      const thumbsDir = path.join(finalPath, "thumbs")

      const fullFiles = await readFilesImmediate(fullDir)
      const thumbFiles = await readFilesImmediate(thumbsDir)

      for (const file of [...fullFiles, ...thumbFiles]) {
        if (hasSuspiciousName(file)) {
          filenameAnomalies.push(`${group}/products/${finalSku}/${file}`)
        }
      }

      if (fullFiles.length === 0 && thumbFiles.length === 0) {
        emptyProductDirs.push(`${group}/products/${finalSku}`)
      }

      if (skuDirMap.has(finalSku)) {
        renameConflicts.push({
          from: `${group}/products/${finalSku}`,
          to: skuDirMap.get(finalSku)!.absPath,
          reason: "duplicate SKU directory across groups",
        })
        continue
      }

      skuDirMap.set(finalSku, { group, absPath: finalPath })
    }
  }

  const skuMediaList: SkuMedia[] = []
  const missingSkuDirs: string[] = []
  const missingAssets: string[] = []
  const usedFullForThumbnail: string[] = []

  const orderedVariants = [...variantDefs].sort((a, b) => a.order - b.order)
  for (const variant of orderedVariants) {
    const sku = variant.sku
    const dirInfo = skuDirMap.get(sku)
    if (!dirInfo) {
      missingSkuDirs.push(sku)
      continue
    }

    const fullDir = path.join(dirInfo.absPath, "full")
    const thumbsDir = path.join(dirInfo.absPath, "thumbs")

    const fullFiles = sortByScore(await readFilesImmediate(fullDir), fullScore)
    const thumbFiles = sortByScore(await readFilesImmediate(thumbsDir), thumbScore)

    let thumbnailFile: string | undefined
    let usedFull = false

    if (thumbFiles.length > 0) {
      thumbnailFile = normalizePath(path.relative(sourceRoot, path.join(thumbsDir, thumbFiles[0])))
    } else if (fullFiles.length > 0) {
      thumbnailFile = normalizePath(path.relative(sourceRoot, path.join(fullDir, fullFiles[0])))
      usedFull = true
      usedFullForThumbnail.push(sku)
    }

    if (!thumbnailFile) {
      missingAssets.push(sku)
      continue
    }

    const fullFilePaths = fullFiles.map((f) => normalizePath(path.relative(sourceRoot, path.join(fullDir, f))))

    skuMediaList.push({
      sku,
      group: dirInfo.group,
      skuDir: normalizePath(path.relative(sourceRoot, dirInfo.absPath)),
      thumbnailFile,
      fullFiles: fullFilePaths,
      thumbsCount: thumbFiles.length,
      fullCount: fullFiles.length,
      usedFullAsThumbnail: usedFull,
    })
  }

  const skuMediaBySku = new Map(skuMediaList.map((m) => [m.sku, m]))

  const variantTsvRows: string[][] = [["product_handle", "sku", "thumbnail_file", "image_files"]]
  for (const variant of orderedVariants) {
    const media = skuMediaBySku.get(variant.sku)
    if (!media?.thumbnailFile) continue
    const variantImages = (media.fullFiles.length > 0 ? media.fullFiles : [media.thumbnailFile]).slice(0, 4)
    variantTsvRows.push([variant.productHandle, variant.sku, media.thumbnailFile, variantImages.join(",")])
  }

  const productTsvRows: string[][] = [["product_handle", "thumbnail_file", "image_files", "replace_images"]]
  for (const product of productDefs.sort((a, b) => a.order - b.order)) {
    const skus = handleToSkus.get(product.handle) || []
    const mediaForHandle = skus.map((sku) => skuMediaBySku.get(sku)).filter(Boolean) as SkuMedia[]
    if (mediaForHandle.length === 0) continue

    const primary = mediaForHandle[0]
    const thumbnail = primary.thumbnailFile || ""

    let gallery = primary.fullFiles.filter(Boolean)
    if (gallery.length === 0 && thumbnail) {
      gallery = [thumbnail]
    }

    gallery = gallery.slice(0, 4)

    productTsvRows.push([
      product.handle,
      thumbnail,
      gallery.join(","),
      "TRUE",
    ])
  }

  if (!dryRun) {
    await fs.mkdir(path.dirname(variantsFile), { recursive: true })
    await fs.writeFile(variantsFile, toTsv(variantTsvRows), "utf8")

    await fs.mkdir(path.dirname(productsFile), { recursive: true })
    await fs.writeFile(productsFile, toTsv(productTsvRows), "utf8")
  }

  const report: Report = {
    generated_at: new Date().toISOString(),
    dry_run: dryRun,
    source_root: normalizePath(path.relative(process.cwd(), sourceRoot)),
    products_file: normalizePath(path.relative(process.cwd(), productsFile)),
    variants_file: normalizePath(path.relative(process.cwd(), variantsFile)),
    prep_report_file: normalizePath(path.relative(process.cwd(), prepReportFile)),
    counts: {
      product_handles: productDefs.length,
      variant_skus: orderedVariants.length,
      sku_media_dirs: skuDirMap.size,
      sku_media_with_assets: skuMediaList.length,
      variant_rows_written: Math.max(variantTsvRows.length - 1, 0),
      product_rows_written: Math.max(productTsvRows.length - 1, 0),
    },
    renamed_dirs: renamedDirs,
    rename_conflicts: renameConflicts,
    missing_sku_dirs: missingSkuDirs,
    missing_assets: missingAssets,
    used_full_for_thumbnail: usedFullForThumbnail,
    empty_product_dirs: emptyProductDirs,
    filename_anomalies: [...new Set(filenameAnomalies)].sort(),
  }

  if (!dryRun) {
    await fs.mkdir(path.dirname(prepReportFile), { recursive: true })
    await fs.writeFile(prepReportFile, JSON.stringify(report, null, 2) + "\n", "utf8")
  }

  console.log(`[media-prepare] source=${report.source_root}`)
  console.log(`[media-prepare] dry_run=${dryRun}`)
  console.log(`[media-prepare] renamed_dirs=${report.renamed_dirs.length}`)
  console.log(`[media-prepare] variant_rows=${report.counts.variant_rows_written}`)
  console.log(`[media-prepare] product_rows=${report.counts.product_rows_written}`)
  console.log(`[media-prepare] missing_sku_dirs=${report.missing_sku_dirs.length}`)
  console.log(`[media-prepare] missing_assets=${report.missing_assets.length}`)
  console.log(`[media-prepare] used_full_for_thumbnail=${report.used_full_for_thumbnail.length}`)
  console.log(`[media-prepare] filename_anomalies=${report.filename_anomalies.length}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
