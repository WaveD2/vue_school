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

const formProfile = reactive(Object.assign({}, store.state.user))

const errors = ref({})

onMounted(async () => {
  if (Object.keys(formProfile).length === 0) await store.dispatch('getInfoUser')
})

async function submit() {
  errors.value = {}
  try {
    const { username } = formProfile

    validateUser.validateSync({ name: username }, { abortEarly: false })

    await store.dispatch('updateUserCurrent', {
      formProfile
    })
  } catch (error) {
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
      <div class="flex max-md:justify-center"></div>
      <div class="flex-1 px-4 flex flex-wrap gap-3 max-md:flexCol max-md:gap-2">
        <Field label="Tên đăng nhập" required :error="errors.username">
          <Input v-model="formProfile.username" type="text" />
        </Field>

        <Field label="Parent ID" required>
          <Input v-model="formProfile.parentId" :disabled="true" type="text" />
        </Field>
        <Field label="Số điện thoại" required v-if="formProfile.parent">
          <Input v-model="formProfile.parent.phone" type="text" />
        </Field>
        <Field label="Trạng thái" required v-if="formProfile.status">
          <Input v-model="formProfile.status" type="text" />
        </Field>
        <Field label="Quyền" required v-if="formProfile.role">
          <Input v-model="formProfile.role" type="text" />
        </Field>
      </div>
    </div>
    <div class="w-full flexEnd">
      <button type="button" @click="submit" class="btn_blue_hover w-1/5 max-md:w-2/5">Lưu</button>
    </div>
  </div>
</template>
