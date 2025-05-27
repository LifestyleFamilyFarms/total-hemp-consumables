import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"

export function createRevalidateSubscriber({
    tags,
    events
}: {
    tags: string[]
    events: string[]
}){
    const handler = async ({
        event: { data },
        container,
    }: SubscriberArgs<{id: string}>) => {
        try {
            const url = `${process.env.STOREFRONT_URL}/api/revalidate?secret=${process.env.REVALIDATE_SECRET}&tags=${tags.join(",")}`
            const res = await fetch(url)
            console.log(`[Revalidate] ${events.join(", ")}:`, res.status, await res.text())
        } catch (e) {
            console.error(`[Revalidate] Failed for ${events.join(", ")}:`, e)
        }

    }

    const config: SubscriberConfig = {
        event: events,
    }

    return { handler, config}
}
