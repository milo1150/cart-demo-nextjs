import { LoginPayload, LoginResponse } from '../schema/user'
import { axiosBaseInstance } from './axios'
import { endpoint } from './endpoint'

export async function login(payload: LoginPayload): Promise<string> {
  return await axiosBaseInstance
    .post<LoginResponse>(endpoint.user.login, payload)
    .then((res) => {
      // Save token as cookie
      document.cookie = `j=${res.data.token}; path=/; max-age=86400; SameSite=Lax`

      return res.data.token
    })
    .catch((err) => err)
}
