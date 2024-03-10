<script setup>
import { reactive, ref } from 'vue'
import store from '@/store'

import Input from '../components/Input.vue'
import Field from '../components/Field.vue'
import Select from '@/components/Select.vue'
import FiledImage from '@/components/FiledImage.vue'
import Tabs from '@/components/Tabs.vue'

const user = {
  name: 'Phạm Văn A',
  username: 'parent1',
  password: '34f83b4b453db075f374fa73365b8283',
  gender: 'male',
  contactInfo: {
    email: 'parent1@example.com',
    phones: ['0987654321'],
    address: ['123 Đường ABC, Quận XYZ, Thành phố HCM']
  },
  roles: ['parent'],
  avatar: {
    key: 'parent1_avatar_key',
    bucket: 'parent1_avatar_bucket',
    url: 'https://example.com/parent1_avatar.jpg'
  },
  createdAt: '2024-03-05T10:40:29.256Z',
  updatedAt: '2024-03-05T10:40:29.256Z',
  id: '65e1b565ae8c0d692731a1dd'
}
const formProfile = reactive(user)

const errors = ref({})

function submit() {
  // errors.value = {
  //   name: 'Name is invalid because...',
  //   email: 'Email is invalid because...',
  //   password: 'Password is invalid because...'
  // }

  console.log('value', formProfile)
}
</script>

<template>
  <div class="p-3 bg-background rounded-md">
    <!-- <div class="flexStart overflow-x-auto overflow-y-hidden 00 whitespace-nowrap">
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
    </div> -->

    <!--  -->
    <Tabs>
      <div class="mt-6 flex gap-2 max-md:flex-col">
        <div class="flex w-1/4 max-md:justify-center max-md:w-full">
          <div class="relative boxImg max-h-64 max-w-64 w-full">
            <img
              :src="'https://i.pinimg.com/236x/02/e6/62/02e662a386b396efe809a4bdcd2446cb.jpg'"
              alt="avatar"
              class="w-full max-h-64 max-w-64 object-cover rounded-full border-2 border-grey-3"
            />
          </div>
        </div>

        <div class="flex-1">
          <div class="px-4 flex flex-wrap gap-3 max-md:flexCol max-md:gap-2 flex-1">
            <Field label="Họ và tên" required :error="errors.name">
              <Input v-model="formProfile.name" type="text" />
            </Field>
            <Field label="Tên đăng nhập" required :error="errors.name">
              <Input v-model="formProfile.username" type="text" />
            </Field>

            <Field label="Email" required :error="errors.email">
              <Input v-model="formProfile.contactInfo.email" type="email" />
            </Field>
            <Field label="Số điện thoại" required :error="errors.email">
              <Input v-model="formProfile.contactInfo.phones" type="text" />
            </Field>
            <Field label="Giới tính" required :error="errors.email">
              <Select v-model="formProfile.contactInfo.gender" />
            </Field>
            <Field label="Địa chỉ" required :error="errors.name" :class="'md:!w-[524px]'">
              <Input v-model="formProfile.contactInfo.address[0]" type="text" />
            </Field>
            <!-- <Field
            label="Password"
            required
            :error="errors.password"
            help="Sould be at least 8 characters long."
          >
            <Input v-model="form.password" type="password" />
          </Field> -->
          </div>
          <div class="w-full flexEnd">
            <button type="button" @click="submit" class="btn_blue_hover w-1/5 max-md:w-2/5">
              Lưu
            </button>
          </div>
        </div>
      </div>
    </Tabs>
  </div>
</template>

<style scoped>
.boxImg:hover::before {
  content: 'Chỉnh sửa';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #9793937e;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: white;
  border-radius: 100%;
  cursor: pointer;
  transition: all ease-in-out 1s;
}
</style>
