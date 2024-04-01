<script setup>
import store from '@/store'
import { computed } from 'vue'

const props = defineProps(['pag'])
const emit = defineEmits(['onPageChanged'])

const pag = computed(() => store.state.pagination)

const arr = computed(() => {
  return Array.from({ length: pag.value.totalPages }, (v, i) => i + 1)
})
</script>

<template>
  <div class="flex items-center justify-between bg-white mt-3 px-4 max-md:flex-wrap max-md:gap-y-4">
    <p class="text-base text-gray-700">
      Page
      <span class="font-medium">{{ 1 }}</span>

      <span class="font-medium"> đến {{ pag.totalPages }}</span>
      có
      <span class="font-medium"> {{ pag.total }}</span>
      kết quả
    </p>

    <nav class="isolate inline-flex gap-x-1 rounded-md shadow-sm" aria-label="Pagination">
      <button
        :disabled="!pag.hasPrevPage"
        @click="() => emit('onPageChanged', 1)"
        class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
      >
        <i class="fa-solid fa-chevron-left"></i>
      </button>

      <button
        v-for="(num, index) in arr"
        @click="() => emit('onPageChanged', index + 1)"
        class="rounded-md z-10 inline-flex items-center border border-grey-2 bg-#fff px-4 py-2 text-sm font-semibold text-black focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        :class="
          index === (pag.page - 1 < 0 ? pag.page : pag.page - 1) &&
          'bg-indigo-600 border border-indigo-600  text-while'
        "
      >
        {{ num }}
      </button>
    </nav>
  </div>
</template>

<style lang="scss" scoped></style>
