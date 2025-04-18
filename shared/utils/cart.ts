import { transformCartDetailCartItem } from '@shared/dto/product'
import { AddItemsToCartPayload, AddItemToCartDetail, CartDetailCartItem } from '@shared/schema/cart'
import { CartProduct } from '@shared/schema/product'
import { CartShop } from '@shared/schema/shop'
import _ from 'lodash'

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

export function removeCartProductItem(
  selectedProducts: CartProduct[],
  item: CartProduct | CartProduct[]
): CartProduct[] {
  const removeIds = Array.isArray(item) ? item.map((product) => product.id) : [item.id]
  return selectedProducts.filter((selectedProduct) => !removeIds.includes(selectedProduct.id))
}

export function getAddItemsToCartPayload(products: CartProduct[]): AddItemsToCartPayload {
  const result = {
    cart_items: products.map((product) => {
      return {
        product_id: product.id,
        shop_id: product.shop.id,
        quantity: product.count,
      } as AddItemToCartDetail
    }),
  }
  return result
}

export function getShopProductHashKey(shopId: number, productId: number): string {
  return `${shopId}:${productId}`
}

export function getShopHashKey(shopId: number): string {
  return `${shopId}`
}

export type HashCartDetailCartItem = Record<string, CartDetailCartItem>
export function mapCartItemsByShopAndProduct(data: CartDetailCartItem[]): HashCartDetailCartItem {
  const result = _.reduce(
    data,
    function (acc, curr) {
      acc[getShopProductHashKey(curr.product.shop.id, curr.product.id)] = curr
      return acc
    },
    {} as HashCartDetailCartItem
  )
  return result
}

export type HashShopCartItem = Record<string, string>
export function mapCartItemsByShop(data: CartDetailCartItem[]): HashShopCartItem {
  const result = _.reduce(
    data,
    function (acc, curr) {
      acc[getShopHashKey(curr.product.shop.id)] = curr.product.shop.id.toString() || ''
      return acc
    },
    {} as HashShopCartItem
  )
  return result
}

export type HashShopCartCollection = Record<string, CartShop>
export function mapCartItemsToShops(data: CartDetailCartItem[]): HashShopCartCollection {
  const result = _.reduce(
    data,
    function (acc, curr) {
      acc[getShopHashKey(curr.shop_id)] = {
        id: curr.shop_id,
        name: curr.product.shop.name,
        checked: false,
        products: [],
      } as CartShop
      return acc
    },
    {} as HashShopCartCollection
  )
  return result
}

export function applyProductUpdate(item: CartProduct, update: CartDetailCartItem): CartProduct {
  const newProduct = {
    ...item,
    stock: update.product.stock,
    price: update.product.price,
    count: update.product.stock < item.count ? update.product.stock : item.count,
  } as CartProduct
  return newProduct
}

export function getUpdateCartItems(
  cartProducts: CartProduct[],
  hash: HashCartDetailCartItem
): CartProduct[] {
  let result = _.cloneDeep(cartProducts) // ! care only safety

  cartProducts.forEach((product, productIndex) => {
    const key = getShopProductHashKey(product.shop.id, product.id)
    const hashCartItem = hash[key]
    const updatedProduct = applyProductUpdate(product, hashCartItem)

    // Remove cart_item instead of update
    if (updatedProduct.stock === 0) {
      result = removeCartProductItem(result, updatedProduct)
    }

    // Update cart item
    if (updatedProduct.stock > 0) {
      result[productIndex] = { ...updatedProduct }
    }
  })

  return result
}

export function updateCartShopsFromItems(
  hashShop: HashShopCartItem,
  hashShopProduct: HashCartDetailCartItem,
  cartShops: CartShop[]
): CartShop[] {
  const result: CartShop[] = _.cloneDeep(cartShops)
    .filter((cartShop) => hashShop[cartShop.id])
    .map((cartShop) => {
      cartShop.products = cartShop.products
        .filter((product) => hashShopProduct[getShopProductHashKey(cartShop.id, product.id)])
        .map((product) => {
          const key = getShopProductHashKey(cartShop.id, product.id)
          const hashProduct = hashShopProduct[key]
          const newProduct = applyProductUpdate(product, hashProduct)
          return newProduct
        })
      return cartShop
    })
  return result
}

export function updateCartShopsFromCartItems(cartItems: CartDetailCartItem[]): CartShop[] {
  const hashCartShop: Record<string, CartShop> = mapCartItemsToShops(cartItems)
  cartItems.forEach((item) => {
    const cartProduct = transformCartDetailCartItem(item)
    hashCartShop[item.shop_id].products.push(cartProduct)
  })
  return _.values(hashCartShop)
}
