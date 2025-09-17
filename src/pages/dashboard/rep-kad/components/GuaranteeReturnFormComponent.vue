<script setup lang="ts">
import type { RepKadModalAction } from "@/types/ui/rep-kad.ts";
import { useI18n } from "vue-i18n";
import { useValidate } from "@/composables/useValidate.ts";
import { reactive, ref } from "vue";
import repKadService from "@/services/rep-kad.service.ts";
import { handleError, setToast } from "@/utils/notification.ts";
import BaseButton from "@/components/shared/BaseButton.vue";

interface Emits {
  approve: [];
}
const { t } = useI18n();
const { required } = useValidate();

const emits = defineEmits<Emits>();
const modalAction = defineModel<RepKadModalAction>("modalAction", {
  required: true,
});
const loading = ref<boolean>(false);
const formRef = ref();
const form = reactive({
  comment: "",
});

function handleClose() {
  modalAction.value.data = null;
  modalAction.value.openReturnModal = false;
}
async function returnGuarantee() {
  if (modalAction.value.data) {
    const id = modalAction.value.data.id;
    try {
      loading.value = true;
      await repKadService.returnGuarantee(id, form.comment);
      emits("approve");
      modalAction.value.openReturnModal = false;
      setToast({
        type: "success",
        message: t("rep_kad.guarantee_document_returned_successfully"),
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
  <a-form
    @finish="returnGuarantee"
    :model="form"
    ref="formRef"
    layout="vertical"
    class="mt-5"
  >
    <a-form-item
      :rules="[required]"
      name="comment"
      :label="t('branch_manager.explanation_or_reason_for_return')"
    >
      <a-textarea
        v-model:value="form.comment"
        :placeholder="t('leave_a_comment')"
        size="large"
        s
      />
    </a-form-item>
    <div class="w-full flex justify-between gap-3">
      <base-button @click="handleClose" size="large" class="w-1/2">
        {{ t("cancel") }}
      </base-button>
      <base-button
        type="primary"
        size="large"
        html-type="submit"
        class="w-1/2"
        danger
      >
        {{ t("rep_kad.return") }}
      </base-button>
    </div>
  </a-form>
</template>

<style scoped></style>
