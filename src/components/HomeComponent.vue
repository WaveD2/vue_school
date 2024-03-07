<template>
  <div>
    <div>Hello word</div>
  </div>
</template>

<script setup>
import store from '@/store'
import { computed } from 'vue'

const userCurrent = computed(() => store.state.user)

console.log('cur', userCurrent)
</script>

<style lang="scss" scoped></style>
