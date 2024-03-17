<script setup>
import Table from '@/components/Table.vue'
import Select from '@/components/Select.vue'
import Label from '@/components/Label.vue'
import InputSearch from '@/components/InputSearch.vue'
import LoadingComponent from '@/components/LoadingComponent.vue'
import ModalComponent from '@/components/ModalComponent.vue'
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import Field from '@/components/Field.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import store from '@/store'
import { COLUMN_TABLE_STUDENTS, GENDER, VALUE_STUDENT } from '@/utils/constants'
import Pagination from '@/components/Pagination.vue'

const test = ref()
const typeModal = ref()
const valueForm = ref({})
const innerModal = ref(true)
// const dataSdtStore = ref([])
const keyValueForm = Object.keys(valueForm)

const sort = localStorage.getItem('sort_current')
  ? JSON.parse(localStorage.getItem('sort_current'))
  : {
      search: '',
      select: '',
      pagination: 0
    }

const sortCurrent = reactive(sort)

onMounted(async () => {
  // if (store.state.listStudent.length !== 0) return
  await store.dispatch('getStudent')
})
const dataSdtStore = computed(() => {
  return store.getters.getListStudent
})
const listParenStd = computed(() => {
  return store.getters.getNameParent
})

const handlerSetModal = (data) => {
  const { rowStd, type } = data

  switch (type) {
    case 'update':
      typeModal.value = type
      valueForm.value = { ...rowStd }
      break
    case 'delete':
      typeModal.value = type
      valueForm.value = { ...rowStd }
      break
    case 'detail':
      typeModal.value = type
      valueForm.value = store.state.detailParent
      console.log(' valueForm.valu', valueForm.value)
      break
    default:
      break
  }

  innerModal.value = true
}

const handleClose = () => {
  typeModal.value = null
  innerModal.value = false
}

const handleSubmit = () => {
  const { parent: idParent } = valueForm.value
  const infoParent = listParenStd.value.find((item) => item.value.toString() === idParent)
  const parent = {
    userId: infoParent.value,
    as: infoParent.as
  }
  console.log('parent', parent)
  console.log(valueForm.value)
}

watch(sortCurrent, (newValue, oldValue) => {
  console.log(newValue)
  localStorage.setItem('sort_current', JSON.stringify(newValue))
})

onUnmounted(() => {
  localStorage.removeItem('sort_current')
})
const handleSearch = () => {
  console.log('se', sortCurrent)
}
</script>

<template>
  <div class="p-3 bg-background rounded-md max-md:p-0">
    <div
      class="px-9 pt-4 flexBetween min-h-[70px] pb-0 bg-transparent max-md:flex-wrap max-md:gap-y-2"
    >
      <div class="flex items-center gap-x-2">
        <Select style-class="!w-auto !py-1 !h-9" v-model="sortCurrent.select" :options="GENDER" />
        <InputSearch by-style-class="!bg-grey-1 !rounded-md" v-model="sortCurrent.search" />
      </div>
      <div @click="handlerSetModal({ type: 'add', rowStd: VALUE_STUDENT })">
        <i
          class="fa-solid fa-user-plus text-base text-primary border cursor-pointer border-grey-2 p-2 rounded-xl hover:bg-slate"
        ></i>
      </div>
    </div>

    <Table
      @set-modal="handlerSetModal"
      :list-data-table="dataSdtStore"
      :column-table="COLUMN_TABLE_STUDENTS"
    />
    <Pagination v-model="sortCurrent.pagination" />
  </div>

  <!-- Modal -->

  <ModalComponent
    v-if="typeModal === 'update'"
    is-inner-modal="innerModal"
    @close-modal="handleClose"
  >
    <template #title> <p class="h4">Sửa thông tin học sinh</p> </template>
    <template #content>
      <div class="flex items-center gap-2 flex-wrap m-2 w-auto overflow-hidden">
        <Field label="Email">
          <Input v-model="test" type="email" />
        </Field>
      </div>
    </template>
    <template #footer>
      <div class="w-full flexAround gap-3 pb-4">
        <Button by-style-class=" py-1 px-5" @click="handleClose">Hủy</Button>
        <Button by-style-class=" py-1 px-5 bg-blue-300">Cập nhật</Button>
      </div>
    </template>
  </ModalComponent>

  <!-- Modal Add -->
  <ModalComponent v-if="typeModal === 'add'" isInnerModal="innerModal" @close-modal="handleClose">
    <template #title> <p class="h4">Thêm học sinh</p> </template>
    <template #content>
      <div class="flex items-center gap-2 flex-wrap p-3 w-auto overflow-hidden">
        <Field label="Họ và tên">
          <Input v-model="valueForm.name" type="text" />
        </Field>
        <Field label="Giới tính" required>
          <Select v-model="valueForm.gender" :options="GENDER" />
        </Field>
        <Field label="Người thân" required>
          <Select v-model="valueForm.parent" :options="listParenStd" />
        </Field>
        <Field label="Sinh nhật">
          <Input v-model="valueForm.dateOfBirth" type="date" />
        </Field>
      </div>
    </template>
    <template #footer>
      <div class="w-full flexAround gap-3 pb-4">
        <Button by-style-class=" py-1 px-5" @click="handleClose">Hủy</Button>
        <Button by-style-class=" py-1 px-5 bg-blue-300" @click="handleSubmit">Thêm</Button>
      </div>
    </template>
  </ModalComponent>

  <!-- Xóa user -->
  <ModalComponent
    v-if="typeModal === 'delete'"
    isInnerModal="innerModal"
    @close-modal="handleClose"
  >
    <template #title> <p class="h4">Xóa học sinh</p> </template>
    <template #content>
      <div class="w-full flexAround gap-3 pb-4">
        <Button by-style-class=" py-1 px-5" @click="handleClose">Hủy</Button>
        <Button by-style-class=" py-1 px-5 bg-blue-300">Xóa</Button>
      </div>
    </template>
  </ModalComponent>

  <ModalComponent
    v-if="typeModal === 'detail'"
    is-inner-modal="innerModal"
    @close-modal="handleClose"
  >
    <template #title> <p class="h4">Thông tin chi tiết</p> </template>
    <template #content>
      <div class="flexAround flex-wrap p-3 w-auto overflow-hidden">
        <Field label="" v-for="keyForm in valueForm">
          <Input :modelValue="keyForm" :disabled="true" type="text" />
        </Field>
      </div>
    </template>
  </ModalComponent>
</template>
