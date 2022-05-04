<template>
    <!-- 菜单模块 start -->
    <div v-if="props.routeMenu.heading" class="menu-item">
        <div class="menu-content pt-8 pb-2">
            <span class="menu-section text-muted text-uppercase fs-8 ls-1">
                {{ props.routeMenu.heading }}
            </span>
        </div>
    </div>
    <template v-if="props.routeMenu.pages">
        <template v-for="(page, first) in props.routeMenu.pages" :key="first">
            <div class="menu-item">
                <router-link class="menu-link" active-class="active" :to="page.route">
                    <span class="menu-title">{{ page.sectionTitle }}</span>
                </router-link>
            </div>
        </template>
    </template>
    <!-- 菜单模块 end -->
    <!-- <div v-if="item.sectionTitle" :class="{ show: hasActiveChildren(item.route) }" class="menu-item menu-accordion"
            data-kt-menu-sub="accordion" data-kt-menu-trigger="click">
            <span class="menu-link">
                <span class="menu-title">{{
                        item.sectionTitle
                }} 菜单目录标题</span>
                <span class="menu-arrow"></span>
            </span>
            <div :class="{ show: hasActiveChildren(item.route) }" class="menu-sub menu-sub-accordion">
                <template v-for="(item2, k) in item.sub" :key="k">
                    <div v-if="item2.heading" class="menu-item">
                        <router-link class="menu-link" active-class="active" :to="item2.route">
                            <span class="menu-bullet">
                                <span class="bullet bullet-dot"></span>
                            </span>
                            <span class="menu-title">{{
                                    item2.heading
                            }} 子菜单</span>
                        </router-link>
                    </div>
                </template>
            </div>
        </div> -->
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import { useRoute } from "vue-router";
const route = useRoute()
const props = defineProps({
    routeMenu: {
        type: Object,
        required: true
    }
})
console.log(props.routeMenu, "?????")
const hasActiveChildren = (match) => {
    return route.path.indexOf(match) !== -1;
};
</script>