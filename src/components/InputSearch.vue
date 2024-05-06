<script setup>
import SearchIcon from './icons/Search.icon.vue'
import ButtonVue from './Button.vue'
const props = defineProps({
  byStyleClass: String,
  modelValue: String,
  placeholder: String
})

const emit = defineEmits(['update:modelValue'])

const handleSearchInput = (event) => {
  return emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div class="relative text-gray-600 w-auto">
    <input
      type="type"
      name="search"
      :value="modelValue"
      :placeholder="placeholder"
      @keyup="handleSearchInput"
      :class="byStyleClass"
      class="pl-3 pr-10 w-full focus:border focus:border-blue-300"
    />
    <ButtonVue byStyleClass="absolute right-0 top-0 mt-3 mr-4">
      <SearchIcon />
    </ButtonVue>
  </div>
</template>
