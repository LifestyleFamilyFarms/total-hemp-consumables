# ShipStation Debugging & Common Issues

## Quick Debugging Flowchart

```
API call failed?
+-- Check HTTP status code
|   +-- 200 -> Check response.errors array (may still contain errors!)
|   +-- 400 -> Validation error. Read error_code + message.
|   +-- 401 -> Auth failed. Check API key.
|   |   +-- Using TEST_ key against production? Or production key in sandbox?
|   |   +-- Key revoked or rotated?
|   |   +-- Missing api-key header?
|   +-- 404 -> Resource not found. Check shipment_id/label_id/carrier_id.
|   +-- 429 -> Rate limit. Check X-Rate-Limit-Reset header.
|   |   +-- V2 Production: 200/min
|   |   +-- V2 Sandbox: 20/min (very easy to hit)
|   |   +-- Check error_source -- might be carrier rate limit, not ShipStation.
|   +-- 500 -> ShipStation server error. Retry with exponential backoff.
+-- Check error_source field
|   +-- "shipengine" -> ShipStation/ShipEngine issue
|   +-- "carrier" -> Carrier-side problem (may be transient)
|   +-- Other -> Third-party integration issue
+-- No rates returned?
|   +-- Carrier not configured (billing/payment missing)
|   +-- Service unavailable for route
|   +-- Wrong carrier code (ups vs ups_walleted)
|   +-- Invalid or incomplete address
|   +-- Weight is 0 or unreasonable
|   +-- Carrier disabled_by_billing_plan = true
|   +-- Check rate_response.errors for specifics
+-- Label creation failed?
|   +-- Invalid address (carrier rejection)
|   +-- Weight exceeds carrier limit
|   +-- Package too large (length+girth)
|   +-- Missing required fields
|   +-- HS code missing (USPS international)
|   +-- No payment method on carrier account
|   +-- Rate expired (if using rate_id)
+-- Always log request_id for support cases.
```

## Error Response Structure

```json
{
  "request_id": "abc-123-def-456",
  "errors": [
    {
      "error_source": "shipengine",
      "error_type": "validation",
      "error_code": "invalid_address",
      "message": "The city 'Austen' is not valid for the state 'TX'."
    }
  ]
}
```

**Always check `errors` array even on HTTP 200.** Some operations partially succeed.

## Common Error Codes

### Validation Errors (error_type: "validation")

| error_code | Meaning | Fix |
|---|---|---|
| `invalid_address` | Address failed validation | Check spelling, ZIP, state |
| `invalid_field_value` | Field has wrong format/value | Check API docs for valid values |
| `required_field_missing` | Required field not provided | Check request body completeness |
| `minimum_postal_code_verification_failed` | ZIP code doesn't match city/state | Correct the postal code |

### Account Errors (error_type: "account_status")

| error_code | Meaning | Fix |
|---|---|---|
| `auto_fund_not_supported` | Can't auto-fund account | Add funds manually in dashboard |
| `insufficient_funds` | Not enough account balance | Add funds to carrier account |

### Business Rule Errors (error_type: "business_rules")

| error_code | Meaning | Fix |
|---|---|---|
| `rate_limit_exceeded` | Too many requests | Wait for reset, implement backoff |
| `unspecified` | Generic error | Read the `message` field for details |

## Rate Calculation: No Rates Returned

This is the most common issue. Walk through these causes in order:

### 1. Carrier Not Properly Configured

```typescript
// Check carrier status
const carriers = await client.get("/carriers");
// Look for:
// - disabled_by_billing_plan: true -> upgrade ShipStation plan
// - requires_funded_amount: true + balance: 0 -> add funds
// - carrier missing entirely -> connect carrier in ShipStation dashboard
```

### 2. Wrong Carrier Code

Built-in UPS accounts use `ups_walleted`, NOT `ups`. This catches people constantly.

```typescript
// WRONG
const carrierId = "ups";

// RIGHT -- use the actual carrier_id from GET /carriers
const carriers = await client.getCarriers();
const upsCarrier = carriers.find(c => c.carrier_code === "ups_walleted");
const carrierId = upsCarrier?.carrier_id; // "se-XXXXXX"
```

### 3. Service Not Available for Route

Some services don't cover certain origin/destination pairs:
- USPS Priority Mail International != domestic
- UPS Ground Saver may not return rates via API
- FedEx Ground doesn't deliver to PO Boxes

