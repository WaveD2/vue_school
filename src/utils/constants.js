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
    text: 'Quản lý người dùng',
    isActive: false,
    icon: ' fa-solid fa-graduation-cap ',
    link: '/my-parent',
    func: function () {
      return
    }
  },
  {
    text: 'Quản lý học sinh',
    isActive: false,
    icon: ' fa-solid fa-graduation-cap ',
    link: '/my-student',
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
    text: 'Cài đặt',
    isActive: false,
    icon: 'fa-solid fa-gear',
    link: '/teacher',
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

export const COLUMN_TABLE_STUDENTS = {
  name: 'Tên',
  gender: 'Giới tính',
  currentAddress: 'Quê quán',
  status: 'Trạng thái'
}

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
export const TYPE_PARENT = [
  { value: 'father', text: 'Bố' },
  { value: 'mother', text: 'Mẹ' },
  { value: 'other', text: 'Khác' }
]
export const TYPE_ROLE = [
  { value: 'admin', text: 'admin' },
  { value: 'teacher', text: 'Gíao viên' },
  { value: 'parent', text: 'Người dùng' }
]

export const TYPE_STATUS = [
  { value: 'active', text: 'Hoạt động' },
  { value: 'disabled', text: 'Tạm dừng' }
]

export const VALUE_STUDENT = {
  name: '',
  dateOfBirth: '',
  gender: '',
  parent: {
    as: '',
    userId: ''
  }
}
