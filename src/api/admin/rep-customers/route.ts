import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

type CustomerListItem = {
  id: string
  email?: string
  first_name?: string | null
  last_name?: string | null
  phone?: string | null
  created_at?: string
  metadata?: Record<string, unknown> | null
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const customerService = req.scope.resolve("customer") as {
    listCustomers: (
      selector?: Record<string, unknown>,
      config?: Record<string, unknown>
    ) => Promise<CustomerListItem[]>
    countCustomers?: (selector?: Record<string, unknown>) => Promise<number>
  }

  const q = typeof req.query?.q === "string" ? req.query.q.trim() : ""
  const take = Math.min(Number(req.query?.take || 50) || 50, 200)
  const skip = Math.max(Number(req.query?.skip || 0) || 0, 0)
  const salesPersonId =
    typeof req.query?.sales_person_id === "string"
      ? req.query.sales_person_id.trim()
      : ""

  const selector: Record<string, unknown> = {}
  if (salesPersonId) {
    selector.metadata = {
      sales_person_id: salesPersonId,
    }
  }
  if (q) {
    selector.$or = [
      { email: { $ilike: `%${q}%` } },
      { first_name: { $ilike: `%${q}%` } },
      { last_name: { $ilike: `%${q}%` } },
    ]
  }

  const customers = await customerService.listCustomers(selector, {
    take,
    skip,
    order: { created_at: "DESC" },
    select: [
      "id",
      "email",
      "first_name",
      "last_name",
      "phone",
      "created_at",
      "metadata",
    ],
  })

  const filtered = salesPersonId
    ? customers.filter(
        (customer) => customer.metadata?.sales_person_id === salesPersonId
      )
    : customers

  const total =
    typeof customerService.countCustomers === "function"
      ? await customerService.countCustomers(selector)
      : filtered.length

  return res.status(200).json({
    customers: filtered,
    total,
    take,
    skip,
  })
}
