<template>
  <div
    class="header-menu align-items-stretch"
    data-kt-drawer="true"
    data-kt-drawer-name="header-menu"
    data-kt-drawer-activate="{default: true, lg: false}"
    data-kt-drawer-overlay="true"
    data-kt-drawer-width="{default:'200px', '300px': '250px'}"
    data-kt-drawer-direction="end"
    data-kt-drawer-toggle="#kt_header_menu_mobile_toggle"
    data-kt-place="true"
    data-kt-place-mode="prepend"
    data-kt-place-parent="{default: '#kt_body', lg: '#kt_header_nav'}"
  >
    <div
      class="menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch"
      id="#kt_header_menu"
      data-kt-menu="true"
    >
      <template v-for="(routeItem, index) in asyncRoutes" :key="index">
        <!-- <navbar-item :route-menu="routeItem" /> -->
        <div
          v-if="routeItem.children && routeItem.children?.length > 0"
          data-kt-menu-trigger="click"
          data-kt-menu-placement="bottom-start"
          class="menu-item menu-lg-down-accordion me-lg-1"
        >
          <span
            class="menu-link py-3"
            :class="{ active: hasActiveChildren(routeItem.path) }"
          >
            <span class="menu-title">{{ routeItem.meta?.title }}</span>
            <span class="menu-arrow d-lg-none"></span>2
          </span>
          
          <div
            class="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-rounded-0 py-lg-4 w-lg-225px"
          >
            <navbar-item :routeChild="routeItem.children" />
          </div>
           
        </div>

        <div v-else class="menu-item me-lg-1">
          <router-link class="menu-link" :to="routeItem.path" active-class="active">
            <span class="menu-title">{{ routeItem.meta?.title }}</span>
          </router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "@/store";
import { useRouter, useRoute, RouteRecordRaw } from "vue-router";
import NavbarItem from "./navbarItem.vue";
const store = useStore();
const route = useRoute();
const asyncRoutes = computed(() => {
  return store.state.system.asyacRoutes;
});

const hasActiveChildren = (match) => {
  return route.path.indexOf(match) !== -1;
};
</script>
