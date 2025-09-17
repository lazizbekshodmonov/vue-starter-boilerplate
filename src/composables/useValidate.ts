import { useI18n } from "vue-i18n";
import { computed } from "vue";
import type { IFormItemRule } from "@/types/global";

export function useValidate() {
  const { t } = useI18n();

  const required = computed<IFormItemRule>(() => ({
    required: true,
    message: t("required"),
    trigger: "blur",
  }));

  return { required };
}
