import React from 'react'
import { ConfigProvider, theme } from 'antd'

const ShareLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>{children}</ConfigProvider>
}

export default ShareLayout
