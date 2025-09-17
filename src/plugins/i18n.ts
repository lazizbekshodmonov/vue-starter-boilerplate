import { createI18n } from "vue-i18n";
import { ref } from "vue";
import uz from "@/locales/uz.json" assert { type: "json" };

type Lang = "uz";

const lang = localStorage.getItem("lang");
const locale = ref<Lang>((lang as Lang) ?? "uz");

const i18n = createI18n<typeof uz, "uz">({
  legacy: false,
  globalInjection: true,
  locale: locale.value,
  fallbackLocale: "uz",
  messages: { uz },
});
const i18nFactory = () => {
  return i18n;
};

export default i18nFactory;
export type I18nGlobal = typeof i18n.global;
