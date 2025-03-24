export interface Product {
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
  shop_id: number
}
