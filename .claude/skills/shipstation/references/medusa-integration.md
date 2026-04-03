# ShipStation + Medusa v2 Fulfillment Provider

Complete implementation guide for building a custom Medusa v2 fulfillment provider that integrates ShipStation V2 API for rate calculation, label generation, tracking, and returns.

## Architecture

```
Medusa Admin Dashboard
  |
  +- Admin creates shipping option -> getFulfillmentOptions() -> lists carrier/service combos
  +- Admin validates option -> validateOption() -> confirms carrier+service exist
  |
Customer Checkout (Next.js storefront)
  |
  +- Cart calculates shipping -> calculatePrice() -> POST /v2/rates -> display price
  +- Customer selects shipping -> validateFulfillmentData() -> POST /v2/shipments -> store shipment_id
  |
Medusa Backend (Fulfillment)
  |
  +- Admin creates fulfillment -> createFulfillment() -> POST /v2/labels/shipment/{id} -> return label+tracking
  +- Admin cancels fulfillment -> cancelFulfillment() -> PUT /v2/labels/{id}/void + PUT /v2/shipments/{id}/cancel
  +- Admin creates return -> createReturnFulfillment() -> POST /v2/labels/{label_id}/return
  |
ShipStation Webhooks
  |
  +- Tracking update -> POST /webhooks/shipstation -> verify RSA-SHA256 -> update fulfillment status
  +- Batch complete -> POST /webhooks/shipstation -> process batch results
```

## File Structure

```
src/modules/shipstation/
+-- index.ts      -- Module definition
+-- service.ts    -- ShipStationProviderService (extends AbstractFulfillmentProviderService)
+-- client.ts     -- ShipStationClient (HTTP client for V2 API)
+-- types.ts      -- TypeScript type definitions
```

## Types

```typescript
// src/modules/shipstation/types.ts

export type ShipStationOptions = {
  api_key: string;
  api_secret?: string;
};

export type FulfillmentOptionData = {
  id: string;              // Format: "{carrier_id}__{service_code}"
  carrier_id: string;
  service_code: string;
  name: string;
  is_return?: boolean;
};

export type ShipStationFulfillmentData = {
  shipment_id?: string;
  label_id?: string;
  tracking_number?: string;
  tracking_url?: string;
  label_download?: {
    href: string;
    pdf: string;
    png: string;
    zpl: string;
  };
  carrier_id?: string;
  service_code?: string;
  ship_date?: string;
  shipment_cost?: { currency: string; amount: number };
};
```

## Module Definition

```typescript
// src/modules/shipstation/index.ts

import ShipStationProviderService from "./service";
import { Module } from "@medusajs/framework/utils";

export default Module("shipstation", {
  service: ShipStationProviderService,
});
```

## Fulfillment Provider Implementation

