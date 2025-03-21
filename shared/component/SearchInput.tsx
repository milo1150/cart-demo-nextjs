'use client'

import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const SearchInput: React.FC = () => {
  return (
    <div className="flex items-center">
      <Input
        placeholder="Search..."
        prefix={<SearchOutlined className="text-gray-500 text-xl" />}
        className="w-full p-2 border rounded-xl! focus:ring focus:ring-gray-300 h-12 border-none!"
      />
    </div>
  )
}

export default SearchInput
