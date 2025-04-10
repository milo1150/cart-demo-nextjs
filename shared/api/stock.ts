import { axiosInstanceWithAuth } from './axios'
import { endpoint } from './endpoint'
import { UpdateStockPayload } from '@shared/schema/stock'

export async function updateProductStock(payload: UpdateStockPayload): Promise<unknown> {
  return await axiosInstanceWithAuth.post(endpoint.shopProductService.stock.updateStock, payload)
}
