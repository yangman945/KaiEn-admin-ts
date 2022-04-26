<template>
    <div class="navigation-container">
        <collapse-btn 
        :is-active="isCollapse"
        @toggle-click="toggleSideBar"
         />
        <bread-crumb class="bread-crumb" />
        <div class="options-right">
            <theme-icon class="theme-icon" />
            <lang-select class="lang-select" />
            <screen-full class="screen-full" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import {computed} from 'vue'
import { useStore } from '@/store'
import { AppActionTypes } from '@/store/modules/app/types'
import breadCrumb from '@/components/bread_crumb/index.vue'
import screenFull from '@/components/screen_full/index.vue'
import langSelect from '@/components/lang_select/index.vue'
import collapseBtn from '@/components/collapse_btn/index.vue'
import themeIcon from '@/components/theme_icon/index.vue'
const store = useStore()
const isCollapse = computed(() => {
      return store.state.app.sidebar.opened
    })
const toggleSideBar = (()=>{
    store.dispatch(AppActionTypes.ACTION_TOGGLE_SIDEBAR, false)
})
</script>
<style lang="scss">
.navigation-container {
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    align-items: center;
    .options-right{
        margin-left: auto;
        display: flex;
        align-items: center;
    }
}
</style>