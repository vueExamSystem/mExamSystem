import Vue from 'vue'
import VueRouter from 'vue-router'
import routers from './routes'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'

//NProgress.configure({ showSpinner: false });
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: routers
})

router.beforeEach((to, from, next) => {
  // NProgress.start();
  // if (to.path == '/login') {
  //   sessionStorage.removeItem('user');
  // }
  // let user = JSON.parse(sessionStorage.getItem('user'));
  // if (!user && to.path != '/login') {
  //   next({ path: '/login' })
  // } else {
  //   next()
  // }
  next()
});

//router.afterEach(transition => {
//NProgress.done();
//});

export default router;