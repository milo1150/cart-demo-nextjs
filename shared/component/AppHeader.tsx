'use client'

import React from 'react'
import { Badge, Button } from 'antd'
import { ShoppingOutlined, UserOutlined } from '@ant-design/icons'
import { useCartStore } from '@shared/store/cart'
import { useRouter } from 'next/navigation'

const AppHeader: React.FC = () => {
  const router = useRouter()
  const cartStore = useCartStore((state) => state)

  return (
    <div className="w-full max-w-screen-lg px-4 flex justify-between items-center">
      <div className="cursor-pointer" onClick={() => router.push('/')}>
        ICON
      </div>
      <div className="flex gap-4">
        <Badge count={cartStore.getAllProductCount()} className="border-amber-300!">
          <Button
            color="default"
            variant="filled"
            className="bg-blue-500! rounded-2xl! h-10! w-10!"
            icon={<ShoppingOutlined className="text-2xl!" />}
            onClick={() => router.push('/cart')}
          ></Button>
        </Badge>
        <Button
          color="default"
          variant="filled"
          className="bg-blue-500! rounded-2xl! h-10! w-10! pt-2!"
          icon={<UserOutlined className="text-2xl!" />}
        ></Button>
      </div>
    </div>
  )
}

export default AppHeader
