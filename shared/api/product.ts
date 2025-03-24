import { Product } from '../schema/product'
import { axiosInstanceWithAuth } from './axios'

export interface GetProductsQueryparams {
  page_size: number
}

export async function getProducts(params: GetProductsQueryparams): Promise<Product[]> {
  return await axiosInstanceWithAuth
    .get<Product[]>('/shop-product/product/products', { params })
    .then((res) => res.data)
    .catch((err) => err)
}
