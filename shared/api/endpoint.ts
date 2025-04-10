export const endpoint = {
  cartService: {
    cart: {
      getCartDetail: '/cart',
      getCartUuid: '/cart/get-cart',
      addItems: '/cart/cart-item/add',
      removeItem: '/cart/cart-item/remove',
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
    stock: {
      updateStock: '/shop-product/stock/update-product-stock',
    },
  },
  user: {
    login: '/user/login',
  },
  payment: {
    updatePayment: '/payment/order/confirm',
  },
}
