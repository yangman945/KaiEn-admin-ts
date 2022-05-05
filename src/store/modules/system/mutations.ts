import { MutationTree } from 'vuex'
import { SystemState } from './state'
import { SystemMutationTypes } from './types'
import {RouteRecordRaw} from 'vue-router'
import {getVueSysKey,getValidMenus} from '@/utils/public'

export type Mutations<S = SystemState> = {
  [SystemMutationTypes.SET_SYS_CONFIG](state: S, config): void
  [SystemMutationTypes.SET_MENU](state: S, menu): void
  [SystemMutationTypes.SET_ASYNC_ROUTES](state: S, list:Array<RouteRecordRaw>): void
}

export const mutations: MutationTree<SystemState> & Mutations = {
  [SystemMutationTypes.SET_SYS_CONFIG](state: SystemState, config) {
    const {theme,access,site_name} = config
    state.gvcode_login = access.gvcode_login
    state.gvcode_reg = access.gvcode_reg
    state.site_name = site_name
    state.theme = getVueSysKey(theme)
  },
  [SystemMutationTypes.SET_MENU](state: SystemState, menus) {
    const filterMenu = getValidMenus(menus)
    state.menuList = filterMenu
    window.localStorage.setItem('localMenu',JSON.stringify(filterMenu))
  },
  [SystemMutationTypes.SET_ASYNC_ROUTES](state: SystemState, list) {
    state.asyacRoutes = list
    window.localStorage.setItem('localAsyncRoutes',JSON.stringify(list))
  }
}
