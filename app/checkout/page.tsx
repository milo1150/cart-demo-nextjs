'use client'

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { StyleProvider } from '@ant-design/cssinjs'
import ShareLayout from '@shared/layout'
import { getCheckouts } from '@shared/api/checkout'
import { Col, Row } from 'antd'

const queryClient = new QueryClient()

const Checkout: React.FC = () => {
  const checkoutQuery = useQuery({
    queryKey: ['checkout'],
    queryFn: () => getCheckouts(),
    retry: true,
    refetchOnWindowFocus: true,
  })
  return (
    <ShareLayout>
      <Row gutter={[16, 16]} className="mt-4">
        {checkoutQuery.data?.items.map((checkout) => {
          return (
            <Col key={checkout.id} span={24}>
              {/* <ProductCard checkout={checkout} /> */}
              {checkout.id}
            </Col>
          )
        })}
      </Row>
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
