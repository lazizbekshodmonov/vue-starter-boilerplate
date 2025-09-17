<script setup lang="ts">
import type { RepKadModalAction } from "@/types/ui/rep-kad.ts";
import type { IOnlyOfficeConfig } from "@/types/global/only-office-config.ts";
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { handleError, setToast } from "@/utils/notification.ts";
import clientManagerService from "@/services/client-manager.service.ts";
import { DocumentEditor } from "@onlyoffice/document-editor-vue";
import { envConfig } from "@/config/env.ts";
import repKadService from "@/services/rep-kad.service.ts";
import BaseButton from "@/components/shared/BaseButton.vue";
import EriSignaturaModal from "@/pages/dashboard/branch-manager/components/EriSignaturaModal.vue";
import BaseTitleComponent from "@/components/shared/BaseTitleComponent.vue";
import PdfViewer from "@/components/shared/PdfViewer.vue";
import fileService from "@/services/file.service.ts";
import GuaranteeCancelForm from "@/pages/dashboard/branch-manager/components/GuaranteeCancelForm.vue";

const route = useRoute();
const { t } = useI18n();

const modalActions = reactive<RepKadModalAction>({
  data: null,
  openSignatureModal: false,
});
const loading = ref<boolean>(false);
const sentToMainBankLoading = ref<boolean>(false);
const pdfUrl = ref<string>();
const onlyOfficeConfig = ref<IOnlyOfficeConfig>();

onMounted(async () => {
  if (route.params.id) {
    const id = parseInt(route.params.id as string);
    await getGuaranteeDetail(id);
  }
});

async function getOnlyOfficeConfig(id: number) {
  try {
    loading.value = true;
    onlyOfficeConfig.value = await clientManagerService.getOnlyOfficeConfig(
      id,
      "view",
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
    modalActions.data = await repKadService.getGuaranteeDetails(id);
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
    await getOnlyOfficeConfig(id);
  }
}

function onDocumentReady() {
  // console.log("Document is loaded");
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
          v-if="modalActions.data?.status === 'WAITING_FOR_BRANCH_SIGNATURE'"
          @click="modalActions.openCancelModal = true"
          type="primary"
          danger
          size="large"
        >
          {{ t("branch_manager.cancel_guarantee") }}
        </base-button>
        <base-button
          v-if="modalActions.data?.status === 'WAITING_FOR_BRANCH_SIGNATURE'"
          @click="modalActions.openSignatureModal = true"
          :loading="sentToMainBankLoading"
          type="primary"
          size="large"
        >
          {{ t("sign") }}
        </base-button>
      </a-space>
    </template>
  </base-title-component>
  <a-spin :spinning="loading">
    <div
      class="h-[calc(100vh-200px)] flex justify-center items-center gap-4 bg-white rounded-lg p-3"
    >
      <pdf-viewer v-if="pdfUrl" :url="pdfUrl" />
      <DocumentEditor
        v-else-if="onlyOfficeConfig"
        id="docEditor"
        :documentServerUrl="envConfig.onlyOfficeServerUrl"
        :config="onlyOfficeConfig"
        :events_onDocumentReady="onDocumentReady"
        :onLoadComponentError="onLoadComponentError"
      />
    </div>
  </a-spin>

  <eri-signatura-modal
    v-model:open="modalActions.openSignatureModal"
    :document="modalActions.data"
    @on-success-sign="
      () => {
        refreshData();
        modalActions.openSignatureModal = false;
      }
    "
  />
  <a-modal
    v-model:open="modalActions.openCancelModal"
    :title="t('branch_manager.cancellation_of_letter_of_guarantee')"
    :footer="null"
    centered
    destroy-on-close
  >
    <guarantee-cancel-form
      v-model:modalAction="modalActions"
      @approve="refreshData"
    />
  </a-modal>
</template>

<style scoped></style>
