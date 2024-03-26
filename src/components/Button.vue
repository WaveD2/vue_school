<script setup>
const props = defineProps({
  leftIcon: String,
  textBtn: String,
  isLoading: Boolean,
  byStyleClass: String,
  handleClick: function () {}
})
</script>

<template>
  <button
    class="border bg-slate w-max rounded-md border-primary px-2 mb-1 font-semibold transition-colors duration-200 ease-in-out text-base text-secondary-inverse hover:text-black hover:bg-primary"
    :class="props?.byStyleClass"
    @click="handleClick"
  >
    <i :is="props.leftIcon" :class="props.leftIcon" />
    <slot />
  </button>
</template>

<style lang="scss" scoped></style>
