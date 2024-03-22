<script setup>
import store from '@/store'
import { ref, onMounted, computed, reactive } from 'vue'
import { LABEL_TABLE_TEACHER } from '@/utils/constants'

const emit = defineEmits(['getDataTable'])
// const dataRowTable = ref(null)

onMounted(async () => {
  // const sort = JSON.parse(localStorage.getItem('sort_current')) || ''
  await store.dispatch('getTeachers')
})

const dataRowTable = reactive(store.state.listTeacher)

emit('getDataTable', {
  rowTable: dataRowTable.value,
  colTable: LABEL_TABLE_TEACHER
})
</script>

<template></template>
