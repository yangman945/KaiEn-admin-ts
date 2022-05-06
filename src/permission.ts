import { RouteLocationNormalized, RouteRecordRaw } from "vue-router";
import router from "@/router";
import { store } from "@/store";
import { SystemActionTypes } from "@/store/modules/system/types";
import whiteList from "@/config/default/routerWhiteList";
import permissionRoutes from "@/router/permissionRoutes";
import Custom from "@/views/custom/index.vue";
const token = store.state.user.token;
const menuList = store.state.system.menuList.flat();
let asyncRoutes = store.state.system.asyacRoutes;
console.log(asyncRoutes, "asyncRoutes");
// router.beforeEach(
//   (to: RouteLocationNormalized, from: RouteLocationNormalized, next: any) => {
//     if (token) {
//       console.log('每次都会执行吗')
//       if (to.path === "/login") {
//         next();
//       } else {
//         if (asyncRoutes.length === 0) {
//           asyncRoutes = [
//             ...permissionRoutes,
//             ...filterAsyncRouter(menuList),
//           ] as Array<RouteRecordRaw>;
//           asyncRoutes.forEach((item: RouteRecordRaw): void => {
//             router.addRoute("Dashboard", item);
//           });
//           store.dispatch(
//             SystemActionTypes.ACTION_SET_ASYNC_ROUTES,
//             asyncRoutes
//           );
//           next({ ...to, replace: true });
//         } else {
//           next();
//         }
//       }
//     } else {
//       // 存在白名单 next() , 不存在 to() login
//       if (whiteList.includes(to.path as string)) {
//         next();
//       } else {
//         next(`/login?redirect=${to.path}`);
//       }
//     }
//   }
// );
console.log(router.getRoutes(), "getRoutes");
// 根据后端数据生成路由
function filterAsyncRouter(asyncRouter) {
  return asyncRouter.reduce((prev, cur) => {
    if (cur.sub.length < 1) {
      prev.push({
        path: cur.url,
        name: cur.id,
        component: () => Custom,
        meta: {
          title: cur.title,
        },
      });
    } else {
      const children = filterAsyncRouter(cur.sub);
      prev.push({
        path: cur.url,
        name: cur.id,
        component: () => Custom,
        children: children,
        meta: {
          title: cur.title,
        },
      });
    }
    return prev;
  }, []);
}
export default router;
