import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    token: window.sessionStorage.getItem('token') || '',
};
const getters = {
  token: state => state.token
};
const mutations = {
  SET_TOKEN(state,payload){
      window.sessionStorage.setItem('token', payload.token);
    state.token = payload.token;
  },
  LOG_OUT(state){
      window.sessionStorage.removeItem('token');
    state.token = '';
  }
};
const actions = {
  SetToken({commit},payload){
      commit('SET_TOKEN',payload)
  },
  LogOut({commit},payload){
      commit('LOG_OUT',payload)
  }
};


// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})