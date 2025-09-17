import type { TUserRole } from "@/types/ui/employees";
import type { CustomRouteRecordRaw } from "@/types/global/router.ts";

export function filterRoutesByRole(
  routes: CustomRouteRecordRaw[],
  userRole: TUserRole,
): CustomRouteRecordRaw[] {
  let result: CustomRouteRecordRaw[] = [];

  for (const route of routes) {
    const allowed = !route.meta?.roles || route.meta.roles.includes(userRole);

    if (allowed) {
      const r: CustomRouteRecordRaw = { ...route };
      delete r.children;
      result.push(r);

      if (route.children) {
        result.push(...filterRoutesByRole(route.children, userRole));
      }
    }
  }

  return result;
}
