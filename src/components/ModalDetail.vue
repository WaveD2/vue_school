<script setup>
import { FIL_TAB_CONTENT_TEACHER, LIST_OPTIONS, TAB_CONTENT_TEACHER } from '@/utils/constants'
import Tabs from './Tabs.vue'
import Field from './Field.vue'
import Input from './Input.vue'
import FiledImage from './FiledImage.vue'
import Select from './Select.vue'
import FieldFile from './FieldFile.vue'
import Button from './Button.vue'
import Textarea from './Textarea.vue'
import ModalComponent from './ModalComponent.vue'
import { computed, reactive, ref } from 'vue'

const props = defineProps({
  settingDataTable: {
    type: Array,
    default: []
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

const settingTable = ref(JSON.parse(JSON.stringify(props.settingDataTable)))
const isActiveSetting = ref(JSON.parse(JSON.stringify(props.isActiveSettingTable)))
const typeButton = computed(() => props.typeButtonModal)

const handleClose = () => {
  emit('closeModal')
}

const handleChangeSetting = (key) => {
  isActiveSetting.value.keyActive = key
  typeButton.value.label =
    settingTable.value[key]?.filed.length === 0 ? 'Tạo cài đặt' : 'Lưu cài đặt'
}

const handleChangeNameTag = (event, key) => {
  if (event.target.classList.contains('fa-pen-to-square') && event.target) {
    handleChangeSetting(key)
    isChangeTab.value = true
    setTimeout(() => {
      document.querySelectorAll('input')[isActiveSetting.value.keyActive].focus()
    }, 0)
  } else {
    isChangeTab.value = false
  }
}

const handleChangeSettingOption = (newOption) => {
  const indexSettingCurrent = settingTable.value.findIndex(
    (item) => item.key === isActiveSetting.value.keyActive
  )

  if (indexSettingCurrent !== -1) {
    const settingCurrent = settingTable.value[indexSettingCurrent]

    if (settingCurrent.filed.includes(newOption)) {
      // Xóa giá trị nếu newOption đã tồn tại trong settingCurrent
      settingCurrent.filed = settingCurrent.filed.filter((option) => option !== newOption)
    } else {
      // Thêm giá trị nếu newOption không tồn tại trong settingCurrent
      settingCurrent.filed.push(newOption)
    }

    // Cập nhật settingTable.value tại indexSettingCurrent
    settingTable.value.splice(indexSettingCurrent, 1, settingCurrent)
  }
}

const handleDeleteNameTag = (key) => {
  if (key === isActiveSetting.value.keyActive) isActiveSetting.value.keyActive++
  return (settingTable.value = settingTable.value.filter((setting) => setting.key !== key))
}
const handleCreateOptionSetting = () => {
  const newOptionSetting = {
    title: 'Cài đặt mới',
    // sort typeof Array ['gender', 'status', 'type'],
    sort: [],
    // filed typeof Object ['gender']
    filed: [],
    key: Math.max(...settingTable.value.map((option) => option.key), 0) + 1
  }
  return settingTable.value.push(newOptionSetting)
}
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
                <Select
                  v-model="valueDetailModal[key]"
                  :options="LIST_OPTIONS[key]"
                  :invalid="errors[key]"
                  v-if="LIST_OPTIONS.hasOwnProperty(key) && Array.isArray(LIST_OPTIONS[key])"
                  :disabled="isDisabledModal || label.disabled"
                  :style-class="`${label.disabled && '!bg-[#b9b8b8]'} w-full`"
                />
                <Input
                  v-model="valueDetailModal[key]"
                  type="date"
                  :invalid="errors[key]"
                  v-else-if="key === 'dateOfBirth'"
                  :disabled="isDisabledModal || label.disabled"
                  :style-class="`${label.disabled && '!bg-[#b9b8b8]'} w-full`"
                />
                <Textarea
                  type="date"
                  v-model="valueDetailModal[key]"
                  :invalid="errors[key]"
                  v-else-if="key === 'note'"
                  :disabled="isDisabledModal || label.disabled"
                  :style-class="`${label.disabled && '!bg-[#b9b8b8]'} w-full`"
                />
                <FieldFile
                  v-else-if="key === 'contracts'"
                  :disabled="isDisabledModal || label.disabled"
                  v-model="valueDetailModal.contracts"
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
                  :style-class="`${label.disabled && '!bg-[#b9b8b8]'} w-full`"
                />
              </Field>
            </template>
          </div>
        </div>
      </div>

      <!-- Config setting table - filter -->
      <section
        class="mt-2 px-6 flex gap-x-6 h-[95%]"
        v-if="Object.keys(valueDetailModal).length === 0 && typeModal.type !== 'delete'"
      >
        <div class="min-w-max max-w-52 overflow-hidden border-2 border-r-gray-300 mt-9 rounded-md">
          <Button
            byStyleClass="p-2 w-full text-center cursor-pointer hover:bg-blue-200 tr"
            @click="handleCreateOptionSetting"
          >
            <p class="text-base py-2 font-normal">
              Tạo mới <i class="fa-solid fa-plus text-[#15ade3] ml-2"></i>
            </p>
          </Button>
          <div v-for="(setting, key) in settingTable">
            <Button
              @click.self="handleChangeSetting(setting.key)"
              :id="setting.key"
              :byStyleClass="`p-2 w-full flex items-center gap-x-4  border border-b-gray-200 cursor-pointer ${setting.key == isActiveSetting.keyActive && 'bg-gray-200'} `"
            >
              <Input
                @onClick="handleChangeSetting(setting.key)"
                type="text"
                :id="setting.key"
                v-model="setting.title"
                :styleClass="`border-transparent w-min ${setting.key == isActiveSetting.keyActive && isChangeTab && ' !border-gray-200 !bg-white'} `"
                :focus="setting.key === isActiveSetting.keyActive && isChangeTab"
                :disabled="setting.key !== isActiveSetting.keyActive || !isChangeTab"
              />
              <i
                class="fa-regular fa-pen-to-square text-[#15ade3] text-base"
                @click.self="handleChangeNameTag($event, setting.key)"
              ></i>
              <i
                class="fa-regular fa-trash-can text-red-500 text-base"
                @click.self="handleDeleteNameTag(setting.key)"
              ></i>
            </Button>
          </div>
        </div>
        <div>
          <!-- Tabs component  -->
          <Tabs
            @change-tab="(newTab) => (isActiveSetting.filedActive = newTab)"
            :is-active="isActiveSetting.filedActive"
            :tabs="TAB_CONTENT_TEACHER"
          />

          <!--Tabs Content  -->
          <div class="px-3">
            <div v-for="tabContent in FIL_TAB_CONTENT_TEACHER">
              <p class="text-base pt-1" v-if="isActiveSetting.filedActive === 'filed'">
                {{ tabContent.label }} :
              </p>

              <div class="flex gap-4 flex-wrap mt-4">
                <template v-for="(label, key) of typeModal.optionSelect">
                  <div
                    class="w-auto"
                    v-if="
                      key !== 'avatar' &&
                      key !== 'contact' &&
                      label.type === tabContent.key &&
                      !!label?.group?.includes(isActiveSetting.filedActive)
                    "
                  >
                    <Field
                      :label="label.text"
                      styleClass="flex items-center gap-x-4  flex-row-reverse py-1 pr-3 border border-gray-200 bg-[#ccc] rounded-md "
                    >
                      <Input
                        #content
                        @on-update-value-check-box="handleChangeSettingOption"
                        type="checkbox"
                        :checked="
                          !!settingTable
                            .find((item) => item.key == isActiveSetting.keyActive)
                            [isActiveSetting.filedActive].includes(key)
                        "
                        styleClass="w-[18px] h-[18px]"
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
      <div class="w-full flexAround py-3 border-t border-gray-200">
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
                ? settingTable.find((item) => item.key == isActiveSetting.keyActive)
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
