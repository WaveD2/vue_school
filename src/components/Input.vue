<script setup>
const props = defineProps({
  id: String,
  modelValue: {
    type: [String, Number, Array, Object],
    required: true
  },
  required: Boolean,
  disabled: Boolean,
  invalid: Boolean,
  ariaDescribedBy: String
})

const emit = defineEmits(['update:modelValue'])
</script>
<template>
  <input
    :disabled="props.disabled"
    class="bg-gray-200 focus:bg-while"
    :id="props.id"
    :value="props.modelValue"
    :required="props.required"
    @input="($event) => emit('update:modelValue', $event.target.value)"
    :class="['input_form', props.invalid ? 'border-error' : 'border-slate']"
  />
</template>
