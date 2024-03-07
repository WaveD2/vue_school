import { callApi } from '.'

export async function checkAccessToken() {
  const { accessToken, refreshToken } = getStoreTokens()
  if (!refreshToken) return false
  if (!accessToken) {
    const responseData = await callApi('v2/auth/access-token', 'POST', { refreshToken })

    const tokenRes = responseData.data?.tokens

    if (tokenRes) {
      setStoreTokens(tokenRes.access.token)
    }
  }
  return true
}

export function getStoreTokens() {
  const accessToken = localStorage.getItem('access_token')
  const refreshToken = localStorage.getItem('refresh_token')
  return { accessToken, refreshToken }
}
export function setStoreTokens(accessToken, refreshToken) {
  localStorage.setItem('access_token', accessToken)
  if (!refreshToken) return
  localStorage.setItem('refresh_token', refreshToken)
}
export function removeTokenStore() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}
