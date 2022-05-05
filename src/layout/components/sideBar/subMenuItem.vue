<template>
  <!-- 菜单模块 start -->
  <!-- 模块名称 -->
  <!-- <div v-if="routeMenu.meta.title" class="menu-item">
    <div class="menu-content pt-8 pb-2">
      <span class="menu-section text-muted text-uppercase fs-8 ls-1">
        {{ routeMenu.meta.title }}
      </span>
    </div>
  </div> -->
  <div
    v-if="routeMenu.children?.length > 0"
    :class="{ show: hasActiveChildren(routeMenu.path) }"
    class="menu-item menu-accordion"
    data-kt-menu-sub="accordion"
    data-kt-menu-trigger="click"
  >
    <span class="menu-link">
    <span class="menu-icon">
        <span class="svg-icon svg-icon-2">
          <svg-icon icon="verify" />
        </span>
      </span>
      <span class="menu-title">{{ routeMenu.meta.title }}</span>
      <span class="menu-arrow"></span>
    </span>
    <div
      :class="{ show: hasActiveChildren(routeMenu.path) }"
      class="menu-sub menu-sub-accordion"
    >
      <!-- 菜单内容 -->
      <template v-for="(child, index) in routeMenu.children" :key="index">
        <div v-if="child.meta?.title" class="menu-item">
          <router-link class="menu-link" active-class="active" @click="push(child.path)"  :to="child.path">
            <span class="menu-bullet">
              <span class="bullet bullet-dot"></span>
            </span>
            <span class="menu-title">{{ child.meta?.title }}</span>
          </router-link>
        </div>
      </template>
    </div>
  </div>
  <div v-else class="menu-item">
    <router-link class="menu-link" active-class="active" @click="push(routeMenu.path)"  :to="routeMenu.path">
      <span class="menu-icon">
        <span class="svg-icon svg-icon-2">
          <svg-icon icon="verify" />
        </span>
      </span>
      <span class="menu-title">{{ routeMenu.meta.title }}</span>
    </router-link>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, PropType } from "vue";
import { useRouter,useRoute,RouteRecordRaw } from "vue-router";
const router = useRouter();
const route = useRoute();
console.log(router.getRoutes(),"getRoutes")
defineProps({
  routeMenu: {
    type: Object as PropType<RouteRecordRaw>,
    required: true,
  },
});

const push = (url) => {
    router.push(url).catch((err) => {
        console.log(err)
      })
}
const hasActiveChildren = (match) => {
  return route.path.indexOf(match) !== -1;
};
</script>
