<script setup>
import { callApi } from '@/utils/axios'
import { setStoreTokens } from '@/utils/axios/setupApi'
import { VALUE_LOGIN } from '@/utils/constants'
import { loginSchema } from '@/utils/validateYub'
import { computed, reactive, ref, defineEmits, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

import store from '@/store'

const route = useRouter()
const emit = defineEmits(['setLoading'])
let formLogin = reactive({
  username: '',
  password: ''
})

const isRemember = ref(false)
const typeError = reactive({
  type: null,
  message: null
})

const handleSubmitForm = async () => {
  try {
    loginSchema.validateSync(formLogin)
    typeError.type = null
    typeError.message = null
    emit('setLoading', true)
    // CALL API
    await store.dispatch('loginUser', formLogin)

    route.push('/teacher')
  } catch (error) {
    const { path, message } = error
    typeError.type = path
    typeError.message = message
  } finally {
    emit('setLoading', false)
    formLogin = {
      password: '',
      username: ''
    }
  }
}
</script>

<template>
  <div class="md:p-20 sm:16 p-8 w-screen max-w-lg lg:w-1/2">
    <h1 class="h1 mb-6 text-center">Đăng nhập</h1>

    <form @submit.prevent="handleSubmitForm" class="flexCol gap-y-3">
      <div class="mb-4">
        <label for="username" class="text-lg block mb-2 text-gray-600">Tên đăng nhập</label>
        <input
          type="text"
          id="username"
          name="username"
          class="input_form"
          autocomplete="off"
          v-model="formLogin.username"
        />
        <p v-show="typeError.type == 'username'" class="p text-error mt-2">
          {{ typeError.message }}
        </p>
      </div>

      <div class="mb-4">
        <label for="password" class="text-lg block mb-2 text-gray-600">Mật khẩu</label>
        <input
          type="password"
          id="password"
          name="password"
          class="input_form"
          autocomplete="off"
          v-model="formLogin.password"
        />
        <p v-show="typeError.type === 'password'" class="p text-error mt-2">
          {{ typeError.message }}
        </p>
      </div>

      <div class="mb-4 flex items-center">
        <input
          type="checkbox"
          id="remember"
          name="remember"
          class="text-blue-500"
          v-model="isRemember.remember"
        />
        <label for="remember" class="text-gray-600 ml-2">Ghi nhớ </label>
      </div>

      <div class="mb-4 flexBetween text-blue-500 hover:underline">
        <RouterLink to="#" class="">Quên mật khẩu</RouterLink>

        <RouterLink to="register" class="">Đăng ký</RouterLink>
      </div>

      <button type="submit" class="btn_blue_hover w-full">Đăng nhập</button>
    </form>
  </div>
</template>
