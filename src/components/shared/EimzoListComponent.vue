<!-- src/components/eri/EriSignaturePicker.vue -->
<script setup lang="ts">
import IconCheckOutline from "@/components/icons/IconCheckOutline.vue";
import { formatDateNumeric, isExpired } from "@/utils/date";
import { useI18n } from "vue-i18n";
import useNotification from "@/composables/useNotification.ts";
import useEImzoKeys, { type Certificate } from "@/plugins/useEImzoKeys.ts";
import { computed, ref, watch } from "vue";
import useUserStore from "@/store/user.store.ts";
import { storeToRefs } from "pinia";

interface Emits {
  onSigned: [string | null];
}
const emits = defineEmits<Emits>();

const { setToast } = useNotification();
const { t } = useI18n();

const [keys, pkcs7_64, error, getItem] = useEImzoKeys();

const userStore = useUserStore();

const { userProfile } = storeToRefs(userStore);

const loadingEimzoKeys = ref(true);
const selectedKey = defineModel<Certificate | null>("selectedKey");

const filteredSignatures = computed<Certificate[]>(() => {
  return keys.value.filter((item) => item.PINFL === userProfile.value?.pinfl);
});

watch(filteredSignatures, () => {
  loadingEimzoKeys.value = false;
  if (filteredSignatures.value.length === 1) {
    selectedKey.value = filteredSignatures.value[0];
  }
});

watch([pkcs7_64, error], () => {
  if (pkcs7_64.value) {
    error.value = null;
    emits("onSigned", pkcs7_64.value);
  } else if (error.value) {
    pkcs7_64.value = null;
    emits("onSigned", null);
    setToast({
      type: "warning",
      message: error.value,
    });
  }
});

function selectKey(key: Certificate) {
  selectedKey.value = key;
}

function generatePkcs7(data: string) {
  if (!selectedKey.value) return;
  getItem({
    UUID: JSON.stringify({ hashHex: data }),
    ...selectedKey.value,
  });
}

defineExpose({ generatePkcs7 });
</script>

<template>
  <div class="flex flex-col gap-4 overflow-y-auto">
    <a-card
      v-for="key in filteredSignatures"
      :key="key.serialNumber"
      @click="selectKey(key)"
      :class="{
        'border-primary_color': key.serialNumber === selectedKey?.serialNumber,
      }"
      class="cursor-pointer"
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
        <a-descriptions-item :label="t('status')">
          <span v-if="isExpired(key.validTo)" class="text-red-900">
            {{ t("expired") }}
          </span>
          <span v-else class="text-primary_color">
            {{ t("active") }}
          </span>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
  </div>
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
