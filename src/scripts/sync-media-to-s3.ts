/*
  Upload local media assets directly to S3 and assign URLs to Medusa products/variants.

  Defaults:
  - product media file: docs/product-media.tsv
  - variant media file: docs/variant-media.tsv
  - local image root: docs/thc-site-pictures

  Env:
  - MEDIA_TARGET_ENV=dev|prod (optional; overrides backend/token resolution)
  - MEDIA_BACKEND_URL (fallback: SEED_BACKEND_URL, MEDUSA_PROD_BACKEND_URL, MEDUSA_BACKEND_URL)
  - MEDIA_ADMIN_TOKEN (fallback: SEED_ADMIN_TOKEN, MEDUSA_PROD_ADMIN_TOKEN, MEDUSA_ADMIN_TOKEN, MEDUSA_DEV_ADMIN_TOKEN)
  - MEDIA_DRY_RUN=1|0 (default: 1)
  - MEDIA_STRICT=1|0 (default: 1)
  - MEDIA_PRODUCTS_FILE (optional override)
  - MEDIA_VARIANTS_FILE (optional override)
  - MEDIA_IMAGES_ROOT (optional override, default: docs/thc-site-pictures)
  - MEDIA_S3_PREFIX (default: catalog)
  - MEDIA_S3_OBJECT_ACL (default: public-read; set empty to skip ACL)
  - MEDIA_PUBLIC_BASE_URL (optional override; fallback: S3_FILE_URL or inferred from S3 config)
  - MEDIA_WRITE_METADATA=1|0 (default: 1)
  - MEDIA_LOG_FILE (optional output path)
  - MEDIA_REPORT_FILE (optional output path)

  Required S3 env:
  - S3_BUCKET
  - S3_REGION
  - S3_ACCESS_KEY_ID
  - S3_SECRET_ACCESS_KEY
  - S3_ENDPOINT (optional)

  TSV schema (product-media.tsv):
  - product_handle
  - thumbnail_file (optional)
  - image_files (optional, comma-separated list)
  - replace_images (optional; default true)

  TSV schema (variant-media.tsv):
  - product_handle
  - sku
  - thumbnail_file
  - image_files (optional, comma-separated list of variant-specific gallery assets)
*/

import fs from "node:fs/promises"
import path from "node:path"
import Medusa from "@medusajs/js-sdk"
import { loadEnv } from "@medusajs/framework/utils"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"

type Row = Record<string, string>

type ProductMediaRow = {
  product_handle: string
  thumbnail_file: string
  image_files: string
  replace_images: string
}

type VariantMediaRow = {
  product_handle: string
  sku: string
  thumbnail_file: string
  image_files: string
}

type ProductRecord = {
  id: string
  handle: string
  thumbnail?: string | null
  images?: Array<{ id?: string; url: string }>
  metadata?: Record<string, unknown> | null
}

type VariantRecord = {
  id: string
  sku?: string | null
  metadata?: Record<string, unknown> | null
}

type Action = {
  entity: "product" | "variant" | "upload"
  target: string
  mode: "upload" | "update" | "skip" | "link"
  detail?: string
  dryRun: boolean
}

loadEnv(process.env.NODE_ENV || "development", process.cwd())

type MediaTargetName = "dev" | "prod" | "legacy"

function reqEnv(primary: string, fallback: string[] = []) {
  const names = [primary, ...fallback]
  for (const name of names) {
    const value = process.env[name]
    if (value) return value
  }
  throw new Error(`Missing env: ${names.join(" or ")}`)
}

function asBool(value: string, defaultValue: boolean) {
  const v = (value || "").trim().toLowerCase()
  if (!v) return defaultValue
  if (["1", "true", "yes", "y"].includes(v)) return true
  if (["0", "false", "no", "n"].includes(v)) return false
  return defaultValue
}

