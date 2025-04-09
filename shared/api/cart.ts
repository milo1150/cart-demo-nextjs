import { setCookie } from '@shared/utils/env'
import { axiosInstanceWithAuth } from './axios'
import { endpoint } from './endpoint'
import { AddItemsToCartPayload, RemoveItemFromCartPayload } from '@shared/schema/cart'

export async function addItemsToCart(payload: AddItemsToCartPayload) {
  return await axiosInstanceWithAuth.post(endpoint.cartService.cart.addItems, payload)
}

export async function removeItemFromCart(payload: RemoveItemFromCartPayload) {
  return await axiosInstanceWithAuth.post(endpoint.cartService.cart.removeItem, payload)
}

export async function getCartDetail(cartUuid: string) {
  const url = `${endpoint.cartService.cart.getCartDetail}/${cartUuid}`
  return await axiosInstanceWithAuth.get(url)
}

export async function getCartUuid() {
  return await axiosInstanceWithAuth
    .get(endpoint.cartService.cart.getCartUuid)
    .then((res) => {
      setCookie('c_id', res.data)
    })
    .catch((err) => {
      console.warn(err)
    })
}
