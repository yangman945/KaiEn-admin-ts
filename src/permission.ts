import { RouteLocationNormalized } from "vue-router";
import router from "@/router";
import { store } from "@/store";
import whiteList from "@/config/default/routerWhiteList"
const token = store.state.user.token;
router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: any) => {
    if (token) {
      if (to.path === "/login") {
        next();
      } else {
        next();
      }
    }else {
        // 存在白名单 next() , 不存在 redirect
        if(whiteList.includes(to.path as string)){
            next()
        }else{
            next(`/login?redirect=${to.path}`)
        }
    }
  }
);

export default router;
