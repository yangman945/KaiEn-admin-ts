import { createStore } from "vuex";
import { store as app, AppStore, AppState } from "@/store/modules/app";
import {
  store as tagViews,
  TagsStore,
  TagsViewState,
} from "./modules/tagsView";

export interface RootState {
  tagViews: TagsViewState;
  app: AppState;
}
// Pick 从传入的类型中取出指定的类型
export type Store = AppStore<Pick<RootState, 'app'>> & TagsStore<Pick<RootState, "tagViews">>;
// 创建一个新的 store 实例
export const store = createStore({
  // plugins,
  modules: {
    app,
    tagViews
  },
});
export function useStore(): Store {
  return store as Store;
}
