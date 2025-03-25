import { CartProduct } from '@shared/schema/product'
import { CartShop } from '@shared/schema/shop'

export function findProductInCart(
  shops: CartShop[],
  product: CartProduct
): { ok: boolean; product: CartProduct | null; productIndex: number; shopIndex: number } {
  const findShopIndex: number = shops.findIndex((shop) => shop.id === product.shop.id)

  if (findShopIndex < 0) {
    return { ok: false, product: null, productIndex: -1, shopIndex: -1 }
  }

  const findProductIndex: number = shops[findShopIndex].products.findIndex(
    (item) => item.id === product.id
  )

  if (findProductIndex < 0) {
    return { ok: false, product: null, productIndex: -1, shopIndex: findShopIndex }
  }

  return {
    ok: true,
    product: shops[findShopIndex].products[findProductIndex],
    productIndex: findProductIndex,
    shopIndex: findShopIndex,
  }
}

export function findShopInCart(shops: CartShop[], shopId: number): boolean {
  return !!shops.find((shop) => shop.id === shopId)
}

export function findShopIndexInCart(shops: CartShop[], shopId: number): number {
  return shops.findIndex((shop) => shop.id === shopId)
}
