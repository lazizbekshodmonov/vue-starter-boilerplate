<script setup lang="ts">
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import useEImzoKeys, { type Certificate } from "@/plugins/useEImzoKeys.ts";
import useNotification from "@/composables/useNotification.ts";
import IconFingerPrint from "@/components/icons/IconFingerPrint.vue";
import { formatDateNumeric, isExpired } from "@/utils/date.ts";
import IconCheckOutline from "@/components/icons/IconCheckOutline.vue";

interface IEmits {
  onChange: [Certificate | null];
  onGeneratePkcs7: [string | null];
}

interface IProps {
  disable?: boolean;
}

defineProps<IProps>();

const emits = defineEmits<IEmits>();

const modelValue = defineModel<Certificate | null>("selectedKey", {
  required: true,
});

defineExpose({
  generatePkcs7,
});

const { setToast } = useNotification();
const { t } = useI18n();
const [keys, pkcs7_64, error, getItem] = useEImzoKeys();

const loadingEimzoKeys = ref<boolean>(true);
const visibleModal = ref<boolean>(false);

watch(keys, () => {
  loadingEimzoKeys.value = false;
});

watch([pkcs7_64, error], () => {
  if (pkcs7_64.value) {
    error.value = null;
    emits("onGeneratePkcs7", pkcs7_64.value);
  } else if (error.value) {
    pkcs7_64.value = null;
    emits("onGeneratePkcs7", null);
    setToast({
      type: "warning",
      message: error.value,
    });
  }
});

function handleChangeSelect(key: Certificate) {
  modelValue.value = key ?? null;
  visibleModal.value = false;
}

function generatePkcs7(data: string | object) {
  if (data && modelValue.value) {
    getItem({
      ...modelValue.value,
      UID: typeof data === "object" ? JSON.stringify(data) : data,
    });
  } else if (modelValue.value) {
    getItem(modelValue.value);
  }
}
</script>

<template>
  <div
    @click="visibleModal = true"
    class="w-full h-12 flex justify-between items-center px-4 rounded-lg border-2 cursor-pointer"
  >
    <div class="flex items-center gap-2">
      <icon-finger-print class="text-2xl text-text_secondary" />
      <span class="text-base text-text_secondary">
        {{ selectedKey ? selectedKey?.CN : t("select_eri_key") }}
      </span>
    </div>
  </div>
  <a-modal
    v-model:open="visibleModal"
    centered
    width="700px"
    :footer="null"
    :title="t('choose_a_digital_signature')"
  >
    <div class="flex flex-col gap-4 h-[calc(100vh-200px)] overflow-y-auto">
      <a-card
        v-for="key in keys"
        @click="handleChangeSelect(key)"
        :class="{
          'border-primary_color':
            key.serialNumber === selectedKey?.serialNumber,
        }"
      >
        <div
          v-if="key.serialNumber === selectedKey?.serialNumber"
          class="w-5 h-5 flex justify-center items-center text-[10px] bg-primary_color text-white rounded-full absolute right-2 top-2"
        >
          <icon-check-outline />
        </div>
        <a-descriptions :title="key.CN" layout="vertical">
          <a-descriptions-item :label="t('pinfl')">
            {{ key.PINFL }}
          </a-descriptions-item>
          <a-descriptions-item :label="t('inn')">
            {{ key.TIN }}
          </a-descriptions-item>
          <a-descriptions-item :label="t('certificate_number')">
            {{ key.serialNumber }}
          </a-descriptions-item>
          <a-descriptions-item label="Ro’yxatdan o’tish vaqti" :span="2">
            {{ formatDateNumeric(key.validFrom) }} -
            {{ formatDateNumeric(key.validTo) }}
          </a-descriptions-item>
          <a-descriptions-item label="Remark">
            <span v-if="isExpired(key.validTo)" class="text-red-900">
              {{ t("expired") }}
            </span>
            <span v-else class="text-primary_color">
              {{ t("successfully") }}
            </span>
          </a-descriptions-item>
        </a-descriptions>
      </a-card>
    </div>
  </a-modal>
</template>

<style scoped lang="scss">
:deep(.ant-card) {
  .ant-card-body {
    @apply relative;
  }
  @apply transition-all;
  &:hover {
    background: rgba(120, 127, 149, 0.14);
  }
}
:deep(.ant-descriptions-item) {
  @apply pb-2 !important;
  .ant-descriptions-item-label {
    @apply text-base text-seattle_60 font-medium !important;
  }
  .ant-descriptions-item-content {
    @apply text-base text-seattle_90 font-medium !important;
  }
}
</style>
