<script setup>
import { FIL_TAB_CONTENT_TEACHER, LIST_OPTIONS, TAB_CONTENT_TEACHER } from '@/constants/options'
import Tabs from './Tabs.vue'
import Field from './Field.vue'
import Input from './Input.vue'
import FiledImage from './FiledImage.vue'
import Select from './Select.vue'
import FieldFile from './FieldFile.vue'
import Button from './Button.vue'
import Textarea from './Textarea.vue'
import ModalComponent from './ModalComponent.vue'
import { computed, onMounted, reactive, ref, watch, watchEffect } from 'vue'
import { getLocalStorage } from '@/axios/setupApi'
import SelectComponent from './SelectComponent.vue'

const props = defineProps({
  settingDataTable: {
    type: Object,
    default: {}
  },
  isActiveSettingTable: {
    type: Object,
    default: {}
  },
  isInnerModal: Boolean,
  typeModal: {
    type: Object,
    default: {}
  },
  typeButtonModal: {
    type: Object,
    default: {}
  },
  isDisabledModal: {
    type: Boolean,
    default: false
  },
  isLoadingModal: {
    type: Boolean,
    default: false
  },
  valueDetailModal: {
    type: Object,
    default: {}
  },
  errors: {
    default: {}
  }
})
const emit = defineEmits(['closeModal'])
const isChangeTab = ref(false)
const typeModal = ref(props.typeModal)
const settingTable = reactive(getLocalStorage('listSettingTable') || [])

watch(props.settingDataTable, (newValue, oldValue) => {
  if (settingTable.length > 0) return
  settingTable.push(JSON.parse(JSON.stringify(newValue)))
})

const isActiveSetting = reactive({})
watchEffect(() => {
  Object.assign(isActiveSetting, JSON.parse(JSON.stringify(props.isActiveSettingTable)))
})

const typeButton = computed(() => props.typeButtonModal)

const handleClose = () => {
  for (let i = settingTable.length - 1; i >= 0; i--) {
    if (settingTable[i].filed.length < 3) {
      settingTable.splice(i, 1)
    }
  }
  isActiveSetting.keyActive = settingTable[settingTable.length - 1].key
  emit('closeModal')
}

const handleChangeSetting = (key) => {
  isActiveSetting.keyActive = key
  typeButton.value.label = settingTable[key]?.filed.length === 0 ? 'Tạo cài đặt' : 'Lưu cài đặt'
}

const handleChangeNameTag = (event, key) => {
  if (event.target.classList.contains('fa-pen-to-square') && event.target) {
    handleChangeSetting(key)
    isChangeTab.value = true
    setTimeout(() => {
      document.querySelector(`#input-setting-${key}`).focus()
    }, 0)
  } else {
    isChangeTab.value = false
  }
}

const handleChangeSettingOption = (newOption) => {
  const indexSettingCurrent = settingTable.findIndex(
    (item) => item.key == isActiveSetting.keyActive
  )

  if (indexSettingCurrent !== -1) {
    const settingCurrent = settingTable[indexSettingCurrent]

    if (settingCurrent[isActiveSetting.filedActive].includes(newOption)) {
      // Xóa giá trị nếu newOption đã tồn tại trong settingCurrent
      settingCurrent[isActiveSetting.filedActive] = settingCurrent[
        isActiveSetting.filedActive
      ].filter((option) => option !== newOption)
    } else {
      // Thêm giá trị nếu newOption không tồn tại trong settingCurrent
      settingTable[indexSettingCurrent][isActiveSetting.filedActive].push(newOption)
    }

    // Cập nhật settingTable tại indexSettingCurrent
    settingTable.splice(indexSettingCurrent, 1, settingCurrent)
  }
}

const handleDeleteNameTag = (key) => {
  if (settingTable.length <= 1) return

  const index = settingTable.findIndex((setTable) => setTable.key === key)

  if (index !== -1 && isActiveSetting.keyActive === key) {
    if (index > 0) {
      isActiveSetting.keyActive = settingTable[index - 1].key
    } else if (index < settingTable.length) {
      isActiveSetting.keyActive = settingTable[index].key
    }
  }

  settingTable.splice(index, 1)
  isActiveSetting.listTitleTable.splice(index, 1)
}
const handleCreateOptionSetting = () => {
  const keyIndex = Math.max(...settingTable.map((option) => option.key), 0) + 1
  const newOptionSetting = {
    title: 'Cài đặt mới',
    sort: [],
    filed: [],
    key: keyIndex
  }
  settingTable.push(newOptionSetting)

  isActiveSetting.listTitleTable.push({ text: newOptionSetting.title, value: keyIndex })
}

const beforeLeave = (el) => {
  const { marginLeft, marginTop, width, height } = window.getComputedStyle(el)
  el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`
  el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`
  el.style.width = width
  el.style.height = height
}

