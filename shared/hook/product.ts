import { GetProductsQueryparams, getProducts } from '@shared/api/product'
import { transformCartProduct } from '@shared/dto/product'
import { useQuery } from '@tanstack/react-query'

export const useProduct = () => {
  const params: GetProductsQueryparams = { page_size: 20 }
  const productQuery = useQuery({
    queryKey: ['product', params],
    queryFn: () => getProducts(params),
    retry: false,
    refetchOnWindowFocus: false,
    select(data) {
      return data.map((item) => transformCartProduct(item))
    },
  })

  return { productQuery }
}
