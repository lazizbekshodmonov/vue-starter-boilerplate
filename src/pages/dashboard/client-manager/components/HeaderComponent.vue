<script setup lang="ts">
import FormComponent from "@/pages/dashboard/client-manager/components/FormComponent.vue";
import BaseTitleComponent from "@/components/shared/BaseTitleComponent.vue";
import BaseButton from "@/components/shared/BaseButton.vue";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import useCore from "@/store/core.store.ts";
import SearchInput from "@/components/shared/SearchInput.vue";
import { useRouter } from "vue-router";
import { useRefreshTrigger } from "@/composables/useRefreshTrigger.ts";
import { nextTick, reactive } from "vue";

const { t } = useI18n();
const router = useRouter();
const { refresh } = useRefreshTrigger();

const coreStore = useCore();

const { visibleModal } = storeToRefs(coreStore);

const filter = reactive({
  search: "",
  status: null,
});

async function applyFilter() {
  await router.push({
    query: {
      search: filter.search ? filter.search : undefined,
    },
  });
  await nextTick();
  await refresh("client-manager-guarantees");
}
</script>

<template>
  <base-title-component
    :title="$t('client_manager.title')"
    :description="t('client_manager.description')"
  >
    <template #actions>
      <a-space>
        <a-form-item class="m-0 w-96">
          <search-input
            @on-input="applyFilter"
            v-model:value="filter.search"
            size="large"
            :placeholder="t('client_manager.client_unique_number')"
          />
        </a-form-item>

        <base-button
          @click="visibleModal.add('guarantee-create-form')"
          type="primary"
          size="large"
        >
          {{ $t("client_manager.create_new_guarantee") }}
        </base-button>
      </a-space>
    </template>
  </base-title-component>

  <a-modal
    @cancel="visibleModal.delete('guarantee-create-form')"
    :title="t('client_manager.create_new_guarantee')"
    :open="visibleModal.has('guarantee-create-form')"
    :footer="null"
    centered
    destroy-on-close
  >
    <form-component />
  </a-modal>
</template>

<style scoped></style>
