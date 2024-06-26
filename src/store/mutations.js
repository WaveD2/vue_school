export const SET_USER = (state, user) => {
  state.user = user
}
export const SET_ACTIVE_SIDE_BAR = (state, number) => {
  state.isActiveSideBar = number
}

export const SET_PAGINATION = (state, pagination) => {
  state.pagination = pagination
}
export const SET_CURRENT_SEARCH = (state, payload) => {
  state.searchCurrent = payload
}

export const SET_TEACHERS = (state, payload) => {
  state.listTeacher = payload
}

export const SET_DETAIL_TEACHER = (state, payload) => {
  state.detailTeacher = payload
}
export const SET_MES_API_ERROR = (state, payload) => {
  state.mesErrorServer = payload
}
export const SET_INFO_DETAIL_MODAL = (state, payload) => {
  state.infoDetailModal = payload
}
export const SET_LIST_USER_TABLE = (state, payload) => {
  state.listUser = payload
}
