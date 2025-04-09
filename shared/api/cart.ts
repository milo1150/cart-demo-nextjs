import { setCookie } from '@shared/utils/env'
import { axiosInstanceWithAuth } from './axios'
import { endpoint } from './endpoint'
import { AddItemsToCartPayload } from '@shared/schema/cart'

export async function addItemsToCart(payload: AddItemsToCartPayload) {
  const res = await axiosInstanceWithAuth.post(endpoint.cartService.cart.addItems, payload)
  return res
}

export async function removeItemFromCart() {}

export async function getCartDetail(cartUuid: string) {
  const url = `${endpoint.cartService.cart.getCartDetail}/${cartUuid}`
  const res = await axiosInstanceWithAuth.get(url)
  return res
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
