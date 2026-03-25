import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { markCartActivityWorkflow } from "../workflows/abandoned-cart"

export default async function abandonedCartActivitySubscriber({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  try {
    if (!data?.id) {
      return
    }

    await markCartActivityWorkflow(container).run({
      input: {
        cart_id: data.id,
      },
    })
  } catch (error) {
    console.error(
      `[abandoned-cart-activity] Failed for cart_id=${data?.id}:`,
      error
    )
    return
  }
}

export const config: SubscriberConfig = {
  event: ["cart.created", "cart.updated"],
}
