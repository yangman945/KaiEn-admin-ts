import { Mutations, Actions } from "./UserEnums";
import { Mutation, Action, Module, VuexModule } from "vuex-module-decorators";
import {
  getToken,
  getRefreshToken,
  setToken,
  setRefreshToken,
} from "@/utils/cookies";
import { loginRequest } from "@/api/user";
interface StoreInfo {
  token: string;
  refreshToken: string;
}

@Module
export default class UserModule extends VuexModule implements StoreInfo {
  token = getToken() || "";
  refreshToken = getRefreshToken() || "";
  // gettter
  get userToken(): string {
    return this.token;
  }

  @Mutation
  [Mutations.SET_USER](payload): void {
    this.token = payload.access_token;
    this.refreshToken = payload.refresh_token;
  }
  @Action
  [Actions.LOGIN](credentials) {
    return new Promise((resolve, reject) => {
      loginRequest(credentials).then((res) => {
          if (res?.response_code === "0") {
            this.context.commit(Mutations.SET_USER, res.data);
            resolve(res.data.access_token)
            setToken(res.data.access_token);
            setRefreshToken(res.data.refresh_token);
          }else{
            reject(null)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
}
