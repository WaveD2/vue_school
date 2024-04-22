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

import { LIST_OPTIONS, FIL_TAB_CONTENT_TEACHER, TAB_CONTENT_TEACHER } from '@/utils/constants'
import { validateTeacher } from '@/utils/validateYub'
import { arrayToObject, filterKeys, filterKeysWithValues, trimInput } from '@/utils/function'
import store from '@/store'
import Tag from '@/components/Tag.vue'
import Tabs from '@/components/Tabs.vue'
import Checkbox from '@/components/Checkbox.vue'

const route = useRoute()
const router = useRouter()

const innerModal = ref(false)
const isLoading = ref(false)
const isLoadingModal = ref(false)
const isDisabledModal = ref(false)
const errors = ref({})

const valueForm = ref(null)
const renderColTable = ref()
const renderFilterTag = ref([])
const isChangeTab = ref(false)
const valueModal = ref({})

const detailTypeTable = ref('')

const pag = computed(() => store.state.pagination)
const renderRowTable = computed(() => store.state.listUser)

const filtersAndSort = reactive({
  search: ''
})
const settingTable = reactive([
  {
    title: 'Mặc định',
    // sort typeof Array ['gender', 'status', 'type'],
    sort: [],

    // filed typeof Object {key : value}
    filed: [],
    key: 0
  }
])

const isActiveSetting = reactive({
  keyActive: 0,
  filedActive: 'filed'
})

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

