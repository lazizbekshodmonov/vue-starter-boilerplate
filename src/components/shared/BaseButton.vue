<script setup lang="ts">
import { useSlots } from "vue";
import type { ButtonProps } from "ant-design-vue";

const props = defineProps<ButtonProps>();

const slots = useSlots();
</script>

<template>
  <a-button
    v-bind="props"
    class="flex items-center justify-center gap-2 cursor-pointer"
  >
    <template v-if="'icon' in slots" #icon>
      <slot name="icon" />
    </template>
    <slot />
  </a-button>
</template>

<style scoped></style>
