<script setup>
import { useRouter, RouterView } from 'vue-router'
</script>

<template>
  <VApp>
    <RouterView />
    <notifications group="foo" />
  </VApp>
</template>
