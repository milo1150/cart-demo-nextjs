'use client'

import ShareLayout from '@shared/layout'
import { QueryClient, QueryClientProvider, useMutation, useQuery } from '@tanstack/react-query'
import { Button, Card, Checkbox, Col, Divider, Row } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import { useCartStore } from '@shared/store/cart'
import { CartProduct } from '@shared/schema/product'
import Image from 'next/image'
import QuantityStepper from '@shared/component/QuantityStepper'
import { getTotalProductPrice } from '@shared/utils/cart'
import { DeleteOutlined } from '@ant-design/icons'
import { Footer } from 'antd/es/layout/layout'
import { generateCheckoutPayload } from '@shared/utils/checkout'
import { createCheckout } from '@shared/api/checkout'
import { CartShop } from '@shared/schema/shop'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getCartDetail } from '@shared/api/cart'
import { getCookieByKey } from '@shared/utils/env'
import { useAddItemToCart, useConfirmDeleteCartItemModal } from '@shared/hook/cart'
import ConfirmModal from '@shared/component/ConfirmModal'
import { RemoveItemFromCartPayload } from '@shared/schema/cart'

const queryClient = new QueryClient()

const ProductCard: React.FC<{
  product: CartProduct
  showDeleteItemModal: (item: RemoveItemFromCartPayload) => void
}> = ({ product, showDeleteItemModal }) => {
  const cartStore = useCartStore((state) => state)
  const { onClickIncreaseItem, onClickDecreaseItem } = useAddItemToCart()

  return (
    <Card key={product.id} className="w-full border-none! shadow-none!" variant="borderless">
      <Row gutter={12} className="items-center">
        <Col span={4} className="flex! gap-2">
          <Checkbox
            checked={product.checked}
            onChange={(e) => cartStore.setCheckProduct(product, e.target.checked)}
          ></Checkbox>
          <Image
            src={product.imageUrl || ''}
            width={100}
            height={100}
            alt={`Picture of ${product.name}`}
            className="rounded-xl"
          />
        </Col>
        <Col span={4}>
          <p className="text-md font-bold">{product.name}</p>
        </Col>
        <Col span={4} className="place-items-center">
          <p className="text-xl font-bold">${product.price}</p>
        </Col>
        <Col span={4}>
          <QuantityStepper
            count={product.count}
            decreaseCallback={() => onClickDecreaseItem(product, 1)}
            increaseCallback={() => onClickIncreaseItem(product, 1)}
            limit={product.stock}
            displayLimit={true}
          />
        </Col>
        <Col span={4} className="place-items-center">
          <p className="text-xl font-bold">${getTotalProductPrice(product.price, product.count)}</p>
        </Col>
        <Col span={4} className="text-center">
          <DeleteOutlined
            className="text-xl! cursor-pointer!"
            onClick={() =>
              showDeleteItemModal({ shop_id: product.shop.id, product_id: product.id })
            }
          />
        </Col>
      </Row>
    </Card>
  )
}

const ShopCard: React.FC<{
  shop: CartShop
  showDeleteItemModal: (item: RemoveItemFromCartPayload) => void
}> = ({ shop, showDeleteItemModal }) => {
  const cartStore = useCartStore((state) => state)

  return (
    <Card
      key={shop.id}
      variant="borderless"
      className="w-full mb-4! rounded-2xl! border-none! shadow-none!"
    >
      <Row className="gap-2 text-center">
        <Checkbox
          checked={shop.checked}
          onChange={(e) => cartStore.setCheckShop(shop.id, e.target.checked)}
        ></Checkbox>
        <p className="text-xl font-bold">{shop.name}</p>
      </Row>
      <Divider className="my-3!" />
      {shop.products.map((product, index) => {
        return (
          <div key={product.id}>
            <ProductCard
              key={product.id}
              product={product}
              showDeleteItemModal={showDeleteItemModal}
            />
            {index !== shop.products.length - 1 && <Divider className="my-0!" />}
          </div>
        )
      })}
    </Card>
  )
}

const CartSummary = () => {
  const router = useRouter()

  const totalItems = useCartStore((state) => state.getSelectedProductCount())
  const totalPrice = useCartStore((state) => state.getSelectedProductTotalPrice())
  const selectedProducts = useCartStore((state) => state.selectedProducts)
  const cartStore = useCartStore((state) => state)

  const createCheckoutMutation = useMutation({
    mutationFn: createCheckout,
    onSuccess: async () => {
      router.push('/checkout')
      cartStore.resetSelectedProducts()
    },
  })

  const checkoutHandler = () => {
    const payload = generateCheckoutPayload(selectedProducts)
    createCheckoutMutation.mutate(payload)
  }

  return (
    <Footer className="fixed bottom-0 bg-blue-500! w-full! max-w-screen-lg! rounded-tl-lg rounded-tr-lg py-3! px-3!">
      <Row className="gap-4 justify-end items-center">
        <p className="text-xl font-bold">
          Total ({totalItems} items): ${totalPrice}
        </p>
        <Button
          className="border-blue-300! bg-blue-300! font-bold! text-md!"
          onClick={() => checkoutHandler()}
        >
          CHECKOUT
        </Button>
      </Row>
    </Footer>
  )
}

const Cart: React.FC = () => {
  const cartStore = useCartStore((state) => state)
  const [cartUuid, setCartUuid] = useState<string>('')

  const cartDetailQuery = useQuery({
    queryKey: ['cart-detail'],
    queryFn: () => getCartDetail(cartUuid),
    enabled: false,
  })
  const {
    openDeleteModal,
    hideDeleteCartItemModal,
    confirmDeleteCartItemHandler,
    showDeleteCartItemModal,
  } = useConfirmDeleteCartItemModal({ fetchCartItems: cartDetailQuery.refetch })

  useEffect(() => {
    if (cartUuid) {
      cartDetailQuery.refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartUuid])

  useEffect(() => {
    const cartUuid = getCookieByKey('c_id')
    if (cartUuid) {
      setCartUuid(cartUuid)
    }
  }, [])

  return (
    <ShareLayout>
      <Row className="pt-4! justify-center mb-20">
        {cartStore.shops
          .filter((shop) => shop.products.length)
          .map((shop) => {
            return (
              <ShopCard key={shop.id} shop={shop} showDeleteItemModal={showDeleteCartItemModal} />
            )
          })}
        <CartSummary />
      </Row>

      <ConfirmModal
        open={openDeleteModal}
        handleCancel={hideDeleteCartItemModal}
        handleOk={confirmDeleteCartItemHandler}
        title="Confirm Delete Product"
        subtitle="Please review and confirm your product details before proceeding."
      />
    </ShareLayout>
  )
}

const CartWrapper = () => {
  return (
    <StyleProvider hashPriority="high">
      <QueryClientProvider client={queryClient}>
        <Cart />
      </QueryClientProvider>
    </StyleProvider>
  )
}

export default CartWrapper
