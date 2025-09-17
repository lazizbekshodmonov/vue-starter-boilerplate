<script setup lang="ts" generic="T">
import type { IGuarantee } from "@/types/ui/guarantees.ts";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import { handleError, setToast } from "@/utils/notification.ts";
import eImzoService from "@/services/e-imzo.service.ts";
import fileService from "@/services/file.service.ts";
import branchManagerService from "@/services/branch-manager.service.ts";
import EimzoListComponent from "@/components/shared/EimzoListComponent.vue";
import BaseButton from "@/components/shared/BaseButton.vue";

interface Props {
  document?: IGuarantee | null;
}

interface Emits {
  onSuccessSign: [];
}

const emits = defineEmits<Emits>();
const props = defineProps<Props>();
const open = defineModel("open");

const { t } = useI18n();

const eimzoRef = ref();
const loading = ref<boolean>(false);

async function handleSign() {
  if (props.document) {
    loading.value = true;
    try {
      const hex = await fileService.getFileSHA256(props.document?.docxUrl);
      eimzoRef.value.generatePkcs7(hex);
    } catch (error) {
      loading.value = false;
      handleError(error);
    }
  }
}

async function handleSigned(pkcs7: string | null) {
  if (props.document?.id && pkcs7) {
    try {
      const timestamp = await eImzoService.getTimestamp(pkcs7);
      await branchManagerService.signGuarantee(props.document?.id, timestamp);
      setToast({
        type: "success",
        message: t("branch_manager.guarantee_document_signed_successfully"),
      });
      emits("onSuccessSign");
    } catch (error) {
      handleError(error);
    } finally {
      loading.value = false;
    }
  } else {
    loading.value = false;
  }
}
</script>

<template>
  <a-modal
    v-model:open="open"
    centered
    width="700px"
    :footer="null"
    :title="t('choose_a_digital_signature')"
  >
    <div class="flex flex-col max-h-[calc(100vh-200px)] gap-3">
      <div class="flex-grow-0 overflow-y-auto">
        <eimzo-list-component ref="eimzoRef" @on-signed="handleSigned" />
      </div>
      <div class="flex justify-center flex-shrink">
        <base-button
          @click="handleSign"
          :loading="loading"
          type="primary"
          size="large"
          class="w-full"
        >
          {{ t("sign") }}
        </base-button>
      </div>
    </div>
  </a-modal>
</template>

<style scoped></style>
