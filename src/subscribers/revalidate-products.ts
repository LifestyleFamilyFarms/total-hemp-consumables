import type {
    SubscriberArgs,
    SubscriberConfig,
  } from "@medusajs/framework"
  
  export default async function productUpdatedHandler({
    event: { data },
    container,
  }: SubscriberArgs<{ id: string }>) {
    // send request to next.js storefront to revalidate cache
    console.log("Initiating revalidation of products")
    try {
        const res = await fetch(`${process.env.STOREFRONT_URL}/api/revalidate?secret=${process.env.REVALIDATE_SECRET}&tags=products`)
        console.log("Revalidate response:", res.status, await res.text())
      } catch (e) {
        console.error("Revalidate failed:", e)
      }
  }  

  export const config: SubscriberConfig = {
    event: [ 
        "product.updated",
        "product.created",
        "product.deleted",
    ],
  }

  