<script setup>
import { computed } from 'vue'
import LoadingComponent from './LoadingComponent.vue'

const props = defineProps({
  isInnerModal: Boolean,
  styleModalContainer: {
    type: String,
    default: 'top-0 right-0 bottom-0'
  },
  styleModalBox: {
    type: String,
    default: 'top-0 right-0 left-0'
  },
  placeholder: {
    type: String,
    default: 'Mô tả...'
  },
  isLoadingModal: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['closeModal'])

const isInner = computed(() => props.isInnerModal)

const handleClose = () => {
  emit('closeModal')
}
</script>
<!--  @click.self="handleClose" -->
<template>
  <LoadingComponent :is-loading="props.isLoadingModal" />
  <!-- top-0 right-0 left-0 -->
  <div
    id="crud-modal"
    aria-hidden="true"
    class="gap-3 items-center w-full md:inset-0 max-h-full fixed z-50 bg-[#3f373787]"
    :class="[props.styleModalContainer, !isInner && 'hidden']"
  >
    <div class="absolute z-50 w-full max-w-6xl max-h-full" :class="props.styleModalBox">
      <div
        class="relative overflow-y-scroll flex flex-col h-full w-full bg-white rounded-lg shadow dark:bg-gray-700"
      >
        <!-- Modal header -->
        <div
          class="flex items-center justify-between md:px-10 md:py-5 border-b rounded-t dark:border-gray-600"
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
        <div class="flex-1">
          <slot name="content" />
        </div>

        <!-- footer -->
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style>
.absoluteRight {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
}
</style>
computed,
