<template>
  <div
    class="absolute rounded-md bg-grey-3 triangle"
    :class="props?.byClassStyle"
    v-if="props?.isActive"
  >
    <ul
      class="shadow-md shadow-black/5 z-30 border border-gray-100 min-w-min"
      v-for="(item, index) in props.listMenuRender"
    >
      <li
        class="cursor-pointer group flex gap-x-2 items-center p-2 text-grey-1 hover:text-text hover:bg-gray-300 transition-all"
      >
        <i class="text-lg" :class="item.icon" />
        <RouterLink :to="item?.link" class="p">{{ item.text }}</RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps(['byClassStyle', 'isActive', 'listMenuRender'])
</script>

<style scoped>
.triangle::before {
  position: absolute;
  content: ' ';
  width: 0;
  height: 0;
  top: -12px;
  left: 100px;
  border-bottom: 18px solid #c1bbeb;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  z-index: -1;
  transition: all 1s ease-in;
}
</style>
