<script setup>
import { useRouter, RouterView } from 'vue-router'
import { checkAccessToken } from './utils/axios/setupApi'
import { Notivue } from 'notivue'

const route = useRouter()
;(async () => {
  const res = await checkAccessToken()
  if (!res) route.push('/login')
  else route.push('/')
})()
</script>

<template>
  <VApp>
    <RouterView />
  </VApp>
</template>
