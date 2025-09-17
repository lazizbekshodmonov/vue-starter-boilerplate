<script setup lang="ts">
import { watch } from "vue";
import { renderAsync } from "docx-preview";

interface IProps {
  file?: ArrayBuffer;
}

const props = defineProps<IProps>();

watch(
  () => props.file,
  () => {
    if (props.file) renderDocx(props.file);
  },
);

async function renderDocx(file: ArrayBuffer) {
  const bodyContainer = document.getElementById(
    "docx-container",
  ) as HTMLElement;
  const styleContainer = document.getElementById("docx-style") as HTMLElement;

  await renderAsync(file, bodyContainer, styleContainer, {
    inWrapper: false,
    ignoreWidth: false,
    ignoreHeight: false,
    className: "docx",
    // renderHeaders: true,
    // renderFooters: true,
  });

  bodyContainer.style.transformOrigin = "top left";
  bodyContainer.style.width = "100%";
  autoScale();
}

function autoScale() {
  const container = document.getElementById("docx-container") as HTMLElement;
  if (!container) return;

  container.style.transformOrigin = "top center";
}
</script>

<template>
  <div class="max-h-[calc(100vh-180px)] overflow-y-auto border">
    <div id="docx-style"></div>
    <div id="docx-container"></div>
  </div>
</template>

<style lang="scss">
#docx-container {
  display: flex;
  justify-content: center;
  align-items: center;
  //max-width: 55vw;
  //max-height: calc(100vh - 110px);
  width: 705px !important;
  transform-origin: top center;
}

.docx-wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  overflow-x: auto;
  transform: scale(0.9);
  padding: 0 !important;
  .docx {
    width: 705px;
    margin: 0 !important;
  }
}
</style>
