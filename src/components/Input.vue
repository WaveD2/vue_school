<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  id: [String, Number],
  keyInput: String,
  // , Array, Object
  modelValue: {
    type: [String, Number]
  },
  required: Boolean,
  disabled: Boolean,
  checked: Boolean,
  invalid: {
    type: [String, Boolean],
    default: ''
  },
  ariaDescribedBy: String,
  type: String,
  styleClass: String
})
const isChangeValue = ref(false)
const emit = defineEmits(['update:modelValue', 'clearError'])

const handleChangeInput = (event) => {
  if (props.type === 'checkbox') {
    emit('onUpdateValueCheckBox', props.keyInput)
  } else {
    emit('clearError', props.id)
    isChangeValue.value = true
    emit('update:modelValue', event.target.value)
  }
}
</script>
<template>
  <div class="w-auto" id="container_input">
    <input
      class="w-full text-base py-2 px-3 border rounded-lg border-[#D5D5D5] focus:border-blue-300"
      :disabled="disabled"
      :id="id"
      :type="type"
      :key="keyInput"
      :checked="checked"
      :required="required"
      @change="handleChangeInput"
      :class="[
        styleClass,
        invalid ? 'border-error ' : 'border-slate',
        disabled && 'bg-[#f5f6fa]',
        isChangeValue && 'bg-[#cde0e16b]'
      ]"
      :value="type === 'date' && modelValue ? modelValue.slice(0, 10) : modelValue"
    />
  </div>
</template>
<!-- , -->
