<script setup lang="ts">
import type { IOnlyOfficeConfig } from "@/types/global/only-office-config.ts";
import type {
  ClientManagerModalAction,
  TGuaranteeStatus,
  TOnlyOfficeMode,
} from "@/types/ui/guarantees.ts";
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { handleError, setToast } from "@/utils/notification.ts";
import clientManagerService from "@/services/client-manager.service.ts";
import { DocumentEditor } from "@onlyoffice/document-editor-vue";
import { envConfig } from "@/config/env.ts";
import BaseTitleComponent from "@/components/shared/BaseTitleComponent.vue";
import BaseButton from "@/components/shared/BaseButton.vue";
import GuaranteeSentToBankFormComponent from "@/pages/dashboard/client-manager/components/GuaranteeSentToBankFormComponent.vue";
import GuaranteeResentToBankFormComponent from "@/pages/dashboard/client-manager/components/GuaranteeResentToBankFormComponent.vue";
import PdfViewer from "@/components/shared/PdfViewer.vue";
import fileService from "@/services/file.service.ts";

interface IDocEditor {
  save: () => void;
  print: () => void;
  downloadAs: (format: string) => void;
  refreshHistory: () => void;
}

const route = useRoute();
const { t } = useI18n();

const modalActions = reactive<ClientManagerModalAction>({
  data: null,
  openSendToBankModal: false,
  openResendToBankModal: false,
});
const loading = ref<boolean>(false);
const sentToMainBankLoading = ref<boolean>(false);
const pdfUrl = ref<string>();
const onlyOfficeConfig = ref<IOnlyOfficeConfig>();
const showingEditStatuses = ref<TGuaranteeStatus[]>([
  "CREATED_BY_CLIENT_MANAGER",
  "RETURNED_FOR_REVISION",
]);

onMounted(async () => {
  if (route.params.id) {
    const id = parseInt(route.params.id as string);
    await getGuaranteeDetail(id);
  }
});

async function getOnlyOfficeConfig(id: number) {
  try {
    loading.value = true;
    const mode: TOnlyOfficeMode =
      modalActions.data &&
      showingEditStatuses.value.includes(modalActions.data.status)
        ? "edit"
        : "view";
    onlyOfficeConfig.value = await clientManagerService.getOnlyOfficeConfig(
      id,
      mode,
    );
  } catch (error) {
    handleError(error);
  } finally {
    loading.value = false;
  }
}

async function getGuaranteeDetail(id: number) {
  try {
    loading.value = true;
    modalActions.data = await clientManagerService.getGuaranteeDetails(id);
    if (modalActions.data.pdfUrl) {
      pdfUrl.value = await fileService.getPdfObjectUrl(
        `/api/client-manager/guarantees/${modalActions.data.id}/pdf`,
      );
    } else {
      await getOnlyOfficeConfig(id);
    }
  } catch (error) {
    handleError(error);
  } finally {
    loading.value = false;
  }
}

async function refreshData() {
  if (route.params.id) {
    const id = parseInt(route.params.id as string);
    await getGuaranteeDetail(id);
  }
}

function onLoadComponentError(
  errorCode?: string | number,
  errorDescription?: string,
) {
  switch (errorCode) {
    case -1: // Unknown error loading component
      setToast({
        type: "error",
        message: errorDescription ?? "Unknown error loading component",
      });
      break;

    case -2: // Error load DocsAPI from `{document server url is taken from environment}`
      setToast({
        type: "error",
        message:
          errorDescription ??
          `Error load DocsAPI from ${envConfig.onlyOfficeServerUrl}`,
      });
      break;

    case -3: // DocsAPI is not defined
      setToast({
        type: "error",
        message: errorDescription ?? "DocsAPI is not defined",
      });
      break;
  }
}
</script>

<template>
  <base-title-component :title="t('client_manager.guarantee_details')" closable>
    <template #actions>
      <a-space>
        <base-button
          v-if="modalActions.data?.status === 'CREATED_BY_CLIENT_MANAGER'"
          @click="modalActions.openSendToBankModal = true"
          :loading="sentToMainBankLoading"
          type="primary"
          size="large"
        >
          {{ t("client_manager.sent_to_main_bank") }}
        </base-button>
        <base-button
          v-if="modalActions.data?.status === 'RETURNED_FOR_REVISION'"
          @click="modalActions.openResendToBankModal = true"
          :loading="sentToMainBankLoading"
          type="primary"
          size="large"
        >
          {{ t("client_manager.resent_to_main_bank") }}
        </base-button>
      </a-space>
    </template>
  </base-title-component>
  <a-spin :spinning="loading">
    <a-alert
      v-if="modalActions.data?.revisionComment"
      show-icon
      type="warning"
      :message="modalActions.data?.revisionComment"
      class="mb-4"
    />
    <div
      class="h-[calc(100vh-250px)] flex justify-center items-center gap-4 bg-white rounded-lg p-3"
    >
      <pdf-viewer v-if="pdfUrl" :url="pdfUrl" />
      <DocumentEditor
        v-if="onlyOfficeConfig"
        id="docEditor"
        :config="onlyOfficeConfig"
        :documentServerUrl="envConfig.onlyOfficeServerUrl"
        :onLoadComponentError="onLoadComponentError"
      />
    </div>
  </a-spin>

  <a-modal
    v-model:open="modalActions.openSendToBankModal"
    :footer="null"
    centered
    destroy-on-close
  >
    <guarantee-sent-to-bank-form-component
      v-model:modalAction="modalActions"
      @approve="refreshData"
    />
  </a-modal>
  <a-modal
    v-model:open="modalActions.openResendToBankModal"
    :footer="null"
    centered
    destroy-on-close
  >
    <guarantee-resent-to-bank-form-component
      v-model:modalAction="modalActions"
      @approve="refreshData"
    />
  </a-modal>
</template>

<style scoped></style>
