import { toast } from 'vue3-toastify'

const typeToast = 'success' | 'error' | 'info'
export const toastInfo = ({ type = typeToast, mes, display = 'BOTTOM_RIGHT', ...rest }) => {
  toast[type](mes, {
    autoClose: 1000,
    position: toast.POSITION[display],
    ...rest
  })
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
  for (let key in obj) {
    if (!obj[key]) {
      delete obj[key]
    }
  }
  return obj
}

export function filterKeys(objValue, objFilter, keys) {
  return keys
    .filter((key) => objValue[key] !== undefined)
    .map((key) => ({
      value: Array.isArray(objFilter[key]) ? objValue[key] : key,
      text: Array.isArray(objFilter[key])
        ? objFilter[key]?.find((option) => option.value === objValue[key]).text
        : objValue[key]
    }))
}

export const trimInput = (form) => {
  const trimmedForm = {}

  for (let key in form) {
    if (typeof form[key] === 'string') {
      trimmedForm[key] = form[key].trim()
    } else {
      trimmedForm[key] = form[key]
    }
  }
  return trimmedForm
}

export function filterKeysWithValues(obj) {
  const newObj = {}
  for (const key in obj) {
    if (obj[key] !== '' && obj[key] != '1') {
      newObj[key] = obj[key]
    }
  }
  return newObj
}

export const convertUrlParams = (urlParams) => {
  const currentUrlParam = new URLSearchParams(urlParams).get('url')

  const decodedUrl = decodeURIComponent(currentUrlParam)

  const fixedUrl = decodedUrl.replace('%26', '&')

  return fixedUrl
}
