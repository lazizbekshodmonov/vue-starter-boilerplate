<script setup lang="ts">
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useValidate } from "@/composables/useValidate.ts";
import BaseButton from "@/components/shared/BaseButton.vue";
import { handleError } from "@/utils/notification.ts";
import type { ILoginEriForm } from "@/types/ui/auth";
import useUserStore from "@/store/user.store.ts";
import { useRouter } from "vue-router";
import AuthWidthEimzoComponent from "@/pages/auth/component/AuthWidthEimzoComponent.vue";
import authService from "@/services/auth.service.ts";
import { filterRoutesByRole } from "@/utils/router.ts";
import { dashboardRoutes } from "@/router/dashboard.routes.ts";

const router = useRouter();
const { t } = useI18n();
const { required } = useValidate();

const userStore = useUserStore();

const formRef = ref();
const eimzoSelectRef = ref();
const loading = ref<boolean>(false);
const formEri = reactive<ILoginEriForm>({
  key: null,
  serviceType: null,
});

async function generatePkc7() {
  loading.value = true;
  try {
    if (formEri.key) {
      eimzoSelectRef.value.generatePkcs7();
    }
  } catch (error) {
    loading.value = false;
    handleError(error);
  }
}

async function handleGeneratedPkcs7(pkcs7: string | null) {
  if (!pkcs7) {
    loading.value = false;
    return;
  }
  try {
    loading.value = true;
    const token = await authService.loginWithEri(pkcs7);
    const user = await authService.getProfile();
    if (user) {
      userStore.setUserProfile(user);
      const filteredRoutes = filterRoutesByRole(dashboardRoutes, token.role);
      if (filteredRoutes.length !== 0) {
        await router.push({ name: filteredRoutes[0].name });
      }
    }
  } catch (error) {
    handleError(error);
  } finally {
    loading.value = false;
  }
}

function handleErrorEimzo() {
  loading.value = false;
}
</script>

<template>
  <a-form
    @finish="generatePkc7"
    :model="formEri"
    ref="formRef"
    layout="vertical"
    class="w-full"
  >
    <a-form-item name="key" :rules="[required]">
      <auth-width-eimzo-component
        :disable="loading"
        v-model:selected-key="formEri.key"
        ref="eimzoSelectRef"
        @on-generate-pkcs7="handleGeneratedPkcs7"
        @on-error="handleErrorEimzo"
      />
    </a-form-item>
    <base-button
      :loading="loading"
      type="primary"
      size="large"
      html-type="submit"
      class="w-full !h-12"
    >
      {{ t("auth.enter") }}
    </base-button>
  </a-form>
</template>

<style scoped></style>
