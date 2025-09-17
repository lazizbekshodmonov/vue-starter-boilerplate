import uz from "@/locales/uz.json";

type RecursiveKeyOf<TObj extends object> = {
  [K in keyof TObj & (string | number)]: TObj[K] extends object
    ? `${K}.${RecursiveKeyOf<TObj[K]>}`
    : `${K}`;
}[keyof TObj & (string | number)];

export type KeyI18nT = RecursiveKeyOf<typeof uz>;
