<template>
  <div class="relative py-3 sm:max-w-xl sm:mx-auto">
    <div class="group cursor-pointer relative inline-block">
      <span @hover="showTooltip" @mouseenter="showTooltip" @mouseleave="hideTooltip">
        <slot></slot>
      </span>

      <div
        v-if="isTooltipVisible"
        class="opacity-0 top-0 left-1/2 transform -translate-x-1/2 -translate-y-full min-w-14 w-full bg-gray-300 text-gray-700 font-bold text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 px-3 pointer-events-none"
      >
        <slot name="tooltip-content"></slot>
        <svg
          class="absolute text-black h-2 w-full left-0 top-full"
          x="0px"
          y="0px"
          viewBox="0 0 255 255"
          xml:space="preserve"
        >
          <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
        </svg>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const isTooltipVisible = ref(false)

const showTooltip = () => {
  isTooltipVisible.value = true
}

const hideTooltip = () => {
  isTooltipVisible.value = false
}
</script>
