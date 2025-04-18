import { CartDetailCartItem } from '@shared/schema/cart'
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

export function transformCartDetailCartItem(item: CartDetailCartItem): CartProduct {
  return {
    id: item.product.id,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    description: item.product.description,
    name: item.product.name,
    uuid: item.uuid,
    price: item.product.price,
    shop: item.product.shop,
    stock: item.product.stock,
    imageUrl: item.product.image,
    count: item.quantity,
    checked: false,
  }
}
