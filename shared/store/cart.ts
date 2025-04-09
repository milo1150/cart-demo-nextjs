import { CartProduct } from '@shared/schema/product'
import { CartShop } from '@shared/schema/shop'
import {
  findShopIndexInCart,
  findProductInCart,
  getTotalProductPrice,
  findShopInCart,
  setAllCheckedProduct,
  updateSelectedProductItem,
  removeSelectedProductItem,
} from '@shared/utils/cart'
import _ from 'lodash'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartState = {
  shops: CartShop[]
  selectedProducts: CartProduct[]
}

export type CartAction = {
  addProduct: (product: CartProduct, inc: number) => void
  increaseProduct: (product: CartProduct, amount: number) => void
  decreaseProduct: (product: CartProduct, amount: number) => void
  getProductCount: (product: CartProduct) => number
  getAllProductCount: () => number
  getSelectedProductCount: () => number
  getSelectedProductTotalPrice: () => number
  setCheckProduct: (product: CartProduct, status: boolean) => void
  setCheckShop: (shopId: number, status: boolean) => void
  resetState: () => void
  resetSelectedProducts: () => void
  getAllProduct: () => CartProduct[]
}

const initCart: CartState = {
  shops: [],
  selectedProducts: [],
}

/**
 * Zustand is optimized for performance and does not do deep proxy tracking like MobX or Immer (unless use the immer middleware explicitly).
 * If need to track change in useEffect then wrap with immer()
 * @see https://zustand.docs.pmnd.rs/middlewares/immer
 */
const useCartStore = create<CartState & CartAction>()(
  persist(
    (set, get) => ({
      shops: [],
      selectedProducts: [],

      resetState: () => {
        set(initCart)
      },

      resetSelectedProducts: () => {
        set((state) => {
          const copyState = { ...state }

          // Clear selected item in shops
          copyState.shops.forEach((shop) => {
            shop.checked = false
            shop.products.forEach((product) => {
              product.checked = false
            })
          })

          // Clear selectedProducts
          copyState.selectedProducts = []

          return { ...copyState }
        })
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
              checked: false,
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
            copyShops[findProduct.shopIndex].products[findProduct.productIndex].count =
              product.stock
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
        return _(get().shops)
          .map((shop) =>
            _(shop.products)
              .map((product) => product.count)
              .sum()
          )
          .sum()
      },

      getSelectedProductCount: () => get().selectedProducts.length,

      getSelectedProductTotalPrice: () =>
        _(get().selectedProducts)
          .map((product) => getTotalProductPrice(product.price, product.count))
          .sum(),

      setCheckProduct: (product, status) => {
        set((state) => {
          const copyState = { ...state }
          const findProduct = findProductInCart(state.shops, product)

          if (!findProduct.ok) return state

          // Handle product check
          copyState.shops[findProduct.shopIndex].products[findProduct.productIndex].checked = status

          // Handle shop checked
          const productsInShop = copyState.shops[findProduct.shopIndex].products
          const isAllChecked: boolean = productsInShop.every((product) => product.checked)
          copyState.shops[findProduct.shopIndex].checked = isAllChecked

          // Handle Selected Products
          copyState.selectedProducts = status
            ? updateSelectedProductItem(state.selectedProducts, product)
            : removeSelectedProductItem(state.selectedProducts, product)

          return { ...copyState }
        })
      },

      setCheckShop: (shopId, status) => {
        set((state) => {
          const copyState = { ...state }
          const findShop = findShopInCart(state.shops, shopId)

          // Handle shop checked
          copyState.shops[findShop.shopIndex].checked = status

          // Filter which product should get update
          const products = copyState.shops[findShop.shopIndex].products
          const uncheckProducts = products.filter((product) => !product.checked)

          // Handle product checked value
          copyState.shops[findShop.shopIndex].products = setAllCheckedProduct(products, status)

          // Handle Selected Products
          copyState.selectedProducts = status
            ? updateSelectedProductItem(state.selectedProducts, uncheckProducts)
            : removeSelectedProductItem(state.selectedProducts, products)

          return copyState
        })
      },

      getAllProduct: () => {
        const cartProducts = _(get().shops)
          .map((shop) => shop.products)
          .flatten()
          .value()
        return cartProducts
      },
    }),
    {
      name: 'cart-state',
    }
  )
)

export { useCartStore }
