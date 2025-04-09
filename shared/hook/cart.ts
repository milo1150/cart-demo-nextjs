import { addItemsToCart, removeItemFromCart } from '@shared/api/cart'
import { RemoveItemFromCartPayload } from '@shared/schema/cart'
import { CartProduct } from '@shared/schema/product'
import { useCartStore } from '@shared/store/cart'
import { getAddItemsToCartPayload, findProductInCart } from '@shared/utils/cart'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export const useAddItemToCart = () => {
  const cartStore = useCartStore((state) => state)
  const addItemMutation = useMutation({ mutationFn: addItemsToCart })

  // Update cart (server side)
  const updateCartItemDebounced = useDebouncedCallback(() => {
    const payload = getAddItemsToCartPayload(cartStore.getAllProduct())
    addItemMutation.mutate(payload)
  }, 1500)

  const onClickAddToCartHandler = (product: CartProduct, count: number) => {
    // Update local storage
    const findProduct = findProductInCart(cartStore.shops, product)
    if (!findProduct.ok) {
      cartStore.addProduct(product, count)
    }
    if (findProduct.ok) {
      cartStore.increaseProduct(product, count)
    }

    updateCartItemDebounced()
  }

  const onClickIncreaseItem = (product: CartProduct, count: number) => {
    // Update local storage
    cartStore.increaseProduct(product, count)

    updateCartItemDebounced()
  }

  const onClickDecreaseItem = (product: CartProduct, count: number) => {
    // Update local storage
    cartStore.decreaseProduct(product, count)

    updateCartItemDebounced()
  }

  return { onClickAddToCartHandler, onClickIncreaseItem, onClickDecreaseItem }
}

type UseConfirmDeleteCartItemModalProps = {
  fetchCartItems: () => Promise<unknown>
}
export const useConfirmDeleteCartItemModal = ({
  fetchCartItems,
}: UseConfirmDeleteCartItemModalProps) => {
  const cartStore = useCartStore((state) => state)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [deleteItem, setDeleteItem] = useState<RemoveItemFromCartPayload | null>(null)

  const showDeleteCartItemModal = (item: RemoveItemFromCartPayload) => {
    setDeleteItem(item)
    setOpenDeleteModal(true)
  }

  const hideDeleteCartItemModal = () => {
    setDeleteItem(null)
    setOpenDeleteModal(false)
  }

  const deleteCartItemMutation = useMutation({
    mutationFn: removeItemFromCart,
    onSuccess: async () => {
      await fetchCartItems()
      if (deleteItem) {
        cartStore.removeProduct(deleteItem.shop_id, deleteItem.product_id)
        hideDeleteCartItemModal()
      }
    },
  })

  const confirmDeleteCartItemHandler = () => {
    if (!deleteItem) {
      console.error('delete item id not found')
      return
    }

    // TODO: enable
    console.log('FIRE DELETE')
    deleteCartItemMutation.mutate(deleteItem)
  }

  return {
    openDeleteModal,
    confirmDeleteCartItemHandler,
    showDeleteCartItemModal,
    hideDeleteCartItemModal,
  }
}
