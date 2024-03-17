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

const rowTableRender = ref([])
const colTableRender = ref({})

const handleSetDataRender = (data) => {
  console.log('data ', data)
  const { colTable, rowTable } = data
  colTableRender.value = colTable
  rowTableRender.value = rowTable

  console.log(colTableRender.value, rowTableRender.value)
}

const renderColTableRender = computed(() => colTableRender.value)
const renderRowTableRender = computed(() => rowTableRender.value)
</script>

<template>
  <router-view @getDataTable="handleSetDataRender" />

  <div class="p-3 bg-background rounded-md max-md:p-0">
    <div
      class="px-9 pt-4 flexBetween min-h-[70px] pb-0 bg-transparent max-md:flex-wrap max-md:gap-y-2"
    >
      <div class="flex items-center gap-x-2">
        <Select style-class="!w-auto !py-1 !h-9" />
        <InputSearch by-style-class="!bg-grey-1 !rounded-md" />
      </div>
      <div>
        <i
          class="fa-solid fa-user-plus text-base text-primary border cursor-pointer border-grey-2 p-2 rounded-xl hover:bg-slate"
        ></i>
      </div>
    </div>

    <Table :list-data-table="renderRowTableRender" :column-table="renderColTableRender" />
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
