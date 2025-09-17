<script setup lang="ts">
import IconSearch from "@/components/icons/IconSearch.vue";
import { debounce } from "@/utils/debounce.ts";

interface Props {
  placeholder?: string;
  size?: "small" | "middle" | "large";
}

interface Emits {
  onInput: [string | undefined | null];
}

const emits = defineEmits<Emits>();

withDefaults(defineProps<Props>(), {
  size: "middle",
  placeholder: "Search...",
});

const modelValue = defineModel<string>("value");

const debouncedSearch = debounce(() => {
  emits("onInput", modelValue.value);
}, 400);
</script>

<template>
  <a-input
    v-bind="$attrs"
    :size="size"
    :placeholder="placeholder"
    v-model:value="modelValue"
    @input="debouncedSearch"
  >
    <template #addonBefore>
      <icon-search />
    </template>
  </a-input>
</template>

<style scoped lang="scss">
:deep(.ant-input-group) {
  .ant-input-group-addon {
    @apply bg-white border-r-0;
  }
  .ant-input {
    @apply border-l-0 shadow-none;
  }
  &:has(.ant-input:focus) {
    .ant-input-group-addon {
      @apply border-primary_color;
    }
  }
  &:hover {
    .ant-input-group-addon {
      @apply border-primary_color;
    }
    .ant-input {
      @apply border-primary_color;
    }
  }
}
</style>
