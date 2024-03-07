import { callApi } from '@/utils/axios'
import { setStoreTokens } from '@/utils/axios/setupApi'

export const loginUser = async ({ commit }, formLogin) => {
  console.log('fg', formLogin)
  const res = await callApi('v2/auth/login', 'POST', formLogin)
  if (res.data.tokens) {
    const { access, refresh } = res.data.tokens
    setStoreTokens(access.token, refresh.token)
  }

  commit('SET_USER', res.data.user)

  return 'con chim non'
}

// export const createAccessTokenNew = ({ commit }, productId) => {
//   Product.show(productId).then((response) => {
//     commit('SET_PRODUCT', response.data)
//   })
// }
