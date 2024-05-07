<script setup>
import Button from './Button.vue'
import store from '@/store'
import Note from './Note.vue'
import LoadingComponentVue from './LoadingComponent.vue'
import TooltipVue from './Tooltip.vue'

import { ref, computed, watchEffect } from 'vue'
import {LIST_OPTIONS } from '@/constants/options'
 

const props = defineProps(['listDataTable', 'columnTable', 'keySearch' , 'isLoading' , 'typeTable' , 'detailTable'])
const emit = defineEmits(['setModal'])

const isLoading = computed(()=> (props.isLoading))
let isActiveAction = ref(null)
 

const renderRowTable = computed(() =>  props.listDataTable)
const renderColTable = ref(props.columnTable)
 
watchEffect(() => {
  if (props.detailTable) {
    
    renderColTable.value= Object.keys(props.detailTable).reduce((acc, key) => {
     if (props.columnTable.includes(key)) {
       acc[key] = props.detailTable[key].text;
     }
     return acc;
   }, {});
  }
})


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
  return value.toString().replace(regex, '<span class="bg-[#5bdbc3] text-gray-200">$1</span>')
}
</script>

<template>
  <div class="flex flex-wrap mx-3 mt-1 relative">
    <LoadingComponentVue 
      v-if="isLoading"
     :isLoading="isLoading"
      />

    <div class="mx-auto w-full" >
      <div
        class="relative flex-auto flex flex-col bg-inherit rounded-lg border border-zinc-200"
      >
        <div
          class="flex flex-col min-w-0"
        >
          <div class="min-h-[calc(100vh-13.5rem)] w-full overflow-y-scroll h-auto max-h-[calc(100vh-13.5rem)]" >
            <table class="w-full h-full text-base text-left  dark:text-gray-400" 
            v-if="Object.keys(renderColTable).length > 0"> 

            <!-- Col -->
              <thead class="text-sm text-gray-600  font-bold dark:bg-gray-700 dark:text-gray-400" >
                <tr >
                  <th scope="col" class="text-nowrap px-3 py-3.5"
                    v-for="(col) in renderColTable"
                    :key="col"
                  >
                      {{
                        col
                      }}
                  </th>

                  <th scope="col" class="   text-right" v-if="props.typeTable !== 'users'"
                  ></th>
                </tr>
              </thead>

              <!-- Row -->
              <tbody class="w-full" v-if="renderRowTable.length > 0" >
                <tr
                  class="bg-white cursor-pointer border-y  border-gray-200 hover:bg-slate"
                  v-for="(rowTable, i) in renderRowTable"
                  :key="i"
                >
                <td
                class="text-nowrap px-3 py-3.5"
                v-for="(label , key) in renderColTable"
                @click.self="handleOpenModal({ type: 'detail', rowTable })"
                >
 

                <TooltipVue> 
                    <div class="flex ">
                      <p class="text-sm">
                        <Note v-if="Array.isArray(LIST_OPTIONS[key]) "> 
                          <span
                            :class="
                            key === 'status' &&
                                 rowTable[key] === 'active'
                                  ? 'bg-blue-300'
                                  : 'bg-gray-300'
                            "
                            class="p-1 rounded-md"
                          >
                          {{
                             LIST_OPTIONS[key]
                                .find(item => item.value === rowTable[key])?.text
                           }}
                          </span>
                        </Note>
                        <span v-else-if="shouldHighlight(rowTable[key])">
                          <span class="" v-html="highlightKeyword(rowTable[key])"</span>
                        </span>
                        
                        <span v-else>{{ rowTable[key] }}</span>
                      </p>
                    </div>

                     <template v-slot:tooltip-content> 
                      <span class="text-nowrap">{{ rowTable[key] }}</span>
                      </template>
                  </TooltipVue>
                  </td>



                  <!-- Button Action -->
                  <td class="px-4 py-3.5  flexEnd gap-x-8 "  v-if="props.typeTable !== 'users'">
                      <Button
                      left-icon="fa-solid fa-pen-to-square text-xl "
                      @click="handleOpenModal({ type: 'update', rowTable })"
                    />

                    <Button
                      left-icon="fa-solid fa-trash text-xl  text-red-500"
                      @click="handleOpenModal({ type: 'delete', rowTable })"
                    />
                  </td>
                </tr>
              </tbody>

              
            </table>
            <div v-if="renderRowTable.length === 0" class="flexCenter w-full min-h-52 border-t border-gray-200">
            <p class="h5 ">Không tìm dữ liệu
              <i class="fa-solid fa-database text-xl  text-[#979797]"></i>
            </p>
            </div>
        
          </div>
        </div>
      </div>
    </div>
  

  </div>

</template>
 
<style scoped>
  
</style>

