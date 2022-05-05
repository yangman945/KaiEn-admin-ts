<template>
  <!--begin::左浮动菜单-->
  <div
    id="kt_aside_menu_wrapper"
    ref="scrollElRef"
    class="hover-scroll-overlay-y my-5 my-lg-5"
    data-kt-scroll="true"
    data-kt-scroll-activate="{default: false, lg: true}"
    data-kt-scroll-dependencies="#kt_aside_logo, #kt_aside_footer"
    data-kt-scroll-height="auto"
    data-kt-scroll-offset="0"
    data-kt-scroll-wrappers="#kt_aside_menu"
  >
    <div
      id="#kt_header_menu"
      class="menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500"
      data-kt-menu="true"
    >
      <template v-for="(routeItem, index) in asyncRoutes" :key="index">
        <sub-menu-item :route-menu="routeItem" />
      </template>
      <div class="menu-item">
        <div class="menu-content">
          <div class="separator mx-1 my-4"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref ,computed} from "vue";
import { useRoute } from "vue-router";
import {useStore} from '@/store'
import MainMenuConfig from "@/core/config/menusConfig";
import subMenuItem from './subMenuItem.vue'
    const route = useRoute();
    const store = useStore()
    const scrollElRef = ref<null | HTMLElement>(null);
    onMounted(() => {
      if (scrollElRef.value) {
        scrollElRef.value.scrollTop = 0;
      }
    });
    const asyncRoutes = computed(()=>{
      return store.state.system.asyacRoutes
    })
    console.log(asyncRoutes.value,"有东西吗")
    const hasActiveChildren = (match) => {
      return route.path.indexOf(match) !== -1;
    }
</script>
<style lang="scss">
// @import "src/styles/scss/layout/aside/_menu.scss";
// @import "src/styles/scss/layout/aside/_base.scss";
</style>
