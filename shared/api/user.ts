import { LoginPayload, LoginResponse } from '../schema/user'
import { axiosBaseInstance, axiosInstanceWithAuth } from './axios'

export async function login(payload: LoginPayload): Promise<string> {
  return await axiosBaseInstance
    .post<LoginResponse>('/user/login', payload)
    .then((res) => {
      // Save token as cookie
      document.cookie = `j=${res.data.token}; path=/; max-age=86400; SameSite=Lax`

      return res.data.token
    })
    .catch((err) => err)
}

export async function auth() {
  return await axiosInstanceWithAuth
    .get('/user/auth')
    .then((res) => res.data)
    .catch((err) => err)
}
