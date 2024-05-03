<script setup>
import { loginSchema } from '@/utils/validateYub'
import { reactive, ref, defineEmits, onMounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import store from '@/store'
import Field from '@/components/Field.vue'
import { LABEL_LOGIN } from '@/constants/options'
import { arrayToObject } from '@/utils/function'
import { getCookie } from '@/axios/setupApi'

const router = useRouter()

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
    const sortPreviousRoute = localStorage.getItem('previousRoute') || ''
    const routerCurrent = sortPreviousRoute.includes('url=')
      ? decodeURIComponent(decodeURIComponent(sortPreviousRoute.split('url=')[1]))
      : '/teacher'
    localStorage.setItem('previousRoute', routerCurrent)

    return router.push(routerCurrent)
    // check url - path
    // router.push({ path: route.path, query:  })
  } else {
    store.commit('SET_MES_API_ERROR', [])
  }
}

const handleSubmitForm = async () => {
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
}
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
