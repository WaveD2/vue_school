<script setup>
const props = defineProps({
  modelValue: [String, Number, Array, Object],
  required: Boolean,
  invalid: [Boolean, String],
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
    class="relative w-full text-base py-2 px-2 border rounded-lg border-[#D5D5D5] focus:bg-while"
    :class="[
      props.styleClass,
      props.invalid ? 'border-error' : 'border-slate',
      props.disabled && 'bg-[#f5f6fa]'
    ]"
  >
    <div class="absolute top-2 right-0">
      <svg
        fill="#D5D5D5"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 348.333 348.334"
        xml:space="preserve"
        stroke="#D5D5D5"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <g>
            <path
              d="M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85 c-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563 c-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85 l105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554 L279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z"
            ></path>
          </g>
        </g>
      </svg>
    </div>

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
