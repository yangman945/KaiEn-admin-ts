import {
  Store as VuexStore,
  MutationTree,
  ActionTree,
  ActionContext,
  CommitOptions,
  DispatchOptions,
  Module,
} from "vuex";
import { UserMutationEnum, UserActionEnum } from "./type";
import { RootState } from "@/stores";

// 1 定义state类型
export type UserStateType = {
  user: string[];
};
// Omit：去除类型中的指定项
// 2 利用vuex自带的VuexStore结合我们的自定义类型对state进行类型检测
export type UserStoreType<S = UserStateType> = Omit<
  VuexStore<S>,
  "getters" | "commit" | "dispatch"
> & {
  commit<
    K extends keyof MutationsType,
    P extends Parameters<MutationsType[K]>[1]
  >(
    key: K,
    payload: P,
    options?: CommitOptions
  );
} & {
  dispatch<K extends keyof ActionTypec>(
    key: K,
    payload: Parameters<ActionTypec[K]>[1],
    options?: DispatchOptions
  ): ReturnType<ActionTypec[K]>;
};
const state: UserStateType = {
  user: ['这里有什么泥'],
};
type MutationsType<S = UserStateType> = {
  [UserMutationEnum.ADD_USRE](state: S): void;
  [UserMutationEnum.REMOVE_USER](state: S): void;
};
export const mutations: MutationTree<UserStateType> & MutationsType = {
  [UserMutationEnum.ADD_USRE](state) {},
  [UserMutationEnum.REMOVE_USER](state) {},
};
type AugmentedActionContext = {
  commit<K extends keyof MutationsType>(
    key: K,
    payload: Parameters<MutationsType[K]>[1]
  ): ReturnType<MutationsType[K]>;
} & Omit<ActionContext<UserStateType, RootState>, "commit">;
type NoAugmentedActionContext = {
  commit<K extends keyof MutationsType>(key: K): ReturnType<MutationsType[K]>;
} & Omit<ActionContext<UserStateType, RootState>, "commit">;
type ActionTypec = {
  [UserActionEnum.ACTION_ADD_USRE]({ commit }: NoAugmentedActionContext): void;
  [UserActionEnum.ACTION_REMOVE_USER]({ commit }: NoAugmentedActionContext): void;
};
const actions:ActionTree<UserStateType,RootState> &  ActionTypec= {
    [UserActionEnum.ACTION_ADD_USRE]({commit}){
        commit(UserMutationEnum.ADD_USRE)
    },
    [UserActionEnum.ACTION_REMOVE_USER]({commit}){
        commit(UserMutationEnum.REMOVE_USER)
    },
};
export const userStore: Module<UserStateType, RootState> = {
  state,
  mutations,
  actions,
  // namespaced: true,
};
