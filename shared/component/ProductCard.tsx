'use client'

import { Card, Button, ConfigProvider } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'

type ProductProps = {
  image: string
  title: string
  price: number
  isNew?: boolean
}

export default function ProductCard({ image, title, price }: ProductProps) {
  return (
    <ConfigProvider theme={{ components: { Card: { bodyPadding: 10 } } }}>
      <Card
        className="relative rounded-xl! shadow-lg overflow-hidden border-none! border-gray-200 p-0 h-max-xl"
        // eslint-disable-next-line @next/next/no-img-element
        cover={<img src={image} alt={title} className="w-full h-50 object-cover" />}
      >
        {/* Wishlist Icon */}
        {/* <button className="absolute top-3 right-3 text-gray-500 hover:text-red-500">
          <HeartOutlined className="text-xl" />
        </button> */}

        {/* Product Details */}
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>

          {/* Add to Cart Button */}
          <div className="flex justify-between text-center items-end mt-1">
            <div>
              <p className="text-gray-500 text-sm">Price:</p>
              <p className="text-xl font-bold">${price}</p>
            </div>
            <Button
              variant="filled"
              shape="default"
              className="bg-blue-600 hover:bg-blue-700 border-none w-12 h-12 flex items-center justify-center"
              icon={<ShoppingCartOutlined className="text-xl" />}
            />
          </div>
        </div>
      </Card>
    </ConfigProvider>
  )
}
