<template>
    <div :class="['app-wrapper', { 'hide-sidebar': isCollapse }]">
        <div class="sidebar-container">
            <aside-a />
        </div>
        <!-- <div :class="['main-container', { 'hasTagsView': true }]">
            <div class="fixed-header">
                <nav-bar class="nav-bar" />
                <tags-view class="tags-view" />
            </div>
            <app-main />
        </div> -->
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from '@/store'
import { AppMain, AsideA, TagsView, NavBar } from './components'
const store = useStore()
const isCollapse = computed(() => {
    return store.state.app.sidebar.opened
})
</script>
<style lang="scss" scoped>
.app-wrapper {
    position: relative;
    display: flex;
    height: 100%;
    width: 100%;

    .sidebar-container {
        transition: width 0.28s;
        width: 210px !important;
        height: 100%;
        position: fixed;
        font-size: 0px;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow: hidden;
    }
    .main-container {
        width: calc(100% - 210px);
        min-height: 100%;
        transition: margin-left 0.28s;
        margin-left: 210px;
        position: relative;
        .fixed-header {
            position: fixed;
            top: 0;
            right: 0;
            z-index: 9;
            width: calc(100% - 210px);
            transition: width 0.28s;
            .nav-bar {
                height: 50px;
            }

            .tag-view {
                height: 34px;
            }
        }
       
    }
}
.hide-sidebar {
   .sidebar-container {
        width: 210px !important;
    }
    .main-container {
        width: calc(100% - 56px);
        margin-left: 56px;
        .fixed-header {
            width: calc(100% - 56px);
        }
    }
}
</style>