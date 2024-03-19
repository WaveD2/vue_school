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
import FiledImage from '@/components/FiledImage.vue'
import { validateTeacher } from '@/utils/validateYub'
import { arrayToObject } from '@/utils/function'
import useTransition from '../utils/axios'

import {
  GENDER,
  LABEL_MODAL_DETAIL_TEACHER,
  VALUE_MODAL_DETAIL_TEACHER,
  LIST_OPTIONS
} from '@/utils/constants'
import Pagination from '@/components/Pagination.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { error } = useTransition()

const sort = localStorage.getItem('sort_current')
  ? JSON.parse(localStorage.getItem('sort_current'))
  : {
      search: '',
      select: '',
      pagination: 0
    }

const typeModal = reactive({
  type: null,
  label: null,
  optionSelect: null
})
const innerModal = ref(true)
const isLoading = ref(false)
const errors = ref({})
const isActiveUpdate = ref(null)

const valueForm = ref({})
const rowTableRender = ref([])
const colTableRender = ref({})

const paramSortTable = reactive(sort)

const pag = computed(() => store.state.pagination)
const routeCurrent = computed(() => route.path)

onMounted(() => {
  isLoading.value = true
})

// Table
watch(routeCurrent, (newValue, oldValue) => {
  localStorage.setItem('current_page', JSON.stringify(newValue))
})
const errorServer = computed(() => error)
const renderColTableRender = computed(() => colTableRender.value)
const renderRowTableRender = computed(() => store.state.listTeacher)

const handleSetDataRender = (data) => {
  const { colTable, rowTable } = data
  colTableRender.value = colTable
  rowTableRender.value = rowTable
  isLoading.value = false
}

const handlerSetModal = async (data) => {
  const { rowStd, type } = data

  if (type === 'detail' || type === 'update') {
    await store.commit('SET_DETAIL_TEACHER', rowStd)
    if (type === 'update') isActiveUpdate.value = true
    else isActiveUpdate.value = false
    const currentUserDetail = store.getters.getLabelModalDetail
    console.log('a', currentUserDetail)
    typeModal.type = type
    typeModal.label = currentUserDetail.label
    valueForm.value = currentUserDetail.value
  } else if (type === 'delete') {
    typeModal.type = type
    valueForm.value = { ...rowStd }
  }

  console.log('typeModal', typeModal, valueForm.value)
  innerModal.value = true
}

const handleClose = () => {
  console.log('close')
  typeModal.type = null
  innerModal.value = null
}

const handleUpdate = () => {
  if (!isActiveUpdate.value) {
    isActiveUpdate.value = true
  } else {
    console.log('update')
    console.log('valueForm.value', valueForm.value)
  }
  // typeModal.type = null
  // innerModal.value = false
}

const handleCreate = () => {
  typeModal.type = 'add'
  typeModal.label = LABEL_MODAL_DETAIL_TEACHER
  valueForm.value = VALUE_MODAL_DETAIL_TEACHER

  innerModal.value = true
}

// Search
function handleSortTable(newPage) {
  paramSortTable.page = newPage
}

watch(paramSortTable, async () => {
  isLoading.value = true

  localStorage.setItem('sort_current', JSON.stringify(paramSortTable))
  await store.dispatch('getTeachers', paramSortTable)
  isLoading.value = false
})

const handleClickForm = async () => {
  try {
    errors.value = {}
    console.log('form', valueForm.value)
    console.log('1', 2)
    validateTeacher.validateSync(valueForm.value, { abortEarly: false })
    console.log('1', 3)

    await store.dispatch('createTeacher', valueForm.value)
  } catch (error) {
    console.log('error', error)
    if (Array.isArray(error.inner)) {
      const errorMess = error.inner.map((e) => ({
        [e.path]: e.message
      }))
      return (errors.value = arrayToObject(errorMess))
    }
  }
}

console.log('error table', errorServer)
</script>

