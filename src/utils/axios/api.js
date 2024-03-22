import axios from 'axios'
const accessTokenHeaders = JSON.parse(localStorage.getItem('access_token')) || ' '

const axiosInstance = axios.create({
  baseURL: 'https://api-school-mng-dev.vais.vn/api/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + accessTokenHeaders.token
  }
})

export default axiosInstance
