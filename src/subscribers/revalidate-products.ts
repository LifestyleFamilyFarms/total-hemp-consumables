import { createRevalidateSubscriber } from "./revalidate-factory"

export const { handler, config } = createRevalidateSubscriber({
    tags: ["products"],
    events: [
        // Core product events
        "product.updated", 
        "product.created", 
        "product.deleted",
        "product-variant.updated",
        "product-variant.created",
        "product-variant.deleted",
        
        // Product images - critical for customer experience
        "product-image.created",
        "product-image.updated",
        "product-image.deleted",
        
        // Product options and values - affect variants and availability
        "product-option.created",
        "product-option.updated", 
        "product-option.deleted",
        "product-option-value.created",
        "product-option-value.updated",
        "product-option-value.deleted",
        
        // Inventory events that affect product availability
        "inventory-level.updated",
        "inventory-level.created", 
        "inventory-level.deleted",
        
        // Stock locations - affect shipping and availability
        "stock-location.created",
        "stock-location.updated",
        "stock-location.deleted",
        
        // Price list events - affect product pricing and sales
        "price-list.created",
        "price-list.updated",
        "price-list.deleted",
        "price-list-price.created",
        "price-list-price.updated",
        "price-list-price.deleted",
        "price-list-customer-group.created",
        "price-list-customer-group.updated",
        "price-list-customer-group.deleted",
    ],
})