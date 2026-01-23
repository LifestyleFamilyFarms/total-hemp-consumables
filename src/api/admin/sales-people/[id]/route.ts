import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"

const SalesPersonUpdateSchema = z.object({
  name: z.string().trim().min(1).optional(),
  email: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  rep_code: z.string().trim().min(1).optional(),
  active: z.boolean().optional(),
  notes: z.string().optional(),
})

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const parsed = SalesPersonUpdateSchema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid sales person payload.",
      errors: parsed.error.flatten(),
    })
  }

  try {
    const service = req.scope.resolve("salesPeople") as {
      updateSalesPeople: (
        selector: Record<string, unknown>,
        input: Record<string, unknown>
      ) => Promise<unknown>
    }

    const person = await service.updateSalesPeople(
      { id: req.params.id },
      parsed.data
    )

    return res.status(200).json({ person })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update sales person."
    const friendly = message.includes("relation") && message.includes("sales_person")
      ? "Sales People tables are missing. Run migrations for salesPeople."
      : message
    return res.status(500).json({ message: friendly })
  }
}
