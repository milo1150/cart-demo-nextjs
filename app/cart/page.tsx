'use client'

import { Button } from 'antd'
import { useRouter } from 'next/navigation'

const Cart: React.FC = () => {
  const router = useRouter()
  return (
    <>
      <Button type="primary" onClick={() => router.push('/')}>
        Cart - Button
      </Button>
    </>
  )
}

export default Cart
