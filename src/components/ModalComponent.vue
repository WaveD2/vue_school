<script setup>
import { onMounted, computed, ref } from 'vue'

const props = defineProps(['isInnerModal', 'styleModalContainer'])
const emit = defineEmits(['closeModal'])

const isInner = computed(() => props.isInnerModal)

const handleClose = () => {
  isInner.value = false
  emit('closeModal')
}
</script>

<template>
  <div
    @click.self="handleClose"
    id="crud-modal"
    tabindex="-1"
    aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden gap-3 items-center w-full md:inset-0 max-h-full fixed top-0 right-0 left-0 z-50 bg-[#3f373787]"
    :class="!isInner && 'hidden'"
  >
    <div
      class="relativeCenter z-50 p-4 w-full max-w-5xl max-h-full"
      :class="props.styleModalContainer"
    >
      <div class="relative w-full bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <slot name="title"></slot>
          <button
            type="button"
            @click="handleClose"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="crud-modal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Đóng</span>
          </button>
        </div>

        <!-- content -->
        <slot name="content" />

        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style>
.relativeCenter {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
computed,
