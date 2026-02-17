import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { addSalesStoreStageWorkflow } from "../../../../../workflows/sales-stores"
import type { AddSalesStoreStageBody } from "./middlewares"

export async function POST(
  req: MedusaRequest<AddSalesStoreStageBody>,
  res: MedusaResponse
) {
  const body = req.validatedBody

  const { result } = await addSalesStoreStageWorkflow(req.scope).run({
    input: {
      sales_store_id: req.params.id,
      stage: body.stage,
      notes: body.notes,
    },
  })

  return res.status(200).json({ store: result.store })
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const service = req.scope.resolve("salesStores") as {
    listSalesStoreStages: (
      selector?: Record<string, unknown>,
      config?: Record<string, unknown>
    ) => Promise<unknown[]>
  }

  const stages = await service.listSalesStoreStages(
    { store_id: req.params.id },
    { order: { occurred_at: "DESC" } }
  )

  return res.status(200).json({ stages })
}
