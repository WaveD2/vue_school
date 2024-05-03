<script setup>
import { VALUE_REGISTER } from '@/constants/options'
import { reactive, ref } from 'vue'

const emit = defineEmits(['setLoading'])

const formRegister = reactive(VALUE_REGISTER)
const isLoading = ref(false)
const typeError = reactive({
  type: null,
  message: null
})

const handleSubmitForm = async () => {
  console.log('formRegister', formRegister)
}
</script>

<template>
  <div class="md:p-16 sm:20 p-5 w-screen max-w-lg lg:w-1/2">
    <h1 class="h1 mb-3 text-center">Đăng ký</h1>
    <form class="flexCol gap-y-1">
      <div class="mb-1">
        <label for="username" class="text-lg block mb-1 text-gray-600">Tên đăng nhập</label>
        <input
          type="text"
          id="username"
          name="username"
          class="input_form"
          autocomplete="off"
          v-model="formRegister.username"
        />
        <p v-show="typeError.type == 'username'" class="p text-error mt-2">
          {{ typeError.message }}
        </p>
      </div>
      <div class="mb-1">
        <label for="email" class="text-lg block mb-1 text-gray-600">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          class="input_form"
          autocomplete="off"
          v-model="formRegister.email"
        />
        <p v-show="typeError.type == 'email'" class="p text-error mt-2">
          {{ typeError.message }}
        </p>
      </div>

      <div class="mb-1">
        <label for="password" class="text-lg block mb-1 text-gray-600">Mật khẩu</label>
        <input
          type="password"
          id="password"
          name="password"
          class="input_form"
          autocomplete="off"
          v-model="formRegister.password"
        />
        <p v-show="typeError.type == 'password'" class="p text-error mt-2">
          {{ typeError.message }}
        </p>
      </div>
      <div class="mb-1">
        <label for="passwordConfirmation" class="text-lg block mb-1 text-gray-600"
          >Nhập lại mật khẩu</label
        >
        <input
          type="password"
          id="passwordConfirmation"
          name="passwordConfirmation"
          class="input_form"
          autocomplete="off"
          v-model="formRegister.passwordConfirmation"
        />
        <p v-show="typeError.type == 'passwordConfirmation'" class="p text-error mt-2">
          {{ typeError.message }}
        </p>
      </div>

      <div class="mb-2 flex items-center">
        <input type="checkbox" id="remember" name="remember" class="text-blue-500" />
        <label for="remember" class="text-gray-600 ml-2">Ghi nhớ </label>
      </div>

      <div class="mb-1">
        <span class="">Bạn đã có tài khoản?</span>

        <RouterLink to="login" class="text-blue-500 hover:underline">Đăng nhập</RouterLink>
      </div>

      <button type="button" @click="handleSubmitForm" class="btn_blue_hover w-full">Đăng ký</button>
    </form>
  </div>
</template>
