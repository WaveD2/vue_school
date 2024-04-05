<template>
  <div
    class="text-xs inline-flex items-center gap-3 font-bold leading-sm py-1 px-2 bg-blue-200 rounded-md w-max"
  >
    <slot name="content" />
    <i class="fa-solid fa-delete-left text-sm text-primary cursor-pointer hover:bg-slate"></i>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
