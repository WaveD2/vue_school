import { object, string, ref } from 'yup'

export const registerSchema = object().shape({
  username: string().min(6, 'Tên đăng nhập tối thiểu 6 kí tự').required(),
  email: string().email(' Email không hợp lệ.').required('Vui lòng nhập email'),
  password: string().min(6, ' Mật khẩu tối thiểu 8 kí tự').required('Vui lòng nhập mật khẩu'),
  passwordConfirmation: string().oneOf([ref('password'), null], 'Mật khẩu không hợp lệ!')
})
export const loginSchema = object().shape({
  username: string()
    .min(6, 'Tên đăng nhập tối thiểu 6 kí tự')
    .required('Vui lòng nhập tên đăng nhập'),
  password: string().min(6, ' Mật khẩu tối thiểu 8 kí tự').required('Vui lòng nhập mật khẩu')
})

export const validateUser = object().shape({
  name: string().min(6, 'Nhập đầy đủ họ và tên').required('Vui lòng nhập Họ và tên'),
  email: string().email(' Email không hợp lệ.').required('Vui lòng nhập email')
})
