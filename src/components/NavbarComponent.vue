<script setup>
import { MENU_SIDE_NAV, NOTIFICATIONS } from '@/utils/constants'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import InputSearch from './InputSearch.vue'
import ModalInfo from './ModalInfo.vue'
import store from '@/store'
import { useRoute } from 'vue-router'

const route = useRoute()

const isActiveModalUser = ref(false)
const isActiveMotion = ref(false)
const isActiveSideBar = ref(0)
const isOpenMenuSidebar = ref(false)
const menuRef = ref(null)

const handleActiveSideBar = (index) => {
  isActiveSideBar.value = index
}

const userCurrent = computed(() => store.state.user)

console.log('userCurrent', userCurrent)
const toggleMenuSidebar = () => {
  isOpenMenuSidebar.value = !isOpenMenuSidebar.value
  if (isOpenMenuSidebar.value) {
    document.addEventListener('click', closeMenuOutside)
  } else {
    document.removeEventListener('click', closeMenuOutside)
  }
}

const closeMenu = () => {
  isOpenMenuSidebar.value = false
}

const closeMenuOutside = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    closeMenu()
  }
}

onMounted(() => {
  menuRef.value = document.getElementById('menu')
})
</script>

<template>
  <main>
    <!--sidenav -->
    <section
      :class="isOpenMenuSidebar && '!block'"
      class="fixed left-0 top-0 w-64 pl-4 h-full bg-purple py-4 z-50 transition-all max-md:pl-2 max-md:hidden"
      ref="menu"
    >
      <a
        href="#"
        class="flex items-center px-4 pb-4 border-b border-b-gray-200 max-md:px-2 max-md:justify-between"
      >
        <h2 class="h2">Wave <span class="bg-[#f84525] text-white px-2 rounded-md">D</span></h2>

        <div class="hidden max-md:inline-block cursor-pointer" @click="toggleMenuSidebar">
          <i class="fa-regular fa-circle-xmark text-while text-3xl"></i>
        </div>
      </a>
      <ul
        class="mt-2"
        v-for="(sidebar, index) in MENU_SIDE_NAV"
        @click="handleActiveSideBar(index)"
      >
        <li class="mb-1 group" :key="index">
          <RouterLink
            @click="sidebar?.func()"
            :to="sidebar.link"
            class="flex text-lg font-semibold items-center py-3 px-4 text-grey-2 rounded-tl-md rounded-bl-md transition-all max-md:px-2 max-md:text-base"
            :class="route.path === sidebar.link && '!bg-background !text-purple'"
          >
            <i class="mr-3 text-lg" :class="sidebar.icon" />
            <span class="text-sm">{{ sidebar.text }}</span>
          </RouterLink>
        </li>
      </ul>
    </section>
    <div
      v-if="isOpenMenuSidebar"
      @click="toggleMenuSidebar"
      class="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay"
    ></div>

    <section
      class="w-full md:w-[calc(100%-256px)] md:ml-64 bg-linear min-h-screen transition-all main"
    >
      <!-- navbar -->

      <div class="h-[68px] max-md:h-[138px]">
        <div
          class="py-2 px-6 bg-transparent flexBetween shadow-md shadow-black/5 sticky top-0 left-0 z-30 max-md:relative max-md:pb-[70px]"
        >
          <div class="hidden cursor-pointer max-md:inline-block" @click="toggleMenuSidebar">
            <i class="fa-solid fa-bars text-lg"></i>
          </div>

          <h3 class="font-medium text-text text-2xl max-md:text-lg">Trang chủ</h3>
          <div class="ml-2" v-if="Object.keys(userCurrent).length !== 0">
            <div class="flex items-center">
              <div class="flex-shrink-0 w-10 h-10 relative">
                <div class="p-1 bg-white rounded-full focus:outline-none focus:ring">
                  <img
                    class="w-8 h-8 rounded-full"
                    src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg"
                    alt=""
                  />
                  <div
                    class="top-0 left-7 absolute w-3 h-3 bg-lime-400 border-2 border-white rounded-full animate-ping"
                  ></div>
                  <div
                    class="top-0 left-7 absolute w-3 h-3 bg-lime-500 border-2 border-white rounded-full"
                  ></div>
                </div>
              </div>
              <div
                class="p-2 md:block text-left relative cursor-pointer"
                @click="isActiveModalUser = !isActiveModalUser"
              >
                <h2 class="text-sm font-semibold text-gray-800">
                  {{ userCurrent.record.username }}
                </h2>
                <p class="text-xs text-gray-500">{{ userCurrent.record.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- content -->

      <section class="p-3"><slot /></section>
    </section>
  </main>
</template>

<style scoped>
.sidenav_mobile {
  display: none;
  padding: 8px8px 0;
  font-size: 16px;
}
</style>
