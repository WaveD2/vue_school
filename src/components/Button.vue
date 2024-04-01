<script setup>
const props = defineProps({
  id: String,
  leftIcon: String,
  textBtn: String,
  isLoading: Boolean,
  byStyleClass: String,
  handleClick: function () {}
})
</script>

<template>
  <button class="" :class="props.byStyleClass" @click="handleClick" :id="props.id">
    <i :is="props.leftIcon" :class="props.leftIcon" />
    <slot />
  </button>
</template>

<style lang="scss" scoped></style>
