/*
  Garbage-collect unreferenced media objects in S3.

  What it does:
  - Reads all product/variant media URLs currently referenced by Medusa.
  - Lists objects in S3 under MEDIA_GC_PREFIX (default: {MEDIA_S3_PREFIX}/products).
  - Deletes objects that are not referenced.

  Env:
  - MEDIA_TARGET_ENV=dev|prod (optional; overrides backend/token resolution)
  - MEDIA_BACKEND_URL (fallback: SEED_BACKEND_URL, MEDUSA_PROD_BACKEND_URL, MEDUSA_BACKEND_URL)
  - MEDIA_ADMIN_TOKEN (fallback: SEED_ADMIN_TOKEN, MEDUSA_PROD_ADMIN_TOKEN, MEDUSA_ADMIN_TOKEN, MEDUSA_DEV_ADMIN_TOKEN)
  - MEDIA_GC_DRY_RUN=1|0 (default: 1)
  - MEDIA_GC_STRICT=1|0 (default: 1)
  - MEDIA_S3_PREFIX (default: catalog)
  - MEDIA_GC_PREFIX (optional override; default: {MEDIA_S3_PREFIX}/products)
  - MEDIA_PUBLIC_BASE_URL (optional override; fallback: S3_FILE_URL or inferred from S3 config)
  - MEDIA_GC_DELETE_BATCH (default: 500; max: 1000)
  - MEDIA_GC_ALLOW_ZERO_REFERENCES=1|0 (default: 0; safety guard for apply mode)
  - MEDIA_GC_LOG_FILE (optional output path)
  - MEDIA_GC_REPORT_FILE (optional output path)

  Required S3 env:
  - S3_BUCKET
  - S3_REGION
  - S3_ACCESS_KEY_ID
  - S3_SECRET_ACCESS_KEY
  - S3_ENDPOINT (optional)
*/

import fs from "node:fs/promises"
import path from "node:path"
import Medusa from "@medusajs/js-sdk"
import { loadEnv } from "@medusajs/framework/utils"
import { DeleteObjectsCommand, ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3"

type ProductListRow = { id: string }
type ProductRecord = {
  id: string
  handle?: string
  thumbnail?: string | null
  images?: Array<{ url?: string | null }>
  variants?: Array<{
    id: string
    thumbnail?: string | null
    images?: Array<{ url?: string | null }>
  }>
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

function encodeKeyForUrl(key: string) {
  return key
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/")
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

function normalizeComparableUrl(raw: string) {
  try {
    const url = new URL(raw.trim())
    const decodedPath = decodeURIComponent(url.pathname).replace(/\/+$/, "")
    return `${url.origin}${decodedPath}`.toLowerCase()
  } catch {
    return raw.trim().replace(/\/+$/, "").toLowerCase()
  }
}

function extractS3KeyFromUrl(raw: string, bucket: string, publicBaseUrl: string) {
  try {
    const url = new URL(raw.trim())
    const decodedPath = decodeURIComponent(url.pathname)
    const base = new URL(publicBaseUrl)
    const basePath = decodeURIComponent(base.pathname).replace(/\/+$/, "")

    if (url.origin === base.origin) {
      if (basePath && decodedPath.startsWith(`${basePath}/`)) {
        return decodedPath.slice(basePath.length + 1).replace(/^\/+/, "")
      }
      if (!basePath) {
        return decodedPath.replace(/^\/+/, "")
      }
    }

    if (decodedPath.startsWith(`/${bucket}/`)) {
      return decodedPath.slice(bucket.length + 2).replace(/^\/+/, "")
    }

    if (url.hostname.startsWith(`${bucket}.`) && decodedPath.startsWith("/")) {
      return decodedPath.slice(1)
    }

    return null
  } catch {
    return null
  }
}

function chunk<T>(items: T[], size: number) {
  const out: T[][] = []
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size))
  }
  return out
}

