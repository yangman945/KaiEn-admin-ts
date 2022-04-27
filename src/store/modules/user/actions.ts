
import { ActionTree, ActionContext } from "vuex";
import { RootState } from "@/store";
import { UserState } from "./state";
import { Mutations } from "./mutations";
import { UserMutationTypes, UserActionTypes } from "./types";
import { loginRequest } from "@/api/user";
import { removeToken, setToken,setRefreshToken ,removeRefreshToken} from "@/utils/cookies";
import { store } from '@/store'
import {SystemActionTypes} from '@/store/modules/system/types'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<UserState, RootState>, "commit">;

export interface Actions {
  [UserActionTypes.ACTION_LOGIN](
    { commit }: AugmentedActionContext,
    loginInfo: {
      username: string;
      password: string;
      method: string;
      token_type: string;
      timestamp: string;
    }
  ): void;
  [UserActionTypes.ACTION_RESET_TOKEN]({
    commit,
  }: AugmentedActionContext): void;
}

export const actions: ActionTree<UserState, RootState> & Actions = {
  async [UserActionTypes.ACTION_LOGIN](
    { commit }: AugmentedActionContext,
    loginInfo
  ) {
    await loginRequest(loginInfo)
      .then(async (res) => {
        console.log(res,"回调")
        if (res?.response_code === '0') {
          store.dispatch(SystemActionTypes.ACTION_GET_SYS_CONFIG,undefined)
          setToken(res.data.access_token);
          commit(UserMutationTypes.SET_TOKEN, res.data.access_token);
          setRefreshToken(res.data.refresh_token);
          commit(UserMutationTypes.SET_REFRESH_TOKEN, res.data.refresh_token);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  [UserActionTypes.ACTION_RESET_TOKEN]({ commit }: AugmentedActionContext) {
    removeToken();
    commit(UserMutationTypes.SET_TOKEN, "");
    removeRefreshToken();
    commit(UserMutationTypes.SET_TOKEN, "");
    // commit(UserMutationTypes.SET_ROLES, [])
  },
};
