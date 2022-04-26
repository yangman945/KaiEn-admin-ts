<template>
    <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item, index) in state.breadcrumbs" :key="item.path">
                <span
                    v-if="
                        item.redirect === 'noredirect' || index === state.breadcrumbs.length - 1
                    "
                    class="no-redirect"
                >{{ $t('route.' + item.meta.title) }}</span>
                <a v-else @click.prevent="handleLink(item)">{{ $t('route.' + item.meta.title) }}</a>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>
<script lang="ts" setup>
import { onBeforeMount, watch, reactive } from 'vue'
import { useRoute, RouteLocationMatched } from 'vue-router'
import { compile } from 'path-to-regexp'
import router from '@/router'

let currentRoute = useRoute()
let pathCompile = (path: string) => {
    let { params } = currentRoute
    let toPath = compile(path)
    return toPath(params)
}

let state = reactive({
    breadcrumbs: [] as Array<RouteLocationMatched>
})
// 获取面包屑列表
let getBreadcrumb = () => {
    let matched = currentRoute.matched.filter(
        (item) => item.meta && item.meta.title
    )
    let frist = matched[0]
    // 如果不是首页 手动添加dashboard为面包屑导航首位
    if (!isDashboard(frist)) {
        let dashboard = { path: '/dashboard', meta: { title: 'dashboard' } }
        matched.unshift(dashboard as any)
    }
    // 筛选出不需要添加至面包屑的路由
    state.breadcrumbs = matched.filter((item) => {
        return item.meta && item.meta.title && item.meta.breadcrumb !== false
    })
}
// 判断是否为首页
let isDashboard = (route: RouteLocationMatched) => {
    const name = route && route.name
    if (!name) {
        return false
    }
    return (
        name.toString().trim().toLocaleLowerCase() ===
        'Dashboard'.toLocaleLowerCase()
    )
}
let handleLink = (item: any) => {
    const { redirect, path } = item
    if (redirect) {
        router.push(redirect).catch((err) => {
            console.warn(err)
        })
        return
    }
    router.push(pathCompile(path)).catch((err) => {
        console.warn(err)
    })
}
watch(
    () => currentRoute.path,
    (path) => {
        if (path.startsWith('/redirect/')) {
            return
        }
        getBreadcrumb()
    }
)
onBeforeMount(() => {
    getBreadcrumb()
})
</script>

<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
    font-weight: 400 !important;
}

.app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;

    .no-redirect {
        color: #97a8be;
        cursor: text;
    }
}
</style>