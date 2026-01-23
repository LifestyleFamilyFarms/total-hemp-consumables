import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const service = req.scope.resolve("salesStores") as {
    listSalesStores: (
      selector?: Record<string, unknown>,
      config?: Record<string, unknown>
    ) => Promise<unknown[]>
    countSalesStores?: (selector?: Record<string, unknown>) => Promise<number>
  }

  const q = typeof req.query?.q === "string" ? req.query.q.trim() : ""
  const stage = typeof req.query?.stage === "string" ? req.query.stage.trim() : ""
  const salesPersonId =
    typeof req.query?.sales_person_id === "string"
      ? req.query.sales_person_id.trim()
      : ""
  const take = Math.min(
    Number(req.query?.take || 100) || 100,
    200
  )
  const skip = Math.max(Number(req.query?.skip || 0) || 0, 0)

  const selector: Record<string, unknown> = {}
  if (stage && stage !== "all") {
    selector.stage = stage
  }

  if (salesPersonId && salesPersonId !== "all") {
    selector.assigned_sales_person_id = salesPersonId
  }

  // Server-side search for name or address when available.
  if (q) {
    selector.$or = [
      { name: { $ilike: `%${q}%` } },
      { address: { $ilike: `%${q}%` } },
    ]
  }

  const [stores, total] = await Promise.all([
    service.listSalesStores(selector, {
      take,
      skip,
      order: { created_at: "DESC" },
    }),
    typeof service.countSalesStores === "function"
      ? service.countSalesStores(selector)
      : Promise.resolve(0),
  ])

  return res.status(200).json({
    stores,
    total,
    take,
    skip,
  })
}
