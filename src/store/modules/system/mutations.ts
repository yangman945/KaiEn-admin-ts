import { MutationTree } from 'vuex'
import { SystemState } from './state'
import { SystemMutationTypes } from './types'

export type Mutations<S = SystemState> = {
  [SystemMutationTypes.SET_SYS_CONFIG](state: S, config: any): void,
  [SystemMutationTypes.SET_MENU](state: S, menu: Array<any>): void
}

export const mutations: MutationTree<SystemState> & Mutations = {
  [SystemMutationTypes.SET_SYS_CONFIG](state: SystemState, config) {
    const {theme,access,site_name} = config
    state.gvcode_login = access.gvcode_login
    state.site_name = access.site_name
  },
  [SystemMutationTypes.SET_MENU](state: SystemState, menu: Array<any>) {
    state.menu = menu
  }
}
