'use client'

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { StyleProvider } from '@ant-design/cssinjs'
import ShareLayout from '@shared/layout'
import { getCheckouts } from '@shared/api/checkout'
import { Badge, Button, Card, Col, Divider, Row, Image } from 'antd'
import { CheckoutInfo, CheckoutProductInfo, CheckoutShopInfo } from '@shared/schema/checkout'
import React from 'react'
import _ from 'lodash'
import { useConfirmPaymentModal } from '@shared/hook/payment'
import ConfirmModal from '@shared/component/ConfirmModal'

const queryClient = new QueryClient()

const ProductInfo: React.FC<{ productInfo: CheckoutProductInfo }> = ({ productInfo }) => {
  return (
    <Row className="w-full py-2 items-center">
      <Col span={4} className="flex! gap-2">
        <Image
          src={productInfo.image_url || ''}
          width={100}
          height={100}
          alt={`Picture of ${productInfo.name}`}
          className="rounded-xl"
        />
      </Col>
      <Col span={6}>
        <p className="text-lg font-bold">{productInfo.name}</p>
        <p className="text-sm">price: ${productInfo.price}</p>
        <p className="text-sm">quantity: {productInfo.quantity}</p>
      </Col>
      <Col span={14} className="place-items-end">
        <p className="text-xl font-bold">${productInfo.paid_amount}</p>
      </Col>
    </Row>
  )
}

const ShopInfo: React.FC<{
  shopInfo: CheckoutShopInfo
  productsInfo: CheckoutProductInfo[]
}> = ({ shopInfo, productsInfo }) => {
  return (
    <Row className="w-full pt-4">
      <Row className="gap-2 text-center">
        <p className="text-xl font-bold">{shopInfo.name}</p>
      </Row>
      <Divider className="my-3!" />
      {productsInfo.map((productInfo) => {
        return (
          <Row key={productInfo.id} className="w-full!">
            <ProductInfo key={productInfo.id} productInfo={productInfo} />
          </Row>
        )
      })}
    </Row>
  )
}
type OrderInfoCardProp = {
  checkout: CheckoutInfo
  showPaymentModal: (checkoutId: number) => void
}

const OrderInfoCard: React.FC<OrderInfoCardProp> = ({ checkout, showPaymentModal }) => {
  const content = (
    <Card className="w-full! rounded-2xl! border-none! shadow-none!">
      <Row className="w-full!">
        <div className="pb-2">
          <p className="text-xl font-bold">Order #{checkout.id}</p>
        </div>
        {checkout.checkout_items.map((checkoutItem) => {
          return (
            <Row key={checkoutItem.id} className="w-full">
              <ShopInfo
                key={checkoutItem.id}
                shopInfo={checkoutItem.shop}
                productsInfo={checkoutItem.products}
              />
            </Row>
          )
        })}
        <Divider className="my-3!" />
        <Row className="w-full justify-end mt-4">
          <p className="text-2xl font-bold">Total: ${checkout.total_paid_amount}</p>
          {checkout.payment?.status !== 'COMPLETED' && (
            <Button
              color="primary"
              variant="outlined"
              className="ml-3!"
              onClick={() => showPaymentModal(checkout.id)}
            >
              Pay
            </Button>
          )}
        </Row>
      </Row>
    </Card>
  )

  return checkout?.payment ? (
    <Badge.Ribbon
      text={_.upperCase(checkout.payment?.status)}
      color={checkout.payment?.status === 'PENDING' ? 'orange' : 'green'}
    >
      {content}
    </Badge.Ribbon>
  ) : (
    content
  )
}

const Checkout: React.FC = () => {
  const checkoutQuery = useQuery({
    queryKey: ['checkout'],
    queryFn: () => getCheckouts(),
    retry: true,
    refetchOnWindowFocus: true,
  })
  const { openPaymentModal, showPaymentModal, confirmPaymentHandler, hidePaymentModal } =
    useConfirmPaymentModal({ fetchCheckout: checkoutQuery.refetch })

  return (
    <ShareLayout>
      <Row gutter={[16, 16]} className="mt-4 w-full!">
        {checkoutQuery.data?.items
          .filter((v) => v.checkout_items.length)
          .map((checkout) => {
            return (
              <OrderInfoCard
                key={'order_info' + checkout.id}
                checkout={checkout}
                showPaymentModal={showPaymentModal}
              />
            )
          })}
      </Row>

      <ConfirmModal
        open={openPaymentModal}
        handleCancel={hidePaymentModal}
        handleOk={confirmPaymentHandler}
        title="Confirm Payment"
        subtitle="Please review and confirm your payment details before proceeding."
      />
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
