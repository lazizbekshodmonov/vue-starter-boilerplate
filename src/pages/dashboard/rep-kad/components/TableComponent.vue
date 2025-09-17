<script setup lang="ts">
import type { IBaseTableColumn } from "@/types/global";
import type { RepKadModalAction } from "@/types/ui/rep-kad.ts";
import { computed, h, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { formatAmount } from "@/utils/number.formatter.ts";
import { formatDateNumeric } from "@/utils/date.ts";
import useWindowHeight from "@/composables/useWindowHeight.ts";
import usePaginationFetch from "@/composables/usePaginationFetch.ts";
import StatusComponent from "@/components/shared/StatusComponent.vue";
import TableActionsColumn from "@/pages/dashboard/rep-kad/components/TableActionsColumn.vue";
import GuaranteeReturnFormComponent from "@/pages/dashboard/rep-kad/components/GuaranteeReturnFormComponent.vue";
import GuaranteeApproveForm from "@/pages/dashboard/rep-kad/components/GuaranteeApproveForm.vue";
import { useRouter } from "vue-router";
import BaseTableComponent from "@/components/shared/BaseTableComponent.vue";
import type { IGuarantee } from "@/types/ui/guarantees.ts";

const { t } = useI18n();
const windowHeight = useWindowHeight();
const router = useRouter();

const { loading, data, pagination, loadData } = usePaginationFetch<IGuarantee>({
  key: "rep-kad-guarantees",
  url: "guarantees/registry",
});
const modalActions = reactive<RepKadModalAction>({
  data: null,
  openReturnModal: false,
  openApproveModal: false,
});

const columns = computed<IBaseTableColumn<IGuarantee>[]>(() => [
  {
    title: "№",
    dataIndex: "number",
    key: "number",
    width: 120,
    customRender: ({ record }) => record.id,
  },
  {
    title: t("client"),
    dataIndex: "document_number",
    key: "document_number",
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
    width: 450,
    customRender: ({ record }) =>
      h(TableActionsColumn, {
        guarantee: record,
        onApprove: () => {
          modalActions.data = record;
          modalActions.openApproveModal = true;
        },
        onReturn: () => {
          modalActions.data = record;
          modalActions.openReturnModal = true;
        },
        onOpenDocument: () => {
          router.push({
            name: "RepKadGuaranteesDetailView",
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
    :columns="columns"
    :data-source="data"
    :loading="loading"
    :pagination="pagination"
    :scroll="{ y: windowHeight - 350, x: 2300 }"
    @change-page="loadData"
    @change-size="loadData"
  />
  <a-modal
    v-model:open="modalActions.openReturnModal"
    :title="t('rep_kad.return_guarantee')"
    :footer="null"
    centered
    destroy-on-close
  >
    <guarantee-return-form-component
      v-model:modalAction="modalActions"
      @approve="loadData"
    />
  </a-modal>
  <a-modal
    v-model:open="modalActions.openApproveModal"
    :footer="null"
    centered
    destroy-on-close
  >
    <guarantee-approve-form
      v-model:modalAction="modalActions"
      @approve="loadData"
    />
  </a-modal>
</template>

<style scoped></style>
