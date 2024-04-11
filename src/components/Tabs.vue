<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: [String, Number, Array, Object],
  required: Boolean,
  invalid: [Boolean, String],
  styleClass: String,
  tabs: [Array, Object],
  disabled: Boolean,
  valueDefault: [Object, String, Number],
  isActive: {
    type: [String, Number],
    default: 0
  }
})

const emit = defineEmits(['update:modelValue'])

const handleChange = (event) => {
  emit('update:modelValue', event.target.value)
}

let isActive = ref(0)
</script>

<template>
  <div>
    <div class="flexStart overflow-x-auto overflow-y-hidden 00 whitespace-nowrap">
      <button
        type="button"
        v-for="(menu, index) in props.tabs"
        :key="menu.key"
        class="h-10 px-4 p text-center text-text bg-transparent dark:border-blue-400 dark:text-blue-300 whitespace-nowrap focus:outline-none transition-colors"
        :class="
          isActive === menu.key ||
          (isActive === index && '!text-active !border-b-active !border-b-2')
        "
        @click="handleChange"
      >
        <p class="text-left">{{ menu.tab }}</p>
      </button>
    </div>

    <slot name="content"></slot>
  </div>
</template>

<style lang="scss" scoped></style>
