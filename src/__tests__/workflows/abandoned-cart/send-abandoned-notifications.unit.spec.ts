import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

jest.mock("@medusajs/framework/workflows-sdk", () => ({
  createStep: jest.fn((_name: string, invoke: unknown) => invoke),
  StepResponse: class StepResponse {
    constructor(output: any) {
      return output as any
    }
  },
}))

import { sendAbandonedNotificationsStep } from "../../../workflows/abandoned-cart/steps/send-abandoned-notifications"

const invokeSendAbandonedNotificationsStep = sendAbandonedNotificationsStep as unknown as (
  input: unknown,
  context: unknown
) => Promise<unknown>

describe("sendAbandonedNotificationsStep", () => {
  const originalTemplate = process.env.SENDGRID_TEMPLATE_ABANDONED_CART
  const originalStorefrontUrl = process.env.STOREFRONT_URL
  const originalWebsiteUrl = process.env.SENDGRID_WEBSITE_URL
  const originalSupportUrl = process.env.SENDGRID_SUPPORT_URL
  const originalRecoverySecret = process.env.SENDGRID_ABANDONED_CART_RECOVERY_SECRET
  const originalRecoveryTtlHours = process.env.SENDGRID_ABANDONED_CART_RECOVERY_TTL_HOURS

  afterEach(() => {
    process.env.SENDGRID_TEMPLATE_ABANDONED_CART = originalTemplate
    process.env.STOREFRONT_URL = originalStorefrontUrl
    process.env.SENDGRID_WEBSITE_URL = originalWebsiteUrl
    process.env.SENDGRID_SUPPORT_URL = originalSupportUrl
    process.env.SENDGRID_ABANDONED_CART_RECOVERY_SECRET = originalRecoverySecret
    process.env.SENDGRID_ABANDONED_CART_RECOVERY_TTL_HOURS = originalRecoveryTtlHours
    jest.clearAllMocks()
  })

  const buildContext = (options: {
    warn: jest.Mock
    createNotifications?: jest.Mock
    throwOnNotificationResolve?: boolean
  }) => {
    return {
      container: {
        resolve: (key: unknown) => {
          if (key === ContainerRegistrationKeys.LOGGER) {
            return { warn: options.warn }
          }

          if (key === Modules.NOTIFICATION) {
            if (options.throwOnNotificationResolve) {
              throw new Error("notification provider missing")
            }

            return {
              createNotifications: options.createNotifications || jest.fn(async () => []),
            }
          }

          throw new Error(`Unexpected resolve key: ${String(key)}`)
        },
      },
    }
  }

  it("returns deterministic empty result when template id is missing", async () => {
    process.env.SENDGRID_TEMPLATE_ABANDONED_CART = " "
    const warn = jest.fn()
    const createNotifications = jest.fn(async () => [{ id: "notif_1" }])

    const result = await invokeSendAbandonedNotificationsStep(
      {
        carts: [{ id: "cart_1", email: "alice@example.com" }],
      },
      buildContext({ warn, createNotifications }) as never
    )

    expect(result).toEqual({
      notifications: [],
      processed_cart_ids: [],
    })
    expect(createNotifications).not.toHaveBeenCalled()
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("SENDGRID_TEMPLATE_ABANDONED_CART is not set")
    )
  })

  it("returns deterministic empty result when notification provider cannot resolve", async () => {
    process.env.SENDGRID_TEMPLATE_ABANDONED_CART = "d-template"
    const warn = jest.fn()

    const result = await invokeSendAbandonedNotificationsStep(
      {
        carts: [{ id: "cart_1", email: "alice@example.com" }],
      },
      buildContext({ warn, throwOnNotificationResolve: true }) as never
    )

    expect(result).toEqual({
      notifications: [],
      processed_cart_ids: [],
    })
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("Notification module/provider unavailable")
    )
  })

  it("sends only successful notifications and returns sent cart ids", async () => {
    process.env.SENDGRID_TEMPLATE_ABANDONED_CART = "d-template"
    process.env.STOREFRONT_URL = "https://store.example.com/"
    process.env.SENDGRID_WEBSITE_URL = ""
    process.env.SENDGRID_SUPPORT_URL = ""
    process.env.SENDGRID_ABANDONED_CART_RECOVERY_SECRET = ""
    const warn = jest.fn()
    const createNotifications = jest
      .fn()
      .mockResolvedValueOnce([{ id: "notif_1" }])
      .mockRejectedValueOnce(new Error("provider timeout"))

    const result = await invokeSendAbandonedNotificationsStep(
      {
        carts: [
          {
            id: "cart_1",
            email: "alice@example.com",
            currency_code: "usd",
            items: [
              {
                title: "Delta-9 THC Chocolate Brownie",
                quantity: 1,
                unit_price: 15,
              },
            ],
          },
          { id: "cart_2", email: "bob@example.com" },
        ],
      },
      buildContext({ warn, createNotifications }) as never
    )

    expect(result).toEqual({
      notifications: [{ id: "notif_1" }],
      processed_cart_ids: ["cart_1"],
    })
    expect(createNotifications).toHaveBeenNthCalledWith(
      1,
      [
        expect.objectContaining({
          to: "alice@example.com",
          data: expect.objectContaining({
            recover_url: "https://store.example.com/cart",
            items: expect.arrayContaining([
              expect.objectContaining({
                unit_price: 15,
                unit_price_display: "$15.00",
              }),
            ]),
          }),
        }),
      ]
    )
    expect(createNotifications).toHaveBeenCalledTimes(2)
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("Failed to send notification for cart cart_2")
    )
  })

  it("builds signed recover URL when abandoned-cart recovery secret is configured", async () => {
    process.env.SENDGRID_TEMPLATE_ABANDONED_CART = "d-template"
    process.env.STOREFRONT_URL = "https://store.example.com/"
    process.env.SENDGRID_WEBSITE_URL = "https://www.totalhemp.co"
    process.env.SENDGRID_ABANDONED_CART_RECOVERY_SECRET = "super-secret"
    process.env.SENDGRID_ABANDONED_CART_RECOVERY_TTL_HOURS = "72"

    const warn = jest.fn()
    const createNotifications = jest.fn().mockResolvedValueOnce([{ id: "notif_1" }])

    await invokeSendAbandonedNotificationsStep(
      {
        carts: [{ id: "cart_1", email: "alice@example.com" }],
      },
      buildContext({ warn, createNotifications }) as never
    )

    const payload = createNotifications.mock.calls[0]?.[0]?.[0]
    expect(payload?.data?.recover_url).toMatch(
      /^https:\/\/www\.totalhemp\.co\/cart\/recover\?token=.+/
    )
    expect(warn).not.toHaveBeenCalledWith(
      expect.stringContaining("Failed to send notification")
    )
  })
})
