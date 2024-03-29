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

const handleChange = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <select
    @change="handleChange"
    :value="props.modelValue"
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
