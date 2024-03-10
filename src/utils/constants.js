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
    text: 'Trang chủ',
    isActive: true,
    icon: 'fa-solid fa-house',
    link: '/'
  },
  {
    text: 'Quản lý lớp',
    isActive: false,
    icon: ' fa-solid fa-graduation-cap ',
    link: '/my-class'
  },
  {
    text: 'Quản lý bảng điểm',
    isActive: false,
    icon: 'fa-solid fa-book',
    link: '/'
  },
  {
    text: 'Yêu cầu & Đề xuất',
    isActive: false,
    icon: ' fa-solid fa-school',
    link: '/'
  },
  {
    text: 'Trò chuyện',
    isActive: false,
    icon: 'fa-regular fa-comment-dots',
    link: '/'
  },

  {
    text: 'Sự kiện',
    isActive: false,
    icon: 'fa-solid fa-mountain-sun',
    link: '/'
  },
  {
    text: 'Cài đặt',
    isActive: false,
    icon: 'fa-solid fa-gear',
    link: '/setting-profile'
  },
  {
    text: 'Đăng xuất',
    isActive: false,
    icon: 'fa-solid fa-arrow-right-from-bracket',
    link: '/login'
  }
]

export const MENU_MODAL_USER = [
  {
    text: 'Cài đặt',
    isActive: false,
    icon: 'fa-solid fa-gear',
    link: '/'
  },
  {
    text: 'Đăng xuất',
    isActive: false,
    icon: 'fa-solid fa-arrow-right-from-bracket',
    link: '/login'
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

export const COLUMN_TABLE_MY_CLASS = [
  'Lớp',
  'Trạng thái',
  'Ngày bắt đầu',
  'Ngày kết thúc',
  'Lịch học',
  'Sĩ số',
  'Số buổi đã học',
  'Điểm danh',
  'Tùy chọn'
]
