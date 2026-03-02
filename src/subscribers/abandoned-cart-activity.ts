import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { markCartActivityWorkflow } from "../workflows/abandoned-cart"

export default async function abandonedCartActivitySubscriber({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  if (!data?.id) {
    return
  }

  await markCartActivityWorkflow(container).run({
    input: {
      cart_id: data.id,
    },
  })
}

export const config: SubscriberConfig = {
  event: ["cart.created", "cart.updated"],
}
