'use client'

import QuantityStepper from '@shared/component/QuantityStepper'
import { useProduct } from '@shared/hook/product'
import ShareLayout from '@shared/layout'
import { CartProduct } from '@shared/schema/product'
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query'
import { Avatar, Button, List, message, Row } from 'antd'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { SyncOutlined } from '@ant-design/icons'
import { updateProductStock } from '@shared/api/stock'
import { createUpdateStockPayloadFromCartProduct } from '@shared/utils/stock'

const queryClient = new QueryClient()

const StockList: React.FC = () => {
  const { productQuery } = useProduct()
  const [stocks, setStock] = useState<CartProduct[]>([])

  useEffect(() => {
    if (productQuery.data) {
      setStock(productQuery.data!)
    }
  }, [productQuery.data])

  const onClickDecreaseStock = (index: number) => {
    if (stocks[index].stock <= 0) return
    setStock((state) => {
      const newState = _.cloneDeep(state) // ! if not using cloneDeep, stock will trigger twice
      newState[index].stock -= 1
      return [...newState]
    })
  }

  const onClickIncreaseStock = (index: number) => {
    setStock((state) => {
      const newState = _.cloneDeep(state)
      newState[index].stock += 1
      return [...newState]
    })
  }

  const updateStockMutation = useMutation({
    mutationFn: updateProductStock,
    onSuccess: () => {
      message.success('Update stock success', 1)
    },
  })

  const onClickUpdateStock = (product: CartProduct) => {
    const updateStockPayload = createUpdateStockPayloadFromCartProduct([product])
    updateStockMutation.mutate(updateStockPayload)
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={stocks}
      renderItem={(item, index) => (
        <List.Item
          actions={[
            <Row key={item.id + `row`}>
              <QuantityStepper
                key={item.id + `stepper`}
                count={item.stock}
                decreaseCallback={() => onClickDecreaseStock(index)}
                increaseCallback={() => onClickIncreaseStock(index)}
              />
              <Button
                key={item.id + `update-stock-btn`}
                variant="filled"
                shape="default"
                className="bg-blue-600 hover:bg-blue-700 border-none w-9! flex items-center justify-center ml-1"
                icon={<SyncOutlined className="text-lg! mt-1" />}
                onClick={() => onClickUpdateStock(item)}
              />
            </Row>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.imageUrl} shape="square" size={70} />}
            title={<p className="text-lg font-bold">{item.name}</p>}
            description={`Price: $${item.price} | Shop: ${item.shop.name}`}
          />
        </List.Item>
      )}
    />
  )
}

const Stock: React.FC = () => {
  return (
    <ShareLayout>
      <StockList />
    </ShareLayout>
  )
}

const StockWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Stock />
    </QueryClientProvider>
  )
}

export default StockWrapper