```typescript
// src/modules/shipstation/service.ts

import {
  AbstractFulfillmentProviderService,
  MedusaError,
} from "@medusajs/framework/utils";
import type {
  CreateShippingOptionDTO,
  CalculateShippingOptionPriceDTO,
  CreateFulfillmentResult,
} from "@medusajs/framework/types";
import { ShipStationClient } from "./client";
import type {
  ShipStationOptions,
  FulfillmentOptionData,
  ShipStationFulfillmentData,
} from "./types";

class ShipStationProviderService extends AbstractFulfillmentProviderService {
  static identifier = "shipstation";
  private client: ShipStationClient;

  constructor(container: Record<string, unknown>, options: ShipStationOptions) {
    super(container, options);
    this.client = new ShipStationClient(options);
  }

  static validateOptions(options: Record<any, any>): void {
    if (!options.api_key) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "SHIPSTATION_API_KEY is required"
      );
    }
  }

  // --- getFulfillmentOptions ---
  // Called when admin configures shipping options.
  // Returns list of carrier/service combinations.

  async getFulfillmentOptions(): Promise<FulfillmentOptionData[]> {
    const carriers = await this.client.getCarriers();
    const options: FulfillmentOptionData[] = [];

    for (const carrier of carriers) {
      if (carrier.disabled_by_billing_plan) continue;

      for (const service of carrier.services) {
        options.push({
          id: `${carrier.carrier_id}__${service.service_code}`,
          carrier_id: carrier.carrier_id,
          service_code: service.service_code,
          name: `${carrier.friendly_name} - ${service.name}`,
        });
      }
    }

    return options;
  }

  // --- validateOption ---
  // Called when admin creates a shipping option.
  // Validates the carrier_id and service_code actually exist.

  async validateOption(data: Record<string, unknown>): Promise<boolean> {
    const optionId = data.id as string;
    if (!optionId) return false;

    const [carrierId, serviceCode] = optionId.split("__");
    if (!carrierId || !serviceCode) return false;

    try {
      const carriers = await this.client.getCarriers();
      const carrier = carriers.find((c) => c.carrier_id === carrierId);
      if (!carrier) return false;

      return carrier.services.some((s) => s.service_code === serviceCode);
    } catch {
      return false;
    }
  }

  // --- canCalculate ---
  // Returns true because ShipStation always supports rate calculation.

  async canCalculate(data: CreateShippingOptionDTO): Promise<boolean> {
    return true;
  }

  // --- calculatePrice ---
  // Called when cart needs a shipping price.
  // Queries ShipStation rates and returns the price for the selected service.

  async calculatePrice(
    optionData: CalculateShippingOptionPriceDTO["optionData"],
    data: CalculateShippingOptionPriceDTO["data"],
    context: CalculateShippingOptionPriceDTO["context"]
  ): Promise<{ calculated_amount: number; is_calculated_price_tax_inclusive: boolean }> {
    const carrierId = (optionData as any).carrier_id as string;
    const serviceCode = (optionData as any).service_code as string;

    if (!context.shipping_address || !context.from_location) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Shipping address and origin location are required for rate calculation"
      );
    }

    // Calculate total weight from line items (Medusa stores weight in grams)
    const totalGrams = (context.items || []).reduce((sum: number, item: any) => {
      const weight = item.variant?.weight || 0;
      return sum + weight * item.quantity;
    }, 0);

    const weightKg = Math.max(Number((totalGrams / 1000).toFixed(4)), 0.001);

    const shipTo = this.mapMedusaAddress(context.shipping_address);
    const shipFrom = this.mapMedusaAddress(context.from_location);

    const rateResponse = await this.client.getShippingRates({
      shipment: {
        carrier_id: carrierId,
        service_code: serviceCode,
        ship_to: shipTo,
        ship_from: shipFrom,
        packages: [{ weight: { value: weightKg, unit: "kilogram" } }],
      },
      rate_options: {
        carrier_ids: [carrierId],
        service_codes: [serviceCode],
      },
    });

    const rate = rateResponse.rates[0];
    if (!rate) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `No rate returned for ${serviceCode}. Check carrier config and address.`
      );
    }

    // Sum all cost components
    const totalAmount =
      rate.shipping_amount.amount +
      rate.insurance_amount.amount +
      rate.confirmation_amount.amount +
      rate.other_amount.amount +
      (rate.tax_amount?.amount || 0);

    // Medusa expects amount in cents (integer)
    return {
      calculated_amount: Math.round(totalAmount * 100),
      is_calculated_price_tax_inclusive: false,
    };
  }

  // --- validateFulfillmentData ---
  // Called when shipping method is configured.
  // Creates a shipment in ShipStation and stores the shipment_id.

  async validateFulfillmentData(
    optionData: Record<string, unknown>,
    data: Record<string, unknown>,
    context: Record<string, unknown>
  ): Promise<ShipStationFulfillmentData> {
    const carrierId = optionData.carrier_id as string;
    const serviceCode = optionData.service_code as string;
    const address = context.shipping_address as any;
    const fromLocation = context.from_location as any;
    const items = context.items as any[];

    const totalGrams = (items || []).reduce((sum: number, item: any) => {
      const weight = item.variant?.weight || 0;
      return sum + weight * item.quantity;
    }, 0);

    const weightKg = Math.max(Number((totalGrams / 1000).toFixed(4)), 0.001);

    const result = await this.client.createShipment({
      carrier_id: carrierId,
      service_code: serviceCode,
      ship_to: this.mapMedusaAddress(address),
      ship_from: this.mapMedusaAddress(fromLocation),
      packages: [{ weight: { value: weightKg, unit: "kilogram" } }],
      customs: {
        contents: "merchandise",
        non_delivery: "return_to_sender",
      },
    });

    return {
      shipment_id: result.shipment_id,
      carrier_id: carrierId,
      service_code: serviceCode,
    };
  }

  // --- createFulfillment ---
  // Called when admin fulfills an order.
  // Purchases a label and returns tracking + label data.

  async createFulfillment(
    data: Record<string, unknown>,
    items: object[],
    order: object | undefined,
    fulfillment: Record<string, unknown>
  ): Promise<CreateFulfillmentResult> {
    const fulfillmentData = data as ShipStationFulfillmentData;
    const shipmentId = fulfillmentData.shipment_id;

    if (!shipmentId) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "No shipment_id found -- cannot create fulfillment"
      );
    }

    const label = await this.client.purchaseLabelForShipment(shipmentId);

    const resultData: ShipStationFulfillmentData = {
      ...fulfillmentData,
      label_id: label.label_id,
      tracking_number: label.tracking_number,
      label_download: label.label_download,
      ship_date: label.ship_date,
      shipment_cost: label.shipment_cost,
    };

    return {
      data: resultData as Record<string, unknown>,
      labels: [
        {
          tracking_number: label.tracking_number,
          tracking_url: `https://track.shipstation.com/${label.tracking_number}`,
          label_url: label.label_download.pdf,
        },
      ],
    };
  }

  // --- cancelFulfillment ---
  // Voids the label and cancels the shipment.

  async cancelFulfillment(
    data: Record<string, unknown>
  ): Promise<any> {
    const fulfillmentData = data as ShipStationFulfillmentData;

    if (fulfillmentData.label_id) {
      try {
        await this.client.voidLabel(fulfillmentData.label_id);
      } catch (error) {
        // Label may already be voided or used -- log but don't throw
        console.warn(`Failed to void label ${fulfillmentData.label_id}:`, error);
      }
    }

    if (fulfillmentData.shipment_id) {
      try {
        await this.client.cancelShipment(fulfillmentData.shipment_id);
      } catch (error) {
        console.warn(
          `Failed to cancel shipment ${fulfillmentData.shipment_id}:`,
          error
        );
      }
    }

    return { ...data, voided: true };
  }

  // --- createReturnFulfillment ---
  // Creates a return label from an existing outbound label.

  async createReturnFulfillment(
    fulfillment: Record<string, unknown>
  ): Promise<CreateFulfillmentResult> {
    const data = fulfillment.data as ShipStationFulfillmentData;
    const labelId = data?.label_id;

    if (!labelId) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "No label_id found -- cannot create return label"
      );
    }

    const returnLabel = await this.client.createReturnLabel(labelId);

    return {
      data: {
        ...data,
        return_label_id: returnLabel.label_id,
        return_tracking_number: returnLabel.tracking_number,
        return_label_download: returnLabel.label_download,
      },
      labels: [
        {
          tracking_number: returnLabel.tracking_number,
          tracking_url: `https://track.shipstation.com/${returnLabel.tracking_number}`,
          label_url: returnLabel.label_download.pdf,
        },
      ],
    };
  }

  // --- Document methods ---

  async getFulfillmentDocuments(
    data: Record<string, unknown>
  ): Promise<never[]> {
    // Label download URLs are already stored in fulfillment data
    // Return empty -- Medusa retrieves labels from the CreateFulfillmentResult
    return [];
  }

  async getReturnDocuments(
    data: Record<string, unknown>
  ): Promise<never[]> {
    return [];
  }

  async getShipmentDocuments(
    data: Record<string, unknown>
  ): Promise<never[]> {
    return [];
  }

  async retrieveDocuments(
    fulfillmentData: Record<string, unknown>,
    documentType: string
  ): Promise<never[]> {
    return [];
  }

  // --- Helpers ---

  private mapMedusaAddress(address: any): {
    name: string;
    phone?: string;
    address_line1: string;
    address_line2?: string;
    city_locality: string;
    state_province: string;
    postal_code: string;
    country_code: string;
    address_residential_indicator: "unknown";
  } {
    return {
      name: [address.first_name, address.last_name].filter(Boolean).join(" ") ||
        address.name ||
        "N/A",
      phone: address.phone || undefined,
      address_line1: address.address_1 || address.address_line1 || "",
      address_line2: address.address_2 || address.address_line2 || undefined,
      city_locality: address.city || address.city_locality || "",
      state_province: address.province || address.state_province || "",
      postal_code: address.postal_code || "",
      country_code: address.country_code || "US",
      address_residential_indicator: "unknown",
    };
  }
}

