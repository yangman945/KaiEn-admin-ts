import { RouteLocationNormalized, RouteRecordRaw } from "vue-router";
import router from "@/router";
import { store } from "@/store";
import { SystemActionTypes } from "@/store/modules/system/types";
import whiteList from "@/config/default/routerWhiteList";
import permissionRoutes from "@/router/permissionRoutes";
import Custom from "@/views/custom/index.vue";
const token = store.state.user.token;
const menuList = store.state.system.menuList.flat();
router.beforeEach(
  async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: any) => {
    if (whiteList.includes(to.path as string)) {
      next();
      console.log('next()')
    } else {
      const hasAsyncRoutes =
        store.state.system.asyacRoutes &&
        store.state.system.asyacRoutes.length > 0;
      console.log(hasAsyncRoutes,"hasAsyncRoutes")
      if (hasAsyncRoutes) {
        next();
        console.log('hasAsyncRoutes')
      } else if (token) {
        try {
          // const accessRoutes = await [
          //   ...permissionRoutes,
          //   ...filterAsyncRouter(menuList),
          // ] as Array<RouteRecordRaw>;
          const accessRoutes = await filterAsyncRouter(menuList) as  Array<RouteRecordRaw>
           accessRoutes.forEach((item: RouteRecordRaw): void => {
            router.addRoute("Dashboard", item);
          });
          store.dispatch(SystemActionTypes.ACTION_SET_ASYNC_ROUTES, accessRoutes);
          next({ ...to, replace: true });
          console.log('try')
        } catch {
          next(`/login?redirect=${to.path}&type=catch`);
          console.log('catch')
        }
      } else {
        next(`/login?redirect=${to.path}`);
        console.log('login')
      }
    }
  }
);
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
//       }
//     }
//   }
// );
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
