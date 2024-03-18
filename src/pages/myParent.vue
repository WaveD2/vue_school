<script setup>
import store from '@/store'
import { onMounted, computed, ref } from 'vue'
import { COLUMN_TABLE_USERS } from '@/utils/constants'

const emit = defineEmits(['getDataTable'])
const dataRowTable = ref(null)

onMounted(async () => {
  await store.dispatch('getListParent')
  dataRowTable.value = store.state.listParent

  emit('getDataTable', {
    rowTable: dataRowTable.value,
    colTable: COLUMN_TABLE_USERS
  })
})
</script>
