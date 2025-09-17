<script setup lang="ts">
import type { ClientManagerModalAction } from "@/types/ui/guarantees.ts";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { handleError, setToast } from "@/utils/notification.ts";
import clientManagerService from "@/services/client-manager.service.ts";
import BaseButton from "@/components/shared/BaseButton.vue";

interface Emits {
  approve: [];
}

const { t } = useI18n();

const emits = defineEmits<Emits>();

const modalAction = defineModel<ClientManagerModalAction>("modalAction", {
  required: true,
});
const loading = ref<boolean>(false);

function handleClose() {
  modalAction.value.data = null;
  modalAction.value.openResendToBankModal = false;
}

async function approve() {
  if (modalAction.value?.data) {
    const id = modalAction.value?.data.id;
    try {
      loading.value = true;
      await clientManagerService.resentToMainBank(id);
      emits("approve");
      modalAction.value.openResendToBankModal = false;
      setToast({
        type: "success",
        message: t(
          "client_manager.the_guarantee_was_successfully_sent_to_the_main_bank",
        ),
      });
    } catch (error) {
      handleError(error);
    } finally {
      loading.value = false;
    }
  }
}
</script>

<template>
  <h1 class="mb-3 text-xl font-semibold text-center">
    {{
      t(
        "client_manager.do_you_want_to_send_a_letter_of_guarantee_to_the_main_bank",
      )
    }}
  </h1>
  <p class="w-4/5 text-center text-base text-gray_500 mb-3 mx-auto">
    {{
      t(
        "client_manager.This_letter_of_guarantee_is_issued_by_the_Credit_Operations_Department",
      )
    }}
  </p>
  <div class="w-full flex justify-between gap-3">
    <base-button @click="handleClose" size="large" class="w-1/2">
      {{ t("cancel") }}
    </base-button>
    <base-button @click="approve" type="primary" size="large" class="w-1/2">
      {{ t("client_manager.sent") }}
    </base-button>
  </div>
</template>

<style scoped></style>
