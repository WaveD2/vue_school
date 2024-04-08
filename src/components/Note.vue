<script setup>
const props = defineProps(['styleByClass'])
</script>

<template>
  <div
    class="w-full relative font-bold whitespace-nowrap select-none py-1 px-2 text-xs rounded-md"
    :class="props.styleByClass"
  >
    <slot />
  </div>
</template>
