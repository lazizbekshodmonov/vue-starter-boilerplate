<script setup lang="ts">
import type {
  ClientManagerModalAction,
  IGuarantee,
} from "@/types/ui/guarantees.ts";
import type { IBaseTableColumn } from "@/types/global";
import { computed, h, reactive } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { formatAmount } from "@/utils/number.formatter.ts";
import usePaginationFetch from "@/composables/usePaginationFetch.ts";
import { formatDateNumeric } from "@/utils/date.ts";
import BaseTableComponent from "@/components/shared/BaseTableComponent.vue";
import StatusComponent from "@/components/shared/StatusComponent.vue";
import useWindowHeight from "@/composables/useWindowHeight.ts";
import TableBtnActionsColumn from "@/pages/dashboard/client-manager/components/TableBtnActionsColumn.vue";
import GuaranteeSentToBankFormComponent from "@/pages/dashboard/client-manager/components/GuaranteeSentToBankFormComponent.vue";
import { printPdf } from "@/utils/file.ts";
import { envConfig } from "@/config/env.ts";
import useCore from "@/store/core.store.ts";
import { storeToRefs } from "pinia";
import { handleError } from "@/utils/notification.ts";
import GuaranteeResentToBankFormComponent from "@/pages/dashboard/client-manager/components/GuaranteeResentToBankFormComponent.vue";
import clientManagerService from "@/services/client-manager.service.ts";

const router = useRouter();
const { t } = useI18n();
const windowHeight = useWindowHeight();

const { loading, data, pagination, loadData } = usePaginationFetch<IGuarantee>({
  key: "client-manager-guarantees",
  url: "guarantees/registry",
});

const coreStore = useCore();
const { loadingUrl } = storeToRefs(coreStore);

const modalActions = reactive<ClientManagerModalAction>({
  data: null,
  openSendToBankModal: false,
  openResendToBankModal: false,
});

const columns = computed<IBaseTableColumn<IGuarantee>[]>(() => [
  {
    title: t("client_manager.client_number"),
    dataIndex: "clientUniqueCode",
    key: "clientUniqueCode",
    width: 120,
    customRender: ({ record }) => record.clientUniqueCode,
  },
  {
    title: t("client_manager.client_name"),
    dataIndex: "clientName",
    key: "clientName",
    customRender: ({ record }) => record.clientName,
  },
  {
    title: t("amount"),
    dataIndex: "clientName",
    key: "clientName",
    customRender: ({ record }) => formatAmount(record.amount),
  },
  {
    title: t("date"),
    dataIndex: "clientName",
    key: "clientName",
    width: 200,
    customRender: ({ record }) => formatDateNumeric(record.createdAt),
  },
  {
    title: t("status"),
    dataIndex: "status",
    key: "status",
    width: 320,
    customRender: ({ record }) =>
      h(StatusComponent, {
        status: record.status,
        content: t(record.status),
      }),
  },
  {
    title: t("actions"),
    dataIndex: "btn-actions",
    key: "btn-actions",
    width: 470,
    customRender: ({ record }) =>
      h(TableBtnActionsColumn, {
        guarantee: record,
        onSenToBank: () => {
          modalActions.data = record;
          modalActions.openSendToBankModal = true;
        },
        onResendToBank: () => {
          modalActions.data = record;
          modalActions.openResendToBankModal = true;
        },

        onOpenDocument: () => {
          router.push({
            name: "ClientManagerGuaranteeDetailView",
            params: {
              id: record.id,
            },
          });
        },

        onPrint: () => {
          printPdfDocument(record);
        },
      }),
  },
]);

async function printPdfDocument(record: IGuarantee) {
  try {
    loadingUrl.value.add(`download-pdf-${record.id}`);
    await printPdf(`${envConfig.apiBaseUrl}${record.pdfUrl}`);
    if (record.status === "SIGNED_BY_BRANCH") {
      await clientManagerService.printed(record.id);
      await loadData();
    }
  } catch (error) {
    handleError(error);
  } finally {
    loadingUrl.value.delete(`download-pdf-${record.id}`);
  }
}
</script>

<template>
  <base-table-component
    :scroll="{ y: windowHeight - 350, x: 2300 }"
    :loading="loading"
    :columns="columns"
    :data-source="data"
    :pagination="pagination"
    @change-page="loadData"
    @change-size="loadData"
  />
  <a-modal
    v-model:open="modalActions.openSendToBankModal"
    :footer="null"
    centered
    destroy-on-close
  >
    <guarantee-sent-to-bank-form-component
      v-model:modalAction="modalActions"
      @approve="loadData"
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
      @approve="loadData"
    />
  </a-modal>
</template>

<style scoped></style>
