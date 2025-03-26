'use client'

import { Card, Button, ConfigProvider, Badge } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { useCartStore } from '@shared/store/cart'
import { CartProduct } from '@shared/schema/product'
import { useEffect, useState } from 'react'
import { findProductInCart } from '@shared/utils/cart'
import QuantityStepper from './QuantityStepper'

type ProductCardActionButtonProps = {
  product: CartProduct
}

type ProductProps = {
  product: CartProduct
}

const ProductCardActionButton: React.FC<ProductCardActionButtonProps> = ({ product }) => {
  const cartStore = useCartStore((state) => state)
  const countProductInCart: number = cartStore.getProductCount(product)
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    console.log(cartStore.shops)
  }, [cartStore.shops])

  useEffect(() => {
    setCount(1)
  }, [product])

  const increaseCount = (): void => {
    if (count >= product.stock) return
    setCount((prev) => (prev += 1))
  }

  const decreaseCount = (): void => {
    if (count <= 1) return
    setCount((prev) => (prev -= 1))
  }

  const onClickAddToCart = (): void => {
    const findProduct = findProductInCart(cartStore.shops, product)

    if (!findProduct.ok) {
      cartStore.addProduct(product, count)
    }

    if (findProduct.ok) {
      cartStore.increaseProduct(product, count)
    }
  }

  return (
    <div className="flex justify-end mt-2">
      <QuantityStepper
        count={count}
        decreaseCallback={decreaseCount}
        increaseCallback={increaseCount}
      />
      <ConfigProvider theme={{ token: { paddingXS: 1 } }}>
        <Badge count={countProductInCart} size="small" offset={[-4, 0]} className="hello-world">
          <Button
            variant="filled"
            shape="default"
            className="bg-blue-600 hover:bg-blue-700 border-none w-9! flex items-center justify-center ml-1"
            icon={<ShoppingCartOutlined className="text-lg!" />}
            onClick={() => onClickAddToCart()}
          />
        </Badge>
      </ConfigProvider>
    </div>
  )
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  return (
    <ConfigProvider theme={{ components: { Card: { bodyPadding: 10 } } }}>
      <Card
        className="relative rounded-xl! shadow-lg overflow-hidden border-none! border-gray-200 p-0 h-max-xl"
        cover={
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.imageUrl} alt={product.name} className="w-full h-50 object-cover" />
        }
      >
        {/* Wishlist Icon */}
        {/* <button className="absolute top-3 right-3 text-gray-500 hover:text-red-500">
          <HeartOutlined className="text-xl" />
        </button> */}

        <div>
          <h3 className="text-lg font-semibold">{product.name}</h3>

          {/* Price */}
          <div className="flex justify-between text-center items-end pb-1">
            <p className="text-gray-500 text-sm">Price:</p>
            <p className="text-xl font-bold">${product.price}</p>
          </div>

          {/* Shop name */}
          <div className="flex justify-between text-center items-end pb-1">
            <p className="text-gray-500 text-sm">Shop:</p>
            <p className="text-md font-bold">{product.shop.name}</p>
          </div>

          {/* Stock */}
          <div className="flex justify-between text-center items-end pb-1">
            <p className="text-gray-500 text-sm">Stock:</p>
            <p className="text-md font-bold">{product.stock}</p>
          </div>

          {/* Actions */}
          <ProductCardActionButton product={product} />
        </div>
      </Card>
    </ConfigProvider>
  )
}

export default ProductCard
