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

export const menuSidenav = [
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
    link: '/'
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
    icon: 'fa-regular fa-comment-dots'
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

export const menuModalUser = [
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
