import { createRouter, createWebHashHistory, RouteRecordRaw,RouteLocationNormalized } from "vue-router";
import Layout from "@/layout/index.vue";
import Custom from "@/views/custom/index.vue";
import constantRoutes from './constantRoutes'
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    component: import("@/views/login/index.vue"),
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    name: "Dashboard",
    meta: {
      title: "dashboard",
    },
    children: [{
      path: "/dashboard",
      name:'Dashboards',
      component: () =>
        import(
          /* webpackChunkName: "dashboard" */ "@/views/dashboard/index.vue"
        ),
      meta: {
        title: "dashboard",
        icon: "dashboard",
      },
    },],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  }
];
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});
export default router;
