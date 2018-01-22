import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../vuex/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false });
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.path == '/login') {
    store.dispatch('LogOut');
    next();
  }else{
    if (store.getters.token) {
      next()
    }else{
      next({ path: '/login',query: { redirect: to.fullPath } }); // 重定向到登录页
    }
  }
});

router.afterEach(transition => {
  NProgress.done();
});

export default router;

