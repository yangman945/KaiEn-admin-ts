import { MutationTree } from 'vuex'
import { UserState } from './state'
import { UserMutationTypes } from './types'

export type Mutations<S = UserState> = {
  [UserMutationTypes.SET_TOKEN](state: S, token: string): void
  [UserMutationTypes.SET_REFRESH_TOKEN](state: S, refreshToken: string): void
}

export const mutations: MutationTree<UserState> & Mutations = {
  [UserMutationTypes.SET_TOKEN](state: UserState, token: string) {
    state.token = token
  },

  [UserMutationTypes.SET_REFRESH_TOKEN](state: UserState, refreshToken: string) {
    state.refreshToken = refreshToken
  },
}
