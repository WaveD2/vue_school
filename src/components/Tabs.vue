<script setup>
import { computed, ref } from 'vue'
import Button from './Button.vue'

const props = defineProps({
  modelValue: [String, Number, Array, Object],
  required: Boolean,
  invalid: [Boolean, String],
  styleClass: String,
  tabs: [Array, Object],
  disabled: Boolean,
  valueDefault: [Object, String, Number],
  isActive: [String, Number]
})

const emit = defineEmits(['changeTab'])

const handleChange = (event) => {
  emit('changeTab', event.target.id)
}
</script>

<template>
  <div class="flex overflow-x-auto overflow-y-hidden 00 whitespace-nowrap transition-all">
    <Button
      v-for="menu of props.tabs"
      type="button"
      :id="menu.key"
      class="h-10 pr-4 mr-1 flexCenter gap-x-2 text-center text-text bg-transparent dark:border-blue-400 dark:text-blue-300 whitespace-nowrap focus:outline-none transition-colors"
      :class="menu.key === props.isActive && '!text-active !border-b-active !border-b-2'"
      @click="handleChange"
      :left-icon="menu.icon"
    >
      <p class="text-left text-base font-semibold" :id="menu.key">{{ menu.tab }}</p>
    </Button>

    <slot name="content"></slot>
  </div>
</template>

<style lang="scss" scoped></style>
