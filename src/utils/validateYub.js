import { object, string, ref, number } from 'yup'

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

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/

export const validateUser = object().shape({
  name: string().min(6, 'Nhập đầy đủ họ và tên').required('Vui lòng nhập Họ và tên'),
  email: string().email(' Email không hợp lệ.').required('Vui lòng nhập email')
})

export const validateTeacher = object().shape({
  name: string().min(6, 'Nhập đầy đủ họ và tên').required('Vui lòng nhập Họ và tên'),
  email: string().email(' Email không hợp lệ.').required('Vui lòng nhập email'),
  permanentResidence: string().required('Vui lòng nhập hộ khẩu thường trú'),
  currentAddress: string().required('Vui lòng nhập chỗ ở hiện tại'),
  type: string().required('Vui lòng nhập hợp đồng'),
  phone: string().required().matches(phoneRegExp, 'Số điện thoại không chính xác'),
  passport: string().required('Vui lòng số chứng minh nhân dân'),
  status: string().required('Vui lòng chọn trạng thái')
})
