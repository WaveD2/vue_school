<script setup>
import { ref } from 'vue'

const props = defineProps({
  id: [String, Number],
  modelValue: [String, Number, Array, Object],
  required: Boolean,
  invalid: [Boolean, String],
  styleClass: String,
  options: [Array],
  disabled: Boolean,
  valueDefault: Object,
  isInnerLabel: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'clearError'])

const isOptionsExpanded = ref(false)
const isLabel = ref(props.isInnerLabel)

const setOption = (value) => {
  isOptionsExpanded.value = false
  isLabel.value = true
  emit('update:modelValue', value)
  emit('clearError', props.id)
}
</script>

<template>
  <div id="select-container" class="flexCenter" :class="styleClass">
    <div
      class="relative text-base z-10 w-full h-full"
      :class="[invalid ? 'border-error' : 'border-slate', disabled && 'bg-[#f5f6fa]']"
    >
      <button
        class="flexBetween gap-x-2 px-3 py-2 w-full h-full border border-gray-200 rounded-lg"
        :class="isOptionsExpanded && 'border-blue-300'"
        @click="isOptionsExpanded = !isOptionsExpanded"
        @blur="isOptionsExpanded = false"
        :disabled="disabled"
      >
        <span v-if="isLabel && modelValue && typeof modelValue === 'string'" class="text-nowrap">{{
          options.find((item) => item.value === modelValue).text
        }}</span>
        <span
          v-else-if="isLabel && modelValue && typeof modelValue === 'number'"
          class="text-nowrap"
          >{{ options[modelValue].text }}</span
        >
        <span v-else-if="isLabel" class="text-nowrap">{{ options[0]?.text }}</span>

        <div class="flex justify-end w-full">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-4 w-4 transform transition-transform duration-200 ease-in-out"
            :class="isOptionsExpanded ? 'rotate-180' : 'rotate-0'"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>
      <transition
        enter-active-class="transform transition duration-500 ease-custom"
        enter-class="-translate-y-1/2 scale-y-0 opacity-0"
        enter-to-class="translate-y-0 scale-y-100 opacity-100"
        leave-active-class="transform transition duration-300 ease-custom"
        leave-class="translate-y-0 scale-y-100 opacity-100"
        leave-to-class="-translate-y-1/2 scale-y-0 opacity-0"
      >
        <ul
          v-show="isOptionsExpanded"
          class="absolute left-0 right-0 mb-4 bg-white divide-y rounded-md shadow-lg overflow-hidden"
        >
          <li
            v-for="(item, index) in options"
            :required="required"
            :key="index"
            class="px-2 py-1 transition-colors cursor-pointer duration-300 hover:bg-gray-300"
            :class="[item.value === '' && '!hidden', item.value == modelValue && 'bg-gray-100']"
            @mousedown.prevent="setOption(item.value)"
          >
            {{ item.text }}
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<style>
.ease-custom {
  transition-timing-function: cubic-bezier(0.61, -0.53, 0.43, 1.43);
}
</style>
