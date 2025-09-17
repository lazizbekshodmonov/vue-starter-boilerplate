<script setup lang="ts">
import AuthFormComponent from "@/pages/auth/component/AuthFormComponent.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="h-full flex justify-between gap-16">
    <div class="auth-bg w-7/12 h-full rounded-[30px]">
      <img
        src="@/assets/images/auth-banner.png"
        alt=""
        class="w-full h-full object-cover"
      />
    </div>
    <div class="w-5/12 flex justify-center items-center">
      <div class="w-[560px] flex flex-col items-center">
        <img
          src="@/assets/images/logo.svg"
          alt=""
          class="w-[560px] mb-[150px]"
        />
        <h3 class="text-center text-3xl font-semibold mb-3 text-text_primary">
          {{ t("auth.document_title") }}
        </h3>
        <p class="text-base text-text_secondary mb-12">
          {{ t("auth.bank_guarantee_system") }}
        </p>
        <auth-form-component />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.custom-primary-tab {
  &:deep(.ant-tabs-nav-list) {
    @apply pb-2 border-b;
  }
}

.auth-bg {
  background-image: url(@/assets/images/background.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
