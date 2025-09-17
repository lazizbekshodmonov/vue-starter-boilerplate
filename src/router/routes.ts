import PageNotFound from "@/pages/error.vue";
import type { CustomRouteRecordRaw } from "@/types/global/router.ts";
import { dashboardRoutes } from "@/router/dashboard.routes.ts";

const routes: CustomRouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layouts/default.vue"),
  },
  {
    path: "/dashboard",
    name: "DashboardLayout",
    component: () => import("@/layouts/dashboard.vue"),
    children: dashboardRoutes,
  },
  {
    path: "/auth",
    component: () => import("@/layouts/auth.vue"),
    redirect: { name: "LoginView" },
    name: "AuthLayout",
    children: [
      {
        path: "",
        name: "LoginView",
        component: () => import("@/pages/auth/index.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: PageNotFound,
  },
];
export default routes;
