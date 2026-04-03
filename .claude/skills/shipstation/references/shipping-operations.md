# ShipStation Shipping Operations — Rate Calculation, Labels, Tracking, Returns, Batches

## Table of Contents
1. [Rate Calculation](#1-rate-calculation)
2. [Label Generation](#2-label-generation)
3. [Label Voiding](#3-label-voiding)
4. [Return Labels](#4-return-labels)
5. [Tracking](#5-tracking)
6. [Batch Operations](#6-batch-operations)
7. [International Shipping](#7-international-shipping)
8. [Address Validation](#8-address-validation)
9. [Carrier Configuration](#9-carrier-configuration)

---

## 1. Rate Calculation {#1-rate-calculation}

### Full Rate Calculation (POST /v2/rates)

Use when you have complete shipment data (addresses, weight, dimensions):

```typescript
const rateRequest = {
  shipment: {
    carrier_id: "se-123456",
    service_code: "usps_priority_mail",
    ship_to: {
      name: "John Doe",
      address_line1: "123 Main St",
      city_locality: "Austin",
      state_province: "TX",
      postal_code: "78756",
      country_code: "US",
      address_residential_indicator: "unknown",
    },
    ship_from: {
      name: "My Store",
      address_line1: "456 Commerce Ave",
      city_locality: "Dallas",
      state_province: "TX",
      postal_code: "75201",
      country_code: "US",
    },
    packages: [
      {
        weight: { value: 1.5, unit: "kilogram" },
        dimensions: { unit: "inch", length: 10, width: 8, height: 4 },
      },
    ],
  },
  rate_options: {
    carrier_ids: ["se-123456"],
    service_codes: ["usps_priority_mail"],
    preferred_currency: "usd",
    calculate_tax_amount: true,
    is_return: false,
  },
};

const response = await client.post("/rates", rateRequest);
```

### Rate Estimate (POST /v2/rates/estimate)

Lighter request when you only have postal codes and weight. Good for checkout previews:

```typescript
const estimateRequest = {
  carrier_ids: ["se-123456"],
  from_country_code: "US",
  from_postal_code: "75201",
  to_country_code: "US",
  to_postal_code: "78756",
  weight: { value: 1.0, unit: "pound" },
  dimensions: { unit: "inch", length: 5.0, width: 5.0, height: 5.0 },
  confirmation: "none",
  address_residential_indicator: "unknown",
};

const rates = await client.post("/rates/estimate", estimateRequest);
```

### Rate Response Format

```json
{
  "shipment_id": "se-28529731",
  "carrier_id": "se-123456",
  "rate_response": {
    "rates": [
      {
        "rate_id": "se-rate-123",
        "rate_type": "check",
        "carrier_id": "se-123456",
        "shipping_amount": { "currency": "usd", "amount": 7.99 },
        "insurance_amount": { "currency": "usd", "amount": 0.00 },
        "confirmation_amount": { "currency": "usd", "amount": 0.00 },
        "other_amount": { "currency": "usd", "amount": 0.00 },
        "tax_amount": { "currency": "usd", "amount": 0.00 },
        "delivery_days": 3,
        "estimated_delivery_date": "2026-03-22T00:00:00Z",
        "service_code": "usps_priority_mail",
        "service_type": "USPS Priority Mail",
        "carrier_code": "stamps_com",
        "trackable": true
      }
    ],
    "errors": []
  }
}
```

### Total Cost Calculation

Always sum ALL cost components -- not just `shipping_amount`:

```typescript
function calculateTotalRate(rate: Rate): number {
  return (
    rate.shipping_amount.amount +
    rate.insurance_amount.amount +
    rate.confirmation_amount.amount +
    rate.other_amount.amount +
    (rate.tax_amount?.amount || 0)
  );
}
```

### Rate Shopping (Multiple Carriers)

Pass multiple carrier IDs to compare rates across carriers:

```typescript
const rateRequest = {
  shipment: { /* ... */ },
  rate_options: {
    carrier_ids: ["se-123456", "se-789012", "se-345678"],
    // Omit service_codes to get all services from each carrier
  },
};
```

The response will contain rates from all carriers. Sort/filter as needed:

```typescript
// Cheapest rate
const cheapest = rates.sort(
  (a, b) => calculateTotalRate(a) - calculateTotalRate(b)
)[0];

// Fastest rate
const fastest = rates.sort(
  (a, b) => a.delivery_days - b.delivery_days
)[0];
```

### Weight Units

| Unit | When to Use |
|---|---|
| `ounce` | Light items, USPS First Class |
| `pound` | US carriers, general use |
| `gram` | Medusa default, international |
| `kilogram` | SI standard, international carriers |

Medusa stores weights in grams. Convert to kilograms:
```typescript
const weightKg = Math.max(Number((totalGrams / 1000).toFixed(4)), 0.001);
```

The 0.001 kg floor prevents zero-weight errors from carriers.

### Address Residential Indicator

| Value | Effect |
|---|---|
| `"unknown"` | Let carrier determine (may add residential surcharge) |
| `"yes"` | Explicitly residential (surcharge applied) |
| `"no"` | Explicitly commercial (no residential surcharge) |

Default to `"unknown"` unless you have address classification data.

---

## 2. Label Generation {#2-label-generation}

### Three Methods

**Method 1: Direct label creation (full shipment data)**
```typescript
const label = await client.post("/labels", {
  shipment: {
    carrier_id: "se-123456",
    service_code: "usps_priority_mail",
    ship_to: { /* ... */ },
    ship_from: { /* ... */ },
    packages: [{ weight: { value: 1.5, unit: "kilogram" } }],
  },
  label_format: "pdf",
  label_layout: "4x6",
  validate_address: "validate_and_clean",
});
```

**Method 2: From a rate_id**
```typescript
const label = await client.post("/labels", {
  rate_id: "se-rate-123", // From prior rate calculation
});
```

**Method 3: From a shipment_id (what the existing module uses)**
```typescript
const label = await client.post(`/labels/shipment/${shipmentId}`, {});
```

### Label Response

```json
{
  "label_id": "se-label-123",
  "status": "completed",
  "shipment_id": "se-ship-456",
  "ship_date": "2026-03-19",
  "shipment_cost": { "currency": "usd", "amount": 7.99 },
  "insurance_cost": { "currency": "usd", "amount": 0.00 },
  "tracking_number": "9400111899223456789012",
  "is_return_label": false,
  "carrier_id": "se-123456",
  "service_code": "usps_priority_mail",
  "trackable": "yes",
  "tracking_status": "in_transit",
  "label_download": {
    "href": "https://api.shipstation.com/v2/downloads/...",
    "pdf": "https://api.shipstation.com/v2/downloads/...pdf",
    "png": "https://api.shipstation.com/v2/downloads/...png",
    "zpl": "https://api.shipstation.com/v2/downloads/...zpl"
  },
  "carrier_code": "stamps_com",
  "voided": false,
  "voided_at": null
}
```

### Label Formats

| Format | Use Case |
|---|---|
| `pdf` | Universal, recommended default |
| `png` | Embedding in web pages |
| `zpl` | Zebra thermal printers only (not all carriers) |

### Label Statuses

| Status | Meaning |
|---|---|
| `processing` | Being generated |
| `completed` | Ready for download |
| `error` | Creation failed |
| `voided` | Has been voided |

### Address Validation on Label Creation

```typescript
const label = await client.post("/labels", {
  // ... shipment data
  validate_address: "validate_and_clean", // Recommended for production
});
```

| Value | Behavior |
|---|---|
| `no_validation` | Skip validation (current module default -- risky) |
| `validate_only` | Return error if invalid, don't correct |
| `validate_and_clean` | Auto-correct (e.g., add ZIP+4). Recommended. |

---

## 3. Label Voiding {#3-label-voiding}

```typescript
const result = await client.put(`/labels/${labelId}/void`);
```

Response:
```json
{
  "approved": true,
  "message": "Label voided successfully"
}
```

**Important:** Refunds are NOT guaranteed when voiding. Depends on carrier and timing. Some carriers have void windows (e.g., must void within 24 hours).

---

## 4. Return Labels {#4-return-labels}

### From Existing Outbound Label

```typescript
const returnLabel = await client.post(`/labels/${outboundLabelId}/return`, {});
```

This creates a return label with the addresses swapped (ship_to becomes ship_from and vice versa).

### Direct Return Label

```typescript
const returnLabel = await client.post("/labels", {
  shipment: { /* ... with swapped addresses */ },
  is_return_label: true,
  rma_number: "RMA-12345",        // Optional: Return Merchandise Authorization
  outbound_label_id: "se-label-x", // Optional: link to outbound
  charge_event: "on_carrier_acceptance", // When to charge for return
});
```

### charge_event Options

| Value | When Charged |
|---|---|
| `carrier_default` | Carrier decides (usually on creation) |
| `on_creation` | Charged immediately |
| `on_carrier_acceptance` | Charged when carrier first scans it |

Use `on_carrier_acceptance` for "pay only if customer actually ships it" model.

---

## 5. Tracking {#5-tracking}

### Poll Tracking

```typescript
const tracking = await client.get(`/labels/${labelId}/track`);
```

Response:
```json
{
  "tracking_number": "9400111899223456789012",
  "status_code": "IT",
  "status_description": "In Transit",
  "carrier_status_code": "OC",
  "carrier_status_description": "Order Connected",
  "shipped_date": "2026-03-15T10:00:00Z",
  "estimated_delivery_date": "2026-03-19T00:00:00Z",
  "actual_delivery_date": null,
  "exception_description": null,
  "events": [
    {
      "occurred_at": "2026-03-17T08:30:00Z",
      "description": "Departed USPS Facility",
      "city_locality": "Dallas",
      "state_province": "TX",
      "postal_code": "75260",
      "country_code": "US",
      "event_code": "IT"
    }
  ]
}
```

### Tracking Status Codes

| Code | Meaning | Medusa Mapping |
|---|---|---|
| `UN` | Unknown / Not yet shipped | `not_fulfilled` |
| `AC` | Accepted by carrier | `shipped` |
| `IT` | In Transit | `shipped` |
| `DE` | Delivered | `delivered` |
| `EX` | Exception (problem) | `requires_action` |
| `AT` | Delivery Attempt | `shipped` |
| `NY` | Not Yet in System | `not_fulfilled` |

### Real-Time Tracking via Webhooks

Subscribe to `track` event instead of polling:

```typescript
await client.post("/environment/webhooks", {
  url: "https://your-domain.com/webhooks/shipstation",
  event: "track",
});
```

**Limitation:** Sandbox cannot simulate tracking events. Tracking requires real packages in the mail stream.

### Tracking Webhook to Medusa Status Update Pattern

```typescript
function mapTrackingToMedusaStatus(
  statusCode: string
): "not_fulfilled" | "shipped" | "delivered" | "requires_action" {
  switch (statusCode) {
    case "DE":
      return "delivered";
    case "EX":
      return "requires_action";
    case "AC":
    case "IT":
    case "AT":
      return "shipped";
    case "UN":
    case "NY":
    default:
      return "not_fulfilled";
  }
}
```

---

## 6. Batch Operations {#6-batch-operations}

For processing many shipments at once (10+ labels). More efficient than individual label purchases.

### Workflow

```typescript
// 1. Create batch with shipment IDs
const batch = await client.post("/batches", {
  shipment_ids: ["se-ship-1", "se-ship-2", "se-ship-3"],
});

// 2. Optionally add more shipments
await client.post(`/batches/${batch.batch_id}/add`, {
  shipment_ids: ["se-ship-4", "se-ship-5"],
});

// 3. Process batch (purchases all labels)
await client.put(`/batches/${batch.batch_id}`, {});

// 4. Poll or wait for webhook, then download
const completed = await client.get(`/batches/${batch.batch_id}`);
// completed.label_download.pdf -> Combined PDF of all labels
// completed.form_download.href -> Customs forms (if applicable)
```

### Batch Requirements

- All shipments must use `warehouse_id` (not inline `ship_from` address)
- All shipments in a batch must share the same `warehouse_id`
- Default label format: 4x6 PDF
- Subscribe to `batch_processed_v2` webhook to avoid polling

### Batch Status

| Status | Meaning |
|---|---|
| `open` | Batch created, not yet processed |
| `queued` | Processing queued |
| `processing` | Labels being generated |
| `completed` | All labels done (check `errors` count) |
| `completed_with_errors` | Some labels failed |

---

## 7. International Shipping {#7-international-shipping}

### Required Fields

```typescript
const internationalShipment = {
  carrier_id: "se-123456",
  service_code: "usps_priority_mail_international",
  ship_to: {
    name: "Jean Dupont",
    address_line1: "15 Rue de Rivoli",
    city_locality: "Paris",
    state_province: "Ile-de-France",
    postal_code: "75001",
    country_code: "FR",
  },
  ship_from: { /* US warehouse */ },
  packages: [
    {
      weight: { value: 2.0, unit: "kilogram" },
      dimensions: { unit: "inch", length: 12, width: 8, height: 6 },
    },
  ],
  items: [
    {
      name: "Hemp CBD Oil 30ml",
      quantity: 2,
      sku: "CBD-OIL-30",
      harmonized_tariff_code: "330499", // Required 6-digit HS code
    },
  ],
  customs: {
    contents: "merchandise",
    non_delivery: "return_to_sender",
  },
};
```

### HS Code Requirement

As of September 2025, USPS requires 6-digit Harmonized System (HS) codes on all international commercial shipments. Missing HS codes will cause label creation to fail.

Common HS codes for hemp/CBD products:
- `330499` -- Other beauty or skin care preparations
- `210690` -- Food supplements
- `330790` -- Other perfumery or cosmetic preparations

### Tax Identifiers

For some countries, sender and/or recipient tax identifiers (VAT, EORI, etc.) are required. Add these to the shipment request as needed.

---

## 8. Address Validation {#8-address-validation}

### On Label Creation

Set `validate_address` in the label request:

```typescript
validate_address: "validate_and_clean" // Recommended for production
```

`validate_and_clean` will:
- Correct minor address issues
- Add ZIP+4 codes automatically
- Standardize address formatting
- Return error only if address is truly invalid

### Standalone Validation

ShipEngine (the engine behind ShipStation V2) supports standalone address validation:

```typescript
const result = await client.post("/addresses/validate", {
  address: {
    name: "John Doe",
    address_line1: "123 Main St",
    city_locality: "Austin",
    state_province: "TX",
    postal_code: "78756",
    country_code: "US",
  },
});
```

Use at checkout to catch address issues before the fulfillment step.

---

## 9. Carrier Configuration {#9-carrier-configuration}

### Built-in vs Custom Carrier Accounts

ShipStation provides built-in carrier accounts (e.g., USPS via Stamps.com) that work out of the box. You can also connect your own carrier accounts for negotiated rates.

### Carrier Codes vs Carrier IDs

- **`carrier_id`** -- Unique ID for your specific carrier connection (e.g., `se-123456`). Used in API calls.
- **`carrier_code`** -- Generic carrier identifier (e.g., `stamps_com`, `ups_walleted`, `fedex`). Used for reference.

### Common Carrier Codes

| Carrier | Code | Notes |
|---|---|---|
| USPS (built-in) | `stamps_com` | Default USPS integration |
| UPS (built-in) | `ups_walleted` | Built-in UPS. NOT `ups`. |
| FedEx | `fedex` | Requires own account |
| DHL Express | `dhl_express` | International |

### Weight Limits by Carrier

| Carrier | Max Weight | Max Length | Max Length+Girth |
|---|---|---|---|
| USPS | 70 lbs (31.75 kg) | -- | 108" (Priority), 130" (Ground Advantage) |
| UPS | 150 lbs (68 kg) | 108" | 165" |
| FedEx | 150 lbs (68 kg) | 108" | -- |

### Confirmation Types

| Confirmation | Carriers | Effect |
|---|---|---|
| `none` | All | No delivery confirmation |
| `delivery` | All | Standard delivery confirmation |
| `signature` | All | Signature required |
| `adult_signature` | UPS, FedEx | Adult signature required |
| `direct_signature` | FedEx only | Direct signature (in-person only) |
