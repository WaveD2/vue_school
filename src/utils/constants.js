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
  // SELECT
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
    { value: '', text: 'Hợp đồng' },
    { value: 'official', text: 'Chính thức' },
    // { value: 'contract', text: 'Hợp đồng' },
    { value: 'parttime', text: 'Thời vụ' }
  ],
  role: [
    { value: '', text: 'Chức vụ' },
    { value: 'parent', text: 'Người dùng' },
    { value: 'teacher', text: 'Giáo viên ' },
    { value: 'admin', text: 'Quản lý' }
  ],
  search: 'Tìm kiếm ...'
}

export const LABEL_TABLE_TEACHER = {
  name: 'Tên',
  phone: 'Số điện thoại',
  email: 'Gmail',
  currentAddress: 'Địa chỉ',
  status: 'Trạng thái'
}

export const FIL_TAB_CONTENT_TEACHER = [
  {
    label: 'Thông tin cơ bản',
    key: 'default'
  },
  {
    label: 'Thông tin nâng cao',
    key: 'raise'
  }
]

export const TAB_CONTENT_TEACHER = [
  { tab: 'Cài đặt trường dữ liệu', key: 'filed' },
  { tab: 'Cài đặt bộ lọc', key: 'sort' }
]

export const LABEL_MODAL_DETAIL_TEACHER = {
  teacherCode: {
    text: 'Mã giáo viên',
    required: false,
    disabled: true,
    type: 'default',
    group: ['filed']
  },
  name: {
    text: 'Tên',
    required: true,
    disabled: false,
    type: 'default',
    group: ['filed']
  },
  gender: {
    text: 'Giới tính',
    required: true,
    disabled: false,
    type: 'raise',
    group: ['sort', 'filed']
  },
  phone: {
    text: 'Số điện thoại',
    required: true,
    disabled: false,
    type: 'default',
    group: ['filed']
  },
  email: {
    text: 'Gmail',
    required: true,
    disabled: false,
    type: 'default',
    group: ['filed']
  },
  pastClassIds: {
    text: 'Lớp học',
    required: false,
    disabled: false
  },

  currentAddress: {
    text: 'Địa chỉ',
    required: true,
    disabled: false,
    type: 'default',
    group: ['filed']
  },
  permanentResidence: {
    text: 'Hộ khẩu thường trú',
    required: true,
    disabled: false,
    type: 'raise'
  },

  status: {
    text: 'Trạng thái',
    required: true,
    disabled: false,
    type: 'raise',
    group: ['sort', 'filed']
  },
  type: {
    text: 'Hợp đồng',
    required: true,
    disabled: false,
    type: 'raise',
    group: ['sort', 'filed']
  },
  passport: {
    text: 'Chứng minh nhân dân',
    required: true,
    disabled: false,
    type: 'raise',
    group: ['filed']
  },
  dateOfBirth: {
    text: 'Ngày sinh',
    required: false,
    disabled: false
  },
  healthInsuranceNumber: {
    text: 'Số bảo hiểm',
    required: false,
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
    text: 'Ghi chú',
    required: false,
    disabled: false
  },

  avatar: {
    text: 'Ảnh',
    required: true,
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

export const LABEL_MODAL_DETAIL_USER = {
  id: {
    text: 'ID',
    required: true,
    disabled: true
  },
  name: {
    text: 'Tên đăng nhập',
    required: true,
    disabled: false
  },

  email: {
    text: 'Email',
    required: true,
    disabled: false
  },

  phone: {
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
  name: '',
  id: '',
  email: '',
  phone: '',
  role: '',
  status: ''
}
