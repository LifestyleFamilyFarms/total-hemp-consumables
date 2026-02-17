import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import {
  UpdateSalesPersonStepInput,
  updateSalesPersonStep,
} from "./steps/update-sales-person"

const updateSalesPersonWorkflow = createWorkflow(
  "sales-people.update-sales-person",
  function (input: UpdateSalesPersonStepInput) {
    const person = updateSalesPersonStep(input)

    return new WorkflowResponse({
      person,
    })
  }
)

export default updateSalesPersonWorkflow
