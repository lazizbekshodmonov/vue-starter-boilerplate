<script setup lang="ts">
import PageCardComponent from "@/components/shared/PageCardComponent.vue";
import HeaderComponent from "./components/HeaderComponent.vue";
import TableComponent from "./components/TableComponent.vue";
import { useI18n } from "vue-i18n";
import { computed, nextTick, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useRefreshTrigger } from "@/composables/useRefreshTrigger.ts";
import ButtonTabComponent from "@/components/shared/ButtonTabComponent.vue";

const { t } = useI18n();
const { refresh } = useRefreshTrigger();
const router = useRouter();
const route = useRoute();

const activeTab = ref<string>(
  route.query.status ? (route.query.status as string) : "all",
);

const tabs = computed(() => [
  {
    tab: t("all"),
    key: "all",
  },
  {
    tab: t("CREATED_BY_CLIENT_MANAGER"),
    key: "CREATED_BY_CLIENT_MANAGER",
  },
  {
    tab: t("SENT_TO_MAIN_BANK"),
    key: "SENT_TO_MAIN_BANK",
  },
  {
    tab: t("RESUBMITTED_TO_MAIN_BANK"),
    key: "RESUBMITTED_TO_MAIN_BANK",
  },
  // {
  //   tab: t("WAITING_FOR_BRANCH_SIGNATURE"),
  //   key: "WAITING_FOR_BRANCH_SIGNATURE",
  // },
  {
    tab: t("RETURNED_FOR_REVISION"),
    key: "RETURNED_FOR_REVISION",
  },
  {
    tab: t("SIGNED_BY_BRANCH"),
    key: "SIGNED_BY_BRANCH",
  },
  {
    tab: t("PRINTED_AND_COMPLETED"),
    key: "PRINTED_AND_COMPLETED",
  },
]);

async function handleChangeTabFilter() {
  await router.push({
    query: {
      status: activeTab.value !== "all" ? activeTab.value : undefined,
    },
  });
  await nextTick();
  await refresh("client-manager-guarantees");
}
</script>

<template>
  <header-component />

  <page-card-component>
    <template #header>
      <button-tab-component
        v-model:active-key="activeTab"
        :tabs="tabs"
        class="mb-3"
        @on-change="handleChangeTabFilter"
      />
    </template>
    <table-component />
  </page-card-component>
</template>

<style scoped></style>
