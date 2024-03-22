import { LABEL_MODAL_DETAIL_TEACHER } from '@/utils/constants'

export const getLabelModalDetail = (state) => {
  const checkTypeUserDetail = state.detailParent

  return {
    label: LABEL_MODAL_DETAIL_TEACHER,
    value: checkTypeUserDetail
  }
}
