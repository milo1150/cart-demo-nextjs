import { ProductResponse } from '@shared/schema/product'
import { axiosInstanceWithAuth } from './axios'

export interface GetProductsQueryparams {
  page_size: number
}

export async function getProducts(params: GetProductsQueryparams): Promise<ProductResponse[]> {
  return await axiosInstanceWithAuth
    .get<ProductResponse[]>('/shop-product/product/products', { params })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err)
      return []
    })
}