### 4. Weight Issues

```typescript
// Zero weight causes carrier rejection
const weight = Math.max(totalGrams / 1000, 0.001); // Floor of 0.001 kg

// Check carrier weight limits
// USPS: 70 lbs (31.75 kg)
// UPS: 150 lbs (68 kg)
// FedEx: 150 lbs (68 kg)
if (weightKg > 31.75 && carrierCode === "stamps_com") {
  throw new Error("Package exceeds USPS weight limit of 70 lbs");
}
```

### 5. Address Issues

Invalid addresses can cause carriers to refuse rate calculation entirely. Try:
- Use `validate_address: "validate_and_clean"` on label creation
- Test with a known-good address (e.g., 1600 Pennsylvania Ave NW, Washington DC 20500)
- Ensure `country_code` is 2-letter ISO code (US, not USA)
- Ensure `state_province` matches country format (TX for US, ON for CA)

### 6. Check the Error Response

```typescript
const rateResponse = await client.post("/rates", rateRequest);
if (rateResponse.rate_response?.errors?.length) {
  // These tell you exactly what went wrong
  for (const error of rateResponse.rate_response.errors) {
    console.error(`[${error.error_source}] ${error.error_code}: ${error.message}`);
  }
}
```

## Label Generation Failures

### Address Rejection

Carriers validate addresses more strictly for labels than for rates. A rate may succeed but the label fails if the address isn't deliverable.

Fix: Use `validate_address: "validate_and_clean"` to catch issues before label purchase.

### Package Size Limits

| Carrier | Max Length | Max Length+Girth |
|---|---|---|
| USPS Priority Mail | -- | 108" |
| USPS Ground Advantage | -- | 130" |
| UPS | 108" | 165" |
| FedEx | 108" | -- |

Girth = 2 * (width + height)

### Missing HS Codes (International)

Since September 2025, USPS requires 6-digit HS codes for all international commercial shipments. Without them, label creation fails.

```typescript
// Add HS codes to items
items: [{
  name: "Hemp Oil",
  quantity: 1,
  sku: "HEMP-001",
  harmonized_tariff_code: "330499", // Required for international
}]
```

### Rate Expired

If using `rate_id` to create a label, the rate may have expired. Rate IDs are temporary -- re-calculate if creation fails.

## Weight Conversion Issues

Medusa stores `variant.weight` in grams. ShipStation accepts multiple units.

```typescript
// Correct conversion
const totalGrams = items.reduce((sum, item) => {
  return sum + (item.variant?.weight || 0) * item.quantity;
}, 0);

const weightKg = Math.max(Number((totalGrams / 1000).toFixed(4)), 0.001);

// The toFixed(4) prevents floating-point precision issues
// The Math.max prevents zero-weight errors
// 0.001 kg = 1 gram -- smallest reasonable package weight
```

**Watch for:** Items with `weight: 0` or `weight: null`. These should be defaulted, not silently passed through.

## Webhook Signature Verification Failures

### Common Causes

1. **Parsed the JSON body before verification** -- You MUST use the raw request body. JSON.parse + JSON.stringify may change whitespace or key ordering.

```typescript
// WRONG -- parsing destroys the original byte-level content
app.use(express.json());
// Then trying to verify with JSON.stringify(req.body) -- FAILS

// RIGHT -- capture raw body before parsing
app.use(express.raw({ type: "application/json" }));
const rawBody = req.body.toString(); // Raw bytes as string
```

For Medusa API routes, you may need to configure the route to receive raw body:
```typescript
// Use a middleware or custom body parser config to preserve raw body
```

2. **JWKS key not found** -- The `kid` (Key ID) in the webhook header must match a key in the JWKS response. If ShipEngine rotates keys, your cached JWKS is stale.

```typescript
// Refresh JWKS if key not found
let publicKey = jwksCache.get(keyId);
if (!publicKey) {
  const jwks = await fetch("https://api.shipengine.com/jwks").then(r => r.json());
  const key = jwks.keys.find((k: any) => k.kid === keyId);
  if (!key) {
    // Key truly not found -- reject webhook
    return false;
  }
  publicKey = createPublicKey({ key, format: "jwk" });
  jwksCache.set(keyId, publicKey);
}
```

3. **Timestamp too old** -- Check that the timestamp is within an acceptable window (e.g., 5 minutes) to prevent replay attacks.

