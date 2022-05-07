import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";
import permissionRoutes from "./permissionRoutes/index";
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "@/views/login/index.vue"),
  },

  {
    path: "/",
    component: Layout,
    name: "Dashboard",
    meta: {
      title: "dashboard",
    },
    children: [...permissionRoutes],
  },
  {
    path: "/",
    component: () =>
      import(
        /* webpackChunkName: "SignIn" */ "@/components/KT_components/page-layouts/Auth.vue"
      ),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import(/* webpackChunkName: "SignIn" */ "@/views/login/signIn.vue"),
      },
    ],
  },
  {
    // the 404 route, when none of the above matches
    path: "/404",
    name: "Error404",
    component: () =>
      import(/* webpackChunkName: "Error404" */ "@/views/errorPage/404.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});
export default router;
