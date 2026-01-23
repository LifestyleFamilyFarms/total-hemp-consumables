import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"

const SalesPersonSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  rep_code: z.string().trim().min(1),
  active: z.boolean().optional(),
  notes: z.string().optional(),
})

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  try {
    const service = req.scope.resolve("salesPeople") as {
      listSalesPeople: (
        selector?: Record<string, unknown>,
        config?: Record<string, unknown>
      ) => Promise<unknown[]>
    }

    const people = await service.listSalesPeople(
      {},
      { order: { created_at: "DESC" } }
    )

    return res.status(200).json({ people })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load sales people."
    const friendly = message.includes("relation") && message.includes("sales_person")
      ? "Sales People tables are missing. Run migrations for salesPeople."
      : message
    return res.status(500).json({ message: friendly })
  }
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const parsed = SalesPersonSchema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid sales person payload.",
      errors: parsed.error.flatten(),
    })
  }

  try {
    const service = req.scope.resolve("salesPeople") as {
      createSalesPeople: (input: Record<string, unknown>) => Promise<unknown>
    }

    const person = await service.createSalesPeople(parsed.data)

    return res.status(200).json({ person })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create sales person."
    const friendly = message.includes("relation") && message.includes("sales_person")
      ? "Sales People tables are missing. Run migrations for salesPeople."
      : message
    return res.status(500).json({ message: friendly })
  }
}
