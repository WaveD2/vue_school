<script setup>
const props = defineProps({
  modelValue: [String, Number, Array, Object],
  required: Boolean,
  invalid: Boolean,
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
    class="w-full text-[18px] py-3 px-3 border rounded-lg bg-[#f5f6fa] border-[#D5D5D5] focus:bg-while"
    :class="[props.styleClass, props.invalid ? 'border-error' : 'border-slate']"
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
