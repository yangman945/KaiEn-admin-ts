<template>
  <!-- <KTLoader v-if="loaderEnabled" :logo="loaderLogo" /> -->
  <div class="page d-flex flex-row flex-column-fluid">
    <side-bar v-if="asideEnabled" :lightLogo="themeLightLogo" :darkLogo="themeDarkLogo" />
    <div id="kt_wrapper" class="d-flex flex-column flex-row-fluid wrapper">
      <!-- <header-wrapper /> -->
      <div id="kt_content" class="content d-flex flex-column flex-column-fluid">
        <div class="post d-flex flex-column-fluid">
          <div id="kt_content_container" :class="{
              'container-fluid': true,
              'container-xxl': false,
            }">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { SideBar,HeaderWrapper } from "./components/index";
import { MenuComponent } from "@/assets/ts/components";
import HtmlClass from "@/core/services/LayoutService";
const route = useRoute()
// 是否激活侧边栏
const asideEnabled = ref(true);
const loaderEnabled = ref(true);
const loaderLogo = ref(true);
const themeLightLogo = ref("main.logo.light");
const themeDarkLogo = ref("main.logo.dark");
HtmlClass.init();
watch(
  () => route.path,
  () => {
    MenuComponent.hideDropdowns(undefined);
  }
);
</script>