export default ShipStationProviderService;
```

## Registration in medusa-config.ts

```typescript
import { defineConfig } from "@medusajs/framework/utils";

export default defineConfig({
  // ... other config
  modules: [
    {
      resolve: "@medusajs/medusa/fulfillment",
      options: {
        providers: [
          {
            resolve: "./src/modules/shipstation",
            id: "shipstation",
            options: {
              api_key: process.env.SHIPSTATION_API_KEY!,
            },
          },
        ],
      },
    },
  ],
});
```

## Environment Variables

```env
SHIPSTATION_API_KEY=your_api_key
SHIPSTATION_API_SECRET=your_api_secret  # Only needed for Basic Auth
```

## Webhook Endpoint (API Route)

```typescript
// src/api/webhooks/shipstation/route.ts

import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import crypto from "crypto";
import { createPublicKey } from "crypto";

// Cache JWKS keys in memory
const jwksCache = new Map<string, crypto.KeyObject>();

async function verifySignature(
  rawBody: string,
  timestamp: string,
  signature: string,
  keyId: string
): Promise<boolean> {
  let publicKey = jwksCache.get(keyId);

  if (!publicKey) {
    const resp = await fetch("https://api.shipengine.com/jwks");
    const jwks = await resp.json();
    const key = jwks.keys.find((k: any) => k.kid === keyId);
    if (!key) return false;
    publicKey = createPublicKey({ key, format: "jwk" });
    jwksCache.set(keyId, publicKey);
  }

  const signedPayload = `${timestamp}.${rawBody}`;
  const verify = crypto.createVerify("RSA-SHA256");
  verify.update(signedPayload);
  return verify.verify(publicKey, signature, "base64");
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const timestamp = req.headers["x-shipengine-timestamp"] as string;
  const signature = req.headers["x-shipengine-rsa-sha256-signature"] as string;
  const keyId = req.headers["x-shipengine-rsa-sha256-key-id"] as string;

  // Get raw body for signature verification
  const rawBody = typeof req.body === "string"
    ? req.body
    : JSON.stringify(req.body);

  // Verify signature if headers present
  if (timestamp && signature && keyId) {
    const valid = await verifySignature(rawBody, timestamp, signature, keyId);
    if (!valid) {
      res.status(401).json({ error: "Invalid webhook signature" });
      return;
    }
  }

  // Respond immediately -- ShipStation requires fast response
  res.sendStatus(200);

  // Process webhook asynchronously
  try {
    const eventType = (req.body as any)?.resource_type;

    switch (eventType) {
      case "track": {
        // Tracking update -- look up fulfillment and update status
        const trackingData = req.body as any;
        // TODO: Look up fulfillment by tracking_number or label_id
        // TODO: Update fulfillment status based on tracking status_code
        // DE = delivered, EX = exception, IT = in transit, etc.
        break;
      }
      case "batch":
      case "batch_processed_v2": {
        // Batch complete -- process results
        break;
      }
      case "fulfillment_shipped_v2": {
        // Order shipped via delegated fulfillment
        break;
      }
      case "fulfillment_rejected_v2": {
        // Fulfillment rejected
        break;
      }
    }
  } catch (error) {
    console.error("Error processing ShipStation webhook:", error);
  }
}
```

## Data Flow: Checkout to Fulfillment

### 1. Admin Setup

```
getFulfillmentOptions() -> GET /v2/carriers -> build carrier__service list
|
Admin picks "USPS Priority Mail" -> validateOption() confirms carrier+service exist
|
canCalculate() returns true -> Medusa knows this is a calculated shipping option
```

### 2. Customer Checkout

```
Customer enters address -> calculatePrice() called
|
POST /v2/rates with address+weight -> get rate for se-123456__usps_priority_mail
|
Return { calculated_amount: 799, is_calculated_price_tax_inclusive: false }
|
Customer sees "$7.99 -- USPS Priority Mail"
|
Customer selects -> validateFulfillmentData() called
|
POST /v2/shipments -> creates shipment -> stores { shipment_id: "se-..." }
```

### 3. Fulfillment

```
Admin clicks "Fulfill" -> createFulfillment() called
|
POST /v2/labels/shipment/{shipment_id} -> purchases label
|
Returns { data: { label_id, tracking_number, ... }, labels: [{ tracking_number, label_url }] }
|
Medusa stores label data and sends tracking notification to customer
```

### 4. Cancellation (if needed)

```
Admin cancels -> cancelFulfillment() called
|
PUT /v2/labels/{label_id}/void -> void label
PUT /v2/shipments/{shipment_id}/cancel -> cancel shipment
```

### 5. Returns

```
Admin creates return -> createReturnFulfillment() called
|
POST /v2/labels/{label_id}/return -> creates return label
|
Returns { data: { return_label_id, ... }, labels: [{ tracking_number, label_url }] }
```

## Fulfillment Option ID Convention

Format: `{carrier_id}__{service_code}` (double underscore separator)

Examples:
- `se-123456__usps_priority_mail`
- `se-789012__ups_ground`
- `se-345678__fedex_home_delivery`

Parse with:
```typescript
const [carrierId, serviceCode] = optionId.split("__");
```

## Data Stored in Fulfillment

After `createFulfillment`, the fulfillment's `data` field contains:

```json
{
  "shipment_id": "se-28529731",
  "label_id": "se-label-123",
  "tracking_number": "9400111899223456789012",
  "carrier_id": "se-123456",
  "service_code": "usps_priority_mail",
  "ship_date": "2026-03-19",
  "shipment_cost": { "currency": "usd", "amount": 7.99 },
  "label_download": {
    "href": "https://api.shipstation.com/v2/downloads/...",
    "pdf": "https://api.shipstation.com/v2/downloads/...pdf",
    "png": "https://api.shipstation.com/v2/downloads/...png",
    "zpl": "https://api.shipstation.com/v2/downloads/...zpl"
  }
}
```

This stores everything needed for cancellation, tracking, returns, and document retrieval.

## Gap Analysis: Current Module vs Complete Implementation

### High Priority (Production Launch)

| Feature | Status | Effort | Fix |
|---|---|---|---|
| `validateOption()` | MISSING | Low | Validate carrier_id + service_code exist |
| Return `tracking_number` | MISSING | Low | Label response has it -- pass through |
| Return `label_download` URLs | MISSING | Low | Label response has them -- return as `labels` array |
| Address validation | MISSING | Low | Change `"no_validation"` to `"validate_and_clean"` |

### Medium Priority (Post-Launch)

| Feature | Status | Effort | Fix |
|---|---|---|---|
| `createReturnFulfillment()` | MISSING | Medium | Use `POST /v2/labels/{id}/return` |
| Webhook handler + signature verification | MISSING | Medium | API route + RSA-SHA256 + JWKS |
| Tracking client method | MISSING | Low | `GET /v2/labels/{id}/track` |
| Document methods | MISSING | Low | Return label download URLs from stored data |

### Lower Priority (Nice to Have)

| Feature | Status | Effort | Fix |
|---|---|---|---|
| Batch label operations | MISSING | High | `POST /v2/batches` workflow |
| Rate estimation (lightweight) | MISSING | Low | `POST /v2/rates/estimate` |
| Carrier/service list caching | MISSING | Low | Cache `getFulfillmentOptions` results |
| Configurable rate selection | MISSING | Medium | Allow cheapest/fastest/specific |
| International HS codes | PARTIAL | Medium | Customs skeleton exists, no HS code support |
| Package dimensions | MISSING | Medium | Currently only sends weight |
| `@ts-ignore` cleanup | PARTIAL | Medium | Strengthen TypeScript types |

### Existing Module Issues to Fix

1. **`getShipment()` may use wrong endpoint** -- Uses `GET /v2/labels/shipment/{id}` but this might be the label purchase endpoint. Verify against actual API.

2. **`createFulfillment` re-creates shipment** -- Fetches original shipment and creates new one. Address mapping (`address_line1` vs `address_1`) is fragile. Could cause mismatches.

3. **No label data returned** -- `createFulfillment` returns `label_id` and `shipment_id` but not `tracking_number` or `label_download` URLs. The `CreateFulfillmentResult` type supports a `labels` array -- use it.

4. **`pickLowestRate` always picks cheapest** -- No merchant configuration for rate selection strategy. Should support cheapest, fastest, or specific service.

5. **Multiple `@ts-ignore` comments** -- Indicates type definitions need improvement. Fix the types rather than suppressing errors.
