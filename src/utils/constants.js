import store from '@/store'

export const VALUE_LOGIN = {
  username: '',
  password: ''
}

export const VALUE_REGISTER = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: ''
}

export const MENU_SIDE_NAV = [
  {
    text: 'Quản lý giáo viên',
    isActive: false,
    icon: ' fa-solid fa-graduation-cap ',
    link: '/teacher',
    func: function () {
      return
    }
  },
  {
    text: 'Cài đặt',
    isActive: false,
    icon: 'fa-solid fa-gear',
    link: '/setting-profile',
    func: function () {
      return
    }
  },
  {
    text: 'Đăng xuất',
    isActive: false,
    icon: 'fa-solid fa-arrow-right-from-bracket',
    link: '/login',
    func: function () {
      store.dispatch('logoutUser')
    }
  }
]

export const NOTIFICATIONS = [
  { text: 'You can make it appear to open and close smoother by using a transition.', link: '/' },
  { text: 'You can make it appear to open and close smoother by using a transition.', link: '/' },
  { text: 'You can make it appear to open and close smoother by using a transition.', link: '/' },
  { text: 'You can make it appear to open and close smoother by using a transition.', link: '/' },
  { text: 'You can make it appear to open and close smoother by using a transition.', link: '/' }
]

export const FORM_SETTING = [
  { fullName: '', label: 'Họ và tên' },
  { email: '', label: 'Email' },
  { birthday: '', label: 'Ngày tháng năm sinh' },
  { dress: '', label: 'Địa chỉ' },
  { city: '', label: 'Thành phố' },
  { country: '', label: 'Quê quán' }
]

export const COLUMN_TABLE_USERS = {
  username: 'Tên',
  role: 'Quyền',
  status: 'Trạng thái'
}

export const GENDER = [
  { value: 'male', text: 'Nam' },
  { value: 'female', text: 'Nữ' },
  { value: 'other', text: 'Khác' }
]
export const TYPE_STUDENT = [
  { value: 'wait', text: 'Tiểu học' },
  { value: 'studying', text: 'Cấp 2' },
  { value: 'reserve', text: 'Cấp 3' },
  { value: 'graduated', text: 'Đã tốt nghiệp' }
]

export const TYPE_STATUS = [
  { value: 'active', text: 'Hoạt động' },
  { value: 'disabled', text: 'Tạm dừng' }
]
export const LABEL_TABLE_TEACHER = {
  avatar: 'Ảnh',
  name: 'Tên',
  gender: 'Giới tính',
  phone: 'Số điện thoại',
  email: 'Gmail',
  status: 'Trạng thái',
  currentAddress: 'Địa chỉ'
}

export const LABEL_MODAL_DETAIL_TEACHER = {
  avatar: 'Ảnh',
  name: 'Tên',
  gender: 'Giới tính',
  phone: 'Số điện thoại',
  email: 'Gmail',
  pastClassIds: 'Lớp học',
  currentAddress: 'Địa chỉ',
  nationality: 'Quốc tịch',
  permanentResidence: 'Hộ khẩu thường trú',
  healthInsuranceNumber: 'Số bảo hiểm',
  status: 'Trạng thái',
  type: 'Loại',
  identityNumber: 'Số định danh',
  note: 'Ghi trú ',
  dateOfBirth: 'Ngày sinh'
}
