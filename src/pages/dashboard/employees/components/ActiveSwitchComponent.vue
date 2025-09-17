<script setup lang="ts">
import type { IEmployee } from "@/types/ui/employees";
import employeeService from "@/services/employee.service.ts";
import { handleError } from "@/utils/notification.ts";
import { useRefreshTrigger } from "@/composables/useRefreshTrigger.ts";
import { ref } from "vue";

interface Props {
  item: IEmployee;
}

const { refresh } = useRefreshTrigger();

const props = defineProps<Props>();

const loading = ref<boolean>(false);

async function changeActive(checked: boolean) {
  try {
    loading.value = true;
    await employeeService.update(props.item.pinfl, { active: checked });
    await refresh("employees");
  } catch (error) {
    handleError(error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <a-switch @change="changeActive" :checked="item.active" :loading="loading" />
</template>

<style scoped></style>
