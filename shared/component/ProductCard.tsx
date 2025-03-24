'use client'

import { Card, Button, ConfigProvider, Input } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { useCartStore } from '@shared/store/cart'
import { CartProduct } from '@shared/schema/product'
import { useEffect, useState } from 'react'
import { findProductInCart } from '@shared/utils/cart'

type ProductProps = {
  product: CartProduct
}

const ProductCardActionButtons: React.FC<ProductProps> = ({ product }) => {
  const cartStore = useCartStore((state) => state)
  const [count, setCount] = useState<number>(1)

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
    if (findProduct.ok) {
      cartStore.increaseProduct(product, count)
    } else {
      cartStore.addProduct(product, count)
    }
  }

  return (
    <div className="flex justify-end gap-1 mt-2">
      <Button className="w-1!" onClick={() => decreaseCount()}>
        -
      </Button>
      <Input className="w-10! pointer-events-none justify-items-center" value={count} />
      <Button className="w-1!" onClick={() => increaseCount()}>
        +
      </Button>
      <Button
        variant="filled"
        shape="default"
        className="bg-blue-600 hover:bg-blue-700 border-none w-9! flex items-center justify-center"
        icon={<ShoppingCartOutlined className="text-lg!" />}
        onClick={() => onClickAddToCart()}
      />
    </div>
  )
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const cartStore = useCartStore((state) => state)

  useEffect(() => {
    console.log(cartStore.shops)
  }, [cartStore.shops])

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

          {/* Stock */}
          <div className="flex justify-between text-center items-end pb-1">
            <p className="text-gray-500 text-sm">Stock:</p>
            <p className="text-md font-bold">{product.stock}</p>
          </div>

          {/* Actions */}
          <ProductCardActionButtons product={product} />
        </div>
      </Card>
    </ConfigProvider>
  )
}

export default ProductCard
