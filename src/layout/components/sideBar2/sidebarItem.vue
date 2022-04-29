<template>
    <div class>
        <!-- 当菜单不为null，并且没有children时 渲染 -->
        <template v-if="theOnlyOneChild && !theOnlyOneChild.children">
            <sidebar-item-link v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild)">
                <el-menu-item :index="resolvePath(theOnlyOneChild)">
                    <svg-icon class="svg-icon" v-if="theOnlyOneChild.meta && theOnlyOneChild.meta.icon"
                        :icon="theOnlyOneChild.meta.icon" :config="{ size: 16 }"> </svg-icon>
                    <span v-if="theOnlyOneChild.meta.title">{{ $t('route.' + theOnlyOneChild.meta.title) }}</span>
                </el-menu-item>
            </sidebar-item-link>
        </template>
        <el-sub-menu v-else :index="resolvePath(item)" popper-append-to-body>
            <template #title>
                <svg-icon class="svg-icon" v-if="item.meta && item.meta.icon" :icon="item.meta.icon"
                    :config="{ size: 16 }"></svg-icon>
                <span v-if="item.meta && item.meta.title">{{ $t('route.' + item.meta.title) }}</span>
            </template>
            <template v-if="item.children">
                <sidebar-item v-for="child in item.children" :key="child.path" :item="child" :is-first-level="false"
                    :base-path="resolvePath(child)" :is-collapse="isCollapse" class="nest-menu" />
            </template>
        </el-sub-menu>
    </div>
</template>
<script lang="ts" setup>
import { defineProps, PropType, computed } from 'vue';
import { RouteRecordRaw } from "vue-router";
import path from 'path'
import { isExternal } from '@/utils/validate'
import sidebarItemLink from './sidebarItemLink.vue'
const props = defineProps({
    // 根路径
    basePath: {
        type: String,
        required: true
    },
    // 子菜单
    item: {
        type: Object as PropType<RouteRecordRaw>,
        required: true

    },
    // 是否折叠
    isCollapse: {
        type: Boolean,
        required: false
    }
})
// 检验菜单需要显示的子路由数量
const showingChildNumber = computed(() => {
    if (props.item.children) {
        const showingChildren = props.item.children.filter((item) => {
            // 这里返回hidden为 false 的菜单
            return !(item.meta && item.meta.hidden)
        })
        return showingChildren.length
    }
    return 0
})
// 检验菜单是否为独立菜单或是只有单个子菜单 
const theOnlyOneChild = computed(() => {
    // 菜单拥有多个子菜单返回 null
    if (showingChildNumber.value > 1) {
        return null
    }
    // 菜单拥有的唯一子菜单有效 那么返回它的子菜单
    if (props.item.children) {
        for (const child of props.item.children) {
            if (!child.meta || !child.meta.hidden) {
                return child
            }
        }
    }
    // 返回菜单本身 这里path为什么为空？？？
    return { ...props.item, path: '' }
})
// 访问路径校验 根路径或子菜单路由若为外链 直接返回 否则拼接后返回绝对路径
const resolvePath = (routeConfig: RouteRecordRaw) => {
    if (isExternal(routeConfig.path)) {
        return routeConfig
    }
    if (isExternal(props.basePath)) {
        return props.basePath
    }
    return path.resolve(props.basePath, routeConfig.path)
}

</script>
<style lang="scss" scoped>
.svg-icon {
    margin-right: 20px;
}
</style>