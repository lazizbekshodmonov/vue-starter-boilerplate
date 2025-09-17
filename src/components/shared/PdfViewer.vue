<script setup lang="ts">
interface Props {
  url: string;
}

defineProps<Props>();
</script>

<template>
  <iframe v-if="url" :src="url" width="100%" height="100%"></iframe>
</template>

<style scoped></style>