4. **Wrong signature encoding** -- The signature header value is base64-encoded. Pass `"base64"` to `verify.verify()`.

## Sandbox Testing Gotchas

### 1. Rate Limit is 20/min

Sandbox allows only 20 requests per minute (vs 200 in production). Very easy to hit during development, especially if your code makes multiple API calls per checkout.

**Mitigation:** Add delays between calls in dev, or cache aggressively.

### 2. Tracking Doesn't Work

Sandbox cannot simulate tracking events. Real packages in the mail stream are required. Plan your tracking integration testing with real production shipments.

### 3. Test Labels Are Watermarked

Labels created with `TEST_` keys are watermarked and cannot be used for real shipping. This is expected behavior -- not a bug.

### 4. Sandbox Keys

- Always start with `TEST_`
- Get them from ShipStation Settings > API Settings
- Production keys do NOT work in sandbox
- Same base URL (`https://api.shipstation.com/v2`) for both

### 5. No Order Management in V2

V2 has no order CRUD endpoints. If you need orders, use V1 -- but Medusa manages orders natively, so V2 is the right choice.

## Error Handling Best Practices

### Wrap All API Calls

```typescript
import { MedusaError } from "@medusajs/framework/utils";

async function safeApiCall<T>(
  operation: string,
  fn: () => Promise<T>
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof MedusaError) throw error;

    const message = error instanceof Error ? error.message : String(error);
    throw new MedusaError(
      MedusaError.Types.UNEXPECTED_STATE,
      `ShipStation ${operation} failed: ${message}`
    );
  }
}
```

### Distinguish Error Sources

```typescript
function handleShipStationError(errors: ApiError[]): never {
  const carrierErrors = errors.filter(e => e.error_source === "carrier");
  const platformErrors = errors.filter(e => e.error_source === "shipengine");

  if (carrierErrors.length) {
    // Carrier errors may be transient -- consider retry
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      `Carrier error: ${carrierErrors.map(e => e.message).join("; ")}`
    );
  }

  if (platformErrors.length) {
    // Platform errors are usually permanent -- don't retry
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      `ShipStation error: ${platformErrors.map(e => e.message).join("; ")}`
    );
  }

  throw new MedusaError(
    MedusaError.Types.UNEXPECTED_STATE,
    `Unknown error: ${errors.map(e => e.message).join("; ")}`
  );
}
```

### Rate Limit Handling with Backoff

```typescript
async function withRateLimitRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3
): Promise<T> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      if (
        error.message?.includes("Rate limit") &&
        attempt < maxRetries
      ) {
        const waitMs = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
        await new Promise(resolve => setTimeout(resolve, waitMs));
        continue;
      }
      throw error;
    }
  }
  throw new Error("Max retries exceeded");
}
```

## Debugging Checklist

### Rate Calculation Not Working
- [ ] Carrier connected and active in ShipStation dashboard
- [ ] Carrier not `disabled_by_billing_plan`
- [ ] Using correct `carrier_id` from `GET /carriers` (not carrier_code)
- [ ] UPS is `ups_walleted`, not `ups`
- [ ] Weight > 0 and within carrier limits
- [ ] Address is valid (correct country_code, state_province, postal_code)
- [ ] Service code is valid for the carrier and route
- [ ] Check `rate_response.errors` for specific messages

### Label Creation Not Working
- [ ] All above rate checks pass
- [ ] Address passes carrier validation
- [ ] Package within size limits (length + girth)
- [ ] HS codes present for international USPS
- [ ] Carrier account has funds (if `requires_funded_amount`)
- [ ] Using correct `shipment_id` or `rate_id`
- [ ] Rate hasn't expired (if using `rate_id`)

### Webhooks Not Firing
- [ ] Webhook registered via `POST /environment/webhooks`
- [ ] URL is publicly accessible (not localhost -- use ngrok)
- [ ] Endpoint responds with 200/204 within timeout
- [ ] Check webhook status -- may be deactivated after repeated failures
- [ ] Sandbox tracking webhooks won't fire (no real packages)

### Authentication Failing
- [ ] API key is correct (no extra whitespace)
- [ ] Using `api-key` header (lowercase, hyphenated)
- [ ] `TEST_` prefix keys for sandbox, production keys for production
- [ ] Key not revoked/rotated in dashboard
