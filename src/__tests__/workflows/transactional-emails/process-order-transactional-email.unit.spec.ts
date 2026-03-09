import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

jest.mock("@medusajs/framework/workflows-sdk", () => ({
  createStep: jest.fn((_name: string, invoke: unknown) => invoke),
  StepResponse: class StepResponse {
    constructor(output: any) {
      return output as any
    }
  },
}))

import { processOrderTransactionalEmailStep } from "../../../workflows/transactional-emails/steps/process-order-transactional-email"

const invokeProcessOrderTransactionalEmailStep =
  processOrderTransactionalEmailStep as unknown as (
    input: unknown,
    context: unknown
  ) => Promise<any>

type TestOrder = {
  id: string
  display_id: string | number
  email: string
  created_at: string
  status: string
  payment_status: string
  fulfillment_status: string
  currency_code: string
  total: number
  subtotal: number
  tax_total: number
  shipping_total: number
  discount_total: number
  metadata: Record<string, unknown>
  customer: {
    first_name: string
    last_name: string
    email: string
  }
  items: Array<{
    id: string
    title: string
    quantity: number
    unit_price: number
    thumbnail: string | null
  }>
}

const buildOrder = (overrides: Partial<TestOrder> = {}): TestOrder => ({
  id: "order_1",
  display_id: 1001,
  email: "buyer@example.com",
  created_at: "2026-03-08T12:00:00.000Z",
  status: "pending",
  payment_status: "captured",
  fulfillment_status: "not_fulfilled",
  currency_code: "usd",
  total: 40,
  subtotal: 40,
  tax_total: 0,
  shipping_total: 0,
  discount_total: 0,
  metadata: {},
  customer: {
    first_name: "Tess",
    last_name: "Buyer",
    email: "buyer@example.com",
  },
  items: [
    {
      id: "item_1",
      title: "Full Spectrum CBD Tincture",
      quantity: 1,
      unit_price: 40,
      thumbnail: null,
    },
  ],
  ...overrides,
})

const buildContext = (options: {
  order?: TestOrder | null
  createNotifications?: jest.Mock
  throwOnNotificationResolve?: boolean
}) => {
  const warn = jest.fn()
  const graph = jest.fn(async () => ({
    data: options.order ? [options.order] : [],
  }))
  const createNotifications =
    options.createNotifications || jest.fn(async () => [{}])
  const updateOrders = jest.fn(async () => ({}))

  const container = {
    resolve: (key: unknown) => {
      if (key === ContainerRegistrationKeys.LOGGER) {
        return { warn }
      }

      if (key === "query") {
        return { graph }
      }

      if (key === Modules.NOTIFICATION) {
        if (options.throwOnNotificationResolve) {
          throw new Error("notification provider missing")
        }

        return { createNotifications }
      }

      if (key === "order") {
        return { updateOrders }
      }

      throw new Error(`Unexpected resolve key: ${String(key)}`)
    },
  }

  return {
    ctx: { container },
    warn,
    graph,
    createNotifications,
    updateOrders,
  }
}

