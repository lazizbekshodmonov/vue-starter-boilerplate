<script setup lang="ts">
import BaseButton from "@/components/shared/BaseButton.vue";
import IconUserEdit from "@/components/icons/IconUserEdit.vue";
import IconTrash from "@/components/icons/IconTrash.vue";

interface Emits {
  delete: [];
  edit: [];
}

const emits = defineEmits<Emits>();
</script>

<template>
  <div class="w-full flex justify-end gap-3">
    <base-button @click="emits('edit')" type="primary">
      <template #icon>
        <icon-user-edit class="text-lg" />
      </template>
      Tahrirlash
    </base-button>
    <base-button @click="emits('delete')" type="primary" danger>
      <template #icon>
        <icon-trash class="text-lg" />
      </template>
      O'chirish
    </base-button>
  </div>
</template>

<style scoped></style>
