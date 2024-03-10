<script setup>
import { defineEmits, defineProps } from 'vue'
const props = defineProps({
  modelValue: [String],
  required: Boolean,
  invalid: Boolean
})

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file && isImageFile(file)) {
    readAndDisplayImage(file)
  } else {
    console.error('Please select a valid image file (jpg, jpeg, png).')
  }
}

const isImageFile = (file) => {
  const acceptedFormats = ['image/jpeg', 'image/jpg', 'image/png']
  return acceptedFormats.includes(file.type)
}

const readAndDisplayImage = (file) => {
  const reader = new FileReader()
  reader.onload = (event) => {
    imageUrl.value = event.target.result
  }
  reader.readAsDataURL(file)
}
</script>

<template>
  <div class="w-60 h-60 rounded-full border border-grey-3">
    <img v-if="modelValue" :src="modelValue" alt="Uploaded Image" />

    <input type="file" accept="image/*" @change="handleFileChange" />
  </div>
</template>

<style scoped>
/* Thêm các kiểu CSS tùy chọn cho component của bạn */
</style>
