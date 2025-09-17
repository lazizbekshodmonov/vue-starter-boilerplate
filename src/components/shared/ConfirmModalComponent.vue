<script setup lang="ts">
import BaseButton from "@/components/shared/BaseButton.vue";
import type { ButtonProps } from "ant-design-vue";
import { useI18n } from "vue-i18n";

interface IEmits {
  confirm: [];
  cancel: [];
}

interface IProps {
  title: string;
  description?: string;
  confirmButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

const { t } = useI18n();
const open = defineModel<boolean>("open", { required: true });
const emits = defineEmits<IEmits>();
defineProps<IProps>();

function close() {
  open.value = false;
  emits("cancel");
}
</script>

<template>
  <a-modal
    v-model:open="open"
    centered
    width="448px"
    :footer="null"
    @close="close"
  >
    <h5 class="text-center text-lg font-semibold text-gray_color_900 mb-2">
      {{ title }}
    </h5>
    <p class="text-center text-sm text-gray_500 mb-8">
      {{ description ?? t("this_action_cannot_be_undone") }}
    </p>
    <div class="flex gap-4">
      <base-button v-bind="cancelButtonProps" class="w-full" @click="close">
        {{ cancelButtonText ?? t("cancel") }}
      </base-button>
      <base-button
        v-bind="confirmButtonProps"
        class="w-full"
        @click="emits('confirm')"
      >
        {{ confirmButtonText ?? t("confirm") }}
      </base-button>
    </div>
  </a-modal>
</template>

<style scoped></style>
