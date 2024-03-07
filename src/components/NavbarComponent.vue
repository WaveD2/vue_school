<template>
  <main>
    <!--sidenav -->
    <section class="fixed left-0 top-0 w-64 pl-4 h-full bg-purple py-4 z-50 transition-transform">
      <a href="#" class="flex items-center px-4 pb-4 border-b border-b-gray-800">
        <h2 class="h2">Wave <span class="bg-[#f84525] text-white px-2 rounded-md">D</span></h2>
      </a>
      <ul class="mt-2" v-for="(sidebar, index) in menuSidenav" @click="handleActiveSideBar(index)">
        <li class="mb-1 group" :key="index">
          <RouterLink
            to="/setting-profile"
            class="flex text-lg font-semibold items-center py-3 px-4 text-grey-2 rounded-tl-md rounded-bl-md transition-all"
            :class="isActiveSideBar === index && '!bg-background !text-purple'"
          >
            <i class="mr-3 text-lg" :class="sidebar.icon" />
            <span class="text-sm">{{ sidebar.text }}</span>
          </RouterLink>
        </li>
      </ul>
    </section>
    <div class="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay"></div>

    <section
      class="w-full md:w-[calc(100%-256px)] md:ml-64 bg-linear min-h-screen transition-all main"
    >
      <!-- navbar -->
      <div
        class="py-2 px-6 bg-transparent flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30"
      >
        <button type="button" class="text-lg text-gray-900 font-semibold sidebar-toggle">
          <i class="ri-menu-line"></i>
        </button>

        <ul class="ml-auto flex items-center">
          <li class="mr-1 dropdown">
            <input-search />
          </li>

          <li class=" ">
            <div
              class="relative cursor-pointer text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:text-gray-600"
              @click="isActiveMotion = !isActiveMotion"
            >
              <i class="fa-regular fa-bell text-xl"></i>

              <modal-info
                byClassStyle="text-sm  top-[50px] left-[-100px] w-[250px] right-0"
                :isActive.="isActiveMotion"
                :listMenuRender="NOTIFICATIONS"
              />
            </div>
          </li>

          <li class="ml-2">
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
                <h2 class="text-sm font-semibold text-gray-800">Đăng Tùng</h2>
                <p class="text-xs text-gray-500">Admin</p>
                <!-- <modal-info
                  byClassStyle="top-[60px] left-[-45px] w-[150px]   right-0"
                  :isActive="isActiveModalUser"
                  :listMenuRender="menuModalUser"
                /> -->
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- content -->

      <section class="p-4"><slot /></section>
    </section>
  </main>
</template>

<script setup>
import { menuSidenav, menuModalUser, NOTIFICATIONS } from '@/utils/constants'
import { computed, ref } from 'vue'
import InputSearch from './InputSearch.vue'
import ModalInfo from './ModalInfo.vue'
import store from '@/store'

const isActiveModalUser = ref(false)
const isActiveMotion = ref(false)

const handleActiveSideBar = (index) => {
  console.log('index', index)
  store.commit('SET_ACTIVE_SIDE_BAR', +index)
}

const isActiveSideBar = computed(() => store.state.isActiveSideBar)
console.log('isActiveSideBar', isActiveSideBar)
</script>

<style scoped></style>
