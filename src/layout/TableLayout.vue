<script setup>
import { computed, watchEffect, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Table from '@/components/Table.vue'
import Select from '@/components/Select.vue'
import InputSearch from '@/components/InputSearch.vue'
import debounce from 'lodash.debounce'
import Pagination from '@/components/Pagination.vue'

import { LIST_OPTIONS } from '@/constants/options'
import { validateTeacher } from '@/utils/validateYub'
import {
  arrayToObject,
  filterKeys,
  filterKeysWithValues,
  toastInfo,
  trimInput
} from '@/utils/function'
import store from '@/store'
import Tag from '@/components/Tag.vue'
import ModalDetail from '@/components/ModalDetail.vue'
import { getLocalStorage, setLocalStorage } from '@/axios/setupApi'
import SelectComponent from '@/components/SelectComponent.vue'

const route = useRoute()
const router = useRouter()

const isLoading = ref(false)
const isLoadingModal = ref(false)
const isDisabledModal = ref(false)
const errors = ref({})

const valueForm = ref({})
const renderFilterTag = ref([])

const valueModal = ref({})

const detailTypeTable = ref('')

const pag = computed(() => store.state.pagination)
const renderRowTable = computed(() => store.state.listUser)

const filtersAndSort = reactive({
  search: ''
})

// get value settingTable local store
let settingTable = reactive(
  getLocalStorage('settingTable') || {
    title: 'Mặc định',
    //  typeof Array ['gender', 'status', 'type'],
    filed: [],
    sort: [],
    key: 0
  }
)

const isActiveSetting = reactive(
  getLocalStorage('nameSettingTable') || {
    keyActive: 0,
    filedActive: 'filed',
    listTitleTable: [{ text: 'Mặc định', value: 0 }]
  }
)

const typeModal = reactive({
  isInner: false,
  label: null,
  optionSelect: null,
  type: null
})
const typeButtonModal = reactive({
  type: null,
  label: null,
  handleActive: null
})

watchEffect(() => {
  if (!Object.keys(route.query).length > 0) {
    const page = localStorage.getItem('previousRoute')

    if (page && page !== route.path) {
      for (let keySort in filtersAndSort) {
        filtersAndSort[keySort] = ''
      }
    }
    localStorage.setItem('previousRoute', route.path)
  }
  const resultFilter = filterKeys(route.query, LIST_OPTIONS, Object.keys(LIST_OPTIONS))

  renderFilterTag.value = resultFilter
})

const handleDeleteTag = (tagDelete) => {
  for (let key in filtersAndSort) {
    if (filtersAndSort[key] === tagDelete) {
      filtersAndSort[key] = ''
    }
  }
}

const handleSetDataRender = (data) => {
  const { colTable, labelModalDetail, valueModalDetail, typeTable, sortTable, filterSelect } = data
  valueModal.value = valueModalDetail
  typeModal.optionSelect = labelModalDetail
  if (settingTable.filed.length === 0) {
    settingTable.filed = colTable

    if (sortTable) {
      settingTable.sort = sortTable
    }
  }

  detailTypeTable.value = typeTable
  if (!valueModal.hasOwnProperty('avatar')) valueModal['avatar'] = { url: '' }

  if (filterSelect && Object.keys(filterSelect).length > 0) {
    for (let keySort in filterSelect) {
      filtersAndSort[keySort] = filterSelect[keySort]
    }
  }
  isLoading.value = false
}

watch(
  filtersAndSort,
  (newVal, oldVal) => {
    const newQueryParams = filterKeysWithValues(newVal)

    router.push({ path: route.path, query: newQueryParams })

    handleFilterAndSort()
  },
  { deep: true }
)

//  Modal
const handlerSetModal = ({ type }) => {
  console.log('type', type)
  const currentUserDetail = store.state.infoDetailModal

  if (type === 'detail' || type === 'update') {
    if (type === 'detail') {
      typeModal.label = 'Thông tin chi tiết'
      isDisabledModal.value = true
      typeModal.type = 'update'
      typeButtonModal.label = 'Chỉnh sửa thông tin'
      typeButtonModal.handleActive = handlerSetModal
    } else {
      setTimeout(() => {
        document.getElementById('wrapper-add-input').querySelectorAll('input')[0].focus()
      }, 0)
      typeModal.label = 'Chỉnh sửa thông tin'
      isDisabledModal.value = false
      typeModal.type = type
      typeButtonModal.label = 'Lưu thông tin'
      typeButtonModal.handleActive = handleClickForm
    }

    valueForm.value = currentUserDetail
  } else if (type === 'add') {
    setTimeout(() => {
      document.getElementById('wrapper-add-input').querySelectorAll('input')[0].focus()
    }, 0)
    typeModal.label = 'Tạo thêm người dùng'
    valueForm.value = Object.assign({}, valueModal.value)
    isDisabledModal.value = false
    typeModal.type = type
    typeButtonModal.label = 'Tạo người dùng'
    typeButtonModal.handleActive = handleClickForm
  } else if (type === 'delete') {
    typeModal.label = `Bạn chắc chắn muốn xóa <span style="color:#eb4747">${currentUserDetail.name} </span> `
    typeModal.value = null
    typeModal.type = type
    typeButtonModal.label = 'Xóa'
    typeButtonModal.handleActive = handleClickForm
  }
  typeModal.isInner = true
}

const handleClose = () => {
  typeModal.isInner = false
  isLoading.value = false
  errors.value = {}
  valueForm.value = {}
  errors.value = {}
  typeButtonModal.type = null
  typeButtonModal.label = null
  typeButtonModal.handleActive = null
}

// Search
function handleSortTable(newPage) {
  isLoading.value = true
  filtersAndSort['page'] = newPage
}

// FILTER AND SET URL CURRENT
const handleFilterAndSort = debounce(async () => {
  isLoading.value = true

  if (filtersAndSort.search) {
    filtersAndSort['page'] = 1
  }

  const listParams = {
    url: detailTypeTable.value,
    params: filtersAndSort,
    typeCommitStore: 'SET_LIST_USER_TABLE'
  }

  await store.dispatch('getInfo', listParams)
  const queryParamsString = new URLSearchParams(route.query).toString()

  localStorage.setItem('previousRoute', `${route.path}?${queryParamsString}`)
  isLoading.value = false
}, 500)

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
      typeModal.isInner = false
    }
  }
}, 500)