describe("processOrderTransactionalEmailStep", () => {
  const originalStorefrontUrl = process.env.STOREFRONT_URL
  const originalWebsiteUrl = process.env.SENDGRID_WEBSITE_URL
  const originalSupportUrl = process.env.SENDGRID_SUPPORT_URL
  const originalOrderTemplate = process.env.SENDGRID_TEMPLATE_ORDER_CONFIRMATION
  const originalShippingConfirmationTemplate =
    process.env.SENDGRID_TEMPLATE_SHIPPING_CONFIRMATION
  const originalShippingUpdateTemplate = process.env.SENDGRID_TEMPLATE_SHIPPING_UPDATE
  const originalRefundTemplate = process.env.SENDGRID_TEMPLATE_REFUND_CONFIRMATION
  const originalCancellationTemplate =
    process.env.SENDGRID_TEMPLATE_CANCELLATION_CONFIRMATION

  beforeEach(() => {
    process.env.STOREFRONT_URL = "https://store.example.com/"
    process.env.SENDGRID_WEBSITE_URL = ""
    process.env.SENDGRID_SUPPORT_URL = ""
    process.env.SENDGRID_TEMPLATE_ORDER_CONFIRMATION = "d-order-confirm"
    process.env.SENDGRID_TEMPLATE_SHIPPING_CONFIRMATION = "d-shipping-confirm"
    process.env.SENDGRID_TEMPLATE_SHIPPING_UPDATE = "d-shipping-update"
    process.env.SENDGRID_TEMPLATE_REFUND_CONFIRMATION = "d-refund-confirm"
    process.env.SENDGRID_TEMPLATE_CANCELLATION_CONFIRMATION = "d-cancel-confirm"
  })

  afterEach(() => {
    process.env.STOREFRONT_URL = originalStorefrontUrl
    process.env.SENDGRID_WEBSITE_URL = originalWebsiteUrl
    process.env.SENDGRID_SUPPORT_URL = originalSupportUrl
    process.env.SENDGRID_TEMPLATE_ORDER_CONFIRMATION = originalOrderTemplate
    process.env.SENDGRID_TEMPLATE_SHIPPING_CONFIRMATION =
      originalShippingConfirmationTemplate
    process.env.SENDGRID_TEMPLATE_SHIPPING_UPDATE = originalShippingUpdateTemplate
    process.env.SENDGRID_TEMPLATE_REFUND_CONFIRMATION = originalRefundTemplate
    process.env.SENDGRID_TEMPLATE_CANCELLATION_CONFIRMATION =
      originalCancellationTemplate
    jest.clearAllMocks()
  })

  it("sends order confirmation and writes idempotency metadata", async () => {
    const { ctx, createNotifications, updateOrders } = buildContext({
      order: buildOrder(),
    })

    const result = await invokeProcessOrderTransactionalEmailStep(
      {
        order_id: "order_1",
        trigger: "order_confirmation",
      },
      ctx as never
    )

    expect(result).toEqual({
      sent: true,
      skipped_reason: null,
      trigger: "order_confirmation",
      order_id: "order_1",
      template: "d-order-confirm",
    })
    expect(createNotifications).toHaveBeenCalledWith([
      expect.objectContaining({
        to: "buyer@example.com",
        template: "d-order-confirm",
        data: expect.objectContaining({
          order: expect.objectContaining({
            items: expect.arrayContaining([
              expect.objectContaining({
                unit_price: 40,
                unit_price_display: "$40.00",
              }),
            ]),
          }),
          links: expect.objectContaining({
            order_url: "https://store.example.com/account/orders/details/order_1",
            support_url: "https://store.example.com/content/contact",
            website_url: "https://store.example.com",
          }),
        }),
      }),
    ])
    expect(updateOrders).toHaveBeenCalledWith(
      "order_1",
      expect.objectContaining({
        metadata: expect.objectContaining({
          transactional_email_order_confirmation_sent_at: expect.any(String),
        }),
      })
    )
  })

  it("sends shipping confirmation on first shipped-like status", async () => {
    const { ctx, createNotifications, updateOrders } = buildContext({
      order: buildOrder({ fulfillment_status: "shipped" }),
    })

    const result = await invokeProcessOrderTransactionalEmailStep(
      {
        order_id: "order_1",
        trigger: "shipping_status",
      },
      ctx as never
    )

    expect(result.sent).toBe(true)
    expect(result.template).toBe("d-shipping-confirm")
    expect(createNotifications).toHaveBeenCalledWith([
      expect.objectContaining({
        template: "d-shipping-confirm",
      }),
    ])
    expect(updateOrders).toHaveBeenCalledWith(
      "order_1",
      expect.objectContaining({
        metadata: expect.objectContaining({
          transactional_email_shipping_confirmation_sent_at: expect.any(String),
          transactional_email_last_notified_fulfillment_status: "shipped",
        }),
      })
    )
  })

  it("sends shipping update when fulfillment status changes after confirmation", async () => {
    const { ctx, createNotifications, updateOrders } = buildContext({
      order: buildOrder({
        fulfillment_status: "fulfilled",
        metadata: {
          transactional_email_shipping_confirmation_sent_at:
            "2026-03-08T00:00:00.000Z",
          transactional_email_last_notified_fulfillment_status: "shipped",
        },
      }),
    })

    const result = await invokeProcessOrderTransactionalEmailStep(
      {
        order_id: "order_1",
        trigger: "shipping_status",
      },
      ctx as never
    )

    expect(result.sent).toBe(true)
    expect(result.template).toBe("d-shipping-update")
    expect(createNotifications).toHaveBeenCalledWith([
      expect.objectContaining({
        template: "d-shipping-update",
      }),
    ])
    expect(updateOrders).toHaveBeenCalledWith(
      "order_1",
      expect.objectContaining({
        metadata: expect.objectContaining({
          transactional_email_shipping_update_sent_at: expect.any(String),
          transactional_email_last_notified_fulfillment_status: "fulfilled",
        }),
      })
    )
  })

  it("skips shipping email when status is unchanged after prior notification", async () => {
    const { ctx, createNotifications, updateOrders } = buildContext({
      order: buildOrder({
        fulfillment_status: "shipped",
        metadata: {
          transactional_email_shipping_confirmation_sent_at:
            "2026-03-08T00:00:00.000Z",
          transactional_email_last_notified_fulfillment_status: "shipped",
        },
      }),
    })

    const result = await invokeProcessOrderTransactionalEmailStep(
      {
        order_id: "order_1",
        trigger: "shipping_status",
      },
      ctx as never
    )

    expect(result).toEqual({
      sent: false,
      skipped_reason: "not_eligible_or_template_missing",
      trigger: "shipping_status",
      order_id: "order_1",
      template: null,
    })
    expect(createNotifications).not.toHaveBeenCalled()
    expect(updateOrders).not.toHaveBeenCalled()
  })

  it("sends refund confirmation when payment status is refunded", async () => {
    const { ctx, createNotifications, updateOrders } = buildContext({
      order: buildOrder({
        payment_status: "refunded",
      }),
    })

    const result = await invokeProcessOrderTransactionalEmailStep(
      {
        order_id: "order_1",
        trigger: "refund_status",
      },
      ctx as never
    )

    expect(result.sent).toBe(true)
    expect(result.template).toBe("d-refund-confirm")
    expect(createNotifications).toHaveBeenCalledWith([
      expect.objectContaining({
        template: "d-refund-confirm",
        data: expect.objectContaining({
          refund: expect.objectContaining({
            amount_display: "$40.00",
            timestamp: expect.any(String),
          }),
        }),
      }),
    ])
    expect(updateOrders).toHaveBeenCalledWith(
      "order_1",
      expect.objectContaining({
        metadata: expect.objectContaining({
          transactional_email_refund_confirmation_sent_at: expect.any(String),
          transactional_email_last_notified_payment_status: "refunded",
        }),
      })
    )
  })

  it("sends cancellation confirmation when order is canceled", async () => {
    const { ctx, createNotifications, updateOrders } = buildContext({
      order: buildOrder({
        status: "canceled",
      }),
    })

    const result = await invokeProcessOrderTransactionalEmailStep(
      {
        order_id: "order_1",
        trigger: "cancellation_status",
      },
      ctx as never
    )

    expect(result.sent).toBe(true)
    expect(result.template).toBe("d-cancel-confirm")
    expect(createNotifications).toHaveBeenCalledWith([
      expect.objectContaining({
        template: "d-cancel-confirm",
      }),
    ])
    expect(updateOrders).toHaveBeenCalledWith(
      "order_1",
      expect.objectContaining({
        metadata: expect.objectContaining({
          transactional_email_cancellation_confirmation_sent_at: expect.any(String),
        }),
      })
    )
  })

  it("skips when template env is missing for eligible trigger", async () => {
    process.env.SENDGRID_TEMPLATE_ORDER_CONFIRMATION = " "
    const { ctx, createNotifications, updateOrders } = buildContext({
      order: buildOrder(),
    })

    const result = await invokeProcessOrderTransactionalEmailStep(
      {
        order_id: "order_1",
        trigger: "order_confirmation",
      },
      ctx as never
    )

    expect(result).toEqual({
      sent: false,
      skipped_reason: "not_eligible_or_template_missing",
      trigger: "order_confirmation",
      order_id: "order_1",
      template: null,
    })
    expect(createNotifications).not.toHaveBeenCalled()
    expect(updateOrders).not.toHaveBeenCalled()
  })

  it("skips with explicit reason when notification provider cannot resolve", async () => {
    const { ctx, warn } = buildContext({
      order: buildOrder(),
      throwOnNotificationResolve: true,
    })

    const result = await invokeProcessOrderTransactionalEmailStep(
      {
        order_id: "order_1",
        trigger: "order_confirmation",
      },
      ctx as never
    )

    expect(result).toEqual({
      sent: false,
      skipped_reason: "notification_provider_unavailable",
      trigger: "order_confirmation",
      order_id: "order_1",
      template: null,
    })
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("Notification provider unavailable")
    )
  })

  it("does not write metadata when notification send fails", async () => {
    const createNotifications = jest
      .fn()
      .mockRejectedValue(new Error("send failed"))
    const { ctx, updateOrders, warn } = buildContext({
      order: buildOrder(),
      createNotifications,
    })

    const result = await invokeProcessOrderTransactionalEmailStep(
      {
        order_id: "order_1",
        trigger: "order_confirmation",
      },
      ctx as never
    )

    expect(result).toEqual({
      sent: false,
      skipped_reason: "notification_send_failed",
      trigger: "order_confirmation",
      order_id: "order_1",
      template: null,
    })
    expect(updateOrders).not.toHaveBeenCalled()
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("Failed order_confirmation send")
    )
  })
})
