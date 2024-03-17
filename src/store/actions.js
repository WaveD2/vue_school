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

export const getStudent = async ({ commit }, sort) => {
  // const params = {
  //   search: 'nguyen',
  //   'filter[gender]': 'female'
  // }

  commit('SET_LOADING', true)

  const res = await callApi('students', 'GET', '', sort)

  const { items, hasNextPage, hasPrevPage, limit, page, total, totalPages } = res.data

  commit('SET_LIST_STD', items)
  commit('SET_PAGINATION', {
    hasNextPage,
    hasPrevPage,
    limit,
    page,
    total,
    totalPages
  })

  return res.data
}

export const setDetailStudent = async ({ commit }, formProfile) => {
  console.log('formProfile', formProfile)
  const isCheck = Object.keys(formProfile).length > 2
  if (!isCheck) {
    const res = await callApi(`students/${formProfile.id}`, 'GET')
   return commit('SET_DETAIL_PARENT', res.data.record)
   
  }
  const res = await callApi(`students/${formProfile.id}`, 'PATCH', formProfile)
  console.log('res123 student', res)
  // const { record } = res.data
  // commit('SET_USER', record)
  // // toastInfo({ type: 'success', mes: 'Cập nhật thành công' })
  // commit('SET_PARENT', res.data.items)
}

// Loading
export const getListParent = async ({ commit }) => {
  const res = await callApi('users', 'GET')

  commit('SET_PARENT', res.data.items)
}

// export const updateUserCurrent = async ({ commit }, { formProfile }) => {
//   console.log('payload', formProfile)
//   if (typeof formProfile !== 'object' || formProfile === null) {
//     throw new Error('formProfile must be an object')
//   }

//   const res = await callApi(`users/${formProfile.id}`, 'PATCH', { formProfile })
//   console.log('res', res)
//   // const { record } = res.data
//   // commit('SET_USER', record)
//   // toastInfo({ type: 'success', mes: 'Cập nhật thành công' })
//   // commit('SET_PARENT', res.data.items)
// }

export const setDetailParent = async ({ commit }, formProfile) => {
  const isCheck = Object.keys(formProfile).length > 2
  if (!isCheck) {
    const res = await callApi(`users/${formProfile.id}`, 'GET')
    return commit('SET_DETAIL_PARENT', res.data.record)
  }
  const res = await callApi(`users/${formProfile.id}`, 'PATCH', formProfile)
  console.log('res123', res)
  // const { record } = res.data
  // commit('SET_USER', record)
  // // toastInfo({ type: 'success', mes: 'Cập nhật thành công' })
  // commit('SET_PARENT', res.data.items)
}
