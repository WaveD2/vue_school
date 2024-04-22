<script setup>
import { computed, ref, watchEffect } from 'vue'
import LoadingComponent from './LoadingComponent.vue'
import { toastInfo } from '@/utils/function'

const props = defineProps({
  isInnerModal: Boolean,
  styleModalContainer: {
    type: String,
    default: 'top-0 right-0 bottom-0'
  },
  styleModalBox: {
    type: [String, Array],
    default: 'top-0 right-0 left-0'
  },
  placeholder: {
    type: String,
    default: 'Mô tả...'
  },
  isLoadingModal: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  errors: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['closeModal'])

const isInner = computed(() => props.isInnerModal)
const errorMes = computed(() => props.errors)

const handleClose = (e) => {
  if (props.disabled || e.target.id !== 'crud-modal') {
    emit('closeModal')
  }
}

// watchEffect(() => {
//   if (isInner.value && errorMes.value) {
//     toastInfo({ type: 'error', mess: errorMes.value })
//   }
// })
</script>
<template>
  <LoadingComponent :is-loading="props.isLoadingModal" />
  <div
    id="crud-modal"
    aria-hidden="true"
    class="modal_container gap-3 items-center w-full md:inset-0 max-h-full fixed z-50 bg-[#9b9b9b69]"
    :class="[
      props.styleModalContainer,
      isInner ? 'animate-modal-slide-in-right block' : 'animate-modal-slide-out-left hidden'
    ]"
    @click.self="handleClose"
  >
    <div class="absolute z-50 w-full max-w-4xl max-h-full" :class="props.styleModalBox">
      <div
        class="relative overflow-hidden flex flex-col h-full w-full bg-white rounded-lg shadow dark:bg-gray-700"
      >
        <!-- Modal header -->
        <div
          class="flex items-center justify-between px-6 py-5 border-b rounded-t dark:border-gray-600"
        >
          <slot name="title"></slot>
          <button
            @click.prevent="handleClose"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="crud-modal"
          >
            <svg
              type="svg"
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                type="svg"
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
        <div class="flex-1 h-auto overflow-y-scroll">
          <slot name="content" />
        </div>

        <!-- footer -->
        <div class="shadow-md shadow-gray-600">
          <slot name="footer" />
        </div>
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

.modal_container {
  transition: display ease-in-out 0.3s;
}
</style>
