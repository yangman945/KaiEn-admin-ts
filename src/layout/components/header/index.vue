<template>
  <div id="kt_header" style="" class="header align-items-stretch">
    <div class="d-flex align-items-center d-lg-none ms-n3 me-1" title="Show aside menu">
      <div
        class="btn btn-icon btn-active-light-primary"
        id="kt_aside_mobile_toggle"
      ></div>
    </div>
    <div class="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
      <div class="d-flex align-items-stretch" id="kt_header_menu_nav">
        <navigation-bar />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavigationBar from "./navigationBar/index.vue";
</script>
