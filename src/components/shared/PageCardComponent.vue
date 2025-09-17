<script setup lang="ts">
import { useSlots } from "vue";

const slots = useSlots();
</script>

<template>
  <a-card :bordered="false" class="page-card max-h-[calc(100vh-150px)] w-full">
    <div class="h-full flex flex-col">
      <div v-if="slots?.header" class="mx-4">
        <slot name="header" />
      </div>
      <div class="h-full flex-grow">
        <slot />
      </div>
    </div>
  </a-card>
</template>

<style scoped lang="scss">
.page-card {
  &:deep(.ant-card-body) {
    @apply px-0 py-4 h-full;
  }
}
</style>
