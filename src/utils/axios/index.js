import axios from 'axios'
import { toastInfo } from '../function'
import router from '@/router'
import { ref } from 'vue'

export default function () {
  const transition = ref([])
  const error = ref(null)

  async function callApi(endpoint, method = 'GET', data = null, params) {
    //Check time token
    // if (endpoint !== 'v2/auth/login') {
    //   const isTimeToken = await checkAccessToken()
    //   console.log('isTimeToken', isTimeToken)
    //   if (!isTimeToken) return
    // }

    const accessTokenHeaders = JSON.parse(localStorage.getItem('access_token'))?.token

    try {
      const config = {
        method,
        url: `https://api-school-mng-dev.vais.vn/api/${endpoint}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessTokenHeaders || ' '
        },
        data: data ? data : {},
        params: params
      }

      const response = await axios(config)

      return (transition.value = response.data)
    } catch (error) {
      console.log('error api', error)

      if (error.response.data.code === 'NotAuthen') {
        router.push('/login')
        return toastInfo({ type: 'error', mes: error.response.data.message })
      }
      if (error.response.data.error) {
        const errs = error.response.data.error.issues.map((err) => ({
          [err.path[0]]: err.message
        }))
        return (error.value = errs)
        // return toastInfo({ type: 'error', mes: error.response.data.message })
      }
      return toastInfo({ type: 'error', mes: error.message })
    }
  }

  return { transition, error, callApi }
}
