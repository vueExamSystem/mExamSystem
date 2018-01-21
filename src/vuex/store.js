import Vue from 'vue'
import Vuex from 'vuex'
import {actions,mutations,getters,state} from './permission' 
Vue.use(Vuex)

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})