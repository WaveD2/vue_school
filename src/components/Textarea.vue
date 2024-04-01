<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number, Array, Object]
  },
  required: Boolean,
  disabled: Boolean,
  invalid: Boolean,
  type: String,
  placeholder: {
    type: String,
    default: 'Mô tả...'
  },
  styleByClass: String
})
const emit = defineEmits(['update:modelValue'])
</script>
<template>
  <textarea
    id="message"
    rows="5"
    :disabled="props.disabled"
    :type="props.type"
    :value="props.modelValue"
    :required="props.required"
    @input="($event) => emit('update:modelValue', $event.target.value)"
    :class="[props.styleByClass, props.invalid ? 'border-error' : 'border-slate']"
    class="block p-2.5 w-full text-base text-gray-900 bg-gray-50 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    :placeholder="props.placeholder"
  ></textarea>
</template>
