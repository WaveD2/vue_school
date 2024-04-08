<script setup>
import { reactive, watch, ref, computed, onMounted } from 'vue'
import store from '@/store'

import Input from '../components/Input.vue'
import Field from '../components/Field.vue'
import Select from '@/components/Select.vue'
import FiledImage from '@/components/FiledImage.vue'
import FieldFile from '@/components/FieldFile.vue'
import Tabs from '@/components/Tabs.vue'
import TooltipVue from '@/components/Tooltip.vue'

import { validateUser } from '@/utils/validateYub'
import { arrayToObject } from '@/utils/function'

import { useRoute } from 'vue-router'

const route = useRoute()

const formProfile = computed(() => store.state.user)

const errors = ref({})

onMounted(async () => {
  localStorage.setItem('previousRoute', route.path)

  if (Object.keys(formProfile.value).length === 0) await store.dispatch('getInfoUser')
})

async function submit() {
  errors.value = {}
  try {
    const { username } = formProfile.value

    validateUser.validateSync({ name: username }, { abortEarly: false })

    // await store.dispatch('updateUserCurrent', {
    //   formProfile
    // })
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
    <div class="mt-6 w-full flex gap-2 max-md:flex-col">
      <div class="flex max-md:justify-center"></div>
      <div class="flex gap-x-4">
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

      <TooltipVue>
        <span class="bg-red-100 px-4 py-2">Hover me</span>
        <template v-slot:tooltip-content>
          <span class="text-nowrap">This is a tooltip</span>
        </template>
      </TooltipVue>
    </div>
    <div class="w-full flexEnd">
      <button type="button" @click="submit" class="btn_blue_hover w-1/5 max-md:w-2/5">Lưu</button>
    </div>
  </div>
</template>
