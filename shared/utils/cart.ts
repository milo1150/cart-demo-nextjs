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

export function findShopInCart(
  shops: CartShop[],
  shopId: number
): { ok: boolean; shop: CartShop | null; shopIndex: number } {
  const findShopIndex = shops.findIndex((shop) => shop.id === shopId)

  return findShopIndex < 0
    ? { ok: false, shop: null, shopIndex: -1 }
    : { ok: true, shop: shops[findShopIndex], shopIndex: findShopIndex }
}

export function findShopIndexInCart(shops: CartShop[], shopId: number): number {
  return shops.findIndex((shop) => shop.id === shopId)
}

export function getTotalProductPrice(price: number, count: number): number {
  return price * count
}

export function setAllCheckedProduct(products: CartProduct[], status: boolean): CartProduct[] {
  return products.map((product) => {
    return { ...product, checked: status }
  })
}

export function updateSelectedProductItem(
  selectedProducts: CartProduct[],
  item: CartProduct | CartProduct[]
): CartProduct[] {
  const newItems = Array.isArray(item) ? item : [item]
  return [...selectedProducts, ...newItems]
}

export function removeSelectedProductItem(
  selectedProducts: CartProduct[],
  item: CartProduct | CartProduct[]
): CartProduct[] {
  const removeIds = Array.isArray(item) ? item.map((product) => product.id) : [item.id]
  return selectedProducts.filter((selectedProduct) => !removeIds.includes(selectedProduct.id))
}
