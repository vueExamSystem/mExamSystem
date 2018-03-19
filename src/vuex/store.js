import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    token: window.localStorage.getItem('token') || '',//window.sessionStorage.getItem('token') || '',
    isNavVisible: 1//底部导航是否可见
};
const getters = {
  token: state => state.token,
  isNavVisible: state => state.isNavVisible
};
const mutations = {
  SET_TOKEN(state,payload){
    window.localStorage.setItem('token', payload.token);//window.sessionStorage.setItem('token', payload.token);
    state.token = payload.token;
  },
  LOG_OUT(state){
     window.localStorage.removeItem('token');//window.sessionStorage.removeItem('token');
    state.token = '';
  },
  SHOW_NAV(state){
    state.isNavVisible = true;
  },
  HIDE_NAV(state){
    state.isNavVisible = false;
  }
};
const actions = {
  SetToken({commit},payload){
      commit('SET_TOKEN',payload)
  },
  LogOut({commit},payload){
      commit('LOG_OUT',payload)
  },
  ShowNav({commit},payload){
      commit('SHOW_NAV',payload)
  },
  HideNav({commit},payload){
      commit('HIDE_NAV',payload)
  }
};


// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})