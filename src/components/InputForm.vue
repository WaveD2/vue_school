<script setup>
import { ref } from 'vue'

const props = defineProps({
  inputForms: Array,
  modelValue: Object,
  textBtn: String,
  validateForm: () => {}
})
const formData = Object.keys(props.inputForms)

console.log('adđ', props)
console.log('formSetting', props.modelValue)
console.log('formData', formData)
const submitForm = () => {
  emit('saveForm', formData)
}
</script>

<template>
  <div>
    <div class="mb-4" v-for="(field, index) in inputForms">
      <label for="username" class="text-lg block mb-2 text-gray-600">{{ field.label }}</label>
      <input v-model="formData[index]" />
    </div>
    <button @submit="submitForm">{{ props.textBtn }}</button>
  </div>
</template>

<style lang="scss" scoped></style>
