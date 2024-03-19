<script setup>
import { reactive, ref, onMounted } from 'vue'
import store from '@/store'

import Input from '../components/Input.vue'
import Field from '../components/Field.vue'
import Select from '@/components/Select.vue'
import FiledImage from '@/components/FiledImage.vue'
import Tabs from '@/components/Tabs.vue'
import { GENDER } from '@/utils/constants'
import { validateUser } from '@/utils/validateYub'
import { arrayToObject } from '@/utils/function'

const formProfile = reactive(Object.assign({}, store.state.user.record))

const errors = ref({})

onMounted(async () => {
  if (Object.keys(formProfile).length === 0) await store.dispatch('getInfoUser')
})

async function submit() {
  errors.value = {}
  try {
    const { username } = formProfile
    const { email } = formProfile.parent

    validateUser.validateSync({ name: username, email: email }, { abortEarly: false })

    await store.dispatch('updateUserCurrent', {
      formProfile
    })
  } catch (error) {
    console.log('ero', error)
    const errorMess = error.inner.map((e) => ({
      [e.path]: e.message
    }))

    errors.value = arrayToObject(errorMess)
  }
}
</script>

<template>
  <div class="p-3 w-full bg-background rounded-md">
    <div
      class="mt-6 w-full flex gap-2 max-md:flex-col"
      v-if="Object.keys(formProfile).length !== 0"
    >
      <div class="flex max-md:justify-center">
        <filed-image
          v-model="formProfile.parent.avatar"
          type="file"
          styleByClass="w-40 h-40 rounded-full max-md:!w-50 max-md:!h-50"
        />
      </div>
      <div class="flex-1 px-4 flex flex-wrap gap-3 max-md:flexCol max-md:gap-2">
        <Field label="Họ và tên" required :error="errors.name">
          <Input v-model="formProfile.username" type="text" />
        </Field>
        <Field label="Tên đăng nhập" required>
          <Input v-model="formProfile.parent.name" :disabled="true" type="text" />
        </Field>
        <Field label="ID" required>
          <Input v-model="formProfile.parentId" :disabled="true" type="text" />
        </Field>

        <Field label="Email" required :error="errors.email" v-if="formProfile.parent.email">
          <Input v-model="formProfile.parent.email" type="email" />
        </Field>
        <Field label="Số điện thoại" required v-if="formProfile.parent">
          <Input v-model="formProfile.parent.phone" type="text" />
        </Field>
        <Field
          label="Quốc tịch"
          required
          :error="errors.nationality"
          v-if="formProfile.parent.nationality"
        >
          <Input v-model="formProfile.parent.nationality" type="text" />
        </Field>

        <Field label="Giới tính" required v-if="formProfile.parent.gender">
          <Select v-model="formProfile.parent.gender" :options="GENDER" />
        </Field>
        <Field label="Địa chỉ" required :class="'md:!w-[460px]'" v-if="formProfile.parent.address">
          <Input v-model="formProfile.parent.address" type="text" />
        </Field>
      </div>
    </div>
    <div class="w-full flexEnd">
      <button type="button" @click="submit" class="btn_blue_hover w-1/5 max-md:w-2/5">Lưu</button>
    </div>
  </div>
</template>
