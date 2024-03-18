<script setup>
import store from '@/store'
import { ref, onMounted, computed } from 'vue'
import { LABEL_TABLE_TEACHER } from '@/utils/constants'

const emit = defineEmits(['getDataTable'])
const dataRowTable = ref(null)

onMounted(async () => {
  // if (store.state.listStudent.length !== 0) return
  await store.dispatch('getTeachers')

  dataRowTable.value = store.state.listTeacher
  console.log('adad', dataRowTable.value)
  emit('getDataTable', {
    rowTable: dataRowTable.value,
    colTable: LABEL_TABLE_TEACHER
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
, LABEL_MODAL_DETAIL_TEACHER, LABEL_TABLE_TEACHER
