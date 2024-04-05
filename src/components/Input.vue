<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  id: String,
  modelValue: {
    type: [String, Number, Array, Object]
  },
  required: Boolean,
  disabled: Boolean,
  invalid: Boolean,
  ariaDescribedBy: String,
  type: String,
  styleClass: String
})

const emit = defineEmits(['update:modelValue'])

const focusFirstInput = {
  mounted(el) {
    const firstInput = el.querySelector('input')
    if (firstInput) {
      firstInput.focus()
    }
  }
}

onMounted(() => {
  focusFirstInput.mounted(document.getElementById('container_input'))
})
</script>
<template>
  <div id="container_input">
    <input
      class="w-full text-[18px] py-3 px-3 border rounded-lg border-[#D5D5D5] focus:border-blue-300"
      :disabled="props.disabled"
      :type="props.type"
      :value="
        props.type === 'date' && props.modelValue ? props.modelValue.slice(0, 10) : props.modelValue
      "
      :required="props.required"
      @input="($event) => emit('update:modelValue', $event.target.value)"
      :class="[
        props.styleClass,
        props.invalid ? 'border-error ' : 'border-slate',
        props.disabled && 'bg-[#f5f6fa]'
      ]"
    />
  </div>
</template>
