import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"

const UnassignSchema = z.object({
  sales_store_id: z.string().trim().min(1),
})

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const parsed = UnassignSchema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid unassign payload.",
      errors: parsed.error.flatten(),
    })
  }

  const salesPeople = req.scope.resolve("salesPeople") as {
    unassignStore: (salesStoreId: string) => Promise<unknown>
  }

  const salesStores = req.scope.resolve("salesStores") as {
    assignSalesPerson: (storeId: string, salesPersonId?: string) => Promise<unknown>
  }

  await salesPeople.unassignStore(parsed.data.sales_store_id)
  await salesStores.assignSalesPerson(parsed.data.sales_store_id, undefined)

  return res.status(200).json({ success: true })
}
