import "vue-router";
import type { TUserRole } from "@/types/ui/employees";

declare module "vue-router" {
  interface RouteMeta {
    roles?: TUserRole[];
    title?: string;
  }
}
