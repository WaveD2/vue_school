<script setup>
import { computed, ref, onMounted, watch, onUnmounted } from 'vue'

const props = defineProps({
  id: String,
  modelValue: {
    type: [String, Number, Array, Object]
  },
  required: Boolean,
  disabled: Boolean,
  invalid: {
    type: [String, Boolean],
    default: ''
  },
  ariaDescribedBy: String,
  type: String,
  styleClass: String
})
const isError = ref(props.invalid !== '')
const isChangeValue = ref(false)

const emit = defineEmits(['update:modelValue'])

const focusFirstInput = {
  mounted(el) {
    const firstInput = el.querySelector('input')
    if (firstInput) {
      firstInput.focus()
    }
  }
}

const handleChangeInput = (event) => {
  isError.value = false
  isChangeValue.value = true
  return emit('update:modelValue', event.target.value)
}

onMounted(() => {
  focusFirstInput.mounted(document.getElementById('container_input'))
})

onUnmounted(() => (isChangeValue.value = false))

watch(
  () => props.invalid,
  (newValue) => {
    isError.value = newValue !== ''
  }
)
</script>
<template>
  <div id="container_input">
    <input
      class="w-full text-base py-2 px-3 border rounded-lg border-[#D5D5D5] focus:border-blue-300"
      :disabled="props.disabled"
      :type="props.type"
      :value="
        props.type === 'date' && props.modelValue ? props.modelValue.slice(0, 10) : props.modelValue
      "
      :required="props.required"
      @change="handleChangeInput"
      :class="[
        props.styleClass,
        isError ? 'border-error ' : 'border-slate',
        props.disabled && 'bg-[#f5f6fa]',
        isChangeValue && 'bg-[#f0d0976b]'
      ]"
    />
  </div>
</template>
