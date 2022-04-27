import { createStore } from "vuex";
import { store as app, AppStore, AppState } from "@/store/modules/app";
import {  store as tagViews,  TagsStore, TagsViewState} from "./modules/tagsView";
import { store as user, UserState, UserStore} from "./modules/user";
import {store as system, SystemState, SystemStore} from './modules/system';
export interface RootState {
  tagViews: TagsViewState,
  app: AppState,
  user:UserState,
  system:SystemState
}
// Pick 从传入的类型中取出指定的类型
export type Store = AppStore<Pick<RootState, "app">> &
  TagsStore<Pick<RootState, "tagViews">>&
  UserStore<Pick<RootState, "user">>&
  SystemStore<Pick<RootState, "system">>
// 创建一个新的 store 实例
export const store = createStore({
  modules: {
    app,
    tagViews,
    user,
    system
  },
});
export function useStore(): Store {
  return store as Store;
}