const activeSetting = reactive({
  indexSettingTable: 0,
  sort: [],
  filed: []
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

const handleSetDataRender = (data) => {
  const { colTable, labelModalDetail, valueModalDetail, typeTable, sortTable, filterSelect } = data
  valueModal.value = valueModalDetail
  typeModal.optionSelect = labelModalDetail
  settingTable[isActiveSetting.keyActive].filed = colTable
  activeSetting.filed = colTable
  detailTypeTable.value = typeTable

  if (sortTable) {
    settingTable[isActiveSetting.keyActive].sort = sortTable
    activeSetting.sort = sortTable
  }

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
    typeButtonModal.label = 'Xóa người dùng'
    typeButtonModal.handleActive = handleClickForm
  }
  typeModal.isInner = true
}

const handleClose = () => {
  typeModal.isInner = false
  isLoading.value = false
  errors.value = {}
  valueForm.value = null
  errors.value = {}
  activeSetting.indexSettingTable = isActiveSetting.keyActive
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

const handleDeleteTag = (tagDelete) => {
  for (let key in filtersAndSort) {
    if (filtersAndSort[key] === tagDelete) {
      filtersAndSort[key] = ''
    }
  }
}

const handleSettingTable = () => {
  typeModal.label = 'Cài đặt'
  typeModal.isInner = true
  typeModal.type = 'add'
  typeButtonModal.handleActive = handleCreateSetting
  typeButtonModal.label =
    settingTable[isActiveSetting.keyActive].filed.length === 0 ? 'Tạo cài đặt' : 'Lưu cài đặt'
  activeSetting.sort = settingTable[isActiveSetting.keyActive].sort
  activeSetting.filed = settingTable[isActiveSetting.keyActive].filed
}

const handleCreateSetting = () => {
  if (activeSetting.filed.length >= 4) {
    isActiveSetting.keyActive = activeSetting.indexSettingTable
    settingTable[activeSetting.indexSettingTable].filed = activeSetting.filed
    settingTable[activeSetting.indexSettingTable].sort = activeSetting.sort

    handleClose()
  } else {
    return (errors.value = { error: 'Cài đặt trường dữ liệu tối thiểu 4 trường ' })
  }
}
const handleChangeSetting = (key) => {
  activeSetting.indexSettingTable = key
  activeSetting.sort = settingTable[key]?.sort
  activeSetting.filed = settingTable[key]?.filed
  typeButtonModal.label = settingTable[key]?.filed.length === 0 ? 'Tạo cài đặt' : 'Lưu cài đặt'
}

const handleChangeNameTag = (event, key) => {
  if (event.target.classList.contains('fa-pen-to-square') && event.target) {
    handleChangeSetting(key)
    isChangeTab.value = true
    setTimeout(() => {
      document.querySelectorAll('input')[activeSetting.indexSettingTable + 1].focus()
    }, 0)
  } else {
    isChangeTab.value = false
  }
}

const handleChangeSettingOption = (newOption) => {
  const uniqueOptions = new Set(activeSetting[isActiveSetting.filedActive])

  if (uniqueOptions.has(newOption)) {
    uniqueOptions.delete(newOption)
  } else {
    uniqueOptions.add(newOption)
  }

  activeSetting[isActiveSetting.filedActive] = Array.from(uniqueOptions)
}

const handleDeleteNameTag = (key) => {
  if (key === activeSetting.indexSettingTable) {
    if (key > 0) {
      activeSetting.indexSettingTable--
      isActiveSetting.keyActive--
    } else {
      activeSetting.indexSettingTable++
      isActiveSetting.keyActive++
    }
  } else {
    if (key < activeSetting.indexSettingTable) {
      activeSetting.indexSettingTable--
    }
  }

  settingTable.splice(key, 1)
  activeSetting.filed = settingTable[activeSetting.indexSettingTable].filed
  activeSetting.sort = settingTable[activeSetting.indexSettingTable].sort
}
const handleCreateOptionSetting = () => {
  const newOptionSetting = {
    title: `Tạo mới ${settingTable.length}`,
    // sort typeof Array ['gender', 'status', 'type'],
    sort: [],
    // filed typeof Object ['gender']
    filed: [],
    key: settingTable.length
  }
  return settingTable.push(newOptionSetting)
}
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
          by-style-class="h-10   bg-slate-100 !rounded-md border border-neutral-300"
        />
        <div v-for="key in settingTable[isActiveSetting.keyActive].sort">
          <Select
            v-if="Array.isArray(LIST_OPTIONS[key])"
            style-class="!w-auto"
            v-model="filtersAndSort[key]"
            :options="LIST_OPTIONS[key]"
          />
        </div>
      </div>

      <div class="flex gap-x-2">
        <div>
          <Select
            style-class="!w-auto"
            v-model="filtersAndSort['gender']"
            :options="LIST_OPTIONS['gender']"
          />
        </div>

        <div @click="handleSettingTable">
          <i
            class="fa-solid fa-gear text-base text-primary border cursor-pointer border-grey-2 p-2 rounded-xl hover:bg-slate"
          />
        </div>
        <div @click="handlerSetModal({ type: 'add' })">
          <i
            class="fa-solid fa-user-plus text-base text-primary border cursor-pointer border-grey-2 p-2 rounded-xl hover:bg-slate"
          />
        </div>
      </div>
    </div>

    <!-- Tag filter -->
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
      :column-table="settingTable[isActiveSetting.keyActive].filed"
      :type-table="detailTypeTable"
      :detailTable="typeModal.optionSelect"
    />
    <Pagination :pag="pag" @on-page-changed="handleSortTable" />
  </div>

  <ModalComponent
    :errors="errors['error']"
    :disabled="isDisabledModal"
    :is-inner-modal="typeModal.isInner"
    @close-modal="handleClose"
    :is-loading-modal="isLoadingModal"
    :style-modal-box="[
      typeModal.optionSelect && typeModal.type !== 'delete'
        ? 'top-0 right-0 bottom-0'
        : 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 !w-[500px]'
    ]"
  >
    <template #title>
      <p class="text-lg text-[#353636] font-bold" v-html="typeModal.label"></p>
    </template>

    <!-- Modal Content -->
    <template #content>
      <!-- This info detail table -->
      <div class="mt-2" v-if="typeModal.optionSelect && valueForm">
        <Field :class="'flex justify-center'">
          <filed-image
            type="file"
            :disabled="isDisabledModal"
            v-model="valueForm.avatar"
            :error="errors.avatar"
            styleByClass="w-40 h-40 rounded-full max-md:!w-50 max-md:!h-50"
          />
        </Field>
        <div class="w-auto px-10 flex gap-x-10 flex-wrap" id="wrapper-add-input">
          <div
            v-for="(label, key) of typeModal.optionSelect"
            :key="key"
            :class="`${key === 'note' || key === 'contracts' ? 'w-[calc(50%-20px)]' : 'w-[30%]' || (key === 'avatar' && '!hidden')}`"
          >
            <template v-if="key !== 'avatar'">
              <Field
                v-if="key !== 'avatar' && key !== 'search'"
                :label="label.text"
                :error="errors[key]"
                :required="label.required"
              >
                <Select
                  v-model="valueForm[key]"
                  :options="LIST_OPTIONS[key]"
                  :invalid="errors[key]"
                  v-if="LIST_OPTIONS.hasOwnProperty(key) && Array.isArray(LIST_OPTIONS[key])"
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
                  v-else-if="key !== 'avatar' && key !== 'search'"
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

      <!-- Config setting table - filter -->

      <!--  -->
      <section
        class="mt-2 px-6 flex gap-x-6 h-[95%]"
        v-if="typeModal.optionSelect && !valueForm && typeModal.type !== 'delete'"
      >
        <div class="min-w-max max-w-52 overflow-hidden border-2 border-r-gray-300 mt-9 rounded-md">
          <Button
            byStyleClass="p-2 w-full text-center cursor-pointer hover:bg-blue-200 tr"
            @click="handleCreateOptionSetting"
          >
            <p class="text-base py-2 font-normal">
              Tạo mới <i class="fa-solid fa-plus text-[#15ade3] ml-2"></i>
            </p>
          </Button>
          <div v-for="(setting, key) in settingTable">
            <Button
              @click.self="handleChangeSetting(setting.key)"
              :id="setting.key"
              :byStyleClass="`p-2 w-full flex items-center gap-x-4  border border-b-gray-200 cursor-pointer ${setting.key == activeSetting.indexSettingTable && 'bg-gray-200'} `"
            >
              <Input
                @onClick="handleChangeSetting(setting.key)"
                type="text"
                :id="setting.key"
                v-model="setting.title"
                :styleClass="`border-transparent w-min ${setting.key == activeSetting.indexSettingTable && isChangeTab && ' !border-gray-200 !bg-white'} `"
                :focus="setting.key === activeSetting.indexSettingTable && isChangeTab"
                :disabled="setting.key !== activeSetting.indexSettingTable || !isChangeTab"
              />
              <i
                class="fa-regular fa-pen-to-square text-[#15ade3] text-base"
                @click.self="handleChangeNameTag($event, setting.key)"
              ></i>
              <i
                class="fa-regular fa-trash-can text-red-500 text-base"
                @click.self="handleDeleteNameTag(setting.key)"
              ></i>
            </Button>
          </div>
        </div>
        <div>
          <!-- Tabs component -->
          <Tabs
            @change-tab="(newTab) => (isActiveSetting.filedActive = newTab)"
            :is-active="isActiveSetting.filedActive"
            :tabs="TAB_CONTENT_TEACHER"
          />

          <!--Tabs Content -->
          <div class="px-3">
            <div class="pt-1" v-for="tabContent in FIL_TAB_CONTENT_TEACHER">
              <p class="text-base" v-if="isActiveSetting.filedActive === 'filed'">
                {{ tabContent.label }} :
              </p>

              <div class="flex gap-4 flex-wrap mt-4">
                <template v-for="(label, key) of typeModal.optionSelect">
                  <div
                    class="w-auto"
                    v-if="
                      key !== 'avatar' &&
                      key !== 'contact' &&
                      label.type === tabContent.key &&
                      !!label?.group?.includes(isActiveSetting.filedActive)
                    "
                  >
                    <Field
                      :label="label.text"
                      styleClass="flex items-center gap-x-4  flex-row-reverse py-1 pr-3 border border-gray-200 bg-[#ccc] rounded-md "
                    >
                      <Input
                        #content
                        @on-update-value-check-box="handleChangeSettingOption"
                        type="checkbox"
                        :checked="!!activeSetting[isActiveSetting.filedActive].includes(key)"
                        styleClass="w-[18px] h-[18px]"
                        :keyInput="key"
                      />
                    </Field>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>

    <!-- Footer Modal -->
    <template #footer>
      <div class="w-full flexAround py-3 border-t border-gray-200">
        <Button
          :by-style-class="`${typeModal.type == 'delete' ? 'bg-[#417bfa] hover:bg-[#1159f8eb]' : 'bg-[#93b1f3eb] hover:bg-[#1159f8eb] '} w-1/4 py-2 rounded-md text-base   text-white`"
          @click="handleClose"
          >Đóng</Button
        >
        <Button
          v-if="detailTypeTable !== 'users' && typeButtonModal.label"
          :by-style-class="`${typeModal.type == 'delete' ? 'bg-[#93b1f3eb] hover:bg-[#1159f8eb]' : 'bg-[#417bfa] hover:bg-[#1159f8eb] '} w-1/4 py-2 rounded-md text-base   text-white`"
          id="btnSubmit"
          @click="typeButtonModal.handleActive({ type: typeModal.type })"
        >
          {{ typeButtonModal.label }}
        </Button>
      </div>
    </template>
  </ModalComponent>
</template>
