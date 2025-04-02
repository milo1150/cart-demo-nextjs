'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StyleProvider } from '@ant-design/cssinjs'
import ShareLayout from '@shared/layout'

const queryClient = new QueryClient()

const Checkout: React.FC = () => {
  return (
    <ShareLayout>
      <>Checkout</>
    </ShareLayout>
  )
}

const CheckoutWrapper: React.FC = () => {
  return (
    <StyleProvider hashPriority="high">
      <QueryClientProvider client={queryClient}>
        <Checkout />
      </QueryClientProvider>
    </StyleProvider>
  )
}

export default CheckoutWrapper
