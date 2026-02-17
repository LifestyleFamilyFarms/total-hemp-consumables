import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { updateSalesPersonWorkflow } from "../../../../workflows/sales-people"
import type { UpdateSalesPersonBody } from "./middlewares"

export async function POST(
  req: MedusaRequest<UpdateSalesPersonBody>,
  res: MedusaResponse
) {
  try {
    const { result } = await updateSalesPersonWorkflow(req.scope).run({
      input: {
        id: req.params.id,
        ...req.validatedBody,
      },
    })

    return res.status(200).json({ person: result.person })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update sales person."
    if (
      message.toLowerCase().includes("duplicate") ||
      message.includes("IDX_sales_person_rep_code_unique")
    ) {
      return res.status(409).json({ message: "Rep code already exists." })
    }
    const friendly = message.includes("relation") && message.includes("sales_person")
      ? "Sales People tables are missing. Run migrations for salesPeople."
      : message
    return res.status(500).json({ message: friendly })
  }
}
