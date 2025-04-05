import { LoginPayload, LoginResponse } from '../schema/user'
import { axiosBaseInstance } from './axios'
import { endpoint } from './endpoint'

// Don't catch error here, let handle error in login mutation
export async function login(payload: LoginPayload): Promise<void> {
  const res = await axiosBaseInstance.post<LoginResponse>(endpoint.user.login, payload)

  // Save token as cookie
  document.cookie = `j=${res.data.token}; path=/; max-age=86400; SameSite=Lax`
}
