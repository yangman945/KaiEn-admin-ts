import { createStore } from "vuex";
// 引入user模块
import { UserStoreType, userStore, UserStateType } from "./modules/user/index";
const store = createStore({
  modules: {
    userStore,
  },
  getters:{
      user:state => state.userStore.user,
  }
});
export type RootState = {
  userStore: UserStateType
};
export type Store = UserStoreType<Pick<RootState, "userStore">>;
export function useStore(): Store {
  return store as Store;
}
