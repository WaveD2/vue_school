<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: [String, Number, Array, Object],
  required: Boolean,
  invalid: [Boolean, String],
  styleClass: String,
  options: [Array],
  disabled: Boolean,
  valueDefault: Object
})

const emit = defineEmits(['update:modelValue'])

const isOptionsExpanded = ref(false)

const setOption = (value) => {
  isOptionsExpanded.value = false
  emit('update:modelValue', value)
}
</script>

<template>
  <div id="select-container" class="flexCenter">
    <div
      class="relative w-32 text-base z-10"
      :class="[props.invalid ? 'border-error' : 'border-slate', props.disabled && 'bg-[#f5f6fa]']"
    >
      <button
        class="flexBetween px-3 py-2 w-full border border-gray-200 rounded-lg"
        :class="isOptionsExpanded && 'border-blue-300'"
        @click="isOptionsExpanded = !isOptionsExpanded"
        @blur="isOptionsExpanded = false"
        :disabled="props.disabled"
      >
        <span v-if="modelValue && typeof modelValue === 'string'">{{
          options.find((item) => item.value === modelValue).text
        }}</span>
        <span v-else-if="modelValue && typeof modelValue === 'number'">{{
          options[modelValue].text
        }}</span>
        <span v-else>{{ options[0]?.text }}</span>

        <div class="flex items-center">
          <!-- <svg
            fill="#333333"
            viewBox="-3.5 0 19 19"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 transform transition-transform duration-200 ease-in-out"
            stroke="#333333"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z"
              ></path>
            </g>
          </svg> -->

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
          class="absolute left-0 right-0 mb-4 bg-white divide-y rounded-lg shadow-lg overflow-hidden"
        >
          <li
            v-for="(item, index) in options"
            :required="props.required"
            :key="index"
            class="px-3 py-2 transition-colors cursor-pointer duration-300 hover:bg-gray-200"
            :class="item.value === '' && '!hidden'"
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
