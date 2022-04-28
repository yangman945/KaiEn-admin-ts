import { ActionTree, ActionContext } from "vuex";
import { RootState } from "@/store";
import { SystemState } from "./state";
import { Mutations } from "./mutations";
import { SystemMutationTypes, SystemActionTypes } from "./types";
import { getSysConfigRequest,getMenuRequest } from "@/api/system";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<SystemState, RootState>, "commit">;

export interface Actions {
  [SystemActionTypes.ACTION_GET_SYS_CONFIG]({ commit }: AugmentedActionContext): void;
  [SystemActionTypes.ACTION_GET_MENU]({ commit }: AugmentedActionContext): void;
}

export const actions: ActionTree<SystemState, RootState> & Actions = {
  
  async [SystemActionTypes.ACTION_GET_SYS_CONFIG]({ commit }: AugmentedActionContext) {
    await getSysConfigRequest()
      .then(async (res) => {
        console.log(res, "getSysConfigRequest");
        if (res?.response_code === "0") {
          commit(SystemMutationTypes.SET_SYS_CONFIG, res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async [SystemActionTypes.ACTION_GET_MENU]({ commit,state }: AugmentedActionContext) {
    await getMenuRequest({id:(state.theme).toString()})
      .then(async (res) => {
        console.log(res, "getMenuRequest");
        if (res?.response_code === "0") {
          commit(SystemMutationTypes.SET_MENU, res.data.menus);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
