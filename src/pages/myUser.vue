<script setup>
import store from '@/store'
import { onMounted, computed, ref } from 'vue'
import {
  LABEL_MODAL_DETAIL_USER,
  LABEL_TABLE_USER,
  VALUE_MODAL_DETAIL_USER
} from '@/utils/constants'

const emit = defineEmits(['getDataTable'])

onMounted(async () => {
  const listParams = {
    url: 'users',
    typeCommitStore: 'SET_LIST_USER_TABLE'
  }
  await store.dispatch('getInfo', listParams)

  emit('getDataTable', {
    // rowTable: store.state.listUser,
    colTable: LABEL_TABLE_USER,
    labelModalDetail: LABEL_MODAL_DETAIL_USER,
    valueModalDetail: VALUE_MODAL_DETAIL_USER,
    typeTable: 'users'
  })
})
</script>