const handleSettingTable = () => {
  typeModal.label = 'Cài đặt'
  typeModal.isInner = true
  typeModal.type = 'add'
  typeButtonModal.handleActive = handleCreateSetting
  typeButtonModal.type = 'settingTable'
  typeButtonModal.label = settingTable.filed.length === 0 ? 'Tạo cài đặt' : 'Lưu cài đặt'
}

const handleCreateSetting = (listFiled) => {
  const { keyActive, settingTable: dataTable } = listFiled
  const settingActive = dataTable.find((item) => item.key == keyActive)

  if (settingActive.filed.length > 3) {
    settingTable = settingActive
    isActiveSetting.keyActive = keyActive
    isActiveSetting.listTitleTable = dataTable.map((item) => {
      return { text: item.title, value: item.key }
    })

    for (let i = dataTable.length - 1; i >= 0; i--) {
      if (dataTable[i].filed.length < 3) {
        dataTable.splice(i, 1)
      }
    }
    //  reset filters and sort table
    Object.keys(filtersAndSort).forEach((key) => {
      if (key !== 'search') {
        delete filtersAndSort[key]
      }
      filtersAndSort.search = ''
    })

    router.push({ path: route.path, query: '' })

    // save value in local store
    setLocalStorage('settingTable', settingActive)
    // setLocalStorage('previousRoute', `${route.path}`)
    setLocalStorage('nameSettingTable', isActiveSetting)
    setLocalStorage('listSettingTable', dataTable)

    handleClose()
  } else {
    return toastInfo({
      type: 'error',
      mes: 'Trường dữ liệu phải có tối thiểu 4 trường',
      display: 'TOP_RIGHT'
    })
  }
}

