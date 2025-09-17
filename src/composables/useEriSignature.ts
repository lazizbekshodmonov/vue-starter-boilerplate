import { defineModel, ref, watch } from "vue";
import useEImzoKeys, { type Certificate } from "@/plugins/useEImzoKeys";
import useNotification from "@/composables/useNotification";

function useEriSignature(callback: (pkcs7: string | null) => void) {
  const { setToast } = useNotification();

  const [keys, pkcs7_64, error, getItem] = useEImzoKeys();

  const loadingEimzoKeys = ref(true);
  const selectedKey = defineModel<Certificate | null>("selectedKey");

  watch(keys, () => {
    loadingEimzoKeys.value = false;
  });

  watch([pkcs7_64, error], () => {
    if (pkcs7_64.value) {
      error.value = null;
      callback(pkcs7_64.value);
    } else if (error.value) {
      pkcs7_64.value = null;
      callback(null);
      setToast({
        type: "warning",
        message: error.value,
      });
    }
  });

  function selectKey(key: Certificate) {
    selectedKey.value = key;
  }

  function generatePkcs7(data: string | object) {
    if (!selectedKey.value) return;
    getItem({
      ...selectedKey.value,
      UUID: typeof data === "object" ? JSON.stringify(data) : data,
    });
  }

  return {
    keys,
    selectedKey,
    loadingEimzoKeys,
    selectKey,
    generatePkcs7,
  };
}

export default useEriSignature;
