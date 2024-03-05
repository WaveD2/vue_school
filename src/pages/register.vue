<script setup>
import { VALUE_REGISTER } from '@/utils/constants'
import { loginSchema, registerSchema } from '@/utils/validateYub'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const route = useRouter()

const emit = defineEmits(['setLoading'])

const formRegister = reactive(VALUE_REGISTER)
const isLoading = ref(false)
const typeError = reactive({
  type: null,
  message: null
})

const handleSubmitForm = () => {
  // emit('setLoading', { isLoading })
  // console.log('api', import.meta.env.VUE_APP_API_URL)
  // console.log('api a', process.env.VUE_APP_API_URL)
  try {
    registerSchema.validateSync(formRegister)
    typeError.type = null
    typeError.message = null
  } catch (error) {
    const { path, message } = error

    typeError.type = path
    typeError.message = message

    console.log('error', { error })
  } finally {
  }
  // route.push('/')
}
</script>

<template>
  <div class="md:p-20 sm:16 p-8 w-screen max-w-lg lg:w-1/2">
    <h1 class="h1 mb-8 text-center">Đăng ký</h1>
    <form action="#" method="POST" class="flexCol gap-y-3">
      <div class="mb-4">
        <label for="username" class="text-lg block mb-2 text-gray-600">Tên đăng nhập</label>
        <input type="text" id="username" name="username" class="input_form" autocomplete="off" />
        <p v-show="typeError.type == 'username'" class="p text-error mt-2">
          {{ typeError.message }}
        </p>
      </div>
      <div class="mb-4">
        <label for="email" class="text-lg block mb-2 text-gray-600">Email</label>
        <input type="email" id="email" name="email" class="input_form" autocomplete="off" />
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
        />
        <p v-show="typeError.type == 'username'" class="p text-error mt-2">
          {{ typeError.message }}
        </p>
      </div>
      <div class="mb-4">
        <label for="passwordConfirmation" class="text-lg block mb-2 text-gray-600"
          >Nhập lại mật khẩu</label
        >
        <input
          type="password"
          id="passwordConfirmation"
          name="passwordConfirmation"
          class="input_form"
          autocomplete="off"
        />
        <p v-show="typeError.type == 'username'" class="p text-error mt-2">
          {{ typeError.message }}
        </p>
      </div>

      <div class="mb-4 flex items-center">
        <input type="checkbox" id="remember" name="remember" class="text-blue-500" />
        <label for="remember" class="text-gray-600 ml-2">Ghi nhớ </label>
      </div>

      <div class="mb-4">
        <span class="">Bạn đã có tài khoản?</span>

        <RouterLink to="login" class="text-blue-500 hover:underline">Đăng nhập</RouterLink>
      </div>

      <button type="submit" class="btn_blue_hover w-full">Đăng ký</button>
    </form>
  </div>
</template>
