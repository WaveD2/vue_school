<script setup>
const props = defineProps({
  modelValue: [String, Number, Array, Object],
  required: Boolean,
  invalid: [Boolean, String],
  styleClass: String,
  options: [Array],
  disabled: Boolean,
  valueDefault: Object
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
    class="w-full text-base py-2 px-2 border rounded-lg border-[#D5D5D5] focus:bg-while"
    :class="[
      props.styleClass,
      props.invalid ? 'border-error' : 'border-slate',
      props.disabled && 'bg-[#f5f6fa]'
    ]"
  >
    <option
      v-for="(item, index) in options"
      :required="props.required"
      :value="item.value"
      :key="index"
    >
      {{ item.text }}
    </option>
  </select>
</template>

<style lang="scss" scoped></style>
