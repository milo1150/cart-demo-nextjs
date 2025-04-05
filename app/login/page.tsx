'use client'

import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query'
import { Input, Button, Row, Col, message } from 'antd'
import { useState } from 'react'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import { login } from '@shared/api/user'
import { AxiosError } from 'axios'
import { deleteCookie } from '@shared/utils/env'

const queryClient = new QueryClient()

const Login = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const userQuery = useMutation({
    mutationFn: login,
    onSuccess: () => {
      message.success('Login submitted', 1)
      router.push('/')
    },
    onError: (error: AxiosError) => {
      console.log(error)

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
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col xs={24} sm={24} md={12} lg={8} xl={6} span={6} className="p-4">
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

        <Button type="primary" block size="large" onClick={handleSubmit}>
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
