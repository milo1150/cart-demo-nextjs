import { CartProduct } from './product'

export interface ShopResponse {
  id: number
  name: string
}

export interface CartShop {
  id: number
  name: string
  checked: boolean
  products: CartProduct[]
}
