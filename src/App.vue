<script setup>
import { useRouter, RouterView } from 'vue-router'
import { checkAccessToken } from './utils/axios/setupApi'

const route = useRouter()

document.addEventListener('DOMContentLoaded', async function () {
  const res = await checkAccessToken()

  if (res) {
    const routeCurrent = localStorage.getItem('previousRoute')
    const page = routeCurrent ? routeCurrent : '/teacher'

    return route.push(page)
  }

  return route.push('/login')
})
</script>

<template>
  <VApp>
    <RouterView />
    <notifications group="foo" />
  </VApp>
</template>
