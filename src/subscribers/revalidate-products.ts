import type {
    SubscriberArgs,
    SubscriberConfig,
  } from "@medusajs/framework"
  
  export default async function productUpdatedHandler({
    event: { data },
    container,
  }: SubscriberArgs<{ id: string }>) {
    // send request to next.js storefront to revalidate cache
    await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_URL}/api/revalidate?tags=products`)
  }  

  export const config: SubscriberConfig = {
    event: [ 
        "product.updated",
        "product.created",
        "product.deleted",
    ],
  }