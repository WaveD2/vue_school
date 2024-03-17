<script setup>
import Button from './Button.vue'
import { getByGender, getTimeYear, toastInfo } from '@/utils/function'
import store from '@/store'

import { ref, onMounted, reactive, watch, computed, render, toRefs } from 'vue'

const props = defineProps(['listDataTable', 'columnTable'])
console.log('props', props)

const keyColTable = Object.keys(props.columnTable)

const emit = defineEmits(['setModal'])

let isActiveAction = ref(null)

const renderRowTable = computed(() => props.listDataTable)
const renderColTable = computed(() => props.columnTable)

const handleActiveAction = (indexRow) => {
  if (indexRow === isActiveAction.value) isActiveAction.value = null
  else isActiveAction.value = indexRow
}

const handleOpenModal = async ({ type, rowMyClass }) => {
  console.log('row', rowMyClass)
  if (type === 'detail') {
    if (rowMyClass.role) {
      await store.dispatch('setDetailParent', { id: rowMyClass.id })
    } else {
      await store.dispatch('setDetailStudent', { id: rowMyClass.id })
    }
  }
  emit('setModal', { rowMyClass, type })
  isActiveAction.value = null
}
</script>

<template>
  <div class="flex flex-wrap mx-3">
    <div class="w-full max-w-full mx-auto">
      <div
        class="relative flex-auto flex flex-col break-words min-w-0 bg-clip-border rounded-xl bg-white m-2"
      >
        <div
          class="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30"
        >
          <div class="w-full p-4 pt-3 px-2 overflow-scroll max-h-[70vh]">
            <table class="w-full my-0 align-middle text-text border-neutral-200">
              <thead class="align-bottom" v-if="keyColTable.length > 0">
                <tr class="font-semibold text-lg text-secondary-dark bg-grey-2">
                  <th
                    class="py-3 text-center min-w-[175px]"
                    v-for="(col, index) of renderColTable"
                    :key="index"
                  >
                    {{ col }}
                  </th>

                  <th class="py-3 text-center min-w-[175px]">Tùy chọn</th>
                </tr>
              </thead>
              <tbody class="w-full" v-if="renderRowTable?.length > 0">
                <tr
                  class="border-b border-dashed bg-slate rounded-lg hover:bg-blue-200"
                  v-for="(rowMyClass, i) in renderRowTable"
                  :key="i"
                >
                  <td
                    class="p-3 pl-2"
                    v-for="key of keyColTable"
                    @click="handleOpenModal({ type: 'detail', rowMyClass })"
                  >
                    <div class="flexCenter">
                      <p
                        class="mb-1 font-semibold transition-colors duration-200 ease-in-out text-base text-secondary-inverse hover:text-primary"
                      >
                        {{ rowMyClass[key] }}
                      </p>
                    </div>
                  </td>

                  <td class="p-3 pl-0 text-center relative">
                    <Button
                      left-icon="fa-solid fa-ellipsis text-xl align-center"
                      @click="handleActiveAction(i)"
                      :class="isActiveAction === i && '!bg-primary !text-while'"
                    />
                    <div
                      v-if="isActiveAction === i"
                      class="flexCol absolute border border-grey-2 rounded-md z-[99] left-[20%] right-[20%] bg-linear p-2"
                    >
                      <Button
                        byStyleClass="!w-full !bg-slate py-1"
                        @click="handleOpenModal({ type: 'detail', rowMyClass })"
                        >Xem chi tiết</Button
                      >

                      <Button
                        byStyleClass="!w-full !bg-slate py-1"
                        @click="handleOpenModal({ type: 'update', rowMyClass })"
                        >Sửa</Button
                      >
                      <Button
                        byStyleClass="!w-full !bg-slate py-1"
                        @click="handleOpenModal({ type: 'delete', rowMyClass })"
                        >Xóa</Button
                      >
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              v-if="listDataTable?.length <= 0 || !listDataTable"
              class="block h-80 bg-gray-200 dark:bg-gray-700 w-full"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
<!-- 
  emit('setModal', { type: 'delete' })
 -->
