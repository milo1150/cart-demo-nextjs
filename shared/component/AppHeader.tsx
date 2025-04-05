'use client'

import React from 'react'
import { Badge, Button, Popover } from 'antd'
import { UserOutlined, ShoppingCartOutlined, InboxOutlined, MoonOutlined } from '@ant-design/icons'
import { useCartStore } from '@shared/store/cart'
import { useRouter } from 'next/navigation'
import { userCheckoutStore } from '@shared/store/checkout'
import UserPopoverContent from './UserPopover'
import { useAntdStore } from '@shared/store/antd'

const AppHeader: React.FC = () => {
  const router = useRouter()
  const cartStore = useCartStore((state) => state)
  const checkoutStore = userCheckoutStore((state) => state)
  const antdStore = useAntdStore((state) => state)

  return (
    <div className="w-full max-w-screen-lg px-4 flex justify-between items-center">
      <div className="cursor-pointer" onClick={() => router.push('/')}>
        ICON
      </div>
      <div className="flex gap-4">
        {/* Cart */}
        <Badge count={cartStore.getAllProductCount()} className="border-amber-300!">
          <Button
            color="default"
            variant="filled"
            className="bg-blue-500! rounded-2xl! h-10! w-10!"
            icon={<ShoppingCartOutlined className="text-2xl!" />}
            onClick={() => router.push('/cart')}
          ></Button>
        </Badge>

        {/* Checkout */}
        <Badge count={checkoutStore.count()} className="border-amber-300!">
          <Button
            color="default"
            variant="filled"
            className="bg-blue-500! rounded-2xl! h-10! w-10!"
            icon={<InboxOutlined className="text-2xl!" />}
            onClick={() => router.push('/checkout')}
          ></Button>
        </Badge>

        {/* User */}
        <Popover placement="bottomRight" content={UserPopoverContent}>
          <Button
            color="default"
            variant="filled"
            className="bg-blue-500! rounded-2xl! h-10! w-10! pt-2!"
            icon={<UserOutlined className="text-2xl!" />}
          ></Button>
        </Popover>

        {/* Toggle Darkmode */}
        <Button
          color="default"
          variant="filled"
          className="bg-blue-500! rounded-2xl! h-10! w-10! pt-1!"
          icon={<MoonOutlined className="text-xl!" />}
          onClick={() => antdStore.setDarkmode(!antdStore.darkmode)}
        ></Button>
      </div>
    </div>
  )
}

export default AppHeader
