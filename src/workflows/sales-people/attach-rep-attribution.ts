import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { resolveSalesPersonByRepCodeStep } from "./steps/resolve-sales-person-by-rep-code"
import { attachSalesPersonToCartStep } from "./steps/attach-sales-person-to-cart"
import { attachSalesPersonToCustomerStep } from "./steps/attach-sales-person-to-customer"

export type AttachRepAttributionWorkflowInput = {
  rep_code: string
  cart_id?: string
  customer_id?: string
}

const attachRepAttributionWorkflow = createWorkflow(
  "sales-people.attach-rep-attribution",
  function (input: AttachRepAttributionWorkflowInput) {
    const person = resolveSalesPersonByRepCodeStep({
      rep_code: input.rep_code,
    })

    attachSalesPersonToCartStep({
      cart_id: input.cart_id,
      customer_id: input.customer_id,
      sales_person_id: person.id,
      sales_person_code: person.rep_code,
    })

    attachSalesPersonToCustomerStep({
      customer_id: input.customer_id,
      cart_id: input.cart_id,
      sales_person_id: person.id,
      sales_person_code: person.rep_code,
    })

    return new WorkflowResponse({
      person,
      metadata: {
        sales_person_id: person.id,
        sales_person_code: person.rep_code,
      },
    })
  }
)

export default attachRepAttributionWorkflow
