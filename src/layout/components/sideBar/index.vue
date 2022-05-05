<template>
  <div
    id="kt_aside"
    class="aside aside-hoverable"
    :class="[
      asideTheme === 'light' && 'aside-light',
      asideTheme === 'dark' && 'aside-dark',
    ]"
    data-kt-drawer="true"
    data-kt-drawer-name="aside"
    data-kt-drawer-activate="{default: true, lg: false}"
    data-kt-drawer-overlay="true"
    data-kt-drawer-width="{default:'200px', '300px': '250px'}"
    data-kt-drawer-direction="start"
    data-kt-drawer-toggle="#kt_aside_mobile_toggle"
  >
    <div class="aside-logo flex-column-auto" id="kt_aside_logo">
      <a href="#" v-if="asideTheme === 'dark'">
        <img alt="Logo" :src="props.darkLogo" class="h-25px logo" />
      </a>
      <a href="#" v-if="asideTheme === 'light'">
        <img alt="Logo" :src="props.lightLogo" class="h-25px logo" />
      </a>
      <div
        id="kt_aside_toggle"
        class="btn btn-icon w-auto px-0 btn-active-color-primary aside-toggle"
        data-kt-toggle="true"
        data-kt-toggle-state="active"
        data-kt-toggle-target="body"
        data-kt-toggle-name="aside-minimize"
      >
        <span class="svg-icon svg-icon-1 rotate-180">
          <!-- <inline-svg src="media/icons/duotune/arrows/arr080.svg" />布局1 -->
        </span>
      </div>
    </div>
    <div class="aside-menu flex-column-fluid">
      <sub-menu></sub-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from "vue";
import SubMenu from "./subMenu.vue";
const asideTheme = ref("dark");
const props = defineProps({
  lightLogo: String,
  darkLogo: String,
});
</script>
