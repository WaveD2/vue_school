<script setup>
import Label from './Label.vue'
import ErrorMessage from './ErrorMessage.vue'
import HelperMessage from './HelperMessage.vue'
import { v4 as uuid } from 'uuid'
import { computed, provide } from 'vue'

const props = defineProps({
  id: {
    type: String,
    default: () => `field-${uuid()}`
  },
  label: String,
  required: Boolean,
  error: String,
  help: String,
  styleClass: String
})

const ariaDescribedBy = computed(() => {
  return !!props.help ? `help-${uuid()}` : null
})
</script>
<template>
  <div class="min-w-max max-md:w-full" :class="styleClass">
    <Label v-if="props.label" :for="props.id" :required="props.required">{{ props.label }}</Label>

    <slot v-bind="props" />

    <div class="max-h-4 h-4">
      <ErrorMessage v-show="props.error">
        {{ props.error }}
      </ErrorMessage>
    </div>

    <HelperMessage
      class="mt-1 text-xs text-gray-500 dark:text-gray-400"
      v-if="props.help"
      :id="ariaDescribedBy"
    >
      {{ props.help }}
    </HelperMessage>
  </div>
</template>
