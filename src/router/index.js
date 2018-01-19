import Vue from 'vue'
import VueRouter from 'vue-router'
import routers from './routes'
import store from '../vuex/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false });
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: routers
})

router.beforeEach((to, from, next) => {
    NProgress.start();
    var token = store.state.token;
    if (to.path == '/login') {
      store.dispatch('logout');
    }
    if (!token && to.path != '/login') {
      next({ path: '/login',query: { redirect: to.fullPath } })
    } else {
      next()
    }
});

router.afterEach(transition => {
  NProgress.done();
});

export default router;