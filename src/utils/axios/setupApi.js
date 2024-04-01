import store from '@/store'
import { toastInfo } from '../function'
import axiosInstance from './api'
import router from '@/router'

export async function checkAccessToken() {
  const { accessToken, refreshToken } = getStoreTokens()

  //Không có token
  if (!accessToken || !refreshToken) return false
  // accessToken và refreshToken còn hiệu lực
  if (isExpired(accessToken?.expires) && isExpired(refreshToken?.expires)) {
    setAuthorizationHeader()
    return true
  }
  // accessToken hết hạn và refreshToken còn hiệu lực
  else if (!isExpired(accessToken?.expires) || isExpired(refreshToken?.expires)) {
    const isToken = await fetchToken()
    return isToken
  }
  return false
}

export async function fetchToken() {
  const { refreshToken } = getStoreTokens()

  try {
    const response = await axiosInstance.post('/v2/auth/refresh-token', {
      refreshToken: refreshToken.token
    })

    if (!response.data) return false

    const { access, refresh } = response.data.data.tokens

    setStoreTokens({ accessToken: access, refreshToken: refresh })
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access.token}`

    store.commit('SET_USER', response.data.data.user)

    return true
  } catch (error) {
    if (error.response.data.code === 'NotAuthen') {
      toastInfo({ type: 'error', mes: error.response.data.message })
    } else {
      toastInfo({ type: 'error', mes: error.message })
    }
    router.push('/login')

    return false
  }
}

export function setAuthorizationHeader() {
  const { accessToken } = getStoreTokens()
  if (accessToken) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken.token}`
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
  localStorage.removeItem('previousRoute')
  localStorage.removeItem('current_page')
}

export function isExpired(expires) {
  const expirationDate = new Date(expires)

  const currentDate = new Date()
  return currentDate < expirationDate ? true : false
}
