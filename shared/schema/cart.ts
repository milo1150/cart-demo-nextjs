/**
 * endpoint: /cart/cart-item/add
 */
export type AddItemToCartDetail = {
  product_id: number
  quantity: number
  shop_id: number
}
export type AddItemsToCartPayload = {
  cart_items: AddItemToCartDetail[]
}

/**
 * endpoint: /cart/cart-item/remove
 */
export type RemoveItemFromCartPayload = {
  product_id: number
  shop_id: number
}
