# Rep Flow QA Checklist

## Admin setup
- Create a Sales Person record.
- Create an Admin User with the rep email.
- In Rep Access, set Role = Rep and assign the Sales Person.
- Save and confirm the user shows role + sales person link.

## Rep permissions
- Rep can access Rep Dashboard, Rep Orders, Rep Customers, Sales Stores.
- Rep cannot access products, inventory, price lists, promotions, tax, or settings.
- Rep cannot access Rep Commissions (admin-only).

## Rep Orders
- Rep can create a draft order.
- Draft order is attributed to the rep (metadata.sales_person_id).
- Rep can only see their own orders in Orders list.
- Rep can open an order detail for their orders.
- Rep is blocked from orders owned by other reps.

## Rep Customers
- Rep can create a customer.
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
