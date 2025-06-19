import { createRevalidateSubscriber } from "./revalidate-factory"

export const { handler, config } = createRevalidateSubscriber({
    tags: ["regions"],
    events: [
        "region.updated",
        "region.created", 
        "region.deleted",
        "region-currency.updated",
        "region-currency.created",
        "region-currency.deleted",
        "region-payment-provider.updated",
        "region-payment-provider.created",
        "region-payment-provider.deleted",
        "region-fulfillment-provider.updated",
        "region-fulfillment-provider.created",
        "region-fulfillment-provider.deleted",
    ],
}) 