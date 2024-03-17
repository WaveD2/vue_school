<script setup>
import store from '@/store'
import { ref } from 'vue'

const props = defineProps({
  modelValue: [String, Number, Array, Object]
})

const emit = defineEmits(['update:modelValue'])

const pag = store.state.pagination

// pag từ current cha
const isPag = props.modelValue ? props.modelValue : 0
console.log('isPage', pag)
const isPagActive = ref(isPag)

const handleChangePagination = ({ type, numPag }) => {
  switch (type) {
    case 'increase':
      if (isPagActive.value < 3) return (isPagActive.value += 1)

      break
    case 'diminish':
      if (isPagActive.value > 0) return (isPagActive.value -= 1)
      break

    case 'pagination':
      isPagActive.value = numPag

      break
    default:
      break
  }
  emit('update:modelValue', isPagActive.value)
  console.log('pag', isPagActive.value)
}
</script>

<template>
  <div
    class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 max-md:flex-wrap max-md:gap-y-4"
  >
    <p class="text-base text-gray-700">
      Page
      <span class="font-medium">{{ pag.page || 1 }}</span>
      đến
      <span class="font-medium">{{ Math.round(pag.page / pag.limit) || 1 }}</span>
      có
      <span class="font-medium">{{ pag.total || 1 }}</span>
      kết quả
    </p>

    <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
      <button
        :disabled="isPagActive === 0"
        @click="handleChangePagination({ type: 'diminish' })"
        class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
      >
        <i class="fa-solid fa-chevron-left"></i>
      </button>

      <button
        v-for="(num, index) in [1, 2, 3, 4]"
        @click="handleChangePagination({ type: 'pagination', numPag: index })"
        class="relative z-10 inline-flex items-center border border-grey-2 bg-#fff px-4 py-2 text-sm font-semibold text-black focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-2"
        :class="isPagActive === index && 'bg-indigo-600 border border-indigo-600'"
      >
        {{ num }}
      </button>

      <button
        :disabled="isPagActive === 3"
        @click="handleChangePagination({ type: 'increase' })"
        class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
      >
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </nav>
  </div>
</template>

<style lang="scss" scoped></style>
<!-- 
            :disabled="!pag.hasPrevPage"
            :disabled="!pag.hasNextPage"


 -->
