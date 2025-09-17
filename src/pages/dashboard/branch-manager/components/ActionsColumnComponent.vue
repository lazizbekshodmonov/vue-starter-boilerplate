<script setup lang="ts">
import IconFile from "@/components/icons/IconFile.vue";
import BaseButton from "@/components/shared/BaseButton.vue";
import IconCircleCheck from "@/components/icons/IconCircleCheck.vue";
import { useI18n } from "vue-i18n";
import type { IGuarantee } from "@/types/ui/guarantees.ts";
import IconCircleClose from "@/components/icons/IconCircleClose.vue";

interface Props {
  guarantee: IGuarantee;
}

interface Emits {
  clickEimzo: [];
  openDocument: [];
  clickReturn: [];
}

defineProps<Props>();
const emits = defineEmits<Emits>();

const { t } = useI18n();
</script>

<template>
  <div class="w-full flex justify-end gap-3">
    <base-button
      v-if="guarantee.status === 'WAITING_FOR_BRANCH_SIGNATURE'"
      @click="emits('clickEimzo')"
      type="primary"
      class="flex-shrink-0"
    >
      <template #icon>
        <icon-circle-check class="text-lg" />
      </template>

      {{ t("branch_manager.sign_with_eimzo") }}
    </base-button>
    <base-button
      v-if="guarantee.status === 'WAITING_FOR_BRANCH_SIGNATURE'"
      @click="emits('clickReturn')"
      type="primary"
      danger
      class="flex-shrink-0"
    >
      <template #icon>
        <icon-circle-close class="text-lg" />
      </template>

      {{ t("branch_manager.cancel_guarantee") }}
    </base-button>
    <base-button @click="emits('openDocument')" class="flex-shrink-0">
      <template #icon>
        <icon-file class="text-lg" />
      </template>
      {{ t("see_document") }}
    </base-button>
  </div>
</template>

<style scoped></style>
