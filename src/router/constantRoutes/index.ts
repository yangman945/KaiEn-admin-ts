import { RouteRecordRaw } from "vue-router";
import Custom from "@/views/custom/index.vue";
const routes: Array<RouteRecordRaw> = [
  
  {
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
  },
];
export default routes;
