import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"

const AttachSchema = z.object({
  rep_code: z.string().trim().min(1),
  cart_id: z.string().trim().optional(),
  customer_id: z.string().trim().optional(),
})

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const parsed = AttachSchema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid rep attribution payload.",
      errors: parsed.error.flatten(),
    })
  }

  const { rep_code, cart_id, customer_id } = parsed.data

  const salesPeople = req.scope.resolve("salesPeople") as {
    resolveByRepCode: (code: string) => Promise<{ id: string; rep_code: string } | null>
  }

  const person = await salesPeople.resolveByRepCode(rep_code)

  if (!person) {
    return res.status(404).json({ message: "Sales person not found." })
  }

  const metadata = {
    sales_person_id: person.id,
    sales_person_code: person.rep_code,
  }

  if (cart_id) {
    const cartService = req.scope.resolve("cart") as {
      retrieveCart: (id: string) => Promise<{ metadata?: Record<string, unknown> }>
      updateCarts: (id: string, data: Record<string, unknown>) => Promise<unknown>
    }
    const cart = await cartService.retrieveCart(cart_id)
    await cartService.updateCarts(cart_id, {
      metadata: {
        ...(cart?.metadata || {}),
        ...metadata,
      },
    })
  }

  if (customer_id) {
    const customerService = req.scope.resolve("customer") as {
      retrieveCustomer: (id: string) => Promise<{ metadata?: Record<string, unknown> }>
      updateCustomers: (id: string, data: Record<string, unknown>) => Promise<unknown>
    }
    const customer = await customerService.retrieveCustomer(customer_id)
    await customerService.updateCustomers(customer_id, {
      metadata: {
        ...(customer?.metadata || {}),
        ...metadata,
      },
    })
  }

  return res.status(200).json({ person, metadata })
}
