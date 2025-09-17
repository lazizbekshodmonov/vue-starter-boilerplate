import { createRouter, createWebHistory } from "vue-router";
import NProgress from "@/plugins/nprogress.ts";

import routes from "./routes.ts";
import type { I18nGlobal } from "@/plugins/i18n.ts";
import authMiddleware from "@/middlewares/auth.middleware.ts";
import { roleMiddleware } from "@/middlewares/role.middleware.ts";

export const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

const routerFactory = (i18n: I18nGlobal) => {
  router.beforeEach((to) => {
    const titleKey = to.name || "title";
    document.title = i18n.t(`menu.${titleKey as string}`);
  });

  router.beforeEach(authMiddleware);
  router.beforeEach(roleMiddleware);

  router.beforeEach((to, from, next) => {
    if (to.path !== from.path || to.name !== from.name) {
      NProgress.start();
    }
    next();
  });

  router.afterEach((to, from) => {
    if (to.path !== from.path || to.name !== from.name) {
      NProgress.done();
    }
  });
  return router;
};

export default routerFactory;
