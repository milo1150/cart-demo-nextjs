import {
  CheckoutProduct,
  CreateCheckoutItems,
  CreateCheckoutPayload,
} from '@shared/schema/checkout'
import { CartProduct } from '@shared/schema/product'
import { CartState } from '@shared/store/cart'
import _ from 'lodash'

export function generateCheckoutPayload(
  selectedProducts: CartState['selectedProducts']
): CreateCheckoutPayload {
  const result = _(selectedProducts)
    .groupBy((v) => v.shop.id)
    .transform(
      (acc, products) => {
        const shop = products[0].shop
        const transformProducts: CheckoutProduct[] = products.map((product) => {
          return transformCartProductToCheckoutProduct(product)
        })
        const item: CreateCheckoutItems = {
          shop: { id: shop.id, name: shop.name },
          products: transformProducts,
        }
        acc.push(item)
        return acc
      },
      [] as CreateCheckoutPayload['checkout_items']
    )
    .value()
  return { checkout_items: result }
}

function transformCartProductToCheckoutProduct(cartProduct: CartProduct): CheckoutProduct {
  return {
    id: cartProduct.id,
    created_at: cartProduct.createdAt,
    updated_at: cartProduct.updatedAt,
    description: cartProduct.description,
    image_url: cartProduct.imageUrl,
    name: cartProduct.name,
    price: cartProduct.price,
    quantity: cartProduct.count,
    stock: cartProduct.stock,
  } as CheckoutProduct
}
