<script setup>
const props = defineProps({
  modelValue: [String, Number, Array, Object],
  required: Boolean,
  invalid: Boolean,
  styleClass: String,
  options: [Array],
  disabled: Boolean
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <select
    @change="($event) => emit('update:modelValue', $event.target.value)"
    v-model="props.modelValue"
    :disabled="props.disabled"
    class="bg-gray-200 focus:bg-while input_form"
    :class="[props.styleClass, props.invalid ? 'border-error' : 'border-slate']"
  >
    <option
      :required="props.required"
      v-for="(item, index) in options"
      :value="item.value"
      :key="index"
    >
      {{ item.text }}
    </option>
  </select>
</template>

<style lang="scss" scoped></style>
