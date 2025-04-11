'use client'

import React, { useMemo } from 'react'
import { Badge, Button, Divider, Popover, Row } from 'antd'
import {
  UserOutlined,
  ShoppingCartOutlined,
  MoonOutlined,
  CreditCardOutlined,
  AppstoreAddOutlined,
  AppstoreFilled,
} from '@ant-design/icons'
import { useCartStore } from '@shared/store/cart'
import { useRouter } from 'next/navigation'
import { userCheckoutStore } from '@shared/store/checkout'
import UserPopoverContent from './UserPopover'
import { useAntdStore } from '@shared/store/antd'
import Image from 'next/image'

const AppHeader: React.FC = () => {
  const router = useRouter()
  const cartStore = useCartStore((state) => state)
  const checkoutStore = userCheckoutStore((state) => state)
  const antdStore = useAntdStore((state) => state)

  const baseButtonClass = useMemo(() => {
    return `${antdStore.darkmode ? 'bg-indigo-700!' : 'bg-gray-200!'}`
  }, [antdStore.darkmode])

  return (
    <div className="w-full max-w-screen-lg px-16 flex flex-col! justify-between items-center!">
      <Row className="items-center gap-4 just w-full justify-between">
        <div className="cursor-pointer" onClick={() => router.push('/')}>
          <Image
            src="/assets/logo.png"
            width={80}
            height={80}
            alt="App Logo"
            className="rounded-xl"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex gap-4">
            {/* Main page */}
            <Button
              color="default"
              variant="filled"
              className={`${baseButtonClass} rounded-2xl! h-10! w-10! pt-2!`}
              icon={<AppstoreFilled className="text-2xl!" />}
              onClick={() => router.push('/')}
            ></Button>

            {/* Cart */}
            <Badge count={cartStore.getAllProductCount()} className="border-amber-300!">
              <Button
                color="default"
                variant="filled"
                className={`${baseButtonClass} rounded-2xl! h-10! w-10!`}
                icon={<ShoppingCartOutlined className="text-2xl!" />}
                onClick={() => router.push('/cart')}
              ></Button>
            </Badge>

            {/* Checkout */}
            <Badge count={checkoutStore.count()} className="border-amber-300!">
              <Button
                color="default"
                variant="filled"
                className={`${baseButtonClass} rounded-2xl! h-10! w-10!`}
                icon={<CreditCardOutlined className="text-2xl!" />}
                onClick={() => router.push('/checkout')}
              ></Button>
            </Badge>

            {/* Add stock */}
            <Button
              color="default"
              variant="filled"
              className={`${baseButtonClass} rounded-2xl! h-10! w-10! pt-2!`}
              icon={<AppstoreAddOutlined className="text-2xl!" />}
              onClick={() => router.push('/stock')}
            ></Button>
          </div>

          <Divider
            type="vertical"
            className={`h-6! mx-0! mt-2! ${antdStore.darkmode ? 'border-gray-500!' : 'border-gray-300!'}`}
          />

          <div className="flex gap-4">
            {/* Toggle Darkmode */}
            <Button
              color="default"
              variant="filled"
              className={`${baseButtonClass} rounded-2xl! h-10! w-10! pt-1!`}
              icon={<MoonOutlined className="text-xl!" />}
              onClick={() => antdStore.setDarkmode(!antdStore.darkmode)}
            ></Button>

            {/* User */}
            <Popover placement="bottomRight" content={UserPopoverContent}>
              <Button
                color="default"
                variant="filled"
                className={`${baseButtonClass} rounded-2xl! h-10! w-10! pt-2!`}
                icon={<UserOutlined className="text-2xl!" />}
              ></Button>
            </Popover>
          </div>
        </div>
      </Row>

      <Divider
        type="horizontal"
        className={`m-0! ${antdStore.darkmode ? 'border-gray-500!' : 'border-gray-300!'}`}
      />
    </div>
  )
}

export default AppHeader
