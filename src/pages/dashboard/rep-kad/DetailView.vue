<script setup lang="ts">
import type { IOnlyOfficeConfig } from "@/types/global/only-office-config.ts";
import type { RepKadModalAction } from "@/types/ui/rep-kad.ts";
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { handleError, setToast } from "@/utils/notification.ts";
import clientManagerService from "@/services/client-manager.service.ts";
import { DocumentEditor } from "@onlyoffice/document-editor-vue";
import { envConfig } from "@/config/env.ts";
import BaseTitleComponent from "@/components/shared/BaseTitleComponent.vue";
import BaseButton from "@/components/shared/BaseButton.vue";
import GuaranteeReturnFormComponent from "@/pages/dashboard/rep-kad/components/GuaranteeReturnFormComponent.vue";
import GuaranteeApproveForm from "@/pages/dashboard/rep-kad/components/GuaranteeApproveForm.vue";
import repKadService from "@/services/rep-kad.service.ts";

const route = useRoute();
const { t } = useI18n();

const loading = ref<boolean>(false);
const sentToMainBankLoading = ref<boolean>(false);
const onlyOfficeConfig = ref<IOnlyOfficeConfig>();

const modalActions = reactive<RepKadModalAction>({
  data: null,
  openReturnModal: false,
  openApproveModal: false,
});

onMounted(loadData);

async function loadData() {
  if (route.params.id && typeof route.params.id === "string") {
    const id: number = parseInt(route.params.id);

    await getOnlyOfficeConfig(id);
    await getGuaranteeDetails(id);
    modalActions.openApproveModal = false;
    modalActions.openReturnModal = false;
  }
}
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

async function getGuaranteeDetails(id: number) {
  try {
    loading.value = true;
    modalActions.data = await repKadService.getGuaranteeDetails(id);
  } catch (error) {
    handleError(error);
  } finally {
    loading.value = false;
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

function handleReturn() {
  modalActions.openReturnModal = true;
}
function handleApprove() {
  modalActions.openApproveModal = true;
}
</script>

<template>
  <base-title-component :title="t('rep_kad.guarantee_details')" closable>
    <template #actions>
      <a-space>
        <base-button
          v-if="
            modalActions.data?.status === 'SENT_TO_MAIN_BANK' ||
            modalActions.data?.status === 'RESUBMITTED_TO_MAIN_BANK'
          "
          @click="handleReturn"
          :loading="sentToMainBankLoading"
          type="primary"
          size="large"
          danger
        >
          {{ t("rep_kad.return") }}
        </base-button>
        <base-button
          v-if="
            modalActions.data?.status === 'SENT_TO_MAIN_BANK' ||
            modalActions.data?.status === 'RESUBMITTED_TO_MAIN_BANK'
          "
          @click="handleApprove"
          :loading="sentToMainBankLoading"
          type="primary"
          size="large"
        >
          {{ t("rep_kad.approve") }}
        </base-button>
      </a-space>
    </template>
  </base-title-component>
  <a-spin :spinning="loading">
    <div
      class="h-[calc(100vh-200px)] flex justify-center items-center gap-4 bg-white rounded-lg p-3"
    >
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
    v-model:open="modalActions.openReturnModal"
    :title="t('rep_kad.return_guarantee')"
    :footer="null"
    centered
  >
    <guarantee-return-form-component
      v-model:modalAction="modalActions"
      @approve="loadData"
    />
  </a-modal>
  <!--    :title="t('rep_kad.approve_guarantee')"-->
  <a-modal v-model:open="modalActions.openApproveModal" :footer="null" centered>
    <guarantee-approve-form
      v-model:modalAction="modalActions"
      @approve="loadData"
    />
  </a-modal>
</template>

<style scoped></style>
