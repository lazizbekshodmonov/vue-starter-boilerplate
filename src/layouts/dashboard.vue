<script setup lang="ts">
import UserProfileComponent from "@/components/layout/UserProfileComponent.vue";
import NavigationMenuComponent from "@/components/layout/NavigationMenuComponent.vue";
import { onMounted } from "vue";
import authService from "@/services/auth.service.ts";
import useUserStore from "@/store/user.store.ts";

const userStore = useUserStore();
onMounted(async () => {
  const profile = await authService.getProfile();
  userStore.setUserProfile(profile);
});
</script>

<template>
  <a-layout class="sidebar-layout h-screen !bg-white">
    <a-layout-header
      class="!h-[72px] !bg-white shadow-sm"
      breakpoint="md"
      collapsed-width="0"
    >
      <div class="px-5 h-full mx-auto flex items-center justify-between">
        <div class="flex items-center justify-start gap-4">
          <img src="@/assets/images/logo.svg" alt="" class="h-9 mt-1" />
          <navigation-menu-component />
        </div>
        <user-profile-component />
      </div>
    </a-layout-header>

    <a-layout class="flex-grow pt-4 bg-gray-50">
      <a-layout-content class="h-full pb-4">
        <div class="px-5 flex flex-col h-full mx-auto rounded-lg">
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped lang="scss">
:deep(.ant-layout-header) {
  padding-inline: 0 !important;
}
:deep(.ant-layout) {
  //background: transparent;
}
</style>
