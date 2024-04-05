<script setup>
import { ref } from 'vue'
const fileRef = ref()
import useTransitionState from '../utils/axios'
import { fetchDoUpLoadFile } from '@/utils/function'
const { callApi } = useTransitionState()
const loading = ref(false)
const error = ref('')

const props = defineProps({
  id: String,
  modelValue: {
    type: [String, Array, Object],
    required: true
  },
  required: Boolean,
  disabled: Boolean,
  styleByClass: String
})

const documents = ref(props.modelValue)

const emit = defineEmits(['update:modelValue'])

const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.ms-powerpoint',
    'image/jpeg',
    'image/png',
    'image/gif'
  ]
  const fileExtension = file.name.split('.').pop().toLowerCase()
  if (
    !allowedTypes.includes(file.type) &&
    !['pdf', 'doc', 'docx', 'ppt', 'pptx', 'jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)
  ) {
    toastInfo({
      type: 'error',
      mes: 'Vui lòng chọn ảnh file (pdf, doc, docx, ppt, pptx, jpg, jpeg, png, gif)'
    })

    return
  }

  loading.value = true

  const res = await callApi('attachments/signature', 'POST', { filename: file.name })
  if (res.data) {
    const url = res.data.postURL
    const form = res.data.formData
    await fetchDoUpLoadFile({ url, file, form })

    const { bucket, key } = res.data.formData

    loading.value = false

    const newDocument = {
      filename: file.name,
      ext: file.type,
      bucket,
      key,
      url: res.data.getUrl
    }

    documents.value.push(newDocument)

    emit('update:modelValue', documents)

    error.value = ''
  }
}

const removeDocument = (index) => {
  documents.value.splice(index, 1)
}
</script>

<template>
  <div
    :class="props.styleByClass"
    class="w-full p-2 container border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
  >
    <button
      class="w-full items-center justify-center cursor-pointer"
      :disabled="props.disabled"
      @click="fileRef.click()"
    >
      <label for="file" class="flex flex-col items-center justify-center w-full">
        <div class="flex flex-col items-center justify-center py-2">
          <svg
            class="w-8 h-8 mb-4 text-gray-400 dark:text-gray-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">Ấn vào để tải tài liệu</p>
        </div>
        <input type="file" ref="fileRef" @change="handleFileUpload" hidden />
      </label>
    </button>

    <div class="flex items-center justify-center w-full h-full" v-if="loading">
      <div class="flex justify-center items-center space-x-1 text-sm text-gray-700">
        <svg
          fill="none"
          class="w-6 h-6 animate-spin"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
            fill="currentColor"
            fill-rule="evenodd"
          />
        </svg>
        <div>Loading ...</div>
      </div>
    </div>
    <div v-if="documents.length > 0" id="countries" class="flex-1">
      <div
        class="flexBetween mb-1 bg-[#9ed2de] py-1 px-2 border-[#b7d5de] rounded text-[#414343]"
        v-for="(doc, index) in documents"
        :key="index"
      >
        <a :href="doc.url" target="_blank">{{ doc.filename }}</a>
        <button @click="removeDocument(index)"><i class="fa-regular fa-trash-can"></i></button>
      </div>
    </div>
    <div v-if="error">
      {{ error }}
    </div>
  </div>
</template>
, toastInfo, toastInfo
