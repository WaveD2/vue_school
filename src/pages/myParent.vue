<script setup>
import Table from '@/components/Table.vue'
import Select from '@/components/Select.vue'
import Label from '@/components/Label.vue'
import InputSearch from '@/components/InputSearch.vue'
import LoadingComponent from '@/components/LoadingComponent.vue'
import ModalComponent from '@/components/ModalComponent.vue'
import { onMounted, computed, ref } from 'vue'
import Field from '@/components/Field.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import store from '@/store'
import { COLUMN_TABLE_USERS } from '@/utils/constants'

const test = ref()
const typeModal = ref()
const valueForm = ref()
const innerModal = ref(true)

onMounted(async () => {
  // if (store.state.listParent.length !== 0) return
  await store.dispatch('getListParent')
})

const listParent = computed(() => {
  return store.getters.getListParent
})

console.log('listUser', listParent)
const handlerSetModal = (data) => {
  console.log('Da', data)
  const { rowStd, type } = data
  typeModal.value = type
  valueForm.value = { ...rowStd }
  innerModal.value = true
}

const handleClose = () => {
  console.log('close ')
  typeModal.value = null
  innerModal.value = false
}
</script>
<template>
  <div class="p-3 bg-background rounded-md max-md:p-0">
    <div
      class="px-9 pt-4 flexBetween min-h-[70px] pb-0 bg-transparent max-md:flex-wrap max-md:gap-y-2"
    >
      <div class="flex gap-x-2">
        <Select styleClass="!w-auto" />
        <InputSearch byStyleClass="!bg-grey-1 !rounded-md" />
      </div>
      <div @click="handlerSetModal({ type: 'add', rowStd: 'waved' })">
        <i
          class="fa-solid fa-user-plus text-base text-primary border cursor-pointer border-grey-2 p-2 rounded-xl hover:bg-slate"
        ></i>
      </div>
    </div>
    <!-- :list-data-table="listUser" -->
    <Table
      @set-modal="handlerSetModal"
      :list-data-table="listParent"
      :column-table="COLUMN_TABLE_USERS"
    />
  </div>

  <!-- Modal -->

  <ModalComponent v-if="typeModal === 'update'" isInnerModal="innerModal" @closeModal="handleClose">
    <template v-slot:title> <p class="h4">Sửa thông tin học sinh</p> </template>
    <template v-slot:content>
      <div class="flex items-center gap-2 flex-wrap m-2 w-auto overflow-hidden">
        <Field label="Email">
          <Input v-model="test" type="email" />
        </Field>
      </div>
    </template>
    <template v-slot:footer>
      <div class="w-full flexAround gap-3 pb-4">
        <Button byStyleClass=" py-1 px-5">Hủy</Button>
        <Button byStyleClass=" py-1 px-5 bg-blue-300">Cập nhật</Button>
      </div>
    </template>
  </ModalComponent>

  <!-- Modal Add -->
  <ModalComponent v-if="typeModal === 'add'" isInnerModal="innerModal" @closeModal="handleClose">
    <template v-slot:title> <p class="h4">Thêm học sinh</p> </template>
    <template v-slot:content>
      <div class="flex items-center gap-2 flex-wrap m-2 w-auto overflow-hidden">
        <Field label="Email">
          <Input v-model="test" type="email" />
        </Field>
      </div>
    </template>
    <template v-slot:footer>
      <div class="w-full flexAround gap-3 pb-4">
        <Button byStyleClass=" py-1 px-5">Hủy</Button>
        <Button byStyleClass=" py-1 px-5 bg-blue-300">Cập nhật</Button>
      </div>
    </template>
  </ModalComponent>

  <!-- Xóa user -->
  <ModalComponent v-if="typeModal === 'delete'" isInnerModal="innerModal" @closeModal="handleClose">
    <template v-slot:title> <p class="h4">Xóa học sinh</p> </template>
    <template v-slot:content>
      <div class="flex items-center gap-2 flex-wrap m-2 w-auto overflow-hidden">
        <Field label="Email">
          <Input v-model="test" type="email" />
        </Field>
      </div>
    </template>
    <template v-slot:footer>
      <div class="w-full flexAround gap-3 pb-4">
        <Button byStyleClass=" py-1 px-5">Hủy</Button>
        <Button byStyleClass=" py-1 px-5 bg-blue-300">Xóa</Button>
      </div>
    </template>
  </ModalComponent>
</template>

<style lang="scss" scoped></style>
computed,
