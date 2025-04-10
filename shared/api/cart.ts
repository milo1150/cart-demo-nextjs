import { setCookie } from '@shared/utils/env'
import { axiosInstanceWithAuth } from './axios'
import { endpoint } from './endpoint'
import {
  AddItemsToCartPayload,
  GetCartDetailResponse,
  RemoveItemFromCartPayload,
} from '@shared/schema/cart'

export async function addItemsToCart(payload: AddItemsToCartPayload) {
  return await axiosInstanceWithAuth.post(endpoint.cartService.cart.addItems, payload)
}

export async function removeItemFromCart(payload: RemoveItemFromCartPayload) {
  return await axiosInstanceWithAuth.post(endpoint.cartService.cart.removeItem, payload)
}

export async function getCartDetail(cartUuid: string): Promise<GetCartDetailResponse> {
  const url = `${endpoint.cartService.cart.getCartDetail}/${cartUuid}`
  return (await axiosInstanceWithAuth.get(url)).data
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
