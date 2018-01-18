import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import Common from './common/js/util';
import App from './App'
import './styles/reset.css'
import 'font-awesome/css/font-awesome.min.css'
import './styles/iconfont/iconfont.css'
import ElementUI from 'element-ui'
import './styles/element-variables.scss'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'; 
import './styles/style.scss'
import router from './router'
import store from './vuex/store'
import Vuex from 'vuex'

import Mock from './mock'
Mock.bootstrap();

Vue.use(Common)
Vue.use(ElementUI)
Vue.use(Mint);
Vue.use(Vuex)

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')
