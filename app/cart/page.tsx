'use client'

import ShareLayout from '@shared/layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Card, Col, Divider, Row } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import { useCartStore } from '@shared/store/cart'
import { CartProduct } from '@shared/schema/product'
import Image from 'next/image'
import QuantityStepper from '@shared/component/QuantityStepper'
import { getTotalProductPrice } from '@shared/utils/cart'
import { DeleteOutlined } from '@ant-design/icons'

const queryClient = new QueryClient()

const Cart: React.FC = () => {
  const cartStore = useCartStore((state) => state)
  console.log(cartStore.shops)

  return (
    <ShareLayout>
      <Row className="pt-4!">
        {cartStore.shops.map((shop) => {
          return (
            <Card key={shop.id} title={shop.name} variant="borderless" className="w-full mb-4!">
              {shop.products.map((product, index) => {
                return (
                  <div key={product.id}>
                    <Product key={product.id} product={product} />
                    {index !== shop.products.length - 1 && <Divider className="my-0!" />}
                  </div>
                )
              })}
            </Card>
          )
        })}
      </Row>
    </ShareLayout>
  )
}

type ProductProps = {
  product: CartProduct
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const cartStore = useCartStore((state) => state)

  return (
    <Card key={product.id} className="w-full" variant="borderless">
      <Row gutter={12} className="items-center">
        <Col span={4}>
          <Image
            src={product.imageUrl || ''}
            width={100}
            height={100}
            alt={`Picture of ${product.name}`}
          />
        </Col>
        <Col span={4}>
          <p className="text-md font-bold">{product.name}</p>
        </Col>
        <Col span={4} className="place-items-center">
          <p className="text-xl font-bold">${product.price}</p>
        </Col>
        <Col span={4}>
          <QuantityStepper
            count={product.count}
            decreaseCallback={() => cartStore.decreaseProduct(product, 1)}
            increaseCallback={() => cartStore.increaseProduct(product, 1)}
            limit={product.stock}
            displayLimit={true}
          />
        </Col>
        <Col span={4} className="place-items-center">
          <p className="text-xl font-bold">${getTotalProductPrice(product.price, product.count)}</p>
        </Col>
        <Col span={4} className="text-center">
          <DeleteOutlined className="text-xl! cursor-pointer!" />
        </Col>
      </Row>
    </Card>
  )
}

const CartWrapper = () => {
  return (
    <StyleProvider hashPriority="high">
      <QueryClientProvider client={queryClient}>
        <Cart />
      </QueryClientProvider>
    </StyleProvider>
  )
}

export default CartWrapper
