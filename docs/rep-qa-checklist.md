# Rep Flow QA Checklist

## Launch configuration
- Optional: set `REP_DEFAULT_STOCK_LOCATION_ID` to lock reps to one fulfillment location.
- If the variable is not set, reps can choose from available stock locations in Admin.

## Admin setup
- Create a Sales Person record.
- Create an Admin User with the rep email.
- In Rep Access, set Role = Rep and assign the Sales Person.
- Save and confirm the user shows role + sales person link.

## Rep permissions
- Rep can access Rep Dashboard, Rep Orders, Rep Customers, Sales Stores.
- Rep can read only the draft-order dependencies needed to place orders (regions, sales channels, product variants, shipping options, stock locations, promotions).
- Rep cannot manage products, inventory, price lists, taxes, or settings.
- Rep cannot access Rep Commissions (admin-only).

## Rep Orders
- Rep can create a draft order.
- Draft order is attributed to the rep (metadata.sales_person_id).
- Rep can only see their own orders in Orders list.
- Rep can open an order detail for their orders.
- Rep is blocked from orders owned by other reps.
- Rep can convert draft orders to orders.
- Rep can copy/send the payment link so the customer pays through storefront checkout.
- Rep cannot run direct admin payment capture/refund/mark-as-paid actions.
- Rep can create fulfillment only for their own orders.
- If `REP_DEFAULT_STOCK_LOCATION_ID` is set, fulfillment location is forced to that location.
- If `REP_DEFAULT_STOCK_LOCATION_ID` is not set, rep must select a location from the live stock-location list.
- Fulfillment submission validates the selected location server-side.

## Rep Customers
- Rep can create a customer.
- Rep can list customers assigned to the rep.
- Customer is attributed to the rep (metadata.sales_person_id).
- Rep can open assigned customers.
- Rep is blocked from customers owned by other reps.

## Sales Stores
- Rep sees only assigned stores in Sales Stores list.
- Rep can update stage for assigned stores.
- Rep cannot update stores assigned to other reps.

## Trip Planner
- Rep can plan a trip and save stops to Sales Stores.

## Rep Dashboard
- Dashboard shows counts for Orders, Customers, Stores.
- Activity feed shows orders/customers/stores.
- Draft order quick actions work from feed and customer list.

## Production rollout runbook
1. Decide whether to lock reps to one location:
   - Set `REP_DEFAULT_STOCK_LOCATION_ID` to enforce one location, or
   - Leave it unset to allow rep location choice.
2. Validate one rep can complete: draft order -> convert -> payment link -> fulfillment.
3. Validate cross-rep protection: second rep gets 403 on first rep's order/customer.
4. Pilot with 1-2 reps and monitor backend logs for rep 403 denials on `/admin/*`.
5. Roll out to all reps after pilot passes.

## Deferred TODOs
- [ ] Run full rep end-to-end validation (rep login -> draft order -> convert -> payment link paid -> fulfillment) after distributor information is complete.
