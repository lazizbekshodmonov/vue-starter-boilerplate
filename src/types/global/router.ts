import type { RouteRecordRaw } from "vue-router";
import type { KeyI18nT } from "@/types/i18n";
import type { TUserRole } from "@/types/ui/employees";

export type CustomRouteRecordRaw = RouteRecordRaw & {
  children?: CustomRouteRecordRaw[];
  meta?: {
    title?: KeyI18nT;
    roles?: TUserRole[];
  };
};
