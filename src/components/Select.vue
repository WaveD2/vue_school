<script setup>
const props = defineProps({
  id: String,
  modelValue: [String, Number, Array],
  required: Boolean,
  invalid: Boolean
})

const sex = ['Nam', 'Nữ', 'Khác']
</script>

<template>
  <select
    id="countries"
    class="bg-gray-200 focus:bg-while"
    :class="['input_form', props.invalid ? 'border-error' : 'border-slate']"
  >
    <option :value="props.modelValue" v-for="(item, index) in sex" :key="index">
      {{ item }}
    </option>
  </select>
</template>

<style lang="scss" scoped></style>
