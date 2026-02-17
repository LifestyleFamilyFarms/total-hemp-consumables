import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import {
  CreateSalesPersonStepInput,
  createSalesPersonStep,
} from "./steps/create-sales-person"

const createSalesPersonWorkflow = createWorkflow(
  "sales-people.create-sales-person",
  function (input: CreateSalesPersonStepInput) {
    const person = createSalesPersonStep(input)

    return new WorkflowResponse({
      person,
    })
  }
)

export default createSalesPersonWorkflow
