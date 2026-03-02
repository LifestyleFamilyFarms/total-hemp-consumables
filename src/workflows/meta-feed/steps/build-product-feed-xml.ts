import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import type { FeedItem } from "./get-product-feed-items"

type BuildProductFeedXmlStepInput = {
  items: FeedItem[]
}

const escapeXml = (value: string) => {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

const node = (key: string, value?: string | null) => {
  if (!value) {
    return ""
  }

  return `<g:${key}>${escapeXml(value)}</g:${key}>`
}

export const buildProductFeedXmlStep = createStep(
  "meta-feed.build-product-feed-xml",
  async (input: BuildProductFeedXmlStepInput) => {
    const itemXml = input.items
      .map((item) => {
        return [
          "<item>",
          node("id", item.id),
          node("title", item.title),
          node("description", item.description),
          node("link", item.link),
          node("image_link", item.image_link || null),
          node("additional_image_link", item.additional_image_link || null),
          node("availability", item.availability),
          node("price", item.price),
          node("sale_price", item.sale_price || null),
          node("item_group_id", item.item_group_id),
          node("condition", item.condition),
          node("brand", item.brand || null),
          "</item>",
        ]
          .filter(Boolean)
          .join("")
      })
      .join("")

    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">',
      "<channel>",
      "<title>Total Hemp Product Feed</title>",
      "<link>https://totalhemp.com</link>",
      "<description>Medusa product feed for Meta and Google</description>",
      itemXml,
      "</channel>",
      "</rss>",
    ].join("")

    return new StepResponse({ xml })
  }
)
