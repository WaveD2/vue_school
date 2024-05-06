<script setup>
import store from '@/store'
import { onMounted } from 'vue'
import { LABEL_MODAL_DETAIL_TEACHER, VALUE_MODAL_DETAIL_TEACHER } from '@/constants/options'

const emit = defineEmits(['getDataTable'])

onMounted(async () => {
  const sortPreviousRoute = localStorage.getItem('previousRoute') || ''

  const SORT_TEACHER = ['gender', 'type', 'status']
  const COL_TEACHER = ['name', 'phone', 'email', 'currentAddress', 'status']

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
    colTable: COL_TEACHER,
    typeTable: 'teachers',
    labelModalDetail: LABEL_MODAL_DETAIL_TEACHER,
    valueModalDetail: VALUE_MODAL_DETAIL_TEACHER,
    sortTable: SORT_TEACHER,
    filterSelect: queryParamsObject
  })
})
</script>

<template></template>
