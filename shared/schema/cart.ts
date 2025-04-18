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

/**
 * endpoint: /cart/:uuid
 */
export interface GetCartDetailResponse {
  created_at: string
  updated_at: string
  uuid: string
  user_id: number
  cart_items: CartDetailCartItem[]
}
export interface CartDetailCartItem {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string
  uuid: string
  quantity: number
  cart_id: number
  product: CartDetailProduct
  shop_id: number
}
export interface CartDetailProduct {
  id: number
  name: string
  description: string
  price: number
  stock: number
  shop: { id: number; name: string }
  image: string
}