watch(isActiveSetting, (newValue, oldValue) => {
  const newSetting = getLocalStorage('listSettingTable').find(
    (item) => item.key == newValue.keyActive
  )
  settingTable = newSetting
  router.push({ path: route.path })
  setLocalStorage('nameSettingTable', newValue)
  setLocalStorage('settingTable', newSetting)
  setLocalStorage('previousRoute', `${route.path}`)
})
</script>

<template>
  <router-view @getDataTable="handleSetDataRender" />

  <!-- Table -->
  <div class="max-md:p-0">
    <div
      class="px-4 flex justify-between h-auto mt-2 mb-1 bg-transparent max-md:flex-wrap max-md:gap-y-2"
      v-if="route.path !== '/users'"
    >
      <div class="flex flex-wrap gap-x-2 w-3/5">
        <InputSearch
          placeholder="Tìm kiếm..."
          v-model="filtersAndSort['search']"
          by-style-class="h-10 bg-slate-100 !rounded-md border border-neutral-300"
        />
        <div v-for="key in settingTable.sort">
          <SelectComponent
            v-if="Array.isArray(LIST_OPTIONS[key])"
            style-class="!w-full h-10"
            v-model="filtersAndSort[key]"
            :options="LIST_OPTIONS[key]"
          />
        </div>
      </div>

      <div class="flex gap-x-2">
        <SelectComponent
          style-class="!w-auto h-10"
          v-model="isActiveSetting.keyActive"
          :options="isActiveSetting.listTitleTable"
        />

        <div @click="handleSettingTable">
          <i
            class="fa-solid fa-gear text-base text-primary border cursor-pointer border-grey-2 p-2 rounded-md hover:bg-slate"
          />
        </div>
        <div @click="handlerSetModal({ type: 'add' })">
          <i
            class="fa-solid fa-user-plus text-base text-primary border cursor-pointer border-grey-2 p-2 rounded-md hover:bg-slate"
          />
        </div>
      </div>
    </div>

    <!-- Tag filter -->

    <div class="flex items-center gap-x-1 h-4">
      <div v-for="tags of renderFilterTag">
        <div v-for="(value, key) in filtersAndSort">
          <Tag
            v-if="tags.value === value"
            :tagValue="tags.value"
            @delete-tag="handleDeleteTag"
            styleByClass="px-3 bg-blue-200 rounded-md"
          >
            <template #content>
              <p class="text-[10px] mr-2 font-bold uppercase text-blue-700">
                {{ LIST_OPTIONS[key][0].text }} {{ tags.text }}
              </p>
            </template>
          </Tag>
        </div>
      </div>
    </div>

    <Table
      :isLoading="isLoading"
      :key-search="filtersAndSort.search"
      @set-modal="handlerSetModal"
      :list-data-table="renderRowTable"
      :column-table="settingTable.filed"
      :type-table="detailTypeTable"
      :detailTable="typeModal.optionSelect"
    />
    <Pagination :pag="pag" @on-page-changed="handleSortTable" />
  </div>

  <!-- Modal -->

  <modal-detail
    :errors="errors"
    :is-disabled-modal="isDisabledModal"
    :is-inner-modal="typeModal.isInner"
    @close-modal="handleClose"
    :is-loading-modal="isLoadingModal"
    :style-modal-box="[
      typeModal.optionSelect && typeModal.type !== 'delete'
        ? 'top-0 right-0 bottom-0'
        : 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 !w-[500px]'
    ]"
    :type-modal="typeModal"
    :value-detail-modal="valueForm"
    :typeButtonModal="typeButtonModal"
    :setting-data-table="settingTable"
    :is-active-setting-table="isActiveSetting"
  />
</template>
