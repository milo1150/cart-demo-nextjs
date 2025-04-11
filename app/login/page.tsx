'use client'

import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query'
import { Input, Button, Row, Col, message } from 'antd'
import { useState } from 'react'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import { login } from '@shared/api/user'
import { AxiosError } from 'axios'
import { deleteCookie } from '@shared/utils/env'
import { getCartUuid } from '@shared/api/cart'
import Image from 'next/image'
import { useAntdStore } from '@shared/store/antd'

const queryClient = new QueryClient()

const Login = () => {
  const router = useRouter()
  const darkmode = useAntdStore((state) => state.darkmode)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const userQuery = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      message.success('Login submitted', 1)

      await getCartUuid()

      router.push('/')
    },
    onError: (error: AxiosError) => {
      console.error(error)

      deleteCookie('j')

      if (error.status === 401) {
        return message.error('Invalid username or password')
      }

      return message.error(error.message)
    },
  })

  const handleSubmit = () => {
    if (!username || !password) {
      message.error('Please enter both username and password')
      return
    }
    userQuery.mutate({ username, pwd: password })
  }

  return (
    <Row
      justify="center"
      align="middle"
      className={`h-lvh! w-lvw! ${darkmode ? 'bg-black!' : 'bg-gray-100!'}`}
    >
      <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={5} span={5} className="p-4">
        <div className="flex justify-center">
          <Image
            src="/assets/logo.png"
            width={160}
            height={160}
            alt="App Logo"
            className="rounded-xl"
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <Input
            size="large"
            prefix={<UserOutlined />}
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <Input.Password
            size="large"
            prefix={<LockOutlined />}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="primary" block size="large" onClick={handleSubmit} className="bg-indigo-700!">
          Login
        </Button>
      </Col>
    </Row>
  )
}

const LoginWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Login />
    </QueryClientProvider>
  )
}

export default LoginWrapper
