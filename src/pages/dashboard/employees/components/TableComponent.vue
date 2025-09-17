<script setup lang="ts">
import type { IEmployee } from "@/types/ui/employees";
import type { IBaseTableColumn } from "@/types/global";
import { computed, h } from "vue";
import { useI18n } from "vue-i18n";
import useWindowHeight from "@/composables/useWindowHeight.ts";
import usePaginationFetch from "@/composables/usePaginationFetch.ts";
import BaseTableComponent from "@/components/shared/BaseTableComponent.vue";
import ActiveSwitchComponent from "@/pages/dashboard/employees/components/ActiveSwitchComponent.vue";
import TableBtnActionsColumn from "@/pages/dashboard/employees/components/TableBtnActionsColumn.vue";

interface Emits {
  onDelete: [IEmployee];
  onEdit: [IEmployee];
}

const emits = defineEmits<Emits>();

const { t } = useI18n();
const windowHeight = useWindowHeight();

const { loading, data, pagination, loadData } = usePaginationFetch<IEmployee>({
  key: "employees",
  url: "/admin/roles",
});

const columns = computed<IBaseTableColumn<IEmployee>[]>(() => [
  {
    title: t("full_name"),
    dataIndex: "fullName",
    key: "fullName",
    customRender: ({ record }) => record.fullName,
  },
  {
    title: t("pinfl"),
    dataIndex: "pinfl",
    key: "pinfl",
    width: 250,
  },
  {
    title: t("branch_code"),
    dataIndex: "branchCode",
    key: "branchCode",
    width: 170,
  },
  {
    title: t("role"),
    dataIndex: "role",
    key: "role",
    width: 270,
    customRender: ({ record }) => t(record.role),
  },
  {
    title: t("status"),
    dataIndex: "status",
    key: "status",
    width: 120,
    customRender: ({ record }) =>
      h(ActiveSwitchComponent, {
        item: record,
      }),
  },

  {
    title: t("actions"),
    dataIndex: "btn-actions",
    key: "btn-actions",
    width: 280,
    customRender: ({ record }) =>
      h(TableBtnActionsColumn, {
        onEdit: () => {
          emits("onEdit", record);
        },
        onDelete: () => {
          emits("onDelete", record);
        },
      }),
  },
]);
</script>

<template>
  <base-table-component
    :scroll="{ y: windowHeight - 210 }"
    :loading="loading"
    :columns="columns"
    :data-source="data"
    :pagination="pagination"
    @change-page="loadData"
    @change-size="loadData"
  />
</template>

<style scoped></style>
