'use client'

import React from 'react'
import { ConfigProvider, Layout, theme } from 'antd'
import AppHeader from '@/shared/component/AppHeader'
import { AuthGuard } from '@shared/auth/AuthGuard'
import { useAntdStore } from '@shared/store/antd'

type ShareLayoutProps = {
  children: React.ReactNode
  footer?: boolean
}

const ShareLayout: React.FC<ShareLayoutProps> = ({ children }) => {
  const { Header, Content } = Layout
  const layoutStyle: React.CSSProperties = {}
  const antdStore = useAntdStore((state) => state)

  return (
    <ConfigProvider
      theme={{ algorithm: antdStore.darkmode ? theme.darkAlgorithm : theme.defaultAlgorithm }}
    >
      <Layout className="h-full w-full max-w-screen items-center" style={layoutStyle}>
        <Header className="w-full flex justify-center p-0! bg-blue-600!">
          <AppHeader />
        </Header>
        <Content className="w-full max-w-screen-lg px-4 md:px-8 lg:px-12 xl:px-16">
          <AuthGuard>{children}</AuthGuard>
        </Content>
      </Layout>
    </ConfigProvider>
  )
}

export default ShareLayout
