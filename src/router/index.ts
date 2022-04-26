import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";
import Custom from "@/views/custom/index.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    component: import("@/views/login/index.vue"),
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    meta: {
      title: "dashboard",
    },
    children: [
      {
        path: "dashboard",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "@/views/dashboard/index.vue"
          ),
        name: "Dashboard",
        meta: {
          title: "dashboard",
          icon: "dashboard",
        },
      },
    ],
  },
  {
    path: "/",
    component: Layout,
    meta: {
      title: "custom"
    },
    children: [
      {
        path: "custom",
        component: Custom,
        name: "Custom",
        meta: {
          title: "custom",
          icon: "custom",
        },
      },
      {
        path: "custom/456",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "@/views/custom/index.vue"
          ),
        name: "Custom2",
        meta: {
          title: "custom",
          icon: "custom",
        },
      },
      {
        path: "custom/:id",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "@/views/custom/index.vue"
          ),
        name: "Custom2",
        meta: {
          title: "custom",
          icon: "custom",
        },
      },
    ],
  },
  {
    path: "/nested",
    component: Layout,
    redirect: "/nested/menu2",
    name: "Nested",
    meta: {
      title: "nested",
      icon: "nested",
    },
    children: [
      {
        path: "menu1",
        component: () =>
          import(
            /* webpackChunkName: "menu1" */ "@/views/nested/menu1/Index.vue"
          ),
        name: "Menu1",
        meta: { title: "menu1", noCache: true },
        children: [
          {
            path: "menu1-1",
            component: () =>
              import(
                /* webpackChunkName: "menu1-1" */ "@/views/nested/menu1/menu1-1/Index.vue"
              ),
            name: "Menu1-1",
            meta: { title: "menu1-1" },
          },
          {
            path: "menu1-2",
            component: () =>
              import(
                /* webpackChunkName: "menu1-2" */ "@/views/nested/menu1/menu1-2/Index.vue"
              ),
            name: "Menu1-2",
            meta: { title: "menu1-2" },
            children: [
              {
                path: "menu1-2-1",
                component: () =>
                  import(
                    /* webpackChunkName: "menu1-2-1" */ "@/views/nested/menu1/menu1-2/menu1-2-1/Index.vue"
                  ),
                name: "Menu1-2-1",
                meta: { title: "menu1-2-1" },
              },
              {
                path: "menu1-2-2",
                component: () =>
                  import(
                    /* webpackChunkName: "menu1-2-2" */ "@/views/nested/menu1/menu1-2/menu1-2-2/Index.vue"
                  ),
                name: "Menu1-2-2",
                meta: { title: "menu1-2-2" },
              },
            ],
          },
          {
            path: "menu1-3",
            component: () =>
              import(
                /* webpackChunkName: "menu1-3" */ "@/views/nested/menu1/menu1-3/Index.vue"
              ),
            name: "Menu1-3",
            meta: { title: "menu1-3" },
          },
        ],
      },
      {
        path: "menu2",
        component: () =>
          import(
            /* webpackChunkName: "menu2" */ "@/views/nested/menu2/Index.vue"
          ),
        name: "Menu2",
        meta: { title: "menu2" },
      },
    ],
  },
];
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});
export default router;
