export const SET_USER = (state, user) => {
  state.user = user
}
export const SET_ACTIVE_SIDE_BAR = (state, number) => {
  state.isActiveSideBar = number
}
export const SET_LIST_STD = (state, students) => {
  state.listStudent = students
}
export const SET_PAGINATION = (state, pagination) => {
  state.pagination = pagination
}
export const SET_LOADING = (state, isLoading) => {
  state.isLoadingGlobal = isLoading
}
export const SET_PARENT = (state, parent) => {
  state.listParent = parent
}
export const SET_CURRENT_SEARCH = (state, payload) => {
  state.searchCurrent = payload
}
export const SET_DETAIL_PARENT = (state, payload) => {
  state.detailParent = payload
}
