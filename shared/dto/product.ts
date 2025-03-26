import { CartProduct, ProductResponse } from '@shared/schema/product'

export function transformCartProduct(item: ProductResponse): CartProduct {
  return {
    id: item.id,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    description: item.description,
    name: item.name,
    uuid: item.uuid,
    price: item.price,
    shop: item.shop,
    stock: item.stock,
    imageUrl: item.image_url,
    count: 0,
    checked: false,
  }
}