function splitCsv(value: string) {
  return (value || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
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

function ensureTrailingSlashRemoved(input: string) {
  return input.replace(/\/+$/, "")
}

function resolveMediaTarget() {
  const targetEnv = (process.env.MEDIA_TARGET_ENV || "").trim().toLowerCase()

  if (targetEnv === "dev" || targetEnv === "development") {
    return {
      name: "dev" as MediaTargetName,
      backendUrl: ensureTrailingSlashRemoved(reqEnv("MEDUSA_DEV_BACKEND_URL", ["MEDUSA_BACKEND_URL"])),
      adminToken: reqEnv("MEDUSA_DEV_ADMIN_TOKEN", ["MEDUSA_ADMIN_TOKEN"]),
    }
  }

  if (targetEnv === "prod" || targetEnv === "production") {
    return {
      name: "prod" as MediaTargetName,
      backendUrl: ensureTrailingSlashRemoved(reqEnv("MEDUSA_PROD_BACKEND_URL", ["MEDUSA_BACKEND_URL"])),
      adminToken: reqEnv("MEDUSA_PROD_ADMIN_TOKEN", ["MEDUSA_ADMIN_TOKEN"]),
    }
  }

  if (targetEnv) {
    throw new Error(`Invalid MEDIA_TARGET_ENV="${targetEnv}". Expected dev or prod.`)
  }

  return {
    name: "legacy" as MediaTargetName,
    backendUrl: ensureTrailingSlashRemoved(
      reqEnv("MEDIA_BACKEND_URL", ["SEED_BACKEND_URL", "MEDUSA_PROD_BACKEND_URL", "MEDUSA_BACKEND_URL"])
    ),
    adminToken: reqEnv("MEDIA_ADMIN_TOKEN", [
      "SEED_ADMIN_TOKEN",
      "MEDUSA_PROD_ADMIN_TOKEN",
      "MEDUSA_ADMIN_TOKEN",
      "MEDUSA_DEV_ADMIN_TOKEN",
    ]),
  }
}

function safeSegment(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function encodeKeyForUrl(key: string) {
  return key
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/")
}

function inferContentType(fileName: string) {
  const ext = path.extname(fileName).toLowerCase()
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg"
    case ".png":
      return "image/png"
    case ".webp":
      return "image/webp"
    case ".gif":
      return "image/gif"
    case ".avif":
      return "image/avif"
    case ".svg":
      return "image/svg+xml"
    default:
      return "application/octet-stream"
  }
}

function buildPublicBaseUrl(bucket: string, region: string, endpoint?: string) {
  if (process.env.MEDIA_PUBLIC_BASE_URL) {
    return ensureTrailingSlashRemoved(process.env.MEDIA_PUBLIC_BASE_URL)
  }

  if (process.env.S3_FILE_URL) {
    return ensureTrailingSlashRemoved(process.env.S3_FILE_URL)
  }

  const normalizedEndpoint = endpoint ? ensureTrailingSlashRemoved(endpoint) : ""

  if (!normalizedEndpoint) {
    return `https://${bucket}.s3.${region}.amazonaws.com`
  }

  if (normalizedEndpoint.includes("amazonaws.com")) {
    return `https://${bucket}.s3.${region}.amazonaws.com`
  }

  return `${normalizedEndpoint}/${bucket}`
}

function isUrl(value: string) {
  return /^https?:\/\//i.test(value.trim())
}

async function exists(filePath: string) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

function buildProductKey(prefix: string, handle: string, kind: "thumbnail" | "gallery", fileName: string) {
  const ext = path.extname(fileName).toLowerCase() || ".bin"
  const base = path.basename(fileName, ext)
  const cleanBase = safeSegment(base) || "asset"
  return `${prefix}/products/${safeSegment(handle)}/${kind}/${cleanBase}${ext}`
}

function buildVariantKey(prefix: string, handle: string, sku: string, fileName: string) {
  const ext = path.extname(fileName).toLowerCase() || ".bin"
  const base = path.basename(fileName, ext)
  const cleanBase = safeSegment(base) || "asset"
  return `${prefix}/products/${safeSegment(handle)}/variants/${safeSegment(sku)}/thumbnail/${cleanBase}${ext}`
}

function buildVariantGalleryKey(prefix: string, handle: string, sku: string, fileName: string) {
  const ext = path.extname(fileName).toLowerCase() || ".bin"
  const base = path.basename(fileName, ext)
  const cleanBase = safeSegment(base) || "asset"
  return `${prefix}/products/${safeSegment(handle)}/variants/${safeSegment(sku)}/gallery/${cleanBase}${ext}`
}

async function main() {
  const mediaTarget = resolveMediaTarget()
  const backendUrl = mediaTarget.backendUrl
  const adminToken = mediaTarget.adminToken

  const strict = asBool(process.env.MEDIA_STRICT || "", true)
  const dryRun = asBool(process.env.MEDIA_DRY_RUN || "", true)
  const writeMetadata = asBool(process.env.MEDIA_WRITE_METADATA || "", true)

  const productsFile =
    process.env.MEDIA_PRODUCTS_FILE || path.join(process.cwd(), "docs", "product-media.tsv")
  const variantsFile =
    process.env.MEDIA_VARIANTS_FILE || path.join(process.cwd(), "docs", "variant-media.tsv")
  const imagesRoot = process.env.MEDIA_IMAGES_ROOT || path.join(process.cwd(), "docs", "thc-site-pictures")

  const prefix = (process.env.MEDIA_S3_PREFIX || "catalog").replace(/^\/+|\/+$/g, "")
  const objectAcl = (process.env.MEDIA_S3_OBJECT_ACL ?? "public-read").trim()

  const s3Bucket = reqEnv("S3_BUCKET")
  const s3Region = reqEnv("S3_REGION")
  const s3AccessKeyId = reqEnv("S3_ACCESS_KEY_ID")
  const s3SecretAccessKey = reqEnv("S3_SECRET_ACCESS_KEY")
  const s3Endpoint = process.env.S3_ENDPOINT
  const publicBaseUrl = buildPublicBaseUrl(s3Bucket, s3Region, s3Endpoint)

  const defaultLogPath = dryRun
    ? path.join(process.cwd(), "docs", "media-sync-dry-run.log")
    : path.join(process.cwd(), "docs", "media-sync.log")
  const defaultReportPath = dryRun
    ? path.join(process.cwd(), "docs", "media-sync-dry-run.json")
    : path.join(process.cwd(), "docs", "media-sync.json")

  const logFile = process.env.MEDIA_LOG_FILE || defaultLogPath
  const reportFile = process.env.MEDIA_REPORT_FILE || defaultReportPath

  const logs: string[] = []
  const actions: Action[] = []
  const errors: string[] = []

  let productsUpdated = 0
  let variantsUpdated = 0
  let variantMediaLinked = 0
  let uploadsCreated = 0
  let uploadsReused = 0

  const info = (message: string) => {
    logs.push(message)
    console.log(message)
  }

  const warn = (message: string) => {
    logs.push(`[warn] ${message}`)
    console.warn(message)
  }

  const fail = (message: string) => {
    errors.push(message)
    if (strict) throw new Error(message)
    warn(message)
  }

  const sdk = new Medusa({ baseUrl: backendUrl, apiKey: adminToken })
  const s3Client = new S3Client({
    region: s3Region,
    endpoint: s3Endpoint || undefined,
    forcePathStyle: !!s3Endpoint && !s3Endpoint.includes("amazonaws.com"),
    credentials: {
      accessKeyId: s3AccessKeyId,
      secretAccessKey: s3SecretAccessKey,
    },
  })

  const uploadCache = new Map<string, string>()
  const productCache = new Map<string, ProductRecord>()
  const variantsByProductIdCache = new Map<string, Map<string, VariantRecord>>()
  type ProductMediaState = {
    images: Array<{ id: string; url: string }>
    imageIdByUrl: Map<string, string>
    variantImageIds: Map<string, Set<string>>
  }

  const productMediaStateCache = new Map<string, ProductMediaState>()

  const resolveLocalPath = (fileRef: string) => {
    if (isUrl(fileRef)) return fileRef
    const input = fileRef.trim()
    return path.isAbsolute(input) ? input : path.join(imagesRoot, input)
  }

  const uploadFile = async (
    sourceRef: string,
    key: string,
    targetLabel: string
  ): Promise<{ url: string; fileName: string; key?: string }> => {
    const source = sourceRef.trim()
    if (!source) {
      throw new Error(`Empty file reference for ${targetLabel}`)
    }

    if (isUrl(source)) {
      return {
        url: source,
        fileName: path.basename(new URL(source).pathname),
      }
    }

    const absolutePath = resolveLocalPath(source)

    if (uploadCache.has(absolutePath)) {
      uploadsReused++
      const cachedUrl = uploadCache.get(absolutePath)!
      actions.push({
        entity: "upload",
        target: targetLabel,
        mode: "skip",
        detail: `reused ${cachedUrl}`,
        dryRun,
      })
      return { url: cachedUrl, fileName: path.basename(absolutePath), key }
    }

    if (!(await exists(absolutePath))) {
      throw new Error(`File not found: ${absolutePath}`)
    }

    const fileBuffer = await fs.readFile(absolutePath)
    const contentType = inferContentType(absolutePath)
    const publicUrl = `${publicBaseUrl}/${encodeKeyForUrl(key)}`

    actions.push({
      entity: "upload",
      target: targetLabel,
      mode: dryRun ? "skip" : "upload",
      detail: `${absolutePath} -> ${publicUrl}`,
      dryRun,
    })

    if (!dryRun) {
      await s3Client.send(
        new PutObjectCommand({
          Bucket: s3Bucket,
          Key: key,
          Body: fileBuffer,
          ContentType: contentType,
          CacheControl: "public, max-age=31536000, immutable",
          ...(objectAcl ? { ACL: objectAcl as any } : {}),
        })
      )
      uploadsCreated++
    }

    uploadCache.set(absolutePath, publicUrl)
    return { url: publicUrl, fileName: path.basename(absolutePath), key }
  }

  const fetchProductByHandle = async (handle: string): Promise<ProductRecord> => {
    const cacheKey = handle.toLowerCase()
    if (productCache.has(cacheKey)) {
      return productCache.get(cacheKey)!
    }

    const result = await sdk.client.fetch<{ products: ProductRecord[] }>("/admin/products", {
      method: "GET",
      query: { handle, limit: 1 },
    })

    const product = result.products?.[0]
    if (!product) {
      throw new Error(`No product found for handle: ${handle}`)
    }

    productCache.set(cacheKey, product)
    return product
  }

  const getProductMediaState = async (productId: string) => {
    if (productMediaStateCache.has(productId)) {
      return productMediaStateCache.get(productId)!
    }

    const current = await sdk.admin.product.retrieve(productId, {
      fields: "id,handle,thumbnail,metadata,images.id,images.url,+images.variants.id,variants.id",
    })

    const images = (current.product?.images || [])
      .filter((img: any) => !!img?.id && !!img?.url)
      .map((img: any) => ({ id: img.id as string, url: img.url as string }))

    const imageIdByUrl = new Map(images.map((img) => [img.url, img.id] as const))
    const variantImageIds = new Map<string, Set<string>>()

    for (const variant of current.product?.variants || []) {
      if (variant?.id) {
        variantImageIds.set(variant.id, new Set<string>())
      }
    }

    for (const image of current.product?.images || []) {
      const imageId = image?.id
      if (!imageId) continue

      const scopedVariants = (image as any).variants || []
      for (const scopedVariant of scopedVariants) {
        const variantId = scopedVariant?.id as string | undefined
        if (!variantId) continue
        if (!variantImageIds.has(variantId)) {
          variantImageIds.set(variantId, new Set<string>())
        }
        variantImageIds.get(variantId)!.add(imageId)
      }
    }

    const state: ProductMediaState = {
      images,
      imageIdByUrl,
      variantImageIds,
    }

    productMediaStateCache.set(productId, state)
    return state
  }

  const ensureProductHasImageUrls = async (product: ProductRecord, urls: string[]) => {
    let state = await getProductMediaState(product.id)
    const uniqueUrls = [...new Set(urls.filter(Boolean))]
    const missingUrls = uniqueUrls.filter((url) => !state.imageIdByUrl.has(url))

    if (missingUrls.length === 0) {
      return state
    }

    const mergedImages = uniqueImagesByUrl([
      ...state.images.map((img) => ({ url: img.url })),
      ...missingUrls.map((url) => ({ url })),
    ])

    await sdk.admin.product.update(product.id, {
      images: mergedImages,
    })

    productMediaStateCache.delete(product.id)
    state = await getProductMediaState(product.id)
    return state
  }

  const fetchVariantsByProductId = async (productId: string) => {
    if (variantsByProductIdCache.has(productId)) {
      return variantsByProductIdCache.get(productId)!
    }

    const result = await sdk.client.fetch<{ variants: VariantRecord[] }>(`/admin/products/${productId}/variants`, {
      method: "GET",
      query: { limit: 300 },
    })

    const bySku = new Map<string, VariantRecord>()
    for (const variant of result.variants || []) {
      const sku = (variant.sku || "").trim().toLowerCase()
      if (!sku) continue
      if (!bySku.has(sku)) {
        bySku.set(sku, variant)
      }
    }

    variantsByProductIdCache.set(productId, bySku)
    return bySku
  }

  const uniqueImagesByUrl = (images: Array<{ id?: string; url: string }>) => {
    const seen = new Set<string>()
    const out: Array<{ id?: string; url: string }> = []
    for (const image of images) {
      if (!image?.url) continue
      if (seen.has(image.url)) continue
      seen.add(image.url)
      out.push(image)
    }
    return out
  }

  const productRows = (await readTsv(productsFile)).map((row) => row as unknown as ProductMediaRow)
  const variantRows = (await readTsv(variantsFile)).map((row) => row as unknown as VariantMediaRow)

  info(`[media-sync] backend=${backendUrl}`)
  info(`[media-sync] target_env=${mediaTarget.name}`)
  info(`[media-sync] products file=${productsFile}`)
  info(`[media-sync] variants file=${variantsFile}`)
  info(`[media-sync] images root=${imagesRoot}`)
  info(`[media-sync] dry_run=${dryRun}`)

  for (const row of productRows) {
    const handle = (row.product_handle || "").trim()
    if (!handle) {
      fail(`product-media row missing product_handle`)
      continue
    }

    try {
      const product = await fetchProductByHandle(handle)
      const replaceImages = asBool(row.replace_images || "", true)

      let nextThumbnail: string | undefined
      const nextImageUrls: string[] = []
      const imageFileNames: string[] = []

      const thumbnailRef = (row.thumbnail_file || "").trim()
      if (thumbnailRef) {
        const thumbnailKey = buildProductKey(prefix, handle, "thumbnail", path.basename(thumbnailRef))
        const uploaded = await uploadFile(thumbnailRef, thumbnailKey, `product:${handle}:thumbnail`)
        nextThumbnail = uploaded.url
      }

      const galleryRefs = splitCsv(row.image_files || "")
      for (const imageRef of galleryRefs) {
        const galleryKey = buildProductKey(prefix, handle, "gallery", path.basename(imageRef))
        const uploaded = await uploadFile(imageRef, galleryKey, `product:${handle}:image`)
        nextImageUrls.push(uploaded.url)
        imageFileNames.push(uploaded.fileName)
      }

      if (!nextThumbnail && nextImageUrls.length === 0) {
        actions.push({
          entity: "product",
          target: handle,
          mode: "skip",
          detail: "no thumbnail_file or image_files",
          dryRun,
        })
        continue
      }

      const existingImages = (product.images || []).map((img) => ({ id: img.id, url: img.url }))
      const mergedImages = replaceImages
        ? nextImageUrls.map((url) => ({ url }))
        : uniqueImagesByUrl([
            ...existingImages,
            ...nextImageUrls.map((url) => ({ url })),
          ])

      const body: Record<string, unknown> = {}

      if (nextThumbnail) {
        body.thumbnail = nextThumbnail
      }

      if (nextImageUrls.length > 0 || replaceImages) {
        body.images = mergedImages
      }

      if (writeMetadata) {
        const meta = { ...(product.metadata || {}) }
        if (thumbnailRef) {
          meta.media_thumbnail_filename = path.basename(thumbnailRef)
        }
        if (imageFileNames.length) {
          meta.media_gallery_filenames = imageFileNames.join(",")
        }
        body.metadata = meta
      }

      actions.push({
        entity: "product",
        target: handle,
        mode: dryRun ? "skip" : "update",
        detail: `thumbnail=${!!nextThumbnail}, images=${nextImageUrls.length}, replace_images=${replaceImages}`,
        dryRun,
      })

      if (!dryRun) {
        const updated = await sdk.admin.product.update(product.id, body)
        productCache.set(handle.toLowerCase(), {
          id: updated.product.id,
          handle: updated.product.handle,
          thumbnail: updated.product.thumbnail,
          images: (updated.product.images || []).map((img: any) => ({ id: img.id, url: img.url })),
          metadata: updated.product.metadata || {},
        })
        productMediaStateCache.delete(product.id)
        productsUpdated++
      }
    } catch (e) {
      fail(`product ${handle}: ${(e as Error).message}`)
    }
  }

  type PreparedVariantSync = {
    product: ProductRecord
    variant: VariantRecord
    sku: string
    desiredUrls: string[]
  }

  const preparedVariantSyncs: PreparedVariantSync[] = []
  const desiredUrlsByProductId = new Map<string, Set<string>>()

  for (const row of variantRows) {
    const handle = (row.product_handle || "").trim()
    const sku = (row.sku || "").trim()
    const thumbnailRef = (row.thumbnail_file || "").trim()
    const variantImageRefs = splitCsv(row.image_files || "")

    if (!handle || !sku || !thumbnailRef) {
      fail(`variant-media row must include product_handle, sku, thumbnail_file`)
      continue
    }

    try {
      const product = await fetchProductByHandle(handle)
      const variantsBySku = await fetchVariantsByProductId(product.id)
      const variant = variantsBySku.get(sku.toLowerCase())
      if (!variant) {
        throw new Error(`No variant found for sku ${sku} on product ${handle}`)
      }

      const key = buildVariantKey(prefix, handle, sku, path.basename(thumbnailRef))
      const uploaded = await uploadFile(thumbnailRef, key, `variant:${sku}:thumbnail`)
      const variantImageUrls: string[] = []
      const variantImageFileNames: string[] = []

      for (const imageRef of variantImageRefs) {
        const imageKey = buildVariantGalleryKey(prefix, handle, sku, path.basename(imageRef))
        const imageUpload = await uploadFile(imageRef, imageKey, `variant:${sku}:image`)
        variantImageUrls.push(imageUpload.url)
        variantImageFileNames.push(imageUpload.fileName)
      }

      const body: Record<string, unknown> = {
        thumbnail: uploaded.url,
      }

      if (writeMetadata) {
        body.metadata = {
          ...(variant.metadata || {}),
          media_thumbnail_filename: uploaded.fileName,
          ...(variantImageFileNames.length
            ? { media_variant_image_filenames: variantImageFileNames.join(",") }
            : {}),
        }
      }

      actions.push({
        entity: "variant",
        target: sku,
        mode: dryRun ? "skip" : "update",
        detail: `product_handle=${handle}`,
        dryRun,
      })

      if (!dryRun) {
        await sdk.admin.product.updateVariant(product.id, variant.id, body)
        variantsUpdated++
      }

      const desiredUrls = [...new Set(variantImageUrls.length ? variantImageUrls : [uploaded.url])]
      preparedVariantSyncs.push({
        product,
        variant,
        sku,
        desiredUrls,
      })

      if (!desiredUrlsByProductId.has(product.id)) {
        desiredUrlsByProductId.set(product.id, new Set<string>())
      }
      const desiredSet = desiredUrlsByProductId.get(product.id)!
      for (const url of desiredUrls) {
        desiredSet.add(url)
      }
    } catch (e) {
      fail(`variant ${sku}: ${(e as Error).message}`)
    }
  }

  if (!dryRun) {
    for (const [productId, desiredSet] of desiredUrlsByProductId.entries()) {
      const prepared = preparedVariantSyncs.find((entry) => entry.product.id === productId)
      if (!prepared) continue
      await ensureProductHasImageUrls(prepared.product, [...desiredSet])
    }

    for (const prepared of preparedVariantSyncs) {
      try {
        const state = await getProductMediaState(prepared.product.id)
        const desiredImageIds = prepared.desiredUrls
          .map((url) => state.imageIdByUrl.get(url))
          .filter((id: string | undefined): id is string => !!id)

        const currentImageIds = state.variantImageIds.get(prepared.variant.id) || new Set<string>()
        const add = desiredImageIds.filter((id) => !currentImageIds.has(id))
        const remove = [...currentImageIds].filter((id) => !desiredImageIds.includes(id))

        if (add.length || remove.length) {
          await sdk.admin.product.batchVariantImages(prepared.product.id, prepared.variant.id, { add, remove })
          productMediaStateCache.delete(prepared.product.id)
          actions.push({
            entity: "variant",
            target: prepared.sku,
            mode: "link",
            detail: `added=${add.length}, removed=${remove.length}`,
            dryRun,
          })
          variantMediaLinked++
        }
      } catch (e) {
        fail(`variant ${prepared.sku}: ${(e as Error).message}`)
      }
    }
  }

  const summary = {
    dry_run: dryRun,
    strict,
    backend_url: backendUrl,
    products_file: productsFile,
    variants_file: variantsFile,
    images_root: imagesRoot,
    s3_bucket: s3Bucket,
    s3_prefix: prefix,
    public_base_url: publicBaseUrl,
    products_updated: productsUpdated,
    variants_updated: variantsUpdated,
    variant_media_linked: variantMediaLinked,
    uploads_created: uploadsCreated,
    uploads_reused: uploadsReused,
    errors_count: errors.length,
  }

  info(`[media-sync] complete ${JSON.stringify(summary)}`)

  await fs.mkdir(path.dirname(logFile), { recursive: true })
  await fs.writeFile(logFile, `${logs.join("\n")}\n`, "utf8")

  await fs.mkdir(path.dirname(reportFile), { recursive: true })
  await fs.writeFile(
    reportFile,
    JSON.stringify(
      {
        generated_at: new Date().toISOString(),
        summary,
        errors,
        actions,
      },
      null,
      2
    ),
    "utf8"
  )

  if (errors.length && strict) {
    throw new Error(`media sync completed with ${errors.length} error(s)`)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
