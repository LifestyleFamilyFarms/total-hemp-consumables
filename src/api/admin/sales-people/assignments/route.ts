import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"

const AssignmentSchema = z.object({
  sales_person_id: z.string().trim().min(1),
  sales_store_id: z.string().trim().min(1),
  notes: z.string().optional(),
})

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const parsed = AssignmentSchema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid assignment payload.",
      errors: parsed.error.flatten(),
    })
  }

  const service = req.scope.resolve("salesPeople") as {
    assignStore: (input: {
      salesPersonId: string
      salesStoreId: string
      notes?: string
    }) => Promise<unknown>
  }

  const assignment = await service.assignStore({
    salesPersonId: parsed.data.sales_person_id,
    salesStoreId: parsed.data.sales_store_id,
    notes: parsed.data.notes,
  })

  const salesStores = req.scope.resolve("salesStores") as {
    assignSalesPerson: (storeId: string, salesPersonId?: string) => Promise<unknown>
  }

  await salesStores.assignSalesPerson(
    parsed.data.sales_store_id,
    parsed.data.sales_person_id
  )

  return res.status(200).json({ assignment })
}
