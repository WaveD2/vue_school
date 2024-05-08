<script setup>
import { useRouter, useRoute } from 'vue-router'
import { reactive, ref, defineEmits, onMounted } from 'vue'
import debounce from 'lodash.debounce'
import Field from '@/components/Field.vue'

import { getCookie } from '@/axios/setupApi'

import store from '@/store'
import { loginSchema } from '@/utils/validateYub'
import { arrayToObject } from '@/utils/function'
import { LABEL_LOGIN } from '@/constants/options'

const router = useRouter()
const route = useRoute()
console.log('route', route)
const emit = defineEmits(['setLoading'])
const errors = ref({
  username: '',
  password: ''
})
let formLogin = reactive({
  username: '',
  password: ''
})

onMounted(() => checkAccessToken())

const checkAccessToken = () => {
  if (getCookie('accessToken')) {
    let routerCurrent = ''
    if (route.fullPath.includes('url=')) {
      routerCurrent = decodeURIComponent(decodeURIComponent(route.fullPath.split('url=')[1]))
      localStorage.setItem('previousRoute', routerCurrent)
    } else {
      const sortPreviousRoute = localStorage.getItem('previousRoute') || ''
      routerCurrent = sortPreviousRoute.includes('url=')
        ? decodeURIComponent(decodeURIComponent(sortPreviousRoute.split('url=')[1]))
        : '/teacher'
      localStorage.setItem('previousRoute', routerCurrent)
    }

    return router.push(routerCurrent)
  } else {
    store.commit('SET_MES_API_ERROR', [])
  }
}

const handleSubmitForm = debounce(async () => {
  try {
    const username = formLogin.username.trim()
    const formNew = { ...formLogin, username }
    loginSchema.validateSync(formNew, { abortEarly: false })
    errors.value = {
      username: '',
      password: ''
    }

    emit('setLoading', true)
    // CALL API
    await store.dispatch('loginUser', formNew)

    if (!errors.value.username && !errors.value.password) {
      checkAccessToken()
    }
  } catch (error) {
    if (Array.isArray(error.inner)) {
      const errorMess = error.inner.map((e) => ({
        [e.path]: e.message
      }))
      return (errors.value = arrayToObject(errorMess))
    }
  } finally {
    emit('setLoading', false)
  }
}, 1000)
</script>

<template>
  <div class="md:p-20 sm:16 p-8 w-screen max-w-lg lg:w-1/2">
    <h1 class="h1 mb-6 text-center">Đăng nhập</h1>

    <form @submit.prevent="handleSubmitForm" class="flexCol gap-y-3">
      <div class="mb-4">
        <Field
          v-for="(value, key) of LABEL_LOGIN"
          :error="errors[key]"
          :label="value.text"
          :required="value.required"
        >
          <input
            :type="`${key === 'password' ? 'password' : 'text'}`"
            :id="key"
            :name="formLogin[key]"
            class="input_form"
            autocomplete="off"
            v-model="formLogin[key]"
          />
        </Field>
      </div>

      <div class="mb-4 flexBetween text-blue-500 hover:underline">
        <RouterLink to="register" class="">Đăng ký</RouterLink>
      </div>

      <button type="submit" class="btn_blue_hover w-full">Đăng nhập</button>
    </form>
  </div>
</template>
