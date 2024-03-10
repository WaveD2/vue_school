import store from '@/store'
import { callApi } from '.'

export async function checkAccessToken() {
  const { accessToken, refreshToken } = getStoreTokens()
  console.log('accessToken, refreshToken ', accessToken)

  if (!accessToken && !refreshToken) return false
  if (isExpired(accessToken?.expires) && isExpired(refreshToken?.expires)) {
    await store.dispatch('getInfoUser')
    return true
  }
  if (isExpired(accessToken?.expires)) {
    // call accessToken

    const res = await fetchToken({ tokenCheck: accessToken })
    store.commit('SET_USER', res.user)
    return true
  }
  if (!isExpired(accessToken?.expires) && isExpired(refreshToken?.expires)) {
    const res = await fetchToken({ tokenCheck: refreshToken })
    console.log('Res user', res)
    store.commit('SET_USER', res.user)
    return true
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

  if (currentDate < expirationDate) {
    return true
  } else {
    return false
  }
}
export async function fetchToken({ tokenCheck }) {
  try {
    const { token, payload } = tokenCheck

    const responseData = await callApi(`v2/auth/${payload.type}-token`, 'POST', {
      [`${payload.type}Token`]: token
    })
    const { access, refresh } = responseData.data.tokens

    if (access || refresh) {
      setStoreTokens({ accessToken: access, refreshToken: refresh })
    }
    return responseData.data.user
  } catch (error) {
    console.log('error call api token', error)
    return false
  }
}