<template>
  <router-view @getDataTable="handleSetDataRender" />

  <LoadingComponent :isLoading="isLoading" />

  <!-- Table -->

  <div class="p-3 bg-background rounded-md max-md:p-0">
    <div
      class="px-8 pt-2 flexBetween min-h-[70px] pb-0 bg-transparent max-md:flex-wrap max-md:gap-y-2"
    >
      <div class="flex items-center gap-x-2">
        <Select
          style-class="!w-auto !py-1 !h-9"
          v-model="paramSortTable.gender"
          :options="GENDER"
        />
        <InputSearch by-style-class="!bg-grey-1 !rounded-md" v-model="paramSortTable.search" />
      </div>
      <div>
        <i
          @click="handleCreate"
          class="fa-solid fa-user-plus text-base text-primary border cursor-pointer border-grey-2 p-2 rounded-xl hover:bg-slate"
        />
      </div>
    </div>

    <Table
      :key-search="paramSortTable.search"
      @set-modal="handlerSetModal"
      :list-data-table="renderRowTableRender"
      :column-table="renderColTableRender"
    />
    <Pagination :pag="pag" @onPageChanged="handleSortTable" />
  </div>

  <!-- Modal -->

  <!-- Modal Add -->
  <ModalComponent
    v-if="typeModal.type === 'add'"
    :isInnerModal="innerModal"
    @close-modal="handleClose"
  >
    <template #title> <p class="h4">Thêm giáo viên</p> </template>
    <template #content>
      <div class="flex justify-center gap-2 flex-wrap p-3 w-auto overflow-hidden">
        <Field
          class="w-[30%]"
          v-for="(label, key) of typeModal.label"
          :label="label.text"
          :error="errors[key]"
          :required="label.required"
        >
          <filed-image
            v-if="valueForm[key] instanceof Object"
            v-model="valueForm[key]"
            type="file"
            styleByClass="w-40 h-40 rounded-full max-md:!w-50 max-md:!h-50"
          />
          <Select
            v-else-if="key === 'status' || key === 'gender' || key === 'type'"
            v-model="valueForm[key]"
            :options="LIST_OPTIONS[key]"
            type="text"
          />
          <Input v-else-if="key === 'dateOfBirth'" v-model="valueForm[key]" type="date" />
          <Input v-else v-model="valueForm[key]" type="text" />
        </Field>
      </div>
    </template>
    <template #footer>
      <div class="w-full flexAround gap-3 pb-4">
        <Button by-style-class=" py-1 px-5" @click="handleClose">Hủy</Button>
        <Button by-style-class=" py-1 px-5 bg-blue-300" @click="handleClickForm">Thêm</Button>
      </div>
    </template>
  </ModalComponent>

  <!-- Xóa user -->
  <ModalComponent
    v-if="typeModal.type === 'delete'"
    :isInnerModal="innerModal"
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
    v-if="typeModal.type === 'detail' || typeModal.type === 'update'"
    is-inner-modal="innerModal"
    @close-modal="handleClose"
    styleModalContainer="!max-w-4xl"
  >
    <template #title> <p class="h4">Thông tin chi tiết</p> </template>
    <template #content>
      <div class="flex items-center gap-x-[4%] flex-wrap px-5 py-3 w-auto overflow-hidden">
        <Field :label="label" v-for="(label, key) of typeModal.label" class="w-[30%]">
          <Input
            v-if="typeof valueForm[key] !== 'object' && !Array.isArray(valueForm[key])"
            :modelValue="valueForm[key]"
            :disabled="!isActiveUpdate"
            type="text"
          />
          <Select
            v-if="Array.isArray(valueForm[key])"
            v-model="valueForm[key][0]"
            :disabled="!isActiveUpdate"
            :options="typeModal.optionSelect"
            type="text"
          />
          <FiledImage
            v-if="valueForm[key] instanceof Object && !Array.isArray(valueForm[key])"
            :modelValue="valueForm[key]"
            :disabled="!isActiveUpdate"
            styleByClass="!w-40 !h-40"
          />
        </Field>
      </div>

      <div class="w-full flex justify-end gap-3 pb-4 pr-9">
        <Button by-style-class=" py-1 px-5" @click="handleClose">Đóng</Button>
        <Button by-style-class=" py-1 px-5 bg-blue-300" @click="handleUpdate">
          {{ !isActiveUpdate ? ' Chỉnh sửa' : 'Lưu' }}
        </Button>
      </div>
    </template>
  </ModalComponent>
</template>
<!-- v-for="keyFrom in valueForm" -->useTransitionState,
