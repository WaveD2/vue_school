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
import { GENDER, LABEL_MODAL_DETAIL_TEACHER } from '@/utils/constants'
import Pagination from '@/components/Pagination.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

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
const isActiveUpdate = ref(null)

const valueForm = ref({})
const rowTableRender = ref([])
const colTableRender = ref({})

const sortCurrent = reactive(sort)
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

const handleSearch = () => {
  console.log('se', sortCurrent)
}

const handleCreate = () => {
  console.log('renderRowTableRender.value', renderRowTableRender.value)
  typeModal.type === 'add'
  typeModal.value = typeModal.label = LABEL_MODAL_DETAIL_TEACHER
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
</script>

<template>
  <router-view @getDataTable="handleSetDataRender" />
  <LoadingComponent :isLoading="isLoading" />
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
    isInnerModal="innerModal"
    @close-modal="handleClose"
  >
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
    v-if="typeModal.type === 'delete'"
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
<!-- v-for="keyFrom in valueForm" -->
