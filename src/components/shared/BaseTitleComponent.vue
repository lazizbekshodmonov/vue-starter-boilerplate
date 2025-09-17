<script setup lang="ts">
import BaseButton from "@/components/shared/BaseButton.vue";
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import { useRouter } from "vue-router";

interface Props {
  title: string;
  description?: string;
  closable?: boolean;
}
defineProps<Props>();

const router = useRouter();
</script>

<template>
  <div class="flex justify-between items-center mb-3 py-2">
    <div class="flex flex-col">
      <a-space>
        <base-button
          v-if="closable"
          @click="router.back()"
          type="dashed"
          shape="circle"
        >
          <icon-arrow-left />
        </base-button>
        <h1 class="text-xl font-semibold text-gray_900">{{ title }}</h1>
      </a-space>
      <span v-if="description" class="text-sm text-gray_500">
        {{ description }}
      </span>
    </div>
    <slot name="actions" />
  </div>
</template>

<style scoped></style>
