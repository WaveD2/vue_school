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

export const LIST_OPTIONS = {
  status: [
    { value: 'active', text: 'Hoạt động' },
    { value: 'disabled', text: 'Tạm dừng' }
  ],
  gender: [
    { value: 'male', text: 'Nam' },
    { value: 'female', text: 'Nữ' },
    { value: 'other', text: 'Khác' }
  ],
  type: [
    { value: 'official', text: 'Chính thức' },
    { value: 'contract', text: 'Hợp đồng' },
    { value: 'parttime', text: 'Thời vụ' }
  ]
}
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
  avatar: {
    text: 'Ảnh',
    required: false
  },
  name: {
    text: 'Tên',
    required: true
  },
  gender: {
    text: 'Giới tính',
    required: true
  },
  phone: {
    text: 'Số điện thoại',
    required: true
  },
  email: {
    text: 'Gmail',
    required: true
  },
  pastClassIds: {
    text: 'Lớp học',
    required: false
  },
  currentAddress: {
    text: 'Địa chỉ',
    required: true
  },
  nationality: {
    text: 'Quốc tịch',
    required: true
  },
  permanentResidence: {
    text: 'Hộ khẩu thường trú',
    required: true
  },
  healthInsuranceNumber: {
    text: 'Số bảo hiểm',
    required: true
  },
  status: {
    text: 'Trạng thái',
    required: true
  },
  type: {
    text: 'Hợp đồng',
    required: true
  },
  passport: {
    text: 'Chứng minh nhân dân',
    required: true
  },
  note: {
    text: 'Ghi chú ',
    required: false
  },
  dateOfBirth: {
    text: 'Ngày sinh',
    required: true
  }
}
export const VALUE_MODAL_DETAIL_TEACHER = {
  avatar: {
    bucket: '',
    key: '',
    url: ''
  },
  name: '',
  gender: '',
  phone: '',
  email: '',
  pastClassIds: '',
  currentAddress: '',
  nationality: '',
  permanentResidence: '',
  healthInsuranceNumber: '',
  status: '',
  type: '',
  passport: '',
  dateOfBirth: ''
}
