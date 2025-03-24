import { CartProduct } from '@shared/schema/product'
import { CartShop } from '@shared/schema/shop'
import { findShopIndexInCart, findProductInCart } from '@shared/utils/cart'
import { create } from 'zustand'

export type CartState = {
  shops: CartShop[]
}

export type CartAction = {
  addProduct: (product: CartProduct, inc: number) => void
  increaseProduct: (product: CartProduct, inc: number) => void
}

/**
 * Zustand is optimized for performance and does not do deep proxy tracking like MobX or Immer (unless use the immer middleware explicitly).
 * If need to track change in useEffect then wrap with immer()
 * @see https://zustand.docs.pmnd.rs/middlewares/immer
 */
const useCartStore = create<CartState & CartAction>()((set) => ({
  shops: [],
  addProduct: (product, inc) =>
    set((state) => {
      const copyShops = [...state.shops]
      const shopIndex = findShopIndexInCart(copyShops, product.shop.id)
      product.count = inc // set product count as 1

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

  increaseProduct: (product, inc) => {
    set((state) => {
      const copyShops = [...state.shops]
      const findProduct = findProductInCart(copyShops, product)
      const shopIndex = findShopIndexInCart(copyShops, product.shop.id)

      if (findProduct.ok && shopIndex > -1) {
        copyShops[shopIndex].products[findProduct.productIndex].count += inc
      }

      return { ...state, shops: copyShops }
    })
  },
}))

export { useCartStore }
