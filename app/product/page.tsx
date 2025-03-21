'use client'

import { Button, Input } from 'antd'
import { useRouter } from 'next/navigation'

const Product: React.FC = () => {
  const router = useRouter()

  return (
    <>
      <Input placeholder="Product Input" />
      <Button type="primary" onClick={() => router.push('/')}>
        Product - Button
      </Button>
    </>
  )
}

export default Product
