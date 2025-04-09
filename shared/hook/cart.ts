import { addItemsToCart } from '@shared/api/cart'
import { CartProduct } from '@shared/schema/product'
import { useCartStore } from '@shared/store/cart'
import { getAddItemsToCartPayload, findProductInCart } from '@shared/utils/cart'
import { useMutation } from '@tanstack/react-query'
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
