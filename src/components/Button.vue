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
  <button
    class="p-2 border border-transparent font-medium rounded-md text-while bg-indigo-500 hover:bg-indigo-800"
    :class="props.byStyleClass"
    @click="handleClick"
    :id="props.id"
  >
    <i :is="props.leftIcon" :class="props.leftIcon" />
    <slot />
  </button>
</template>

<style lang="scss" scoped></style>
