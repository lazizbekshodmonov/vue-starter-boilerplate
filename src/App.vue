<script setup lang="ts">
import theme from "@/plugins/ant.ts";
</script>

<template>
  <a-config-provider :theme="theme">
    <a-app>
      <router-view />
    </a-app>
  </a-config-provider>
</template>

<style scoped></style>
