<script setup lang="ts">
import type { TStatus } from "@/types/global";
import { type Component, ref, useSlots, type VNode } from "vue";

interface IProps {
  status: TStatus;
  content?: string | VNode | Component;
}

interface IColor {
  bg: string;
  content: string;
}

defineProps<IProps>();

const slots = useSlots();

interface IColor {
  bg: string;
  content: string;
}

const colors = ref<Record<TStatus, IColor>>({
  CREATED_BY_CLIENT_MANAGER: {
    bg: "#E6F2FF",
    content: "#007BFF",
  },
  SENT_TO_MAIN_BANK: {
    bg: "#E6F2FF",
    content: "#007BFF",
  },
  RESUBMITTED_TO_MAIN_BANK: {
    bg: "#F3E8FF",
    content: "#7B2CBF",
  },
  WAITING_FOR_BRANCH_SIGNATURE: {
    bg: "#FFFBE6",
    content: "#FAAD14",
  },
  RETURNED_FOR_REVISION: {
    bg: "#FFF3F2",
    content: "#E30016",
  },
  CANCELLED_BY_UPR_BRANCH: {
    bg: "#FFF3F2",
    content: "#E30016",
  },
  SIGNED_BY_BRANCH: {
    bg: "#E9F9ED",
    content: "#2DB06A",
  },
  PRINTED_AND_COMPLETED: {
    bg: "rgba(218,220,221,0.71)",
    content: "#545657",
  },
});
</script>

<template>
  <div
    :style="{
      color: colors[status]?.content,
      backgroundColor: colors[status]?.bg,
    }"
    class="w-max px-5 py-2 text-xs rounded-full"
    v-bind="$attrs"
  >
    <slot v-if="slots?.default" />
    <template v-else>
      {{ content }}
    </template>
  </div>
</template>

<style scoped></style>
