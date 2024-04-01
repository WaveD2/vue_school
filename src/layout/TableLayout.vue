<script setup>
import Table from '@/components/Table.vue'
import Select from '@/components/Select.vue'
import InputSearch from '@/components/InputSearch.vue'
import ModalComponent from '@/components/ModalComponent.vue'
import { computed, watchEffect, onUnmounted, reactive, ref, watch } from 'vue'
import Field from '@/components/Field.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import store from '@/store'
import FiledImage from '@/components/FiledImage.vue'
import { validateTeacher } from '@/utils/validateYub'
import { arrayToObject } from '@/utils/function'
import TextareaVue from '@/components/Textarea.vue'
import debounce from 'lodash.debounce'
import { LIST_OPTIONS } from '@/utils/constants'
import Pagination from '@/components/Pagination.vue'
import { useRoute, useRouter } from 'vue-router'
import FieldFile from '@/components/FieldFile.vue'

const route = useRoute()

const router = useRouter()

const queryParams = computed(() => route.query)

const filtersAndSort = reactive({
  gender: queryParams.value.gender || '',
  status: queryParams.value.status || '',
  search: queryParams.value.search || '',
  page: queryParams.value.page || 0
})

watchEffect(() => {
  filtersAndSort.gender = route.query.gender || ''
  filtersAndSort.status = route.query.status || ''
  filtersAndSort.search = route.query.search || ''
  filtersAndSort.page = route.query.page || 0
})

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
const isLoadingModal = ref(false)
const isDisabledModal = ref(false)
const errors = ref({})

const titleModal = ref('')

const valueForm = ref(null)
const renderColTableRender = ref([])
const labelModal = ref({})
const valueModal = ref({})

const detailTypeTable = ref('')

const pag = computed(() => store.state.pagination)

const renderRowTable = computed(() => store.state.listUser)

const handleSetDataRender = (data) => {
  const { colTable, labelModalDetail, valueModalDetail, typeTable, sortTable } = data

  valueModal.value = valueModalDetail
  labelModal.value = labelModalDetail
  renderColTableRender.value = colTable
  detailTypeTable.value = typeTable

  if (sortTable) {
    filtersAndSort.gender = sortTable.gender || ''
    filtersAndSort.status = sortTable.status || ''
    filtersAndSort.search = sortTable.search || ''
    filtersAndSort.page = sortTable.page || 0
  }

  isLoading.value = false
}

// Modal
const handlerSetModal = ({ type }) => {
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
  valueForm.value = null
}

// Search
function handleSortTable(newPage) {
  isLoading.value = true
  filtersAndSort.page = newPage
}

const handleFilterAndSort = debounce(async () => {
  isLoading.value = true

  const listParams = {
    url: detailTypeTable.value,
    params: filtersAndSort,
    typeCommitStore: 'SET_LIST_USER_TABLE'
  }

  await store.dispatch('getInfo', listParams)

  const queryParamsString = new URLSearchParams(route.query).toString()

  localStorage.setItem('previousRoute', `${route.path}?${queryParamsString}`)

  isLoading.value = false
}, 1000)

watch(
  filtersAndSort,
  (newVal, oldVal) => {
    const newQueryParams = { ...queryParams.value }

    newQueryParams.gender = newVal.gender || undefined
    newQueryParams.status = newVal.status || undefined
    newQueryParams.search = newVal.search || undefined
    newQueryParams.page = newVal.page || undefined
    handleFilterAndSort()
    router.push({ path: route.path, query: newQueryParams })
  },
  { deep: true }
)

//  XỬ LÝ SỰ KIỆN CỦA BUTTON ACTION
const handleClickForm = debounce(async ({ type }) => {
  errors.value = {}
  isLoadingModal.value = true

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
    isLoadingModal.value = false
  }
}, 500)
</script>

