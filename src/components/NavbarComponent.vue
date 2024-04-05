<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { MENU_SIDE_NAV } from '@/utils/constants'
import store from '@/store'

const route = useRoute()

const isActiveModalUser = ref(false)
const isOpenMenuSidebar = ref(false)
const isActiveSideBar = ref(0)
const menuRef = ref(null)

const userCurrent = ref(store.state.user)

const handleActiveSideBar = (index) => {
  isActiveSideBar.value = index
}

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
      class="fixed left-0 top-0 w-64 pl-4 h-full bg-while shadow-xl shadow-gray-300 z-50 transition-all max-md:pl-2 max-md:hidden"
      ref="menu"
    >
      <div
        class="flex items-center px-2 h-[85px] border-b border-b-gray-200 max-md:px-2 max-md:justify-between"
      >
        <h2>
          <span class="h1 font-black font-['Mont']">WaveD</span>
        </h2>

        <div class="hidden max-md:inline-block cursor-pointer" @click="toggleMenuSidebar">
          <i class="fa-regular fa-circle-xmark text-while text-2xl"></i>
        </div>
      </div>
      <ul
        class="mt-2"
        v-for="(sidebar, index) in MENU_SIDE_NAV"
        @click="handleActiveSideBar(index)"
      >
        <li class="mb-1 group" :key="index">
          <RouterLink
            @click="sidebar?.func()"
            :to="sidebar.link"
            class="flex items-center py-3 px-4 text-zinc-400 rounded-tl-md rounded-bl-md transition-all max-md:px-2 max-md:text-sm"
            :class="route.path === sidebar.link && '!bg-background !text-[#1814F3]'"
          >
            <i class="mr-3" :class="sidebar.icon" />
            <span class="text-base font-bold">{{ sidebar.text }}</span>
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
      class="w-full md:w-[calc(100%-256px)] md:ml-64 bg-while min-h-screen transition-all main"
    >
      <!-- navbar -->

      <div class="h-[85px] bg-white">
        <div
          class="h-full px-8 bg-transparent flexBetween shadow-md shadow-black/5 sticky top-0 left-0 z-30 max-md:relative"
        >
          <div class="hidden cursor-pointer max-md:inline-block" @click="toggleMenuSidebar">
            <i class="fa-solid fa-bars text-lg"></i>
          </div>

          <h3 class="text-slate-700 text-xl font-bold">{{ route.name }}</h3>
          <div class="ml-2" v-if="userCurrent">
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
                  {{ userCurrent.username }}
                </h2>
                <p class="text-xs text-gray-500">{{ userCurrent.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- content -->

      <section class="px-3 py-1 pb-0"><slot /></section>
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
