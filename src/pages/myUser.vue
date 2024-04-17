<script setup>
import store from '@/store'
import { onMounted } from 'vue'
import { LABEL_MODAL_DETAIL_USER, VALUE_MODAL_DETAIL_USER } from '@/utils/constants'

const emit = defineEmits(['getDataTable'])

onMounted(async () => {
  const colUser = ['id', 'name', 'phone', 'role', 'status']

  const listParams = {
    url: 'users',
    typeCommitStore: 'SET_LIST_USER_TABLE'
  }
  await store.dispatch('getInfo', listParams)
  //labelModalDetail
  emit('getDataTable', {
    colTable: colUser,
    labelModalDetail: LABEL_MODAL_DETAIL_USER,
    valueModalDetail: VALUE_MODAL_DETAIL_USER,
    typeTable: 'users'
  })
})
</script>
<template></template>
