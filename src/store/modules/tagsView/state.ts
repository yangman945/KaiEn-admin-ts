import { RouteLocationNormalized } from 'vue-router'

// Partial<T> 将接口中定义的属性变为可选的 而非必填
export interface TagView extends Partial<RouteLocationNormalized> {
  title?: string
}

export interface TagsViewState {
  // 标签
  visitedViews: TagView[]
  // 需缓存的标签
  cachedViews: (string | undefined)[]
}

export const state: TagsViewState = {
  visitedViews: [],
  cachedViews: []
}
