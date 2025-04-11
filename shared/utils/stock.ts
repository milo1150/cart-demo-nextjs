import { CreateCheckoutPayload } from '@shared/schema/checkout'
import { CartProduct } from '@shared/schema/product'
import { UpdateStockInfo, UpdateStockPayload } from '@shared/schema/stock'

export function createUpdateStockPayloadFromCheckoutPayload(
  checkoutPayload: CreateCheckoutPayload
): UpdateStockPayload {
  const payload: UpdateStockPayload = { stocks: [] }
  checkoutPayload.checkout_items.forEach((checkout) => {
    checkout.products.forEach((product) => {
      payload.stocks.push({
        action: 'dec',
        amount: product.quantity,
        product_id: product.id,
      } satisfies UpdateStockInfo)
    })
  })
  return payload
}

export function createUpdateStockPayloadFromCartProduct(
  cartProducts: CartProduct[]
): UpdateStockPayload {
  const payload: UpdateStockPayload = { stocks: [] }
  cartProducts.forEach((product) => {
    payload.stocks.push({
      action: 'update',
      amount: product.stock,
      product_id: product.id,
    } satisfies UpdateStockInfo)
  })
  return payload
}
