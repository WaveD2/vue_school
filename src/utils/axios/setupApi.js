import store from '@/store'
import { callApi } from '.'
import { toastInfo } from '../function'

export async function checkAccessToken() {
  const { accessToken, refreshToken } = getStoreTokens()

  //Không có token

  if (!accessToken && !refreshToken) return false

  // accessToken và refreshToken còn hiệu lực
  if (isExpired(accessToken?.expires) && isExpired(refreshToken?.expires)) {
    await store.dispatch('getInfoUser')
    return true
  }
  // accessToken hết hạn và refreshToken còn hiệu lực
  else if (!isExpired(accessToken?.expires) && isExpired(refreshToken?.expires)) {
    return await fetchToken({ tokenCheck: refreshToken })
  }
  // Trường hợp khác
  else {
    toastInfo({ type: 'info', mes: 'Lỗi! Vui lòng đăng nhập lại' })
    return false
  }
}

export function getStoreTokens() {
  const accessToken = JSON.parse(localStorage.getItem('access_token'))
  const refreshToken = JSON.parse(localStorage.getItem('refresh_token'))
  return { accessToken, refreshToken }
}

export function setStoreTokens({ accessToken, refreshToken }) {
  localStorage.setItem('access_token', JSON.stringify(accessToken))
  if (!refreshToken) return
  localStorage.setItem('refresh_token', JSON.stringify(refreshToken))
}

export function removeTokenStore() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}

export function isExpired(expires) {
  const expirationDate = new Date(expires)

  const currentDate = new Date()
  return currentDate < expirationDate ? true : false
}

export async function fetchToken({ tokenCheck }) {
  try {
    const { token } = tokenCheck

    const responseData = await callApi(`v2/auth/refresh-token`, 'POST', {
      refreshToken: token
    })
    const { access, refresh } = responseData.data.tokens

    if (access || refresh) {
      setStoreTokens({ accessToken: access, refreshToken: refresh })
    }

    store.commit('SET_USER', responseData.data.user)

    return true
  } catch (error) {
    return false
  }
}
