<script setup>
import Table from '@/components/Table.vue'
import Select from '@/components/Select.vue'
import InputSearch from '@/components/InputSearch.vue'
import ModalComponent from '@/components/ModalComponent.vue'
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import Field from '@/components/Field.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import store from '@/store'
import FiledImage from '@/components/FiledImage.vue'
import { validateTeacher } from '@/utils/validateYub'
import { arrayToObject } from '@/utils/function'
import TextareaVue from '@/components/Textarea.vue'

import { GENDER, VALUE_MODAL_DETAIL_TEACHER, LIST_OPTIONS } from '@/utils/constants'
import Pagination from '@/components/Pagination.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const routeCurrent = computed(() => route.path)

// Table
watch(routeCurrent, (newValue, oldValue) => {
  isLoading.value = true
  localStorage.setItem('current_page', newValue)
  localStorage.removeItem('sort_current')
})

const sort = localStorage.getItem('sort_current')
  ? JSON.parse(localStorage.getItem('sort_current'))
  : {
      search: '',
      gender: '',
      pagination: 0
    }

const typeModal = reactive({
  type: null,
  label: null,
  optionSelect: null
})
const typeButtonModal = reactive({
  type: null,
  label: null,
  handleActive: null
})

const innerModal = ref(false)
const isLoading = ref(false)
const isDisabledModal = ref(false)
const errors = ref({})

const titleModal = ref('')

const valueForm = ref({})
const renderColTableRender = ref([])
const labelModal = ref({})
const valueModal = ref({})

const detailTypeTable = ref('')

const paramSortTable = reactive(sort)

const pag = computed(() => store.state.pagination)
const renderRowTable = computed(() => store.state.listUser)

const handleSetDataRender = (data) => {
  const { colTable, labelModalDetail, valueModalDetail, typeTable } = data

  valueModal.value = valueModalDetail
  labelModal.value = labelModalDetail
  renderColTableRender.value = colTable
  detailTypeTable.value = typeTable

  isLoading.value = false
}

// Modal
const handlerSetModal = ({ type }) => {
  // const currentUserDetail = store.state[detailTypeModal.value]

  const currentUserDetail = store.state.infoDetailModal

  if (type === 'detail' || type === 'update') {
    if (type === 'detail') {
      titleModal.value = 'Thông tin chi tiết'
      isDisabledModal.value = true
      typeButtonModal.type = 'update'
      typeButtonModal.label = 'Chỉnh sửa thông tin'
      typeButtonModal.handleActive = handlerSetModal
    } else {
      titleModal.value = 'Chỉnh sửa thông tin'
      isDisabledModal.value = false
      typeButtonModal.type = type
      typeButtonModal.label = 'Lưu thông tin'
      typeButtonModal.handleActive = handleClickForm
    }

    typeModal.label = labelModal.value
    valueForm.value = currentUserDetail
  } else if (type === 'add') {
    titleModal.value = 'Tạo thêm người dùng'
    typeModal.label = labelModal.value
    valueForm.value = Object.assign({}, valueModal.value)
    isDisabledModal.value = false
    typeButtonModal.type = type
    typeButtonModal.label = 'Tạo người dùng'
    typeButtonModal.handleActive = handleClickForm
  } else if (type === 'delete') {
    titleModal.value = `Bạn chắc chắn muốn xóa !`
    typeModal.value = null
    typeButtonModal.type = type
    valueForm.value = currentUserDetail
    typeButtonModal.label = 'Xóa người dùng'
    typeButtonModal.handleActive = handleClickForm
  }
  innerModal.value = true
}

const handleClose = () => {
  innerModal.value = false

  isLoading.value = false
  typeModal.label = null
  errors.value = {}
  valueForm.value = {}
}

// Search
function handleSortTable(newPage) {
  isLoading.value = true
  paramSortTable.page = newPage
}

watch(paramSortTable, async () => {
  const listParams = {
    url: detailTypeTable.value,
    params: paramSortTable,
    typeCommitStore: 'SET_LIST_USER_TABLE'
  }

  localStorage.setItem('sort_current', JSON.stringify(paramSortTable))
  await store.dispatch('getInfo', listParams)
  isLoading.value = false
})

