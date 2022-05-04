<template>
  <!--begin::左浮动菜单-->
  <div id="kt_aside_menu_wrapper" ref="scrollElRef" class="hover-scroll-overlay-y my-5 my-lg-5" data-kt-scroll="true"
    data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-dependencies="#kt_aside_logo, #kt_aside_footer"
    data-kt-scroll-height="auto" data-kt-scroll-offset="0" data-kt-scroll-wrappers="#kt_aside_menu">
    <div id="#kt_header_menu"
      class="menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500"
      data-kt-menu="true">
      <template v-for="(menuItem,index) in MainMenuConfig" :key="index">
        <sidebar-item :route-menu="menuItem" />
      </template>
      <div class="menu-item">
        <div class="menu-content">
          <div class="separator mx-1 my-4">11111</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import MainMenuConfig from "@/core/config/menusConfig";
import SidebarItem from './sidebarItem.vue'
console.log(MainMenuConfig, "MainMenuConfig")
export default defineComponent({
  name: "menuBar",
  components:{SidebarItem},
  setup() {
    const route = useRoute();
    const scrollElRef = ref<null | HTMLElement>(null);
    onMounted(() => {
      if (scrollElRef.value) {
        scrollElRef.value.scrollTop = 0;
      }
    });


    const hasActiveChildren = (match) => {
      return route.path.indexOf(match) !== -1;
    };

    return {
      hasActiveChildren,
      MainMenuConfig
    };
  },
});
</script>
<style lang="scss">
// @import "src/styles/scss/layout/aside/_menu.scss";
// @import "src/styles/scss/layout/aside/_base.scss";
</style>
