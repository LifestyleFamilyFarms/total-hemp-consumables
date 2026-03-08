import { Modules } from "@medusajs/framework/utils"

import onCustomerCreated from "../../subscribers/gamma-signup-customer-created"
import onCustomerUpdated from "../../subscribers/gamma-signup-customer-updated"

type CustomerRecord = {
  id: string
  email?: string | null
  first_name?: string | null
  metadata?: Record<string, unknown> | null
}

const buildCustomer = (overrides: Partial<CustomerRecord> = {}): CustomerRecord => ({
  id: "cus_1",
  email: "test@totalhemp.co",
  first_name: "Tess",
  metadata: {
    gamma_gummies_event_2025: true,
  },
  ...overrides,
})

const buildArgs = (customer: CustomerRecord) => {
  const createNotifications = jest.fn(async () => [])
  const graph = jest.fn(async () => ({
    data: [customer],
  }))

  const container = {
    resolve: (key: unknown) => {
      if (key === Modules.NOTIFICATION) {
        return { createNotifications }
      }

      if (key === "query") {
        return { graph }
      }

      throw new Error(`Unexpected resolve key: ${String(key)}`)
    },
  }

  return {
    args: {
      event: {
        data: {
          id: customer.id,
        },
      },
      container,
    },
    createNotifications,
    graph,
  }
}

describe.each([
  ["customer.created", onCustomerCreated],
  ["customer.updated", onCustomerUpdated],
])("gamma signup subscriber (%s)", (_eventName, subscriber) => {
  const originalTemplate = process.env.SENDGRID_TEMPLATE_GAMMA_GUMMIES

  afterEach(() => {
    process.env.SENDGRID_TEMPLATE_GAMMA_GUMMIES = originalTemplate
    jest.clearAllMocks()
  })

  it("sends notification when customer is flagged and template is configured", async () => {
    process.env.SENDGRID_TEMPLATE_GAMMA_GUMMIES = "d-gamma-template"
    const { args, createNotifications } = buildArgs(buildCustomer())

    await subscriber(args as never)

    expect(createNotifications).toHaveBeenCalledWith([
      expect.objectContaining({
        to: "test@totalhemp.co",
        channel: "email",
        template: "d-gamma-template",
        data: {
          firstName: "Tess",
          eventName: "Gamma Gummies",
          season: "Fall 2025",
        },
      }),
    ])
  })

  it("does not send when customer is not flagged for gamma event", async () => {
    process.env.SENDGRID_TEMPLATE_GAMMA_GUMMIES = "d-gamma-template"
    const { args, createNotifications } = buildArgs(
      buildCustomer({
        metadata: {
          gamma_gummies_event_2025: false,
        },
      })
    )

    await subscriber(args as never)

    expect(createNotifications).not.toHaveBeenCalled()
  })

  it("does not send when template env var is missing", async () => {
    process.env.SENDGRID_TEMPLATE_GAMMA_GUMMIES = ""
    const { args, createNotifications } = buildArgs(buildCustomer())

    await subscriber(args as never)

    expect(createNotifications).not.toHaveBeenCalled()
  })

  it("does not send when customer email is missing", async () => {
    process.env.SENDGRID_TEMPLATE_GAMMA_GUMMIES = "d-gamma-template"
    const { args, createNotifications } = buildArgs(
      buildCustomer({
        email: null,
      })
    )

    await subscriber(args as never)

    expect(createNotifications).not.toHaveBeenCalled()
  })
})
