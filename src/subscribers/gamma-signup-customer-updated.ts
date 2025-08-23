import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"

export default async function onCustomerUpdated({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const notification = container.resolve(Modules.NOTIFICATION)
  const query = container.resolve("query")

  const { data: [customer] } = await query.graph({
    entity: "customer",
    fields: ["id", "email", "first_name", "metadata"],
    filters: { id: data.id },
  })

  if (!customer?.email) return
  if (!customer?.metadata?.gamma_gummies_event_2025) return

  const template = process.env.SENDGRID_TEMPLATE_GAMMA_SIGNUP
  if (!template) return

  await notification.createNotifications([
    {
      to: customer.email,
      channel: "email",
      template,
      data: {
        firstName: customer.first_name || "friend",
        eventName: "Gamma Gummies",
        season: "Fall 2025",
      },
    },
  ])
}

export const config: SubscriberConfig = {
  event: "customer.updated",
}