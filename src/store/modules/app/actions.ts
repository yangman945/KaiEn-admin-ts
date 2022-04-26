import { ActionTree, ActionContext } from 'vuex'

import { RootState } from '@/store'
import { AppState } from './state'
import { Mutations } from './mutations'
import { AppMutationTypes,AppActionTypes } from './types'
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<AppState, RootState>, 'commit'>

export interface Actions {
  [AppActionTypes.ACTION_TOGGLE_SIDEBAR](
    { commit }: AugmentedActionContext,
    withoutAnimation: boolean
  ): void
  [AppActionTypes.ACTION_CLOSE_SIDEBAR](
    { commit }: AugmentedActionContext,
    withoutAnimation: boolean
  ): void
  [AppActionTypes.ACTION_SET_LANGUAGE](
    { commit }: AugmentedActionContext,
    language: string
  ): void
  [AppActionTypes.ACTION_SET_SIZE](
    { commit }: AugmentedActionContext,
    size: string
  ): void
  [AppActionTypes.ACTION_SET_THEME](
    { commit }: AugmentedActionContext,
    theme: string
  ): void
}

export const actions: ActionTree<AppState, RootState> & Actions = {
  [AppActionTypes.ACTION_TOGGLE_SIDEBAR](
    { commit },
    withoutAnimation: boolean
  ) {
    commit(AppMutationTypes.TOGGLE_SIDEBAR, withoutAnimation)
  },
  [AppActionTypes.ACTION_CLOSE_SIDEBAR]({ commit }, withoutAnimation: boolean) {
    commit(AppMutationTypes.CLOSE_SIDEBAR, withoutAnimation)
  },
  [AppActionTypes.ACTION_SET_LANGUAGE]({ commit }, language: string) {
    commit(AppMutationTypes.SET_LANGUAGE, language)
  },
  [AppActionTypes.ACTION_SET_SIZE]({ commit }, size: string) {
    commit(AppMutationTypes.SET_SIZE, size)
  },
  [AppActionTypes.ACTION_SET_THEME]({ commit }, theme: string) {
    commit(AppMutationTypes.SET_THEME, theme)
  }
}
