<script setup>
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import store from '@/store'
import { COLUMN_TABLE_STUDENTS, GENDER, VALUE_STUDENT } from '@/utils/constants'

const emit = defineEmits(['getDataTable'])
const dataRowTable = ref(null)
const listParenStd = ref(null)
const valueForm = ref({})

onMounted(async () => {
  await store.dispatch('getStudent')
  listParenStd.value = computed(() => {
    return store.getters.getNameParent
  })

  dataRowTable.value = store.state.listStudent

  emit('getDataTable', {
    rowTable: dataRowTable.value,
    colTable: COLUMN_TABLE_STUDENTS
  })
})
</script>
