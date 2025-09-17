<script setup lang="ts">
import BaseButton from "@/components/shared/BaseButton.vue";

interface Tab {
  tab: string;
  key: string;
}

interface Props {
  tabs: Tab[];
}

interface Emits {
  onChange: [string | undefined];
}

defineProps<Props>();
const emits = defineEmits<Emits>();
const activeButton = defineModel<string>("activeKey");

function handleChangeTab(value: string) {
  activeButton.value = value;
  emits("onChange", value);
}
</script>

<template>
  <div class="w-full flex justify-start flex-wrap gap-2">
    <base-button
      v-for="item in tabs"
      :type="activeButton === item.key ? 'primary' : 'default'"
      @click="handleChangeTab(item.key)"
    >
      {{ item.tab }}
    </base-button>
  </div>
</template>

<style scoped></style>
