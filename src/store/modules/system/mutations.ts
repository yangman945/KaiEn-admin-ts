import { MutationTree } from 'vuex'
import { SystemState } from './state'
import { SystemMutationTypes } from './types'
import {isVueKey} from '@/utils/public'

export type Mutations<S = SystemState> = {
  [SystemMutationTypes.SET_SYS_CONFIG](state: S, config): void,
  [SystemMutationTypes.SET_MENU](state: S, menu: Array<any>): void
}

export const mutations: MutationTree<SystemState> & Mutations = {
  [SystemMutationTypes.SET_SYS_CONFIG](state: SystemState, config) {
    const {theme,access,site_name} = config
    state.gvcode_login = access.gvcode_login
    state.gvcode_reg = access.gvcode_reg
    state.site_name = site_name
    state.theme = isVueKey(theme)
    console.log(state.theme,"state.theme")
  },
  [SystemMutationTypes.SET_MENU](state: SystemState, menus: Array<any>) {
    state.menuList = menus
  }
}
