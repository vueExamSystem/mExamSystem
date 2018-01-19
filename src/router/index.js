import Vue from 'vue'
import VueRouter from 'vue-router'
import {constantRouterMap,asyncRouterMap} from './routes'
import store from '../vuex/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false });
Vue.use(VueRouter)


const router = new VueRouter({
    mode: 'history',
    routes: constantRouterMap
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.path == '/login') {
    store.dispatch('LogOut');
    next();
  }else{
    if (store.getters.token) {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完 user_info 信息
        store.dispatch('GetInfo').then(res => { // 拉取 info
          const roles = res.data.role;
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next(to); // hack 方法 确保 addRoutes 已完成
          })
        }).catch(err => {
          console.log(err);
        });
      } else {
        next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入 404 页面
      }
    }else{
      if (['whiteList'].indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
        next();
      } else {
        next({ path: '/login',query: { redirect: to.fullPath } }); // 否则全部重定向到登录页
      }
    }
  }
});

router.afterEach(transition => {
  NProgress.done();
});

export default router;

