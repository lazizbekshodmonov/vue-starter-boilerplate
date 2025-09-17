import type { CustomRouteRecordRaw } from "@/types/global/router.ts";

export const dashboardRoutes: CustomRouteRecordRaw[] = [
  {
    path: "client-manager",
    name: "GuaranteesView",
    component: () => import("@/pages/dashboard/client-manager/index.vue"),
    meta: { roles: ["CLIENT_MANAGER"] },
    redirect: { name: "ClientManagerView" },
    children: [
      {
        path: "",
        name: "ClientManagerView",
        component: () =>
          import("@/pages/dashboard/client-manager/ListView.vue"),
        meta: { roles: ["CLIENT_MANAGER"] },
      },
      {
        path: "details/:id",
        name: "ClientManagerGuaranteeDetailView",
        component: () =>
          import("@/pages/dashboard/client-manager/DetailView.vue"),
        meta: { roles: ["CLIENT_MANAGER"] },
      },
    ],
  },
  {
    path: "rep-kad",
    name: "RepKadView",
    component: () => import("@/pages/dashboard/rep-kad/index.vue"),
    redirect: { name: "RepKadGuaranteesListView" },
    meta: { roles: ["REP_KAD"] },
    children: [
      {
        path: "",
        name: "RepKadGuaranteesListView",
        component: () => import("@/pages/dashboard/rep-kad/ListView.vue"),
        meta: { roles: ["REP_KAD"] },
      },
      {
        path: "details/:id",
        name: "RepKadGuaranteesDetailView",
        component: () => import("@/pages/dashboard/rep-kad/DetailView.vue"),
        meta: { roles: ["REP_KAD"] },
      },
    ],
  },
  {
    path: "branch-manager",
    name: "BranchManagerView",
    component: () => import("@/pages/dashboard/branch-manager/index.vue"),
    redirect: { name: "BranchManagerGuaranteesListView" },
    meta: { roles: ["UPR_BRANCH"] },
    children: [
      {
        path: "",
        name: "BranchManagerGuaranteesListView",
        component: () =>
          import("@/pages/dashboard/branch-manager/ListView.vue"),
        meta: { roles: ["UPR_BRANCH"] },
      },
      {
        path: "details/:id",
        name: "BranchManagerGuaranteesDetailView",
        component: () =>
          import("@/pages/dashboard/branch-manager/DetailView.vue"),
      },
    ],
  },
  {
    path: "employees",
    name: "EmployeesView",
    component: () => import("@/pages/dashboard/employees/index.vue"),
    meta: { roles: ["ADMIN_GUAR"] },
  },
];
