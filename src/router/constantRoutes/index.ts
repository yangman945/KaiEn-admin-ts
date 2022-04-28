import { RouteRecordRaw } from "vue-router";
import Custom from "@/views/custom/index.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => Custom,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => Custom,
      },
      {
        path: "/crafted/pages/profile",
        name: "profile",
        component: () => Custom,
        children: [
          {
            path: "overview",
            name: "profile-overview",
            component: () => Custom,
          },
          {
            path: "projects",
            name: "profile-projects",
            component: () => Custom,
          },
          {
            path: "campaigns",
            name: "profile-campaigns",
            component: () => Custom,
          },
          {
            path: "documents",
            name: "profile-documents",
            component: () => Custom,
          },
          {
            path: "connections",
            name: "profile-connections",
            component: () => Custom,
          },
          {
            path: "activity",
            name: "profile-activity",
            component: () => Custom,
          },
        ],
      },
      {
        path: "/apps/customers/getting-started",
        name: "apps-customers-getting-started",
        component: () => Custom,
      },
      {
        path: "/apps/customers/customers-listing",
        name: "apps-customers-listing",
        component: () => Custom,
      },
      {
        path: "/apps/customers/customer-details",
        name: "apps-customers-details",
        component: () => Custom,
      },
      {
        path: "/apps/customers/view-roles",
        name: "apps-view-roles",
        component: () => Custom,
      },
      {
        path: "/apps/customers/role-list",
        name: "apps-role-list",
        component: () => Custom,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

export default routes;
