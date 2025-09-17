import type {
  NavigationGuardNext,
  RouteLocationNormalizedGeneric,
  RouteLocationNormalizedLoadedGeneric,
} from "vue-router";

function authMiddleware(
  to: RouteLocationNormalizedGeneric,
  _from: RouteLocationNormalizedLoadedGeneric,
  next: NavigationGuardNext,
) {
  const accessToken = localStorage.getItem("token");
  if (accessToken) {
    if (to.path.includes("dashboard")) {
      return next();
    } else if (to.name === "ServerError") {
      return next();
    } else {
      return next({ name: "DashboardLayout" });
    }
  } else {
    if (to.path.includes("auth")) {
      return next();
    } else {
      return next({ name: "AuthLayout" });
    }
  }
}

export default authMiddleware;
