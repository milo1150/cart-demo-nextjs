'use client'

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { StyleProvider } from '@ant-design/cssinjs'
import ShareLayout from '@shared/layout'
import { getCheckouts } from '@shared/api/checkout'
import { Card, Col, Divider, Row } from 'antd'
import Image from 'next/image'
import { CheckoutInfo, CheckoutProductInfo, CheckoutShopInfo } from '@shared/schema/checkout'
import React from 'react'

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
        />
      </Col>
      <Col span={6}>
        <p className="text-md font-bold">{productInfo.name}</p>
      </Col>
      <Col span={14} className="place-items-end">
        <p className="text-xl font-bold">${productInfo.price}</p>
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
        <p className="text-lg font-bold">{shopInfo.name}</p>
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

const CheckoutInfoCard: React.FC<{ checkout: CheckoutInfo }> = ({ checkout }) => {
  return (
    <Card key={'checout_card' + checkout.id} className="w-full">
      <Row key={'checkout_row' + checkout.id} className="w-full">
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
      </Row>
    </Card>
  )
}

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
        {checkoutQuery.data?.items
          .filter((v) => v.checkout_items.length)
          .map((checkout) => {
            return <CheckoutInfoCard key={'order_info' + checkout.id} checkout={checkout} />
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
