import useTransition from '../utils/axios'

import { removeTokenStore, setStoreTokens } from '@/utils/axios/setupApi'

const { callApi, error } = useTransition()

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

export const getTeachers = async (ctx, params) => {
  let res = null
  if (params) {
    res = await callApi('teachers', 'GET', null, params)
  } else {
    res = await callApi('teachers', 'GET')
  }

  const { items, hasNextPage, hasPrevPage, limit, page, total, totalPages } = res.data

  ctx.commit('SET_TEACHERS', items)

  ctx.commit('SET_PAGINATION', {
    hasNextPage,
    hasPrevPage,
    limit,
    page,
    total,
    totalPages
  })
}
export const updateTeacher = async (ctx, formValue) => {
  await callApi(`teachers${formValue.id}`, 'PATCH', { record: formValue })
  await getTeachers()
  console.log('error updateTeacher', error)
}
export const createTeacher = async (ctx, formValue) => {
  console.log('formValue', formValue)
  await callApi('teachers', 'POST', { record: formValue })
  await getTeachers()
  console.log('error updateTeacher', 123)
}
