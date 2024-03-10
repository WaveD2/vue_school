<script setup>
const props = defineProps({
  for: String,
  required: Boolean
})
</script>
<template>
  <label class="w-full text-lg block mb-2 text-gray-600" :for="props.for">
    <slot /><span class="text-red-600" v-if="props.required">*</span>
  </label>
</template>
