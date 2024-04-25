<template>
  <div class="inline-flex items-center ml-4" :class="styleByClass">
    <slot name="content" :tagValue="tagValue" />
    <i
      class="fa-solid fa-delete-left text-xs text-blue-700 cursor-pointer"
      @click="handleDeleteTag"
    ></i>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  tagValue: String,
  styleByClass: String
})
const emit = defineEmits(['delete-tag'])

const tagValue = ref(null)

const handleDeleteTag = () => {
  return emit('delete-tag', props.tagValue)
}
</script>

<style lang="scss" scoped></style>
