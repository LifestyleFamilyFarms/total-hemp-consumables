# Medusa Product Entry (Beginner Guide)

This is a step-by-step reference for entering products in Medusa the way our backend expects. Each section explains what the field is, how to fill it, and why it matters so entries stay uniform and reliable.

## Product model (what / how / why)

- **Product**  
  - What: The parent item customers browse (e.g., "CBD Gummies Mixed Berry").  
  - How: Add title (clear, short), description (benefits + key specs), type, collection, categories, tags, thumbnail. Handles auto-generate from title—keep titles stable.  
  - Why: Sets the page, SEO handle, and how items group in navigation.

- **Options**  
  - What: Attributes that vary (e.g., Strength, Size, Flavor).  
  - How: Add option names that are reusable and short. Decide the full option set before creating variants.  
  - Why: Options define the matrix used to generate variants; changing later is messy.

- **Variants**  
  - What: One sellable combination of options (e.g., Strength 10mg + Size 30ct + Flavor Berry).  
  - How: Create one variant for every needed combo. Each variant gets its own title (usually auto from options), SKU, prices, weight/dimensions, inventory link, barcode/HS code if available, shipping profile, tax class.  
  - Why: Prices and stock are variant-level; each variant must be unique and complete.

- **Prices (per variant)**  
  - What: Amounts per region/currency (e.g., USD for US, EUR for EU).  
  - How: Enter prices for every region the product sells in; match region currency. If using tax-inclusive pricing, align with region settings.  
  - Why: Wrong prices break checkout and regional compliance.

- **Inventory item + link (per variant)**  
  - What: Inventory record that holds stock, linked to the variant.  
  - How: Create or link one inventory item per variant, then set quantities per location.  
  - Why: Stock is enforced via the inventory item; without it, oversells or “out of stock” issues occur.

- **Media**  
  - What: Thumbnail + gallery images/video.  
  - How: Upload a clear thumbnail first; add supporting media. Use consistent filenames that match the product handle or SKU.  
  - Why: Thumbnail powers listings and SEO; consistency speeds future updates.

- **Collections / Categories**  
  - What: Product-level grouping for navigation and filtering.  
  - How: Set the primary collection and categories that match site sections (e.g., Gummies, Oils).  
  - Why: Controls where the product appears in menus and filters.

- **Tags (product-level)**  
  - What: Extra facets (e.g., broad-spectrum, daytime, indica).  
  - How: Add concise, reusable tags; keep casing consistent.  
  - Why: Helps filtering and merchandising without new categories.

- **Sales channels**  
  - What: Where the product is sellable (e.g., web store, wholesale).  
  - How: Toggle channels in the product settings.  
  - Why: Controls visibility and availability per channel.

- **Shipping profile**  
  - What: Determines which shipping rates apply (e.g., parcel, digital).  
  - How: Select the correct profile per product/variant.  
  - Why: Ensures correct rates at checkout.

- **Tax class**  
  - What: Tax rules applied to the item.  
  - How: Choose the correct class per variant (or product default).  
  - Why: Required for correct tax calculation per region.

- **Metadata (structured extras)**  
  - What: Key/value pairs for compliance and filtering (e.g., `cbd_mg`, `thc_mg`, `flavor`, `form_factor`, `lab_report_url`).  
  - How: Use consistent lowercase keys with underscores; fill out every relevant key.  
  - Why: Drives filters, legal labels, and future automation; consistency keeps queries simple.

## SKU conventions (uniform and unique)

- Use uppercase, no spaces, hyphen separators. Avoid reusing SKUs, even for retired items.  
- Suggested pattern: `THC-<LINE>-<FORM>-<STRENGTH><UNIT>-<SIZE><UNIT>-<FLAVOR>-<REGION>` (drop segments that do not apply).  
  - Examples:  
    - `THC-GUM-10MG-30CT-BERRY-US`  
    - `THC-OIL-25MG-30ML-NAT-EU`
- Keep option values short and consistent (e.g., Strength: `10mg`, Size: `30ct`, Flavor: `Berry`). These values should map directly into the SKU segments.

## Step-by-step: add a new product

1) **Prep details**  
   - Decide options (e.g., Strength + Size + Flavor) and all needed combinations.  
   - Choose SKU template for the line; list SKUs before creating variants.  
   - Gather prices per region, weight/dimensions, tax class, shipping profile, media, and metadata (cannabinoid profile, mg amounts, lab report URL if applicable).

2) **Create the product shell**  
   - Add title, description, type, collection, categories, tags, sales channels, thumbnail.

3) **Add options**  
   - Enter all option names and their values before creating variants.

4) **Create variants (all combinations)**  
   - Generate one variant per option combo.  
   - For each variant, set: SKU (from your list), option selections, prices per region, weight/dimensions, tax class, shipping profile, barcode/HS code if available.

5) **Inventory link**  
   - Create or link one inventory item per variant; set stock per location. Confirm “manage inventory” is enabled where needed.

6) **Media**  
   - Ensure thumbnail is set; add gallery images in consistent order (front, back, detail).

7) **Metadata**  
   - Fill standard keys: `cannabinoid_profile`, `cbd_mg`, `thc_mg`, `flavor`, `form_factor`, `intended_use`, `lab_report_url` (whatever applies). Keep naming consistent across products.

8) **Publish + verify**  
   - Verify handle, options, SKUs, prices, inventory links, tax/shipping, and channel visibility.  
   - Save and publish when everything is complete.

## Quick publish checklist

- Product title/description/thumbnail present; handle looks correct.  
- Type, collection, categories, tags, and sales channels set.  
- Options defined; all needed variants created.  
- Each variant: unique SKU, correct option values, prices per region, weight/dims, tax class, shipping profile, barcode/HS if applicable.  
- Inventory item linked with correct stock per location.  
- Media added; metadata keys filled; lab report URLs added if required.  
- Visibility on for channels you intend to sell in.
