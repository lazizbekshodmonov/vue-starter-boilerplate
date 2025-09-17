<script setup lang="ts">
import type { IGuarantyForm } from "@/types/ui/guarantees.ts";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { useValidate } from "@/composables/useValidate.ts";
import { handleError } from "@/utils/notification.ts";
import clientManagerService from "@/services/client-manager.service.ts";
import useCore from "@/store/core.store.ts";
import BaseButton from "@/components/shared/BaseButton.vue";

const router = useRouter();
const { t } = useI18n();
const { required } = useValidate();

const coreStore = useCore();

const { visibleModal } = storeToRefs(coreStore);

const formRef = ref();
const loading = ref<boolean>(false);
const form = reactive<IGuarantyForm>({
  clientUniqueCode: "",
  contractNumber: "",
});

async function submit() {
  try {
    loading.value = true;
    const response = await clientManagerService.createGuarantee(form);
    visibleModal.value.delete("guarantee-create-form");
    await router.push({
      name: "ClientManagerGuaranteeDetailView",
      params: {
        id: response.id,
      },
    });
  } catch (error) {
    handleError(error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <a-form @finish="submit" :model="form" layout="vertical" ref="formRef">
    <a-form-item
      :rules="[required]"
      name="clientUniqueCode"
      :label="t('client_manager.client_unique_number')"
    >
      <a-input
        v-model:value="form.clientUniqueCode"
        size="large"
        :placeholder="t('client_manager.enter_client_unique_number')"
      />
    </a-form-item>
    <a-form-item
      :rules="[required]"
      name="contractNumber"
      :label="t('client_manager.contract_number')"
    >
      <a-input
        v-model:value="form.contractNumber"
        size="large"
        :placeholder="t('client_manager.enter_contract_number')"
      />
    </a-form-item>

    <div class="flex justify-end items-center gap-3">
      <base-button
        size="large"
        @click="visibleModal.delete('guarantee-create-form')"
      >
        {{ t("cancel") }}
      </base-button>
      <base-button
        :loading="loading"
        type="primary"
        size="large"
        html-type="submit"
      >
        {{ t("save") }}
      </base-button>
    </div>
  </a-form>
</template>

<style scoped></style>
