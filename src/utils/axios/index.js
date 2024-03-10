import axios from 'axios'

export async function callApi(endpoint, method = 'GET', data = null) {
  const accessTokenHeaders = JSON.parse(localStorage.getItem('access_token'))?.token
  try {
    const config = {
      method,
      url: `https://api-school-mng-dev.vais.vn/api/${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessTokenHeaders || ' '
      },
      data: data ? data : null
    }

    const response = await axios(config)

    if (response.status !== 200) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const responseData = response.data

    return responseData
  } catch (error) {
    console.error('Error calling API:', error.message)
    throw error
  }
}
