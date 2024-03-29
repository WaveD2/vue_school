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
  const sort = JSON.parse(localStorage.getItem('sort_current')) || ''
  const listParams = {
    url: 'teachers',
    typeCommitStore: 'SET_LIST_USER_TABLE',
    params: sort
  }
  await store.dispatch('getInfo', listParams)

  emit('getDataTable', {
    colTable: LABEL_TABLE_TEACHER,
    labelModalDetail: LABEL_MODAL_DETAIL_TEACHER,
    valueModalDetail: VALUE_MODAL_DETAIL_TEACHER,
    typeTable: 'teachers'
  })
})
</script>

<template></template>
