<script setup lang="ts">
import type { TUserRole } from "@/types/ui/employees";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import useUserStore from "@/store/user.store.ts";

interface IMenuItem {
  key: string;
  label: string;
  roles?: TUserRole[];
}

const { t } = useI18n();
const userStore = useUserStore();

const items = computed<IMenuItem[]>(() => [
  {
    key: "EmployeesView",
    label: t("menu.EmployeesView"),
    roles: ["ADMIN_GUAR"],
  },
  {
    key: "ClientManagerView",
    label: t("menu.ClientManagerView"),
    roles: ["CLIENT_MANAGER"],
  },
  {
    key: "BranchManagerGuaranteesListView",
    label: t("menu.BranchManagerGuaranteesListView"),
    roles: ["UPR_BRANCH"],
  },
  {
    key: "RepKadGuaranteesListView",
    label: t("menu.RepKadGuaranteesListView"),
    roles: ["REP_KAD"],
  },
]);

const filteredItems = computed(() => {
  const role = userStore.userProfile?.role;
  return items.value.filter(
    (item) => !item.roles || (role && item.roles.includes(role)),
  );
});
</script>

<template>
  <div class="flex items-center gap-1">
    <router-link
      v-for="item in filteredItems"
      :to="{ name: item?.key }"
      class="h-10 flex items-center justify-center px-3 py-2 rounded-md text-base font-medium text-gray_700 hover:text-gray_500"
    >
      {{ item.label }}
    </router-link>
  </div>
</template>

<style scoped lang="scss">
:deep(.router-link-active) {
  @apply text-primary_red bg-schemes_background;
}
</style>
