import { PaymentStatus } from './payment'

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
export interface CheckoutPaymentInfo {
  id: number
  status: PaymentStatus
}
export interface CheckoutShopInfo {
  id: number
  name: string
}
export interface CheckoutProductInfo {
  id: number
  created_at: string
  updated_at: string
  name: string
  description: string
  image_url: string
  price: number
  stock: number
  quantity: number
  paid_amount: number
}
export interface CheckoutItemInfo {
  id: number
  created_at: string
  updated_at: string
  deleted_at: never
  shop: CheckoutShopInfo
  products: CheckoutProductInfo[]
  checkout_id: number
  total_paid_amount: number
}
export interface CheckoutInfo {
  id: number
  created_at: string
  updated_at: string
  checkout_items: CheckoutItemInfo[]
  payment: CheckoutPaymentInfo | null
  total_paid_amount: number
}
export interface GetCheckoutResponse {
  items: CheckoutInfo[]
}
