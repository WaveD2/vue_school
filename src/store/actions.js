import axiosInstance from '@/utils/axios/api'
import useTransition from '../utils/axios'

import { removeTokenStore, setStoreTokens, getStoreTokens } from '@/utils/axios/setupApi'

const { callApi } = useTransition()

export const loginUser = async ({ commit }, formLogin) => {
  const res = await axiosInstance.post('v2/auth/login', formLogin)

  if (res.data.data.tokens) {
    const { access, refresh } = res.data.data.tokens
    setStoreTokens({ accessToken: access, refreshToken: refresh })
    commit('SET_USER', res.data.data.user)
  }
}

export const logoutUser = async ({ commit }) => {
  const { refreshToken } = getStoreTokens()

  await callApi('v2/auth/logout', 'POST', { refreshToken: refreshToken })
  removeTokenStore()
  commit('SET_USER', {})
}
export const getInfoUser = async ({ commit }) => {
  const res = await callApi('v2/auth/user-info', 'GET')
  commit('SET_USER', res.data.record)
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
export const apiTeacher = async (ctx, formValue) => {
  const { method, data } = formValue
  const url = method === 'POST' ? '' : data.id

  if (method === 'GET') {
    const res = await callApi(`teachers/${url}`, method)
    ctx.commit('SET_DETAIL_TEACHER', res.data.record)
  } else if (method === 'DELETE') {
    const res = await callApi(`teachers/${url}`, method)
    if (res.status !== 200) return

    await getTeachers(ctx)
    return
  } else {
    const res = await callApi(`teachers/${url}`, method, { record: data })

    if (res.status !== 200) return

    await getTeachers(ctx)
  }
}
