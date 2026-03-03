import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { buildProductFeedXmlStep } from "./steps/build-product-feed-xml"
import { getProductFeedItemsStep } from "./steps/get-product-feed-items"

export type GenerateMetaFeedWorkflowInput = {
  currency_code: string
  country_code: string
}

const generateMetaFeedWorkflow = createWorkflow(
  "meta-feed-generate",
  function (input: GenerateMetaFeedWorkflowInput) {
    const { items } = getProductFeedItemsStep({
      currency_code: input.currency_code,
      country_code: input.country_code,
    })

    const { xml } = buildProductFeedXmlStep({ items })

    return new WorkflowResponse({ xml })
  }
)

export default generateMetaFeedWorkflow
