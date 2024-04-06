<template>
  <div
    class="text-xs inline-flex items-center gap-3 font-bold leading-sm py-1 px-2 bg-blue-200 rounded-md w-max"
  >
    <slot name="content" :tagValue="tagValue" />
    <i
      class="fa-solid fa-delete-left text-xs text-primary cursor-pointer"
      @click="handleDeleteTag"
    ></i>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  tagValue: String
})
const emit = defineEmits(['delete-tag'])

const tagValue = ref(null)

const handleDeleteTag = () => {
  return emit('delete-tag', props.tagValue)
}
</script>

<style lang="scss" scoped></style>
