<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <h1>{{ t("page_not_found") }}</h1>
  </div>
</template>

<style scoped></style>
