import Link from 'next/link'

const CartChild: React.FC = () => {
  return (
    <>
      CartChild
      <Link href={`/cart/`}>back to cart main</Link>
    </>
  )
}

export default CartChild
