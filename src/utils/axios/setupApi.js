import store from '@/store'
import { toastInfo } from '../function'
import axiosInstance from './api'
import router from '@/router'

export async function checkAccessToken() {
  const accessToken = getCookie('accessToken')

  if (accessToken) return true

  const refreshToken = getLocalStorage('refreshToken')

  if (!accessToken && !refreshToken)
    //Không có token
    return false
  // accessToken và refreshToken còn hiệu lực
  if (accessToken && isExpired(refreshToken?.expires)) {
    setHeaderApi('Authorization', accessToken)

    return true
  }
  // accessToken hết hạn và refreshToken còn hiệu lực
  else if (accessToken || isExpired(refreshToken?.expires)) {
    const isToken = await fetchToken()
    return isToken
  }
  return false
}

export async function fetchToken() {
  const refreshToken = getLocalStorage('refreshToken')

  try {
    const response = await axiosInstance.post('/v2/auth/refresh-token', {
      refreshToken: refreshToken.token
    })

    if (!response.data) return false

    const { access, refresh } = response.data.data.tokens

    setHeaderApi('Authorization', access.token)
    setLocalStorage('refreshToken', refresh)
    setCookie('accessToken', access.token, access.expires)

    store.commit('SET_USER', response.data.data.user)

    const sortPreviousRoute = localStorage.getItem('previousRoute') || ''
    router.push(sortPreviousRoute)
    return true
  } catch (error) {
    if (error.response.data.code === 'NotAuthen') {
      // router.push({
      //   path: '/login',
      //   query: { url: window.location.pathname + window.location.search }
      // })
      // sessionStorage.setItem('redirectUrl', window.location.pathname + window.location.search)
      toastInfo({ type: 'error', mes: error.response.data.message })
    } else {
      toastInfo({ type: 'error', mes: error.message })
    }

    router.push('/login?')

    return false
  }
}

export function setHeaderApi(name, value) {
  axiosInstance.defaults.headers.common[name] = `Bearer ${value}`
}

export function getLocalStorage(name) {
  const s = JSON.parse(localStorage.getItem(name))

  return s
}

export function setLocalStorage(name, value) {
  localStorage.setItem(name, JSON.stringify(value))
}

export function removeTokenStore(name) {
  localStorage.removeItem(name)
}

export function isExpired(expires) {
  const expirationDate = new Date(expires)

  const currentDate = new Date()
  return currentDate < expirationDate ? true : false
}

export function setCookie(name, value, expirationTime, path = '/') {
  var expires = new Date(expirationTime)
  document.cookie =
    name + '=' + (value || '') + ';expires=' + expires.toUTCString() + '; path=' + path
}
export function getCookie(name) {
  var nameEQ = name + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) == ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}
