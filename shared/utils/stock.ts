import { CreateCheckoutPayload } from '@shared/schema/checkout'
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
