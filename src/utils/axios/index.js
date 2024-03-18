import axios from 'axios'
import { toastInfo } from '../function'
import router from '@/router'

export async function callApi(endpoint, method = 'GET', data = null, params) {
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

    return response.data
  } catch (error) {
    if (error.response.data.code === 'NotAuthen') {
      router.push('/login')
      return toastInfo({ type: 'error', mes: error.response.data.message })
    }
    if (error.response.data) {
      return toastInfo({ type: 'error', mes: error.response.data.message })
    }
    return toastInfo({ type: 'error', mes: error.message })
  }
}
