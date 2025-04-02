import { create } from 'zustand'

export type CheckoutState = {
  checkouts: []
}

export type CheckoutAction = {
  reset: () => void
  count: () => number
}

const initCheckout: CheckoutState = {
  checkouts: [],
}

export const userCheckoutStore = create<CheckoutState & CheckoutAction>()((set, get) => ({
  checkouts: [],
  count: () => get().checkouts.length,
  reset: () => set(initCheckout),
}))
