<script setup>
import useTransitionState from '../utils/axios'
import { computed, defineEmits, defineProps, onMounted, ref } from 'vue'
import { fetchDoUpLoadFile, toastInfo } from '@/utils/function'

const { callApi } = useTransitionState()
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  id: String,
  modelValue: {
    required: true
  },
  required: Boolean,
  disabled: Boolean,
  styleByClass: String
})
const fileRef = ref()

let imageUrl = ref({ bucket: '', key: '', url: '' })
let imageInner = ref(props.modelValue ? props.modelValue.url : '')

const handleFileChange = async (event) => {
  const file = event.target.files[0]

  if (file && isImageFile(file)) {
    await readAndDisplayImage(file)
  } else {
    toastInfo({ type: 'error', mes: 'Vui lòng chọn ảnh file (jpg, jpeg, png)' })
  }
}

const isImageFile = (file) => {
  const acceptedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
  return acceptedFormats.includes(file.type)
}

const readAndDisplayImage = async (file) => {
  const reader = new FileReader()

  reader.onload = (event) => {
    imageInner.value = event.target.result
  }

  reader.readAsDataURL(file)

  const res = await callApi('attachments/signature', 'POST', { filename: file.name })

  if (res.data) {
    const url = res.data.postURL
    const form = res.data.formData
    await fetchDoUpLoadFile({ url, file, form })

    const { bucket, key } = res.data.formData
    imageUrl.value = {
      bucket,
      key,
      url: res.data.getUrl
    }
    emit('update:modelValue', imageUrl.value)
  }
}
</script>

<template>
  <div
    @click="fileRef.click()"
    class="border border-gray-400 rounded-full relative cursor-pointer overflow-hidden beforeImg"
    :class="props.styleByClass"
  >
    <img
      v-if="imageInner"
      :src="imageInner"
      loading="lazy"
      class="w-full h-full object-cover rounded-full border border-gray-300"
    />
    <input
      ref="fileRef"
      type="file"
      accept="image/*"
      :disabled="props.disabled"
      :id="props.id"
      @change="handleFileChange"
      :required="props.required"
      class="bg-gray-200 hidden focus:bg-white input_form"
    />
    <div
      v-show="!imageInner"
      class="absolute top-0 w-full h-full rounded-full flexCenter h4 text-black"
    >
      <i class="fa-solid fa-camera text-4xl"></i>
    </div>
  </div>
</template>

<style scoped>
.beforeImg:hover::before {
  content: ' ';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  border-radius: 100%;
  cursor: pointer;
  transition: all ease-in-out 2s;
}

.beforeImg:hover > div {
  color: #414141;
  z-index: 99;
  display: flex !important;
  background: #ffffff4f;
}
</style>
