import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { ssSendGridSend, getSsSalesChannelId } from "../utils/ss-sendgrid";

type TrackingEventData = {
  label_id: string;
  action: "delivered" | "exception";
  tracking: {
    number: string;
    url: string;
    status_code: string;
    carrier_description: string;
    actual_delivery_date: string | null;
    exception_description: string | null;
  };
};

type FulfillmentRecord = {
  id: string;
  data?: Record<string, unknown> | null;
  order?: {
    id: string;
    display_id?: string | number | null;
    email?: string | null;
    sales_channel_id?: string | null;
    currency_code?: string | null;
    metadata?: Record<string, unknown> | null;
    customer?: {
      first_name?: string | null;
      last_name?: string | null;
      email?: string | null;
    } | null;
    shipping_address?: {
      first_name?: string | null;
      last_name?: string | null;
    } | null;
    items?: Array<{
      id: string;
      title?: string | null;
      quantity?: number | null;
      unit_price?: number | null;
      thumbnail?: string | null;
    }> | null;
  } | null;
};

const EXCEPTION_COPY: Record<string, string> = {
  delivery_failed:
    "Delivery was attempted but unsuccessful. This often happens when no one is available to sign — adult signature is required for hemp products under the PACT Act.",
  attempt_failed:
    "Delivery was attempted but unsuccessful. This often happens when no one is available to sign — adult signature is required for hemp products under the PACT Act.",
  return_to_sender:
    "Your package is being returned to our farm. This can happen if delivery attempts are unsuccessful or the address couldn't be verified.",
  held_by_carrier:
    "Your package is being held at the carrier facility. You may be able to pick it up or schedule a redelivery.",
  undeliverable:
    "The carrier was unable to deliver your package. Please check the tracking link for details or contact us for help.",
  exception:
    "There's an issue with your shipment. Please check your tracking link for the latest status.",
  error:
    "There's an issue with your shipment. Please check your tracking link for the latest status.",
};

export default async function ssTrackingUpdateHandler({
  event: { data },
  container,
}: SubscriberArgs<TrackingEventData>) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER) as {
    info: (msg: string) => void;
    warn: (msg: string) => void;
  };

  const ssChannelId = getSsSalesChannelId();
  if (!ssChannelId) return;

  const { label_id, action, tracking } = data;

  // Resolve template ID based on action
  const templateId =
    action === "delivered"
      ? (process.env.SS_SENDGRID_TEMPLATE_DELIVERY_CONFIRMATION || "").trim()
      : (process.env.SS_SENDGRID_TEMPLATE_DELIVERY_EXCEPTION || "").trim();

  if (!templateId) {
    logger.warn(
      `[ss-tracking-update] No SendGrid template configured for action "${action}"`,
    );
    return;
  }

  try {
    const query = container.resolve("query") as {
      graph: (input: Record<string, unknown>) => Promise<{ data: unknown[] }>;
    };

    // Find the fulfillment that has this label_id in its data.
    // NOTE: Medusa's query.graph doesn't support filtering on JSON `data` fields,
    // so we fetch recent fulfillments and filter in memory. The pagination limit
    // and sort keep this bounded. A dedicated link or index would allow a direct lookup.
    const { data: fulfillments } = await query.graph({
      entity: "fulfillment",
      fields: [
        "id",
        "data",
        "order.id",
        "order.display_id",
        "order.email",
        "order.sales_channel_id",
        "order.currency_code",
        "order.metadata",
        "order.customer.first_name",
        "order.customer.last_name",
        "order.customer.email",
        "order.shipping_address.first_name",
        "order.shipping_address.last_name",
        "order.items.id",
        "order.items.title",
        "order.items.quantity",
        "order.items.unit_price",
        "order.items.thumbnail",
      ],
      pagination: {
        take: 100,
        order: { created_at: "DESC" },
      },
    });

    // Filter fulfillments to find the one matching our label_id
    const fulfillment = (fulfillments as FulfillmentRecord[]).find(
      (f) => f.data?.label_id === label_id || f.data?.shipment_id === label_id,
    );

    if (!fulfillment?.order) {
      logger.warn(
        `[ss-tracking-update] No fulfillment found for label_id ${label_id}`,
      );
      return;
    }

    const order = fulfillment.order;

    // Sales channel gate
    if (order.sales_channel_id !== ssChannelId) return;

    // Idempotency
    const metaKey =
      action === "delivered" ? "ss_delivery_sent_at" : "ss_exception_sent_at";
    if (order.metadata?.[metaKey]) {
      logger.info(
        `[ss-tracking-update] Already sent ${action} email for order ${order.id}`,
      );
      return;
    }

    const email = order.email || order.customer?.email;
    if (!email) return;

    const storefrontUrl = (process.env.SS_STOREFRONT_URL || "")
      .trim()
      .replace(/\/+$/, "");

    const dynamicTemplateData: Record<string, unknown> = {
      order: {
        id: order.id,
        display_id: order.display_id ?? null,
        items: (order.items || []).map((item) => ({
          id: item.id,
          title: item.title || "Item",
          product_name: item.title || "Item",
          quantity: item.quantity ?? 0,
          price: item.unit_price != null ? item.unit_price.toFixed(2) : "0.00",
          thumbnail: item.thumbnail || null,
        })),
      },
      order_number: order.display_id ?? null,
      customer: {
        first_name:
          order.customer?.first_name ||
          order.shipping_address?.first_name ||
          "",
        last_name:
          order.customer?.last_name || order.shipping_address?.last_name || "",
        email,
      },
      tracking: {
        carrier: "USPS",
        number: tracking.number,
        url: tracking.url || "#",
      },
      links: {
        order_url: storefrontUrl
          ? `${storefrontUrl}/account/orders/details/${order.id}`
          : null,
        website_url: storefrontUrl || null,
        support_url: "mailto:hello@sobersativas.com",
      },
      brand: {
        top_wordmark_url:
          (process.env.SS_SENDGRID_BRAND_TOP_WORDMARK_URL || "").trim() || null,
        footer_logo_url:
          (process.env.SS_SENDGRID_BRAND_FOOTER_LOGO_URL || "").trim() || null,
      },
    };

    if (action === "delivered") {
      dynamicTemplateData.delivery_date = tracking.actual_delivery_date
        ? new Date(tracking.actual_delivery_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "recently";
    } else {
      dynamicTemplateData.exception = {
        type: tracking.status_code,
        description:
          EXCEPTION_COPY[tracking.status_code] ||
          tracking.carrier_description ||
          EXCEPTION_COPY.exception,
      };
    }

    const result = await ssSendGridSend({
      to: email,
      templateId,
      dynamicTemplateData,
    });

    if (!result.success) {
      logger.warn(
        `[ss-tracking-update] SendGrid send failed for order ${order.id}: ${result.error}`,
      );
      return;
    }

    // Mark as sent (idempotency)
    try {
      const orderService = container.resolve("order") as {
        updateOrders: (
          id: string,
          data: Record<string, unknown>,
        ) => Promise<unknown>;
      };
      await orderService.updateOrders(order.id, {
        metadata: {
          ...(order.metadata || {}),
          [metaKey]: new Date().toISOString(),
        },
      });
    } catch (metaErr) {
      logger.warn(
        `[ss-tracking-update] Email sent but metadata update failed for order ${order.id}`,
      );
    }

    logger.info(
      `[ss-tracking-update] ${action} email sent for order ${order.id} (label ${label_id})`,
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    logger.warn(`[ss-tracking-update] Failed for label ${label_id}: ${msg}`);
  }
}

export const config: SubscriberConfig = {
  event: "shipstation.tracking_updated",
};
