'use client'

import React from 'react'
import ShareLayout from '@/shared/layout'
import SearchInput from '@/shared/component/SearchInput'
import ProductCard from '@/shared/component/ProductCard'
import { Row, Col } from 'antd'

const Home = () => (
  <ShareLayout>
    <div className="pt-4">
      <div className="pb-1">
        <SearchInput />
      </div>

      <Row gutter={[16, 16]} className="mt-4">
        <Col xs={12} sm={8} md={6} lg={6} xl={6}>
          <ProductCard
            image="https://masterbundles.com/wp-content/uploads/2023/03/clever-fox-logo-01-273.png"
            price={50}
            title="test"
          />
        </Col>
        <Col xs={12} sm={8} md={6} lg={6} xl={6}>
          <ProductCard
            image="https://masterbundles.com/wp-content/uploads/2023/03/clever-fox-logo-01-273.png"
            price={50}
            title="test"
          />
        </Col>
        <Col xs={12} sm={8} md={6} lg={6} xl={6}>
          <ProductCard
            image="https://masterbundles.com/wp-content/uploads/2023/03/clever-fox-logo-01-273.png"
            price={50}
            title="test"
          />
        </Col>
        <Col xs={12} sm={8} md={6} lg={6} xl={6}>
          <ProductCard
            image="https://masterbundles.com/wp-content/uploads/2023/03/clever-fox-logo-01-273.png"
            price={50}
            title="test"
          />
        </Col>
      </Row>
    </div>
  </ShareLayout>
)

export default Home
