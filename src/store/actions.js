import { callApi } from '@/utils/axios'
import { removeTokenStore, setStoreTokens } from '@/utils/axios/setupApi'

export const loginUser = async ({ commit }, formLogin) => {
  const res = await callApi('v2/auth/login', 'POST', formLogin)
  if (res.data.tokens) {
    const { access, refresh } = res.data.tokens
    setStoreTokens({ accessToken: access, refreshToken: refresh })
  }

  commit('SET_USER', res.data.user)
}

export const logoutUser = async ({ commit }) => {
  await callApi('v2/auth/logout', 'POST')
  removeTokenStore()
  commit('SET_USER', {})
}
export const getInfoUser = async ({ commit }) => {
  const res = await callApi('v2/auth/user-info', 'GET')
  commit('SET_USER', res.data)
}

export const getTeachers = async ({ commit }, params) => {
  console.log(params)
  // const params = {
  //   search: 'nguyen',
  //   'filter[gender]': 'female'
  // }
  let res = null
  if (params) {
    res = await callApi('teachers', 'GET', null, params)
  } else {
    res = await callApi('teachers', 'GET')
  }

  const { items, hasNextPage, hasPrevPage, limit, page, total, totalPages } = res.data

  commit('SET_TEACHERS', items)

  commit('SET_PAGINATION', {
    hasNextPage,
    hasPrevPage,
    limit,
    page,
    total,
    totalPages
  })
}
export const updateTeacher = async ({ commit }, formValue) => {
  await callApi(`teachers${formValue.id}`, 'PATCH', formValue)
  await getTeachers()
}
