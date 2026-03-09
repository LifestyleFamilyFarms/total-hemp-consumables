jest.mock("@medusajs/framework/workflows-sdk", () => ({
  createStep: jest.fn((_name: string, invoke: unknown) => invoke),
  StepResponse: class StepResponse {
    constructor(output: any) {
      return output as any
    }
  },
}))

import { findAbandonedCartsStep } from "../../../workflows/abandoned-cart/steps/find-abandoned-carts"

const invokeFindAbandonedCartsStep = findAbandonedCartsStep as unknown as (
  input: unknown,
  context: unknown
) => Promise<unknown>

describe("findAbandonedCartsStep", () => {
  it("returns latest eligible cart per email and skips notified/empty carts", async () => {
    const queryGraph = jest.fn(async () => ({
      data: [
        {
          id: "cart_newest_email_a",
          email: "a@example.com",
          metadata: {},
          items: [{ id: "item_1" }],
        },
        {
          id: "cart_older_email_a",
          email: "a@example.com",
          metadata: {},
          items: [{ id: "item_2" }],
        },
        {
          id: "cart_notified",
          email: "b@example.com",
          metadata: { abandoned_notification_at: "2026-03-08T00:00:00.000Z" },
          items: [{ id: "item_3" }],
        },
        {
          id: "cart_empty",
          email: "c@example.com",
          metadata: {},
          items: [],
        },
        {
          id: "cart_eligible_email_d",
          email: "d@example.com",
          metadata: {},
          items: [{ id: "item_4" }],
        },
      ],
      metadata: {
        count: 5,
      },
    }))

    const result = (await invokeFindAbandonedCartsStep(
      { lookback_hours: 24, limit: 10 },
      {
        container: {
          resolve: (key: string) => {
            if (key === "query") {
              return { graph: queryGraph }
            }
            throw new Error(`Unexpected resolve key: ${String(key)}`)
          },
        },
      } as never
    )) as { carts: Array<{ id: string }> }

    expect(result.carts.map((cart) => cart.id)).toEqual([
      "cart_newest_email_a",
      "cart_eligible_email_d",
    ])

    expect(queryGraph).toHaveBeenCalledWith(
      expect.objectContaining({
        order: { updated_at: "DESC" },
      })
    )
  })
})
