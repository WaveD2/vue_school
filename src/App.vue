<script setup>
import { useRouter, RouterView } from 'vue-router'
import { checkAccessToken } from './utils/axios/setupApi'

const route = useRouter()

document.addEventListener('DOMContentLoaded', async function () {
  // console.log('loading page')
  // const res = await checkAccessToken()
  // if (!res) route.push('/login')
  // else \
  route.push('/')
})
</script>

<template>
  <VApp>
    <RouterView />
  </VApp>
</template>
