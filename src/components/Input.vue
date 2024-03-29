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
  <input
    class="bg-gray-200 focus:bg-while"
    :disabled="props.disabled"
    :type="props.type"
    :id="props.id"
    :value="
      props.type === 'date' && props.modelValue ? props.modelValue.slice(0, 10) : props.modelValue
    "
    :required="props.required"
    @input="($event) => emit('update:modelValue', $event.target.value)"
    :class="['input_form', props.invalid ? 'border-error' : 'border-slate']"
  />
</template>
<!--   -->
