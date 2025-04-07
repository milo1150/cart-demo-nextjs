import { confirmPayment } from '@shared/api/payment'
import { GetCheckoutResponse } from '@shared/schema/checkout'
import { QueryObserverResult, useMutation } from '@tanstack/react-query'
import { useState } from 'react'
type UseConfirmPaymentModalProp = {
  fetchCheckout: () => Promise<QueryObserverResult<GetCheckoutResponse, Error>>
}
export const useConfirmPaymentModal = ({ fetchCheckout }: UseConfirmPaymentModalProp) => {
  const [openPaymentModal, setOpenPaymentModal] = useState(false)
  const [checkoutId, setCheckoutId] = useState<number | null>(null)

  const showPaymentModal = (checkoutId: number) => {
    setCheckoutId(checkoutId)
    setOpenPaymentModal(true)
  }

  const hidePaymentModal = () => {
    setCheckoutId(null)
    setOpenPaymentModal(false)
  }

  const confirmPaymentMutation = useMutation({
    mutationFn: confirmPayment,
    onSuccess: async () => {
      console.log('OK')
      setOpenPaymentModal(false)
      await fetchCheckout()
    },
  })

  const confirmPaymentHandler = () => {
    if (!checkoutId) {
      console.error('checkout id not found')
      return
    }
    confirmPaymentMutation.mutate(checkoutId)
  }

  return {
    openPaymentModal,
    confirmPaymentHandler,
    showPaymentModal,
    hidePaymentModal,
  }
}
