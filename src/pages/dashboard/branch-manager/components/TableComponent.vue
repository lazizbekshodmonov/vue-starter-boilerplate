<script setup lang="ts">
import type { IBaseTableColumn } from "@/types/global";
import { computed, h, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { formatAmount } from "@/utils/number.formatter.ts";
import { formatDateNumeric } from "@/utils/date.ts";
import BaseTableComponent from "@/components/shared/BaseTableComponent.vue";
import StatusComponent from "@/components/shared/StatusComponent.vue";
import ActionsColumnComponent from "@/pages/dashboard/branch-manager/components/ActionsColumnComponent.vue";
import usePaginationFetch from "@/composables/usePaginationFetch.ts";
import useWindowHeight from "@/composables/useWindowHeight.ts";
import EriSignaturaModal from "@/pages/dashboard/branch-manager/components/EriSignaturaModal.vue";
import type { RepKadModalAction } from "@/types/ui/rep-kad.ts";
import { useRouter } from "vue-router";
import type { IGuarantee } from "@/types/ui/guarantees.ts";
import GuaranteeCancelForm from "@/pages/dashboard/branch-manager/components/GuaranteeCancelForm.vue";

const router = useRouter();
const { t } = useI18n();
const windowHeight = useWindowHeight();

const { loading, data, pagination, loadData } = usePaginationFetch<IGuarantee>({
  key: "upr-branch-guarantees",
  url: "guarantees/registry",
});

const modalAction = reactive<RepKadModalAction>({
  data: null,
  openSignatureModal: false,
  openCancelModal: false,
});

const columns = computed<IBaseTableColumn<IGuarantee>[]>(() => [
  {
    title: "№",
    dataIndex: "number",
    key: "number",
    width: 120,
    customRender: ({ record }) => record.productCode,
  },
  {
    title: t("document_number"),
    dataIndex: "document_number",
    key: "document_number",
    customRender: ({ record }) => record.clientName,
  },
  {
    title: t("amount"),
    dataIndex: "clientName",
    key: "clientName",
    width: 250,
    customRender: ({ record }) => formatAmount(record.amount),
  },
  {
    title: t("date"),
    dataIndex: "clientName",
    key: "clientName",
    width: 120,
    customRender: ({ record }) => formatDateNumeric(record.createdAt),
  },
  {
    title: t("status"),
    dataIndex: "status",
    key: "status",
    width: 350,
    customRender: ({ record }) =>
      h(StatusComponent, {
        status: record.status,
        content: t(record.status),
      }),
  },
  {
    title: t("actions"),
    dataIndex: "action-colum",
    key: "action-colum",
    width: 610,
    customRender: ({ record }) =>
      h(ActionsColumnComponent, {
        guarantee: record,
        onClickEimzo: () => {
          modalAction.data = record;
          modalAction.openSignatureModal = true;
        },
        onClickReturn: () => {
          modalAction.data = record;
          modalAction.openCancelModal = true;
        },
        onOpenDocument: () => {
          router.push({
            name: "BranchManagerGuaranteesDetailView",
            params: {
              id: record.id,
            },
          });
        },
      }),
  },
]);
</script>

<template>
  <base-table-component
    :scroll="{ y: windowHeight - 350, x: 2200 }"
    :loading="loading"
    :columns="columns"
    :data-source="data"
    :pagination="pagination"
    @change-page="loadData"
    @change-size="loadData"
  />
  <eri-signatura-modal
    v-model:open="modalAction.openSignatureModal"
    :document="modalAction.data"
    @on-success-sign="
      () => {
        loadData();
        modalAction.data = null;
        modalAction.openSignatureModal = false;
      }
    "
  />
  <a-modal
    v-model:open="modalAction.openCancelModal"
    :title="t('branch_manager.cancellation_of_letter_of_guarantee')"
    :footer="null"
    centered
    destroy-on-close
  >
    <guarantee-cancel-form
      v-model:modalAction="modalAction"
      @approve="loadData"
    />
  </a-modal>
</template>

<style scoped></style>
