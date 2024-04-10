<script setup>
import { computed, watchEffect, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Table from '@/components/Table.vue'
import Select from '@/components/Select.vue'
import InputSearch from '@/components/InputSearch.vue'
import ModalComponent from '@/components/ModalComponent.vue'
import Field from '@/components/Field.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import FiledImage from '@/components/FiledImage.vue'
import TextareaVue from '@/components/Textarea.vue'
import debounce from 'lodash.debounce'
import Pagination from '@/components/Pagination.vue'
import FieldFile from '@/components/FieldFile.vue'

import { LIST_OPTIONS } from '@/utils/constants'
import { validateTeacher } from '@/utils/validateYub'
import { arrayToObject, filterKeys, trimInput } from '@/utils/function'
import store from '@/store'
import Tag from '@/components/Tag.vue'

const route = useRoute()
const router = useRouter()

const innerModal = ref(false)
const isLoading = ref(false)
const isLoadingModal = ref(false)
const isDisabledModal = ref(false)
const errors = ref({})

const titleModal = ref('')

const valueForm = ref(null)
const renderColTable = ref([])
const renderFilterTag = ref([])
const labelModal = ref({})
const valueModal = ref({})

const detailTypeTable = ref('')

const pag = computed(() => store.state.pagination)
const queryParams = computed(() => route.query)
const renderRowTable = computed(() => store.state.listUser)

const filtersAndSort = reactive({
  gender: queryParams.value.gender || '',
  status: queryParams.value.status || '',
  type: queryParams.value.type || '',
  page: queryParams.value.page || 1,
  search: queryParams.value.search || ''
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

//  SET URL DEFAULT
onMounted(() => {
  if (!Object.keys(route.query).length > 0) {
    localStorage.setItem('previousRoute', route.path)
  }
})

watchEffect(() => {
  if (!Object.keys(route.query).length > 0) {
    localStorage.setItem('previousRoute', route.path)
  }
  ;(filtersAndSort.gender = route.query.gender || ''),
    (filtersAndSort.status = route.query.status || ''),
    (filtersAndSort.search = route.query.search || ''),
    (filtersAndSort.type = route.query.type || ''),
    (filtersAndSort.page = route.query.page || 1)

  const resultFilter = filterKeys(route.query, LIST_OPTIONS, Object.keys(LIST_OPTIONS))

  renderFilterTag.value = resultFilter
})
watch(
  filtersAndSort,
  (newVal, oldVal) => {
    const newQueryParams = { ...queryParams.value }

    newQueryParams.gender = newVal.gender || undefined
    newQueryParams.status = newVal.status || undefined
    newQueryParams.search = newVal.search || undefined
    newQueryParams.type = newVal.type || undefined
    newQueryParams.page = newVal.page || 1

    router.push({ path: route.path, query: newQueryParams })
    handleFilterAndSort()
  },
  { deep: true }
)

const handleSetDataRender = (data) => {
  const { colTable, labelModalDetail, valueModalDetail, typeTable, sortTable } = data

  valueModal.value = valueModalDetail
  labelModal.value = labelModalDetail
  renderColTable.value = colTable
  detailTypeTable.value = typeTable

  if (!valueModal.hasOwnProperty('avatar')) valueModal['avatar'] = { url: '' }

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
    titleModal.value = `Bạn chắc chắn muốn xóa <span style="color:#eb4747">${currentUserDetail.name} </span> `
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

// FILTER AND SET URL CURRENT
const handleFilterAndSort = debounce(async () => {
  isLoading.value = true

  if (filtersAndSort.search) filtersAndSort.page = 1

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

//  Handle action button submit
const handleClickForm = debounce(async ({ type }) => {
  errors.value = {}

  try {
    if (type === 'delete') {
      await store.dispatch('apiDetail', {
        url: detailTypeTable.value,
        method: 'DELETE',
        data: valueForm.value
      })

      return
    }
    const newForm = trimInput(valueForm.value)

    validateTeacher.validateSync(newForm, { abortEarly: false })

    const API_METHOD = type === 'add' ? 'POST' : 'PATCH'

    await store.dispatch('apiDetail', {
      method: API_METHOD,
      data: newForm,
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
    else {
      handleClose()
      innerModal.value = false
    }
  }
}, 500)

const handleDeleteTag = (tagDelete) => {
  for (let key in filtersAndSort) {
    if (filtersAndSort[key] === tagDelete) {
      filtersAndSort[key] = ''
    }
  }
}
</script>

<template>
  <router-view @getDataTable="handleSetDataRender" />

  <!-- Table -->
  <div class="max-md:p-0">
    <div
      class="px-4 flexBetween h-auto mt-2 mb-1 bg-transparent max-md:flex-wrap max-md:gap-y-2"
      v-if="detailTypeTable !== 'users'"
    >
      <div class="flex items-center gap-x-2">
        <InputSearch
          by-style-class="h-10  bg-slate-100 !rounded-md border border-neutral-300"
          v-model="filtersAndSort.search"
        />

        <Select
          style-class="!w-auto "
          v-model="filtersAndSort.status"
          :options="LIST_OPTIONS.status"
        />
        <Select
          style-class="!w-auto "
          v-model="filtersAndSort.gender"
          :options="LIST_OPTIONS.gender"
        />
        <Select style-class="!w-auto " v-model="filtersAndSort.type" :options="LIST_OPTIONS.type" />
      </div>

      <div @click="handlerSetModal({ type: 'add' })">
        <i
          class="fa-solid fa-user-plus text-base text-primary border cursor-pointer border-grey-2 p-2 rounded-xl hover:bg-slate"
        />
      </div>
    </div>

    <div class="ml-4 h-4 flex gap-x-2">
      <Tag v-for="tags of renderFilterTag" :tagValue="tags.value" @delete-tag="handleDeleteTag">
        <template #content>
          <p class="text-gray-500">Giáo viên {{ tags.text }}</p>
        </template>
      </Tag>
    </div>

    <Table
      :isLoading="isLoading"
      :key-search="filtersAndSort.search"
      @set-modal="handlerSetModal"
      :list-data-table="renderRowTable"
      :column-table="renderColTable"
      :type-table="detailTypeTable"
    />
    <Pagination :pag="pag" @on-page-changed="handleSortTable" />
  </div>

  <ModalComponent
    :disabled="isDisabledModal"
    :is-inner-modal="innerModal"
    @close-modal="handleClose"
    :is-loading-modal="isLoadingModal"
    :style-modal-box="[
      typeModal.label
        ? 'top-0 right-0 bottom-0'
        : 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
      typeButtonModal.type == 'delete' && '!w-[500px]'
    ]"
  >
    <template #title>
      <p class="text-base text-[#353636] font-bold" v-html="titleModal"></p>
    </template>
    <template #content v-if="typeModal.label">
      <h3 class="text-red-400 font-bold text-center my-2" v-if="errors['error']">
        {{ errors['error'] }}
      </h3>

      <div class="mt-4">
        <Field :class="'flex justify-center'">
          <filed-image
            :disabled="isDisabledModal"
            v-model="valueForm.avatar"
            type="file"
            :error="errors.avatar"
            styleByClass="w-40 h-40 rounded-full max-md:!w-50 max-md:!h-50"
          />
        </Field>
        <div class="w-auto px-10 flex gap-x-10 flex-wrap">
          <div
            v-for="(label, key) of typeModal.label"
            :key="key"
            :class="`${key === 'note' || key === 'contracts' ? 'w-[calc(50%-20px)]' : 'w-[30%]' || (key === 'avatar' && '!hidden')}`"
          >
            <template v-if="key !== 'avatar'">
              <Field
                v-if="key !== 'avatar'"
                :label="label.text"
                :error="errors[key]"
                :required="label.required"
              >
                <Select
                  v-model="valueForm[key]"
                  :options="LIST_OPTIONS[key]"
                  :invalid="errors[key]"
                  v-if="LIST_OPTIONS.hasOwnProperty(key)"
                  :disabled="isDisabledModal || label.disabled"
                  :style-class="`${label.disabled && '!bg-[#b9b8b8]'} w-full`"
                />
                <Input
                  v-model="valueForm[key]"
                  type="date"
                  :invalid="errors[key]"
                  v-else-if="key === 'dateOfBirth'"
                  :disabled="isDisabledModal || label.disabled"
                  :style-class="`${label.disabled && '!bg-[#b9b8b8]'} w-full`"
                  @clearError="handleClearError(someField)"
                />
                <TextareaVue
                  type="date"
                  v-model="valueForm[key]"
                  :invalid="errors[key]"
                  v-else-if="key === 'note'"
                  :disabled="isDisabledModal || label.disabled"
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
                  type="text"
                  v-model="valueForm[key]"
                  :invalid="errors[key]"
                  :disabled="isDisabledModal || label.disabled"
                  :style-class="`${label.disabled && '!bg-[#b9b8b8]'} w-full`"
                />
              </Field>
            </template>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="w-full flexAround py-3 border-t border-gray-200">
        <Button
          :by-style-class="`${typeButtonModal.type == 'delete' ? 'bg-[#417bfa] hover:bg-[#1159f8eb]' : 'bg-[#93b1f3eb] hover:bg-[#1159f8eb] '} w-2/5 py-2 rounded-md text-base   text-white`"
          @click="handleClose"
          >Đóng</Button
        >
        <Button
          v-if="detailTypeTable !== 'users'"
          :by-style-class="`${typeButtonModal.type == 'delete' ? 'bg-[#93b1f3eb] hover:bg-[#1159f8eb]' : 'bg-[#417bfa] hover:bg-[#1159f8eb] '} w-2/5 py-2 rounded-md text-base   text-white`"
          id="btnSubmit"
          @click="typeButtonModal.handleActive({ type: typeButtonModal.type })"
        >
          {{ typeButtonModal.label }}
        </Button>
      </div>
    </template>
  </ModalComponent>
</template>
