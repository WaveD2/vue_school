import { callApi } from '@/utils/axios'
import { setStoreTokens } from '@/utils/axios/setupApi'

export const loginUser = async ({ commit }, formLogin) => {
  console.log('fg', formLogin)
  const res = await callApi('v2/auth/login', 'POST', formLogin)
  if (res.data.tokens) {
    const { access, refresh } = res.data.tokens
    setStoreTokens({ accessToken: access, refreshToken: refresh })
  }

  commit('SET_USER', res.data.user)
}

export const getInfoUser = async ({ commit }) => {
  const res = await callApi('v2/auth/user-info', 'GET')
  commit('SET_USER', res.data)
}
