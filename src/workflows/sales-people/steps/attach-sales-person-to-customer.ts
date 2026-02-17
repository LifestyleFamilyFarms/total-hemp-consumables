import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

type AttachSalesPersonToCustomerStepInput = {
  customer_id?: string
  sales_person_id: string
  sales_person_code: string
}

type CustomerRecord = {
  metadata?: Record<string, unknown>
}

type CustomerService = {
  retrieveCustomer: (id: string) => Promise<CustomerRecord>
  updateCustomers: (id: string, data: Record<string, unknown>) => Promise<unknown>
}

type AttachSalesPersonToCustomerCompensationInput = {
  customer_id: string | null
  previous_metadata: Record<string, unknown> | null
}

type AttachSalesPersonToCustomerStepOutput = {
  updated: boolean
}

export const attachSalesPersonToCustomerStep = createStep(
  "attach-sales-person-to-customer",
  async (
    input: AttachSalesPersonToCustomerStepInput,
    { container }
  ): Promise<
    StepResponse<
      AttachSalesPersonToCustomerStepOutput,
      AttachSalesPersonToCustomerCompensationInput
    >
  > => {
    if (!input.customer_id) {
      return new StepResponse(
        { updated: false },
        { customer_id: null, previous_metadata: null }
      )
    }

    const customerService = container.resolve("customer") as CustomerService
    const customer = await customerService.retrieveCustomer(input.customer_id)
    const previousMetadata = { ...(customer?.metadata || {}) }

    await customerService.updateCustomers(input.customer_id, {
      metadata: {
        ...previousMetadata,
        sales_person_id: input.sales_person_id,
        sales_person_code: input.sales_person_code,
      },
    })

    return new StepResponse(
      { updated: true },
      {
        customer_id: input.customer_id,
        previous_metadata: previousMetadata,
      }
    )
  },
  async (compensationInput, { container }) => {
    if (!compensationInput?.customer_id) {
      return
    }

    const customerService = container.resolve("customer") as CustomerService
    await customerService.updateCustomers(compensationInput.customer_id, {
      metadata: compensationInput.previous_metadata || {},
    })
  }
)
