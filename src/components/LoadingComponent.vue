<script setup>
import { computed } from 'vue'
import LoadingIcon from './icons/Loading.icon.vue'
const props = defineProps(['isLoading'])

const isLoading = computed(() => props.isLoading)
</script>

<template>
  <div
    class="absolute top-0 bottom-0 right-0 left-0 bg-transparent z-50 flexCenter transition-all"
    :class="!isLoading && '!hidden'"
  >
    <div aria-label="Loading..." role="status" class="space-x-2">
      <LoadingIcon />
    </div>
  </div>
</template>
