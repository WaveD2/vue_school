<script setup>
const props = defineProps({
  id: String,
  modelValue: [String, Number, Array],
  required: Boolean,
  invalid: Boolean,
  ariaDescribedBy: String
})

const emit = defineEmits(['update:modelValue'])
</script>
<template>
  <input
    class="bg-gray-200 focus:bg-while"
    :id="props.id"
    :value="props.modelValue"
    @input="($event) => emit('update:modelValue', $event.target.value)"
    :required="props.required"
    :class="['input_form', props.invalid ? 'border-error' : 'border-slate']"
  />
</template>
