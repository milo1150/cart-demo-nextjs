export type CheckoutProduct = {
  id: number
  created_at: string
  updated_at: string
  name: string
  description: string
  price: number
  stock: number
  quantity: number
  image_url: string
}

/**
 * @endpoint /cart/checkout/create
 */
export type CheckoutShop = {
  id: number
  name: string
}
export type CreateCheckoutItems = {
  shop: CheckoutShop
  products: CheckoutProduct[]
}
export type CreateCheckoutPayload = {
  checkout_items: CreateCheckoutItems[]
}

/**
 * @endpoint /cart/checkout/checkouts
 */
export interface Item {
  id: number
  created_at: string
  updated_at: string
  checkout_items: CheckoutItem[]
  payment: Payment
}
export interface CheckoutItem {
  id: number
  created_at: string
  updated_at: string
  deleted_at: never
  shop: Shop
  products: Product[]
  checkout_id: number
}
export interface Shop {
  id: number
  name: string
}
export interface Product {
  id: number
  created_at: string
  updated_at: string
  name: string
  description: string
  image_url: string
  price: number
  stock: number
  quantity: number
}
export interface Payment {
  id: number
  status: string
}
export interface GetCheckoutResponse {
  items: Item[]
}