async function main() {
  const mediaTarget = resolveMediaTarget()
  const backendUrl = mediaTarget.backendUrl
  const adminToken = mediaTarget.adminToken

  const dryRun = asBool(process.env.MEDIA_GC_DRY_RUN || "", true)
  const strict = asBool(process.env.MEDIA_GC_STRICT || "", true)
  const allowZeroReferencesDelete = asBool(process.env.MEDIA_GC_ALLOW_ZERO_REFERENCES || "", false)

  const s3Bucket = reqEnv("S3_BUCKET")
  const s3Region = reqEnv("S3_REGION")
  const s3AccessKeyId = reqEnv("S3_ACCESS_KEY_ID")
  const s3SecretAccessKey = reqEnv("S3_SECRET_ACCESS_KEY")
  const s3Endpoint = process.env.S3_ENDPOINT
  const publicBaseUrl = buildPublicBaseUrl(s3Bucket, s3Region, s3Endpoint)
  const mediaPrefix = (process.env.MEDIA_S3_PREFIX || "catalog").replace(/^\/+|\/+$/g, "")
  const gcPrefix = (process.env.MEDIA_GC_PREFIX || `${mediaPrefix}/products`).replace(/^\/+|\/+$/g, "")

  const deleteBatch = Math.max(1, Math.min(1000, Number.parseInt(process.env.MEDIA_GC_DELETE_BATCH || "500", 10)))

  const defaultLogPath = dryRun
    ? path.join(process.cwd(), "docs", "media-s3-gc-dry-run.log")
    : path.join(process.cwd(), "docs", "media-s3-gc.log")
  const defaultReportPath = dryRun
    ? path.join(process.cwd(), "docs", "media-s3-gc-dry-run.json")
    : path.join(process.cwd(), "docs", "media-s3-gc.json")
  const logFile = process.env.MEDIA_GC_LOG_FILE || defaultLogPath
  const reportFile = process.env.MEDIA_GC_REPORT_FILE || defaultReportPath

  const logs: string[] = []
  const errors: string[] = []

  const info = (message: string) => {
    logs.push(message)
    console.log(message)
  }

  const fail = (message: string) => {
    errors.push(message)
    if (strict) throw new Error(message)
    logs.push(`[warn] ${message}`)
    console.warn(message)
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

  info(`[media-s3-gc] backend=${backendUrl}`)
  info(`[media-s3-gc] target_env=${mediaTarget.name}`)
  info(`[media-s3-gc] dry_run=${dryRun}`)
  info(`[media-s3-gc] allow_zero_references_delete=${allowZeroReferencesDelete}`)
  info(`[media-s3-gc] bucket=${s3Bucket}`)
  info(`[media-s3-gc] gc_prefix=${gcPrefix}`)

  const productIds: string[] = []
  let offset = 0
  const limit = 100

  while (true) {
    const list = await sdk.client.fetch<{ products: ProductListRow[] }>("/admin/products", {
      method: "GET",
      query: { fields: "id", limit, offset },
    })
    const batch = list.products || []
    if (!batch.length) break
    productIds.push(...batch.map((p) => p.id).filter(Boolean))
    if (batch.length < limit) break
    offset += batch.length
  }

  info(`[media-s3-gc] products_found=${productIds.length}`)

  const referencedUrls = new Set<string>()

  for (const productId of productIds) {
    try {
      const response = await sdk.admin.product.retrieve(productId, {
        fields: "id,handle,thumbnail,images.url,variants.id,variants.thumbnail,variants.images.url",
      })
      const product = response.product as ProductRecord

      const addUrl = (url?: string | null) => {
        const value = (url || "").trim()
        if (!/^https?:\/\//i.test(value)) return
        referencedUrls.add(value)
      }

      addUrl(product.thumbnail)
      for (const image of product.images || []) {
        addUrl(image.url)
      }
      for (const variant of product.variants || []) {
        addUrl(variant.thumbnail)
        for (const image of variant.images || []) {
          addUrl(image.url)
        }
      }
    } catch (e) {
      fail(`failed to read product ${productId}: ${(e as Error).message}`)
    }
  }

  const normalizedReferencedUrls = new Set([...referencedUrls].map((url) => normalizeComparableUrl(url)))
  const referencedKeys = new Set<string>()
  for (const url of referencedUrls) {
    const key = extractS3KeyFromUrl(url, s3Bucket, publicBaseUrl)
    if (key) referencedKeys.add(key)
  }

  info(`[media-s3-gc] referenced_urls=${referencedUrls.size}`)
  info(`[media-s3-gc] referenced_keys=${referencedKeys.size}`)

  const objectKeys: string[] = []
  let continuationToken: string | undefined

  while (true) {
    const page = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: s3Bucket,
        Prefix: gcPrefix,
        ContinuationToken: continuationToken,
      })
    )
    for (const object of page.Contents || []) {
      if (object.Key) objectKeys.push(object.Key)
    }
    if (!page.IsTruncated || !page.NextContinuationToken) break
    continuationToken = page.NextContinuationToken
  }

  info(`[media-s3-gc] objects_scanned=${objectKeys.length}`)

  const keepKeys: string[] = []
  const deleteKeys: string[] = []

  for (const key of objectKeys) {
    if (referencedKeys.has(key)) {
      keepKeys.push(key)
      continue
    }

    const encodedUrl = `${publicBaseUrl}/${encodeKeyForUrl(key)}`
    const encodedMatch = normalizedReferencedUrls.has(normalizeComparableUrl(encodedUrl))

    if (encodedMatch) {
      keepKeys.push(key)
      continue
    }

    deleteKeys.push(key)
  }

  info(`[media-s3-gc] keep_keys=${keepKeys.length}`)
  info(`[media-s3-gc] delete_candidates=${deleteKeys.length}`)

  if (!dryRun && !allowZeroReferencesDelete && referencedUrls.size === 0 && deleteKeys.length > 0) {
    throw new Error(
      "Refusing to delete S3 objects because referenced_urls=0. Set MEDIA_GC_ALLOW_ZERO_REFERENCES=1 to override."
    )
  }

  let deletedCount = 0
  if (!dryRun && deleteKeys.length) {
    const batches = chunk(deleteKeys, deleteBatch)
    for (const batch of batches) {
      const response = await s3Client.send(
        new DeleteObjectsCommand({
          Bucket: s3Bucket,
          Delete: {
            Objects: batch.map((key) => ({ Key: key })),
            Quiet: true,
          },
        })
      )

      const deleteErrors = response.Errors || []
      deletedCount += Math.max(0, batch.length - deleteErrors.length)

      if (deleteErrors.length) {
        fail(`delete batch returned ${deleteErrors.length} error(s)`)
      }
    }
  }

  const summary = {
    dry_run: dryRun,
    strict,
    target_env: mediaTarget.name,
    allow_zero_references_delete: allowZeroReferencesDelete,
    backend_url: backendUrl,
    bucket: s3Bucket,
    gc_prefix: gcPrefix,
    public_base_url: publicBaseUrl,
    products_found: productIds.length,
    referenced_urls: referencedUrls.size,
    referenced_keys: referencedKeys.size,
    objects_scanned: objectKeys.length,
    objects_kept: keepKeys.length,
    delete_candidates: deleteKeys.length,
    deleted: dryRun ? 0 : deletedCount,
    errors_count: errors.length,
  }

  info(`[media-s3-gc] complete ${JSON.stringify(summary)}`)

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
        keep_keys_sample: keepKeys.slice(0, 100),
        delete_keys: deleteKeys,
      },
      null,
      2
    ) + "\n",
    "utf8"
  )

  if (errors.length && strict) {
    throw new Error(`media s3 gc completed with ${errors.length} error(s)`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
