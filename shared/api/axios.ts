import axios, { AxiosError, CreateAxiosDefaults } from 'axios'
import { getCookieByKey } from '../utils/env'
import { logout } from '../auth/AuthGuard'

const axiosInstance: CreateAxiosDefaults = {
  baseURL: process.env['NEXT_PUBLIC_BACKEND_URL'],
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // enable if cookies need
}

const axiosBaseInstance = axios.create(axiosInstance)

// Create an Axios instance
const axiosInstanceWithAuth = axios.create(axiosInstance)

// Add a request interceptor
axiosInstanceWithAuth.interceptors.request.use(
  (config) => {
    const token = getCookieByKey('j')

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add a response interceptor (optional for handling errors)
axiosInstanceWithAuth.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (
      error.status === 400 &&
      (error.response?.data as { message: string }).message === 'missing or malformed jwt'
    ) {
      console.error('Unauthorized: missing jwt.')

      logout()
    }
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized: Redirecting to login.')

      logout()
    }
    return Promise.reject(error)
  }
)

export { axiosBaseInstance, axiosInstanceWithAuth }
