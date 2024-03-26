import { toastInfo } from '../function'
import router from '@/router'
import { ref } from 'vue'
import axios from 'axios'
import { checkAccessToken } from './setupApi'
import store from '@/store'

export default function useTransition() {
  const error = ref(null)

  async function callApi(endpoint, method = 'GET', data = null, params) {
    const accessTokenHeaders = await JSON.parse(localStorage.getItem('access_token'))

    if (!checkAccessToken() || !accessTokenHeaders) return router.push('/login')

    try {
      const config = {
        method,
        url: `https://api-school-mng-dev.vais.vn/api/${endpoint}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessTokenHeaders.token || ' '
        },
        data: data ? data : {},
        params: params
      }

      const response = await axios(config)

      store.commit('SET_MES_API_ERROR', [])

      return response.data
    } catch (err) {
      console.log('err', err)
      if (err.response && err.response.data) {
        if (err.response.data.code === 'NotAuthen') {
          toastInfo({ type: 'error', mes: err.response.data.message })
          router.push('/login')
          return false
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
    }
  }

  return { callApi, error }
}
