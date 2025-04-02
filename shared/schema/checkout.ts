export type CheckoutProduct = {
  id: number
  createdAt: string
  updatedAt: string
  name: string
  description: string
  price: number
  stock: number
  quantity: number
  imageUrl: string
}

export type CheckoutShop = {
  id: number
  name: string
}

export type CreateCheckoutItems = {
  shop: CheckoutShop
  product: CheckoutProduct[]
}

export type CreateCheckoutPayload = {
  checkout_items: CreateCheckoutItems[]
}
