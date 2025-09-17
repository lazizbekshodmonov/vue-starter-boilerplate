<script setup lang="ts">
import { watch } from "vue";

const modelValue = defineModel<string>("value", { default: "" });

function sanitize(value: string) {
  return value.replace(/\D/g, "").slice(0, 14);
}

function onInput(e: Event) {
  const target = e.target as HTMLInputElement;
  const cleaned = sanitize(target.value);
  target.value = cleaned;
  modelValue.value = cleaned;
}

watch(
  () => modelValue.value,
  (val) => {
    if (val) {
      modelValue.value = sanitize(val);
    }
  },
);
</script>

<template>
  <a-input
    v-bind="$attrs"
    :value="modelValue"
    :maxlength="14"
    inputmode="numeric"
    pattern="\d*"
    @input="onInput"
  />
</template>
