import { defineStore } from "pinia";
import { ref } from "vue";

const useCore = defineStore("core", () => {
  const visibleModal = ref<Set<string>>(new Set<string>());
  const loadingUrl = ref<Set<string>>(new Set<string>());

  return {
    visibleModal,
    loadingUrl,
  };
});

export default useCore;
