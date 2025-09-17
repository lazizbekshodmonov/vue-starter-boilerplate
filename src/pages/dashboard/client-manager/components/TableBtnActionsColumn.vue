<script setup lang="ts">
import IconCircleCheck from "@/components/icons/IconCircleCheck.vue";
import BaseButton from "@/components/shared/BaseButton.vue";
import IconFile from "@/components/icons/IconFile.vue";
import { useI18n } from "vue-i18n";
import type { IGuarantee, TGuaranteeStatus } from "@/types/ui/guarantees.ts";
import { ref } from "vue";
import IconPrint from "@/components/icons/IconPrint.vue";
import useCore from "@/store/core.store.ts";
import { storeToRefs } from "pinia";

interface Props {
  guarantee: IGuarantee;
}
interface Emits {
  senToBank: [];
  openDocument: [];
  print: [];
  resendToBank: [];
}

const emits = defineEmits<Emits>();
defineProps<Props>();

const { t } = useI18n();

const coreStore = useCore();
const { loadingUrl } = storeToRefs(coreStore);

const showingSentToBankStatuses = ref<TGuaranteeStatus[]>([
  "CREATED_BY_CLIENT_MANAGER",
]);
const showingPrintStatuses = ref<TGuaranteeStatus[]>([
  "SIGNED_BY_BRANCH",
  "PRINTED_AND_COMPLETED",
]);
</script>

<template>
  <div class="w-full flex justify-end gap-3">
    <base-button
      v-if="showingPrintStatuses.includes(guarantee.status)"
      @click="emits('print')"
      :loading="loadingUrl.has(`download-pdf-${guarantee.id}`)"
      type="primary"
    >
      <template #icon>
        <icon-print class="text-lg" />
      </template>
      {{ t("print") }}
    </base-button>
    <base-button
      v-if="showingSentToBankStatuses.includes(guarantee.status)"
      @click="emits('senToBank')"
      type="primary"
    >
      <template #icon>
        <icon-circle-check class="text-lg" />
      </template>
      {{ t("client_manager.sent_to_main_bank") }}
    </base-button>
    <base-button
      v-if="guarantee.status === 'RETURNED_FOR_REVISION'"
      @click="emits('resendToBank')"
      type="primary"
    >
      {{ t("client_manager.resent_to_main_bank") }}
    </base-button>
    <base-button @click="emits('openDocument')">
      <template #icon>
        <icon-file class="text-lg" />
      </template>
      {{ t("client_manager.see_document") }}
    </base-button>
  </div>
</template>

<style scoped></style>
