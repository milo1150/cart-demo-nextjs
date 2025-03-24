export function getCookieByKey(key: string): string | null {
  const cookies = document.cookie.split('; ')
  const cookie = cookies.find((row) => row.startsWith(`${key}=`))
  return cookie ? cookie.split('=')[1] : null // Return the value or null if not found
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC;`
}
