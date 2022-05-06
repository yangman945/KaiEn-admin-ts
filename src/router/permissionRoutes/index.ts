import { RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  
  {
    path: "/dashboard",
    name:'Dashboards',
    component: () =>
      import(
        /* webpackChunkName: "dashboards" */ "@/views/dashboard/index.vue"
      ),
    meta: {
      title: "dashboard",
      icon: "dashboard",
    },
  },
  {
    path: "/menuManager",
    name:'MenuManager',
    component: () =>
      import(
        /* webpackChunkName: "MenuManager" */ "@/views/system/menuManager.vue"
      ),
    meta: {
      title: "系统菜单管理",
      icon: "dashboard",
    },
  },
];
export default routes;