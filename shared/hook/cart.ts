import { addItemsToCart, removeItemFromCart } from '@shared/api/cart'
import { GetCartDetailResponse, RemoveItemFromCartPayload } from '@shared/schema/cart'
import { CartProduct } from '@shared/schema/product'
import { useCartStore } from '@shared/store/cart'
import { getAddItemsToCartPayload, findProductInCart } from '@shared/utils/cart'
import { QueryObserverResult, useMutation } from '@tanstack/react-query'
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
  fetchCartItems: () => Promise<QueryObserverResult<GetCartDetailResponse, Error>>
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
      await fetchCartItems().then((res) => {
        const cartDetailResData = res.data
        if (deleteItem && cartDetailResData) {
          // Remove product
          cartStore.removeProduct(deleteItem.shop_id, deleteItem.product_id)

          // Update product stock and price
          cartStore.updateProductsDetail(cartDetailResData)

          // Hide delete modal
          hideDeleteCartItemModal()
        }
      })
    },
  })

  const confirmDeleteCartItemHandler = () => {
    if (!deleteItem) {
      console.error('delete item id not found')
      return
    }

    deleteCartItemMutation.mutate(deleteItem)
  }

  return {
    openDeleteModal,
    confirmDeleteCartItemHandler,
    showDeleteCartItemModal,
    hideDeleteCartItemModal,
  }
}
