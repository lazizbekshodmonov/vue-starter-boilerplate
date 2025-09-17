<script setup lang="ts">
import type { IEmployee } from "@/types/ui/employees";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { handleError } from "@/utils/notification.ts";
import { useRefreshTrigger } from "@/composables/useRefreshTrigger.ts";
import useCore from "@/store/core.store.ts";
import employeeService from "@/services/employee.service.ts";
import BaseTitleComponent from "@/components/shared/BaseTitleComponent.vue";
import TableComponent from "./components/TableComponent.vue";
import PageCardComponent from "@/components/shared/PageCardComponent.vue";
import FormComponent from "@/pages/dashboard/employees/components/FormComponent.vue";
import BaseButton from "@/components/shared/BaseButton.vue";
import ConfirmModalComponent from "@/components/shared/ConfirmModalComponent.vue";

const { t } = useI18n();
const { refresh } = useRefreshTrigger();

const coreStore = useCore();

const { visibleModal } = storeToRefs(coreStore);
const loading = ref<boolean>(false);
const employee = ref<IEmployee | null>(null);

function deleteEmployee(data: IEmployee) {
  visibleModal.value.add("employee-delete-modal");
  employee.value = data;
}

function editEmployee(data: IEmployee) {
  employee.value = data;
  visibleModal.value.add("employee-form-modal");
}

function closeEmployeeEdit() {
  employee.value = null;
  visibleModal.value.delete("employee-form-modal");
}

async function confirmDelete() {
  try {
    if (employee.value) {
      loading.value = true;
      await employeeService.delete(employee.value.pinfl);
      await refresh("employees");
      visibleModal.value.delete("employee-delete-modal");
      employee.value = null;
    }
  } catch (error) {
    handleError(error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <base-title-component :title="t('employees.title')">
    <template #actions>
      <base-button
        @click="visibleModal.add('employee-form-modal')"
        type="primary"
        size="large"
      >
        {{ t("employees.create_new_employee") }}
      </base-button>
    </template>
  </base-title-component>
  <page-card-component>
    <table-component @on-edit="editEmployee" @on-delete="deleteEmployee" />
  </page-card-component>
  <a-modal
    @cancel="closeEmployeeEdit"
    :open="visibleModal.has('employee-form-modal')"
    :title="t('employees.create_new_employee')"
    width="560px"
    :footer="null"
    centered
    destroy-on-close
  >
    <form-component :item="employee" />
  </a-modal>
  <confirm-modal-component
    @confirm="confirmDelete"
    :open="visibleModal.has('employee-delete-modal')"
    :title="t('employees.do_you_want_to_delete_the_employee')"
    :confirm-button-props="{
      danger: true,
      type: 'primary',
      loading,
    }"
  />
</template>

<style scoped></style>
