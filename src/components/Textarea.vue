<script setup>
const props = defineProps({
  id: String,
  modelValue: {
    type: [String, Number, Array, Object]
  },
  required: Boolean,
  disabled: Boolean,
  invalid: Boolean,
  ariaDescribedBy: String,
  type: String
})
const emit = defineEmits(['update:modelValue'])
</script>
<template>
  <textarea
    id="message"
    rows="4"
    :disabled="props.disabled"
    :type="props.type"
    :id="props.id"
    :value="props.modelValue"
    :required="props.required"
    @input="($event) => emit('update:modelValue', $event.target.value)"
    :class="['input_form', props.invalid ? 'border-error' : 'border-slate']"
    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="..."
  ></textarea>
</template>
