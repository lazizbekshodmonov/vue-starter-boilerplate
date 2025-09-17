<script setup lang="ts">
import IconCircleCheck from "@/components/icons/IconCircleCheck.vue";
import BaseButton from "@/components/shared/BaseButton.vue";
import IconCircleClose from "@/components/icons/IconCircleClose.vue";
import IconFile from "@/components/icons/IconFile.vue";
import { useI18n } from "vue-i18n";
import type { IGuarantee, TGuaranteeStatus } from "@/types/ui/guarantees.ts";
import { ref } from "vue";

interface Props {
  guarantee: IGuarantee;
}

interface Emits {
  approve: [];
  return: [];
  openDocument: [];
}

const emits = defineEmits<Emits>();
defineProps<Props>();
const { t } = useI18n();

const showApproveAndAccess = ref<TGuaranteeStatus[]>([
  "RESUBMITTED_TO_MAIN_BANK",
  "SENT_TO_MAIN_BANK",
]);
</script>

<template>
  <div class="flex justify-end gap-5">
    <base-button
      v-if="showApproveAndAccess.includes(guarantee.status)"
      @click="emits('approve')"
      type="primary"
    >
      <template #icon>
        <icon-circle-check class="text-lg" />
      </template>
      {{ t("rep_kad.approve") }}
    </base-button>
    <base-button
      v-if="showApproveAndAccess.includes(guarantee.status)"
      @click="emits('return')"
      type="primary"
      danger
      html-type="submit"
    >
      <template #icon>
        <icon-circle-close class="text-lg" />
      </template>
      {{ t("rep_kad.return") }}
    </base-button>
    <base-button @click="emits('openDocument')">
      <template #icon>
        <icon-file class="text-lg" />
      </template>
      {{ t("see_document") }}
    </base-button>
  </div>
</template>

<style scoped></style>
