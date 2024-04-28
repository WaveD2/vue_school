import axiosInstance from '@/utils/axios/api'
import useTransition from '../utils/axios'

import { removeTokenStore, setLocalStorage, setCookie } from '@/utils/axios/setupApi'
import { toastInfo } from '@/utils/function'

const { callApi } = useTransition()

export const loginUser = async ({ commit }, formLogin) => {
  try {
    const res = await axiosInstance.post('v2/auth/login', formLogin)

    if (res.data.data.tokens) {
      const { access, refresh } = res.data.data.tokens
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access.token}`

      setLocalStorage('refreshToken', refresh)
      setCookie('accessToken', access.token, access.expires)

      commit('SET_USER', res.data.data.user)
    }
  } catch (err) {
    if (err.response.data.code === 'NotAuthen') {
      commit('SET_MES_API_ERROR', err.response.data.message)
      toastInfo({ type: 'error', mes: err.response.data.message })
      return false
    }
  }
}

export const logoutUser = async ({ commit }) => {
  removeTokenStore('refreshToken')
  removeTokenStore('previousRoute')
  setCookie('accessToken', '', new Date().toISOString())

  commit('SET_USER', {})
}

export const getInfoUser = async ({ commit }) => {
  const res = await callApi('v2/auth/user-info', 'GET')
  if (!res) return
  commit('SET_USER', res.data.record)
}

//  GET ALL OR GET Filter
export const getInfo = async (ctx, listParams) => {
  const { params, url, typeCommitStore } = listParams

  let res = null
  if (params) {
    const queryParams = Object.keys(params).reduce((acc, key) => {
      if (key !== 'page' && params[key]) {
        if (key === 'search') {
          acc[key] = params[key]
          acc['page'] = 1
        } else acc[`filter[${key}]`] = params[key]
      } else if (key === 'page') {
        acc[key] = params[key]
      }

      return acc
    }, {})

    res = await callApi(url, 'GET', null, {
      ...queryParams
    })
  } else {
    res = await callApi(url, 'GET')
  }

  if (!res) return
  const { items, hasNextPage, hasPrevPage, limit, page, total, totalPages } = res.data

  ctx.commit(typeCommitStore, items)

  ctx.commit('SET_PAGINATION', {
    hasNextPage,
    hasPrevPage,
    limit,
    page,
    total,
    totalPages
  })
}

export const apiDetail = async (ctx, listParams) => {
  const { method, data, url } = listParams
  const fullUrl = method === 'POST' ? `${url}` : `${url}/${data.id}`

  if (method === 'GET') {
    const res = await callApi(`${fullUrl}`, method)
    if (!res) return
    ctx.commit('SET_INFO_DETAIL_MODAL', res.data.record)
  } else if (method === 'DELETE') {
    const res = await callApi(`${fullUrl}`, method)
    if (!res) return

    const listParams = { url, typeCommitStore: 'SET_LIST_USER_TABLE' }

    await getInfo(ctx, listParams)
    return
  } else {
    const res = await callApi(`${fullUrl}`, method, { record: data })

    if (!res) return toastInfo({ type: 'error', mes: 'Có lỗi xảy ra !' })

    const listParams = { url, typeCommitStore: 'SET_LIST_USER_TABLE' }
    await getInfo(ctx, listParams)
    return (
      method === 'PATCH' &&
      toastInfo({ type: 'success', mes: 'Cập nhật thành công', display: 'TOP_RIGHT' })
    )
  }
}
