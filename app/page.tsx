'use client'

import React, { useEffect } from 'react'
import ShareLayout from '@/shared/layout'
import SearchInput from '@/shared/component/SearchInput'
import ProductCard from '@/shared/component/ProductCard'
import { Row, Col, Button } from 'antd'
import { QueryClient, QueryClientProvider, useMutation, useQuery } from '@tanstack/react-query'
import { getProducts, GetProductsQueryparams } from '@/shared/api/product'
import { login } from '@/shared/api/user'
import { transformCartProduct } from '@shared/dto/product'

// Create a client
const queryClient = new QueryClient()

// FIXME: move to custom hook
const UserLogin = () => {
  const userQuery = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      console.log(res)
    },
  })
  // const authQuery = useQuery({ queryKey: ['auth'], queryFn: auth, retry: false })

  useEffect(() => {
    userQuery.mutate({ username: 'a', pwd: 'a' })
  }, [])

  return { userQuery }
}

const Home: React.FC = () => {
  const {} = UserLogin() // FIXME: remove

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

  const fetchProduct = () => {
    productQuery.refetch()
  }

  return (
    <ShareLayout>
      <div className="pt-4">
        <div className="pb-1">
          <SearchInput />
        </div>

        {/* TODO: delete */}
        <Button onClick={fetchProduct}>fetch product</Button>

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
