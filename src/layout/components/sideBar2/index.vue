<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu 
    :default-active="activeMenu" 
    :unique-opened="false" 
    :collapse="isCollapse" 
    active-text-color="#409EFF"
      class="el-menu-vertical-demo">
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"
        :is-collapse="isCollapse" class="nest-menu" />
    </el-menu>
  </el-scrollbar>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { routes } from '@/router'
import { useStore } from '@/store'
import SidebarItem from './sidebarItem.vue'
const route = useRoute()
const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta) {
    if (meta.activeMenu) {
      return meta.activeMenu
    }
  }
  return path
})
const store = useStore()
const isCollapse = computed(() => {
  return store.state.app.sidebar.opened
})
</script>
<style lang="scss">
.el-scrollbar__view {
  height: 100%;
}
</style>
<style lang="scss" scoped>
.el-scrollbar {
  height: calc(100% - 50px);

}

.el-menu {
  border: none;
  height: 100% !important;
  width: 100% !important;
}
</style>