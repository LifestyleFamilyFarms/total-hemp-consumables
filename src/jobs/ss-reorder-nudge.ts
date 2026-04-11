import type { MedusaContainer } from "@medusajs/framework/types";
import { ssSendGridSend, getSsSalesChannelId } from "../utils/ss-sendgrid";

const NUDGE_AFTER_DAYS = 21;
const DEFAULT_LIMIT = 50;

type FulfillmentRecord = {
  id: string;
  created_at?: string | Date | null;
  order?: {
    id: string;
    status?: string | null;
    display_id?: string | number | null;
    email?: string | null;
    sales_channel_id?: string | null;
    currency_code?: string | null;
    metadata?: Record<string, unknown> | null;
    customer?: {
      first_name?: string | null;
      last_name?: string | null;
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
      product?: {
        id?: string | null;
        handle?: string | null;
      } | null;
    }> | null;
  } | null;
};

const formatCurrency = (amount: unknown, code?: string | null): string | null => {
  if (typeof amount !== "number" || !Number.isFinite(amount)) return null;
  const currency = (code || "USD").toUpperCase();
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `$${(amount as number).toFixed(2)}`;
  }
};

export default async function ssReorderNudgeJob(container: MedusaContainer) {
  const logger = container.resolve("logger") as {
    info: (msg: string) => void;
    warn: (msg: string) => void;
  };

  const disabled = (process.env.SS_REORDER_NUDGE_JOB_DISABLED || "")
    .trim()
    .toLowerCase();
  if (["1", "true", "yes"].includes(disabled)) return;

  const ssChannelId = getSsSalesChannelId();
  if (!ssChannelId) return;

  const templateId = (
    process.env.SS_SENDGRID_TEMPLATE_REORDER_NUDGE || ""
  ).trim();
  if (!templateId) return;

  const nudgeAfterMs = NUDGE_AFTER_DAYS * 24 * 60 * 60 * 1000;
  // Query all fulfillments older than 21 days. No upper bound — idempotency
  // via ss_reorder_nudge_sent_at prevents duplicates even if the job misses a run.
  const cutoff = new Date(Date.now() - nudgeAfterMs);

  const query = container.resolve("query") as {
    graph: (input: Record<string, unknown>) => Promise<{
      data: FulfillmentRecord[];
      metadata?: { count?: number };
    }>;
  };

  // Find fulfillments created ~21 days ago — paginate to capture all
  const queryFields = [
    "id",
    "created_at",
    "order.id",
    "order.status",
    "order.display_id",
    "order.email",
    "order.sales_channel_id",
    "order.currency_code",
    "order.metadata",
    "order.customer.first_name",
    "order.customer.last_name",
    "order.shipping_address.first_name",
    "order.shipping_address.last_name",
    "order.items.id",
    "order.items.title",
    "order.items.quantity",
    "order.items.unit_price",
    "order.items.thumbnail",
    "order.items.product.id",
    "order.items.product.handle",
  ];

  const fulfillments: FulfillmentRecord[] = [];
  let offset = 0;

  while (true) {
    const { data: page } = await query.graph({
      entity: "fulfillment",
      fields: queryFields,
      filters: {
        created_at: { $lte: cutoff },
      },
      pagination: { take: DEFAULT_LIMIT, skip: offset },
    });

    if (!page?.length) break;
    fulfillments.push(...page);
    if (page.length < DEFAULT_LIMIT) break;
    offset += DEFAULT_LIMIT;
  }

  if (!fulfillments.length) return;

  // Deduplicate by order ID, filter to SS, check idempotency
  const seenOrders = new Set<string>();
  const eligible: FulfillmentRecord[] = [];

  for (const f of fulfillments) {
    const order = f.order;
    if (!order?.id) continue;
    if (seenOrders.has(order.id)) continue;
    seenOrders.add(order.id);

    // Skip cancelled/archived orders — no reorder nudge for returned/refunded customers
    if (order.status === "canceled" || order.status === "archived") continue;

    // Sales channel gate
    if (order.sales_channel_id !== ssChannelId) continue;

    // Idempotency
    if (order.metadata?.ss_reorder_nudge_sent_at) continue;

    // Must have email and items
    if (!order.email) continue;
    if (!order.items?.length) continue;

    eligible.push(f);
  }

  if (!eligible.length) return;

  const storefrontUrl =
    (process.env.SS_STOREFRONT_URL || "").trim().replace(/\/+$/, "") || null;
  const orderService = container.resolve("order") as {
    updateOrders: (
      id: string,
      data: Record<string, unknown>,
    ) => Promise<unknown>;
  };

  let sentCount = 0;

  for (const f of eligible) {
    const order = f.order!;
    const email = order.email!;

    const firstName =
      order.customer?.first_name || order.shipping_address?.first_name || "";

    // Build product links for reorder CTAs
    const items = (order.items || []).map((item) => {
      const handle = item.product?.handle;
      const productUrl =
        handle && storefrontUrl
          ? `${storefrontUrl}/us/products/${handle}`
          : storefrontUrl || null;

      return {
        title: item.title || "CBG Flower",
        product_name: item.title || "CBG Flower",
        quantity: item.quantity ?? 0,
        price: formatCurrency(item.unit_price, order.currency_code)?.replace(
          "$",
          "",
        ) ?? "0.00",
        unit_price_display: formatCurrency(
          item.unit_price,
          order.currency_code,
        ),
        thumbnail: item.thumbnail || null,
        product_url: productUrl,
      };
    });

    const result = await ssSendGridSend({
      to: email,
      templateId,
      dynamicTemplateData: {
        customer: {
          first_name: firstName,
          last_name:
            order.customer?.last_name ||
            order.shipping_address?.last_name ||
            "",
          email,
        },
        order: {
          id: order.id,
          display_id: order.display_id ?? null,
        },
        order_number: order.display_id ?? null,
        items,
        links: {
          store_url: storefrontUrl ? `${storefrontUrl}/us/store` : null,
          website_url: storefrontUrl || null,
        },
        brand: {
          top_wordmark_url:
            (process.env.SS_SENDGRID_BRAND_TOP_WORDMARK_URL || "").trim() ||
            null,
          footer_logo_url:
            (process.env.SS_SENDGRID_BRAND_FOOTER_LOGO_URL || "").trim() ||
            null,
        },
      },
    });

    if (result.success) {
      sentCount++;
      try {
        await orderService.updateOrders(order.id, {
          metadata: {
            ...(order.metadata || {}),
            ss_reorder_nudge_sent_at: new Date().toISOString(),
          },
        });
      } catch {
        logger.warn(
          `[ss-reorder-nudge] Email sent but metadata update failed for order ${order.id}`,
        );
      }
    } else {
      logger.warn(
        `[ss-reorder-nudge] SendGrid failed for order ${order.id}: ${result.error}`,
      );
    }
  }

  if (sentCount > 0) {
    logger.info(`[ss-reorder-nudge] Sent ${sentCount} reorder nudge(s).`);
  }
}

export const config = {
  name: "ss-reorder-nudge",
  schedule: "0 10 * * *", // Daily at 10am UTC
};
