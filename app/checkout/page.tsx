'use client'

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { StyleProvider } from '@ant-design/cssinjs'
import ShareLayout from '@shared/layout'
import { getCheckouts } from '@shared/api/checkout'
import { Card, Col, Divider, Row } from 'antd'
import Image from 'next/image'
import { CheckoutProductInfo, CheckoutShopInfo } from '@shared/schema/checkout'

const queryClient = new QueryClient()

const ProductInfoCard: React.FC<{ productInfo: CheckoutProductInfo }> = ({ productInfo }) => {
  return (
    <Card key={productInfo.id} className="w-full" variant="borderless">
      <Row gutter={12} className="items-center">
        <Col span={4} className="flex! gap-2">
          <Image
            src={productInfo.image_url || ''}
            width={100}
            height={100}
            alt={`Picture of ${productInfo.name}`}
          />
        </Col>
        <Col span={4}>
          <p className="text-md font-bold">{productInfo.name}</p>
        </Col>
        <Col span={4} className="place-items-center">
          <p className="text-xl font-bold">${productInfo.price}</p>
        </Col>
        {/* <Col span={4} className="place-items-center">
          <p className="text-xl font-bold">${getTotalProductPrice(product.price, product.count)}</p>
        </Col> */}
      </Row>
    </Card>
  )
}

const ShopInfoCard: React.FC<{
  shopInfo: CheckoutShopInfo
  productsInfo: CheckoutProductInfo[]
}> = ({ shopInfo, productsInfo }) => {
  return (
    <Card key={shopInfo.id} variant="borderless" className="w-full mb-4!">
      <Row className="gap-2 text-center">
        <p className="text-xl font-bold">{shopInfo.name}</p>
      </Row>
      <Divider className="my-3!" />

      {productsInfo.map((productInfo, index) => {
        return (
          <div key={productInfo.id}>
            <ProductInfoCard key={productInfo.id} productInfo={productInfo} />
            {index !== productsInfo.length - 1 && <Divider className="my-0!" />}
          </div>
        )
      })}
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
        {checkoutQuery.data?.items.map((checkout) => {
          return checkout.checkout_items.map((checkoutItem) => {
            return (
              <Col key={checkoutItem.id} span={24}>
                <ShopInfoCard
                  key={checkoutItem.id}
                  shopInfo={checkoutItem.shop}
                  productsInfo={checkoutItem.products}
                />
              </Col>
            )
          })
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
