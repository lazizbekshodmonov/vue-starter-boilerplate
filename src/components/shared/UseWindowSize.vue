<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const element = ref<HTMLElement>();
const height = ref<number>();
const width = ref<number>();

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  if (element.value) {
    resizeObserver = new ResizeObserver(() => {
      height.value = element.value?.offsetHeight;
      width.value = element.value?.offsetWidth;
    });
    resizeObserver.observe(element.value);

    height.value = element.value.offsetHeight;
    width.value = element.value.offsetWidth;
  }
});

onUnmounted(() => {
  if (element.value && resizeObserver) {
    resizeObserver.unobserve(element.value);
    resizeObserver.disconnect();
    resizeObserver = null;
  }
});
</script>

<template>
  <div ref="element" class="use-window-size w-full h-full">
    <slot :height="height" :width="width" />
  </div>
</template>
