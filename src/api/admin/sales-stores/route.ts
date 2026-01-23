import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const service = req.scope.resolve("salesStores") as {
    listSalesStores: (selector?: Record<string, unknown>, config?: Record<string, unknown>) => Promise<unknown[]>
  }

  const stores = await service.listSalesStores({}, { take: 100, order: { created_at: "DESC" } })

  return res.status(200).json({ stores })
}
