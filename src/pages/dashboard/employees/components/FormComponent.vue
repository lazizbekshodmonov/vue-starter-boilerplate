<script setup lang="ts">
import type { IEmployee, IEmployeeForm } from "@/types/ui/employees";
import { onMounted, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { useValidate } from "@/composables/useValidate.ts";
import { useRefreshTrigger } from "@/composables/useRefreshTrigger.ts";
import { handleError } from "@/utils/notification.ts";
import { userRoles } from "@/constants/role.ts";
import employeeService from "@/services/employee.service.ts";
import useCore from "@/store/core.store.ts";
import BaseButton from "@/components/shared/BaseButton.vue";
import PinflInput from "@/components/shared/PinflInput.vue";

interface Props {
  item?: IEmployee | null;
}

const props = defineProps<Props>();

const { t } = useI18n();
const { required } = useValidate();
const { refresh } = useRefreshTrigger();

const coreStore = useCore();

const { visibleModal } = storeToRefs(coreStore);

const formRef = ref();
const loading = ref<boolean>(false);
const form = reactive<IEmployeeForm>({
  pinfl: "",
  fullName: "",
  branchCode: "",
  role: null,
  active: true,
});

onMounted(() => {
  if (props.item) {
    form.fullName = props.item.fullName;
    form.pinfl = props.item.pinfl;
    form.branchCode = props.item.branchCode;
    form.role = props.item.role;
  }
});

async function finish() {
  try {
    loading.value = true;
    if (props.item) {
      await employeeService.update(props.item.pinfl, form);
    } else {
      await employeeService.create(form);
    }
    visibleModal.value.delete("employee-form-modal");
    await refresh("employees");
  } catch (error) {
    handleError(error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <a-form @finish="finish" ref="formRef" :model="form" layout="vertical">
    <div class="flex justify-between gap-3">
      <a-form-item :label="t('full_name')" :rules="required" name="fullName">
        <a-input
          v-model:value="form.fullName"
          :placeholder="t('employees.enter_full_name')"
          size="large"
        />
      </a-form-item>
      <a-form-item :label="t('pinfl')" :rules="required" name="pinfl">
        <pinfl-input
          v-model:value="form.pinfl"
          :placeholder="t('employees.enter_pinfl')"
          size="large"
        />
      </a-form-item>
    </div>
    <div class="flex justify-between gap-3">
      <a-form-item
        :label="t('branch_code')"
        :rules="required"
        name="branchCode"
      >
        <a-input
          v-model:value="form.branchCode"
          :placeholder="t('employees.enter_branch_code')"
          size="large"
        />
      </a-form-item>
      <a-form-item
        :label="t('role')"
        class="w-1/2"
        :rules="required"
        name="role"
      >
        <a-select
          v-model:value="form.role"
          :placeholder="t('employees.select_role')"
          size="large"
          class="!w-full"
        >
          <a-select-option :value="item" v-for="item in userRoles">
            {{ t(item) }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </div>
    <div class="flex justify-end gap-3">
      <base-button
        @click="visibleModal.delete('employee-form-modal')"
        size="large"
      >
        {{ t("cancel") }}
      </base-button>
      <base-button type="primary" size="large" html-type="submit">
        {{ t("save") }}
      </base-button>
    </div>
  </a-form>
</template>

<style scoped></style>
