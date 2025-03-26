import { ShopResponse } from './shop'

export interface ProductResponse {
  id: number
  created_at: string
  updated_at: string
  deleted_at: never
  uuid: string
  name: string
  description: string
  price: number
  stock: number
  image_url: string
  shop: ShopResponse
}

export type CartProduct = {
  id: number
  createdAt: string
  updatedAt: string
  uuid: string
  name: string
  description: string
  price: number
  stock: number
  imageUrl: string
  shop: ShopResponse

  checked: boolean
  count: number
}
