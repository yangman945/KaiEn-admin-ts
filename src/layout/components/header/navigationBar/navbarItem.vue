<template>
  <template v-for="(child, index) in routeChild" :key="index">
    <div
      v-if="child.meta?.title"
      data-kt-menu-trigger="{default:'click', lg: 'hover'}"
      data-kt-menu-placement="right-start"
      class="menu-item menu-lg-down-accordion"
    >
      <span class="menu-link py-3" :class="{ active: hasActiveChildren(child.path) }">
        <span class="menu-bullet">
          <span class="bullet bullet-dot"></span>
        </span>
        <span class="menu-title">{{ child.meta?.title }}</span>
        <span class="menu-arrow"></span>
      </span>
      <div
        class="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px"
      >
        <template v-if="child.children">
          <navbar-item :routeChild="((child.children) as Array<RouteRecordRaw>)" />
        </template>
      </div>
    </div>
  </template>
</template>
<script lang="ts" setup>
import { defineProps, PropType } from "vue";
import { useRouter, useRoute, RouteRecordRaw } from "vue-router";
const router = useRouter();
const route = useRoute();
const props = defineProps({
  routeChild: {
    type: Object as PropType<Array<RouteRecordRaw>>,
    required: true,
  },
});
console.log(props.routeChild, "routeChild");
const push = (url) => {
  router.push(url).catch((err) => {
    console.log(err);
  });
};
const hasActiveChildren = (match) => {
  return route.path.indexOf(match) !== -1;
};
</script>
