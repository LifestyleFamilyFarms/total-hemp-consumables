---
name: shipstation
description: >
  ALWAYS invoke when the user mentions ShipStation, shipping, fulfillment, carrier, label, tracking, shipment,
  rates, or delivery — even if Medusa, storefront, or ecommerce skills also apply. This skill stacks with
  other skills; never skip it because another skill seems relevant. Covers: ShipStation V2 API (powered by
  ShipEngine), rate calculation, label creation/voiding, tracking, webhooks (RSA-SHA256 + JWKS verification),
  carrier management (USPS/UPS/FedEx), return labels, batch operations, warehouse management, Medusa v2
  AbstractFulfillmentProviderService integration, sandbox testing (TEST_ prefix keys, 20 req/min,
  watermarked labels), international shipping (customs, HS codes), address validation, and weight conversion.
  NOT for Stripe, PayPal, Authorize.Net, or payment tasks.
---

# ShipStation Integration Skill

You are an expert in ShipStation API integration for shipping and fulfillment. You know the V2 API (powered by ShipEngine), rate calculation, label generation, tracking, webhook verification, carrier management, and how to build a Medusa v2 fulfillment provider for ShipStation.

ShipStation V2 API is essentially ShipEngine rebranded. The docs at docs.shipstation.com and shipengine.com/docs describe the same API. V1 is being deprecated — always use V2 unless the user specifically needs V1 order management (which Medusa handles natively).

## API Fundamentals

**Base URL:** `https://api.shipstation.com/v2`

**Authentication — two methods:**
```
# Method 1: API Key header (preferred)
api-key: YOUR_API_KEY

# Method 2: Basic Auth
Authorization: Basic <base64(api_key:api_secret)>
```

Credentials go in env vars — never hardcode:
```
SHIPSTATION_API_KEY=your_api_key
SHIPSTATION_API_SECRET=your_api_secret  # Only needed for Basic Auth
```

Sandbox keys always start with `TEST_`. Production and sandbox keys are NOT interchangeable.

**Rate Limits:**

| Environment | Limit |
|---|---|
| V2 Production | 200 requests/minute |
| V2 Sandbox | 20 requests/minute |
| V1 Production | 40 requests/minute |

On 429: respect `X-Rate-Limit-Reset` header, implement exponential backoff. Check `error_source` to distinguish ShipStation vs carrier rate limits.

## Error Response Format

```json
{
  "request_id": "unique-request-id",
  "errors": [
    {
      "error_source": "shipengine",
      "error_type": "validation",
      "error_code": "invalid_address",
      "message": "Human-readable error description"
    }
  ]
}
```

The `errors` array is always present. Empty array = success. Always check it even on HTTP 200. Key fields: `error_source` (shipengine, carrier, order_source), `error_type` (validation, security, account_status, business_rules), `error_code` (30+ codes).

## Core Endpoints

### Carriers
- `GET /carriers` — List all connected carriers
- `GET /carriers/{carrier_id}` — Get carrier details
- `GET /carriers/{carrier_id}/services` — List carrier services
- `GET /carriers/{carrier_id}/packages` — List carrier package types

### Rates
- `POST /rates` — Calculate shipping rates (full shipment data)
- `POST /rates/estimate` — Estimate rates (lightweight, no full shipment)
- `GET /rates/{rate_id}` — Get a specific rate

### Labels
- `POST /labels` — Create label (from shipment data or rate_id)
- `POST /labels/shipment/{shipment_id}` — Purchase label for existing shipment
- `GET /labels/{label_id}` — Get label details
- `PUT /labels/{label_id}/void` — Void a label
- `POST /labels/{label_id}/return` — Create return label
- `GET /labels/{label_id}/track` — Track a label

### Shipments
- `POST /shipments` — Create shipments
- `GET /shipments/{shipment_id}` — Get shipment details
- `GET /shipments/{shipment_id}/rates` — Get rates for existing shipment
- `PUT /shipments/{shipment_id}/cancel` — Cancel a shipment

### Fulfillments
- `POST /fulfillments` — Create fulfillments (mark orders shipped)
- `GET /fulfillments` — List fulfillments

### Batches
- `POST /batches` — Create a batch
- `POST /batches/{batch_id}/add` — Add shipments to batch
- `PUT /batches/{batch_id}` — Process batch (purchase all labels)
- `GET /batches/{batch_id}` — Get batch details and download labels

### Warehouses
- `GET /warehouses` — List warehouses

### Webhooks
- `GET /environment/webhooks` — List webhooks
- `POST /environment/webhooks` — Create webhook
- `PUT /environment/webhooks/{webhook_id}` — Update webhook
- `DELETE /environment/webhooks/{webhook_id}` — Delete webhook

For full rate calculation, label generation, and shipping operation details, read `references/shipping-operations.md`.

For the complete API client pattern with TypeScript types, read `references/api-patterns.md`.

## Medusa v2 Fulfillment Provider

To integrate ShipStation with Medusa v2, extend `AbstractFulfillmentProviderService` from `@medusajs/framework/utils`.

**Method mapping:**

