import { CartProduct } from '@shared/schema/product'
import { CartShop } from '@shared/schema/shop'
import { create } from 'zustand'

export type CartState = {
  shops: CartShop[]
}

export type CartAction = {
  addProduct: (product: CartProduct) => void
  increaseProduct: (product: CartProduct) => void
}

export function findProductInCart(
  shops: CartShop[],
  product: CartProduct
): { ok: boolean; product: CartProduct | null; productIndex: number } {
  const findShopIndex: number = shops.findIndex((shop) => shop.id === product.shop.id)
  if (findShopIndex < 0) return { ok: false, product: null, productIndex: -1 }
  const findProductIndex: number = shops[findShopIndex].products.findIndex(
    (item) => item.id === product.id
  )
  return {
    ok: true,
    product: shops[findShopIndex].products[findProductIndex],
    productIndex: findProductIndex,
  }
}

export function findShopInCart(shops: CartShop[], shopId: number): boolean {
  return !!shops.find((shop) => shop.id === shopId)
}

export function findShopIndexInCart(shops: CartShop[], shopId: number): number {
  return shops.findIndex((shop) => shop.id === shopId)
}

/**
 * Zustand is optimized for performance and does not do deep proxy tracking like MobX or Immer (unless use the immer middleware explicitly).
 * If need to track change in useEffect then wrap with immer()
 * @see https://zustand.docs.pmnd.rs/middlewares/immer
 */
const useCartStore = create<CartState & CartAction>()((set) => ({
  shops: [],
  addProduct: (product) =>
    set((state) => {
      const copyShops = [...state.shops]
      const shopIndex = findShopIndexInCart(copyShops, product.shop.id)
      product.count = 1 // set product count as 1

      // Not found specific shop
      if (shopIndex === -1) {
        copyShops.push({
          id: product.shop.id,
          name: product.shop.name,
          products: [product],
        })
      }

      // Found specific shop
      if (shopIndex >= 0) {
        copyShops[shopIndex].products.push(product)
      }

      return { ...state, shops: copyShops }
    }),

  increaseProduct: (product) => {
    set((state) => {
      const copyShops = [...state.shops]
      const findProduct = findProductInCart(copyShops, product)
      if (findProduct.ok) {
        const shopIndex = findShopIndexInCart(copyShops, product.shop.id)
        if (shopIndex > -1) {
          copyShops[shopIndex].products[findProduct.productIndex].count += 1
        }
      }
      return { ...state, shops: copyShops }
    })
  },
}))

export { useCartStore }
