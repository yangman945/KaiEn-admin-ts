<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane @scroll="state.handleScroll" ref="scrollPaneRef" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="state.isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle="!state.isAffix(tag) ? state.closeSelectedTag(tag) : ''"
        @contextmenu.prevent="state.openMenu(tag, $event)"
      >
        {{ $t('route.' + tag.meta?.title) }}
        <span
          v-if="!state.isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="state.closeSelectedTag(tag)"
        />
      </router-link>
    </scroll-pane>
    <ul
      v-show="state.visible"
      :style="{ left: state.left + 'px', top: state.top + 'px' }"
      class="contextmenu"
    >
      <li>{{ $t('tagsView.refresh') }}</li>
      <li>{{ $t('tagsView.close') }}</li>
      <li>{{ $t('tagsView.closeOthers') }}</li>
      <li>{{ $t('tagsView.closeAll') }}</li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import path from 'path'
import { onMounted, computed, watch, getCurrentInstance, reactive, ref } from 'vue'
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import { TagsActionTypes, TagsMutationTypes } from '@/store/modules/tagsView/types'
import { TagView } from '@/store/modules/tagsview/state'
import { routes } from '@/router'
import ScrollPane from './ScrollPane.vue'
const { ctx } = getCurrentInstance() as any
const scrollPaneRef = ref(null)
// 路由
const router = useRouter()
// 当前访问的路由对象
const currentRoute = useRoute()
const store = useStore()
// 当前挂载标签数组
const visitedViews = computed(() => {
  return store.state.tagViews.visitedViews
})
console.log(visitedViews.value, "当前挂载标签")
type TagStatus = {
  visible: boolean,
  affixTags: TagView[],
  top: number,
  left: number,
  selectedTag: TagView,
  openMenu: (tag: TagView, e: MouseEvent) => void,
  isActive: (route: TagView) => boolean,
  isAffix: (tag: TagView) => unknown,
  closeSelectedTag: (rview: TagView) => void,
  [propName: string]: any;
}
// 标签信息
const state: TagStatus = reactive({
  visible: false,
  top: 0,
  left: 0,
  affixTags: [],
  selectedTag: {},
  openMenu: (tag: TagView, e: MouseEvent) => {
    const menuMinWidth = 105
    const offsetLeft = ctx.$el.getBoundingClientRect().left // container margin left
    const offsetWidth = ctx.$el.offsetWidth // container width
    const maxLeft = offsetWidth - menuMinWidth // left boundary
    const left = e.clientX - offsetLeft // 15: margin right
    if (left > maxLeft) {
      state.left = maxLeft
    } else {
      state.left = left
    }
    state.top = e.clientY
    state.visible = true
    state.selectedTag = tag
    console.log(state.visible, '触发吗')
  },
  isActive: (route: TagView) => {
    return route.path === currentRoute.path
  },
  isAffix: (tag: TagView) => {
    return tag.meta && tag.meta.affix
  },
  closeSelectedTag: () => {

  },
  handleScroll: () => {
    state.closeMenu()
  },
  
  closeMenu: () => {
    state.visible = false
  },
})
type FilterRouter = (routes: RouteRecordRaw[], basePath?: string) => TagView[]
const filterAffixTags: FilterRouter = (routes, basePath = '/') => {
  let tags: TagView[] = []
  routes.forEach((routeItem) => {
    if (routeItem.meta && routeItem.meta.affix) {
      const tagPath = path.resolve(basePath, routeItem.path)
      const tagItem = {
        fullPath: tagPath,
        path: tagPath,
        name: routeItem.name,
        meta: { ...routeItem.meta }
      }
      tags.push(tagItem)
    }
    if (routeItem.children) {
      const tagsChild = filterAffixTags(routeItem.children, routeItem.path)
      if (tagsChild.length >= 1) {
        tags = [...tags, ...tagsChild]
      }
    }
  })
  return tags
}
const initTags = () => {
  const tagsAry = filterAffixTags(routes)
  state.affixTags = tagsAry
  for (const tagItem of tagsAry) {
    if (tagItem.name) {
      store.dispatch(TagsActionTypes.ACTION_ADD_VISITED_VIEW, tagItem as TagView)
    }
  }
}
const addTags = () => {
  if (currentRoute.name) {
    store.dispatch(TagsActionTypes.ACTION_ADD_VIEW, currentRoute)
  }
  return false
}
onMounted(() => {
  initTags()
  addTags()
})
// 监听路由变化 添加对应标签
watch(() => currentRoute.name, () => { addTags() })
// 监听面板 点击事件将其关闭
watch(
      () => state.visible,
      (value) => {
        if (value) {
          document.body.addEventListener('click', state.closeMenu)
        } else {
          document.body.removeEventListener('click', state.closeMenu)
        }
      }
    )
</script>
<style lang="scss">
.tags-view-container {
  height: 34px;
  width: 100%;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;

      &:first-of-type {
        margin-left: 15px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;

        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>