<template>
  <router-view @getDataTable="handleSetDataRender" />

  <!-- Table -->
  <div class="max-md:p-0">
    <div class="px-4 flexBetween min-h-[60px] mb-2 bg-transparent max-md:flex-wrap max-md:gap-y-2">
      <div class="flex items-center gap-x-2">
        <Select
          style-class="!w-auto  "
          v-model="filtersAndSort.gender"
          :options="LIST_OPTIONS.gender"
        />
        <Select
          style-class="!w-auto "
          v-model="filtersAndSort.status"
          :options="LIST_OPTIONS.status"
        />
        <InputSearch
          by-style-class="h-10  bg-slate-100 !rounded-[20px] border border-neutral-300"
          v-model="filtersAndSort.search"
        />
      </div>
      <div @click="handlerSetModal({ type: 'add' })">
        <i
          class="fa-solid fa-user-plus text-base text-primary border cursor-pointer border-grey-2 p-2 rounded-xl hover:bg-slate"
        />
      </div>
    </div>

    <Table
      :isLoading="isLoading"
      :key-search="filtersAndSort.search"
      @set-modal="handlerSetModal"
      :list-data-table="renderRowTable"
      :column-table="renderColTableRender"
      :type-table="detailTypeTable"
    />
    <Pagination :pag="pag" @on-page-changed="handleSortTable" />
  </div>

  <ModalComponent
    :is-inner-modal="innerModal"
    @close-modal="handleClose"
    :is-loading-modal="isLoadingModal"
    :style-modal-box="
      typeModal.label
        ? 'top-0 right-0 bottom-0'
        : 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
    "
  >
    <template #title>
      <p class="h4">{{ titleModal }}</p>
    </template>
    <template #content v-if="typeModal.label">
      <h3 class="text-red-400 font-bold text-center my-2" v-if="errors['error']">
        {{ errors['error'] }}
      </h3>

      <div class="mt-4">
        <Field v-if="valueForm.avatar" :error="errors.avatar" :class="'flex justify-center'">
          <filed-image
            :disabled="isDisabledModal"
            v-if="valueForm.avatar"
            v-model="valueForm.avatar"
            type="file"
            styleByClass="w-40 h-40 rounded-full max-md:!w-50 max-md:!h-50"
          />
        </Field>
        <div class="px-10 flex gap-x-10 flex-wrap w-auto">
          <Field
            v-for="(label, key) of typeModal.label"
            :class="`${key === 'note' || key === 'contracts' ? 'w-[calc(50%-20px)]' : 'w-[30%]' || (key === 'avatar' && '!hidden')}`"
            :label="label.text"
            :error="errors[key]"
            :required="label.required"
          >
            <Select
              :disabled="isDisabledModal || label.disabled"
              v-if="LIST_OPTIONS.hasOwnProperty(key)"
              v-model="valueForm[key]"
              :options="LIST_OPTIONS[key]"
              :style-class="`${label.disabled && '!bg-[#b9b8b8]'} w-full`"
            />
            <Input
              v-else-if="key === 'dateOfBirth'"
              :disabled="isDisabledModal || label.disabled"
              v-model="valueForm[key]"
              type="date"
              :style-class="`${label.disabled && '!bg-[#b9b8b8]'} w-full`"
            />
            <TextareaVue
              v-else-if="key === 'note'"
              :disabled="isDisabledModal || label.disabled"
              v-model="valueForm[key]"
              type="date"
              :style-class="`${label.disabled && '!bg-[#b9b8b8]'} w-full`"
            />
            <FieldFile
              v-else-if="key === 'contracts'"
              :disabled="isDisabledModal || label.disabled"
              v-model="valueForm.contracts"
              style-by-class="!max-h-[140px] !min-h-[138px] overflow-y-scroll"
            />

            <Input
              v-else-if="key !== 'avatar'"
              v-model="valueForm[key]"
              type="text"
              :disabled="isDisabledModal || label.disabled"
              :style-class="`${label.disabled && '!bg-[#b9b8b8]'} w-full`"
            />
          </Field>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="w-full flexAround py-3">
        <Button
          by-style-class="w-2/5 py-2 rounded-md text-lg bg-[#477df4eb] hover:bg-[#1159f8eb] text-white"
          @click="handleClose"
          >Đóng</Button
        >
        <Button
          by-style-class="w-2/5 py-2 rounded-md text-lg bg-[#477df4eb] hover:bg-[#1159f8eb] text-white"
          id="btnSubmit"
          @click="typeButtonModal.handleActive({ type: typeButtonModal.type })"
        >
          {{ typeButtonModal.label }}
        </Button>
      </div>
    </template>
  </ModalComponent>
</template>

<!-- 

     style-class="!w-full  py-3 px-2 border border-[#D5D5D5]"  
 -->
