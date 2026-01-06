import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import type { CartTypes } from "@medusajs/framework/types"

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const { id } = req.params as { id: string }

  if (!id) {
    res.status(400).json({ message: "Missing cart id" })
    return
  }

  const cartModule: any = req.scope.resolve(Modules.CART)

  const existingCart = await cartModule
    .retrieveCart(id, {
      relations: ["region", "sales_channel"],
    })
    .catch(() => null)

  if (!existingCart) {
    res.status(404).json({ message: "Cart not found" })
    return
  }

  const createPayload: CartTypes.CreateCartDTO = {
    region_id:
      existingCart.region_id ??
      (existingCart.region?.id as string | undefined),
    sales_channel_id:
      existingCart.sales_channel_id ??
      (existingCart.sales_channel?.id as string | undefined),
    currency_code: existingCart.currency_code,
    customer_id: existingCart.customer_id ?? undefined,
    email: existingCart.email ?? undefined,
    metadata: existingCart.metadata ?? undefined,
  }

  const manager = req.scope.resolve("manager")
  const tx = cartModule.withTransaction(manager)

  const newCart = await tx.createCarts(createPayload)

  const cartInternalService = tx?.cartService_

  if (cartInternalService) {
    try {
      if (typeof cartInternalService.delete === "function") {
        await cartInternalService.delete(id)
      } else if (typeof cartInternalService.softDelete === "function") {
        await cartInternalService.softDelete(id)
      }
    } catch (e) {
      if (typeof cartInternalService.delete === "function") {
        await cartInternalService.delete([id]).catch(() => undefined)
      } else if (typeof cartInternalService.softDelete === "function") {
        await cartInternalService.softDelete([id]).catch(() => undefined)
      }
      // swallow errors to avoid blocking cart reset
    }
  }

  res.status(200).json({
    cart: newCart,
    previous_cart_id: id,
  })
}
