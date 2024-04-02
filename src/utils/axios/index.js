import { ref } from 'vue'
import router from '@/router'
import store from '@/store'
import { toastInfo } from '../function'
import { checkAccessToken } from './setupApi'
import axiosInstance from './api'

export default function useTransition() {
  const error = ref(null)

  async function callApi(endpoint, method = 'GET', data = null, params) {
    if (!(await checkAccessToken())) return router.push('/login')

    try {
      const config = {
        method: method,
        url: endpoint,
        data: data,
        params: params
      }

      const response = await axiosInstance(config)

      store.commit('SET_MES_API_ERROR', [])

      return response.data
    } catch (err) {
      if (err.response && err.response.data) {
        if (err.response.data.code === 'NotAuthen') {
          toastInfo({ type: 'error', mes: err.response.data.message })

          router.push('/login')
        } else if (err.response.data.error) {
          error.value = err.response.data.error.issues.map((issue) => ({
            [issue.path[0]]: issue.message
          }))
          store.commit('SET_MES_API_ERROR', error.value)
        } else {
          store.commit('SET_MES_API_ERROR', [{ error: 'Thông tin không chính xác!' }])
        }
      } else {
        toastInfo({ type: 'error', mes: err.message })
      }

      return false
    }
  }

  return { callApi, error }
}
