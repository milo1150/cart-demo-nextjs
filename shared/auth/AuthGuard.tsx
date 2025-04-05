import { useEffect, type ReactNode } from 'react'
import type React from 'react'
import { getCookieByKey, deleteCookie } from '@/shared/utils/env'
import { loginUrl } from '@/shared/utils/location'

type GuardProps = {
  children: ReactNode
}

export const AuthGuard: React.FC<GuardProps> = ({ children }) => {
  const loginToken = getCookieByKey('j')

  useEffect(() => {
    if (!loginToken) {
      window.location.href = loginUrl()
    }
  })

  if (!loginToken) {
    return null
  }

  return <>{children}</>
}

export const LoginGuard: React.FC<GuardProps> = ({ children }) => {
  const loginToken = getCookieByKey('j')

  useEffect(() => {
    if (loginToken) {
      window.location.href = '/'
    }
  })

  if (loginToken) {
    return null
  }

  return <>{children}</>
}

export function logout() {
  // Remove login token
  deleteCookie('j')

  // Redirect to login page
  window.location.href = loginUrl()
}
