import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import {
  processOrderTransactionalEmailStep,
  type ProcessOrderTransactionalEmailStepInput,
} from "./steps/process-order-transactional-email"

const sendOrderTransactionalEmailWorkflow = createWorkflow(
  "transactional-emails.send-order-transactional-email",
  function (input: ProcessOrderTransactionalEmailStepInput) {
    const result = processOrderTransactionalEmailStep(input)

    return new WorkflowResponse(result)
  }
)

export default sendOrderTransactionalEmailWorkflow
