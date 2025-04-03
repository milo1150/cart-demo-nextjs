import { CreateCheckoutPayload, GetCheckoutResponse } from '@shared/schema/checkout'
import { axiosInstanceWithAuth } from './axios'
import { endpoint } from './endpoint'

export async function createCheckout(payload: CreateCheckoutPayload) {
  return await axiosInstanceWithAuth
    .post(endpoint.cartService.checkout.create, payload)
    .then((res) => {
      console.log(res)
      return res
    })
    .catch((err) => {
      console.error(err)
    })
}

export async function getCheckouts(): Promise<GetCheckoutResponse> {
  return await axiosInstanceWithAuth
    .get<GetCheckoutResponse>(endpoint.cartService.checkout.getCheckouts)
    .then((res) => {
      console.log(res)
      return res.data
    })
    .catch((err) => {
      console.error(err)
      return { items: [] }
    })
}
