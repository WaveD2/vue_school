<script setup>
import Button from './Button.vue'
import { getByGender, getTimeYear, toastInfo } from '@/utils/function'
import store from '@/store'
import Note from './Note.vue'

import { ref, onMounted, reactive, watch, computed, render, toRefs } from 'vue'

const props = defineProps(['listDataTable', 'columnTable'])
const emit = defineEmits(['setModal'])
console.log('props', props)

let isActiveAction = ref(null)

const renderRowTable = computed(() => props.listDataTable)
const renderColTable = computed(() => props.columnTable)

const keyColTable = computed(() => Object.keys(renderColTable.value))

console.log(renderRowTable, renderColTable, keyColTable)
const handleActiveAction = (indexRow) => {
  if (indexRow === isActiveAction.value) isActiveAction.value = null
  else isActiveAction.value = indexRow
}

const handleOpenModal = async ({ type, rowTable }) => {
  if (type === 'detail' || type === 'update') {
    if (rowTable.role) {
      await store.dispatch('setDetailParent', { id: rowTable.id })
    } else {
      await store.dispatch('setDetailStudent', { id: rowTable.id })
    }
  }
  emit('setModal', { rowTable, type })
  isActiveAction.value = null
}
</script>

<template>
  <div class="flex flex-wrap mx-3">
    <div class="mx-auto">
      <div
        class="relative flex-auto flex flex-col break-words min-w-0 bg-clip-border rounded-xl bg-white m-2"
      >
        <div
          class="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30"
        >
          <div class="min-h-96 w-full p-4 pt-3 overflow-y-scroll px-2 max-h-[70vh]">
            <table class="w-full my-0 align-middle text-text border-neutral-200">
              <thead class="align-bottom" v-if="keyColTable.length > 0">
                <tr class="font-semibold text-base text-secondary-dark bg-grey-2">
                  <th
                    class="py-3 text-center min-w-[120px]"
                    v-for="(col, index) of renderColTable"
                    :key="index"
                  >
                    {{ col }}
                  </th>

                  <th class="py-3 text-center min-w-[120px]">Tùy chọn</th>
                </tr>
              </thead>
              <tbody class="w-full" v-if="renderRowTable?.length > 0">
                <tr
                  class="border-b border-dashed bg-slate rounded-lg cursor-pointer hover:bg-blue-200"
                  v-for="(rowTable, i) in renderRowTable"
                  :key="i"
                >
                  <td
                    class=""
                    v-for="key of keyColTable"
                    @click="handleOpenModal({ type: 'detail', rowTable })"
                  >
                    <div class="flexCenter">
                      <p
                        class="mb-1 font-semibold transition-colors duration-200 ease-in-out text-sm text-secondary-inverse hover:text-primary"
                      >
                        <img
                          v-if="key === 'avatar'"
                          src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
                          alt="John Michael"
                          class="inline-block relative object-coveavatarr object-center !rounded-full w-9 h-9"
                        />
                        <Note v-else-if="key === 'status' || key === 'gender'">
                          <span
                            :class="
                              rowTable[key] === 'male'
                                ? 'bg-blue-300'
                                : rowTable[key] === 'active'
                                  ? 'bg-red-300'
                                  : ' bg-orange'
                            "
                            class="p-1 rounded-md"
                          >
                            {{ rowTable[key] }}
                          </span>
                        </Note>

                        <span v-else>{{ rowTable[key] }}</span>
                      </p>
                    </div>
                  </td>

                  <td class="p-3 pl-0 text-center relative">
                    <Button
                      left-icon="fa-solid fa-ellipsis text-xl align-center"
                      @click="handleActiveAction(i)"
                      :class="isActiveAction === i && '!bg-primary !text-#fff'"
                    />
                    <div
                      v-if="isActiveAction === i"
                      class="flexCol w-full absolute border border-grey-2 rounded-md z-[99] left-0 bg-linear p-2"
                    >
                      <Button
                        byStyleClass="!w-full !bg-slate py-1  hover:!bg-blue-200"
                        @click="handleOpenModal({ type: 'detail', rowTable })"
                        >Chi tiết</Button
                      >

                      <Button
                        byStyleClass="!w-full !bg-slate py-1 hover:!bg-blue-200"
                        @click="handleOpenModal({ type: 'update', rowTable })"
                        >Sửa</Button
                      >
                      <Button
                        byStyleClass="!w-full !bg-slate py-1 hover:!bg-blue-200"
                        @click="handleOpenModal({ type: 'delete', rowTable })"
                        >Xóa</Button
                      >
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              v-if="!renderRowTable"
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
