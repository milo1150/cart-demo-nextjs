export const endpoint = {
  cartService: {
    cart: {
      getCart: '/cart',
    },
    checkout: {
      create: '/cart/checkout/create',
      getCheckouts: '/cart/checkout/checkouts',
    },
    cartItem: {
      add: '/cart/cart-item/add',
    },
  },
  shopProductService: {
    product: {
      getProducts: '/shop-product/product/products',
    },
  },
  user: {
    login: '/user/login',
  },
}
