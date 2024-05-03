<script setup>
import store from '@/store'
import { onMounted } from 'vue'
import {
  LABEL_MODAL_DETAIL_TEACHER,
  LABEL_TABLE_TEACHER,
  VALUE_MODAL_DETAIL_TEACHER
} from '@/constants/options'

const emit = defineEmits(['getDataTable'])

onMounted(async () => {
  const sortPreviousRoute = localStorage.getItem('previousRoute') || ''

  const sortTeacher = ['gender', 'type', 'status']
  const colTeacher = ['name', 'phone', 'email', 'currentAddress', 'status']

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
    colTable: colTeacher,
    labelModalDetail: LABEL_MODAL_DETAIL_TEACHER,
    valueModalDetail: VALUE_MODAL_DETAIL_TEACHER,
    typeTable: 'teachers',
    sortTable: sortTeacher,
    filterSelect: queryParamsObject
  })
})
</script>

<template></template>
