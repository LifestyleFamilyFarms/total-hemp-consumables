import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { generateMetaFeedWorkflow } from "../../workflows/meta-feed"
import type { ProductFeedQuery } from "./middlewares"

export async function GET(req: MedusaRequest<ProductFeedQuery>, res: MedusaResponse) {
  const { currency_code, country_code } = req.validatedQuery as ProductFeedQuery

  const { result } = await generateMetaFeedWorkflow(req.scope).run({
    input: {
      currency_code,
      country_code,
    },
  })

  res.setHeader("Content-Type", "application/xml; charset=utf-8")
  return res.status(200).send(result.xml)
}
