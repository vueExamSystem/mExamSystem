import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import Common from './common/js/util';
import App from './App'
import './styles/reset.css'
import ElementUI from 'element-ui'
import './styles/element-variables.scss'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'; 
import './styles/style.scss'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import routers from './routes'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import Mock from './mock'
Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'
import './styles/iconfont/iconfont.css'

Vue.use(Common)
Vue.use(ElementUI)
Vue.use(Mint);
Vue.use(VueRouter)
Vue.use(Vuex)

//NProgress.configure({ showSpinner: false });

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
})

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')
