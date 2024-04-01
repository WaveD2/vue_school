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

export const fetchDoUpLoadFile = async ({ url, file, form }) => {
  console.log(url, file, form)
  const formData = new FormData()
  for (const key in form) {
    formData.append(key, form[key])
  }

  formData.append('file', file)

  await fetch(url, {
    method: 'POST',
    body: formData
  })
}

export const filterObject = ({ obj }) => {
  console.log('obj', obj)
  for (let key in obj) {
    if (!obj[key]) {
      delete obj[key]
    }
  }
  return obj
}
