import { axiosInstanceWithAuth } from './axios'
import { endpoint } from './endpoint'

export async function confirmPayment(checkoutId: number) {
  const url = `${endpoint.payment.updatePayment}/${checkoutId}`
  return await axiosInstanceWithAuth.patch(url).catch((err) => {
    console.error(err)
  })
}
