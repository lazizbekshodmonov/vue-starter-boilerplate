import { onMounted, onUnmounted, ref } from "vue";

export default function useWindowHeight(cb?: (innerHeight: number) => void) {
  const windowHeight = ref(window.innerHeight);

  const handleResize = () => {
    windowHeight.value = window.innerHeight;
    cb?.(window.innerHeight);
  };

  onMounted(() => {
    window.addEventListener("resize", handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });

  return windowHeight;
}
