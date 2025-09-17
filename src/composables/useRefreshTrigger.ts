import { ref } from "vue";

type RefreshFn = () => Promise<void>;

const refreshMap = ref(new Map<string, RefreshFn>());

export function useRefreshTrigger() {
  const registerCallback = (key: string, callback: RefreshFn) => {
    refreshMap.value.set(key, callback);
  };

  const unregisterCallback = (key: string) => {
    refreshMap.value.delete(key);
  };

  const refresh = async (key: string) => {
    const cb = refreshMap.value.get(key);
    if (cb) {
      await cb();
    }
  };

  return { registerCallback, unregisterCallback, refresh };
}
