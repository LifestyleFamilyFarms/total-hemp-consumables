import type { MedusaContainer } from "@medusajs/framework/types";
import { createHmac } from "node:crypto";
import { ssSendGridSend, getSsSalesChannelId } from "../utils/ss-sendgrid";

const DEFAULT_LOOKBACK_DAYS = 30;
const DEFAULT_LIMIT = 50;
const DEFAULT_RECOVERY_TTL_HOURS = 72;
const DEFAULT_NO_RECENT_ACTIVITY_DAYS = 14;

type OrderRecord = {
  id: string;
  customer_id?: string;
  email?: string | null;
  currency_code?: string | null;
  completed_at?: string | Date | null;
  created_at?: string | Date | null;
  metadata?: Record<string, unknown> | null;
  customer?: {
    first_name?: string | null;
    last_name?: string | null;
  } | null;
  items?: Array<{
    title?: string | null;
    quantity?: number | null;
    unit_price?: number | null;
    thumbnail?: string | null;
  }> | null;
};

type CartRecord = {
  id: string;
  created_at?: string | Date | null;
};

const formatUnitPrice = (
  amount: unknown,
  code?: string | null,
): string | null => {
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

const buildCartUrl = (
  websiteUrl: string | null,
  secret: string,
  ttlHours: number,
): string | null => {
  if (!websiteUrl) return null;
  if (!secret) return `${websiteUrl}/products`;

  const nowSeconds = Math.floor(Date.now() / 1000);
  const payload = {
    v: 1,
    iat: nowSeconds,
    exp: nowSeconds + ttlHours * 60 * 60,
  };
  const encoded = Buffer.from(JSON.stringify(payload), "utf8").toString(
    "base64url",
  );
  const sig = createHmac("sha256", secret).update(encoded).digest("base64url");

  return `${websiteUrl}/products?token=${encodeURIComponent(`${encoded}.${sig}`)}`;
};

export default async function ssProcessReorderNudgeJob(
  container: MedusaContainer,
) {
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

  const lookbackDays = parsePositive(
    process.env.SS_REORDER_NUDGE_LOOKBACK_DAYS,
    DEFAULT_LOOKBACK_DAYS,
  );
  const noRecentActivityDays = parsePositive(
    process.env.SS_REORDER_NUDGE_NO_RECENT_ACTIVITY_DAYS,
    DEFAULT_NO_RECENT_ACTIVITY_DAYS,
  );
  const limit = Math.floor(
    parsePositive(process.env.SS_REORDER_NUDGE_LIMIT, DEFAULT_LIMIT),
  );

  const completedCutoff = new Date(
    Date.now() - lookbackDays * 24 * 60 * 60 * 1000,
  );
  const recentActivityCutoff = new Date(
    Date.now() - noRecentActivityDays * 24 * 60 * 60 * 1000,
  );

  const query = container.resolve("query") as {
    graph: (input: Record<string, unknown>) => Promise<{
      data: OrderRecord[];
      metadata?: { count?: number };
    }>;
  };

  // Find eligible orders: completed N days ago, customer has not placed recent order
  const eligibleOrders: OrderRecord[] = [];
  const seenCustomerIds = new Set<string>();
  let offset = 0;
  let total = Number.POSITIVE_INFINITY;
  const pageSize = Math.min(Math.max(limit, 25), 100);

  while (eligibleOrders.length < limit && offset < total) {
    const { data: orders, metadata } = await query.graph({
      entity: "order",
      fields: [
        "id",
        "customer_id",
        "email",
        "currency_code",
        "completed_at",
        "created_at",
        "metadata",
        "sales_channel_id",
        "customer.first_name",
        "customer.last_name",
        "items.title",
        "items.quantity",
        "items.unit_price",
        "items.thumbnail",
      ],
      filters: {
        completed_at: {
          $lte: completedCutoff,
          $gt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
        },
        canceled_at: null,
        email: { $ne: null },
        sales_channel_id: ssChannelId,
      },
      pagination: {
        take: pageSize,
        skip: offset,
        order: { completed_at: "DESC" },
      },
    });

    total = metadata?.count ?? offset + (orders?.length || 0);
    const fetched = orders || [];
    if (!fetched.length) break;

    for (const order of fetched) {
      const hasItems = Array.isArray(order.items) && order.items.length > 0;
      const alreadyNotified = Boolean(order.metadata?.reorder_nudge_sent_at);
      const customerId = (order.customer_id || "").trim();

      if (
        hasItems &&
        !alreadyNotified &&
        customerId &&
        !seenCustomerIds.has(customerId)
      ) {
        // Check if customer has recent orders (within last N days)
        const customerOrders = await query.graph({
          entity: "order",
          fields: ["id", "completed_at"],
          filters: {
            customer_id: customerId,
            completed_at: { $gte: recentActivityCutoff },
            sales_channel_id: ssChannelId,
          },
          pagination: { take: 1 },
        });

        const hasRecentOrder = (customerOrders.data || []).length > 0;
        if (!hasRecentOrder) {
          eligibleOrders.push(order);
          seenCustomerIds.add(customerId);
        }
      }
      if (eligibleOrders.length >= limit) break;
    }

    offset += fetched.length;
  }

  if (!eligibleOrders.length) return;

  // Send nudge notifications
  const storefrontUrl =
    (process.env.SS_STOREFRONT_URL || "").trim().replace(/\/+$/, "") || null;
  const cartUrl = buildCartUrl(
    storefrontUrl,
    (process.env.SS_SENDGRID_REORDER_NUDGE_SECRET || "").trim(),
    parsePositive(
      process.env.SS_SENDGRID_REORDER_NUDGE_TTL_HOURS,
      DEFAULT_RECOVERY_TTL_HOURS,
    ),
  );

  let sentCount = 0;

  const orderService = container.resolve("order") as {
    updateOrders: (
      data: Array<{ id: string; metadata: Record<string, unknown> }>,
    ) => Promise<unknown>;
  };

  for (const order of eligibleOrders) {
    if (!order.email) continue;

    const result = await ssSendGridSend({
      to: order.email,
      templateId,
      dynamicTemplateData: {
        customer: {
          first_name: order.customer?.first_name || "",
          last_name: order.customer?.last_name || "",
        },
        order_id: order.id,
        cart_url: cartUrl,
        items: (order.items || []).map((item) => ({
          title: item.title,
          quantity: item.quantity,
          unit_price: item.unit_price,
          unit_price_display: formatUnitPrice(
            item.unit_price,
            order.currency_code,
          ),
          thumbnail: item.thumbnail,
        })),
        links: {
          website_url: storefrontUrl,
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
        await orderService.updateOrders([
          {
            id: order.id,
            metadata: {
              ...(order.metadata || {}),
              reorder_nudge_sent_at: new Date().toISOString(),
            },
          },
        ]);
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
    logger.info(
      `[ss-reorder-nudge] Sent ${sentCount} reorder nudge notification(s).`,
    );
  }
}

function parsePositive(value: string | undefined, fallback: number): number {
  const parsed = Number.parseFloat((value || "").trim());
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export const config = {
  name: "ss-process-reorder-nudge",
  schedule: "0 9 * * 1",
};
