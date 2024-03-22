<script setup>
import useTransitionState from "../utils/axios";
import { toastInfo } from '@/utils/function';
import { defineEmits, defineProps, reactive, ref } from 'vue'

const {callApi , error} =useTransitionState()
const emit = defineEmits(['update:modelValue'])

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

const fileRef = ref()
 
let imageUrl = reactive(props.modelValue)

let imageInner = imageUrl.url ? imageUrl.url : ""

const handleFileChange = (event) => {
 
  const file = event.target.files[0];

  if (file && isImageFile(file)) {
      readAndDisplayImage(file)
  } else {
    toastInfo({type : "error" , mes : 'Vui lòng chọn ảnh file (jpg, jpeg, png)'})
  }
}

const isImageFile = (file) => {
  const acceptedFormats = ['image/jpeg', 'image/jpg', 'image/png']
  return acceptedFormats.includes(file.type)
}

const readAndDisplayImage = async (file) => {
 
  const reader = new FileReader()
  reader.readAsDataURL(file)

  reader.onload = (event) => {
    imageInner = event.target.result
  }
 
 
    const res = await callApi('attachments/signature', 'POST', {filename : file.name} ) 
    const { bucket , key}  = res.data.formData
    imageUrl = {
    bucket,
    key,
    url : res.data.postURL
   }
  emit('update:modelValue', imageUrl)
}
</script>

<template>
   
   <div @click="fileRef.click()"  class="border border-gray-400 rounded-full relative cursor-pointer overflow-hidden beforeImg" :class="props.styleByClass">
      <img
        v-if="modelValue"
        :src="imageInner"
        alt=""
        loading="lazy"
        class="w-full h-full  object-cover rounded-full border border-gray-300 "
      />
      <input
        ref="fileRef"
        type="file"
        accept="image/*"
        :disabled="props.disabled"
        :id="props.id"
        @change="handleFileChange"
        :required="props.required"
        class="bg-gray-200 hidden focus:bg-while input_form"
     
      >
      <p v-if="!modelValue.url && !imageInner" class="absolute_center h4">Upload</p>
   </div>
  </input>
 
</template>
<style scoped>
.beforeImg:hover::before {
  content: 'Chỉnh sửa';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #9793937e;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: white;
  border-radius: 100%;
  cursor: pointer;
  transition: all ease-in-out 1s;
}
</style>, useTransitionState