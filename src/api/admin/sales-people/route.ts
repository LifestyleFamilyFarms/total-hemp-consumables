import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { createSalesPersonWorkflow } from "../../../workflows/sales-people"
import type { CreateSalesPersonBody } from "./middlewares"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  try {
    const service = req.scope.resolve("salesPeople") as unknown as {
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

export async function POST(
  req: MedusaRequest<CreateSalesPersonBody>,
  res: MedusaResponse
) {
  try {
    const { result } = await createSalesPersonWorkflow(req.scope).run({
      input: req.validatedBody,
    })

    return res.status(200).json({ person: result.person })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create sales person."
    const friendly = message.includes("relation") && message.includes("sales_person")
      ? "Sales People tables are missing. Run migrations for salesPeople."
      : message
    return res.status(500).json({ message: friendly })
  }
}
