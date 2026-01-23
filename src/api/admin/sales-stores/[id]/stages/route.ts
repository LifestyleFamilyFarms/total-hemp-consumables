import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"

const StageSchema = z.object({
  stage: z.string().trim().min(1),
  notes: z.string().optional(),
})

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const parsed = StageSchema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid stage payload.",
      errors: parsed.error.flatten(),
    })
  }

  const service = req.scope.resolve("salesStores") as {
    addStage: (storeId: string, stage: string, notes?: string) => Promise<unknown>
  }

  const store = await service.addStage(
    req.params.id,
    parsed.data.stage,
    parsed.data.notes
  )

  return res.status(200).json({ store })
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
