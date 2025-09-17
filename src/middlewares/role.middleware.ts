import useUserStore from "@/store/user.store.ts";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { filterRoutesByRole } from "@/utils/router.ts";
import { dashboardRoutes } from "@/router/dashboard.routes.ts";

export function roleMiddleware(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const userStore = useUserStore();
  const userRole = userStore.userProfile?.role;
  if (userRole) {
    const isAllowed = to.matched.some((m) => {
      if (!m.meta?.roles) return false;
      return m.meta.roles.includes(userRole);
    });

    const allowedRoutes = filterRoutesByRole(dashboardRoutes, userRole);
    if (isAllowed) {
      return next();
    } else if (allowedRoutes.length > 0) {
      return next({ name: allowedRoutes[0].name });
    } else {
      return next(false);
    }
  } else {
    return next();
  }
}