const focusFirstInput = () => {
  setTimeout(() => {
    const inputs = document.querySelectorAll('.input-modal-detail')
    for (const input of inputs) {
      if (!input.disabled) {
        input.focus()
        break
      }
    }
  }, 0)
}

watch(typeModal.value, (newValue, oldValue) => {
  focusFirstInput()
})
</script>

<template>
  <ModalComponent
    :errors="errors['error']"
    :disabled="isDisabledModal"
    :is-inner-modal="props.isInnerModal"
    @close-modal="handleClose"
    :is-loading-modal="isLoadingModal"
    :style-modal-box="[
      typeModal.optionSelect && typeModal.type !== 'delete'
        ? 'top-0 right-0 bottom-0'
        : 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 !w-[500px]'
    ]"
  >
    <template #title>
      <p class="text-lg text-[#353636] font-bold" v-html="typeModal.label"></p>
    </template>

    <!-- Modal Content -->
    <template #content>
      <!-- This info detail table -->
      <div class="mt-2" v-if="typeModal.optionSelect && Object.keys(valueDetailModal).length > 0">
        <Field :class="'flex justify-center'">
          <filed-image
            type="file"
            v-model="valueDetailModal.avatar"
            :disabled="isDisabledModal"
            :error="errors.avatar"
            styleByClass="w-40 h-40 rounded-full max-md:!w-50 max-md:!h-50"
          />
        </Field>
        <div class="w-auto px-10 flex gap-x-10 flex-wrap" id="wrapper-add-input">
          <div
            v-for="(label, key) of typeModal.optionSelect"
            :key="key"
            :class="`${
              key === 'note' || key === 'contracts'
                ? 'w-[calc(50%-20px)]'
                : key === 'avatar' || (label.disabled && typeModal.type === 'add')
                  ? '!hidden'
                  : 'w-[30%]'
            }`"
          >
            <template v-if="key !== 'avatar'">
              <Field
                v-if="
                  (key !== 'avatar' && key !== 'search') ||
                  (label.disabled && typeModal.type === 'add')
                "
                :label="label.text"
                :error="errors[key]"
                :required="label.required"
              >
                <SelectComponent
                  v-if="LIST_OPTIONS.hasOwnProperty(key) && Array.isArray(LIST_OPTIONS[key])"
                  v-model="valueDetailModal[key]"
                  :options="LIST_OPTIONS[key]"
                  :is-inner-label="typeModal.type === 'add' ? false : true"
                  :invalid="errors[key]"
                  :disabled="isDisabledModal || label.disabled"
                  :style-class="`${label.disabled && '!bg-[#b9b8b8]'} w-full h-10`"
                />
                <Input
                  v-else-if="key === 'dateOfBirth'"
                  v-model="valueDetailModal[key]"
                  type="date"
                  :invalid="errors[key]"
                  :disabled="isDisabledModal || label.disabled"
                  :style-class="`${label.disabled && '!bg-[#b9b8b8]'} w-full`"
                />
                <Textarea
                  v-else-if="key === 'note'"
                  v-model="valueDetailModal[key]"
                  type="text"
                  :invalid="errors[key]"
                  :disabled="isDisabledModal || label.disabled"
                  :style-class="`${label.disabled && '!bg-[#b9b8b8]'} w-full`"
                />
                <FieldFile
                  v-else-if="key === 'contracts'"
                  v-model="valueDetailModal.contracts"
                  :disabled="isDisabledModal || label.disabled"
                  style-by-class="!max-h-[140px] !min-h-[138px] overflow-y-scroll"
                />

                <Input
                  v-else-if="
                    (key !== 'avatar' && key !== 'search') ||
                    (label.disabled && typeModal.type === 'add')
                  "
                  type="text"
                  v-model="valueDetailModal[key]"
                  :invalid="errors[key]"
                  :disabled="isDisabledModal || label.disabled"
                  :style-class="`${label.disabled && '!bg-[#b9b8b8]'} 
                  w-full  input-modal-detail`"
                />
              </Field>
            </template>
          </div>
        </div>
      </div>

      <!-- Config setting inner col table - sort -->
      <section
        class="mt-2 px-6 flex gap-x-6 h-[96%]"
        v-if="Object.keys(valueDetailModal).length === 0 && typeModal.type !== 'delete'"
      >
        <div class="min-w-max max-w-52 overflow-hidden border-2 border-r-gray-300 mt-9 rounded-md">
          <Button
            byStyleClass="p-2 w-full text-center cursor-pointer hover:bg-blue-200 tr"
            @click="handleCreateOptionSetting"
          >
            <p class="text-base py-2 font-medium">
              <span class="text-[#333]">Tạo cài đặt mới</span>
              <i class="fa-solid fa-plus text-[#15ade3] ml-2"></i>
            </p>
          </Button>
          <transition-group
            enter-active-class="transition-group"
            enter-class="opacity-0 -translate-x-full"
            enter-to-class="opacity-100 translate-x-0"
            leave-active-class="absolute transition-group"
            leave-class="opacity-100 translate-x-0"
            leave-to-class="opacity-0 -translate-x-full"
            tag="div"
            @before-leave="beforeLeave"
          >
            <div v-for="(setting, key) in settingTable" class="transition-all duration-300">
              <Button
                @click.self="handleChangeSetting(setting.key)"
                :id="setting.key"
                :byStyleClass="`p-2 w-full flex items-center gap-x-4  border border-b-gray-200 cursor-pointer ${setting.key == isActiveSetting.keyActive && 'bg-gray-200'} `"
              >
                <Input
                  @onClick="handleChangeSetting(setting.key)"
                  type="text"
                  :id="`input-setting-${setting.key}`"
                  v-model="setting.title"
                  :styleClass="`border-transparent w-min ${setting.key == isActiveSetting.keyActive && isChangeTab && ' !border-gray-200 !bg-white'} `"
                  :focus="setting.key === isActiveSetting.keyActive && isChangeTab"
                  :disabled="setting.key !== isActiveSetting.keyActive || !isChangeTab"
                />
                <i
                  class="fa-regular fa-pen-to-square text-[#15ade3] text-base"
                  @click.self="handleChangeNameTag($event, setting.key)"
                ></i>
                <!-- 
                  v-if="settingTable.length !== 1"
                 -->
                <i
                  class="fa-regular fa-trash-can text-red-500 text-base"
                  :class="settingTable.length === 1 && '!text-red-200'"
                  @click.self="handleDeleteNameTag(setting.key)"
                ></i>
              </Button>
            </div>
          </transition-group>
        </div>
        <div>
          <!-- Tabs component  -->
          <Tabs
            @change-tab="(newTab) => (isActiveSetting.filedActive = newTab)"
            :is-active="isActiveSetting.filedActive"
            :tabs="TAB_CONTENT_TEACHER"
          />

          <!--Tabs Content  -->
          <div class="">
            <div class="w-full" v-for="tabContent in FIL_TAB_CONTENT_TEACHER">
              <p class="text-base pt-1" v-if="isActiveSetting.filedActive === 'filed'">
                {{ tabContent.label }} :
              </p>

              <div class="flex gap-3 flex-wrap mt-4">
                <template v-for="(label, key) of typeModal.optionSelect">
                  <div
                    class="w-40"
                    v-if="
                      key !== 'avatar' &&
                      key !== 'contact' &&
                      label.type === tabContent.key &&
                      !!label?.group?.includes(isActiveSetting.filedActive)
                    "
                  >
                    <Field
                      :id="key"
                      :label="label.text"
                      styleClass="flex items-center w-full flex-start gap-x-4  flex-row-reverse pr-3 "
                    >
                      <Input
                        :id="key"
                        #content
                        @on-update-value-check-box="handleChangeSettingOption"
                        type="checkbox"
                        :checked="
                          !!settingTable
                            .find((item) => item.key == isActiveSetting.keyActive)
                            [isActiveSetting.filedActive].includes(key)
                        "
                        styleClass="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 !h-5 !w-5 rounded checked:!bg-blue-300"
                        :keyInput="key"
                      />
                    </Field>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!--  -->
    </template>

    <!-- Footer Modal -->
    <template #footer>
      <div class="w-full flexAround py-[10px] border-t border-gray-200">
        <Button
          :by-style-class="`${typeModal.type == 'delete' ? 'bg-[#417bfa] hover:bg-[#1159f8eb]' : 'bg-[#93b1f3eb] hover:bg-[#1159f8eb] '} w-1/4 py-2 rounded-md text-base   text-white`"
          @click="handleClose"
          >Đóng</Button
        >
        <Button
          v-if="Object.keys(typeButton).length > 0"
          :by-style-class="`${typeModal.type == 'delete' ? 'bg-[#93b1f3eb] hover:bg-[#1159f8eb]' : 'bg-[#417bfa] hover:bg-[#1159f8eb] '} w-1/4 py-2 rounded-md text-base   text-white`"
          id="btnSubmit"
          @click="
            typeButton.handleActive(
              typeButtonModal.type === 'settingTable'
                ? { settingTable, keyActive: isActiveSetting.keyActive }
                : { type: typeModal.type }
            )
          "
        >
          {{ typeButton.label }}
        </Button>
      </div>
    </template>
  </ModalComponent>
</template>

<style lang="scss" scoped></style>
