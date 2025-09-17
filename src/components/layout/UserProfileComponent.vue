<script setup lang="ts">
import useUserStore from "@/store/user.store.ts";
import { storeToRefs } from "pinia";
import { logOut } from "@/utils";
import { useI18n } from "vue-i18n";
import IconUser from "@/components/icons/IconUser.vue";
import ConfirmModalComponent from "@/components/shared/ConfirmModalComponent.vue";
import { ref } from "vue";

const { t } = useI18n();

const userStore = useUserStore();

const { userProfile } = storeToRefs(userStore);

const openConfirmModal = ref<boolean>(false);
</script>

<template>
  <div class="min-w-28 flex items-center pl-4">
    <a-dropdown trigger="click" placement="bottomRight">
      <div
        class="flex items-center gap-3 cursor-pointer text-primary_color_600"
      >
        <div class="flex flex-col">
          <span class="text-base font-bold">
            {{ userProfile?.fullName ?? "Developeriddin" }}
          </span>
          <span class="text-xs leading-3 font-medium uppercase text-gray-400">
            {{ userProfile?.role ? t(userProfile?.role) : "" }}
          </span>
        </div>
        <a-avatar size="large" class="flex justify-center items-center">
          <template #icon>
            <icon-user class="text-lg" />
          </template>
        </a-avatar>

        <!--        <icon-down />-->
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item
            @click="openConfirmModal = true"
            class="hover:!bg-red-200 !text-red-600"
          >
            {{ t("logout") }}
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
  <confirm-modal-component
    @confirm="logOut"
    v-model:open="openConfirmModal"
    :title="t('do_you_want_to_logout_the_system')"
    description=" "
    :cancel-button-text="t('no')"
    :confirm-button-text="t('yes_logout')"
    :confirm-button-props="{
      danger: true,
      type: 'primary',
    }"
  />
</template>

<style scoped>
:deep(.ant-dropdown-trigger) {
  @apply h-10 flex items-center;
}
</style>
