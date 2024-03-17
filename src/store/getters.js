export const getListStudent = (state) => {
  return state.listStudent
}
export const getListParent = (state) => {
  return state.listParent
}

export const getNameParent = (state) => {
  const listNameParent = []
  //parent.roles[0] || parent.name
  state.listParent.forEach((parent) =>
    listNameParent.push({
      value: parent.id,
      as: parent.role,
      text: parent.username
    })
  )
  return listNameParent
}
