'use client'

import React from 'react'
import { Avatar, Badge } from 'antd'
import { ShoppingOutlined, UserOutlined } from '@ant-design/icons'

const AppHeader: React.FC = () => {
  return (
    <div className="w-full max-w-screen-lg px-4 flex justify-between items-center">
      <div>ICON</div>
      <div className="flex gap-4">
        <Badge count={10} className="border-amber-300!">
          <Avatar
            size={38}
            shape="square"
            className="cursor-pointer"
            icon={<ShoppingOutlined className="text-2xl! text-red-500" />}
          />
        </Badge>
        {/* <Button
          color="default"
          variant="filled"
          className="bg-blue-500! rounded-2xl! h-10! w-10! pt-1!"
          icon={<ShoppingOutlined className="text-2xl!" />}
        ></Button> */}
        <Avatar className="bg-green-500!" icon={<UserOutlined />} />
      </div>
    </div>
  )
}

export default AppHeader