| Medusa Method | ShipStation Operation |
|---|---|
| `getFulfillmentOptions` | `GET /carriers` + `GET /carriers/{id}/services` — build option list |
| `validateOption` | Validate carrier_id and service_code exist |
| `canCalculate` | Return `true` (ShipStation always supports rate calculation) |
| `calculatePrice` | `POST /rates` — get rates, return price |
| `validateFulfillmentData` | `POST /shipments` — create shipment, store `shipment_id` |
| `createFulfillment` | `POST /labels/shipment/{id}` — purchase label, return tracking + label URLs |
| `cancelFulfillment` | `PUT /labels/{id}/void` + `PUT /shipments/{id}/cancel` |
| `createReturnFulfillment` | `POST /labels/{label_id}/return` — create return label |
| `getFulfillmentDocuments` | Return label download URLs from stored fulfillment data |
| `getReturnDocuments` | Return label download URLs for return labels |
| `getShipmentDocuments` | Return shipment label download URLs |
| `retrieveDocuments` | Route to appropriate document method by type |

For the complete provider implementation, read `references/medusa-integration.md`.

**Registration in `medusa-config.ts`:**
```typescript
{
  resolve: "@medusajs/medusa/fulfillment",
  options: {
    providers: [{
      resolve: "./src/modules/shipstation",
      id: "shipstation",
      options: {
        api_key: process.env.SHIPSTATION_API_KEY,
      },
    }],
  },
}
```

## Webhook Verification

ShipStation V2 uses RSA-SHA256 signatures on all webhooks — NOT HMAC. The public keys come from a JWKS endpoint.

**Headers on each webhook:**
- `X-ShipEngine-Timestamp` — Timestamp
- `X-ShipEngine-RSA-SHA256-Signature` — Digital signature (base64)
- `X-ShipEngine-RSA-SHA256-Key-ID` — Key ID for JWKS lookup

**Verification steps:**
1. Get raw, unparsed request body (do NOT parse JSON first)
2. Construct signed payload: `{timestamp}.{raw_body}`
3. Fetch JWKS from `https://api.shipengine.com/jwks`
4. Find key where `kid` matches the Key-ID header
5. Verify RSA-SHA256 signature using the public key
6. Verify timestamp is recent (prevents replay attacks)

**Critical:** Use the raw body exactly as received. Parsing and re-serializing JSON will break signature verification.

```typescript
import crypto from "crypto";
import { createPublicKey } from "crypto";

async function verifyShipStationWebhook(
  rawBody: string,
  timestamp: string,
  signature: string,
  keyId: string,
  jwksCache: Map<string, crypto.KeyObject>
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
```

**Webhook events:**

| Event | Description |
|---|---|
| `track` | Tracking event for a package |
| `batch` | Batch operation completed |
| `fulfillment_shipped_v2` | Order moved to Shipped status |
| `fulfillment_rejected_v2` | Fulfillment provider rejected order |
| `carrier_connected` | New carrier connected |
| `rate` | Shipment rate updated |

For webhook handler implementation, read `references/medusa-integration.md`.

## Carrier-Specific Rules

**USPS:**
- Weight limit: 70 lbs (31.75 kg)
- Combined length+girth: 108" (Priority Mail), 130" (Ground Advantage)
- HS codes required for all international commercial shipments (since Sept 2025)
- Ground Saver rates may not be available via API

**UPS:**
- Weight limit: 150 lbs (68 kg), 31.5 kg for B2C/C2B/C2C international per parcel
- Length limit: 108", length+girth: 165"
- Use `ups_walleted` carrier code for built-in accounts (NOT `ups`)
- Ground Saver: $15 surcharge for remote ZIP codes (AK, HI, some contiguous US)

**FedEx:**
- Weight limit: 150 lbs (68 kg)
- Length limit: 108"
- Supports `direct_signature` confirmation (FedEx-only)

## Weight Conversion

Medusa stores weights in grams. ShipStation accepts `ounce`, `pound`, `gram`, `kilogram`.

```typescript
// Convert Medusa grams to ShipStation kilograms
const weightKg = Math.max(Number((totalGrams / 1000).toFixed(4)), 0.001);
// Floor of 0.001 kg prevents zero-weight errors that cause carrier rejection
```

## Testing

**Sandbox:** Use API key with `TEST_` prefix. Same base URL. 20 req/min limit.

What works in sandbox: shipments, rates, labels (watermarked), all CRUD operations. No real charges.

What does NOT work: tracking (requires real packages in mail stream). Cannot simulate tracking events.

For full debugging reference, read `references/debugging.md`.

## Existing Total Hemp Module

The existing module at `src/modules/shipstation/` uses V2 API. It has `getFulfillmentOptions`, `canCalculate`, `calculatePrice`, `validateFulfillmentData`, `createFulfillment`, and `cancelFulfillment` implemented. Missing: `validateOption`, `createReturnFulfillment`, all document methods, webhook handling, tracking.

Key patterns: fulfillment option ID format is `{carrier_id}__{service_code}`, stores `shipment_id` and `label_id` in fulfillment data, converts grams to kilograms, uses `no_validation` for addresses (should upgrade to `validate_and_clean`).

For the gap analysis and improvement roadmap, read `references/medusa-integration.md`.

## Reference Files

| File | When to Read |
|------|-------------|
| `references/api-patterns.md` | API client setup, TypeScript types, HTTP client patterns |
| `references/medusa-integration.md` | Complete Medusa v2 fulfillment provider, data flow, gap analysis |
| `references/shipping-operations.md` | Rate calculation, label generation, tracking, returns, batches |
| `references/debugging.md` | Common issues, error handling, sandbox gotchas, webhook verification |
