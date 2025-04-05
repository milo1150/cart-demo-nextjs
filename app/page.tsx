'use client'

import React from 'react'
import ShareLayout from '@/shared/layout'
import ProductCard from '@/shared/component/ProductCard'
import { Row, Col } from 'antd'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { getProducts, GetProductsQueryparams } from '@/shared/api/product'
import { transformCartProduct } from '@shared/dto/product'

// Create a client
const queryClient = new QueryClient()

const Home: React.FC = () => {
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

  return (
    <ShareLayout>
      <div className="pt-4">
        {/* <div className="pb-1">
          <SearchInput />
        </div> */}

        <Row gutter={[16, 16]} className="mt-4">
          {productQuery.data?.map((product) => {
            return (
              <Col key={product.id} xs={12} sm={8} md={6} lg={6} xl={6}>
                <ProductCard product={product} />
              </Col>
            )
          })}
        </Row>
      </div>
    </ShareLayout>
  )
}

const HomeWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  )
}

export default HomeWrapper
