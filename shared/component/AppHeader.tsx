import React from 'react'
import { Avatar, Button } from 'antd'
import { ShoppingOutlined, UserOutlined } from '@ant-design/icons'

const AppHeader: React.FC = () => {
  return (
    <div className=" text-black w-4/12 flex justify-between items-center">
      <div>ICON</div>
      <div className="flex gap-2">
        <Button
          color="default"
          variant="filled"
          className="bg-blue-500! rounded-2xl!"
          icon={<ShoppingOutlined />}
        >
          Cart
        </Button>
        <Avatar className="bg-amber-500!" icon={<UserOutlined />} />
      </div>
    </div>
  )
}

export default AppHeader
