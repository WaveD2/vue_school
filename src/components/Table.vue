<script setup>
import Button from './Button.vue'
import store from '@/store'
import Note from './Note.vue'
import LoadingComponentVue from './LoadingComponent.vue'

import { ref, computed } from 'vue'

const props = defineProps(['listDataTable', 'columnTable', 'keySearch' , 'isLoading' , 'typeTable'])
const emit = defineEmits(['setModal'])

const isLoading = computed(()=> (props.isLoading))
let isActiveAction = ref(null)
const dataRedundancy = ref([])
const typeDefaultTable = ref('')


function updateBInitialValue(newValue) {
  if (dataRedundancy.value.length === 0 || typeDefaultTable.value !==props.typeTable) {
     dataRedundancy.value = newValue
     typeDefaultTable.value= props.typeTable
  }
  return newValue.length > 0 ? newValue : dataRedundancy.value
}

const renderRowTable = computed(() => updateBInitialValue(props.listDataTable))
const renderColTable = computed(() => props.columnTable)
const keyColTable = computed(() => Object.keys(renderColTable.value))
 

const handleActiveAction = (indexRow) => {
  if (indexRow === isActiveAction.value) isActiveAction.value = null
  else isActiveAction.value = indexRow
}

const handleOpenModal = async ({ type, rowTable }) => {
   await store.dispatch('apiDetail', { method : 'GET' , url : props.typeTable , data : rowTable })
  emit('setModal', { type })
  isActiveAction.value = null
}


//  Hight light key words search
const shouldHighlight = (value) => {
  if (!props.keySearch || !value) {
    return false
  }
  return value.toString().toLowerCase().includes(props.keySearch.toLowerCase())
}

const highlightKeyword = (value) => {
  if (!props.keySearch || !value) {
    return value
  }
  const regex = new RegExp(`(${props.keySearch})`, 'ig')
  return value.toString().replace(regex, '<span class="bg-[#5bdbc3]  rounded text-gray-200">$1</span>')
}
</script>

<template>
  <div class="flex flex-wrap mx-3 relative">
    <LoadingComponentVue 
      v-if="isLoading || renderRowTable?.length <= 0 || Object.keys(renderColTable).length <= 0"
     :isLoading="isLoading || renderRowTable?.length <= 0 || Object.keys(renderColTable).length <= 0 "
      />

    <div class="mx-auto w-full" >
      <div
        class="relative flex-auto flex flex-col break-words min-w-0 bg-clip-border rounded-xl bg-white m-1"
      >
        <div
          class="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30"
        >
          <div class="min-h-[calc(100vh-14rem)] w-full p-2  overflow-y-scroll max-h-[calc(100vh-14rem)]" >
            <table class="w-full my-0 align-middle text-text border-neutral-200" 
            v-if="Object.keys(renderColTable).length > 0"> 

            <!-- Col -->
              <thead class="align-bottom" >
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

              <!-- Row -->
              <tbody class="w-full" v-if="renderRowTable.length > 0">
                <tr
                  class="border-b py-2 border-dashed bg-slate rounded-lg cursor-pointer hover:bg-blue-200"
                  v-for="(rowTable, i) in renderRowTable"
                  :key="i"
                >
                  <td
                    class=""
                    v-for="key of keyColTable"
                    @click="handleOpenModal({ type: 'detail', rowTable })"
                  >
                    <div class="flex justify-center">
                      <p
                        class="mb-1 font-semibold transition-colors duration-200 ease-in-out text-base text-secondary-inverse hover:text-primary"
                      >
                       
                        <Note v-if="key === 'status' || key === 'gender'">
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

                        <span v-else-if="shouldHighlight(rowTable[key])">
                          <strong v-html="highlightKeyword(rowTable[key])"</strong>
                        </span>
                        
                        <span v-else>{{ rowTable[key] }}</span>


                      </p>
                    </div>
                  </td>


                  <!-- Button Action -->
                  <td class="p-2 pl-0 text-center relative  "  >
                    <Button
                      left-icon="fa-solid fa-ellipsis text-sm align-center"
                      @click="handleActiveAction(i)"
                      :class="isActiveAction === i && '!bg-primary !max-h-10  !text-#'"
                    />
                    <div
                      v-if="isActiveAction === i"
                      class="flexCol max-w-32 w-full  absolute border bg-while border-grey-2 rounded-md z-[99] left-0  p-1"
                    >
                      <Button
                        byStyleClass="!text-black !text-sm !w-full !bg-slate py-2 my-1 hover:!bg-[#74a5fc] "
                        @click="handleOpenModal({ type: 'detail', rowTable })"
                        >Chi tiết</Button
                      >

                      <Button
                        byStyleClass="!text-black !text-sm !w-full !bg-slate py-2 my-1   hover:!bg-[#74a5fc] "
                        @click="handleOpenModal({ type: 'update', rowTable })"
                        >Sửa</Button
                      >
                      <Button
                        byStyleClass="!text-black !text-sm !w-full !bg-slate py-2 my-1 hover:!bg-[#74a5fc] "
                        @click="handleOpenModal({ type: 'delete', rowTable })"
                        >Xóa</Button
                      >
                    </div>
                  </td>

                </tr>
              </tbody>
              
            </table>
        
          </div>
        </div>
      </div>
    </div>
  

  </div>

</template>
 