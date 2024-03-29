import { toast } from 'vue3-toastify'

export const getKeyObj = (array) => {
  return Object.keys(array)
}
const typeToast = 'success' | 'error' | 'info'
export const toastInfo = ({ type = typeToast, mes, ...rest }) => {
  toast[type](mes, {
    autoClose: 1000,
    position: toast.POSITION.BOTTOM_RIGHT,
    ...rest
  })
}
export const getTimeYear = (dateString) => {
  var dateObject = new Date(dateString)

  var year = dateObject.getFullYear()
  var month = dateObject.getMonth() + 1
  var day = dateObject.getDate()

  return day + '/' + month + '/' + year
}

export const getByGender = (gender) => {
  const genders = { male: 'Nam', female: 'Nữ' }

  return genders[gender]
}
export const arrayToObject = (arr) => {
  const obj = {}
  arr.forEach((item) => {
    const key = Object.keys(item)[0]
    obj[key] = item[key]
  })
  return obj
}
