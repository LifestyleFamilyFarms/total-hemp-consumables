# ShipStation V2 API Patterns — Complete Code Reference

## Table of Contents
1. [HTTP Client Setup](#1-http-client-setup)
2. [TypeScript Types](#2-typescript-types)
3. [List Carriers](#3-list-carriers)
4. [Get Carrier Services](#4-get-carrier-services)
5. [List Warehouses](#5-list-warehouses)
6. [Create Shipment](#6-create-shipment)
7. [Get Shipping Rates](#7-get-shipping-rates)
8. [Estimate Rates (Lightweight)](#8-estimate-rates)
9. [Purchase Label for Shipment](#9-purchase-label)
10. [Void Label](#10-void-label)
11. [Cancel Shipment](#11-cancel-shipment)
12. [Create Return Label](#12-return-label)
13. [Track by Label ID](#13-track-label)
14. [Webhook CRUD](#14-webhook-crud)
15. [Batch Operations](#15-batch-operations)

---

## 1. HTTP Client Setup {#1-http-client-setup}

```typescript
import { MedusaError } from "@medusajs/framework/utils";

interface ShipStationClientOptions {
  api_key: string;
  api_secret?: string;
}

class ShipStationClient {
  private baseUrl = "https://api.shipstation.com/v2";
  private headers: Record<string, string>;

  constructor(private options: ShipStationClientOptions) {
    this.headers = {
      "Content-Type": "application/json",
      "api-key": options.api_key,
    };
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const response = await fetch(url, {
      method,
      headers: this.headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      let errorMessage: string;
      try {
        const errorBody = await response.json();
        const errors = errorBody.errors || [];
        errorMessage = errors.map((e: any) => e.message).join("; ") ||
          `HTTP ${response.status}`;
      } catch {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }

      if (response.status === 429) {
        const resetSeconds = response.headers.get("X-Rate-Limit-Reset");
        throw new MedusaError(
          MedusaError.Types.NOT_ALLOWED,
          `Rate limit exceeded. Reset in ${resetSeconds}s. ${errorMessage}`
        );
      }

      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `ShipStation API error: ${errorMessage}`
      );
    }

    return response.json() as Promise<T>;
  }

  async get<T>(path: string): Promise<T> {
    return this.request<T>("GET", path);
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>("POST", path, body);
  }

  async put<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>("PUT", path, body);
  }

  async delete<T>(path: string): Promise<T> {
    return this.request<T>("DELETE", path);
  }
}
```

**Alternative with Basic Auth:**
```typescript
const authHeader = Buffer.from(
  `${options.api_key}:${options.api_secret}`
).toString("base64");

this.headers = {
  "Content-Type": "application/json",
  Authorization: `Basic ${authHeader}`,
};
```

---

## 2. TypeScript Types {#2-typescript-types}

```typescript
// --- Carriers ---

export interface Carrier {
  carrier_id: string;
  carrier_code: string;
  account_number: string;
  requires_funded_amount: boolean;
  balance: number;
  nickname: string;
  friendly_name: string;
  primary: boolean;
  has_multi_package_supporting_services: boolean;
  supports_label_messages: boolean;
  disabled_by_billing_plan: boolean;
  services: CarrierService[];
  packages: CarrierPackage[];
}

export interface CarrierService {
  carrier_id: string;
  carrier_code: string;
  service_code: string;
  name: string;
  domestic: boolean;
  international: boolean;
  is_multi_package_supported: boolean;
}

export interface CarrierPackage {
  package_id: string | null;
  package_code: string;
  name: string;
  dimensions: Dimensions | null;
  description: string;
}

export interface CarriersResponse {
  carriers: Carrier[];
}

// --- Addresses ---

export interface ShipStationAddress {
  name: string;
  phone?: string;
  email?: string;
  company_name?: string;
  address_line1: string;
  address_line2?: string;
  address_line3?: string;
  city_locality: string;
  state_province: string;
  postal_code: string;
  country_code: string;
  address_residential_indicator?: "unknown" | "yes" | "no";
}

// --- Weight & Dimensions ---

export interface Weight {
  value: number;
  unit: "ounce" | "pound" | "gram" | "kilogram";
}

export interface Dimensions {
  unit: "inch" | "centimeter";
  length: number;
  width: number;
  height: number;
}

// --- Packages ---

export interface Package {
  weight: Weight;
  dimensions?: Dimensions;
  insured_value?: MonetaryValue;
  package_code?: string;
  label_messages?: {
    reference1?: string;
    reference2?: string;
    reference3?: string;
  };
}

// --- Monetary ---

export interface MonetaryValue {
  currency: string;
  amount: number;
}

// --- Rates ---

export interface Rate {
  rate_id: string;
  rate_type: string;
  carrier_id: string;
  shipping_amount: MonetaryValue;
  insurance_amount: MonetaryValue;
  confirmation_amount: MonetaryValue;
  other_amount: MonetaryValue;
  tax_amount?: MonetaryValue;
  zone: number;
  package_type: string;
  delivery_days: number;
  guaranteed_service: boolean;
  estimated_delivery_date: string;
  carrier_delivery_days: string;
  ship_date: string;
  negotiate_rate: boolean;
  service_type: string;
  service_code: string;
  trackable: boolean;
  carrier_code: string;
  carrier_nickname: string;
  carrier_friendly_name: string;
  validation_status: string;
  warning_messages: string[];
  error_messages: string[];
}

export interface RateResponse {
  rates: Rate[];
  invalid_rates: Rate[];
  rate_request_id: string;
  shipment_id: string;
  created_at: string;
  status: string;
  errors: ApiError[];
}

export interface GetShippingRatesRequest {
  shipment: {
    carrier_id?: string;
    service_code?: string;
    ship_to: ShipStationAddress;
    ship_from: ShipStationAddress;
    packages: Package[];
    items?: ShipmentItem[];
    customs?: CustomsInfo;
  };
  rate_options: {
    carrier_ids: string[];
    service_codes?: string[];
    preferred_currency?: string;
    calculate_tax_amount?: boolean;
    is_return?: boolean;
  };
}

export interface RateEstimateRequest {
  carrier_ids: string[];
  from_country_code: string;
  from_postal_code: string;
  to_country_code: string;
  to_postal_code: string;
  weight: Weight;
  dimensions?: Dimensions;
  confirmation?: string;
  address_residential_indicator?: "unknown" | "yes" | "no";
}

// --- Shipments ---

export interface ShipmentItem {
  name: string;
  quantity: number;
  sku?: string;
  harmonized_tariff_code?: string;
}

export interface CustomsInfo {
  contents: "merchandise" | "gift" | "documents" | "returned_goods" | "sample";
  non_delivery: "return_to_sender" | "treat_as_abandoned";
}

// --- Labels ---

export interface Label {
  label_id: string;
  status: "processing" | "completed" | "error" | "voided";
  shipment_id: string;
  ship_date: string;
  shipment_cost: MonetaryValue;
  insurance_cost: MonetaryValue;
  tracking_number: string;
  is_return_label: boolean;
  carrier_id: string;
  service_code: string;
  trackable: string;
  tracking_status: string;
  label_download: LabelDownload;
  carrier_code: string;
  voided: boolean;
  voided_at: string | null;
}

export interface LabelDownload {
  href: string;
  pdf: string;
  png: string;
  zpl: string;
}

export interface VoidLabelResponse {
  approved: boolean;
  message: string;
}

// --- Tracking ---

export interface TrackingEvent {
  occurred_at: string;
  carrier_occurred_at: string;
  description: string;
  city_locality: string;
  state_province: string;
  postal_code: string;
  country_code: string;
  company_name: string;
  signer: string;
  event_code: string;
  latitude?: number;
  longitude?: number;
}

export interface TrackingInfo {
  tracking_number: string;
  status_code: "UN" | "AC" | "IT" | "DE" | "EX" | "AT" | "NY";
  status_description: string;
  carrier_status_code: string;
  carrier_status_description: string;
  shipped_date: string;
  estimated_delivery_date: string;
  actual_delivery_date: string | null;
  exception_description: string | null;
  events: TrackingEvent[];
}

// --- Warehouses ---

export interface Warehouse {
  warehouse_id: string;
  name: string;
  created_at: string;
  origin_address: ShipStationAddress;
  return_address: ShipStationAddress;
  is_default: boolean;
}

export interface WarehousesResponse {
  warehouses: Warehouse[];
}

// --- Webhooks ---

export interface Webhook {
  webhook_id: string;
  url: string;
  event: string;
  headers: Record<string, string>;
}

// --- Batches ---

export interface Batch {
  batch_id: string;
  external_batch_id: string;
  status: string;
  count: number;
  completed: number;
  errors: number;
  label_download: LabelDownload | null;
  form_download: { href: string } | null;
}

// --- Errors ---

export interface ApiError {
  error_source: string;
  error_type: string;
  error_code: string;
  message: string;
}
```

---

## 3. List Carriers {#3-list-carriers}

```typescript
async getCarriers(): Promise<Carrier[]> {
  const response = await this.get<CarriersResponse>("/carriers");
  return response.carriers;
}
```

Filter out disabled carriers:
```typescript
const carriers = await client.getCarriers();
const activeCarriers = carriers.filter(c => !c.disabled_by_billing_plan);
```

---

## 4. Get Carrier Services {#4-get-carrier-services}

```typescript
async getCarrierServices(carrierId: string): Promise<CarrierService[]> {
  const response = await this.get<{ services: CarrierService[] }>(
    `/carriers/${carrierId}/services`
  );
  return response.services;
}
```

---

## 5. List Warehouses {#5-list-warehouses}

```typescript
async getWarehouses(): Promise<Warehouse[]> {
  const response = await this.get<WarehousesResponse>("/warehouses");
  return response.warehouses;
}
```

---

## 6. Create Shipment {#6-create-shipment}

```typescript
async createShipment(data: {
  carrier_id: string;
  service_code: string;
  ship_to: ShipStationAddress;
  ship_from: ShipStationAddress;
  packages: Package[];
  items?: ShipmentItem[];
  customs?: CustomsInfo;
}): Promise<{ shipment_id: string }> {
  const response = await this.post<any>("/shipments", {
    shipments: [data],
  });
  // Response contains array — return first
  const shipment = response.shipments?.[0] || response;
  return { shipment_id: shipment.shipment_id };
}
```

---

## 7. Get Shipping Rates {#7-get-shipping-rates}

```typescript
async getShippingRates(request: GetShippingRatesRequest): Promise<RateResponse> {
  const response = await this.post<RateResponse>("/rates", request);

  if (response.errors?.length) {
    const messages = response.errors.map(e => e.message).join("; ");
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      `Rate calculation failed: ${messages}`
    );
  }

  if (!response.rates?.length) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "No rates returned. Check carrier config, address, and weight."
    );
  }

  return response;
}

// Get rates for an existing shipment
async getShipmentRates(shipmentId: string): Promise<RateResponse> {
  return this.get<RateResponse>(`/shipments/${shipmentId}/rates`);
}
```

---

## 8. Estimate Rates (Lightweight) {#8-estimate-rates}

```typescript
async estimateRates(request: RateEstimateRequest): Promise<Rate[]> {
  const response = await this.post<Rate[]>("/rates/estimate", request);
  return response;
}
```

Use this when you only need a rough estimate (no full shipment data). Good for checkout previews before full address is entered.

---

## 9. Purchase Label for Shipment {#9-purchase-label}

```typescript
async purchaseLabelForShipment(shipmentId: string): Promise<Label> {
  return this.post<Label>(`/labels/shipment/${shipmentId}`, {});
}

// Or create label directly with all data
async createLabel(data: {
  shipment?: any;
  rate_id?: string;
  label_format?: "pdf" | "png" | "zpl";
  label_layout?: "4x6" | "letter";
  validate_address?: "no_validation" | "validate_only" | "validate_and_clean";
}): Promise<Label> {
  return this.post<Label>("/labels", data);
}
```

---

## 10. Void Label {#10-void-label}

```typescript
async voidLabel(labelId: string): Promise<VoidLabelResponse> {
  return this.put<VoidLabelResponse>(`/labels/${labelId}/void`);
}
```

---

## 11. Cancel Shipment {#11-cancel-shipment}

```typescript
async cancelShipment(shipmentId: string): Promise<void> {
  await this.put<any>(`/shipments/${shipmentId}/cancel`);
}
```

---

## 12. Create Return Label {#12-return-label}

```typescript
async createReturnLabel(labelId: string): Promise<Label> {
  return this.post<Label>(`/labels/${labelId}/return`, {});
}

// Or create return label directly
async createReturnLabelDirect(data: {
  shipment: any;
  is_return_label: true;
  rma_number?: string;
  outbound_label_id?: string;
  charge_event?: "carrier_default" | "on_creation" | "on_carrier_acceptance";
}): Promise<Label> {
  return this.post<Label>("/labels", {
    ...data,
    is_return_label: true,
  });
}
```

---

## 13. Track by Label ID {#13-track-label}

```typescript
async trackLabel(labelId: string): Promise<TrackingInfo> {
  return this.get<TrackingInfo>(`/labels/${labelId}/track`);
}
```

**Tracking status codes:**

| Code | Meaning |
|---|---|
| `UN` | Unknown / Not yet shipped |
| `AC` | Accepted by carrier |
| `IT` | In Transit |
| `DE` | Delivered |
| `EX` | Exception (problem) |
| `AT` | Delivery Attempt |
| `NY` | Not Yet in System |

---

## 14. Webhook CRUD {#14-webhook-crud}

```typescript
async listWebhooks(): Promise<Webhook[]> {
  const response = await this.get<Webhook[]>("/environment/webhooks");
  return response;
}

async createWebhook(url: string, event: string): Promise<Webhook> {
  return this.post<Webhook>("/environment/webhooks", { url, event });
}

async updateWebhook(webhookId: string, url: string, event: string): Promise<Webhook> {
  return this.put<Webhook>(`/environment/webhooks/${webhookId}`, { url, event });
}

async deleteWebhook(webhookId: string): Promise<void> {
  await this.delete<any>(`/environment/webhooks/${webhookId}`);
}
```

**V2 webhook events:** `track`, `batch`, `batch_processed_v2`, `carrier_connected`, `order_source_refresh_complete`, `rate`, `report_complete`, `sales_orders_imported`, `fulfillment_shipped_v2`, `fulfillment_rejected_v2`

---

## 15. Batch Operations {#15-batch-operations}

```typescript
async createBatch(shipmentIds: string[]): Promise<Batch> {
  return this.post<Batch>("/batches", {
    shipment_ids: shipmentIds,
  });
}

async addShipmentsToBatch(
  batchId: string,
  shipmentIds: string[]
): Promise<void> {
  await this.post<any>(`/batches/${batchId}/add`, {
    shipment_ids: shipmentIds,
  });
}

async processBatch(batchId: string): Promise<void> {
  await this.put<any>(`/batches/${batchId}`, {});
}

async getBatch(batchId: string): Promise<Batch> {
  return this.get<Batch>(`/batches/${batchId}`);
}
```

**Batch requirements:**
- All shipments must use `warehouse_id` (not `ship_from`)
- All shipments in a batch must share the same `warehouse_id`
- Default label format: 4x6 PDF
- Subscribe to `batch_processed_v2` webhook to know when complete
