<script setup>
import { ref } from 'vue'

const listMenu = ['Thông tin cá nhân', 'Hồ sơ làm việc']
let isActive = ref(0)
</script>

<template>
  <div>
    <div class="flexStart overflow-x-auto overflow-y-hidden 00 whitespace-nowrap">
      <button
        type="button"
        v-for="(menu, index) in listMenu"
        :key="index"
        class="h-10 px-4 p text-center text-text bg-transparent dark:border-blue-400 dark:text-blue-300 whitespace-nowrap focus:outline-none transition-colors"
        :class="isActive === index && '!text-active !border-b-active !border-b-2'"
        @click="isActive = index"
      >
        <p>{{ menu }}</p>
      </button>
    </div>

    <slot></slot>
  </div>
</template>

<style lang="scss" scoped></style>
