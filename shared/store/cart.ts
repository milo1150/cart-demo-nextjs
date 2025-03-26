import { CartProduct } from '@shared/schema/product'
import { CartShop } from '@shared/schema/shop'
import { findShopIndexInCart, findProductInCart } from '@shared/utils/cart'
import _ from 'lodash'
import { create } from 'zustand'

export type CartState = {
  shops: CartShop[]
}

export type CartAction = {
  addProduct: (product: CartProduct, inc: number) => void
  increaseProduct: (product: CartProduct, amount: number) => void
  decreaseProduct: (product: CartProduct, amount: number) => void
  getProductCount: (product: CartProduct) => number
  getAllProductCount: () => number
  reset: () => void
}

const initCart: CartState = {
  shops: [],
}

/**
 * Zustand is optimized for performance and does not do deep proxy tracking like MobX or Immer (unless use the immer middleware explicitly).
 * If need to track change in useEffect then wrap with immer()
 * @see https://zustand.docs.pmnd.rs/middlewares/immer
 */
const useCartStore = create<CartState & CartAction>()((set, get) => ({
  shops: [],
  reset: () => {
    set(initCart)
  },
  addProduct: (product, inc) =>
    set((state) => {
      const copyShops = [...state.shops]
      const shopIndex = findShopIndexInCart(copyShops, product.shop.id)

      // Set product count
      product.count = inc

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
  increaseProduct: (product, amount) => {
    set((state) => {
      const copyShops = [...state.shops]
      const findProduct = findProductInCart(copyShops, product)

      if (findProduct.ok) {
        copyShops[findProduct.shopIndex].products[findProduct.productIndex].count += amount
      }

      // Prevent add item over current stock
      const count = copyShops[findProduct.shopIndex].products[findProduct.productIndex].count
      if (count > product.stock) {
        copyShops[findProduct.shopIndex].products[findProduct.productIndex].count = product.stock
      }

      return { ...state, shops: copyShops }
    })
  },
  decreaseProduct: (product, amount) => {
    set((state) => {
      const copyShops = [...state.shops]
      const findProduct = findProductInCart(copyShops, product)

      if (findProduct.product?.count === 1) {
        return { ...state }
      }

      if (findProduct.ok) {
        copyShops[findProduct.shopIndex].products[findProduct.productIndex].count -= amount
      }

      return { ...state, shops: copyShops }
    })
  },
  getProductCount: (product) => {
    const findProduct = findProductInCart(get().shops, product)

    if (!findProduct.ok) return 0

    return (findProduct.product as CartProduct).count
  },
  getAllProductCount: () => {
    const count = _(get().shops)
      .map((shop) =>
        _(shop.products)
          .map((product) => product.count)
          .sum()
      )
      .sum()
    return count
  },
}))

export { useCartStore }
