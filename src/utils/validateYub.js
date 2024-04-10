import { object, string, ref } from 'yup'

export const phoneRegExp = /^(?!00)\d{8,12}$/
export const emailRegExp = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hanoi)$/

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

export const validateTeacher = object().shape({
  name: string().min(6, 'Họ và tên tối thiểu 6 kí tự').required('Vui lòng nhập Họ và tên'),
  email: string()
    .matches(emailRegExp, 'Email không hợp lệ')
    .email('Email không hợp lệ.')
    .required('Vui lòng nhập email'),
  permanentResidence: string()
    .min(6, 'Độ dài tối thiểu hộ khẩu 6 kí tự')
    .required('Vui lòng nhập hộ khẩu thường trú'),
  currentAddress: string()
    .min(6, 'Độ dài tối thiểu địa chỉ 6 kí tự')
    .required('Vui lòng nhập chỗ ở hiện tại'),
  type: string().required('Vui lòng nhập hợp đồng'),
  gender: string().required('Vui lòng chọn giới tính'),
  phone: string()
    .required('Vui lòng nhập số điện thoại')
    .matches(phoneRegExp, 'Số điện thoại không chính xác'),
  passport: string()
    .min(6, 'Chứng minh nhân dân tối thiểu 6 kí tự')
    .required('Vui lòng số chứng minh nhân dân'),
  status: string().required('Vui lòng chọn trạng thái')
})
