<script setup>
import { useRouter, RouterView } from 'vue-router'
import { checkAccessToken } from './utils/axios/setupApi'

const route = useRouter()

document.addEventListener('DOMContentLoaded', async function () {
  const res = await checkAccessToken()
  if (!res) route.push('/login')
  else route.push('/my-parent')
})
</script>

<template>
  <VApp>
    <RouterView />
    <notifications group="foo" />
  </VApp>
</template>
