<script setup>
import store from '@/store'
import { ref, onMounted, computed } from 'vue'
import { COLUMN_TABLE_STUDENTS } from '@/utils/constants'

const emit = defineEmits(['getDataTable'])

onMounted(async () => {
  // if (store.state.listStudent.length !== 0) return
  await store.dispatch('getStudent')

  const dataRowTable = store.state.listStudent
  console.log('adad', dataRowTable)
  emit('getDataTable', {
    rowTable: dataRowTable,
    colTable: COLUMN_TABLE_STUDENTS
  })
})
// const dataSdtStore = computed(() => {
//   return store.getters.getListStudent
// })

// const listParenStd = computed(() => {
//   return
// })
</script>

<template></template>
