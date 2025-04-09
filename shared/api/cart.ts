import { setCookie } from '@shared/utils/env'
import { axiosInstanceWithAuth } from './axios'
import { endpoint } from './endpoint'

export async function addItemsToCart() {}

export async function removeItemFromCart() {}

export async function getCartDetail() {}

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
