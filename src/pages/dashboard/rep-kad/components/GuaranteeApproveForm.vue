<script setup lang="ts">
import type { RepKadModalAction } from "@/types/ui/rep-kad.ts";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { handleError, setToast } from "@/utils/notification.ts";
import repKadService from "@/services/rep-kad.service.ts";
import BaseButton from "@/components/shared/BaseButton.vue";

interface Emits {
  approve: [];
}

const { t } = useI18n();

const emits = defineEmits<Emits>();
const modalAction = defineModel<RepKadModalAction>("modalAction", {
  required: true,
});

const loading = ref<boolean>(false);

function handleClose() {
  modalAction.value.data = null;
  modalAction.value.openApproveModal = false;
}

async function approve() {
  if (modalAction.value?.data) {
    const id = modalAction.value?.data.id;
    try {
      loading.value = true;
      await repKadService.approveGuarantee(id);
      emits("approve");
      modalAction.value.openApproveModal = false;
      setToast({
        type: "success",
        message: t("rep_kad.guarantee_document_approved_successfully"),
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
    {{ t("rep_kad.do_you_want_to_confirm_the_letter_of_guarantee_agreement") }}
  </h1>
  <p class="w-4/5 text-center text-base text-gray_500 mb-3 mx-auto">
    {{
      t(
        "rep_kad.by_confirming_the_letter_of_guarantee_agreement_you_will_send_this_letter_to_the_BXO_BXM_manager",
      )
    }}
  </p>
  <div class="w-full flex justify-between gap-3">
    <base-button @click="handleClose" size="large" class="w-1/2">
      {{ t("cancel") }}
    </base-button>
    <base-button @click="approve" type="primary" size="large" class="w-1/2">
      {{ t("rep_kad.approve") }}
    </base-button>
  </div>
</template>

<style scoped></style>
