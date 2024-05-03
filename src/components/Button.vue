<script setup>
const props = defineProps({
  id: [String, Number],
  leftIcon: String,
  textBtn: String,
  isLoading: Boolean,
  byStyleClass: [String, Array]
})

const emit = defineEmits(['handleClickBtn', 'handleClickIcon'])
</script>

<template>
  <button class="" :class="props.byStyleClass" :id="props.id">
    <i
      v-if="props.leftIcon"
      :is="props.leftIcon"
      :class="props.leftIcon"
      @click="handleClickByIcon"
    />
    <slot />
  </button>
</template>

<style lang="scss" scoped></style>
