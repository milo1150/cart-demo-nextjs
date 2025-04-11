export type UpdateStockEnum = 'inc' | 'dec' | 'update'

export type UpdateStockInfo = {
  amount: number
  product_id: number
  action: UpdateStockEnum
}

export type UpdateStockPayload = {
  stocks: UpdateStockInfo[]
}