//  XỬ LÝ SỰ KIỆN CỦA BUTTON ACTION
const handleClickForm = async ({ type }) => {
  errors.value = {}
  isLoading.value = true

  try {
    if (type === 'delete') {
      await store.dispatch('apiDetail', {
        url: detailTypeTable.value,
        method: 'DELETE',
        data: valueForm.value
      })

      return
    }

    validateTeacher.validateSync(valueForm.value, { abortEarly: false })

    const API_METHOD = type === 'add' ? 'POST' : 'PATCH'

    await store.dispatch('apiDetail', {
      method: API_METHOD,
      data: valueForm.value,
      url: detailTypeTable.value
    })
  } catch (error) {
    if (Array.isArray(error.inner)) {
      const errorMess = error.inner.map((e) => ({
        [e.path]: e.message
      }))
      return (errors.value = arrayToObject(errorMess))
    }
  } finally {
    if (store.state.mesErrorServer.length !== 0) {
      return (errors.value = arrayToObject(store.state.mesErrorServer))
    } else if (Object.keys(errors.value).length !== 0) return
    handleClose()
    innerModal.value = false
  }
}

onUnmounted(() => {
  localStorage.removeItem('sort_current')
})
</script>

<template>
  <router-view @getDataTable="handleSetDataRender" />

  <!-- Table -->
  <div class="px-3 bg-background rounded-md max-md:p-0">
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
      <div @click="handlerSetModal({ type: 'add' })">
        <i
          class="fa-solid fa-user-plus text-base text-primary border cursor-pointer border-grey-2 p-2 rounded-xl hover:bg-slate"
        />
      </div>
    </div>

    <Table
      :isLoading="isLoading"
      :key-search="paramSortTable.search"
      @set-modal="handlerSetModal"
      :list-data-table="renderRowTable"
      :column-table="renderColTableRender"
      :type-table="detailTypeTable"
    />
    <Pagination :pag="pag" @onPageChanged="handleSortTable" />
  </div>

  <ModalComponent :is-inner-modal="innerModal" @close-modal="handleClose">
    <template #title>
      <p class="h4">{{ titleModal }}</p>
    </template>
    <template #content v-if="typeModal.label">
      <h3 class="text-red-400 font-bold text-center my-2" v-if="errors['error']">
        {{ errors['error'] }}
      </h3>

      <div class="flex justify-center gap-1 flex-wrap w-auto overflow-hidden">
        <Field
          class="w-[30%]"
          v-for="(label, key) of typeModal.label"
          :label="label.text"
          :error="errors[key]"
          :required="label.required"
        >
          <Select
            :disabled="isDisabledModal || label.disabled"
            v-if="LIST_OPTIONS.hasOwnProperty(key)"
            v-model="valueForm[key]"
            :options="LIST_OPTIONS[key]"
          />
          <Input
            v-else-if="key === 'dateOfBirth'"
            :disabled="isDisabledModal || label.disabled"
            v-model="valueForm[key]"
            type="date"
          />
          <TextareaVue
            v-else-if="key === 'note'"
            :disabled="isDisabledModal || label.disabled"
            v-model="valueForm[key]"
            type="date"
          />
          <Input
            v-else
            v-model="valueForm[key]"
            :disabled="isDisabledModal || label.disabled"
            type="text"
          />
        </Field>
      </div>
    </template>

    <template #footer>
      <div class="w-full flexAround pb-3">
        <Button by-style-class="w-2/5 py-2 px-5" @click="handleClose">Đóng</Button>
        <Button
          by-style-class="w-2/5 py-2 px-5"
          @click="typeButtonModal.handleActive({ type: typeButtonModal.type })"
        >
          {{ typeButtonModal.label }}
        </Button>
      </div>
    </template>
  </ModalComponent>
</template>

<!-- 
          <filed-image
            v-if="valueForm[key] instanceof Object"
            v-model="valueForm[key]"
            type="file"
            styleByClass="w-40 h-40 rounded-full max-md:!w-50 max-md:!h-50"
          />
 -->
