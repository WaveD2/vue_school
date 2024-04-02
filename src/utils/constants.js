import store from '@/store'

export const VALUE_LOGIN = {
  username: '',
  password: ''
}
export const LABEL_LOGIN = {
  username: {
    text: 'Tên đăng nhập',
    required: true,
    disabled: false
  },
  password: {
    text: 'Mật khẩu',
    required: true,
    disabled: false
  }
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
    text: 'Quản lý người dùng',
    isActive: false,
    icon: ' fa-solid fa-graduation-cap ',
    link: '/users',
    func: function () {
      return
    }
  },
  // {
  //   text: 'Cài đặt',
  //   isActive: false,
  //   icon: 'fa-solid fa-gear',
  //   link: '/setting-profile',
  //   func: function () {
  //     return
  //   }
  // },
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

export const LIST_OPTIONS = {
  status: [
    { value: '', text: 'Trạng thái' },
    { value: 'active', text: 'Hoạt động' },
    { value: 'disabled', text: 'Không hoạt động' }
  ],

  gender: [
    { value: '', text: 'Giới tính' },
    { value: 'male', text: 'Nam' },
    { value: 'female', text: 'Nữ' }
  ],
  type: [
    { value: 'official', text: 'Chính thức' },
    { value: 'contract', text: 'Hợp đồng' },
    { value: 'parttime', text: 'Thời vụ' }
  ],
  role: [
    { value: 'parent', text: 'Người dùng' },
    { value: 'teacher', text: 'Giáo viên ' },
    { value: 'admin', text: 'Quản lý' }
  ]
}

export const LABEL_TABLE_TEACHER = {
  name: 'Tên',
  gender: 'Giới tính',
  phone: 'Số điện thoại',
  email: 'Gmail',
  status: 'Trạng thái',
  currentAddress: 'Địa chỉ'
}

export const LABEL_MODAL_DETAIL_TEACHER = {
  name: {
    text: 'Tên',
    required: true,
    disabled: false
  },
  gender: {
    text: 'Giới tính',
    required: true,
    disabled: false
  },
  phone: {
    text: 'Số điện thoại',
    required: true,
    disabled: false
  },
  email: {
    text: 'Gmail',
    required: true,
    disabled: false
  },
  pastClassIds: {
    text: 'Lớp học',
    required: false,
    disabled: false
  },
  teacherCode: {
    text: 'Mã giáo viên',
    required: false,
    disabled: true
  },
  currentAddress: {
    text: 'Địa chỉ',
    required: true,
    disabled: false
  },
  nationality: {
    text: 'Quốc tịch',
    required: true,
    disabled: false
  },
  permanentResidence: {
    text: 'Hộ khẩu thường trú',
    required: true,
    disabled: false
  },
  healthInsuranceNumber: {
    text: 'Số bảo hiểm',
    required: true,
    disabled: false
  },
  status: {
    text: 'Trạng thái',
    required: true,
    disabled: false
  },
  type: {
    text: 'Hợp đồng',
    required: true,
    disabled: false
  },
  passport: {
    text: 'Chứng minh nhân dân',
    required: true,
    disabled: false
  },
  dateOfBirth: {
    text: 'Ngày sinh',
    required: true,
    disabled: false
  },
  slug: {
    text: 'Slug',
    required: false,
    disabled: true
  },
  contracts: {
    text: 'Làm việc',
    required: false,
    disabled: false
  },
  note: {
    text: 'Ghi chú ',
    required: false,
    disabled: false
  },

  avatar: {
    required: false,
    disabled: false
  }
}

export const VALUE_MODAL_DETAIL_TEACHER = {
  avatar: {
    bucket: '',
    key: '',
    url: ''
  },
  contracts: [],
  name: '',
  gender: '',
  phone: '',
  email: '',
  teacherCode: '',
  pastClassIds: '',
  currentAddress: '',
  nationality: '',
  permanentResidence: '',
  healthInsuranceNumber: '',
  status: '',
  type: '',
  passport: '',
  dateOfBirth: '',
  note: ''
}

export const LABEL_TABLE_USER = {
  username: 'Tên đăng nhập',
  id: 'ID',
  parentId: 'Parent ID',
  role: 'Quyền',
  status: 'Trạng thái'
}

export const LABEL_MODAL_DETAIL_USER = {
  avatar: {
    text: 'Ảnh',
    required: false
  },
  username: {
    text: 'Tên đăng nhập',
    required: true,
    disabled: false
  },
  role: {
    text: 'Quyền',
    required: true,
    disabled: false
  },
  id: {
    text: 'ID',
    required: true,
    disabled: true
  },
  parentId: {
    text: 'Parent ID',
    required: true,
    disabled: true
  },
  status: {
    text: 'Trạng thái',
    required: true,
    disabled: false
  }
}

export const VALUE_MODAL_DETAIL_USER = {
  username: '',
  id: '',
  parentId: '',
  role: '',
  status: ''
}
