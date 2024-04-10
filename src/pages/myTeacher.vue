<script setup>
import store from '@/store'
import { onMounted } from 'vue'
import {
  LABEL_MODAL_DETAIL_TEACHER,
  LABEL_TABLE_TEACHER,
  VALUE_MODAL_DETAIL_TEACHER
} from '@/utils/constants'

const emit = defineEmits(['getDataTable'])

onMounted(async () => {
  const sortPreviousRoute = localStorage.getItem('previousRoute') || ''

  const sortTeacher = { search: '', gender: '', type: '', status: '' }

  const params = new URLSearchParams(sortPreviousRoute.split('?')[1])

  const queryParamsObject = {}
  for (const [key, value] of params) {
    queryParamsObject[key] = value
  }

  const listParams = {
    url: 'teachers',
    typeCommitStore: 'SET_LIST_USER_TABLE',
    params: sortPreviousRoute && queryParamsObject
  }
  await store.dispatch('getInfo', listParams)

  emit('getDataTable', {
    colTable: LABEL_TABLE_TEACHER,
    labelModalDetail: LABEL_MODAL_DETAIL_TEACHER,
    valueModalDetail: VALUE_MODAL_DETAIL_TEACHER,
    typeTable: 'teachers',
    sortTable: { ...sortTeacher, ...queryParamsObject }
  })
})
</script>

<template></template>
