<template>
  <div class="bg-background flexCenter h-screen">
    <LoadingComponent :isLoading="isCurrentLoading" />

    <div class="w-1/2 h-screen hidden lg:block">
      <img
        src="../assets/images/logo_school.jpg"
        alt="Placeholder Image"
        class="object-contain w-full h-full"
      />
    </div>
    <RouterView @setLoading="handleIsLoading" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LoadingComponent from '@/components/LoadingComponent.vue'

const isCurrentLoading = ref(false)

const handleIsLoading = (isLoading) => {
  console.log(':', isLoading)
  isCurrentLoading.value = isLoading
}
</script>

<style lang="scss" scoped></style>
