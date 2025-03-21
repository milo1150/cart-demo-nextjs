import React from 'react'
import { ConfigProvider, Layout, theme } from 'antd'
import AppHeader from '../component/AppHeader'

const ShareLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { Header, Content } = Layout
  const layoutStyle: React.CSSProperties = {}

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Layout className="h-full w-full max-w-screen items-center" style={layoutStyle}>
        <Header className="w-full flex justify-center p-0! bg-purple-200!">
          <AppHeader />
        </Header>
        <Content className="w-full max-w-4/12">{children}</Content>
      </Layout>
    </ConfigProvider>
  )
}

export default ShareLayout
